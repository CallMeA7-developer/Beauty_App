import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  IoClose,
  IoCloseOutline,
  IoSearchOutline,
  IoSparklesOutline,
  IoSparkles,
  IoScanOutline,
  IoLeafOutline,
  IoColorPaletteOutline,
  IoFlaskOutline,
  IoWaterOutline,
  IoDiamondOutline,
  IoChevronForward,
  IoCameraOutline,
  IoGiftOutline,
  IoInformationCircleOutline,
  IoChatbubbleOutline,
} from 'react-icons/io5'
import { supabase } from '../lib/supabase'

const desktopCategories = [
  { name: 'Skincare',    icon: IoLeafOutline,         color: '#688B8D', path: '/skincare'    },
  { name: 'Makeup',      icon: IoColorPaletteOutline, color: '#D4AFA3', path: '/makeup'      },
  { name: 'Fragrance',   icon: IoFlaskOutline,        color: '#C9A870', path: '/fragrance'   },
  { name: 'Body Care',   icon: IoWaterOutline,        color: '#B8A99A', path: '/collections' },
  { name: 'Collections', icon: IoDiamondOutline,      color: '#8B7355', path: '/collections' },
]

const mobileCategories = [
  { name: 'Skincare',    gradient: 'from-[#E8F4F4] to-[#D4E8E8]', icon: '💧', path: '/skincare'    },
  { name: 'Makeup',      gradient: 'from-[#FFE8E8] to-[#FFD4D4]', icon: '💄', path: '/makeup'      },
  { name: 'Fragrance',   gradient: 'from-[#F5E8FF] to-[#E8D4FF]', icon: '🌸', path: '/fragrance'   },
  { name: 'Body Care',   gradient: 'from-[#FFF4E8] to-[#FFE8D4]', icon: '🧴', path: '/collections' },
  { name: 'Collections', gradient: 'from-[#E8F9E8] to-[#D4F0D4]', icon: '🎁', path: '/collections' },
]

