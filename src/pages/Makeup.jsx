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
const faceCategories  = ['Foundation', 'Concealer', 'Powder', 'Blush', 'Highlighter']
const eyesCategories  = ['Eyeshadow', 'Eyeliner', 'Mascara', 'Eyebrow']
const lipsCategories  = ['Lipstick', 'Lip Gloss', 'Lip Liner', 'Lip Care']
const finishTypes     = ['Matte', 'Satin', 'Shimmer', 'Glitter']
const coverageTypes   = ['Sheer', 'Medium', 'Full']
const skinTones       = ['Fair', 'Light', 'Medium', 'Tan', 'Deep', 'All Tones']
const sortOptions     = ['Best Selling', 'Newest', 'Price: Low to High', 'Price: High to Low', 'Most Popular', 'Shade Range']

const mobileCategoryCards = [
  { name: 'Face',            count: 24, image: 'https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=80&h=80&fit=crop' },
  { name: 'Eyes',            count: 18, image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=80&h=80&fit=crop' },
  { name: 'Lips',            count: 16, image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=80&h=80&fit=crop' },
  { name: 'Sets & Palettes', count: 12, image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=80&h=80&fit=crop' },
]

const mobileProducts = [
  { name: 'Velvet Matte Foundation',  description: 'Flawless buildable coverage',    price: '$78', reviews: 542, image: 'https://images.unsplash.com/photo-1625025403725-fb026f06ab3c?w=400&h=400&fit=crop' },
  { name: 'Luminous Eye Palette',     description: '12 curated shades',              price: '$68', reviews: 487, image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop' },
  { name: 'Signature Lip Velvet',     description: 'Long-lasting color',             price: '$42', reviews: 629, image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop' },
  { name: 'Precision Liquid Liner',   description: 'Ultimate control & intensity',   price: '$32', reviews: 381, image: 'https://images.unsplash.com/photo-1631730486572-226d1f595b68?w=400&h=400&fit=crop' },
  { name: 'Volume Mascara',           description: 'Dramatic length & curl',         price: '$38', reviews: 456, image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop' },
  { name: 'Radiant Blush Duo',        description: 'Natural glow & definition',      price: '$48', reviews: 298, image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400&h=400&fit=crop' },
]

// Desktop data
const featuredProduct = {
  name: 'Luxe Velvet Lipstick Collection',
  description: 'Twelve signature shades in rich, long-lasting formula',
  price: '$245', reviews: 412,
  image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=560&h=560&fit=crop',
  badge: 'BESTSELLER',
}
const horizontalProducts = [
  { name: 'Luminous Foundation',   description: 'Buildable coverage with 24-hour wear', price: '$78',  reviews: 534, image: 'https://images.unsplash.com/photo-1625025403725-fb026f06ab3c?w=460&h=280&fit=crop', shades: ['#F5D4C4','#E8C4B4','#D4A894','#C08874','#A86854','#8E5844'] },
  { name: 'Nude Eyeshadow Palette', description: 'Ten versatile shades for every look',  price: '$145', reviews: 298, image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=460&h=280&fit=crop', badge: 'NEW' },
]
const squareProducts = [
  { name: 'Silk Touch Concealer', description: 'Full coverage brightening formula',   price: '$52', reviews: 621, image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop', shades: ['#FADCC4','#E8C8B0','#D4A890','#B88868','#9C6848','#7E5438'] },
  { name: 'Radiant Blush Duo',    description: 'Buildable color with luminous finish', price: '$68', reviews: 445, image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=300&h=300&fit=crop' },
  { name: 'Glow Highlighter',     description: 'Multi-dimensional shimmer',            price: '$58', reviews: 789, image: 'https://images.unsplash.com/photo-1515688594390-b649af70d282?w=300&h=300&fit=crop' },
]
const rectangularProducts = [
  { name: 'Complete Makeup Artist Set', description: 'Professional collection with face, eyes, and lips essentials',    price: '$395', reviews: 203, image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=470&h=400&fit=crop', badge: 'LIMITED EDITION' },
  { name: 'Travel Glam Collection',     description: 'Your complete makeup routine in luxurious travel-friendly sizes', price: '$185', reviews: 167, image: 'https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=470&h=400&fit=crop' },
]

const filterCategories = [
  { name: 'Face',            count: 24, image: 'https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=80&h=80&fit=crop' },
  { name: 'Eyes',            count: 18, image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=80&h=80&fit=crop' },
  { name: 'Lips',            count: 16, image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=80&h=80&fit=crop' },
  { name: 'Sets & Palettes', count: 8,  image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=80&h=80&fit=crop' },
]

const shadeColors = [
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

const filterFinishTypes = ['Matte', 'Glossy', 'Satin']
const filterSkinTypes   = ['All Skin Types', 'Dry', 'Oily', 'Combination', 'Sensitive']
const filterBrands      = ['Shan Loray', 'Charlotte Tilbury', 'Tom Ford Beauty', 'Chanel', 'Dior', 'La Mer', 'Armani Beauty', 'Guerlain']
const filterRatings     = [{ stars: 5, count: 234 }, { stars: 4, count: 156 }, { stars: 3, count: 89 }, { stars: 2, count: 45 }, { stars: 1, count: 12 }]


// ─── Mobile ───────────────────────────────────────────────────────────────────
function MakeupMobile() {
  const [activeSort, setActiveSort]           = useState('Best Selling')
  const [showSortSheet, setShowSortSheet]     = useState(false)
  const [showFilterSheet, setShowFilterSheet] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState(['Face', 'Lips'])
  const [selectedShades, setSelectedShades]         = useState(['Beige', 'Tan'])
  const [selectedFinish, setSelectedFinish]         = useState(['Matte', 'Satin'])
  const [selectedSkinTypes, setSelectedSkinTypes]   = useState(['Dry', 'Combination'])
  const [selectedBrands, setSelectedBrands]         = useState(['Shan Loray'])
  const [selectedRating, setSelectedRating]         = useState(null)
  const activeFilters = selectedCategories.length + selectedShades.length + selectedFinish.length

  return (
    <div className="w-full min-h-screen bg-white font-['Cormorant_Garamond']">

      {/* ── Hero Banner ── */}
      <div className="relative min-h-[280px] bg-[#F5F0EB] overflow-hidden flex items-center">
        <div className="absolute right-0 top-0 bottom-0 w-[55%]">
          <img
            src="https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=600&h=600&fit=crop"
            alt="Makeup collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#F5F0EB] via-[#F5F0EB]/30 to-transparent" />
        </div>
        <div className="relative z-10 px-5 py-10 w-[62%]">
          <p className="text-[10px] font-light italic text-[#8B7355] tracking-[2px] mb-3">ARTISTRY ESSENTIALS</p>
          <h1 className="text-[30px] font-bold text-[#1A1A1A] leading-[1.1] mb-3">Makeup Collection</h1>
          <p className="text-[13px] font-normal text-[#666666] mb-4">Discover your signature look</p>
          <div className="w-[48px] h-[2px] bg-[#C9A870]" />
        </div>
      </div>

      {/* ── Category Cards ── */}
      <div className="bg-white px-4 py-5 overflow-x-auto border-b border-[#E8E3D9]" style={{ scrollbarWidth: 'none' }}>
        <div className="flex gap-3 w-max">
          {mobileCategoryCards.map((cat) => (
            <div key={cat.name} className="w-[130px] bg-white border border-[#E8E3D9] rounded-[12px] p-4 flex flex-col items-center gap-2 cursor-pointer hover:border-[#C9A870] transition-colors">
              <div className="w-[64px] h-[64px] rounded-full overflow-hidden bg-[#F9F6F2]">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
              </div>
              <span className="text-[14px] font-medium text-[#1A1A1A]">{cat.name}</span>
              <span className="text-[12px] font-light text-[#999999]">{cat.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Toolbar ── */}
      <div className="bg-white px-5 pt-4 pb-3">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[13px] font-normal text-[#666666]">Showing 42 products</span>
          <button
            onClick={() => setShowFilterSheet(true)}
            className="relative flex items-center gap-2 h-9 px-4 border border-[#E8E3D9] rounded-full text-[13px] font-medium text-[#2B2B2B]"
          >
            <IoFunnelOutline className="w-3.5 h-3.5 text-[#8B7355]" />
            Filters
            <div className="absolute -top-2 -right-2 w-5 h-5 bg-[#8B7355] rounded-full flex items-center justify-center">
              <span className="text-[10px] font-medium text-white">{activeFilters}</span>
            </div>
          </button>
        </div>
        {/* Sort Dropdown */}
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
        <h3 className="text-[24px] font-semibold text-[#1A1A1A] mb-2">Unlock Beauty Secrets</h3>
        <p className="text-[14px] font-normal text-[#666666] mb-5">Exclusive tips & new releases</p>
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

      {/* ── Filter Sheet (Figma: makeup-filter-popup) ── */}
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
                  <span className="text-[11px] font-semibold text-white">{activeFilters}</span>
                </div>
              </div>
              <button onClick={() => setShowFilterSheet(false)}>
                <IoClose className="w-6 h-6 text-[#2B2B2B]" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto flex-1">

              {/* Product Category */}
              <div className="px-5 py-5 border-b border-[#E8E3D9]">
                <h3 className="text-[16px] font-medium text-[#2B2B2B] mb-4">Product Category</h3>
                <div className="grid grid-cols-2 gap-3">
                  {filterCategories.map((cat) => {
                    const isSelected = selectedCategories.includes(cat.name)
                    return (
                      <button
                        key={cat.name}
                        onClick={() => setSelectedCategories(prev => isSelected ? prev.filter(c => c !== cat.name) : [...prev, cat.name])}
                        className={`rounded-[8px] p-3 flex flex-col items-center justify-center gap-2 border-2 transition-colors ${isSelected ? 'border-[#8B7355] bg-[#FDFBF7]' : 'border-[#E8E3D9] bg-white'}`}
                      >
                        <img src={cat.image} alt={cat.name} className="w-[40px] h-[40px] rounded-full object-cover" />
                        <span className="text-[13px] font-medium text-[#2B2B2B] text-center">{cat.name}</span>
                        <span className="text-[11px] font-normal text-[#999999]">{cat.count}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Price Range */}
              <div className="px-5 py-5 border-b border-[#E8E3D9]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[16px] font-medium text-[#2B2B2B]">Price Range</h3>
                  <span className="text-[14px] font-medium text-[#8B7355]">$0 – $150</span>
                </div>
                <div className="relative pt-2 pb-6">
                  <div className="h-[4px] bg-[#E8E3D9] rounded-full relative">
                    <div className="absolute left-0 h-full w-[65%] bg-[#C9A870] rounded-full" />
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[22px] h-[22px] bg-white border-2 border-[#8B7355] rounded-full shadow-sm" />
                    <div className="absolute left-[65%] top-1/2 -translate-y-1/2 w-[22px] h-[22px] bg-white border-2 border-[#8B7355] rounded-full shadow-sm" />
                  </div>
                  <div className="flex justify-between mt-3">
                    <span className="text-[12px] text-[#666666]">$0</span>
                    <span className="text-[12px] text-[#666666]">$200</span>
                  </div>
                </div>
              </div>

              {/* Shade Selection */}
              <div className="px-5 py-5 border-b border-[#E8E3D9]">
                <div className="mb-4">
                  <h3 className="text-[16px] font-medium text-[#2B2B2B]">Shade Selection</h3>
                  <p className="text-[12px] text-[#999999]">12 shades available</p>
                </div>
                <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
                  {shadeColors.map((shade) => {
                    const isSelected = selectedShades.includes(shade.name)
                    return (
                      <button
                        key={shade.name}
                        onClick={() => setSelectedShades(prev => isSelected ? prev.filter(s => s !== shade.name) : [...prev, shade.name])}
                        className="flex flex-col items-center gap-2 flex-shrink-0"
                      >
                        <div
                          className={`w-[44px] h-[44px] rounded-full transition-all ${isSelected ? 'ring-2 ring-[#8B7355] ring-offset-2' : ''}`}
                          style={{ backgroundColor: shade.color }}
                        />
                        <span className="text-[10px] text-[#666666]">{shade.name}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Finish Type */}
              <div className="px-5 py-5 border-b border-[#E8E3D9]">
                <h3 className="text-[16px] font-medium text-[#2B2B2B] mb-4">Finish Type</h3>
                <div className="flex gap-3 flex-wrap">
                  {filterFinishTypes.map((finish) => {
                    const isSelected = selectedFinish.includes(finish)
                    return (
                      <button
                        key={finish}
                        onClick={() => setSelectedFinish(prev => isSelected ? prev.filter(f => f !== finish) : [...prev, finish])}
                        className={`px-5 h-[34px] rounded-[8px] text-[14px] font-medium transition-colors ${isSelected ? 'bg-[#8B7355] text-white' : 'bg-white border border-[#E8E3D9] text-[#2B2B2B]'}`}
                      >
                        {finish}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Skin Type */}
              <div className="px-5 py-5 border-b border-[#E8E3D9]">
                <h3 className="text-[16px] font-medium text-[#2B2B2B] mb-4">Skin Type</h3>
                <div className="space-y-3">
                  {filterSkinTypes.map((type) => {
                    const isChecked = selectedSkinTypes.includes(type)
                    return (
                      <button
                        key={type}
                        onClick={() => setSelectedSkinTypes(prev => isChecked ? prev.filter(t => t !== type) : [...prev, type])}
                        className="flex items-center gap-3 w-full"
                      >
                        <div className={`w-[20px] h-[20px] rounded-[4px] border-2 flex items-center justify-center flex-shrink-0 transition-colors ${isChecked ? 'bg-[#C9A870] border-[#C9A870]' : 'bg-white border-[#E8E3D9]'}`}>
                          {isChecked && <IoCheckmark className="w-[13px] h-[13px] text-white" />}
                        </div>
                        <span className="text-[14px] font-normal text-[#2B2B2B]">{type}</span>
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
                      <button
                        key={brand}
                        onClick={() => setSelectedBrands(prev => isChecked ? prev.filter(b => b !== brand) : [...prev, brand])}
                        className="flex items-center gap-3 h-[40px] w-full"
                      >
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
                    <button
                      key={r.stars}
                      onClick={() => setSelectedRating(prev => prev === r.stars ? null : r.stars)}
                      className={`flex items-center justify-between w-full h-[36px] px-3 rounded-[4px] transition-colors ${selectedRating === r.stars ? 'bg-[#FDFBF7]' : ''}`}
                    >
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

            {/* Footer Buttons */}
            <div className="px-5 py-4 border-t border-[#E8E3D9] flex gap-3 flex-shrink-0">
              <button
                onClick={() => { setSelectedCategories([]); setSelectedShades([]); setSelectedFinish([]); setSelectedSkinTypes([]); setSelectedBrands([]); setSelectedRating(null) }}
                className="flex-1 h-12 bg-white border-2 border-[#8B7355] text-[#8B7355] text-[15px] font-semibold rounded-[8px]"
              >
                Clear All
              </button>
              <button
                onClick={() => setShowFilterSheet(false)}
                className="flex-1 h-12 bg-[#8B7355] text-white text-[15px] font-semibold rounded-[8px]"
              >
                Apply Filters (24 items)
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

// ─── Desktop + Tablet responsive ─────────────────────────────────────────────
function MakeupDesktop() {
  const Stars = () => [...Array(5)].map((_, i) => <IoStarSharp key={i} className="w-[15px] h-[15px] text-[#C9A870]" />)

  return (
    <div className="bg-white font-['Cormorant_Garamond']">

      {/* Hero */}
      <div className="min-h-[300px] md:min-h-[380px] lg:min-h-[480px] bg-gradient-to-b from-[#FDFBF7] to-[#F5F1EA] relative overflow-hidden flex items-center px-6 md:px-[60px] lg:px-[120px]">
        <img src="https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=800&h=800&fit=crop" alt="" className="absolute top-0 right-0 w-[180px] md:w-[360px] lg:w-[500px] h-full object-cover opacity-20" />
        <div className="w-full max-w-[650px] relative z-10">
          <p className="text-[12px] md:text-[13px] lg:text-[14px] font-light italic text-[#8B7355] tracking-[2px] mb-3">LUXURY MAKEUP COLLECTION</p>
          <h1 className="text-[42px] md:text-[60px] lg:text-[80px] font-bold text-[#1A1A1A] leading-[1] mb-4 md:mb-5 lg:mb-6">Color Meets Artistry</h1>
          <p className="text-[15px] md:text-[17px] lg:text-[20px] font-normal text-[#666666] mb-6 md:mb-7 lg:mb-8">From foundation to finishing touches, discover transformative makeup</p>
          <div className="w-[90px] md:w-[105px] lg:w-[120px] h-[4px] bg-[#C9A870]" />
        </div>
        <div className="hidden lg:block absolute right-[180px] top-1/2 -translate-y-1/2">
          <img src="https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=320&h=320&fit=crop" alt="" className="w-[320px] h-[320px] object-cover rounded-[8px] shadow-[0_12px_48px_rgba(0,0,0,0.12)]" />
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="min-h-[48px] bg-[#FDFBF7] px-6 md:px-[60px] lg:px-[120px] flex items-center">
        <span className="text-[13px] lg:text-[15px] text-[#8B7355] cursor-pointer">Home</span><span className="text-[13px] lg:text-[15px] text-[#666666] mx-2">/</span>
        <span className="text-[13px] lg:text-[15px] text-[#8B7355] cursor-pointer">Shop</span><span className="text-[13px] lg:text-[15px] text-[#666666] mx-2">/</span>
        <span className="text-[13px] lg:text-[15px] text-[#666666]">Makeup</span>
      </div>

      {/* Main Content */}
      <div className="px-6 md:px-[60px] lg:px-[120px] py-8 md:py-12 lg:py-[64px] flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-[48px]">

        {/* Sidebar */}
        <div className="hidden md:block w-full md:w-[220px] lg:w-[280px] flex-shrink-0">
          <div className="bg-white border border-[#E8E3D9] rounded-[16px] shadow-[0_8px_32px_rgba(0,0,0,0.08)] p-5 lg:p-[28px]">
            <h3 className="text-[16px] lg:text-[18px] font-medium text-[#1A1A1A] mb-5 lg:mb-[24px]">REFINE SELECTION</h3>
            <div className="space-y-[10px] lg:space-y-[12px] mb-6 lg:mb-[32px]">
              <div className="inline-flex items-center px-[16px] lg:px-[20px] py-[8px] lg:py-[10px] bg-[#8B7355] text-white text-[13px] lg:text-[14px] font-medium rounded-full cursor-pointer">All Makeup</div>
              {[{label:'Face',subs:faceCategories},{label:'Eyes',subs:eyesCategories},{label:'Lips',subs:lipsCategories}].map(({label,subs}) => (
                <div key={label}>
                  <div className="inline-flex items-center px-[16px] lg:px-[20px] py-[8px] lg:py-[10px] bg-[#F5F1EA] text-[#3D3D3D] text-[13px] lg:text-[14px] font-medium rounded-full cursor-pointer gap-2">
                    <span>{label}</span><IoChevronDown className="w-[13px] h-[13px] lg:w-[14px] lg:h-[14px]" />
                  </div>
                  <div className="ml-[20px] lg:ml-[24px] mt-[8px]">
                    {subs.map((item) => <div key={item} className="inline-block px-[12px] lg:px-[16px] py-[5px] lg:py-[6px] bg-white border border-[#E8E3D9] text-[#666666] text-[12px] lg:text-[13px] rounded-full cursor-pointer mr-1 lg:mr-2 mb-2">{item}</div>)}
                  </div>
                </div>
              ))}
              <div className="inline-flex items-center px-[16px] lg:px-[20px] py-[8px] lg:py-[10px] bg-[#F5F1EA] text-[#3D3D3D] text-[13px] lg:text-[14px] font-medium rounded-full cursor-pointer gap-2">
                <span>Sets & Palettes</span><IoChevronDown className="w-[13px] h-[13px] lg:w-[14px] lg:h-[14px]" />
              </div>
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
              {[{title:'Finish',items:finishTypes},{title:'Coverage',items:coverageTypes},{title:'Skin Tone',items:skinTones}].map(({title,items}) => (
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
            <span className="text-[13px] md:text-[14px] lg:text-[15px] text-[#666666]">Showing 42 of 156 makeup products</span>
            <div className="flex items-center gap-3 lg:gap-[16px]">
              <span className="hidden md:inline text-[14px] lg:text-[15px] text-[#666666]">Sort by:</span>
              <button className="w-[180px] md:w-[200px] lg:w-[240px] min-h-[44px] lg:min-h-[48px] px-4 bg-white border border-[#E8E3D9] rounded-[8px] flex items-center justify-between cursor-pointer hover:border-[#C9A870] transition-all">
                <span className="text-[13px] md:text-[14px] lg:text-[15px] font-medium text-[#2B2B2B]">Best Selling</span>
                <IoChevronDown className="w-[16px] h-[16px] lg:w-[18px] lg:h-[18px] text-[#8B7355]" />
              </button>
            </div>
          </div>

          {/* Row 1 — featured + 2 horizontal */}
          <div className="flex flex-col md:flex-row gap-5 mb-10 md:mb-12 lg:mb-[64px]">
            <div className="w-full md:w-[300px] lg:w-[460px] md:h-[480px] lg:h-[560px] bg-white rounded-[12px] overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)] group cursor-pointer hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] transition-all duration-300">
              <div className="relative w-full h-[260px] md:h-[300px] lg:h-[380px]">
                <img src={featuredProduct.image} alt={featuredProduct.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-[16px] right-[16px] lg:top-[20px] lg:right-[20px] px-[14px] lg:px-[16px] py-[7px] lg:py-[8px] bg-[#C9A870] text-white text-[11px] lg:text-[12px] font-medium rounded-full">{featuredProduct.badge}</div>
                <div className="absolute bottom-0 left-0 right-0 h-[160px] bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-[24px] text-white">
                  <p className="text-[14px] lg:text-[17px] mb-1 lg:mb-2">{featuredProduct.description}</p>
                  <h3 className="text-[20px] lg:text-[28px] font-medium mb-2 lg:mb-3">{featuredProduct.name}</h3>
                  <p className="text-[20px] lg:text-[24px] font-semibold">{featuredProduct.price}</p>
                </div>
              </div>
              <div className="p-5 lg:p-[24px]">
                <p className="text-[12px] lg:text-[13px] font-light italic text-[#8B7355] tracking-[1.2px] mb-2">Shan Loray</p>
                <div className="flex items-center gap-[6px]"><Stars /><span className="text-[13px] text-[#999999] ml-1">({featuredProduct.reviews})</span></div>
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-4 lg:gap-[20px]">
              {horizontalProducts.map((product, idx) => (
                <div key={idx} className="w-full h-[160px] md:h-[220px] lg:h-[270px] bg-white rounded-[12px] overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)] group cursor-pointer hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] transition-all duration-300 flex">
                  <div className="w-[140px] md:w-[180px] lg:w-[280px] h-full relative overflow-hidden flex-shrink-0">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    {product.badge && <div className="absolute top-[12px] right-[12px] lg:top-[16px] lg:right-[16px] px-[10px] lg:px-[12px] py-[5px] lg:py-[6px] bg-[#C9A870] text-white text-[10px] lg:text-[11px] font-medium rounded-full">{product.badge}</div>}
                    <div className="absolute top-[12px] left-[12px] lg:top-[16px] lg:left-[16px] flex gap-[6px] lg:gap-[8px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-[34px] h-[34px] lg:w-[40px] lg:h-[40px] bg-white rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.15)]"><IoHeartOutline className="w-[16px] h-[16px] lg:w-[20px] lg:h-[20px] text-[#2B2B2B]" /></div>
                      <div className="w-[34px] h-[34px] lg:w-[40px] lg:h-[40px] bg-white rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.15)]"><IoEyeOutline className="w-[16px] h-[16px] lg:w-[20px] lg:h-[20px] text-[#2B2B2B]" /></div>
                    </div>
                  </div>
                  <div className="flex-1 p-4 lg:p-[24px] flex flex-col justify-center min-w-0">
                    <p className="text-[11px] lg:text-[13px] font-light italic text-[#8B7355] tracking-[1.2px] mb-1 lg:mb-2">Shan Loray</p>
                    <h4 className="text-[15px] md:text-[17px] lg:text-[20px] font-medium text-[#2B2B2B] leading-[1.2] mb-1 lg:mb-2">{product.name}</h4>
                    <p className="text-[12px] lg:text-[15px] text-[#999999] mb-2 line-clamp-2">{product.description}</p>
                    {product.shades && <div className="flex items-center gap-[5px] lg:gap-[6px] mb-2 lg:mb-3 flex-wrap">{product.shades.map((s,i) => <div key={i} className="w-[14px] h-[14px] lg:w-[16px] lg:h-[16px] rounded-full border border-[#E8E3D9]" style={{backgroundColor:s}} />)}</div>}
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
                {product.shades && <div className="flex items-center gap-[5px] lg:gap-[6px] mb-1 lg:mb-2 flex-wrap">{product.shades.map((s,i) => <div key={i} className="w-[14px] h-[14px] lg:w-[16px] lg:h-[16px] rounded-full border border-[#E8E3D9]" style={{backgroundColor:s}} />)}</div>}
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
                  {product.badge && <div className="absolute top-[16px] right-[16px] lg:top-[20px] lg:right-[20px] px-[12px] lg:px-[16px] py-[6px] lg:py-[8px] bg-[#C9A870] text-white text-[11px] lg:text-[12px] font-medium rounded-full">{product.badge}</div>}
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

          {/* Newsletter */}
          <div className="bg-[#F5F1EA] rounded-[16px] flex flex-col items-center justify-center px-6 md:px-10 lg:px-[64px] py-10 lg:py-0 lg:min-h-[140px] mb-12 lg:mb-[96px]">
            <h3 className="text-[24px] md:text-[28px] lg:text-[32px] font-medium text-[#1A1A1A] mb-2 text-center">Join Our Beauty Circle</h3>
            <p className="text-[14px] lg:text-[16px] text-[#666666] mb-6 text-center">Get early access to new makeup launches</p>
            <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
              <input type="email" placeholder="Enter your email" className="w-full md:w-[300px] lg:w-[360px] h-[52px] lg:h-[56px] px-5 bg-white text-[14px] lg:text-[15px] text-[#2B2B2B] rounded-[8px] border border-[#E8E3D9] outline-none" />
              <button className="w-full md:w-auto h-[52px] lg:h-[56px] px-8 lg:px-[32px] bg-[#8B7355] text-white text-[14px] lg:text-[15px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">Subscribe</button>
            </div>
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
export default function Makeup() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return isMobile ? <MakeupMobile /> : <MakeupDesktop />
}