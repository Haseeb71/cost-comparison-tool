-- Fix missing fields that the application needs
-- This script ensures all required fields exist in the database

-- Add overall_score field if it doesn't exist
ALTER TABLE tools ADD COLUMN IF NOT EXISTS overall_score DECIMAL(3,2) CHECK (overall_score >= 0 AND overall_score <= 5);

-- Add free_version field if it doesn't exist (for backward compatibility)
ALTER TABLE tools ADD COLUMN IF NOT EXISTS free_version BOOLEAN DEFAULT FALSE;

-- Add price field if it doesn't exist (for backward compatibility)
ALTER TABLE tools ADD COLUMN IF NOT EXISTS price DECIMAL(10,2);

-- Update free_version based on free_trial if it exists
UPDATE tools SET free_version = free_trial WHERE free_version IS NULL AND free_trial IS NOT NULL;

-- Update price based on starting_price if it exists
UPDATE tools SET price = starting_price WHERE price IS NULL AND starting_price IS NOT NULL;

-- Create a function to calculate overall_score if it doesn't exist
CREATE OR REPLACE FUNCTION calculate_overall_score()
RETURNS TRIGGER AS $$
BEGIN
  -- Calculate average of all rating fields, excluding NULL values
  NEW.overall_score = (
    COALESCE(NEW.rating, 0) +
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

-- Create trigger to automatically calculate overall_score if it doesn't exist
DROP TRIGGER IF EXISTS trigger_calculate_overall_score ON tools;
CREATE TRIGGER trigger_calculate_overall_score
  BEFORE INSERT OR UPDATE ON tools
  FOR EACH ROW
  EXECUTE FUNCTION calculate_overall_score();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_tools_overall_score ON tools(overall_score DESC);
CREATE INDEX IF NOT EXISTS idx_tools_rating ON tools(rating DESC);
CREATE INDEX IF NOT EXISTS idx_tools_free_version ON tools(free_version);
CREATE INDEX IF NOT EXISTS idx_tools_price ON tools(price);

-- Update existing tools with default values if needed
UPDATE tools SET 
  overall_score = COALESCE(overall_score, rating, 0),
  free_version = COALESCE(free_version, free_trial, false),
  price = COALESCE(price, starting_price, 0)
WHERE overall_score IS NULL OR free_version IS NULL OR price IS NULL;

-- Add comments for clarity
COMMENT ON COLUMN tools.overall_score IS 'Calculated average of all ratings or individual rating';
COMMENT ON COLUMN tools.free_version IS 'Whether the tool has a free version available';
COMMENT ON COLUMN tools.price IS 'Price in USD (for backward compatibility)';
