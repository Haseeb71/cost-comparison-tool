-- Create affiliate conversions table for tracking successful conversions

CREATE TABLE IF NOT EXISTS affiliate_conversions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  click_id UUID REFERENCES affiliate_clicks(id) ON DELETE CASCADE,
  tool_id UUID REFERENCES tools(id) ON DELETE CASCADE,
  session_id TEXT NOT NULL,
  conversion_type TEXT CHECK (conversion_type IN ('signup', 'trial', 'purchase', 'subscription')) NOT NULL,
  conversion_value DECIMAL(10,2) DEFAULT 0,
  commission_amount DECIMAL(10,2) DEFAULT 0,
  metadata JSONB DEFAULT '{}',
  converted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_affiliate_conversions_click ON affiliate_conversions(click_id);
CREATE INDEX IF NOT EXISTS idx_affiliate_conversions_tool ON affiliate_conversions(tool_id);
CREATE INDEX IF NOT EXISTS idx_affiliate_conversions_session ON affiliate_conversions(session_id);
CREATE INDEX IF NOT EXISTS idx_affiliate_conversions_date ON affiliate_conversions(converted_at);
CREATE INDEX IF NOT EXISTS idx_affiliate_conversions_type ON affiliate_conversions(conversion_type);

-- Add session_id to affiliate_clicks table if not exists
ALTER TABLE affiliate_clicks ADD COLUMN IF NOT EXISTS session_id TEXT;
ALTER TABLE affiliate_clicks ADD COLUMN IF NOT EXISTS utm_term TEXT;
ALTER TABLE affiliate_clicks ADD COLUMN IF NOT EXISTS utm_content TEXT;
ALTER TABLE affiliate_clicks ADD COLUMN IF NOT EXISTS country TEXT;
ALTER TABLE affiliate_clicks ADD COLUMN IF NOT EXISTS device TEXT;
ALTER TABLE affiliate_clicks ADD COLUMN IF NOT EXISTS browser TEXT;
ALTER TABLE affiliate_clicks ADD COLUMN IF NOT EXISTS os TEXT;

-- Create index for session_id
CREATE INDEX IF NOT EXISTS idx_affiliate_clicks_session ON affiliate_clicks(session_id);

-- Enable RLS for affiliate conversions
ALTER TABLE affiliate_conversions ENABLE ROW LEVEL SECURITY;

-- Admin policies for affiliate conversions
CREATE POLICY "Admins can view all conversions" ON affiliate_conversions FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Public can track conversions" ON affiliate_conversions FOR INSERT WITH CHECK (true);
