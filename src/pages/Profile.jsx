import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  IoPersonOutline,
  IoHeartOutline,
  IoBagOutline,
  IoSparkles,
  IoBagCheckOutline,
  IoCameraOutline,
  IoChevronForward,
  IoDocumentTextOutline,
  IoRibbonOutline,
  IoCalendarOutline,
  IoLogOutOutline,
  IoSettingsOutline,
  IoNotificationsOutline,
  IoLocationOutline,
  IoCardOutline,
  IoStarSharp,
  IoArrowUp,
  IoMenuOutline,
  IoClose,
} from 'react-icons/io5'
import { useAuth } from '../contexts/AuthContext'
import { useWishlist } from '../contexts/WishlistContext'
import { supabase } from '../lib/supabase'
import LoadingSpinner from '../components/LoadingSpinner'
import { useTranslation } from 'react-i18next'

export default function Profile() {
  const { t, i18n } = useTranslation()
  const { user, signOut } = useAuth()
  const { wishlistItems } = useWishlist()
  const navigate = useNavigate()

  const [recentOrders, setRecentOrders] = useState([])
  const [loyaltyPoints, setLoyaltyPoints] = useState(0)
  const [skinAnalysis, setSkinAnalysis] = useState(null)
  const [skinAnalysisCompleted, setSkinAnalysisCompleted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [showDrawer, setShowDrawer] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (user) {
      fetchUserData()
    }
  }, [user])

  async function fetchUserData() {
    // Orders
    try {
      const { data: orders } = await supabase
        .from('orders').select('*').eq('user_id', user.id)
        .order('created_at', { ascending: false }).limit(3)
      setRecentOrders(orders || [])
      const { data: allOrders } = await supabase
        .from('orders').select('total').eq('user_id', user.id)
      const totalPoints = allOrders?.reduce((sum, o) => sum + (parseFloat(o.total) || 0), 0) || 0
      setLoyaltyPoints(Math.floor(totalPoints))
    } catch (e) { console.error('Orders error:', e) }

    // Skin analysis — runs independently so orders errors cannot block it
    try {
      const { data: skinData } = await supabase
        .from('skin_analysis').select('*').eq('user_id', user.id)
        .order('created_at', { ascending: false }).limit(1).maybeSingle()
      console.log('skinData:', skinData)
      setSkinAnalysis(skinData)
      setSkinAnalysisCompleted(!!skinData)
    } catch (e) { console.error('Skin error:', e) }

    setLoading(false)
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered': return 'bg-[#C9E4C5] text-[#2D5F2E]'
      case 'shipped': return 'bg-[#D4E9F7] text-[#1E5A8E]'
      case 'processing': return 'bg-[#FFF4D6] text-[#8B6914]'
      case 'pending': return 'bg-[#F5F1EA] text-[#8B7355]'
      default: return 'bg-[#F5F1EA] text-[#8B7355]'
    }
  }

  const getStatusLabel = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered': return t('profile.orders.statusDelivered')
      case 'shipped': return t('profile.orders.statusShipped')
      case 'processing': return t('profile.orders.statusProcessing')
      case 'pending': return t('profile.orders.statusPending')
      default: return t('profile.orders.statusProcessing')
    }
  }

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || t('profile.user')
  const userEmail = user?.email || ''
  const userAvatar = user?.user_metadata?.avatar_url
  const userInitials = userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

  const wishlistCount = wishlistItems?.length || 0
  const pointsToNextTier = Math.max(0, 3000 - loyaltyPoints)
  const progressPercent = Math.min(100, (loyaltyPoints / 3000) * 100)

  const quickActions = [
    { icon: IoBagCheckOutline, label: t('profile.quickAccess.orders'), path: '/order-tracking' },
    { icon: IoHeartOutline, label: t('profile.quickAccess.wishlist'), path: '/wishlist' },
    { icon: IoCameraOutline, label: t('profile.quickAccess.beautyProfile'), path: '/skin-analysis' },
    { icon: IoCalendarOutline, label: t('profile.quickAccess.routines'), path: '/beauty-journey' },
  ]

  const menuSections = [
    {
      title: t('profile.menu.myAccount'),
      items: [
        { icon: IoPersonOutline, label: t('profile.menu.accountDashboard'), path: '/dashboard', badge: null },
        { icon: IoDocumentTextOutline, label: t('profile.menu.orderHistory'), path: '/order-tracking', badge: null },
        {
          icon: IoHeartOutline,
          label: t('profile.menu.myWishlist'),
          path: '/wishlist',
          badge: wishlistCount > 0 ? t('profile.menu.itemsBadge', { count: wishlistCount }) : null
        },
        { icon: IoLocationOutline, label: t('profile.menu.shippingAddresses'), path: '/shipping-address', badge: null },
        { icon: IoCardOutline, label: t('profile.menu.paymentMethods'), path: '/payment-methods', badge: null },
      ],
    },
    {
      title: t('profile.menu.beauty'),
      items: [
        { icon: IoSparkles, label: t('profile.menu.beautyProfile'), path: '/skin-analysis', badge: null, badgeColor: '' },
        {
          icon: IoRibbonOutline,
          label: t('profile.menu.loyaltyProgram'),
          path: '/account#loyalty',
          badge: t('profile.menu.pointsBadge', { count: loyaltyPoints }),
          badgeColor: 'bg-[#8B7355]',
          scroll: 'loyalty-program'
        },
        { icon: IoCalendarOutline, label: t('profile.menu.myRoutines'), path: '/beauty-journey', badge: null, badgeColor: '' },
        { icon: IoStarSharp, label: t('profile.menu.reviewsRatings'), path: '/dashboard#reviews', badge: null, badgeColor: '' },
      ],
    },
    {
      title: t('profile.menu.settingsSection'),
      items: [
        { icon: IoSettingsOutline, label: t('profile.menu.accountSettings'), path: '/privacy-settings', badge: null, badgeColor: '' },
        { icon: IoNotificationsOutline, label: t('profile.menu.notifications'), path: '/notifications', badge: null, badgeColor: 'bg-[#C9A870]' },
      ],
    },
  ]

  if (loading) return <LoadingSpinner />

  return (
    <div key={i18n.language} className="bg-[#FDFBF7] font-['Cormorant_Garamond'] min-h-screen">

      {/* ── Hero Welcome Banner ── */}
      <div className="min-h-[200px] md:min-h-[240px] lg:min-h-[280px] bg-gradient-to-b from-[#F5F1EA] to-[#FDFBF7] px-4 md:px-[60px] lg:px-[120px] flex items-center py-8 md:py-0">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 md:gap-8 lg:gap-[48px] w-full">

          {/* Mobile Drawer Trigger */}
          <button
            onClick={() => setShowDrawer(true)}
            className="lg:hidden absolute top-0 right-0 flex items-center gap-2 bg-white border border-[#E8E3D9] rounded-full px-3 py-2 shadow-sm"
          >
            {userAvatar ? (
              <img src={userAvatar} alt="avatar" className="w-7 h-7 rounded-full object-cover" />
            ) : (
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#8B7355] to-[#C9A870] flex items-center justify-center">
                <span className="text-[11px] font-bold text-white">{userInitials}</span>
              </div>
            )}
            <IoMenuOutline className="w-4 h-4 text-[#8B7355]" />
          </button>

          {/* Avatar */}
          <div className="relative flex-shrink-0">
            {userAvatar ? (
              <img
                src={userAvatar}
                alt={t('profile.hero.userAvatar')}
                className="w-[110px] h-[110px] md:w-[130px] md:h-[130px] lg:w-[160px] lg:h-[160px] rounded-full object-cover border-4 border-[#C9A870] shadow-[0_8px_32px_rgba(139,115,85,0.2)]"
              />
            ) : (
              <div className="w-[110px] h-[110px] md:w-[130px] md:h-[130px] lg:w-[160px] lg:h-[160px] rounded-full bg-gradient-to-br from-[#8B7355] to-[#C9A870] border-4 border-[#C9A870] shadow-[0_8px_32px_rgba(139,115,85,0.2)] flex items-center justify-center">
                <span className="text-[36px] md:text-[42px] lg:text-[52px] font-bold text-white">{userInitials}</span>
              </div>
            )}
            <button className="absolute bottom-1 right-1 lg:bottom-2 lg:right-2 w-[34px] h-[34px] lg:w-[40px] lg:h-[40px] bg-[#8B7355] text-white rounded-full flex items-center justify-center shadow-md hover:bg-[#7a6448] transition-colors">
              <IoCameraOutline className="w-[16px] h-[16px] lg:w-[20px] lg:h-[20px]" />
            </button>
          </div>

          {/* Info */}
          <div className="flex-1 text-center sm:text-left">
            <p className="text-[12px] md:text-[13px] lg:text-[14px] font-light italic text-[#8B7355] tracking-[2px] mb-2">{t('profile.hero.label')}</p>
            <h1 className="text-[32px] md:text-[42px] lg:text-[56px] font-bold text-[#1A1A1A] leading-[1.1] mb-2">{userName}</h1>
            <p className="text-[14px] md:text-[15px] lg:text-[16px] font-light italic text-[#8B7355] mb-3 lg:mb-4">{t('profile.hero.memberSince')} {new Date(user?.created_at).getFullYear()}</p>
            <p className="text-[14px] md:text-[15px] lg:text-[16px] font-normal text-[#666666]">{userEmail}</p>
          </div>

          {/* Points Badge — hidden on mobile, shown on sm+ */}
          <div className="hidden sm:block bg-white border-2 border-[#C9A870] rounded-[16px] p-5 lg:p-[32px] text-center shadow-[0_4px_16px_rgba(201,168,112,0.15)] flex-shrink-0">
            <IoSparkles className="w-[28px] h-[28px] md:w-[32px] md:h-[32px] lg:w-[40px] lg:h-[40px] text-[#C9A870] mx-auto mb-2 lg:mb-3" />
            <div className="text-[28px] md:text-[34px] lg:text-[40px] font-bold text-[#8B7355] mb-1">{loyaltyPoints.toLocaleString()}</div>
            <div className="text-[13px] md:text-[14px] lg:text-[15px] font-normal text-[#666666]">{t('profile.hero.loyaltyPoints')}</div>
            <button className="mt-3 lg:mt-4 px-4 lg:px-5 h-[36px] lg:h-[40px] bg-[#8B7355] text-white text-[12px] lg:text-[13px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">
              {t('profile.hero.redeem')}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Drawer ── */}
      {showDrawer && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowDrawer(false)} />
          {/* Drawer */}
          <div className="absolute left-0 top-0 bottom-0 w-[300px] bg-white shadow-[4px_0_24px_rgba(0,0,0,0.15)] flex flex-col overflow-y-auto">

            {/* Drawer Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8E3D9] flex-shrink-0">
              <span className="text-[16px] font-semibold text-[#1A1A1A]">{t('profile.menu.myAccount')}</span>
              <button onClick={() => setShowDrawer(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F5F1EA] transition-colors">
                <IoClose className="w-5 h-5 text-[#666666]" />
              </button>
            </div>

            {/* Profile Info */}
            <div className="p-5 border-b border-[#E8E3D9]">
              <div className="flex flex-col items-center">
                {userAvatar ? (
                  <img src={userAvatar} alt={userName} className="w-[80px] h-[80px] rounded-full object-cover border-[3px] border-[#C9A870] mb-3" />
                ) : (
                  <div className="w-[80px] h-[80px] rounded-full bg-gradient-to-br from-[#8B7355] to-[#C9A870] border-[3px] border-[#C9A870] mb-3 flex items-center justify-center">
                    <span className="text-[28px] font-bold text-white">{userInitials}</span>
                  </div>
                )}
                <h2 className="text-[18px] font-semibold text-[#1A1A1A] mb-1">{userName}</h2>
                <p className="text-[12px] text-[#666666] mb-3">{userEmail}</p>
                <div className="flex items-center gap-2">
                  <IoSparkles className="w-[16px] h-[16px] text-[#C9A870]" />
                  <span className="text-[15px] font-medium text-[#8B7355]">{loyaltyPoints.toLocaleString()} {t('profile.hero.loyaltyPoints')}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="p-4 border-b border-[#E8E3D9]">
              <p className="text-[11px] font-medium text-[#8B7355] tracking-[1px] uppercase mb-3">{t('profile.quickAccess.title')}</p>
              <div className="grid grid-cols-4 gap-2">
                {quickActions.map((action) => (
                  <Link key={action.label} to={action.path} onClick={() => setShowDrawer(false)}>
                    <div className="flex flex-col items-center justify-center h-[64px] bg-[#F5F1EA] rounded-[8px] hover:bg-[#8B7355] group transition-all">
                      <action.icon className="w-[20px] h-[20px] text-[#8B7355] group-hover:text-white mb-1 transition-colors" />
                      <span className="text-[10px] font-normal text-[#8B7355] group-hover:text-white transition-colors text-center leading-tight px-1">{action.label}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Menu Sections */}
            <div className="flex-1">
              {menuSections.map((section) => (
                <div key={section.title} className="border-b border-[#E8E3D9]">
                  <div className="px-5 py-3 bg-[#FDFBF7]">
                    <p className="text-[11px] font-medium text-[#8B7355] tracking-[1px] uppercase">{section.title}</p>
                  </div>
                  <div className="px-2 py-1">
                    {section.items.map((item) => (
                      <Link key={item.label} to={item.path} onClick={() => setShowDrawer(false)}>
                        <div className="flex items-center justify-between h-[46px] px-3 rounded-[8px] hover:bg-[#FDFBF7] transition-colors">
                          <div className="flex items-center gap-3">
                            <item.icon className="w-[18px] h-[18px] text-[#8B7355]" />
                            <span className="text-[13px] font-normal text-[#2B2B2B]">{item.label}</span>
                          </div>
                          {item.badge ? (
                            <div className={`${item.badgeColor || 'bg-[#C9A870]'} text-white text-[10px] font-normal px-[8px] py-[3px] rounded-full`}>
                              {item.badge}
                            </div>
                          ) : (
                            <IoChevronForward className="w-[14px] h-[14px] text-[#999999]" />
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Sign Out */}
            <div className="p-4 flex-shrink-0">
              <button
                onClick={() => { setShowDrawer(false); handleSignOut() }}
                className="w-full h-[48px] bg-white border border-[#E8E3D9] rounded-[8px] flex items-center justify-center gap-[10px] hover:border-[#8B7355] group transition-colors"
              >
                <IoLogOutOutline className="w-[18px] h-[18px] text-[#666666] group-hover:text-[#8B7355] transition-colors" />
                <span className="text-[14px] font-medium text-[#666666] group-hover:text-[#8B7355] transition-colors">{t('profile.signOut')}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Breadcrumb ── */}
      <div className="min-h-[48px] bg-white px-4 md:px-[60px] lg:px-[120px] flex items-center border-b border-[#E8E3D9]">
        <span className="text-[13px] lg:text-[15px] font-normal text-[#8B7355] cursor-pointer">{t('profile.breadcrumb.home')}</span>
        <span className="text-[13px] lg:text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[13px] lg:text-[15px] font-normal text-[#666666]">{t('profile.breadcrumb.myProfile')}</span>
      </div>

      {/* ── Main Content ── */}
      <div className="px-4 md:px-[60px] lg:px-[120px] py-6 md:py-10 lg:py-[64px]">
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-[40px]">

          {/* ── Sidebar Menu — desktop/tablet only ── */}
          <div className="hidden lg:block w-full lg:w-[360px] lg:flex-shrink-0 space-y-5 lg:space-y-6">

            {/* Quick Actions */}
            <div className="bg-white rounded-[16px] border border-[#E8E3D9] shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-5 lg:p-[28px]">
              <h3 className="text-[15px] lg:text-[16px] font-medium text-[#1A1A1A] mb-4 lg:mb-5">{t('profile.quickAccess.title')}</h3>
              <div className="grid grid-cols-4 gap-[10px] lg:gap-[12px]">
                {quickActions.map((action) => (
                  <Link key={action.label} to={action.path}>
                    <div className="flex flex-col items-center justify-center h-[70px] lg:h-[80px] bg-[#F5F1EA] rounded-[8px] cursor-pointer hover:bg-[#8B7355] group transition-all duration-300">
                      <action.icon className="w-[22px] h-[22px] lg:w-[24px] lg:h-[24px] text-[#8B7355] group-hover:text-white mb-1 lg:mb-2 transition-colors" />
                      <span className="text-[11px] lg:text-[12px] font-normal text-[#8B7355] group-hover:text-white transition-colors text-center leading-tight px-1">{action.label}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Menu Sections */}
            {menuSections.map((section) => (
              <div key={section.title} className="bg-white rounded-[16px] border border-[#E8E3D9] shadow-[0_4px_16px_rgba(0,0,0,0.06)] overflow-hidden">
                <div className="px-5 lg:px-[28px] py-[14px] lg:py-[16px] bg-[#FDFBF7] border-b border-[#E8E3D9]">
                  <h3 className="text-[13px] lg:text-[14px] font-medium text-[#8B7355] tracking-[1px] uppercase">{section.title}</h3>
                </div>
                <div className="px-[8px] lg:px-[12px] py-[6px] lg:py-[8px]">
                  {section.items.map((item) => (
                    <Link
                      key={item.label}
                      to={item.path}
                      onClick={item.scroll ? (e) => {
                        e.preventDefault()
                        document.getElementById(item.scroll)?.scrollIntoView({ behavior: 'smooth' })
                      } : undefined}
                    >
                      <div className="flex items-center justify-between h-[48px] lg:h-[52px] px-3 lg:px-[16px] rounded-[8px] cursor-pointer hover:bg-[#FDFBF7] transition-colors">
                        <div className="flex items-center gap-3 lg:gap-[14px]">
                          <item.icon className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#8B7355]" />
                          <span className="text-[14px] lg:text-[15px] font-normal text-[#2B2B2B]">{item.label}</span>
                        </div>
                        {item.badge ? (
                          <div className={`${item.badgeColor || 'bg-[#C9A870]'} text-white text-[10px] lg:text-[11px] font-normal px-[8px] lg:px-[10px] py-[3px] rounded-full`}>
                            {item.badge}
                          </div>
                        ) : (
                          <IoChevronForward className="w-[14px] h-[14px] lg:w-[16px] lg:h-[16px] text-[#999999]" />
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            {/* Sign Out */}
            <div className="bg-white rounded-[16px] border border-[#E8E3D9] shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-4 lg:p-[20px]">
              <button onClick={handleSignOut} className="w-full h-[48px] lg:h-[52px] bg-white border border-[#E8E3D9] rounded-[8px] flex items-center justify-center gap-[10px] cursor-pointer hover:border-[#8B7355] group transition-colors">
                <IoLogOutOutline className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#666666] group-hover:text-[#8B7355] transition-colors" />
                <span className="text-[14px] lg:text-[15px] font-medium text-[#666666] group-hover:text-[#8B7355] transition-colors">{t('profile.signOut')}</span>
              </button>
            </div>
          </div>

          {/* ── Main Panel ── */}
          <div className="flex-1 min-w-0 space-y-5 lg:space-y-6">

            {/* Skin Score Card */}
            <div className="bg-white rounded-[16px] border border-[#E8E3D9] shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-5 md:p-6 lg:p-[32px]">
              <div className="flex items-center justify-between mb-5 lg:mb-6">
                <h2 className="text-[20px] md:text-[24px] lg:text-[28px] font-medium text-[#1A1A1A]">{t('profile.skin.title')}</h2>
                {skinAnalysis && (
                  <Link to="/skin-analysis">
                    <button className="px-4 lg:px-5 h-[36px] lg:h-[40px] bg-[#F5F1EA] text-[#8B7355] text-[13px] lg:text-[14px] font-medium rounded-[8px] hover:bg-[#8B7355] hover:text-white transition-all whitespace-nowrap">
                      {t('profile.skin.retake')}
                    </button>
                  </Link>
                )}
              </div>
              {skinAnalysis ? (
                <>
                  <div className="flex items-center justify-center mb-6 lg:mb-8">
                    <div className="relative">
                      <div className="w-[120px] h-[120px] lg:w-[140px] lg:h-[140px] rounded-full border-[8px] border-[#F5F1EA] flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-[36px] lg:text-[42px] font-bold text-[#8B7355]">{skinAnalysis.skin_score}</div>
                          <div className="text-[12px] lg:text-[13px] font-normal text-[#666666]">/ 100</div>
                        </div>
                      </div>
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#C9A870] text-white text-[11px] lg:text-[12px] font-medium px-3 lg:px-4 py-1 rounded-full whitespace-nowrap">
                        {skinAnalysis.skin_label || t('profile.skin.overallScore')}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 lg:gap-4 mb-5 lg:mb-6">
                    <div className="bg-[#FDFBF7] rounded-[12px] p-4 lg:p-5">
                      <div className="text-[12px] lg:text-[13px] font-medium text-[#666666] mb-2">{t('profile.skin.hydration')}</div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-[20px] lg:text-[24px] font-bold text-[#8B7355]">{skinAnalysis.metrics?.hydration || 0}%</div>
                      </div>
                      <div className="w-full h-[6px] bg-white rounded-full overflow-hidden">
                        <div className="h-full bg-[#C9A870] rounded-full transition-all" style={{ width: `${skinAnalysis.metrics?.hydration || 0}%` }} />
                      </div>
                    </div>

                    <div className="bg-[#FDFBF7] rounded-[12px] p-4 lg:p-5">
                      <div className="text-[12px] lg:text-[13px] font-medium text-[#666666] mb-2">{t('profile.skin.texture')}</div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-[20px] lg:text-[24px] font-bold text-[#8B7355]">{skinAnalysis.metrics?.texture || 0}%</div>
                      </div>
                      <div className="w-full h-[6px] bg-white rounded-full overflow-hidden">
                        <div className="h-full bg-[#C9A870] rounded-full transition-all" style={{ width: `${skinAnalysis.metrics?.texture || 0}%` }} />
                      </div>
                    </div>

                    <div className="bg-[#FDFBF7] rounded-[12px] p-4 lg:p-5">
                      <div className="text-[12px] lg:text-[13px] font-medium text-[#666666] mb-2">{t('profile.skin.clarity')}</div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-[20px] lg:text-[24px] font-bold text-[#8B7355]">{skinAnalysis.metrics?.clarity || 0}%</div>
                      </div>
                      <div className="w-full h-[6px] bg-white rounded-full overflow-hidden">
                        <div className="h-full bg-[#C9A870] rounded-full transition-all" style={{ width: `${skinAnalysis.metrics?.clarity || 0}%` }} />
                      </div>
                    </div>

                    <div className="bg-[#FDFBF7] rounded-[12px] p-4 lg:p-5">
                      <div className="text-[12px] lg:text-[13px] font-medium text-[#666666] mb-2">{t('profile.skin.toneEvenness')}</div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-[20px] lg:text-[24px] font-bold text-[#8B7355]">{skinAnalysis.metrics?.toneEvenness || 0}%</div>
                      </div>
                      <div className="w-full h-[6px] bg-white rounded-full overflow-hidden">
                        <div className="h-full bg-[#C9A870] rounded-full transition-all" style={{ width: `${skinAnalysis.metrics?.toneEvenness || 0}%` }} />
                      </div>
                    </div>
                  </div>

                  {skinAnalysis.summary && (
                    <div className="bg-[#FDFBF7] rounded-[12px] p-4 lg:p-5">
                      <div className="text-[13px] lg:text-[14px] font-medium text-[#1A1A1A] mb-2">{t('profile.skin.summary')}</div>
                      <p className="text-[13px] lg:text-[14px] font-normal text-[#666666] leading-relaxed">{skinAnalysis.summary}</p>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 lg:py-12">
                  <IoSparkles className="w-[48px] h-[48px] md:w-[56px] md:h-[56px] text-[#C9A870] mb-4" />
                  <h3 className="text-[18px] md:text-[20px] lg:text-[24px] font-medium text-[#1A1A1A] mb-2 text-center">{t('profile.skin.emptyTitle')}</h3>
                  <p className="text-[14px] md:text-[15px] text-[#666666] mb-5 text-center max-w-[400px]">{t('profile.skin.emptyDesc')}</p>
                  <Link to="/skin-analysis">
                    <button className="px-6 lg:px-8 h-[48px] lg:h-[52px] bg-[#8B7355] text-white text-[14px] lg:text-[15px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">
                      {t('profile.skin.start')}
                    </button>
                  </Link>
                </div>
              )}
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-[16px] border border-[#E8E3D9] shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-5 md:p-6 lg:p-[32px]">
              <div className="flex items-center justify-between mb-5 lg:mb-6">
                <h2 className="text-[20px] md:text-[24px] lg:text-[28px] font-medium text-[#1A1A1A]">{t('profile.orders.title')}</h2>
                <Link to="/order-tracking">
                  <button className="px-4 lg:px-5 h-[36px] lg:h-[40px] bg-[#F5F1EA] text-[#8B7355] text-[13px] lg:text-[14px] font-medium rounded-[8px] hover:bg-[#8B7355] hover:text-white transition-all whitespace-nowrap">
                    {t('profile.orders.viewAll')}
                  </button>
                </Link>
              </div>
              {recentOrders.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 lg:py-12">
                  <IoBagOutline className="w-[48px] h-[48px] md:w-[56px] md:h-[56px] text-[#C9A870] mb-4" />
                  <h3 className="text-[18px] md:text-[20px] font-medium text-[#1A1A1A] mb-2">{t('profile.orders.emptyTitle')}</h3>
                  <p className="text-[14px] md:text-[15px] text-[#666666] mb-5 text-center">{t('profile.orders.emptyDesc')}</p>
                  <Link to="/skincare">
                    <button className="px-6 h-[44px] bg-[#8B7355] text-white text-[14px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">
                      {t('profile.orders.shopNow')}
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3 lg:space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center gap-3 md:gap-4 lg:gap-[16px] bg-[#FDFBF7] rounded-[12px] p-3 lg:p-[16px]">
                      <div className="w-[56px] h-[56px] md:w-[64px] md:h-[64px] lg:w-[72px] lg:h-[72px] rounded-[8px] flex-shrink-0 bg-gradient-to-br from-[#F5F1EA] to-[#E8E3D9] flex items-center justify-center">
                        <IoBagCheckOutline className="w-[28px] h-[28px] text-[#8B7355]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-[13px] lg:text-[14px] font-medium text-[#8B7355]">#{order.id.slice(0, 8)}</span>
                          <span className={`text-[10px] lg:text-[11px] font-medium px-2 lg:px-3 py-[3px] rounded-full ${getStatusColor(order.payment_status)}`}>{getStatusLabel(order.payment_status)}</span>
                        </div>
                        <h4 className="text-[14px] lg:text-[16px] font-medium text-[#1A1A1A] mb-1 truncate">
                          {order.items?.length
                            ? t('profile.orders.orderItemsCount', { count: order.items.length })
                            : t('profile.orders.orderItems')}
                        </h4>
                        <p className="text-[12px] lg:text-[13px] font-normal text-[#999999]">{new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-[16px] lg:text-[18px] font-semibold text-[#1A1A1A] mb-1 lg:mb-2">${parseFloat(order.total || 0).toFixed(2)}</div>
                        <Link to={`/order-tracking?orderId=${order.id}`}>
                          <button className="text-[12px] lg:text-[13px] font-medium text-[#8B7355] hover:underline">{t('profile.orders.track')}</button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Loyalty Program */}
            <div id="loyalty-program" />
            <div className="bg-gradient-to-r from-[#F5F1EA] to-[#FDFBF7] rounded-[16px] border border-[#E8E3D9] p-5 md:p-6 lg:p-[32px]">
              <div className="flex items-center justify-between mb-5 lg:mb-6">
                <h2 className="text-[20px] md:text-[24px] lg:text-[28px] font-medium text-[#1A1A1A]">{t('profile.loyalty.title')}</h2>
                <span className="px-3 lg:px-4 py-[6px] lg:py-2 bg-[#8B7355] text-white text-[12px] lg:text-[13px] font-medium rounded-full">
                  {loyaltyPoints >= 3000 ? t('profile.loyalty.goldMember') : loyaltyPoints >= 2000 ? t('profile.loyalty.eliteMember') : t('profile.loyalty.member')}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 lg:gap-[32px] mb-5 lg:mb-6">
                <div className="text-center flex-shrink-0">
                  <div className="text-[36px] md:text-[42px] lg:text-[48px] font-bold text-[#8B7355] mb-1">{loyaltyPoints.toLocaleString()}</div>
                  <div className="text-[13px] lg:text-[14px] font-normal text-[#666666]">{t('profile.loyalty.currentPoints')}</div>
                </div>
                <div className="flex-1 w-full">
                  <div className="flex justify-between mb-2">
                    <span className="text-[13px] lg:text-[14px] font-normal text-[#666666]">
                      {loyaltyPoints >= 3000 ? t('profile.loyalty.goldAchieved') : t('profile.loyalty.progressToGold')}
                    </span>
                    <span className="text-[13px] lg:text-[14px] font-semibold text-[#8B7355] whitespace-nowrap ml-2">
                      {loyaltyPoints >= 3000 ? t('profile.loyalty.congratulations') : t('profile.loyalty.pointsToGo', { count: pointsToNextTier })}
                    </span>
                  </div>
                  <div className="w-full h-[10px] lg:h-[12px] bg-[#E8E3D9] rounded-full overflow-hidden">
                    <div className="h-full bg-[#8B7355] rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-[11px] lg:text-[12px] font-normal text-[#999999]">{t('profile.loyalty.eliteThreshold')}</span>
                    <span className="text-[11px] lg:text-[12px] font-normal text-[#999999]">{t('profile.loyalty.goldThreshold')}</span>
                  </div>
                </div>
              </div>
              <button className="h-[44px] lg:h-[48px] px-6 lg:px-8 bg-[#8B7355] text-white text-[14px] lg:text-[15px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">
                {t('profile.loyalty.redeemPoints')}
              </button>
            </div>

          </div>
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