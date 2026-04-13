import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import {
  IoPersonOutline,
  IoHeartOutline,
  IoSparkles,
  IoBagCheckOutline,
  IoCalendarOutline,
  IoSettingsOutline,
  IoStarSharp,
  IoRibbonOutline,
  IoDocumentTextOutline,
  IoChevronForward,
  IoCheckmarkCircle,
  IoTrendingUp,
  IoLocationOutline,
  IoCardOutline,
  IoNotificationsOutline,
  IoShieldCheckmarkOutline,
  IoAddCircleOutline,
  IoReloadOutline,
  IoCreateOutline,
  IoLogOutOutline,
  IoCloseOutline,
} from 'react-icons/io5'
import { useAuth } from '../contexts/AuthContext'
import { useWishlist } from '../contexts/WishlistContext'
import { supabase } from '../lib/supabase'
import LoadingSpinner from '../components/LoadingSpinner'

export default function AccountDashboard() {
  const { t, i18n } = useTranslation()
  const { user, signOut } = useAuth()
  const { wishlistItems } = useWishlist()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState(null)
  const [orders, setOrders] = useState([])
  const [skinAnalysis, setSkinAnalysis] = useState(null)
  const [routines, setRoutines] = useState([])
  const [morningProducts, setMorningProducts] = useState([])
  const [eveningProducts, setEveningProducts] = useState([])
  const [reviews, setReviews] = useState([])
  const [addressesCount, setAddressesCount] = useState(0)
  const [loyaltyPoints, setLoyaltyPoints] = useState(0)
  const [editMode, setEditMode] = useState(false)
  const [editFormData, setEditFormData] = useState({ full_name: '', phone: '' })

  useEffect(() => {
    if (user) {
      fetchAllData()
    }
  }, [user])

  useEffect(() => {
    if (!loading && window.location.hash === '#reviews') {
      setTimeout(() => {
        document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' })
      }, 200)
    }
  }, [loading])

  async function fetchAllData() {
    try {
      const [
        profileRes,
        ordersRes,
        skinAnalysisRes,
        routinesRes,
        reviewsRes,
        addressesRes,
      ] = await Promise.all([
        supabase.from('profiles').select('*').eq('user_id', user.id).maybeSingle(),
        supabase.from('orders').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
        supabase.from('skin_analysis').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
        supabase.from('routines').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
        supabase.from('reviews').select('*, products(name, image_url, brand)').eq('user_id', user.id).order('created_at', { ascending: false }).limit(2),
        supabase.from('addresses').select('id').eq('user_id', user.id),
      ])

      if (profileRes.data) {
        setProfile(profileRes.data)
        setEditFormData({ full_name: profileRes.data.full_name || '', phone: profileRes.data.phone || '' })
      }

      if (ordersRes.data) {
        setOrders(ordersRes.data)
        const totalPoints = ordersRes.data.reduce((sum, order) => sum + (parseFloat(order.total_amount || order.total) || 0), 0)
        setLoyaltyPoints(Math.floor(totalPoints))
      }

      if (skinAnalysisRes.data && skinAnalysisRes.data.length > 0) {
        // Pick the latest analysis that has product IDs
        const bestAnalysis = skinAnalysisRes.data.find(a => Array.isArray(a.morning_product_ids) && a.morning_product_ids.length > 0) || skinAnalysisRes.data[0]
        setSkinAnalysis(bestAnalysis)

        // Fetch all products and filter by IDs in JavaScript to avoid Supabase query encoding issues
        const allMorningIds = Array.isArray(bestAnalysis.morning_product_ids) ? bestAnalysis.morning_product_ids.slice(0, 3) : []
        const allEveningIds = Array.isArray(bestAnalysis.evening_product_ids) ? bestAnalysis.evening_product_ids.slice(0, 3) : []
        if (allMorningIds.length > 0) {
          const { data: mProds } = await supabase
            .from('products')
            .select('*')
            .in('id', allMorningIds)
          setMorningProducts(mProds || [])
        }

        if (allEveningIds.length > 0) {
          const { data: eProds } = await supabase
            .from('products')
            .select('*')
            .in('id', allEveningIds)
          setEveningProducts(eProds || [])
        }
      }
      if (routinesRes.data) setRoutines(routinesRes.data)
      if (reviewsRes.data) setReviews(reviewsRes.data)
      if (addressesRes.data) setAddressesCount(addressesRes.data.length)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleSaveProfile() {
    try {
      if (!profile) {
        const { error } = await supabase.from('profiles').insert({
          user_id: user.id,
          full_name: editFormData.full_name,
          phone: editFormData.phone,
        })
        if (error) throw error
      } else {
        const { error } = await supabase.from('profiles').update({
          full_name: editFormData.full_name,
          phone: editFormData.phone,
          updated_at: new Date().toISOString(),
        }).eq('user_id', user.id)
        if (error) throw error
      }
      await fetchAllData()
      setEditMode(false)
    } catch (error) {
      console.error('Error saving profile:', error)
    }
  }

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  const getOrderStatus = (createdAt, deliveryMethod) => {
    const now = new Date()
    const orderDate = new Date(createdAt)
    const oneHourLater = new Date(orderDate.getTime() + 60 * 60 * 1000)
    const deliveryDate = new Date(orderDate)
    let daysToAdd = 5

    if (deliveryMethod?.toLowerCase().includes('express')) {
      daysToAdd = 2
    } else if (deliveryMethod?.toLowerCase().includes('same-day')) {
      daysToAdd = 0
    }

    let addedDays = 0
    while (addedDays < daysToAdd) {
      deliveryDate.setDate(deliveryDate.getDate() + 1)
      const dayOfWeek = deliveryDate.getDay()
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        addedDays++
      }
    }

    if (now >= deliveryDate) return 'Delivered'
    if (now >= oneHourLater) return 'In Transit'
    return 'Processing'
  }

  if (loading) return <LoadingSpinner />

  const userName = user?.user_metadata?.full_name || profile?.full_name || user?.email?.split('@')[0] || 'User'
  const userEmail = user?.email || ''
  const userAvatar = user?.user_metadata?.avatar_url || profile?.avatar_url
  const userInitials = userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  const wishlistCount = wishlistItems?.length || 0

  const profileFields = [
    profile?.full_name || user?.user_metadata?.full_name || '',
    userEmail,
    profile?.phone || '',
    profile?.birthday || '',
  ]
  const filledFields = profileFields.filter(f => f).length
  const profileCompletion = Math.round((filledFields / profileFields.length) * 100)

  const totalOrders = orders.length
  const reviewsCount = reviews.length
  const currentOrders = orders.slice(0, 2)
  const orderHistory = orders.slice(0, 5)
  const displayWishlist = wishlistItems?.slice(0, 4) || []

  const membershipTier = loyaltyPoints >= 3000 ? t('dashboard.memberGold') : loyaltyPoints >= 2000 ? t('dashboard.memberElite') : t('dashboard.member')
  const nextTier = loyaltyPoints >= 3000 ? 'Prestige' : loyaltyPoints >= 2000 ? t('dashboard.memberGold') : t('dashboard.memberElite')
  const nextTierPoints = loyaltyPoints >= 3000 ? 5000 : loyaltyPoints >= 2000 ? 3000 : 2000
  const pointsToNext = Math.max(0, nextTierPoints - loyaltyPoints)
  const progressPercent = loyaltyPoints >= 3000 ? 100 : Math.min(100, (loyaltyPoints / nextTierPoints) * 100)

  const skinAnalysisCompleted = !!skinAnalysis

  const navigationItems = [
    { icon: IoPersonOutline, label: t('dashboard.accountDashboard'), path: '/dashboard', active: true },
    { icon: IoBagCheckOutline, label: t('dashboard.orderHistoryNav'), path: '/order-tracking', active: false },
    { icon: IoHeartOutline, label: t('dashboard.myWishlist'), path: '/wishlist', active: false, badge: wishlistCount > 0 ? `${wishlistCount}` : null },
    { icon: IoLocationOutline, label: t('dashboard.shippingAddresses'), path: '/shipping-address', active: false },
    { icon: IoCardOutline, label: t('dashboard.paymentMethods'), path: '/payment-methods', active: false },
    { icon: IoSparkles, label: t('dashboard.beautyProfileNav'), path: '/skin-analysis', active: false, tag: !skinAnalysisCompleted ? t('dashboard.completeAnalysis') : null },
    { icon: IoRibbonOutline, label: t('dashboard.loyaltyProgramNav'), path: '/dashboard', active: false, badge: loyaltyPoints > 0 ? `${loyaltyPoints}` : null },
    { icon: IoCalendarOutline, label: t('dashboard.myRoutines'), path: '/beauty-journey', active: false },
    { icon: IoStarSharp, label: t('dashboard.reviewsRatings'), path: '/dashboard', active: false },
    { icon: IoSettingsOutline, label: t('dashboard.accountSettingsNav'), path: '/privacy-settings', active: false },
    { icon: IoNotificationsOutline, label: t('dashboard.notifications'), path: '/notifications', active: false },
  ]

  const settingsItems = [
    { icon: IoLocationOutline, label: t('dashboard.shippingAddresses'), path: '/shipping-address', count: addressesCount > 0 ? `${addressesCount} saved` : 'No addresses saved' },
    { icon: IoCardOutline, label: t('dashboard.paymentMethods'), path: '/payment-methods', count: null },
    { icon: IoNotificationsOutline, label: t('dashboard.notificationPrefs'), path: '/notifications', count: null },
    { icon: IoShieldCheckmarkOutline, label: t('dashboard.privacySettings'), path: '/privacy-settings', count: null },
  ]

  return (
    <div key={i18n.language} className="bg-white font-['Cormorant_Garamond']">

      {/* ── Hero Welcome ── */}
      <div className="min-h-[140px] md:min-h-[170px] lg:min-h-[200px] bg-gradient-to-b from-[#FDFBF7] to-white flex flex-col items-center justify-center px-4 md:px-[60px] lg:px-[120px] py-6 md:py-0">
        <div className="max-w-[1200px] w-full">
          <div className="text-[12px] lg:text-[13px] font-light text-[#666666] mb-3 lg:mb-[16px]">{t('dashboard.breadcrumb')}</div>
          <h1 className="text-[28px] md:text-[38px] lg:text-[48px] font-semibold text-[#1A1A1A]">{t('dashboard.welcome')} {userName}</h1>
          <p className="text-[14px] md:text-[16px] lg:text-[18px] font-normal text-[#666666] mt-[8px]">{t('dashboard.subtitle')}</p>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="px-4 md:px-[60px] lg:px-[120px] py-6 md:py-10 lg:py-[48px]">
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-[40px]">

          {/* ── Left Sidebar ── */}
          <div className="w-full lg:w-[320px] lg:flex-shrink-0">
            {/* Profile Card */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 lg:p-[28px] mb-5 lg:mb-[24px]">
              <div className="flex flex-col items-center">
                {userAvatar ? (
                  <img
                    src={userAvatar}
                    alt="User Avatar"
                    className="w-[90px] h-[90px] md:w-[100px] md:h-[100px] lg:w-[120px] lg:h-[120px] rounded-full object-cover border-[3px] border-[#C9A870] mb-4 lg:mb-[16px]"
                  />
                ) : (
                  <div className="w-[90px] h-[90px] md:w-[100px] md:h-[100px] lg:w-[120px] lg:h-[120px] rounded-full bg-gradient-to-br from-[#8B7355] to-[#C9A870] border-[3px] border-[#C9A870] mb-4 lg:mb-[16px] flex items-center justify-center">
                    <span className="text-[32px] md:text-[36px] lg:text-[42px] font-bold text-white">{userInitials}</span>
                  </div>
                )}
                <h2 className="text-[20px] md:text-[22px] lg:text-[24px] font-semibold text-[#1A1A1A] mb-[4px]">{userName}</h2>
                <p className="text-[13px] lg:text-[14px] text-[#666666] mb-3">{userEmail}</p>
                <div className="bg-[#C9A870] text-white text-[11px] lg:text-[12px] font-medium px-[14px] lg:px-[16px] py-[5px] lg:py-[6px] rounded-full mb-4 lg:mb-[16px]">
                  {membershipTier}
                </div>
                <div className="flex items-center gap-[8px]">
                  <IoSparkles className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#C9A870]" />
                  <span className="text-[17px] lg:text-[20px] font-medium text-[#8B7355]">{loyaltyPoints.toLocaleString()} {t('dashboard.points')}</span>
                </div>
              </div>
            </div>

            {/* Nav Menu */}
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
                    ) : item.tag ? (
                      <div className="hidden md:block bg-[#8B7355] text-white text-[9px] lg:text-[10px] font-normal px-[7px] lg:px-[8px] py-[2px] rounded-[4px]">{item.tag}</div>
                    ) : null}
                  </div>
                </Link>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 lg:p-[24px] mb-5 lg:mb-[24px]">
              <div className="grid grid-cols-3 gap-3 lg:gap-[16px]">
                <div className="text-center">
                  <div className="text-[20px] lg:text-[24px] font-semibold text-[#8B7355] mb-[4px]">{totalOrders}</div>
                  <div className="text-[10px] lg:text-[11px] font-light text-[#666666] leading-tight">{t('dashboard.totalOrders')}</div>
                </div>
                <div className="text-center">
                  <div className="text-[20px] lg:text-[24px] font-semibold text-[#8B7355] mb-[4px]">{wishlistCount}</div>
                  <div className="text-[10px] lg:text-[11px] font-light text-[#666666] leading-tight">{t('dashboard.wishlistItems')}</div>
                </div>
                <div className="text-center">
                  <div className="text-[20px] lg:text-[24px] font-semibold text-[#8B7355] mb-[4px]">{reviewsCount}</div>
                  <div className="text-[10px] lg:text-[11px] font-light text-[#666666] leading-tight">{t('dashboard.reviewsWritten')}</div>
                </div>
              </div>
            </div>

            {/* Sign Out Button */}
            <button
              onClick={handleSignOut}
              className="w-full bg-[#8B7355] text-white text-[14px] lg:text-[15px] font-medium py-3 lg:py-[12px] rounded-[8px] cursor-pointer hover:bg-[#7a6448] transition-colors flex items-center justify-center gap-[8px]"
            >
              <IoLogOutOutline className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px]" />
              {t('dashboard.signOut')}
            </button>
          </div>

          {/* ── Main Panel ── */}
          <div className="flex-1 min-w-0">

            {/* Personal Info */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[32px] mb-5 md:mb-6 lg:mb-[32px]">
              <div className="flex items-center justify-between mb-5 lg:mb-[24px]">
                <h3 className="text-[17px] md:text-[18px] lg:text-[20px] font-semibold text-[#1A1A1A]">{t('dashboard.personalInfo')}</h3>
                {!editMode && (
                  <button
                    onClick={() => setEditMode(true)}
                    className="flex items-center gap-[6px] text-[13px] lg:text-[15px] font-medium text-[#8B7355] cursor-pointer hover:underline"
                  >
                    <IoCreateOutline className="w-[16px] h-[16px] lg:w-[18px] lg:h-[18px]" /> {t('dashboard.edit')}
                  </button>
                )}
              </div>

              {editMode ? (
                <div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-[24px] mb-5 lg:mb-[24px]">
                    <div>
                      <label className="text-[12px] lg:text-[13px] font-light text-[#666666] mb-[6px] block">{t('dashboard.fullName')}</label>
                      <input
                        type="text"
                        value={editFormData.full_name}
                        onChange={(e) => setEditFormData({ ...editFormData, full_name: e.target.value })}
                        className="w-full text-[14px] lg:text-[16px] font-normal text-[#2B2B2B] border border-[#E8E3D9] rounded-[8px] px-[12px] py-[8px] focus:outline-none focus:border-[#8B7355]"
                      />
                    </div>
                    <div>
                      <label className="text-[12px] lg:text-[13px] font-light text-[#666666] mb-[6px] block">{t('dashboard.phone')}</label>
                      <input
                        type="text"
                        value={editFormData.phone}
                        onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                        className="w-full text-[14px] lg:text-[16px] font-normal text-[#2B2B2B] border border-[#E8E3D9] rounded-[8px] px-[12px] py-[8px] focus:outline-none focus:border-[#8B7355]"
                      />
                    </div>
                    <div>
                      <div className="text-[12px] lg:text-[13px] font-light text-[#666666] mb-[6px]">{t('dashboard.email')}</div>
                      <div className="text-[14px] lg:text-[16px] font-normal text-[#999999]">{userEmail}</div>
                    </div>
                    <div>
                      <div className="text-[12px] lg:text-[13px] font-light text-[#666666] mb-[6px]">Birthday</div>
                      <div className="text-[14px] lg:text-[16px] font-normal text-[#999999]">N/A</div>
                    </div>
                  </div>
                  <div className="flex gap-[12px]">
                    <button
                      onClick={handleSaveProfile}
                      className="flex-1 bg-[#8B7355] text-white text-[14px] lg:text-[15px] font-medium py-[10px] rounded-[8px] cursor-pointer hover:bg-[#7a6448] transition-colors"
                    >
                      {t('dashboard.saveChanges')}
                    </button>
                    <button
                      onClick={() => {
                        setEditMode(false)
                        setEditFormData({ full_name: profile?.full_name || '', phone: profile?.phone || '' })
                      }}
                      className="flex-1 border border-[#8B7355] text-[#8B7355] text-[14px] lg:text-[15px] font-medium py-[10px] rounded-[8px] cursor-pointer hover:bg-[#FDFBF7] transition-colors"
                    >
                      {t('dashboard.cancel')}
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-[24px] mb-5 lg:mb-[24px]">
                    <div>
                      <div className="text-[12px] lg:text-[13px] font-light text-[#666666] mb-[6px]">{t('dashboard.fullName')}</div>
                      <div className="text-[14px] lg:text-[16px] font-normal text-[#2B2B2B]">{profile?.full_name || userName}</div>
                    </div>
                    <div>
                      <div className="text-[12px] lg:text-[13px] font-light text-[#666666] mb-[6px]">{t('dashboard.email')}</div>
                      <div className="text-[14px] lg:text-[16px] font-normal text-[#2B2B2B]">{userEmail}</div>
                    </div>
                    <div>
                      <div className="text-[12px] lg:text-[13px] font-light text-[#666666] mb-[6px]">{t('dashboard.phone')}</div>
                      <div className="text-[14px] lg:text-[16px] font-normal text-[#2B2B2B]">{profile?.phone || t('dashboard.notSet')}</div>
                    </div>
                    <div>
                      <div className="text-[12px] lg:text-[13px] font-light text-[#666666] mb-[6px]">{t('dashboard.birthday')}</div>
                      <div className="text-[14px] lg:text-[16px] font-normal text-[#2B2B2B]">{t('dashboard.na')}</div>
                    </div>
                  </div>
                  <div className="bg-[#FDFBF7] rounded-[8px] p-4 lg:p-[16px]">
                    <div className="flex items-center justify-between mb-3 lg:mb-[12px]">
                      <span className="text-[13px] lg:text-[14px] font-normal text-[#666666]">{t('dashboard.profileCompletion')}</span>
                      <span className="text-[13px] lg:text-[14px] font-medium text-[#8B7355]">{profileCompletion}%</span>
                    </div>
                    <div className="w-full h-[7px] lg:h-[8px] bg-white rounded-full overflow-hidden">
                      <div className={`h-full bg-[#C9A870] rounded-full`} style={{ width: `${profileCompletion}%` }} />
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Current Orders */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[32px] mb-5 md:mb-6 lg:mb-[32px]">
              <div className="flex items-center justify-between mb-5 lg:mb-[24px]">
                <h3 className="text-[17px] md:text-[18px] lg:text-[20px] font-semibold text-[#1A1A1A]">{t('dashboard.currentOrders')}</h3>
                <Link to="/order-tracking">
                  <button className="text-[13px] lg:text-[15px] font-normal text-[#8B7355] cursor-pointer hover:underline">{t('dashboard.viewAll')}</button>
                </Link>
              </div>
              {currentOrders.length > 0 ? (
                <div className="space-y-4 lg:space-y-[20px]">
                  {currentOrders.map((order) => {
                    const firstItem = order.items?.[0]
                    const status = getOrderStatus(order.created_at, order.delivery_method)
                    return (
                      <div key={order.id} className="border border-[#E8E3D9] rounded-[8px] p-4 lg:p-[20px]">
                        <div className="flex items-start gap-4 lg:gap-[20px]">
                          {firstItem && (
                            <img
                              src={firstItem.product_image}
                              alt={firstItem.product_name}
                              className="w-[64px] h-[64px] lg:w-[80px] lg:h-[80px] object-cover rounded-[8px] flex-shrink-0"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-[8px] gap-2">
                              <div className="min-w-0">
                                <div className="text-[14px] lg:text-[16px] font-medium text-[#1A1A1A] mb-[4px] truncate">
                                  {firstItem?.product_name || 'Order'}
                                </div>
                                <div className="text-[11px] lg:text-[13px] font-light text-[#666666]">
                                  {t('dashboard.order')} #{order.id.slice(0, 8).toUpperCase()} · {new Date(order.created_at).toLocaleDateString()} · {t('dashboard.qty')} {order.items?.length || 0}
                                </div>
                              </div>
                              <div className="bg-[#C9A870] text-white text-[10px] lg:text-[12px] font-normal px-[10px] lg:px-[12px] py-[4px] rounded-full flex-shrink-0">
                                {status}
                              </div>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-3 lg:mt-[16px]">
                              <div className="flex items-center gap-[6px] text-[12px] lg:text-[14px] font-normal text-[#666666]">
                                <IoCalendarOutline className="w-[14px] h-[14px] lg:w-[16px] lg:h-[16px]" />
                                {t('dashboard.estDelivery')} {new Date(new Date(order.created_at).getTime() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                              </div>
                              <Link to={`/order-tracking?orderId=${order.id}`}>
                                <button className="border border-[#8B7355] text-[#8B7355] text-[12px] lg:text-[14px] font-medium px-4 lg:px-[20px] py-[7px] lg:py-[8px] rounded-[8px] cursor-pointer hover:bg-[#8B7355] hover:text-white transition-all self-start sm:self-auto">
                                  {t('dashboard.trackOrder')}
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-[40px]">
                  <IoBagCheckOutline className="w-[48px] h-[48px] text-[#C9A870] mx-auto mb-[16px]" />
                  <p className="text-[15px] text-[#666666]">{t('dashboard.noCurrentOrders')}</p>
                </div>
              )}
            </div>

            {/* Order History */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[32px] mb-5 md:mb-6 lg:mb-[32px]">
              <h3 className="text-[17px] md:text-[18px] lg:text-[20px] font-semibold text-[#1A1A1A] mb-5 lg:mb-[24px]">{t('dashboard.orderHistory')}</h3>
              {orderHistory.length > 0 ? (
                <>
                  <div className="space-y-[10px] lg:space-y-[12px]">
                    {orderHistory.map((order) => {
                      const status = getOrderStatus(order.created_at, order.delivery_method)
                      return (
                        <div key={order.id} className="flex items-center justify-between py-3 lg:py-[16px] border-b border-[#F5F1EA]">
                          <div className="flex items-center gap-3 lg:gap-[12px]">
                            <IoCheckmarkCircle className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#8B7355]" />
                            <div>
                              <div className="text-[13px] lg:text-[15px] font-normal text-[#2B2B2B]">
                                {new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                              </div>
                              <div className="text-[12px] lg:text-[13px] font-light text-[#666666]">{status}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 lg:gap-[24px]">
                            <span className="text-[14px] lg:text-[16px] font-medium text-[#1A1A1A]">
                              ${parseFloat(order.total_amount || order.total).toFixed(2)}
                            </span>
                            <Link to={`/order-tracking?orderId=${order.id}`}>
                              <button className="flex items-center gap-[6px] text-[12px] lg:text-[14px] font-normal text-[#8B7355] cursor-pointer hover:underline">
                                {t('dashboard.track')}
                              </button>
                            </Link>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  <Link to="/order-tracking">
                    <button className="w-full mt-4 lg:mt-[20px] text-[13px] lg:text-[15px] font-normal text-[#8B7355] cursor-pointer hover:underline">
                      {t('dashboard.viewFullHistory')}
                    </button>
                  </Link>
                </>
              ) : (
                <div className="text-center py-[20px]">
                  <p className="text-[15px] text-[#666666]">{t('dashboard.noOrderHistory')}</p>
                </div>
              )}
            </div>

            {/* Wishlist */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[32px] mb-5 md:mb-6 lg:mb-[32px]">
              <div className="flex items-center justify-between mb-5 lg:mb-[24px]">
                <h3 className="text-[17px] md:text-[18px] lg:text-[20px] font-semibold text-[#1A1A1A]">{t('dashboard.wishlist')}</h3>
                {wishlistCount > 4 && (
                  <Link to="/wishlist">
                    <button className="text-[13px] lg:text-[15px] font-normal text-[#8B7355] cursor-pointer hover:underline">
                      {t('dashboard.viewAllItems')} {wishlistCount}
                    </button>
                  </Link>
                )}
              </div>
              {displayWishlist.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-[16px]">
                  {displayWishlist.map((item) => {
                    const price = parseFloat(item.products?.price)
                    const displayPrice = isNaN(price) ? 'N/A' : `$${price.toFixed(2)}`
                    const imageUrl = item.products?.img_url || item.products?.image_url || item.products?.image || 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200&fit=crop'

                    return (
                      <Link key={item.id} to={`/product/${item.product_id}`}>
                        <div className="cursor-pointer group">
                          <div className="relative mb-3 lg:mb-[12px]">
                            <img
                              src={imageUrl}
                              alt={item.products?.name || 'Product'}
                              className="w-full h-[130px] md:h-[140px] lg:h-[160px] object-cover rounded-[8px] group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="text-[11px] lg:text-[12px] font-light italic text-[#8B7355] mb-[4px]">{item.products?.brand || 'Shan Loray'}</div>
                          <div className="text-[13px] lg:text-[15px] font-medium text-[#1A1A1A] mb-[4px] line-clamp-2">{item.products?.name || 'Product'}</div>
                          <div className="text-[14px] lg:text-[16px] font-semibold text-[#2B2B2B]">{displayPrice}</div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-[40px]">
                  <IoHeartOutline className="w-[48px] h-[48px] text-[#C9A870] mx-auto mb-[16px]" />
                  <p className="text-[15px] text-[#666666] mb-[16px]">{t('dashboard.wishlistEmpty')}</p>
                  <Link to="/collections">
                    <button className="bg-[#8B7355] text-white text-[14px] font-medium px-[24px] py-[10px] rounded-[8px] cursor-pointer hover:bg-[#7a6448] transition-colors">
                      {t('dashboard.browseProducts')}
                    </button>
                  </Link>
                </div>
              )}
            </div>

            {/* Beauty Profile Snapshot */}
            <div className="bg-gradient-to-br from-[#FDFBF7] to-[#F5F1EA] rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[32px] mb-5 md:mb-6 lg:mb-[32px]">
              <div className="flex items-start justify-between mb-5 lg:mb-[24px]">
                <div>
                  <h3 className="text-[17px] md:text-[18px] lg:text-[20px] font-semibold text-[#1A1A1A] mb-[8px]">{t('dashboard.beautyProfile')}</h3>
                  {skinAnalysis && (
                    <div className="flex items-center gap-[8px] text-[12px] lg:text-[14px] font-normal text-[#666666]">
                      <IoSparkles className="w-[14px] h-[14px] lg:w-[16px] lg:h-[16px] text-[#C9A870]" />
                      {t('dashboard.lastAnalysis')} {new Date(skinAnalysis.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  )}
                </div>
                <Link to="/skin-analysis">
                  <button className="bg-[#8B7355] text-white text-[12px] lg:text-[14px] font-medium px-4 lg:px-[24px] py-[8px] lg:py-[10px] rounded-[8px] cursor-pointer hover:bg-[#7a6448] transition-colors whitespace-nowrap">
                    {skinAnalysis ? t('dashboard.newAnalysis') : t('dashboard.startAnalysis')}
                  </button>
                </Link>
              </div>
              {skinAnalysis ? (
                <>
                  <div className="bg-white rounded-[8px] p-4 lg:p-[20px] mb-5 lg:mb-[24px]">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-[13px] lg:text-[14px] font-medium text-[#1A1A1A]">{t('dashboard.skinScore')}</div>
                      <div className="text-[24px] lg:text-[28px] font-bold text-[#8B7355]">{skinAnalysis.skin_score}/100</div>
                    </div>
                    {skinAnalysis.skin_label && (
                      <div className="text-[12px] lg:text-[13px] font-normal text-[#666666]">{t('dashboard.status')} <span className="text-[#8B7355] font-medium">{skinAnalysis.skin_label}</span></div>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3 lg:gap-[20px] mb-5 lg:mb-[24px]">
                    <div className="bg-white rounded-[8px] p-3 lg:p-[20px] text-center">
                      <div className="text-[20px] md:text-[24px] lg:text-[28px] font-bold text-[#8B7355] mb-[4px]">{skinAnalysis.metrics?.hydration || 0}%</div>
                      <div className="text-[11px] md:text-[12px] lg:text-[13px] font-normal text-[#666666] leading-tight">{t('dashboard.hydration')}</div>
                    </div>
                    <div className="bg-white rounded-[8px] p-3 lg:p-[20px] text-center">
                      <div className="text-[20px] md:text-[24px] lg:text-[28px] font-bold text-[#8B7355] mb-[4px]">{skinAnalysis.metrics?.texture || 0}%</div>
                      <div className="text-[11px] md:text-[12px] lg:text-[13px] font-normal text-[#666666] leading-tight">{t('dashboard.texture')}</div>
                    </div>
                    <div className="bg-white rounded-[8px] p-3 lg:p-[20px] text-center">
                      <div className="text-[20px] md:text-[24px] lg:text-[28px] font-bold text-[#8B7355] mb-[4px]">{skinAnalysis.metrics?.clarity || 0}%</div>
                      <div className="text-[11px] md:text-[12px] lg:text-[13px] font-normal text-[#666666] leading-tight">{t('dashboard.clarity')}</div>
                    </div>
                    <div className="bg-white rounded-[8px] p-3 lg:p-[20px] text-center">
                      <div className="text-[20px] md:text-[24px] lg:text-[28px] font-bold text-[#8B7355] mb-[4px]">{skinAnalysis.metrics?.toneEvenness || 0}%</div>
                      <div className="text-[11px] md:text-[12px] lg:text-[13px] font-normal text-[#666666] leading-tight">{t('dashboard.toneEvenness')}</div>
                    </div>
                  </div>
                  {skinAnalysis.summary && (
                    <div className="bg-white rounded-[8px] p-4 lg:p-[16px] mb-5 lg:mb-[24px]">
                      <div className="text-[13px] lg:text-[14px] font-medium text-[#1A1A1A] mb-[8px]">{t('dashboard.summary')}</div>
                      <div className="text-[12px] lg:text-[13px] font-normal text-[#666666] leading-relaxed">{skinAnalysis.summary}</div>
                    </div>
                  )}
                  {skinAnalysis.analysis_cards && skinAnalysis.analysis_cards.length > 0 && (
                    <div className="bg-white rounded-[8px] p-4 lg:p-[16px]">
                      <div className="text-[13px] lg:text-[14px] font-medium text-[#1A1A1A] mb-[8px]">{t('dashboard.analysisInsights')}</div>
                      <div className="flex gap-[8px] flex-wrap">
                        {skinAnalysis.analysis_cards.map((card, index) => (
                          <div key={index} className="bg-[#FDFBF7] text-[#8B7355] text-[12px] lg:text-[13px] font-normal px-[10px] lg:px-[12px] py-[5px] lg:py-[6px] rounded-full border border-[#E8E3D9]">
                            {card.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-[40px]">
                  <IoSparkles className="w-[48px] h-[48px] text-[#C9A870] mx-auto mb-[16px]" />
                  <p className="text-[15px] text-[#666666] mb-[16px]">{t('dashboard.completeSkinAnalysis')}</p>
                  <Link to="/skin-analysis">
                    <button className="bg-[#8B7355] text-white text-[14px] font-medium px-[24px] py-[10px] rounded-[8px] cursor-pointer hover:bg-[#7a6448] transition-colors">
                      Start Analysis
                    </button>
                  </Link>
                </div>
              )}
            </div>

            {/* Loyalty Program */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[32px] mb-5 md:mb-6 lg:mb-[32px]">
              <div className="flex items-center gap-3 lg:gap-[12px] mb-4 lg:mb-[20px]">
                <IoRibbonOutline className="w-[24px] h-[24px] lg:w-[28px] lg:h-[28px] text-[#C9A870]" />
                <h3 className="text-[17px] md:text-[18px] lg:text-[20px] font-semibold text-[#1A1A1A]">{t('dashboard.loyaltyProgram')}</h3>
              </div>
              <div className="text-center mb-5 lg:mb-[24px]">
                <div className="text-[26px] md:text-[28px] lg:text-[32px] font-bold text-[#8B7355] mb-[4px]">{loyaltyPoints.toLocaleString()} Points</div>
                <div className="text-[13px] lg:text-[14px] font-normal text-[#666666]">{t('dashboard.currentBalance')}</div>
              </div>
              {loyaltyPoints < 5000 && (
                <div className="bg-[#FDFBF7] rounded-[8px] p-4 lg:p-[20px] mb-4 lg:mb-[20px]">
                  <div className="flex items-center justify-between mb-3 lg:mb-[12px]">
                    <span className="text-[13px] lg:text-[14px] font-normal text-[#666666]">{membershipTier} to {nextTier}</span>
                    <span className="text-[13px] lg:text-[14px] font-medium text-[#8B7355]">{pointsToNext.toLocaleString()} {t('dashboard.pointsAway')}</span>
                  </div>
                  <div className="w-full h-[7px] lg:h-[8px] bg-white rounded-full overflow-hidden">
                    <div className="h-full bg-[#C9A870] rounded-full" style={{ width: `${progressPercent}%` }} />
                  </div>
                </div>
              )}
            </div>

            {/* Saved Routines */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[32px] mb-5 md:mb-6 lg:mb-[32px]">
              <div className="flex items-center justify-between mb-5 lg:mb-[24px]">
                <h3 className="text-[17px] md:text-[18px] lg:text-[20px] font-semibold text-[#1A1A1A]">{t('dashboard.savedRoutines')}</h3>
                {skinAnalysis && (
                  <Link to="/beauty-journey">
                    <button className="text-[13px] lg:text-[15px] font-normal text-[#8B7355] cursor-pointer hover:underline">{t('dashboard.viewAllRoutines')}</button>
                  </Link>
                )}
              </div>
              {skinAnalysis ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-[20px]">
                  {/* Morning Ritual */}
                  <div className="border border-[#E8E3D9] rounded-[8px] p-4 lg:p-[20px] hover:border-[#C9A870] transition-colors">
                    <h4 className="text-[15px] lg:text-[16px] font-medium text-[#1A1A1A] mb-[8px]">{t('dashboard.morningRitual')}</h4>
                    <div className="text-[12px] lg:text-[13px] font-normal text-[#666666] mb-4 lg:mb-[16px]">
                      {morningProducts.length} {t('dashboard.products')}
                    </div>
                    <div className="flex gap-[6px] lg:gap-[8px]">
                      {morningProducts.slice(0, 3).map((product, idx) => (
                        <img key={idx} src={product.image_url || product.img_url} alt={product.name} className="w-[52px] h-[52px] lg:w-[60px] lg:h-[60px] object-cover rounded-[6px]" />
                      ))}
                    </div>
                  </div>
                  {/* Evening Care */}
                  <div className="border border-[#E8E3D9] rounded-[8px] p-4 lg:p-[20px] hover:border-[#C9A870] transition-colors">
                    <h4 className="text-[15px] lg:text-[16px] font-medium text-[#1A1A1A] mb-[8px]">{t('dashboard.eveningCare')}</h4>
                    <div className="text-[12px] lg:text-[13px] font-normal text-[#666666] mb-4 lg:mb-[16px]">
                      {eveningProducts.length} {t('dashboard.products')}
                    </div>
                    <div className="flex gap-[6px] lg:gap-[8px]">
                      {eveningProducts.slice(0, 3).map((product, idx) => (
                        <img key={idx} src={product.image_url || product.img_url} alt={product.name} className="w-[52px] h-[52px] lg:w-[60px] lg:h-[60px] object-cover rounded-[6px]" />
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-[40px]">
                  <IoCalendarOutline className="w-[48px] h-[48px] text-[#C9A870] mx-auto mb-[16px]" />
                  <p className="text-[15px] text-[#666666] mb-[16px]">{t('dashboard.completeForRoutine')}</p>
                  <Link to="/beauty-journey">
                    <button className="bg-[#8B7355] text-white text-[14px] font-medium px-[24px] py-[10px] rounded-[8px] cursor-pointer hover:bg-[#7a6448] transition-colors">
                      {t('dashboard.startJourney')}
                    </button>
                  </Link>
                </div>
              )}
            </div>

            {/* Recent Reviews */}
            <div id="reviews" className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[32px] mb-5 md:mb-6 lg:mb-[32px]">
              <div className="flex items-center justify-between mb-5 lg:mb-[24px]">
                <h3 className="text-[17px] md:text-[18px] lg:text-[20px] font-semibold text-[#1A1A1A]">{t('dashboard.recentReviews')}</h3>
                {reviews.length > 2 && (
                  <button className="text-[13px] lg:text-[15px] font-normal text-[#8B7355] cursor-pointer hover:underline">{t('dashboard.viewAllReviews')}</button>
                )}
              </div>
              {reviews.length > 0 ? (
                <div className="space-y-4 lg:space-y-[20px] mb-5 lg:mb-[24px]">
                  {reviews.map((review) => (
                    <div key={review.id} className="border border-[#E8E3D9] rounded-[8px] p-4 lg:p-[20px]">
                      <div className="flex gap-3 lg:gap-[16px]">
                        {review.products && (
                          <img
                            src={review.products.image_url}
                            alt={review.products.name}
                            className="w-[64px] h-[64px] lg:w-[80px] lg:h-[80px] object-cover rounded-[8px] flex-shrink-0"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="text-[14px] lg:text-[16px] font-medium text-[#1A1A1A] mb-[8px]">
                            {review.products?.name || 'Product'}
                          </div>
                          <div className="flex items-center gap-[4px] mb-[8px]">
                            {[...Array(5)].map((_, i) => (
                              <IoStarSharp
                                key={i}
                                className={`w-[13px] h-[13px] lg:w-[16px] lg:h-[16px] ${i < review.rating ? 'text-[#C9A870]' : 'text-[#E8E3D9]'}`}
                              />
                            ))}
                          </div>
                          <p className="text-[12px] lg:text-[14px] font-normal text-[#666666] mb-[8px] line-clamp-2">{review.content}</p>
                          <div className="text-[11px] lg:text-[13px] font-light text-[#999999]">
                            {new Date(review.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-[40px] mb-5 lg:mb-[24px]">
                  <IoStarSharp className="w-[48px] h-[48px] text-[#C9A870] mx-auto mb-[16px]" />
                  <p className="text-[15px] text-[#666666]">{t('dashboard.noReviews')}</p>
                </div>
              )}
              <Link to="/collections">
                <button className="w-full bg-[#8B7355] text-white text-[14px] lg:text-[15px] font-medium py-3 lg:py-[12px] rounded-[8px] cursor-pointer hover:bg-[#7a6448] transition-colors">
                  {t('dashboard.writeReview')}
                </button>
              </Link>
            </div>

            {/* Account Settings */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[32px]">
              <h3 className="text-[17px] md:text-[18px] lg:text-[20px] font-semibold text-[#1A1A1A] mb-5 lg:mb-[24px]">Account Settings</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-[16px]">
                {settingsItems.map((item) => (
                  <Link key={item.label} to={item.path}>
                    <div className="border border-[#E8E3D9] rounded-[8px] p-4 lg:p-[20px] cursor-pointer hover:border-[#C9A870] hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] transition-all">
                      <div className="flex items-start justify-between">
                        <div>
                          <item.icon className="w-[22px] h-[22px] lg:w-[24px] lg:h-[24px] text-[#8B7355] mb-3 lg:mb-[12px]" />
                          <div className="text-[13px] lg:text-[15px] font-medium text-[#1A1A1A] mb-[4px]">{item.label}</div>
                          {item.count && <div className="text-[12px] lg:text-[13px] font-normal text-[#666666]">{item.count}</div>}
                        </div>
                        <IoChevronForward className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#999999]" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="h-[80px]" />
    </div>
  )
}