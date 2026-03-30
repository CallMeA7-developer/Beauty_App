/*
  # Create wishlist table

  1. New Tables
    - `wishlist`
      - `id` (uuid, primary key) - Unique identifier for wishlist item
      - `user_id` (uuid, foreign key) - Reference to auth.users
      - `product_id` (uuid, foreign key) - Reference to products table
      - `created_at` (timestamptz) - Timestamp when item was added to wishlist
  
  2. Security
    - Enable RLS on `wishlist` table
    - Add policy for users to read their own wishlist items
    - Add policy for users to insert their own wishlist items
    - Add policy for users to delete their own wishlist items
  
  3. Indexes
    - Add index on user_id for faster queries
    - Add unique constraint on (user_id, product_id) to prevent duplicates
*/

CREATE TABLE IF NOT EXISTS wishlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, product_id)
);

CREATE INDEX IF NOT EXISTS idx_wishlist_user_id ON wishlist(user_id);
CREATE INDEX IF NOT EXISTS idx_wishlist_product_id ON wishlist(product_id);

ALTER TABLE wishlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own wishlist"
  ON wishlist
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can add to own wishlist"
  ON wishlist
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove from own wishlist"
  ON wishlist
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);