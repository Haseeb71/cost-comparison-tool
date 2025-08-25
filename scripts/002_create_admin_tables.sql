-- Admin user management tables

-- Admin profiles table
CREATE TABLE IF NOT EXISTS admin_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT CHECK (role IN ('admin', 'editor', 'moderator')) DEFAULT 'editor',
  is_active BOOLEAN DEFAULT TRUE,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for admin profiles
ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;

-- Admin policies - only authenticated admins can access
CREATE POLICY "Admins can view all profiles" ON admin_profiles FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Admins can insert own profile" ON admin_profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Admins can update own profile" ON admin_profiles FOR UPDATE USING (auth.uid() = id);

-- Admin policies for managing content
CREATE POLICY "Admins can manage categories" ON categories FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Admins can manage vendors" ON vendors FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Admins can manage tools" ON tools FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Admins can manage pricing plans" ON pricing_plans FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Admins can manage reviews" ON reviews FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Admins can manage comparisons" ON comparisons FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Admins can view affiliate clicks" ON affiliate_clicks FOR SELECT USING (auth.uid() IS NOT NULL);

-- Function to auto-create admin profile on signup
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

-- Trigger to create admin profile on user creation
DROP TRIGGER IF EXISTS on_auth_admin_user_created ON auth.users;
CREATE TRIGGER on_auth_admin_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_admin_user();
