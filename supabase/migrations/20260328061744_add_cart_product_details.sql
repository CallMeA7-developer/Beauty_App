/*
  # Add product details to cart table

  1. Changes
    - Add `product_name` column to cart table for quick access
    - Add `product_image` column to cart table for quick access

  2. Notes
    - These columns store denormalized data for performance
    - Avoids extra joins when displaying cart items
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'cart' AND column_name = 'product_name'
  ) THEN
    ALTER TABLE cart ADD COLUMN product_name text NOT NULL DEFAULT '';
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'cart' AND column_name = 'product_image'
  ) THEN
    ALTER TABLE cart ADD COLUMN product_image text NOT NULL DEFAULT '';
  END IF;
END $$;