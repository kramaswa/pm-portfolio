-- Run this in your Supabase SQL editor to set up the database.

-- 1. Projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  long_description TEXT,
  tags TEXT[] DEFAULT '{}',
  link TEXT,
  screenshot_url TEXT,
  status TEXT NOT NULL DEFAULT 'Live'
    CHECK (status IN ('Live', 'Beta', 'In Progress', 'Archived')),
  featured BOOLEAN NOT NULL DEFAULT false,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Site settings table (key-value store for resume URL, etc.)
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Row-Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Public read access for projects and settings
CREATE POLICY "public_read_projects"
  ON projects FOR SELECT
  USING (true);

CREATE POLICY "public_read_settings"
  ON site_settings FOR SELECT
  USING (true);

-- Service role bypasses RLS automatically, so no extra write policies needed
-- when using the service role key in your API routes.

-- 4. Storage bucket
-- Go to Storage in Supabase dashboard → New bucket → name it "assets"
-- Set it to PUBLIC so screenshots and resume are downloadable.
-- Or run: INSERT INTO storage.buckets (id, name, public) VALUES ('assets', 'assets', true);
