-- Run once after first deploy to create the download counter table
CREATE TABLE IF NOT EXISTS certificate_downloads (
  id SERIAL PRIMARY KEY,
  count INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Insert initial row
INSERT INTO certificate_downloads (count) VALUES (0) ON CONFLICT DO NOTHING;
