import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
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
  IoRibbonOutline,
  IoCalendarOutline,
  IoStarSharp,
  IoSettingsOutline,
  IoNotificationsOutline,
  IoLocationOutline,
  IoCardOutline,
  IoBodyOutline,
  IoBookOutline,
  IoRocketOutline,
} from 'react-icons/io5'
import { useAuth } from '../contexts/AuthContext'
import { useWishlist } from '../contexts/WishlistContext'
import { supabase } from '../lib/supabase'

export default function Privacy() {
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
    { label: 'Account Settings', icon: IoSettingsOutline, path: '/privacy-settings', active: true },
    { label: 'Notifications', icon: IoNotificationsOutline, path: '/notifications', active: false },
  ]

  const [privacyControls, setPrivacyControls] = useState([
    { id: 'personal-data', title: 'Personal Data Usage',             description: 'Allow Shan Loray to personalize your experience',  enabled: true  },
    { id: 'marketing',     title: 'Marketing Communications Consent', description: 'Receive personalized product recommendations',      enabled: true  },
    { id: 'cookies',       title: 'Cookies & Tracking',               description: 'Accept cookies for enhanced browsing experience',   enabled: true  },
    { id: 'third-party',   title: 'Third-Party Data Sharing',         description: 'Share data with trusted beauty partners',           enabled: false },
  ])

  const [twoFactorEnabled, setTwoFactorEnabled]   = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const toggleControl = (id) => {
    setPrivacyControls(privacyControls.map(c => c.id === id ? { ...c, enabled: !c.enabled } : c))
  }

  const Toggle = ({ enabled, onToggle }) => (
    <div
      onClick={onToggle}
      className={`w-[46px] h-[26px] lg:w-[52px] lg:h-[28px] rounded-full cursor-pointer flex items-center px-[3px] transition-all duration-200 flex-shrink-0 ${enabled ? 'bg-[#8B7355] justify-end' : 'bg-[#E8E3D9] justify-start'}`}
    >
      <div className="w-[20px] h-[20px] lg:w-[22px] lg:h-[22px] rounded-full bg-white shadow-sm" />
    </div>
  )

  return (
    <div className="bg-white font-['Cormorant_Garamond']">

      {/* ── Breadcrumb ── */}
      <div className="min-h-[48px] bg-[#FDFBF7] px-4 md:px-[60px] lg:px-[120px] flex items-center overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        <span className="text-[13px] lg:text-[15px] font-normal text-[#8B7355] cursor-pointer whitespace-nowrap">Home</span>
        <span className="text-[13px] lg:text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="hidden sm:inline text-[13px] lg:text-[15px] font-normal text-[#8B7355] cursor-pointer whitespace-nowrap">Account Dashboard</span>
        <span className="hidden sm:inline text-[13px] lg:text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[13px] lg:text-[15px] font-normal text-[#666666] whitespace-nowrap">Privacy Settings</span>
      </div>

      {/* ── Hero ── */}
      <div className="min-h-[100px] md:min-h-[120px] lg:min-h-[140px] bg-gradient-to-b from-[#FDFBF7] to-white flex flex-col items-center justify-center px-4 md:px-[60px] lg:px-[120px] py-6 md:py-0">
        <div className="max-w-[1200px] w-full">
          <h1 className="text-[28px] md:text-[38px] lg:text-[48px] font-semibold text-[#1A1A1A]">Privacy Settings</h1>
          <p className="text-[14px] md:text-[16px] lg:text-[18px] font-normal text-[#666666] mt-[8px]">Manage your data privacy and security preferences</p>
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
              <IoShieldCheckmarkOutline className="w-[24px] h-[24px] lg:w-[28px] lg:h-[28px] text-[#8B7355] flex-shrink-0" />
              <p className="text-[13px] lg:text-[15px] font-normal text-[#666666] leading-[1.6]">
                Your privacy is important to us. Control how your data is collected, used, and shared.
              </p>
            </div>

            {/* ── Data Privacy Controls ── */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[32px] mb-5 lg:mb-[24px]">
              <h2 className="text-[18px] md:text-[20px] lg:text-[24px] font-semibold text-[#1A1A1A] mb-4 lg:mb-[24px]">Data Privacy Controls</h2>
              <div>
                {privacyControls.map((control) => (
                  <div key={control.id} className="flex items-center justify-between py-3 lg:py-[14px] border-b border-[#F5F1EA] last:border-0 gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[14px] lg:text-[16px] font-medium text-[#1A1A1A] mb-[4px]">{control.title}</h3>
                      <p className="text-[12px] lg:text-[13px] font-normal text-[#666666]">{control.description}</p>
                    </div>
                    <Toggle enabled={control.enabled} onToggle={() => toggleControl(control.id)} />
                  </div>
                ))}
              </div>
            </div>

            {/* ── Account Security ── */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[32px] mb-5 lg:mb-[24px]">
              <h2 className="text-[18px] md:text-[20px] lg:text-[24px] font-semibold text-[#1A1A1A] mb-4 lg:mb-[24px]">Account Security</h2>
              <div className="space-y-[4px]">

                {/* Change Password */}
                <div className="flex items-center justify-between py-4 lg:py-[16px] border-b border-[#F5F1EA] gap-3">
                  <div className="flex items-center gap-3 lg:gap-[16px]">
                    <div className="w-[40px] h-[40px] lg:w-[48px] lg:h-[48px] rounded-full bg-[#FDFBF7] flex items-center justify-center flex-shrink-0">
                      <IoLockClosedOutline className="w-[20px] h-[20px] lg:w-[24px] lg:h-[24px] text-[#8B7355]" />
                    </div>
                    <div>
                      <h3 className="text-[14px] lg:text-[16px] font-medium text-[#1A1A1A] mb-[4px]">Change Password</h3>
                      <p className="text-[12px] lg:text-[13px] font-normal text-[#666666]">Update your account password</p>
                    </div>
                  </div>
                  <button className="flex-shrink-0 bg-white border-[1.5px] border-[#E8E3D9] text-[#666666] text-[12px] lg:text-[14px] font-medium px-4 lg:px-[24px] py-[8px] lg:py-[10px] rounded-[8px] cursor-pointer hover:border-[#8B7355] hover:text-[#8B7355] transition-all">
                    Update
                  </button>
                </div>

                {/* Two-Factor Auth */}
                <div className="flex items-center justify-between py-4 lg:py-[16px] border-b border-[#F5F1EA] gap-3">
                  <div className="flex items-center gap-3 lg:gap-[16px]">
                    <div className="w-[40px] h-[40px] lg:w-[48px] lg:h-[48px] rounded-full bg-[#FDFBF7] flex items-center justify-center flex-shrink-0">
                      <IoShieldCheckmarkOutline className="w-[20px] h-[20px] lg:w-[24px] lg:h-[24px] text-[#8B7355]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[14px] lg:text-[16px] font-medium text-[#1A1A1A] mb-[4px]">Two-Factor Authentication</h3>
                      <p className="text-[12px] lg:text-[13px] font-normal text-[#666666]">
                        {twoFactorEnabled ? 'Currently active — your account is extra secure' : 'Add an extra security layer to your account'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                    className={`flex-shrink-0 text-[12px] lg:text-[14px] font-medium px-4 lg:px-[24px] py-[8px] lg:py-[10px] rounded-[8px] cursor-pointer transition-all flex items-center gap-2 ${twoFactorEnabled ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-[#C9A870] text-white hover:bg-[#b8974f]'}`}
                  >
                    {twoFactorEnabled && <IoCheckmark className="w-[14px] h-[14px] lg:w-[16px] lg:h-[16px]" />}
                    {twoFactorEnabled ? 'Enabled' : 'Enable'}
                  </button>
                </div>

                {/* Login History */}
                <div className="flex items-center justify-between py-4 lg:py-[16px] gap-3">
                  <div className="flex items-center gap-3 lg:gap-[16px]">
                    <div className="w-[40px] h-[40px] lg:w-[48px] lg:h-[48px] rounded-full bg-[#FDFBF7] flex items-center justify-center flex-shrink-0">
                      <IoTimeOutline className="w-[20px] h-[20px] lg:w-[24px] lg:h-[24px] text-[#8B7355]" />
                    </div>
                    <div>
                      <h3 className="text-[14px] lg:text-[16px] font-medium text-[#1A1A1A] mb-[4px]">Login History</h3>
                      <p className="text-[12px] lg:text-[13px] font-normal text-[#666666]">View recent account activity</p>
                    </div>
                  </div>
                  <span className="flex-shrink-0 text-[13px] lg:text-[14px] font-medium text-[#8B7355] cursor-pointer hover:underline">
                    View Details
                  </span>
                </div>
              </div>
            </div>

            {/* ── Data Management ── */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[32px] mb-5 lg:mb-[24px]">
              <h2 className="text-[18px] md:text-[20px] lg:text-[24px] font-semibold text-[#1A1A1A] mb-4 lg:mb-[24px]">Data Management</h2>
              <div className="flex flex-col sm:flex-row gap-3 lg:gap-[16px] mb-4 lg:mb-[16px]">
                <button className="flex-1 h-[48px] lg:h-[56px] bg-white border-[1.5px] border-[#E8E3D9] text-[#666666] text-[13px] lg:text-[15px] font-medium rounded-[8px] cursor-pointer flex items-center justify-center gap-[8px] lg:gap-[10px] hover:border-[#8B7355] hover:text-[#8B7355] transition-all">
                  <IoDownloadOutline className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px]" />
                  Download My Data
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(!showDeleteConfirm)}
                  className="flex-1 h-[48px] lg:h-[56px] bg-white border-[1.5px] border-[#E8E3D9] text-[#C84848] text-[13px] lg:text-[15px] font-medium rounded-[8px] cursor-pointer flex items-center justify-center gap-[8px] lg:gap-[10px] hover:border-[#C84848] hover:bg-red-50 transition-all"
                >
                  <IoWarningOutline className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px]" />
                  Request Account Deletion
                </button>
              </div>

              {showDeleteConfirm && (
                <div className="bg-red-50 border border-red-200 rounded-[8px] p-4 lg:p-[20px] mb-4 lg:mb-[16px]">
                  <p className="text-[13px] lg:text-[14px] font-medium text-red-700 mb-3 lg:mb-[12px]">⚠️ This will permanently delete your account and all associated data. This action cannot be undone.</p>
                  <div className="flex gap-3 lg:gap-[12px]">
                    <button className="h-[40px] px-5 lg:px-[24px] bg-red-600 text-white text-[13px] lg:text-[14px] font-medium rounded-[8px] cursor-pointer hover:bg-red-700 transition-colors">
                      Confirm Deletion
                    </button>
                    <button onClick={() => setShowDeleteConfirm(false)} className="h-[40px] px-5 lg:px-[24px] bg-white border border-red-200 text-red-600 text-[13px] lg:text-[14px] font-medium rounded-[8px] cursor-pointer hover:bg-red-50 transition-colors">
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              <p className="text-[12px] lg:text-[13px] font-normal text-[#999999]">
                Downloaded data includes orders, preferences, and profile information
              </p>
            </div>

            {/* ── Privacy Policy Link ── */}
            <div className="bg-[#F5F1EA] rounded-[12px] p-4 lg:p-[24px] flex items-center gap-4 lg:gap-[16px] mb-5 lg:mb-[24px]">
              <IoDocumentTextOutline className="w-[22px] h-[22px] lg:w-[24px] lg:h-[24px] text-[#8B7355] flex-shrink-0" />
              <div className="flex-1">
                <span className="text-[14px] lg:text-[16px] font-medium text-[#8B7355] underline cursor-pointer hover:text-[#7a6448] transition-colors block mb-[4px]">
                  View Our Complete Privacy Policy
                </span>
                <p className="text-[12px] lg:text-[13px] font-normal text-[#666666]">Last updated: December 2024</p>
              </div>
            </div>

            {/* Save Button */}
            <button className="w-full h-[48px] lg:h-[56px] bg-[#8B7355] text-white text-[15px] lg:text-[16px] font-medium rounded-[8px] cursor-pointer hover:bg-[#7a6448] transition-colors mb-5 lg:mb-[24px] flex items-center justify-center gap-2">
              <IoCheckmark className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px]" />
              Save Preferences
            </button>

            {/* Security Badge */}
            <div className="bg-[#F5F1EA] rounded-[12px] p-4 lg:p-[16px] flex items-center gap-3 lg:gap-[12px]">
              <IoShieldCheckmarkOutline className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#8B7355] flex-shrink-0" />
              <p className="text-[12px] lg:text-[13px] font-normal text-[#666666] leading-[1.6]">
                All changes are encrypted and secured with bank-level security protocols.
              </p>
            </div>

          </div>
        </div>
      </div>

      <div className="h-[40px] md:h-[60px] lg:h-[80px]" />
    </div>
  )
}