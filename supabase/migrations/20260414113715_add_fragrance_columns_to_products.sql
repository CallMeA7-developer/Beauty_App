/*
  # Add Fragrance-specific Columns to Products

  Adds fragrance_family, top_notes, intensity, and size columns to support
  fragrance product data that exists in the full product catalog.
*/

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'fragrance_family') THEN
    ALTER TABLE products ADD COLUMN fragrance_family text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'top_notes') THEN
    ALTER TABLE products ADD COLUMN top_notes text[];
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'intensity') THEN
    ALTER TABLE products ADD COLUMN intensity text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'size') THEN
    ALTER TABLE products ADD COLUMN size text;
  END IF;
END $$;
