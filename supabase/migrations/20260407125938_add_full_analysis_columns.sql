/*
  # Add Full Analysis Data Columns to skin_analysis Table

  1. Changes
    - Add `skin_label` column to store the skin quality label (e.g., "Excellent", "Good")
    - Add `selected_skin_type` column to store user's selected skin type
    - Add `selected_concern` column to store user's primary concern
    - Add `selected_specific_concerns` array column to store specific concerns
    - Add `morning_product_ids` array column to store recommended morning routine product IDs
    - Add `evening_product_ids` array column to store recommended evening routine product IDs
    - Add `targeted_product_ids` array column to store targeted treatment product IDs

  2. Purpose
    - Enable storing complete skin analysis data for display on dashboard and beauty journey pages
    - Store product recommendations for each routine phase
*/

ALTER TABLE skin_analysis ADD COLUMN IF NOT EXISTS skin_label text DEFAULT '';
ALTER TABLE skin_analysis ADD COLUMN IF NOT EXISTS selected_skin_type text DEFAULT '';
ALTER TABLE skin_analysis ADD COLUMN IF NOT EXISTS selected_concern text DEFAULT '';
ALTER TABLE skin_analysis ADD COLUMN IF NOT EXISTS selected_specific_concerns text[] DEFAULT '{}';
ALTER TABLE skin_analysis ADD COLUMN IF NOT EXISTS morning_product_ids text[] DEFAULT '{}';
ALTER TABLE skin_analysis ADD COLUMN IF NOT EXISTS evening_product_ids text[] DEFAULT '{}';
ALTER TABLE skin_analysis ADD COLUMN IF NOT EXISTS targeted_product_ids text[] DEFAULT '{}';