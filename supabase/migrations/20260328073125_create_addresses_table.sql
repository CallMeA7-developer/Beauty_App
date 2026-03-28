/*
  # Create addresses table

  1. New Tables
    - `addresses`
      - `id` (uuid, primary key) - Unique identifier for each address
      - `user_id` (uuid, foreign key) - References auth.users
      - `label` (text) - Address label (e.g., "Home", "Work", "Office")
      - `full_name` (text) - Recipient's full name
      - `street` (text) - Street address including apartment/suite
      - `city` (text) - City name
      - `state` (text) - State or province
      - `postal_code` (text) - Postal/ZIP code
      - `country` (text) - Country name
      - `phone` (text) - Contact phone number
      - `is_default` (boolean) - Whether this is the default address
      - `created_at` (timestamptz) - Timestamp when address was created
      - `updated_at` (timestamptz) - Timestamp when address was last updated

  2. Security
    - Enable RLS on `addresses` table
    - Add policy for users to read their own addresses
    - Add policy for users to insert their own addresses
    - Add policy for users to update their own addresses
    - Add policy for users to delete their own addresses
*/

CREATE TABLE IF NOT EXISTS addresses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  label text NOT NULL DEFAULT 'Home',
  full_name text NOT NULL,
  street text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  postal_code text NOT NULL,
  country text NOT NULL DEFAULT 'United States',
  phone text NOT NULL,
  is_default boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own addresses"
  ON addresses
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own addresses"
  ON addresses
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own addresses"
  ON addresses
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own addresses"
  ON addresses
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_addresses_user_id ON addresses(user_id);
CREATE INDEX IF NOT EXISTS idx_addresses_is_default ON addresses(user_id, is_default);
