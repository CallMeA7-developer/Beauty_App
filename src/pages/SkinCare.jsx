import { useState, useEffect } from 'react'
import {
  IoStarSharp,
  IoChevronBack,
  IoChevronForward,
  IoHeartOutline,
  IoEyeOutline,
  IoChevronDown,
  IoCloseOutline,
  IoClose,
  IoCheckmark,
  IoFunnelOutline,
  IoSearchOutline,
  IoLogoInstagram,
  IoLogoFacebook,
  IoLogoPinterest,
  IoLogoYoutube,
} from 'react-icons/io5'

// ─── Shared Data ──────────────────────────────────────────────────────────────
const skinTypes    = ['All Types', 'Dry', 'Oily', 'Combination', 'Sensitive', 'Mature']
const skinConcerns = ['Anti-Aging', 'Hydration', 'Brightening', 'Acne Care', 'Redness Relief', 'Dark Spots', 'Large Pores', 'Fine Lines']
const ingredients  = ['Retinol', 'Vitamin C', 'Hyaluronic Acid', 'Niacinamide', 'AHA/BHA', 'Ceramides']
const brandValues  = ['Vegan', 'Cruelty-Free', 'Fragrance-Free', 'Organic']
const sortOptions  = ['Recommended', 'Best Selling', 'Newest Arrivals', 'Price: Low to High', 'Price: High to Low', 'Highest Rated']

