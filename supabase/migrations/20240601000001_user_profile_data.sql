-- Create user_profiles table to store user-specific data
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  recipes_cooked INTEGER DEFAULT 0,
  favorite_recipes INTEGER DEFAULT 0,
  meal_plans INTEGER DEFAULT 0,
  day_streak INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create saved_recipes table to track user's saved recipes
CREATE TABLE IF NOT EXISTS saved_recipes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  recipe_id TEXT NOT NULL,
  title TEXT NOT NULL,
  cooking_time TEXT,
  calories INTEGER,
  diet_type TEXT,
  image TEXT,
  description TEXT,
  rating DECIMAL,
  difficulty TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, recipe_id)
);

-- Create cooking_history table to track user's cooking history
CREATE TABLE IF NOT EXISTS cooking_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  recipe_id TEXT NOT NULL,
  title TEXT NOT NULL,
  cooking_time TEXT,
  calories INTEGER,
  diet_type TEXT,
  image TEXT,
  description TEXT,
  rating DECIMAL,
  difficulty TEXT,
  cooked_on TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable realtime for these tables
alter publication supabase_realtime add table user_profiles;
alter publication supabase_realtime add table saved_recipes;
alter publication supabase_realtime add table cooking_history;

-- Create a function to create a user profile when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger to call the function when a new user is created
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create policies for user_profiles
DROP POLICY IF EXISTS "Users can view their own profile" ON user_profiles;
CREATE POLICY "Users can view their own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON user_profiles;
CREATE POLICY "Users can update their own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = id);

-- Create policies for saved_recipes
DROP POLICY IF EXISTS "Users can view their own saved recipes" ON saved_recipes;
CREATE POLICY "Users can view their own saved recipes"
  ON saved_recipes FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own saved recipes" ON saved_recipes;
CREATE POLICY "Users can insert their own saved recipes"
  ON saved_recipes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own saved recipes" ON saved_recipes;
CREATE POLICY "Users can delete their own saved recipes"
  ON saved_recipes FOR DELETE
  USING (auth.uid() = user_id);

-- Create policies for cooking_history
DROP POLICY IF EXISTS "Users can view their own cooking history" ON cooking_history;
CREATE POLICY "Users can view their own cooking history"
  ON cooking_history FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert into their own cooking history" ON cooking_history;
CREATE POLICY "Users can insert into their own cooking history"
  ON cooking_history FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE cooking_history ENABLE ROW LEVEL SECURITY;