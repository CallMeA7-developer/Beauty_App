import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, Link } from 'react-router-dom'
import {
  IoCheckmarkCircle,
  IoStarSharp,
  IoTrendingUp,
  IoCalendarOutline,
  IoFlame,
  IoWaterOutline,
  IoSparklesOutline,
  IoTrophyOutline,
  IoHeartOutline,
} from 'react-icons/io5'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'
import { supabase } from '../lib/supabase'
import LoadingSpinner from '../components/LoadingSpinner'

export default function BeautyJourney() {
  const { t, i18n } = useTranslation()
  const { user } = useAuth()
  const { addToCart } = useCart()
  const navigate = useNavigate()

  const [skinAnalysis, setSkinAnalysis] = useState(null)
  const [morningProducts, setMorningProducts] = useState([])
  const [eveningProducts, setEveningProducts] = useState([])
  const [targetedProducts, setTargetedProducts] = useState([])
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'
  const userAvatar = user?.user_metadata?.avatar_url
  const userInitials = userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

  useEffect(() => {
    if (user) fetchData()
  }, [user])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [profileRes, analysisRes] = await Promise.all([
        supabase.from('profiles').select('*').eq('user_id', user.id).maybeSingle(),
        supabase.from('skin_analysis').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(1).maybeSingle()
      ])

      if (profileRes.data) setProfile(profileRes.data)

      if (analysisRes.data) {
        setSkinAnalysis(analysisRes.data)

        if (analysisRes.data.morning_product_ids?.length > 0) {
          const { data } = await supabase.from('products').select('*').in('id', analysisRes.data.morning_product_ids)
          if (data) setMorningProducts(data)
        }

        if (analysisRes.data.evening_product_ids?.length > 0) {
          const { data } = await supabase.from('products').select('*').in('id', analysisRes.data.evening_product_ids)
          if (data) setEveningProducts(data)
        }

        if (analysisRes.data.targeted_product_ids?.length > 0) {
          const { data } = await supabase.from('products').select('*').in('id', analysisRes.data.targeted_product_ids)
          if (data) setTargetedProducts(data)
        }
      }
    } catch (err) {
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <LoadingSpinner />

  if (!user) {
    return (
      <div className="min-h-screen bg-white font-['Cormorant_Garamond'] flex items-center justify-center px-4">
        <div className="text-center max-w-[500px]">
          <IoSparklesOutline className="w-[64px] h-[64px] text-[#C9A870] mx-auto mb-6" />
          <h2 className="text-[32px] lg:text-[40px] font-bold text-[#1A1A1A] mb-4">{t('beautyJourney.signInRequired')}</h2>
          <p className="text-[16px] text-[#666666] mb-8">{t('beautyJourney.signInDesc')}</p>
          <button onClick={() => navigate('/')} className="px-8 h-[52px] bg-[#8B7355] text-white text-[15px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">{t('beautyJourney.goToHome')}</button>
        </div>
      </div>
    )
  }

  if (!skinAnalysis) {
    return (
      <div className="min-h-screen bg-white font-['Cormorant_Garamond'] flex items-center justify-center px-4">
        <div className="text-center max-w-[500px]">
          <IoSparklesOutline className="w-[64px] h-[64px] text-[#C9A870] mx-auto mb-6" />
          <h2 className="text-[32px] lg:text-[40px] font-bold text-[#1A1A1A] mb-4">{t('beautyJourney.noAnalysis')}</h2>
          <p className="text-[16px] text-[#666666] mb-8">{t('beautyJourney.noAnalysisDesc')}</p>
          <button onClick={() => navigate('/skin-analysis')} className="px-8 h-[52px] bg-[#8B7355] text-white text-[15px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">{t('beautyJourney.startSkinAnalysis')}</button>
        </div>
      </div>
    )
  }

  const totalProducts = morningProducts.length + eveningProducts.length + targetedProducts.length

  const quickStats = [
    { label: t('beautyJourney.skinHealthScore'), value: `${skinAnalysis.skin_score}/100`, icon: IoSparklesOutline },
    { label: t('beautyJourney.recommendedProducts'), value: totalProducts.toString(), icon: IoHeartOutline },
    { label: t('beautyJourney.morningRoutineStat'), value: morningProducts.length.toString(), icon: IoWaterOutline },
    { label: t('beautyJourney.eveningRoutineStat'), value: eveningProducts.length.toString(), icon: IoTrophyOutline },
  ]

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const Stars = () => [...Array(5)].map((_, i) => <IoStarSharp key={i} className="w-[14px] h-[14px] text-[#C9A870]" />)

  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-[12px] border border-[#E8E3D9] overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all">
      <img src={product.img_url || product.image_url} alt={product.name} className="w-full h-[200px] lg:h-[240px] object-cover" />
      <div className="p-4 lg:p-5">
        <p className="text-[11px] lg:text-[12px] font-light italic text-[#8B7355] mb-1">{product.brand || 'Shan Loray'}</p>
        <h4 className="text-[15px] lg:text-[17px] font-medium text-[#1A1A1A] mb-2 leading-tight">{product.name}</h4>
        <p className="text-[13px] text-[#666666] mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center gap-1 mb-3">
          <Stars />
          <span className="text-[11px] font-normal text-[#999999] ml-1">({product.review_count || 0})</span>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-[17px] lg:text-[19px] font-semibold text-[#1A1A1A]">${parseFloat(product.price).toFixed(2)}</p>
          <button
            onClick={() => addToCart(
              product.id,
              product.name,
              product.img_url || product.image_url,
              product.brand || 'Shan Loray',
              product.size || '',
              product.price,
              1
            )}
            className="px-4 lg:px-5 h-[38px] lg:h-[42px] bg-[#8B7355] text-white text-[13px] lg:text-[14px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors"
          >
            {t('beautyJourney.addToCart')}
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div key={i18n.language} className="bg-white font-['Cormorant_Garamond']">

      {/* ── Hero Welcome ── */}
      <div className="min-h-[300px] md:min-h-[360px] lg:min-h-[420px] bg-gradient-to-b from-[#FDFBF7] to-[#F5F1EA] flex flex-col md:flex-row items-center px-4 md:px-[60px] lg:px-[120px] py-8 md:py-0 gap-8 md:gap-0">
        <div className="w-full md:w-[500px] lg:w-[600px]">
          <p className="text-[11px] md:text-[12px] lg:text-[14px] font-light italic text-[#8B7355] tracking-[2px] mb-3">{t('beautyJourney.tagline')}</p>
          <h1 className="text-[36px] md:text-[48px] lg:text-[64px] font-bold text-[#1A1A1A] leading-[1.1] mb-4">{t('beautyJourney.welcome')} {userName}</h1>
          <p className="text-[14px] md:text-[16px] lg:text-[18px] font-normal text-[#666666] mb-6">{t('beautyJourney.subtitle')}</p>
          <div className="w-[80px] md:w-[100px] lg:w-[120px] h-[4px] bg-[#C9A870]" />
        </div>
        <div className="flex-1 flex justify-center md:justify-end">
          <div className="relative">
            {userAvatar ? (
              <div className="w-[200px] h-[200px] md:w-[260px] md:h-[260px] lg:w-[320px] lg:h-[320px] rounded-full overflow-hidden border-4 border-[#C9A870]">
                <img src={userAvatar} alt="Profile" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-[200px] h-[200px] md:w-[260px] md:h-[260px] lg:w-[320px] lg:h-[320px] rounded-full bg-gradient-to-br from-[#8B7355] to-[#C9A870] border-4 border-[#C9A870] flex items-center justify-center">
                <span className="text-[64px] md:text-[80px] lg:text-[100px] font-bold text-white">{userInitials}</span>
              </div>
            )}
            <div className="absolute -right-3 lg:-right-4 top-1/2 -translate-y-1/2">
              <div className="w-[60px] h-[60px] md:w-[70px] md:h-[70px] lg:w-[80px] lg:h-[80px] bg-white rounded-full flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.12)]">
                <div className="text-center">
                  <div className="text-[18px] md:text-[20px] lg:text-[24px] font-bold text-[#8B7355]">{skinAnalysis.skin_score}</div>
                  <div className="text-[9px] md:text-[10px] lg:text-[11px] font-normal text-[#666666]">{t('beautyJourney.score')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Quick Stats ── */}
      <div className="bg-white px-4 md:px-[60px] lg:px-[120px] py-8 md:py-10 lg:py-[48px]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 lg:gap-[32px]">
          {quickStats.map((stat) => (
            <div key={stat.label} className="bg-gradient-to-b from-[#FDFBF7] to-white rounded-[12px] border border-[#E8E3D9] p-5 md:p-6 lg:p-[32px] flex flex-col items-center">
              <stat.icon className="w-[24px] h-[24px] md:w-[28px] md:h-[28px] lg:w-[32px] lg:h-[32px] text-[#C9A870] mb-3" />
              <div className="text-[22px] md:text-[26px] lg:text-[32px] font-semibold text-[#1A1A1A] mb-2">{stat.value}</div>
              <div className="text-[12px] md:text-[13px] lg:text-[14px] font-normal text-[#666666] text-center">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Beauty Profile ── */}
      <div className="bg-[#FDFBF7] px-4 md:px-[60px] lg:px-[120px] py-10 md:py-12 lg:py-[64px]">
        <h2 className="text-[26px] md:text-[32px] lg:text-[40px] font-medium text-[#1A1A1A] text-center mb-8 lg:mb-[48px]">{t('beautyJourney.beautyProfile')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-4 lg:gap-[24px]">
          {/* Skin Type */}
          <div className="bg-white rounded-[12px] border border-[#E8E3D9] shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-5 lg:p-[28px]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[16px] lg:text-[20px] font-medium text-[#1A1A1A]">{t('beautyJourney.skinType')}</h3>
              <span className="px-3 py-1 bg-[#F5F1EA] text-[#8B7355] text-[10px] lg:text-[11px] font-medium rounded-full">{t('beautyJourney.confirmed')}</span>
            </div>
            <div className="text-[15px] lg:text-[18px] font-semibold text-[#8B7355] mb-2">{skinAnalysis.selected_skin_type || t('beautyJourney.notSpecified')}</div>
            <p className="text-[13px] lg:text-[14px] font-normal text-[#666666] mb-3">{skinAnalysis.summary}</p>
            <p className="text-[12px] lg:text-[13px] font-light italic text-[#999999]">{t('beautyJourney.lastUpdated')} {formatDate(skinAnalysis.created_at)}</p>
          </div>

          {/* Skin Concerns */}
          <div className="bg-white rounded-[12px] border border-[#E8E3D9] shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-5 lg:p-[28px]">
            <h3 className="text-[16px] lg:text-[20px] font-medium text-[#1A1A1A] mb-4">{t('beautyJourney.skinConcerns')}</h3>
            <div className="mb-4">
              <p className="text-[13px] lg:text-[14px] font-medium text-[#666666] mb-2">{t('beautyJourney.primary')}</p>
              <div className="flex flex-wrap gap-2">
                {skinAnalysis.selected_concern && (
                  <span className="px-3 py-1 bg-[#8B7355] text-white text-[12px] lg:text-[13px] rounded-full">{skinAnalysis.selected_concern}</span>
                )}
              </div>
            </div>
            {skinAnalysis.selected_specific_concerns && skinAnalysis.selected_specific_concerns.length > 0 && (
              <div>
                <p className="text-[13px] lg:text-[14px] font-medium text-[#666666] mb-2">{t('beautyJourney.specificConcerns')}</p>
                <div className="flex flex-wrap gap-2">
                  {skinAnalysis.selected_specific_concerns.map((concern) => (
                    <span key={concern} className="px-3 py-1 bg-[#F5F1EA] text-[#8B7355] text-[12px] lg:text-[13px] rounded-full">{concern}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Analysis Cards */}
          <div className="bg-white rounded-[12px] border border-[#E8E3D9] shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-5 lg:p-[28px]">
            <h3 className="text-[16px] lg:text-[20px] font-medium text-[#1A1A1A] mb-4">{t('beautyJourney.analysisInsights')}</h3>
            <div className="space-y-3">
              {skinAnalysis.analysis_cards && skinAnalysis.analysis_cards.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {skinAnalysis.analysis_cards.map((card, index) => (
                    <span key={index} className="px-3 py-1 bg-[#F5F1EA] text-[#8B7355] text-[11px] lg:text-[12px] rounded-full">{card.title}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Morning Routine ── */}
      {morningProducts.length > 0 && (
        <div className="bg-white px-4 md:px-[60px] lg:px-[120px] py-10 md:py-12 lg:py-[64px]">
          <h2 className="text-[26px] md:text-[36px] lg:text-[48px] font-medium text-[#1A1A1A] mb-3">{t('beautyJourney.morningRoutine')}</h2>
          <p className="text-[14px] lg:text-[16px] text-[#666666] mb-8 lg:mb-[48px]">{t('beautyJourney.morningRoutineDesc')}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {morningProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}

      {/* ── Evening Routine ── */}
      {eveningProducts.length > 0 && (
        <div className="bg-[#F5F1EA] px-4 md:px-[60px] lg:px-[120px] py-10 md:py-12 lg:py-[64px]">
          <h2 className="text-[26px] md:text-[36px] lg:text-[48px] font-medium text-[#1A1A1A] mb-3">{t('beautyJourney.eveningRoutine')}</h2>
          <p className="text-[14px] lg:text-[16px] text-[#666666] mb-8 lg:mb-[48px]">{t('beautyJourney.eveningRoutineDesc')}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {eveningProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}

      {/* ── Targeted Recommendations ── */}
      {targetedProducts.length > 0 && (
        <div className="bg-white px-4 md:px-[60px] lg:px-[120px] py-10 md:py-12 lg:py-[64px]">
          <h2 className="text-[26px] md:text-[36px] lg:text-[48px] font-medium text-[#1A1A1A] mb-3">{t('beautyJourney.targetedTreatments')}</h2>
          <p className="text-[14px] lg:text-[16px] text-[#666666] mb-8 lg:mb-[48px]">{t('beautyJourney.targetedDesc')}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {targetedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}


      {/* ── Progress Tracking ── */}
      <div className="bg-white px-4 md:px-[60px] lg:px-[120px] py-10 md:py-12 lg:py-[64px]">
        <h2 className="text-[26px] md:text-[32px] lg:text-[40px] font-medium text-[#1A1A1A] mb-8 lg:mb-[48px]">{t('beautyJourney.currentAnalysis')}</h2>
        <div className="bg-gradient-to-b from-[#FDFBF7] to-white rounded-[16px] border border-[#E8E3D9] p-5 md:p-8 lg:p-[40px]">
          <div className="flex flex-col items-center mb-8">
            <div className="w-[140px] h-[140px] md:w-[180px] md:h-[180px] lg:w-[220px] lg:h-[220px] rounded-full border-4 border-[#C9A870] flex items-center justify-center mb-4">
              <div className="text-center">
                <div className="text-[40px] md:text-[52px] lg:text-[64px] font-bold text-[#8B7355]">{skinAnalysis.skin_score}</div>
                <div className="text-[12px] md:text-[14px] lg:text-[16px] font-normal text-[#666666]">/ 100</div>
              </div>
            </div>
            <div className="text-[20px] md:text-[24px] lg:text-[28px] font-semibold text-[#1A1A1A] mb-2">{skinAnalysis.skin_label}</div>
            <div className="text-[13px] lg:text-[15px] font-normal text-[#666666]">{t('beautyJourney.analyzedOn')} {formatDate(skinAnalysis.created_at)}</div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 mb-6">
            <div className="text-center">
              <div className="text-[24px] lg:text-[28px] font-bold text-[#8B7355] mb-1">{skinAnalysis.metrics?.hydration || 0}%</div>
              <div className="text-[12px] lg:text-[13px] font-normal text-[#666666]">{t('beautyJourney.hydration')}</div>
            </div>
            <div className="text-center">
              <div className="text-[24px] lg:text-[28px] font-bold text-[#8B7355] mb-1">{skinAnalysis.metrics?.texture || 0}%</div>
              <div className="text-[12px] lg:text-[13px] font-normal text-[#666666]">{t('beautyJourney.texture')}</div>
            </div>
            <div className="text-center">
              <div className="text-[24px] lg:text-[28px] font-bold text-[#8B7355] mb-1">{skinAnalysis.metrics?.clarity || 0}%</div>
              <div className="text-[12px] lg:text-[13px] font-normal text-[#666666]">{t('beautyJourney.clarity')}</div>
            </div>
            <div className="text-center">
              <div className="text-[24px] lg:text-[28px] font-bold text-[#8B7355] mb-1">{skinAnalysis.metrics?.toneEvenness || 0}%</div>
              <div className="text-[12px] lg:text-[13px] font-normal text-[#666666]">{t('beautyJourney.toneEvenness')}</div>
            </div>
          </div>
          <div className="flex justify-center">
            <button onClick={() => navigate('/skin-analysis')} className="w-full sm:w-[200px] lg:w-[240px] h-[48px] lg:h-[56px] bg-[#8B7355] text-white text-[14px] lg:text-[15px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">
              {t('beautyJourney.retakeAnalysis')}
            </button>
          </div>
        </div>
      </div>


    </div>
  )
}