const featuredCollections = [
  { title: 'Spring Radiance',  image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=280&h=200&fit=crop'    },
  { title: 'Bestsellers Edit', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=280&h=200&fit=crop' },
  { title: 'New Arrivals',     image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=280&h=200&fit=crop' },
]

const quickLinks = [
  { label: 'Gift Guide',     icon: IoGiftOutline,              path: '/collections'           },
  { label: 'About Us',       icon: IoInformationCircleOutline, path: '/advanced-formulations' },
  { label: 'Sustainability', icon: IoLeafOutline,              path: '/advanced-formulations' },
  { label: 'Contact',        icon: IoChatbubbleOutline,        path: '/search'                },
]

const popularSearches = [
  { label: 'Masks',         path: '/skincare?subcategory=Masks'               },
  { label: 'Serums',        path: '/skincare?subcategory=Serums'              },
  { label: 'Foundation',    path: '/makeup?subcategory=Foundation'            },
  { label: 'Lipstick',      path: '/makeup?subcategory=Lipstick'              },
  { label: 'Eau de Parfum', path: '/fragrance?subcategory=Eau%20de%20Parfum' },
  { label: 'Body Mist',     path: '/fragrance?subcategory=Body%20Mist'       },
]

// All searchable subcategories with their page and category label
const allSubcategories = [
  // Skincare
  { label: 'Cleansers',      category: 'Skincare',   path: '/skincare?subcategory=Cleansers'      },
  { label: 'Exfoliators',    category: 'Skincare',   path: '/skincare?subcategory=Exfoliators'    },
  { label: 'Eye Care',       category: 'Skincare',   path: '/skincare?subcategory=Eye%20Care'     },
  { label: 'Masks',          category: 'Skincare',   path: '/skincare?subcategory=Masks'          },
  { label: 'Moisturizers',   category: 'Skincare',   path: '/skincare?subcategory=Moisturizers'   },
  { label: 'Serums',         category: 'Skincare',   path: '/skincare?subcategory=Serums'         },
  { label: 'Sunscreen',      category: 'Skincare',   path: '/skincare?subcategory=Sunscreen'      },
  { label: 'Toners',         category: 'Skincare',   path: '/skincare?subcategory=Toners'         },
  // Makeup
  { label: 'Foundation',     category: 'Makeup',     path: '/makeup?subcategory=Foundation'       },
  { label: 'Concealer',      category: 'Makeup',     path: '/makeup?subcategory=Concealer'        },
  { label: 'Powder',         category: 'Makeup',     path: '/makeup?subcategory=Powder'           },
  { label: 'Blush',          category: 'Makeup',     path: '/makeup?subcategory=Blush'            },
  { label: 'Highlighter',    category: 'Makeup',     path: '/makeup?subcategory=Highlighter'      },
  { label: 'Eyeshadow',      category: 'Makeup',     path: '/makeup?subcategory=Eyeshadow'        },
  { label: 'Eyeliner',       category: 'Makeup',     path: '/makeup?subcategory=Eyeliner'         },
  { label: 'Mascara',        category: 'Makeup',     path: '/makeup?subcategory=Mascara'          },
  { label: 'Eyebrow',        category: 'Makeup',     path: '/makeup?subcategory=Eyebrow'          },
  { label: 'Lipstick',       category: 'Makeup',     path: '/makeup?subcategory=Lipstick'         },
  { label: 'Lip Gloss',      category: 'Makeup',     path: '/makeup?subcategory=Lip%20Gloss'      },
  { label: 'Lip Liner',      category: 'Makeup',     path: '/makeup?subcategory=Lip%20Liner'      },
  { label: 'Lip Care',       category: 'Makeup',     path: '/makeup?subcategory=Lip%20Care'       },
  // Fragrance
  { label: 'Eau de Parfum',  category: 'Fragrance',  path: '/fragrance?subcategory=Eau%20de%20Parfum'  },
  { label: 'Eau de Toilette', category: 'Fragrance', path: '/fragrance?subcategory=Eau%20de%20Toilette' },
  { label: 'Body Mist',      category: 'Fragrance',  path: '/fragrance?subcategory=Body%20Mist'   },
  { label: 'Discovery Sets', category: 'Fragrance',  path: '/fragrance?subcategory=Discovery%20Sets' },
]

const categoryColors = {
  Skincare:  'text-[#688B8D]',
  Makeup:    'text-[#D4AFA3]',
  Fragrance: 'text-[#C9A870]',
}

// Filter suggestions based on query
const getSuggestions = (query) => {
  if (!query.trim()) return []
  return allSubcategories.filter(item =>
    item.label.toLowerCase().includes(query.toLowerCase())
  )
}

// Fetch trending products
const fetchTrendingProducts = async (setter) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('id, name, image_url, brand')
      .not('image_url', 'is', null)
      .limit(100)

    if (error) { console.error('Trending fetch error:', error); return }

    if (data && data.length > 0) {
      const withImages = data.filter(p => p.image_url && p.image_url.trim() !== '')
      if (withImages.length > 0) {
        const shuffled = [...withImages].sort(() => Math.random() - 0.5)
        setter(shuffled.slice(0, 3))
      }
    }
  } catch (err) {
    console.error('Trending fetch exception:', err)
  }
}

const TrendingSkeleton = ({ mobile = false }) => (
  <div className={`flex gap-3 ${mobile ? '' : 'md:gap-[12px]'}`}>
    {[1, 2, 3].map((i) => (
      <div key={i} className={mobile ? 'w-[100px] flex-shrink-0' : 'flex-1'}>
        <div className={`w-full ${mobile ? 'h-[100px]' : 'aspect-square'} rounded-[8px] bg-[#F5F1EA] animate-pulse mb-2`} />
        <div className="h-3 bg-[#F5F1EA] rounded animate-pulse w-3/4" />
      </div>
    ))}
  </div>
)

// ─── Search with suggestions ──────────────────────────────────────────────────
function SearchWithSuggestions({ navigate, placeholder, inputClass = '', containerClass = '' }) {
  const [searchValue, setSearchValue] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const wrapperRef = useRef(null)

  // Update suggestions as user types
  useEffect(() => {
    if (searchValue.trim().length > 0) {
      setSuggestions(getSuggestions(searchValue))
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [searchValue])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (suggestion) => {
    setSearchValue('')
    setShowSuggestions(false)
    navigate(suggestion.path)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && suggestions.length > 0) {
      handleSelect(suggestions[0])
    } else if (e.key === 'Escape') {
      setShowSuggestions(false)
    }
  }

  return (
    <div ref={wrapperRef} className={`relative ${containerClass}`}>
      <div className="bg-white border border-[#E8E3D9] rounded-[8px] flex items-center px-[14px] h-[48px] md:h-[52px] focus-within:border-[#8B7355] transition-colors">
        <IoSearchOutline className="w-[18px] h-[18px] md:w-[20px] md:h-[20px] text-[#666666] mr-3 flex-shrink-0" />
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true) }}
          placeholder={placeholder || 'Search products...'}
          className={`flex-1 text-[14px] md:text-[15px] font-normal text-[#2B2B2B] bg-transparent outline-none placeholder:text-[#999999] ${inputClass}`}
        />
        {searchValue && (
          <button onClick={() => { setSearchValue(''); setShowSuggestions(false) }} className="flex-shrink-0 ml-2">
            <IoClose className="w-[16px] h-[16px] text-[#999999] hover:text-[#666666]" />
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E8E3D9] rounded-[8px] shadow-[0_8px_24px_rgba(0,0,0,0.12)] z-50 overflow-hidden max-h-[240px] overflow-y-auto">
          {suggestions.map((suggestion, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(suggestion)}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-[#FDFBF7] transition-colors text-left border-b border-[#F5F1EA] last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <IoSearchOutline className="w-[14px] h-[14px] text-[#999999] flex-shrink-0" />
                <span className="text-[14px] font-normal text-[#1A1A1A]">
                  {/* Highlight matching letters */}
                  {suggestion.label.split(new RegExp(`(${searchValue})`, 'gi')).map((part, i) =>
                    part.toLowerCase() === searchValue.toLowerCase()
                      ? <span key={i} className="font-semibold text-[#8B7355]">{part}</span>
                      : part
                  )}
                </span>
              </div>
              <span className={`text-[11px] font-medium ${categoryColors[suggestion.category] || 'text-[#999999]'}`}>
                {suggestion.category}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* No results */}
      {showSuggestions && searchValue.trim().length > 0 && suggestions.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E8E3D9] rounded-[8px] shadow-[0_8px_24px_rgba(0,0,0,0.12)] z-50 px-4 py-3">
          <p className="text-[13px] text-[#999999]">No results for "{searchValue}"</p>
        </div>
      )}
    </div>
  )
}

