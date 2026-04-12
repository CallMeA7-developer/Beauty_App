import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useSearchParams } from 'react-router-dom'
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

import {
  skincareCategories,
  filterSkinTypes,
  filterSkinConcerns,
  filterIngredients,
  filterBrandsAll,
  filterRatingsSkincare,
  sortOptionsSkincare,
} from '../data/products'

import { getSkincareProducts, formatProductsForUI } from '../lib/productsService'
import LoadingSpinner from '../components/LoadingSpinner'

// ─── Local filter-only data (skincare-specific, not shared) ───────────────────
const brandValues = ['Vegan', 'Cruelty-Free', 'Fragrance-Free', 'Organic']

// These are used in the desktop sidebar filter panel
const skinTypes    = filterSkinTypes
const skinConcerns = filterSkinConcerns
const ingredients  = filterIngredients

// Aliases to keep template variable names unchanged
const mobileCategoryCards  = skincareCategories
const filterCategories     = skincareCategories
const filterConcerns       = filterSkinConcerns
const filterBrands         = filterBrandsAll
const filterRatings        = filterRatingsSkincare
const sortOptions          = sortOptionsSkincare

// ─── Live Search with Suggestions ────────────────────────────────────────────
function SearchWithSuggestions({ allProducts, searchQuery, setSearchQuery, placeholder, className }) {
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const wrapperRef = useRef(null)

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const matches = allProducts
        .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .slice(0, 6)
      setSuggestions(matches)
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [searchQuery, allProducts])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (name) => {
    setSearchQuery(name)
    setShowSuggestions(false)
  }

  const highlightMatch = (text, query) => {
    const parts = text.split(new RegExp(`(${query})`, 'gi'))
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase()
        ? <span key={i} className="font-semibold text-[#8B7355]">{part}</span>
        : part
    )
  }

  return (
    <div ref={wrapperRef} className={`relative ${className || ''}`}>
      <div className="w-full h-[52px] bg-[#F5F1EA] rounded-[8px] px-4 flex items-center">
        <IoSearchOutline className="w-[20px] h-[20px] text-[#999999] mr-3 flex-shrink-0" />
        <input
          type="text"
          placeholder={placeholder || 'Search products...'}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true) }}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setShowSuggestions(false)
            if (e.key === 'Enter' && suggestions.length > 0) handleSelect(suggestions[0].name)
          }}
          className="flex-1 bg-transparent text-[15px] text-[#2B2B2B] outline-none"
        />
        {searchQuery && (
          <button onClick={() => { setSearchQuery(''); setShowSuggestions(false) }}>
            <IoClose className="w-[16px] h-[16px] text-[#999999] hover:text-[#666666]" />
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E8E3D9] rounded-[8px] shadow-[0_8px_24px_rgba(0,0,0,0.12)] z-50 overflow-hidden">
          {suggestions.map((product, idx) => (
            <button
              key={product.id || idx}
              onClick={() => handleSelect(product.name)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#FDFBF7] transition-colors text-left border-b border-[#F5F1EA] last:border-b-0"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-[40px] h-[40px] rounded-[6px] object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-[14px] text-[#1A1A1A] leading-tight">
                  {highlightMatch(product.name, searchQuery)}
                </p>
                <p className="text-[12px] text-[#8B7355] mt-0.5">{product.price}</p>
              </div>
              <IoSearchOutline className="w-[14px] h-[14px] text-[#999999] flex-shrink-0" />
            </button>
          ))}
        </div>
      )}

      {/* No results */}
      {showSuggestions && searchQuery.trim().length > 0 && suggestions.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E8E3D9] rounded-[8px] shadow-[0_8px_24px_rgba(0,0,0,0.12)] z-50 px-4 py-3">
          <p className="text-[13px] text-[#999999]">No products found for "{searchQuery}"</p>
        </div>
      )}
    </div>
  )
}

