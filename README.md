# SPARK — KI-Trainingsplattform (Erasmus)

Gamifizierte Web-Lernplattform mit 5 KI-Modulen, Quiz, XP, Badges und PDF-Zertifikat.

**Live:** https://spark.mmind.space · **Repo:** https://github.com/mmind-zeno/spark · **v1.0.1**

## Features

- 5 Trainingsmodule mit Rich Slides (fal.ai Illustrationen), Quiz und Badges
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

Neue Bilder generieren (fal.ai API-Key nötig):

```bash
npm run assets:ai
```

## Deploy

```powershell
.\scripts\deploy.ps1
```

Details: [CLAUDE.md](./CLAUDE.md)

## Stack

Next.js 16 · Tailwind v4 · Framer Motion · pdf-lib · Drizzle · PostgreSQL
