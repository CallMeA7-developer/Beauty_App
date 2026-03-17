import { useState, useEffect } from 'react'
import {
  IoStarSharp,
  IoChevronBack,
  IoChevronForward,
  IoHeartOutline,
  IoEyeOutline,
  IoChevronDown,
  IoSearchOutline,
  IoCloseOutline,
  IoOptionsOutline,
  IoFilterOutline,
  IoBagOutline,
  IoLogoInstagram,
  IoLogoFacebook,
  IoLogoPinterest,
  IoLogoYoutube,
} from 'react-icons/io5'

// ─── Shared Data ──────────────────────────────────────────────────────────────
const skinTypes     = ['All Types', 'Dry', 'Oily', 'Combination', 'Sensitive', 'Mature']
const skinConcerns  = ['Anti-Aging', 'Hydration', 'Brightening', 'Acne Care', 'Redness Relief', 'Dark Spots', 'Large Pores', 'Fine Lines']
const ingredients   = ['Retinol', 'Vitamin C', 'Hyaluronic Acid', 'Niacinamide', 'AHA/BHA', 'Ceramides']
const brandValues   = ['Vegan', 'Cruelty-Free', 'Fragrance-Free', 'Organic']

const sortOptions = ['Best Selling', 'Newest Arrivals', 'Price: Low to High', 'Price: High to Low', 'Most Popular', 'Highest Rated']

const mobileCategories = ['All Skincare', 'Cleansers', 'Serums', 'Moisturizers', 'Eye Care', 'Masks', 'Sunscreen', 'Sets']

