import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { IoCheckmarkCircle, IoChevronBack, IoChevronForward, IoStarSharp } from 'react-icons/io5'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

// ─── Shared Data ──────────────────────────────────────────────────────────────

const testimonialsData = [
  { quoteKey: 'home.testimonial1', name: 'Anastasia Volkov',  location: 'St. Petersburg', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=72&h=72&fit=crop' },
  { quoteKey: 'home.testimonial2', name: 'Elena Morozova',    location: 'Moscow',         img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=72&h=72&fit=crop' },
  { quoteKey: 'home.testimonial3', name: 'Sofia Ivanova',     location: 'Kazan',          img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=72&h=72&fit=crop' },
]

const instagramImages = [
  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=240&h=240&fit=crop',
  'https://images.unsplash.com/photo-1596704017254-9b121068ec31?w=240&h=240&fit=crop',
  'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=240&h=240&fit=crop',
  'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=240&h=240&fit=crop',
  'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=240&h=240&fit=crop',
  'https://images.unsplash.com/photo-1598439210625-5067c578f3f6?w=240&h=240&fit=crop',
  'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=240&h=240&fit=crop',
]

const newArrivalsBenefits = [
  'Reduces visible signs of aging by 40% in clinical trials',
  'Enhances natural radiance with botanical light-reflecting particles',
  'Sustainable luxury with carbon-neutral production',
]

// ─── Mobile ───────────────────────────────────────────────────────────────────
function HomeMobile() {
  const { user } = useAuth()
  const { t } = useTranslation()
  const [bestSellers, setBestSellers] = useState([])
  const [newArrivalMain, setNewArrivalMain] = useState(null)
  const [newArrivalSupporting, setNewArrivalSupporting] = useState([])
  const [notifyMessage, setNotifyMessage] = useState(false)

  useEffect(() => {
    const fetchBestSellers = async () => {
      const { data } = await supabase
        .from('products')
        .select('id, name, brand, price, image_url')
        .in('id', ['sk-401', 'mk-401', 'sk-402', 'sk-403', 'sk-404'])

      if (data && data.length > 0) {
        const order = ['sk-401', 'mk-401', 'sk-402', 'sk-403', 'sk-404']
        const sorted = order.map(id => data.find(p => p.id === id)).filter(Boolean)
        setBestSellers(sorted)
      }
    }
    fetchBestSellers()
  }, [])

  useEffect(() => {
    const fetchNewArrivals = async () => {
      const { data } = await supabase
        .from('products')
        .select('id, name, brand, price, image_url')
        .in('id', ['sk-405', 'sk-406', 'mk-402', 'mk-403'])

      if (data && data.length > 0) {
        const main = data.find(p => p.id === 'sk-405')
        const supporting = ['sk-406', 'mk-402', 'mk-403']
          .map(id => data.find(p => p.id === id))
          .filter(Boolean)
        setNewArrivalMain(main)
        setNewArrivalSupporting(supporting)
      }
    }
    fetchNewArrivals()
  }, [])

  return (
    <div className="w-full bg-white font-['Cormorant_Garamond']">

      {/* Hero */}
      <section className="w-full relative min-h-[600px]">
        <img
          src="https://images.unsplash.com/photo-1556228720-195a672e8a03?w=440&h=600&fit=crop"
          alt="Luxury skincare golden hour"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
        <div className="absolute bottom-5 left-5 right-5">
          <div className="bg-white/90 backdrop-blur-sm rounded-[12px] p-6">
            <p className="text-[10px] font-light italic text-[#C9A870] tracking-[2px] uppercase mb-3">{t('home.heroCollection')}</p>
            <h1 className="text-[36px] font-bold text-[#1A1A1A] leading-[1.1] mb-4">{t('home.heroTitle')}</h1>
            <p className="text-[15px] font-normal text-[#666666] leading-[1.6] mb-5">
              {t('home.heroSubtitle')}
            </p>
            <Link to="/explore">
              <button className="w-[120px] h-[48px] border-[2px] border-[#1A1A1A] text-[14px] font-semibold text-[#1A1A1A]">
                {t('home.explore')}
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Technology Cards */}
      <section className="w-full bg-gradient-to-b from-[#FDFBF7] to-[#F5F1EA] px-5 py-8">
        <div className="space-y-4">
          <div className="bg-white rounded-[16px] shadow-[0_8px_24px_rgba(0,0,0,0.08)] p-7">
            <div className="w-14 h-14 rounded-full bg-[#688B8D] flex items-center justify-center mb-5">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2v4m0 12v4M4.22 4.22l2.83 2.83m9.9 9.9l2.83 2.83M2 12h4m12 0h4M4.22 19.78l2.83-2.83m9.9-9.9l2.83-2.83" />
              </svg>
            </div>
            <h3 className="text-[24px] font-semibold text-[#1A1A1A] mb-3">{t('home.aiTitle')}</h3>
            <p className="text-[14px] font-normal text-[#666666] leading-[1.6] mb-4">
              {t('home.aiDesc')}
            </p>
            <Link to="/skin-analysis#upload-section">
              <span className="text-[13px] font-medium text-[#8B7355]">{t('home.beginAnalysis')}</span>
            </Link>
          </div>

          <div className="bg-white rounded-[16px] shadow-[0_8px_24px_rgba(0,0,0,0.08)] p-7">
            <div className="w-14 h-14 rounded-full bg-[#D4AFA3] flex items-center justify-center mb-5">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8" />
                <path d="M12 17v4" />
              </svg>
            </div>
            <h3 className="text-[24px] font-semibold text-[#1A1A1A] mb-3">{t('home.virtualTitle')}</h3>
            <p className="text-[14px] font-normal text-[#666666] leading-[1.6] mb-4">
              {t('home.virtualDesc')}
            </p>
            <Link to="/virtual-tryon#tryon-section">
              <span className="text-[13px] font-medium text-[#8B7355]">{t('home.tryNow')}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="w-full bg-white px-5 py-10">
        <div className="space-y-3">
          <Link to="/skincare" className="block relative min-h-[400px] rounded-[8px] overflow-hidden">
            <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop" alt="Botanical Serums" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <h3 className="text-[28px] font-semibold text-white">{t('home.botanicalSerums')}</h3>
            </div>
          </Link>
          <Link to="/makeup" className="block min-h-[240px] rounded-[8px] overflow-hidden">
            <img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=240&fit=crop" alt="Artisan Tools" className="w-full h-full object-cover" />
          </Link>
          <div className="bg-[#EBE6DC] rounded-[8px] p-8">
            <h4 className="text-[20px] font-semibold text-[#2B2B2B] mb-3">{t('home.artisanTools')}</h4>
            <p className="text-[14px] font-normal text-[#666666] leading-[1.6] mb-4">
              {t('home.artisanDesc')}
            </p>
            <Link to="/technology#how-it-works">
              <span className="text-[13px] font-medium text-[#8B7355]">{t('home.discoverTools')}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="w-full bg-white py-12">
        <div className="text-center mb-10">
          <h2 className="text-[32px] font-bold text-[#1A1A1A] mb-4">{t('home.bestSellers')}</h2>
          <div className="w-16 h-[3px] bg-[#C9A870] mx-auto" />
        </div>
        <div className="overflow-x-auto px-5" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="flex gap-4" style={{ width: 'max-content' }}>
            {bestSellers.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`} className="w-[240px] flex-shrink-0">
                <div className="w-[240px] h-[240px] bg-white rounded-[6px] overflow-hidden mb-4">
                  <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <p className="text-[12px] font-light italic text-[#8B7355] tracking-[1px] mb-2">{product.brand}</p>
                <h4 className="text-[16px] font-medium text-[#2B2B2B] leading-[1.2] mb-2">{product.name}</h4>
                <p className="text-[17px] font-semibold text-[#1A1A1A]">${parseFloat(product.price).toFixed(2)}</p>
              </Link>
            ))}
          </div>
        </div>
        <div className="text-center mt-8">
          <Link to="/collections#browse-by-category">
            <span className="text-[14px] font-normal text-[#8B7355] underline">{t('home.viewAllProducts')}</span>
          </Link>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="w-full bg-gradient-to-b from-[#FDFBF7] to-[#F9F4EE] py-12">
        <div className="text-center mb-10 px-5">
          <h2 className="text-[32px] font-bold text-[#1A1A1A] mb-2">{t('home.newArrivals')}</h2>
          <p className="text-[12px] font-light italic text-[#C9A870] tracking-[2px] uppercase mb-4">{t('home.limitedEdition')}</p>
          <div className="w-16 h-[3px] bg-[#C9A870] mx-auto" />
        </div>

        {newArrivalMain && (
          <div className="px-5 mb-8">
            <div className="relative mb-5">
              <img
                src={newArrivalMain.image_url}
                alt={newArrivalMain.name}
                className="w-full rounded-[8px] shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
              />
              <div className="absolute top-[-12px] right-[-12px] bg-[#688B8D] h-9 px-4 rounded-[18px] flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
                <span className="text-[11px] font-semibold text-white uppercase tracking-[1.5px]">{t('home.new')}</span>
              </div>
            </div>

            <div className="bg-white rounded-[16px] shadow-[0_8px_24px_rgba(0,0,0,0.08)] p-6">
              <p className="text-[11px] font-medium text-[#C9A870] tracking-[1.5px] uppercase mb-4">{t('home.availableMarch')}</p>
              <h3 className="text-[28px] font-semibold text-[#1A1A1A] leading-[1.15] mb-3">{newArrivalMain.name}</h3>
              <p className="text-[24px] font-bold text-[#2B2B2B] mb-5">${parseFloat(newArrivalMain.price || 0).toFixed(2)}</p>
              <p className="text-[14px] font-normal text-[#666666] leading-[1.6] mb-6">
                {t('home.productDesc')}
              </p>
              <div className="mb-6 space-y-3">
                {[t('home.benefit1'), t('home.benefit2'), t('home.benefit3')].map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <IoCheckmarkCircle className="w-4 h-4 text-[#C9A870] flex-shrink-0 mt-0.5" />
                    <span className="text-[13px] font-normal text-[#2B2B2B] leading-[1.5]">{benefit}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    if (user) {
                      window.location.href = `/product/${newArrivalMain.id}`
                    } else {
                      window.location.href = '/account'
                    }
                  }}
                  className="w-full h-12 bg-[#8B7355] text-white text-[14px] font-semibold rounded-[4px]"
                >
                  {t('home.preOrder')}
                </button>
                <button
                  onClick={() => {
                    setNotifyMessage(true)
                    setTimeout(() => setNotifyMessage(false), 4000)
                  }}
                  className="w-full h-12 border-[2px] border-[#8B7355] text-[#8B7355] text-[14px] font-semibold rounded-[4px]"
                >
                  {t('home.notifyMe')}
                </button>
                {notifyMessage && (
                  <p className="text-[13px] text-center text-[#8B7355] mt-2">
                    {t('home.notifyMsg')}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="px-5">
          <div className="space-y-3">
            {newArrivalSupporting.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`} className="flex items-center gap-3">
                <div className="relative w-[120px] h-[120px] flex-shrink-0 rounded-[8px] overflow-hidden">
                  <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                  <div className="absolute top-2 left-2 bg-[#D4AFA3] h-6 px-3 rounded-[12px] flex items-center justify-center">
                    <span className="text-[10px] font-semibold text-white uppercase">{t('home.new')}</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-[16px] font-medium text-[#2B2B2B] leading-[1.2] mb-1">{product.name}</h4>
                  <p className="text-[17px] font-semibold text-[#1A1A1A]">${parseFloat(product.price).toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <Link to="/collections" onClick={() => window.scrollTo(0, 0)}>
            <span className="text-[14px] font-medium text-[#8B7355] underline">{t('home.exploreCollection')}</span>
          </Link>
        </div>
      </section>

      {/* Brand Story */}
      <section className="w-full">
        <div className="bg-[#F7F3EB] px-8 py-10">
          <p className="text-[11px] font-light uppercase text-[#C9A870] tracking-[2px] mb-4">{t('home.philosophy')}</p>
          <h2 className="text-[36px] font-bold text-[#1A1A1A] leading-[1.2] mb-6">{t('home.scienceMeetsNature')}</h2>
          <p className="text-[15px] font-normal text-[#666666] leading-[1.7] mb-4">
            {t('home.brandStory1')}
          </p>
          <p className="text-[15px] font-normal text-[#666666] leading-[1.7] mb-4">
            {t('home.brandStory2')}
          </p>
          <p className="text-[15px] font-normal text-[#666666] leading-[1.7] mb-6">
            {t('home.brandStory3')}
          </p>
          <Link to="/advanced-formulations#our-story">
            <span className="text-[14px] font-medium text-[#8B7355]">{t('home.ourStory')}</span>
          </Link>
        </div>
        <div className="min-h-[320px]">
          <img src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=440&h=320&fit=crop" alt="Botanical laboratory" className="w-full h-full object-cover" />
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full bg-gradient-to-b from-[#FDFBF7] to-[#FAF6F0] py-12">
        <div className="text-center mb-10">
          <h2 className="text-[28px] font-semibold text-[#1A1A1A]">{t('home.testimonials')}</h2>
        </div>
        <div className="px-5 space-y-4">
          {testimonialsData.map((item, idx) => (
            <div key={idx} className="bg-white rounded-[12px] shadow-[0_6px_28px_rgba(0,0,0,0.07)] p-7">
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, i) => <IoStarSharp key={i} className="w-4 h-4 text-[#C9A870]" />)}
              </div>
              <p className="text-[14px] font-normal italic text-[#666666] leading-[1.6] mb-6">{t(item.quoteKey)}</p>
              <div className="flex items-center gap-3">
                <img src={item.img} alt={item.name} className="w-14 h-14 rounded-full object-cover" />
                <div>
                  <p className="text-[15px] font-medium text-[#1A1A1A]">{item.name}</p>
                  <p className="text-[13px] font-normal text-[#999999] mt-0.5">{item.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Instagram Gallery */}
      <section className="w-full bg-white py-10">
        <div className="text-center mb-8">
          <h2 className="text-[24px] font-normal text-[#1A1A1A]">@shanloray</h2>
        </div>
        <div className="px-5 mb-8">
          <div className="grid grid-cols-3 gap-[3px]">
            {instagramImages.map((img, idx) => (
              <div key={idx} className="relative aspect-square overflow-hidden cursor-pointer">
                <img src={img} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center px-5">
          <a href="https://instagram.com/shanloray" target="_blank" rel="noopener noreferrer">
            <button className="w-40 h-12 border-[2px] border-[#1A1A1A] text-[13px] font-medium text-[#1A1A1A]">
              {t('home.followInstagram')}
            </button>
          </a>
        </div>
      </section>

    </div>
  )
}

// ─── Desktop (+ Tablet responsive) ───────────────────────────────────────────
function HomeDesktop() {
  const { user } = useAuth()
  const { t } = useTranslation()
  const [bestSellers, setBestSellers] = useState([])
  const [newArrivalMain, setNewArrivalMain] = useState(null)
  const [newArrivalSupporting, setNewArrivalSupporting] = useState([])
  const [notifyMessage, setNotifyMessage] = useState(false)

  useEffect(() => {
    const fetchBestSellers = async () => {
      const { data } = await supabase
        .from('products')
        .select('id, name, brand, price, image_url')
        .in('id', ['sk-401', 'mk-401', 'sk-402', 'sk-403', 'sk-404'])

      if (data && data.length > 0) {
        const order = ['sk-401', 'mk-401', 'sk-402', 'sk-403', 'sk-404']
        const sorted = order.map(id => data.find(p => p.id === id)).filter(Boolean)
        setBestSellers(sorted)
      }
    }
    fetchBestSellers()
  }, [])

  useEffect(() => {
    const fetchNewArrivals = async () => {
      const { data } = await supabase
        .from('products')
        .select('id, name, brand, price, image_url')
        .in('id', ['sk-405', 'sk-406', 'mk-402', 'mk-403'])

      if (data && data.length > 0) {
        const main = data.find(p => p.id === 'sk-405')
        const supporting = ['sk-406', 'mk-402', 'mk-403']
          .map(id => data.find(p => p.id === id))
          .filter(Boolean)
        setNewArrivalMain(main)
        setNewArrivalSupporting(supporting)
      }
    }
    fetchNewArrivals()
  }, [])

  return (
    <div className="bg-white font-['Cormorant_Garamond']">

      {/* Hero */}
      <section className="w-full relative" style={{ height: '100vh', minHeight: '600px' }}>
        <img
          src="https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1440&h=1080&fit=crop"
          alt="Luxury skincare golden hour"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute left-6 md:left-[60px] lg:left-[120px] bottom-[80px] md:bottom-[120px] lg:bottom-[160px] w-[90%] max-w-[480px]">
          <div className="bg-white/85 backdrop-blur-sm rounded-[16px] shadow-[0_12px_48px_rgba(0,0,0,0.12)] p-7 md:p-10 lg:p-[48px]">
            <p className="text-[11px] md:text-[12px] lg:text-[13px] font-light italic text-[#C9A870] tracking-[4px] uppercase mb-4 md:mb-5 lg:mb-6">{t('home.heroCollection')}</p>
            <h1 className="text-[44px] md:text-[54px] lg:text-[68px] font-bold text-[#1A1A1A] leading-[1.05] mb-4 md:mb-5 lg:mb-6">{t('home.heroTitle')}</h1>
            <p className="text-[15px] md:text-[17px] lg:text-[19px] font-normal text-[#666666] leading-[1.8] mb-6 md:mb-7 lg:mb-8">
              {t('home.heroSubtitle')}
            </p>
            <Link to="/explore">
              <button className="border-[2px] border-[#1A1A1A] h-[48px] lg:h-[52px] w-[140px] lg:w-[160px] text-[14px] lg:text-[15px] font-semibold text-[#1A1A1A] tracking-[1.5px] hover:bg-[#1A1A1A] hover:text-white transition-all">
                {t('home.explore')}
              </button>
            </Link>
          </div>
        </div>
        <div className="absolute bottom-[40px] left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div className="w-[2px] h-[64px] bg-[#C9A870]" />
        </div>
      </section>

      {/* Floating Technology Cards */}
      <section className="w-full relative" style={{ marginTop: '-60px' }}>
        <div className="px-6 md:px-[60px] lg:px-[120px]">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            {/* AI Skin Card */}
            <div className="flex-1 bg-white rounded-[24px] shadow-[0_12px_48px_rgba(0,0,0,0.12)] p-8 md:p-10 lg:p-[64px]">
              <div className="w-[60px] h-[60px] lg:w-[72px] lg:h-[72px] rounded-full bg-[#688B8D] flex items-center justify-center mb-5 lg:mb-6">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 2v4m0 12v4M4.22 4.22l2.83 2.83m9.9 9.9l2.83 2.83M2 12h4m12 0h4M4.22 19.78l2.83-2.83m9.9-9.9l2.83-2.83" />
                </svg>
              </div>
              <h3 className="text-[26px] md:text-[30px] lg:text-[36px] font-semibold text-[#1A1A1A] mb-4 lg:mb-5">{t('home.aiTitle')}</h3>
              <p className="text-[15px] md:text-[16px] lg:text-[18px] font-normal text-[#666666] leading-[1.7] mb-5 lg:mb-6">
                {t('home.aiDesc')}
              </p>
              <Link to="/skin-analysis#upload-section">
                <span className="text-[14px] lg:text-[15px] font-medium text-[#8B7355] cursor-pointer hover:underline">{t('home.beginAnalysis')}</span>
              </Link>
            </div>

            {/* Virtual Try-On Card */}
            <div className="flex-1 bg-white rounded-[24px] shadow-[0_12px_48px_rgba(0,0,0,0.12)] p-8 md:p-10 lg:p-[64px]">
              <div className="w-[60px] h-[60px] lg:w-[72px] lg:h-[72px] rounded-full bg-[#D4AFA3] flex items-center justify-center mb-5 lg:mb-6">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <path d="M8 21h8" />
                  <path d="M12 17v4" />
                </svg>
              </div>
              <h3 className="text-[26px] md:text-[30px] lg:text-[36px] font-semibold text-[#1A1A1A] mb-4 lg:mb-5">{t('home.virtualTitle')}</h3>
              <p className="text-[15px] md:text-[16px] lg:text-[18px] font-normal text-[#666666] leading-[1.7] mb-5 lg:mb-6">
                {t('home.virtualDesc')}
              </p>
              <Link to="/virtual-tryon#tryon-section">
                <span className="text-[14px] lg:text-[15px] font-medium text-[#8B7355] cursor-pointer hover:underline">{t('home.tryNow')}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Collections */}
      <section className="w-full px-6 md:px-[60px] lg:px-[120px] py-16 md:py-20 lg:py-[96px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5">
          <Link to="/skincare" className="md:col-span-1 lg:col-span-3 relative min-h-[400px] md:min-h-[560px] lg:min-h-[820px] rounded-[12px] overflow-hidden cursor-pointer group block">
            <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=720&h=820&fit=crop" alt="Botanical Serums Collection" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-8 md:bottom-10 lg:bottom-[48px] left-8 md:left-10 lg:left-[48px]">
              <h3 className="text-[32px] md:text-[38px] lg:text-[44px] font-semibold text-white">{t('home.botanicalSerums')}</h3>
            </div>
          </Link>
          <div className="md:col-span-1 lg:col-span-3 flex flex-col gap-5">
            <Link to="/makeup" className="min-h-[260px] md:min-h-[320px] lg:min-h-[400px] rounded-[12px] overflow-hidden cursor-pointer group block">
              <img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=640&h=400&fit=crop" alt="Artisan Tools" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </Link>
            <div className="bg-[#EBE6DC] rounded-[12px] p-8 md:p-10 lg:p-[56px] min-h-[240px] md:min-h-[300px] lg:min-h-[380px] flex flex-col justify-center">
              <h4 className="text-[22px] md:text-[24px] lg:text-[28px] font-semibold text-[#2B2B2B] mb-4 lg:mb-5">{t('home.artisanTools')}</h4>
              <p className="text-[14px] md:text-[15px] lg:text-[17px] font-normal text-[#666666] leading-[1.75] mb-5 lg:mb-6">
                {t('home.artisanDesc')}
              </p>
              <Link to="/technology#how-it-works">
                <span className="text-[14px] lg:text-[15px] font-medium text-[#8B7355] cursor-pointer hover:underline">{t('home.discoverTools')}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="w-full bg-white py-16 md:py-20 lg:py-[96px] relative">
        <div className="text-center mb-16 md:mb-20 lg:mb-[88px]">
          <h2 className="text-[36px] md:text-[42px] lg:text-[48px] font-bold text-[#1A1A1A] mb-6">{t('home.bestSellers')}</h2>
          <div className="w-[88px] h-[3px] bg-[#C9A870] mx-auto" />
        </div>
        <div className="px-6 md:px-[60px] lg:px-[120px] relative">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {bestSellers.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`} className="cursor-pointer group">
                <div className="w-full aspect-square bg-white rounded-[8px] overflow-hidden mb-5">
                  <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <p className="text-[12px] md:text-[13px] lg:text-[14px] font-light italic text-[#8B7355] tracking-[1.2px] mb-2 md:mb-3">{product.brand}</p>
                <h4 className="text-[16px] md:text-[18px] lg:text-[20px] font-medium text-[#2B2B2B] leading-[1.2] mb-2 md:mb-3">{product.name}</h4>
                <p className="text-[16px] md:text-[18px] lg:text-[19px] font-semibold text-[#1A1A1A]">${parseFloat(product.price).toFixed(2)}</p>
              </Link>
            ))}
          </div>
        </div>
        <div className="text-center mt-16 md:mt-18 lg:mt-[72px]">
          <Link to="/collections#browse-by-category">
            <span className="text-[15px] lg:text-[16px] font-normal text-[#8B7355] cursor-pointer underline hover:text-[#6b5740] transition-colors">{t('home.viewAllProducts')}</span>
          </Link>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="w-full bg-gradient-to-b from-[#FDFBF7] to-[#F9F4EE] py-16 md:py-20 lg:py-[96px]">
        <div className="text-center mb-16 md:mb-20 lg:mb-[88px]">
          <h2 className="text-[36px] md:text-[42px] lg:text-[48px] font-bold text-[#1A1A1A] mb-4">{t('home.newArrivals')}</h2>
          <p className="text-[13px] md:text-[14px] lg:text-[16px] font-light italic text-[#C9A870] tracking-[2px] uppercase mb-6">{t('home.limitedEdition')}</p>
          <div className="w-[88px] h-[3px] bg-[#C9A870] mx-auto" />
        </div>
        {newArrivalMain && (
          <div className="px-6 md:px-[60px] lg:px-[120px] mb-12 md:mb-16 lg:mb-[80px]">
            <div className="flex flex-col md:flex-row items-start gap-8 md:gap-10 lg:gap-[48px]">
              <div className="relative w-full md:w-[340px] lg:w-[520px] flex-shrink-0 md:h-[400px] lg:h-[560px]">
                <img src={newArrivalMain.image_url} alt={newArrivalMain.name} className="w-full h-full object-cover rounded-[12px] shadow-[0_6px_28px_rgba(0,0,0,0.08)]" />
                <div className="absolute top-[20px] right-[20px] bg-[#688B8D] h-[40px] px-5 rounded-[20px] flex items-center justify-center">
                  <span className="text-[13px] font-semibold text-white uppercase tracking-[1.5px]">{t('home.new')}</span>
                </div>
              </div>
              <div className="flex-1 bg-white rounded-[24px] shadow-[0_12px_48px_rgba(0,0,0,0.10)] p-8 md:p-10 lg:p-[56px]">
                <p className="text-[12px] md:text-[13px] font-medium text-[#C9A870] tracking-[1.5px] uppercase mb-5 lg:mb-6">{t('home.availableMarch')}</p>
                <h3 className="text-[30px] md:text-[36px] lg:text-[42px] font-semibold text-[#1A1A1A] leading-[1.15] mb-4">{newArrivalMain.name}</h3>
                <p className="text-[22px] md:text-[24px] lg:text-[28px] font-bold text-[#2B2B2B] mb-5 lg:mb-6">${parseFloat(newArrivalMain.price || 0).toFixed(2)}</p>
                <p className="text-[14px] md:text-[15px] lg:text-[17px] font-normal text-[#666666] leading-[1.75] mb-7 lg:mb-8">
                  {t('home.productDesc')}
                </p>
                <div className="mb-8 lg:mb-10 space-y-3 lg:space-y-4">
                  {[t('home.benefit1'), t('home.benefit2'), t('home.benefit3')].map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <IoCheckmarkCircle className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#C9A870] flex-shrink-0 mt-1" />
                      <span className="text-[14px] md:text-[15px] lg:text-[16px] font-normal text-[#2B2B2B] leading-[1.6]">{benefit}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  <button
                    onClick={() => {
                      if (user) {
                        window.location.href = `/product/${newArrivalMain.id}`
                      } else {
                        window.location.href = '/account'
                      }
                    }}
                    className="w-full h-[52px] lg:h-[56px] bg-[#8B7355] text-white text-[14px] lg:text-[15px] font-semibold rounded-[4px] tracking-[1px] hover:bg-[#7a6448] transition-colors"
                  >
                    {t('home.preOrder')}
                  </button>
                  <button
                    onClick={() => {
                      setNotifyMessage(true)
                      setTimeout(() => setNotifyMessage(false), 4000)
                    }}
                    className="w-full h-[52px] lg:h-[56px] border-[2px] border-[#8B7355] bg-transparent text-[#8B7355] text-[14px] lg:text-[15px] font-semibold rounded-[4px] tracking-[1px] hover:bg-[#8B7355] hover:text-white transition-all"
                  >
                    {t('home.notifyMe')}
                  </button>
                  {notifyMessage && (
                    <p className="text-[13px] text-center text-[#8B7355] mt-2">
                      {t('home.notifyMsg')}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="px-6 md:px-[60px] lg:px-[120px] mb-12 lg:mb-[64px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-[32px]">
            {newArrivalSupporting.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`} className="cursor-pointer group">
                <div className="relative w-full aspect-square rounded-[8px] overflow-hidden mb-5">
                  <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-[16px] left-[16px] bg-[#D4AFA3] h-[32px] px-4 rounded-[16px] flex items-center justify-center">
                    <span className="text-[12px] font-semibold text-white uppercase tracking-[1px]">{t('home.new')}</span>
                  </div>
                </div>
                <h4 className="text-[18px] md:text-[19px] lg:text-[20px] font-medium text-[#2B2B2B] leading-[1.2] mb-3">{product.name}</h4>
                <p className="text-[17px] md:text-[18px] lg:text-[19px] font-semibold text-[#1A1A1A]">${parseFloat(product.price).toFixed(2)}</p>
              </Link>
            ))}
          </div>
        </div>
        <div className="text-center">
          <Link to="/collections" onClick={() => window.scrollTo(0, 0)}>
            <span className="text-[15px] lg:text-[16px] font-medium text-[#8B7355] cursor-pointer underline hover:text-[#6b5740] transition-colors">{t('home.exploreCollection')}</span>
          </Link>
        </div>
      </section>

      {/* Brand Story */}
      <section className="w-full min-h-[500px] md:min-h-[600px] lg:min-h-[720px] relative overflow-hidden">
        <div className="flex flex-col md:flex-row min-h-[500px] md:min-h-[600px] lg:min-h-[720px]">
          <div className="bg-[#F7F3EB] flex flex-col justify-center px-8 md:px-[60px] lg:px-[160px] py-14 md:py-0 w-full md:w-[58%]">
            <p className="text-[12px] md:text-[13px] font-light uppercase text-[#C9A870] tracking-[3px] mb-5 lg:mb-6">{t('home.philosophy')}</p>
            <h2 className="text-[36px] md:text-[44px] lg:text-[52px] font-bold text-[#1A1A1A] leading-[1.15] mb-6 lg:mb-8">{t('home.scienceMeetsNature')}</h2>
            <p className="text-[15px] md:text-[16px] lg:text-[18px] font-normal text-[#666666] leading-[1.85] mb-5 lg:mb-6">
              {t('home.brandStory1')}
            </p>
            <p className="text-[15px] md:text-[16px] lg:text-[18px] font-normal text-[#666666] leading-[1.85] mb-8 lg:mb-10">
              {t('home.brandStory2')}
            </p>
            <Link to="/advanced-formulations#our-story">
              <span className="text-[15px] lg:text-[16px] font-medium text-[#8B7355] cursor-pointer hover:underline">{t('home.ourStory')}</span>
            </Link>
          </div>
          <div className="w-full md:w-[42%] min-h-[300px] md:min-h-0">
            <img src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=720&h=720&fit=crop" alt="Botanical laboratory" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full bg-gradient-to-b from-[#FDFBF7] to-[#FAF6F0] py-16 md:py-20 lg:py-[96px]">
        <div className="text-center mb-14 md:mb-16 lg:mb-[80px]">
          <h2 className="text-[32px] md:text-[38px] lg:text-[42px] font-semibold text-[#1A1A1A]">{t('home.testimonials')}</h2>
        </div>
        <div className="px-6 md:px-[60px] lg:px-[120px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-[56px] items-start">
            {testimonialsData.map((item, idx) => (
              <div key={idx} className="bg-white rounded-[12px] shadow-[0_6px_28px_rgba(0,0,0,0.07)] p-8 md:p-10 lg:p-[52px]" style={{ marginTop: idx === 1 ? '-40px' : '0px' }}>
                <div className="flex gap-[4px] mb-6">
                  {[...Array(5)].map((_, i) => <IoStarSharp key={i} className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#C9A870]" />)}
                </div>
                <p className="text-[14px] md:text-[15px] lg:text-[17px] font-normal italic text-[#666666] leading-[1.75] mb-7 lg:mb-8">{t(item.quoteKey)}</p>
                <div className="flex items-center gap-4">
                  <img src={item.img} alt={item.name} className="w-[56px] h-[56px] lg:w-[72px] lg:h-[72px] rounded-full object-cover" />
                  <div>
                    <p className="text-[15px] lg:text-[17px] font-medium text-[#1A1A1A]">{item.name}</p>
                    <p className="text-[13px] lg:text-[15px] font-normal text-[#999999] mt-1">{item.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Gallery */}
      <section className="w-full bg-white py-16 md:py-20 lg:py-[80px]">
        <div className="text-center mb-12 md:mb-14 lg:mb-[64px]">
          <h2 className="text-[28px] md:text-[32px] lg:text-[36px] font-normal text-[#1A1A1A]">@shanloray</h2>
        </div>
        <div className="px-6 md:px-[60px] lg:px-[120px] mb-12 lg:mb-[64px]">
          <div className="grid grid-cols-3 md:grid-cols-4 gap-[4px]">
            <div className="col-span-1 md:col-span-2 row-span-2 relative overflow-hidden cursor-pointer aspect-square md:aspect-auto md:min-h-[300px]">
              <img src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&h=600&fit=crop" alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="row-span-2 relative overflow-hidden cursor-pointer min-h-[150px] md:min-h-[300px]">
              <img src="https://images.unsplash.com/photo-1596704017254-9b121068ec31?w=300&h=600&fit=crop" alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="relative overflow-hidden cursor-pointer aspect-square">
              <img src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=240&h=240&fit=crop" alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="relative overflow-hidden cursor-pointer aspect-square">
              <img src="https://images.unsplash.com/photo-1571875257727-256c39da42af?w=240&h=240&fit=crop" alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="row-span-2 relative overflow-hidden cursor-pointer min-h-[150px] md:min-h-[300px]">
              <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&h=600&fit=crop" alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="row-span-2 relative overflow-hidden cursor-pointer min-h-[150px] md:min-h-[300px]">
              <img src="https://images.unsplash.com/photo-1598439210625-5067c578f3f6?w=300&h=600&fit=crop" alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="col-span-1 md:col-span-2 row-span-2 relative overflow-hidden cursor-pointer aspect-square md:aspect-auto md:min-h-[300px]">
              <img src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&h=600&fit=crop" alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
          </div>
        </div>
        <div className="text-center">
          <a href="https://instagram.com/shanloray" target="_blank" rel="noopener noreferrer">
            <button className="border-[2px] border-[#1A1A1A] h-[48px] lg:h-[52px] w-[200px] lg:w-[220px] text-[14px] lg:text-[15px] font-medium text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-all">
              {t('home.followInstagram')}
            </button>
          </a>
        </div>
      </section>

    </div>
  )
}

// ─── Main Export (Switcher) ───────────────────────────────────────────────────
export default function Home() {
  const { i18n } = useTranslation()
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return isMobile ? <HomeMobile key={i18n.language} /> : <HomeDesktop key={i18n.language} />
}