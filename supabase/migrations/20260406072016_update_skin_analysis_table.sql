/*
  # Update Skin Analysis Table

  Updates the skin_analysis table to store comprehensive AI analysis results.

  1. Changes
    - Add skin_score column (integer, 0-100)
    - Add summary column (text for personalized summary)
    - Add metrics column (jsonb for hydration, texture, clarity, etc.)
    - Add analysis_cards column (jsonb array)
    - Add morning_routine column (jsonb array)
    - Add evening_routine column (jsonb array)
    - Add targeted_treatments column (jsonb array)
    - Add key_ingredients column (text array)
    - Add avoid_ingredients column (text array)
    - Drop old columns that are no longer needed

  2. Security
    - Maintains RLS policies from existing table
*/

-- Add new columns
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'skin_analysis' AND column_name = 'skin_score'
  ) THEN
    ALTER TABLE skin_analysis ADD COLUMN skin_score integer DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'skin_analysis' AND column_name = 'summary'
  ) THEN
    ALTER TABLE skin_analysis ADD COLUMN summary text DEFAULT '';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'skin_analysis' AND column_name = 'metrics'
  ) THEN
    ALTER TABLE skin_analysis ADD COLUMN metrics jsonb DEFAULT '{}'::jsonb;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'skin_analysis' AND column_name = 'analysis_cards'
  ) THEN
    ALTER TABLE skin_analysis ADD COLUMN analysis_cards jsonb DEFAULT '[]'::jsonb;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'skin_analysis' AND column_name = 'morning_routine'
  ) THEN
    ALTER TABLE skin_analysis ADD COLUMN morning_routine jsonb DEFAULT '[]'::jsonb;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'skin_analysis' AND column_name = 'evening_routine'
  ) THEN
    ALTER TABLE skin_analysis ADD COLUMN evening_routine jsonb DEFAULT '[]'::jsonb;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'skin_analysis' AND column_name = 'targeted_treatments'
  ) THEN
    ALTER TABLE skin_analysis ADD COLUMN targeted_treatments jsonb DEFAULT '[]'::jsonb;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'skin_analysis' AND column_name = 'key_ingredients'
  ) THEN
    ALTER TABLE skin_analysis ADD COLUMN key_ingredients text[] DEFAULT '{}';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'skin_analysis' AND column_name = 'avoid_ingredients'
  ) THEN
    ALTER TABLE skin_analysis ADD COLUMN avoid_ingredients text[] DEFAULT '{}';
  END IF;
END $$;