const allProducts = [
  { name: 'Advanced Retinol Night Serum',  description: 'Time-release formula for smooth, youthful skin',     price: '$198', reviews: 412, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop' },
  { name: 'Vitamin C Brightening Complex', description: 'Powerful antioxidant serum for radiant glow',         price: '$165', reviews: 387, image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=400&fit=crop' },
  { name: 'Hydrating Gel Cleanser',        description: 'Gentle daily cleanser for all skin types',            price: '$58',  reviews: 534, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop' },
  { name: 'Peptide Eye Renewal Cream',     description: 'Targets fine lines and dark circles',                 price: '$145', reviews: 298, image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400&h=400&fit=crop' },
  { name: 'Deep Moisture Face Cream',      description: '24-hour hydration therapy',                           price: '$128', reviews: 621, image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop' },
  { name: 'Illuminating Clay Mask',        description: 'Purifies and brightens complexion',                   price: '$78',  reviews: 445, image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=400&fit=crop' },
  { name: 'Mineral Defense SPF 50',        description: 'Broad spectrum sun protection',                       price: '$72',  reviews: 789, image: 'https://images.unsplash.com/photo-1556228852-80a3c31c6d52?w=400&h=400&fit=crop' },
  { name: 'Complete Skincare Ritual Set',  description: 'Four essential steps to luminous skin',               price: '$395', reviews: 203, image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop' },
  { name: 'Travel Essentials Collection',  description: 'Your complete routine in travel sizes',               price: '$145', reviews: 167, image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop' },
]

// Desktop data arrays
const largeProducts = [
  { name: 'Advanced Retinol Night Serum',  description: 'Time-release formula for smooth, youthful skin', price: '$198', reviews: 412, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=560&h=560&fit=crop' },
  { name: 'Vitamin C Brightening Complex', description: 'Powerful antioxidant serum for radiant glow',     price: '$165', reviews: 387, image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=940&h=800&fit=crop' },
]
const mediumProducts = [
  { name: 'Hydrating Gel Cleanser',    description: 'Gentle daily cleanser for all skin types', price: '$58',  reviews: 534, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=460&h=280&fit=crop' },
  { name: 'Peptide Eye Renewal Cream', description: 'Targets fine lines and dark circles',      price: '$145', reviews: 298, image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=460&h=280&fit=crop' },
]
const squareProducts = [
  { name: 'Deep Moisture Face Cream', description: '24-hour hydration therapy',            price: '$128', reviews: 621, image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=300&h=300&fit=crop' },
  { name: 'Illuminating Clay Mask',   description: 'Purifies and brightens complexion',    price: '$78',  reviews: 445, image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=300&h=300&fit=crop' },
  { name: 'Mineral Defense SPF 50',   description: 'Broad spectrum sun protection',        price: '$72',  reviews: 789, image: 'https://images.unsplash.com/photo-1556228852-80a3c31c6d52?w=300&h=300&fit=crop' },
]
const rectangularProducts = [
  { name: 'Complete Skincare Ritual Set', description: 'Four essential steps to luminous skin',        price: '$395', reviews: 203, image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=470&h=400&fit=crop' },
  { name: 'Travel Essentials Collection', description: 'Your complete routine in travel sizes',        price: '$145', reviews: 167, image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=470&h=400&fit=crop' },
]

// ─── Mobile ───────────────────────────────────────────────────────────────────
function SkinCareMobile() {
  const [activeCategory, setActiveCategory] = useState('All Skincare')
  const [activeSort, setActiveSort]         = useState('Best Selling')
  const [showSortSheet, setShowSortSheet]   = useState(false)
  const [showFilterSheet, setShowFilterSheet] = useState(false)

  return (
    <div className="w-full min-h-screen bg-white font-['Cormorant_Garamond']">

      {/* Hero Banner */}
      <div className="bg-gradient-to-b from-[#FDFBF7] to-[#F5F1EA] px-5 py-10 relative overflow-hidden min-h-[200px] flex flex-col justify-center">
        <img src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=300&h=200&fit=crop" alt="" className="absolute top-0 right-0 w-[140px] h-[200px] object-cover opacity-20" />
        <div className="relative z-10">
          <p className="text-[11px] font-light italic text-[#8B7355] tracking-[2px] mb-2">COMPLETE SKINCARE COLLECTION</p>
          <h1 className="text-[32px] font-bold text-[#1A1A1A] leading-[1] mb-2">Science Meets Nature</h1>
          <p className="text-[14px] font-normal text-[#666666] mb-3">Discover transformative skincare</p>
          <div className="w-[60px] h-[2px] bg-[#C9A870]" />
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-[#FDFBF7] px-5 h-10 flex items-center gap-1">
        <span className="text-[13px] text-[#8B7355]">Home</span>
        <span className="text-[13px] text-[#999999]">/</span>
        <span className="text-[13px] text-[#8B7355]">Shop</span>
        <span className="text-[13px] text-[#999999]">/</span>
        <span className="text-[13px] text-[#666666]">Skincare</span>
      </div>

      {/* Category Pills */}
      <div className="bg-white border-b border-[#E8E3D9] px-5 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        <div className="flex gap-2 py-3 w-max">
          {mobileCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-[13px] font-medium whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-[#8B7355] text-white'
                  : 'bg-[#F5F1EA] text-[#3D3D3D]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white px-5 h-[52px] flex items-center justify-between border-b border-[#E8E3D9]">
        <span className="text-[13px] font-normal text-[#666666]">124 products</span>
        <div className="flex items-center gap-3">
          {/* Sort button */}
          <button
            onClick={() => setShowSortSheet(true)}
            className="flex items-center gap-1.5 text-[13px] font-medium text-[#2B2B2B]"
          >
            <IoOptionsOutline className="w-4 h-4 text-[#8B7355]" />
            {activeSort.split(':')[0]}
          </button>
          {/* Filter button */}
          <button
            onClick={() => setShowFilterSheet(true)}
            className="flex items-center gap-1.5 h-8 px-3 border border-[#E8E3D9] rounded-full text-[13px] font-medium text-[#2B2B2B]"
          >
            <IoFilterOutline className="w-3.5 h-3.5 text-[#8B7355]" />
            Filter
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="bg-white px-4 pt-4 pb-8">
        <div className="grid grid-cols-2 gap-3">
          {allProducts.map((product, idx) => (
            <div key={idx} className="bg-white rounded-[10px] shadow-[0_2px_10px_rgba(0,0,0,0.07)] overflow-hidden">
              <div className="relative h-[170px]">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                <button className="absolute top-2.5 right-2.5 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm">
                  <IoHeartOutline className="w-4 h-4 text-[#2B2B2B]" />
                </button>
              </div>
              <div className="p-3">
                <p className="text-[10px] font-light italic text-[#8B7355] mb-0.5">Shan Loray</p>
                <h4 className="text-[13px] font-medium text-[#2B2B2B] leading-tight mb-1 line-clamp-2">{product.name}</h4>
                <div className="flex items-center gap-0.5 mb-1.5">
                  {[...Array(5)].map((_, i) => <IoStarSharp key={i} className="w-2.5 h-2.5 text-[#C9A870]" />)}
                  <span className="text-[10px] text-[#999999] ml-1">({product.reviews})</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[15px] font-semibold text-[#1A1A1A]">{product.price}</span>
                  <button className="w-7 h-7 bg-[#8B7355] rounded-full flex items-center justify-center">
                    <IoBagOutline className="w-3.5 h-3.5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <button className="w-full h-12 mt-6 border-2 border-[#8B7355] text-[#8B7355] text-[15px] font-medium rounded-[8px]">
          Load More
        </button>
      </div>

      {/* ── Sort Bottom Sheet ── */}
      {showSortSheet && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowSortSheet(false)} />
          <div className="relative bg-white rounded-t-[20px] px-5 pt-5 pb-8">
            <div className="w-10 h-1 bg-[#E8E3D9] rounded-full mx-auto mb-5" />
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[18px] font-semibold text-[#1A1A1A]">Sort By</h3>
              <button onClick={() => setShowSortSheet(false)}>
                <IoCloseOutline className="w-6 h-6 text-[#2B2B2B]" />
              </button>
            </div>
            <div className="space-y-1">
              {sortOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => { setActiveSort(option); setShowSortSheet(false) }}
                  className="w-full h-12 flex items-center justify-between px-4 rounded-[8px] hover:bg-[#FAF8F5]"
                >
                  <span className={`text-[15px] ${activeSort === option ? 'font-medium text-[#8B7355]' : 'font-normal text-[#2B2B2B]'}`}>{option}</span>
                  {activeSort === option && (
                    <div className="w-5 h-5 rounded-full bg-[#8B7355] flex items-center justify-center">
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Filter Bottom Sheet ── */}
      {showFilterSheet && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowFilterSheet(false)} />
          <div className="relative bg-white rounded-t-[20px] flex flex-col" style={{ maxHeight: '90vh' }}>
            {/* Header */}
            <div className="px-5 pt-5 pb-4 border-b border-[#E8E3D9] flex-shrink-0">
              <div className="w-10 h-1 bg-[#E8E3D9] rounded-full mx-auto mb-4" />
              <div className="flex items-center justify-between">
                <h3 className="text-[18px] font-semibold text-[#1A1A1A]">Refine Selection</h3>
                <button onClick={() => setShowFilterSheet(false)}>
                  <IoCloseOutline className="w-6 h-6 text-[#2B2B2B]" />
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto px-5 py-4 space-y-6 flex-1">
              {/* Price Range */}
              <div>
                <h4 className="text-[15px] font-medium text-[#1A1A1A] mb-3">Price Range</h4>
                <div className="flex items-center gap-2">
                  <input type="text" placeholder="$0"   className="w-[90px] h-10 px-3 border border-[#E8E3D9] rounded-[6px] text-[14px] outline-none" />
                  <span className="text-[14px] text-[#666666]">—</span>
                  <input type="text" placeholder="$500" className="w-[90px] h-10 px-3 border border-[#E8E3D9] rounded-[6px] text-[14px] outline-none" />
                </div>
              </div>

              {/* Skin Type */}
              <div>
                <h4 className="text-[15px] font-medium text-[#1A1A1A] mb-3">Skin Type</h4>
                <div className="flex flex-wrap gap-2">
                  {skinTypes.map((type) => (
                    <button key={type} className="px-4 py-2 bg-[#F5F1EA] text-[#3D3D3D] text-[13px] rounded-full">{type}</button>
                  ))}
                </div>
              </div>

              {/* Skin Concerns */}
              <div>
                <h4 className="text-[15px] font-medium text-[#1A1A1A] mb-3">Skin Concerns</h4>
                <div className="flex flex-wrap gap-2">
                  {skinConcerns.map((concern) => (
                    <button key={concern} className="px-4 py-2 bg-[#F5F1EA] text-[#3D3D3D] text-[13px] rounded-full">{concern}</button>
                  ))}
                </div>
              </div>

              {/* Ingredients */}
              <div>
                <h4 className="text-[15px] font-medium text-[#1A1A1A] mb-3">Ingredients</h4>
                <div className="flex flex-wrap gap-2">
                  {ingredients.map((ing) => (
                    <button key={ing} className="px-4 py-2 bg-[#F5F1EA] text-[#3D3D3D] text-[13px] rounded-full">{ing}</button>
                  ))}
                </div>
              </div>

              {/* Brand Values */}
              <div>
                <h4 className="text-[15px] font-medium text-[#1A1A1A] mb-3">Brand Values</h4>
                <div className="flex flex-wrap gap-2">
                  {brandValues.map((val) => (
                    <button key={val} className="px-4 py-2 bg-[#F5F1EA] text-[#3D3D3D] text-[13px] rounded-full">{val}</button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="px-5 py-4 border-t border-[#E8E3D9] flex gap-3 flex-shrink-0">
              <button className="flex-1 h-12 border border-[#E8E3D9] text-[#666666] text-[15px] font-medium rounded-[8px]">
                Clear All
              </button>
              <button onClick={() => setShowFilterSheet(false)} className="flex-1 h-12 bg-[#8B7355] text-white text-[15px] font-medium rounded-[8px]">
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

// ─── Desktop ──────────────────────────────────────────────────────────────────
function SkinCareDesktop() {
  const Stars = () => [...Array(5)].map((_, i) => <IoStarSharp key={i} className="w-[15px] h-[15px] text-[#C9A870]" />)

  return (
    <div className="bg-white font-['Cormorant_Garamond']">

      {/* Hero Banner */}
      <div className="min-h-[380px] bg-gradient-to-b from-[#FDFBF7] to-[#F5F1EA] relative overflow-hidden flex items-center px-[120px]">
        <img src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800&h=800&fit=crop" alt="" className="absolute top-0 right-0 w-[500px] h-[380px] object-cover opacity-20" />
        <div className="w-[650px] relative z-10">
          <p className="text-[14px] font-light italic text-[#8B7355] tracking-[2px] mb-3">COMPLETE SKINCARE COLLECTION</p>
          <h1 className="text-[64px] font-bold text-[#1A1A1A] leading-[1] mb-6">Science Meets Nature</h1>
          <p className="text-[18px] font-normal text-[#666666] mb-8">From cleansing to protection, discover transformative skincare</p>
          <div className="w-[100px] h-[4px] bg-[#C9A870]" />
        </div>
        <div className="absolute right-[180px] top-1/2 -translate-y-1/2">
          <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=320&h=320&fit=crop" alt="Featured Serum" className="w-[260px] h-[260px] object-cover rounded-[8px] shadow-[0_12px_48px_rgba(0,0,0,0.12)]" />
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="min-h-[48px] bg-[#FDFBF7] px-[120px] flex items-center">
        <span className="text-[15px] font-normal text-[#8B7355] cursor-pointer">Home</span>
        <span className="text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[15px] font-normal text-[#8B7355] cursor-pointer">Shop</span>
        <span className="text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[15px] font-normal text-[#666666]">Skincare</span>
      </div>

      {/* Main Content */}
      <div className="px-[120px] py-[64px] flex gap-[48px]">

        {/* Sidebar Filters */}
        <div className="w-[280px] flex-shrink-0">
          <div className="bg-white border border-[#E8E3D9] rounded-[16px] shadow-[0_8px_32px_rgba(0,0,0,0.08)] p-[28px]">
            <h3 className="text-[18px] font-medium text-[#1A1A1A] mb-[24px]">REFINE SELECTION</h3>

            {/* Category Pills */}
            <div className="space-y-[12px] mb-[32px]">
              <div className="inline-flex items-center px-[20px] py-[10px] bg-[#8B7355] text-white text-[14px] font-medium rounded-full cursor-pointer">All Skincare</div>
              {[
                { label: 'Cleansers',    subs: ['Face Wash', 'Cleansing Oil', 'Micellar Water', 'Exfoliators'] },
                { label: 'Serums',       subs: ['Vitamin C', 'Retinol', 'Hyaluronic Acid', 'Niacinamide', 'Peptides'] },
                { label: 'Moisturizers', subs: ['Day Cream', 'Night Cream', 'Gel Moisturizer', 'Face Oil'] },
              ].map(({ label, subs }) => (
                <div key={label}>
                  <div className="inline-flex items-center px-[20px] py-[10px] bg-[#F5F1EA] text-[#3D3D3D] text-[14px] font-medium rounded-full cursor-pointer gap-2">
                    <span>{label}</span><IoChevronDown className="w-[14px] h-[14px]" />
                  </div>
                  <div className="ml-[24px] mt-[8px]">
                    {subs.map((item) => (
                      <div key={item} className="inline-block px-[16px] py-[6px] bg-white border border-[#E8E3D9] text-[#666666] text-[13px] rounded-full cursor-pointer mr-2 mb-2">{item}</div>
                    ))}
                  </div>
                </div>
              ))}
              {['Eye Care', 'Masks', 'Sunscreen', 'Sets & Routines'].map((cat) => (
                <div key={cat} className="inline-flex items-center px-[20px] py-[10px] bg-[#F5F1EA] text-[#3D3D3D] text-[14px] font-medium rounded-full cursor-pointer gap-2">
                  <span>{cat}</span><IoChevronDown className="w-[14px] h-[14px]" />
                </div>
              ))}
            </div>

            {/* Additional Filters */}
            <div className="border-t border-[#E8E3D9] pt-[24px] space-y-[20px]">
              <div>
                <h4 className="text-[15px] font-medium text-[#1A1A1A] mb-[12px]">Price Range</h4>
                <div className="flex items-center gap-[8px]">
                  <input type="text" placeholder="$0"   className="w-[100px] h-[36px] px-3 border border-[#E8E3D9] rounded-[6px] text-[14px] outline-none" />
                  <span className="text-[14px] text-[#666666]">—</span>
                  <input type="text" placeholder="$500" className="w-[100px] h-[36px] px-3 border border-[#E8E3D9] rounded-[6px] text-[14px] outline-none" />
                </div>
              </div>
              {[
                { title: 'Skin Type',     items: skinTypes    },
                { title: 'Skin Concerns', items: skinConcerns },
                { title: 'Ingredients',   items: ingredients  },
                { title: 'Brand Values',  items: brandValues  },
              ].map(({ title, items }) => (
                <div key={title}>
                  <h4 className="text-[15px] font-medium text-[#1A1A1A] mb-[12px]">{title}</h4>
                  <div className="space-y-[8px]">
                    {items.map((item) => (
                      <label key={item} className="flex items-center gap-[10px] cursor-pointer">
                        <div className="w-[16px] h-[16px] border-[2px] border-[#C9A870] rounded-[2px]" />
                        <span className="text-[14px] font-normal text-[#3D3D3D]">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
              <button className="w-full h-[48px] bg-[#8B7355] text-white text-[15px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">Apply</button>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="min-h-[64px] flex items-center justify-between mb-[48px]">
            <span className="text-[15px] font-normal text-[#666666]">Showing 36 of 124 skincare products</span>
            <div className="flex items-center gap-[16px]">
              <span className="text-[15px] font-normal text-[#666666]">Sort by:</span>
              <button className="w-[240px] min-h-[48px] px-4 py-[14px] bg-white border border-[#E8E3D9] rounded-[8px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] flex items-center justify-between cursor-pointer hover:border-[#C9A870] transition-all duration-200">
                <span className="text-[15px] font-medium text-[#2B2B2B]">Best Selling</span>
                <IoChevronDown className="w-[18px] h-[18px] text-[#8B7355]" />
              </button>
            </div>
          </div>

          {/* Row 1: Large + Two Stacked */}
          <div className="flex gap-[20px] mb-[64px]">
            <div className="w-[460px] h-[560px] bg-white rounded-[12px] overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)] group cursor-pointer hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] transition-all duration-300">
              <div className="relative w-full h-[380px]">
                <img src={largeProducts[0].image} alt={largeProducts[0].name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute bottom-0 left-0 right-0 h-[180px] bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-[24px] text-white">
                  <p className="text-[17px] font-normal mb-2">{largeProducts[0].description}</p>
                  <h3 className="text-[28px] font-medium mb-3">{largeProducts[0].name}</h3>
                  <p className="text-[24px] font-semibold">{largeProducts[0].price}</p>
                </div>
                <div className="absolute top-[20px] right-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="px-[24px] py-[12px] bg-white text-[#8B7355] text-[14px] font-medium rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.2)]">Add to Bag</button>
                </div>
              </div>
              <div className="p-[24px]">
                <p className="text-[13px] font-light italic text-[#8B7355] tracking-[1.2px] mb-2">Shan Loray</p>
                <div className="flex items-center gap-[6px]"><Stars /><span className="text-[13px] font-normal text-[#999999] ml-1">({largeProducts[0].reviews})</span></div>
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-[20px]">
              {mediumProducts.map((product, idx) => (
                <div key={idx} className="w-full h-[270px] bg-white rounded-[12px] overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)] group cursor-pointer hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] transition-all duration-300 flex">
                  <div className="w-[280px] h-full relative overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-[16px] right-[16px] flex gap-[8px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.15)]"><IoHeartOutline className="w-[20px] h-[20px] text-[#2B2B2B]" /></div>
                      <div className="w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.15)]"><IoEyeOutline className="w-[20px] h-[20px] text-[#2B2B2B]" /></div>
                    </div>
                  </div>
                  <div className="flex-1 p-[24px] flex flex-col justify-center">
                    <p className="text-[13px] font-light italic text-[#8B7355] tracking-[1.2px] mb-2">Shan Loray</p>
                    <h4 className="text-[20px] font-medium text-[#2B2B2B] leading-[1.2] mb-2">{product.name}</h4>
                    <p className="text-[15px] font-normal text-[#999999] leading-[1.5] mb-3">{product.description}</p>
                    <p className="text-[19px] font-semibold text-[#1A1A1A] mb-3">{product.price}</p>
                    <div className="flex items-center gap-[6px]"><Stars /><span className="text-[13px] font-normal text-[#999999] ml-1">({product.reviews})</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Three Square Cards */}
          <div className="grid grid-cols-3 gap-[20px] mb-[64px]">
            {squareProducts.map((product, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="relative w-full aspect-square rounded-[12px] overflow-hidden mb-[16px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] transition-all duration-300">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-[16px] right-[16px] flex flex-col gap-[8px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.15)]"><IoHeartOutline className="w-[20px] h-[20px] text-[#2B2B2B]" /></div>
                    <div className="w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.15)]"><IoEyeOutline className="w-[20px] h-[20px] text-[#2B2B2B]" /></div>
                  </div>
                </div>
                <p className="text-[13px] font-light italic text-[#8B7355] tracking-[1.2px] mb-2">Shan Loray</p>
                <h4 className="text-[20px] font-medium text-[#2B2B2B] leading-[1.2] mb-2">{product.name}</h4>
                <p className="text-[15px] font-normal text-[#999999] leading-[1.5] mb-2">{product.description}</p>
                <p className="text-[19px] font-semibold text-[#1A1A1A] mb-2">{product.price}</p>
                <div className="flex items-center gap-[6px]"><Stars /><span className="text-[13px] font-normal text-[#999999] ml-1">({product.reviews})</span></div>
              </div>
            ))}
          </div>

          {/* Row 3: Two Rectangular Cards */}
          <div className="grid grid-cols-2 gap-[20px] mb-[64px]">
            {rectangularProducts.map((product, idx) => (
              <div key={idx} className="w-full h-[400px] bg-white rounded-[12px] overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)] group cursor-pointer hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] transition-all duration-300">
                <div className="relative w-full h-[280px] overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-[56px] h-[56px] bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.2)]">
                      <IoEyeOutline className="w-[28px] h-[28px] text-[#2B2B2B]" />
                    </div>
                  </div>
                </div>
                <div className="p-[24px]">
                  <p className="text-[13px] font-light italic text-[#8B7355] tracking-[1.2px] mb-2">Shan Loray</p>
                  <h4 className="text-[22px] font-medium text-[#2B2B2B] leading-[1.2] mb-2">{product.name}</h4>
                  <p className="text-[15px] font-normal text-[#999999] leading-[1.5] mb-3">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-[22px] font-semibold text-[#1A1A1A]">{product.price}</p>
                    <div className="flex items-center gap-[6px]"><Stars /><span className="text-[13px] font-normal text-[#999999] ml-1">({product.reviews})</span></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-[8px] mb-[96px]">
            <button className="w-[44px] h-[44px] border border-[#E8E3D9] rounded-[6px] flex items-center justify-center cursor-pointer hover:bg-[#F5F1EA] transition-colors">
              <IoChevronBack className="w-[20px] h-[20px] text-[#666666]" />
            </button>
            <button className="w-[44px] h-[44px] bg-[#8B7355] text-white text-[15px] font-medium rounded-[6px]">1</button>
            {[2, 3, 4].map((num) => (
              <button key={num} className="w-[44px] h-[44px] border border-[#E8E3D9] rounded-[6px] text-[15px] font-medium text-[#3D3D3D] cursor-pointer hover:border-[#8B7355] hover:text-[#8B7355] transition-colors">{num}</button>
            ))}
            <button className="w-[44px] h-[44px] border border-[#E8E3D9] rounded-[6px] flex items-center justify-center cursor-pointer hover:bg-[#F5F1EA] transition-colors">
              <IoChevronForward className="w-[20px] h-[20px] text-[#666666]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Main Export (Switcher) ───────────────────────────────────────────────────
export default function SkinCare() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return isMobile ? <SkinCareMobile /> : <SkinCareDesktop />
}