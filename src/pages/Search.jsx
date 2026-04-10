import { useTranslation } from 'react-i18next'
import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  IoClose, IoSearchOutline, IoTimeOutline,
  IoTrendingUp, IoFlame, IoSparkles, IoStarSharp,
  IoCloseCircle, IoCartOutline, IoChevronForward,
} from 'react-icons/io5'
import { getSkincareProducts, getMakeupProducts, getFragranceProducts, formatProductsForUI } from '../lib/productsService'
import { useCart } from '../contexts/CartContext'

const RECENT_KEY = 'shanloray_recent_searches'
const MAX_RECENT = 6

const skinConcerns   = ['Anti-Aging', 'Hydration', 'Brightening', 'Acne Care', 'Redness Relief', 'Dark Spots']
const skinTypes      = ['Dry', 'Oily', 'Combination', 'Sensitive', 'Mature', 'All Skin Types']
const ingredients    = ['Retinol', 'Vitamin C', 'Hyaluronic Acid', 'Niacinamide', 'AHA/BHA', 'Ceramides', 'Peptides']
const makeupCats     = ['Foundation', 'Concealer', 'Powder', 'Blush', 'Highlighter', 'Lipstick', 'Mascara']
const fragranceFams  = ['Floral', 'Woody', 'Citrus', 'Oriental', 'Fresh', 'Spicy', 'Aquatic', 'Fruity']

const popularSearches = [
  { term: 'Anti-Aging',    count: '2.4k searches', icon: IoTrendingUp },
  { term: 'Vitamin C',     count: '1.8k searches', icon: IoFlame      },
  { term: 'Hydration',     count: '2.1k searches', icon: IoSparkles   },
  { term: 'Night Routine', count: '1.5k searches', icon: IoStarSharp  },
]

const trendingTopics = [
  'Anti-Aging', 'Vitamin C', 'Hydration', 'Night Routine',
  'Luxury Skincare', 'Retinol', 'SPF Protection', 'Eye Care',
  'Sensitive Skin', 'K-Beauty', 'Exfoliation', 'Niacinamide',
]

const Stars = () => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => <IoStarSharp key={i} className="w-[12px] h-[12px] text-[#C9A870]" />)}
  </div>
)

