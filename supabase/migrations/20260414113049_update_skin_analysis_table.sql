/*
  # Update Skin Analysis Table

  Adds comprehensive AI analysis result columns to skin_analysis table.
*/

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'skin_analysis' AND column_name = 'skin_score') THEN
    ALTER TABLE skin_analysis ADD COLUMN skin_score integer DEFAULT 0;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'skin_analysis' AND column_name = 'summary') THEN
    ALTER TABLE skin_analysis ADD COLUMN summary text DEFAULT '';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'skin_analysis' AND column_name = 'metrics') THEN
    ALTER TABLE skin_analysis ADD COLUMN metrics jsonb DEFAULT '{}'::jsonb;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'skin_analysis' AND column_name = 'analysis_cards') THEN
    ALTER TABLE skin_analysis ADD COLUMN analysis_cards jsonb DEFAULT '[]'::jsonb;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'skin_analysis' AND column_name = 'morning_routine') THEN
    ALTER TABLE skin_analysis ADD COLUMN morning_routine jsonb DEFAULT '[]'::jsonb;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'skin_analysis' AND column_name = 'evening_routine') THEN
    ALTER TABLE skin_analysis ADD COLUMN evening_routine jsonb DEFAULT '[]'::jsonb;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'skin_analysis' AND column_name = 'targeted_treatments') THEN
    ALTER TABLE skin_analysis ADD COLUMN targeted_treatments jsonb DEFAULT '[]'::jsonb;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'skin_analysis' AND column_name = 'key_ingredients') THEN
    ALTER TABLE skin_analysis ADD COLUMN key_ingredients text[] DEFAULT '{}';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'skin_analysis' AND column_name = 'avoid_ingredients') THEN
    ALTER TABLE skin_analysis ADD COLUMN avoid_ingredients text[] DEFAULT '{}';
  END IF;
END $$;
