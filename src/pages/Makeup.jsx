import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useSearchParams } from 'react-router-dom'
import {
  IoStarSharp,
  IoHeartOutline,
  IoEyeOutline,
  IoChevronDown,
  IoCloseOutline,
  IoClose,
  IoCheckmark,
  IoFunnelOutline,
  IoSearchOutline,
  IoArrowUp,
  IoLogoInstagram,
  IoLogoFacebook,
  IoLogoPinterest,
  IoLogoYoutube,
} from 'react-icons/io5'

import {
  makeupCategories,
  makeupShadeColors,
  filterSkinTypes as importedFilterSkinTypes,
  filterBrandsMakeup,
  filterRatingsMakeup,
  sortOptionsMakeup,
} from '../data/products'

import { getMakeupProducts, formatProductsForUI } from '../lib/productsService'
import LoadingSpinner from '../components/LoadingSpinner'

// Makeup-specific filter data
const faceCategories = ['Foundation', 'Concealer', 'Powder', 'Blush', 'Highlighter']
const eyesCategories = ['Eyeshadow', 'Eyeliner', 'Mascara', 'Eyebrow']
const lipsCategories = ['Lipstick', 'Lip Gloss', 'Lip Liner', 'Lip Care']
const finishTypes    = ['Matte', 'Satin', 'Shimmer', 'Glitter']
const coverageTypes  = ['Sheer', 'Medium', 'Full']
const skinTones      = ['Fair', 'Light', 'Medium', 'Tan', 'Deep', 'All Tones']
const filterFinishTypes = ['Matte', 'Glossy', 'Satin']

const filterBrands    = filterBrandsMakeup
const filterSkinTypes = importedFilterSkinTypes
const filterRatings   = filterRatingsMakeup
const sortOptions     = sortOptionsMakeup.filter(o => o !== 'Shade Range')
const shadeColors     = makeupShadeColors

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
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E8E3D9] rounded-[8px] shadow-[0_8px_24px_rgba(0,0,0,0.12)] z-50 overflow-hidden">
          {suggestions.map((product, idx) => (
            <button key={product.id || idx} onClick={() => handleSelect(product.name)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#FDFBF7] transition-colors text-left border-b border-[#F5F1EA] last:border-b-0">
              <img src={product.image} alt={product.name} className="w-[40px] h-[40px] rounded-[6px] object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[14px] text-[#1A1A1A] leading-tight">{highlightMatch(product.name, searchQuery)}</p>
                <p className="text-[12px] text-[#8B7355] mt-0.5">{product.price}</p>
              </div>
              <IoSearchOutline className="w-[14px] h-[14px] text-[#999999] flex-shrink-0" />
            </button>
          ))}
        </div>
      )}
      {showSuggestions && searchQuery.trim().length > 0 && suggestions.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E8E3D9] rounded-[8px] shadow-[0_8px_24px_rgba(0,0,0,0.12)] z-50 px-4 py-3">
          <p className="text-[13px] text-[#999999]">No products found for "{searchQuery}"</p>
        </div>
      )}
    </div>
  )
}

// Shared filter + sort logic
function getFilteredAndSorted(allProducts, {
  selectedCategories, selectedSkinTypes, selectedBrands,
  selectedRating, minPrice, maxPrice, activeSort,
  selectedFinish, selectedCoverage, selectedSkinTones
}) {
  let filtered = [...allProducts]

  if (minPrice || maxPrice) {
    const min = minPrice ? parseFloat(minPrice) : 0
    const max = maxPrice ? parseFloat(maxPrice) : Infinity
    filtered = filtered.filter(p => p.priceValue >= min && p.priceValue <= max)
  }
  if (selectedCategories.length > 0) {
    filtered = filtered.filter(p => selectedCategories.includes(p.subcategory))
  }
  if (selectedSkinTypes.length > 0) {
    filtered = filtered.filter(p =>
      p.skin_types && selectedSkinTypes.every(t => p.skin_types.includes(t))
    )
  }
  if (selectedBrands.length > 0) {
    filtered = filtered.filter(p => selectedBrands.includes(p.brand))
  }
  if (selectedRating) {
    filtered = filtered.filter(p => parseFloat(p.rating) >= selectedRating)
  }
  if (selectedFinish && selectedFinish.length > 0) {
    filtered = filtered.filter(p => selectedFinish.includes(p.finish))
  }
  if (selectedCoverage && selectedCoverage.length > 0) {
    filtered = filtered.filter(p => selectedCoverage.includes(p.coverage))
  }
  if (selectedSkinTones && selectedSkinTones.length > 0) {
    console.log('Selected skin tones:', selectedSkinTones)
    console.log('Before filter count:', filtered.length)
    filtered = filtered.filter(p => {
      const matches = selectedSkinTones.includes(p.skin_tone)
      if (!matches) {
        console.log('Filtered out:', p.name, 'has skin_tone:', p.skin_tone)
      }
      return matches
    })
    console.log('After filter count:', filtered.length)
  }

  if (activeSort === 'Price: Low to High')  filtered.sort((a, b) => a.priceValue - b.priceValue)
  else if (activeSort === 'Price: High to Low') filtered.sort((a, b) => b.priceValue - a.priceValue)
  else if (activeSort === 'Best Selling')    filtered.sort((a, b) => (b.reviews || 0) - (a.reviews || 0))
  else if (activeSort === 'Newest')          filtered.sort((a, b) => {
    if (a.created_at && b.created_at) return new Date(b.created_at) - new Date(a.created_at)
    return String(b.id || '').localeCompare(String(a.id || ''))
  })
  else if (activeSort === 'Top Rated')       filtered.sort((a, b) => parseFloat(b.rating || 0) - parseFloat(a.rating || 0))
  else if (activeSort === 'Most Popular')    filtered.sort((a, b) => {
    const scoreA = (parseFloat(a.rating || 0) * (a.reviews || 0))
    const scoreB = (parseFloat(b.rating || 0) * (b.reviews || 0))
    return scoreB - scoreA
  })

  return filtered
}


