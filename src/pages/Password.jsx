import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  IoLockClosedOutline,
  IoShieldCheckmarkOutline,
  IoEyeOutline,
  IoEyeOffOutline,
  IoTimeOutline,
  IoCheckmarkCircle,
  IoCheckmark,
  IoPersonOutline,
  IoBagCheckOutline,
  IoHeartOutline,
  IoSparkles,
  IoRibbonOutline,
  IoCalendarOutline,
  IoStarSharp,
  IoSettingsOutline,
  IoNotificationsOutline,
  IoLocationOutline,
  IoCardOutline,
  IoArrowUp,
  IoMenuOutline,
  IoClose,
} from 'react-icons/io5'
import { securityTips } from '../data/user'
import { useAuth } from '../contexts/AuthContext'
import { useWishlist } from '../contexts/WishlistContext'
import { supabase } from '../lib/supabase'

const RAW_NAVIGATION_ITEMS = [
  { icon: IoPersonOutline, key: 'accountDashboard', label: 'Account Dashboard', path: '/dashboard', active: false },
  { icon: IoBagCheckOutline, key: 'orderHistory', label: 'Order History', path: '/order-tracking', active: false },
  { icon: IoHeartOutline, key: 'myWishlist', label: 'My Wishlist', path: '/wishlist', active: false },
  { icon: IoLocationOutline, key: 'shippingAddresses', label: 'Shipping Addresses', path: '/shipping-address', active: false },
  { icon: IoCardOutline, key: 'paymentMethods', label: 'Payment Methods', path: '/payment-methods', active: false },
  { icon: IoSparkles, key: 'beautyProfile', label: 'Beauty Profile', path: '/skin-analysis', active: false },
  { icon: IoRibbonOutline, key: 'loyaltyProgram', label: 'Loyalty Program', path: '/account', active: false },
  { icon: IoCalendarOutline, key: 'myRoutines', label: 'My Routines', path: '/beauty-journey', active: false },
  { icon: IoStarSharp, key: 'reviewsRatings', label: 'Reviews & Ratings', path: '/dashboard', active: false },
  { icon: IoSettingsOutline, key: 'accountSettings', label: 'Account Settings', path: '/privacy-settings', active: true },
  { icon: IoNotificationsOutline, key: 'notifications', label: 'Notifications', path: '/notifications', active: false },
]

