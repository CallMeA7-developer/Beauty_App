/*
  # Create Products Table

  1. New Tables
    - `products`
      - `id` (text, primary key)
      - `name` (text, not null)
      - `brand` (text, not null, default 'Shan Loray')
      - `category` (text, not null)
      - `subcategory` (text, nullable)
      - `description` (text, not null)
      - `price` (numeric, not null)
      - `image_url` (text, not null)
      - `rating` (numeric, not null, default 0)
      - `reviews_count` (integer, not null, default 0)
      - `badge` (text, nullable)
      - `in_stock` (boolean, not null, default true)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `products` table
    - Add policy for public read access (anon and authenticated)
*/

CREATE TABLE IF NOT EXISTS products (
  id text PRIMARY KEY,
  name text NOT NULL,
  brand text NOT NULL DEFAULT 'Shan Loray',
  category text NOT NULL,
  subcategory text,
  description text NOT NULL,
  price numeric NOT NULL CHECK (price >= 0),
  image_url text NOT NULL,
  rating numeric NOT NULL DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  reviews_count integer NOT NULL DEFAULT 0 CHECK (reviews_count >= 0),
  badge text,
  in_stock boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view products"
  ON products
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand);
CREATE INDEX IF NOT EXISTS idx_products_rating ON products(rating DESC);
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);
