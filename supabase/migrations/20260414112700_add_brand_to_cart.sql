/*
  # Add brand column to cart table

  Adds brand column for displaying brand information in cart.
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