// ─── Mobile search with suggestions ──────────────────────────────────────────
function MobileSearchWithSuggestions({ navigate }) {
  const [searchValue, setSearchValue] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const wrapperRef = useRef(null)

  useEffect(() => {
    if (searchValue.trim().length > 0) {
      setSuggestions(getSuggestions(searchValue))
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [searchValue])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (suggestion) => {
    setSearchValue('')
    setShowSuggestions(false)
    navigate(suggestion.path)
  }

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div className="w-full h-[52px] bg-white rounded-[26px] shadow-[0_2px_12px_rgba(0,0,0,0.06)] px-5 flex items-center gap-3">
        <IoSearchOutline className="w-5 h-5 text-[#8B7355] flex-shrink-0" />
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && suggestions.length > 0) handleSelect(suggestions[0]) }}
          onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true) }}
          placeholder="Search products, collections..."
          className="flex-1 text-[14px] font-normal text-[#999999] bg-transparent outline-none"
        />
        {searchValue && (
          <button onClick={() => { setSearchValue(''); setShowSuggestions(false) }}>
            <IoClose className="w-[16px] h-[16px] text-[#999999]" />
          </button>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#E8E3D9] rounded-[12px] shadow-[0_8px_24px_rgba(0,0,0,0.12)] z-50 overflow-hidden max-h-[200px] overflow-y-auto">
          {suggestions.map((suggestion, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(suggestion)}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-[#FDFBF7] transition-colors text-left border-b border-[#F5F1EA] last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <IoSearchOutline className="w-[14px] h-[14px] text-[#999999] flex-shrink-0" />
                <span className="text-[14px] font-normal text-[#1A1A1A]">
                  {suggestion.label.split(new RegExp(`(${searchValue})`, 'gi')).map((part, i) =>
                    part.toLowerCase() === searchValue.toLowerCase()
                      ? <span key={i} className="font-semibold text-[#8B7355]">{part}</span>
                      : part
                  )}
                </span>
              </div>
              <span className={`text-[11px] font-medium ${categoryColors[suggestion.category] || 'text-[#999999]'}`}>
                {suggestion.category}
              </span>
            </button>
          ))}
        </div>
      )}

      {showSuggestions && searchValue.trim().length > 0 && suggestions.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#E8E3D9] rounded-[12px] shadow-[0_8px_24px_rgba(0,0,0,0.12)] z-50 px-4 py-3">
          <p className="text-[13px] text-[#999999]">No results for "{searchValue}"</p>
        </div>
      )}
    </div>
  )
}

