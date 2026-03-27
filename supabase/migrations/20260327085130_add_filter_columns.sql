/*
  # Add Filter Columns for Products

  ## New Columns
  
  1. Adds the following columns to products table:
    - `skin_types` (text array) - skin types the product is suitable for (e.g., ['Dry', 'Sensitive'])
    - `skin_concerns` (text array) - skin concerns the product addresses (e.g., ['Anti-Aging', 'Hydration'])
    - `ingredients` (text array) - key ingredients in the product (e.g., ['Retinol', 'Hyaluronic Acid'])
  
  ## Notes
  - Using arrays allows products to have multiple values for each filter
  - Existing products will have NULL values which can be updated as needed
*/

-- Add filter columns to products table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'skin_types'
  ) THEN
    ALTER TABLE products ADD COLUMN skin_types text[];
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'skin_concerns'
  ) THEN
    ALTER TABLE products ADD COLUMN skin_concerns text[];
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'ingredients'
  ) THEN
    ALTER TABLE products ADD COLUMN ingredients text[];
  END IF;
END $$;