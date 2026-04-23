import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  IoShieldCheckmarkOutline,
  IoLockClosedOutline,
  IoTimeOutline,
  IoDownloadOutline,
  IoWarningOutline,
  IoDocumentTextOutline,
  IoCheckmark,
  IoPersonOutline,
  IoBagCheckOutline,
  IoHeartOutline,
  IoSparkles,
  IoStarSharp,
  IoSettingsOutline,
  IoNotificationsOutline,
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

export default function Privacy() {
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
      setLoyaltyPoints(orders.reduce((s, o) => s + Math.floor(o.total), 0))
    }
    const { data: reviews } = await supabase.from('reviews').select('id').eq('user_id', user.id)
    if (reviews) setReviewsWritten(reviews.length)
  }

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || t('privacyPage.guest')
  const userInitials = userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

  const navigationItems = [
    { label: t('privacyPage.navItems.Account Dashboard'), icon: IoPersonOutline, path: '/dashboard' },
    { label: t('privacyPage.navItems.Order History'), icon: IoBagCheckOutline, path: '/order-tracking' },
    { label: t('privacyPage.navItems.My Wishlist'), icon: IoHeartOutline, path: '/wishlist', badge: wishlistItems?.length > 0 ? wishlistItems.length : null },
    { label: t('privacyPage.navItems.Shipping Addresses'), icon: IoLocationOutline, path: '/shipping-address' },
    { label: t('privacyPage.navItems.Payment Methods'), icon: IoCardOutline, path: '/payment-methods' },
    { label: t('privacyPage.navItems.Beauty Profile'), icon: IoBodyOutline, path: '/skin-analysis' },
    { label: t('privacyPage.navItems.Loyalty Program'), icon: IoRibbonOutline, path: '/account' },
    { label: t('privacyPage.navItems.My Routines'), icon: IoBookOutline, path: '/beauty-journey' },
    { label: t('privacyPage.navItems.Reviews & Ratings'), icon: IoStarSharp, path: '/dashboard' },
    { label: t('privacyPage.navItems.Account Settings'), icon: IoSettingsOutline, path: '/privacy-settings', active: true },
    { label: t('privacyPage.navItems.Notifications'), icon: IoNotificationsOutline, path: '/notifications' },
  ]

  const [privacyControls, setPrivacyControls] = useState([
    { id: 'personal-data', enabled: true },
    { id: 'marketing', enabled: true },
    { id: 'cookies', enabled: true },
    { id: 'third-party', enabled: false },
  ])

  const toggleControl = (id) => {
    setPrivacyControls(prev =>
      prev.map(c => c.id === id ? { ...c, enabled: !c.enabled } : c)
    )
  }

  const Toggle = ({ enabled, onToggle }) => (
    <div onClick={onToggle} className={`w-[46px] h-[26px] rounded-full flex items-center px-[3px] cursor-pointer ${enabled ? 'bg-[#8B7355] justify-end' : 'bg-[#E8E3D9]'}`}>
      <div className="w-[20px] h-[20px] bg-white rounded-full" />
    </div>
  )

  return (
    <div key={i18n.language} className="bg-white font-['Cormorant_Garamond']">

      {/* Breadcrumb */}
      <div className="min-h-[48px] bg-[#FDFBF7] px-4 md:px-[60px] lg:px-[120px] flex items-center overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        <Link to="/"><span className="text-[13px] lg:text-[15px] font-normal text-[#8B7355] cursor-pointer whitespace-nowrap">{t('privacyPage.navItems.Account Dashboard')}</span></Link>
        <span className="text-[13px] lg:text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[13px] lg:text-[15px] font-normal text-[#666666] whitespace-nowrap">{t('privacyPage.title')}</span>
      </div>

      {/* Hero */}
      <div className="min-h-[100px] md:min-h-[120px] lg:min-h-[140px] bg-gradient-to-b from-[#FDFBF7] to-white flex flex-col items-center justify-center px-4 md:px-[60px] lg:px-[120px] py-6 md:py-0">
        <div className="max-w-[1200px] w-full relative">
          <h1 className="text-[28px] md:text-[38px] lg:text-[48px] font-semibold text-[#1A1A1A]">{t('privacyPage.title')}</h1>
          <p className="text-[14px] md:text-[16px] lg:text-[18px] font-normal text-[#666666] mt-[8px]">{t('privacyPage.subtitle')}</p>
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
              <span className="text-[16px] font-semibold text-[#1A1A1A]">My Account</span>
              <button onClick={() => setShowDrawer(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F5F1EA] transition-colors">
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
                <div className="flex items-center gap-2 mt-2">
                  <IoSparkles className="w-[16px] h-[16px] text-[#C9A870]" />
                  <span className="text-[15px] font-medium text-[#8B7355]">{loyaltyPoints.toLocaleString()} pts</span>
                </div>
              </div>
            </div>
            {/* Nav */}
            <div className="p-2 border-b border-[#E8E3D9]">
              {navigationItems.map((item) => (
                <Link key={item.label} to={item.path} onClick={() => setShowDrawer(false)}>
                  <div className={`flex items-center justify-between h-[46px] px-3 rounded-[8px] cursor-pointer transition-colors ${item.active ? 'bg-[#FDFBF7]' : 'hover:bg-[#FDFBF7]'}`}>
                    <div className="flex items-center gap-3">
                      <item.icon className={`w-[18px] h-[18px] ${item.active ? 'text-[#8B7355]' : 'text-[#666666]'}`} />
                      <span className={`text-[13px] ${item.active ? 'text-[#8B7355] font-medium' : 'font-normal text-[#2B2B2B]'}`}>{item.label}</span>
                    </div>
                    {item.badge ? (
                      <div className="bg-[#C9A870] text-white text-[10px] font-medium px-[7px] py-[2px] rounded-full">{item.badge}</div>
                    ) : null}
                  </div>
                </Link>
              ))}
            </div>
            {/* Stats */}
            <div className="p-5">
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center">
                  <div className="text-[20px] font-semibold text-[#8B7355] mb-1">{totalOrders}</div>
                  <div className="text-[10px] font-light text-[#666666] leading-tight">Total Orders</div>
                </div>
                <div className="text-center">
                  <div className="text-[20px] font-semibold text-[#8B7355] mb-1">{wishlistItems?.length || 0}</div>
                  <div className="text-[10px] font-light text-[#666666] leading-tight">Wishlist Items</div>
                </div>
                <div className="text-center">
                  <div className="text-[20px] font-semibold text-[#8B7355] mb-1">{reviewsWritten}</div>
                  <div className="text-[10px] font-light text-[#666666] leading-tight">Reviews Written</div>
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
                  <img src={user.user_metadata.avatar_url} alt={userName} className="w-[90px] h-[90px] lg:w-[120px] lg:h-[120px] rounded-full object-cover border-[3px] border-[#C9A870] mb-4 lg:mb-[16px]" />
                ) : (
                  <div className="w-[90px] h-[90px] lg:w-[120px] lg:h-[120px] rounded-full bg-[#C9A870] flex items-center justify-center text-white text-[36px] lg:text-[48px] font-semibold border-[3px] border-[#C9A870] mb-4 lg:mb-[16px]">
                    {userInitials}
                  </div>
                )}
                <h2 className="text-[20px] lg:text-[24px] font-semibold text-[#1A1A1A] mb-[4px]">{userName}</h2>
                <div className="flex items-center gap-[8px] mt-2">
                  <IoSparkles className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#C9A870]" />
                  <span className="text-[17px] lg:text-[20px] font-medium text-[#8B7355]">{loyaltyPoints.toLocaleString()} pts</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[8px] mb-5 lg:mb-[24px]">
              {navigationItems.map((item) => (
                <Link key={item.label} to={item.path}>
                  <div className={`flex items-center justify-between h-[48px] lg:h-[56px] px-3 lg:px-[20px] rounded-[8px] cursor-pointer transition-colors ${item.active ? 'bg-[#FDFBF7]' : 'hover:bg-[#FDFBF7]'}`}>
                    <div className="flex items-center gap-3 lg:gap-[16px]">
                      <item.icon className={`w-[20px] h-[20px] lg:w-[22px] lg:h-[22px] ${item.active ? 'text-[#8B7355]' : 'text-[#666666]'}`} />
                      <span className={`text-[13px] lg:text-[15px] ${item.active ? 'text-[#8B7355] font-medium' : 'font-normal text-[#2B2B2B]'}`}>{item.label}</span>
                    </div>
                    {item.badge ? (
                      <div className="bg-[#C9A870] text-white text-[10px] lg:text-[11px] font-medium px-[7px] lg:px-[8px] py-[2px] rounded-full">{item.badge}</div>
                    ) : null}
                  </div>
                </Link>
              ))}
            </div>
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 lg:p-[24px]">
              <div className="grid grid-cols-3 gap-3 lg:gap-[16px]">
                <div className="text-center">
                  <div className="text-[20px] lg:text-[24px] font-semibold text-[#8B7355] mb-[4px]">{totalOrders}</div>
                  <div className="text-[10px] lg:text-[11px] font-light text-[#666666] leading-tight">Total Orders</div>
                </div>
                <div className="text-center">
                  <div className="text-[20px] lg:text-[24px] font-semibold text-[#8B7355] mb-[4px]">{wishlistItems?.length || 0}</div>
                  <div className="text-[10px] lg:text-[11px] font-light text-[#666666] leading-tight">Wishlist Items</div>
                </div>
                <div className="text-center">
                  <div className="text-[20px] lg:text-[24px] font-semibold text-[#8B7355] mb-[4px]">{reviewsWritten}</div>
                  <div className="text-[10px] lg:text-[11px] font-light text-[#666666] leading-tight">Reviews Written</div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Panel */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[32px] mb-5 lg:mb-[24px]">
              <h2 className="text-[20px] md:text-[22px] lg:text-[24px] font-semibold text-[#1A1A1A] mb-5 lg:mb-[24px]">{t('privacyPage.dataControls')}</h2>
              <div className="space-y-0">
                {privacyControls.map((control, idx) => (
                  <div key={control.id} className={`flex items-start justify-between py-5 lg:py-[24px] gap-4 ${idx < privacyControls.length - 1 ? 'border-b border-[#E8E3D9]' : ''}`}>
                    <div className="flex-1">
                      <h3 className="text-[15px] lg:text-[16px] font-medium text-[#1A1A1A] mb-1">{t(`privacyPage.controls.${control.id}.title`)}</h3>
                      <p className="text-[13px] lg:text-[14px] font-normal text-[#666666] leading-[1.6]">{t(`privacyPage.controls.${control.id}.desc`)}</p>
                    </div>
                    <Toggle enabled={control.enabled} onToggle={() => toggleControl(control.id)} />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[32px]">
              <h2 className="text-[20px] md:text-[22px] lg:text-[24px] font-semibold text-[#1A1A1A] mb-5 lg:mb-[24px]">Data Management</h2>
              <div className="flex flex-col sm:flex-row gap-3 lg:gap-[16px] mb-5 lg:mb-[24px]">
                <button className="flex-1 h-[56px] md:h-[60px] lg:h-[64px] bg-white border-[1.5px] border-[#E8E3D9] text-[#666666] text-[15px] lg:text-[16px] font-medium rounded-[8px] flex items-center justify-center gap-2 hover:border-[#8B7355] hover:text-[#8B7355] transition-all">
                  <IoDownloadOutline className="w-[20px] h-[20px]" />
                  {t('privacyPage.download')}
                </button>
                <button className="flex-1 h-[56px] md:h-[60px] lg:h-[64px] bg-white border-[1.5px] border-[#E8E3D9] text-red-500 text-[15px] lg:text-[16px] font-medium rounded-[8px] flex items-center justify-center gap-2 hover:border-red-300 hover:bg-red-50 transition-all">
                  <IoWarningOutline className="w-[20px] h-[20px]" />
                  {t('privacyPage.delete')}
                </button>
              </div>
              <button className="w-full h-[48px] lg:h-[52px] bg-[#8B7355] text-white text-[14px] lg:text-[15px] font-medium rounded-[8px] flex items-center justify-center gap-2 hover:bg-[#7a6448] transition-colors">
                <IoCheckmark className="w-[18px] h-[18px]" />
                {t('privacyPage.save')}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="h-[40px] md:h-[60px] lg:h-[80px]" />

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