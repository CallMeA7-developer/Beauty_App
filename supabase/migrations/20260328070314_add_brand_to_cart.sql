/*
  # Add brand column to cart table

  1. Changes
    - Add `brand` column to cart table for displaying brand information
    - Set default value to 'Shan Loray' to match products table default

  2. Notes
    - This denormalized field helps avoid extra joins when displaying cart items
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'cart' AND column_name = 'brand'
  ) THEN
    ALTER TABLE cart ADD COLUMN brand text NOT NULL DEFAULT 'Shan Loray';
  END IF;
END $$;