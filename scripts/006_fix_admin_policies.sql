-- Fix admin policies to properly check admin status

-- First, drop the existing broad admin policies
DROP POLICY IF EXISTS "Admins can manage categories" ON categories;
DROP POLICY IF EXISTS "Admins can manage vendors" ON vendors;
DROP POLICY IF EXISTS "Admins can manage tools" ON tools;
DROP POLICY IF EXISTS "Admins can manage pricing plans" ON pricing_plans;
DROP POLICY IF EXISTS "Admins can manage reviews" ON reviews;
DROP POLICY IF EXISTS "Admins can manage comparisons" ON comparisons;
DROP POLICY IF EXISTS "Admins can view affiliate clicks" ON affiliate_clicks;

-- Create a function to check if user is an admin
CREATE OR REPLACE FUNCTION is_admin_user(user_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_profiles 
    WHERE id = user_id AND is_active = true
  );
END;
$$;

-- Create proper admin policies using the function
CREATE POLICY "Admin full access for categories" ON categories 
FOR ALL USING (is_admin_user(auth.uid())) WITH CHECK (is_admin_user(auth.uid()));

CREATE POLICY "Admin full access for vendors" ON vendors 
FOR ALL USING (is_admin_user(auth.uid())) WITH CHECK (is_admin_user(auth.uid()));

CREATE POLICY "Admin full access for tools" ON tools 
FOR ALL USING (is_admin_user(auth.uid())) WITH CHECK (is_admin_user(auth.uid()));

CREATE POLICY "Admin full access for pricing_plans" ON pricing_plans 
FOR ALL USING (is_admin_user(auth.uid())) WITH CHECK (is_admin_user(auth.uid()));

CREATE POLICY "Admin full access for reviews" ON reviews 
FOR ALL USING (is_admin_user(auth.uid())) WITH CHECK (is_admin_user(auth.uid()));

CREATE POLICY "Admin full access for comparisons" ON comparisons 
FOR ALL USING (is_admin_user(auth.uid())) WITH CHECK (is_admin_user(auth.uid()));

CREATE POLICY "Admin full access for affiliate_clicks" ON affiliate_clicks 
FOR ALL USING (is_admin_user(auth.uid())) WITH CHECK (is_admin_user(auth.uid()));

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION is_admin_user(UUID) TO authenticated;
