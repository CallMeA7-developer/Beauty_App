import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import i18n from '../i18n'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  IoMenuOutline,
  IoClose,
  IoSearchOutline,
  IoPersonOutline,
  IoHeartOutline,
  IoBagOutline,
  IoChevronForward,
  IoLogoInstagram,
  IoLogoFacebook,
  IoLogoPinterest,
  IoLogoYoutube,
  IoOptionsOutline,
  IoTimeOutline,
  IoTrendingUp,
  IoFlame,
  IoSparkles,
  IoStarSharp,
  IoBeakerOutline,
  IoAlertCircleOutline,
  IoCloseCircle,
  IoLogOutOutline,
} from 'react-icons/io5'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'
import { useWishlist } from '../contexts/WishlistContext'
import AuthModal from './AuthModal'

// ─── Shared Data ──────────────────────────────────────────────────────────────
const getDesktopNavLinks = (t) => [
  { label: t('nav.collections'), path: '/collections' },
  { label: t('nav.skincare'),    path: '/skincare'    },
  { label: t('nav.makeup'),      path: '/makeup'      },
  { label: t('nav.fragrance'),   path: '/fragrance'   },
  { label: t('nav.technology'),  path: '/technology'  },
  { label: t('nav.journal'),     path: '/journal'     },
]

const getDrawerNavItems = (t) => [
  { label: t('nav.home'),            path: '/',                      bold: true  },
  { label: t('nav.shop'),            path: '/collections',           bold: true  },
  { label: t('nav.skincare'),        path: '/skincare',              bold: false },
  { label: t('nav.makeup'),          path: '/makeup',                bold: false },
  { label: t('nav.fragrance'),       path: '/fragrance',             bold: false },
  { label: t('nav.aiConsultation'),  path: '/ai-consultation',       bold: false, badge: t('nav.new') },
  { label: t('nav.virtualTryOn'),    path: '/virtual-tryon',         bold: false },
  { label: t('nav.technology'),      path: '/technology',            bold: false },
  { label: t('nav.about'),           path: '/advanced-formulations', bold: false },
]

const utilityActions = [
  { icon: IoSearchOutline, label: 'Search Products', path: '/search',   count: null, isSearch: true },
  { icon: IoPersonOutline, label: 'My Account',      path: '/account',  count: null },
  { icon: IoHeartOutline,  label: 'Saved Items',     path: '/wishlist', count: '3'  },
  { icon: IoBagOutline,    label: 'Cart',             path: '/cart',     count: '2'  },
]

const socialLinks = [
  { icon: IoLogoInstagram, href: 'https://instagram.com/shanloray' },
  { icon: IoLogoFacebook,  href: 'https://facebook.com/shanloray'  },
  { icon: IoLogoPinterest, href: 'https://pinterest.com/shanloray' },
  { icon: IoLogoYoutube,   href: 'https://youtube.com/shanloray'   },
]

// ─── Search Data ──────────────────────────────────────────────────────────────
const quickCategories = ['All', 'Skincare', 'Makeup', 'Fragrance', 'Tools', 'Collections', 'Ingredients']

const recentSearches = [
  'Vitamin C Serum', 'Anti-aging cream', 'Hydrating face mask',
  'Retinol treatment', 'Eye cream for dark circles', 'Gentle cleanser',
]

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

