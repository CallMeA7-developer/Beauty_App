import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  IoCheckmarkCircle,
  IoCameraOutline,
  IoCheckmark,
  IoMailOutline,
  IoPhonePortraitOutline,
  IoShieldCheckmarkOutline,
  IoChevronDown,
  IoLockClosedOutline,
  IoChevronForward,
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
} from 'react-icons/io5'
import { useAuth } from '../contexts/AuthContext'
import { useWishlist } from '../contexts/WishlistContext'
import { supabase } from '../lib/supabase'

const navigationItems = [
  { icon: IoPersonOutline,        label: 'Account Dashboard', path: '/dashboard',        active: false },
  { icon: IoBagCheckOutline,      label: 'Order History',     path: '/order-tracking',   active: false },
  { icon: IoHeartOutline,         label: 'My Wishlist',       path: '/wishlist',         active: false },
  { icon: IoLocationOutline,      label: 'Shipping Addresses',path: '/shipping-address', active: false },
  { icon: IoCardOutline,          label: 'Payment Methods',   path: '/payment-methods',  active: false },
  { icon: IoSparkles,             label: 'Beauty Profile',    path: '/skin-analysis',    active: false },
  { icon: IoRibbonOutline,        label: 'Loyalty Program',   path: '/account',          active: false },
  { icon: IoCalendarOutline,      label: 'My Routines',       path: '/beauty-journey',   active: false },
  { icon: IoStarSharp,            label: 'Reviews & Ratings', path: '/dashboard',        active: false },
  { icon: IoSettingsOutline,      label: 'Account Settings',  path: '/privacy-settings', active: false },
  { icon: IoNotificationsOutline, label: 'Notifications',     path: '/notifications',    active: false },
]