// ─── Mobile ───────────────────────────────────────────────────────────────────
function SkinCareMobile() {
  const { t } = useTranslation()
  const [allProducts, setAllProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeSort, setActiveSort]           = useState('Recommended')
  const [showSortSheet, setShowSortSheet]     = useState(false)
  const [showFilterSheet, setShowFilterSheet] = useState(false)
  const [selectedSubcategories, setSelectedSubcategories] = useState([])
  const [selectedSkinTypes, setSelectedSkinTypes]   = useState([])
  const [selectedConcerns, setSelectedConcerns]     = useState([])
  const [selectedIngredients, setSelectedIngredients] = useState([])
  const [selectedBrands, setSelectedBrands]         = useState([])
  const [selectedRating, setSelectedRating]         = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [displayCount, setDisplayCount] = useState(10)

  const [searchParams] = useSearchParams()

  const activeFilters = selectedSubcategories.length + selectedSkinTypes.length + selectedConcerns.length + selectedIngredients.length + selectedBrands.length + (selectedRating ? 1 : 0) + (minPrice || maxPrice ? 1 : 0)

  useEffect(() => {
    const sub = searchParams.get('subcategory')
    if (sub) setSelectedSubcategories([sub])
    const skinType = searchParams.get('skinType')
    if (skinType) setSelectedSkinTypes([skinType])
    const concern = searchParams.get('concern')
    if (concern) setSelectedConcerns([concern])
    const ingredient = searchParams.get('ingredient')
    if (ingredient) setSelectedIngredients([ingredient])
    const brand = searchParams.get('brand')
    if (brand) setSelectedBrands([brand])
  }, [])

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true)
      const data = await getSkincareProducts()
      setAllProducts(formatProductsForUI(data))
      setLoading(false)
    }
    fetchProducts()
  }, [])

  useEffect(() => {
    setDisplayCount(10)
  }, [selectedSubcategories, selectedSkinTypes, selectedConcerns, selectedIngredients, selectedBrands, selectedRating, minPrice, maxPrice, searchQuery])

  const getFilteredAndSortedProducts = () => {
    let filtered = [...allProducts]

    if (searchQuery.trim()) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (minPrice || maxPrice) {
      const min = minPrice ? parseFloat(minPrice) : 0
      const max = maxPrice ? parseFloat(maxPrice) : Infinity
      filtered = filtered.filter(p => p.priceValue >= min && p.priceValue <= max)
    }

    if (selectedSubcategories.length > 0) {
      filtered = filtered.filter(p => selectedSubcategories.includes(p.subcategory))
    }

    if (selectedSkinTypes.length > 0) {
      filtered = filtered.filter(p =>
        p.skin_types && selectedSkinTypes.every(type => p.skin_types.includes(type))
      )
    }

    if (selectedConcerns.length > 0) {
      filtered = filtered.filter(p =>
        p.skin_concerns && selectedConcerns.every(concern => p.skin_concerns.includes(concern))
      )
    }

    if (selectedIngredients.length > 0) {
      filtered = filtered.filter(p =>
        p.ingredients && selectedIngredients.every(ingredient => p.ingredients.includes(ingredient))
      )
    }

    if (selectedBrands.length > 0) {
      filtered = filtered.filter(p => selectedBrands.includes(p.brand))
    }

    if (selectedRating) {
      filtered = filtered.filter(p => p.rating >= selectedRating)
    }

    if (activeSort === 'Price: Low to High') {
      filtered.sort((a, b) => a.priceValue - b.priceValue)
    } else if (activeSort === 'Price: High to Low') {
      filtered.sort((a, b) => b.priceValue - a.priceValue)
    } else if (activeSort === 'Best Selling') {
      filtered.sort((a, b) => b.reviews - a.reviews)
    } else if (activeSort === 'Newest') {
      filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    } else if (activeSort === 'Top Rated') {
      filtered.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
    }

    return filtered
  }

  if (loading) {
    return <LoadingSpinner />
  }

  // Generate dynamic subcategory cards from actual products
  const subcategoryCounts = allProducts.reduce((acc, product) => {
    if (product.subcategory) {
      acc[product.subcategory] = (acc[product.subcategory] || 0) + 1
    }
    return acc
  }, {})

  const subcategoryCards = Object.entries(subcategoryCounts).map(([name, count]) => ({
    name,
    count,
    image: skincareCategories.find(c => c.name === name)?.image || 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=80&h=80&fit=crop'
  })).sort((a, b) => a.name.localeCompare(b.name))

  const products = getFilteredAndSortedProducts()
  const mobileProducts = products.slice(0, displayCount)

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
          <p className="text-[10px] font-light italic text-[#8B7355] tracking-[2px] mb-3">{t('skincare.scienceMeetsNature')}</p>
          <h1 className="text-[36px] font-bold text-[#1A1A1A] leading-[1.05] mb-3">title</h1>
          <p className="text-[13px] font-normal text-[#666666] mb-4">{t('skincare.subtitle')}</p>
          <div className="w-[48px] h-[2px] bg-[#C9A870]" />
        </div>
      </div>

      {/* ── Subcategory Cards ── */}
      <div className="bg-white px-4 py-5 overflow-x-auto border-b border-[#E8E3D9]" style={{ scrollbarWidth: 'none' }}>
        <div className="flex gap-3 w-max">
          {subcategoryCards.map((cat) => {
            const isSelected = selectedSubcategories.includes(cat.name)
            return (
              <div
                key={cat.name}
                onClick={() => {
                  setSelectedSubcategories(prev => isSelected ? prev.filter(c => c !== cat.name) : [...prev, cat.name])
                }}
                className={`w-[120px] bg-white border-2 rounded-[12px] p-4 flex flex-col items-center gap-2 cursor-pointer transition-colors ${isSelected ? 'border-[#8B7355] bg-[#F5F1EA]' : 'border-[#E8E3D9] hover:border-[#C9A870]'}`}
              >
                <div className="w-[60px] h-[60px] rounded-full overflow-hidden bg-[#F9F6F2]">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                </div>
                <span className="text-[13px] font-medium text-[#1A1A1A] text-center">{cat.name}</span>
                <span className="text-[11px] font-light text-[#999999]">{cat.count}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Toolbar ── */}
      <div className="bg-white px-5 pt-4 pb-3">
        <SearchWithSuggestions
          allProducts={allProducts}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          placeholder={t('skincare.searchPlaceholder')}
          className="mb-3"
        />
        <div className="flex items-center justify-between mb-3">
          <span className="text-[13px] font-normal text-[#666666]">{t('skincare.showing')} {products.length} {t('skincare.products')}</span>
          <button
            onClick={() => setShowFilterSheet(true)}
            className="relative flex items-center gap-2 h-9 px-4 border border-[#E8E3D9] rounded-full text-[13px] font-medium text-[#2B2B2B]"
          >
            <IoFunnelOutline className="w-3.5 h-3.5 text-[#8B7355]" />
            {t('skincare.filters')}
            {activeFilters > 0 && (
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-[#8B7355] rounded-full flex items-center justify-center">
                <span className="text-[10px] font-medium text-white">{activeFilters}</span>
              </div>
            )}
          </button>
        </div>
        {/* Sort dropdown */}
        <button
          onClick={() => setShowSortSheet(true)}
          className="w-full h-12 px-4 bg-white border border-[#E8E3D9] rounded-[8px] flex items-center justify-between mb-2"
        >
          <span className="text-[14px] font-normal text-[#2B2B2B]">{t('skincare.sortBy')} {activeSort}</span>
          <IoChevronDown className="w-4 h-4 text-[#8B7355]" />
        </button>
      </div>

      {/* ── Product Grid ── */}
      <div className="px-4 pb-6">
        {products.length === 0 ? (
          <div className="flex items-center justify-center min-h-[300px]">
            <p className="text-[16px] text-[#666666]">{t('skincare.noProducts')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
          {mobileProducts.map((product, idx) => (
            <Link key={idx} to={`/product/${product.id}`} className="bg-white rounded-[12px] border border-[#E8E3D9] overflow-hidden">
              <div className="relative h-[180px]">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                <button className="absolute top-2.5 right-2.5 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <IoHeartOutline className="w-4 h-4 text-[#2B2B2B]" />
                </button>
              </div>
              <div className="p-3">
                <p className="text-[11px] font-light italic text-[#8B7355] mb-1">{product.brand}</p>
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
                  {t('skincare.addToBag')}
                </button>
              </div>
            </Link>
          ))}
        </div>
        )}

        {products.length > displayCount && (
          <button
            onClick={() => setDisplayCount(prev => prev + 10)}
            className="w-full h-12 mt-5 border border-[#C9A870] text-[#8B7355] text-[14px] font-medium rounded-[8px]"
          >
            {t('skincare.loadMore')} ({products.length - displayCount} {t('skincare.remaining')})
          </button>
        )}
      </div>

      {/* ── Newsletter ── */}
      <div className="bg-[#F5F0EB] px-5 py-10 text-center">
        <h3 className="text-[24px] font-semibold text-[#1A1A1A] mb-2">{t('skincare.newsletter')}</h3>
        <p className="text-[14px] font-normal text-[#666666] mb-5">{t('skincare.newsletterDesc')}</p>
        <div className="flex gap-2">
          <input type="email" placeholder={t('skincare.emailPlaceholder')} className="flex-1 h-12 px-4 bg-white text-[13px] text-[#2B2B2B] rounded-[8px] border border-[#E8E3D9] outline-none" />
          <button className="h-12 px-5 bg-[#8B7355] text-white text-[13px] font-medium rounded-[8px]">{t('skincare.subscribe')}</button>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="bg-[#2B2B2B] px-5 pt-10 pb-8">
        <h3 className="text-[18px] font-semibold text-white tracking-[2px] mb-1">SHAN LORAY</h3>
        <p className="text-[12px] font-light italic text-[#C4B5A0] mb-8">{t('skincare.timelessLuxury')}</p>
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div>
            <h4 className="text-[13px] font-medium text-white mb-3">{t('skincare.footerShop')}</h4>
            <div className="space-y-2">{[t('skincare.title'), 'Makeup', 'Fragrance'].map((l) => <p key={l} className="text-[12px] text-[#C4B5A0]">{l}</p>)}</div>
          </div>
          <div>
            <h4 className="text-[13px] font-medium text-white mb-3">{t('skincare.footerHelp')}</h4>
            <div className="space-y-2">{[t('skincare.contact'), t('skincare.shipping'), t('skincare.returns')].map((l) => <p key={l} className="text-[12px] text-[#C4B5A0]">{l}</p>)}</div>
          </div>
          <div>
            <h4 className="text-[13px] font-medium text-white mb-3">{t('skincare.footerAbout')}</h4>
            <div className="space-y-2">{[t('skincare.ourStory'), t('skincare.ingredientsLink'), t('skincare.sustainability')].map((l) => <p key={l} className="text-[12px] text-[#C4B5A0]">{l}</p>)}</div>
          </div>
        </div>
        <div className="flex justify-center gap-6 mb-6">
          <IoLogoInstagram className="w-6 h-6 text-white" />
          <IoLogoFacebook  className="w-6 h-6 text-white" />
          <IoLogoPinterest className="w-6 h-6 text-white" />
          <IoLogoYoutube   className="w-6 h-6 text-white" />
        </div>
        <div className="border-t border-[#3D3D3D] pt-5 text-center">
          <p className="text-[11px] text-[#808080]">{t('skincare.copyright')}</p>
        </div>
      </footer>

      {/* ── Sort Sheet ── */}
      {showSortSheet && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowSortSheet(false)} />
          <div className="relative bg-white rounded-t-[20px] px-5 pt-5 pb-8">
            <div className="w-10 h-1 bg-[#E8E3D9] rounded-full mx-auto mb-5" />
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[18px] font-semibold text-[#1A1A1A]">sortBy</h3>
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
                <h2 className="text-[22px] font-semibold text-[#1A1A1A]">{t('skincare.filters')}</h2>
                {activeFilters > 0 && (
                  <div className="w-[22px] h-[22px] bg-[#C9A870] rounded-full flex items-center justify-center">
                    <span className="text-[11px] font-semibold text-white">{activeFilters}</span>
                  </div>
                )}
              </div>
              <button onClick={() => setShowFilterSheet(false)}>
                <IoClose className="w-6 h-6 text-[#2B2B2B]" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto flex-1">

              {/* Subcategory */}
              <div className="px-5 py-5 border-b border-[#E8E3D9]">
                <h3 className="text-[16px] font-medium text-[#2B2B2B] mb-4">{t('skincare.productCategory')}</h3>
                <div className="grid grid-cols-3 gap-3">
                  {subcategoryCards.map((cat) => {
                    const isSelected = selectedSubcategories.includes(cat.name)
                    return (
                      <button
                        key={cat.name}
                        onClick={() => {
                          setSelectedSubcategories(prev => isSelected ? prev.filter(c => c !== cat.name) : [...prev, cat.name])
                        }}
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
                  <span className="text-[14px] font-medium text-[#8B7355]">${minPrice || 0} – ${maxPrice || 500}</span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="flex-1 h-[40px] px-3 border border-[#E8E3D9] rounded-[6px] text-[14px] outline-none"
                  />
                  <span className="text-[14px] text-[#666666]">—</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="flex-1 h-[40px] px-3 border border-[#E8E3D9] rounded-[6px] text-[14px] outline-none"
                  />
                </div>
              </div>

              {/* Skin Type */}
              <div className="px-5 py-5 border-b border-[#E8E3D9]">
                <h3 className="text-[16px] font-medium text-[#2B2B2B] mb-4">skinType</h3>
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
                <h3 className="text-[16px] font-medium text-[#2B2B2B] mb-4">skinConcerns</h3>
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
                <h3 className="text-[16px] font-medium text-[#2B2B2B] mb-4">{t('skincare.ingredients')}</h3>
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
                <h3 className="text-[16px] font-medium text-[#2B2B2B] mb-4">{t('skincare.brand')}</h3>
                <div className="w-full h-[44px] bg-[#F5F1EA] rounded-[8px] px-4 flex items-center mb-4">
                  <IoSearchOutline className="w-[16px] h-[16px] text-[#999999] mr-2 flex-shrink-0" />
                  <input type="text" placeholder={t('skincare.searchBrands')} className="flex-1 bg-transparent text-[14px] text-[#2B2B2B] outline-none" />
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
                <h3 className="text-[16px] font-medium text-[#2B2B2B] mb-4">{t('skincare.rating')}</h3>
                <div className="space-y-2">
                  {filterRatings.map((r) => (
                    <button key={r.stars} onClick={() => setSelectedRating(prev => prev === r.stars ? null : r.stars)}
                      className={`flex items-center justify-between w-full h-[36px] px-3 rounded-[4px] transition-colors ${selectedRating === r.stars ? 'bg-[#FDFBF7]' : ''}`}>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                          {[...Array(r.stars)].map((_, i) => <IoStarSharp key={i} className="w-[14px] h-[14px] text-[#C9A870]" />)}
                        </div>
                        <span className="text-[13px] text-[#2B2B2B]">{t('skincare.andUp')}</span>
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
                onClick={() => { setSelectedSubcategories([]); setSelectedSkinTypes([]); setSelectedConcerns([]); setSelectedIngredients([]); setSelectedBrands([]); setSelectedRating(null); setMinPrice(''); setMaxPrice('') }}
                className="flex-1 h-12 bg-white border-2 border-[#8B7355] text-[#8B7355] text-[15px] font-semibold rounded-[8px]"
              >
                {t('skincare.clearAll')}
              </button>
              <button onClick={() => { setShowFilterSheet(false) }} className="flex-1 h-12 bg-[#8B7355] text-white text-[15px] font-semibold rounded-[8px]">
                {t('skincare.applyFilters')} ({products.length})
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
  const { t } = useTranslation()
  const [allProducts, setAllProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeSort, setActiveSort] = useState('Best Selling')
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const [selectedSubcategories, setSelectedSubcategories] = useState([])
  const [selectedSkinTypes, setSelectedSkinTypes] = useState([])
  const [selectedConcerns, setSelectedConcerns] = useState([])
  const [selectedIngredients, setSelectedIngredients] = useState([])
  const [selectedBrands, setSelectedBrands] = useState([])
  const [selectedRating, setSelectedRating] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [displayCount, setDisplayCount] = useState(10)
  const Stars = () => [...Array(5)].map((_, i) => <IoStarSharp key={i} className="w-[15px] h-[15px] text-[#C9A870]" />)

  const [searchParams] = useSearchParams()

  useEffect(() => {
    const sub = searchParams.get('subcategory')
    if (sub) setSelectedSubcategories([sub])
    const skinType = searchParams.get('skinType')
    if (skinType) setSelectedSkinTypes([skinType])
    const concern = searchParams.get('concern')
    if (concern) setSelectedConcerns([concern])
    const ingredient = searchParams.get('ingredient')
    if (ingredient) setSelectedIngredients([ingredient])
    const brand = searchParams.get('brand')
    if (brand) setSelectedBrands([brand])
  }, [])

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true)
      const data = await getSkincareProducts()
      setAllProducts(formatProductsForUI(data))
      setLoading(false)
    }
    fetchProducts()
  }, [])

  useEffect(() => {
    setDisplayCount(10)
  }, [selectedSubcategories, selectedSkinTypes, selectedConcerns, selectedIngredients, selectedBrands, selectedRating, minPrice, maxPrice, searchQuery])

  const getFilteredAndSortedProducts = () => {
    let filtered = [...allProducts]

    if (searchQuery.trim()) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (minPrice || maxPrice) {
      const min = minPrice ? parseFloat(minPrice) : 0
      const max = maxPrice ? parseFloat(maxPrice) : Infinity
      filtered = filtered.filter(p => p.priceValue >= min && p.priceValue <= max)
    }

    if (selectedSubcategories.length > 0) {
      filtered = filtered.filter(p => selectedSubcategories.includes(p.subcategory))
    }

    if (selectedSkinTypes.length > 0) {
      filtered = filtered.filter(p =>
        p.skin_types && selectedSkinTypes.every(type => p.skin_types.includes(type))
      )
    }

    if (selectedConcerns.length > 0) {
      filtered = filtered.filter(p =>
        p.skin_concerns && selectedConcerns.every(concern => p.skin_concerns.includes(concern))
      )
    }

    if (selectedIngredients.length > 0) {
      filtered = filtered.filter(p =>
        p.ingredients && selectedIngredients.every(ingredient => p.ingredients.includes(ingredient))
      )
    }

    if (selectedBrands.length > 0) {
      filtered = filtered.filter(p => selectedBrands.includes(p.brand))
    }

    if (selectedRating) {
      filtered = filtered.filter(p => p.rating >= selectedRating)
    }

    if (activeSort === 'Price: Low to High') {
      filtered.sort((a, b) => a.priceValue - b.priceValue)
    } else if (activeSort === 'Price: High to Low') {
      filtered.sort((a, b) => b.priceValue - a.priceValue)
    } else if (activeSort === 'Best Selling') {
      filtered.sort((a, b) => b.reviews - a.reviews)
    } else if (activeSort === 'Newest') {
      filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    } else if (activeSort === 'Top Rated') {
      filtered.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
    }

    return filtered
  }

  if (loading) {
    return <LoadingSpinner />
  }

  // Generate dynamic subcategory cards from actual products
  const subcategoryCounts = allProducts.reduce((acc, product) => {
    if (product.subcategory) {
      acc[product.subcategory] = (acc[product.subcategory] || 0) + 1
    }
    return acc
  }, {})

  const subcategoryCards = Object.entries(subcategoryCounts).map(([name, count]) => ({
    name,
    count,
    image: skincareCategories.find(c => c.name === name)?.image || 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=80&h=80&fit=crop'
  })).sort((a, b) => a.name.localeCompare(b.name))

  const activeFilters = selectedSubcategories.length + selectedSkinTypes.length + selectedConcerns.length + selectedIngredients.length + selectedBrands.length + (selectedRating ? 1 : 0) + (minPrice || maxPrice ? 1 : 0)

  const products = getFilteredAndSortedProducts()
  const displayedProducts = products.slice(0, displayCount)

  const largeProducts = displayedProducts.slice(0, 1)
  const mediumProducts = displayedProducts.slice(1, 3)
  const squareProducts = displayedProducts.slice(3, 6)
  const rectangularProducts = displayedProducts.slice(6, displayCount)

  return (
    <div className="bg-white font-['Cormorant_Garamond']">

      {/* Hero */}
      <div className="min-h-[300px] md:min-h-[340px] lg:min-h-[380px] bg-gradient-to-b from-[#FDFBF7] to-[#F5F1EA] relative overflow-hidden flex items-center px-6 md:px-[60px] lg:px-[120px]">
        <img src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800&h=800&fit=crop" alt="" className="absolute top-0 right-0 w-[200px] md:w-[360px] lg:w-[500px] h-full object-cover opacity-20" />
        <div className="w-full max-w-[650px] relative z-10">
          <p className="text-[12px] md:text-[13px] lg:text-[14px] font-light italic text-[#8B7355] tracking-[2px] mb-3">{t('skincare.completeCollection')}</p>
          <h1 className="text-[40px] md:text-[52px] lg:text-[64px] font-bold text-[#1A1A1A] leading-[1] mb-4 md:mb-5 lg:mb-6">{t('skincare.heroTitle')}</h1>
          <p className="text-[15px] md:text-[16px] lg:text-[18px] font-normal text-[#666666] mb-6 md:mb-7 lg:mb-8">{t('skincare.heroDesc')}</p>
          <div className="w-[80px] md:w-[90px] lg:w-[100px] h-[4px] bg-[#C9A870]" />
        </div>
        <div className="hidden lg:block absolute right-[180px] top-1/2 -translate-y-1/2">
          <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=320&h=320&fit=crop" alt="" className="w-[260px] h-[260px] object-cover rounded-[8px] shadow-[0_12px_48px_rgba(0,0,0,0.12)]" />
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="min-h-[48px] bg-[#FDFBF7] px-6 md:px-[60px] lg:px-[120px] flex items-center">
        <span className="text-[13px] lg:text-[15px] text-[#8B7355] cursor-pointer">{t('skincare.home')}</span><span className="text-[13px] lg:text-[15px] text-[#666666] mx-2">/</span>
        <span className="text-[13px] lg:text-[15px] text-[#8B7355] cursor-pointer">{t('skincare.shop')}</span><span className="text-[13px] lg:text-[15px] text-[#666666] mx-2">/</span>
        <span className="text-[13px] lg:text-[15px] text-[#666666]">title</span>
      </div>

      {/* Main Content */}
      <div className="px-6 md:px-[60px] lg:px-[120px] py-8 md:py-12 lg:py-[64px] flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-[48px]">

        {/* Sidebar — hidden on tablet, shown as full width on md+ */}
        <div className="hidden md:block w-full md:w-[220px] lg:w-[280px] flex-shrink-0">
          <div className="bg-white border border-[#E8E3D9] rounded-[16px] shadow-[0_8px_32px_rgba(0,0,0,0.08)] p-5 lg:p-[28px]">
            <div className="flex items-center justify-between mb-5 lg:mb-[24px]">
              <h3 className="text-[16px] lg:text-[18px] font-medium text-[#1A1A1A]">refineSelection</h3>
              {activeFilters > 0 && (
                <span className="px-3 py-1 bg-[#8B7355] text-white text-[11px] font-semibold rounded-full">
                  {activeFilters}
                </span>
              )}
            </div>
            <div className="space-y-[10px] lg:space-y-[12px] mb-6 lg:mb-[32px]">
              <div
                onClick={() => { setSelectedSubcategories([]) }}
                className={`inline-flex items-center px-[16px] lg:px-[20px] py-[8px] lg:py-[10px] text-[13px] lg:text-[14px] font-medium rounded-full cursor-pointer ${selectedSubcategories.length === 0 ? 'bg-[#8B7355] text-white' : 'bg-[#F5F1EA] text-[#3D3D3D]'}`}
              >
                All Skincare
              </div>
              {subcategoryCards.map((cat) => {
                const isSelected = selectedSubcategories.includes(cat.name)
                return (
                  <div
                    key={cat.name}
                    onClick={() => {
                      setSelectedSubcategories(prev => isSelected ? prev.filter(c => c !== cat.name) : [...prev, cat.name])
                      setDisplayCount(10)
                    }}
                    className={`inline-flex items-center px-[16px] lg:px-[20px] py-[8px] lg:py-[10px] text-[13px] lg:text-[14px] font-medium rounded-full cursor-pointer ${isSelected ? 'bg-[#8B7355] text-white' : 'bg-[#F5F1EA] text-[#3D3D3D]'}`}
                  >
                    {cat.name} ({cat.count})
                  </div>
                )
              })}
            </div>
            <div className="border-t border-[#E8E3D9] pt-5 lg:pt-[24px] space-y-4 lg:space-y-[20px]">
              <div>
                <h4 className="text-[14px] lg:text-[15px] font-medium text-[#1A1A1A] mb-3 lg:mb-[12px]">{t('skincare.priceRange')}</h4>
                <div className="flex items-center gap-[6px] lg:gap-[8px]">
                  <input
                    type="number"
                    placeholder="$0"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-[80px] lg:w-[100px] h-[34px] lg:h-[36px] px-3 border border-[#E8E3D9] rounded-[6px] text-[13px] lg:text-[14px] outline-none"
                  />
                  <span className="text-[13px] lg:text-[14px] text-[#666666]">—</span>
                  <input
                    type="number"
                    placeholder="$500"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-[80px] lg:w-[100px] h-[34px] lg:h-[36px] px-3 border border-[#E8E3D9] rounded-[6px] text-[13px] lg:text-[14px] outline-none"
                  />
                </div>
              </div>
              <div>
                <h4 className="text-[14px] lg:text-[15px] font-medium text-[#1A1A1A] mb-3 lg:mb-[12px]">skinType</h4>
                <div className="space-y-[6px] lg:space-y-[8px]">
                  {skinTypes.map((item) => {
                    const isChecked = selectedSkinTypes.includes(item)
                    return (
                      <label key={item} onClick={() => setSelectedSkinTypes(prev => isChecked ? prev.filter(t => t !== item) : [...prev, item])} className="flex items-center gap-[10px] cursor-pointer">
                        <div className={`w-[15px] h-[15px] lg:w-[16px] lg:h-[16px] border-[2px] rounded-[2px] flex items-center justify-center flex-shrink-0 ${isChecked ? 'bg-[#C9A870] border-[#C9A870]' : 'border-[#C9A870]'}`}>
                          {isChecked && <IoCheckmark className="w-[11px] h-[11px] text-white" />}
                        </div>
                        <span className="text-[13px] lg:text-[14px] text-[#3D3D3D]">{item}</span>
                      </label>
                    )
                  })}
                </div>
              </div>
              <div>
                <h4 className="text-[14px] lg:text-[15px] font-medium text-[#1A1A1A] mb-3 lg:mb-[12px]">skinConcerns</h4>
                <div className="space-y-[6px] lg:space-y-[8px]">
                  {skinConcerns.map((item) => {
                    const isChecked = selectedConcerns.includes(item)
                    return (
                      <label key={item} onClick={() => setSelectedConcerns(prev => isChecked ? prev.filter(c => c !== item) : [...prev, item])} className="flex items-center gap-[10px] cursor-pointer">
                        <div className={`w-[15px] h-[15px] lg:w-[16px] lg:h-[16px] border-[2px] rounded-[2px] flex items-center justify-center flex-shrink-0 ${isChecked ? 'bg-[#C9A870] border-[#C9A870]' : 'border-[#C9A870]'}`}>
                          {isChecked && <IoCheckmark className="w-[11px] h-[11px] text-white" />}
                        </div>
                        <span className="text-[13px] lg:text-[14px] text-[#3D3D3D]">{item}</span>
                      </label>
                    )
                  })}
                </div>
              </div>
              <div>
                <h4 className="text-[14px] lg:text-[15px] font-medium text-[#1A1A1A] mb-3 lg:mb-[12px]">ingredients</h4>
                <div className="space-y-[6px] lg:space-y-[8px]">
                  {ingredients.map((item) => {
                    const isChecked = selectedIngredients.includes(item)
                    return (
                      <label key={item} onClick={() => setSelectedIngredients(prev => isChecked ? prev.filter(i => i !== item) : [...prev, item])} className="flex items-center gap-[10px] cursor-pointer">
                        <div className={`w-[15px] h-[15px] lg:w-[16px] lg:h-[16px] border-[2px] rounded-[2px] flex items-center justify-center flex-shrink-0 ${isChecked ? 'bg-[#C9A870] border-[#C9A870]' : 'border-[#C9A870]'}`}>
                          {isChecked && <IoCheckmark className="w-[11px] h-[11px] text-white" />}
                        </div>
                        <span className="text-[13px] lg:text-[14px] text-[#3D3D3D]">{item}</span>
                      </label>
                    )
                  })}
                </div>
              </div>
              <div>
                <h4 className="text-[14px] lg:text-[15px] font-medium text-[#1A1A1A] mb-3 lg:mb-[12px]">{t('skincare.brand')}</h4>
                <div className="space-y-[6px] lg:space-y-[8px]">
                  {filterBrands.map((item) => {
                    const isChecked = selectedBrands.includes(item)
                    return (
                      <label key={item} onClick={() => setSelectedBrands(prev => isChecked ? prev.filter(b => b !== item) : [...prev, item])} className="flex items-center gap-[10px] cursor-pointer">
                        <div className={`w-[15px] h-[15px] lg:w-[16px] lg:h-[16px] border-[2px] rounded-[2px] flex items-center justify-center flex-shrink-0 ${isChecked ? 'bg-[#C9A870] border-[#C9A870]' : 'border-[#C9A870]'}`}>
                          {isChecked && <IoCheckmark className="w-[11px] h-[11px] text-white" />}
                        </div>
                        <span className="text-[13px] lg:text-[14px] text-[#3D3D3D]">{item}</span>
                      </label>
                    )
                  })}
                </div>
              </div>
              <button
                onClick={() => { setSelectedSubcategories([]); setSelectedSkinTypes([]); setSelectedConcerns([]); setSelectedIngredients([]); setSelectedBrands([]); setMinPrice(''); setMaxPrice(''); setDisplayCount(10) }}
                className="w-full h-[44px] lg:h-[48px] bg-white border-2 border-[#8B7355] text-[#8B7355] text-[14px] lg:text-[15px] font-medium rounded-[8px] hover:bg-[#F5F1EA] transition-colors mb-3"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1 min-w-0">

          {/* Search Bar */}
          <SearchWithSuggestions
            allProducts={allProducts}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder={t('skincare.searchPlaceholder')}
            className="mb-6"
          />

          {/* Toolbar */}
          <div className="flex items-center justify-between mb-8 md:mb-10 lg:mb-[48px]">
            <span className="text-[13px] md:text-[14px] lg:text-[15px] text-[#666666]">{t('skincare.showing')} {products.length} {t('skincare.skincareProducts')}</span>
            <div className="flex items-center gap-3 lg:gap-[16px]">
              <span className="hidden md:inline text-[14px] lg:text-[15px] text-[#666666]">{t('skincare.sortBy')}</span>
              <div className="relative">
                <button
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="w-[180px] md:w-[200px] lg:w-[240px] min-h-[44px] lg:min-h-[48px] px-4 bg-white border border-[#E8E3D9] rounded-[8px] flex items-center justify-between cursor-pointer hover:border-[#C9A870] transition-all"
                >
                  <span className="text-[13px] md:text-[14px] lg:text-[15px] font-medium text-[#2B2B2B]">{activeSort}</span>
                  <IoChevronDown className="w-[16px] h-[16px] lg:w-[18px] lg:h-[18px] text-[#8B7355]" />
                </button>
                {showSortDropdown && (
                  <div className="absolute top-full mt-2 right-0 w-[240px] bg-white border border-[#E8E3D9] rounded-[8px] shadow-lg z-10">
                    {sortOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => { setActiveSort(option); setShowSortDropdown(false) }}
                        className={`w-full px-4 py-3 text-left text-[14px] hover:bg-[#F5F1EA] transition-colors ${activeSort === option ? 'text-[#8B7355] font-medium' : 'text-[#2B2B2B]'}`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {products.length === 0 ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <p className="text-[16px] text-[#666666]">{t('skincare.noProducts')}</p>
            </div>
          ) : (
            <>
          {/* Row 1 — large card + 2 medium cards */}
          {largeProducts.length > 0 && (
          <div className="flex flex-col md:flex-row gap-5 mb-10 md:mb-12 lg:mb-[64px]">
            <Link to={`/product/${largeProducts[0].id}`} className="w-full md:w-[300px] lg:w-[460px] md:h-[480px] lg:h-[560px] bg-white rounded-[12px] overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)] group cursor-pointer hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] transition-all duration-300">
              <div className="relative w-full h-[260px] md:h-[300px] lg:h-[380px]">
                <img src={largeProducts[0].image} alt={largeProducts[0].name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute bottom-0 left-0 right-0 h-[160px] bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-[24px] text-white">
                  <p className="text-[14px] lg:text-[17px] mb-1 lg:mb-2">{largeProducts[0].description}</p>
                  <h3 className="text-[20px] lg:text-[28px] font-medium mb-2 lg:mb-3">{largeProducts[0].name}</h3>
                  <p className="text-[20px] lg:text-[24px] font-semibold">{largeProducts[0].price}</p>
                </div>
                <div className="absolute top-[16px] lg:top-[20px] right-[16px] lg:right-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="px-[18px] lg:px-[24px] py-[10px] lg:py-[12px] bg-white text-[#8B7355] text-[13px] lg:text-[14px] font-medium rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.2)]">{t('skincare.addToBag')}</button>
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
                    <div className="absolute top-[12px] right-[12px] lg:top-[16px] lg:right-[16px] flex gap-[6px] lg:gap-[8px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-[34px] h-[34px] lg:w-[40px] lg:h-[40px] bg-white rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.15)]"><IoHeartOutline className="w-[16px] h-[16px] lg:w-[20px] lg:h-[20px] text-[#2B2B2B]" /></div>
                      <div className="w-[34px] h-[34px] lg:w-[40px] lg:h-[40px] bg-white rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.15)]"><IoEyeOutline className="w-[16px] h-[16px] lg:w-[20px] lg:h-[20px] text-[#2B2B2B]" /></div>
                    </div>
                  </div>
                  <div className="flex-1 p-4 lg:p-[24px] flex flex-col justify-center min-w-0">
                    <p className="text-[11px] lg:text-[13px] font-light italic text-[#8B7355] tracking-[1.2px] mb-1 lg:mb-2">{product.brand}</p>
                    <h4 className="text-[15px] md:text-[17px] lg:text-[20px] font-medium text-[#2B2B2B] leading-[1.2] mb-1 lg:mb-2">{product.name}</h4>
                    <p className="text-[12px] lg:text-[15px] text-[#999999] mb-2 lg:mb-3 line-clamp-2">{product.description}</p>
                    <p className="text-[16px] md:text-[17px] lg:text-[19px] font-semibold text-[#1A1A1A] mb-2 lg:mb-3">{product.price}</p>
                    <div className="flex items-center gap-[6px]"><Stars /><span className="text-[12px] lg:text-[13px] text-[#999999] ml-1">({product.reviews})</span></div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          )}

          {/* Row 2 — square products */}
          {squareProducts.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-[20px] mb-10 md:mb-12 lg:mb-[64px]">
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
                <p className="text-[16px] md:text-[17px] lg:text-[19px] font-semibold text-[#1A1A1A] mb-1 lg:mb-2">{product.price}</p>
                <div className="flex items-center gap-[6px]"><Stars /><span className="text-[12px] lg:text-[13px] text-[#999999] ml-1">({product.reviews})</span></div>
              </Link>
            ))}
          </div>
          )}

          {/* Row 3 — rectangular products */}
          {rectangularProducts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-[20px] mb-10 md:mb-12 lg:mb-[64px]">
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
                    <p className="text-[18px] md:text-[20px] lg:text-[22px] font-semibold text-[#1A1A1A]">{product.price}</p>
                    <div className="flex items-center gap-[6px]"><Stars /><span className="text-[12px] lg:text-[13px] text-[#999999] ml-1">({product.reviews})</span></div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          )}

          {/* Load More Button */}
          {products.length > displayCount && (
            <div className="flex items-center justify-center mb-16 lg:mb-[96px]">
              <button
                onClick={() => setDisplayCount(prev => prev + 10)}
                className="h-[52px] px-[48px] bg-[#8B7355] text-white text-[15px] lg:text-[16px] font-medium rounded-[8px] hover:bg-[#6F5A42] transition-colors"
              >
                {t('skincare.loadMore')} ({products.length - displayCount} {t('skincare.remaining')})
              </button>
            </div>
          )}
          </>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Main Export (Switcher) ───────────────────────────────────────────────────
export default function SkinCare() {
  const { t } = useTranslation()
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return isMobile ? <SkinCareMobile key={i18n.language} /> : <SkinCareDesktop key={i18n.language} />
}