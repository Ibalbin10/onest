-- Sample data for Onest Phase 1 MVP
-- Run this in Supabase SQL Editor after running schema.sql

-- Get category IDs (we'll need these for the activities)
DO $$
DECLARE
  healthy_id uuid;
  culinary_id uuid;
  gaming_id uuid;
  books_id uuid;
  creative_id uuid;
  fandom_id uuid;
  cultural_id uuid;
BEGIN
  SELECT id INTO healthy_id FROM categories WHERE slug = 'healthy-hangouts';
  SELECT id INTO culinary_id FROM categories WHERE slug = 'culinary-circles';
  SELECT id INTO gaming_id FROM categories WHERE slug = 'game-based-gatherings';
  SELECT id INTO books_id FROM categories WHERE slug = 'book-arts-circles';
  SELECT id INTO creative_id FROM categories WHERE slug = 'creative-classes';
  SELECT id INTO fandom_id FROM categories WHERE slug = 'fandom-festivities';
  SELECT id INTO cultural_id FROM categories WHERE slug = 'cultural-exploration';

  -- Insert sample communities
  INSERT INTO communities (id, name, description, instagram_url, status) VALUES
    (gen_random_uuid(), 'Madrid Running Crew', 'A friendly running community for all levels. Meet every Sunday morning in Retiro Park.', 'https://instagram.com/madridrunners', 'vetted'),
    (gen_random_uuid(), 'Brunch Club Madrid', 'Exploring the best brunch spots in Madrid while making new friends.', 'https://instagram.com/brunchclubmad', 'vetted'),
    (gen_random_uuid(), 'Board Game Nights', 'Weekly board game meetups at local cafes. Bring your favorite games or try new ones.', 'https://instagram.com/madridboardgames', 'vetted'),
    (gen_random_uuid(), 'Madrid Book Circle', 'Monthly book discussions over coffee. All genres welcome.', 'https://instagram.com/madridbookclub', 'vetted'),
    (gen_random_uuid(), 'Pottery & Paint', 'Creative workshops for beginners and enthusiasts.', 'https://instagram.com/potterypaint', 'vetted'),
    (gen_random_uuid(), 'Film Discussion Group', 'Weekly film screenings followed by discussions at local cinema.', 'https://instagram.com/madridfilm', 'vetted'),
    (gen_random_uuid(), 'Museum Walks', 'Guided tours of Madrid museums and galleries.', 'https://instagram.com/museumwalksmad', 'vetted');

  -- Insert sample activities
  INSERT INTO activities (community_id, category_id, name, description, cadence, location, status)
  SELECT c.id, healthy_id, 'Sunday Morning Run', 'Casual 5K run followed by coffee. All paces welcome. We meet at the Retiro Park main entrance.', 'Weekly', 'Retiro Park', 'vetted'
  FROM communities c WHERE c.name = 'Madrid Running Crew';

  INSERT INTO activities (community_id, category_id, name, description, cadence, location, status)
  SELECT c.id, culinary_id, 'Weekend Brunch Meetup', 'Discover new brunch spots together. We rotate locations each week to explore different neighborhoods.', 'Weekly', 'Various Madrid neighborhoods', 'vetted'
  FROM communities c WHERE c.name = 'Brunch Club Madrid';

  INSERT INTO activities (community_id, category_id, name, description, cadence, location, status)
  SELECT c.id, gaming_id, 'Wednesday Game Night', 'Bring your favorite board games or try something new. From strategy games to party games, all welcome.', 'Weekly', 'Cafe Moderno, Malasana', 'vetted'
  FROM communities c WHERE c.name = 'Board Game Nights';

  INSERT INTO activities (community_id, category_id, name, description, cadence, location, status)
  SELECT c.id, books_id, 'Monthly Book Discussion', 'Deep dive into contemporary fiction. Book announced two weeks in advance. Coffee and snacks provided.', 'Monthly', 'Library Cafe, Chamberi', 'vetted'
  FROM communities c WHERE c.name = 'Madrid Book Circle';

  INSERT INTO activities (community_id, category_id, name, description, cadence, location, status)
  SELECT c.id, creative_id, 'Pottery Workshop', 'Learn pottery basics in a relaxed environment. All materials provided. Perfect for beginners.', 'Weekly', 'Art Studio, Lavapies', 'vetted'
  FROM communities c WHERE c.name = 'Pottery & Paint';

  INSERT INTO activities (community_id, category_id, name, description, cadence, location, status)
  SELECT c.id, fandom_id, 'Film Night & Discussion', 'Watch classic and contemporary films followed by group discussion. Snacks and drinks available.', 'Weekly', 'Cine Estudio, Centro', 'vetted'
  FROM communities c WHERE c.name = 'Film Discussion Group';

  INSERT INTO activities (community_id, category_id, name, description, cadence, location, status)
  SELECT c.id, cultural_id, 'Sunday Museum Tour', 'Guided tours of Madrid top museums. Learn about art history while meeting culture enthusiasts.', 'Weekly', 'Various Madrid museums', 'vetted'
  FROM communities c WHERE c.name = 'Museum Walks';

END $$;
