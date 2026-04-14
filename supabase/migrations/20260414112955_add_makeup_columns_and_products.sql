/*
  # Add Makeup Product Columns and Insert Products

  1. Schema Changes
    - Add finish, coverage, skin_tone columns to products

  2. Data
    - Insert initial skincare products
    - Insert 90 makeup products across all subcategories
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'finish'
  ) THEN
    ALTER TABLE products ADD COLUMN finish text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'coverage'
  ) THEN
    ALTER TABLE products ADD COLUMN coverage text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'skin_tone'
  ) THEN
    ALTER TABLE products ADD COLUMN skin_tone text;
  END IF;
END $$;

-- Insert initial skincare products
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
)
ON CONFLICT (id) DO NOTHING;

-- Insert 90 makeup products
INSERT INTO products (id, name, category, subcategory, brand, price, rating, image_url, description, finish, coverage, skin_tone) VALUES
('makeup_001', 'Luminous Silk Foundation', 'Makeup', 'Foundation', 'Shan Loray', 64, 4.8, 'https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=800', 'Buildable medium-to-full coverage foundation with a natural, glowing finish', 'Satin', 'Medium', 'All Tones'),
('makeup_002', 'Studio Fix Fluid Foundation', 'Makeup', 'Foundation', 'MAC', 35, 4.5, 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800', 'Medium-to-full coverage liquid foundation with a natural matte finish', 'Matte', 'Full', 'All Tones'),
('makeup_003', 'Magic Foundation', 'Makeup', 'Foundation', 'Charlotte Tilbury', 48, 4.9, 'https://images.unsplash.com/photo-1617897903246-719242758050?w=800', 'Airbrush flawless foundation with SPF 15 for radiant skin', 'Satin', 'Medium', 'All Tones'),
('makeup_004', 'Sheer Glow Foundation', 'Makeup', 'Foundation', 'NARS', 52, 4.7, 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800', 'Luminous finish foundation with buildable coverage', 'Satin', 'Medium', 'All Tones'),
('makeup_005', 'Pro Filt''r Soft Matte Foundation', 'Makeup', 'Foundation', 'Fenty Beauty', 40, 4.8, 'https://images.unsplash.com/photo-1590393157915-e077d2f1c3b3?w=800', 'Soft matte longwear foundation with 50 shades', 'Matte', 'Full', 'All Tones'),
('makeup_006', 'Born This Way Foundation', 'Makeup', 'Foundation', 'Too Faced', 43, 4.6, 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800', 'Medium-to-full coverage undetectable foundation', 'Satin', 'Full', 'All Tones'),
('makeup_007', 'Fit Me Matte Foundation', 'Makeup', 'Foundation', 'Maybelline', 18, 4.3, 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=800', 'Lightweight matte foundation that matches skin tone', 'Matte', 'Medium', 'All Tones'),
('makeup_008', 'Diorskin Forever Foundation', 'Makeup', 'Foundation', 'Dior Beauty', 62, 4.7, 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=800', '24-hour wear flawless perfection foundation', 'Satin', 'Full', 'All Tones'),
('makeup_009', 'Le Teint Encre de Peau', 'Makeup', 'Foundation', 'YSL Beauty', 68, 4.8, 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800', 'All-day matte fusion ink foundation', 'Matte', 'Full', 'All Tones'),
('makeup_010', 'Naked Skin Weightless Foundation', 'Makeup', 'Foundation', 'Urban Decay', 44, 4.5, 'https://images.unsplash.com/photo-1583241800698-2d3480f8941b?w=800', 'Ultra-definition liquid makeup with medium coverage', 'Satin', 'Medium', 'All Tones'),
('makeup_011', 'Radiant Glow Foundation', 'Makeup', 'Foundation', 'Shan Loray', 56, 4.7, 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800', 'Hydrating foundation with luminous finish', 'Satin', 'Medium', 'All Tones'),
('makeup_012', 'Flawless Finish Foundation', 'Makeup', 'Foundation', 'Charlotte Tilbury', 52, 4.9, 'https://images.unsplash.com/photo-1587008188485-b40f8e6e84d4?w=800', 'Award-winning medium coverage foundation', 'Satin', 'Medium', 'All Tones'),
('makeup_013', 'Pure Radiant Tinted Moisturizer', 'Makeup', 'Foundation', 'NARS', 47, 4.6, 'https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=800', 'Lightweight tinted moisturizer with SPF 30', 'Satin', 'Sheer', 'All Tones'),
('makeup_014', 'Hydra Vizor Foundation', 'Makeup', 'Foundation', 'Fenty Beauty', 42, 4.7, 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800', 'Invisible moisturizer with SPF 30 and a hint of coverage', 'Satin', 'Sheer', 'All Tones'),
('makeup_015', 'Dream Satin Liquid Foundation', 'Makeup', 'Foundation', 'Maybelline', 22, 4.2, 'https://images.unsplash.com/photo-1617897903246-719242758050?w=800', 'Hydrating liquid foundation for smooth finish', 'Satin', 'Medium', 'All Tones'),
('makeup_016', 'Radiant Creamy Concealer', 'Makeup', 'Concealer', 'NARS', 32, 4.8, 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800', 'Multi-action concealer with buildable coverage', 'Satin', 'Full', 'All Tones'),
('makeup_017', 'Shape Tape Concealer', 'Makeup', 'Concealer', 'Too Faced', 31, 4.7, 'https://images.unsplash.com/photo-1590393157915-e077d2f1c3b3?w=800', 'Full coverage crease-proof concealer', 'Matte', 'Full', 'All Tones'),
('makeup_018', 'Magic Vanish Concealer', 'Makeup', 'Concealer', 'Charlotte Tilbury', 36, 4.9, 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800', 'Color correcting concealer for flawless skin', 'Satin', 'Full', 'All Tones'),
('makeup_019', 'Pro Filt''r Instant Retouch Concealer', 'Makeup', 'Concealer', 'Fenty Beauty', 30, 4.6, 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=800', 'Long-wear soft matte concealer', 'Matte', 'Full', 'All Tones'),
('makeup_020', 'Select Cover-Up Concealer', 'Makeup', 'Concealer', 'MAC', 26, 4.5, 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=800', 'Creamy concealer with opaque coverage', 'Matte', 'Full', 'All Tones'),
('makeup_021', 'Fit Me Concealer', 'Makeup', 'Concealer', 'Maybelline', 15, 4.3, 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800', 'Lightweight concealer that fits all skin tones', 'Matte', 'Medium', 'All Tones'),
('makeup_022', 'Diorskin Forever Concealer', 'Makeup', 'Concealer', 'Dior Beauty', 38, 4.7, 'https://images.unsplash.com/photo-1583241800698-2d3480f8941b?w=800', 'High perfection skin concealer', 'Satin', 'Full', 'All Tones'),
('makeup_023', 'Touche Eclat Concealer', 'Makeup', 'Concealer', 'YSL Beauty', 42, 4.8, 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800', 'All-over brightening pen', 'Satin', 'Medium', 'All Tones'),
('makeup_024', 'Flawless Touch Concealer', 'Makeup', 'Concealer', 'Shan Loray', 34, 4.6, 'https://images.unsplash.com/photo-1587008188485-b40f8e6e84d4?w=800', 'Hydrating concealer with radiant finish', 'Satin', 'Medium', 'All Tones'),
('makeup_025', 'Naked Skin Concealer', 'Makeup', 'Concealer', 'Urban Decay', 30, 4.5, 'https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=800', 'Weightless complete coverage concealer', 'Satin', 'Full', 'All Tones'),
('makeup_026', 'Airbrush Flawless Finish Powder', 'Makeup', 'Powder', 'Charlotte Tilbury', 48, 4.8, 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800', 'Micro-fine pressed powder for a flawless finish', 'Matte', 'Medium', 'All Tones'),
('makeup_027', 'Prep + Prime Transparent Powder', 'Makeup', 'Powder', 'MAC', 35, 4.6, 'https://images.unsplash.com/photo-1617897903246-719242758050?w=800', 'Lightweight invisible pressed powder', 'Matte', 'Sheer', 'All Tones'),
('makeup_028', 'Soft Velvet Loose Powder', 'Makeup', 'Powder', 'NARS', 42, 4.7, 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800', 'Finely milled loose setting powder', 'Matte', 'Medium', 'All Tones'),
('makeup_029', 'Pro Filt''r Setting Powder', 'Makeup', 'Powder', 'Fenty Beauty', 36, 4.8, 'https://images.unsplash.com/photo-1590393157915-e077d2f1c3b3?w=800', 'Instantly mattifying setting powder', 'Matte', 'Medium', 'All Tones'),
('makeup_030', 'Born This Way Multi-Use Powder', 'Makeup', 'Powder', 'Too Faced', 38, 4.5, 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800', 'Ethereal light smoothing setting powder', 'Matte', 'Sheer', 'All Tones'),
('makeup_031', 'Fit Me Loose Powder', 'Makeup', 'Powder', 'Maybelline', 19, 4.2, 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=800', 'Natural finish loose setting powder', 'Matte', 'Medium', 'All Tones'),
('makeup_032', 'Forever Perfect Cushion Powder', 'Makeup', 'Powder', 'Dior Beauty', 56, 4.7, 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=800', 'Long-lasting matte powder foundation', 'Matte', 'Full', 'All Tones'),
('makeup_033', 'Silk Finish Powder', 'Makeup', 'Powder', 'Shan Loray', 44, 4.6, 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800', 'Luxurious pressed powder with soft-focus effect', 'Satin', 'Medium', 'All Tones'),
('makeup_034', 'Orgasm Blush', 'Makeup', 'Blush', 'NARS', 32, 4.9, 'https://images.unsplash.com/photo-1583241800698-2d3480f8941b?w=800', 'Iconic peachy pink blush with golden shimmer', 'Shimmer', 'Medium', 'All Tones'),
('makeup_035', 'Cheek Pop Blush', 'Makeup', 'Blush', 'Charlotte Tilbury', 36, 4.7, 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800', 'Buildable cream-powder formula blush', 'Satin', 'Medium', 'All Tones'),
('makeup_036', 'Powder Blush', 'Makeup', 'Blush', 'MAC', 28, 4.6, 'https://images.unsplash.com/photo-1587008188485-b40f8e6e84d4?w=800', 'Highly pigmented powder blush', 'Matte', 'Medium', 'All Tones'),
('makeup_037', 'Cheeks Out Freestyle Cream Blush', 'Makeup', 'Blush', 'Fenty Beauty', 26, 4.8, 'https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=800', 'Buildable cream blush for natural flush', 'Satin', 'Medium', 'All Tones'),
('makeup_038', 'Love Flush Blush', 'Makeup', 'Blush', 'Too Faced', 30, 4.5, 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800', 'Long-lasting 16-hour wear blush', 'Matte', 'Medium', 'All Tones'),
('makeup_039', 'Fit Me Blush', 'Makeup', 'Blush', 'Maybelline', 16, 4.1, 'https://images.unsplash.com/photo-1617897903246-719242758050?w=800', 'Natural-looking powder blush', 'Matte', 'Medium', 'All Tones'),
('makeup_040', 'Rosy Glow Blush', 'Makeup', 'Blush', 'Dior Beauty', 45, 4.8, 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800', 'Color-reviving blush with custom color', 'Satin', 'Medium', 'All Tones'),
('makeup_041', 'Radiant Bloom Blush', 'Makeup', 'Blush', 'Shan Loray', 38, 4.7, 'https://images.unsplash.com/photo-1590393157915-e077d2f1c3b3?w=800', 'Luminous blush with natural finish', 'Satin', 'Medium', 'All Tones'),
('makeup_042', 'Diamond Bomb Highlighter', 'Makeup', 'Highlighter', 'Fenty Beauty', 42, 4.9, 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800', 'All-over diamond veil highlighter', 'Glitter', 'Medium', 'All Tones'),
('makeup_043', 'Hollywood Flawless Filter', 'Makeup', 'Highlighter', 'Charlotte Tilbury', 46, 4.8, 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=800', 'Complexion booster with light-flex technology', 'Shimmer', 'Medium', 'All Tones'),
('makeup_044', 'Soft & Gentle Mineralize Skinfinish', 'Makeup', 'Highlighter', 'MAC', 40, 4.7, 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=800', 'Luxe highlighting powder', 'Shimmer', 'Medium', 'All Tones'),
('makeup_045', 'The Multiple Highlighter', 'Makeup', 'Highlighter', 'NARS', 43, 4.6, 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800', 'Multi-use cream highlighter stick', 'Shimmer', 'Medium', 'All Tones'),
('makeup_046', 'Sweethearts Blush & Glow', 'Makeup', 'Highlighter', 'Too Faced', 34, 4.5, 'https://images.unsplash.com/photo-1583241800698-2d3480f8941b?w=800', 'Radiant luminizer with multi-dimensional glow', 'Shimmer', 'Medium', 'All Tones'),
('makeup_047', 'Precious Glow Highlighter', 'Makeup', 'Highlighter', 'Shan Loray', 48, 4.8, 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800', 'Champagne pearl highlighter with ultra-fine shimmer', 'Shimmer', 'Medium', 'All Tones'),
('makeup_048', 'Forever Glow Star Filter', 'Makeup', 'Highlighter', 'Dior Beauty', 54, 4.7, 'https://images.unsplash.com/photo-1587008188485-b40f8e6e84d4?w=800', 'Holographic highlighting loose powder', 'Glitter', 'Medium', 'All Tones'),
('makeup_049', 'Naked Palette', 'Makeup', 'Eyeshadow', 'Urban Decay', 58, 4.9, 'https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=800', '12 neutral eyeshadows with matte and shimmer finishes', 'Shimmer', 'Medium', 'All Tones'),
('makeup_050', 'Pillow Talk Palette', 'Makeup', 'Eyeshadow', 'Charlotte Tilbury', 65, 4.8, 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800', 'Luxury eyeshadow palette in rose gold tones', 'Shimmer', 'Medium', 'All Tones'),
('makeup_051', 'Morocco Eyeshadow Palette', 'Makeup', 'Eyeshadow', 'Fenty Beauty', 62, 4.7, 'https://images.unsplash.com/photo-1617897903246-719242758050?w=800', '16 rich warm-toned eyeshadows', 'Shimmer', 'Full', 'All Tones'),
('makeup_052', 'Soft Glam Eyeshadow Palette', 'Makeup', 'Eyeshadow', 'Too Faced', 56, 4.6, 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800', '14 neutral eyeshadows for everyday glam', 'Shimmer', 'Medium', 'All Tones'),
('makeup_053', 'Eyes Are The Window Palette', 'Makeup', 'Eyeshadow', 'MAC', 68, 4.8, 'https://images.unsplash.com/photo-1590393157915-e077d2f1c3b3?w=800', 'Spirit eyeshadow palette with 12 shades', 'Shimmer', 'Medium', 'All Tones'),
('makeup_054', 'Narsissist Loaded Palette', 'Makeup', 'Eyeshadow', 'NARS', 72, 4.9, 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800', '12 new signature eyeshadows', 'Shimmer', 'Full', 'All Tones'),
('makeup_055', 'Luxury Palette', 'Makeup', 'Eyeshadow', 'Shan Loray', 78, 4.8, 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=800', 'Quad eyeshadow palette with complementary shades', 'Shimmer', 'Medium', 'All Tones'),
('makeup_056', '5 Couleurs Eyeshadow Palette', 'Makeup', 'Eyeshadow', 'Dior Beauty', 68, 4.7, 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=800', '5 harmonious eyeshadows in versatile finishes', 'Shimmer', 'Medium', 'All Tones'),
('makeup_057', 'Couture Palette Eyeshadow', 'Makeup', 'Eyeshadow', 'YSL Beauty', 70, 4.8, 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800', '5-color ready-to-wear eyeshadow palette', 'Shimmer', 'Medium', 'All Tones'),
('makeup_058', 'The Nudes Eyeshadow Palette', 'Makeup', 'Eyeshadow', 'Maybelline', 24, 4.3, 'https://images.unsplash.com/photo-1583241800698-2d3480f8941b?w=800', '12 curated nude eyeshadows', 'Shimmer', 'Medium', 'All Tones'),
('makeup_059', 'Perversion Eyeliner', 'Makeup', 'Eyeliner', 'Urban Decay', 26, 4.7, 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800', 'Creamy waterproof pencil eyeliner', 'Matte', 'Full', 'All Tones'),
('makeup_060', 'Rock N Kohl Eyeliner', 'Makeup', 'Eyeliner', 'Charlotte Tilbury', 28, 4.6, 'https://images.unsplash.com/photo-1587008188485-b40f8e6e84d4?w=800', 'Iconic eye cheat eyeliner pencil', 'Matte', 'Full', 'All Tones'),
('makeup_061', 'Flypencil Longwear Eyeliner', 'Makeup', 'Eyeliner', 'Fenty Beauty', 22, 4.8, 'https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=800', 'Ultra-fine longwear pencil eyeliner', 'Matte', 'Full', 'All Tones'),
('makeup_062', 'Larger Than Life Eyeliner', 'Makeup', 'Eyeliner', 'NARS', 27, 4.5, 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800', 'Long-wear eyeliner with intense color payoff', 'Matte', 'Full', 'All Tones'),
('makeup_063', 'Tattoo Liner', 'Makeup', 'Eyeliner', 'Maybelline', 18, 4.4, 'https://images.unsplash.com/photo-1617897903246-719242758050?w=800', '36-hour wear liquid eyeliner pen', 'Matte', 'Full', 'All Tones'),
('makeup_064', 'Precision Ink Liner', 'Makeup', 'Eyeliner', 'Shan Loray', 32, 4.6, 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800', 'Waterproof liquid eyeliner with precision tip', 'Matte', 'Full', 'All Tones'),
('makeup_065', 'Better Than Sex Mascara', 'Makeup', 'Mascara', 'Too Faced', 29, 4.8, 'https://images.unsplash.com/photo-1590393157915-e077d2f1c3b3?w=800', 'Volumizing mascara with hourglass brush', 'Matte', 'Full', 'All Tones'),
('makeup_066', 'Lash Sensational Mascara', 'Makeup', 'Mascara', 'Maybelline', 19, 4.5, 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800', 'Fanning brush for full lash fringe', 'Matte', 'Medium', 'All Tones'),
('makeup_067', 'Full Lash Mascara', 'Makeup', 'Mascara', 'Fenty Beauty', 28, 4.7, 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=800', 'Buildable lengthening mascara', 'Matte', 'Full', 'All Tones'),
('makeup_068', 'Legendary Lashes Volume Mascara', 'Makeup', 'Mascara', 'Shan Loray', 34, 4.6, 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=800', 'Volume and length mascara with nourishing formula', 'Matte', 'Full', 'All Tones'),
('makeup_069', 'Climax Mascara', 'Makeup', 'Mascara', 'NARS', 27, 4.6, 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800', 'Extreme volume mascara', 'Matte', 'Full', 'All Tones'),
('makeup_070', 'Legendary Lashes Mascara', 'Makeup', 'Mascara', 'Charlotte Tilbury', 32, 4.7, 'https://images.unsplash.com/photo-1583241800698-2d3480f8941b?w=800', 'Volume, length and lift mascara', 'Matte', 'Full', 'All Tones'),
('makeup_071', 'Brow Wiz Pencil', 'Makeup', 'Eyebrow', 'Urban Decay', 25, 4.7, 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800', 'Ultra-slim precision brow pencil', 'Matte', 'Medium', 'All Tones'),
('makeup_072', 'Brow Freeze Gel', 'Makeup', 'Eyebrow', 'Fenty Beauty', 24, 4.8, 'https://images.unsplash.com/photo-1587008188485-b40f8e6e84d4?w=800', 'Extreme hold customizable eyebrow gel', 'Matte', 'Medium', 'All Tones'),
('makeup_073', 'Brow Definer', 'Makeup', 'Eyebrow', 'Shan Loray', 28, 4.5, 'https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=800', 'Triangular tip brow pencil for precision', 'Matte', 'Medium', 'All Tones'),
('makeup_074', 'Total Temptation Brow Definer', 'Makeup', 'Eyebrow', 'Maybelline', 17, 4.3, 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800', 'Teardrop tip eyebrow pencil', 'Matte', 'Medium', 'All Tones'),
('makeup_075', 'Matte Revolution Lipstick', 'Makeup', 'Lipstick', 'Charlotte Tilbury', 38, 4.9, 'https://images.unsplash.com/photo-1617897903246-719242758050?w=800', 'Long-lasting comfortable matte lipstick', 'Matte', 'Full', 'All Tones'),
('makeup_076', 'Stunna Lip Paint', 'Makeup', 'Lipstick', 'Fenty Beauty', 28, 4.8, 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800', 'Longwear fluid lip color', 'Matte', 'Full', 'All Tones'),
('makeup_077', 'Ruby Woo Lipstick', 'Makeup', 'Lipstick', 'MAC', 24, 4.7, 'https://images.unsplash.com/photo-1590393157915-e077d2f1c3b3?w=800', 'Iconic blue-red matte lipstick', 'Matte', 'Full', 'All Tones'),
('makeup_078', 'Powermatte Lip Pigment', 'Makeup', 'Lipstick', 'NARS', 30, 4.6, 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800', 'High-impact liquid lip color', 'Matte', 'Full', 'All Tones'),
('makeup_079', 'Melted Matte Lipstick', 'Makeup', 'Lipstick', 'Too Faced', 25, 4.5, 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=800', 'Liquified matte lipstick', 'Matte', 'Full', 'All Tones'),
('makeup_080', 'SuperStay Matte Ink', 'Makeup', 'Lipstick', 'Maybelline', 20, 4.4, 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=800', '16-hour wear liquid lipstick', 'Matte', 'Full', 'All Tones'),
('makeup_081', 'Rouge Dior Lipstick', 'Makeup', 'Lipstick', 'Dior Beauty', 42, 4.8, 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800', 'Couture color lipstick with floral lip care', 'Satin', 'Full', 'All Tones'),
('makeup_082', 'Rouge Volupte Shine Lipstick', 'Makeup', 'Lipstick', 'YSL Beauty', 44, 4.7, 'https://images.unsplash.com/photo-1583241800698-2d3480f8941b?w=800', 'Oil-in-stick lipstick with luminous finish', 'Shimmer', 'Medium', 'All Tones'),
('makeup_083', 'Velvet Kiss Lipstick', 'Makeup', 'Lipstick', 'Shan Loray', 36, 4.8, 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800', 'Luxurious matte lipstick with vitamin E', 'Matte', 'Full', 'All Tones'),
('makeup_084', 'Revolution Lipstick', 'Makeup', 'Lipstick', 'MAC', 22, 4.5, 'https://images.unsplash.com/photo-1587008188485-b40f8e6e84d4?w=800', 'Classic lipstick with intense color payoff', 'Satin', 'Full', 'All Tones'),
('makeup_085', 'Gloss Bomb Universal Lip Luminizer', 'Makeup', 'Lip Gloss', 'Fenty Beauty', 21, 4.9, 'https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=800', 'Explosive shine with universal appeal', 'Shimmer', 'Sheer', 'All Tones'),
('makeup_086', 'Collagenlip Lip Gloss', 'Makeup', 'Lip Gloss', 'Charlotte Tilbury', 32, 4.7, 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800', 'Plumping lip gloss with collagen', 'Shimmer', 'Medium', 'All Tones'),
('makeup_087', 'Lipglass Lip Gloss', 'Makeup', 'Lip Gloss', 'MAC', 20, 4.5, 'https://images.unsplash.com/photo-1617897903246-719242758050?w=800', 'Classic lip gloss with glass-like shine', 'Shimmer', 'Sheer', 'All Tones'),
('makeup_088', 'Lip Liner', 'Makeup', 'Lip Liner', 'Charlotte Tilbury', 24, 4.7, 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800', 'Lip cheat lip liner for fuller-looking lips', 'Matte', 'Full', 'All Tones'),
('makeup_089', 'Edge Control Lip Liner', 'Makeup', 'Lip Liner', 'MAC', 22, 4.6, 'https://images.unsplash.com/photo-1590393157915-e077d2f1c3b3?w=800', 'Precision lip pencil with creamy formula', 'Matte', 'Full', 'All Tones'),
('makeup_090', 'Lip Sleeping Mask', 'Makeup', 'Lip Care', 'Shan Loray', 26, 4.8, 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800', 'Intensive overnight lip treatment', 'Satin', 'Medium', 'All Tones')
ON CONFLICT (id) DO NOTHING;
