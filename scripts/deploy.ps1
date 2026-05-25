# SPARK Deploy (Windows → Hetzner Erasmus-Server)
# Usage: .\scripts\deploy.ps1

$ErrorActionPreference = "Stop"
$SSH_KEY = "$env:USERPROFILE\.ssh\ssh-kimai-zeno"
$SERVER = "root@91.98.127.31"
$LOCAL = "C:\_DATA\600_github\spark"
$STAGING = "C:\temp\spark-deploy"
$REMOTE = "/opt/spark"

Write-Host "==> Staging files (excluding node_modules, .next, .git)..."
if (Test-Path $STAGING) { Remove-Item -Recurse -Force $STAGING }
New-Item -ItemType Directory -Path $STAGING | Out-Null
robocopy $LOCAL $STAGING /E /XD node_modules .next .git /NFL /NDL /NJH /NJS /NC /NS | Out-Null

Write-Host "==> Uploading to $SERVER:$REMOTE ..."
scp -i $SSH_KEY -r "$STAGING\*" "${SERVER}:${REMOTE}/"

Write-Host "==> Building Docker image and restarting..."
ssh -i $SSH_KEY $SERVER "cd $REMOTE && docker build -t spark-webapp . && docker compose -f docker-compose.prod.yml up -d --force-recreate"

Write-Host "==> Running DB migration (idempotent)..."
ssh -i $SSH_KEY $SERVER "docker exec -i spark-postgres psql -U spark -d spark < $REMOTE/scripts/init-db.sql 2>/dev/null; docker exec -i spark-postgres psql -U spark -d spark < $REMOTE/scripts/migrate-certificates.sql 2>/dev/null || true"

Write-Host "==> Health check..."
ssh -i $SSH_KEY $SERVER "docker ps | grep spark; curl -s https://spark.mmind.space/api/health"
Write-Host "Done. https://spark.mmind.space"
