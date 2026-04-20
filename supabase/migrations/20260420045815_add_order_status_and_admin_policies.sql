/*
  # Add Order Status Column and Admin Policies

  1. Changes
    - Add `status` column to orders table (pending, processing, shipped, delivered, cancelled)

  2. Security
    - Add SELECT policy on orders for admin email (aradiyas18@gmail.com)
    - Add UPDATE policy on orders for admin email
    - Add SELECT policy on profiles for admin
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'orders' AND column_name = 'status'
  ) THEN
    ALTER TABLE orders ADD COLUMN status text NOT NULL DEFAULT 'pending';
  END IF;
END $$;

CREATE POLICY "Admin can view all orders"
  ON orders FOR SELECT
  TO authenticated
  USING (
    (SELECT email FROM auth.users WHERE id = auth.uid()) = 'aradiyas18@gmail.com'
    OR auth.uid() = user_id
  );

CREATE POLICY "Admin can update all orders"
  ON orders FOR UPDATE
  TO authenticated
  USING (
    (SELECT email FROM auth.users WHERE id = auth.uid()) = 'aradiyas18@gmail.com'
  )
  WITH CHECK (
    (SELECT email FROM auth.users WHERE id = auth.uid()) = 'aradiyas18@gmail.com'
  );

CREATE POLICY "Admin can insert orders"
  ON orders FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admin can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (
    auth.uid() = user_id
    OR (SELECT email FROM auth.users WHERE id = auth.uid()) = 'aradiyas18@gmail.com'
  );