export default function Password() {
  const { t, i18n } = useTranslation()
  const { user } = useAuth()
  const { wishlistItems } = useWishlist()

  const [totalOrders, setTotalOrders] = useState(0)
  const [loyaltyPoints, setLoyaltyPoints] = useState(0)
  const [reviewsCount, setReviewsCount] = useState(0)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [showDrawer, setShowDrawer] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || t('passwordPage.user')
  const userEmail = user?.email || ''
  const userAvatar = user?.user_metadata?.avatar_url
  const userInitials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
  const wishlistCount = wishlistItems?.length || 0

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return
      try {
        const { data: orders } = await supabase
          .from('orders')
          .select('total_amount')
          .eq('user_id', user.id)

        setTotalOrders(orders?.length || 0)

        const points =
          orders?.reduce((sum, o) => sum + (parseFloat(o.total_amount) || 0), 0) || 0
        setLoyaltyPoints(prev => Math.floor(points))

        const { data: reviews } = await supabase
          .from('reviews')
          .select('id')
          .eq('user_id', user.id)

        setReviewsCount(reviews?.length || 0)
      } catch (err) {
        console.error('Error fetching stats:', err)
      }
    }

    fetchStats()
  }, [user])

  const [current, setCurrent] = useState('')
  const [newPass, setNewPass] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const requirements = [
    {
      text: t('passwordPage.requirements.minLength'),
      met: newPass.length >= 8,
    },
    {
      text: t('passwordPage.requirements.upperLower'),
      met: /[A-Z]/.test(newPass) && /[a-z]/.test(newPass),
    },
    {
      text: t('passwordPage.requirements.number'),
      met: /\d/.test(newPass),
    },
    {
      text: t('passwordPage.requirements.special'),
      met: /[@$!%*?&]/.test(newPass),
    },
    {
      text: t('passwordPage.requirements.notSame'),
      met: newPass.length > 0 && newPass !== current,
    },
    {
      text: t('passwordPage.requirements.match'),
      met: newPass.length > 0 && newPass === confirm,
    },
  ]

  const metCount = requirements.filter((r) => r.met).length
  const strength =
    metCount <= 2
      ? {
          label: t('passwordPage.strength.weak'),
          color: 'text-red-500',
          bar: 'bg-red-400',
          width: '25%',
        }
      : metCount <= 4
        ? {
            label: t('passwordPage.strength.medium'),
            color: 'text-[#E5A84D]',
            bar: 'bg-[#E5A84D]',
            width: '60%',
          }
        : {
            label: t('passwordPage.strength.strong'),
            color: 'text-green-600',
            bar: 'bg-green-500',
            width: '100%',
          }

  const navigationItems = RAW_NAVIGATION_ITEMS.map((item) => ({
    ...item,
    translatedLabel: t(`passwordPage.nav.${item.key}`, { defaultValue: item.label }),
  }))

  const translatedSecurityTips = securityTips.map((tip, idx) =>
    t(`passwordPage.securityTips.${idx}`, { defaultValue: tip })
  )

  const inputClass =
    "w-full bg-white border-[1.5px] border-[#E8E3D9] rounded-[8px] px-[16px] h-[48px] lg:h-[56px] text-[14px] lg:text-[15px] font-normal text-[#1A1A1A] outline-none focus:border-[#8B7355] transition-colors pr-[48px]"

  const membershipLabel =
    loyaltyPoints >= 3000
      ? t('passwordPage.membership.gold')
      : loyaltyPoints >= 2000
        ? t('passwordPage.membership.elite')
        : t('passwordPage.membership.member')

  return (
    <div key={i18n.language} className="bg-white font-['Cormorant_Garamond']">
      {/* ── Breadcrumb ── */}
      <div
        className="min-h-[48px] bg-[#FDFBF7] px-4 md:px-[60px] lg:px-[120px] flex items-center overflow-x-auto"
        style={{ scrollbarWidth: 'none' }}
      >
        <span className="text-[13px] lg:text-[15px] font-normal text-[#8B7355] cursor-pointer whitespace-nowrap">
          {t('passwordPage.breadcrumb.home')}
        </span>
        <span className="text-[13px] lg:text-[15px] font-normal text-[#666666] mx-2">/</span>
        <Link to="/dashboard">
          <span className="hidden sm:inline text-[13px] lg:text-[15px] font-normal text-[#8B7355] cursor-pointer whitespace-nowrap">
            {t('passwordPage.breadcrumb.accountDashboard')}
          </span>
        </Link>
        <span className="hidden sm:inline text-[13px] lg:text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[13px] lg:text-[15px] font-normal text-[#666666] whitespace-nowrap">
          {t('passwordPage.breadcrumb.changePassword')}
        </span>
      </div>

      {/* ── Hero ── */}
      <div className="min-h-[100px] md:min-h-[120px] lg:min-h-[140px] bg-gradient-to-b from-[#FDFBF7] to-white flex flex-col items-center justify-center px-4 md:px-[60px] lg:px-[120px] py-6 md:py-0">
        <div className="max-w-[1200px] w-full relative">
          <h1 className="text-[28px] md:text-[38px] lg:text-[48px] font-semibold text-[#1A1A1A]">
            {t('passwordPage.title')}
          </h1>
          <p className="text-[14px] md:text-[16px] lg:text-[18px] font-normal text-[#666666] mt-[8px]">
            {t('passwordPage.subtitle')}
          </p>
          {/* Mobile drawer trigger */}
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
        </div>
      </div>

      {/* Mobile Drawer */}
      {showDrawer && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowDrawer(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-[300px] bg-white shadow-[4px_0_24px_rgba(0,0,0,0.15)] flex flex-col overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8E3D9] flex-shrink-0">
              <span className="text-[16px] font-semibold text-[#1A1A1A]">{t('passwordPage.nav.accountDashboard')}</span>
              <button onClick={() => setShowDrawer(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F5F1EA]">
                <IoClose className="w-5 h-5 text-[#666666]" />
              </button>
            </div>
            {/* Profile */}
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
                <div className="bg-[#C9A870] text-white text-[11px] font-medium px-[14px] py-[5px] rounded-full mb-3">{membershipLabel}</div>
                <div className="flex items-center gap-2">
                  <IoSparkles className="w-[16px] h-[16px] text-[#C9A870]" />
                  <span className="text-[15px] font-medium text-[#8B7355]">{loyaltyPoints.toLocaleString()} {t('passwordPage.points')}</span>
                </div>
              </div>
            </div>
            {/* Nav */}
            <div className="p-2 border-b border-[#E8E3D9]">
              {navigationItems.map((item) => (
                <Link key={item.key} to={item.path} onClick={() => setShowDrawer(false)}>
                  <div className={`flex items-center justify-between h-[46px] px-3 rounded-[8px] cursor-pointer transition-colors ${item.active ? 'bg-[#FDFBF7]' : 'hover:bg-[#FDFBF7]'}`}>
                    <div className="flex items-center gap-3">
                      <item.icon className={`w-[18px] h-[18px] ${item.active ? 'text-[#8B7355]' : 'text-[#666666]'}`} />
                      <span className={`text-[13px] ${item.active ? 'text-[#8B7355] font-medium' : 'font-normal text-[#2B2B2B]'}`}>{item.translatedLabel}</span>
                    </div>
                    {item.label === 'My Wishlist' && wishlistCount > 0 && (
                      <div className="bg-[#C9A870] text-white text-[10px] font-medium px-[7px] py-[2px] rounded-full">{wishlistCount}</div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
            {/* Stats */}
            <div className="p-5">
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center">
                  <div className="text-[20px] font-semibold text-[#8B7355] mb-1">{totalOrders}</div>
                  <div className="text-[10px] font-light text-[#666666] leading-tight">{t('passwordPage.stats.totalOrders')}</div>
                </div>
                <div className="text-center">
                  <div className="text-[20px] font-semibold text-[#8B7355] mb-1">{wishlistCount}</div>
                  <div className="text-[10px] font-light text-[#666666] leading-tight">{t('passwordPage.stats.wishlistItems')}</div>
                </div>
                <div className="text-center">
                  <div className="text-[20px] font-semibold text-[#8B7355] mb-1">{reviewsCount}</div>
                  <div className="text-[10px] font-light text-[#666666] leading-tight">{t('passwordPage.stats.reviewsWritten')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Main Content ── */}
      <div className="px-4 md:px-[60px] lg:px-[120px] py-6 md:py-10 lg:py-[48px]">
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-[40px]">
          {/* ── Sidebar — desktop only ── */}
          <div className="hidden lg:block w-full lg:w-[320px] lg:flex-shrink-0">
            {/* Profile Card */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 lg:p-[28px] mb-5 lg:mb-[24px]">
              <div className="flex flex-col items-center">
                {userAvatar ? (
                  <img
                    src={userAvatar}
                    alt={t('passwordPage.userAvatar')}
                    className="w-[90px] h-[90px] md:w-[100px] md:h-[100px] lg:w-[120px] lg:h-[120px] rounded-full object-cover border-[3px] border-[#C9A870] mb-4 lg:mb-[16px]"
                  />
                ) : (
                  <div className="w-[90px] h-[90px] md:w-[100px] md:h-[100px] lg:w-[120px] lg:h-[120px] rounded-full bg-gradient-to-br from-[#8B7355] to-[#C9A870] border-[3px] border-[#C9A870] mb-4 lg:mb-[16px] flex items-center justify-center">
                    <span className="text-[28px] md:text-[32px] lg:text-[36px] font-bold text-white">
                      {userInitials}
                    </span>
                  </div>
                )}
                <h2 className="text-[20px] md:text-[22px] lg:text-[24px] font-semibold text-[#1A1A1A] mb-[4px]">
                  {userName}
                </h2>
                <p className="text-[13px] lg:text-[14px] text-[#666666] mb-3">{userEmail}</p>
                <div className="bg-[#C9A870] text-white text-[11px] lg:text-[12px] font-medium px-[14px] lg:px-[16px] py-[5px] lg:py-[6px] rounded-full mb-4 lg:mb-[16px]">
                  {membershipLabel}
                </div>
                <div className="flex items-center gap-[8px]">
                  <IoSparkles className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#C9A870]" />
                  <span className="text-[17px] lg:text-[20px] font-medium text-[#8B7355]">
                    {loyaltyPoints.toLocaleString()} {t('passwordPage.points')}
                  </span>
                </div>
              </div>
            </div>

            {/* Nav Menu */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[8px] mb-5 lg:mb-[24px]">
              {navigationItems.map((item) => (
                <Link key={item.label} to={item.path}>
                  <div
                    className={`flex items-center justify-between h-[48px] lg:h-[56px] px-3 lg:px-[20px] rounded-[8px] cursor-pointer transition-colors ${
                      item.active ? 'bg-[#FDFBF7]' : 'hover:bg-[#FDFBF7]'
                    }`}
                  >
                    <div className="flex items-center gap-3 lg:gap-[16px]">
                      <item.icon
                        className={`w-[20px] h-[20px] lg:w-[22px] lg:h-[22px] ${
                          item.active ? 'text-[#8B7355]' : 'text-[#666666]'
                        }`}
                      />
                      <span
                        className={`text-[13px] lg:text-[15px] ${
                          item.active ? 'text-[#8B7355] font-medium' : 'font-normal text-[#2B2B2B]'
                        }`}
                      >
                        {item.translatedLabel}
                      </span>
                    </div>
                    {item.label === 'My Wishlist' && wishlistCount > 0 ? (
                      <div className="bg-[#C9A870] text-white text-[10px] lg:text-[11px] font-medium px-[7px] lg:px-[8px] py-[2px] rounded-full">
                        {wishlistCount}
                      </div>
                    ) : item.label === 'Loyalty Program' && loyaltyPoints > 0 ? (
                      <div className="bg-[#8B7355] text-white text-[10px] lg:text-[11px] font-medium px-[7px] lg:px-[8px] py-[2px] rounded-full">
                        {loyaltyPoints.toLocaleString()}
                      </div>
                    ) : null}
                  </div>
                </Link>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 lg:p-[24px]">
              <div className="grid grid-cols-3 gap-3 lg:gap-[16px]">
                {[
                  { label: t('passwordPage.stats.totalOrders'), value: totalOrders },
                  { label: t('passwordPage.stats.wishlistItems'), value: wishlistCount },
                  { label: t('passwordPage.stats.reviewsWritten'), value: reviewsCount },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-[20px] lg:text-[24px] font-semibold text-[#8B7355] mb-[4px]">
                      {stat.value}
                    </div>
                    <div className="text-[10px] lg:text-[11px] font-light text-[#666666] leading-tight">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Main Panel ── */}
          <div className="flex-1 min-w-0">
            {/* Info Banner */}
            <div className="bg-[#F5F1EA] rounded-[12px] p-4 lg:p-[24px] flex items-center gap-4 lg:gap-[16px] mb-5 lg:mb-[24px]">
              <IoLockClosedOutline className="w-[24px] h-[24px] lg:w-[28px] lg:h-[28px] text-[#8B7355] flex-shrink-0" />
              <p className="text-[13px] lg:text-[15px] font-normal text-[#666666] leading-[1.6]">
                {t('passwordPage.infoBanner')}
              </p>
            </div>

            {/* Form */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[32px] mb-5 lg:mb-[24px]">
              <h2 className="text-[18px] md:text-[20px] lg:text-[24px] font-semibold text-[#1A1A1A] mb-5 lg:mb-[24px]">
                {t('passwordPage.updatePassword')}
              </h2>
              <div className="space-y-5 lg:space-y-[20px]">
                {/* Current Password */}
                <div>
                  <label className="text-[14px] lg:text-[16px] font-medium text-[#1A1A1A] block mb-3 lg:mb-[12px]">
                    {t('passwordPage.currentPassword')}
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrent ? 'text' : 'password'}
                      value={current}
                      onChange={(e) => setCurrent(e.target.value)}
                      placeholder={t('passwordPage.placeholders.currentPassword')}
                      className={inputClass}
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrent(!showCurrent)}
                      className="absolute right-[16px] top-1/2 -translate-y-1/2 cursor-pointer"
                    >
                      {showCurrent ? (
                        <IoEyeOffOutline className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#666666]" />
                      ) : (
                        <IoEyeOutline className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#666666]" />
                      )}
                    </button>
                  </div>
                  <span className="text-[12px] lg:text-[13px] font-normal text-[#8B7355] underline cursor-pointer hover:text-[#7a6448] transition-colors inline-block mt-[8px]">
                    {t('passwordPage.forgotPassword')}
                  </span>
                </div>

                {/* New Password */}
                <div>
                  <label className="text-[14px] lg:text-[16px] font-medium text-[#1A1A1A] block mb-3 lg:mb-[12px]">
                    {t('passwordPage.newPassword')}
                  </label>
                  <div className="relative">
                    <input
                      type={showNew ? 'text' : 'password'}
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      placeholder={t('passwordPage.placeholders.newPassword')}
                      className={inputClass}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNew(!showNew)}
                      className="absolute right-[16px] top-1/2 -translate-y-1/2 cursor-pointer"
                    >
                      {showNew ? (
                        <IoEyeOffOutline className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#666666]" />
                      ) : (
                        <IoEyeOutline className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#666666]" />
                      )}
                    </button>
                  </div>
                  {newPass.length > 0 && (
                    <div className="mt-[10px]">
                      <div className="w-full h-[6px] bg-[#F5F1EA] rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${strength.bar}`}
                          style={{ width: strength.width }}
                        />
                      </div>
                      <div className="flex justify-end mt-[4px]">
                        <span className={`text-[12px] lg:text-[13px] font-medium ${strength.color}`}>
                          {t('passwordPage.strength.label')}: {strength.label}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="text-[14px] lg:text-[16px] font-medium text-[#1A1A1A] block mb-3 lg:mb-[12px]">
                    {t('passwordPage.confirmNewPassword')}
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirm ? 'text' : 'password'}
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      placeholder={t('passwordPage.placeholders.confirmPassword')}
                      className={inputClass}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-[16px] top-1/2 -translate-y-1/2 cursor-pointer"
                    >
                      {showConfirm ? (
                        <IoEyeOffOutline className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#666666]" />
                      ) : (
                        <IoEyeOutline className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#666666]" />
                      )}
                    </button>
                  </div>
                  {confirm.length > 0 && newPass !== confirm && (
                    <p className="text-[12px] lg:text-[13px] text-red-500 mt-[6px]">
                      {t('passwordPage.passwordsDoNotMatch')}
                    </p>
                  )}
                  {confirm.length > 0 && newPass === confirm && (
                    <p className="text-[12px] lg:text-[13px] text-green-600 mt-[6px] flex items-center gap-1">
                      <IoCheckmarkCircle className="w-[13px] h-[13px] lg:w-[14px] lg:h-[14px]" />
                      {t('passwordPage.passwordsMatch')}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-[#F5F1EA] rounded-[12px] p-4 lg:p-[24px] mb-5 lg:mb-[24px]">
              <h3 className="text-[14px] lg:text-[16px] font-medium text-[#1A1A1A] mb-4 lg:mb-[16px]">
                {t('passwordPage.passwordRequirements')}
              </h3>
              <div className="space-y-[10px]">
                {requirements.map((req, idx) => (
                  <div key={idx} className="flex items-center gap-3 lg:gap-[12px]">
                    <IoCheckmarkCircle
                      className={`w-[15px] h-[15px] lg:w-[16px] lg:h-[16px] flex-shrink-0 transition-colors ${
                        req.met ? 'text-green-600' : 'text-[#E8E3D9]'
                      }`}
                    />
                    <span
                      className={`text-[12px] lg:text-[14px] font-normal transition-colors ${
                        req.met ? 'text-[#1A1A1A]' : 'text-[#999999]'
                      }`}
                    >
                      {req.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Tips */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 lg:p-[28px] mb-5 lg:mb-[24px]">
              <h2 className="text-[17px] md:text-[18px] lg:text-[20px] font-semibold text-[#1A1A1A] mb-4 lg:mb-[20px]">
                {t('passwordPage.securityTipsTitle')}
              </h2>
              <div className="space-y-[12px] lg:space-y-[14px]">
                {translatedSecurityTips.map((tip, idx) => (
                  <div key={idx} className="flex items-start gap-3 lg:gap-[12px]">
                    <IoShieldCheckmarkOutline className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#8B7355] flex-shrink-0 mt-[2px]" />
                    <p className="text-[13px] lg:text-[14px] font-normal text-[#666666]">{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 lg:gap-[16px] mb-5 lg:mb-[24px]">
              <Link to="/dashboard" className="flex-1">
                <button className="w-full h-[48px] lg:h-[56px] bg-white border-[1.5px] border-[#E8E3D9] text-[#666666] text-[14px] lg:text-[16px] font-medium rounded-[8px] cursor-pointer hover:border-[#8B7355] hover:text-[#8B7355] transition-all">
                  {t('passwordPage.cancel')}
                </button>
              </Link>
              <button className="flex-1 h-[48px] lg:h-[56px] bg-[#8B7355] text-white text-[14px] lg:text-[16px] font-medium rounded-[8px] cursor-pointer hover:bg-[#7a6448] transition-colors flex items-center justify-center gap-2">
                <IoCheckmark className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px]" />
                {t('passwordPage.updatePasswordButton')}
              </button>
            </div>

            {/* Last Changed */}
            <div className="bg-[#FDFBF7] rounded-[12px] p-4 lg:p-[20px] flex items-center gap-3 lg:gap-[12px] mb-5 lg:mb-[24px]">
              <IoTimeOutline className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#8B7355] flex-shrink-0" />
              <span className="text-[12px] lg:text-[14px] font-normal text-[#666666]">
                {t('passwordPage.lastPasswordChange')}
              </span>
            </div>

            {/* Security Badge */}
            <div className="bg-[#F5F1EA] rounded-[12px] p-4 lg:p-[16px] flex items-center gap-3 lg:gap-[12px]">
              <IoShieldCheckmarkOutline className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#8B7355] flex-shrink-0" />
              <p className="text-[12px] lg:text-[13px] font-normal text-[#666666] leading-[1.6]">
                {t('passwordPage.securityBadge')}
              </p>
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