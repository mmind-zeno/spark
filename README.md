# SPARK — KI-Trainingsplattform (Erasmus)

Gamifizierte Web-Lernplattform mit 5 KI-Modulen, Quiz, XP, Badges und PDF-Zertifikat.

**Live:** https://spark.mmind.space

## Features

- 5 Trainingsmodule mit Slides, Quiz und Badges
- XP-System (max. 1.775 XP) ohne Login — Fortschritt in localStorage
- Cross-Device Sync via Sync-Code
- PDF-Zertifikat mit QR-Verifizierung
- Admin KPI-Dashboard (Downloads, NPS, Module-Views)
- PWA mit Offline-Fallback

## Development

```bash
npm install
npm run dev          # http://localhost:3000
npm run build
```

PostgreSQL für APIs (Downloads, NPS, Sync):

```bash
# DATABASE_URL in .env.local setzen
npm run db:push
```

## Deploy

Siehe [CLAUDE.md](./CLAUDE.md) für vollständige Server-Anleitung (Hetzner, Docker, Caddy).

## Stack

Next.js 16 · Tailwind v4 · Framer Motion · pdf-lib · Drizzle · PostgreSQL