// ─── Mobile ───────────────────────────────────────────────────────────────────
function ExploreMobile() {
  const navigate = useNavigate()
  const [trendingProducts, setTrendingProducts] = useState([])

  useEffect(() => { fetchTrendingProducts(setTrendingProducts) }, [])

  return (
    <div className="w-full min-h-screen bg-white font-['Cormorant_Garamond'] flex flex-col">
      <div className="bg-white px-5 h-[72px] flex items-center justify-between flex-shrink-0">
        <div className="w-11" />
        <div className="font-bold text-[20px] text-[#1A1A1A] tracking-[2px]">SHAN LORAY</div>
        <button onClick={() => navigate(-1)} className="w-11 h-11 flex items-center justify-center">
          <IoCloseOutline className="w-6 h-6 text-[#2B2B2B]" />
        </button>
      </div>

      <div className="bg-gradient-to-b from-[#FDFBF7] to-[#F5F1EA] px-5 py-8 flex flex-col justify-center flex-shrink-0">
        <h1 className="text-[32px] font-semibold text-[#1A1A1A] text-center mb-2">Explore Shan Loray</h1>
        <p className="text-[15px] font-normal text-[#666666] text-center mb-6">Discover your perfect beauty ritual</p>
        <MobileSearchWithSuggestions navigate={navigate} />
      </div>

      <div className="bg-white px-5 py-8 flex-shrink-0">
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-[18px] font-semibold text-[#1A1A1A] mb-3">Shop by Category</h2>
          <div className="w-12 h-[2px] bg-[#C9A870]" />
        </div>
        <div className="space-y-3">
          {mobileCategories.map((cat, idx) => (
            <Link key={idx} to={cat.path}>
              <div className={`h-[52px] bg-gradient-to-r ${cat.gradient} rounded-xl px-4 flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{cat.icon}</span>
                  <span className="text-[16px] font-medium text-[#2B2B2B]">{cat.name}</span>
                </div>
                <IoChevronForward className="w-5 h-5 text-[#999999]" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-white border-t border-[#F5F1EA] px-5 py-8 flex-shrink-0">
        <h2 className="text-[18px] font-semibold text-[#1A1A1A] mb-6">Featured Collections</h2>
        <div className="overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          <div className="flex gap-3" style={{ width: 'max-content' }}>
            {featuredCollections.map((col, idx) => (
              <div key={idx} className="w-[280px] h-[200px] rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)] relative flex-shrink-0">
                <img src={col.image} alt={col.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <h3 className="text-[20px] font-semibold text-white">{col.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#F9F4EE] px-5 py-8 flex-shrink-0">
        <h2 className="text-[18px] font-semibold text-[#1A1A1A] mb-5">Smart Beauty Tools</h2>
        <div className="space-y-3">
          <Link to="/skin-analysis">
            <div className="bg-white rounded-2xl p-5 shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
              <div className="w-12 h-12 rounded-full bg-[#688B8D] flex items-center justify-center mb-4">
                <IoSparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-[17px] font-semibold text-[#1A1A1A] mb-2">AI Beauty Consultant</h3>
              <p className="text-[13px] font-normal text-[#666666] mb-3 leading-[1.5]">Get personalized skincare recommendations based on your unique skin profile</p>
              <span className="text-[13px] font-medium text-[#8B7355]">Start Consultation →</span>
            </div>
          </Link>
          <div onClick={() => alert('🚧 Virtual Try-On is currently under development. Please check back soon!')} className="bg-white rounded-2xl p-5 shadow-[0_4px_12px_rgba(0,0,0,0.06)] cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-[#D4AFA3] flex items-center justify-center mb-4">
              <IoCameraOutline className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-[17px] font-semibold text-[#1A1A1A] mb-2">Virtual Try-On</h3>
            <p className="text-[13px] font-normal text-[#666666] mb-3 leading-[1.5]">Experience products virtually with augmented reality technology</p>
            <span className="text-[13px] font-medium text-[#8B7355]">Coming Soon →</span>
          </div>
        </div>
      </div>

      <div className="bg-white px-5 py-8 flex-shrink-0">
        <h2 className="text-[16px] font-semibold text-[#1A1A1A] mb-5">Popular Right Now</h2>
        {trendingProducts.length > 0 ? (
          <div className="overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            <div className="flex gap-3" style={{ width: 'max-content' }}>
              {trendingProducts.map((product) => (
                <Link key={product.id} to={`/product/${product.id}`} className="w-[100px] flex-shrink-0">
                  <div className="w-full h-[100px] rounded-lg overflow-hidden mb-2 bg-[#F5F1EA]">
                    <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-[13px] font-normal text-[#2B2B2B] leading-[1.3] mb-1 line-clamp-2">{product.name}</p>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <TrendingSkeleton mobile={true} />
        )}
      </div>

      <div className="bg-[#FDFBF7] px-5 py-8 flex-shrink-0">
        <div className="grid grid-cols-2 gap-3">
          {quickLinks.map((link, idx) => (
            <Link key={idx} to={link.path}>
              <div className="min-h-[56px] bg-white border-[1.5px] border-[#E8E3D9] rounded-xl flex flex-col items-center justify-center gap-2">
                <link.icon className="w-5 h-5 text-[#8B7355]" />
                <span className="text-[14px] font-medium text-[#2B2B2B]">{link.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Desktop ──────────────────────────────────────────────────────────────────
function ExploreDesktop() {
  const navigate = useNavigate()
  const [trendingProducts, setTrendingProducts] = useState([])

  useEffect(() => { fetchTrendingProducts(setTrendingProducts) }, [])

  return (
    <div className="min-h-screen bg-black/65 flex items-center justify-center font-['Cormorant_Garamond'] py-[24px] md:py-[40px] px-4 md:px-6">
      <div className="w-full max-w-[1200px] bg-white rounded-[16px] shadow-[0_16px_64px_rgba(0,0,0,0.15)] relative overflow-hidden">

        <button onClick={() => navigate(-1)} className="absolute top-4 md:top-[32px] right-4 md:right-[32px] w-[40px] h-[40px] md:w-[48px] md:h-[48px] flex items-center justify-center cursor-pointer hover:bg-[#F5F1EA] rounded-full transition-colors z-10">
          <IoClose className="w-[26px] h-[26px] md:w-[32px] md:h-[32px] text-[#2B2B2B]" />
        </button>

        <div className="pt-8 md:pt-[40px] pb-6 md:pb-[32px] flex flex-col items-center border-b border-[#E8E3D9]">
          <h1 className="text-[28px] md:text-[36px] lg:text-[42px] font-semibold text-[#1A1A1A] mb-4 md:mb-[20px]">Explore Shan Loray</h1>
          <div className="w-[80px] md:w-[120px] h-[2px] bg-[#C9A870]" />
        </div>

        <div className="px-5 md:px-[40px] lg:px-[56px] py-6 md:py-[40px] pb-[100px] md:pb-[112px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-[32px]">

            {/* Col 1 — Categories */}
            <div>
              <h3 className="text-[16px] md:text-[18px] lg:text-[20px] font-medium text-[#666666] mb-3 md:mb-[16px]">Shop by Category</h3>
              <div className="flex flex-col gap-[6px] md:gap-[8px]">
                {desktopCategories.map((cat, idx) => (
                  <Link key={idx} to={cat.path}>
                    <div className="flex items-center gap-3 md:gap-[16px] px-3 md:px-[16px] py-[10px] md:py-[12px] rounded-[8px] cursor-pointer hover:bg-[#FDFBF7] transition-colors group">
                      <div className="w-[40px] h-[40px] md:w-[48px] md:h-[48px] rounded-full bg-[#FDFBF7] group-hover:bg-white flex items-center justify-center flex-shrink-0 transition-colors">
                        <cat.icon className="w-[20px] h-[20px] md:w-[24px] md:h-[24px] transition-transform group-hover:scale-110" style={{ color: cat.color }} />
                      </div>
                      <span className="text-[15px] md:text-[16px] lg:text-[18px] font-medium text-[#1A1A1A] group-hover:text-[#8B7355] transition-colors">{cat.name}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Col 2 — Featured + Trending Now */}
            <div>
              <h3 className="text-[16px] md:text-[18px] lg:text-[20px] font-medium text-[#666666] mb-3 md:mb-[16px]">Featured</h3>
              <div className="mb-[16px]">
                <div className="w-full h-[160px] md:h-[180px] lg:h-[200px] rounded-[12px] overflow-hidden mb-[12px] md:mb-[14px] group cursor-pointer">
                  <img src="https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=360&h=240&fit=crop" alt="Spring 2024 Collection" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h4 className="text-[16px] md:text-[17px] lg:text-[18px] font-semibold text-[#1A1A1A] mb-[6px]">Spring 2024 Collection</h4>
                <p className="text-[13px] md:text-[14px] lg:text-[15px] font-normal text-[#666666] mb-[12px]">Discover botanical elegance</p>
                <Link to="/collections">
                  <span className="text-[13px] md:text-[14px] font-medium text-[#8B7355] cursor-pointer hover:underline">View Collection →</span>
                </Link>
              </div>
              <div className="mt-4 md:mt-[20px]">
                <h4 className="text-[14px] md:text-[15px] lg:text-[16px] font-medium text-[#666666] mb-3 md:mb-[12px]">Trending Now</h4>
                {trendingProducts.length > 0 ? (
                  <div className="flex gap-3 md:gap-[12px]">
                    {trendingProducts.map((product) => (
                      <Link key={product.id} to={`/product/${product.id}`} className="flex-1 cursor-pointer group">
                        <div className="w-full aspect-square rounded-[8px] overflow-hidden mb-[6px] md:mb-[8px] bg-[#F5F1EA]">
                          <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        </div>
                        <p className="text-[11px] md:text-[12px] lg:text-[13px] font-normal text-[#3D3D3D] leading-[1.4] group-hover:text-[#8B7355] transition-colors line-clamp-2">{product.name}</p>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <TrendingSkeleton />
                )}
              </div>
            </div>

            {/* Col 3 — Search with live suggestions + Popular Searches + Tools */}
            <div>
              <SearchWithSuggestions navigate={navigate} placeholder="Search products..." containerClass="mb-5 md:mb-[24px]" />

              <div className="mb-5 md:mb-[24px]">
                <h4 className="text-[14px] md:text-[15px] lg:text-[16px] font-medium text-[#666666] mb-3 md:mb-[12px]">Popular Searches</h4>
                <div className="flex flex-wrap gap-[6px] md:gap-[8px]">
                  {popularSearches.map((search, idx) => (
                    <Link key={idx} to={search.path}>
                      <div className="h-[32px] md:h-[36px] px-3 md:px-[16px] bg-[#FDFBF7] border border-[#E8E3D9] rounded-[18px] flex items-center cursor-pointer hover:bg-[#8B7355] hover:border-[#8B7355] transition-all group">
                        <span className="text-[12px] md:text-[13px] lg:text-[14px] font-normal text-[#3D3D3D] group-hover:text-white transition-colors">{search.label}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-[8px] md:gap-[10px]">
                <Link to="/skin-analysis">
                  <div className="h-[48px] md:h-[52px] bg-[#FDFBF7] rounded-[8px] px-[14px] md:px-[16px] flex items-center gap-3 md:gap-[14px] cursor-pointer hover:bg-[#F0EBE3] transition-colors group">
                    <IoSparklesOutline className="w-[18px] h-[18px] md:w-[20px] md:h-[20px] text-[#688B8D] flex-shrink-0" />
                    <span className="text-[13px] md:text-[14px] lg:text-[15px] font-medium text-[#1A1A1A] group-hover:text-[#8B7355] transition-colors">AI Beauty Consultant</span>
                  </div>
                </Link>
                <div onClick={() => alert('🚧 Virtual Try-On is currently under development. Please check back soon!')} className="h-[48px] md:h-[52px] bg-[#FDFBF7] rounded-[8px] px-[14px] md:px-[16px] flex items-center gap-3 md:gap-[14px] cursor-pointer hover:bg-[#F0EBE3] transition-colors group">
                  <IoScanOutline className="w-[18px] h-[18px] md:w-[20px] md:h-[20px] text-[#D4AFA3] flex-shrink-0" />
                  <span className="text-[13px] md:text-[14px] lg:text-[15px] font-medium text-[#1A1A1A] group-hover:text-[#8B7355] transition-colors">Virtual Try-On</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[72px] md:h-[80px] bg-gradient-to-r from-[#FDFBF7] to-[#F9F4EE] rounded-b-[16px] flex items-center justify-center border-t border-[#E8E3D9] px-4">
          <span className="text-[14px] md:text-[16px] lg:text-[17px] font-medium text-[#8B7355] mr-[10px] md:mr-[12px] text-center">New Members Get 15% Off First Order</span>
          <Link to="/account">
            <span className="text-[13px] md:text-[14px] lg:text-[15px] font-semibold text-[#8B7355] underline cursor-pointer hover:text-[#7a6448] transition-colors whitespace-nowrap">Join Now →</span>
          </Link>
        </div>

      </div>
    </div>
  )
}

export default function Explore() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return isMobile ? <ExploreMobile /> : <ExploreDesktop />
}