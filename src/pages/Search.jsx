import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  IoClose,
  IoSearchOutline,
  IoTimeOutline,
  IoTrendingUp,
  IoFlame,
  IoSparkles,
  IoStarSharp,
  IoCloseCircle,
  IoGridOutline,
  IoCartOutline,
} from 'react-icons/io5'
import { supabase } from '../lib/supabase'
import { useCart } from '../contexts/CartContext'

const RECENT_KEY = 'shanloray_recent_searches'
const MAX_RECENT = 6

const categories = ['All', 'Skincare', 'Makeup', 'Fragrance', 'Tools']

const popularSearches = [
  { term: 'Anti-Aging',    count: '2.4k searches', icon: IoTrendingUp },
  { term: 'Vitamin C',     count: '1.8k searches', icon: IoFlame      },
  { term: 'Hydration',     count: '2.1k searches', icon: IoSparkles   },
  { term: 'Night Routine', count: '1.5k searches', icon: IoStarSharp  },
]

const trendingTopics = [
  'Anti-Aging', 'Vitamin C', 'Hydration', 'Night Routine',
  'Luxury Skincare', 'Retinol', 'SPF Protection', 'Eye Care',
  'Sensitive Skin', 'Natural Ingredients', 'K-Beauty', 'Exfoliation',
]

const Stars = ({ count = 0 }) => (
  <div className="flex items-center gap-0.5">
    {[...Array(5)].map((_, i) => (
      <IoStarSharp key={i} className="w-[12px] h-[12px] text-[#C9A870]" />
    ))}
    <span className="text-[11px] text-[#999999] ml-1">({count})</span>
  </div>
)

