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
  IoChevronUp,
  IoBagOutline,
  IoLogoInstagram,
  IoLogoFacebook,
  IoLogoPinterest,
  IoLogoYoutube,
} from 'react-icons/io5'

// ─── Shared Data ──────────────────────────────────────────────────────────────
const fragranceCategories = ['All Fragrances', 'Eau de Parfum', 'Eau de Toilette', 'Body Mist', 'Discovery Sets']
const fragranceFamilies   = ['Floral', 'Woody', 'Citrus', 'Oriental', 'Fresh', 'Spicy']
const topNotes            = ['Rose', 'Bergamot', 'Jasmine', 'Sandalwood', 'Vanilla', 'Oud']
const intensityLevels     = ['Light', 'Moderate', 'Strong']
const productSizes        = ['30ml', '50ml', '100ml', 'Travel Size']
const sortOptions         = ['Best Selling', 'Newest', 'Price: Low to High', 'Price: High to Low', 'Most Popular']

// Mobile category cards
const mobileCategoryCards = [
  { name: 'Eau de Parfum',   count: 18, image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=80&h=80&fit=crop' },
  { name: 'Eau de Toilette', count: 14, image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=80&h=80&fit=crop' },
  { name: 'Body Mist',       count: 8,  image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=80&h=80&fit=crop' },
  { name: 'Discovery Sets',  count: 6,  image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=80&h=80&fit=crop' },
]

// Mobile products
const mobileProducts = [
  { name: 'Signature Oud Collection',      description: 'Rare oud & precious florals',      price: '$385', reviews: 412, concentration: 'EDP', image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=400&fit=crop', badge: 'SIGNATURE' },
  { name: 'Rose Noir Eau de Parfum',        description: 'Rose, amber & patchouli',           price: '$245', reviews: 534, concentration: 'EDP', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop' },
  { name: 'Citrus Garden Eau de Toilette',  description: 'Bergamot, neroli & white musk',     price: '$165', reviews: 298, concentration: 'EDT', image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400&h=400&fit=crop' },
  { name: 'Velvet Jasmine',                 description: 'Floral oriental blend',             price: '$195', reviews: 621, concentration: 'EDP', image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=400&h=400&fit=crop' },
  { name: 'Amber Woods',                    description: 'Warm woody & spicy',                price: '$225', reviews: 445, concentration: 'EDP', image: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=400&h=400&fit=crop' },
  { name: 'Prestige Discovery Collection',  description: 'Six iconic fragrances',             price: '$295', reviews: 203, concentration: 'SET', image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=400&h=400&fit=crop', badge: 'LIMITED' },
]

// Desktop data
const featuredProduct = {
  name: 'Signature Oud Collection', description: 'Luxurious blend of rare oud and precious florals',
  price: '$385', reviews: 412, badge: 'SIGNATURE SCENT', concentration: 'EDP',
  image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=560&h=560&fit=crop',
}
const horizontalProducts = [
  { name: 'Rose Noir Eau de Parfum',       description: 'Deep rose with hints of amber and patchouli', price: '$245', reviews: 534, concentration: 'EDP', notes: 'Rose, Amber, Patchouli',        sizes: ['30ml','50ml','100ml'], image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=460&h=280&fit=crop' },
  { name: 'Citrus Garden Eau de Toilette', description: 'Fresh bergamot, neroli, and white musk',       price: '$165', reviews: 298, concentration: 'EDT', notes: 'Bergamot, Neroli, White Musk', sizes: ['30ml','50ml','100ml'], image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=460&h=280&fit=crop' },
]
const squareProducts = [
  { name: 'Velvet Jasmine', family: 'Floral Oriental', price: '$195', reviews: 621, concentration: 'EDP', image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=300&h=300&fit=crop' },
  { name: 'Amber Woods',    family: 'Woody Spicy',     price: '$225', reviews: 445, concentration: 'EDP', image: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=300&h=300&fit=crop' },
  { name: 'White Lotus',    family: 'Fresh Floral',    price: '$185', reviews: 789, concentration: 'EDT', image: 'https://images.unsplash.com/photo-1587556930796-7a8ab4e96a17?w=300&h=300&fit=crop' },
]
const rectangularProducts = [
  { name: 'Prestige Discovery Collection', description: 'Experience our six most iconic fragrances in luxurious travel sizes', price: '$295', reviews: 203, badge: 'LIMITED EDITION', image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=470&h=400&fit=crop' },
  { name: 'Dual Essence Set',              description: 'Day and night fragrances paired perfectly — fresh citrus & warm amber', price: '$385', reviews: 167, image: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=470&h=400&fit=crop' },
]

// ─── Filter Data (fragrance-filter-popup) ────────────────────────────────────
const filterFragranceTypes  = ['Eau de Parfum', 'Eau de Toilette', 'Body Mist', 'Discovery Sets']
const filterFamilies        = ['Floral', 'Oriental', 'Woody', 'Fresh', 'Citrus', 'Spicy', 'Aquatic', 'Fruity']
const filterTopNotes        = ['Rose', 'Bergamot', 'Jasmine', 'Lemon', 'Lavender']
const filterMiddleNotes     = ['Sandalwood', 'Cedar', 'Vanilla', 'Patchouli']
const filterBaseNotes       = ['Musk', 'Amber', 'Oakmoss', 'Tonka Bean']
const filterOccasions       = ['Day Wear', 'Evening', 'Special Occasions']
const filterIntensityLevels = ['Light', 'Moderate', 'Strong', 'Very Strong', 'Long-Lasting']
const filterBrands          = ['Shan Loray', 'Maison Lavande', 'Noir Essence', 'Velvet & Oud']
const filterRatings         = [{ stars: 5, count: 234 }, { stars: 4, count: 456 }, { stars: 3, count: 189 }]


// ─── Mobile ───────────────────────────────────────────────────────────────────
function FragranceMobile() {
  const [activeSort, setActiveSort]           = useState('Best Selling')
  const [showSortSheet, setShowSortSheet]     = useState(false)
  const [showFilterSheet, setShowFilterSheet] = useState(false)
  const [selectedTypes, setSelectedTypes]       = useState(['Eau de Parfum'])
  const [selectedFamilies, setSelectedFamilies] = useState(['Floral', 'Oriental'])
  const [selectedTopNotes, setSelectedTopNotes]       = useState(['Rose'])
  const [selectedMiddleNotes, setSelectedMiddleNotes] = useState([])
  const [selectedBaseNotes, setSelectedBaseNotes]     = useState([])
  const [selectedOccasion, setSelectedOccasion]   = useState('Evening')
  const [intensityLevel, setIntensityLevel]       = useState(2) // index 0-4
  const [selectedBrands, setSelectedBrands]       = useState(['Shan Loray'])
  const [selectedRating, setSelectedRating]       = useState(4)
  const [expandedNotes, setExpandedNotes]         = useState({ top: true, middle: false, base: false })
  const [priceLabel]                              = useState('$50 - $150')

  // Active filter tags for the chips row
  const activeTagList = [...selectedTypes, ...selectedFamilies, priceLabel].slice(0, 6)
  const activeFilters = activeTagList.length

  const toggle = (arr, setArr, val) => setArr(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val])

  const clearAll = () => {
    setSelectedTypes([])
    setSelectedFamilies([])
    setSelectedTopNotes([])
    setSelectedMiddleNotes([])
    setSelectedBaseNotes([])
    setSelectedOccasion(null)
    setSelectedBrands([])
    setSelectedRating(null)
  }

  return (
    <div className="w-full min-h-screen bg-white font-['Cormorant_Garamond']">

      {/* ── Hero Banner ── */}
      <div className="relative min-h-[260px] bg-[#F5F0EB] overflow-hidden flex items-center">
        <div className="absolute right-0 top-0 bottom-0 w-[50%]">
          <img src="https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=400&h=400&fit=crop" alt="Fragrance" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#F5F0EB] via-[#F5F0EB]/20 to-transparent" />
        </div>
        <div className="relative z-10 px-5 py-10 w-[62%]">
          <p className="text-[10px] font-light italic text-[#8B7355] tracking-[2px] mb-3">SIGNATURE FRAGRANCES</p>
          <h1 className="text-[34px] font-bold text-[#1A1A1A] leading-[1.05] mb-3">Scent Stories</h1>
          <p className="text-[13px] font-normal text-[#666666] mb-4">Crafted with rare botanicals</p>
          <div className="w-[48px] h-[2px] bg-[#C9A870]" />
        </div>
      </div>

      {/* ── Category Cards ── */}
      <div className="bg-white px-4 py-5 overflow-x-auto border-b border-[#E8E3D9]" style={{ scrollbarWidth: 'none' }}>
        <div className="flex gap-3 w-max">
          {mobileCategoryCards.map((cat) => (
            <div key={cat.name} className="w-[130px] bg-white border border-[#E8E3D9] rounded-[12px] p-4 flex flex-col items-center gap-2 cursor-pointer hover:border-[#C9A870] transition-colors">
              <div className="w-[60px] h-[60px] rounded-full overflow-hidden bg-[#F9F6F2]">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
              </div>
              <span className="text-[12px] font-medium text-[#1A1A1A] text-center leading-tight">{cat.name}</span>
              <span className="text-[11px] font-light text-[#999999]">{cat.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Toolbar ── */}
      <div className="bg-white px-5 pt-4 pb-3">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[13px] font-normal text-[#666666]">Showing 36 products</span>
          <button onClick={() => setShowFilterSheet(true)} className="relative flex items-center gap-2 h-9 px-4 border border-[#E8E3D9] rounded-full text-[13px] font-medium text-[#2B2B2B]">
            <IoFunnelOutline className="w-3.5 h-3.5 text-[#8B7355]" />
            Filters
            {activeFilters > 0 && (
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-[#8B7355] rounded-full flex items-center justify-center">
                <span className="text-[10px] font-medium text-white">{activeFilters}</span>
              </div>
            )}
          </button>
        </div>
        <button onClick={() => setShowSortSheet(true)} className="w-full h-12 px-4 bg-white border border-[#E8E3D9] rounded-[8px] flex items-center justify-between mb-2">
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
                {product.badge && (
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-[#C9A870] text-white text-[9px] font-medium rounded-full">{product.badge}</div>
                )}
                <div className="absolute top-2 right-2 px-2 py-0.5 bg-[#F5F1EA] text-[#8B7355] text-[9px] font-medium rounded-full">{product.concentration}</div>
                <button className="absolute bottom-2 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <IoHeartOutline className="w-3.5 h-3.5 text-[#2B2B2B]" />
                </button>
              </div>
              <div className="p-3">
                <p className="text-[11px] font-light italic text-[#8B7355] mb-1">Shan Loray</p>
                <h4 className="text-[13px] font-semibold text-[#1A1A1A] leading-tight mb-1 line-clamp-2">{product.name}</h4>
                <p className="text-[11px] font-normal text-[#999999] mb-2">{product.description}</p>
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[15px] font-semibold text-[#1A1A1A]">{product.price}</span>
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => <IoStarSharp key={i} className="w-[10px] h-[10px] text-[#C9A870]" />)}
                  </div>
                </div>
                <p className="text-[10px] text-[#999999] mb-3">({product.reviews})</p>
                <button className="w-full h-9 bg-[#8B7355] text-white text-[12px] font-medium rounded-[6px]">Add to Bag</button>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full h-12 mt-5 border border-[#C9A870] text-[#8B7355] text-[14px] font-medium rounded-[8px]">Load More</button>
      </div>

      {/* ── Newsletter ── */}
      <div className="bg-[#F5F0EB] px-5 py-10 text-center">
        <h3 className="text-[22px] font-semibold text-[#1A1A1A] mb-2">Discover Your Signature Scent</h3>
        <p className="text-[13px] font-normal text-[#666666] mb-5">Get personalized fragrance recommendations</p>
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
            <div className="space-y-2">{['Skincare','Makeup','Fragrance','Tools','Gift Sets'].map((l) => <p key={l} className="text-[12px] text-[#C4B5A0]">{l}</p>)}</div>
          </div>
          <div>
            <h4 className="text-[13px] font-medium text-white mb-3">Help</h4>
            <div className="space-y-2">{['Contact','Shipping','Returns','FAQ'].map((l) => <p key={l} className="text-[12px] text-[#C4B5A0]">{l}</p>)}</div>
          </div>
          <div>
            <h4 className="text-[13px] font-medium text-white mb-3">About</h4>
            <div className="space-y-2">{['Our Story','Ingredients','Sustainability','Press'].map((l) => <p key={l} className="text-[12px] text-[#C4B5A0]">{l}</p>)}</div>
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

      {/* ── Filter Sheet (fragrance-filter-popup) ── */}
      {showFilterSheet && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowFilterSheet(false)} />
          <div className="relative bg-white rounded-t-[20px] flex flex-col" style={{ maxHeight: '95vh' }}>

            {/* Header */}
            <div className="min-h-[76px] px-5 py-5 flex items-center justify-between border-b border-[#E8E3D9] flex-shrink-0">
              <h2 className="text-[22px] font-semibold text-[#1A1A1A]">Filters</h2>
              <button onClick={() => setShowFilterSheet(false)} className="w-11 h-11 flex items-center justify-center">
                <IoClose className="w-6 h-6 text-[#8B7355]" />
              </button>
            </div>

            {/* Active Filter Tags */}
            {activeTagList.length > 0 && (
              <div className="px-5 py-3 bg-[#FDFBF7] border-b border-[#E8E3D9] flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-2 flex-wrap flex-1">
                  {activeTagList.map((tag, i) => (
                    <div key={i} className="px-3 py-1.5 bg-[#8B7355] rounded-full flex items-center gap-1.5">
                      <span className="text-[12px] font-medium text-white">{tag}</span>
                      <IoClose className="w-3 h-3 text-white" />
                    </div>
                  ))}
                </div>
                <button onClick={clearAll} className="text-[13px] font-medium text-[#C9A870] whitespace-nowrap ml-3">Clear All</button>
              </div>
            )}

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-5 py-5">

              {/* Fragrance Type — category cards with circular images */}
              <div className="mb-6">
                <h3 className="text-[16px] font-semibold text-[#2B2B2B] mb-4">Fragrance Type</h3>
                <div className="grid grid-cols-2 gap-3">
                  {mobileCategoryCards.map((cat) => {
                    const isSel = selectedTypes.includes(cat.name)
                    return (
                      <button
                        key={cat.name}
                        onClick={() => toggle(selectedTypes, setSelectedTypes, cat.name)}
                        className={`rounded-[8px] p-3 flex flex-col items-center gap-2 border-2 transition-colors ${isSel ? 'border-[#8B7355] bg-[#FDFBF7]' : 'border-[#E8E3D9] bg-white'}`}
                      >
                        <img src={cat.image} alt={cat.name} className="w-[40px] h-[40px] rounded-full object-cover" />
                        <span className="text-[12px] font-medium text-[#2B2B2B] text-center leading-tight">{cat.name}</span>
                        <span className="text-[11px] text-[#999999]">{cat.count}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="w-full h-px bg-[#E8E3D9] mb-6" />

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="text-[16px] font-semibold text-[#2B2B2B] mb-4">Price Range</h3>
                <div className="text-[15px] font-medium text-[#1A1A1A] text-center mb-4">{priceLabel}</div>
                <div className="relative h-1.5 bg-[#E8E3D9] rounded-full mb-3">
                  <div className="absolute left-[25%] right-[25%] h-full bg-[#C9A870] rounded-full" />
                  <div className="absolute left-[25%] top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 bg-[#8B7355] rounded-full border-2 border-white shadow-[0_2px_8px_rgba(0,0,0,0.15)]" />
                  <div className="absolute left-[75%] top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 bg-[#8B7355] rounded-full border-2 border-white shadow-[0_2px_8px_rgba(0,0,0,0.15)]" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-[#666666]">$0</span>
                  <span className="text-[13px] text-[#666666]">$200+</span>
                </div>
              </div>

              <div className="w-full h-px bg-[#E8E3D9] mb-6" />

              {/* Fragrance Family */}
              <div className="mb-6">
                <h3 className="text-[16px] font-semibold text-[#2B2B2B] mb-4">Fragrance Family</h3>
                <div className="flex flex-wrap gap-2">
                  {filterFamilies.map((f) => {
                    const isSel = selectedFamilies.includes(f)
                    return (
                      <button key={f} onClick={() => toggle(selectedFamilies, setSelectedFamilies, f)}
                        className={`px-4 py-2.5 rounded-full border text-[13px] transition-colors ${isSel ? 'bg-[#8B7355] border-[#8B7355] text-white font-medium' : 'bg-white border-[#E8E3D9] text-[#2B2B2B]'}`}>
                        {f}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="w-full h-px bg-[#E8E3D9] mb-6" />

              {/* Scent Notes — accordion */}
              <div className="mb-6">
                <h3 className="text-[16px] font-semibold text-[#2B2B2B] mb-4">Scent Notes</h3>

                {/* Top Notes */}
                <div className="mb-2">
                  <button onClick={() => setExpandedNotes(p => ({ ...p, top: !p.top }))}
                    className="flex items-center justify-between w-full py-3 border-b border-[#E8E3D9]">
                    <span className="text-[14px] font-medium text-[#2B2B2B]">Top Notes</span>
                    {expandedNotes.top ? <IoChevronUp className="w-5 h-5 text-[#8B7355]" /> : <IoChevronDown className="w-5 h-5 text-[#8B7355]" />}
                  </button>
                  {expandedNotes.top && (
                    <div className="pt-3 space-y-3 pb-1">
                      {filterTopNotes.map((note) => {
                        const isChecked = selectedTopNotes.includes(note)
                        return (
                          <button key={note} onClick={() => toggle(selectedTopNotes, setSelectedTopNotes, note)} className="flex items-center gap-2.5 w-full">
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${isChecked ? 'bg-[#C9A870] border-[#C9A870]' : 'border-[#E8E3D9]'}`}>
                              {isChecked && <div className="w-2.5 h-2.5 bg-white rounded-sm" />}
                            </div>
                            <span className="text-[13px] text-[#2B2B2B]">{note}</span>
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>

                {/* Middle Notes */}
                <div className="mb-2">
                  <button onClick={() => setExpandedNotes(p => ({ ...p, middle: !p.middle }))}
                    className="flex items-center justify-between w-full py-3 border-b border-[#E8E3D9]">
                    <span className="text-[14px] font-medium text-[#2B2B2B]">Middle Notes</span>
                    {expandedNotes.middle ? <IoChevronUp className="w-5 h-5 text-[#8B7355]" /> : <IoChevronDown className="w-5 h-5 text-[#8B7355]" />}
                  </button>
                  {expandedNotes.middle && (
                    <div className="pt-3 space-y-3 pb-1">
                      {filterMiddleNotes.map((note) => {
                        const isChecked = selectedMiddleNotes.includes(note)
                        return (
                          <button key={note} onClick={() => toggle(selectedMiddleNotes, setSelectedMiddleNotes, note)} className="flex items-center gap-2.5 w-full">
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${isChecked ? 'bg-[#C9A870] border-[#C9A870]' : 'border-[#E8E3D9]'}`}>
                              {isChecked && <div className="w-2.5 h-2.5 bg-white rounded-sm" />}
                            </div>
                            <span className="text-[13px] text-[#2B2B2B]">{note}</span>
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>

                {/* Base Notes */}
                <div>
                  <button onClick={() => setExpandedNotes(p => ({ ...p, base: !p.base }))}
                    className="flex items-center justify-between w-full py-3 border-b border-[#E8E3D9]">
                    <span className="text-[14px] font-medium text-[#2B2B2B]">Base Notes</span>
                    {expandedNotes.base ? <IoChevronUp className="w-5 h-5 text-[#8B7355]" /> : <IoChevronDown className="w-5 h-5 text-[#8B7355]" />}
                  </button>
                  {expandedNotes.base && (
                    <div className="pt-3 space-y-3 pb-1">
                      {filterBaseNotes.map((note) => {
                        const isChecked = selectedBaseNotes.includes(note)
                        return (
                          <button key={note} onClick={() => toggle(selectedBaseNotes, setSelectedBaseNotes, note)} className="flex items-center gap-2.5 w-full">
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${isChecked ? 'bg-[#C9A870] border-[#C9A870]' : 'border-[#E8E3D9]'}`}>
                              {isChecked && <div className="w-2.5 h-2.5 bg-white rounded-sm" />}
                            </div>
                            <span className="text-[13px] text-[#2B2B2B]">{note}</span>
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>

              <div className="w-full h-px bg-[#E8E3D9] mb-6" />

              {/* Occasion */}
              <div className="mb-6">
                <h3 className="text-[16px] font-semibold text-[#2B2B2B] mb-4">Occasion</h3>
                <div className="space-y-3">
                  {filterOccasions.map((occ) => (
                    <button key={occ} onClick={() => setSelectedOccasion(prev => prev === occ ? null : occ)} className="flex items-center gap-2.5 w-full">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${selectedOccasion === occ ? 'border-[#C9A870]' : 'border-[#E8E3D9]'}`}>
                        {selectedOccasion === occ && <div className="w-2.5 h-2.5 bg-[#C9A870] rounded-full" />}
                      </div>
                      <span className="text-[14px] text-[#2B2B2B]">{occ}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="w-full h-px bg-[#E8E3D9] mb-6" />

              {/* Intensity & Longevity — visual bar */}
              <div className="mb-6">
                <h3 className="text-[16px] font-semibold text-[#2B2B2B] mb-4">Intensity & Longevity</h3>
                <div className="flex gap-1 mb-2">
                  {filterIntensityLevels.map((level, idx) => (
                    <button key={level} onClick={() => setIntensityLevel(idx)}
                      className={`flex-1 h-2 rounded-sm transition-colors ${idx <= intensityLevel ? 'bg-[#C9A870]' : 'bg-[#F5F1EA]'}`} />
                  ))}
                </div>
                <div className="flex justify-between">
                  {filterIntensityLevels.map((level) => (
                    <span key={level} className="text-[11px] text-[#666666] text-center flex-1 leading-tight">{level}</span>
                  ))}
                </div>
              </div>

              <div className="w-full h-px bg-[#E8E3D9] mb-6" />

              {/* Brand */}
              <div className="mb-6">
                <h3 className="text-[16px] font-semibold text-[#2B2B2B] mb-4">Brand</h3>
                <div className="space-y-3 mb-3">
                  {filterBrands.map((brand) => {
                    const isChecked = selectedBrands.includes(brand)
                    return (
                      <button key={brand} onClick={() => toggle(selectedBrands, setSelectedBrands, brand)} className="flex items-center gap-2.5 w-full">
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${isChecked ? 'bg-[#C9A870] border-[#C9A870]' : 'border-[#E8E3D9]'}`}>
                          {isChecked && <div className="w-2.5 h-2.5 bg-white rounded-sm" />}
                        </div>
                        <span className="text-[14px] text-[#2B2B2B]">{brand}</span>
                      </button>
                    )
                  })}
                </div>
                <button className="text-[13px] font-medium text-[#C9A870]">Show More Brands</button>
              </div>

              <div className="w-full h-px bg-[#E8E3D9] mb-6" />

              {/* Customer Rating */}
              <div className="mb-4">
                <h3 className="text-[16px] font-semibold text-[#2B2B2B] mb-4">Customer Rating</h3>
                <div className="space-y-3">
                  {filterRatings.map((r) => (
                    <button key={r.stars} onClick={() => setSelectedRating(prev => prev === r.stars ? null : r.stars)} className="flex items-center gap-2.5 w-full">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${selectedRating === r.stars ? 'border-[#C9A870]' : 'border-[#E8E3D9]'}`}>
                        {selectedRating === r.stars && <div className="w-2.5 h-2.5 bg-[#C9A870] rounded-full" />}
                      </div>
                      <div className="flex items-center gap-1.5">
                        {[...Array(5)].map((_, i) => (
                          <IoStarSharp key={i} className={`w-4 h-4 ${i < r.stars ? 'text-[#C9A870]' : 'text-[#E8E3D9]'}`} />
                        ))}
                        <span className="text-[13px] text-[#2B2B2B] ml-1">& up</span>
                        <span className="text-[13px] text-[#999999]">({r.count})</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 py-5 bg-white border-t border-[#E8E3D9] shadow-[0_-2px_12px_rgba(0,0,0,0.08)] flex-shrink-0">
              <div className="flex items-center gap-3">
                <button onClick={clearAll} className="flex-1 min-h-[52px] bg-white border-2 border-[#E8E3D9] rounded-[10px] flex items-center justify-center">
                  <span className="text-[14px] font-medium text-[#8B7355]">Clear Filters</span>
                </button>
                <button onClick={() => setShowFilterSheet(false)} className="flex-1 min-h-[52px] bg-[#8B7355] rounded-[10px] flex items-center justify-center">
                  <span className="text-[14px] font-medium text-white">Apply Filters (36)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

// ─── Desktop ──────────────────────────────────────────────────────────────────
function FragranceDesktop() {
  const Stars = () => [...Array(5)].map((_, i) => <IoStarSharp key={i} className="w-[15px] h-[15px] text-[#C9A870]" />)

  return (
    <div className="bg-white font-['Cormorant_Garamond']">

      {/* Hero */}
      <div className="min-h-[480px] bg-gradient-to-b from-[#FDFBF7] to-[#F5F1EA] relative overflow-hidden flex items-center px-[120px]">
        <img src="https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=800&h=800&fit=crop" alt="" className="absolute top-0 right-0 w-[500px] h-[480px] object-cover opacity-15" />
        <div className="w-[650px] relative z-10">
          <p className="text-[14px] font-light italic text-[#8B7355] tracking-[2px] mb-3">SIGNATURE FRAGRANCES</p>
          <h1 className="text-[80px] font-bold text-[#1A1A1A] leading-[1] mb-6">Scent Stories</h1>
          <p className="text-[20px] font-normal text-[#666666] mb-8">Discover captivating fragrances crafted with rare botanicals</p>
          <div className="w-[140px] h-[4px] bg-[#C9A870]" />
        </div>
        <div className="absolute right-[180px] top-1/2 -translate-y-1/2">
          <img src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=400&fit=crop" alt="" className="w-[400px] h-[400px] object-cover rounded-[8px] shadow-[0_12px_48px_rgba(0,0,0,0.12)]" />
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="min-h-[48px] bg-[#FDFBF7] px-[120px] flex items-center">
        <span className="text-[15px] text-[#8B7355] cursor-pointer">Home</span><span className="text-[15px] text-[#666666] mx-2">/</span>
        <span className="text-[15px] text-[#8B7355] cursor-pointer">Shop</span><span className="text-[15px] text-[#666666] mx-2">/</span>
        <span className="text-[15px] text-[#666666]">Fragrance</span>
      </div>

      {/* Main Content */}
      <div className="px-[120px] py-[64px] flex gap-[48px]">

        {/* Sidebar */}
        <div className="w-[280px] flex-shrink-0">
          <div className="bg-white rounded-[16px] border border-[#E8E3D9] shadow-[0_8px_32px_rgba(0,0,0,0.08)] p-[28px]">
            <h3 className="text-[18px] font-medium text-[#1A1A1A] mb-[24px]">REFINE SELECTION</h3>
            <div className="space-y-[12px] mb-[32px]">
              {fragranceCategories.map((cat, idx) => (
                <div key={cat}>
                  <div className={`inline-flex items-center px-[20px] py-[10px] ${idx === 0 ? 'bg-[#8B7355] text-white' : 'bg-[#F5F1EA] text-[#3D3D3D]'} text-[14px] font-medium rounded-full cursor-pointer gap-2 w-full justify-between`}>
                    <span>{cat}</span>
                    {idx !== 0 && <IoChevronDown className="w-[14px] h-[14px]" />}
                  </div>
                  {idx === 1 && (
                    <div className="ml-[24px] mt-[8px]">
                      {["Women's EDP","Men's EDP",'Unisex EDP'].map((s) => <div key={s} className="inline-block px-[16px] py-[6px] bg-white border border-[#E8E3D9] text-[#666666] text-[13px] rounded-full cursor-pointer mr-2 mb-2">{s}</div>)}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="border-t border-[#E8E3D9] pt-[24px] space-y-[20px]">
              {[{title:'Fragrance Family',items:fragranceFamilies},{title:'Top Notes',items:topNotes}].map(({title,items}) => (
                <div key={title}>
                  <h4 className="text-[15px] font-medium text-[#1A1A1A] mb-[12px]">{title}</h4>
                  <div className="space-y-[8px]">
                    {items.map((item) => (
                      <label key={item} className="flex items-center gap-[10px] cursor-pointer">
                        <div className="w-[16px] h-[16px] border-[2px] border-[#C9A870] rounded-[2px]" />
                        <span className="text-[14px] text-[#3D3D3D]">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
              <div>
                <h4 className="text-[15px] font-medium text-[#1A1A1A] mb-[12px]">Intensity</h4>
                <div className="space-y-[8px]">
                  {intensityLevels.map((level) => (
                    <label key={level} className="flex items-center gap-[10px] cursor-pointer">
                      <div className="w-[16px] h-[16px] border-[2px] border-[#C9A870] rounded-full" />
                      <span className="text-[14px] text-[#3D3D3D]">{level}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-[15px] font-medium text-[#1A1A1A] mb-[12px]">Size</h4>
                <div className="space-y-[8px]">
                  {productSizes.map((size) => (
                    <label key={size} className="flex items-center gap-[10px] cursor-pointer">
                      <div className="w-[16px] h-[16px] border-[2px] border-[#C9A870] rounded-[2px]" />
                      <span className="text-[14px] text-[#3D3D3D]">{size}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-[15px] font-medium text-[#1A1A1A] mb-[12px]">Price Range</h4>
                <div className="flex items-center gap-[8px]">
                  <input type="text" placeholder="$0"   className="w-[100px] h-[36px] px-3 border border-[#E8E3D9] rounded-[6px] text-[14px] outline-none" />
                  <span className="text-[14px] text-[#666666]">—</span>
                  <input type="text" placeholder="$500" className="w-[100px] h-[36px] px-3 border border-[#E8E3D9] rounded-[6px] text-[14px] outline-none" />
                </div>
              </div>
              <button className="w-full h-[48px] bg-[#8B7355] text-white text-[15px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">Apply</button>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="min-h-[64px] flex items-center justify-between mb-[48px]">
            <span className="text-[15px] text-[#666666]">Showing 36 of 84 fragrance products</span>
            <div className="flex items-center gap-[16px]">
              <span className="text-[15px] text-[#666666]">Sort by:</span>
              <button className="w-[240px] min-h-[48px] px-4 bg-white border border-[#E8E3D9] rounded-[8px] flex items-center justify-between cursor-pointer hover:border-[#C9A870] transition-all">
                <span className="text-[15px] font-medium text-[#2B2B2B]">Best Selling</span>
                <IoChevronDown className="w-[18px] h-[18px] text-[#8B7355]" />
              </button>
            </div>
          </div>

          {/* Row 1 */}
          <div className="flex gap-[20px] mb-[48px]">
            <div className="w-[460px] h-[560px] bg-white rounded-[12px] overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)] group cursor-pointer hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] transition-all duration-300">
              <div className="relative w-full h-[380px]">
                <img src={featuredProduct.image} alt={featuredProduct.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-[20px] right-[20px] px-[16px] py-[8px] bg-[#C9A870] text-white text-[12px] font-medium rounded-full">{featuredProduct.badge}</div>
                <div className="absolute bottom-0 left-0 right-0 h-[180px] bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-[24px] text-white">
                  <p className="text-[17px] mb-2">{featuredProduct.description}</p>
                  <h3 className="text-[28px] font-medium mb-3">{featuredProduct.name}</h3>
                  <p className="text-[24px] font-semibold">{featuredProduct.price}</p>
                </div>
              </div>
              <div className="p-[24px]">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[13px] font-light italic text-[#8B7355] tracking-[1.2px]">Shan Loray</p>
                  <span className="px-[12px] py-[4px] bg-[#F5F1EA] text-[#8B7355] text-[11px] font-medium rounded-full">{featuredProduct.concentration}</span>
                </div>
                <div className="flex items-center gap-[6px]"><Stars /><span className="text-[13px] text-[#999999] ml-1">({featuredProduct.reviews})</span></div>
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-[20px]">
              {horizontalProducts.map((product, idx) => (
                <div key={idx} className="w-full h-[270px] bg-white rounded-[12px] overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)] group cursor-pointer hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] transition-all duration-300 flex">
                  <div className="w-[280px] h-full relative overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-[16px] left-[16px] flex gap-[8px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.15)]"><IoHeartOutline className="w-[20px] h-[20px] text-[#2B2B2B]" /></div>
                      <div className="w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.15)]"><IoEyeOutline className="w-[20px] h-[20px] text-[#2B2B2B]" /></div>
                    </div>
                  </div>
                  <div className="flex-1 p-[24px] flex flex-col justify-center">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[13px] font-light italic text-[#8B7355] tracking-[1.2px]">Shan Loray</p>
                      <span className="px-[12px] py-[4px] bg-[#F5F1EA] text-[#8B7355] text-[11px] font-medium rounded-full">{product.concentration}</span>
                    </div>
                    <h4 className="text-[20px] font-medium text-[#2B2B2B] leading-[1.2] mb-2">{product.name}</h4>
                    <p className="text-[15px] text-[#999999] mb-2">{product.description}</p>
                    <p className="text-[13px] font-light italic text-[#8B7355] mb-3">{product.notes}</p>
                    <div className="flex items-center gap-[8px] mb-3">
                      {product.sizes.map((s) => <span key={s} className="px-[12px] py-[4px] border border-[#E8E3D9] text-[#666666] text-[12px] rounded-full">{s}</span>)}
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-[19px] font-semibold text-[#1A1A1A]">{product.price}</p>
                      <div className="flex items-center gap-[6px]"><Stars /><span className="text-[13px] text-[#999999] ml-1">({product.reviews})</span></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-3 gap-[20px] mb-[48px]">
            {squareProducts.map((product, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="relative w-full aspect-square rounded-[12px] overflow-hidden mb-[16px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] transition-all duration-300">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-[16px] right-[16px] flex flex-col gap-[8px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.15)]"><IoHeartOutline className="w-[20px] h-[20px] text-[#2B2B2B]" /></div>
                    <div className="w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.15)]"><IoEyeOutline className="w-[20px] h-[20px] text-[#2B2B2B]" /></div>
                  </div>
                  <div className="absolute top-[16px] left-[16px] px-[12px] py-[4px] bg-[#F5F1EA] text-[#8B7355] text-[11px] font-medium rounded-full">{product.concentration}</div>
                </div>
                <p className="text-[13px] font-light italic text-[#8B7355] tracking-[1.2px] mb-2">Shan Loray</p>
                <h4 className="text-[20px] font-medium text-[#2B2B2B] leading-[1.2] mb-2">{product.name}</h4>
                <p className="text-[15px] text-[#999999] mb-2">{product.family}</p>
                <p className="text-[19px] font-semibold text-[#1A1A1A] mb-2">{product.price}</p>
                <div className="flex items-center gap-[6px]"><Stars /><span className="text-[13px] text-[#999999] ml-1">({product.reviews})</span></div>
              </div>
            ))}
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-2 gap-[20px] mb-[96px]">
            {rectangularProducts.map((product, idx) => (
              <div key={idx} className="w-full h-[400px] bg-white rounded-[12px] overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)] group cursor-pointer hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] transition-all duration-300">
                <div className="relative w-full h-[280px] overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {product.badge && <div className="absolute top-[20px] right-[20px] px-[16px] py-[8px] bg-[#C9A870] text-white text-[12px] font-medium rounded-full">{product.badge}</div>}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-[56px] h-[56px] bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.2)]"><IoEyeOutline className="w-[28px] h-[28px] text-[#2B2B2B]" /></div>
                  </div>
                </div>
                <div className="p-[24px]">
                  <p className="text-[13px] font-light italic text-[#8B7355] tracking-[1.2px] mb-2">Shan Loray</p>
                  <h4 className="text-[22px] font-medium text-[#2B2B2B] leading-[1.2] mb-2">{product.name}</h4>
                  <p className="text-[15px] text-[#999999] mb-3">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-[22px] font-semibold text-[#1A1A1A]">{product.price}</p>
                    <div className="flex items-center gap-[6px]"><Stars /><span className="text-[13px] text-[#999999] ml-1">({product.reviews})</span></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div className="min-h-[140px] bg-[#F5F1EA] rounded-[16px] flex flex-col items-center justify-center px-[64px] mb-[96px]">
            <h3 className="text-[32px] font-medium text-[#1A1A1A] mb-2">Discover Your Signature Scent</h3>
            <p className="text-[16px] text-[#666666] mb-6">Get personalized fragrance recommendations</p>
            <div className="flex items-center gap-[12px]">
              <input type="email" placeholder="Enter your email" className="w-[360px] h-[56px] px-5 bg-white text-[15px] text-[#2B2B2B] rounded-[8px] border border-[#E8E3D9] outline-none" />
              <button className="h-[56px] px-[32px] bg-[#8B7355] text-white text-[15px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">Subscribe</button>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-[8px] mb-[96px]">
            <button className="w-[44px] h-[44px] border border-[#E8E3D9] rounded-[6px] flex items-center justify-center hover:bg-[#F5F1EA] transition-colors"><IoChevronBack className="w-[20px] h-[20px] text-[#666666]" /></button>
            <button className="w-[44px] h-[44px] bg-[#8B7355] text-white text-[15px] font-medium rounded-[6px]">1</button>
            {[2,3].map((n) => <button key={n} className="w-[44px] h-[44px] border border-[#E8E3D9] rounded-[6px] text-[15px] font-medium text-[#3D3D3D] hover:border-[#8B7355] hover:text-[#8B7355] transition-colors">{n}</button>)}
            <button className="w-[44px] h-[44px] border border-[#E8E3D9] rounded-[6px] flex items-center justify-center hover:bg-[#F5F1EA] transition-colors"><IoChevronForward className="w-[20px] h-[20px] text-[#666666]" /></button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Main Export (Switcher) ───────────────────────────────────────────────────
export default function Fragrance() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return isMobile ? <FragranceMobile /> : <FragranceDesktop />
}