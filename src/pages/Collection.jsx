/*
  Run this SQL in Supabase before using this page:
  ALTER TABLE products ADD COLUMN IF NOT EXISTS collection text DEFAULT '';
  ALTER TABLE products ADD COLUMN IF NOT EXISTS collection_category text DEFAULT '';

  Then tag products in Supabase:
  -- Clear existing collection tags first
  UPDATE products SET collection = '', collection_category = '';

  -- Signature Collection: top 12 skincare products by rating
  UPDATE products SET collection = 'signature', collection_category = 'skincare_sets'
  WHERE id IN (
    SELECT id FROM products WHERE category = 'Skincare' ORDER BY rating DESC, reviews_count DESC LIMIT 12
  );

  -- Limited Editions: top 8 by price (avoid overlap)
  UPDATE products SET collection = 'limited_edition', collection_category = 'skincare_sets'
  WHERE collection = '' AND id IN (
    SELECT id FROM products WHERE collection = '' ORDER BY price DESC LIMIT 8
  );

  -- Holiday Sets: 2 from each category (avoid overlap)
  UPDATE products SET collection = 'holiday_set', collection_category = 'gift_sets'
  WHERE collection = '' AND id IN (
    SELECT id FROM products WHERE collection = '' AND category = 'Skincare' ORDER BY rating DESC LIMIT 2
  );
  UPDATE products SET collection = 'holiday_set', collection_category = 'gift_sets'
  WHERE collection = '' AND id IN (
    SELECT id FROM products WHERE collection = '' AND category = 'Makeup' ORDER BY rating DESC LIMIT 2
  );
  UPDATE products SET collection = 'holiday_set', collection_category = 'gift_sets'
  WHERE collection = '' AND id IN (
    SELECT id FROM products WHERE collection = '' AND category = 'Fragrance' ORDER BY rating DESC LIMIT 2
  );

  -- Gift Sets: top 15 by review count (avoid overlap)
  UPDATE products SET collection = 'gift_set', collection_category = 'value_sets'
  WHERE collection = '' AND id IN (
    SELECT id FROM products WHERE collection = '' ORDER BY reviews_count DESC LIMIT 15
  );
*/

import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import {
  IoStarSharp,
  IoChevronBack,
  IoChevronForward,
  IoChevronDown,
  IoCheckmarkCircle,
  IoGiftOutline,
  IoSparklesOutline,
  IoSearchOutline,
  IoHeartOutline,
  IoBagOutline,
  IoLogoInstagram,
  IoLogoFacebook,
  IoLogoPinterest,
  IoLogoYoutube,
  IoWaterOutline,
  IoColorPaletteOutline,
  IoFlowerOutline,
} from 'react-icons/io5'

// Makeup subcategories with swatch data (from shop-makeup-dropdown-open)
const makeupSubcategories = [
  {
    name: 'Face',
    count: 5,
    swatchType: 'gradient',
    swatchColors: ['#FFE5D9', '#FFD4C4'],
    path: '/makeup',
  },
  {
    name: 'Eyes',
    count: 4,
    swatchType: 'multi',
    swatchColors: ['#C9A870', '#8B7355', '#E8D5C4'],
    path: '/makeup',
  },
  {
    name: 'Lips',
    count: 4,
    swatchType: 'gradient',
    swatchColors: ['#D4969C', '#C57B85'],
    path: '/makeup',
  },
  {
    name: 'Sets & Palettes',
    count: 3,
    swatchType: 'icon',
    swatchColors: [],
    path: '/makeup',
  },
]

// Face sub-items (from shop-face-dropdown)
const faceItems = [
  { name: 'Foundation',  image: 'https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=80&h=80&fit=crop', type: 'shadeRange', description: '12 shades available' },
  { name: 'Concealer',   image: 'https://images.unsplash.com/photo-1596704017254-9b121068ec31?w=80&h=80&fit=crop',  type: 'swatches',   swatches: ['#FFE5D9','#F5D4C4','#E8C4A0','#D4A882','#C9A870'], description: '8 shades available' },
  { name: 'Powder',      image: 'https://images.unsplash.com/photo-1522338140262-f46f5913618a?w=80&h=80&fit=crop',  type: 'badges',     badges: ['Matte','Satin','Luminous'], description: '6 options' },
  { name: 'Blush',       image: 'https://images.unsplash.com/photo-1583241800698-c8186278e259?w=80&h=80&fit=crop',  type: 'gradient',   gradient: ['#FFB5C0','#D4969C'], description: '10 shades' },
  { name: 'Highlighter', image: 'https://images.unsplash.com/photo-1515688594390-b649af70d282?w=80&h=80&fit=crop',  type: 'shimmer',    description: '6 luminous shades' },
]