export default function Search() {
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const inputRef = useRef(null)

  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [recentSearches, setRecentSearches] = useState(() => {
    try { return JSON.parse(localStorage.getItem(RECENT_KEY)) || [] }
    catch { return [] }
  })

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 100)
  }, [])

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([])
      setLoading(false)
      return
    }
    setLoading(true)
    const timer = setTimeout(() => doSearch(query.trim()), 350)
    return () => clearTimeout(timer)
  }, [query, activeCategory])

  const doSearch = async (q) => {
    try {
      let qb = supabase
        .from('products')
        .select('*')
        .or(`name.ilike.%${q}%,description.ilike.%${q}%,brand.ilike.%${q}%,subcategory.ilike.%${q}%`)
        .limit(20)

      if (activeCategory !== 'All') {
        qb = qb.ilike('category', activeCategory)
      }

      const { data } = await qb
      setResults(data || [])
    } catch (err) {
      console.error('Search error:', err)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  const saveRecentSearch = (term) => {
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

  const clearAllRecent = () => {
    setRecentSearches([])
    localStorage.removeItem(RECENT_KEY)
  }

  const handleTermClick = (term) => {
    setQuery(term)
    saveRecentSearch(term)
    inputRef.current?.focus()
  }

  const handleProductClick = (product) => {
    saveRecentSearch(query.trim() || product.name)
    navigate(`/product/${product.id}`)
  }

  const isSearching = query.trim().length >= 2
  const hasResults = results.length > 0
  const noResults = isSearching && !loading && !hasResults

  return (
    <div className="bg-white font-['Cormorant_Garamond'] min-h-screen">

      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-[#E8E3D9] shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
        <div className="flex items-center gap-3 px-4 md:px-[60px] lg:px-[120px] py-4">
          <Link to="/" className="flex-shrink-0">
            <IoClose className="w-[24px] h-[24px] text-[#2B2B2B] hover:text-[#8B7355] transition-colors" />
          </Link>
          <div className="relative flex-1">
            <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#8B7355]" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onBlur={() => { if (query.trim()) saveRecentSearch(query.trim()) }}
              placeholder="Search products, brands, ingredients..."
              className="w-full h-[48px] md:h-[56px] pl-[44px] pr-[44px] text-[14px] md:text-[16px] text-[#2B2B2B] bg-[#FDFBF7] border-2 border-[#E8E3D9] rounded-[12px] outline-none focus:border-[#8B7355] focus:bg-white transition-all"
            />
            {query && (
              <button type="button" onClick={() => { setQuery(''); setResults([]) }} className="absolute right-4 top-1/2 -translate-y-1/2">
                <IoCloseCircle className="w-[18px] h-[18px] text-[#999999] hover:text-[#8B7355] transition-colors" />
              </button>
            )}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 px-4 md:px-[60px] lg:px-[120px] pb-3 overflow-x-auto scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 h-[34px] px-4 rounded-full text-[13px] font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-[#8B7355] text-white'
                  : 'bg-[#F5F1EA] text-[#666666] hover:bg-[#E8E3D9]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 md:px-[60px] lg:px-[120px] py-8 lg:py-[48px]">
        <div className="max-w-[1200px] mx-auto">

          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="flex gap-2">
                {[0, 1, 2].map(i => (
                  <div key={i} className="w-2.5 h-2.5 bg-[#C9A870] rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </div>
          )}

          {/* Results */}
          {!loading && hasResults && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <p className="text-[14px] text-[#666666]">
                  <span className="font-semibold text-[#1A1A1A]">{results.length}</span> results for{' '}
                  <span className="font-semibold text-[#8B7355]">"{query}"</span>
                </p>
                <IoGridOutline className="w-[20px] h-[20px] text-[#8B7355]" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                {results.map(product => (
                  <div
                    key={product.id}
                    className="bg-white rounded-[12px] border border-[#E8E3D9] overflow-hidden hover:shadow-[0_8px_24px_rgba(0,0,0,0.10)] transition-shadow group cursor-pointer"
                    onClick={() => handleProductClick(product)}
                  >
                    <div className="relative overflow-hidden h-[160px] md:h-[180px] lg:h-[200px]">
                      <img
                        src={product.image_url || product.img_url}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-3 lg:p-4">
                      <p className="text-[11px] font-light italic text-[#8B7355] mb-1">{product.brand || 'Shan Loray'}</p>
                      <h4 className="text-[13px] lg:text-[14px] font-medium text-[#1A1A1A] mb-1.5 leading-snug line-clamp-2">{product.name}</h4>
                      <Stars count={product.review_count || 0} />
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-[14px] lg:text-[16px] font-semibold text-[#1A1A1A]">
                          ${parseFloat(product.price).toFixed(2)}
                        </span>
                        <button
                          onClick={e => {
                            e.stopPropagation()
                            addToCart(
                              product.id,
                              product.name,
                              product.image_url || product.img_url,
                              product.brand || 'Shan Loray',
                              product.size || '',
                              product.price,
                              1
                            )
                          }}
                          className="w-[36px] h-[36px] bg-[#8B7355] text-white rounded-full flex items-center justify-center hover:bg-[#7a6448] transition-colors"
                        >
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
              <p className="text-[14px] text-[#666666] mb-6">Try a different search term or browse our popular topics</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {trendingTopics.slice(0, 6).map(topic => (
                  <button
                    key={topic}
                    onClick={() => handleTermClick(topic)}
                    className="bg-[#F5F1EA] px-4 py-2 rounded-full text-[13px] text-[#8B7355] hover:bg-[#8B7355] hover:text-white transition-all"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Default State */}
          {!isSearching && !loading && (
            <div className="space-y-10">

              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-[18px] lg:text-[20px] font-medium text-[#1A1A1A]">Recent Searches</h2>
                    <button onClick={clearAllRecent} className="text-[13px] text-[#8B7355] hover:underline">Clear All</button>
                  </div>
                  <div>
                    {recentSearches.map(search => (
                      <div
                        key={search}
                        onClick={() => handleTermClick(search)}
                        className="flex items-center justify-between py-[14px] border-b border-[#F5F1EA] cursor-pointer hover:bg-[#FDFBF7] px-2 rounded transition-colors"
                      >
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
                <h2 className="text-[18px] lg:text-[20px] font-medium text-[#1A1A1A] mb-5">Popular Right Now</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4">
                  {popularSearches.map(item => (
                    <div
                      key={item.term}
                      onClick={() => handleTermClick(item.term)}
                      className="bg-white border border-[#E8E3D9] rounded-[12px] p-4 lg:p-5 cursor-pointer hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:border-[#C9A870] transition-all"
                    >
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
                  <h2 className="text-[18px] lg:text-[20px] font-medium text-[#1A1A1A]">Trending Topics</h2>
                </div>
                <div className="flex flex-wrap gap-2 lg:gap-3">
                  {trendingTopics.map(topic => (
                    <button
                      key={topic}
                      onClick={() => handleTermClick(topic)}
                      className="bg-white px-4 py-2 rounded-full border border-[#E8E3D9] text-[13px] text-[#8B7355] hover:bg-[#8B7355] hover:text-white hover:border-[#8B7355] transition-all"
                    >
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