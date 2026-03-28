/*
  # Create orders table for storing completed purchases

  1. New Tables
    - `orders`
      - `id` (uuid, primary key) - Unique order identifier
      - `user_id` (uuid) - Reference to the user who placed the order
      - `items` (jsonb) - Array of order items with product details
      - `subtotal` (decimal) - Sum of all item prices
      - `shipping` (decimal) - Shipping cost
      - `tax` (decimal) - Tax amount (10% of subtotal)
      - `total` (decimal) - Final total (subtotal + shipping + tax)
      - `shipping_address` (jsonb) - Delivery address details
      - `delivery_method` (text) - Selected delivery method
      - `payment_status` (text) - Payment status (paid, pending, failed)
      - `payment_intent_id` (text) - Stripe Payment Intent ID
      - `created_at` (timestamptz) - Order creation timestamp

  2. Security
    - Enable RLS on `orders` table
    - Add policy for users to view their own orders
    - Add policy for users to create their own orders
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
  ON orders
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own orders"
  ON orders
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);