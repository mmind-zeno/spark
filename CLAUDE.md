# SPARK — KI-Trainingsplattform (Erasmus)

## Projektübersicht
Gamifizierte Web-Lernplattform für das Erasmus-Programm. 5 KI-Trainingsmodule mit Quiz, XP-System, Badges und PDF-Zertifikat. Mobile-first, kein Login.

**Domain:** https://spark.mmind.space  
**Version:** v1.0.1  
**Server:** 91.98.127.31 (Erasmus-Server, `ssh -i ~/.ssh/ssh-kimai-zeno root@91.98.127.31`)  
**Deploy-Pfad:** /opt/spark  
**GitHub:** https://github.com/mmind-zeno/spark  
**Deploy-Script:** `.\scripts\deploy.ps1` (Windows)

## Stack
- Next.js 16 (App Router, `output: standalone`)
- Tailwind v4
- Framer Motion (Slide-Swipe)
- canvas-confetti (Modul-Abschluss)
- pdf-lib + qrcode (Zertifikat client-side, QR Verify-Link)
- Drizzle ORM + PostgreSQL (KPI: Downloads, NPS, Module-Views, Zertifikate)
- localStorage + optional Sync-Code (Cross-Device, 7 Tage)
- PWA: Service Worker, offline.html, manifest.json

## Commands
```bash
npm run dev              # Development
npm run build            # Production build
npm run db:push          # Schema pushen (Drizzle)
npm run assets:ai           # fal.ai Bilder generieren (FAL_KEY nötig)
npm run assets:placeholders # NUR bei leerem Projekt — überschreibt echte Bilder!
```

## Assets (Bilder & Slides)

Alle Modul-Header, Slide-Bilder und Branding-Assets liegen in `public/` und stammen aus **fal.ai** (Script: `npm run assets:ai`).

| Pfad | Inhalt |
|---|---|
| `public/header-01..05.jpg` | Modul-Cover (1920×1080) |
| `public/slides/01..05/s01..s11.png` | Slide-Illustrationen (800×450) |
| `public/spark-header.jpg` | Dashboard-Hero |
| `public/cert-bg.jpg` | Zertifikat-PDF-Hintergrund |
| `public/spark-logo.png` | Logo + Icons |

**KRITISCH:** `assets:placeholders` darf **nicht** im Dockerfile laufen — überschreibt alle echten Bilder mit Farbverläufen. Bei Verlust: `git checkout cf27adc -- public/`.

Generierungs-Scripts in `scripts/`:
- `generate-branding.mjs`, `generate-module-headers.mjs`, `generate-cert-bg.mjs`
- `generate-slides-01..05.mjs` (pro Modul)
- `generate-placeholders.mjs` — nur Dev-Fallback

## Struktur
```
src/
  app/
    page.tsx                    # Dashboard + SyncPanel
    admin/page.tsx              # KPI-Dashboard (ADMIN_SECRET)
    verify/ + verify/[id]/      # Zertifikat-Verifizierung
    modul/[id]/
      page.tsx                  # Modul-Intro (quiz-pending → Quiz-CTA)
      slides/page.tsx           # Slide-Viewer (Framer Motion Swipe)
      abschluss/page.tsx        # Abschluss + Confetti
      quiz/page.tsx             # Quiz (5 Fragen, NPS nach Bestehen)
    zertifikat/page.tsx         # PDF-Download (Server-Registrierung)
    api/
      zertifikat/register/      # POST: Zertifikat registrieren, GET: Verify
      zertifikat/download/      # POST: KPI idempotent pro certId
      sync/                     # Fortschritt export/import
      admin/stats|export/       # KPI + CSV
      nps/ module-view/ health/
  data/modules.ts + modules-01..05.ts
  lib/
    progress.ts                 # localStorage XP/Badge/Fortschritt
    progress-validation.ts      # Server-seitige Sanitisierung + Cert-Check
    certificate-pdf.ts          # PDF-Generator
    rate-limit.ts admin-auth.ts module-slides.ts
  db/schema.ts                  # certificate_downloads, nps, views, certificates, progress_snapshots
  components/ SyncPanel, ModuleProgressHeader, ServiceWorkerRegister, ...
scripts/
  init-db.sql                   # Vollständiges Schema
  migrate-certificates.sql      # Migration bestehender Deployments
  generate-placeholders.mjs     # Nur Dev-Fallback — nicht im Docker-Build
```

