-- Update tools table with new schema
-- This script updates the existing tools table to match the new requirements

-- First, add the new columns
ALTER TABLE tools ADD COLUMN IF NOT EXISTS best_for TEXT;
ALTER TABLE tools ADD COLUMN IF NOT EXISTS price DECIMAL(10,2);
ALTER TABLE tools ADD COLUMN IF NOT EXISTS free_version BOOLEAN DEFAULT FALSE;
ALTER TABLE tools ADD COLUMN IF NOT EXISTS pricing_value INTEGER CHECK (pricing_value >= 1 AND pricing_value <= 5);
ALTER TABLE tools ADD COLUMN IF NOT EXISTS ease_of_use INTEGER CHECK (ease_of_use >= 1 AND ease_of_use <= 5);
ALTER TABLE tools ADD COLUMN IF NOT EXISTS features_rating INTEGER CHECK (features_rating >= 1 AND features_rating <= 5);
ALTER TABLE tools ADD COLUMN IF NOT EXISTS support_docs INTEGER CHECK (support_docs >= 1 AND support_docs <= 5);
ALTER TABLE tools ADD COLUMN IF NOT EXISTS reliability INTEGER CHECK (reliability >= 1 AND reliability <= 5);
ALTER TABLE tools ADD COLUMN IF NOT EXISTS integrations_rating INTEGER CHECK (integrations_rating >= 1 AND integrations_rating <= 5);
ALTER TABLE tools ADD COLUMN IF NOT EXISTS overall_score DECIMAL(3,2) CHECK (overall_score >= 0 AND overall_score <= 5);
ALTER TABLE tools ADD COLUMN IF NOT EXISTS notes TEXT;

-- Rename existing features column to avoid conflict
ALTER TABLE tools RENAME COLUMN features TO features_list;

-- Create a function to calculate overall_score
CREATE OR REPLACE FUNCTION calculate_overall_score()
RETURNS TRIGGER AS $$
BEGIN
  -- Calculate average of all rating fields, excluding NULL values
  NEW.overall_score = (
    COALESCE(NEW.pricing_value, 0) +
    COALESCE(NEW.ease_of_use, 0) +
    COALESCE(NEW.features_rating, 0) +
    COALESCE(NEW.support_docs, 0) +
    COALESCE(NEW.reliability, 0) +
    COALESCE(NEW.integrations_rating, 0)
  ) / 6.0;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically calculate overall_score
DROP TRIGGER IF EXISTS trigger_calculate_overall_score ON tools;
CREATE TRIGGER trigger_calculate_overall_score
  BEFORE INSERT OR UPDATE ON tools
  FOR EACH ROW
  EXECUTE FUNCTION calculate_overall_score();

-- Update existing tools with sample data (optional - for testing)
-- UPDATE tools SET 
--   best_for = 'General AI tasks',
--   price = 29.99,
--   free_version = true,
--   pricing_value = 4,
--   ease_of_use = 4,
--   features_rating = 4,
--   support_docs = 3,
--   reliability = 4,
--   integrations_rating = 3,
--   notes = 'Popular AI tool with good features'
-- WHERE id IN (SELECT id FROM tools LIMIT 5);

-- Create indexes for better performance on new fields
CREATE INDEX IF NOT EXISTS idx_tools_overall_score ON tools(overall_score DESC);
CREATE INDEX IF NOT EXISTS idx_tools_price ON tools(price);
CREATE INDEX IF NOT EXISTS idx_tools_free_version ON tools(free_version);
CREATE INDEX IF NOT EXISTS idx_tools_best_for ON tools USING gin(to_tsvector('english', best_for));

-- Update the tools table comment
COMMENT ON TABLE tools IS 'AI Tools with comprehensive rating system and pricing information';
COMMENT ON COLUMN tools.best_for IS 'Best use case or target audience for this tool';
COMMENT ON COLUMN tools.price IS 'Price in USD';
COMMENT ON COLUMN tools.free_version IS 'Whether the tool has a free version available';
COMMENT ON COLUMN tools.pricing_value IS 'Rating for pricing/value (1-5)';
COMMENT ON COLUMN tools.ease_of_use IS 'Rating for ease of use (1-5)';
COMMENT ON COLUMN tools.features_rating IS 'Rating for features (1-5)';
COMMENT ON COLUMN tools.support_docs IS 'Rating for support and documentation (1-5)';
COMMENT ON COLUMN tools.reliability IS 'Rating for reliability (1-5)';
COMMENT ON COLUMN tools.integrations_rating IS 'Rating for integrations (1-5)';
COMMENT ON COLUMN tools.overall_score IS 'Calculated average of all ratings';
COMMENT ON COLUMN tools.notes IS 'Additional notes about the tool';
