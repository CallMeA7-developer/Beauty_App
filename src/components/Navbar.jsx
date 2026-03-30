import { useState, useEffect } from 'react'
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
const desktopNavLinks = [
  { label: 'Collections', path: '/collections' },
  { label: 'Skincare',    path: '/skincare'    },
  { label: 'Makeup',      path: '/makeup'      },
  { label: 'Fragrance',   path: '/fragrance'   },
  { label: 'Technology',  path: '/technology'  },
  { label: 'Journal',     path: '/journal'     },
]

const drawerNavItems = [
  { label: 'Home',            path: '/',                      bold: true  },
  { label: 'Shop',            path: '/collections',           bold: true  },
  { label: 'Skincare',        path: '/skincare',              bold: false },
  { label: 'Makeup',          path: '/makeup',                bold: false },
  { label: 'Fragrance',       path: '/fragrance',             bold: false },
  { label: 'AI Consultation', path: '/ai-consultation',       bold: false, badge: 'NEW' },
  { label: 'Virtual Try-On',  path: '/virtual-tryon',         bold: false },
  { label: 'Technology',      path: '/technology',            bold: false },
  { label: 'About',           path: '/advanced-formulations', bold: false },
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
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-white z-[60] overflow-y-auto font-['Cormorant_Garamond']">

      {/* Header */}
      <div className="min-h-[80px] bg-white flex items-center justify-between px-6 md:px-[120px] border-b border-[#E8E3D9] sticky top-0 z-10">
        <button onClick={onClose}>
          <IoClose className="w-[26px] h-[26px] text-[#2B2B2B]" />
        </button>

        <div className="relative flex-1 mx-4 md:mx-8 max-w-[800px]">
          <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 w-[20px] h-[20px] text-[#8B7355]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for products, collections, or concerns..."
            autoFocus
            className="w-full h-[52px] pl-[44px] pr-[44px] text-[15px] md:text-[18px] font-normal text-[#2B2B2B] bg-white border-2 border-[#E8E3D9] rounded-[12px] outline-none focus:border-[#8B7355]"
          />
          {query && (
            <button onClick={() => setQuery('')}>
              <IoCloseCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-[20px] h-[20px] text-[#999]" />
            </button>
          )}
        </div>

        <button className="hidden md:flex items-center gap-2 text-[15px] font-medium text-[#2B2B2B]">
          <IoOptionsOutline className="w-[20px] h-[20px]" />
          Filters
        </button>
      </div>

      {/* Quick Categories */}
      <div className="bg-gradient-to-b from-[#FDFBF7] to-white px-6 md:px-[120px] py-4 overflow-x-auto">
        <div className="flex items-center gap-3 w-max md:w-auto md:flex-wrap">
          {quickCategories.map((cat, idx) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`h-[40px] px-5 rounded-full text-[14px] whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? 'bg-[#8B7355] text-white font-medium'
                  : 'bg-white text-[#666] font-normal border border-[#E8E3D9]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 md:px-[120px] py-8 max-w-[1200px] mx-auto">

        {/* Recent Searches */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[18px] md:text-[20px] font-medium text-[#1A1A1A]">Recent Searches</h2>
            <button className="text-[13px] font-normal text-[#8B7355]">Clear All</button>
          </div>
          {recentSearches.map((search) => (
            <div key={search} className="flex items-center justify-between py-4 border-b border-[#F5F1EA] cursor-pointer hover:bg-[#FDFBF7]">
              <div className="flex items-center gap-3">
                <IoTimeOutline className="w-[18px] h-[18px] text-[#8B7355]" />
                <span className="text-[15px] font-normal text-[#2B2B2B]">{search}</span>
              </div>
              <IoClose className="w-[16px] h-[16px] text-[#999]" />
            </div>
          ))}
        </div>

        {/* Popular Right Now */}
        <div className="mb-10">
          <h2 className="text-[18px] md:text-[24px] font-medium text-[#1A1A1A] mb-5">Popular Right Now</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {popularSearches.map((item) => (
              <div key={item.term} className="bg-white border border-[#E8E3D9] rounded-[8px] p-5 cursor-pointer hover:shadow-md hover:border-[#C9A870] transition-all">
                <item.icon className="w-[28px] h-[28px] text-[#C9A870] mb-3" />
                <h3 className="text-[15px] font-medium text-[#1A1A1A] mb-2">{item.term}</h3>
                <p className="text-[12px] font-normal text-[#666]">{item.count}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Topics */}
        <div className="bg-[#FDFBF7] rounded-[12px] p-6 mb-10">
          <div className="flex items-center gap-2 mb-4">
            <IoFlame className="w-[22px] h-[22px] text-[#C9A870]" />
            <h2 className="text-[18px] font-medium text-[#1A1A1A]">Trending Topics</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {trendingTopics.map((topic) => (
              <button key={topic} className="bg-white px-4 py-2 rounded-full border border-[#E8E3D9] text-[13px] font-normal text-[#8B7355] hover:bg-[#8B7355] hover:text-white transition-colors">
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* Products */}
        <div className="mb-10">
          <h3 className="text-[15px] font-medium text-[#8B7355] mb-4">Products</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {productSuggestions.map((product) => (
              <div key={product.name} className="bg-white rounded-[8px] p-4 cursor-pointer hover:shadow-md transition-shadow">
                <img src={product.image} alt={product.name} className="w-full h-[160px] object-cover rounded-[8px] mb-3" />
                <p className="text-[12px] font-light italic text-[#8B7355] mb-1">{product.brand}</p>
                <h4 className="text-[15px] font-medium text-[#1A1A1A] mb-2">{product.name}</h4>
                <p className="text-[15px] font-semibold text-[#2B2B2B] mb-2">{product.price}</p>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => <IoStarSharp key={i} className="w-[13px] h-[13px] text-[#C9A870]" />)}
                  <span className="text-[11px] text-[#999] ml-1">({product.reviews})</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Collections */}
        <div className="mb-10">
          <h3 className="text-[15px] font-medium text-[#8B7355] mb-4">Collections</h3>
          <div className="space-y-3">
            {collections.map((col) => (
              <div key={col.name} className="flex items-center gap-4 bg-white rounded-[8px] h-[72px] cursor-pointer hover:shadow-md transition-shadow">
                <img src={col.image} alt={col.name} className="w-[72px] h-[72px] object-cover rounded-l-[8px]" />
                <div className="flex-1">
                  <h4 className="text-[15px] font-medium text-[#1A1A1A] mb-1">{col.name}</h4>
                  <p className="text-[13px] font-normal text-[#666]">{col.items}</p>
                </div>
                <IoChevronForward className="w-[18px] h-[18px] text-[#8B7355] mr-4" />
              </div>
            ))}
          </div>
        </div>

        {/* Ingredients */}
        <div className="mb-10">
          <h3 className="text-[15px] font-medium text-[#8B7355] mb-4">Ingredients</h3>
          {ingredients.map((item) => (
            <div key={item} className="flex items-center gap-3 py-3 border-b border-[#F5F1EA] cursor-pointer hover:bg-[#FDFBF7]">
              <IoBeakerOutline className="w-[18px] h-[18px] text-[#8B7355]" />
              <span className="text-[14px] font-normal text-[#2B2B2B]">{item}</span>
            </div>
          ))}
        </div>

        {/* Skin Concerns */}
        <div className="mb-10">
          <h3 className="text-[15px] font-medium text-[#8B7355] mb-4">Skin Concerns</h3>
          {skinConcerns.map((item) => (
            <div key={item} className="flex items-center gap-3 py-3 border-b border-[#F5F1EA] cursor-pointer hover:bg-[#FDFBF7]">
              <IoAlertCircleOutline className="w-[18px] h-[18px] text-[#8B7355]" />
              <span className="text-[14px] font-normal text-[#2B2B2B]">{item}</span>
            </div>
          ))}
        </div>

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
  const location = useLocation()
  const navigate = useNavigate()
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
          <span className="hidden lg:inline text-[14px] font-light text-[#3D3D3D] font-['Cormorant_Garamond']">EN / RU</span>
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