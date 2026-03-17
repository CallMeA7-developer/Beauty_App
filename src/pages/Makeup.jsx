import { useState, useEffect } from 'react'
import {
  IoStarSharp,
  IoChevronBack,
  IoChevronForward,
  IoHeartOutline,
  IoEyeOutline,
  IoChevronDown,
  IoCloseOutline,
  IoOptionsOutline,
  IoFilterOutline,
  IoBagOutline,
} from 'react-icons/io5'

// ─── Shared Data ──────────────────────────────────────────────────────────────
const faceCategories  = ['Foundation', 'Concealer', 'Powder', 'Blush', 'Highlighter']
const eyesCategories  = ['Eyeshadow', 'Eyeliner', 'Mascara', 'Eyebrow']
const lipsCategories  = ['Lipstick', 'Lip Gloss', 'Lip Liner', 'Lip Care']
const finishTypes     = ['Matte', 'Satin', 'Shimmer', 'Glitter']
const coverageTypes   = ['Sheer', 'Medium', 'Full']
const skinTones       = ['Fair', 'Light', 'Medium', 'Tan', 'Deep', 'All Tones']

const sortOptions = ['Best Selling', 'Newest', 'Price: Low to High', 'Price: High to Low', 'Most Popular', 'Shade Range']

const mobileCategories = ['All Makeup', 'Face', 'Eyes', 'Lips', 'Sets & Palettes']

const featuredProduct = {
  name: 'Luxe Velvet Lipstick Collection',
  description: 'Twelve signature shades in rich, long-lasting formula',
  price: '$245', reviews: 412,
  image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=560&h=560&fit=crop',
  badge: 'BESTSELLER',
}

