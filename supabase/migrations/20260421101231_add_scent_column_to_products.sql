/*
  # Add scent column to products table

  1. Changes
    - Adds `scent` text column to `products` table for body care and fragrance products
    - Used to store scent profile: Unscented, Floral, Citrus, Vanilla, Fresh
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'scent'
  ) THEN
    ALTER TABLE products ADD COLUMN scent text;
  END IF;
END $$;
