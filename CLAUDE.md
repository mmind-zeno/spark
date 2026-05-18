# SPARK — KI-Trainingsplattform (Erasmus)

## Projektübersicht
Gamifizierte Web-Lernplattform für das Erasmus-Programm. 5 KI-Trainingsmodule mit Quiz, XP-System, Badges und PDF-Zertifikat. Mobile-first, kein Login.

**Domain:** spark.mmind.space  
**Version:** v0.1.0  
**Server:** 91.98.127.31 (Erasmus-Server, ssh-kimai-zeno)  
**Deploy-Pfad:** /opt/spark

## Stack
- Next.js 16 (App Router, `output: standalone`)
- Tailwind v4
- Framer Motion (Slide-Swipe)
- canvas-confetti (Modul-Abschluss)
- pdf-lib (Zertifikat-Generator, client-side)
- Drizzle ORM + PostgreSQL (Download-Counter EU KPI)
- localStorage (kein Login — Fortschritt anonym)

## Commands
```bash
npm run dev         # Development
npm run build       # Production build
npm run db:push     # Schema pushen (Drizzle)
npm run db:generate # Migrations generieren
```

## Struktur
```
src/
  app/
    page.tsx                    # Dashboard (/)
    modul/[id]/
      page.tsx                  # Modul-Intro
      slides/page.tsx           # Slide-Viewer
      abschluss/page.tsx        # Abschluss-Screen + Confetti
      quiz/page.tsx             # Quiz (5 Fragen, Multiple Choice)
    zertifikat/page.tsx         # PDF-Zertifikat Download
    api/zertifikat/download/    # POST: Counter++, GET: Counter lesen
  data/
    modules.ts                  # Alle Inhalte + Quiz-Fragen als TS-Konstanten
  lib/
    progress.ts                 # localStorage XP/Badge/Fortschritt-Manager
  db/
    schema.ts                   # Drizzle: certificate_downloads Tabelle
    index.ts                    # Drizzle Client
  components/
    MarkdownContent.tsx         # Markdown-Renderer für Slide-Content
```

## Gamification
| Aktion | XP |
|---|---|
| Slide gelesen | +5 XP |
| Modul abgeschlossen | +50 XP |
| Quiz bestanden (≥3/5) | +100 XP |
| Quiz perfekt (5/5) | +150 XP |
| Alle 5 Module abgeschlossen | +500 XP Bonus |
| **Maximum total** | **1.425 XP** |

Badges: ai-act-expert, prompt-master, nutribot, eco-warrior, future-ready, ai-graduate

## Module
01 EU AI Act (Hartmut) · 02 ChatGPT Deep Dive (Phi Yen) · 03 KI & Ernährung (Zeno) · 04 KI & Umwelt (Phi Yen) · 05 KI & Berufe der Zukunft (Phi Yen)

## Deploy
```bash
# Server: ssh -i ~/.ssh/ssh-kimai-zeno root@91.98.127.31

# 1. Netz anlegen (einmalig)
docker network create spark_internal

# 2. Build + Start
cd /opt/spark
docker build -t spark-webapp .
docker compose -f docker-compose.prod.yml up -d

# 3. DB init (einmalig)
docker exec -i spark-postgres psql -U spark -d spark < scripts/init-db.sql

# 4. Caddyfile (in /opt/bioavatar/deploy/Caddyfile anhängen)
# spark.mmind.space {
#   reverse_proxy spark-webapp:3000
# }
# Caddy reload: docker exec bioavatar-caddy-1 caddy reload --config /etc/caddy/Caddyfile

# Verify
docker ps | grep spark && docker logs spark-webapp --tail 10
```

## Kritische Regeln
- Kein `node_modules` aus Windows in Container kopieren
- `chown -R 1001:1001` für Host-Volumes wenn nötig
- Caddyfile liegt im BioAvatar-Stack — nicht in eigenem Compose
- Download-Counter ist EU KPI — muss funktionieren
- `DATABASE_URL` als Env-Variable in docker-compose.prod.yml bereits konfiguriert
