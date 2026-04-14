/*
  # Add Filter Columns for Products

  Adds skin_types, skin_concerns, and ingredients array columns to products table.
*/

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
