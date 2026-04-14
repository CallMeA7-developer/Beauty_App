/*
  # Add product details to cart table

  Adds product_name and product_image columns for denormalized display data.
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
