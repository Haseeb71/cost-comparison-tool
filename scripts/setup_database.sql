-- Complete database setup for AI Tools Comparison Admin System
-- Run this in your Supabase SQL Editor

-- 1. Create core tables first
-- Categories table for organizing tools
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Vendors/Companies table
CREATE TABLE IF NOT EXISTS vendors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  website_url TEXT,
  logo_url TEXT,
  founded_year INTEGER,
  headquarters TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI Tools table
CREATE TABLE IF NOT EXISTS tools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  short_description TEXT,
  logo_url TEXT,
  website_url TEXT,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  vendor_id UUID REFERENCES vendors(id) ON DELETE SET NULL,
  pricing_model TEXT CHECK (pricing_model IN ('free', 'freemium', 'paid', 'enterprise')),
  starting_price DECIMAL(10,2),
  pricing_currency TEXT DEFAULT 'USD',
  pricing_period TEXT CHECK (pricing_period IN ('one-time', 'monthly', 'yearly')),
  features JSONB DEFAULT '[]',
  use_cases JSONB DEFAULT '[]',
  integrations JSONB DEFAULT '[]',
  supported_platforms JSONB DEFAULT '[]',
  api_available BOOLEAN DEFAULT FALSE,
  free_trial BOOLEAN DEFAULT FALSE,
  trial_days INTEGER,
  rating DECIMAL(3,2) CHECK (rating >= 0 AND rating <= 5),
  review_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT TRUE,
  affiliate_url TEXT,
  affiliate_commission DECIMAL(5,2),
  meta_title TEXT,
  meta_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Pricing plans table for detailed pricing
CREATE TABLE IF NOT EXISTS pricing_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id UUID REFERENCES tools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  price DECIMAL(10,2),
  currency TEXT DEFAULT 'USD',
  billing_period TEXT CHECK (billing_period IN ('monthly', 'yearly', 'one-time')),
  features JSONB DEFAULT '[]',
  limits JSONB DEFAULT '{}',
  is_popular BOOLEAN DEFAULT FALSE,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id UUID REFERENCES tools(id) ON DELETE CASCADE,
  user_name TEXT,
  user_email TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  content TEXT,
  pros JSONB DEFAULT '[]',
  cons JSONB DEFAULT '[]',
  is_verified BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT FALSE,
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Comparisons table for saved comparisons
CREATE TABLE IF NOT EXISTS comparisons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  tool_ids JSONB NOT NULL DEFAULT '[]',
  is_published BOOLEAN DEFAULT TRUE,
  view_count INTEGER DEFAULT 0,
  meta_title TEXT,
  meta_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Affiliate clicks tracking
CREATE TABLE IF NOT EXISTS affiliate_clicks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id UUID REFERENCES tools(id) ON DELETE CASCADE,
  user_ip TEXT,
  user_agent TEXT,
  referrer TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  clicked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create admin profiles table
CREATE TABLE IF NOT EXISTS admin_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT CHECK (role IN ('admin', 'editor', 'moderator')) DEFAULT 'admin',
  is_active BOOLEAN DEFAULT TRUE,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create affiliate conversions table
CREATE TABLE IF NOT EXISTS affiliate_conversions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id UUID REFERENCES tools(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  conversion_type TEXT CHECK (conversion_type IN ('purchase', 'signup', 'trial', 'demo')),
  conversion_value DECIMAL(10,2),
  currency TEXT DEFAULT 'USD',
  commission_amount DECIMAL(10,2),
  status TEXT CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
  conversion_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  tracking_data JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_tools_category ON tools(category_id);
CREATE INDEX IF NOT EXISTS idx_tools_vendor ON tools(vendor_id);
CREATE INDEX IF NOT EXISTS idx_tools_slug ON tools(slug);
CREATE INDEX IF NOT EXISTS idx_tools_published ON tools(is_published);
CREATE INDEX IF NOT EXISTS idx_tools_featured ON tools(is_featured);
CREATE INDEX IF NOT EXISTS idx_reviews_tool ON reviews(tool_id);
CREATE INDEX IF NOT EXISTS idx_reviews_published ON reviews(is_published);
CREATE INDEX IF NOT EXISTS idx_pricing_plans_tool ON pricing_plans(tool_id);
CREATE INDEX IF NOT EXISTS idx_affiliate_clicks_tool ON affiliate_clicks(tool_id);
CREATE INDEX IF NOT EXISTS idx_affiliate_clicks_date ON affiliate_clicks(clicked_at);
CREATE INDEX IF NOT EXISTS idx_affiliate_conversions_tool ON affiliate_conversions(tool_id);
CREATE INDEX IF NOT EXISTS idx_affiliate_conversions_user ON affiliate_conversions(user_id);
CREATE INDEX IF NOT EXISTS idx_affiliate_conversions_status ON affiliate_conversions(status);

-- 5. Enable Row Level Security (RLS) for public access
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE comparisons ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_conversions ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;

-- 6. Create public read access policies (no auth required for public site)
CREATE POLICY "Public read access for categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read access for vendors" ON vendors FOR SELECT USING (true);
CREATE POLICY "Public read access for published tools" ON tools FOR SELECT USING (is_published = true);
CREATE POLICY "Public read access for pricing plans" ON pricing_plans FOR SELECT USING (true);
CREATE POLICY "Public read access for published reviews" ON reviews FOR SELECT USING (is_published = true);
CREATE POLICY "Public read access for published comparisons" ON comparisons FOR SELECT USING (is_published = true);

-- Allow public to submit reviews (will be moderated)
CREATE POLICY "Public can submit reviews" ON reviews FOR INSERT WITH CHECK (true);

-- Allow affiliate click tracking
CREATE POLICY "Public can track affiliate clicks" ON affiliate_clicks FOR INSERT WITH CHECK (true);

-- 7. Create admin policies
CREATE POLICY "Admins can view all profiles" ON admin_profiles FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Admins can insert own profile" ON admin_profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Admins can update own profile" ON admin_profiles FOR UPDATE USING (auth.uid() = id);

-- 8. Create function to auto-create admin profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_admin_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.admin_profiles (id, email, full_name)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data ->> 'full_name', new.email)
  )
  ON CONFLICT (id) DO NOTHING;
  
  RETURN new;
END;
$$;

-- 9. Create trigger to auto-create admin profile
DROP TRIGGER IF EXISTS on_auth_admin_user_created ON auth.users;
CREATE TRIGGER on_auth_admin_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_admin_user();

-- 10. Create admin profile for existing user (if you already have an admin user)
-- Replace 'your-admin-user-id-here' with your actual user ID from auth.users
-- You can find this in Supabase Auth > Users
INSERT INTO admin_profiles (id, email, full_name, role, is_active)
SELECT 
  id, 
  email, 
  COALESCE(raw_user_meta_data->>'full_name', email) as full_name,
  'admin' as role,
  true as is_active
FROM auth.users 
WHERE email = 'admin@gmail.com'
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  is_active = EXCLUDED.is_active;

-- 11. Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON admin_profiles TO authenticated;
GRANT ALL ON affiliate_conversions TO authenticated;

-- 12. Insert sample data (optional - uncomment if you want sample data)
-- You can run the 003_seed_sample_data.sql script separately if needed