export default function Search() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const inputRef = useRef(null)
  const wrapperRef = useRef(null)

  const [allProducts, setAllProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [recentSearches, setRecentSearches] = useState(() => {
    try { return JSON.parse(localStorage.getItem(RECENT_KEY)) || [] }
    catch { return [] }
  })

  // Load ALL products on mount
  useEffect(() => {
    async function loadAll() {
      setLoading(true)
      const [sk, mk, fr] = await Promise.all([
        getSkincareProducts(),
        getMakeupProducts(),
        getFragranceProducts(),
      ])
      setAllProducts(formatProductsForUI([...sk, ...mk, ...fr]))
      setLoading(false)
    }
    loadAll()
    setTimeout(() => inputRef.current?.focus(), 200)
  }, [])

  // Live suggestions from loaded products
  useEffect(() => {
    if (query.trim().length === 0) {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }
    const q = query.toLowerCase()
    const matches = allProducts
      .filter(p => {
        const catMatch = activeCategory === 'All' || p.category?.toLowerCase() === activeCategory.toLowerCase()
        const nameMatch = p.name?.toLowerCase().includes(q)
        const brandMatch = p.brand?.toLowerCase().includes(q)
        const subMatch = p.subcategory?.toLowerCase().includes(q)
        const concernMatch = p.skin_concerns?.some(c => c.toLowerCase().includes(q))
        const typeMatch = p.skin_types?.some(t => t.toLowerCase().includes(q))
        const ingMatch = p.ingredients?.some(i => i.toLowerCase().includes(q))
        return catMatch && (nameMatch || brandMatch || subMatch || concernMatch || typeMatch || ingMatch)
      })
      .slice(0, 6)
    setSuggestions(matches)
    setShowSuggestions(true)
  }, [query, allProducts, activeCategory])

  // Close suggestions on outside click
  useEffect(() => {
    const handler = (e) => {
      if (!wrapperRef.current?.contains(e.target)) setShowSuggestions(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Full filtered results
  const results = query.trim().length >= 2
    ? allProducts.filter(p => {
        const q = query.toLowerCase()
        const catMatch = activeCategory === 'All' || p.category?.toLowerCase() === activeCategory.toLowerCase()
        const nameMatch = p.name?.toLowerCase().includes(q)
        const brandMatch = p.brand?.toLowerCase().includes(q)
        const subMatch = p.subcategory?.toLowerCase().includes(q)
        const concernMatch = p.skin_concerns?.some(c => c.toLowerCase().includes(q))
        const typeMatch = p.skin_types?.some(t => t.toLowerCase().includes(q))
        const ingMatch = p.ingredients?.some(i => i.toLowerCase().includes(q))
        const famMatch = p.fragrance_family?.toLowerCase().includes(q)
        return catMatch && (nameMatch || brandMatch || subMatch || concernMatch || typeMatch || ingMatch || famMatch)
      })
    : []

  const isSearching = query.trim().length >= 2
  const hasResults = results.length > 0
  const noResults = isSearching && !hasResults

  const saveRecent = (term) => {
    if (!term.trim()) return
    const updated = [term, ...recentSearches.filter(s => s !== term)].slice(0, MAX_RECENT)
    setRecentSearches(updated)
    localStorage.setItem(RECENT_KEY, JSON.stringify(updated))
  }

  const removeRecent = (term, e) => {
    e.stopPropagation()
    const updated = recentSearches.filter(s => s !== term)
    setRecentSearches(updated)
    localStorage.setItem(RECENT_KEY, JSON.stringify(updated))
  }

  const handleTermClick = (term) => {
    setQuery(term)
    saveRecent(term)
    setShowSuggestions(false)
    inputRef.current?.focus()
  }

  const handleSuggestionClick = (product) => {
    saveRecent(product.name)
    setShowSuggestions(false)
    setQuery(product.name)
  }

  const handleProductClick = (product) => {
    saveRecent(query.trim() || product.name)
    navigate(`/product/${product.id}`)
  }

  const highlightMatch = (text, q) => {
    if (!q || !text) return text
    const parts = text.split(new RegExp(`(${q})`, 'gi'))
    return parts.map((part, i) =>
      part.toLowerCase() === q.toLowerCase()
        ? <span key={i} className="font-bold text-[#8B7355]">{part}</span>
        : part
    )
  }

  return (
    <div className="bg-white font-['Cormorant_Garamond'] min-h-screen">

      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-[#E8E3D9] shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
        <div className="flex items-center gap-3 px-4 md:px-[60px] lg:px-[120px] py-4">
          <Link to="/" className="flex-shrink-0">
            <IoClose className="w-[24px] h-[24px] text-[#2B2B2B] hover:text-[#8B7355] transition-colors" />
          </Link>

          {/* Search Input with Live Suggestions */}
          <div ref={wrapperRef} className="relative flex-1">
            <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#8B7355] z-10" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
              onBlur={() => { if (query.trim()) saveRecent(query.trim()) }}
              placeholder="Search products, skin types, ingredients, brands..."
              className="w-full h-[48px] md:h-[56px] pl-[44px] pr-[44px] text-[14px] md:text-[16px] text-[#2B2B2B] bg-[#FDFBF7] border-2 border-[#E8E3D9] rounded-[12px] outline-none focus:border-[#8B7355] focus:bg-white transition-all"
            />
            {query && (
              <button onClick={() => { setQuery(''); setShowSuggestions(false) }} className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
                <IoCloseCircle className="w-[18px] h-[18px] text-[#999999] hover:text-[#8B7355] transition-colors" />
              </button>
            )}

            {/* Live Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-[calc(100%+6px)] left-0 right-0 bg-white rounded-[12px] shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-[#E8E3D9] overflow-hidden z-50">
                {suggestions.map((product) => (
                  <button
                    key={product.id}
                    onMouseDown={() => handleSuggestionClick(product)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#FDFBF7] transition-colors text-left border-b border-[#F5F1EA] last:border-0"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-[40px] h-[40px] rounded-[6px] object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] text-[#1A1A1A] leading-tight truncate">
                        {highlightMatch(product.name, query)}
                      </p>
                      <p className="text-[12px] text-[#8B7355] mt-0.5">{product.price}</p>
                    </div>
                    <span className="text-[11px] text-[#999999] flex-shrink-0">{product.category}</span>
                    <IoChevronForward className="w-[14px] h-[14px] text-[#999999] flex-shrink-0" />
                  </button>
                ))}
                {suggestions.length === 0 && query.trim().length > 0 && (
                  <div className="px-4 py-3">
                    <p className="text-[13px] text-[#999999]">No products found for "{query}"</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 px-4 md:px-[60px] lg:px-[120px] pb-3 overflow-x-auto scrollbar-hide">
          {['All', 'Skincare', 'Makeup', 'Fragrance'].map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 h-[34px] px-4 rounded-full text-[13px] font-medium transition-all ${
                activeCategory === cat ? 'bg-[#8B7355] text-white' : 'bg-[#F5F1EA] text-[#666666] hover:bg-[#E8E3D9]'
              }`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 md:px-[60px] lg:px-[120px] py-8 lg:py-[48px]">
        <div className="max-w-[1200px] mx-auto">

          {/* Products loading */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="flex gap-2">
                {[0,1,2].map(i => (
                  <div key={i} className="w-2.5 h-2.5 bg-[#C9A870] rounded-full animate-bounce" style={{ animationDelay: `${i*0.15}s` }} />
                ))}
              </div>
            </div>
          )}

          {/* Search Results */}
          {!loading && hasResults && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <p className="text-[14px] text-[#666666]">
                  <span className="font-semibold text-[#1A1A1A]">{results.length}</span> results for{' '}
                  <span className="font-semibold text-[#8B7355]">"{query}"</span>
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                {results.map(product => (
                  <div key={product.id}
                    className="bg-white rounded-[12px] border border-[#E8E3D9] overflow-hidden hover:shadow-[0_8px_24px_rgba(0,0,0,0.10)] transition-shadow group cursor-pointer"
                    onClick={() => handleProductClick(product)}>
                    <div className="relative overflow-hidden h-[160px] md:h-[180px] lg:h-[200px]">
                      <img src={product.image} alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-3 lg:p-4">
                      <p className="text-[11px] font-light italic text-[#8B7355] mb-1">{product.brand || 'Shan Loray'}</p>
                      <h4 className="text-[13px] lg:text-[14px] font-medium text-[#1A1A1A] mb-1.5 leading-snug line-clamp-2">{product.name}</h4>
                      <Stars />
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-[14px] lg:text-[16px] font-semibold text-[#1A1A1A]">{product.price}</span>
                        <button
                          onClick={e => {
                            e.stopPropagation()
                            addToCart(product.id, product.name, product.image, product.brand || 'Shan Loray', product.size || '', product.priceValue, 1)
                          }}
                          className="w-[36px] h-[36px] bg-[#8B7355] text-white rounded-full flex items-center justify-center hover:bg-[#7a6448] transition-colors">
                          <IoCartOutline className="w-[16px] h-[16px]" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {!loading && noResults && (
            <div className="text-center py-16">
              <div className="w-[80px] h-[80px] bg-[#F5F1EA] rounded-full flex items-center justify-center mx-auto mb-5">
                <IoSearchOutline className="w-[36px] h-[36px] text-[#C9A870]" />
              </div>
              <h3 className="text-[20px] lg:text-[24px] font-semibold text-[#1A1A1A] mb-2">No results for "{query}"</h3>
              <p className="text-[14px] text-[#666666] mb-6">Try a different search term or explore our trending topics</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {trendingTopics.slice(0, 6).map(topic => (
                  <button key={topic} onClick={() => handleTermClick(topic)}
                    className="bg-[#F5F1EA] px-4 py-2 rounded-full text-[13px] text-[#8B7355] hover:bg-[#8B7355] hover:text-white transition-all">
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Default State — no query */}
          {!loading && !isSearching && (
            <div className="space-y-10">

              {/* Quick Filter Pills */}
              <div>
                <h2 className="text-[18px] lg:text-[20px] font-medium text-[#1A1A1A] mb-5">{t('search.browseBy')}</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-[11px] font-semibold text-[#999999] tracking-[1.5px] mb-2">{t('search.skinConcerns')}</p>
                    <div className="flex flex-wrap gap-2">
                      {skinConcerns.map(c => (
                        <button key={c} onClick={() => navigate(`/skincare?concern=${encodeURIComponent(c)}`)}
                          className="h-[32px] px-3 bg-[#FFF4E0] text-[#B07500] text-[12px] font-medium rounded-full hover:bg-[#8B7355] hover:text-white transition-all">
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-[#999999] tracking-[1.5px] mb-2">{t('search.skinTypes')}</p>
                    <div className="flex flex-wrap gap-2">
                      {skinTypes.map(t => (
                        <button key={t} onClick={() => navigate(`/skincare?skinType=${encodeURIComponent(t)}`)}
                          className="h-[32px] px-3 bg-[#EEF4FF] text-[#3B5BAD] text-[12px] font-medium rounded-full hover:bg-[#8B7355] hover:text-white transition-all">
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-[#999999] tracking-[1.5px] mb-2">INGREDIENTS</p>
                    <div className="flex flex-wrap gap-2">
                      {ingredients.map(i => (
                        <button key={i} onClick={() => navigate(`/skincare?ingredient=${encodeURIComponent(i)}`)}
                          className="h-[32px] px-3 bg-[#F0FAF0] text-[#2D7D3B] text-[12px] font-medium rounded-full hover:bg-[#8B7355] hover:text-white transition-all">
                          {i}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-[#999999] tracking-[1.5px] mb-2">MAKEUP</p>
                    <div className="flex flex-wrap gap-2">
                      {makeupCats.map(m => (
                        <button key={m} onClick={() => navigate(`/makeup?subcategory=${encodeURIComponent(m)}`)}
                          className="h-[32px] px-3 bg-[#FCE8F3] text-[#9B2C6E] text-[12px] font-medium rounded-full hover:bg-[#8B7355] hover:text-white transition-all">
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-[#999999] tracking-[1.5px] mb-2">FRAGRANCE</p>
                    <div className="flex flex-wrap gap-2">
                      {fragranceFams.map(f => (
                        <button key={f} onClick={() => navigate(`/fragrance?family=${encodeURIComponent(f)}`)}
                          className="h-[32px] px-3 bg-[#EEE8F8] text-[#5B3BAD] text-[12px] font-medium rounded-full hover:bg-[#8B7355] hover:text-white transition-all">
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-[18px] lg:text-[20px] font-medium text-[#1A1A1A]">{t('search.recentSearches')}</h2>
                    <button onClick={() => { setRecentSearches([]); localStorage.removeItem(RECENT_KEY) }}
                      className="text-[13px] text-[#8B7355] hover:underline">{t('search.clearAll')}</button>
                  </div>
                  <div>
                    {recentSearches.map(search => (
                      <div key={search} onClick={() => handleTermClick(search)}
                        className="flex items-center justify-between py-[13px] border-b border-[#F5F1EA] cursor-pointer hover:bg-[#FDFBF7] px-2 rounded transition-colors">
                        <div className="flex items-center gap-3">
                          <IoTimeOutline className="w-[18px] h-[18px] text-[#8B7355] flex-shrink-0" />
                          <span className="text-[14px] lg:text-[15px] text-[#2B2B2B]">{search}</span>
                        </div>
                        <button onClick={e => removeRecent(search, e)}>
                          <IoClose className="w-[16px] h-[16px] text-[#999999] hover:text-[#8B7355] transition-colors" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular Right Now */}
              <div>
                <h2 className="text-[18px] lg:text-[20px] font-medium text-[#1A1A1A] mb-5">{t('search.popularRightNow')}</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4">
                  {popularSearches.map(item => (
                    <div key={item.term} onClick={() => handleTermClick(item.term)}
                      className="bg-white border border-[#E8E3D9] rounded-[12px] p-4 lg:p-5 cursor-pointer hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:border-[#C9A870] transition-all">
                      <item.icon className="w-[28px] h-[28px] text-[#C9A870] mb-3" />
                      <h3 className="text-[14px] lg:text-[15px] font-medium text-[#1A1A1A] mb-1">{item.term}</h3>
                      <p className="text-[12px] text-[#666666]">{item.count}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trending Topics */}
              <div className="bg-[#FDFBF7] rounded-[16px] p-5 lg:p-8">
                <div className="flex items-center gap-2 mb-5">
                  <IoFlame className="w-[20px] h-[20px] text-[#C9A870]" />
                  <h2 className="text-[18px] lg:text-[20px] font-medium text-[#1A1A1A]">{t('search.trendingTopics')}</h2>
                </div>
                <div className="flex flex-wrap gap-2 lg:gap-3">
                  {trendingTopics.map(topic => (
                    <button key={topic} onClick={() => handleTermClick(topic)}
                      className="bg-white px-4 py-2 rounded-full border border-[#E8E3D9] text-[13px] text-[#8B7355] hover:bg-[#8B7355] hover:text-white hover:border-[#8B7355] transition-all">
                      {topic}
                    </button>
                  ))}
                </div>
              </div>

              {/* Browse Categories */}
              <div>
                <h2 className="text-[18px] lg:text-[20px] font-medium text-[#1A1A1A] mb-5">Browse Categories</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4">
                  {[
                    { name: 'Skincare',    path: '/skincare',    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=200&fit=crop' },
                    { name: 'Makeup',      path: '/makeup',      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&h=200&fit=crop' },
                    { name: 'Fragrance',   path: '/fragrance',   image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&h=200&fit=crop' },
                    { name: 'Collections', path: '/collections', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&h=200&fit=crop' },
                  ].map(cat => (
                    <Link key={cat.name} to={cat.path}>
                      <div className="relative h-[120px] lg:h-[140px] rounded-[12px] overflow-hidden group">
                        <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-black/35 group-hover:bg-black/50 transition-colors" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-white text-[15px] lg:text-[17px] font-semibold">{cat.name}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  )
}