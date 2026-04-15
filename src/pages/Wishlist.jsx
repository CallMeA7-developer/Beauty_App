import { useState, useEffect, useRef } from 'react'
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
import { useTranslation } from 'react-i18next'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { useCart } from '../contexts/CartContext'
import { useWishlist } from '../contexts/WishlistContext'
import LoadingSpinner from '../components/LoadingSpinner'

const wishlistPreviewImages = [
  'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=80&h=80&fit=crop',
  'https://images.unsplash.com/photo-1617897903246-719242758050?w=80&h=80&fit=crop',
  'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=80&h=80&fit=crop',
]

const productTypes = ['Skincare', 'Makeup', 'Fragrance', 'Haircare', 'Body Care', 'Tools']
const skinTypes    = ['Normal', 'Dry', 'Oily', 'Combination', 'Sensitive']
const skinConcerns = ['Anti-Aging', 'Hydration', 'Brightening', 'Acne', 'Dark Spots', 'Fine Lines', 'Dullness']
const brands       = ['LA MER', 'ESTÉE LAUDER', 'DIOR', 'TOM FORD', 'CHARLOTTE TILBURY', 'CHANEL', 'GUERLAIN', 'SISLEY']
const benefits     = ['Moisturizing', 'Firming', 'Soothing', 'Exfoliating', 'Protecting', 'Nourishing']