export default function EditProfile() {
  const { user } = useAuth()
  const { wishlistItems } = useWishlist()
  const [totalOrders, setTotalOrders]     = useState(0)
  const [loyaltyPoints, setLoyaltyPoints] = useState(0)
  const [reviewsCount, setReviewsCount]   = useState(0)
  const [firstName, setFirstName]         = useState('')
  const [lastName, setLastName]           = useState('')
  const [phone, setPhone]                 = useState('')
  const [saving, setSaving]               = useState(false)
  const [success, setSuccess]             = useState(false)

  const userName     = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'
  const userEmail    = user?.email || ''
  const userAvatar   = user?.user_metadata?.avatar_url
  const userInitials = userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  const wishlistCount = wishlistItems?.length || 0

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return
      try {
        const { data: orders } = await supabase
          .from('orders').select('total_amount').eq('user_id', user.id)
        setTotalOrders(orders?.length || 0)
        const points = orders?.reduce((sum, o) => sum + (parseFloat(o.total_amount) || 0), 0) || 0
        setLoyaltyPoints(Math.floor(points))
        const { data: reviews } = await supabase
          .from('reviews').select('id').eq('user_id', user.id)
        setReviewsCount(reviews?.length || 0)
        const { data: profile } = await supabase
          .from('profiles').select('*').eq('user_id', user.id).single()
        if (profile) {
          const nameParts = (profile.full_name || userName).split(' ')
          setFirstName(nameParts[0] || '')
          setLastName(nameParts.slice(1).join(' ') || '')
          setPhone(profile.phone || '')
        } else {
          const nameParts = userName.split(' ')
          setFirstName(nameParts[0] || '')
          setLastName(nameParts.slice(1).join(' ') || '')
        }
      } catch (err) {
        console.error('Error fetching data:', err)
      }
    }
    fetchData()
  }, [user])

  const handleSave = async () => {
    if (!user) return
    setSaving(true)
    try {
      await supabase.from('profiles').upsert({
        user_id: user.id,
        full_name: `${firstName} ${lastName}`.trim(),
        phone,
      })
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      console.error('Error saving profile:', err)
    } finally {
      setSaving(false)
    }
  }

  const Toggle = ({ enabled }) => (
    <div className={`w-[44px] h-[26px] lg:w-[48px] lg:h-[28px] ${enabled ? 'bg-[#C9A870]' : 'bg-[#E8E3D9]'} rounded-full flex items-center px-[2px] cursor-pointer flex-shrink-0`}>
      <div className={`w-[22px] h-[22px] lg:w-[24px] lg:h-[24px] bg-white rounded-full transition-all duration-200 ${enabled ? 'ml-auto' : ''}`} />
    </div>
  )

  const inputClass = "w-full h-[48px] lg:h-[52px] bg-white border border-[#E8E3D9] rounded-[8px] px-[16px] text-[14px] lg:text-[16px] font-normal text-[#2B2B2B] outline-none focus:border-[#8B7355] transition-colors"
  const labelClass = "text-[13px] lg:text-[14px] font-normal text-[#666666] mb-[8px] block"

  return (
    <div className="bg-white font-['Cormorant_Garamond']">

      {/* ── Main Content ── */}
      <div className="px-4 md:px-[60px] lg:px-[120px] py-6 md:py-10 lg:py-[48px]">
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-[40px]">

          {/* ── Sidebar ── */}
          <div className="w-full lg:w-[320px] lg:flex-shrink-0">

            {/* Profile Card */}
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
                  {loyaltyPoints >= 3000 ? 'Gold Member' : loyaltyPoints >= 2000 ? 'Elite Member' : 'Member'}
                </div>
                <div className="flex items-center gap-[8px]">
                  <IoSparkles className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#C9A870]" />
                  <span className="text-[17px] lg:text-[20px] font-medium text-[#8B7355]">{loyaltyPoints.toLocaleString()} Points</span>
                </div>
              </div>
            </div>

            {/* Nav Menu */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[8px]">
              {navigationItems.map((item) => (
                <Link key={item.label} to={item.path}>
                  <div className={`flex items-center justify-between h-[48px] lg:h-[56px] px-3 lg:px-[20px] rounded-[8px] cursor-pointer transition-colors ${item.active ? 'bg-[#FDFBF7]' : 'hover:bg-[#FDFBF7]'}`}>
                    <div className="flex items-center gap-3 lg:gap-[16px]">
                      <item.icon className={`w-[20px] h-[20px] lg:w-[22px] lg:h-[22px] ${item.active ? 'text-[#8B7355]' : 'text-[#666666]'}`} />
                      <span className={`text-[13px] lg:text-[15px] ${item.active ? 'text-[#8B7355] font-medium' : 'font-normal text-[#2B2B2B]'}`}>{item.label}</span>
                    </div>
                    {item.label === 'My Wishlist' && wishlistCount > 0 ? (
                      <div className="bg-[#C9A870] text-white text-[10px] lg:text-[11px] font-medium px-[7px] lg:px-[8px] py-[2px] rounded-full">{wishlistCount}</div>
                    ) : item.label === 'Loyalty Program' && loyaltyPoints > 0 ? (
                      <div className="bg-[#8B7355] text-white text-[10px] lg:text-[11px] font-medium px-[7px] lg:px-[8px] py-[2px] rounded-full">{loyaltyPoints.toLocaleString()}</div>
                    ) : null}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* ── Edit Form ── */}
          <div className="flex-1 min-w-0">

            {/* Breadcrumb */}
            <div className="text-[12px] lg:text-[13px] font-light text-[#666666] mb-4 lg:mb-[16px]">
              Home / Account Dashboard / Edit Personal Information
            </div>

            {/* Page Header */}
            <h1 className="text-[24px] md:text-[30px] lg:text-[36px] font-semibold text-[#1A1A1A] mb-[8px]">Edit Personal Information</h1>
            <p className="text-[14px] lg:text-[16px] font-normal text-[#666666] mb-6 lg:mb-[32px]">Update your account details and preferences</p>

            {/* Profile Photo */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[32px] mb-5 lg:mb-[24px]">
              <div className="flex flex-col items-center">
                <div className="relative mb-4 lg:mb-[20px]">
                  {userAvatar ? (
                    <img src={userAvatar} alt="Profile" className="w-[120px] h-[120px] md:w-[140px] md:h-[140px] lg:w-[160px] lg:h-[160px] rounded-full object-cover border-[3px] border-[#C9A870]" />
                  ) : (
                    <div className="w-[120px] h-[120px] md:w-[140px] md:h-[140px] lg:w-[160px] lg:h-[160px] rounded-full bg-gradient-to-br from-[#8B7355] to-[#C9A870] border-[3px] border-[#C9A870] flex items-center justify-center">
                      <span className="text-[40px] md:text-[48px] lg:text-[56px] font-bold text-white">{userInitials}</span>
                    </div>
                  )}
                  <button className="absolute bottom-2 right-2 w-[36px] h-[36px] lg:w-[40px] lg:h-[40px] bg-[#8B7355] text-white rounded-full flex items-center justify-center shadow-md hover:bg-[#7a6448] transition-colors">
                    <IoCameraOutline className="w-[17px] h-[17px] lg:w-[20px] lg:h-[20px]" />
                  </button>
                </div>
                <div className="flex items-center gap-4 lg:gap-[16px] mb-3 lg:mb-[12px]">
                  <button className="flex items-center gap-[8px] border border-[#8B7355] text-[#8B7355] text-[13px] lg:text-[14px] font-medium px-5 lg:px-[24px] py-[9px] lg:py-[10px] rounded-[8px] cursor-pointer hover:bg-[#8B7355] hover:text-white transition-all">
                    <IoCameraOutline className="w-[16px] h-[16px] lg:w-[18px] lg:h-[18px]" />
                    Change Photo
                  </button>
                  <button className="text-[13px] lg:text-[14px] font-normal text-[#999999] cursor-pointer hover:text-red-400 transition-colors">
                    Remove Photo
                  </button>
                </div>
                <p className="text-[11px] lg:text-[12px] font-light text-[#999999]">JPG or PNG. Max size of 5MB</p>
              </div>
            </div>

            {/* Personal Details Form */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[32px] mb-5 lg:mb-[24px]">
              <h3 className="text-[17px] md:text-[18px] lg:text-[20px] font-semibold text-[#1A1A1A] mb-5 lg:mb-[24px]">Personal Details</h3>

              {/* First & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-[24px] mb-5 lg:mb-[24px]">
                <div>
                  <label className={labelClass}>First Name</label>
                  <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Last Name</label>
                  <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className={inputClass} />
                </div>
              </div>

              {/* Email */}
              <div className="mb-5 lg:mb-[24px]">
                <label className={labelClass}>Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    value={userEmail}
                    readOnly
                    className={inputClass + ' pr-[48px] bg-[#FDFBF7] cursor-not-allowed'}
                  />
                  <IoCheckmarkCircle className="absolute right-[16px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#8B7355]" />
                </div>
                <div className="flex items-center gap-[6px] mt-[8px]">
                  <IoCheckmark className="w-[13px] h-[13px] lg:w-[14px] lg:h-[14px] text-[#8B7355]" />
                  <span className="text-[11px] lg:text-[12px] font-light text-[#8B7355]">Email verified</span>
                </div>
              </div>

              {/* Phone & Birthday */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-[24px] mb-5 lg:mb-[24px]">
                <div>
                  <label className={labelClass}>Phone Number</label>
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Date of Birth</label>
                  <div className="relative">
                    <input
                      type="text"
                      value="N/A"
                      readOnly
                      className={inputClass + ' pr-[48px] bg-[#FDFBF7] cursor-not-allowed'}
                    />
                    <IoCalendarOutline className="absolute right-[16px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#8B7355]" />
                  </div>
                </div>
              </div>

              {/* Gender & Language */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-[24px]">
                <div>
                  <label className={labelClass}>Gender</label>
                  <div className="relative">
                    <select className={inputClass + ' appearance-none cursor-pointer pr-[48px]'}>
                      <option>Female</option>
                      <option>Male</option>
                      <option>Non-binary</option>
                      <option>Prefer not to say</option>
                    </select>
                    <IoChevronDown className="absolute right-[16px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#8B7355] pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Preferred Language</label>
                  <div className="relative">
                    <select className={inputClass + ' appearance-none cursor-pointer pr-[48px]'}>
                      <option>English</option>
                      <option>Russian</option>
                      <option>French</option>
                    </select>
                    <IoChevronDown className="absolute right-[16px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#8B7355] pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Communication Preferences */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[32px] mb-5 lg:mb-[24px]">
              <h3 className="text-[17px] md:text-[18px] lg:text-[20px] font-semibold text-[#1A1A1A] mb-5 lg:mb-[24px]">Communication Preferences</h3>

              <div className="bg-[#FDFBF7] rounded-[8px] p-4 lg:p-[24px] space-y-4 lg:space-y-[20px]">
                {/* Email Notifications */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 lg:gap-[12px]">
                    <IoMailOutline className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#8B7355] mt-[2px] flex-shrink-0" />
                    <div>
                      <div className="text-[14px] lg:text-[15px] font-medium text-[#1A1A1A] mb-[4px]">Email Notifications</div>
                      <div className="text-[12px] lg:text-[13px] font-normal text-[#666666]">Receive updates about orders, new products, and exclusive offers</div>
                    </div>
                  </div>
                  <Toggle enabled={true} />
                </div>

                <div className="h-[1px] bg-[#E8E3D9]" />

                {/* SMS Notifications */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 lg:gap-[12px]">
                    <IoPhonePortraitOutline className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#8B7355] mt-[2px] flex-shrink-0" />
                    <div>
                      <div className="text-[14px] lg:text-[15px] font-medium text-[#1A1A1A] mb-[4px]">SMS Notifications</div>
                      <div className="text-[12px] lg:text-[13px] font-normal text-[#666666]">Get text messages for order updates and special promotions</div>
                    </div>
                  </div>
                  <Toggle enabled={false} />
                </div>

                <div className="h-[1px] bg-[#E8E3D9]" />

                {/* Marketing */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 lg:gap-[12px]">
                    <IoSparkles className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#8B7355] mt-[2px] flex-shrink-0" />
                    <div>
                      <div className="text-[14px] lg:text-[15px] font-medium text-[#1A1A1A] mb-[4px]">Marketing Communications</div>
                      <div className="text-[12px] lg:text-[13px] font-normal text-[#666666]">Personalized beauty recommendations and exclusive member offers</div>
                    </div>
                  </div>
                  <Toggle enabled={true} />
                </div>
              </div>

              {/* Privacy Settings Link */}
              <div className="mt-5 lg:mt-[24px] bg-[#FDFBF7] rounded-[8px] p-4 lg:p-[20px] flex items-center justify-between cursor-pointer hover:bg-[#F5F1EA] transition-colors">
                <div className="flex items-center gap-3 lg:gap-[12px]">
                  <IoShieldCheckmarkOutline className="w-[22px] h-[22px] lg:w-[24px] lg:h-[24px] text-[#8B7355]" />
                  <span className="text-[14px] lg:text-[15px] font-medium text-[#1A1A1A]">Manage Privacy Settings</span>
                </div>
                <IoChevronForward className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#8B7355]" />
              </div>
            </div>

            {/* Success Message */}
            {success && (
              <div className="bg-green-50 border border-green-200 rounded-[8px] p-4 mb-4 flex items-center gap-3">
                <IoCheckmarkCircle className="w-[20px] h-[20px] text-green-600 flex-shrink-0" />
                <span className="text-[14px] text-green-700 font-medium">Profile updated successfully!</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center gap-4 lg:gap-[16px] mb-4 lg:mb-[16px]">
              <Link to="/dashboard" className="flex-1">
                <button className="w-full h-[48px] lg:h-[52px] border border-[#E8E3D9] bg-white text-[#666666] text-[14px] lg:text-[15px] font-medium rounded-[8px] cursor-pointer hover:border-[#8B7355] hover:text-[#8B7355] transition-all">
                  Cancel
                </button>
              </Link>
              <button onClick={handleSave} disabled={saving} className="flex-1 h-[48px] lg:h-[52px] bg-[#8B7355] text-white text-[14px] lg:text-[15px] font-semibold rounded-[8px] cursor-pointer hover:bg-[#7a6448] transition-colors flex items-center justify-center gap-[8px] disabled:opacity-70">
                <IoCheckmark className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px]" />
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>

            {/* Security Note */}
            <div className="flex items-center justify-center gap-[8px] mb-8 lg:mb-[40px]">
              <IoLockClosedOutline className="w-[14px] h-[14px] lg:w-[16px] lg:h-[16px] text-[#999999]" />
              <span className="text-[12px] lg:text-[13px] font-light text-[#999999]">Your information is encrypted and secure</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}