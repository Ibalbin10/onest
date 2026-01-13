-- Onest Phase 1 Database Schema
-- Execute this in Supabase SQL Editor

-- =============================================================================
-- 1. CREATE TABLES
-- =============================================================================

-- Categories: Fixed 8-category taxonomy
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  emoji TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Communities: Host/community entities
CREATE TABLE IF NOT EXISTS communities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  instagram_url TEXT,
  website_url TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'vetted')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Activities: Repeatable events/gatherings
CREATE TABLE IF NOT EXISTS activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id UUID NOT NULL REFERENCES communities(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  name TEXT NOT NULL,
  description TEXT,
  cadence TEXT, -- "Weekly", "Monthly", etc.
  location TEXT, -- Neighborhood or city area
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'vetted')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Engagement Events: Click-through tracking
CREATE TABLE IF NOT EXISTS engagement_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  activity_id UUID NOT NULL REFERENCES activities(id) ON DELETE CASCADE,
  destination_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Host Submissions: Intake form data
CREATE TABLE IF NOT EXISTS host_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  host_name TEXT NOT NULL,
  email TEXT NOT NULL,
  community_name TEXT NOT NULL,
  role TEXT,
  instagram_url TEXT,
  category_slug TEXT,
  city TEXT,
  description TEXT,
  avg_attendance INT,
  brand_ready BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'vetted', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- =============================================================================
-- 2. CREATE INDEXES
-- =============================================================================

-- Activities: Optimize filtering by category and status
CREATE INDEX IF NOT EXISTS idx_activities_category_status
  ON activities(category_id, status);

-- Activities: Optimize sorting by date
CREATE INDEX IF NOT EXISTS idx_activities_created_at
  ON activities(created_at DESC);

-- Engagement Events: Optimize analytics queries
CREATE INDEX IF NOT EXISTS idx_engagement_activity_date
  ON engagement_events(activity_id, created_at DESC);

-- Host Submissions: Optimize admin review
CREATE INDEX IF NOT EXISTS idx_host_submissions_status
  ON host_submissions(status, created_at DESC);

-- =============================================================================
-- 3. ENABLE ROW LEVEL SECURITY
-- =============================================================================

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE communities ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE engagement_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE host_submissions ENABLE ROW LEVEL SECURITY;

-- =============================================================================
-- 4. CREATE RLS POLICIES
-- =============================================================================

-- Categories: Public read access (everyone can view all categories)
CREATE POLICY "Public read categories" ON categories
  FOR SELECT USING (true);

-- Communities: Public read vetted only
CREATE POLICY "Public read vetted communities" ON communities
  FOR SELECT USING (status = 'vetted');

-- Activities: Public read vetted only
CREATE POLICY "Public read vetted activities" ON activities
  FOR SELECT USING (status = 'vetted');

-- Engagement Events: Insert-only for public (no read access)
CREATE POLICY "Public insert engagement" ON engagement_events
  FOR INSERT WITH CHECK (true);

-- Host Submissions: Insert-only for public (no read access)
CREATE POLICY "Public insert submissions" ON host_submissions
  FOR INSERT WITH CHECK (true);

-- =============================================================================
-- 5. SEED CATEGORIES
-- =============================================================================

INSERT INTO categories (name, emoji, slug) VALUES
  ('Healthy Hangouts', '🏃', 'healthy-hangouts'),
  ('Culinary Circles', '🍽️', 'culinary-circles'),
  ('Game-Based Gatherings', '♟️', 'game-based-gatherings'),
  ('Book & Arts Circles', '📚', 'book-arts-circles'),
  ('Creative Classes', '🎨', 'creative-classes'),
  ('Fandom Festivities', '🎬', 'fandom-festivities'),
  ('Cultural Exploration', '🏛️', 'cultural-exploration'),
  ('Other', '🔍', 'other')
ON CONFLICT (slug) DO NOTHING;

-- =============================================================================
-- VERIFICATION QUERIES
-- =============================================================================

-- Verify categories were seeded
-- SELECT * FROM categories ORDER BY name;

-- Test RLS: This should work with anon key (returns only vetted activities)
-- SELECT * FROM activities WHERE status = 'vetted';

-- Test RLS: This should fail with anon key (no access to pending activities)
-- SELECT * FROM activities WHERE status = 'pending';
