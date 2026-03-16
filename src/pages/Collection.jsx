import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
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

// ─── Shared Data ──────────────────────────────────────────────────────────────
const desktopCollections = [
  { name: 'Signature Collection', subtitle: 'THE ICONS',         description: 'Our most beloved formulas in one essential edit',              products: '12 Products', price: 'From $485', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=580&h=720&fit=crop', badge: false },
  { name: 'Limited Editions',     subtitle: 'RARE BOTANICALS',   description: 'Exclusive seasonal formulations with precious ingredients',      products: '8 Products',  price: 'From $195', image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=580&h=720&fit=crop', badge: true  },
  { name: 'Holiday 2024',         subtitle: 'GIFT OF RADIANCE',  description: 'Festive beauty sets wrapped in elegance',                       products: '6 Sets',      price: 'From $165', image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=580&h=420&fit=crop', badge: false },
  { name: 'Gift Sets',            subtitle: 'WRAPPED IN LUXURY', description: 'Thoughtfully curated gift collections',                         products: '15+ Options', price: 'From $145', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=580&h=420&fit=crop', badge: false },
]

const desktopCategories = ['All Collections', 'Skincare Sets', 'Makeup Collections', 'Fragrance Duos', 'Travel Sizes', 'Discovery Kits', 'Value Sets']

const featuredProducts = [
  { name: 'Ultimate Renewal Collection',  description: 'Complete anti-aging ritual with our most potent actives',              price: '$485', rating: 5, reviews: 324, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=460&h=560&fit=crop' },
  { name: 'Hydration Essentials Trio',    description: 'Three-step moisture boost for plump, dewy skin',                       price: '$285', rating: 5, reviews: 412, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=460&h=280&fit=crop' },
  { name: 'Brightening Ritual Set',       description: 'Vitamin C powered routine for luminous glow',                         price: '$345', rating: 5, reviews: 287, image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=460&h=280&fit=crop' },
]

const squareProducts = [
  { name: 'Daily Essentials Kit',   description: 'Perfect starter collection', price: '$165', reviews: 589, image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=300&h=300&fit=crop' },
  { name: 'Travel Beauty Set',      description: 'Luxury on the go',           price: '$128', reviews: 445, image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=300&h=300&fit=crop' },
  { name: 'Evening Ritual Duo',     description: 'Night repair essentials',    price: '$245', reviews: 356, image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=300&h=300&fit=crop' },
]

const rectangularProducts = [
  { name: 'Complete Skincare Journey',    description: 'Six essential steps to transformative skin', price: '$595', reviews: 203, image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=470&h=400&fit=crop' },
  { name: 'Deluxe Discovery Collection', description: 'Experience our bestsellers in generous sizes', price: '$385', reviews: 167, image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=470&h=400&fit=crop' },
]

const benefits = [
  { title: 'Curated Expertise', description: 'Professionally selected combinations for optimal results', icon: IoSparklesOutline },
  { title: 'Exclusive Value',   description: 'Special pricing available only in collection format',    icon: IoCheckmarkCircle  },
  { title: 'Gift Ready',        description: 'Beautiful packaging perfect for gifting',                icon: IoGiftOutline      },
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
    subcategories: [
      { name: 'Face',          count: 8 },
      { name: 'Eyes',          count: 5 },
      { name: 'Lips',          count: 3 },
      { name: 'Brushes & Tools', count: 2 },
    ]
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

// ─── Mobile ───────────────────────────────────────────────────────────────────
function CollectionMobile() {
  const [expandedCategory, setExpandedCategory] = useState('skincare')
  const [activeFilter, setActiveFilter]         = useState('All Products')

  const toggleCategory = (id) => setExpandedCategory(expandedCategory === id ? null : id)

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
                <span className="text-[12px] font-light text-[#999999]">{category.count} products</span>
                <IoChevronDown className={`w-5 h-5 text-[#8B7355] transition-transform duration-200 ${expandedCategory === category.id ? 'rotate-180' : ''}`} />
              </div>
            </button>

            {/* Expanded — Skincare grid */}
            {category.id === 'skincare' && expandedCategory === category.id && (
              <div className="bg-[#FDFBF7] px-5 py-4">
                <div className="grid grid-cols-2 gap-3">
                  {category.subcategories.map((sub) => (
                    <div key={sub.name} className="bg-white border border-[#E8E3D9] rounded-[8px] p-3 flex flex-col items-center gap-2">
                      <img src={sub.image} alt={sub.name} className="w-8 h-8 rounded-full object-cover" />
                      <span className="text-[13px] font-normal text-[#2B2B2B] text-center">{sub.name}</span>
                      <IoChevronForward className="w-3 h-3 text-[#8B7355]" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Expanded — Makeup list */}
            {category.id === 'makeup' && expandedCategory === category.id && (
              <div className="bg-[#FDFBF7]">
                {category.subcategories.map((sub) => (
                  <div key={sub.name} className="min-h-[48px] px-5 flex items-center justify-between border-b border-[#E8E3D9] last:border-b-0">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-[#E8E3D9] rounded-full" />
                      <span className="text-[14px] font-medium text-[#2B2B2B]">{sub.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[12px] font-normal text-[#999999]">{sub.count}</span>
                      <IoChevronForward className="w-4 h-4 text-[#8B7355]" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Expanded — other categories simple */}
            {category.subcategories.length === 0 && expandedCategory === category.id && (
              <div className="bg-[#FDFBF7] px-5 py-4">
                <Link to={`/${category.id}`}>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-[15px] font-normal text-[#2B2B2B]">View All {category.name}</span>
                    <IoChevronForward className="w-4 h-4 text-[#8B7355]" />
                  </div>
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Featured Products */}
      <div className="bg-white px-5 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[20px] font-bold text-[#1A1A1A]">Featured Products</h2>
          <span className="text-[14px] font-medium text-[#8B7355]">View All</span>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
          {mobileFeaturedProducts.map((product, idx) => (
            <div key={idx} className="min-w-[240px] bg-white rounded-[12px] shadow-[0_4px_12px_rgba(0,0,0,0.08)] overflow-hidden flex-shrink-0">
              <div className="relative h-[240px]">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                <div className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.12)]">
                  <IoHeartOutline className="w-5 h-5 text-[#2B2B2B]" />
                </div>
              </div>
              <div className="p-4">
                <p className="text-[11px] font-light italic text-[#8B7355] tracking-[1.2px] mb-1">{product.brand}</p>
                <h3 className="text-[16px] font-medium text-[#2B2B2B] mb-2 line-clamp-2">{product.name}</h3>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[19px] font-semibold text-[#1A1A1A]">{product.price}</span>
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
      </div>

      {/* Quick Shop Grid */}
      <div className="bg-white px-5 py-6 border-t border-[#E8E3D9]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[20px] font-bold text-[#1A1A1A]">Shop All Products</h2>
          <button className="flex items-center gap-1 text-[13px] font-medium text-[#8B7355]">
            Sort <IoChevronDown className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {quickShopProducts.map((product, idx) => (
            <div key={idx} className="bg-white rounded-[8px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden">
              <div className="relative h-[140px]">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                <button className="absolute top-2 right-2 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center">
                  <IoHeartOutline className="w-4 h-4 text-[#2B2B2B]" />
                </button>
              </div>
              <div className="p-3">
                <h3 className="text-[13px] font-normal text-[#2B2B2B] mb-1 line-clamp-2 h-[36px]">{product.name}</h3>
                <span className="text-[16px] font-medium text-[#1A1A1A]">{product.price}</span>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full min-h-[48px] mt-5 border-2 border-[#8B7355] text-[#8B7355] text-[15px] font-medium rounded-[8px]">
          Load More
        </button>
      </div>

      {/* Newsletter Banner */}
      <div className="bg-gradient-to-r from-[#F5F1EA] to-[#FDFBF7] px-5 py-8 flex flex-col items-center text-center">
        <h3 className="text-[22px] font-medium text-[#1A1A1A] mb-2">Join Our Community</h3>
        <p className="text-[13px] font-normal text-[#666666] mb-4">Get exclusive offers and beauty tips</p>
        <div className="w-full flex gap-2">
          <input type="email" placeholder="Enter your email" className="flex-1 h-[48px] px-4 bg-white text-[13px] font-normal text-[#2B2B2B] rounded-[8px] border border-[#E8E3D9] outline-none" />
          <button className="h-[48px] px-6 bg-[#8B7355] text-white text-[14px] font-medium rounded-[8px]">Subscribe</button>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-[#2B2B2B] px-5 py-10">
        <div className="mb-8">
          <h3 className="text-[18px] font-semibold text-white tracking-[2px] mb-2">SHAN LORAY</h3>
          <p className="text-[12px] font-light italic text-[#C4B5A0] mb-5">Timeless Luxury Beauty</p>
        </div>
        <div className="grid grid-cols-3 gap-6 mb-8">
          {[
            { title: 'Shop',  links: ['Skincare', 'Makeup', 'Fragrance']       },
            { title: 'Help',  links: ['Contact', 'Shipping', 'Returns']         },
            { title: 'About', links: ['Our Story', 'Ingredients', 'Sustainability'] },
          ].map(({ title, links }) => (
            <div key={title}>
              <h4 className="text-[14px] font-medium text-white mb-3">{title}</h4>
              <div className="space-y-2">
                {links.map((link) => <p key={link} className="text-[13px] font-normal text-[#C4B5A0]">{link}</p>)}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-6 mb-6">
          <IoLogoInstagram className="w-6 h-6 text-[#C4B5A0]" />
          <IoLogoFacebook  className="w-6 h-6 text-[#C4B5A0]" />
          <IoLogoPinterest className="w-6 h-6 text-[#C4B5A0]" />
          <IoLogoYoutube   className="w-6 h-6 text-[#C4B5A0]" />
        </div>
        <div className="border-t border-[#3D3D3D] pt-5 text-center">
          <p className="text-[11px] font-light text-[#808080]">© 2024 Shan Loray. All rights reserved.</p>
        </div>
      </footer>

    </div>
  )
}

// ─── Desktop ──────────────────────────────────────────────────────────────────
function CollectionDesktop() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.replace('#', ''))
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
    }
  }, [location])

  return (
    <div className="bg-white font-['Cormorant_Garamond']">

      {/* Hero Banner */}
      <div className="min-h-[480px] bg-gradient-to-b from-[#FDFBF7] to-[#F5F1EA] relative overflow-hidden flex items-center px-[120px]">
        <img src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800&h=800&fit=crop" alt="" className="absolute top-0 right-0 w-[500px] h-[480px] object-cover opacity-15" />
        <div className="w-[650px] relative z-10">
          <p className="text-[14px] font-light italic text-[#8B7355] tracking-[2px] mb-3">EXCLUSIVE COLLECTIONS</p>
          <h1 className="text-[80px] font-bold text-[#1A1A1A] leading-[1] mb-6">Curated for You</h1>
          <p className="text-[20px] font-normal text-[#666666] mb-8">Discover thoughtfully assembled beauty collections for every occasion</p>
          <div className="w-[140px] h-[4px] bg-[#C9A870] shadow-[0_2px_8px_rgba(201,168,112,0.3)]" />
        </div>
        <div className="absolute right-[180px] top-1/2 -translate-y-1/2">
          <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop" alt="Featured Collection" className="w-[400px] h-[400px] object-cover rounded-[8px] shadow-[0_12px_48px_rgba(0,0,0,0.12)]" />
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="min-h-[48px] bg-[#FDFBF7] px-[120px] flex items-center">
        <span className="text-[15px] font-normal text-[#8B7355] cursor-pointer">Home</span>
        <span className="text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[15px] font-normal text-[#666666]">Collections</span>
      </div>

      {/* Main Content */}
      <div className="px-[120px] py-[64px]">

        {/* Collections Grid */}
        <div className="grid grid-cols-2 gap-[20px] mb-[64px]">
          {desktopCollections.map((collection, idx) => (
            <div key={idx} className={`${idx < 2 ? 'h-[720px]' : 'h-[420px]'} bg-white rounded-[16px] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.10)] group cursor-pointer relative`}>
              <div className="relative w-full h-full">
                <img src={collection.image} alt={collection.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                {collection.badge && <div className="absolute top-[20px] right-[20px] px-[16px] py-[8px] bg-[#C9A870] text-white text-[12px] font-medium rounded-full">LIMITED</div>}
                <div className="absolute bottom-0 left-0 right-0 p-[32px] text-white">
                  <p className="text-[14px] font-light italic tracking-[2px] mb-2">{collection.subtitle}</p>
                  <h3 className={`${idx < 2 ? 'text-[48px]' : 'text-[36px]'} font-bold mb-3`}>{collection.name}</h3>
                  <p className="text-[18px] font-normal mb-4">{collection.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[16px] font-normal">{collection.products}</span>
                    <span className="text-[20px] font-semibold">{collection.price}</span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                  <button className="opacity-0 group-hover:opacity-100 px-[32px] py-[14px] bg-white text-[#8B7355] text-[15px] font-medium rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.2)] transition-opacity duration-300">
                    Explore Collection
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Browse by Category */}
        <div id="browse-by-category" className="mb-[48px]">
          <h2 className="text-[28px] font-medium text-[#1A1A1A] text-center mb-[32px]">Browse by Category</h2>
          <div className="flex items-center justify-center gap-[12px] flex-wrap">
            {desktopCategories.map((cat, idx) => (
              <div key={cat} className={`px-[20px] py-[10px] rounded-full cursor-pointer transition-all ${idx === 0 ? 'bg-[#8B7355] text-white' : 'bg-[#F5F1EA] text-[#3D3D3D] hover:bg-[#8B7355] hover:text-white'}`}>
                <span className="text-[14px] font-medium">{cat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Products */}
        <div className="flex gap-[20px] mb-[48px]">
          <div className="w-[460px] h-[560px] bg-white rounded-[12px] overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)] group cursor-pointer">
            <div className="relative w-full h-[380px]">
              <img src={featuredProducts[0].image} alt={featuredProducts[0].name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute bottom-0 left-0 right-0 h-[180px] bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-[24px] text-white">
                <p className="text-[17px] font-normal mb-2">{featuredProducts[0].description}</p>
                <h3 className="text-[28px] font-medium mb-3">{featuredProducts[0].name}</h3>
                <p className="text-[24px] font-semibold">{featuredProducts[0].price}</p>
              </div>
            </div>
            <div className="p-[24px]">
              <p className="text-[13px] font-light italic text-[#8B7355] tracking-[1.2px] mb-2">Shan Loray</p>
              <div className="flex items-center gap-[6px]">
                {[...Array(5)].map((_, i) => <IoStarSharp key={i} className="w-[15px] h-[15px] text-[#C9A870]" />)}
                <span className="text-[13px] font-normal text-[#999999] ml-1">({featuredProducts[0].reviews})</span>
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-[20px]">
            {[featuredProducts[1], featuredProducts[2]].map((product, idx) => (
              <div key={idx} className="w-full h-[270px] bg-white rounded-[12px] overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)] group cursor-pointer flex">
                <div className="w-[280px] h-full relative overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="flex-1 p-[24px] flex flex-col justify-center">
                  <p className="text-[13px] font-light italic text-[#8B7355] tracking-[1.2px] mb-2">Shan Loray</p>
                  <h4 className="text-[22px] font-medium text-[#2B2B2B] leading-[1.2] mb-2">{product.name}</h4>
                  <p className="text-[15px] font-normal text-[#999999] leading-[1.5] mb-3">{product.description}</p>
                  <p className="text-[22px] font-semibold text-[#1A1A1A] mb-3">{product.price}</p>
                  <div className="flex items-center gap-[6px]">
                    {[...Array(5)].map((_, i) => <IoStarSharp key={i} className="w-[15px] h-[15px] text-[#C9A870]" />)}
                    <span className="text-[13px] font-normal text-[#999999] ml-1">({product.reviews})</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Square Products */}
        <div className="grid grid-cols-3 gap-[20px] mb-[48px]">
          {squareProducts.map((product, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="relative w-full aspect-square rounded-[12px] overflow-hidden mb-[16px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] transition-all duration-300">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <p className="text-[13px] font-light italic text-[#8B7355] tracking-[1.2px] mb-2">Shan Loray</p>
              <h4 className="text-[20px] font-medium text-[#2B2B2B] leading-[1.2] mb-2">{product.name}</h4>
              <p className="text-[15px] font-normal text-[#999999] leading-[1.5] mb-2">{product.description}</p>
              <p className="text-[19px] font-semibold text-[#1A1A1A] mb-2">{product.price}</p>
              <div className="flex items-center gap-[6px]">
                {[...Array(5)].map((_, i) => <IoStarSharp key={i} className="w-[15px] h-[15px] text-[#C9A870]" />)}
                <span className="text-[13px] font-normal text-[#999999] ml-1">({product.reviews})</span>
              </div>
            </div>
          ))}
        </div>

        {/* Rectangular Products */}
        <div className="grid grid-cols-2 gap-[20px] mb-[96px]">
          {rectangularProducts.map((product, idx) => (
            <div key={idx} className="w-full h-[400px] bg-white rounded-[12px] overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)] group cursor-pointer hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] transition-all duration-300">
              <div className="relative w-full h-[280px] overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-[24px]">
                <p className="text-[13px] font-light italic text-[#8B7355] tracking-[1.2px] mb-2">Shan Loray</p>
                <h4 className="text-[22px] font-medium text-[#2B2B2B] leading-[1.2] mb-2">{product.name}</h4>
                <p className="text-[15px] font-normal text-[#999999] leading-[1.5] mb-3">{product.description}</p>
                <div className="flex items-center justify-between">
                  <p className="text-[22px] font-semibold text-[#1A1A1A]">{product.price}</p>
                  <div className="flex items-center gap-[6px]">
                    {[...Array(5)].map((_, i) => <IoStarSharp key={i} className="w-[15px] h-[15px] text-[#C9A870]" />)}
                    <span className="text-[13px] font-normal text-[#999999] ml-1">({product.reviews})</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-3 gap-[64px] mb-[96px]">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <div className="w-[64px] h-[64px] rounded-full bg-[#F5F1EA] flex items-center justify-center mb-5">
                <benefit.icon className="w-[32px] h-[32px] text-[#C9A870]" />
              </div>
              <h4 className="text-[18px] font-medium text-[#1A1A1A] mb-3">{benefit.title}</h4>
              <p className="text-[15px] font-normal text-[#666666] leading-[1.6]">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="min-h-[140px] bg-[#F5F1EA] rounded-[16px] flex flex-col items-center justify-center px-[64px] mb-[96px]">
          <h3 className="text-[32px] font-medium text-[#1A1A1A] mb-2">Join Our Beauty Circle</h3>
          <p className="text-[16px] font-normal text-[#666666] mb-6">Get early access to new collections</p>
          <div className="flex items-center gap-[12px]">
            <input type="email" placeholder="Enter your email" className="w-[360px] h-[56px] px-5 bg-white text-[15px] font-normal text-[#2B2B2B] rounded-[8px] border border-[#E8E3D9] outline-none" />
            <button className="h-[56px] px-[32px] bg-[#8B7355] text-white text-[15px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">Subscribe</button>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-[8px] mb-[96px]">
          <button className="w-[44px] h-[44px] border border-[#E8E3D9] rounded-[6px] flex items-center justify-center cursor-pointer hover:bg-[#F5F1EA] transition-colors">
            <IoChevronBack className="w-[20px] h-[20px] text-[#666666]" />
          </button>
          <button className="w-[44px] h-[44px] bg-[#8B7355] text-white text-[15px] font-medium rounded-[6px]">1</button>
          {[2, 3].map((num) => (
            <button key={num} className="w-[44px] h-[44px] border border-[#E8E3D9] rounded-[6px] text-[15px] font-medium text-[#3D3D3D] cursor-pointer hover:bg-[#F5F1EA] transition-colors">{num}</button>
          ))}
          <button className="w-[44px] h-[44px] border border-[#E8E3D9] rounded-[6px] flex items-center justify-center cursor-pointer hover:bg-[#F5F1EA] transition-colors">
            <IoChevronForward className="w-[20px] h-[20px] text-[#666666]" />
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