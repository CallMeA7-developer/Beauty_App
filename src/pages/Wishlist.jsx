import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  IoPersonOutline,
  IoHeartOutline,
  IoBagOutline,
  IoSparkles,
  IoBagCheckOutline,
  IoCalendarOutline,
  IoSettingsOutline,
  IoStarSharp,
  IoRibbonOutline,
  IoChevronDown,
  IoFunnelOutline,
  IoShareSocialOutline,
  IoHeart,
  IoCloseOutline,
  IoCopyOutline,
  IoLogoInstagram,
  IoLogoWhatsapp,
  IoLogoFacebook,
  IoMail,
  IoChevronBackOutline,
  IoSwapVerticalOutline,
  IoHomeOutline,
  IoSearchOutline,
  IoArrowUpOutline,
  IoArrowDownOutline,
  IoTrendingUpOutline,
  IoCheckmark,
  IoCheckmarkCircle,
  IoMailOutline,
  IoLinkOutline,
  IoQrCodeOutline,
  IoLogoTwitter,
} from 'react-icons/io5'

// ─── Shared Data ──────────────────────────────────────────────────────────────
const wishlistProducts = [
  { id: 1, brand: 'LA MER',            name: 'Crème de la Mer Moisturizing Cream',  image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=560&h=560&fit=crop',  rating: 4.9, reviews: 342, originalPrice: 380, currentPrice: 342, stock: 'In Stock'  },
  { id: 2, brand: 'ESTÉE LAUDER',       name: 'Advanced Night Repair Serum',         image: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=560&h=560&fit=crop',  rating: 4.8, reviews: 567, originalPrice: 135, currentPrice: 115, stock: 'In Stock'  },
  { id: 3, brand: 'DIOR',              name: 'Prestige La Micro-Huile de Rose',      image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=560&h=560&fit=crop',  rating: 4.7, reviews: 289, originalPrice: 425, currentPrice: 425, stock: 'Low Stock' },
  { id: 4, brand: 'TOM FORD',          name: 'Black Orchid Eau de Parfum',          image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=560&h=560&fit=crop',  rating: 4.9, reviews: 834, originalPrice: 295, currentPrice: 265, stock: 'In Stock'  },
  { id: 5, brand: 'CHARLOTTE TILBURY', name: 'Magic Cream Moisturizer',             image: 'https://images.unsplash.com/photo-1556228841-a6d4522f2c88?w=560&h=560&fit=crop',  rating: 4.6, reviews: 456, originalPrice: 100, currentPrice: 85,  stock: 'In Stock'  },
  { id: 6, brand: 'CHANEL',            name: 'Les Beiges Healthy Glow Foundation',  image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=560&h=560&fit=crop',  rating: 4.8, reviews: 721, originalPrice: 68,  currentPrice: 68,  stock: 'In Stock'  },
]

const navigationItems = [
  { icon: IoPersonOutline,   label: 'Account Dashboard', active: false, badge: null },
  { icon: IoBagCheckOutline, label: 'Order History',     active: false, badge: null },
  { icon: IoHeartOutline,    label: 'Wishlist',          active: true,  badge: '12' },
  { icon: IoSparkles,        label: 'Beauty Profile',    active: false, tag: 'Complete Analysis' },
  { icon: IoRibbonOutline,   label: 'Loyalty Program',   active: false, badge: '2,450' },
  { icon: IoCalendarOutline, label: 'My Routines',       active: false, badge: null },
  { icon: IoStarSharp,       label: 'Reviews & Ratings', active: false, badge: null },
  { icon: IoSettingsOutline, label: 'Account Settings',  active: false, badge: null },
]

const sortOptions = [
  { id: 1, icon: IoArrowUpOutline,    label: 'Price: Low to High' },
  { id: 2, icon: IoArrowDownOutline,  label: 'Price: High to Low' },
  { id: 3, icon: IoSparkles,          label: 'Newest Arrivals'    },
  { id: 4, icon: IoTrendingUpOutline, label: 'Best Sellers'       },
  { id: 5, icon: IoHeart,             label: 'Most Popular'       },
  { id: 6, icon: IoStarSharp,         label: 'Highest Rated'      },
]

const productTypes = ['Skincare', 'Makeup', 'Fragrance', 'Haircare', 'Body Care', 'Tools']
const skinTypes    = ['Normal', 'Dry', 'Oily', 'Combination', 'Sensitive']
const skinConcerns = ['Anti-Aging', 'Hydration', 'Brightening', 'Acne', 'Dark Spots', 'Fine Lines', 'Dullness']
const brands       = ['LA MER', 'ESTÉE LAUDER', 'DIOR', 'TOM FORD', 'CHARLOTTE TILBURY', 'CHANEL', 'GUERLAIN', 'SISLEY']
const benefits     = ['Moisturizing', 'Firming', 'Soothing', 'Exfoliating', 'Protecting', 'Nourishing']

const wishlistPreviewImages = [
  'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=80&h=80&fit=crop',
  'https://images.unsplash.com/photo-1617897903246-719242758050?w=80&h=80&fit=crop',
  'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=80&h=80&fit=crop',
]

// ─── Sort Bottom Sheet ────────────────────────────────────────────────────────
function SortSheet({ isOpen, onClose, selected, onSelect }) {
  if (!isOpen) return null
  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-50" onClick={onClose} />
      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-[60] font-['Cormorant_Garamond'] shadow-[0_-8px_32px_rgba(139,115,85,0.15)]">
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-[#E8E3D9] rounded-full" />
        </div>
        <div className="flex items-center justify-between px-5 pb-3 border-b border-[#F5F1EA]">
          <span className="text-[18px] font-semibold text-[#1A1A1A]">Sort By</span>
          <button onClick={onClose}><IoCloseOutline className="w-6 h-6 text-[#666666]" /></button>
        </div>
        <div className="py-2">
          {sortOptions.map((option, idx) => (
            <div key={option.id}>
              <button
                onClick={() => { onSelect(option.label); onClose() }}
                className={`w-full min-h-[56px] px-5 flex items-center justify-between ${selected === option.label ? 'bg-[#FDFBF7]' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <option.icon className={`w-[18px] h-[18px] ${selected === option.label ? 'text-[#C9A870]' : 'text-[#666666]'}`} />
                  <span className={`text-[15px] ${selected === option.label ? 'text-[#8B7355] font-medium' : 'text-[#2B2B2B] font-normal'}`}>
                    {option.label}
                  </span>
                </div>
                {selected === option.label && <IoCheckmark className="w-5 h-5 text-[#C9A870]" />}
              </button>
              {idx < sortOptions.length - 1 && <div className="h-[1px] bg-[#F5F1EA] mx-5" />}
            </div>
          ))}
        </div>
        <div className="h-6" />
      </div>
    </>
  )
}

// ─── Filter Bottom Sheet ──────────────────────────────────────────────────────
function FilterSheet({ isOpen, onClose }) {
  const [selectedTypes, setSelectedTypes]         = useState(['Skincare'])
  const [selectedSkinTypes, setSelectedSkinTypes] = useState(['Dry'])
  const [selectedConcerns, setSelectedConcerns]   = useState(['Anti-Aging', 'Hydration'])
  const [selectedBrands, setSelectedBrands]       = useState(['LA MER', 'CHARLOTTE TILBURY'])
  const [selectedBenefits, setSelectedBenefits]   = useState(['Moisturizing'])
  const [minRating, setMinRating]                 = useState(4)
  const [availability, setAvailability]           = useState('instock')

  const toggle = (arr, setArr, val) =>
    setArr(arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val])

  if (!isOpen) return null
  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-50" onClick={onClose} />
      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-[60] font-['Cormorant_Garamond'] shadow-[0_-8px_32px_rgba(139,115,85,0.15)] flex flex-col max-h-[90vh]">
        <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
          <div className="w-10 h-1 bg-[#E8E3D9] rounded-full" />
        </div>
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#F5F1EA] flex-shrink-0">
          <h2 className="text-[20px] font-semibold text-[#1A1A1A]">Filter Products</h2>
          <button onClick={onClose}><IoCloseOutline className="w-6 h-6 text-[#666666]" /></button>
        </div>
        <div className="overflow-y-auto px-5 py-5 flex-1">
          {/* Product Type */}
          <div className="mb-6">
            <h3 className="text-[17px] font-semibold text-[#1A1A1A] mb-3">Product Type</h3>
            <div className="flex flex-wrap gap-2">
              {productTypes.map((type) => (
                <button key={type} onClick={() => toggle(selectedTypes, setSelectedTypes, type)}
                  className={`min-h-[40px] px-4 rounded-[24px] border-[1.5px] text-[15px] transition-colors ${selectedTypes.includes(type) ? 'bg-[#FDFBF7] border-[#C9A870] text-[#8B7355] font-medium' : 'bg-white border-[#E8E3D9] text-[#666666] font-normal'}`}>
                  {type}
                </button>
              ))}
            </div>
          </div>
          {/* Price Range */}
          <div className="mb-6">
            <h3 className="text-[17px] font-semibold text-[#1A1A1A] mb-3">Price Range</h3>
            <div className="relative px-2">
              <div className="w-full h-[4px] bg-[#E8E3D9] rounded-full">
                <div className="w-[55%] h-full bg-[#C9A870] rounded-full" />
              </div>
              <div className="absolute top-[-8px] left-[2px] w-[20px] h-[20px] rounded-full bg-white border-[2px] border-[#C9A870] shadow-sm" />
              <div className="absolute top-[-8px] left-[55%] w-[20px] h-[20px] rounded-full bg-white border-[2px] border-[#C9A870] shadow-sm" />
            </div>
            <div className="text-center mt-4"><span className="text-[15px] font-normal text-[#666666]">$0 – $400</span></div>
          </div>
          {/* Skin Type */}
          <div className="mb-6">
            <h3 className="text-[17px] font-semibold text-[#1A1A1A] mb-3">Skin Type</h3>
            <div className="space-y-3">
              {skinTypes.map((type) => (
                <button key={type} onClick={() => toggle(selectedSkinTypes, setSelectedSkinTypes, type)} className="flex items-center gap-3 w-full">
                  {selectedSkinTypes.includes(type) ? <IoCheckmarkCircle className="w-5 h-5 text-[#C9A870] flex-shrink-0" /> : <div className="w-5 h-5 rounded-[4px] border-[1.5px] border-[#E8E3D9] flex-shrink-0" />}
                  <span className="text-[15px] font-normal text-[#2B2B2B]">{type}</span>
                </button>
              ))}
            </div>
          </div>
          {/* Skin Concerns */}
          <div className="mb-6">
            <h3 className="text-[17px] font-semibold text-[#1A1A1A] mb-3">Skin Concerns</h3>
            <div className="flex flex-wrap gap-2">
              {skinConcerns.map((concern) => (
                <button key={concern} onClick={() => toggle(selectedConcerns, setSelectedConcerns, concern)}
                  className={`min-h-[40px] px-4 rounded-[24px] border-[1.5px] text-[15px] transition-colors ${selectedConcerns.includes(concern) ? 'bg-[#FDFBF7] border-[#C9A870] text-[#8B7355] font-medium' : 'bg-white border-[#E8E3D9] text-[#666666] font-normal'}`}>
                  {concern}
                </button>
              ))}
            </div>
          </div>
          {/* Brand */}
          <div className="mb-6">
            <h3 className="text-[17px] font-semibold text-[#1A1A1A] mb-2">Brand</h3>
            <div className="relative mb-3">
              <input type="text" placeholder="Search brands..." className="w-full h-[44px] px-4 pr-10 border-[1.5px] border-[#E8E3D9] rounded-[8px] text-[15px] font-light italic text-[#999999] placeholder:text-[#999999] outline-none" />
              <IoSearchOutline className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
            </div>
            <div className="space-y-2">
              {brands.map((brand) => (
                <button key={brand} onClick={() => toggle(selectedBrands, setSelectedBrands, brand)} className="flex items-center gap-3 w-full py-1">
                  {selectedBrands.includes(brand) ? <IoCheckmarkCircle className="w-5 h-5 text-[#C9A870] flex-shrink-0" /> : <div className="w-5 h-5 rounded-[4px] border-[1.5px] border-[#E8E3D9] flex-shrink-0" />}
                  <span className="text-[15px] font-normal text-[#2B2B2B]">{brand}</span>
                </button>
              ))}
            </div>
          </div>
          {/* Benefits */}
          <div className="mb-6">
            <h3 className="text-[17px] font-semibold text-[#1A1A1A] mb-3">Product Benefits</h3>
            <div className="flex flex-wrap gap-2">
              {benefits.map((benefit) => (
                <button key={benefit} onClick={() => toggle(selectedBenefits, setSelectedBenefits, benefit)}
                  className={`min-h-[40px] px-4 rounded-[24px] border-[1.5px] text-[15px] transition-colors ${selectedBenefits.includes(benefit) ? 'bg-[#FDFBF7] border-[#C9A870] text-[#8B7355] font-medium' : 'bg-white border-[#E8E3D9] text-[#666666] font-normal'}`}>
                  {benefit}
                </button>
              ))}
            </div>
          </div>
          {/* Rating */}
          <div className="mb-6">
            <h3 className="text-[17px] font-semibold text-[#1A1A1A] mb-3">Minimum Rating</h3>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map((star) => (
                  <button key={star} onClick={() => setMinRating(star)}>
                    <IoStarSharp className={`w-6 h-6 ${star <= minRating ? 'text-[#C9A870]' : 'text-[#E8E3D9]'}`} />
                  </button>
                ))}
              </div>
              <span className="text-[15px] font-normal text-[#666666]">{minRating}.0 & Up</span>
            </div>
          </div>
          {/* Availability */}
          <div className="mb-4">
            <h3 className="text-[17px] font-semibold text-[#1A1A1A] mb-3">Availability</h3>
            <div className="space-y-3">
              {[{ val: 'instock', label: 'In Stock' }, { val: 'all', label: 'Include Out of Stock' }].map(({ val, label }) => (
                <button key={val} onClick={() => setAvailability(val)} className="flex items-center gap-3 w-full">
                  <div className="w-5 h-5 rounded-full border-[1.5px] border-[#E8E3D9] flex items-center justify-center">
                    {availability === val && <div className="w-[10px] h-[10px] rounded-full bg-[#8B7355]" />}
                  </div>
                  <span className="text-[15px] font-normal text-[#2B2B2B]">{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-[#FDFBF7] px-5 py-4 border-t border-[#E8E3D9] flex items-center gap-3 flex-shrink-0">
          <button onClick={() => { setSelectedTypes([]); setSelectedSkinTypes([]); setSelectedConcerns([]); setSelectedBrands([]); setSelectedBenefits([]); setMinRating(1); setAvailability('instock') }}
            className="flex-1 h-[52px] bg-white border-[1.5px] border-[#E8E3D9] text-[#666666] text-[16px] font-medium rounded-[8px]">
            Clear Filters
          </button>
          <button onClick={onClose} className="flex-1 h-[52px] bg-[#8B7355] text-white text-[16px] font-medium rounded-[8px]">
            Apply Filters
          </button>
        </div>
        <div className="h-6 bg-white flex-shrink-0" />
      </div>
    </>
  )
}

// ─── Share Modal ──────────────────────────────────────────────────────────────
function ShareModal({ isOpen, onClose }) {
  if (!isOpen) return null

  const socialOptions = [
    { icon: IoLogoFacebook,  label: 'Facebook',  bg: 'bg-[#EBF5FF]', color: 'text-[#1877F2]' },
    { icon: IoLogoInstagram, label: 'Instagram', bg: 'bg-[#FFF6F0]', color: 'text-[#E4405F]' },
    { icon: IoLogoTwitter,   label: 'Twitter',   bg: 'bg-[#E8F5FD]', color: 'text-[#1DA1F2]' },
    { icon: IoLogoWhatsapp,  label: 'WhatsApp',  bg: 'bg-[#F0F9F4]', color: 'text-[#25D366]' },
  ]

  const otherOptions = [
    { icon: IoMailOutline,   label: 'Send via Email',    sub: 'Share through email app'  },
    { icon: IoLinkOutline,   label: 'Copy Link',         sub: 'Copy wishlist URL'        },
    { icon: IoQrCodeOutline, label: 'Generate QR Code',  sub: 'Create scannable code'   },
  ]

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 z-50" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-[60] flex items-center justify-center px-5 font-['Cormorant_Garamond']">
        <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-[0_8px_32px_rgba(139,115,85,0.18)] overflow-hidden">

          {/* Header */}
          <div className="px-6 py-5 flex items-start justify-between border-b border-[#F5F1EA]">
            <div>
              <h2 className="text-[24px] font-semibold text-[#1A1A1A] mb-1">Share Wishlist</h2>
              <p className="text-[15px] font-normal text-[#666666]">Share your curated collection</p>
            </div>
            <button onClick={onClose} className="w-6 h-6 flex items-center justify-center mt-1">
              <IoCloseOutline className="w-6 h-6 text-[#666666]" />
            </button>
          </div>

          {/* Social Media */}
          <div className="px-6 py-5">
            <h3 className="text-[17px] font-semibold text-[#1A1A1A] mb-4">Share via Social Media</h3>
            <div className="grid grid-cols-2 gap-3">
              {socialOptions.map(({ icon: Icon, label, bg, color }) => (
                <button key={label} className={`min-h-[80px] ${bg} rounded-xl flex flex-col items-center justify-center gap-2`}>
                  <Icon className={`w-8 h-8 ${color}`} />
                  <span className="text-[14px] font-medium text-[#1A1A1A]">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Other Options */}
          <div className="px-6 py-5 border-t border-[#F5F1EA]">
            <h3 className="text-[17px] font-semibold text-[#1A1A1A] mb-4">Other Options</h3>
            <div className="space-y-3">
              {otherOptions.map(({ icon: Icon, label, sub }) => (
                <button key={label} className="w-full min-h-[56px] bg-white border-[1.5px] border-[#E8E3D9] rounded-lg px-4 flex items-center gap-3">
                  <Icon className="w-5 h-5 text-[#8B7355] flex-shrink-0" />
                  <div className="flex-1 text-left">
                    <div className="text-[16px] font-medium text-[#2B2B2B]">{label}</div>
                    <div className="text-[13px] font-normal text-[#999999]">{sub}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Wishlist Preview Bar */}
          <div className="bg-[#FDFBF7] border-t border-[#E8E3D9] px-6 py-4 flex items-center gap-3">
            <div className="flex items-center">
              {wishlistPreviewImages.map((img, idx) => (
                <div key={idx} className="w-10 h-10 rounded-lg overflow-hidden border-2 border-white shadow-sm" style={{ marginLeft: idx > 0 ? '-8px' : '0', zIndex: wishlistPreviewImages.length - idx }}>
                  <img src={img} alt={`Product ${idx + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <span className="text-[14px] font-medium text-[#666666]">12 items to share</span>
          </div>

        </div>
      </div>
    </>
  )
}

// ─── Mobile ───────────────────────────────────────────────────────────────────
function WishlistMobile() {
  const [sortOpen, setSortOpen]         = useState(false)
  const [filterOpen, setFilterOpen]     = useState(false)
  const [shareOpen, setShareOpen]       = useState(false)
  const [selectedSort, setSelectedSort] = useState('Newest Arrivals')

  return (
    <div className="w-full min-h-screen bg-[#FDFBF7] font-['Cormorant_Garamond'] flex flex-col">

      {/* Header */}
      <div className="bg-white border-b border-[#E8E3D9] px-5 h-[60px] flex items-center justify-between flex-shrink-0">
        <Link to="/dashboard">
          <div className="w-11 h-11 flex items-center justify-center">
            <IoChevronBackOutline className="w-6 h-6 text-[#2B2B2B]" />
          </div>
        </Link>
        <div className="font-bold text-[20px] text-[#1A1A1A] tracking-[2px]">SHAN LORAY</div>
        <button onClick={() => setShareOpen(true)} className="w-11 h-11 flex items-center justify-center">
          <IoShareSocialOutline className="w-6 h-6 text-[#8B7355]" />
        </button>
      </div>

      {/* Title */}
      <div className="bg-gradient-to-b from-[#FDFBF7] to-[#F9F4EE] px-6 py-6 flex-shrink-0">
        <h1 className="text-[32px] font-semibold text-[#1A1A1A] mb-1">My Wishlist</h1>
        <p className="text-[16px] font-normal text-[#666666]">12 saved treasures</p>
      </div>

      {/* Filter & Sort Bar */}
      <div className="bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] px-5 py-3 flex items-center justify-between gap-3 flex-shrink-0">
        <button onClick={() => setSortOpen(true)} className="h-10 px-4 border-[1.5px] border-[#E8E3D9] rounded-lg flex items-center gap-2">
          <IoSwapVerticalOutline className="w-4 h-4 text-[#666666]" />
          <span className="text-[14px] font-medium text-[#666666]">Sort</span>
        </button>
        <span className="text-[14px] font-normal text-[#666666]">{selectedSort}</span>
        <button onClick={() => setFilterOpen(true)} className="h-10 px-4 border-[1.5px] border-[#C9A870] bg-[#FDFBF7] rounded-lg flex items-center gap-2">
          <IoFunnelOutline className="w-4 h-4 text-[#8B7355]" />
          <span className="text-[14px] font-medium text-[#8B7355]">Filter</span>
        </button>
      </div>

      {/* Product List */}
      <div className="flex-1 px-5 py-5 space-y-5">
        {wishlistProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-4">
            <div className="relative w-full h-[280px] rounded-lg overflow-hidden mb-4">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.12)] flex items-center justify-center">
                <IoHeart className="w-5 h-5 text-[#C84848]" />
              </div>
              {product.stock === 'Low Stock' && (
                <div className="absolute top-3 left-3 bg-[#E5A84D] text-white text-[11px] font-medium px-3 py-1 rounded-full">Low Stock</div>
              )}
            </div>
            <div className="mb-4">
              <div className="text-[12px] font-medium text-[#8B7355] tracking-[1px] uppercase mb-2">{product.brand}</div>
              <h3 className="text-[17px] font-semibold text-[#1A1A1A] leading-[1.3] mb-2 line-clamp-2">{product.name}</h3>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-0.5">
                  {[1,2,3,4,5].map((s) => <IoStarSharp key={s} className="w-[13px] h-[13px] text-[#C9A870]" />)}
                </div>
                <span className="text-[13px] text-[#999]">({product.reviews})</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                {product.originalPrice !== product.currentPrice && (
                  <span className="text-[15px] text-[#999] line-through">${product.originalPrice}</span>
                )}
                <span className="text-[22px] font-semibold text-[#1A1A1A]">${product.currentPrice}</span>
              </div>
              <div className={`inline-block px-2.5 py-1 rounded text-[12px] font-medium ${product.stock === 'In Stock' ? 'bg-[#F0F8F0] text-[#7BA85D]' : 'bg-[#FFF4E6] text-[#E5A84D]'}`}>
                {product.stock}
              </div>
            </div>
            <div className="space-y-3">
              <button className="w-full h-12 bg-[#8B7355] text-white text-[15px] font-semibold rounded-lg">Add to Bag</button>
              <button className="w-full text-[15px] font-medium text-[#C84848] underline">Remove</button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white border-t border-[#E8E3D9] px-5 py-4 flex items-center gap-3 flex-shrink-0">
        <button className="flex-1 h-12 bg-[#8B7355] text-white text-[14px] font-semibold rounded-lg">Move All to Bag</button>
        <button className="flex-1 h-12 border-[1.5px] border-[#E8E3D9] text-[#666666] text-[14px] font-semibold rounded-lg">Clear Wishlist</button>
      </div>

      {/* Bottom Nav */}
      <div className="bg-white border-t border-[#E8E3D9] flex items-center justify-around px-4 h-[64px] flex-shrink-0">
        <Link to="/" className="flex flex-col items-center gap-1">
          <IoHomeOutline className="w-6 h-6 text-[#666666]" />
          <span className="text-[11px] text-[#666666]">Home</span>
        </Link>
        <Link to="/search" className="flex flex-col items-center gap-1">
          <IoSearchOutline className="w-6 h-6 text-[#666666]" />
          <span className="text-[11px] text-[#666666]">Search</span>
        </Link>
        <button className="flex flex-col items-center gap-1 relative">
          <IoHeart className="w-6 h-6 text-[#8B7355]" />
          <span className="text-[11px] text-[#8B7355]">Wishlist</span>
          <div className="absolute top-0 right-0 w-2 h-2 bg-[#C84848] rounded-full" />
        </button>
        <Link to="/account" className="flex flex-col items-center gap-1">
          <IoPersonOutline className="w-6 h-6 text-[#666666]" />
          <span className="text-[11px] text-[#666666]">Account</span>
        </Link>
      </div>

      {/* Overlays */}
      <SortSheet   isOpen={sortOpen}   onClose={() => setSortOpen(false)}   selected={selectedSort} onSelect={setSelectedSort} />
      <FilterSheet isOpen={filterOpen} onClose={() => setFilterOpen(false)} />
      <ShareModal  isOpen={shareOpen}  onClose={() => setShareOpen(false)}  />
    </div>
  )
}

// ─── Desktop + Tablet responsive ─────────────────────────────────────────────
function WishlistDesktop() {
  return (
    <div className="bg-white font-['Cormorant_Garamond']">

      {/* Breadcrumb */}
      <div className="min-h-[48px] bg-[#FDFBF7] px-6 md:px-[60px] lg:px-[120px] flex items-center">
        <span className="text-[13px] lg:text-[15px] font-normal text-[#8B7355] cursor-pointer">Home</span>
        <span className="text-[13px] lg:text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="hidden sm:inline text-[13px] lg:text-[15px] font-normal text-[#8B7355] cursor-pointer">Account Dashboard</span>
        <span className="hidden sm:inline text-[13px] lg:text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[13px] lg:text-[15px] font-normal text-[#666666]">Wishlist</span>
      </div>

      {/* Page Header */}
      <div className="min-h-[100px] md:min-h-[120px] lg:min-h-[140px] bg-gradient-to-b from-[#FDFBF7] to-white flex flex-col items-center justify-center px-6 md:px-[60px] lg:px-[120px]">
        <div className="max-w-[1200px] w-full">
          <h1 className="text-[32px] md:text-[40px] lg:text-[48px] font-semibold text-[#1A1A1A]">My Wishlist</h1>
          <p className="text-[15px] md:text-[16px] lg:text-[18px] font-normal text-[#666666] mt-[8px]">12 saved items awaiting your attention</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 md:px-[60px] lg:px-[120px] py-8 md:py-10 lg:py-[48px]">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-[40px]">

          {/* Sidebar */}
          <div className="w-full md:w-[240px] lg:w-[320px] flex-shrink-0">

            {/* User Card */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 lg:p-[28px] mb-5 lg:mb-[24px]">
              <div className="flex flex-col items-center">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=240&h=240&fit=crop" alt="User Avatar" className="w-[90px] h-[90px] md:w-[100px] md:h-[100px] lg:w-[120px] lg:h-[120px] rounded-full object-cover border-[3px] border-[#C9A870] mb-4 lg:mb-[16px]" />
                <h2 className="text-[20px] md:text-[22px] lg:text-[24px] font-semibold text-[#1A1A1A] mb-[4px]">Alexandra Chen</h2>
                <div className="bg-[#C9A870] text-white text-[11px] lg:text-[12px] font-medium px-[14px] lg:px-[16px] py-[5px] lg:py-[6px] rounded-full mb-4 lg:mb-[16px]">Elite Member</div>
                <div className="flex items-center gap-[8px]">
                  <IoSparkles className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#C9A870]" />
                  <span className="text-[17px] lg:text-[20px] font-medium text-[#8B7355]">2,450 Points</span>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[8px] mb-5 lg:mb-[24px]">
              {navigationItems.map((item) => (
                <div key={item.label} className={`flex items-center justify-between h-[48px] lg:h-[56px] px-3 lg:px-[20px] rounded-[8px] cursor-pointer transition-colors ${item.active ? 'bg-[#FDFBF7]' : 'hover:bg-[#FDFBF7]'}`}>
                  <div className="flex items-center gap-3 lg:gap-[16px]">
                    <item.icon className={`w-[20px] h-[20px] lg:w-[22px] lg:h-[22px] ${item.active ? 'text-[#8B7355]' : 'text-[#666666]'}`} />
                    <span className={`text-[13px] lg:text-[15px] ${item.active ? 'text-[#8B7355] font-medium' : 'font-normal text-[#2B2B2B]'}`}>{item.label}</span>
                  </div>
                  {item.badge ? <div className="bg-[#C9A870] text-white text-[10px] lg:text-[11px] font-medium px-[7px] lg:px-[8px] py-[2px] rounded-full">{item.badge}</div>
                    : item.tag ? <div className="hidden md:block bg-[#8B7355] text-white text-[9px] lg:text-[10px] font-normal px-[7px] lg:px-[8px] py-[2px] rounded-[4px]">{item.tag}</div> : null}
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 lg:p-[24px]">
              <div className="grid grid-cols-3 gap-3 lg:gap-[16px]">
                {[{ label: 'Total Orders', value: '24' }, { label: 'Wishlist Items', value: '12' }, { label: 'Reviews Written', value: '8' }].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-[20px] lg:text-[24px] font-semibold text-[#8B7355] mb-[4px]">{stat.value}</div>
                    <div className="text-[10px] lg:text-[11px] font-light text-[#666666] leading-tight">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Area */}
          <div className="flex-1 min-w-0">

            {/* Toolbar */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-4 lg:p-[24px] flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 lg:mb-[24px]">
              <div className="flex items-center gap-[12px]">
                <span className="text-[13px] lg:text-[15px] font-normal text-[#666666]">Sort by:</span>
                <div className="flex items-center gap-[8px] cursor-pointer">
                  <span className="text-[13px] lg:text-[15px] font-medium text-[#1A1A1A]">Latest Added</span>
                  <IoChevronDown className="w-[15px] h-[15px] lg:w-[16px] lg:h-[16px] text-[#666666]" />
                </div>
              </div>
              <div className="flex items-center gap-[10px] lg:gap-[12px]">
                <button className="h-[38px] lg:h-[40px] px-4 lg:px-[20px] bg-white border-[1.5px] border-[#E8E3D9] text-[#666666] text-[13px] lg:text-[14px] font-medium rounded-[8px] cursor-pointer flex items-center gap-[6px] lg:gap-[8px] hover:border-[#8B7355] transition-colors">
                  <IoFunnelOutline className="w-[15px] h-[15px] lg:w-[16px] lg:h-[16px]" />Filter
                </button>
                <button className="h-[38px] lg:h-[40px] px-4 lg:px-[20px] bg-white border-[1.5px] border-[#E8E3D9] text-[#666666] text-[13px] lg:text-[14px] font-medium rounded-[8px] cursor-pointer flex items-center gap-[6px] lg:gap-[8px] hover:border-[#8B7355] transition-colors">
                  <IoShareSocialOutline className="w-[15px] h-[15px] lg:w-[16px] lg:h-[16px]" />Share Wishlist
                </button>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-[24px] mb-5 lg:mb-[24px]">
              {wishlistProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-4 lg:p-[20px] hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-all duration-300">
                  <div className="relative w-full h-[220px] md:h-[240px] lg:h-[280px] rounded-[8px] overflow-hidden mb-4 lg:mb-[16px] group">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <button className="absolute top-[12px] right-[12px] w-[34px] h-[34px] lg:w-[36px] lg:h-[36px] rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] flex items-center justify-center">
                      <IoHeart className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#C84848]" />
                    </button>
                    {product.stock === 'Low Stock' && <div className="absolute top-[12px] left-[12px] bg-[#E5A84D] text-white text-[10px] lg:text-[11px] font-medium px-[10px] py-[4px] rounded-full">Low Stock</div>}
                  </div>
                  <div className="mb-4 lg:mb-[16px]">
                    <div className="text-[12px] lg:text-[13px] font-medium text-[#8B7355] mb-[4px]">{product.brand}</div>
                    <h3 className="text-[16px] md:text-[17px] lg:text-[18px] font-semibold text-[#1A1A1A] mb-[8px] leading-[1.3]">{product.name}</h3>
                    <div className="flex items-center gap-[8px] mb-[8px]">
                      <div className="flex items-center gap-[2px]">{[1,2,3,4,5].map((s) => <IoStarSharp key={s} className="w-[13px] h-[13px] lg:w-[14px] lg:h-[14px] text-[#C9A870]" />)}</div>
                      <span className="text-[12px] lg:text-[13px] text-[#999999]">({product.reviews})</span>
                    </div>
                    <div className="flex items-center gap-[8px] mb-[8px] flex-wrap">
                      {product.originalPrice !== product.currentPrice && <span className="text-[14px] lg:text-[16px] text-[#999999] line-through">${product.originalPrice}</span>}
                      <span className="text-[20px] lg:text-[22px] font-semibold text-[#1A1A1A]">${product.currentPrice}</span>
                      {product.originalPrice !== product.currentPrice && <span className="text-[12px] lg:text-[13px] font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Save ${product.originalPrice - product.currentPrice}</span>}
                    </div>
                    <div className={`inline-block px-[10px] lg:px-[12px] py-[4px] rounded-[4px] text-[11px] lg:text-[12px] font-medium ${product.stock === 'In Stock' ? 'bg-[#F0F8F0] text-[#7BA85D]' : 'bg-[#FFF4E6] text-[#E5A84D]'}`}>{product.stock}</div>
                  </div>
                  <div className="space-y-3 lg:space-y-[12px]">
                    <button className="w-full h-[44px] lg:h-[48px] bg-[#8B7355] text-white text-[14px] lg:text-[16px] font-medium rounded-[8px] flex items-center justify-center gap-2 hover:bg-[#7a6448] transition-colors">
                      <IoBagOutline className="w-[17px] h-[17px] lg:w-[18px] lg:h-[18px]" />Add to Cart
                    </button>
                    <button className="w-full text-[13px] lg:text-[14px] font-medium text-[#C84848] underline">Remove</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Actions */}
            <div className="bg-[#F5F1EA] rounded-[12px] p-4 lg:p-[24px] flex flex-col sm:flex-row items-center justify-between gap-3 mb-6 lg:mb-[32px]">
              <button className="text-[13px] lg:text-[14px] font-medium text-[#C84848] underline">Clear All Items</button>
              <button className="w-full sm:w-auto h-[44px] lg:h-[48px] px-6 lg:px-[32px] bg-white border-[1.5px] border-[#E8E3D9] text-[#666666] text-[14px] lg:text-[15px] font-medium rounded-[8px] hover:border-[#8B7355] hover:text-[#8B7355] transition-all">Continue Shopping</button>
            </div>

            {/* Share Wishlist Panel */}
            <div className="bg-white rounded-[16px] shadow-[0_8px_32px_rgba(0,0,0,0.12)] p-6 lg:p-[32px] max-w-full md:max-w-[520px] mx-auto">
              <div className="flex items-center justify-between mb-5 lg:mb-[24px]">
                <h2 className="text-[20px] lg:text-[24px] font-semibold text-[#1A1A1A]">Share Your Wishlist</h2>
                <IoCloseOutline className="w-[22px] h-[22px] lg:w-[24px] lg:h-[24px] text-[#666666] cursor-pointer hover:text-[#8B7355] transition-colors" />
              </div>
              <div className="bg-[#F5F1EA] rounded-[8px] p-4 lg:p-[16px] flex items-center justify-between mb-5 lg:mb-[24px]">
                <span className="text-[12px] lg:text-[14px] text-[#666666] truncate mr-3">shanloray.com/wishlist/alexandrachen</span>
                <button className="flex-shrink-0 flex items-center gap-[6px] lg:gap-[8px] text-[13px] lg:text-[14px] font-medium text-[#8B7355]">
                  <IoCopyOutline className="w-[16px] h-[16px] lg:w-[18px] lg:h-[18px]" />Copy
                </button>
              </div>
              <div className="flex items-center justify-center gap-4 lg:gap-[16px]">
                {[{ icon: IoLogoInstagram, label: 'Instagram' }, { icon: IoLogoWhatsapp, label: 'WhatsApp' }, { icon: IoMail, label: 'Email' }].map((s) => (
                  <button key={s.label} className="w-[52px] h-[52px] lg:w-[56px] lg:h-[56px] rounded-full bg-[#FDFBF7] border-[1.5px] border-[#E8E3D9] flex items-center justify-center hover:bg-[#8B7355] group transition-all">
                    <s.icon className="w-[24px] h-[24px] lg:w-[28px] lg:h-[28px] text-[#8B7355] group-hover:text-white transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[40px] md:h-[60px] lg:h-[80px]" />
    </div>
  )
}

// ─── Main Export (Switcher) ───────────────────────────────────────────────────
export default function Wishlist() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return isMobile ? <WishlistMobile /> : <WishlistDesktop />
}