const productSuggestions = [
  { name: 'Age-Defying Serum',      brand: 'Shan Loray', price: '$124', reviews: 342, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=160&h=160&fit=crop' },
  { name: 'Vitamin C Brightening',  brand: 'Shan Loray', price: '$95',  reviews: 521, image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=160&h=160&fit=crop' },
  { name: 'Hydrating Essence',      brand: 'Shan Loray', price: '$78',  reviews: 467, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=160&h=160&fit=crop' },
]

const collections = [
  { name: 'Anti-Aging Collection', items: '12 products', image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=80&h=80&fit=crop' },
  { name: 'Hydration Essentials',  items: '8 products',  image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=80&h=80&fit=crop' },
  { name: 'Brightening Bundle',    items: '6 products',  image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=80&h=80&fit=crop' },
]

const ingredients  = ['Vitamin C (Ascorbic Acid)', 'Retinol', 'Hyaluronic Acid', 'Niacinamide', 'Peptides']
const skinConcerns = ['Fine Lines & Wrinkles', 'Dark Spots', 'Dryness', 'Uneven Texture', 'Loss of Firmness']

// ─── Search Overlay ───────────────────────────────────────────────────────────
function SearchOverlay({ isOpen, onClose }) {
  const navigate = useNavigate()

  const toggleLanguage = () => {
    const newLang = currentLang === 'en' ? 'ru' : 'en'
    setCurrentLang(newLang)
    i18n.changeLanguage(newLang)
    localStorage.setItem('shanloray_language', newLang)
  }
  const { addToCart } = useCart()
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [allProducts, setAllProducts] = useState([])
  const [loadingProducts, setLoadingProducts] = useState(false)
  const [recentSearches, setRecentSearches] = useState(() => {
    try { return JSON.parse(localStorage.getItem('shanloray_recent_searches')) || [] }
    catch { return [] }
  })

  const skinConcernsFilter  = ['Anti-Aging', 'Hydration', 'Brightening', 'Acne Care', 'Redness Relief', 'Dark Spots']
  const skinTypesFilter     = ['Dry', 'Oily', 'Combination', 'Sensitive', 'Mature']
  const ingredientsFilter   = ['Retinol', 'Vitamin C', 'Hyaluronic Acid', 'Niacinamide', 'AHA/BHA', 'Ceramides']
  const makeupCatsFilter    = ['Foundation', 'Concealer', 'Blush', 'Highlighter', 'Lipstick', 'Mascara']
  const fragranceFamsFilter = ['Floral', 'Woody', 'Citrus', 'Oriental', 'Fresh', 'Spicy']

  useEffect(() => {
    if (!isOpen) return
    setLoadingProducts(true)
    import('../lib/productsService').then(async ({ getSkincareProducts, getMakeupProducts, getFragranceProducts, formatProductsForUI }) => {
      const [sk, mk, fr] = await Promise.all([getSkincareProducts(), getMakeupProducts(), getFragranceProducts()])
      setAllProducts(formatProductsForUI([...sk, ...mk, ...fr]))
      setLoadingProducts(false)
    })
  }, [isOpen])

  // Filter products based on query and category
  const results = query.trim().length >= 2
    ? allProducts.filter(p => {
        const q = query.toLowerCase()
        const catMatch = activeCategory === 'All' || p.category?.toLowerCase() === activeCategory.toLowerCase()
        return catMatch && (
          p.name?.toLowerCase().includes(q) ||
          p.brand?.toLowerCase().includes(q) ||
          p.subcategory?.toLowerCase().includes(q) ||
          p.skin_concerns?.some(c => c.toLowerCase().includes(q)) ||
          p.skin_types?.some(t => t.toLowerCase().includes(q)) ||
          p.ingredients?.some(i => i.toLowerCase().includes(q)) ||
          p.fragrance_family?.toLowerCase().includes(q)
        )
      }).slice(0, 12)
    : []

  // Suggestions (first 6 matches)
  const suggestions = query.trim().length >= 1
    ? allProducts.filter(p => {
        const q = query.toLowerCase()
        const catMatch = activeCategory === 'All' || p.category?.toLowerCase() === activeCategory.toLowerCase()
        return catMatch && (p.name?.toLowerCase().includes(q) || p.brand?.toLowerCase().includes(q))
      }).slice(0, 6)
    : []

  const saveRecent = (term) => {
    if (!term.trim()) return
    const updated = [term, ...recentSearches.filter(s => s !== term)].slice(0, 6)
    setRecentSearches(updated)
    localStorage.setItem('shanloray_recent_searches', JSON.stringify(updated))
  }

  const handleTermClick = (term) => {
    setQuery(term)
    saveRecent(term)
  }

  const handleProductClick = (product) => {
    saveRecent(query.trim() || product.name)
    onClose()
    navigate(`/product/${product.id}`)
  }

  const handleFilterClick = (path) => {
    onClose()
    navigate(path)
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

  const isSearching = query.trim().length >= 2
  const hasResults = results.length > 0
  const noResults = isSearching && !loadingProducts && !hasResults

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-white z-[60] overflow-y-auto font-['Cormorant_Garamond']">

      {/* Header */}
      <div className="min-h-[80px] bg-white flex items-center gap-3 px-4 md:px-[60px] lg:px-[120px] border-b border-[#E8E3D9] sticky top-0 z-10">
        <button onClick={onClose} className="flex-shrink-0">
          <IoClose className="w-[26px] h-[26px] text-[#2B2B2B] hover:text-[#8B7355] transition-colors" />
        </button>

        <div className="relative flex-1 max-w-[800px]">
          <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 w-[20px] h-[20px] text-[#8B7355]" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onBlur={() => { if (query.trim()) saveRecent(query.trim()) }}
            placeholder={t('search.placeholder')}
            autoFocus
            className="w-full h-[52px] pl-[48px] pr-[44px] text-[15px] md:text-[17px] text-[#2B2B2B] bg-[#FDFBF7] border-2 border-[#E8E3D9] rounded-[12px] outline-none focus:border-[#8B7355] focus:bg-white transition-all"
          />
          {query && (
            <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2">
              <IoCloseCircle className="w-[20px] h-[20px] text-[#999]" />
            </button>
          )}

          {/* Live Suggestions */}
          {suggestions.length > 0 && query.trim().length >= 1 && (
            <div className="absolute top-[calc(100%+6px)] left-0 right-0 bg-white rounded-[12px] shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-[#E8E3D9] overflow-hidden z-50">
              {suggestions.map(product => (
                <button key={product.id} onMouseDown={() => handleProductClick(product)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#FDFBF7] transition-colors text-left border-b border-[#F5F1EA] last:border-0">
                  <img src={product.image} alt={product.name} className="w-[40px] h-[40px] rounded-[6px] object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] text-[#1A1A1A] truncate">{highlightMatch(product.name, query)}</p>
                    <p className="text-[12px] text-[#8B7355]">{product.price}</p>
                  </div>
                  <span className="text-[11px] text-[#999999] flex-shrink-0">{product.category}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="bg-[#FDFBF7] px-4 md:px-[60px] lg:px-[120px] py-3 overflow-x-auto border-b border-[#E8E3D9]">
        <div className="flex items-center gap-2 w-max md:w-auto">
          {['All', 'Skincare', 'Makeup', 'Fragrance'].map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`h-[36px] px-4 rounded-full text-[13px] font-medium whitespace-nowrap transition-all ${
                activeCategory === cat ? 'bg-[#8B7355] text-white' : 'bg-white text-[#666] border border-[#E8E3D9] hover:border-[#8B7355]'
              }`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 md:px-[60px] lg:px-[120px] py-8 max-w-[1200px] mx-auto">

        {/* Loading */}
        {loadingProducts && !isSearching && (
          <div className="flex justify-center py-10">
            <div className="flex gap-2">
              {[0,1,2].map(i => <div key={i} className="w-2.5 h-2.5 bg-[#C9A870] rounded-full animate-bounce" style={{ animationDelay: `${i*0.15}s` }} />)}
            </div>
          </div>
        )}

        {/* Search Results */}
        {isSearching && !loadingProducts && hasResults && (
          <div className="mb-10">
            <p className="text-[14px] text-[#666666] mb-5">
              <span className="font-semibold text-[#1A1A1A]">{results.length}</span> results for <span className="font-semibold text-[#8B7355]">"{query}"</span>
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {results.map(product => (
                <div key={product.id} onClick={() => handleProductClick(product)}
                  className="bg-white rounded-[12px] border border-[#E8E3D9] overflow-hidden hover:shadow-[0_8px_24px_rgba(0,0,0,0.10)] transition-shadow group cursor-pointer">
                  <div className="h-[160px] overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-3">
                    <p className="text-[11px] italic text-[#8B7355] mb-1">{product.brand}</p>
                    <h4 className="text-[13px] font-medium text-[#1A1A1A] mb-1 line-clamp-2 leading-snug">{product.name}</h4>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[14px] font-semibold text-[#1A1A1A]">{product.price}</span>
                      <button onClick={e => { e.stopPropagation(); addToCart(product.id, product.name, product.image, product.brand, product.size || '', product.priceValue, 1) }}
                        className="w-[32px] h-[32px] bg-[#8B7355] text-white rounded-full flex items-center justify-center hover:bg-[#7a6448] transition-colors">
                        <svg className="w-[14px] h-[14px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 11H4L5 9z" /></svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {noResults && (
          <div className="text-center py-12 mb-8">
            <IoSearchOutline className="w-[48px] h-[48px] text-[#C9A870] mx-auto mb-4" />
            <h3 className="text-[20px] font-semibold text-[#1A1A1A] mb-2">No results for "{query}"</h3>
            <p className="text-[14px] text-[#666666]">{t('search.tryDifferent')}</p>
          </div>
        )}

        {/* Default State */}
        {!isSearching && !loadingProducts && (
          <div>
            {/* Browse By */}
            <div className="mb-10">
              <h2 className="text-[18px] md:text-[20px] font-medium text-[#1A1A1A] mb-5">{t('search.browseBy')}</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-[11px] font-semibold text-[#999999] tracking-[1.5px] mb-2">{t('search.skinConcerns')}</p>
                  <div className="flex flex-wrap gap-2">
                    {skinConcernsFilter.map(c => (
                      <button key={c} onClick={() => handleFilterClick(`/skincare?concern=${encodeURIComponent(c)}`)}
                        className="h-[30px] px-3 bg-[#FFF4E0] text-[#B07500] text-[12px] font-medium rounded-full hover:bg-[#8B7355] hover:text-white transition-all">{c}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-[#999999] tracking-[1.5px] mb-2">{t('search.skinTypes')}</p>
                  <div className="flex flex-wrap gap-2">
                    {skinTypesFilter.map(t => (
                      <button key={t} onClick={() => handleFilterClick(`/skincare?skinType=${encodeURIComponent(t)}`)}
                        className="h-[30px] px-3 bg-[#EEF4FF] text-[#3B5BAD] text-[12px] font-medium rounded-full hover:bg-[#8B7355] hover:text-white transition-all">{t}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-[#999999] tracking-[1.5px] mb-2">{t('search.keyIngredients')}</p>
                  <div className="flex flex-wrap gap-2">
                    {ingredientsFilter.map(i => (
                      <button key={i} onClick={() => handleFilterClick(`/skincare?ingredient=${encodeURIComponent(i)}`)}
                        className="h-[30px] px-3 bg-[#F0FAF0] text-[#2D7D3B] text-[12px] font-medium rounded-full hover:bg-[#8B7355] hover:text-white transition-all">{i}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-[#999999] tracking-[1.5px] mb-2">MAKEUP</p>
                  <div className="flex flex-wrap gap-2">
                    {makeupCatsFilter.map(m => (
                      <button key={m} onClick={() => handleFilterClick(`/makeup?subcategory=${encodeURIComponent(m)}`)}
                        className="h-[30px] px-3 bg-[#FCE8F3] text-[#9B2C6E] text-[12px] font-medium rounded-full hover:bg-[#8B7355] hover:text-white transition-all">{m}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-[#999999] tracking-[1.5px] mb-2">FRAGRANCE</p>
                  <div className="flex flex-wrap gap-2">
                    {fragranceFamsFilter.map(f => (
                      <button key={f} onClick={() => handleFilterClick(`/fragrance?family=${encodeURIComponent(f)}`)}
                        className="h-[30px] px-3 bg-[#EEE8F8] text-[#5B3BAD] text-[12px] font-medium rounded-full hover:bg-[#8B7355] hover:text-white transition-all">{f}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div className="mb-10">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-[18px] md:text-[20px] font-medium text-[#1A1A1A]">{t('search.recentSearches')}</h2>
                  <button onClick={() => { setRecentSearches([]); localStorage.removeItem('shanloray_recent_searches') }}
                    className="text-[13px] text-[#8B7355] hover:underline">{t('search.clearAll')}</button>
                </div>
                {recentSearches.map(search => (
                  <div key={search} onClick={() => handleTermClick(search)}
                    className="flex items-center justify-between py-4 border-b border-[#F5F1EA] cursor-pointer hover:bg-[#FDFBF7] px-2 rounded">
                    <div className="flex items-center gap-3">
                      <IoTimeOutline className="w-[18px] h-[18px] text-[#8B7355]" />
                      <span className="text-[15px] text-[#2B2B2B]">{search}</span>
                    </div>
                    <button onClick={e => { e.stopPropagation(); const u = recentSearches.filter(s => s !== search); setRecentSearches(u); localStorage.setItem('shanloray_recent_searches', JSON.stringify(u)) }}>
                      <IoClose className="w-[16px] h-[16px] text-[#999]" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Popular Right Now */}
            <div className="mb-10">
              <h2 className="text-[18px] md:text-[24px] font-medium text-[#1A1A1A] mb-5">{t('search.popularRightNow')}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {popularSearches.map(item => (
                  <div key={item.term} onClick={() => handleTermClick(item.term)}
                    className="bg-white border border-[#E8E3D9] rounded-[8px] p-5 cursor-pointer hover:shadow-md hover:border-[#C9A870] transition-all">
                    <item.icon className="w-[28px] h-[28px] text-[#C9A870] mb-3" />
                    <h3 className="text-[15px] font-medium text-[#1A1A1A] mb-2">{item.term}</h3>
                    <p className="text-[12px] text-[#666]">{item.count}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Trending Topics */}
            <div className="bg-[#FDFBF7] rounded-[12px] p-6">
              <div className="flex items-center gap-2 mb-4">
                <IoFlame className="w-[22px] h-[22px] text-[#C9A870]" />
                <h2 className="text-[18px] font-medium text-[#1A1A1A]">{t('search.trendingTopics')}</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {trendingTopics.map(topic => (
                  <button key={topic} onClick={() => handleTermClick(topic)}
                    className="bg-white px-4 py-2 rounded-full border border-[#E8E3D9] text-[13px] text-[#8B7355] hover:bg-[#8B7355] hover:text-white transition-colors">
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}


// ─── Mobile Drawer ────────────────────────────────────────────────────────────
function MobileDrawer({ isOpen, onClose, onSearchOpen }) {
  const location = useLocation()

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
      )}

      <div className={`fixed top-0 left-0 h-full w-full max-w-[460px] bg-white z-50 flex flex-col font-['Cormorant_Garamond'] transition-transform duration-300 ease-in-out overflow-y-auto ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>

        {/* Header */}
        <div className="h-[80px] bg-white flex items-center justify-center relative flex-shrink-0">
          <Link to="/" onClick={onClose}>
            <span className="text-[20px] font-semibold tracking-[3px] text-[#1A1A1A]">SHAN LORAY</span>
          </Link>
          <button onClick={onClose} className="absolute right-5 w-[44px] h-[44px] flex items-center justify-center">
            <IoClose className="w-6 h-6 text-[#2B2B2B]" />
          </button>
        </div>

        {/* Nav Items */}
        <div className="bg-white px-6 pt-4 pb-8 flex-shrink-0">
          <div className="flex flex-col gap-[18px]">
            {drawerNavItems.map((item, idx) => {
              const isActive = location.pathname === item.path
              return (
                <Link key={idx} to={item.path} onClick={onClose}>
                  <div className="flex items-center justify-between py-1">
                    <div className="flex items-center gap-3">
                      <span className={`${
                        item.bold ? 'text-[19px] font-semibold' : 'text-[17px] font-normal'
                      } ${isActive ? 'text-[#C9A870]' : 'text-[#1A1A1A]'}`}>
                        {item.label}
                      </span>
                      {item.badge && (
                        <div className="h-[22px] px-[10px] rounded-[4px] flex items-center justify-center bg-[#C9A870]">
                          <span className="text-[10px] font-semibold text-white tracking-[1px]">{item.badge}</span>
                        </div>
                      )}
                    </div>
                    <IoChevronForward className="w-[17px] h-[17px] text-[#C9A870]" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Gold Divider */}
        <div className="w-full h-[1px] bg-[#C9A870] flex-shrink-0" />

        {/* Utility Actions */}
        <div className="bg-[#F5F1EA] px-5 py-6 flex-shrink-0">
          <div className="flex flex-col gap-3">
            {utilityActions.map((action, idx) => {
              if (action.isSearch) {
                return (
                  <button
                    key={idx}
                    onClick={() => { onClose(); onSearchOpen() }}
                    className="bg-white rounded-[10px] px-5 py-[18px] flex items-center gap-4 shadow-[0_1px_6px_rgba(0,0,0,0.06)] w-full text-left"
                  >
                    <action.icon className="w-[22px] h-[22px] text-[#555] flex-shrink-0" />
                    <span className="text-[16px] font-normal text-[#555] font-['Cormorant_Garamond']">
                      {action.label}
                    </span>
                  </button>
                )
              }
              return (
                <Link key={idx} to={action.path} onClick={onClose}>
                  <div className="bg-white rounded-[10px] px-5 py-[18px] flex items-center gap-4 shadow-[0_1px_6px_rgba(0,0,0,0.06)]">
                    <action.icon className="w-[22px] h-[22px] text-[#555] flex-shrink-0" />
                    <span className="text-[16px] font-normal text-[#555]">
                      {action.label}
                      {action.count && <span className="text-[#C9A870]"> ({action.count})</span>}
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Settings */}
        <div className="bg-[#EBE6DC] px-6 py-2 flex-shrink-0">
          <div className="flex items-center justify-between py-4 border-b border-[#D4CFC6]">
            <span className="text-[15px] font-normal text-[#2B2B2B]">English</span>
            <IoChevronForward className="w-4 h-4 text-[#888]" />
          </div>
          <div className="flex items-center justify-between py-4 border-b border-[#D4CFC6]">
            <span className="text-[15px] font-normal text-[#2B2B2B]">USD $</span>
            <IoChevronForward className="w-4 h-4 text-[#888]" />
          </div>
          <div className="pt-4 pb-2">
            <span className="text-[13px] font-normal text-[#808080]">Region: United States</span>
          </div>
        </div>

        <div className="flex-1 bg-[#EBE6DC]" />

        {/* Social Footer */}
        <div className="bg-[#2B2B2B] flex flex-col items-center justify-center py-7 flex-shrink-0">
          <div className="flex items-center gap-8 mb-4">
            {socialLinks.map(({ icon: Icon, href }) => (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer">
                <Icon className="w-[26px] h-[26px] text-[#C4B5A0]" />
              </a>
            ))}
          </div>
          <p className="text-[11px] font-light italic text-[#808080]">©©2024 Shan Loray</p>
        </div>

        <div className="h-[34px] w-full bg-[#2B2B2B] flex items-center justify-center flex-shrink-0">
          <div className="w-[134px] h-[5px] bg-white/20 rounded-full" />
        </div>
      </div>
    </>
  )
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────
export default function Navbar() {
  const { t } = useTranslation()
  const desktopNavLinks = getDesktopNavLinks(t)
  const drawerNavItems = getDrawerNavItems(t)
  const [currentLang, setCurrentLang] = useState(localStorage.getItem('shanloray_language') || 'en')
  const location = useLocation()
  const navigate = useNavigate()

  const toggleLanguage = () => {
    const newLang = currentLang === 'en' ? 'ru' : 'en'
    setCurrentLang(newLang)
    i18n.changeLanguage(newLang)
    localStorage.setItem('shanloray_language', newLang)
  }
  const { user, signOut } = useAuth()
  const { cartCount } = useCart()
  const { wishlistCount } = useWishlist()
  const [isMobile, setIsMobile]     = useState(window.innerWidth < 640)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)

  const handleLogout = async () => {
    await signOut()
    navigate('/')
  }

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // ── Mobile ───────────────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <>
        <header className="h-[60px] bg-white border-b border-[#E8E3D9] flex items-center justify-between px-4 sticky top-0 z-40">
          <button onClick={() => setDrawerOpen(true)} className="p-1">
            <IoMenuOutline className="w-[26px] h-[26px] text-[#1A1A1A]" />
          </button>
          <Link to="/">
            <span className="font-['Cormorant_Garamond'] text-[20px] font-semibold tracking-[3px] text-[#1A1A1A]">
              SHAN LORAY
            </span>
          </Link>
          <div className="flex items-center gap-[16px]">
            <button onClick={() => setSearchOpen(true)}>
              <IoSearchOutline className="w-[22px] h-[22px] text-[#2B2B2B]" />
            </button>
            {user ? (
              <>
                <Link to="/account"><IoPersonOutline className="w-[22px] h-[22px] text-[#2B2B2B]" /></Link>
                <button onClick={handleLogout}><IoLogOutOutline className="w-[22px] h-[22px] text-[#2B2B2B]" /></button>
              </>
            ) : (
              <button onClick={() => setAuthModalOpen(true)}>
                <IoPersonOutline className="w-[22px] h-[22px] text-[#2B2B2B]" />
              </button>
            )}
            <Link to="/wishlist" className="relative">
              <IoHeartOutline className="w-[22px] h-[22px] text-[#2B2B2B]" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C9A870] text-white text-[10px] font-semibold rounded-full w-[16px] h-[16px] flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link to="/cart" className="relative">
              <IoBagOutline className="w-[22px] h-[22px] text-[#2B2B2B]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C9A870] text-white text-[10px] font-semibold rounded-full w-[16px] h-[16px] flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </header>

        <MobileDrawer
          isOpen={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          onSearchOpen={() => setSearchOpen(true)}
        />

        <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
        <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      </>
    )
  }

  // ── Desktop + Tablet ─────────────────────────────────────────────────────────
  return (
    <>
      <header className="min-h-[64px] md:min-h-[72px] lg:min-h-[80px] bg-white border-b border-[#E8E3D9] flex items-center justify-between px-6 md:px-[40px] lg:px-[120px] sticky top-0 z-50">
        <Link to="/">
          <div className="font-semibold text-[22px] md:text-[26px] lg:text-[32px] text-[#1A1A1A] tracking-[3px] font-['Cormorant_Garamond']">
            SHAN LORAY
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-[24px] lg:gap-[48px]">
          {desktopNavLinks.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <Link key={item.label} to={item.path} className="relative">
                <span className={`text-[13px] md:text-[14px] lg:text-[16px] font-['Cormorant_Garamond'] cursor-pointer transition-all duration-300 ${
                  isActive ? 'font-semibold text-[#C9A870]' : 'font-normal text-[#3D3D3D] hover:text-[#1A1A1A]'
                }`}>
                  {item.label}
                </span>
                {isActive && (
                  <div className="absolute left-1/2 -translate-x-1/2 w-[32px] lg:w-[40px] h-[2px] bg-[#C9A870] rounded-full mt-1" />
                )}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-[16px] md:gap-[20px] lg:gap-[28px]">
          <button
            onClick={toggleLanguage}
            className="hidden lg:flex items-center gap-[4px] text-[14px] font-light font-['Cormorant_Garamond'] cursor-pointer hover:text-[#C9A870] transition-colors"
          >
            <span className={currentLang === 'en' ? 'text-[#1A1A1A] font-semibold' : 'text-[#999999]'}>EN</span>
            <span className="text-[#C9A870] mx-0.5">/</span>
            <span className={currentLang === 'ru' ? 'text-[#1A1A1A] font-semibold' : 'text-[#999999]'}>RU</span>
          </button>
          <div className="hidden lg:block w-[1px] h-4 bg-[#E8E3D9]" />
          <button onClick={() => setSearchOpen(true)}>
            <IoSearchOutline className="w-[22px] h-[22px] lg:w-[24px] lg:h-[24px] text-[#2B2B2B] cursor-pointer hover:text-[#C9A870] transition-colors" />
          </button>
          {user ? (
            <>
              <Link to="/account"><IoPersonOutline className="w-[22px] h-[22px] lg:w-[24px] lg:h-[24px] text-[#2B2B2B] cursor-pointer hover:text-[#C9A870] transition-colors" /></Link>
              <button onClick={handleLogout}><IoLogOutOutline className="w-[22px] h-[22px] lg:w-[24px] lg:h-[24px] text-[#2B2B2B] cursor-pointer hover:text-[#C9A870] transition-colors" /></button>
            </>
          ) : (
            <button onClick={() => setAuthModalOpen(true)}>
              <IoPersonOutline className="w-[22px] h-[22px] lg:w-[24px] lg:h-[24px] text-[#2B2B2B] cursor-pointer hover:text-[#C9A870] transition-colors" />
            </button>
          )}
          <Link to="/wishlist" className="relative">
            <IoHeartOutline className="w-[22px] h-[22px] lg:w-[24px] lg:h-[24px] text-[#2B2B2B] cursor-pointer hover:text-[#C9A870] transition-colors" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#C9A870] text-white text-[10px] font-semibold rounded-full w-[18px] h-[18px] flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link to="/cart" className="relative">
            <IoBagOutline className="w-[22px] h-[22px] lg:w-[24px] lg:h-[24px] text-[#2B2B2B] cursor-pointer hover:text-[#C9A870] transition-colors" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#C9A870] text-white text-[10px] font-semibold rounded-full w-[18px] h-[18px] flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </header>

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  )
}