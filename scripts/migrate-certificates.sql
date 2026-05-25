-- Migration for existing SPARK deployments (run once if certificates table already exists)
ALTER TABLE certificates ADD COLUMN IF NOT EXISTS completion_hash TEXT UNIQUE;
ALTER TABLE certificates ADD COLUMN IF NOT EXISTS download_counted INTEGER NOT NULL DEFAULT 0;