// Mobile category cards
const mobileCategoryCards = [
  { name: 'Cleansers',     count: 12, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=80&h=80&fit=crop' },
  { name: 'Serums',        count: 18, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=80&h=80&fit=crop' },
  { name: 'Moisturizers',  count: 15, image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=80&h=80&fit=crop' },
  { name: 'Eye Care',      count: 8,  image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=80&h=80&fit=crop' },
  { name: 'Masks',         count: 10, image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=80&h=80&fit=crop' },
  { name: 'Sunscreen',     count: 6,  image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=80&h=80&fit=crop' },
]

// Mobile product grid
const mobileProducts = [
  { name: 'Botanical Renewal Serum',  description: 'Advanced age-defying formula',    price: '$185', reviews: 248, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop' },
  { name: 'Hydrating Face Cleanser',  description: 'Gentle foaming gel cleanser',     price: '$58',  reviews: 312, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop' },
  { name: 'Supreme Moisture Cream',   description: '24-hour deep hydration',          price: '$165', reviews: 421, image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop' },
  { name: 'Perfecting Eye Cream',     description: 'Reduces fine lines & dark circles', price: '$98', reviews: 287, image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400&h=400&fit=crop' },
  { name: 'Revitalizing Face Mask',   description: 'Purifying clay treatment',        price: '$72',  reviews: 356, image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=400&fit=crop' },
  { name: 'Daily SPF Moisturizer',    description: 'Broad spectrum SPF 50',           price: '$65',  reviews: 519, image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=400&h=400&fit=crop' },
]

// Filter data
const filterCategories = [
  { name: 'Cleansers',    count: 12, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=80&h=80&fit=crop' },
  { name: 'Serums',       count: 18, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=80&h=80&fit=crop' },
  { name: 'Moisturizers', count: 15, image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=80&h=80&fit=crop' },
  { name: 'Eye Care',     count: 8,  image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=80&h=80&fit=crop' },
  { name: 'Masks',        count: 10, image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=80&h=80&fit=crop' },
  { name: 'Sunscreen',    count: 6,  image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=80&h=80&fit=crop' },
]
const filterSkinTypes   = ['All Skin Types', 'Dry', 'Oily', 'Combination', 'Sensitive', 'Mature']
const filterConcerns    = ['Anti-Aging', 'Hydration', 'Brightening', 'Acne Care', 'Redness Relief', 'Dark Spots']
const filterIngredients = ['Retinol', 'Vitamin C', 'Hyaluronic Acid', 'Niacinamide', 'AHA/BHA', 'Ceramides']
const filterBrands      = ['Shan Loray', 'La Mer', 'SK-II', 'Tatcha', 'Sunday Riley', 'Drunk Elephant', 'Paula\'s Choice', 'The Ordinary']
const filterRatings     = [{ stars: 5, count: 312 }, { stars: 4, count: 198 }, { stars: 3, count: 87 }, { stars: 2, count: 34 }, { stars: 1, count: 9 }]

// Desktop data
const largeProducts = [
  { name: 'Advanced Retinol Night Serum',  description: 'Time-release formula for smooth, youthful skin', price: '$198', reviews: 412, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=560&h=560&fit=crop' },
  { name: 'Vitamin C Brightening Complex', description: 'Powerful antioxidant serum for radiant glow',     price: '$165', reviews: 387, image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=940&h=800&fit=crop' },
]
const mediumProducts = [
  { name: 'Hydrating Gel Cleanser',    description: 'Gentle daily cleanser for all skin types', price: '$58',  reviews: 534, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=460&h=280&fit=crop' },
  { name: 'Peptide Eye Renewal Cream', description: 'Targets fine lines and dark circles',      price: '$145', reviews: 298, image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=460&h=280&fit=crop' },
]
const squareProducts = [
  { name: 'Deep Moisture Face Cream', description: '24-hour hydration therapy',         price: '$128', reviews: 621, image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=300&h=300&fit=crop' },
  { name: 'Illuminating Clay Mask',   description: 'Purifies and brightens complexion', price: '$78',  reviews: 445, image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=300&h=300&fit=crop' },
  { name: 'Mineral Defense SPF 50',   description: 'Broad spectrum sun protection',     price: '$72',  reviews: 789, image: 'https://images.unsplash.com/photo-1556228852-80a3c31c6d52?w=300&h=300&fit=crop' },
]
const rectangularProducts = [
  { name: 'Complete Skincare Ritual Set', description: 'Four essential steps to luminous skin',        price: '$395', reviews: 203, image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=470&h=400&fit=crop' },
  { name: 'Travel Essentials Collection', description: 'Your complete routine in travel sizes',        price: '$145', reviews: 167, image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=470&h=400&fit=crop' },
]

// ─── Mobile ───────────────────────────────────────────────────────────────────
function SkinCareMobile() {
  const [activeSort, setActiveSort]           = useState('Recommended')
  const [showSortSheet, setShowSortSheet]     = useState(false)
  const [showFilterSheet, setShowFilterSheet] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState(['Serums'])
  const [selectedSkinTypes, setSelectedSkinTypes]   = useState(['Dry'])
  const [selectedConcerns, setSelectedConcerns]     = useState([])
  const [selectedIngredients, setSelectedIngredients] = useState([])
  const [selectedBrands, setSelectedBrands]         = useState(['Shan Loray'])
  const [selectedRating, setSelectedRating]         = useState(null)

  const activeFilters = selectedCategories.length + selectedSkinTypes.filter(t => t !== 'All Skin Types').length + selectedBrands.filter(b => b !== 'Shan Loray').length + (selectedRating ? 1 : 0)

  return (
    <div className="w-full min-h-screen bg-white font-['Cormorant_Garamond']">

      {/* ── Hero Banner ── */}
      <div className="relative min-h-[260px] bg-[#F5F0EB] overflow-hidden flex items-center">
        {/* Right botanical image */}
        <div className="absolute right-0 top-0 bottom-0 w-[50%]">
          <img
            src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=400&h=400&fit=crop"
            alt="Botanical"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#F5F0EB] via-[#F5F0EB]/20 to-transparent" />
        </div>
        {/* Left text */}
        <div className="relative z-10 px-5 py-10 w-[62%]">
          <p className="text-[10px] font-light italic text-[#8B7355] tracking-[2px] mb-3">SCIENCE MEETS NATURE</p>
          <h1 className="text-[36px] font-bold text-[#1A1A1A] leading-[1.05] mb-3">Skincare</h1>
          <p className="text-[13px] font-normal text-[#666666] mb-4">Discover transformative formulas</p>
          <div className="w-[48px] h-[2px] bg-[#C9A870]" />
        </div>
      </div>

      {/* ── Category Cards ── */}
      <div className="bg-white px-4 py-5 overflow-x-auto border-b border-[#E8E3D9]" style={{ scrollbarWidth: 'none' }}>
        <div className="flex gap-3 w-max">
          {mobileCategoryCards.map((cat) => (
            <div key={cat.name} className="w-[120px] bg-white border border-[#E8E3D9] rounded-[12px] p-4 flex flex-col items-center gap-2 cursor-pointer hover:border-[#C9A870] transition-colors">
              <div className="w-[60px] h-[60px] rounded-full overflow-hidden bg-[#F9F6F2]">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
              </div>
              <span className="text-[13px] font-medium text-[#1A1A1A] text-center">{cat.name}</span>
              <span className="text-[11px] font-light text-[#999999]">{cat.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Toolbar ── */}
      <div className="bg-white px-5 pt-4 pb-3">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[13px] font-normal text-[#666666]">Showing 36 products</span>
          <button
            onClick={() => setShowFilterSheet(true)}
            className="relative flex items-center gap-2 h-9 px-4 border border-[#E8E3D9] rounded-full text-[13px] font-medium text-[#2B2B2B]"
          >
            <IoFunnelOutline className="w-3.5 h-3.5 text-[#8B7355]" />
            Filters
            <div className="absolute -top-2 -right-2 w-5 h-5 bg-[#8B7355] rounded-full flex items-center justify-center">
              <span className="text-[10px] font-medium text-white">2</span>
            </div>
          </button>
        </div>
        {/* Sort dropdown */}
        <button
          onClick={() => setShowSortSheet(true)}
          className="w-full h-12 px-4 bg-white border border-[#E8E3D9] rounded-[8px] flex items-center justify-between mb-2"
        >
          <span className="text-[14px] font-normal text-[#2B2B2B]">Sort: {activeSort}</span>
          <IoChevronDown className="w-4 h-4 text-[#8B7355]" />
        </button>
      </div>

      {/* ── Product Grid ── */}
      <div className="px-4 pb-6">
        <div className="grid grid-cols-2 gap-4">
          {mobileProducts.map((product, idx) => (
            <div key={idx} className="bg-white rounded-[12px] border border-[#E8E3D9] overflow-hidden">
              <div className="relative h-[180px]">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                <button className="absolute top-2.5 right-2.5 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <IoHeartOutline className="w-4 h-4 text-[#2B2B2B]" />
                </button>
              </div>
              <div className="p-3">
                <p className="text-[11px] font-light italic text-[#8B7355] mb-1">Shan Loray</p>
                <h4 className="text-[14px] font-semibold text-[#1A1A1A] leading-tight mb-1">{product.name}</h4>
                <p className="text-[12px] font-normal text-[#999999] mb-2">{product.description}</p>
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[16px] font-semibold text-[#1A1A1A]">{product.price}</span>
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => <IoStarSharp key={i} className="w-[11px] h-[11px] text-[#C9A870]" />)}
                  </div>
                </div>
                <p className="text-[11px] text-[#999999] mb-3">({product.reviews})</p>
                <button className="w-full h-9 bg-[#8B7355] text-white text-[12px] font-medium rounded-[6px]">
                  Add to Bag
                </button>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full h-12 mt-5 border border-[#C9A870] text-[#8B7355] text-[14px] font-medium rounded-[8px]">
          Load More
        </button>
      </div>

      {/* ── Newsletter ── */}
      <div className="bg-[#F5F0EB] px-5 py-10 text-center">
        <h3 className="text-[24px] font-semibold text-[#1A1A1A] mb-2">Join the Skincare Revolution</h3>
        <p className="text-[14px] font-normal text-[#666666] mb-5">Expert tips & exclusive offers</p>
        <div className="flex gap-2">
          <input type="email" placeholder="Enter your email" className="flex-1 h-12 px-4 bg-white text-[13px] text-[#2B2B2B] rounded-[8px] border border-[#E8E3D9] outline-none" />
          <button className="h-12 px-5 bg-[#8B7355] text-white text-[13px] font-medium rounded-[8px]">Subscribe</button>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="bg-[#2B2B2B] px-5 pt-10 pb-8">
        <h3 className="text-[18px] font-semibold text-white tracking-[2px] mb-1">SHAN LORAY</h3>
        <p className="text-[12px] font-light italic text-[#C4B5A0] mb-8">Timeless Luxury Beauty</p>
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div>
            <h4 className="text-[13px] font-medium text-white mb-3">Shop</h4>
            <div className="space-y-2">{['Skincare','Makeup','Fragrance'].map((l) => <p key={l} className="text-[12px] text-[#C4B5A0]">{l}</p>)}</div>
          </div>
          <div>
            <h4 className="text-[13px] font-medium text-white mb-3">Help</h4>
            <div className="space-y-2">{['Contact','Shipping','Returns'].map((l) => <p key={l} className="text-[12px] text-[#C4B5A0]">{l}</p>)}</div>
          </div>
          <div>
            <h4 className="text-[13px] font-medium text-white mb-3">About</h4>
            <div className="space-y-2">{['Our Story','Ingredients','Sustainability'].map((l) => <p key={l} className="text-[12px] text-[#C4B5A0]">{l}</p>)}</div>
          </div>
        </div>
        <div className="flex justify-center gap-6 mb-6">
          <IoLogoInstagram className="w-6 h-6 text-white" />
          <IoLogoFacebook  className="w-6 h-6 text-white" />
          <IoLogoPinterest className="w-6 h-6 text-white" />
          <IoLogoYoutube   className="w-6 h-6 text-white" />
        </div>
        <div className="border-t border-[#3D3D3D] pt-5 text-center">
          <p className="text-[11px] text-[#808080]">©2024 Shan Loray. All rights reserved.</p>
        </div>
      </footer>

      {/* ── Sort Sheet ── */}
      {showSortSheet && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowSortSheet(false)} />
          <div className="relative bg-white rounded-t-[20px] px-5 pt-5 pb-8">
            <div className="w-10 h-1 bg-[#E8E3D9] rounded-full mx-auto mb-5" />
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[18px] font-semibold text-[#1A1A1A]">Sort By</h3>
              <button onClick={() => setShowSortSheet(false)}><IoCloseOutline className="w-6 h-6 text-[#2B2B2B]" /></button>
            </div>
            <div className="space-y-1">
              {sortOptions.map((option) => (
                <button key={option} onClick={() => { setActiveSort(option); setShowSortSheet(false) }}
                  className="w-full h-12 flex items-center justify-between px-4 rounded-[8px] hover:bg-[#FAF8F5]">
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

      {/* ── Filter Sheet ── */}
      {showFilterSheet && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowFilterSheet(false)} />
          <div className="relative bg-white rounded-t-[24px] shadow-[0_-4px_24px_rgba(0,0,0,0.12)] flex flex-col" style={{ maxHeight: '92vh' }}>

            {/* Handle */}
            <div className="flex items-center justify-center pt-3 pb-1 flex-shrink-0">
              <div className="w-10 h-1 bg-[#E8E3D9] rounded-full" />
            </div>

            {/* Header */}
            <div className="min-h-[60px] px-5 flex items-center justify-between border-b border-[#E8E3D9] flex-shrink-0">
              <div className="flex items-center gap-2">
                <h2 className="text-[22px] font-semibold text-[#1A1A1A]">Filters</h2>
                <div className="w-[22px] h-[22px] bg-[#C9A870] rounded-full flex items-center justify-center">
                  <span className="text-[11px] font-semibold text-white">2</span>
                </div>
              </div>
              <button onClick={() => setShowFilterSheet(false)}>
                <IoClose className="w-6 h-6 text-[#2B2B2B]" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto flex-1">

              {/* Category */}
              <div className="px-5 py-5 border-b border-[#E8E3D9]">
                <h3 className="text-[16px] font-medium text-[#2B2B2B] mb-4">Product Category</h3>
                <div className="grid grid-cols-3 gap-3">
                  {filterCategories.map((cat) => {
                    const isSelected = selectedCategories.includes(cat.name)
                    return (
                      <button
                        key={cat.name}
                        onClick={() => setSelectedCategories(prev => isSelected ? prev.filter(c => c !== cat.name) : [...prev, cat.name])}
                        className={`rounded-[8px] p-3 flex flex-col items-center gap-2 border-2 transition-colors ${isSelected ? 'border-[#8B7355] bg-[#FDFBF7]' : 'border-[#E8E3D9] bg-white'}`}
                      >
                        <img src={cat.image} alt={cat.name} className="w-[36px] h-[36px] rounded-full object-cover" />
                        <span className="text-[11px] font-medium text-[#2B2B2B] text-center leading-tight">{cat.name}</span>
                        <span className="text-[10px] text-[#999999]">{cat.count}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Price Range */}
              <div className="px-5 py-5 border-b border-[#E8E3D9]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[16px] font-medium text-[#2B2B2B]">Price Range</h3>
                  <span className="text-[14px] font-medium text-[#8B7355]">$0 – $200</span>
                </div>
                <div className="relative pt-2 pb-6">
                  <div className="h-[4px] bg-[#E8E3D9] rounded-full relative">
                    <div className="absolute left-0 h-full w-[70%] bg-[#C9A870] rounded-full" />
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[22px] h-[22px] bg-white border-2 border-[#8B7355] rounded-full shadow-sm" />
                    <div className="absolute left-[70%] top-1/2 -translate-y-1/2 w-[22px] h-[22px] bg-white border-2 border-[#8B7355] rounded-full shadow-sm" />
                  </div>
                  <div className="flex justify-between mt-3">
                    <span className="text-[12px] text-[#666666]">$0</span>
                    <span className="text-[12px] text-[#666666]">$300</span>
                  </div>
                </div>
              </div>

              {/* Skin Type */}
              <div className="px-5 py-5 border-b border-[#E8E3D9]">
                <h3 className="text-[16px] font-medium text-[#2B2B2B] mb-4">Skin Type</h3>
                <div className="space-y-3">
                  {filterSkinTypes.map((type) => {
                    const isChecked = selectedSkinTypes.includes(type)
                    return (
                      <button key={type} onClick={() => setSelectedSkinTypes(prev => isChecked ? prev.filter(t => t !== type) : [...prev, type])}
                        className="flex items-center gap-3 w-full">
                        <div className={`w-[20px] h-[20px] rounded-[4px] border-2 flex items-center justify-center flex-shrink-0 transition-colors ${isChecked ? 'bg-[#C9A870] border-[#C9A870]' : 'bg-white border-[#E8E3D9]'}`}>
                          {isChecked && <IoCheckmark className="w-[13px] h-[13px] text-white" />}
                        </div>
                        <span className="text-[14px] text-[#2B2B2B]">{type}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Skin Concerns */}
              <div className="px-5 py-5 border-b border-[#E8E3D9]">
                <h3 className="text-[16px] font-medium text-[#2B2B2B] mb-4">Skin Concerns</h3>
                <div className="flex flex-wrap gap-2">
                  {filterConcerns.map((concern) => {
                    const isSelected = selectedConcerns.includes(concern)
                    return (
                      <button key={concern} onClick={() => setSelectedConcerns(prev => isSelected ? prev.filter(c => c !== concern) : [...prev, concern])}
                        className={`px-4 py-2 rounded-full text-[13px] font-medium transition-colors ${isSelected ? 'bg-[#8B7355] text-white' : 'bg-[#F5F1EA] text-[#3D3D3D]'}`}>
                        {concern}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Key Ingredients */}
              <div className="px-5 py-5 border-b border-[#E8E3D9]">
                <h3 className="text-[16px] font-medium text-[#2B2B2B] mb-4">Key Ingredients</h3>
                <div className="flex flex-wrap gap-2">
                  {filterIngredients.map((ing) => {
                    const isSelected = selectedIngredients.includes(ing)
                    return (
                      <button key={ing} onClick={() => setSelectedIngredients(prev => isSelected ? prev.filter(i => i !== ing) : [...prev, ing])}
                        className={`px-4 py-2 rounded-full text-[13px] font-medium transition-colors ${isSelected ? 'bg-[#8B7355] text-white' : 'bg-[#F5F1EA] text-[#3D3D3D]'}`}>
                        {ing}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Brand */}
              <div className="px-5 py-5 border-b border-[#E8E3D9]">
                <h3 className="text-[16px] font-medium text-[#2B2B2B] mb-4">Brand</h3>
                <div className="w-full h-[44px] bg-[#F5F1EA] rounded-[8px] px-4 flex items-center mb-4">
                  <IoSearchOutline className="w-[16px] h-[16px] text-[#999999] mr-2 flex-shrink-0" />
                  <input type="text" placeholder="Search brands" className="flex-1 bg-transparent text-[14px] text-[#2B2B2B] outline-none" />
                </div>
                <div className="space-y-2">
                  {filterBrands.map((brand) => {
                    const isChecked = selectedBrands.includes(brand)
                    return (
                      <button key={brand} onClick={() => setSelectedBrands(prev => isChecked ? prev.filter(b => b !== brand) : [...prev, brand])}
                        className="flex items-center gap-3 h-[40px] w-full">
                        <div className={`w-[20px] h-[20px] rounded-[4px] border-2 flex items-center justify-center flex-shrink-0 transition-colors ${isChecked ? 'bg-[#C9A870] border-[#C9A870]' : 'bg-white border-[#E8E3D9]'}`}>
                          {isChecked && <IoCheckmark className="w-[13px] h-[13px] text-white" />}
                        </div>
                        <span className="text-[14px] text-[#2B2B2B]">{brand}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Rating */}
              <div className="px-5 py-5">
                <h3 className="text-[16px] font-medium text-[#2B2B2B] mb-4">Rating</h3>
                <div className="space-y-2">
                  {filterRatings.map((r) => (
                    <button key={r.stars} onClick={() => setSelectedRating(prev => prev === r.stars ? null : r.stars)}
                      className={`flex items-center justify-between w-full h-[36px] px-3 rounded-[4px] transition-colors ${selectedRating === r.stars ? 'bg-[#FDFBF7]' : ''}`}>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                          {[...Array(r.stars)].map((_, i) => <IoStarSharp key={i} className="w-[14px] h-[14px] text-[#C9A870]" />)}
                        </div>
                        <span className="text-[13px] text-[#2B2B2B]">& up</span>
                      </div>
                      <span className="text-[13px] text-[#999999]">({r.count})</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 py-4 border-t border-[#E8E3D9] flex gap-3 flex-shrink-0">
              <button
                onClick={() => { setSelectedCategories([]); setSelectedSkinTypes([]); setSelectedConcerns([]); setSelectedIngredients([]); setSelectedBrands([]); setSelectedRating(null) }}
                className="flex-1 h-12 bg-white border-2 border-[#8B7355] text-[#8B7355] text-[15px] font-semibold rounded-[8px]"
              >
                Clear All
              </button>
              <button onClick={() => setShowFilterSheet(false)} className="flex-1 h-12 bg-[#8B7355] text-white text-[15px] font-semibold rounded-[8px]">
                Apply Filters (36 items)
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

// ─── Desktop + Tablet responsive ─────────────────────────────────────────────
function SkinCareDesktop() {
  const Stars = () => [...Array(5)].map((_, i) => <IoStarSharp key={i} className="w-[15px] h-[15px] text-[#C9A870]" />)

  return (
    <div className="bg-white font-['Cormorant_Garamond']">

      {/* Hero */}
      <div className="min-h-[300px] md:min-h-[340px] lg:min-h-[380px] bg-gradient-to-b from-[#FDFBF7] to-[#F5F1EA] relative overflow-hidden flex items-center px-6 md:px-[60px] lg:px-[120px]">
        <img src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800&h=800&fit=crop" alt="" className="absolute top-0 right-0 w-[200px] md:w-[360px] lg:w-[500px] h-full object-cover opacity-20" />
        <div className="w-full max-w-[650px] relative z-10">
          <p className="text-[12px] md:text-[13px] lg:text-[14px] font-light italic text-[#8B7355] tracking-[2px] mb-3">COMPLETE SKINCARE COLLECTION</p>
          <h1 className="text-[40px] md:text-[52px] lg:text-[64px] font-bold text-[#1A1A1A] leading-[1] mb-4 md:mb-5 lg:mb-6">Science Meets Nature</h1>
          <p className="text-[15px] md:text-[16px] lg:text-[18px] font-normal text-[#666666] mb-6 md:mb-7 lg:mb-8">From cleansing to protection, discover transformative skincare</p>
          <div className="w-[80px] md:w-[90px] lg:w-[100px] h-[4px] bg-[#C9A870]" />
        </div>
        <div className="hidden lg:block absolute right-[180px] top-1/2 -translate-y-1/2">
          <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=320&h=320&fit=crop" alt="" className="w-[260px] h-[260px] object-cover rounded-[8px] shadow-[0_12px_48px_rgba(0,0,0,0.12)]" />
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="min-h-[48px] bg-[#FDFBF7] px-6 md:px-[60px] lg:px-[120px] flex items-center">
        <span className="text-[13px] lg:text-[15px] text-[#8B7355] cursor-pointer">Home</span><span className="text-[13px] lg:text-[15px] text-[#666666] mx-2">/</span>
        <span className="text-[13px] lg:text-[15px] text-[#8B7355] cursor-pointer">Shop</span><span className="text-[13px] lg:text-[15px] text-[#666666] mx-2">/</span>
        <span className="text-[13px] lg:text-[15px] text-[#666666]">Skincare</span>
      </div>

      {/* Main Content */}
      <div className="px-6 md:px-[60px] lg:px-[120px] py-8 md:py-12 lg:py-[64px] flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-[48px]">

        {/* Sidebar — hidden on tablet, shown as full width on md+ */}
        <div className="hidden md:block w-full md:w-[220px] lg:w-[280px] flex-shrink-0">
          <div className="bg-white border border-[#E8E3D9] rounded-[16px] shadow-[0_8px_32px_rgba(0,0,0,0.08)] p-5 lg:p-[28px]">
            <h3 className="text-[16px] lg:text-[18px] font-medium text-[#1A1A1A] mb-5 lg:mb-[24px]">REFINE SELECTION</h3>
            <div className="space-y-[10px] lg:space-y-[12px] mb-6 lg:mb-[32px]">
              <div className="inline-flex items-center px-[16px] lg:px-[20px] py-[8px] lg:py-[10px] bg-[#8B7355] text-white text-[13px] lg:text-[14px] font-medium rounded-full cursor-pointer">All Skincare</div>
              {[
                { label: 'Cleansers',    subs: ['Face Wash', 'Cleansing Oil', 'Micellar Water', 'Exfoliators'] },
                { label: 'Serums',       subs: ['Vitamin C', 'Retinol', 'Hyaluronic Acid', 'Niacinamide', 'Peptides'] },
                { label: 'Moisturizers', subs: ['Day Cream', 'Night Cream', 'Gel Moisturizer', 'Face Oil'] },
              ].map(({ label, subs }) => (
                <div key={label}>
                  <div className="inline-flex items-center px-[16px] lg:px-[20px] py-[8px] lg:py-[10px] bg-[#F5F1EA] text-[#3D3D3D] text-[13px] lg:text-[14px] font-medium rounded-full cursor-pointer gap-2">
                    <span>{label}</span><IoChevronDown className="w-[13px] h-[13px] lg:w-[14px] lg:h-[14px]" />
                  </div>
                  <div className="ml-[20px] lg:ml-[24px] mt-[8px]">
                    {subs.map((item) => <div key={item} className="inline-block px-[12px] lg:px-[16px] py-[5px] lg:py-[6px] bg-white border border-[#E8E3D9] text-[#666666] text-[12px] lg:text-[13px] rounded-full cursor-pointer mr-1 lg:mr-2 mb-2">{item}</div>)}
                  </div>
                </div>
              ))}
              {['Eye Care', 'Masks', 'Sunscreen', 'Sets & Routines'].map((cat) => (
                <div key={cat} className="inline-flex items-center px-[16px] lg:px-[20px] py-[8px] lg:py-[10px] bg-[#F5F1EA] text-[#3D3D3D] text-[13px] lg:text-[14px] font-medium rounded-full cursor-pointer gap-2">
                  <span>{cat}</span><IoChevronDown className="w-[13px] h-[13px] lg:w-[14px] lg:h-[14px]" />
                </div>
              ))}
            </div>
            <div className="border-t border-[#E8E3D9] pt-5 lg:pt-[24px] space-y-4 lg:space-y-[20px]">
              <div>
                <h4 className="text-[14px] lg:text-[15px] font-medium text-[#1A1A1A] mb-3 lg:mb-[12px]">Price Range</h4>
                <div className="flex items-center gap-[6px] lg:gap-[8px]">
                  <input type="text" placeholder="$0"   className="w-[80px] lg:w-[100px] h-[34px] lg:h-[36px] px-3 border border-[#E8E3D9] rounded-[6px] text-[13px] lg:text-[14px] outline-none" />
                  <span className="text-[13px] lg:text-[14px] text-[#666666]">—</span>
                  <input type="text" placeholder="$500" className="w-[80px] lg:w-[100px] h-[34px] lg:h-[36px] px-3 border border-[#E8E3D9] rounded-[6px] text-[13px] lg:text-[14px] outline-none" />
                </div>
              </div>
              {[{title:'Skin Type',items:skinTypes},{title:'Skin Concerns',items:skinConcerns},{title:'Ingredients',items:ingredients},{title:'Brand Values',items:brandValues}].map(({title,items}) => (
                <div key={title}>
                  <h4 className="text-[14px] lg:text-[15px] font-medium text-[#1A1A1A] mb-3 lg:mb-[12px]">{title}</h4>
                  <div className="space-y-[6px] lg:space-y-[8px]">
                    {items.map((item) => (
                      <label key={item} className="flex items-center gap-[10px] cursor-pointer">
                        <div className="w-[15px] h-[15px] lg:w-[16px] lg:h-[16px] border-[2px] border-[#C9A870] rounded-[2px] flex-shrink-0" />
                        <span className="text-[13px] lg:text-[14px] text-[#3D3D3D]">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
              <button className="w-full h-[44px] lg:h-[48px] bg-[#8B7355] text-white text-[14px] lg:text-[15px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">Apply</button>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1 min-w-0">

          {/* Toolbar */}
          <div className="flex items-center justify-between mb-8 md:mb-10 lg:mb-[48px]">
            <span className="text-[13px] md:text-[14px] lg:text-[15px] text-[#666666]">Showing 36 of 124 skincare products</span>
            <div className="flex items-center gap-3 lg:gap-[16px]">
              <span className="hidden md:inline text-[14px] lg:text-[15px] text-[#666666]">Sort by:</span>
              <button className="w-[180px] md:w-[200px] lg:w-[240px] min-h-[44px] lg:min-h-[48px] px-4 bg-white border border-[#E8E3D9] rounded-[8px] flex items-center justify-between cursor-pointer hover:border-[#C9A870] transition-all">
                <span className="text-[13px] md:text-[14px] lg:text-[15px] font-medium text-[#2B2B2B]">Best Selling</span>
                <IoChevronDown className="w-[16px] h-[16px] lg:w-[18px] lg:h-[18px] text-[#8B7355]" />
              </button>
            </div>
          </div>

          {/* Row 1 — large card + 2 medium cards */}
          <div className="flex flex-col md:flex-row gap-5 mb-10 md:mb-12 lg:mb-[64px]">
            <div className="w-full md:w-[300px] lg:w-[460px] md:h-[480px] lg:h-[560px] bg-white rounded-[12px] overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)] group cursor-pointer hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] transition-all duration-300">
              <div className="relative w-full h-[260px] md:h-[300px] lg:h-[380px]">
                <img src={largeProducts[0].image} alt={largeProducts[0].name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute bottom-0 left-0 right-0 h-[160px] bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-[24px] text-white">
                  <p className="text-[14px] lg:text-[17px] mb-1 lg:mb-2">{largeProducts[0].description}</p>
                  <h3 className="text-[20px] lg:text-[28px] font-medium mb-2 lg:mb-3">{largeProducts[0].name}</h3>
                  <p className="text-[20px] lg:text-[24px] font-semibold">{largeProducts[0].price}</p>
                </div>
                <div className="absolute top-[16px] lg:top-[20px] right-[16px] lg:right-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="px-[18px] lg:px-[24px] py-[10px] lg:py-[12px] bg-white text-[#8B7355] text-[13px] lg:text-[14px] font-medium rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.2)]">Add to Bag</button>
                </div>
              </div>
              <div className="p-5 lg:p-[24px]">
                <p className="text-[12px] lg:text-[13px] font-light italic text-[#8B7355] tracking-[1.2px] mb-2">Shan Loray</p>
                <div className="flex items-center gap-[6px]"><Stars /><span className="text-[13px] text-[#999999] ml-1">({largeProducts[0].reviews})</span></div>
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-4 lg:gap-[20px]">
              {mediumProducts.map((product, idx) => (
                <div key={idx} className="w-full h-[160px] md:h-[220px] lg:h-[270px] bg-white rounded-[12px] overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)] group cursor-pointer hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] transition-all duration-300 flex">
                  <div className="w-[140px] md:w-[180px] lg:w-[280px] h-full relative overflow-hidden flex-shrink-0">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-[12px] right-[12px] lg:top-[16px] lg:right-[16px] flex gap-[6px] lg:gap-[8px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-[34px] h-[34px] lg:w-[40px] lg:h-[40px] bg-white rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.15)]"><IoHeartOutline className="w-[16px] h-[16px] lg:w-[20px] lg:h-[20px] text-[#2B2B2B]" /></div>
                      <div className="w-[34px] h-[34px] lg:w-[40px] lg:h-[40px] bg-white rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.15)]"><IoEyeOutline className="w-[16px] h-[16px] lg:w-[20px] lg:h-[20px] text-[#2B2B2B]" /></div>
                    </div>
                  </div>
                  <div className="flex-1 p-4 lg:p-[24px] flex flex-col justify-center min-w-0">
                    <p className="text-[11px] lg:text-[13px] font-light italic text-[#8B7355] tracking-[1.2px] mb-1 lg:mb-2">Shan Loray</p>
                    <h4 className="text-[15px] md:text-[17px] lg:text-[20px] font-medium text-[#2B2B2B] leading-[1.2] mb-1 lg:mb-2">{product.name}</h4>
                    <p className="text-[12px] lg:text-[15px] text-[#999999] mb-2 lg:mb-3 line-clamp-2">{product.description}</p>
                    <p className="text-[16px] md:text-[17px] lg:text-[19px] font-semibold text-[#1A1A1A] mb-2 lg:mb-3">{product.price}</p>
                    <div className="flex items-center gap-[6px]"><Stars /><span className="text-[12px] lg:text-[13px] text-[#999999] ml-1">({product.reviews})</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 — square products */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-[20px] mb-10 md:mb-12 lg:mb-[64px]">
            {squareProducts.map((product, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="relative w-full aspect-square rounded-[12px] overflow-hidden mb-3 lg:mb-[16px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] transition-all duration-300">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-[12px] right-[12px] lg:top-[16px] lg:right-[16px] flex flex-col gap-[6px] lg:gap-[8px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-[34px] h-[34px] lg:w-[40px] lg:h-[40px] bg-white rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.15)]"><IoHeartOutline className="w-[16px] h-[16px] lg:w-[20px] lg:h-[20px] text-[#2B2B2B]" /></div>
                    <div className="w-[34px] h-[34px] lg:w-[40px] lg:h-[40px] bg-white rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.15)]"><IoEyeOutline className="w-[16px] h-[16px] lg:w-[20px] lg:h-[20px] text-[#2B2B2B]" /></div>
                  </div>
                </div>
                <p className="text-[11px] lg:text-[13px] font-light italic text-[#8B7355] tracking-[1.2px] mb-1 lg:mb-2">Shan Loray</p>
                <h4 className="text-[15px] md:text-[17px] lg:text-[20px] font-medium text-[#2B2B2B] leading-[1.2] mb-1 lg:mb-2">{product.name}</h4>
                <p className="text-[12px] lg:text-[15px] text-[#999999] mb-1 lg:mb-2">{product.description}</p>
                <p className="text-[16px] md:text-[17px] lg:text-[19px] font-semibold text-[#1A1A1A] mb-1 lg:mb-2">{product.price}</p>
                <div className="flex items-center gap-[6px]"><Stars /><span className="text-[12px] lg:text-[13px] text-[#999999] ml-1">({product.reviews})</span></div>
              </div>
            ))}
          </div>

          {/* Row 3 — rectangular products */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-[20px] mb-10 md:mb-12 lg:mb-[64px]">
            {rectangularProducts.map((product, idx) => (
              <div key={idx} className="w-full bg-white rounded-[12px] overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)] group cursor-pointer hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] transition-all duration-300">
                <div className="relative w-full h-[200px] md:h-[220px] lg:h-[280px] overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-[48px] h-[48px] lg:w-[56px] lg:h-[56px] bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.2)]"><IoEyeOutline className="w-[24px] h-[24px] lg:w-[28px] lg:h-[28px] text-[#2B2B2B]" /></div>
                  </div>
                </div>
                <div className="p-4 lg:p-[24px]">
                  <p className="text-[11px] lg:text-[13px] font-light italic text-[#8B7355] tracking-[1.2px] mb-1 lg:mb-2">Shan Loray</p>
                  <h4 className="text-[17px] md:text-[19px] lg:text-[22px] font-medium text-[#2B2B2B] leading-[1.2] mb-1 lg:mb-2">{product.name}</h4>
                  <p className="text-[12px] lg:text-[15px] text-[#999999] mb-2 lg:mb-3">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-[18px] md:text-[20px] lg:text-[22px] font-semibold text-[#1A1A1A]">{product.price}</p>
                    <div className="flex items-center gap-[6px]"><Stars /><span className="text-[12px] lg:text-[13px] text-[#999999] ml-1">({product.reviews})</span></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-[8px] mb-16 lg:mb-[96px]">
            <button className="w-[40px] h-[40px] lg:w-[44px] lg:h-[44px] border border-[#E8E3D9] rounded-[6px] flex items-center justify-center hover:bg-[#F5F1EA] transition-colors"><IoChevronBack className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#666666]" /></button>
            <button className="w-[40px] h-[40px] lg:w-[44px] lg:h-[44px] bg-[#8B7355] text-white text-[14px] lg:text-[15px] font-medium rounded-[6px]">1</button>
            {[2,3,4].map((n) => <button key={n} className="w-[40px] h-[40px] lg:w-[44px] lg:h-[44px] border border-[#E8E3D9] rounded-[6px] text-[14px] lg:text-[15px] font-medium text-[#3D3D3D] hover:border-[#8B7355] hover:text-[#8B7355] transition-colors">{n}</button>)}
            <button className="w-[40px] h-[40px] lg:w-[44px] lg:h-[44px] border border-[#E8E3D9] rounded-[6px] flex items-center justify-center hover:bg-[#F5F1EA] transition-colors"><IoChevronForward className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#666666]" /></button>
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