// ─── Translation helpers ───────────────────────────────────────────────────────
const makeupFilterTranslationsRU = {
  'All Skin Types': 'Все типы кожи', 'Dry': 'Сухая', 'Oily': 'Жирная',
  'Combination': 'Комбинированная', 'Sensitive': 'Чувствительная', 'Mature': 'Зрелая',
  'Matte': 'Матовый', 'Satin': 'Атласный', 'Shimmer': 'Мерцающий', 'Glitter': 'С блёстками',
  'Glossy': 'Глянцевый', 'Sheer': 'Лёгкое', 'Medium': 'Среднее', 'Full': 'Полное',
  'Fair': 'Светлый', 'Light': 'Нежный', 'Tan': 'Загорелый', 'Deep': 'Тёмный', 'All Tones': 'Все оттенки',
}
const subcategoryTranslationsRU_makeup = {
  'Foundation': 'Тональная основа', 'Concealer': 'Консилер', 'Powder': 'Пудра',
  'Blush': 'Румяна', 'Highlighter': 'Хайлайтер', 'Eyeshadow': 'Тени для глаз',
  'Eyeliner': 'Подводка', 'Mascara': 'Тушь', 'Eyebrow': 'Для бровей',
  'Lipstick': 'Помада', 'Lip Gloss': 'Блеск для губ', 'Lip Liner': 'Карандаш для губ',
  'Lip Care': 'Уход за губами', 'Face': 'Лицо', 'Eyes': 'Глаза', 'Lips': 'Губы',
  'Sets & Palettes': 'Наборы и палетки',
}
const useMakeupTranslation = () => {
  const { i18n } = useTranslation()
  const tf = (value) => i18n.language === 'ru' ? (makeupFilterTranslationsRU[value] || value) : value
  const ts = (value) => i18n.language === 'ru' ? (subcategoryTranslationsRU_makeup[value] || value) : value
  return { tf, ts }
}


