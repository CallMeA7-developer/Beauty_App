/*
  # Create orders table

  Stores completed purchase orders with items, pricing, and shipping details.
  RLS ensures users only access their own orders.
*/

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  subtotal decimal(10,2) NOT NULL DEFAULT 0,
  shipping decimal(10,2) NOT NULL DEFAULT 0,
  tax decimal(10,2) NOT NULL DEFAULT 0,
  total decimal(10,2) NOT NULL DEFAULT 0,
  shipping_address jsonb NOT NULL DEFAULT '{}'::jsonb,
  delivery_method text NOT NULL DEFAULT '',
  payment_status text NOT NULL DEFAULT 'pending',
  payment_intent_id text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own orders"
  ON orders FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);
