import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  IoNotificationsOutline,
  IoShieldCheckmarkOutline,
  IoChevronDown,
  IoCheckmark,
  IoPersonOutline,
  IoBagCheckOutline,
  IoHeartOutline,
  IoSparkles,
  IoStarSharp,
  IoSettingsOutline,
  IoLocationOutline,
  IoCardOutline,
  IoBodyOutline,
  IoBookOutline,
  IoArrowUp,
  IoMenuOutline,
  IoClose,
  IoRibbonOutline,
} from 'react-icons/io5'
import { useAuth } from '../contexts/AuthContext'
import { useWishlist } from '../contexts/WishlistContext'
import { supabase } from '../lib/supabase'

export default function Notifications() {
  const { t, i18n } = useTranslation()
  const { user } = useAuth()
  const { wishlistItems } = useWishlist()

  const [loyaltyPoints, setLoyaltyPoints] = useState(0)
  const [totalOrders, setTotalOrders] = useState(0)
  const [reviewsWritten, setReviewsWritten] = useState(0)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [showDrawer, setShowDrawer] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (user) fetchUserStats()
  }, [user])

  const fetchUserStats = async () => {
    const { data: orders } = await supabase.from('orders').select('total').eq('user_id', user.id)
    if (orders) {
      setTotalOrders(orders.length)
      setLoyaltyPoints(orders.reduce((sum, o) => sum + Math.floor(o.total), 0))
    }
    const { data: reviews } = await supabase.from('reviews').select('id').eq('user_id', user.id)
    if (reviews) setReviewsWritten(reviews.length)
  }

  const getMembershipTier = (points) => {
    if (points >= 5000) return t('notificationsPage.membership.gold')
    if (points >= 2000) return t('notificationsPage.membership.elite')
    return t('notificationsPage.membership.member')
  }

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || t('notificationsPage.guest')
  const userInitials = userName.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
  const membershipTier = getMembershipTier(loyaltyPoints)

  const navigationItems = [
    { label: t('notificationsPage.nav.accountDashboard'), icon: IoPersonOutline, path: '/dashboard', active: false },
    { label: t('notificationsPage.nav.orderHistory'), icon: IoBagCheckOutline, path: '/order-tracking', active: false },
    { label: t('notificationsPage.nav.myWishlist'), icon: IoHeartOutline, path: '/wishlist', active: false, badge: wishlistItems.length > 0 ? wishlistItems.length : null },
    { label: t('notificationsPage.nav.shippingAddresses'), icon: IoLocationOutline, path: '/shipping-address', active: false },
    { label: t('notificationsPage.nav.paymentMethods'), icon: IoCardOutline, path: '/payment-methods', active: false },
    { label: t('notificationsPage.nav.beautyProfile'), icon: IoBodyOutline, path: '/skin-analysis', active: false },
    { label: t('notificationsPage.nav.loyaltyProgram'), icon: IoRibbonOutline, path: '/account', active: false, badge: loyaltyPoints > 0 ? `${loyaltyPoints.toLocaleString()} ${t('notificationsPage.pointsShort')}` : null },
    { label: t('notificationsPage.nav.myRoutines'), icon: IoBookOutline, path: '/beauty-journey', active: false },
    { label: t('notificationsPage.nav.reviewsRatings'), icon: IoStarSharp, path: '/dashboard', active: false },
    { label: t('notificationsPage.nav.accountSettings'), icon: IoSettingsOutline, path: '/privacy-settings', active: false },
    { label: t('notificationsPage.nav.notifications'), icon: IoNotificationsOutline, path: '/notifications', active: true },
  ]

  const [email, setEmail] = useState([
    { id: 'order-updates', enabled: true },
    { id: 'promotions', enabled: true },
    { id: 'new-arrivals', enabled: true },
    { id: 'beauty-tips', enabled: false },
  ])

  const [sms, setSms] = useState([
    { id: 'order-alerts', enabled: true },
    { id: 'flash-sales', enabled: false },
  ])

  const [push, setPush] = useState([
    { id: 'stock-alerts', enabled: true },
    { id: 'price-drop', enabled: true },
    { id: 'events', enabled: false },
  ])

  const [newsletter, setNewsletter] = useState('weekly')
  const [frequency, setFrequency] = useState('')

  useEffect(() => {
    setFrequency(t('notificationsPage.frequencyOptions.multiplePerWeek'))
  }, [i18n.language, t])

  const newsletterOptions = [
    { value: 'weekly' },
    { value: 'monthly' },
    { value: 'unsubscribe' },
  ]

  const frequencyOptions = [
    t('notificationsPage.frequencyOptions.daily'),
    t('notificationsPage.frequencyOptions.multiplePerWeek'),
    t('notificationsPage.frequencyOptions.weekly'),
    t('notificationsPage.frequencyOptions.biWeekly'),
    t('notificationsPage.frequencyOptions.monthly'),
  ]

  const toggleItem = (list, setList, id) => {
    setList(list.map((item) => (item.id === id ? { ...item, enabled: !item.enabled } : item)))
  }

  const resetAll = () => {
    setEmail(email.map((i) => ({ ...i, enabled: true })))
    setSms(sms.map((i) => ({ ...i, enabled: false })))
    setPush(push.map((i) => ({ ...i, enabled: false })))
    setNewsletter('weekly')
    setFrequency(t('notificationsPage.frequencyOptions.multiplePerWeek'))
  }

  const Toggle = ({ enabled, onToggle }) => (
    <div
      onClick={onToggle}
      className={`w-[46px] h-[26px] lg:w-[52px] lg:h-[28px] rounded-full cursor-pointer flex items-center px-[3px] transition-all duration-200 flex-shrink-0 ${
        enabled ? 'bg-[#8B7355] justify-end' : 'bg-[#E8E3D9] justify-start'
      }`}
    >
      <div className="w-[20px] h-[20px] lg:w-[22px] lg:h-[22px] rounded-full bg-white shadow-sm" />
    </div>
  )

  const NotificationRow = ({ id, namespace, enabled, onToggle }) => (
    <div className="flex items-center justify-between py-3 lg:py-[14px] border-b border-[#F5F1EA] last:border-0 gap-4">
      <div className="flex-1 min-w-0">
        <h3 className="text-[14px] lg:text-[16px] font-medium text-[#1A1A1A] mb-[4px]">
          {t(`notificationsPage.${namespace}.${id}.title`)}
        </h3>
        <p className="text-[12px] lg:text-[13px] font-normal text-[#666666]">
          {t(`notificationsPage.${namespace}.${id}.description`)}
        </p>
      </div>
      <Toggle enabled={enabled} onToggle={onToggle} />
    </div>
  )

  return (
    <div key={i18n.language} className="bg-white font-['Cormorant_Garamond']">

      {/* Breadcrumb */}
      <div className="min-h-[48px] bg-[#FDFBF7] px-4 md:px-[60px] lg:px-[120px] flex items-center overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        <span className="text-[13px] lg:text-[15px] font-normal text-[#8B7355] cursor-pointer whitespace-nowrap">{t('notificationsPage.breadcrumb.home')}</span>
        <span className="text-[13px] lg:text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="hidden sm:inline text-[13px] lg:text-[15px] font-normal text-[#8B7355] cursor-pointer whitespace-nowrap">{t('notificationsPage.breadcrumb.accountDashboard')}</span>
        <span className="hidden sm:inline text-[13px] lg:text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[13px] lg:text-[15px] font-normal text-[#666666] whitespace-nowrap">{t('notificationsPage.breadcrumb.notificationPreferences')}</span>
      </div>

      {/* Hero */}
      <div className="min-h-[100px] md:min-h-[120px] lg:min-h-[140px] bg-gradient-to-b from-[#FDFBF7] to-white flex flex-col items-center justify-center px-4 md:px-[60px] lg:px-[120px] py-6 md:py-0">
        <div className="max-w-[1200px] w-full relative">
          <h1 className="text-[28px] md:text-[38px] lg:text-[48px] font-semibold text-[#1A1A1A]">{t('notificationsPage.title')}</h1>
          <p className="text-[14px] md:text-[16px] lg:text-[18px] font-normal text-[#666666] mt-[8px]">{t('notificationsPage.subtitle')}</p>
          {/* Mobile drawer trigger */}
          <button
            onClick={() => setShowDrawer(true)}
            className="lg:hidden absolute top-0 right-0 flex items-center gap-2 bg-white border border-[#E8E3D9] rounded-full px-3 py-2 shadow-sm"
          >
            {user?.user_metadata?.avatar_url ? (
              <img src={user.user_metadata.avatar_url} alt="avatar" className="w-7 h-7 rounded-full object-cover" />
            ) : (
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#8B7355] to-[#C9A870] flex items-center justify-center">
                <span className="text-[11px] font-bold text-white">{userInitials}</span>
              </div>
            )}
            <IoMenuOutline className="w-4 h-4 text-[#8B7355]" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {showDrawer && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowDrawer(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-[300px] bg-white shadow-[4px_0_24px_rgba(0,0,0,0.15)] flex flex-col overflow-y-auto">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8E3D9] flex-shrink-0">
              <span className="text-[16px] font-semibold text-[#1A1A1A]">{t('notificationsPage.nav.accountDashboard')}</span>
              <button onClick={() => setShowDrawer(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F5F1EA]">
                <IoClose className="w-5 h-5 text-[#666666]" />
              </button>
            </div>
            {/* Profile */}
            <div className="p-5 border-b border-[#E8E3D9]">
              <div className="flex flex-col items-center">
                {user?.user_metadata?.avatar_url ? (
                  <img src={user.user_metadata.avatar_url} alt={userName} className="w-[80px] h-[80px] rounded-full object-cover border-[3px] border-[#C9A870] mb-3" />
                ) : (
                  <div className="w-[80px] h-[80px] rounded-full bg-[#C9A870] flex items-center justify-center text-white text-[28px] font-semibold border-[3px] border-[#C9A870] mb-3">
                    {userInitials}
                  </div>
                )}
                <h2 className="text-[18px] font-semibold text-[#1A1A1A] mb-1">{userName}</h2>
                <div className="bg-[#C9A870] text-white text-[11px] font-medium px-[14px] py-[5px] rounded-full mb-3">{membershipTier}</div>
                <div className="flex items-center gap-2">
                  <IoSparkles className="w-[16px] h-[16px] text-[#C9A870]" />
                  <span className="text-[15px] font-medium text-[#8B7355]">{loyaltyPoints.toLocaleString()} {t('notificationsPage.pointsShort')}</span>
                </div>
              </div>
            </div>
            {/* Nav */}
            <div className="p-2 border-b border-[#E8E3D9]">
              {navigationItems.map((item) => (
                <Link key={item.path} to={item.path} onClick={() => setShowDrawer(false)}>
                  <div className={`flex items-center justify-between h-[46px] px-3 rounded-[8px] cursor-pointer transition-colors ${item.active ? 'bg-[#FDFBF7]' : 'hover:bg-[#FDFBF7]'}`}>
                    <div className="flex items-center gap-3">
                      <item.icon className={`w-[18px] h-[18px] ${item.active ? 'text-[#8B7355]' : 'text-[#666666]'}`} />
                      <span className={`text-[13px] ${item.active ? 'text-[#8B7355] font-medium' : 'font-normal text-[#2B2B2B]'}`}>{item.label}</span>
                    </div>
                    {item.badge && <div className="bg-[#C9A870] text-white text-[10px] font-medium px-[7px] py-[2px] rounded-full">{item.badge}</div>}
                  </div>
                </Link>
              ))}
            </div>
            {/* Stats */}
            <div className="p-5">
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center">
                  <div className="text-[20px] font-semibold text-[#8B7355] mb-1">{totalOrders}</div>
                  <div className="text-[10px] font-light text-[#666666] leading-tight">{t('notificationsPage.stats.totalOrders')}</div>
                </div>
                <div className="text-center">
                  <div className="text-[20px] font-semibold text-[#8B7355] mb-1">{wishlistItems.length}</div>
                  <div className="text-[10px] font-light text-[#666666] leading-tight">{t('notificationsPage.stats.wishlistItems')}</div>
                </div>
                <div className="text-center">
                  <div className="text-[20px] font-semibold text-[#8B7355] mb-1">{reviewsWritten}</div>
                  <div className="text-[10px] font-light text-[#666666] leading-tight">{t('notificationsPage.stats.reviewsWritten')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="px-4 md:px-[60px] lg:px-[120px] py-6 md:py-10 lg:py-[48px]">
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-[40px]">

          {/* Sidebar — desktop only */}
          <div className="hidden lg:block w-full lg:w-[320px] lg:flex-shrink-0">
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 lg:p-[28px] mb-5 lg:mb-[24px]">
              <div className="flex flex-col items-center">
                {user?.user_metadata?.avatar_url ? (
                  <img src={user.user_metadata.avatar_url} alt={t('notificationsPage.userAvatar')} className="w-[90px] h-[90px] lg:w-[120px] lg:h-[120px] rounded-full object-cover border-[3px] border-[#C9A870] mb-4 lg:mb-[16px]" />
                ) : (
                  <div className="w-[90px] h-[90px] lg:w-[120px] lg:h-[120px] rounded-full bg-[#C9A870] border-[3px] border-[#C9A870] mb-4 lg:mb-[16px] flex items-center justify-center">
                    <span className="text-[32px] lg:text-[40px] font-semibold text-white">{userInitials}</span>
                  </div>
                )}
                <h2 className="text-[20px] lg:text-[24px] font-semibold text-[#1A1A1A] mb-[4px]">{userName}</h2>
                <div className="bg-[#C9A870] text-white text-[11px] lg:text-[12px] font-medium px-[14px] lg:px-[16px] py-[5px] lg:py-[6px] rounded-full mb-4 lg:mb-[16px]">{membershipTier}</div>
                <div className="flex items-center gap-[8px]">
                  <IoSparkles className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#C9A870]" />
                  <span className="text-[17px] lg:text-[20px] font-medium text-[#8B7355]">{loyaltyPoints.toLocaleString()} {t('notificationsPage.points')}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[8px] mb-5 lg:mb-[24px]">
              {navigationItems.map((item) => (
                <Link key={item.path} to={item.path}>
                  <div className={`flex items-center justify-between h-[48px] lg:h-[56px] px-3 lg:px-[20px] rounded-[8px] cursor-pointer transition-colors ${item.active ? 'bg-[#FDFBF7]' : 'hover:bg-[#FDFBF7]'}`}>
                    <div className="flex items-center gap-3 lg:gap-[16px]">
                      <item.icon className={`w-[20px] h-[20px] lg:w-[22px] lg:h-[22px] ${item.active ? 'text-[#8B7355]' : 'text-[#666666]'}`} />
                      <span className={`text-[13px] lg:text-[15px] ${item.active ? 'text-[#8B7355] font-medium' : 'font-normal text-[#2B2B2B]'}`}>{item.label}</span>
                    </div>
                    {item.badge && <div className="bg-[#C9A870] text-white text-[10px] lg:text-[11px] font-medium px-[7px] lg:px-[8px] py-[2px] rounded-full">{item.badge}</div>}
                  </div>
                </Link>
              ))}
            </div>

            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 lg:p-[24px]">
              <div className="grid grid-cols-3 gap-3 lg:gap-[16px]">
                <div className="text-center">
                  <div className="text-[20px] lg:text-[24px] font-semibold text-[#8B7355] mb-[4px]">{totalOrders}</div>
                  <div className="text-[10px] lg:text-[11px] font-light text-[#666666] leading-tight">{t('notificationsPage.stats.totalOrders')}</div>
                </div>
                <div className="text-center">
                  <div className="text-[20px] lg:text-[24px] font-semibold text-[#8B7355] mb-[4px]">{wishlistItems.length}</div>
                  <div className="text-[10px] lg:text-[11px] font-light text-[#666666] leading-tight">{t('notificationsPage.stats.wishlistItems')}</div>
                </div>
                <div className="text-center">
                  <div className="text-[20px] lg:text-[24px] font-semibold text-[#8B7355] mb-[4px]">{reviewsWritten}</div>
                  <div className="text-[10px] lg:text-[11px] font-light text-[#666666] leading-tight">{t('notificationsPage.stats.reviewsWritten')}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Panel */}
          <div className="flex-1 min-w-0">

            <div className="bg-[#F5F1EA] rounded-[12px] p-4 lg:p-[24px] flex items-center gap-4 lg:gap-[16px] mb-5 lg:mb-[24px]">
              <IoNotificationsOutline className="w-[24px] h-[24px] lg:w-[28px] lg:h-[28px] text-[#8B7355] flex-shrink-0" />
              <p className="text-[13px] lg:text-[15px] font-normal text-[#666666] leading-[1.6]">{t('notificationsPage.infoBanner')}</p>
            </div>

            {/* Email */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[32px] mb-5 lg:mb-[24px]">
              <h2 className="text-[18px] md:text-[20px] lg:text-[24px] font-semibold text-[#1A1A1A] mb-4 lg:mb-[24px]">{t('notificationsPage.sections.email')}</h2>
              {email.map((item) => (
                <NotificationRow key={item.id} id={item.id} namespace="emailItems" enabled={item.enabled} onToggle={() => toggleItem(email, setEmail, item.id)} />
              ))}
            </div>

            {/* SMS */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[32px] mb-5 lg:mb-[24px]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 lg:mb-[24px]">
                <h2 className="text-[18px] md:text-[20px] lg:text-[24px] font-semibold text-[#1A1A1A]">{t('notificationsPage.sections.sms')}</h2>
                <span className="text-[11px] lg:text-[13px] font-normal text-[#999999]">{t('notificationsPage.smsNotice')}</span>
              </div>
              {sms.map((item) => (
                <NotificationRow key={item.id} id={item.id} namespace="smsItems" enabled={item.enabled} onToggle={() => toggleItem(sms, setSms, item.id)} />
              ))}
            </div>

            {/* Push */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[32px] mb-5 lg:mb-[24px]">
              <h2 className="text-[18px] md:text-[20px] lg:text-[24px] font-semibold text-[#1A1A1A] mb-[8px]">{t('notificationsPage.sections.push')}</h2>
              <p className="text-[12px] lg:text-[13px] font-normal text-[#666666] mb-4 lg:mb-[24px]">{t('notificationsPage.pushDescription')}</p>
              {push.map((item) => (
                <NotificationRow key={item.id} id={item.id} namespace="pushItems" enabled={item.enabled} onToggle={() => toggleItem(push, setPush, item.id)} />
              ))}
            </div>

            {/* Newsletter */}
            <div className="bg-gradient-to-b from-[#FDFBF7] to-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[32px] mb-5 lg:mb-[24px]">
              <h2 className="text-[18px] md:text-[20px] lg:text-[24px] font-semibold text-[#1A1A1A] mb-4 lg:mb-[24px]">{t('notificationsPage.sections.newsletter')}</h2>
              <div className="space-y-4 lg:space-y-[16px]">
                {newsletterOptions.map((option) => (
                  <div key={option.value} onClick={() => setNewsletter(option.value)} className="flex items-start gap-3 lg:gap-[16px] cursor-pointer">
                    <div className="mt-[2px] flex-shrink-0">
                      <div className={`w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] rounded-full border-[2px] flex items-center justify-center transition-all ${newsletter === option.value ? 'border-[#8B7355] bg-[#8B7355]' : 'border-[#E8E3D9]'}`}>
                        {newsletter === option.value && <div className="w-[6px] h-[6px] lg:w-[8px] lg:h-[8px] rounded-full bg-white" />}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-[14px] lg:text-[16px] font-medium mb-[4px] ${newsletter === option.value ? 'text-[#8B7355]' : 'text-[#1A1A1A]'}`}>
                        {t(`notificationsPage.newsletterOptions.${option.value}.label`)}
                      </h3>
                      <p className="text-[12px] lg:text-[13px] font-normal text-[#666666]">
                        {t(`notificationsPage.newsletterOptions.${option.value}.description`)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Frequency */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[32px] mb-5 lg:mb-[24px]">
              <span className="text-[14px] lg:text-[16px] font-medium text-[#1A1A1A] block mb-3 lg:mb-[12px]">{t('notificationsPage.emailFrequencyPreference')}</span>
              <div className="relative">
                <select value={frequency} onChange={(e) => setFrequency(e.target.value)}
                  className="w-full bg-white border-[1.5px] border-[#E8E3D9] rounded-[8px] px-[16px] py-[12px] lg:py-[14px] text-[14px] lg:text-[15px] font-normal text-[#1A1A1A] appearance-none cursor-pointer outline-none focus:border-[#8B7355] transition-colors pr-[44px]">
                  {frequencyOptions.map((option) => <option key={option}>{option}</option>)}
                </select>
                <IoChevronDown className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#666666] absolute right-[16px] top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 lg:gap-[16px] mb-5 lg:mb-[24px]">
              <button onClick={resetAll} className="flex-1 h-[48px] lg:h-[56px] bg-white border-[1.5px] border-[#E8E3D9] text-[#666666] text-[14px] lg:text-[16px] font-medium rounded-[8px] cursor-pointer hover:border-[#8B7355] hover:text-[#8B7355] transition-all">
                {t('notificationsPage.resetToDefault')}
              </button>
              <button className="flex-1 h-[48px] lg:h-[56px] bg-[#8B7355] text-white text-[14px] lg:text-[16px] font-medium rounded-[8px] cursor-pointer hover:bg-[#7a6448] transition-colors flex items-center justify-center gap-2">
                <IoCheckmark className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px]" />
                {t('notificationsPage.savePreferences')}
              </button>
            </div>

            {/* Privacy Notice */}
            <div className="bg-[#F5F1EA] rounded-[12px] p-4 lg:p-[16px] flex items-center gap-3 lg:gap-[12px]">
              <IoShieldCheckmarkOutline className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#8B7355] flex-shrink-0" />
              <p className="text-[12px] lg:text-[13px] font-normal text-[#666666] leading-[1.6]">{t('notificationsPage.privacyNotice')}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="h-[40px] md:h-[60px] lg:h-[80px]" />

      {/* Scroll to Top */}
      {showScrollTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 w-12 h-12 bg-gradient-to-br from-[#C9A870] to-[#8B7355] rounded-full flex items-center justify-center shadow-[0_4px_16px_rgba(139,115,85,0.4)] z-50 transition-all duration-300">
          <IoArrowUp className="w-5 h-5 text-white" />
        </button>
      )}
    </div>
  )
}