import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  IoNotificationsOutline,
  IoShieldCheckmarkOutline,
  IoChevronDown,
  IoCheckmark,
  IoPersonOutline,
  IoBagCheckOutline,
  IoHeartOutline,
  IoSparkles,
  IoRibbonOutline,
  IoCalendarOutline,
  IoStarSharp,
  IoSettingsOutline,
  IoLocationOutline,
  IoCardOutline,
  IoBodyOutline,
  IoBookOutline,
} from 'react-icons/io5'
import { newsletterOptions } from '../data/user'
import { useAuth } from '../contexts/AuthContext'
import { useWishlist } from '../contexts/WishlistContext'
import { supabase } from '../lib/supabase'

export default function Notifications() {
  const { user } = useAuth()
  const { wishlistItems } = useWishlist()

  const [loyaltyPoints, setLoyaltyPoints] = useState(0)
  const [totalOrders, setTotalOrders] = useState(0)
  const [reviewsWritten, setReviewsWritten] = useState(0)

  useEffect(() => {
    if (user) {
      fetchUserStats()
    }
  }, [user])

  const fetchUserStats = async () => {
    const { data: orders } = await supabase
      .from('orders')
      .select('total')
      .eq('user_id', user.id)

    if (orders) {
      setTotalOrders(orders.length)
      const points = orders.reduce((sum, order) => sum + Math.floor(order.total), 0)
      setLoyaltyPoints(points)
    }

    const { data: reviews } = await supabase
      .from('reviews')
      .select('id')
      .eq('user_id', user.id)

    if (reviews) {
      setReviewsWritten(reviews.length)
    }
  }

  const getMembershipTier = (points) => {
    if (points >= 5000) return 'Gold Member'
    if (points >= 2000) return 'Elite Member'
    return 'Member'
  }

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Guest'
  const userInitials = userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  const membershipTier = getMembershipTier(loyaltyPoints)

  const navigationItems = [
    { label: 'Account Dashboard', icon: IoPersonOutline, path: '/dashboard', active: false },
    { label: 'Order History', icon: IoBagCheckOutline, path: '/order-tracking', active: false },
    { label: 'My Wishlist', icon: IoHeartOutline, path: '/wishlist', active: false, badge: wishlistItems.length > 0 ? wishlistItems.length : null },
    { label: 'Shipping Addresses', icon: IoLocationOutline, path: '/shipping-address', active: false },
    { label: 'Payment Methods', icon: IoCardOutline, path: '/payment-methods', active: false },
    { label: 'Beauty Profile', icon: IoBodyOutline, path: '/skin-analysis', active: false },
    { label: 'Loyalty Program', icon: IoSparkles, path: '/account', active: false },
    { label: 'My Routines', icon: IoBookOutline, path: '/beauty-journey', active: false },
    { label: 'Reviews & Ratings', icon: IoStarSharp, path: '/dashboard', active: false },
    { label: 'Account Settings', icon: IoSettingsOutline, path: '/privacy-settings', active: false },
    { label: 'Notifications', icon: IoNotificationsOutline, path: '/notifications', active: true },
  ]

  const [email, setEmail] = useState([
    { id: 'order-updates', title: 'Order Updates',       description: 'Shipping confirmations, delivery notifications, and order status',       enabled: true  },
    { id: 'promotions',    title: 'Promotions & Offers', description: 'Exclusive discounts, seasonal sales, and member-only deals',               enabled: true  },
    { id: 'new-arrivals',  title: 'New Arrivals',         description: 'Be first to know about new product launches and collections',              enabled: true  },
    { id: 'beauty-tips',   title: 'Beauty Tips',          description: 'Expert advice, tutorials, and personalized skincare recommendations',      enabled: false },
  ])

  const [sms, setSms] = useState([
    { id: 'order-alerts', title: 'Order Status Alerts',   description: 'Real-time delivery updates and shipping notifications',    enabled: true  },
    { id: 'flash-sales',  title: 'Exclusive Flash Sales', description: 'Limited-time offers sent directly to your phone',          enabled: false },
  ])

  const [push, setPush] = useState([
    { id: 'stock-alerts', title: 'In Stock Alerts',          description: 'Get notified when wishlist items become available',  enabled: true  },
    { id: 'price-drop',   title: 'Price Drop Notifications', description: 'Know when products you love go on sale',             enabled: true  },
    { id: 'events',       title: 'Beauty Events',             description: 'Virtual consultations, masterclasses, and exclusive events', enabled: false },
  ])

  const [newsletter, setNewsletter] = useState('weekly')
  const [frequency, setFrequency]   = useState('Multiple times per week')

  const toggleItem = (list, setList, id) => {
    setList(list.map(item => item.id === id ? { ...item, enabled: !item.enabled } : item))
  }

  const resetAll = () => {
    setEmail(email.map(i => ({ ...i, enabled: true })))
    setSms(sms.map(i => ({ ...i, enabled: false })))
    setPush(push.map(i => ({ ...i, enabled: false })))
    setNewsletter('weekly')
    setFrequency('Multiple times per week')
  }

  const Toggle = ({ enabled, onToggle }) => (
    <div
      onClick={onToggle}
      className={`w-[46px] h-[26px] lg:w-[52px] lg:h-[28px] rounded-full cursor-pointer flex items-center px-[3px] transition-all duration-200 flex-shrink-0 ${enabled ? 'bg-[#8B7355] justify-end' : 'bg-[#E8E3D9] justify-start'}`}
    >
      <div className="w-[20px] h-[20px] lg:w-[22px] lg:h-[22px] rounded-full bg-white shadow-sm" />
    </div>
  )

  const NotificationRow = ({ item, onToggle }) => (
    <div className="flex items-center justify-between py-3 lg:py-[14px] border-b border-[#F5F1EA] last:border-0 gap-4">
      <div className="flex-1 min-w-0">
        <h3 className="text-[14px] lg:text-[16px] font-medium text-[#1A1A1A] mb-[4px]">{item.title}</h3>
        <p className="text-[12px] lg:text-[13px] font-normal text-[#666666]">{item.description}</p>
      </div>
      <Toggle enabled={item.enabled} onToggle={onToggle} />
    </div>
  )

  // newsletterOptions imported from ../data/user

  return (
    <div className="bg-white font-['Cormorant_Garamond']">

      {/* ── Breadcrumb ── */}
      <div className="min-h-[48px] bg-[#FDFBF7] px-4 md:px-[60px] lg:px-[120px] flex items-center overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        <span className="text-[13px] lg:text-[15px] font-normal text-[#8B7355] cursor-pointer whitespace-nowrap">Home</span>
        <span className="text-[13px] lg:text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="hidden sm:inline text-[13px] lg:text-[15px] font-normal text-[#8B7355] cursor-pointer whitespace-nowrap">Account Dashboard</span>
        <span className="hidden sm:inline text-[13px] lg:text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[13px] lg:text-[15px] font-normal text-[#666666] whitespace-nowrap">Notification Preferences</span>
      </div>

      {/* ── Hero ── */}
      <div className="min-h-[100px] md:min-h-[120px] lg:min-h-[140px] bg-gradient-to-b from-[#FDFBF7] to-white flex flex-col items-center justify-center px-4 md:px-[60px] lg:px-[120px] py-6 md:py-0">
        <div className="max-w-[1200px] w-full">
          <h1 className="text-[28px] md:text-[38px] lg:text-[48px] font-semibold text-[#1A1A1A]">Notification Preferences</h1>
          <p className="text-[14px] md:text-[16px] lg:text-[18px] font-normal text-[#666666] mt-[8px]">Customize how you hear from us</p>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="px-4 md:px-[60px] lg:px-[120px] py-6 md:py-10 lg:py-[48px]">
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-[40px]">

          {/* ── Sidebar ── */}
          <div className="w-full lg:w-[320px] lg:flex-shrink-0">

            {/* Profile Card */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 lg:p-[28px] mb-5 lg:mb-[24px]">
              <div className="flex flex-col items-center">
                {user?.user_metadata?.avatar_url ? (
                  <img
                    src={user.user_metadata.avatar_url}
                    alt="User Avatar"
                    className="w-[90px] h-[90px] md:w-[100px] md:h-[100px] lg:w-[120px] lg:h-[120px] rounded-full object-cover border-[3px] border-[#C9A870] mb-4 lg:mb-[16px]"
                  />
                ) : (
                  <div className="w-[90px] h-[90px] md:w-[100px] md:h-[100px] lg:w-[120px] lg:h-[120px] rounded-full bg-[#C9A870] border-[3px] border-[#C9A870] mb-4 lg:mb-[16px] flex items-center justify-center">
                    <span className="text-[32px] md:text-[36px] lg:text-[40px] font-semibold text-white">{userInitials}</span>
                  </div>
                )}
                <h2 className="text-[20px] md:text-[22px] lg:text-[24px] font-semibold text-[#1A1A1A] mb-[4px]">{userName}</h2>
                <div className="bg-[#C9A870] text-white text-[11px] lg:text-[12px] font-medium px-[14px] lg:px-[16px] py-[5px] lg:py-[6px] rounded-full mb-4 lg:mb-[16px]">
                  {membershipTier}
                </div>
                <div className="flex items-center gap-[8px]">
                  <IoSparkles className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#C9A870]" />
                  <span className="text-[17px] lg:text-[20px] font-medium text-[#8B7355]">{loyaltyPoints.toLocaleString()} Points</span>
                </div>
              </div>
            </div>

            {/* Nav Menu */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[8px] mb-5 lg:mb-[24px]">
              {navigationItems.map((item) => (
                <Link key={item.label} to={item.path} className={`flex items-center justify-between h-[48px] lg:h-[56px] px-3 lg:px-[20px] rounded-[8px] cursor-pointer transition-colors ${item.active ? 'bg-[#FDFBF7]' : 'hover:bg-[#FDFBF7]'}`}>
                  <div className="flex items-center gap-3 lg:gap-[16px]">
                    <item.icon className={`w-[20px] h-[20px] lg:w-[22px] lg:h-[22px] ${item.active ? 'text-[#8B7355]' : 'text-[#666666]'}`} />
                    <span className={`text-[13px] lg:text-[15px] ${item.active ? 'text-[#8B7355] font-medium' : 'font-normal text-[#2B2B2B]'}`}>{item.label}</span>
                  </div>
                  {item.badge ? (
                    <div className="bg-[#C9A870] text-white text-[10px] lg:text-[11px] font-medium px-[7px] lg:px-[8px] py-[2px] rounded-full">{item.badge}</div>
                  ) : item.tag ? (
                    <div className="hidden md:block bg-[#8B7355] text-white text-[9px] lg:text-[10px] font-normal px-[7px] lg:px-[8px] py-[2px] rounded-[4px]">{item.tag}</div>
                  ) : null}
                </Link>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 lg:p-[24px]">
              <div className="grid grid-cols-3 gap-3 lg:gap-[16px]">
                <div className="text-center">
                  <div className="text-[20px] lg:text-[24px] font-semibold text-[#8B7355] mb-[4px]">{totalOrders}</div>
                  <div className="text-[10px] lg:text-[11px] font-light text-[#666666] leading-tight">Total Orders</div>
                </div>
                <div className="text-center">
                  <div className="text-[20px] lg:text-[24px] font-semibold text-[#8B7355] mb-[4px]">{wishlistItems.length}</div>
                  <div className="text-[10px] lg:text-[11px] font-light text-[#666666] leading-tight">Wishlist Items</div>
                </div>
                <div className="text-center">
                  <div className="text-[20px] lg:text-[24px] font-semibold text-[#8B7355] mb-[4px]">{reviewsWritten}</div>
                  <div className="text-[10px] lg:text-[11px] font-light text-[#666666] leading-tight">Reviews Written</div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Main Panel ── */}
          <div className="flex-1 min-w-0">

            {/* Info Banner */}
            <div className="bg-[#F5F1EA] rounded-[12px] p-4 lg:p-[24px] flex items-center gap-4 lg:gap-[16px] mb-5 lg:mb-[24px]">
              <IoNotificationsOutline className="w-[24px] h-[24px] lg:w-[28px] lg:h-[28px] text-[#8B7355] flex-shrink-0" />
              <p className="text-[13px] lg:text-[15px] font-normal text-[#666666] leading-[1.6]">
                Stay connected with exclusive offers, product launches, and personalized beauty recommendations.
              </p>
            </div>

            {/* ── Email Notifications ── */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[32px] mb-5 lg:mb-[24px]">
              <h2 className="text-[18px] md:text-[20px] lg:text-[24px] font-semibold text-[#1A1A1A] mb-4 lg:mb-[24px]">Email Notifications</h2>
              <div>
                {email.map(item => (
                  <NotificationRow key={item.id} item={item} onToggle={() => toggleItem(email, setEmail, item.id)} />
                ))}
              </div>
            </div>

            {/* ── SMS Notifications ── */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[32px] mb-5 lg:mb-[24px]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 lg:mb-[24px]">
                <h2 className="text-[18px] md:text-[20px] lg:text-[24px] font-semibold text-[#1A1A1A]">SMS / Text Notifications</h2>
                <span className="text-[11px] lg:text-[13px] font-normal text-[#999999]">Standard messaging rates may apply</span>
              </div>
              <div>
                {sms.map(item => (
                  <NotificationRow key={item.id} item={item} onToggle={() => toggleItem(sms, setSms, item.id)} />
                ))}
              </div>
            </div>

            {/* ── Push Notifications ── */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[32px] mb-5 lg:mb-[24px]">
              <h2 className="text-[18px] md:text-[20px] lg:text-[24px] font-semibold text-[#1A1A1A] mb-[8px]">Push Notifications</h2>
              <p className="text-[12px] lg:text-[13px] font-normal text-[#666666] mb-4 lg:mb-[24px]">Receive instant updates through browser notifications</p>
              <div>
                {push.map(item => (
                  <NotificationRow key={item.id} item={item} onToggle={() => toggleItem(push, setPush, item.id)} />
                ))}
              </div>
            </div>

            {/* ── Newsletter ── */}
            <div className="bg-gradient-to-b from-[#FDFBF7] to-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[32px] mb-5 lg:mb-[24px]">
              <h2 className="text-[18px] md:text-[20px] lg:text-[24px] font-semibold text-[#1A1A1A] mb-4 lg:mb-[24px]">Newsletter Subscription</h2>
              <div className="space-y-4 lg:space-y-[16px]">
                {newsletterOptions.map((option) => (
                  <div
                    key={option.value}
                    onClick={() => setNewsletter(option.value)}
                    className="flex items-start gap-3 lg:gap-[16px] cursor-pointer"
                  >
                    <div className="mt-[2px] flex-shrink-0">
                      <div className={`w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] rounded-full border-[2px] flex items-center justify-center transition-all ${newsletter === option.value ? 'border-[#8B7355] bg-[#8B7355]' : 'border-[#E8E3D9]'}`}>
                        {newsletter === option.value && <div className="w-[6px] h-[6px] lg:w-[8px] lg:h-[8px] rounded-full bg-white" />}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-[14px] lg:text-[16px] font-medium mb-[4px] ${newsletter === option.value ? 'text-[#8B7355]' : 'text-[#1A1A1A]'}`}>{option.label}</h3>
                      <p className="text-[12px] lg:text-[13px] font-normal text-[#666666]">{option.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Email Frequency ── */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[32px] mb-5 lg:mb-[24px]">
              <span className="text-[14px] lg:text-[16px] font-medium text-[#1A1A1A] block mb-3 lg:mb-[12px]">Email Frequency Preference</span>
              <div className="relative">
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="w-full bg-white border-[1.5px] border-[#E8E3D9] rounded-[8px] px-[16px] py-[12px] lg:py-[14px] text-[14px] lg:text-[15px] font-normal text-[#1A1A1A] appearance-none cursor-pointer outline-none focus:border-[#8B7355] transition-colors pr-[44px]"
                >
                  <option>Daily</option>
                  <option>Multiple times per week</option>
                  <option>Weekly</option>
                  <option>Bi-weekly</option>
                  <option>Monthly</option>
                </select>
                <IoChevronDown className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#666666] absolute right-[16px] top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* ── Action Buttons ── */}
            <div className="flex items-center gap-4 lg:gap-[16px] mb-5 lg:mb-[24px]">
              <button
                onClick={resetAll}
                className="flex-1 h-[48px] lg:h-[56px] bg-white border-[1.5px] border-[#E8E3D9] text-[#666666] text-[14px] lg:text-[16px] font-medium rounded-[8px] cursor-pointer hover:border-[#8B7355] hover:text-[#8B7355] transition-all"
              >
                Reset to Default
              </button>
              <button className="flex-1 h-[48px] lg:h-[56px] bg-[#8B7355] text-white text-[14px] lg:text-[16px] font-medium rounded-[8px] cursor-pointer hover:bg-[#7a6448] transition-colors flex items-center justify-center gap-2">
                <IoCheckmark className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px]" />
                Save Preferences
              </button>
            </div>

            {/* Privacy Notice */}
            <div className="bg-[#F5F1EA] rounded-[12px] p-4 lg:p-[16px] flex items-center gap-3 lg:gap-[12px]">
              <IoShieldCheckmarkOutline className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#8B7355] flex-shrink-0" />
              <p className="text-[12px] lg:text-[13px] font-normal text-[#666666] leading-[1.6]">
                You can update these preferences anytime. We respect your privacy and will never share your information.
              </p>
            </div>

          </div>
        </div>
      </div>

      <div className="h-[40px] md:h-[60px] lg:h-[80px]" />
    </div>
  )
}