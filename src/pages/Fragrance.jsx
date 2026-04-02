import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  IoStarSharp,
  IoHeartOutline,
  IoEyeOutline,
  IoChevronDown,
  IoCloseOutline,
  IoClose,
  IoCheckmark,
  IoFunnelOutline,
  IoChevronUp,
  IoLogoInstagram,
  IoLogoFacebook,
  IoLogoPinterest,
  IoLogoYoutube,
} from 'react-icons/io5'

import {
  fragranceCategories,
  filterBrandsFragrance,
  filterRatingsFragrance,
  sortOptionsFragrance,
} from '../data/products'

import { getFragranceProducts, formatProductsForUI } from '../lib/productsService'
import LoadingSpinner from '../components/LoadingSpinner'

// ── Fragrance-specific filter data ────────────────────────────────────────────
const fragranceFamilies   = ['Floral', 'Woody', 'Citrus', 'Oriental', 'Fresh', 'Spicy']
const topNotes            = ['Rose', 'Bergamot', 'Jasmine', 'Sandalwood', 'Vanilla', 'Oud']
const intensityLevels     = ['Light', 'Moderate', 'Strong']
const productSizes        = ['30ml', '50ml', '100ml', 'Travel Size']

const filterFamilies        = ['Floral', 'Oriental', 'Woody', 'Fresh', 'Citrus', 'Spicy', 'Aquatic', 'Fruity']
const filterTopNotes        = ['Rose', 'Bergamot', 'Jasmine', 'Lemon', 'Lavender']
const filterMiddleNotes     = ['Sandalwood', 'Cedar', 'Vanilla', 'Patchouli']
const filterBaseNotes       = ['Musk', 'Amber', 'Oakmoss', 'Tonka Bean']
const filterOccasions       = ['Day Wear', 'Evening', 'Special Occasions']
const filterIntensityLevels = ['Light', 'Moderate', 'Strong', 'Very Strong', 'Long-Lasting']
const filterRatings         = filterRatingsFragrance
const fragranceCategoryLabels = ['All Fragrances', 'Eau de Parfum', 'Eau de Toilette', 'Body Mist', 'Discovery Sets']

const filterBrands  = filterBrandsFragrance
const sortOptions   = sortOptionsFragrance

// ── Shared filter + sort logic ────────────────────────────────────────────────
function getFilteredAndSorted(allProducts, {
  selectedTypes, selectedFamilies, selectedBrands,
  selectedRating, minPrice, maxPrice, activeSort
}) {
  let filtered = [...allProducts]

  if (minPrice || maxPrice) {
    const min = minPrice ? parseFloat(minPrice) : 0
    const max = maxPrice ? parseFloat(maxPrice) : Infinity
    filtered = filtered.filter(p => p.priceValue >= min && p.priceValue <= max)
  }
  if (selectedTypes.length > 0) {
    filtered = filtered.filter(p => selectedTypes.includes(p.subcategory))
  }
  if (selectedFamilies.length > 0) {
    filtered = filtered.filter(p =>
      p.fragrance_family && selectedFamilies.some(f => p.fragrance_family.includes(f))
    )
  }
  if (selectedBrands.length > 0) {
    filtered = filtered.filter(p => selectedBrands.includes(p.brand))
  }
  if (selectedRating) {
    filtered = filtered.filter(p => parseFloat(p.rating) >= selectedRating)
  }

  if (activeSort === 'Price: Low to High')  filtered.sort((a, b) => a.priceValue - b.priceValue)
  else if (activeSort === 'Price: High to Low') filtered.sort((a, b) => b.priceValue - a.priceValue)
  else if (activeSort === 'Best Selling')    filtered.sort((a, b) => b.reviews - a.reviews)
  else if (activeSort === 'Newest')          filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  else if (activeSort === 'Top Rated')       filtered.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))

  return filtered
}

