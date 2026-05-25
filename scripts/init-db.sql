-- Run once after first deploy to create analytics tables

CREATE TABLE IF NOT EXISTS certificate_downloads (
  id SERIAL PRIMARY KEY,
  count INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS nps_responses (
  id SERIAL PRIMARY KEY,
  module_id TEXT NOT NULL,
  score INTEGER NOT NULL,
  comment TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS module_views (
  id SERIAL PRIMARY KEY,
  module_id TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS progress_snapshots (
  id SERIAL PRIMARY KEY,
  sync_code TEXT NOT NULL UNIQUE,
  data TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS certificates (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  total_xp INTEGER NOT NULL,
  modules_completed INTEGER NOT NULL DEFAULT 5,
  completion_hash TEXT UNIQUE,
  download_counted INTEGER NOT NULL DEFAULT 0,
  issued_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Singleton row for EU KPI download counter
INSERT INTO certificate_downloads (id, count) VALUES (1, 0)
ON CONFLICT (id) DO NOTHING;
