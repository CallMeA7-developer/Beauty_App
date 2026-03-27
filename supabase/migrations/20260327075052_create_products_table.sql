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