// ── Mobile ────────────────────────────────────────────────────────────────────
function FragranceMobile() {
  const [allProducts, setAllProducts] = useState([])
  const [loading, setLoading]         = useState(true)
  const [activeSort, setActiveSort]             = useState('Best Selling')
  const [showSortSheet, setShowSortSheet]       = useState(false)
  const [showFilterSheet, setShowFilterSheet]   = useState(false)
  const [selectedTypes, setSelectedTypes]         = useState([])
  const [selectedFamilies, setSelectedFamilies]   = useState([])
  const [selectedTopNotes, setSelectedTopNotes]   = useState([])
  const [selectedMiddleNotes, setSelectedMiddleNotes] = useState([])
  const [selectedBaseNotes, setSelectedBaseNotes] = useState([])
  const [selectedOccasion, setSelectedOccasion]   = useState(null)
  const [intensityLevel, setIntensityLevel]       = useState(null)
  const [selectedBrands, setSelectedBrands]       = useState([])
  const [selectedRating, setSelectedRating]       = useState(null)
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [expandedNotes, setExpandedNotes]         = useState({ top: true, middle: false, base: false })
  const [displayCount, setDisplayCount]           = useState(10)

  const toggle = (arr, setArr, val) => setArr(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val])

  const activeFilters = selectedTypes.length + selectedFamilies.length + selectedTopNotes.length + selectedMiddleNotes.length + selectedBaseNotes.length + (selectedOccasion ? 1 : 0) + (intensityLevel !== null ? 1 : 0) + selectedBrands.length + (selectedRating ? 1 : 0) + (minPrice || maxPrice ? 1 : 0)

  const clearAll = () => {
    setSelectedTypes([]); setSelectedFamilies([]); setSelectedTopNotes([])
    setSelectedMiddleNotes([]); setSelectedBaseNotes([]); setSelectedOccasion(null)
    setIntensityLevel(null); setSelectedBrands([]); setSelectedRating(null)
    setMinPrice(''); setMaxPrice('')
  }

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true)
      const data = await getFragranceProducts()
      setAllProducts(formatProductsForUI(data))
      setLoading(false)
    }
    fetchProducts()
  }, [])

  useEffect(() => { setDisplayCount(10) }, [selectedTypes, selectedFamilies, selectedBrands, selectedRating, minPrice, maxPrice])

  if (loading) return <LoadingSpinner />

  const products = getFilteredAndSorted(allProducts, { selectedTypes, selectedFamilies, selectedBrands, selectedRating, minPrice, maxPrice, activeSort })
  const mobileProducts = products.slice(0, displayCount)

  const subcategoryCounts = allProducts.reduce((acc, p) => { if (p.subcategory) acc[p.subcategory] = (acc[p.subcategory] || 0) + 1; return acc }, {})
  const subcategoryCards = Object.entries(subcategoryCounts).map(([name, count]) => ({
    name, count,
    image: fragranceCategories.find(c => c.name === name)?.image || 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=80&h=80&fit=crop'
  })).sort((a, b) => a.name.localeCompare(b.name))

  return (
    <div className="w-full min-h-screen bg-white font-['Cormorant_Garamond']">

      {/* Hero */}
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

      {/* Category Cards */}
      <div className="bg-white px-4 py-5 overflow-x-auto border-b border-[#E8E3D9]" style={{ scrollbarWidth: 'none' }}>
        <div className="flex gap-3 w-max">
          {subcategoryCards.map((cat) => {
            const isSelected = selectedTypes.includes(cat.name)
            return (
              <div key={cat.name} onClick={() => setSelectedTypes(prev => isSelected ? prev.filter(c => c !== cat.name) : [...prev, cat.name])}
                className={`w-[130px] bg-white border-2 rounded-[12px] p-4 flex flex-col items-center gap-2 cursor-pointer transition-colors ${isSelected ? 'border-[#8B7355] bg-[#F5F1EA]' : 'border-[#E8E3D9] hover:border-[#C9A870]'}`}>
                <div className="w-[60px] h-[60px] rounded-full overflow-hidden bg-[#F9F6F2]">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                </div>
                <span className="text-[12px] font-medium text-[#1A1A1A] text-center leading-tight">{cat.name}</span>
                <span className="text-[11px] font-light text-[#999999]">{cat.count}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white px-5 pt-4 pb-3">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[13px] font-normal text-[#666666]">Showing {products.length} products</span>
          <button onClick={() => setShowFilterSheet(true)} className="relative flex items-center gap-2 h-9 px-4 border border-[#E8E3D9] rounded-full text-[13px] font-medium text-[#2B2B2B]">
            <IoFunnelOutline className="w-3.5 h-3.5 text-[#8B7355]" />
            Filters
            {activeFilters > 0 && <div className="absolute -top-2 -right-2 w-5 h-5 bg-[#8B7355] rounded-full flex items-center justify-center"><span className="text-[10px] font-medium text-white">{activeFilters}</span></div>}
          </button>
        </div>
        <button onClick={() => setShowSortSheet(true)} className="w-full h-12 px-4 bg-white border border-[#E8E3D9] rounded-[8px] flex items-center justify-between mb-2">
          <span className="text-[14px] font-normal text-[#2B2B2B]">Sort: {activeSort}</span>
          <IoChevronDown className="w-4 h-4 text-[#8B7355]" />
        </button>
      </div>

      {/* Product Grid */}
      <div className="px-4 pb-6">
        {products.length === 0 ? (
          <div className="flex items-center justify-center min-h-[300px]"><p className="text-[16px] text-[#666666]">No products found</p></div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {mobileProducts.map((product, idx) => (
              <Link key={idx} to={`/product/${product.id}`} className="bg-white rounded-[12px] border border-[#E8E3D9] overflow-hidden">
                <div className="relative h-[180px]">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  {product.badge && <div className="absolute top-2 left-2 px-2 py-0.5 bg-[#C9A870] text-white text-[9px] font-medium rounded-full">{product.badge}</div>}
                  <button className="absolute bottom-2 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <IoHeartOutline className="w-3.5 h-3.5 text-[#2B2B2B]" />
                  </button>
                </div>
                <div className="p-3">
                  <p className="text-[11px] font-light italic text-[#8B7355] mb-1">{product.brand}</p>
                  <h4 className="text-[13px] font-semibold text-[#1A1A1A] leading-tight mb-1 line-clamp-2">{product.name}</h4>
                  <p className="text-[11px] font-normal text-[#999999] mb-2">{product.description}</p>
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[15px] font-semibold text-[#1A1A1A]">${parseFloat(product.priceValue).toFixed(2)}</span>
                    <div className="flex items-center gap-0.5">{[...Array(5)].map((_, i) => <IoStarSharp key={i} className="w-[10px] h-[10px] text-[#C9A870]" />)}</div>
                  </div>
                  <p className="text-[10px] text-[#999999] mb-3">({product.reviews})</p>
                  <button className="w-full h-9 bg-[#8B7355] text-white text-[12px] font-medium rounded-[6px]">Add to Bag</button>
                </div>
              </Link>
            ))}
          </div>
        )}
        {products.length > displayCount && (
          <button onClick={() => setDisplayCount(prev => prev + 10)} className="w-full h-12 mt-5 border border-[#C9A870] text-[#8B7355] text-[14px] font-medium rounded-[8px]">
            Load More ({products.length - displayCount} remaining)
          </button>
        )}
      </div>

      {/* Newsletter */}
      <div className="bg-[#F5F0EB] px-5 py-10 text-center">
        <h3 className="text-[22px] font-semibold text-[#1A1A1A] mb-2">Discover Your Signature Scent</h3>
        <p className="text-[13px] font-normal text-[#666666] mb-5">Get personalized fragrance recommendations</p>
        <div className="flex gap-2">
          <input type="email" placeholder="Enter your email" className="flex-1 h-12 px-4 bg-white text-[13px] text-[#2B2B2B] rounded-[8px] border border-[#E8E3D9] outline-none" />
          <button className="h-12 px-5 bg-[#8B7355] text-white text-[13px] font-medium rounded-[8px]">Subscribe</button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#2B2B2B] px-5 pt-10 pb-8">
        <h3 className="text-[18px] font-semibold text-white tracking-[2px] mb-1">SHAN LORAY</h3>
        <p className="text-[12px] font-light italic text-[#C4B5A0] mb-8">Timeless Luxury Beauty</p>
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div><h4 className="text-[13px] font-medium text-white mb-3">Shop</h4><div className="space-y-2">{['Skincare','Makeup','Fragrance'].map(l => <p key={l} className="text-[12px] text-[#C4B5A0]">{l}</p>)}</div></div>
          <div><h4 className="text-[13px] font-medium text-white mb-3">Help</h4><div className="space-y-2">{['Contact','Shipping','Returns'].map(l => <p key={l} className="text-[12px] text-[#C4B5A0]">{l}</p>)}</div></div>
          <div><h4 className="text-[13px] font-medium text-white mb-3">About</h4><div className="space-y-2">{['Our Story','Ingredients','Sustainability'].map(l => <p key={l} className="text-[12px] text-[#C4B5A0]">{l}</p>)}</div></div>
        </div>
        <div className="flex justify-center gap-6 mb-6">
          <IoLogoInstagram className="w-6 h-6 text-white" /><IoLogoFacebook className="w-6 h-6 text-white" />
          <IoLogoPinterest className="w-6 h-6 text-white" /><IoLogoYoutube className="w-6 h-6 text-white" />
        </div>
        <div className="border-t border-[#3D3D3D] pt-5 text-center"><p className="text-[11px] text-[#808080]">©2024 Shan Loray. All rights reserved.</p></div>
      </footer>

      {/* Sort Sheet */}
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
                <button key={option} onClick={() => { setActiveSort(option); setShowSortSheet(false) }} className="w-full h-12 flex items-center justify-between px-4 rounded-[8px] hover:bg-[#FAF8F5]">
                  <span className={`text-[15px] ${activeSort === option ? 'font-medium text-[#8B7355]' : 'font-normal text-[#2B2B2B]'}`}>{option}</span>
                  {activeSort === option && <div className="w-5 h-5 rounded-full bg-[#8B7355] flex items-center justify-center"><svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div>}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Filter Sheet */}
      {showFilterSheet && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowFilterSheet(false)} />
          <div className="relative bg-white rounded-t-[20px] flex flex-col" style={{ maxHeight: '95vh' }}>
            <div className="min-h-[76px] px-5 py-5 flex items-center justify-between border-b border-[#E8E3D9] flex-shrink-0">
              <h2 className="text-[22px] font-semibold text-[#1A1A1A]">Filters</h2>
              <button onClick={() => setShowFilterSheet(false)} className="w-11 h-11 flex items-center justify-center"><IoClose className="w-6 h-6 text-[#8B7355]" /></button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-5">

              {/* Fragrance Type */}
              <div className="mb-6">
                <h3 className="text-[16px] font-semibold text-[#2B2B2B] mb-4">Fragrance Type</h3>
                <div className="grid grid-cols-2 gap-3">
                  {subcategoryCards.map((cat) => {
                    const isSel = selectedTypes.includes(cat.name)
                    return (
                      <button key={cat.name} onClick={() => toggle(selectedTypes, setSelectedTypes, cat.name)}
                        className={`rounded-[8px] p-3 flex flex-col items-center gap-2 border-2 transition-colors ${isSel ? 'border-[#8B7355] bg-[#FDFBF7]' : 'border-[#E8E3D9] bg-white'}`}>
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
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[16px] font-semibold text-[#2B2B2B]">Price Range</h3>
                  <span className="text-[14px] font-medium text-[#8B7355]">${minPrice || 0} – ${maxPrice || 500}</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="number" placeholder="Min" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="flex-1 h-[40px] px-3 border border-[#E8E3D9] rounded-[6px] text-[14px] outline-none" />
                  <span className="text-[14px] text-[#666666]">—</span>
                  <input type="number" placeholder="Max" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="flex-1 h-[40px] px-3 border border-[#E8E3D9] rounded-[6px] text-[14px] outline-none" />
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

              {/* Scent Notes */}
              <div className="mb-6">
                <h3 className="text-[16px] font-semibold text-[#2B2B2B] mb-4">Scent Notes</h3>
                {[{ label: 'Top Notes', key: 'top', notes: filterTopNotes, sel: selectedTopNotes, setSel: setSelectedTopNotes },
                  { label: 'Middle Notes', key: 'middle', notes: filterMiddleNotes, sel: selectedMiddleNotes, setSel: setSelectedMiddleNotes },
                  { label: 'Base Notes', key: 'base', notes: filterBaseNotes, sel: selectedBaseNotes, setSel: setSelectedBaseNotes }
                ].map(({ label, key, notes, sel, setSel }) => (
                  <div key={key} className="mb-2">
                    <button onClick={() => setExpandedNotes(p => ({ ...p, [key]: !p[key] }))} className="flex items-center justify-between w-full py-3 border-b border-[#E8E3D9]">
                      <span className="text-[14px] font-medium text-[#2B2B2B]">{label}</span>
                      {expandedNotes[key] ? <IoChevronUp className="w-5 h-5 text-[#8B7355]" /> : <IoChevronDown className="w-5 h-5 text-[#8B7355]" />}
                    </button>
                    {expandedNotes[key] && (
                      <div className="pt-3 space-y-3 pb-1">
                        {notes.map((note) => {
                          const isChecked = sel.includes(note)
                          return (
                            <button key={note} onClick={() => toggle(sel, setSel, note)} className="flex items-center gap-2.5 w-full">
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
                ))}
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

              {/* Intensity */}
              <div className="mb-6">
                <h3 className="text-[16px] font-semibold text-[#2B2B2B] mb-4">Intensity & Longevity</h3>
                <div className="flex gap-1 mb-2">
                  {filterIntensityLevels.map((level, idx) => (
                    <button key={level} onClick={() => setIntensityLevel(prev => prev === idx ? null : idx)}
                      className={`flex-1 h-2 rounded-sm transition-colors ${intensityLevel !== null && idx <= intensityLevel ? 'bg-[#C9A870]' : 'bg-[#F5F1EA]'}`} />
                  ))}
                </div>
                <div className="flex justify-between">
                  {filterIntensityLevels.map((level) => <span key={level} className="text-[11px] text-[#666666] text-center flex-1 leading-tight">{level}</span>)}
                </div>
              </div>
              <div className="w-full h-px bg-[#E8E3D9] mb-6" />

              {/* Brand */}
              <div className="mb-6">
                <h3 className="text-[16px] font-semibold text-[#2B2B2B] mb-4">Brand</h3>
                <div className="space-y-3">
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
              </div>
              <div className="w-full h-px bg-[#E8E3D9] mb-6" />

              {/* Rating */}
              <div className="mb-4">
                <h3 className="text-[16px] font-semibold text-[#2B2B2B] mb-4">Customer Rating</h3>
                <div className="space-y-3">
                  {filterRatings.map((r) => (
                    <button key={r.stars} onClick={() => setSelectedRating(prev => prev === r.stars ? null : r.stars)} className="flex items-center gap-2.5 w-full">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${selectedRating === r.stars ? 'border-[#C9A870]' : 'border-[#E8E3D9]'}`}>
                        {selectedRating === r.stars && <div className="w-2.5 h-2.5 bg-[#C9A870] rounded-full" />}
                      </div>
                      <div className="flex items-center gap-1.5">
                        {[...Array(5)].map((_, i) => <IoStarSharp key={i} className={`w-4 h-4 ${i < r.stars ? 'text-[#C9A870]' : 'text-[#E8E3D9]'}`} />)}
                        <span className="text-[13px] text-[#2B2B2B] ml-1">& up</span>
                        <span className="text-[13px] text-[#999999]">({r.count})</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-5 py-5 bg-white border-t border-[#E8E3D9] flex-shrink-0">
              <div className="flex items-center gap-3">
                <button onClick={clearAll} className="flex-1 min-h-[52px] bg-white border-2 border-[#E8E3D9] rounded-[10px] flex items-center justify-center">
                  <span className="text-[14px] font-medium text-[#8B7355]">Clear Filters</span>
                </button>
                <button onClick={() => setShowFilterSheet(false)} className="flex-1 min-h-[52px] bg-[#8B7355] rounded-[10px] flex items-center justify-center">
                  <span className="text-[14px] font-medium text-white">Apply Filters ({products.length})</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Desktop ───────────────────────────────────────────────────────────────────
function FragranceDesktop() {
  const [allProducts, setAllProducts] = useState([])
  const [loading, setLoading]         = useState(true)
  const [activeSort, setActiveSort]             = useState('Best Selling')
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const [selectedTypes, setSelectedTypes]         = useState([])
  const [selectedFamilies, setSelectedFamilies]   = useState([])
  const [selectedBrands, setSelectedBrands]       = useState([])
  const [selectedRating, setSelectedRating]       = useState(null)
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [displayCount, setDisplayCount]           = useState(10)

  const Stars = () => [...Array(5)].map((_, i) => <IoStarSharp key={i} className="w-[15px] h-[15px] text-[#C9A870]" />)

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true)
      const data = await getFragranceProducts()
      setAllProducts(formatProductsForUI(data))
      setLoading(false)
    }
    fetchProducts()
  }, [])

  useEffect(() => { setDisplayCount(10) }, [selectedTypes, selectedFamilies, selectedBrands, selectedRating, minPrice, maxPrice, activeSort])

  if (loading) return <LoadingSpinner />

  const activeFilters = selectedTypes.length + selectedFamilies.length + selectedBrands.length + (selectedRating ? 1 : 0) + (minPrice || maxPrice ? 1 : 0)
  const products = getFilteredAndSorted(allProducts, { selectedTypes, selectedFamilies, selectedBrands, selectedRating, minPrice, maxPrice, activeSort })
  const displayedProducts   = products.slice(0, displayCount)
  const largeProducts       = displayedProducts.slice(0, 1)
  const mediumProducts      = displayedProducts.slice(1, 3)
  const squareProducts      = displayedProducts.slice(3, 6)
  const rectangularProducts = displayedProducts.slice(6)

  return (
    <div className="bg-white font-['Cormorant_Garamond']">

      {/* Hero */}
      <div className="min-h-[300px] md:min-h-[380px] lg:min-h-[480px] bg-gradient-to-b from-[#FDFBF7] to-[#F5F1EA] relative overflow-hidden flex items-center px-6 md:px-[60px] lg:px-[120px]">
        <img src="https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=800&h=800&fit=crop" alt="" className="absolute top-0 right-0 w-[180px] md:w-[360px] lg:w-[500px] h-full object-cover opacity-15" />
        <div className="w-full max-w-[650px] relative z-10">
          <p className="text-[12px] md:text-[13px] lg:text-[14px] font-light italic text-[#8B7355] tracking-[2px] mb-3">SIGNATURE FRAGRANCES</p>
          <h1 className="text-[42px] md:text-[60px] lg:text-[80px] font-bold text-[#1A1A1A] leading-[1] mb-4 md:mb-5 lg:mb-6">Scent Stories</h1>
          <p className="text-[15px] md:text-[17px] lg:text-[20px] font-normal text-[#666666] mb-6 md:mb-7 lg:mb-8">Discover captivating fragrances crafted with rare botanicals</p>
          <div className="w-[100px] md:w-[120px] lg:w-[140px] h-[4px] bg-[#C9A870]" />
        </div>
        <div className="hidden lg:block absolute right-[180px] top-1/2 -translate-y-1/2">
          <img src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=400&fit=crop" alt="" className="w-[400px] h-[400px] object-cover rounded-[8px] shadow-[0_12px_48px_rgba(0,0,0,0.12)]" />
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="min-h-[48px] bg-[#FDFBF7] px-6 md:px-[60px] lg:px-[120px] flex items-center">
        <span className="text-[13px] lg:text-[15px] text-[#8B7355] cursor-pointer">Home</span><span className="text-[13px] lg:text-[15px] text-[#666666] mx-2">/</span>
        <span className="text-[13px] lg:text-[15px] text-[#8B7355] cursor-pointer">Shop</span><span className="text-[13px] lg:text-[15px] text-[#666666] mx-2">/</span>
        <span className="text-[13px] lg:text-[15px] text-[#666666]">Fragrance</span>
      </div>

      {/* Main Content */}
      <div className="px-6 md:px-[60px] lg:px-[120px] py-8 md:py-12 lg:py-[64px] flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-[48px]">

        {/* Sidebar */}
        <div className="hidden md:block w-full md:w-[220px] lg:w-[280px] flex-shrink-0">
          <div className="bg-white rounded-[16px] border border-[#E8E3D9] shadow-[0_8px_32px_rgba(0,0,0,0.08)] p-5 lg:p-[28px]">
            <div className="flex items-center justify-between mb-5 lg:mb-[24px]">
              <h3 className="text-[16px] lg:text-[18px] font-medium text-[#1A1A1A]">REFINE SELECTION</h3>
              {activeFilters > 0 && <span className="px-3 py-1 bg-[#8B7355] text-white text-[11px] font-semibold rounded-full">{activeFilters}</span>}
            </div>

            {/* Category pills */}
            <div className="space-y-[10px] lg:space-y-[12px] mb-6 lg:mb-[32px]">
              <div onClick={() => setSelectedTypes([])} className={`inline-flex items-center px-[16px] lg:px-[20px] py-[8px] lg:py-[10px] text-[13px] lg:text-[14px] font-medium rounded-full cursor-pointer ${selectedTypes.length === 0 ? 'bg-[#8B7355] text-white' : 'bg-[#F5F1EA] text-[#3D3D3D]'}`}>All Fragrances</div>
              {fragranceCategoryLabels.slice(1).map((cat) => {
                const isSelected = selectedTypes.includes(cat)
                return (
                  <div key={cat} onClick={() => setSelectedTypes(prev => isSelected ? prev.filter(c => c !== cat) : [...prev, cat])}
                    className={`inline-flex items-center px-[16px] lg:px-[20px] py-[8px] lg:py-[10px] text-[13px] lg:text-[14px] font-medium rounded-full cursor-pointer ${isSelected ? 'bg-[#8B7355] text-white' : 'bg-[#F5F1EA] text-[#3D3D3D]'}`}>
                    {cat}
                  </div>
                )
              })}
            </div>

            <div className="border-t border-[#E8E3D9] pt-5 lg:pt-[24px] space-y-4 lg:space-y-[20px]">

              {/* Price Range */}
              <div>
                <h4 className="text-[14px] lg:text-[15px] font-medium text-[#1A1A1A] mb-3 lg:mb-[12px]">Price Range</h4>
                <div className="flex items-center gap-[6px] lg:gap-[8px]">
                  <input type="number" placeholder="$0" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="w-[80px] lg:w-[100px] h-[34px] lg:h-[36px] px-3 border border-[#E8E3D9] rounded-[6px] text-[13px] lg:text-[14px] outline-none" />
                  <span className="text-[13px] lg:text-[14px] text-[#666666]">—</span>
                  <input type="number" placeholder="$500" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="w-[80px] lg:w-[100px] h-[34px] lg:h-[36px] px-3 border border-[#E8E3D9] rounded-[6px] text-[13px] lg:text-[14px] outline-none" />
                </div>
              </div>

              {/* Fragrance Family */}
              <div>
                <h4 className="text-[14px] lg:text-[15px] font-medium text-[#1A1A1A] mb-3 lg:mb-[12px]">Fragrance Family</h4>
                <div className="space-y-[6px] lg:space-y-[8px]">
                  {fragranceFamilies.map((item) => {
                    const isChecked = selectedFamilies.includes(item)
                    return (
                      <label key={item} onClick={() => setSelectedFamilies(prev => isChecked ? prev.filter(f => f !== item) : [...prev, item])} className="flex items-center gap-[10px] cursor-pointer">
                        <div className={`w-[15px] h-[15px] lg:w-[16px] lg:h-[16px] border-[2px] rounded-[2px] flex items-center justify-center flex-shrink-0 ${isChecked ? 'bg-[#C9A870] border-[#C9A870]' : 'border-[#C9A870]'}`}>
                          {isChecked && <IoCheckmark className="w-[11px] h-[11px] text-white" />}
                        </div>
                        <span className="text-[13px] lg:text-[14px] text-[#3D3D3D]">{item}</span>
                      </label>
                    )
                  })}
                </div>
              </div>

              {/* Top Notes */}
              <div>
                <h4 className="text-[14px] lg:text-[15px] font-medium text-[#1A1A1A] mb-3 lg:mb-[12px]">Top Notes</h4>
                <div className="space-y-[6px] lg:space-y-[8px]">
                  {topNotes.map((item) => (
                    <label key={item} className="flex items-center gap-[10px] cursor-pointer">
                      <div className="w-[15px] h-[15px] lg:w-[16px] lg:h-[16px] border-[2px] border-[#C9A870] rounded-[2px] flex-shrink-0" />
                      <span className="text-[13px] lg:text-[14px] text-[#3D3D3D]">{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Intensity */}
              <div>
                <h4 className="text-[14px] lg:text-[15px] font-medium text-[#1A1A1A] mb-3 lg:mb-[12px]">Intensity</h4>
                <div className="space-y-[6px] lg:space-y-[8px]">
                  {intensityLevels.map((level) => (
                    <label key={level} className="flex items-center gap-[10px] cursor-pointer">
                      <div className="w-[15px] h-[15px] lg:w-[16px] lg:h-[16px] border-[2px] border-[#C9A870] rounded-full flex-shrink-0" />
                      <span className="text-[13px] lg:text-[14px] text-[#3D3D3D]">{level}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <h4 className="text-[14px] lg:text-[15px] font-medium text-[#1A1A1A] mb-3 lg:mb-[12px]">Size</h4>
                <div className="space-y-[6px] lg:space-y-[8px]">
                  {productSizes.map((size) => (
                    <label key={size} className="flex items-center gap-[10px] cursor-pointer">
                      <div className="w-[15px] h-[15px] lg:w-[16px] lg:h-[16px] border-[2px] border-[#C9A870] rounded-[2px] flex-shrink-0" />
                      <span className="text-[13px] lg:text-[14px] text-[#3D3D3D]">{size}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button onClick={() => { setSelectedTypes([]); setSelectedFamilies([]); setSelectedBrands([]); setSelectedRating(null); setMinPrice(''); setMaxPrice(''); setDisplayCount(10) }}
                className="w-full h-[44px] lg:h-[48px] bg-white border-2 border-[#8B7355] text-[#8B7355] text-[14px] lg:text-[15px] font-medium rounded-[8px] hover:bg-[#F5F1EA] transition-colors">
                Clear All Filters
              </button>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1 min-w-0">

          {/* Toolbar */}
          <div className="flex items-center justify-between mb-8 md:mb-10 lg:mb-[48px]">
            <span className="text-[13px] md:text-[14px] lg:text-[15px] text-[#666666]">Showing {products.length} fragrance products</span>
            <div className="flex items-center gap-3 lg:gap-[16px]">
              <span className="hidden md:inline text-[14px] lg:text-[15px] text-[#666666]">Sort by:</span>
              <div className="relative">
                <button onClick={() => setShowSortDropdown(!showSortDropdown)} className="w-[180px] md:w-[200px] lg:w-[240px] min-h-[44px] lg:min-h-[48px] px-4 bg-white border border-[#E8E3D9] rounded-[8px] flex items-center justify-between cursor-pointer hover:border-[#C9A870] transition-all">
                  <span className="text-[13px] md:text-[14px] lg:text-[15px] font-medium text-[#2B2B2B]">{activeSort}</span>
                  <IoChevronDown className="w-[16px] h-[16px] lg:w-[18px] lg:h-[18px] text-[#8B7355]" />
                </button>
                {showSortDropdown && (
                  <div className="absolute top-full mt-2 right-0 w-[240px] bg-white border border-[#E8E3D9] rounded-[8px] shadow-lg z-10">
                    {sortOptions.map((option) => (
                      <button key={option} onClick={() => { setActiveSort(option); setShowSortDropdown(false) }} className={`w-full px-4 py-3 text-left text-[14px] hover:bg-[#F5F1EA] transition-colors ${activeSort === option ? 'text-[#8B7355] font-medium' : 'text-[#2B2B2B]'}`}>{option}</button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {products.length === 0 ? (
            <div className="flex items-center justify-center min-h-[400px]"><p className="text-[16px] text-[#666666]">No products found</p></div>
          ) : (
            <>
              {/* Row 1 */}
              {largeProducts.length > 0 && (
                <div className="flex flex-col md:flex-row gap-5 mb-10 md:mb-12 lg:mb-[48px]">
                  <Link to={`/product/${largeProducts[0].id}`} className="w-full md:w-[300px] lg:w-[460px] md:h-[480px] lg:h-[560px] bg-white rounded-[12px] overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)] group cursor-pointer hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] transition-all duration-300">
                    <div className="relative w-full h-[260px] md:h-[300px] lg:h-[380px]">
                      <img src={largeProducts[0].image} alt={largeProducts[0].name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      {largeProducts[0].badge && <div className="absolute top-[16px] right-[16px] lg:top-[20px] lg:right-[20px] px-[14px] lg:px-[16px] py-[7px] lg:py-[8px] bg-[#C9A870] text-white text-[11px] lg:text-[12px] font-medium rounded-full">{largeProducts[0].badge}</div>}
                      <div className="absolute bottom-0 left-0 right-0 h-[160px] bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-[24px] text-white">
                        <p className="text-[14px] lg:text-[17px] mb-1 lg:mb-2">{largeProducts[0].description}</p>
                        <h3 className="text-[20px] lg:text-[28px] font-medium mb-2 lg:mb-3">{largeProducts[0].name}</h3>
                        <p className="text-[20px] lg:text-[24px] font-semibold">${parseFloat(largeProducts[0].priceValue).toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="p-5 lg:p-[24px]">
                      <p className="text-[12px] lg:text-[13px] font-light italic text-[#8B7355] tracking-[1.2px] mb-2">{largeProducts[0].brand}</p>
                      <div className="flex items-center gap-[6px]"><Stars /><span className="text-[13px] text-[#999999] ml-1">({largeProducts[0].reviews})</span></div>
                    </div>
                  </Link>
                  <div className="flex-1 flex flex-col gap-4 lg:gap-[20px]">
                    {mediumProducts.map((product, idx) => (
                      <Link key={idx} to={`/product/${product.id}`} className="w-full h-[160px] md:h-[220px] lg:h-[270px] bg-white rounded-[12px] overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)] group cursor-pointer hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] transition-all duration-300 flex">
                        <div className="w-[140px] md:w-[180px] lg:w-[280px] h-full relative overflow-hidden flex-shrink-0">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          <div className="absolute top-[12px] left-[12px] lg:top-[16px] lg:left-[16px] flex gap-[6px] lg:gap-[8px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="w-[34px] h-[34px] lg:w-[40px] lg:h-[40px] bg-white rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.15)]"><IoHeartOutline className="w-[16px] h-[16px] lg:w-[20px] lg:h-[20px] text-[#2B2B2B]" /></div>
                            <div className="w-[34px] h-[34px] lg:w-[40px] lg:h-[40px] bg-white rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.15)]"><IoEyeOutline className="w-[16px] h-[16px] lg:w-[20px] lg:h-[20px] text-[#2B2B2B]" /></div>
                          </div>
                        </div>
                        <div className="flex-1 p-4 lg:p-[24px] flex flex-col justify-center min-w-0">
                          <p className="text-[11px] lg:text-[13px] font-light italic text-[#8B7355] tracking-[1.2px] mb-1 lg:mb-2">{product.brand}</p>
                          <h4 className="text-[15px] md:text-[17px] lg:text-[20px] font-medium text-[#2B2B2B] leading-[1.2] mb-1 lg:mb-2">{product.name}</h4>
                          <p className="text-[12px] lg:text-[15px] text-[#999999] mb-2 line-clamp-2">{product.description}</p>
                          <p className="text-[16px] md:text-[17px] lg:text-[19px] font-semibold text-[#1A1A1A] mb-2 lg:mb-3">${parseFloat(product.priceValue).toFixed(2)}</p>
                          <div className="flex items-center gap-[6px]"><Stars /><span className="text-[12px] lg:text-[13px] text-[#999999] ml-1">({product.reviews})</span></div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Row 2 */}
              {squareProducts.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-[20px] mb-10 md:mb-12 lg:mb-[48px]">
                  {squareProducts.map((product, idx) => (
                    <Link key={idx} to={`/product/${product.id}`} className="group cursor-pointer">
                      <div className="relative w-full aspect-square rounded-[12px] overflow-hidden mb-3 lg:mb-[16px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] transition-all duration-300">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute top-[12px] right-[12px] lg:top-[16px] lg:right-[16px] flex flex-col gap-[6px] lg:gap-[8px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-[34px] h-[34px] lg:w-[40px] lg:h-[40px] bg-white rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.15)]"><IoHeartOutline className="w-[16px] h-[16px] lg:w-[20px] lg:h-[20px] text-[#2B2B2B]" /></div>
                          <div className="w-[34px] h-[34px] lg:w-[40px] lg:h-[40px] bg-white rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.15)]"><IoEyeOutline className="w-[16px] h-[16px] lg:w-[20px] lg:h-[20px] text-[#2B2B2B]" /></div>
                        </div>
                      </div>
                      <p className="text-[11px] lg:text-[13px] font-light italic text-[#8B7355] tracking-[1.2px] mb-1 lg:mb-2">{product.brand}</p>
                      <h4 className="text-[15px] md:text-[17px] lg:text-[20px] font-medium text-[#2B2B2B] leading-[1.2] mb-1 lg:mb-2">{product.name}</h4>
                      <p className="text-[12px] lg:text-[15px] text-[#999999] mb-1 lg:mb-2">{product.description}</p>
                      <p className="text-[16px] md:text-[17px] lg:text-[19px] font-semibold text-[#1A1A1A] mb-1 lg:mb-2">${parseFloat(product.priceValue).toFixed(2)}</p>
                      <div className="flex items-center gap-[6px]"><Stars /><span className="text-[12px] lg:text-[13px] text-[#999999] ml-1">({product.reviews})</span></div>
                    </Link>
                  ))}
                </div>
              )}

              {/* Row 3 */}
              {rectangularProducts.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-[20px] mb-10 md:mb-16 lg:mb-[96px]">
                  {rectangularProducts.map((product, idx) => (
                    <Link key={idx} to={`/product/${product.id}`} className="w-full bg-white rounded-[12px] overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)] group cursor-pointer hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] transition-all duration-300">
                      <div className="relative w-full h-[200px] md:h-[220px] lg:h-[280px] overflow-hidden">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                          <div className="w-[48px] h-[48px] lg:w-[56px] lg:h-[56px] bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.2)]"><IoEyeOutline className="w-[24px] h-[24px] lg:w-[28px] lg:h-[28px] text-[#2B2B2B]" /></div>
                        </div>
                      </div>
                      <div className="p-4 lg:p-[24px]">
                        <p className="text-[11px] lg:text-[13px] font-light italic text-[#8B7355] tracking-[1.2px] mb-1 lg:mb-2">{product.brand}</p>
                        <h4 className="text-[17px] md:text-[19px] lg:text-[22px] font-medium text-[#2B2B2B] leading-[1.2] mb-1 lg:mb-2">{product.name}</h4>
                        <p className="text-[12px] lg:text-[15px] text-[#999999] mb-2 lg:mb-3">{product.description}</p>
                        <div className="flex items-center justify-between">
                          <p className="text-[18px] md:text-[20px] lg:text-[22px] font-semibold text-[#1A1A1A]">${parseFloat(product.priceValue).toFixed(2)}</p>
                          <div className="flex items-center gap-[6px]"><Stars /><span className="text-[12px] lg:text-[13px] text-[#999999] ml-1">({product.reviews})</span></div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* Load More */}
              {products.length > displayCount && (
                <div className="flex items-center justify-center mb-16 lg:mb-[96px]">
                  <button onClick={() => setDisplayCount(prev => prev + 10)} className="h-[52px] px-[48px] bg-[#8B7355] text-white text-[15px] lg:text-[16px] font-medium rounded-[8px] hover:bg-[#6F5A42] transition-colors">
                    Load More ({products.length - displayCount} remaining)
                  </button>
                </div>
              )}

              {/* Newsletter */}
              <div className="bg-[#F5F1EA] rounded-[16px] flex flex-col items-center justify-center px-6 md:px-10 lg:px-[64px] py-10 lg:py-0 lg:min-h-[140px] mb-12 lg:mb-[96px]">
                <h3 className="text-[22px] md:text-[26px] lg:text-[32px] font-medium text-[#1A1A1A] mb-2 text-center">Discover Your Signature Scent</h3>
                <p className="text-[13px] md:text-[14px] lg:text-[16px] text-[#666666] mb-6 text-center">Get personalized fragrance recommendations</p>
                <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
                  <input type="email" placeholder="Enter your email" className="w-full md:w-[300px] lg:w-[360px] h-[52px] lg:h-[56px] px-5 bg-white text-[14px] lg:text-[15px] text-[#2B2B2B] rounded-[8px] border border-[#E8E3D9] outline-none" />
                  <button className="w-full md:w-auto h-[52px] lg:h-[56px] px-8 lg:px-[32px] bg-[#8B7355] text-white text-[14px] lg:text-[15px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">Subscribe</button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Main Export ───────────────────────────────────────────────────────────────
export default function Fragrance() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640)
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return isMobile ? <FragranceMobile /> : <FragranceDesktop />
}