## Gamification
| Aktion | XP |
|---|---|
| Slide gelesen | +5 XP |
| Modul abgeschlossen | +50 XP |
| Quiz bestanden (≥3/5) | +100 XP |
| Quiz perfekt (5/5) | +150 XP |
| Quiz-Wiederholung bestanden | +50 XP (halb bei perfekt) |
| Alle 5 Module abgeschlossen | +500 XP Bonus |
| **Maximum total** | **1.775 XP** (dynamisch via `TOTAL_MAX_XP`) |

Badges: ai-act-expert, prompt-master, nutribot, eco-warrior, future-ready, ai-graduate

Modul-Status: `not-started` → `in-progress` → `quiz-pending` → `completed`

## Module
01 EU AI Act (Hartmut) · 02 ChatGPT Deep Dive (Phi Yen) · 03 KI & Ernährung (Zeno) · 04 KI & Umwelt (Phi Yen) · 05 KI & Berufe der Zukunft (Phi Yen)

Modul-IDs immer zweistellig (`01`–`05`); `/modul/1` wird zu `/modul/01` normalisiert.

## Zertifikat-Flow
1. Alle 5 Module: Slides gelesen + Quiz bestanden
2. User gibt Name ein → POST `/api/zertifikat/register` mit vollem Progress (server-validiert)
3. PDF client-side via `generateCertificatePdf()` mit QR → Verify-URL
4. Re-Download idempotent über `completionHash` + `lastCertId` in localStorage
5. KPI-Zähler nur einmal pro Zertifikat (`download_counted`)

## Deploy
```bash
# Server
ssh -i ~/.ssh/ssh-kimai-zeno root@91.98.127.31

# Netz (einmalig)
docker network create spark_internal

# Code sync (lokal, Windows — ohne node_modules/.next)
robocopy . C:\temp\spark-deploy /E /XD node_modules .next .git
scp -i ~/.ssh/ssh-kimai-zeno -r C:\temp\spark-deploy\* root@91.98.127.31:/opt/spark/

# Build + Start
cd /opt/spark
docker build -t spark-webapp .
docker compose -f docker-compose.prod.yml up -d --force-recreate

# DB init (einmalig) oder Migration
docker exec -i spark-postgres psql -U spark -d spark < scripts/init-db.sql
docker exec -i spark-postgres psql -U spark -d spark < scripts/migrate-certificates.sql

# Caddy (BioAvatar-Stack, /opt/bioavatar/deploy/Caddyfile)
# spark.mmind.space { reverse_proxy spark-webapp:3000 }
docker exec bioavatar-caddy-1 caddy reload --config /etc/caddy/Caddyfile

# Verify
docker ps | grep spark
curl -s https://spark.mmind.space/api/health
docker logs spark-webapp --tail 20
```

## Env (docker-compose.prod.yml + `/opt/spark/.env`)
| Variable | Zweck |
|---|---|
| `DATABASE_URL` | PostgreSQL Connection |
| `ADMIN_SECRET` | Admin-Dashboard + CSV-Export — liegt in `/opt/spark/.env` auf dem Server |
| `NEXT_PUBLIC_BASE_URL` | https://spark.mmind.space (Verify-URLs, OG) |

## Admin
- URL: `/admin` — Header `X-Admin-Secret: <ADMIN_SECRET>`
- KPI: Downloads, Zertifikate, NPS, Module-Views
- CSV-Export: `/api/admin/export`

## Kritische Regeln
- Kein `node_modules` aus Windows in Container kopieren
- **Nie** `assets:placeholders` im Docker-Build — echte fal.ai-Bilder in `public/` behalten
- Download-Counter ist EU KPI — muss funktionieren
- Zertifikat nur nach server-validiertem Progress
- Caddyfile liegt im BioAvatar-Stack — nicht in eigenem Compose
- `ADMIN_SECRET` in `/opt/spark/.env` auf dem Server (nicht committen)

## Changelog (Auszug)
| Version | Commit | Highlights |
|---|---|---|
| v1.0.1 | `caabab0` | fal.ai-Bilder wiederhergestellt, Placeholder aus Dockerfile entfernt |
| v1.0.0 | `597b0f6` | Sync, Admin, Verify, PWA, Server-Validierung, Framer Motion |
| v0.3.0 | `f8d487b` | NPS, Module-Tracking, Datenschutz |
| v0.2.0 | `cf27adc` | Rich Slides mit fal.ai Bildern, Modul-Header |