// Eyes sub-items (from shop-eyes-dropdown)
const eyesItems = [
  { name: 'Eyeshadow', image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=80&h=80&fit=crop', type: 'colorSwatches', swatches: ['#FFE5D9','#F5D4C4','#E8C4A0','#D4A882','#C9A870','#8B7355'], description: '15 palettes available' },
  { name: 'Eyeliner',  image: 'https://images.unsplash.com/photo-1631730486572-226d1f595b68?w=80&h=80&fit=crop', type: 'badges',       badges: ['Liquid','Gel','Pencil'], description: '8 formulas' },
  { name: 'Mascara',   image: 'https://images.unsplash.com/photo-1631730486670-448828a11265?w=80&h=80&fit=crop', type: 'sparkle',      description: '6 volumizing options' },
  { name: 'Eyebrow',   image: 'https://images.unsplash.com/photo-1598452963314-b09f397a5c48?w=80&h=80&fit=crop', type: 'shadeBar',     description: '10 shaping products' },
]

// Lips sub-items (from shop-lips-dropdown)
const lipsItems = [
  { name: 'Lipstick',  image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=80&h=80&fit=crop', type: 'colorSwatches', swatches: ['#8B4A5C','#C73E3A','#E8967A','#D4A89C','#A8717D','#6B3940'], description: '18 shades available' },
  { name: 'Lip Gloss', image: 'https://images.unsplash.com/photo-1631730486613-940cdec63645?w=80&h=80&fit=crop', type: 'badges',       badges: ['Shimmer','Pearl','Clear'], description: '12 glossy finishes' },
  { name: 'Lip Liner', image: 'https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=80&h=80&fit=crop', type: 'shadeBar',     description: '10 defining shades' },
  { name: 'Lip Care',  image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=80&h=80&fit=crop', type: 'sparkle',      description: '8 nourishing treatments' },
]

// Cleanser sub-types (from shop-cleanser-dropdown)
const cleanserTypes = [
  { name: 'Foaming Cleanser', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=64&h=64&fit=crop', description: 'Deep cleansing formula' },
  { name: 'Gel Cleanser',     image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=64&h=64&fit=crop', description: 'Oil-control & refreshing' },
  { name: 'Cream Cleanser',   image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=64&h=64&fit=crop', description: 'Gentle & hydrating' },
  { name: 'Oil Cleanser',     image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=64&h=64&fit=crop', description: 'Makeup dissolving' },
]

// Serum sub-types (from shop-serums-dropdown)
const serumTypes = [
  { name: 'Hydrating Serum',   image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=64&h=64&fit=crop', description: 'Deep moisture boost' },
  { name: 'Vitamin C Serum',   image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=64&h=64&fit=crop', description: 'Brightening & glow'  },
  { name: 'Retinol Serum',     image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=64&h=64&fit=crop', description: 'Anti-aging power'    },
  { name: 'Niacinamide Serum', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=64&h=64&fit=crop', description: 'Pore refining'        },
  { name: 'Peptide Serum',     image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=64&h=64&fit=crop', description: 'Firming & lifting'   },
  { name: 'Exfoliating Serum', image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=64&h=64&fit=crop', description: 'Smooth texture'      },
]

// Moisturizer sub-types (from shop-moisturizers-dropdown)
const moisturizerTypes = [
  { name: 'Day Cream',          image: 'https://images.unsplash.com/photo-1556228841-db8e34940cad?w=64&h=64&fit=crop', description: 'Daily hydration'   },
  { name: 'Night Cream',        image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=64&h=64&fit=crop', description: 'Overnight repair'  },
  { name: 'Gel Moisturizer',    image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=64&h=64&fit=crop', description: 'Oil-free hydration' },
  { name: 'Rich Cream',         image: 'https://images.unsplash.com/photo-1570194065650-d99fb4f8f4b9?w=64&h=64&fit=crop', description: 'Deep nourishment'  },
  { name: 'Tinted Moisturizer', image: 'https://images.unsplash.com/photo-1631730486572-226d1f595b68?w=64&h=64&fit=crop', description: 'Coverage + care'   },
  { name: 'Barrier Cream',      image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=64&h=64&fit=crop', description: 'Skin protection'   },
]

// Eye Care sub-types (from shop-eyecare-dropdown)
const eyeCareTypes = [
  { name: 'Eye Cream',  image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=64&h=64&fit=crop', description: 'Anti-aging care'      },
  { name: 'Eye Serum',  image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=64&h=64&fit=crop', description: 'Intensive treatment'   },
  { name: 'Eye Gel',    image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=64&h=64&fit=crop', description: 'Lightweight hydration' },
  { name: 'Eye Mask',   image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=64&h=64&fit=crop', description: 'Instant refresh'       },
  { name: 'Eye Balm',   image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=64&h=64&fit=crop', description: 'Deep nourishment'      },
  { name: 'Eye Primer', image: 'https://images.unsplash.com/photo-1631730486572-226d1f595b68?w=64&h=64&fit=crop', description: 'Smooth base'           },
]

// Mask sub-types (from shop-mask-dropdown)
const maskTypes = [
  { name: 'Sheet Mask',    image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=64&h=64&fit=crop', description: 'Deep hydration'     },
  { name: 'Clay Mask',     image: 'https://images.unsplash.com/photo-1556228852-80a3c565a5b1?w=64&h=64&fit=crop', description: 'Purifying treatment'  },
  { name: 'Sleep Mask',    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=64&h=64&fit=crop', description: 'Overnight renewal'   },
  { name: 'Peel-Off Mask', image: 'https://images.unsplash.com/photo-1570554886111-e80fcca6a029?w=64&h=64&fit=crop', description: 'Gentle exfoliation'  },
  { name: 'Hydrogel Mask', image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=64&h=64&fit=crop', description: 'Cooling refresh'     },
  { name: 'Bubble Mask',   image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=64&h=64&fit=crop', description: 'Oxygenating care'    },
]

// Sunscreen sub-types (from shop-sunscreen-dropdown)
const sunscreenTypes = [
  { name: 'Mineral SPF 50+',   image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=64&h=64&fit=crop', description: 'Broad spectrum protection' },
  { name: 'Tinted SPF 45',     image: 'https://images.unsplash.com/photo-1556228852-80a3c565a5b1?w=64&h=64&fit=crop', description: 'Natural coverage shield'    },
  { name: 'Hydrating SPF 30',  image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=64&h=64&fit=crop', description: 'Moisture + protection'      },
  { name: 'Sport SPF 60',      image: 'https://images.unsplash.com/photo-1570554886111-e80fcca6a029?w=64&h=64&fit=crop', description: 'Active defense formula'     },
  { name: 'Anti-Aging SPF 40', image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=64&h=64&fit=crop', description: 'Youth preserving shield'    },
  { name: 'Powder SPF 35',     image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=64&h=64&fit=crop', description: 'Touch-up protection'        },
]

// Fragrance types (from shop-fragrance-dropdown)
const fragranceTypes = [
  { name: 'Eau de Parfum',   image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=64&h=64&fit=crop', description: 'Intense & long-lasting' },
  { name: 'Eau de Toilette', image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=64&h=64&fit=crop', description: 'Light & refreshing'     },
  { name: 'Body Mist',       image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=64&h=64&fit=crop', description: 'Subtle fragrance veil'  },
  { name: 'Discovery Sets',  image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=64&h=64&fit=crop', description: 'Sample our collection'  },
]

// Body Care types (from shop-bodycare-dropdown)
const bodyCareTypes = [
  { name: 'Body Lotion', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=64&h=64&fit=crop', description: 'Rich hydration'    },
  { name: 'Body Wash',   image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=64&h=64&fit=crop', description: 'Gentle cleansing'  },
  { name: 'Scrubs',      image: 'https://images.unsplash.com/photo-1570554886111-e80fcca6a029?w=64&h=64&fit=crop', description: 'Smooth & refine'   },
  { name: 'Hand Care',   image: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=64&h=64&fit=crop', description: 'Nourish & protect' },
]

// ─── Shared Data ──────────────────────────────────────────────────────────────
// NOTE: 'price' field removed — now fetched dynamically from Supabase
const desktopCollections = [
  { name: 'Signature Collection', subtitle: 'THE ICONS',         description: 'Our most beloved formulas in one essential edit',         products: '12 Products', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=580&h=720&fit=crop', badge: false },
  { name: 'Limited Editions',     subtitle: 'RARE BOTANICALS',   description: 'Exclusive seasonal formulations with precious ingredients', products: '8 Products',  image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=580&h=720&fit=crop', badge: true  },
  { name: 'Holiday 2024',         subtitle: 'GIFT OF RADIANCE',  description: 'Festive beauty sets wrapped in elegance',                  products: '6 Sets',      image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=580&h=420&fit=crop', badge: false },
  { name: 'Gift Sets',            subtitle: 'WRAPPED IN LUXURY', description: 'Thoughtfully curated gift collections',                    products: '15+ Options', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=580&h=420&fit=crop', badge: false },
]

const desktopCategories = ['All Collections', 'Skincare Sets', 'Makeup Collections', 'Fragrance Duos', 'Travel Sizes', 'Discovery Kits', 'Value Sets']

const featuredProducts = [
  { name: 'Ultimate Renewal Collection',  description: 'Complete anti-aging ritual with our most potent actives',    price: '$485', rating: 5, reviews: 324, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=460&h=560&fit=crop' },
  { name: 'Hydration Essentials Trio',    description: 'Three-step moisture boost for plump, dewy skin',             price: '$285', rating: 5, reviews: 412, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=460&h=280&fit=crop' },
  { name: 'Brightening Ritual Set',       description: 'Vitamin C powered routine for luminous glow',                price: '$345', rating: 5, reviews: 287, image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=460&h=280&fit=crop' },
]

const squareProducts = [
  { name: 'Daily Essentials Kit',  description: 'Perfect starter collection', price: '$165', reviews: 589, image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=300&h=300&fit=crop' },
  { name: 'Travel Beauty Set',     description: 'Luxury on the go',           price: '$128', reviews: 445, image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=300&h=300&fit=crop' },
  { name: 'Evening Ritual Duo',    description: 'Night repair essentials',    price: '$245', reviews: 356, image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=300&h=300&fit=crop' },
]

const rectangularProducts = [
  { name: 'Complete Skincare Journey',    description: 'Six essential steps to transformative skin',   price: '$595', reviews: 203, image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=470&h=400&fit=crop' },
  { name: 'Deluxe Discovery Collection', description: 'Experience our bestsellers in generous sizes',  price: '$385', reviews: 167, image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=470&h=400&fit=crop' },
]

const benefits = [
  { title: 'Curated Expertise', description: 'Professionally selected combinations for optimal results', icon: IoSparklesOutline },
  { title: 'Exclusive Value',   description: 'Special pricing available only in collection format',      icon: IoCheckmarkCircle  },
  { title: 'Gift Ready',        description: 'Beautiful packaging perfect for gifting',                  icon: IoGiftOutline      },
]

const mobileCategories = [
  {
    id: 'skincare', name: 'Skincare', icon: IoWaterOutline, count: 24,
    subcategories: [
      { name: 'Cleansers',    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=32&h=32&fit=crop' },
      { name: 'Serums',       image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=32&h=32&fit=crop' },
      { name: 'Moisturizers', image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=32&h=32&fit=crop' },
      { name: 'Eye Care',     image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=32&h=32&fit=crop' },
      { name: 'Masks',        image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=32&h=32&fit=crop' },
      { name: 'Sunscreen',    image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=32&h=32&fit=crop' },
    ]
  },
  {
    id: 'makeup', name: 'Makeup', icon: IoColorPaletteOutline, count: 18,
    subcategories: makeupSubcategories,
  },
  { id: 'fragrance', name: 'Fragrance', icon: IoFlowerOutline,   count: 12, subcategories: [] },
  { id: 'bodycare',  name: 'Body Care', icon: IoSparklesOutline, count: 8,  subcategories: [] },
]

const mobileFeaturedProducts = [
  { brand: 'Shan Loray', name: 'Botanical Renewal Serum', price: '$185', rating: 5, reviews: 248, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=240&h=240&fit=crop' },
  { brand: 'Shan Loray', name: 'Velvet Matte Lipstick',   price: '$42',  rating: 5, reviews: 486, image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=240&h=240&fit=crop' },
  { brand: 'Shan Loray', name: 'Luminous Eye Palette',    price: '$68',  rating: 5, reviews: 573, image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=240&h=240&fit=crop' },
]

const quickShopProducts = [
  { name: 'Hydrating Face Cleanser', price: '$58',  image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=140&fit=crop'  },
  { name: 'Radiant Foundation',      price: '$78',  image: 'https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=200&h=140&fit=crop' },
  { name: 'Supreme Moisture Cream',  price: '$165', image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=200&h=140&fit=crop' },
  { name: 'Perfecting Eye Cream',    price: '$98',  image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=200&h=140&fit=crop' },
  { name: 'Revitalizing Face Mask',  price: '$72',  image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=200&h=140&fit=crop' },
  { name: 'Daily SPF Moisturizer',   price: '$65',  image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=200&h=140&fit=crop' },
]

const mobileFilterTabs = ['All Products', 'Best Sellers', 'New Arrivals', 'Sale']

// ─── Collection Product Card ───────────────────────────────────────────────────
function CollectionProductCard({ product }) {
  const navigate = useNavigate()
  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="bg-white rounded-[12px] overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)] cursor-pointer hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] transition-all duration-300 group"
    >
      <div className="relative w-full aspect-square overflow-hidden">
        <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        {product.badge && <span className="absolute top-3 left-3 px-3 py-1 bg-[#C9A870] text-white text-[11px] font-medium rounded-full">{product.badge}</span>}
      </div>
      <div className="p-4">
        <p className="text-[11px] font-light italic text-[#8B7355] mb-1">{product.brand}</p>
        <h4 className="text-[15px] font-medium text-[#1A1A1A] mb-1 leading-tight line-clamp-2">{product.name}</h4>
        <p className="text-[12px] text-[#999999] mb-2 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-[16px] font-semibold text-[#1A1A1A]">${parseFloat(product.price).toFixed(2)}</span>
          <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <span key={i} className="text-[#C9A870] text-[12px]">★</span>)}</div>
        </div>
        <p className="text-[11px] text-[#999999] mt-1">({product.reviews_count || 0} reviews)</p>
      </div>
    </div>
  )
}

// ─── Mobile ───────────────────────────────────────────────────────────────────
function CollectionMobile() {
  const navigate = useNavigate()
  const [expandedCategory, setExpandedCategory] = useState('skincare')
  const [activeFilter, setActiveFilter]         = useState('All Products')
  const [expandedFace, setExpandedFace]         = useState(false)
  const [expandedEyes, setExpandedEyes]         = useState(false)
  const [expandedLips, setExpandedLips]         = useState(false)
  const [expandedCleanser, setExpandedCleanser] = useState(false)
  const [expandedSerum, setExpandedSerum]       = useState(false)
  const [expandedMoisturizer, setExpandedMoisturizer] = useState(false)
  const [expandedEyeCare, setExpandedEyeCare]         = useState(false)
  const [expandedMask, setExpandedMask]               = useState(false)
  const [expandedSunscreen, setExpandedSunscreen]     = useState(false)
  const [expandedFragrance, setExpandedFragrance]     = useState(false)
  const [skincareCount, setSkincareCount] = useState(0)
  const [makeupCount, setMakeupCount] = useState(0)
  const [fragranceCount, setFragranceCount] = useState(0)
  const [bodyCareCount, setBodyCareCount] = useState(0)
  const [featuredProductsMobile, setFeaturedProductsMobile] = useState([])
  const [allFeaturedProducts, setAllFeaturedProducts] = useState([])
  const [showAllFeatured, setShowAllFeatured] = useState(false)
  const [shopAllCategory, setShopAllCategory] = useState('All Products')
  const [shopAllProducts, setShopAllProducts] = useState([])
  const [loadingShopAll, setLoadingShopAll] = useState(false)

  const toggleCategory = (id) => setExpandedCategory(expandedCategory === id ? null : id)

  useEffect(() => {
    const fetchCounts = async () => {
      const [{ count: skincare }, { count: makeup }, { count: fragrance }] = await Promise.all([
        supabase.from('products').select('*', { count: 'exact', head: true }).ilike('category', 'Skincare'),
        supabase.from('products').select('*', { count: 'exact', head: true }).ilike('category', 'Makeup'),
        supabase.from('products').select('*', { count: 'exact', head: true }).ilike('category', 'Fragrance'),
      ])
      setSkincareCount(skincare || 0)
      setMakeupCount(makeup || 0)
      setFragranceCount(fragrance || 0)
      setBodyCareCount(0)
    }
    fetchCounts()
  }, [])

  // Fetch same 8 products as desktop All Collections (3 Skincare, 3 Makeup, 2 Fragrance by highest price)
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      const [{ data: skincare }, { data: makeup }, { data: fragrance }] = await Promise.all([
        supabase.from('products').select('*').ilike('category', 'Skincare').order('price', { ascending: false }).limit(3),
        supabase.from('products').select('*').ilike('category', 'Makeup').order('price', { ascending: false }).limit(3),
        supabase.from('products').select('*').ilike('category', 'Fragrance').order('price', { ascending: false }).limit(2),
      ])
      const all = [...(skincare || []), ...(makeup || []), ...(fragrance || [])]
      setAllFeaturedProducts(all)
      setFeaturedProductsMobile(all.slice(0, 3))
    }
    fetchFeaturedProducts()
  }, [])

  const fetchShopAllProducts = async (category) => {
    setShopAllCategory(category)
    setLoadingShopAll(true)
    let query = supabase.from('products').select('*').limit(12)
    if (category === 'All Products') {
      query = query.order('rating', { ascending: false })
    } else if (category === 'Skincare Sets') {
      query = query.ilike('category', 'Skincare').order('rating', { ascending: false })
    } else if (category === 'Makeup Collections') {
      query = query.ilike('category', 'Makeup').order('rating', { ascending: false })
    } else if (category === 'Fragrance Duos') {
      query = query.ilike('category', 'Fragrance').order('rating', { ascending: false })
    } else if (category === 'Travel Sizes') {
      query = query.eq('collection_category', 'travel_sizes').order('rating', { ascending: false })
    } else if (category === 'Discovery Kits') {
      query = query.eq('collection_category', 'discovery_kits').order('rating', { ascending: false })
    } else if (category === 'Value Sets') {
      query = query.eq('collection_category', 'value_sets').order('rating', { ascending: false })
    } else {
      query = query.eq('collection_category', category.toLowerCase().replace(' ', '_')).order('rating', { ascending: false })
    }
    const { data } = await query
    setShopAllProducts(data || [])
    setLoadingShopAll(false)
  }

  useEffect(() => {
    fetchShopAllProducts('All Products')
  }, [])

  const mobileCategoryDynamicCount = { skincare: skincareCount, makeup: makeupCount, fragrance: fragranceCount, bodycare: bodyCareCount }
  const shopAllTabs = ['All Products', 'Skincare Sets', 'Makeup Collections', 'Fragrance Duos', 'Travel Sizes', 'Discovery Kits', 'Value Sets']

  return (
    <div className="w-full min-h-screen bg-white font-['Cormorant_Garamond']">

      {/* Hero Banner */}
      <div className="bg-gradient-to-b from-[#FDFBF7] to-[#F5F1EA] px-5 py-10 relative overflow-hidden flex flex-col justify-center min-h-[220px]">
        <img src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=200&h=220&fit=crop" alt="" className="absolute top-0 right-0 w-[160px] h-[220px] object-cover opacity-20" />
        <div className="relative z-10">
          <p className="text-[11px] font-light italic text-[#8B7355] tracking-[2px] mb-2">BEAUTY REDEFINED</p>
          <h1 className="text-[36px] font-bold text-[#1A1A1A] leading-[1] mb-2">Shop By Category</h1>
          <p className="text-[14px] font-normal text-[#666666] mb-3">Discover your perfect products</p>
          <div className="w-[60px] h-[2px] bg-[#C9A870]" />
        </div>
      </div>

      {/* Quick Filter Bar */}
      <div className="bg-white border-b border-[#E8E3D9] px-5 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        <div className="flex items-center gap-3 py-3 w-max">
          {mobileFilterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-4 py-2 text-[14px] rounded-[24px] whitespace-nowrap transition-all ${
                activeFilter === tab
                  ? 'bg-white text-[#2B2B2B] font-medium shadow-[0_2px_8px_rgba(0,0,0,0.08)]'
                  : 'bg-transparent text-[#8B7355] font-normal'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Category Accordion */}
      <div className="bg-white">
        {mobileCategories.map((category) => (
          <div key={category.id}>
            {/* Category Header */}
            <button
              onClick={() => toggleCategory(category.id)}
              className="w-full min-h-[68px] bg-white border-b border-[#E8E3D9] px-5 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#F5F1EA] rounded-full flex items-center justify-center">
                  <category.icon className="w-5 h-5 text-[#8B7355]" />
                </div>
                <span className="text-[17px] font-medium text-[#1A1A1A]">{category.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[12px] font-light text-[#999999]">{mobileCategoryDynamicCount[category.id] ?? category.count} products</span>
                <IoChevronDown className={`w-5 h-5 text-[#8B7355] transition-transform duration-200 ${expandedCategory === category.id ? 'rotate-180' : ''}`} />
              </div>
            </button>

            {/* Expanded — Skincare list */}
            {category.id === 'skincare' && expandedCategory === category.id && (
              <div className="bg-white">
                {category.subcategories.map((sub) => (
                  <div key={sub.name}>
                    {sub.name === 'Cleansers' && (
                      <div>
                        <button
                          onClick={() => setExpandedCleanser(!expandedCleanser)}
                          className={`w-full min-h-[56px] px-5 flex items-center justify-between border-b border-[#E8E3D9] transition-colors ${expandedCleanser ? 'bg-[#FDFBF7]' : 'bg-white hover:bg-[#FAF8F5]'}`}
                        >
                          <div className="flex items-center gap-3">
                            <img src={sub.image} alt={sub.name} className="w-9 h-9 rounded-full object-cover" />
                            <span className="text-[15px] font-medium text-[#1A1A1A]">{sub.name}</span>
                          </div>
                          <IoChevronDown className={`w-[18px] h-[18px] text-[#8B7355] transition-transform duration-200 ${expandedCleanser ? 'rotate-180' : ''}`} />
                        </button>
                        {expandedCleanser && (
                          <div className="bg-[#F9F6F2] px-4 py-4 border-b border-[#E8E3D9]">
                            <div className="grid grid-cols-2 gap-3">
                              {cleanserTypes.map((type) => (
                                <div key={type.name} onClick={() => navigate('/skincare?subcategory=Cleansers')} className="bg-white border border-[#E8E3D9] rounded-[10px] p-3 flex flex-col items-center gap-2 cursor-pointer hover:bg-[#FAF8F5]">
                                  <img src={type.image} alt={type.name} className="w-[72px] h-[72px] rounded-[8px] object-cover" />
                                  <span className="text-[13px] font-normal text-[#2B2B2B] text-center leading-tight">{type.name}</span>
                                  <p className="text-[11px] font-light text-[#999999] text-center">{type.description}</p>
                                  <IoChevronForward className="w-[14px] h-[14px] text-[#8B7355]" />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {sub.name === 'Serums' && (
                      <div>
                        <button
                          onClick={() => setExpandedSerum(!expandedSerum)}
                          className={`w-full min-h-[56px] px-5 flex items-center justify-between border-b border-[#E8E3D9] transition-colors ${expandedSerum ? 'bg-[#FDFBF7]' : 'bg-white hover:bg-[#FAF8F5]'}`}
                        >
                          <div className="flex items-center gap-3">
                            <img src={sub.image} alt={sub.name} className="w-9 h-9 rounded-full object-cover" />
                            <span className="text-[15px] font-medium text-[#1A1A1A]">{sub.name}</span>
                          </div>
                          <IoChevronDown className={`w-[18px] h-[18px] text-[#8B7355] transition-transform duration-200 ${expandedSerum ? 'rotate-180' : ''}`} />
                        </button>
                        {expandedSerum && (
                          <div className="bg-[#F9F6F2] px-4 py-4 border-b border-[#E8E3D9]">
                            <div className="grid grid-cols-2 gap-3">
                              {serumTypes.map((type) => (
                                <div key={type.name} onClick={() => navigate('/skincare?subcategory=Serums')} className="bg-white border border-[#E8E3D9] rounded-[10px] p-3 flex flex-col items-center gap-2 cursor-pointer hover:bg-[#FAF8F5]">
                                  <img src={type.image} alt={type.name} className="w-[72px] h-[72px] rounded-[8px] object-cover" />
                                  <span className="text-[13px] font-normal text-[#2B2B2B] text-center leading-tight">{type.name}</span>
                                  <p className="text-[11px] font-light text-[#999999] text-center">{type.description}</p>
                                  <IoChevronForward className="w-[14px] h-[14px] text-[#8B7355]" />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {sub.name === 'Moisturizers' && (
                      <div>
                        <button
                          onClick={() => setExpandedMoisturizer(!expandedMoisturizer)}
                          className={`w-full min-h-[56px] px-5 flex items-center justify-between border-b border-[#E8E3D9] transition-colors ${expandedMoisturizer ? 'bg-[#FDFBF7]' : 'bg-white hover:bg-[#FAF8F5]'}`}
                        >
                          <div className="flex items-center gap-3">
                            <img src={sub.image} alt={sub.name} className="w-9 h-9 rounded-full object-cover" />
                            <span className="text-[15px] font-medium text-[#1A1A1A]">{sub.name}</span>
                          </div>
                          <IoChevronDown className={`w-[18px] h-[18px] text-[#8B7355] transition-transform duration-200 ${expandedMoisturizer ? 'rotate-180' : ''}`} />
                        </button>
                        {expandedMoisturizer && (
                          <div className="bg-[#F9F6F2] px-4 py-4 border-b border-[#E8E3D9]">
                            <div className="grid grid-cols-2 gap-3">
                              {moisturizerTypes.map((type) => (
                                <div key={type.name} onClick={() => navigate('/skincare?subcategory=Moisturizers')} className="bg-white border border-[#E8E3D9] rounded-[10px] p-3 flex flex-col items-center gap-2 cursor-pointer hover:bg-[#FAF8F5]">
                                  <img src={type.image} alt={type.name} className="w-[72px] h-[72px] rounded-[8px] object-cover" />
                                  <span className="text-[13px] font-normal text-[#2B2B2B] text-center leading-tight">{type.name}</span>
                                  <p className="text-[11px] font-light text-[#999999] text-center">{type.description}</p>
                                  <IoChevronForward className="w-[14px] h-[14px] text-[#8B7355]" />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {sub.name === 'Eye Care' && (
                      <div>
                        <button
                          onClick={() => setExpandedEyeCare(!expandedEyeCare)}
                          className={`w-full min-h-[56px] px-5 flex items-center justify-between border-b border-[#E8E3D9] transition-colors ${expandedEyeCare ? 'bg-[#FDFBF7]' : 'bg-white hover:bg-[#FAF8F5]'}`}
                        >
                          <div className="flex items-center gap-3">
                            <img src={sub.image} alt={sub.name} className="w-9 h-9 rounded-full object-cover" />
                            <span className="text-[15px] font-medium text-[#1A1A1A]">{sub.name}</span>
                          </div>
                          <IoChevronDown className={`w-[18px] h-[18px] text-[#8B7355] transition-transform duration-200 ${expandedEyeCare ? 'rotate-180' : ''}`} />
                        </button>
                        {expandedEyeCare && (
                          <div className="bg-[#F9F6F2] px-4 py-4 border-b border-[#E8E3D9]">
                            <div className="grid grid-cols-2 gap-3">
                              {eyeCareTypes.map((type) => (
                                <div key={type.name} onClick={() => navigate('/skincare?subcategory=Eye Care')} className="bg-white border border-[#E8E3D9] rounded-[10px] p-3 flex flex-col items-center gap-2 cursor-pointer hover:bg-[#FAF8F5]">
                                  <img src={type.image} alt={type.name} className="w-[72px] h-[72px] rounded-[8px] object-cover" />
                                  <span className="text-[13px] font-normal text-[#2B2B2B] text-center leading-tight">{type.name}</span>
                                  <p className="text-[11px] font-light text-[#999999] text-center">{type.description}</p>
                                  <IoChevronForward className="w-[14px] h-[14px] text-[#8B7355]" />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {sub.name === 'Masks' && (
                      <div>
                        <button
                          onClick={() => setExpandedMask(!expandedMask)}
                          className={`w-full min-h-[56px] px-5 flex items-center justify-between border-b border-[#E8E3D9] transition-colors ${expandedMask ? 'bg-[#FDFBF7]' : 'bg-white hover:bg-[#FAF8F5]'}`}
                        >
                          <div className="flex items-center gap-3">
                            <img src={sub.image} alt={sub.name} className="w-9 h-9 rounded-full object-cover" />
                            <span className="text-[15px] font-medium text-[#1A1A1A]">{sub.name}</span>
                          </div>
                          <IoChevronDown className={`w-[18px] h-[18px] text-[#8B7355] transition-transform duration-200 ${expandedMask ? 'rotate-180' : ''}`} />
                        </button>
                        {expandedMask && (
                          <div className="bg-[#F9F6F2] px-4 py-4 border-b border-[#E8E3D9]">
                            <div className="grid grid-cols-2 gap-3">
                              {maskTypes.map((type) => (
                                <div key={type.name} onClick={() => navigate('/skincare?subcategory=Masks')} className="bg-white border border-[#E8E3D9] rounded-[10px] p-3 flex flex-col items-center gap-2 cursor-pointer hover:bg-[#FAF8F5]">
                                  <img src={type.image} alt={type.name} className="w-[72px] h-[72px] rounded-[8px] object-cover" />
                                  <span className="text-[13px] font-normal text-[#2B2B2B] text-center leading-tight">{type.name}</span>
                                  <p className="text-[11px] font-light text-[#999999] text-center">{type.description}</p>
                                  <IoChevronForward className="w-[14px] h-[14px] text-[#8B7355]" />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {sub.name === 'Sunscreen' && (
                      <div>
                        <button
                          onClick={() => setExpandedSunscreen(!expandedSunscreen)}
                          className={`w-full min-h-[56px] px-5 flex items-center justify-between border-b border-[#E8E3D9] transition-colors ${expandedSunscreen ? 'bg-[#FDFBF7]' : 'bg-white hover:bg-[#FAF8F5]'}`}
                        >
                          <div className="flex items-center gap-3">
                            <img src={sub.image} alt={sub.name} className="w-9 h-9 rounded-full object-cover" />
                            <span className="text-[15px] font-medium text-[#1A1A1A]">{sub.name}</span>
                          </div>
                          <IoChevronDown className={`w-[18px] h-[18px] text-[#8B7355] transition-transform duration-200 ${expandedSunscreen ? 'rotate-180' : ''}`} />
                        </button>
                        {expandedSunscreen && (
                          <div className="bg-[#F9F6F2] px-4 py-4 border-b border-[#E8E3D9]">
                            <div className="grid grid-cols-2 gap-3">
                              {sunscreenTypes.map((type) => (
                                <div key={type.name} onClick={() => navigate('/skincare?subcategory=Sunscreen')} className="bg-white border border-[#E8E3D9] rounded-[10px] p-3 flex flex-col items-center gap-2 cursor-pointer hover:bg-[#FAF8F5]">
                                  <img src={type.image} alt={type.name} className="w-[72px] h-[72px] rounded-[8px] object-cover" />
                                  <span className="text-[13px] font-normal text-[#2B2B2B] text-center leading-tight">{type.name}</span>
                                  <p className="text-[11px] font-light text-[#999999] text-center">{type.description}</p>
                                  <IoChevronForward className="w-[14px] h-[14px] text-[#8B7355]" />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Expanded — Makeup with swatches + Face drill-down */}
            {category.id === 'makeup' && expandedCategory === category.id && (
              <div className="bg-[#FDFBF7]">
                {category.subcategories.map((sub) => (
                  <div key={sub.name}>
                    {sub.name === 'Face' && (
                      <button
                        onClick={() => setExpandedFace(!expandedFace)}
                        className={`w-full min-h-[52px] px-5 flex items-center justify-between border-b border-[#E8E3D9] transition-colors ${expandedFace ? 'bg-[#FDFBF7]' : 'bg-white hover:bg-[#FAF8F5]'}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(135deg, #FFE5D9, #FFD4C4)' }} />
                          <span className="text-[14px] font-medium text-[#2B2B2B]">Face</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[12px] font-normal text-[#999999]">5 items</span>
                          <IoChevronDown className={`w-4 h-4 text-[#8B7355] transition-transform duration-200 ${expandedFace ? 'rotate-180' : ''}`} />
                        </div>
                      </button>
                    )}

                    {sub.name === 'Eyes' && (
                      <button
                        onClick={() => setExpandedEyes(!expandedEyes)}
                        className={`w-full min-h-[52px] px-5 flex items-center justify-between border-b border-[#E8E3D9] transition-colors ${expandedEyes ? 'bg-[#FDFBF7]' : 'bg-white hover:bg-[#FAF8F5]'}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-full flex-shrink-0 relative overflow-hidden">
                            <div className="absolute inset-0 flex">
                              <div className="flex-1" style={{ backgroundColor: '#C9A870' }} />
                              <div className="flex-1" style={{ backgroundColor: '#8B7355' }} />
                              <div className="flex-1" style={{ backgroundColor: '#E8D5C4' }} />
                            </div>
                          </div>
                          <span className="text-[14px] font-medium text-[#2B2B2B]">Eyes</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[12px] font-normal text-[#999999]">4 items</span>
                          <IoChevronDown className={`w-4 h-4 text-[#8B7355] transition-transform duration-200 ${expandedEyes ? 'rotate-180' : ''}`} />
                        </div>
                      </button>
                    )}

                    {sub.name === 'Lips' && (
                      <button
                        onClick={() => setExpandedLips(!expandedLips)}
                        className={`w-full min-h-[52px] px-5 flex items-center justify-between border-b border-[#E8E3D9] transition-colors ${expandedLips ? 'bg-[#FDFBF7]' : 'bg-white hover:bg-[#FAF8F5]'}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(135deg, #D4969C, #C57B85)' }} />
                          <span className="text-[14px] font-medium text-[#2B2B2B]">Lips</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[12px] font-normal text-[#999999]">4 items</span>
                          <IoChevronDown className={`w-4 h-4 text-[#8B7355] transition-transform duration-200 ${expandedLips ? 'rotate-180' : ''}`} />
                        </div>
                      </button>
                    )}

                    {sub.name === 'Sets & Palettes' && (
                      <Link to={sub.path || '/makeup'}>
                        <div className="min-h-[52px] bg-white hover:bg-[#FAF8F5] px-5 flex items-center justify-between border-b border-[#E8E3D9] last:border-b-0 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="w-7 h-7 bg-[#F5F1EA] rounded-full flex items-center justify-center flex-shrink-0">
                              <IoGiftOutline className="w-4 h-4 text-[#C9A870]" />
                            </div>
                            <span className="text-[14px] font-medium text-[#2B2B2B]">{sub.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[12px] font-normal text-[#999999]">{sub.count} items</span>
                            <IoChevronForward className="w-4 h-4 text-[#8B7355]" />
                          </div>
                        </div>
                      </Link>
                    )}

                    {sub.name === 'Face' && expandedFace && (
                      <div className="bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)] px-4 py-2">
                        {faceItems.map((item, idx) => (
                          <div
                            key={item.name}
                            onClick={() => navigate(`/makeup?subcategory=${item.name}`)}
                            className={`min-h-[72px] hover:bg-[#FAF8F5] flex items-center gap-3 px-2 py-2 cursor-pointer ${idx < faceItems.length - 1 ? 'border-b border-[#E8E3D9]' : ''}`}
                          >
                            <img src={item.image} alt={item.name} className="w-[64px] h-[64px] rounded-[8px] object-cover flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <h3 className="text-[15px] font-medium text-[#1A1A1A] mb-1">{item.name}</h3>
                              {item.type === 'shadeRange' && (
                                <div className="w-[100px] h-[5px] rounded-full mb-1" style={{ background: 'linear-gradient(90deg, #FFE5D9 0%, #C9A870 50%, #8B7355 100%)' }} />
                              )}
                              {item.type === 'swatches' && (
                                <div className="flex items-center gap-1 mb-1">
                                  {item.swatches.map((color, i) => (
                                    <div key={i} className="w-[20px] h-[20px] rounded-full border border-[#E8E3D9]" style={{ backgroundColor: color }} />
                                  ))}
                                </div>
                              )}
                              {item.type === 'badges' && (
                                <div className="flex items-center gap-1 mb-1 flex-wrap">
                                  {item.badges.map((badge) => (
                                    <span key={badge} className="text-[9px] font-normal text-[#8B7355] bg-[#F5F1EA] px-[5px] py-[2px] rounded-[12px]">{badge}</span>
                                  ))}
                                </div>
                              )}
                              {item.type === 'gradient' && (
                                <div className="w-[28px] h-[28px] rounded-full mb-1" style={{ background: `linear-gradient(135deg, ${item.gradient[0]}, ${item.gradient[1]})` }} />
                              )}
                              {item.type === 'shimmer' && (
                                <IoSparklesOutline className="w-4 h-4 text-[#C9A870] mb-1" />
                              )}
                              <p className="text-[12px] font-normal text-[#999999]">{item.description}</p>
                            </div>
                            <IoChevronForward className="w-[16px] h-[16px] text-[#8B7355] flex-shrink-0" />
                          </div>
                        ))}
                      </div>
                    )}

                    {sub.name === 'Eyes' && expandedEyes && (
                      <div className="bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)] px-4 py-2">
                        {eyesItems.map((item, idx) => (
                          <div
                            key={item.name}
                            onClick={() => navigate(`/makeup?subcategory=${item.name}`)}
                            className={`min-h-[72px] hover:bg-[#FAF8F5] flex items-center gap-3 px-2 py-2 cursor-pointer ${idx < eyesItems.length - 1 ? 'border-b border-[#E8E3D9]' : ''}`}
                          >
                            <img src={item.image} alt={item.name} className="w-[64px] h-[64px] rounded-[8px] object-cover flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <h3 className="text-[15px] font-medium text-[#1A1A1A] mb-1">{item.name}</h3>
                              {item.type === 'colorSwatches' && (
                                <div className="flex items-center gap-1 mb-1">
                                  {item.swatches.map((color, i) => (
                                    <div key={i} className="w-[18px] h-[18px] rounded-full border border-[#E8E3D9]" style={{ backgroundColor: color }} />
                                  ))}
                                </div>
                              )}
                              {item.type === 'badges' && (
                                <div className="flex items-center gap-1 mb-1 flex-wrap">
                                  {item.badges.map((badge) => (
                                    <span key={badge} className="text-[9px] font-normal text-[#8B7355] bg-[#F5F1EA] px-[5px] py-[2px] rounded-[12px]">{badge}</span>
                                  ))}
                                </div>
                              )}
                              {item.type === 'sparkle' && (
                                <IoSparklesOutline className="w-4 h-4 text-[#C9A870] mb-1" />
                              )}
                              {item.type === 'shadeBar' && (
                                <div className="w-[100px] h-[5px] rounded-full mb-1" style={{ background: 'linear-gradient(90deg, #E8D5C4 0%, #C9A870 50%, #8B7355 100%)' }} />
                              )}
                              <p className="text-[12px] font-normal text-[#999999]">{item.description}</p>
                            </div>
                            <IoChevronForward className="w-[16px] h-[16px] text-[#8B7355] flex-shrink-0" />
                          </div>
                        ))}
                      </div>
                    )}

                    {sub.name === 'Lips' && expandedLips && (
                      <div className="bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)] px-4 py-2">
                        {lipsItems.map((item, idx) => (
                          <div
                            key={item.name}
                            onClick={() => navigate(`/makeup?subcategory=${item.name}`)}
                            className={`min-h-[72px] hover:bg-[#FAF8F5] flex items-center gap-3 px-2 py-2 cursor-pointer ${idx < lipsItems.length - 1 ? 'border-b border-[#E8E3D9]' : ''}`}
                          >
                            <img src={item.image} alt={item.name} className="w-[64px] h-[64px] rounded-[8px] object-cover flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <h3 className="text-[15px] font-medium text-[#1A1A1A] mb-1">{item.name}</h3>
                              {item.type === 'colorSwatches' && (
                                <div className="flex items-center gap-1 mb-1 flex-wrap">
                                  {item.swatches.map((color, i) => (
                                    <div key={i} className="w-[18px] h-[18px] rounded-full border border-[#E8E3D9]" style={{ backgroundColor: color }} />
                                  ))}
                                </div>
                              )}
                              {item.type === 'badges' && (
                                <div className="flex items-center gap-1 mb-1 flex-wrap">
                                  {item.badges.map((badge) => (
                                    <span key={badge} className="text-[9px] font-normal text-[#8B7355] bg-[#F5F1EA] px-[5px] py-[2px] rounded-[12px]">{badge}</span>
                                  ))}
                                </div>
                              )}
                              {item.type === 'shadeBar' && (
                                <div className="w-[100px] h-[5px] rounded-full mb-1" style={{ background: 'linear-gradient(90deg, #F5D4C4 0%, #D4969C 50%, #8B4A5C 100%)' }} />
                              )}
                              {item.type === 'sparkle' && (
                                <IoSparklesOutline className="w-4 h-4 text-[#C9A870] mb-1" />
                              )}
                              <p className="text-[12px] font-normal text-[#999999]">{item.description}</p>
                            </div>
                            <IoChevronForward className="w-[16px] h-[16px] text-[#8B7355] flex-shrink-0" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Expanded — Fragrance 2x2 grid */}
            {category.id === 'fragrance' && expandedCategory === category.id && (
              <div className="bg-[#F9F6F2] px-4 py-4 border-b border-[#E8E3D9]">
                <div className="grid grid-cols-2 gap-3">
                  {fragranceTypes.map((type) => (
                    <div key={type.name} onClick={() => navigate(`/fragrance?subcategory=${type.name}`)} className="bg-white border border-[#E8E3D9] rounded-[10px] p-3 flex flex-col items-center gap-2 cursor-pointer hover:bg-[#FAF8F5]">
                      <img src={type.image} alt={type.name} className="w-[72px] h-[72px] rounded-[8px] object-cover" />
                      <span className="text-[13px] font-normal text-[#2B2B2B] text-center leading-tight">{type.name}</span>
                      <p className="text-[11px] font-light text-[#999999] text-center">{type.description}</p>
                      <IoChevronForward className="w-[14px] h-[14px] text-[#8B7355]" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Expanded — Body Care 2x2 grid */}
            {category.id === 'bodycare' && expandedCategory === category.id && (
              <div className="bg-[#F9F6F2] px-4 py-4 border-b border-[#E8E3D9]">
                <div className="grid grid-cols-2 gap-3">
                  {bodyCareTypes.map((type) => (
                    <div key={type.name} onClick={() => navigate('/bodycare')} className="bg-white border border-[#E8E3D9] rounded-[10px] p-3 flex flex-col items-center gap-2 cursor-pointer hover:bg-[#FAF8F5]">
                      <img src={type.image} alt={type.name} className="w-[72px] h-[72px] rounded-[8px] object-cover" />
                      <span className="text-[13px] font-normal text-[#2B2B2B] text-center leading-tight">{type.name}</span>
                      <p className="text-[11px] font-light text-[#999999] text-center">{type.description}</p>
                      <IoChevronForward className="w-[14px] h-[14px] text-[#8B7355]" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Featured Products */}
      <div className="bg-white px-5 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[20px] font-bold text-[#1A1A1A]">Featured Products</h2>
          <button
            onClick={() => setShowAllFeatured(!showAllFeatured)}
            className="text-[14px] font-medium text-[#8B7355]"
          >
            {showAllFeatured ? 'Show Less' : 'View All'}
          </button>
        </div>

        {/* Collapsed: horizontal scroll of 3 products */}
        {!showAllFeatured && (
          <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
            {featuredProductsMobile.map((product, idx) => (
              <div key={product.id || idx} onClick={() => navigate(`/product/${product.id}`)} className="min-w-[240px] bg-white rounded-[12px] shadow-[0_4px_12px_rgba(0,0,0,0.08)] overflow-hidden flex-shrink-0 cursor-pointer">
                <div className="relative h-[240px]">
                  <img src={product.image_url || product.image} alt={product.name} className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.12)]">
                    <IoHeartOutline className="w-5 h-5 text-[#2B2B2B]" />
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-[11px] font-light italic text-[#8B7355] tracking-[1.2px] mb-1">{product.brand}</p>
                  <h3 className="text-[16px] font-medium text-[#2B2B2B] mb-2 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[19px] font-semibold text-[#1A1A1A]">${parseFloat(product.price).toFixed(2)}</span>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => <IoStarSharp key={i} className="w-3 h-3 text-[#C9A870]" />)}
                    </div>
                  </div>
                  <button className="w-full h-[42px] bg-[#8B7355] text-white text-[14px] font-medium rounded-[8px]">
                    Quick Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Expanded: 2-column grid of all 8 products */}
        {showAllFeatured && (
          <div className="grid grid-cols-2 gap-3">
            {allFeaturedProducts.map((product) => (
              <div key={product.id} onClick={() => navigate(`/product/${product.id}`)} className="bg-white rounded-[8px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden cursor-pointer">
                <div className="relative h-[140px]">
                  <img src={product.image_url || product.image} alt={product.name} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.12)]">
                    <IoHeartOutline className="w-4 h-4 text-[#2B2B2B]" />
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-[10px] font-light italic text-[#8B7355] mb-0.5">{product.brand}</p>
                  <h3 className="text-[13px] font-normal text-[#2B2B2B] mb-1 line-clamp-2 h-[36px]">{product.name}</h3>
                  <span className="text-[16px] font-medium text-[#1A1A1A]">${parseFloat(product.price).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Shop All Products */}
      <div className="bg-white px-5 py-6 border-t border-[#E8E3D9]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[20px] font-bold text-[#1A1A1A]">Shop All Products</h2>
        </div>
        <div className="overflow-x-auto mb-4" style={{ scrollbarWidth: 'none' }}>
          <div className="flex items-center gap-2 w-max py-1">
            {shopAllTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => fetchShopAllProducts(tab)}
                className={`px-4 py-2 text-[13px] rounded-[24px] whitespace-nowrap transition-all border ${
                  shopAllCategory === tab
                    ? 'bg-[#8B7355] text-white border-[#8B7355] font-medium'
                    : 'bg-transparent text-[#8B7355] border-[#C9A870] font-normal'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        {loadingShopAll ? (
          <div className="flex items-center justify-center py-10">
            <div className="w-8 h-8 rounded-full border-2 border-[#8B7355] border-t-transparent animate-spin" />
          </div>
        ) : shopAllProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-[16px] font-medium text-[#999999]">No products found in this collection</p>
            <p className="text-[13px] text-[#BBBBBB] mt-2">Try selecting a different collection or category</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {shopAllProducts.map((product) => (
              <div key={product.id} onClick={() => navigate(`/product/${product.id}`)} className="bg-white rounded-[8px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden cursor-pointer">
                <div className="relative h-[140px]">
                  <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                  <button className="absolute top-2 right-2 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center">
                    <IoHeartOutline className="w-4 h-4 text-[#2B2B2B]" />
                  </button>
                </div>
                <div className="p-3">
                  <p className="text-[10px] font-light italic text-[#8B7355] mb-0.5">{product.brand}</p>
                  <h3 className="text-[13px] font-normal text-[#2B2B2B] mb-1 line-clamp-2 h-[36px]">{product.name}</h3>
                  <span className="text-[16px] font-medium text-[#1A1A1A]">${parseFloat(product.price).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
        <button className="w-full min-h-[48px] mt-5 border-2 border-[#8B7355] text-[#8B7355] text-[15px] font-medium rounded-[8px]">
          Load More
        </button>
      </div>

    </div>
  )
}

const collectionTitles = {
  signature: 'Signature Collection',
  limited_edition: 'Limited Editions',
  holiday_set: 'Holiday 2024',
  gift_set: 'Gift Sets',
}

const collectionKeyMap = {
  'Signature Collection': 'signature',
  'Limited Editions': 'limited_edition',
  'Holiday 2024': 'holiday_set',
  'Gift Sets': 'gift_set',
}

// ─── Desktop (+ Tablet responsive) ───────────────────────────────────────────
function CollectionDesktop() {
  const location = useLocation()
  const [selectedCollection, setSelectedCollection] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('All Collections')
  const [collectionProducts, setCollectionProducts] = useState([])
  const [loadingProducts, setLoadingProducts] = useState(false)
  const [collectionPrices, setCollectionPrices] = useState({})
  // ── All Collections: 8 real products (3 Skincare, 3 Makeup, 2 Fragrance) by highest price ──
  const [allCollectionsProducts, setAllCollectionsProducts] = useState([])
  const productsRef = useRef(null)

  // Fetch min price for each collection on mount
  useEffect(() => {
    const fetchMinPrices = async () => {
      const keys = ['signature', 'limited_edition', 'holiday_set', 'gift_set']
      const prices = {}
      await Promise.all(
        keys.map(async (key) => {
          const { data } = await supabase
            .from('products')
            .select('price')
            .eq('collection', key)
            .order('price', { ascending: true })
            .limit(1)
          if (data && data.length > 0) {
            prices[key] = `From $${parseFloat(data[0].price).toFixed(0)}`
          } else {
            prices[key] = ''
          }
        })
      )
      setCollectionPrices(prices)
    }
    fetchMinPrices()
  }, [])

  // Fetch 8 real products for "All Collections" default view (3 Skincare, 3 Makeup, 2 Fragrance) by highest price
  useEffect(() => {
    const fetchAllCollectionsProducts = async () => {
      const [{ data: skincare }, { data: makeup }, { data: fragrance }] = await Promise.all([
        supabase.from('products').select('*').ilike('category', 'Skincare').order('price', { ascending: false }).limit(3),
        supabase.from('products').select('*').ilike('category', 'Makeup').order('price', { ascending: false }).limit(3),
        supabase.from('products').select('*').ilike('category', 'Fragrance').order('price', { ascending: false }).limit(2),
      ])
      setAllCollectionsProducts([
        ...(skincare || []),
        ...(makeup || []),
        ...(fragrance || []),
      ])
    }
    fetchAllCollectionsProducts()
  }, [])

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.replace('#', ''))
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
    }
  }, [location])

  const fetchCollectionProducts = async (collectionKey) => {
    if (selectedCollection === collectionKey) {
      setSelectedCollection(null)
      setCollectionProducts([])
      return
    }
    setSelectedCollection(collectionKey)
    setLoadingProducts(true)
    setSelectedCategory('All Collections')
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('collection', collectionKey)
    setCollectionProducts(data || [])
    setLoadingProducts(false)
    setTimeout(() => {
      productsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  const fetchCategoryProducts = async (cat) => {
    setSelectedCategory(cat)
    if (selectedCollection) return
    if (cat === 'All Collections') {
      // Show the 8 curated real products, scroll to them
      setCollectionProducts(allCollectionsProducts)
      setLoadingProducts(false)
      setTimeout(() => {
        productsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
      return
    }
    setLoadingProducts(true)
    let query = supabase.from('products').select('*')
    if (cat === 'Skincare Sets') query = query.ilike('category', 'Skincare')
    else if (cat === 'Makeup Collections') query = query.ilike('category', 'Makeup')
    else if (cat === 'Fragrance Duos') query = query.ilike('category', 'Fragrance')
    else if (cat === 'Travel Sizes') query = query.eq('collection_category', 'travel_sizes')
    else if (cat === 'Discovery Kits') query = query.eq('collection_category', 'discovery_kits')
    else if (cat === 'Value Sets') query = query.eq('collection_category', 'value_sets')
    const { data } = await query
    setCollectionProducts(data || [])
    setLoadingProducts(false)
    setTimeout(() => {
      productsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  const getFilteredCollectionProducts = () => {
    if (selectedCategory === 'All Collections') return allCollectionsProducts
    if (selectedCategory === 'Skincare Sets') return collectionProducts.filter(p => p.category === 'Skincare')
    if (selectedCategory === 'Makeup Collections') return collectionProducts.filter(p => p.category === 'Makeup')
    if (selectedCategory === 'Fragrance Duos') return collectionProducts.filter(p => p.category === 'Fragrance')
    if (selectedCategory === 'Travel Sizes') return collectionProducts.filter(p => p.collection_category === 'travel_sizes')
    if (selectedCategory === 'Discovery Kits') return collectionProducts.filter(p => p.collection_category === 'discovery_kits')
    if (selectedCategory === 'Value Sets') return collectionProducts.filter(p => p.collection_category === 'value_sets')
    return collectionProducts
  }

  const filteredProducts = getFilteredCollectionProducts()

  return (
    <div className="bg-white font-['Cormorant_Garamond']">

      {/* Hero Banner */}
      <div className="min-h-[360px] md:min-h-[420px] lg:min-h-[480px] bg-gradient-to-b from-[#FDFBF7] to-[#F5F1EA] relative overflow-hidden flex items-center px-6 md:px-[60px] lg:px-[120px]">
        <img src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800&h=800&fit=crop" alt="" className="absolute top-0 right-0 w-[200px] md:w-[360px] lg:w-[500px] h-full object-cover opacity-15" />
        <div className="w-full max-w-[650px] relative z-10">
          <p className="text-[12px] md:text-[13px] lg:text-[14px] font-light italic text-[#8B7355] tracking-[2px] mb-3">EXCLUSIVE COLLECTIONS</p>
          <h1 className="text-[48px] md:text-[64px] lg:text-[80px] font-bold text-[#1A1A1A] leading-[1] mb-4 md:mb-5 lg:mb-6">Curated for You</h1>
          <p className="text-[16px] md:text-[18px] lg:text-[20px] font-normal text-[#666666] mb-6 md:mb-7 lg:mb-8">Discover thoughtfully assembled beauty collections for every occasion</p>
          <div className="w-[100px] md:w-[120px] lg:w-[140px] h-[4px] bg-[#C9A870] shadow-[0_2px_8px_rgba(201,168,112,0.3)]" />
        </div>
        <div className="hidden lg:block absolute right-[180px] top-1/2 -translate-y-1/2">
          <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop" alt="Featured Collection" className="w-[320px] h-[320px] lg:w-[400px] lg:h-[400px] object-cover rounded-[8px] shadow-[0_12px_48px_rgba(0,0,0,0.12)]" />
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="min-h-[48px] bg-[#FDFBF7] px-6 md:px-[60px] lg:px-[120px] flex items-center">
        <span className="text-[14px] lg:text-[15px] font-normal text-[#8B7355] cursor-pointer">Home</span>
        <span className="text-[14px] lg:text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[14px] lg:text-[15px] font-normal text-[#666666]">Collections</span>
      </div>

      {/* Main Content */}
      <div className="px-6 md:px-[60px] lg:px-[120px] py-10 md:py-12 lg:py-[64px]">

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10 md:mb-12 lg:mb-[64px]">
          {desktopCollections.map((collection, idx) => {
            const key = collectionKeyMap[collection.name]
            const isSelected = selectedCollection === key
            return (
              <div
                key={idx}
                onClick={() => fetchCollectionProducts(key)}
                className={`${idx < 2 ? 'h-[420px] md:h-[560px] lg:h-[720px]' : 'h-[300px] md:h-[360px] lg:h-[420px]'} bg-white rounded-[16px] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.10)] group cursor-pointer relative transition-all duration-300 ${isSelected ? 'ring-4 ring-[#C9A870]' : ''}`}
              >
                <div className="relative w-full h-full">
                  <img src={collection.image} alt={collection.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  {collection.badge && <div className="absolute top-[16px] right-[16px] lg:top-[20px] lg:right-[20px] px-[14px] py-[7px] lg:px-[16px] lg:py-[8px] bg-[#C9A870] text-white text-[11px] lg:text-[12px] font-medium rounded-full">LIMITED</div>}
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 lg:p-[32px] text-white">
                    <p className="text-[12px] lg:text-[14px] font-light italic tracking-[2px] mb-2">{collection.subtitle}</p>
                    <h3 className={`${idx < 2 ? 'text-[28px] md:text-[36px] lg:text-[48px]' : 'text-[22px] md:text-[28px] lg:text-[36px]'} font-bold mb-2 lg:mb-3`}>{collection.name}</h3>
                    <p className="text-[14px] md:text-[15px] lg:text-[18px] font-normal mb-3 lg:mb-4">{collection.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] lg:text-[16px] font-normal">{collection.products}</span>
                      {/* ── Dynamic price from Supabase ── */}
                      <span className="text-[16px] md:text-[18px] lg:text-[20px] font-semibold">
                        {collectionPrices[key] || ''}
                      </span>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                    <button className="opacity-0 group-hover:opacity-100 px-[24px] lg:px-[32px] py-[12px] lg:py-[14px] bg-white text-[#8B7355] text-[14px] lg:text-[15px] font-medium rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.2)] transition-opacity duration-300">
                      View Products →
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Browse by Category */}
        <div id="browse-by-category" className="mb-10 md:mb-12 lg:mb-[48px]">
          <h2 className="text-[22px] md:text-[25px] lg:text-[28px] font-medium text-[#1A1A1A] text-center mb-6 lg:mb-[32px]">Browse by Category</h2>
          <div className="flex items-center justify-center gap-[10px] lg:gap-[12px] flex-wrap">
            {desktopCategories.map((cat) => (
              <div
                key={cat}
                onClick={() => fetchCategoryProducts(cat)}
                className={`px-[16px] lg:px-[20px] py-[8px] lg:py-[10px] rounded-full cursor-pointer transition-all ${selectedCategory === cat ? 'bg-[#8B7355] text-white' : 'bg-[#F5F1EA] text-[#3D3D3D] hover:bg-[#8B7355] hover:text-white'}`}
              >
                <span className="text-[13px] lg:text-[14px] font-medium">{cat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Collection Products Section */}
        {(selectedCollection || selectedCategory !== 'All Collections') && (
          <div className="mb-10 md:mb-12 lg:mb-[64px]">
            <div ref={productsRef} />
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-[22px] md:text-[26px] lg:text-[30px] font-medium text-[#1A1A1A]">
                  {selectedCollection ? collectionTitles[selectedCollection] : selectedCategory}
                </h2>
                <p className="text-[14px] text-[#999999] mt-1">{filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}</p>
              </div>
              <button
                onClick={() => { setSelectedCollection(null); setCollectionProducts([]); setSelectedCategory('All Collections') }}
                className="px-4 py-2 text-[13px] font-medium text-[#8B7355] border border-[#8B7355] rounded-full hover:bg-[#8B7355] hover:text-white transition-colors"
              >
                Clear Selection ×
              </button>
            </div>
            {loadingProducts ? (
              <div className="flex items-center justify-center py-16">
                <div className="w-10 h-10 rounded-full border-2 border-[#8B7355] border-t-transparent animate-spin" />
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <p className="text-[18px] font-medium text-[#999999]">No products found in this collection</p>
                <p className="text-[14px] text-[#BBBBBB] mt-2">Try selecting a different collection or category</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {filteredProducts.map((product) => (
                  <CollectionProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* All Collections Default Products — shown when no collection/category is selected */}
        {!selectedCollection && selectedCategory === 'All Collections' && allCollectionsProducts.length > 0 && (
          <div className="mb-10 md:mb-12 lg:mb-[48px]">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-[22px] md:text-[26px] lg:text-[30px] font-medium text-[#1A1A1A]">Featured Products</h2>
                <p className="text-[14px] text-[#999999] mt-1">Handpicked from our top categories</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {allCollectionsProducts.map((product) => (
                <CollectionProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-10 lg:gap-[64px] mb-16 md:mb-20 lg:mb-[96px]">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <div className="w-[56px] h-[56px] lg:w-[64px] lg:h-[64px] rounded-full bg-[#F5F1EA] flex items-center justify-center mb-4 lg:mb-5">
                <benefit.icon className="w-[28px] h-[28px] lg:w-[32px] lg:h-[32px] text-[#C9A870]" />
              </div>
              <h4 className="text-[17px] lg:text-[18px] font-medium text-[#1A1A1A] mb-3">{benefit.title}</h4>
              <p className="text-[14px] lg:text-[15px] font-normal text-[#666666] leading-[1.6]">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="bg-[#F5F1EA] rounded-[16px] flex flex-col items-center justify-center px-6 md:px-10 lg:px-[64px] py-10 lg:py-0 lg:min-h-[140px] mb-16 md:mb-20 lg:mb-[96px]">
          <h3 className="text-[24px] md:text-[28px] lg:text-[32px] font-medium text-[#1A1A1A] mb-2 text-center">Join Our Beauty Circle</h3>
          <p className="text-[14px] lg:text-[16px] font-normal text-[#666666] mb-6 text-center">Get early access to new collections</p>
          <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
            <input type="email" placeholder="Enter your email" className="w-full md:w-[300px] lg:w-[360px] h-[52px] lg:h-[56px] px-5 bg-white text-[14px] lg:text-[15px] font-normal text-[#2B2B2B] rounded-[8px] border border-[#E8E3D9] outline-none" />
            <button className="w-full md:w-auto h-[52px] lg:h-[56px] px-8 lg:px-[32px] bg-[#8B7355] text-white text-[14px] lg:text-[15px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">Subscribe</button>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-[8px] mb-16 md:mb-20 lg:mb-[96px]">
          <button className="w-[40px] h-[40px] lg:w-[44px] lg:h-[44px] border border-[#E8E3D9] rounded-[6px] flex items-center justify-center cursor-pointer hover:bg-[#F5F1EA] transition-colors">
            <IoChevronBack className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#666666]" />
          </button>
          <button className="w-[40px] h-[40px] lg:w-[44px] lg:h-[44px] bg-[#8B7355] text-white text-[14px] lg:text-[15px] font-medium rounded-[6px]">1</button>
          {[2, 3].map((num) => (
            <button key={num} className="w-[40px] h-[40px] lg:w-[44px] lg:h-[44px] border border-[#E8E3D9] rounded-[6px] text-[14px] lg:text-[15px] font-medium text-[#3D3D3D] cursor-pointer hover:bg-[#F5F1EA] transition-colors">{num}</button>
          ))}
          <button className="w-[40px] h-[40px] lg:w-[44px] lg:h-[44px] border border-[#E8E3D9] rounded-[6px] flex items-center justify-center cursor-pointer hover:bg-[#F5F1EA] transition-colors">
            <IoChevronForward className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#666666]" />
          </button>
        </div>

      </div>
    </div>
  )
}

// ─── Main Export (Switcher) ───────────────────────────────────────────────────
export default function Collection() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return isMobile ? <CollectionMobile /> : <CollectionDesktop />
}