const horizontalProducts = [
  { name: 'Luminous Foundation',   description: 'Buildable coverage with 24-hour wear',   price: '$78',  reviews: 534, image: 'https://images.unsplash.com/photo-1625025403725-fb026f06ab3c?w=460&h=280&fit=crop', shades: ['#F5D4C4','#E8C4B4','#D4A894','#C08874','#A86854','#8E5844'] },
  { name: 'Nude Eyeshadow Palette', description: 'Ten versatile shades for every look',   price: '$145', reviews: 298, image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=460&h=280&fit=crop', badge: 'NEW' },
]

const squareProducts = [
  { name: 'Silk Touch Concealer', description: 'Full coverage brightening formula',    price: '$52', reviews: 621, image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop', shades: ['#FADCC4','#E8C8B0','#D4A890','#B88868','#9C6848','#7E5438'] },
  { name: 'Radiant Blush Duo',    description: 'Buildable color with luminous finish',  price: '$68', reviews: 445, image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=300&h=300&fit=crop' },
  { name: 'Glow Highlighter',     description: 'Multi-dimensional shimmer',             price: '$58', reviews: 789, image: 'https://images.unsplash.com/photo-1515688594390-b649af70d282?w=300&h=300&fit=crop' },
]

const rectangularProducts = [
  { name: 'Complete Makeup Artist Set', description: 'Professional collection with face, eyes, and lips essentials',    price: '$395', reviews: 203, image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=470&h=400&fit=crop', badge: 'LIMITED EDITION' },
  { name: 'Travel Glam Collection',     description: 'Your complete makeup routine in luxurious travel-friendly sizes', price: '$185', reviews: 167, image: 'https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=470&h=400&fit=crop' },
]

// All products for mobile grid
const allMobileProducts = [
  { name: 'Luxe Velvet Lipstick',   price: '$245', reviews: 412, badge: 'BESTSELLER',     image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop' },
  { name: 'Luminous Foundation',    price: '$78',  reviews: 534, shades: ['#F5D4C4','#E8C4B4','#D4A894','#C08874'], image: 'https://images.unsplash.com/photo-1625025403725-fb026f06ab3c?w=400&h=400&fit=crop' },
  { name: 'Nude Eyeshadow Palette', price: '$145', reviews: 298, badge: 'NEW',             image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop' },
  { name: 'Silk Touch Concealer',   price: '$52',  reviews: 621, shades: ['#FADCC4','#E8C8B0','#D4A890','#B88868'], image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop' },
  { name: 'Radiant Blush Duo',      price: '$68',  reviews: 445, image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400&h=400&fit=crop' },
  { name: 'Glow Highlighter',       price: '$58',  reviews: 789, image: 'https://images.unsplash.com/photo-1515688594390-b649af70d282?w=400&h=400&fit=crop' },
  { name: 'Makeup Artist Set',      price: '$395', reviews: 203, badge: 'LIMITED EDITION', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop' },
  { name: 'Travel Glam Collection', price: '$185', reviews: 167, image: 'https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=400&h=400&fit=crop' },
]

// ─── Mobile ───────────────────────────────────────────────────────────────────
function MakeupMobile() {
  const [activeCategory, setActiveCategory] = useState('All Makeup')
  const [activeSort, setActiveSort]         = useState('Best Selling')
  const [showSortSheet, setShowSortSheet]   = useState(false)
  const [showFilterSheet, setShowFilterSheet] = useState(false)

  return (
    <div className="w-full min-h-screen bg-white font-['Cormorant_Garamond']">

      {/* Hero Banner */}
      <div className="bg-gradient-to-b from-[#FDFBF7] to-[#F5F1EA] px-5 py-10 relative overflow-hidden min-h-[200px] flex flex-col justify-center">
        <img src="https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=300&h=200&fit=crop" alt="" className="absolute top-0 right-0 w-[140px] h-[200px] object-cover opacity-20" />
        <div className="relative z-10">
          <p className="text-[11px] font-light italic text-[#8B7355] tracking-[2px] mb-2">LUXURY MAKEUP COLLECTION</p>
          <h1 className="text-[32px] font-bold text-[#1A1A1A] leading-[1] mb-2">Color Meets Artistry</h1>
          <p className="text-[14px] font-normal text-[#666666] mb-3">Discover transformative makeup</p>
          <div className="w-[60px] h-[2px] bg-[#C9A870]" />
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-[#FDFBF7] px-5 h-10 flex items-center gap-1">
        <span className="text-[13px] text-[#8B7355]">Home</span>
        <span className="text-[13px] text-[#999999]">/</span>
        <span className="text-[13px] text-[#8B7355]">Shop</span>
        <span className="text-[13px] text-[#999999]">/</span>
        <span className="text-[13px] text-[#666666]">Makeup</span>
      </div>

      {/* Category Pills */}
      <div className="bg-white border-b border-[#E8E3D9] px-5 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        <div className="flex gap-2 py-3 w-max">
          {mobileCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-[13px] font-medium whitespace-nowrap transition-all ${
                activeCategory === cat ? 'bg-[#8B7355] text-white' : 'bg-[#F5F1EA] text-[#3D3D3D]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white px-5 h-[52px] flex items-center justify-between border-b border-[#E8E3D9]">
        <span className="text-[13px] font-normal text-[#666666]">156 products</span>
        <div className="flex items-center gap-3">
          <button onClick={() => setShowSortSheet(true)} className="flex items-center gap-1.5 text-[13px] font-medium text-[#2B2B2B]">
            <IoOptionsOutline className="w-4 h-4 text-[#8B7355]" />
            {activeSort.split(':')[0]}
          </button>
          <button onClick={() => setShowFilterSheet(true)} className="flex items-center gap-1.5 h-8 px-3 border border-[#E8E3D9] rounded-full text-[13px] font-medium text-[#2B2B2B]">
            <IoFilterOutline className="w-3.5 h-3.5 text-[#8B7355]" />
            Filter
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="bg-white px-4 pt-4 pb-8">
        <div className="grid grid-cols-2 gap-3">
          {allMobileProducts.map((product, idx) => (
            <div key={idx} className="bg-white rounded-[10px] shadow-[0_2px_10px_rgba(0,0,0,0.07)] overflow-hidden">
              <div className="relative h-[170px]">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                {product.badge && (
                  <div className="absolute top-2 left-2 px-2 py-1 bg-[#C9A870] text-white text-[9px] font-medium rounded-full">
                    {product.badge}
                  </div>
                )}
                <button className="absolute top-2.5 right-2.5 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm">
                  <IoHeartOutline className="w-4 h-4 text-[#2B2B2B]" />
                </button>
              </div>
              <div className="p-3">
                <p className="text-[10px] font-light italic text-[#8B7355] mb-0.5">Shan Loray</p>
                <h4 className="text-[13px] font-medium text-[#2B2B2B] leading-tight mb-1.5 line-clamp-2">{product.name}</h4>
                {product.shades && (
                  <div className="flex items-center gap-1 mb-1.5">
                    {product.shades.map((shade, i) => (
                      <div key={i} className="w-3.5 h-3.5 rounded-full border border-[#E8E3D9]" style={{ backgroundColor: shade }} />
                    ))}
                  </div>
                )}
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
        <button className="w-full h-12 mt-6 border-2 border-[#8B7355] text-[#8B7355] text-[15px] font-medium rounded-[8px]">
          Load More
        </button>
      </div>

      {/* Sort Bottom Sheet */}
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

      {/* Filter Bottom Sheet */}
      {showFilterSheet && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowFilterSheet(false)} />
          <div className="relative bg-white rounded-t-[20px] flex flex-col" style={{ maxHeight: '90vh' }}>
            <div className="px-5 pt-5 pb-4 border-b border-[#E8E3D9] flex-shrink-0">
              <div className="w-10 h-1 bg-[#E8E3D9] rounded-full mx-auto mb-4" />
              <div className="flex items-center justify-between">
                <h3 className="text-[18px] font-semibold text-[#1A1A1A]">Refine Selection</h3>
                <button onClick={() => setShowFilterSheet(false)}><IoCloseOutline className="w-6 h-6 text-[#2B2B2B]" /></button>
              </div>
            </div>
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
              {/* Finish */}
              <div>
                <h4 className="text-[15px] font-medium text-[#1A1A1A] mb-3">Finish</h4>
                <div className="flex flex-wrap gap-2">
                  {finishTypes.map((t) => <button key={t} className="px-4 py-2 bg-[#F5F1EA] text-[#3D3D3D] text-[13px] rounded-full">{t}</button>)}
                </div>
              </div>
              {/* Coverage */}
              <div>
                <h4 className="text-[15px] font-medium text-[#1A1A1A] mb-3">Coverage</h4>
                <div className="flex flex-wrap gap-2">
                  {coverageTypes.map((t) => <button key={t} className="px-4 py-2 bg-[#F5F1EA] text-[#3D3D3D] text-[13px] rounded-full">{t}</button>)}
                </div>
              </div>
              {/* Skin Tone */}
              <div>
                <h4 className="text-[15px] font-medium text-[#1A1A1A] mb-3">Skin Tone</h4>
                <div className="flex flex-wrap gap-2">
                  {skinTones.map((t) => <button key={t} className="px-4 py-2 bg-[#F5F1EA] text-[#3D3D3D] text-[13px] rounded-full">{t}</button>)}
                </div>
              </div>
            </div>
            <div className="px-5 py-4 border-t border-[#E8E3D9] flex gap-3 flex-shrink-0">
              <button className="flex-1 h-12 border border-[#E8E3D9] text-[#666666] text-[15px] font-medium rounded-[8px]">Clear All</button>
              <button onClick={() => setShowFilterSheet(false)} className="flex-1 h-12 bg-[#8B7355] text-white text-[15px] font-medium rounded-[8px]">Apply</button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

// ─── Desktop ──────────────────────────────────────────────────────────────────
function MakeupDesktop() {
  const Stars = () => [...Array(5)].map((_, i) => <IoStarSharp key={i} className="w-[15px] h-[15px] text-[#C9A870]" />)

  return (
    <div className="bg-white font-['Cormorant_Garamond']">

      {/* Hero Banner */}
      <div className="min-h-[480px] bg-gradient-to-b from-[#FDFBF7] to-[#F5F1EA] relative overflow-hidden flex items-center px-[120px]">
        <img src="https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=800&h=800&fit=crop" alt="" className="absolute top-0 right-0 w-[500px] h-[480px] object-cover opacity-20" />
        <div className="w-[650px] relative z-10">
          <p className="text-[14px] font-light italic text-[#8B7355] tracking-[2px] mb-3">LUXURY MAKEUP COLLECTION</p>
          <h1 className="text-[80px] font-bold text-[#1A1A1A] leading-[1] mb-6">Color Meets Artistry</h1>
          <p className="text-[20px] font-normal text-[#666666] mb-8">From foundation to finishing touches, discover transformative makeup</p>
          <div className="w-[120px] h-[4px] bg-[#C9A870]" />
        </div>
        <div className="absolute right-[180px] top-1/2 -translate-y-1/2">
          <img src="https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=320&h=320&fit=crop" alt="Featured Makeup" className="w-[320px] h-[320px] object-cover rounded-[8px] shadow-[0_12px_48px_rgba(0,0,0,0.12)]" />
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="min-h-[48px] bg-[#FDFBF7] px-[120px] flex items-center">
        <span className="text-[15px] font-normal text-[#8B7355] cursor-pointer">Home</span>
        <span className="text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[15px] font-normal text-[#8B7355] cursor-pointer">Shop</span>
        <span className="text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[15px] font-normal text-[#666666]">Makeup</span>
      </div>

      {/* Main Content */}
      <div className="px-[120px] py-[64px] flex gap-[48px]">

        {/* Sidebar Filters */}
        <div className="w-[280px] flex-shrink-0">
          <div className="bg-white border border-[#E8E3D9] rounded-[16px] shadow-[0_8px_32px_rgba(0,0,0,0.08)] p-[28px]">
            <h3 className="text-[18px] font-medium text-[#1A1A1A] mb-[24px]">REFINE SELECTION</h3>
            <div className="space-y-[12px] mb-[32px]">
              <div className="inline-flex items-center px-[20px] py-[10px] bg-[#8B7355] text-white text-[14px] font-medium rounded-full cursor-pointer">All Makeup</div>
              {[
                { label: 'Face', subs: faceCategories },
                { label: 'Eyes', subs: eyesCategories },
                { label: 'Lips', subs: lipsCategories },
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
              <div className="inline-flex items-center px-[20px] py-[10px] bg-[#F5F1EA] text-[#3D3D3D] text-[14px] font-medium rounded-full cursor-pointer gap-2">
                <span>Sets & Palettes</span><IoChevronDown className="w-[14px] h-[14px]" />
              </div>
            </div>
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
                { title: 'Finish',    items: finishTypes   },
                { title: 'Coverage',  items: coverageTypes },
                { title: 'Skin Tone', items: skinTones     },
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
            <span className="text-[15px] font-normal text-[#666666]">Showing 42 of 156 makeup products</span>
            <div className="flex items-center gap-[16px]">
              <span className="text-[15px] font-normal text-[#666666]">Sort by:</span>
              <button className="w-[240px] min-h-[48px] px-4 py-[14px] bg-white border border-[#E8E3D9] rounded-[8px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] flex items-center justify-between cursor-pointer hover:border-[#C9A870] transition-all">
                <span className="text-[15px] font-medium text-[#2B2B2B]">Best Selling</span>
                <IoChevronDown className="w-[18px] h-[18px] text-[#8B7355]" />
              </button>
            </div>
          </div>

          {/* Row 1: Large Featured + Two Stacked */}
          <div className="flex gap-[20px] mb-[64px]">
            <div className="w-[460px] h-[560px] bg-white rounded-[12px] overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)] group cursor-pointer hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] transition-all duration-300">
              <div className="relative w-full h-[380px]">
                <img src={featuredProduct.image} alt={featuredProduct.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-[20px] right-[20px] px-[16px] py-[8px] bg-[#C9A870] text-white text-[12px] font-medium rounded-full">{featuredProduct.badge}</div>
                <div className="absolute bottom-0 left-0 right-0 h-[180px] bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-[24px] text-white">
                  <p className="text-[17px] font-normal mb-2">{featuredProduct.description}</p>
                  <h3 className="text-[28px] font-medium mb-3">{featuredProduct.name}</h3>
                  <p className="text-[24px] font-semibold">{featuredProduct.price}</p>
                </div>
              </div>
              <div className="p-[24px]">
                <p className="text-[13px] font-light italic text-[#8B7355] tracking-[1.2px] mb-2">Shan Loray</p>
                <div className="flex items-center gap-[6px]"><Stars /><span className="text-[13px] font-normal text-[#999999] ml-1">({featuredProduct.reviews})</span></div>
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-[20px]">
              {horizontalProducts.map((product, idx) => (
                <div key={idx} className="w-full h-[270px] bg-white rounded-[12px] overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)] group cursor-pointer hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] transition-all duration-300 flex">
                  <div className="w-[280px] h-full relative overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    {product.badge && <div className="absolute top-[16px] right-[16px] px-[12px] py-[6px] bg-[#C9A870] text-white text-[11px] font-medium rounded-full">{product.badge}</div>}
                    <div className="absolute top-[16px] left-[16px] flex gap-[8px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.15)]"><IoHeartOutline className="w-[20px] h-[20px] text-[#2B2B2B]" /></div>
                      <div className="w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.15)]"><IoEyeOutline className="w-[20px] h-[20px] text-[#2B2B2B]" /></div>
                    </div>
                  </div>
                  <div className="flex-1 p-[24px] flex flex-col justify-center">
                    <p className="text-[13px] font-light italic text-[#8B7355] tracking-[1.2px] mb-2">Shan Loray</p>
                    <h4 className="text-[20px] font-medium text-[#2B2B2B] leading-[1.2] mb-2">{product.name}</h4>
                    <p className="text-[15px] font-normal text-[#999999] leading-[1.5] mb-2">{product.description}</p>
                    {product.shades && (
                      <div className="flex items-center gap-[6px] mb-3">
                        {product.shades.map((shade, i) => <div key={i} className="w-[16px] h-[16px] rounded-full border border-[#E8E3D9]" style={{ backgroundColor: shade }} />)}
                      </div>
                    )}
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
                {product.shades && (
                  <div className="flex items-center gap-[6px] mb-2">
                    {product.shades.map((shade, i) => <div key={i} className="w-[16px] h-[16px] rounded-full border border-[#E8E3D9]" style={{ backgroundColor: shade }} />)}
                  </div>
                )}
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
                  {product.badge && <div className="absolute top-[20px] right-[20px] px-[16px] py-[8px] bg-[#C9A870] text-white text-[12px] font-medium rounded-full">{product.badge}</div>}
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

          {/* Newsletter */}
          <div className="min-h-[140px] bg-[#F5F1EA] rounded-[16px] flex flex-col items-center justify-center px-[64px] mb-[96px]">
            <h3 className="text-[32px] font-medium text-[#1A1A1A] mb-2">Join Our Beauty Circle</h3>
            <p className="text-[16px] font-normal text-[#666666] mb-6">Get early access to new makeup launches</p>
            <div className="flex items-center gap-[12px]">
              <input type="email" placeholder="Enter your email" className="w-[360px] h-[56px] px-5 bg-white text-[15px] text-[#2B2B2B] rounded-[8px] border border-[#E8E3D9] outline-none" />
              <button className="h-[56px] px-[32px] bg-[#8B7355] text-white text-[15px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">Subscribe</button>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-[8px] mb-[96px]">
            <button className="w-[44px] h-[44px] border border-[#E8E3D9] rounded-[6px] flex items-center justify-center cursor-pointer hover:bg-[#F5F1EA] transition-colors"><IoChevronBack className="w-[20px] h-[20px] text-[#666666]" /></button>
            <button className="w-[44px] h-[44px] bg-[#8B7355] text-white text-[15px] font-medium rounded-[6px]">1</button>
            {[2, 3, 4].map((num) => (
              <button key={num} className="w-[44px] h-[44px] border border-[#E8E3D9] rounded-[6px] text-[15px] font-medium text-[#3D3D3D] cursor-pointer hover:border-[#8B7355] hover:text-[#8B7355] transition-colors">{num}</button>
            ))}
            <button className="w-[44px] h-[44px] border border-[#E8E3D9] rounded-[6px] flex items-center justify-center cursor-pointer hover:bg-[#F5F1EA] transition-colors"><IoChevronForward className="w-[20px] h-[20px] text-[#666666]" /></button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Main Export (Switcher) ───────────────────────────────────────────────────
export default function Makeup() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return isMobile ? <MakeupMobile /> : <MakeupDesktop />
}