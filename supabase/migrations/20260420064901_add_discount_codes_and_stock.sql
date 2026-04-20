/*
  # Add Discount Codes Table and Product Stock Column

  1. New Tables
    - `discount_codes`
      - `id` (uuid, primary key)
      - `code` (text, unique) - the discount code string
      - `type` (text) - 'percentage' or 'fixed'
      - `value` (numeric) - discount amount
      - `minimum_order` (numeric) - minimum order value to apply
      - `max_uses` (integer, nullable) - null means unlimited
      - `uses_count` (integer) - how many times used
      - `expires_at` (timestamptz, nullable)
      - `is_active` (boolean)
      - `created_at` (timestamptz)

  2. Modified Tables
    - `products`: adds `stock` column (integer, default 100)

  3. Security
    - Enable RLS on discount_codes
    - Admin-only policy for full access
*/

CREATE TABLE IF NOT EXISTS discount_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE,
  type text NOT NULL DEFAULT 'percentage',
  value numeric NOT NULL DEFAULT 0,
  minimum_order numeric DEFAULT 0,
  max_uses integer DEFAULT null,
  uses_count integer DEFAULT 0,
  expires_at timestamptz DEFAULT null,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE discount_codes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can manage discount codes"
  ON discount_codes FOR ALL
  TO authenticated
  USING (
    (SELECT email FROM auth.users WHERE id = auth.uid()) = 'aradiyas18@gmail.com'
  )
  WITH CHECK (
    (SELECT email FROM auth.users WHERE id = auth.uid()) = 'aradiyas18@gmail.com'
  );

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'stock'
  ) THEN
    ALTER TABLE products ADD COLUMN stock integer DEFAULT 100;
  END IF;
END $$;
