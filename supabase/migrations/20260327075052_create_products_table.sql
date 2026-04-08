/*
  # Create Products Table

  1. New Tables
    - `products`
      - `id` (text, primary key) - Unique product identifier (e.g., 'sk-001')
      - `name` (text, not null) - Product name
      - `brand` (text, not null) - Product brand
      - `category` (text, not null) - Main category (Serums, Cleansers, Face, Eyes, etc.)
      - `subcategory` (text, nullable) - Subcategory for additional classification
      - `description` (text, not null) - Product description
      - `price` (numeric, not null) - Product price as numeric value
      - `image_url` (text, not null) - Main product image URL
      - `rating` (numeric, not null) - Product rating (0-5)
      - `reviews_count` (integer, not null, default 0) - Number of reviews
      - `badge` (text, nullable) - Badge text (BESTSELLER, NEW, LIMITED, etc.)
      - `in_stock` (boolean, not null, default true) - Stock availability
      - `created_at` (timestamptz, default now()) - Creation timestamp

  2. Security
    - Enable RLS on `products` table
    - Add policy for public read access (products are publicly viewable)
    - Add policy for authenticated users to read products
*/

-- Create products table
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

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view products (public access)
CREATE POLICY "Anyone can view products"
  ON products
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand);
CREATE INDEX IF NOT EXISTS idx_products_rating ON products(rating DESC);
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);

-- Best Seller Products
INSERT INTO products (id, name, category, subcategory, brand, price, rating, image_url, description, skin_types, skin_concerns, ingredients)
VALUES
(
  gen_random_uuid()::text,
  'Luminous Youth Elixir',
  'Skincare',
  'Serums',
  'Shan Loray',
  198,
  4.9,
  'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&h=800&fit=crop',
  'A powerful anti-aging serum that restores luminosity and youthful radiance with every drop.',
  ARRAY['Dry', 'Mature', 'Combination'],
  ARRAY['Anti-Aging', 'Hydration', 'Brightness'],
  ARRAY['Retinol', 'Hyaluronic Acid', 'Vitamin C', 'Niacinamide']
),
(
  gen_random_uuid()::text,
  'Velvet Rose Lip Lacquer',
  'Makeup',
  'Lipstick',
  'Shan Loray',
  52,
  4.8,
  'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800&h=800&fit=crop',
  'A luxurious lip lacquer with a velvet finish that delivers rich color and long-lasting moisture.',
  ARRAY['All Tones'],
  ARRAY[]::text[],
  ARRAY[]::text[]
),
(
  gen_random_uuid()::text,
  'Supreme Radiance Cream',
  'Skincare',
  'Moisturizers',
  'Shan Loray',
  175,
  4.9,
  'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&h=800&fit=crop',
  'An ultra-rich moisturizer that delivers supreme hydration and a radiant, luminous complexion.',
  ARRAY['Dry', 'Sensitive', 'Mature'],
  ARRAY['Hydration', 'Anti-Aging', 'Redness Relief'],
  ARRAY['Hyaluronic Acid', 'Ceramides', 'Niacinamide']
),
(
  gen_random_uuid()::text,
  'Eye Renewal Complex',
  'Skincare',
  'Eye Care',
  'Shan Loray',
  145,
  4.8,
  'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800&h=800&fit=crop',
  'An advanced eye complex that targets dark circles, puffiness and fine lines for a refreshed look.',
  ARRAY['Dry', 'Mature', 'Sensitive'],
  ARRAY['Anti-Aging', 'Hydration', 'Dark Spots'],
  ARRAY['Retinol', 'Hyaluronic Acid', 'Vitamin C', 'Ceramides']
),
(
  gen_random_uuid()::text,
  'Botanical Night Serum',
  'Skincare',
  'Serums',
  'Shan Loray',
  165,
  4.9,
  'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&h=800&fit=crop',
  'A deeply restorative overnight serum infused with botanical extracts to repair and renew skin while you sleep.',
  ARRAY['Dry', 'Combination', 'Sensitive'],
  ARRAY['Anti-Aging', 'Hydration', 'Redness Relief'],
  ARRAY['Retinol', 'Hyaluronic Acid', 'Ceramides', 'Niacinamide']
);