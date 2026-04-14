/*
  # Add Full Analysis Data Columns to skin_analysis Table

  Adds columns for storing complete skin analysis data including user selections
  and product recommendation IDs for each routine phase.
*/

ALTER TABLE skin_analysis ADD COLUMN IF NOT EXISTS skin_label text DEFAULT '';
ALTER TABLE skin_analysis ADD COLUMN IF NOT EXISTS selected_skin_type text DEFAULT '';
ALTER TABLE skin_analysis ADD COLUMN IF NOT EXISTS selected_concern text DEFAULT '';
ALTER TABLE skin_analysis ADD COLUMN IF NOT EXISTS selected_specific_concerns text[] DEFAULT '{}';
ALTER TABLE skin_analysis ADD COLUMN IF NOT EXISTS morning_product_ids text[] DEFAULT '{}';
ALTER TABLE skin_analysis ADD COLUMN IF NOT EXISTS evening_product_ids text[] DEFAULT '{}';
ALTER TABLE skin_analysis ADD COLUMN IF NOT EXISTS targeted_product_ids text[] DEFAULT '{}';
