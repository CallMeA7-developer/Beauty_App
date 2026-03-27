// ─────────────────────────────────────────────────────────────────────────────
// src/data/products.js
// Single source of truth for all Shan Loray product data.
// Pages import what they need from here instead of defining their own arrays.
// When Bolt connects a real database, replace these arrays with API calls here.
// ─────────────────────────────────────────────────────────────────────────────

// ─── SKINCARE ─────────────────────────────────────────────────────────────────

export const skincareCategories = [
  { name: 'Cleansers',    count: 12, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=80&h=80&fit=crop' },
  { name: 'Serums',       count: 18, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=80&h=80&fit=crop' },
  { name: 'Moisturizers', count: 15, image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=80&h=80&fit=crop' },
  { name: 'Eye Care',     count: 8,  image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=80&h=80&fit=crop' },
  { name: 'Masks',        count: 10, image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=80&h=80&fit=crop' },
  { name: 'Sunscreen',    count: 6,  image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=80&h=80&fit=crop' },
]

// Mobile product grid (simple cards)
export const skincareProductsMobile = [
  { id: 'sk-001', name: 'Botanical Renewal Serum',  category: 'Serums',       description: 'Advanced age-defying formula',      price: '$185', priceValue: 185, reviews: 248, rating: 4.8, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop' },
  { id: 'sk-002', name: 'Hydrating Face Cleanser',  category: 'Cleansers',    description: 'Gentle foaming gel cleanser',        price: '$58',  priceValue: 58,  reviews: 312, rating: 4.7, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop' },
  { id: 'sk-003', name: 'Supreme Moisture Cream',   category: 'Moisturizers', description: '24-hour deep hydration',             price: '$165', priceValue: 165, reviews: 421, rating: 4.9, image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop' },
  { id: 'sk-004', name: 'Perfecting Eye Cream',     category: 'Eye Care',     description: 'Reduces fine lines & dark circles',  price: '$98',  priceValue: 98,  reviews: 287, rating: 4.6, image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400&h=400&fit=crop' },
  { id: 'sk-005', name: 'Revitalizing Face Mask',   category: 'Masks',        description: 'Purifying clay treatment',           price: '$72',  priceValue: 72,  reviews: 356, rating: 4.7, image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=400&fit=crop' },
  { id: 'sk-006', name: 'Daily SPF Moisturizer',    category: 'Sunscreen',    description: 'Broad spectrum SPF 50',              price: '$65',  priceValue: 65,  reviews: 519, rating: 4.8, image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=400&h=400&fit=crop' },
]

// Desktop layout — large hero products
export const skincareProductsLarge = [
  { id: 'sk-007', name: 'Advanced Retinol Night Serum',  category: 'Serums',       description: 'Time-release formula for smooth, youthful skin', price: '$198', priceValue: 198, reviews: 412, rating: 4.9, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=560&h=560&fit=crop' },
  { id: 'sk-008', name: 'Vitamin C Brightening Complex', category: 'Serums',       description: 'Powerful antioxidant serum for radiant glow',     price: '$165', priceValue: 165, reviews: 387, rating: 4.8, image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=940&h=800&fit=crop' },
]

// Desktop layout — medium horizontal products
export const skincareProductsMedium = [
  { id: 'sk-009', name: 'Hydrating Gel Cleanser',    category: 'Cleansers', description: 'Gentle daily cleanser for all skin types', price: '$58',  priceValue: 58,  reviews: 534, rating: 4.7, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=460&h=280&fit=crop' },
  { id: 'sk-010', name: 'Peptide Eye Renewal Cream', category: 'Eye Care',  description: 'Targets fine lines and dark circles',      price: '$145', priceValue: 145, reviews: 298, rating: 4.8, image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=460&h=280&fit=crop' },
]

// Desktop layout — square grid products
export const skincareProductsSquare = [
  { id: 'sk-011', name: 'Deep Moisture Face Cream', category: 'Moisturizers', description: '24-hour hydration therapy',         price: '$128', priceValue: 128, reviews: 621, rating: 4.9, image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=300&h=300&fit=crop' },
  { id: 'sk-012', name: 'Illuminating Clay Mask',   category: 'Masks',        description: 'Purifies and brightens complexion', price: '$78',  priceValue: 78,  reviews: 445, rating: 4.7, image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=300&h=300&fit=crop' },
  { id: 'sk-013', name: 'Mineral Defense SPF 50',   category: 'Sunscreen',    description: 'Broad spectrum sun protection',     price: '$72',  priceValue: 72,  reviews: 789, rating: 4.8, image: 'https://images.unsplash.com/photo-1556228852-80a3c31c6d52?w=300&h=300&fit=crop' },
]

// Desktop layout — rectangular wide products
export const skincareProductsRectangular = [
  { id: 'sk-014', name: 'Complete Skincare Ritual Set', category: 'Sets', description: 'Four essential steps to luminous skin',   price: '$395', priceValue: 395, reviews: 203, rating: 4.9, image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=470&h=400&fit=crop' },
  { id: 'sk-015', name: 'Travel Essentials Collection', category: 'Sets', description: 'Your complete routine in travel sizes',   price: '$145', priceValue: 145, reviews: 167, rating: 4.7, image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=470&h=400&fit=crop' },
]

// ─── MAKEUP ───────────────────────────────────────────────────────────────────

export const makeupCategories = [
  { name: 'Face',            count: 24, image: 'https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=80&h=80&fit=crop' },
  { name: 'Eyes',            count: 18, image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=80&h=80&fit=crop' },
  { name: 'Lips',            count: 16, image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=80&h=80&fit=crop' },
  { name: 'Sets & Palettes', count: 12, image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=80&h=80&fit=crop' },
]

export const makeupProductsMobile = [
  { id: 'mk-001', name: 'Velvet Matte Foundation', category: 'Face', description: 'Flawless buildable coverage',  price: '$78', priceValue: 78, reviews: 542, rating: 4.8, image: 'https://images.unsplash.com/photo-1625025403725-fb026f06ab3c?w=400&h=400&fit=crop' },
  { id: 'mk-002', name: 'Luminous Eye Palette',    category: 'Eyes', description: '12 curated shades',           price: '$68', priceValue: 68, reviews: 487, rating: 4.7, image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop' },
  { id: 'mk-003', name: 'Signature Lip Velvet',    category: 'Lips', description: 'Long-lasting color',          price: '$42', priceValue: 42, reviews: 629, rating: 4.9, image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop' },
  { id: 'mk-004', name: 'Precision Liquid Liner',  category: 'Eyes', description: 'Ultimate control & intensity', price: '$32', priceValue: 32, reviews: 381, rating: 4.6, image: 'https://images.unsplash.com/photo-1631730486572-226d1f595b68?w=400&h=400&fit=crop' },
  { id: 'mk-005', name: 'Volume Mascara',           category: 'Eyes', description: 'Dramatic length & curl',      price: '$38', priceValue: 38, reviews: 456, rating: 4.7, image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop' },
  { id: 'mk-006', name: 'Radiant Blush Duo',        category: 'Face', description: 'Natural glow & definition',   price: '$48', priceValue: 48, reviews: 298, rating: 4.6, image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400&h=400&fit=crop' },
]

export const makeupFeaturedProduct = {
  id: 'mk-007',
  name: 'Luxe Velvet Lipstick Collection',
  category: 'Lips',
  description: 'Twelve signature shades in rich, long-lasting formula',
  price: '$245', priceValue: 245, reviews: 412, rating: 4.9,
  image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=560&h=560&fit=crop',
  badge: 'BESTSELLER',
}

export const makeupProductsHorizontal = [
  { id: 'mk-008', name: 'Luminous Foundation',    category: 'Face', description: 'Buildable coverage with 24-hour wear', price: '$78',  priceValue: 78,  reviews: 534, rating: 4.8, image: 'https://images.unsplash.com/photo-1625025403725-fb026f06ab3c?w=460&h=280&fit=crop', shades: ['#F5D4C4','#E8C4B4','#D4A894','#C08874','#A86854','#8E5844'] },
  { id: 'mk-009', name: 'Nude Eyeshadow Palette', category: 'Eyes', description: 'Ten versatile shades for every look',   price: '$145', priceValue: 145, reviews: 298, rating: 4.7, image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=460&h=280&fit=crop', badge: 'NEW' },
]

export const makeupProductsSquare = [
  { id: 'mk-010', name: 'Silk Touch Concealer', category: 'Face', description: 'Full coverage brightening formula',   price: '$52', priceValue: 52, reviews: 621, rating: 4.9, image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop', shades: ['#FADCC4','#E8C8B0','#D4A890','#B88868','#9C6848','#7E5438'] },
  { id: 'mk-011', name: 'Radiant Blush Duo',    category: 'Face', description: 'Buildable color with luminous finish', price: '$68', priceValue: 68, reviews: 445, rating: 4.6, image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=300&h=300&fit=crop' },
  { id: 'mk-012', name: 'Glow Highlighter',     category: 'Face', description: 'Multi-dimensional shimmer',            price: '$58', priceValue: 58, reviews: 789, rating: 4.8, image: 'https://images.unsplash.com/photo-1515688594390-b649af70d282?w=300&h=300&fit=crop' },
]

export const makeupProductsRectangular = [
  { id: 'mk-013', name: 'Complete Makeup Artist Set', category: 'Sets', description: 'Professional collection with face, eyes, and lips essentials',    price: '$395', priceValue: 395, reviews: 203, rating: 4.9, image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=470&h=400&fit=crop', badge: 'LIMITED EDITION' },
  { id: 'mk-014', name: 'Travel Glam Collection',     category: 'Sets', description: 'Your complete makeup routine in luxurious travel-friendly sizes', price: '$185', priceValue: 185, reviews: 167, rating: 4.7, image: 'https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=470&h=400&fit=crop' },
]

export const makeupShadeColors = [
  { name: 'Ivory',    color: '#F5E6D3' },
  { name: 'Beige',    color: '#E8D4B8' },
  { name: 'Sand',     color: '#D4BC98' },
  { name: 'Honey',    color: '#C9A870' },
  { name: 'Tan',      color: '#B89968' },
  { name: 'Caramel',  color: '#A07855' },
  { name: 'Mocha',    color: '#8B7355' },
  { name: 'Espresso', color: '#6B563F' },
  { name: 'Rose',     color: '#E8B4B8' },
  { name: 'Coral',    color: '#F4A896' },
  { name: 'Berry',    color: '#C45D6F' },
  { name: 'Wine',     color: '#8B3A52' },
]

// ─── FRAGRANCE ────────────────────────────────────────────────────────────────

export const fragranceCategories = [
  { name: 'Eau de Parfum',   count: 18, image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=80&h=80&fit=crop' },
  { name: 'Eau de Toilette', count: 14, image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=80&h=80&fit=crop' },
  { name: 'Body Mist',       count: 8,  image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=80&h=80&fit=crop' },
  { name: 'Discovery Sets',  count: 6,  image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=80&h=80&fit=crop' },
]

export const fragranceProductsMobile = [
  { id: 'fr-001', name: 'Signature Oud Collection',     category: 'Eau de Parfum',  description: 'Rare oud & precious florals',  price: '$385', priceValue: 385, reviews: 412, rating: 4.9, concentration: 'EDP', image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=400&fit=crop', badge: 'SIGNATURE' },
  { id: 'fr-002', name: 'Rose Noir Eau de Parfum',      category: 'Eau de Parfum',  description: 'Rose, amber & patchouli',      price: '$245', priceValue: 245, reviews: 534, rating: 4.8, concentration: 'EDP', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop' },
  { id: 'fr-003', name: 'Citrus Garden Eau de Toilette', category: 'Eau de Toilette', description: 'Bergamot, neroli & white musk', price: '$165', priceValue: 165, reviews: 298, rating: 4.7, concentration: 'EDT', image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400&h=400&fit=crop' },
  { id: 'fr-004', name: 'Velvet Jasmine',               category: 'Eau de Parfum',  description: 'Floral oriental blend',        price: '$195', priceValue: 195, reviews: 621, rating: 4.8, concentration: 'EDP', image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=400&h=400&fit=crop' },
  { id: 'fr-005', name: 'Amber Woods',                  category: 'Eau de Parfum',  description: 'Warm woody & spicy',           price: '$225', priceValue: 225, reviews: 445, rating: 4.7, concentration: 'EDP', image: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=400&h=400&fit=crop' },
  { id: 'fr-006', name: 'Prestige Discovery Collection', category: 'Discovery Sets', description: 'Six iconic fragrances',         price: '$295', priceValue: 295, reviews: 203, rating: 4.9, concentration: 'SET', image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=400&h=400&fit=crop', badge: 'LIMITED' },
]

export const fragranceFeaturedProduct = {
  id: 'fr-001',
  name: 'Signature Oud Collection',
  category: 'Eau de Parfum',
  description: 'Luxurious blend of rare oud and precious florals',
  price: '$385', priceValue: 385, reviews: 412, rating: 4.9,
  badge: 'SIGNATURE SCENT', concentration: 'EDP',
  image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=560&h=560&fit=crop',
}

export const fragranceProductsHorizontal = [
  { id: 'fr-002', name: 'Rose Noir Eau de Parfum',       category: 'Eau de Parfum',  description: 'Deep rose with hints of amber and patchouli', price: '$245', priceValue: 245, reviews: 534, rating: 4.8, concentration: 'EDP', notes: 'Rose, Amber, Patchouli',        sizes: ['30ml','50ml','100ml'], image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=460&h=280&fit=crop' },
  { id: 'fr-003', name: 'Citrus Garden Eau de Toilette', category: 'Eau de Toilette', description: 'Fresh bergamot, neroli, and white musk',        price: '$165', priceValue: 165, reviews: 298, rating: 4.7, concentration: 'EDT', notes: 'Bergamot, Neroli, White Musk', sizes: ['30ml','50ml','100ml'], image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=460&h=280&fit=crop' },
]

export const fragranceProductsSquare = [
  { id: 'fr-004', name: 'Velvet Jasmine', category: 'Eau de Parfum',  family: 'Floral Oriental', price: '$195', priceValue: 195, reviews: 621, rating: 4.8, concentration: 'EDP', image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=300&h=300&fit=crop' },
  { id: 'fr-005', name: 'Amber Woods',    category: 'Eau de Parfum',  family: 'Woody Spicy',     price: '$225', priceValue: 225, reviews: 445, rating: 4.7, concentration: 'EDP', image: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=300&h=300&fit=crop' },
  { id: 'fr-007', name: 'White Lotus',    category: 'Eau de Toilette', family: 'Fresh Floral',    price: '$185', priceValue: 185, reviews: 789, rating: 4.9, concentration: 'EDT', image: 'https://images.unsplash.com/photo-1587556930796-7a8ab4e96a17?w=300&h=300&fit=crop' },
]

export const fragranceProductsRectangular = [
  { id: 'fr-006', name: 'Prestige Discovery Collection', category: 'Discovery Sets', description: 'Experience our six most iconic fragrances in luxurious travel sizes',       price: '$295', priceValue: 295, reviews: 203, rating: 4.9, badge: 'LIMITED EDITION', image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=470&h=400&fit=crop' },
  { id: 'fr-008', name: 'Dual Essence Set',              category: 'Discovery Sets', description: 'Day and night fragrances paired perfectly — fresh citrus & warm amber', price: '$385', priceValue: 385, reviews: 167, rating: 4.8, image: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=470&h=400&fit=crop' },
]

// ─── PRODUCT DETAIL ───────────────────────────────────────────────────────────

export const productDetailImages = [
  'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=64&h=64&fit=crop',
  'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=64&h=64&fit=crop',
  'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=64&h=64&fit=crop',
  'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=64&h=64&fit=crop',
  'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=64&h=64&fit=crop',
]

export const productDetailKeyBenefits = [
  'Deep cleansing without stripping natural oils',
  'Creates rich, creamy foam for luxurious feel',
  'Balances and refines skin texture',
  'Infused with nourishing botanical extracts',
  'Suitable for all skin types, especially combination',
  'Dermatologist-tested and pH-balanced',
]

export const productDetailApplicationSteps = [
  { step: '1', text: 'Wet your face with lukewarm water',                          timing: 'Morning & Evening' },
  { step: '2', text: 'Dispense a small amount into palm and work into lather',      timing: null               },
  { step: '3', text: 'Gently massage onto face in circular motions',                timing: 'For 60 seconds'   },
  { step: '4', text: 'Rinse thoroughly and pat dry',                                timing: null               },
]

export const productDetailIngredients = [
  { name: 'Glycerin',          concentration: '3%',   benefit: 'Deeply hydrates and maintains moisture balance' },
  { name: 'Green Tea Extract', concentration: '2%',   benefit: 'Powerful antioxidant protection and soothing'   },
  { name: 'Chamomile',         concentration: '1.5%', benefit: 'Calms and reduces skin irritation'               },
  { name: 'Hyaluronic Acid',   concentration: '1%',   benefit: 'Provides lasting hydration and plumpness'       },
]

export const productDetailSizes = [
  { size: '100ml',       price: '$68',  priceValue: 68,  selected: true,  badge: null         },
  { size: '200ml',       price: '$118', priceValue: 118, selected: false, badge: 'Best Value' },
  { size: 'Travel 30ml', price: '$28',  priceValue: 28,  selected: false, badge: null         },
]

export const productDetailReviews = [
  { avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop', username: 'Emily S.',  verified: true,  tier: 'Elite Member', rating: 5, date: 'Dec 20, 2024', title: 'Best cleanser I have ever used!', text: 'This foaming cleanser is absolutely amazing. It removes all my makeup and leaves my skin feeling fresh and clean without any tightness. The foam is so luxurious and a little goes a long way.', helpful: 18, notHelpful: 1, skinType: 'Combination', ageRange: '28-35' },
  { avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop', username: 'Rachel M.', verified: true,  tier: null,           rating: 5, date: 'Dec 18, 2024', title: 'Gentle yet effective',            text: 'I love how gentle this cleanser is on my sensitive skin. It thoroughly cleanses without causing any irritation. My skin feels balanced and hydrated after every use.',                         helpful: 12, notHelpful: 0, skinType: 'Sensitive',   ageRange: '36-45' },
  { avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=96&h=96&fit=crop', username: 'Lisa K.',   verified: false, tier: null,           rating: 4, date: 'Dec 15, 2024', title: 'Great product, amazing lather',   text: 'The lather is incredible and it rinses off so easily. My skin looks brighter and feels smoother. Only wish the bottle was a bit larger for the price.',                                      helpful: 8,  notHelpful: 2, skinType: 'Normal',      ageRange: '25-34' },
]

export const productDetailRelated = [
  { id: 'sk-008', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200&h=240&fit=crop', brand: 'Shan Loray', name: 'Gentle Toner', price: '$58',  rating: 4.8, reviews: 156 },
  { id: 'sk-003', image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=200&h=240&fit=crop', brand: 'Shan Loray', name: 'Night Cream',  price: '$98',  rating: 4.9, reviews: 203 },
  { id: 'sk-004', image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=200&h=240&fit=crop', brand: 'Shan Loray', name: 'Eye Cream',    price: '$85',  rating: 4.7, reviews: 128 },
  { id: 'sk-005', image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=200&h=240&fit=crop', brand: 'Shan Loray', name: 'Face Mask',    price: '$72',  rating: 4.8, reviews: 184 },
]

// ─── WISHLIST ─────────────────────────────────────────────────────────────────

export const wishlistProducts = [
  { id: 1, brand: 'LA MER',            name: 'Crème de la Mer Moisturizing Cream', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=560&h=560&fit=crop',  rating: 4.9, reviews: 342, originalPrice: 380, currentPrice: 342, stock: 'In Stock'  },
  { id: 2, brand: 'ESTÉE LAUDER',       name: 'Advanced Night Repair Serum',        image: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=560&h=560&fit=crop',  rating: 4.8, reviews: 567, originalPrice: 135, currentPrice: 115, stock: 'In Stock'  },
  { id: 3, brand: 'DIOR',               name: 'Prestige La Micro-Huile de Rose',    image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=560&h=560&fit=crop',  rating: 4.7, reviews: 289, originalPrice: 425, currentPrice: 425, stock: 'Low Stock' },
  { id: 4, brand: 'TOM FORD',           name: 'Black Orchid Eau de Parfum',         image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=560&h=560&fit=crop',  rating: 4.9, reviews: 834, originalPrice: 295, currentPrice: 265, stock: 'In Stock'  },
  { id: 5, brand: 'CHARLOTTE TILBURY', name: 'Magic Cream Moisturizer',             image: 'https://images.unsplash.com/photo-1556228841-a6d4522f2c88?w=560&h=560&fit=crop',  rating: 4.6, reviews: 456, originalPrice: 100, currentPrice: 85,  stock: 'In Stock'  },
  { id: 6, brand: 'CHANEL',             name: 'Les Beiges Healthy Glow Foundation', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=560&h=560&fit=crop',  rating: 4.8, reviews: 721, originalPrice: 68,  currentPrice: 68,  stock: 'In Stock'  },
]

// ─── CART / SHOPPING BASKET ───────────────────────────────────────────────────

export const initialCartItems = [
  { id: 1, brand: 'LA MER',      name: 'Crème de la Mer Moisturizing Cream', size: '60ml',  image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=320&h=320&fit=crop', price: 380, quantity: 1 },
  { id: 2, brand: 'ESTÉE LAUDER', name: 'Advanced Night Repair Serum',       size: '50ml',  image: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=320&h=320&fit=crop', price: 115, quantity: 2 },
  { id: 3, brand: 'TOM FORD',    name: 'Black Orchid Eau de Parfum',          size: '100ml', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=320&h=320&fit=crop', price: 265, quantity: 1 },
]

// ─── SHARED FILTER OPTIONS ────────────────────────────────────────────────────

export const filterBrandsAll   = ['Shan Loray', 'La Mer', 'SK-II', 'Tatcha', 'Sunday Riley', 'Drunk Elephant', "Paula's Choice", 'The Ordinary']
export const filterBrandsMakeup = ['Shan Loray', 'Charlotte Tilbury', 'Tom Ford Beauty', 'Chanel', 'Dior', 'La Mer', 'Armani Beauty', 'Guerlain']
export const filterBrandsFragrance = ['Shan Loray', 'Maison Lavande', 'Noir Essence', 'Velvet & Oud']

export const filterSkinTypes   = ['All Skin Types', 'Dry', 'Oily', 'Combination', 'Sensitive', 'Mature']
export const filterSkinConcerns = ['Anti-Aging', 'Hydration', 'Brightening', 'Acne Care', 'Redness Relief', 'Dark Spots']
export const filterIngredients  = ['Retinol', 'Vitamin C', 'Hyaluronic Acid', 'Niacinamide', 'AHA/BHA', 'Ceramides']

export const filterRatingsSkincare  = [{ stars: 5, count: 312 }, { stars: 4, count: 198 }, { stars: 3, count: 87 }, { stars: 2, count: 34 }, { stars: 1, count: 9 }]
export const filterRatingsMakeup    = [{ stars: 5, count: 234 }, { stars: 4, count: 156 }, { stars: 3, count: 89 }, { stars: 2, count: 45 }, { stars: 1, count: 12 }]
export const filterRatingsFragrance = [{ stars: 5, count: 234 }, { stars: 4, count: 456 }, { stars: 3, count: 189 }]

export const sortOptionsSkincare  = ['Recommended', 'Best Selling', 'Newest Arrivals', 'Price: Low to High', 'Price: High to Low', 'Highest Rated']
export const sortOptionsMakeup    = ['Best Selling', 'Newest', 'Price: Low to High', 'Price: High to Low', 'Most Popular', 'Shade Range']
export const sortOptionsFragrance = ['Best Selling', 'Newest', 'Price: Low to High', 'Price: High to Low', 'Most Popular']