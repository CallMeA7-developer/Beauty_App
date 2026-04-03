/*
  # Create payment_methods table

  1. New Tables
    - `payment_methods`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `card_holder_name` (text)
      - `card_last_four` (text) - only last 4 digits
      - `card_brand` (text) - Visa/Mastercard/Amex
      - `expiry_month` (text)
      - `expiry_year` (text)
      - `is_default` (boolean)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `payment_methods` table
    - Add policy for authenticated users to read their own payment methods
    - Add policy for authenticated users to insert their own payment methods
    - Add policy for authenticated users to update their own payment methods
    - Add policy for authenticated users to delete their own payment methods

  3. Important Notes
    - This table ONLY stores display information (last 4 digits)
    - Full card numbers are NEVER stored
    - This is NOT connected to payment processing
*/

CREATE TABLE IF NOT EXISTS payment_methods (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  card_holder_name text NOT NULL,
  card_last_four text NOT NULL,
  card_brand text NOT NULL,
  expiry_month text NOT NULL,
  expiry_year text NOT NULL,
  is_default boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE payment_methods ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own payment methods"
  ON payment_methods
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own payment methods"
  ON payment_methods
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own payment methods"
  ON payment_methods
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own payment methods"
  ON payment_methods
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