// ── Mobile ────────────────────────────────────────────────────────────────────
function MakeupMobile() {
  const { t } = useTranslation()
  const { tf, ts } = useMakeupTranslation()
  const [allProducts, setAllProducts] = useState([])
  const [loading, setLoading]         = useState(true)
  const [activeSort, setActiveSort]             = useState('Best Selling')
  const [showSortSheet, setShowSortSheet]       = useState(false)
  const [showFilterSheet, setShowFilterSheet]   = useState(false)
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedFinish, setSelectedFinish]         = useState([])
  const [selectedCoverage, setSelectedCoverage]     = useState([])
  const [selectedSkinTones, setSelectedSkinTones]   = useState([])
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [displayCount, setDisplayCount] = useState(10)
  const [searchQuery, setSearchQuery] = useState('')

  const [searchParams] = useSearchParams()
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const activeFilters = selectedCategories.length + selectedFinish.length + selectedCoverage.length + selectedSkinTones.length + (minPrice || maxPrice ? 1 : 0)

  const categoryImageMap = {
    'Foundation':  'https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=80&h=80&fit=crop',
    'Concealer':   'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=80&h=80&fit=crop',
    'Powder':      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=80&h=80&fit=crop',
    'Blush':       'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=80&h=80&fit=crop',
    'Highlighter': 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=80&h=80&fit=crop',
    'Eyeshadow':   'https://images.unsplash.com/photo-1583241475880-083f84372725?w=80&h=80&fit=crop',
    'Eyeliner':    'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=80&h=80&fit=crop',
    'Mascara':     'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=80&h=80&fit=crop',
    'Eyebrow':     'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=80&h=80&fit=crop',
    'Lipstick':    'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=80&h=80&fit=crop',
    'Lip Gloss':   'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=80&h=80&fit=crop',
    'Lip Liner':   'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=80&h=80&fit=crop',
    'Lip Care':    'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=80&h=80&fit=crop',
  }

  useEffect(() => {
    const sub = searchParams.get('subcategory')
    if (sub) setSelectedCategories([sub])
    const finish = searchParams.get('finish')
    if (finish) setSelectedFinish([finish])
    const coverage = searchParams.get('coverage')
    if (coverage) setSelectedCoverage([coverage])
    const skinTone = searchParams.get('skinTone')
    if (skinTone) setSelectedSkinTones([skinTone])
  }, [])

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true)
      const data = await getMakeupProducts()
      setAllProducts(formatProductsForUI(data))
      setLoading(false)
    }
    fetchProducts()
  }, [])

  useEffect(() => { setDisplayCount(10) }, [selectedCategories, selectedFinish, selectedCoverage, selectedSkinTones, minPrice, maxPrice])

  if (loading) return <LoadingSpinner />

  const products = getFilteredAndSorted(allProducts, {
    selectedCategories, selectedSkinTypes: [], selectedBrands: [],
    selectedRating: null, minPrice, maxPrice, activeSort,
    selectedFinish, selectedCoverage, selectedSkinTones
  }).filter(p => !searchQuery.trim() || p.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const mobileProducts = products.slice(0, displayCount)

  const subcategoryCounts = allProducts.reduce((acc, p) => {
    if (p.subcategory) acc[p.subcategory] = (acc[p.subcategory] || 0) + 1
    return acc
  }, {})

  const getSubcategoryCard = (name) => ({
    name,
    count: subcategoryCounts[name] || 0,
    image: categoryImageMap[name] || 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=80&h=80&fit=crop'
  })

  const faceCards = faceCategories.map(getSubcategoryCard)
  const eyesCards = eyesCategories.map(getSubcategoryCard)
  const lipsCards = lipsCategories.map(getSubcategoryCard)

  const CategoryCard = ({ cat }) => {
    const isSelected = selectedCategories.includes(cat.name)
    return (
      <div
        onClick={() => setSelectedCategories(prev => isSelected ? prev.filter(c => c !== cat.name) : [...prev, cat.name])}
        className={`w-[110px] flex-shrink-0 bg-white border-2 rounded-[12px] p-3 flex flex-col items-center gap-2 cursor-pointer transition-colors ${isSelected ? 'border-[#8B7355] bg-[#F5F1EA]' : 'border-[#E8E3D9] hover:border-[#C9A870]'}`}
      >
        <div className="w-[56px] h-[56px] rounded-full overflow-hidden bg-[#F9F6F2]">
          <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
        </div>
        <span className="text-[12px] font-medium text-[#1A1A1A] text-center leading-tight">{ts(cat.name)}</span>
        <span className="text-[11px] font-light text-[#999999]">{cat.count}</span>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen bg-white font-['Cormorant_Garamond']">
      {/* Hero */}
      <div className="relative min-h-[280px] bg-[#F5F0EB] overflow-hidden flex items-center">
        <div className="absolute right-0 top-0 bottom-0 w-[55%]">
          <img src="https://uluuktwfarfvqmnhpvtw.supabase.co/storage/v1/object/public/images/11.jpeg" alt="Makeup collection" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#F5F0EB] via-[#F5F0EB]/30 to-transparent" />
        </div>
        <div className="relative z-10 px-5 py-10 w-[62%]">
          <p className="text-[10px] font-light italic text-[#8B7355] tracking-[2px] mb-3">{t('makeup.artistryEssentials')}</p>
          <h1 className="text-[30px] font-bold text-[#1A1A1A] leading-[1.1] mb-3">{t('makeup.title')}</h1>
          <p className="text-[13px] font-normal text-[#666666] mb-4">{t('makeup.subtitle')}</p>
          <div className="w-[48px] h-[2px] bg-[#C9A870]" />
        </div>
      </div>

      {/* Category Cards — grouped by Face, Eyes, Lips */}
      <div className="bg-white border-b border-[#E8E3D9] py-5">
        {/* Face */}
        <div className="mb-4">
          <h4 className="text-[13px] font-semibold text-[#8B7355] tracking-[1px] uppercase px-4 mb-3">{t('makeup.face')}</h4>
          <div className="overflow-x-auto px-4" style={{ scrollbarWidth: 'none' }}>
            <div className="flex gap-3 w-max">
              {faceCards.map((cat) => <CategoryCard key={cat.name} cat={cat} />)}
            </div>
          </div>
        </div>
        {/* Eyes */}
        <div className="mb-4">
          <h4 className="text-[13px] font-semibold text-[#8B7355] tracking-[1px] uppercase px-4 mb-3">{t('makeup.eyes')}</h4>
          <div className="overflow-x-auto px-4" style={{ scrollbarWidth: 'none' }}>
            <div className="flex gap-3 w-max">
              {eyesCards.map((cat) => <CategoryCard key={cat.name} cat={cat} />)}
            </div>
          </div>
        </div>
        {/* Lips */}
        <div>
          <h4 className="text-[13px] font-semibold text-[#8B7355] tracking-[1px] uppercase px-4 mb-3">{t('makeup.lips')}</h4>
          <div className="overflow-x-auto px-4" style={{ scrollbarWidth: 'none' }}>
            <div className="flex gap-3 w-max">
              {lipsCards.map((cat) => <CategoryCard key={cat.name} cat={cat} />)}
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white px-5 pt-4 pb-3">
        <SearchWithSuggestions
          allProducts={allProducts}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          placeholder={t('makeup.searchPlaceholder')}
          className="mb-3"
        />
        <div className="flex items-center justify-between mb-3">
          <span className="text-[13px] font-normal text-[#666666]">{t('makeup.showing')} {products.length} {t('makeup.products')}</span>
          <button onClick={() => setShowFilterSheet(true)} className="relative flex items-center gap-2 h-9 px-4 border border-[#E8E3D9] rounded-full text-[13px] font-medium text-[#2B2B2B]">
            <IoFunnelOutline className="w-3.5 h-3.5 text-[#8B7355]" />
            {t('makeup.filters')}
            {activeFilters > 0 && (
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-[#8B7355] rounded-full flex items-center justify-center">
                <span className="text-[10px] font-medium text-white">{activeFilters}</span>
              </div>
            )}
          </button>
        </div>
        <button onClick={() => setShowSortSheet(true)} className="w-full h-12 px-4 bg-white border border-[#E8E3D9] rounded-[8px] flex items-center justify-between mb-2">
          <span className="text-[14px] font-normal text-[#2B2B2B]">{t('makeup.sortBy')} {activeSort === 'Best Selling' ? t('makeup.sortBestSelling') : activeSort === 'Newest' ? t('makeup.sortNewest') : activeSort === 'Price: Low to High' ? t('makeup.sortPriceLow') : activeSort === 'Price: High to Low' ? t('makeup.sortPriceHigh') : activeSort === 'Most Popular' ? t('makeup.sortMostPopular') : activeSort}</span>
          <IoChevronDown className="w-4 h-4 text-[#8B7355]" />
        </button>
      </div>

      {/* Product Grid */}
      <div className="px-4 pb-6">
        {products.length === 0 ? (
          <div className="flex items-center justify-center min-h-[300px]"><p className="text-[16px] text-[#666666]">{t('makeup.noProducts')}</p></div>
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
                    <span className="text-[16px] font-semibold text-[#1A1A1A]">${parseFloat(product.priceValue).toFixed(2)}</span>
                    <div className="flex items-center gap-0.5">{[...Array(5)].map((_, i) => <IoStarSharp key={i} className="w-[11px] h-[11px] text-[#C9A870]" />)}</div>
                  </div>
                  <p className="text-[11px] text-[#999999] mb-3">({product.reviews})</p>
                  <button className="w-full h-9 bg-[#8B7355] text-white text-[12px] font-medium rounded-[6px]">{t('makeup.addToBag')}</button>
                </div>
              </Link>
            ))}
          </div>
        )}
        {products.length > displayCount && (
          <button onClick={() => setDisplayCount(prev => prev + 10)} className="w-full h-12 mt-5 border border-[#C9A870] text-[#8B7355] text-[14px] font-medium rounded-[8px]">
            {t('makeup.loadMore')} ({products.length - displayCount} {t('makeup.remaining')})
          </button>
        )}
      </div>

      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 w-12 h-12 bg-gradient-to-br from-[#C9A870] to-[#8B7355] rounded-full flex items-center justify-center shadow-[0_4px_16px_rgba(139,115,85,0.4)] z-50 transition-all duration-300"
        >
          <IoArrowUp className="w-5 h-5 text-white" />
        </button>
      )}

      {/* Sort Sheet */}
      {showSortSheet && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowSortSheet(false)} />
          <div className="relative bg-white rounded-t-[20px] px-5 pt-5 pb-8">
            <div className="w-10 h-1 bg-[#E8E3D9] rounded-full mx-auto mb-5" />
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[18px] font-semibold text-[#1A1A1A]">{t('makeup.sortBy')}</h3>
              <button onClick={() => setShowSortSheet(false)}><IoCloseOutline className="w-6 h-6 text-[#2B2B2B]" /></button>
            </div>
            <div className="space-y-1">
              {[
                { key: 'Best Selling',       label: t('makeup.sortBestSelling') },
                { key: 'Newest',             label: t('makeup.sortNewest') },
                { key: 'Price: Low to High', label: t('makeup.sortPriceLow') },
                { key: 'Price: High to Low', label: t('makeup.sortPriceHigh') },
                { key: 'Most Popular',       label: t('makeup.sortMostPopular') },
              ].map(({ key, label }) => (
                <button key={key} onClick={() => { setActiveSort(key); setShowSortSheet(false) }} className="w-full h-12 flex items-center justify-between px-4 rounded-[8px] hover:bg-[#FAF8F5]">
                  <span className={`text-[15px] ${activeSort === key ? 'font-medium text-[#8B7355]' : 'font-normal text-[#2B2B2B]'}`}>{label}</span>
                  {activeSort === key && <div className="w-5 h-5 rounded-full bg-[#8B7355] flex items-center justify-center"><svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div>}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Filter Sheet — matching desktop filters */}
      {showFilterSheet && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowFilterSheet(false)} />
          <div className="relative bg-white rounded-t-[24px] shadow-[0_-4px_24px_rgba(0,0,0,0.12)] flex flex-col" style={{ maxHeight: '92vh' }}>
            <div className="flex items-center justify-center pt-3 pb-1 flex-shrink-0"><div className="w-10 h-1 bg-[#E8E3D9] rounded-full" /></div>
            <div className="min-h-[60px] px-5 flex items-center justify-between border-b border-[#E8E3D9] flex-shrink-0">
              <div className="flex items-center gap-2">
                <h2 className="text-[22px] font-semibold text-[#1A1A1A]">{t('makeup.filters')}</h2>
                {activeFilters > 0 && <div className="w-[22px] h-[22px] bg-[#C9A870] rounded-full flex items-center justify-center"><span className="text-[11px] font-semibold text-white">{activeFilters}</span></div>}
              </div>
              <button onClick={() => setShowFilterSheet(false)}><IoClose className="w-6 h-6 text-[#2B2B2B]" /></button>
            </div>

            <div className="overflow-y-auto flex-1">

              {/* Product Category — grouped with horizontal scroll */}
              <div className="px-5 py-5 border-b border-[#E8E3D9]">
                <h3 className="text-[16px] font-medium text-[#2B2B2B] mb-4">{t('makeup.productCategory')}</h3>
                {[
                  { label: t('makeup.face'), cards: faceCards },
                  { label: t('makeup.eyes'), cards: eyesCards },
                  { label: t('makeup.lips'), cards: lipsCards },
                ].map(({ label, cards }) => (
                  <div key={label} className="mb-4">
                    <p className="text-[12px] font-semibold text-[#8B7355] tracking-[1px] uppercase mb-2">{label}</p>
                    <div className="overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
                      <div className="flex gap-2 w-max">
                        {cards.map((cat) => {
                          const isSelected = selectedCategories.includes(cat.name)
                          return (
                            <button key={cat.name} onClick={() => setSelectedCategories(prev => isSelected ? prev.filter(c => c !== cat.name) : [...prev, cat.name])}
                              className={`w-[90px] flex-shrink-0 rounded-[8px] p-2 flex flex-col items-center gap-1 border-2 transition-colors ${isSelected ? 'border-[#8B7355] bg-[#FDFBF7]' : 'border-[#E8E3D9] bg-white'}`}>
                              <img src={cat.image} alt={cat.name} className="w-[36px] h-[36px] rounded-full object-cover" />
                              <span className="text-[11px] font-medium text-[#2B2B2B] text-center leading-tight">{ts(cat.name)}</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Range */}
              <div className="px-5 py-5 border-b border-[#E8E3D9]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[16px] font-medium text-[#2B2B2B]">{t('makeup.priceRange')}</h3>
                  <span className="text-[14px] font-medium text-[#8B7355]">${minPrice || 0} – ${maxPrice || 500}</span>
                </div>
                <div className="flex items-center gap-3 w-full">
                  <input type="number" placeholder="Min" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="w-full h-[44px] px-4 border border-[#E8E3D9] rounded-[8px] text-[14px] outline-none focus:border-[#8B7355]" />
                  <span className="text-[14px] text-[#666666] flex-shrink-0">—</span>
                  <input type="number" placeholder="Max" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="w-full h-[44px] px-4 border border-[#E8E3D9] rounded-[8px] text-[14px] outline-none focus:border-[#8B7355]" />
                </div>
              </div>

              {/* Finish */}
              <div className="px-5 py-5 border-b border-[#E8E3D9]">
                <h3 className="text-[16px] font-medium text-[#2B2B2B] mb-4">{t('makeup.finish')}</h3>
                <div className="flex flex-wrap gap-2">
                  {finishTypes.map((finish) => {
                    const isSelected = selectedFinish.includes(finish)
                    return (
                      <button key={finish} onClick={() => setSelectedFinish(prev => isSelected ? prev.filter(f => f !== finish) : [...prev, finish])}
                        className={`px-4 h-[36px] rounded-[8px] text-[14px] font-medium transition-colors ${isSelected ? 'bg-[#8B7355] text-white' : 'bg-white border border-[#E8E3D9] text-[#2B2B2B]'}`}>
                        {tf(finish)}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Coverage */}
              <div className="px-5 py-5 border-b border-[#E8E3D9]">
                <h3 className="text-[16px] font-medium text-[#2B2B2B] mb-4">{t('makeup.coverage')}</h3>
                <div className="flex flex-wrap gap-2">
                  {coverageTypes.map((cov) => {
                    const isSelected = selectedCoverage.includes(cov)
                    return (
                      <button key={cov} onClick={() => setSelectedCoverage(prev => isSelected ? prev.filter(c => c !== cov) : [...prev, cov])}
                        className={`px-4 h-[36px] rounded-[8px] text-[14px] font-medium transition-colors ${isSelected ? 'bg-[#8B7355] text-white' : 'bg-white border border-[#E8E3D9] text-[#2B2B2B]'}`}>
                        {tf(cov)}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Skin Tone */}
              <div className="px-5 py-5">
                <h3 className="text-[16px] font-medium text-[#2B2B2B] mb-4">{t('makeup.skinTone')}</h3>
                <div className="flex flex-wrap gap-2">
                  {skinTones.map((tone) => {
                    const isSelected = selectedSkinTones.includes(tone)
                    return (
                      <button key={tone} onClick={() => setSelectedSkinTones(prev => isSelected ? prev.filter(t => t !== tone) : [...prev, tone])}
                        className={`px-4 h-[36px] rounded-[8px] text-[14px] font-medium transition-colors ${isSelected ? 'bg-[#8B7355] text-white' : 'bg-white border border-[#E8E3D9] text-[#2B2B2B]'}`}>
                        {tf(tone)}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="px-5 py-4 border-t border-[#E8E3D9] flex gap-3 flex-shrink-0">
              <button onClick={() => { setSelectedCategories([]); setSelectedFinish([]); setSelectedCoverage([]); setSelectedSkinTones([]); setMinPrice(''); setMaxPrice('') }}
                className="flex-1 h-12 bg-white border-2 border-[#8B7355] text-[#8B7355] text-[15px] font-semibold rounded-[8px]">{t('makeup.clearAll')}</button>
              <button onClick={() => setShowFilterSheet(false)} className="flex-1 h-12 bg-[#8B7355] text-white text-[15px] font-semibold rounded-[8px]">{t('makeup.applyFilters')} ({products.length})</button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

// ── Desktop ───────────────────────────────────────────────────────────────────
function MakeupDesktop() {
  const { t } = useTranslation()
  const { tf, ts } = useMakeupTranslation()
  const [allProducts, setAllProducts] = useState([])
  const [loading, setLoading]         = useState(true)
  const [activeSort, setActiveSort]             = useState('Best Selling')
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedFinish, setSelectedFinish]         = useState([])
  const [selectedCoverage, setSelectedCoverage]     = useState([])
  const [selectedSkinTones, setSelectedSkinTones]   = useState([])
  const [selectedBrands, setSelectedBrands]         = useState([])
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [displayCount, setDisplayCount] = useState(10)

  const [searchParams] = useSearchParams()
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const Stars = () => [...Array(5)].map((_, i) => <IoStarSharp key={i} className="w-[15px] h-[15px] text-[#C9A870]" />)

  useEffect(() => {
    const sub = searchParams.get('subcategory')
    if (sub) setSelectedCategories([sub])
    const finish = searchParams.get('finish')
    if (finish) setSelectedFinish([finish])
    const coverage = searchParams.get('coverage')
    if (coverage) setSelectedCoverage([coverage])
    const skinTone = searchParams.get('skinTone')
    if (skinTone) setSelectedSkinTones([skinTone])
  }, [])

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true)
      const data = await getMakeupProducts()
      const formattedProducts = formatProductsForUI(data)
      console.log('Sample skin tones:', formattedProducts.slice(0, 5).map(p => ({ name: p.name, skin_tone: p.skin_tone })))
      console.log('Type of first skin_tone:', typeof formattedProducts[0]?.skin_tone)
      console.log('Is array?:', Array.isArray(formattedProducts[0]?.skin_tone))
      setAllProducts(formattedProducts)
      setLoading(false)
    }
    fetchProducts()
  }, [])

  useEffect(() => { setDisplayCount(10) }, [selectedCategories, selectedFinish, selectedCoverage, selectedSkinTones, selectedBrands, minPrice, maxPrice, activeSort])

  if (loading) return <LoadingSpinner />

  const activeFilters = selectedCategories.length + selectedFinish.length + selectedCoverage.length + selectedSkinTones.length + selectedBrands.length + (minPrice || maxPrice ? 1 : 0)
  const products = getFilteredAndSorted(allProducts, { selectedCategories, selectedSkinTypes: [], selectedBrands, selectedRating: null, minPrice, maxPrice, activeSort, selectedFinish, selectedCoverage, selectedSkinTones }).filter(p =>
    !searchQuery.trim() || p.name.toLowerCase().includes(searchQuery.toLowerCase())
  )
  const displayedProducts   = products.slice(0, displayCount)
  const largeProducts       = displayedProducts.slice(0, 1)
  const mediumProducts      = displayedProducts.slice(1, 3)
  const squareProducts      = displayedProducts.slice(3, 6)
  const rectangularProducts = displayedProducts.slice(6)

  return (
    <div className="bg-white font-['Cormorant_Garamond']">
      {/* Hero */}
      <div className="min-h-[300px] md:min-h-[380px] lg:min-h-[480px] bg-gradient-to-b from-[#FDFBF7] to-[#F5F1EA] relative overflow-hidden flex items-center px-6 md:px-[60px] lg:px-[120px]">
        <img src="https://uluuktwfarfvqmnhpvtw.supabase.co/storage/v1/object/public/images/11.jpeg" alt="" className="absolute top-0 right-0 w-[180px] md:w-[360px] lg:w-[500px] h-full object-cover opacity-20" />
        <div className="w-full max-w-[650px] relative z-10">
          <p className="text-[12px] md:text-[13px] lg:text-[14px] font-light italic text-[#8B7355] tracking-[2px] mb-3">{t('makeup.luxuryCollection')}</p>
          <h1 className="text-[42px] md:text-[60px] lg:text-[80px] font-bold text-[#1A1A1A] leading-[1] mb-4 md:mb-5 lg:mb-6">{t('makeup.heroTitle')}</h1>
          <p className="text-[15px] md:text-[17px] lg:text-[20px] font-normal text-[#666666] mb-6 md:mb-7 lg:mb-8">{t('makeup.heroDesc')}</p>
          <div className="w-[90px] md:w-[105px] lg:w-[120px] h-[4px] bg-[#C9A870]" />
        </div>
        <div className="hidden lg:block absolute right-[180px] top-1/2 -translate-y-1/2">
          <img src="https://uluuktwfarfvqmnhpvtw.supabase.co/storage/v1/object/public/images/11.jpeg" alt="" className="w-[320px] h-[320px] object-cover rounded-[8px] shadow-[0_12px_48px_rgba(0,0,0,0.12)]" />
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="min-h-[48px] bg-[#FDFBF7] px-6 md:px-[60px] lg:px-[120px] flex items-center">
        <span className="text-[13px] lg:text-[15px] text-[#8B7355] cursor-pointer">{t('makeup.home')}</span><span className="text-[13px] lg:text-[15px] text-[#666666] mx-2">/</span>
        <span className="text-[13px] lg:text-[15px] text-[#8B7355] cursor-pointer">{t('makeup.shop')}</span><span className="text-[13px] lg:text-[15px] text-[#666666] mx-2">/</span>
        <span className="text-[13px] lg:text-[15px] text-[#666666]">{t('makeup.title')}</span>
      </div>

      {/* Main Content */}
      <div className="px-6 md:px-[60px] lg:px-[120px] py-8 md:py-12 lg:py-[64px] flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-[48px]">

        {/* Sidebar */}
        <div className="hidden md:block w-full md:w-[220px] lg:w-[280px] flex-shrink-0">
          <div className="bg-white border border-[#E8E3D9] rounded-[16px] shadow-[0_8px_32px_rgba(0,0,0,0.08)] p-5 lg:p-[28px]">
            <div className="flex items-center justify-between mb-5 lg:mb-[24px]">
              <h3 className="text-[16px] lg:text-[18px] font-medium text-[#1A1A1A]">{t('makeup.refineSelection')}</h3>
              {activeFilters > 0 && <span className="px-3 py-1 bg-[#8B7355] text-white text-[11px] font-semibold rounded-full">{activeFilters}</span>}
            </div>
            <div className="space-y-[10px] lg:space-y-[12px] mb-6 lg:mb-[32px]">
              <div onClick={() => setSelectedCategories([])} className={`inline-flex items-center px-[16px] lg:px-[20px] py-[8px] lg:py-[10px] text-[13px] lg:text-[14px] font-medium rounded-full cursor-pointer ${selectedCategories.length === 0 ? 'bg-[#8B7355] text-white' : 'bg-[#F5F1EA] text-[#3D3D3D]'}`}>{t('makeup.allMakeup')}</div>
              {[{ label: t('makeup.face'), subs: faceCategories }, { label: t('makeup.eyes'), subs: eyesCategories }, { label: t('makeup.lips'), subs: lipsCategories }].map(({ label, subs }) => (
                <div key={label}>
                  <div className="inline-flex items-center px-[16px] lg:px-[20px] py-[8px] lg:py-[10px] bg-[#F5F1EA] text-[#3D3D3D] text-[13px] lg:text-[14px] font-medium rounded-full cursor-pointer gap-2">
                    <span>{label}</span><IoChevronDown className="w-[13px] h-[13px] lg:w-[14px] lg:h-[14px]" />
                  </div>
                  <div className="ml-[20px] lg:ml-[24px] mt-[8px]">
                    {subs.map((item) => {
                      const isSelected = selectedCategories.includes(item)
                      return (
                        <div key={item} onClick={() => setSelectedCategories(prev => isSelected ? prev.filter(c => c !== item) : [...prev, item])}
                          className={`inline-block px-[12px] lg:px-[16px] py-[5px] lg:py-[6px] text-[12px] lg:text-[13px] rounded-full cursor-pointer mr-1 lg:mr-2 mb-2 border transition-colors ${isSelected ? 'bg-[#8B7355] text-white border-[#8B7355]' : 'bg-white border-[#E8E3D9] text-[#666666] hover:border-[#C9A870]'}`}>
                          {ts(item)}
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-[#E8E3D9] pt-5 lg:pt-[24px] space-y-4 lg:space-y-[20px]">
              <div>
                <h4 className="text-[14px] lg:text-[15px] font-medium text-[#1A1A1A] mb-3 lg:mb-[12px]">{t('makeup.priceRange')}</h4>
                <div className="flex items-center gap-[6px] lg:gap-[8px]">
                  <input type="number" placeholder="$0" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="w-[80px] lg:w-[100px] h-[34px] lg:h-[36px] px-3 border border-[#E8E3D9] rounded-[6px] text-[13px] lg:text-[14px] outline-none" />
                  <span className="text-[13px] lg:text-[14px] text-[#666666]">—</span>
                  <input type="number" placeholder="$500" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="w-[80px] lg:w-[100px] h-[34px] lg:h-[36px] px-3 border border-[#E8E3D9] rounded-[6px] text-[13px] lg:text-[14px] outline-none" />
                </div>
              </div>
              {[{ title: t('makeup.finish'), items: finishTypes, state: selectedFinish, setState: setSelectedFinish }, { title: t('makeup.coverage'), items: coverageTypes, state: selectedCoverage, setState: setSelectedCoverage }, { title: t('makeup.skinTone'), items: skinTones, state: selectedSkinTones, setState: setSelectedSkinTones }].map(({ title, items, state, setState }) => (
                <div key={title}>
                  <h4 className="text-[14px] lg:text-[15px] font-medium text-[#1A1A1A] mb-3 lg:mb-[12px]">{title}</h4>
                  <div className="space-y-[6px] lg:space-y-[8px]">
                    {items.map((item) => {
                      const isChecked = state.includes(item)
                      return (
                        <label key={item} onClick={() => setState(prev => isChecked ? prev.filter(i => i !== item) : [...prev, item])} className="flex items-center gap-[10px] cursor-pointer">
                          <div className={`w-[15px] h-[15px] lg:w-[16px] lg:h-[16px] border-[2px] rounded-[2px] flex items-center justify-center flex-shrink-0 ${isChecked ? 'bg-[#C9A870] border-[#C9A870]' : 'border-[#C9A870]'}`}>
                            {isChecked && <IoCheckmark className="w-[11px] h-[11px] text-white" />}
                          </div>
                          <span className="text-[13px] lg:text-[14px] text-[#3D3D3D]">{tf(item)}</span>
                        </label>
                      )
                    })}
                  </div>
                </div>
              ))}
              <button onClick={() => { setSelectedCategories([]); setSelectedFinish([]); setSelectedCoverage([]); setSelectedSkinTones([]); setSelectedBrands([]); setMinPrice(''); setMaxPrice(''); setDisplayCount(10) }}
                className="w-full h-[44px] lg:h-[48px] bg-white border-2 border-[#8B7355] text-[#8B7355] text-[14px] lg:text-[15px] font-medium rounded-[8px] hover:bg-[#F5F1EA] transition-colors">
                {t('makeup.clearAllFilters')}
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
            placeholder={t('makeup.searchPlaceholder')}
            className="mb-6"
          />
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-8 md:mb-10 lg:mb-[48px]">
            <span className="text-[13px] md:text-[14px] lg:text-[15px] text-[#666666]">{t('makeup.showing')} {products.length} {t('makeup.makeupProducts')}</span>
            <div className="flex items-center gap-3 lg:gap-[16px]">
              <span className="hidden md:inline text-[14px] lg:text-[15px] text-[#666666]">{t('makeup.sortBy')}</span>
              <div className="relative">
                <button onClick={() => setShowSortDropdown(!showSortDropdown)} className="w-[180px] md:w-[200px] lg:w-[240px] min-h-[44px] lg:min-h-[48px] px-4 bg-white border border-[#E8E3D9] rounded-[8px] flex items-center justify-between cursor-pointer hover:border-[#C9A870] transition-all">
                  <span className="text-[13px] md:text-[14px] lg:text-[15px] font-medium text-[#2B2B2B]">
                    {activeSort === 'Best Selling' ? t('makeup.sortBestSelling') :
                     activeSort === 'Newest' ? t('makeup.sortNewest') :
                     activeSort === 'Price: Low to High' ? t('makeup.sortPriceLow') :
                     activeSort === 'Price: High to Low' ? t('makeup.sortPriceHigh') :
                     activeSort === 'Most Popular' ? t('makeup.sortMostPopular') : activeSort}
                  </span>
                  <IoChevronDown className="w-[16px] h-[16px] lg:w-[18px] lg:h-[18px] text-[#8B7355]" />
                </button>
                {showSortDropdown && (
                  <div className="absolute top-full mt-2 right-0 w-[240px] bg-white border border-[#E8E3D9] rounded-[8px] shadow-lg z-10">
                    {[
                      { key: 'Best Selling',        label: t('makeup.sortBestSelling') },
                      { key: 'Newest',              label: t('makeup.sortNewest') },
                      { key: 'Price: Low to High',  label: t('makeup.sortPriceLow') },
                      { key: 'Price: High to Low',  label: t('makeup.sortPriceHigh') },
                      { key: 'Most Popular',        label: t('makeup.sortMostPopular') },
                    ].map(({ key, label }) => (
                      <button key={key} onClick={() => { setActiveSort(key); setShowSortDropdown(false) }} className={`w-full px-4 py-3 text-left text-[14px] hover:bg-[#F5F1EA] transition-colors ${activeSort === key ? 'text-[#8B7355] font-medium' : 'text-[#2B2B2B]'}`}>{label}</button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {products.length === 0 ? (
            <div className="flex items-center justify-center min-h-[400px]"><p className="text-[16px] text-[#666666]">{t('makeup.noProducts')}</p></div>
          ) : (
            <>
              {/* Row 1 */}
              {largeProducts.length > 0 && (
                <div className="flex flex-col md:flex-row gap-5 mb-10 md:mb-12 lg:mb-[64px]">
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
                      <p className="text-[16px] md:text-[17px] lg:text-[19px] font-semibold text-[#1A1A1A] mb-1 lg:mb-2">${parseFloat(product.priceValue).toFixed(2)}</p>
                      <div className="flex items-center gap-[6px]"><Stars /><span className="text-[12px] lg:text-[13px] text-[#999999] ml-1">({product.reviews})</span></div>
                    </Link>
                  ))}
                </div>
              )}

              {/* Row 3 */}
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
                    {t('makeup.loadMore')} ({products.length - displayCount} {t('makeup.remaining')})
                  </button>
                </div>
              )}


            </>
          )}
        </div>
      </div>
      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 w-12 h-12 bg-gradient-to-br from-[#C9A870] to-[#8B7355] rounded-full flex items-center justify-center shadow-[0_4px_16px_rgba(139,115,85,0.4)] z-50 transition-all duration-300"
        >
          <IoArrowUp className="w-5 h-5 text-white" />
        </button>
      )}
    </div>
  )
}

// ── Main Export ───────────────────────────────────────────────────────────────
export default function Makeup() {
  const { i18n } = useTranslation()
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640)
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return isMobile ? <MakeupMobile key={i18n.language} /> : <MakeupDesktop key={i18n.language} />
}