// ─── Sort Bottom Sheet ────────────────────────────────────────────────────────
function SortSheet({ isOpen, onClose, selected, onSelect }) {
  const { t } = useTranslation()

  const sortOptions = [
    { id: 1, icon: IoArrowUpOutline,    label: t('wishlist.sort.priceLow') },
    { id: 2, icon: IoArrowDownOutline,  label: t('wishlist.sort.priceHigh') },
    { id: 3, icon: IoSparkles,          label: t('wishlist.sort.newest') },
    { id: 4, icon: IoTrendingUpOutline, label: t('wishlist.sort.bestSellers') },
    { id: 5, icon: IoHeart,             label: t('wishlist.sort.mostPopular') },
    { id: 6, icon: IoStarSharp,         label: t('wishlist.sort.highestRated') },
  ]

  if (!isOpen) return null
  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-50" onClick={onClose} />
      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-[60] font-['Cormorant_Garamond'] shadow-[0_-8px_32px_rgba(139,115,85,0.15)]">
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-[#E8E3D9] rounded-full" />
        </div>
        <div className="flex items-center justify-between px-5 pb-3 border-b border-[#F5F1EA]">
          <span className="text-[18px] font-semibold text-[#1A1A1A]">{t('wishlist.sortBy')}</span>
          <button onClick={onClose}><IoCloseOutline className="w-6 h-6 text-[#666666]" /></button>
        </div>
        <div className="py-2">
          {sortOptions.map((option, idx) => (
            <div key={option.id}>
              <button onClick={() => { onSelect(option.label); onClose() }}
                className={`w-full min-h-[56px] px-5 flex items-center justify-between ${selected === option.label ? 'bg-[#FDFBF7]' : ''}`}>
                <div className="flex items-center gap-3">
                  <option.icon className={`w-[18px] h-[18px] ${selected === option.label ? 'text-[#C9A870]' : 'text-[#666666]'}`} />
                  <span className={`text-[15px] ${selected === option.label ? 'text-[#8B7355] font-medium' : 'text-[#2B2B2B] font-normal'}`}>{option.label}</span>
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
  const { t } = useTranslation()
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
          <h2 className="text-[20px] font-semibold text-[#1A1A1A]">{t('wishlist.filterProducts')}</h2>
          <button onClick={onClose}><IoCloseOutline className="w-6 h-6 text-[#666666]" /></button>
        </div>
        <div className="overflow-y-auto px-5 py-5 flex-1">
          <div className="mb-6">
            <h3 className="text-[17px] font-semibold text-[#1A1A1A] mb-3">{t('wishlist.productType')}</h3>
            <div className="flex flex-wrap gap-2">
              {productTypes.map((type) => (
                <button key={type} onClick={() => toggle(selectedTypes, setSelectedTypes, type)}
                  className={`min-h-[40px] px-4 rounded-[24px] border-[1.5px] text-[15px] transition-colors ${selectedTypes.includes(type) ? 'bg-[#FDFBF7] border-[#C9A870] text-[#8B7355] font-medium' : 'bg-white border-[#E8E3D9] text-[#666666] font-normal'}`}>
                  {type}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-[17px] font-semibold text-[#1A1A1A] mb-3">{t('wishlist.priceRange')}</h3>
            <div className="relative px-2">
              <div className="w-full h-[4px] bg-[#E8E3D9] rounded-full">
                <div className="w-[55%] h-full bg-[#C9A870] rounded-full" />
              </div>
              <div className="absolute top-[-8px] left-[2px] w-[20px] h-[20px] rounded-full bg-white border-[2px] border-[#C9A870] shadow-sm" />
              <div className="absolute top-[-8px] left-[55%] w-[20px] h-[20px] rounded-full bg-white border-[2px] border-[#C9A870] shadow-sm" />
            </div>
            <div className="text-center mt-4"><span className="text-[15px] font-normal text-[#666666]">$0 – $400</span></div>
          </div>
          <div className="mb-6">
            <h3 className="text-[17px] font-semibold text-[#1A1A1A] mb-3">{t('wishlist.skinType')}</h3>
            <div className="space-y-3">
              {skinTypes.map((type) => (
                <button key={type} onClick={() => toggle(selectedSkinTypes, setSelectedSkinTypes, type)} className="flex items-center gap-3 w-full">
                  {selectedSkinTypes.includes(type) ? <IoCheckmarkCircle className="w-5 h-5 text-[#C9A870] flex-shrink-0" /> : <div className="w-5 h-5 rounded-[4px] border-[1.5px] border-[#E8E3D9] flex-shrink-0" />}
                  <span className="text-[15px] font-normal text-[#2B2B2B]">{type}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-[17px] font-semibold text-[#1A1A1A] mb-3">{t('wishlist.skinConcerns')}</h3>
            <div className="flex flex-wrap gap-2">
              {skinConcerns.map((concern) => (
                <button key={concern} onClick={() => toggle(selectedConcerns, setSelectedConcerns, concern)}
                  className={`min-h-[40px] px-4 rounded-[24px] border-[1.5px] text-[15px] transition-colors ${selectedConcerns.includes(concern) ? 'bg-[#FDFBF7] border-[#C9A870] text-[#8B7355] font-medium' : 'bg-white border-[#E8E3D9] text-[#666666] font-normal'}`}>
                  {concern}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-[17px] font-semibold text-[#1A1A1A] mb-2">{t('wishlist.brand')}</h3>
            <div className="relative mb-3">
              <input type="text" placeholder={t('wishlist.searchBrands')} className="w-full h-[44px] px-4 pr-10 border-[1.5px] border-[#E8E3D9] rounded-[8px] text-[15px] font-light italic text-[#999999] outline-none" />
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
          <div className="mb-6">
            <h3 className="text-[17px] font-semibold text-[#1A1A1A] mb-3">{t('wishlist.productBenefits')}</h3>
            <div className="flex flex-wrap gap-2">
              {benefits.map((benefit) => (
                <button key={benefit} onClick={() => toggle(selectedBenefits, setSelectedBenefits, benefit)}
                  className={`min-h-[40px] px-4 rounded-[24px] border-[1.5px] text-[15px] transition-colors ${selectedBenefits.includes(benefit) ? 'bg-[#FDFBF7] border-[#C9A870] text-[#8B7355] font-medium' : 'bg-white border-[#E8E3D9] text-[#666666] font-normal'}`}>
                  {benefit}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-[17px] font-semibold text-[#1A1A1A] mb-3">{t('wishlist.minimumRating')}</h3>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map((star) => (
                  <button key={star} onClick={() => setMinRating(star)}>
                    <IoStarSharp className={`w-6 h-6 ${star <= minRating ? 'text-[#C9A870]' : 'text-[#E8E3D9]'}`} />
                  </button>
                ))}
              </div>
              <span className="text-[15px] font-normal text-[#666666]">{minRating}.0 {t('wishlist.andUp')}</span>
            </div>
          </div>
          <div className="mb-4">
            <h3 className="text-[17px] font-semibold text-[#1A1A1A] mb-3">{t('wishlist.availability')}</h3>
            <div className="space-y-3">
              {[{ val: 'instock', label: t('wishlist.inStock') }, { val: 'all', label: t('wishlist.includeOutOfStock') }].map(({ val, label }) => (
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
            {t('wishlist.clearFilters')}
          </button>
          <button onClick={onClose} className="flex-1 h-[52px] bg-[#8B7355] text-white text-[16px] font-medium rounded-[8px]">
            {t('wishlist.applyFilters')}
          </button>
        </div>
        <div className="h-6 bg-white flex-shrink-0" />
      </div>
    </>
  )
}

// ─── Share Modal ──────────────────────────────────────────────────────────────
function ShareModal({ isOpen, onClose }) {
  const { t } = useTranslation()
  if (!isOpen) return null

  const socialOptions = [
    { icon: IoLogoFacebook,  label: 'Facebook',  bg: 'bg-[#EBF5FF]', color: 'text-[#1877F2]' },
    { icon: IoLogoInstagram, label: 'Instagram', bg: 'bg-[#FFF6F0]', color: 'text-[#E4405F]' },
    { icon: IoLogoTwitter,   label: 'Twitter',   bg: 'bg-[#E8F5FD]', color: 'text-[#1DA1F2]' },
    { icon: IoLogoWhatsapp,  label: 'WhatsApp',  bg: 'bg-[#F0F9F4]', color: 'text-[#25D366]' },
  ]

  const otherOptions = [
    { icon: IoMailOutline,   label: t('wishlist.sendViaEmail'),   sub: t('wishlist.shareEmailDesc')  },
    { icon: IoLinkOutline,   label: t('wishlist.copyLink'),       sub: t('wishlist.copyLinkDesc')    },
    { icon: IoQrCodeOutline, label: t('wishlist.generateQR'),     sub: t('wishlist.generateQRDesc')  },
  ]

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-50" onClick={onClose} />
      <div className="fixed inset-0 z-[60] flex items-center justify-center px-5 font-['Cormorant_Garamond']">
        <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-[0_8px_32px_rgba(139,115,85,0.18)] overflow-hidden">
          <div className="px-6 py-5 flex items-start justify-between border-b border-[#F5F1EA]">
            <div>
              <h2 className="text-[24px] font-semibold text-[#1A1A1A] mb-1">{t('wishlist.shareWishlist')}</h2>
              <p className="text-[15px] font-normal text-[#666666]">{t('wishlist.shareDesc')}</p>
            </div>
            <button onClick={onClose} className="w-6 h-6 flex items-center justify-center mt-1">
              <IoCloseOutline className="w-6 h-6 text-[#666666]" />
            </button>
          </div>
          <div className="px-6 py-5">
            <h3 className="text-[17px] font-semibold text-[#1A1A1A] mb-4">{t('wishlist.shareViaSocial')}</h3>
            <div className="grid grid-cols-2 gap-3">
              {socialOptions.map(({ icon: Icon, label, bg, color }) => (
                <button key={label} className={`min-h-[80px] ${bg} rounded-xl flex flex-col items-center justify-center gap-2`}>
                  <Icon className={`w-8 h-8 ${color}`} />
                  <span className="text-[14px] font-medium text-[#1A1A1A]">{label}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="px-6 py-5 border-t border-[#F5F1EA]">
            <h3 className="text-[17px] font-semibold text-[#1A1A1A] mb-4">{t('wishlist.otherOptions')}</h3>
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
          <div className="bg-[#FDFBF7] border-t border-[#E8E3D9] px-6 py-4 flex items-center gap-3">
            <div className="flex items-center">
              {wishlistPreviewImages.map((img, idx) => (
                <div key={idx} className="w-10 h-10 rounded-lg overflow-hidden border-2 border-white shadow-sm" style={{ marginLeft: idx > 0 ? '-8px' : '0', zIndex: wishlistPreviewImages.length - idx }}>
                  <img src={img} alt={`Product ${idx + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <span className="text-[14px] font-medium text-[#666666]">{t('wishlist.itemsToShare')}</span>
          </div>
        </div>
      </div>
    </>
  )
}

// ─── Mobile ───────────────────────────────────────────────────────────────────
function WishlistMobile() {
  const { t, i18n } = useTranslation()
  const { user } = useAuth()
  const { addToCart } = useCart()
  const { wishlistItems, wishlistCount, loading, removeFromWishlist } = useWishlist()
  const [sortOpen, setSortOpen]         = useState(false)
  const [filterOpen, setFilterOpen]     = useState(false)
  const [shareOpen, setShareOpen]       = useState(false)
  const [selectedSort, setSelectedSort] = useState('')

  useEffect(() => {
    setSelectedSort(t('wishlist.sort.newest'))
  }, [i18n.language])

  const handleRemove = async (productId) => await removeFromWishlist(productId)
  const handleAddToBag = async (product) => {
    await addToCart(product.id, product.name, product.image, product.brand || 'Shan Loray', '100ml', parseFloat(product.price), 1)
  }

  if (loading) return <LoadingSpinner />

  if (!user) {
    return (
      <div key={i18n.language} className="w-full min-h-screen bg-white font-['Cormorant_Garamond'] flex items-center justify-center">
        <div className="text-center px-5">
          <p className="text-[18px] text-[#666666] mb-6">{t('wishlist.loginRequired')}</p>
          <Link to="/"><button className="h-[48px] px-[32px] bg-[#8B7355] text-white text-[15px] font-medium rounded-[8px]">{t('wishlist.goHome')}</button></Link>
        </div>
      </div>
    )
  }

  return (
    <div key={i18n.language} className="w-full min-h-screen bg-[#FDFBF7] font-['Cormorant_Garamond'] flex flex-col">
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
        <h1 className="text-[32px] font-semibold text-[#1A1A1A] mb-1">{t('wishlist.title')}</h1>
        <p className="text-[16px] font-normal text-[#666666]">{wishlistCount} {wishlistCount === 1 ? t('wishlist.savedTreasure') : t('wishlist.savedTreasures')}</p>
      </div>

      {/* Filter & Sort Bar */}
      <div className="bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] px-5 py-3 flex items-center justify-between gap-3 flex-shrink-0">
        <button onClick={() => setSortOpen(true)} className="h-10 px-4 border-[1.5px] border-[#E8E3D9] rounded-lg flex items-center gap-2">
          <IoSwapVerticalOutline className="w-4 h-4 text-[#666666]" />
          <span className="text-[14px] font-medium text-[#666666]">{t('wishlist.sort.label')}</span>
        </button>
        <span className="text-[14px] font-normal text-[#666666]">{selectedSort}</span>
        <button onClick={() => setFilterOpen(true)} className="h-10 px-4 border-[1.5px] border-[#C9A870] bg-[#FDFBF7] rounded-lg flex items-center gap-2">
          <IoFunnelOutline className="w-4 h-4 text-[#8B7355]" />
          <span className="text-[14px] font-medium text-[#8B7355]">{t('wishlist.filter')}</span>
        </button>
      </div>

      {/* Product List */}
      <div className="flex-1 px-5 py-5">
        {wishlistItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-5">
            <IoHeartOutline className="w-24 h-24 text-[#E8E3D9] mb-4" />
            <h3 className="text-[24px] font-semibold text-[#1A1A1A] mb-2">{t('wishlist.emptyTitle')}</h3>
            <p className="text-[16px] text-[#666666] mb-6">{t('wishlist.emptyDesc')}</p>
            <Link to="/collections">
              <button className="h-[48px] px-[32px] bg-[#8B7355] text-white text-[15px] font-medium rounded-[8px]">{t('wishlist.exploreProducts')}</button>
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {wishlistItems.map((item) => {
              const product = item.products
              return (
                <div key={item.id} className="bg-white rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-4">
                  <Link to={`/product/${product.id}`}>
                    <div className="relative w-full h-[280px] rounded-lg overflow-hidden mb-4">
                      <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                      <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.12)] flex items-center justify-center">
                        <IoHeart className="w-5 h-5 text-[#C9A870]" />
                      </div>
                    </div>
                  </Link>
                  <div className="mb-4">
                    <div className="text-[12px] font-medium text-[#8B7355] tracking-[1px] uppercase mb-2">{product.brand}</div>
                    <h3 className="text-[17px] font-semibold text-[#1A1A1A] leading-[1.3] mb-2 line-clamp-2">{product.name}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-0.5">
                        {[1,2,3,4,5].map((s) => <IoStarSharp key={s} className={`w-[13px] h-[13px] ${s <= product.rating ? 'text-[#C9A870]' : 'text-[#E8E3D9]'}`} />)}
                      </div>
                      <span className="text-[13px] text-[#999]">({product.reviews_count})</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[22px] font-semibold text-[#1A1A1A]">${parseFloat(product.price).toFixed(2)}</span>
                    </div>
                    <div className="inline-block px-2.5 py-1 rounded text-[12px] font-medium bg-[#F0F8F0] text-[#7BA85D]">{t('wishlist.inStock')}</div>
                  </div>
                  <div className="space-y-3">
                    <button onClick={() => handleAddToBag(product)} className="w-full h-12 bg-[#8B7355] text-white text-[15px] font-semibold rounded-lg">{t('wishlist.addToBag')}</button>
                    <button onClick={() => handleRemove(product.id)} className="w-full text-[15px] font-medium text-[#C84848] underline">{t('wishlist.remove')}</button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white border-t border-[#E8E3D9] px-5 py-4 flex items-center gap-3 flex-shrink-0">
        <button className="flex-1 h-12 bg-[#8B7355] text-white text-[14px] font-semibold rounded-lg">{t('wishlist.moveAllToBag')}</button>
        <button className="flex-1 h-12 border-[1.5px] border-[#E8E3D9] text-[#666666] text-[14px] font-semibold rounded-lg">{t('wishlist.clearWishlist')}</button>
      </div>

      {/* Bottom Nav */}
      <div className="bg-white border-t border-[#E8E3D9] flex items-center justify-around px-4 h-[64px] flex-shrink-0">
        <Link to="/" className="flex flex-col items-center gap-1">
          <IoHomeOutline className="w-6 h-6 text-[#666666]" />
          <span className="text-[11px] text-[#666666]">{t('wishlist.nav.home')}</span>
        </Link>
        <Link to="/search" className="flex flex-col items-center gap-1">
          <IoSearchOutline className="w-6 h-6 text-[#666666]" />
          <span className="text-[11px] text-[#666666]">{t('wishlist.nav.search')}</span>
        </Link>
        <button className="flex flex-col items-center gap-1 relative">
          <IoHeart className="w-6 h-6 text-[#8B7355]" />
          <span className="text-[11px] text-[#8B7355]">{t('wishlist.nav.wishlist')}</span>
          <div className="absolute top-0 right-0 w-2 h-2 bg-[#C84848] rounded-full" />
        </button>
        <Link to="/account" className="flex flex-col items-center gap-1">
          <IoPersonOutline className="w-6 h-6 text-[#666666]" />
          <span className="text-[11px] text-[#666666]">{t('wishlist.nav.account')}</span>
        </Link>
      </div>

      <SortSheet   isOpen={sortOpen}   onClose={() => setSortOpen(false)}   selected={selectedSort} onSelect={setSelectedSort} />
      <FilterSheet isOpen={filterOpen} onClose={() => setFilterOpen(false)} />
      <ShareModal  isOpen={shareOpen}  onClose={() => setShareOpen(false)}  />
    </div>
  )
}

// ─── Desktop ──────────────────────────────────────────────────────────────────
function WishlistDesktop() {
  const { t, i18n } = useTranslation()
  const { user } = useAuth()
  const { addToCart } = useCart()
  const { wishlistItems, wishlistCount, loading, removeFromWishlist } = useWishlist()
  const [totalOrders, setTotalOrders] = useState(0)
  const [loyaltyPoints, setLoyaltyPoints] = useState(0)
  const [reviewsCount, setReviewsCount] = useState(0)
  const [selectedSort, setSelectedSort] = useState('newest')
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const shareRef = useRef(null)

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || t('wishlist.user')
  const userEmail = user?.email || ''
  const userAvatar = user?.user_metadata?.avatar_url
  const userInitials = userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

  const navigationItems = [
    { icon: IoPersonOutline,   label: t('wishlist.nav.accountDashboard'), path: '/dashboard',        active: false },
    { icon: IoBagCheckOutline, label: t('wishlist.nav.orderHistory'),     path: '/order-tracking',   active: false },
    { icon: IoHeartOutline,    label: t('wishlist.nav.wishlist'),         path: '/wishlist',         active: true  },
    { icon: IoSparkles,        label: t('wishlist.nav.beautyProfile'),    path: '/skin-analysis',    active: false },
    { icon: IoRibbonOutline,   label: t('wishlist.nav.loyaltyProgram'),   path: '/account',          active: false },
    { icon: IoCalendarOutline, label: t('wishlist.nav.myRoutines'),       path: '/beauty-journey',   active: false },
    { icon: IoStarSharp,       label: t('wishlist.nav.reviewsRatings'),   path: '/account',          active: false },
    { icon: IoSettingsOutline, label: t('wishlist.nav.accountSettings'),  path: '/privacy-settings', active: false },
  ]

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return
      try {
        const { data: orders } = await supabase.from('orders').select('total').eq('user_id', user.id)
        setTotalOrders(orders?.length || 0)
        const points = orders?.reduce((sum, o) => sum + (parseFloat(o.total) || 0), 0) || 0
        setLoyaltyPoints(Math.floor(points))
        const { data: reviews } = await supabase.from('reviews').select('id').eq('user_id', user.id)
        setReviewsCount(reviews?.length || 0)
      } catch (err) { console.error('Error fetching stats:', err) }
    }
    fetchStats()
  }, [user])

  const handleRemove = async (productId) => await removeFromWishlist(productId)
  const handleAddToBag = async (product) => {
    await addToCart(product.id, product.name, product.image, product.brand || 'Shan Loray', '100ml', parseFloat(product.price), 1)
  }

  if (loading) return <LoadingSpinner />

  if (!user) {
    return (
      <div key={i18n.language} className="w-full min-h-screen bg-white font-['Cormorant_Garamond'] flex items-center justify-center">
        <div className="text-center px-5">
          <p className="text-[18px] text-[#666666] mb-6">{t('wishlist.loginRequired')}</p>
          <Link to="/"><button className="h-[48px] px-[32px] bg-[#8B7355] text-white text-[15px] font-medium rounded-[8px]">{t('wishlist.goHome')}</button></Link>
        </div>
      </div>
    )
  }

  return (
    <div key={i18n.language} className="bg-white font-['Cormorant_Garamond']">
      {/* Breadcrumb */}
      <div className="min-h-[48px] bg-[#FDFBF7] px-6 md:px-[60px] lg:px-[120px] flex items-center">
        <span className="text-[13px] lg:text-[15px] font-normal text-[#8B7355] cursor-pointer">{t('wishlist.home')}</span>
        <span className="text-[13px] lg:text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="hidden sm:inline text-[13px] lg:text-[15px] font-normal text-[#8B7355] cursor-pointer">{t('wishlist.nav.accountDashboard')}</span>
        <span className="hidden sm:inline text-[13px] lg:text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[13px] lg:text-[15px] font-normal text-[#666666]">{t('wishlist.title')}</span>
      </div>

      {/* Page Header */}
      <div className="min-h-[100px] md:min-h-[120px] lg:min-h-[140px] bg-gradient-to-b from-[#FDFBF7] to-white flex flex-col items-center justify-center px-6 md:px-[60px] lg:px-[120px]">
        <div className="max-w-[1200px] w-full">
          <h1 className="text-[32px] md:text-[40px] lg:text-[48px] font-semibold text-[#1A1A1A]">{t('wishlist.title')}</h1>
          <p className="text-[15px] md:text-[16px] lg:text-[18px] font-normal text-[#666666] mt-[8px]">{wishlistCount} {wishlistCount === 1 ? t('wishlist.savedItem') : t('wishlist.savedItems')} {t('wishlist.awaitingAttention')}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 md:px-[60px] lg:px-[120px] py-8 md:py-10 lg:py-[48px]">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-[40px]">

          {/* Sidebar */}
          <div className="w-full md:w-[240px] lg:w-[320px] flex-shrink-0">
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 lg:p-[28px] mb-5 lg:mb-[24px]">
              <div className="flex flex-col items-center">
                {userAvatar ? (
                  <img src={userAvatar} alt="User Avatar" className="w-[90px] h-[90px] md:w-[100px] md:h-[100px] lg:w-[120px] lg:h-[120px] rounded-full object-cover border-[3px] border-[#C9A870] mb-4 lg:mb-[16px]" />
                ) : (
                  <div className="w-[90px] h-[90px] md:w-[100px] md:h-[100px] lg:w-[120px] lg:h-[120px] rounded-full bg-gradient-to-br from-[#8B7355] to-[#C9A870] border-[3px] border-[#C9A870] mb-4 lg:mb-[16px] flex items-center justify-center">
                    <span className="text-[28px] md:text-[32px] lg:text-[36px] font-bold text-white">{userInitials}</span>
                  </div>
                )}
                <h2 className="text-[20px] md:text-[22px] lg:text-[24px] font-semibold text-[#1A1A1A] mb-[4px]">{userName}</h2>
                <p className="text-[13px] lg:text-[14px] text-[#666666] mb-3">{userEmail}</p>
                <div className="bg-[#C9A870] text-white text-[11px] lg:text-[12px] font-medium px-[14px] lg:px-[16px] py-[5px] lg:py-[6px] rounded-full mb-4 lg:mb-[16px]">
                  {loyaltyPoints >= 3000 ? t('wishlist.goldMember') : loyaltyPoints >= 2000 ? t('wishlist.eliteMember') : t('wishlist.member')}
                </div>
                <div className="flex items-center gap-[8px]">
                  <IoSparkles className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#C9A870]" />
                  <span className="text-[17px] lg:text-[20px] font-medium text-[#8B7355]">{loyaltyPoints.toLocaleString()} {t('wishlist.points')}</span>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[8px] mb-5 lg:mb-[24px]">
              {navigationItems.map((item) => (
                <Link key={item.label} to={item.path}>
                  <div className={`flex items-center justify-between h-[48px] lg:h-[56px] px-3 lg:px-[20px] rounded-[8px] cursor-pointer transition-colors ${item.active ? 'bg-[#FDFBF7]' : 'hover:bg-[#FDFBF7]'}`}>
                    <div className="flex items-center gap-3 lg:gap-[16px]">
                      <item.icon className={`w-[20px] h-[20px] lg:w-[22px] lg:h-[22px] ${item.active ? 'text-[#8B7355]' : 'text-[#666666]'}`} />
                      <span className={`text-[13px] lg:text-[15px] ${item.active ? 'text-[#8B7355] font-medium' : 'font-normal text-[#2B2B2B]'}`}>{item.label}</span>
                    </div>
                    {item.active && wishlistCount > 0 && (
                      <div className="bg-[#C9A870] text-white text-[10px] lg:text-[11px] font-medium px-[7px] lg:px-[8px] py-[2px] rounded-full">{wishlistCount}</div>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            {/* Stats */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 lg:p-[24px]">
              <div className="grid grid-cols-3 gap-3 lg:gap-[16px]">
                {[
                  { label: t('wishlist.totalOrders'), value: totalOrders },
                  { label: t('wishlist.wishlistItems'), value: wishlistCount },
                  { label: t('wishlist.reviewsWritten'), value: reviewsCount }
                ].map((stat) => (
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
              <div className="flex items-center gap-3 lg:gap-[16px]">
                <span className="hidden md:inline text-[14px] lg:text-[15px] text-[#666666]">{t('wishlist.sortBy')}:</span>
                <div className="relative">
                  <button onClick={() => setShowSortDropdown(!showSortDropdown)}
                    className="w-[180px] md:w-[200px] lg:w-[240px] min-h-[44px] lg:min-h-[48px] px-4 bg-white border border-[#E8E3D9] rounded-[8px] flex items-center justify-between cursor-pointer hover:border-[#C9A870] transition-all">
                    <span className="text-[13px] md:text-[14px] lg:text-[15px] font-medium text-[#2B2B2B]">
                      {selectedSort === 'newest' ? t('wishlist.sort.newestAdded') : selectedSort === 'low_high' ? t('wishlist.sort.priceLow') : selectedSort === 'high_low' ? t('wishlist.sort.priceHigh') : t('wishlist.sort.highestRated')}
                    </span>
                    <IoChevronDown className="w-[16px] h-[16px] lg:w-[18px] lg:h-[18px] text-[#8B7355]" />
                  </button>
                  {showSortDropdown && (
                    <div className="absolute top-full mt-2 left-0 w-[240px] bg-white border border-[#E8E3D9] rounded-[8px] shadow-lg z-10">
                      {[
                        { value: 'newest',       label: t('wishlist.sort.newestAdded') },
                        { value: 'low_high',     label: t('wishlist.sort.priceLow') },
                        { value: 'high_low',     label: t('wishlist.sort.priceHigh') },
                        { value: 'highest_rated',label: t('wishlist.sort.highestRated') },
                      ].map((option) => (
                        <button key={option.value} onClick={() => { setSelectedSort(option.value); setShowSortDropdown(false) }}
                          className={`w-full px-4 py-3 text-left text-[14px] hover:bg-[#F5F1EA] transition-colors ${selectedSort === option.value ? 'text-[#8B7355] font-medium' : 'text-[#2B2B2B]'}`}>
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <button onClick={() => shareRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="h-[38px] lg:h-[40px] px-4 lg:px-[20px] bg-white border-[1.5px] border-[#E8E3D9] text-[#666666] text-[13px] lg:text-[14px] font-medium rounded-[8px] cursor-pointer flex items-center gap-[6px] lg:gap-[8px] hover:border-[#8B7355] transition-colors">
                <IoShareSocialOutline className="w-[15px] h-[15px] lg:w-[16px] lg:h-[16px]" />{t('wishlist.shareWishlist')}
              </button>
            </div>

            {/* Product Grid */}
            {wishlistItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                <IoHeartOutline className="w-32 h-32 text-[#E8E3D9] mb-6" />
                <h3 className="text-[28px] font-semibold text-[#1A1A1A] mb-3">{t('wishlist.emptyTitle')}</h3>
                <p className="text-[16px] text-[#666666] mb-6">{t('wishlist.emptyDesc')}</p>
                <Link to="/collections">
                  <button className="h-[48px] px-[32px] bg-[#8B7355] text-white text-[15px] font-medium rounded-[8px]">{t('wishlist.exploreProducts')}</button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-[24px] mb-5 lg:mb-[24px]">
                {[...wishlistItems].sort((a, b) => {
                  const pa = a.products, pb = b.products
                  if (selectedSort === 'low_high') return parseFloat(pa.price) - parseFloat(pb.price)
                  if (selectedSort === 'high_low') return parseFloat(pb.price) - parseFloat(pa.price)
                  if (selectedSort === 'highest_rated') return (pb.rating || 0) - (pa.rating || 0)
                  return new Date(b.created_at) - new Date(a.created_at)
                }).map((item) => {
                  const product = item.products
                  return (
                    <div key={item.id} className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-4 lg:p-[20px] hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-all duration-300">
                      <Link to={`/product/${product.id}`}>
                        <div className="relative w-full h-[220px] md:h-[240px] lg:h-[280px] rounded-[8px] overflow-hidden mb-4 lg:mb-[16px] group">
                          <img src={product.image_url || product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          <button className="absolute top-[12px] right-[12px] w-[34px] h-[34px] lg:w-[36px] lg:h-[36px] rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] flex items-center justify-center">
                            <IoHeart className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#C9A870]" />
                          </button>
                        </div>
                      </Link>
                      <div className="mb-4 lg:mb-[16px]">
                        <div className="text-[12px] lg:text-[13px] font-medium text-[#8B7355] mb-[4px]">{product.brand}</div>
                        <h3 className="text-[16px] md:text-[17px] lg:text-[18px] font-semibold text-[#1A1A1A] mb-[8px] leading-[1.3]">{product.name}</h3>
                        <div className="flex items-center gap-[8px] mb-[8px]">
                          <div className="flex items-center gap-[2px]">{[1,2,3,4,5].map((s) => <IoStarSharp key={s} className={`w-[13px] h-[13px] lg:w-[14px] lg:h-[14px] ${s <= product.rating ? 'text-[#C9A870]' : 'text-[#E8E3D9]'}`} />)}</div>
                          <span className="text-[12px] lg:text-[13px] text-[#999999]">({product.reviews_count})</span>
                        </div>
                        <div className="flex items-center gap-[8px] mb-[8px] flex-wrap">
                          <span className="text-[20px] lg:text-[22px] font-semibold text-[#1A1A1A]">${parseFloat(product.price).toFixed(2)}</span>
                        </div>
                        <div className="inline-block px-[10px] lg:px-[12px] py-[4px] rounded-[4px] text-[11px] lg:text-[12px] font-medium bg-[#F0F8F0] text-[#7BA85D]">{t('wishlist.inStock')}</div>
                      </div>
                      <div className="space-y-3 lg:space-y-[12px]">
                        <button onClick={() => handleAddToBag(product)} className="w-full h-[44px] lg:h-[48px] bg-[#8B7355] text-white text-[14px] lg:text-[16px] font-medium rounded-[8px] flex items-center justify-center gap-2 hover:bg-[#7a6448] transition-colors">
                          <IoBagOutline className="w-[17px] h-[17px] lg:w-[18px] lg:h-[18px]" />{t('wishlist.addToCart')}
                        </button>
                        <button onClick={() => handleRemove(product.id)} className="w-full text-[13px] lg:text-[14px] font-medium text-[#C84848] underline">{t('wishlist.remove')}</button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Bottom Actions */}
            {wishlistItems.length > 0 && (
              <div className="bg-[#F5F1EA] rounded-[12px] p-4 lg:p-[24px] flex flex-col sm:flex-row items-center justify-between gap-3 mb-6 lg:mb-[32px]">
                <button onClick={async () => { for (const item of wishlistItems) { await removeFromWishlist(item.products.id) } }}
                  className="text-[13px] lg:text-[14px] font-medium text-[#C84848] underline hover:text-[#a83030] transition-colors">
                  {t('wishlist.clearAllItems')}
                </button>
                <Link to="/collections">
                  <button className="w-full sm:w-auto h-[44px] lg:h-[48px] px-6 lg:px-[32px] bg-white border-[1.5px] border-[#E8E3D9] text-[#666666] text-[14px] lg:text-[15px] font-medium rounded-[8px] hover:border-[#8B7355] hover:text-[#8B7355] transition-all">
                    {t('wishlist.continueShopping')}
                  </button>
                </Link>
              </div>
            )}

            {/* Share Panel */}
            <div ref={shareRef} className="bg-white rounded-[16px] shadow-[0_8px_32px_rgba(0,0,0,0.12)] p-6 lg:p-[32px] max-w-full md:max-w-[520px] mx-auto">
              <div className="flex items-center justify-between mb-5 lg:mb-[24px]">
                <h2 className="text-[20px] lg:text-[24px] font-semibold text-[#1A1A1A]">{t('wishlist.shareYourWishlist')}</h2>
              </div>
              <div className="bg-[#F5F1EA] rounded-[8px] p-4 lg:p-[16px] flex items-center justify-between mb-5 lg:mb-[24px]">
                <span className="text-[12px] lg:text-[14px] text-[#666666] truncate mr-3">{window.location.origin}/wishlist</span>
                <button onClick={() => navigator.clipboard.writeText(window.location.origin + '/wishlist')}
                  className="flex-shrink-0 flex items-center gap-[6px] lg:gap-[8px] text-[13px] lg:text-[14px] font-medium text-[#8B7355] hover:text-[#7a6448] transition-colors">
                  <IoCopyOutline className="w-[16px] h-[16px] lg:w-[18px] lg:h-[18px]" />{t('wishlist.copy')}
                </button>
              </div>
              <div className="flex items-center justify-center gap-4 lg:gap-[16px]">
                <a href="#" target="_blank" rel="noreferrer">
                  <button className="w-[52px] h-[52px] lg:w-[56px] lg:h-[56px] rounded-full bg-[#FDFBF7] border-[1.5px] border-[#E8E3D9] flex items-center justify-center hover:bg-[#8B7355] group transition-all">
                    <IoLogoInstagram className="w-[24px] h-[24px] lg:w-[28px] lg:h-[28px] text-[#8B7355] group-hover:text-white transition-colors" />
                  </button>
                </a>
                <a href={`https://wa.me/?text=${encodeURIComponent(window.location.origin + '/wishlist')}`} target="_blank" rel="noreferrer">
                  <button className="w-[52px] h-[52px] lg:w-[56px] lg:h-[56px] rounded-full bg-[#FDFBF7] border-[1.5px] border-[#E8E3D9] flex items-center justify-center hover:bg-[#8B7355] group transition-all">
                    <IoLogoWhatsapp className="w-[24px] h-[24px] lg:w-[28px] lg:h-[28px] text-[#8B7355] group-hover:text-white transition-colors" />
                  </button>
                </a>
                <a href={`mailto:?subject=My Shan Loray Wishlist&body=${window.location.origin}/wishlist`}>
                  <button className="w-[52px] h-[52px] lg:w-[56px] lg:h-[56px] rounded-full bg-[#FDFBF7] border-[1.5px] border-[#E8E3D9] flex items-center justify-center hover:bg-[#8B7355] group transition-all">
                    <IoMail className="w-[24px] h-[24px] lg:w-[28px] lg:h-[28px] text-[#8B7355] group-hover:text-white transition-colors" />
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[40px] md:h-[60px] lg:h-[80px]" />
    </div>
  )
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function Wishlist() {
  const { i18n } = useTranslation()
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return isMobile ? <WishlistMobile key={i18n.language} /> : <WishlistDesktop key={i18n.language} />
}