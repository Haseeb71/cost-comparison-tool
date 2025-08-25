-- Add admin policies for authenticated users to perform CRUD operations

-- Admin policies for categories table
CREATE POLICY "Admin full access for categories" ON categories 
FOR ALL USING (true) WITH CHECK (true);

-- Admin policies for vendors table  
CREATE POLICY "Admin full access for vendors" ON vendors 
FOR ALL USING (true) WITH CHECK (true);

-- Admin policies for tools table
CREATE POLICY "Admin full access for tools" ON tools 
FOR ALL USING (true) WITH CHECK (true);

-- Admin policies for pricing_plans table
CREATE POLICY "Admin full access for pricing_plans" ON pricing_plans 
FOR ALL USING (true) WITH CHECK (true);

-- Admin policies for reviews table
CREATE POLICY "Admin full access for reviews" ON reviews 
FOR ALL USING (true) WITH CHECK (true);

-- Admin policies for comparisons table
CREATE POLICY "Admin full access for comparisons" ON comparisons 
FOR ALL USING (true) WITH CHECK (true);

-- Admin policies for affiliate_clicks table
CREATE POLICY "Admin full access for affiliate_clicks" ON affiliate_clicks 
FOR ALL USING (true) WITH CHECK (true);

-- Note: These policies will override the more restrictive public policies
-- for authenticated users, allowing full CRUD access to admin users
