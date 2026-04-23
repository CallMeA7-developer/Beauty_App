import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  IoPhonePortraitOutline,
  IoShieldCheckmarkOutline,
  IoAddOutline,
  IoLocationOutline,
  IoCreateOutline,
  IoTrashOutline,
  IoCheckmarkCircle,
  IoChevronDown,
  IoPersonOutline,
  IoBagCheckOutline,
  IoHeartOutline,
  IoSparkles,
  IoRibbonOutline,
  IoCalendarOutline,
  IoStarSharp,
  IoSettingsOutline,
  IoCardOutline,
  IoNotificationsOutline,
  IoArrowUp,
  IoMenuOutline,
  IoClose,
} from 'react-icons/io5'
import { useAuth } from '../contexts/AuthContext'
import { useWishlist } from '../contexts/WishlistContext'
import { supabase } from '../lib/supabase'

export default function ShippingAddress() {
  const { t, i18n } = useTranslation()
  const { user } = useAuth()
  const { wishlistCount } = useWishlist()

  const [addresses, setAddresses] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [showDrawer, setShowDrawer] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  const [stats, setStats] = useState({
    totalOrders: 0,
    reviewsWritten: 0,
    loyaltyPoints: 0,
    tier: 'Member'
  })

  const [formData, setFormData] = useState({
    label: 'Home',
    full_name: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'United States',
    is_default: false
  })

  useEffect(() => {
    if (user) {
      fetchAddresses()
      fetchStats()
    }
  }, [user])

  const fetchAddresses = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('addresses')
      .select('*')
      .eq('user_id', user.id)
      .order('is_default', { ascending: false })
      .order('created_at', { ascending: false })

    if (!error && data) {
      setAddresses(data)
    }
    setLoading(false)
  }

  const fetchStats = async () => {
    const [ordersResult, reviewsResult] = await Promise.all([
      supabase
        .from('orders')
        .select('total', { count: 'exact' })
        .eq('user_id', user.id),
      supabase
        .from('reviews')
        .select('id', { count: 'exact' })
        .eq('user_id', user.id)
    ])

    const totalOrders = ordersResult.count || 0
    const reviewsWritten = reviewsResult.count || 0

    const totalSpent = ordersResult.data?.reduce((sum, order) => sum + parseFloat(order.total || 0), 0) || 0
    const loyaltyPoints = Math.floor(totalSpent)

    let tier = 'Member'
    if (loyaltyPoints >= 5000) tier = 'Gold'
    else if (loyaltyPoints >= 2000) tier = 'Elite'

    setStats({ totalOrders, reviewsWritten, loyaltyPoints, tier })
  }

  const getTierLabel = (tier) => {
    switch (tier) {
      case 'Gold':
        return t('shippingAddress.sidebar.tiers.gold')
      case 'Elite':
        return t('shippingAddress.sidebar.tiers.elite')
      default:
        return t('shippingAddress.sidebar.tiers.member')
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSaveAddress = async () => {
    if (!formData.full_name || !formData.phone || !formData.street || !formData.city || !formData.state || !formData.postal_code) {
      alert(t('shippingAddress.form.validation'))
      return
    }

    if (editingId) {
      const { data, error } = await supabase
        .from('addresses')
        .update({
          ...formData,
          updated_at: new Date().toISOString()
        })
        .eq('id', editingId)
        .select()
        .single()

      if (!error && data) {
        setAddresses(addresses.map(addr => addr.id === editingId ? data : addr))
        resetForm()
      }
    } else {
      if (formData.is_default) {
        await supabase
          .from('addresses')
          .update({ is_default: false })
          .eq('user_id', user.id)
      }

      const { data, error } = await supabase
        .from('addresses')
        .insert({
          user_id: user.id,
          ...formData
        })
        .select()
        .single()

      if (!error && data) {
        setAddresses([data, ...addresses])
        resetForm()
      }
    }
  }

  const handleEdit = (address) => {
    setFormData({
      label: address.label,
      full_name: address.full_name,
      phone: address.phone,
      street: address.street,
      city: address.city,
      state: address.state,
      postal_code: address.postal_code,
      country: address.country,
      is_default: address.is_default
    })
    setEditingId(address.id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (confirm(t('shippingAddress.actions.deleteConfirm'))) {
      const { error } = await supabase
        .from('addresses')
        .delete()
        .eq('id', id)

      if (!error) {
        setAddresses(prev => prev.filter(addr => addr.id !== id))
      }
    }
  }

  const handleSetDefault = async (id) => {
    await supabase
      .from('addresses')
      .update({ is_default: false })
      .eq('user_id', user.id)

    const { data, error } = await supabase
      .from('addresses')
      .update({ is_default: true })
      .eq('id', id)
      .select()
      .single()

    if (!error) {
      setAddresses(addresses.map(addr => ({
        ...addr,
        is_default: addr.id === id
      })))
    }
  }

  const resetForm = () => {
    setFormData({
      label: 'Home',
      full_name: '',
      phone: '',
      street: '',
      city: '',
      state: '',
      postal_code: '',
      country: 'United States',
      is_default: false
    })
    setEditingId(null)
    setShowForm(false)
  }

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || t('shippingAddress.user')
  const userInitials = userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

  const navigationItems = [
    { label: t('shippingAddress.nav.accountDashboard'), path: '/dashboard', icon: IoPersonOutline, badge: null, tag: null },
    { label: t('shippingAddress.nav.orderHistory'), path: '/order-tracking', icon: IoBagCheckOutline, badge: null, tag: null },
    { label: t('shippingAddress.nav.myWishlist'), path: '/wishlist', icon: IoHeartOutline, badge: wishlistCount > 0 ? wishlistCount : null, tag: null },
    { label: t('shippingAddress.nav.shippingAddresses'), path: '/shipping-address', icon: IoLocationOutline, badge: null, tag: null, active: true },
    { label: t('shippingAddress.nav.paymentMethods'), path: '/payment-methods', icon: IoCardOutline, badge: null, tag: null },
    { label: t('shippingAddress.nav.beautyProfile'), path: '/skin-analysis', icon: IoSparkles, badge: null, tag: null },
    { label: t('shippingAddress.nav.loyaltyProgram'), path: '/account', icon: IoRibbonOutline, badge: stats.loyaltyPoints > 0 ? t('shippingAddress.nav.pointsBadge', { count: stats.loyaltyPoints.toLocaleString() }) : null, tag: null },
    { label: t('shippingAddress.nav.myRoutines'), path: '/beauty-journey', icon: IoCalendarOutline, badge: null, tag: null },
    { label: t('shippingAddress.nav.reviewsRatings'), path: '/dashboard', icon: IoStarSharp, badge: null, tag: null },
    { label: t('shippingAddress.nav.accountSettings'), path: '/privacy-settings', icon: IoSettingsOutline, badge: null, tag: null },
    { label: t('shippingAddress.nav.notifications'), path: '/notifications', icon: IoNotificationsOutline, badge: null, tag: null },
  ]

  const inputClass = "w-full h-[44px] lg:h-[48px] px-[16px] border-[1.5px] border-[#E8E3D9] rounded-[8px] text-[13px] lg:text-[15px] font-normal text-[#1A1A1A] outline-none focus:border-[#8B7355] transition-colors"
  const labelClass = "text-[12px] lg:text-[14px] font-medium text-[#666666] mb-[6px] lg:mb-[8px] block"

  if (loading) {
    return (
      <div key={i18n.language} className="min-h-screen flex items-center justify-center">
        <div className="text-[16px] text-[#666666]">{t('shippingAddress.loading')}</div>
      </div>
    )
  }

  return (
    <div key={i18n.language} className="bg-white font-['Cormorant_Garamond']">

      <div className="min-h-[48px] bg-[#FDFBF7] px-4 md:px-[60px] lg:px-[120px] flex items-center overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        <Link to="/"><span className="text-[13px] lg:text-[15px] font-normal text-[#8B7355] cursor-pointer whitespace-nowrap">{t('shippingAddress.breadcrumb.home')}</span></Link>
        <span className="text-[13px] lg:text-[15px] font-normal text-[#666666] mx-2">/</span>
        <Link to="/dashboard"><span className="hidden sm:inline text-[13px] lg:text-[15px] font-normal text-[#8B7355] cursor-pointer whitespace-nowrap">{t('shippingAddress.breadcrumb.accountDashboard')}</span></Link>
        <span className="hidden sm:inline text-[13px] lg:text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[13px] lg:text-[15px] font-normal text-[#666666] whitespace-nowrap">{t('shippingAddress.breadcrumb.shippingAddresses')}</span>
      </div>

      <div className="min-h-[100px] md:min-h-[120px] lg:min-h-[140px] bg-gradient-to-b from-[#FDFBF7] to-white flex flex-col items-center justify-center px-4 md:px-[60px] lg:px-[120px] py-6 md:py-0">
        <div className="max-w-[1200px] w-full relative">
          <h1 className="text-[28px] md:text-[38px] lg:text-[48px] font-semibold text-[#1A1A1A]">{t('shippingAddress.hero.title')}</h1>
          <p className="text-[14px] md:text-[16px] lg:text-[18px] font-normal text-[#666666] mt-[8px]">{t('shippingAddress.hero.subtitle')}</p>
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

      {/* ── Mobile Drawer ── */}
      {showDrawer && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowDrawer(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-[300px] bg-white shadow-[4px_0_24px_rgba(0,0,0,0.15)] flex flex-col overflow-y-auto">

            {/* Drawer Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8E3D9] flex-shrink-0">
              <span className="text-[16px] font-semibold text-[#1A1A1A]">{t('shippingAddress.nav.accountDashboard')}</span>
              <button onClick={() => setShowDrawer(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F5F1EA] transition-colors">
                <IoClose className="w-5 h-5 text-[#666666]" />
              </button>
            </div>

            {/* Profile Section */}
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
                <div className="bg-[#C9A870] text-white text-[11px] font-medium px-[14px] py-[5px] rounded-full mb-3">
                  {getTierLabel(stats.tier)} {t('shippingAddress.sidebar.member')}
                </div>
                <div className="flex items-center gap-2">
                  <IoSparkles className="w-[16px] h-[16px] text-[#C9A870]" />
                  <span className="text-[15px] font-medium text-[#8B7355]">{stats.loyaltyPoints.toLocaleString()} {t('shippingAddress.sidebar.points')}</span>
                </div>
              </div>
            </div>

            {/* Nav Menu */}
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
                  <div className="text-[20px] font-semibold text-[#8B7355] mb-1">{stats.totalOrders}</div>
                  <div className="text-[10px] font-light text-[#666666] leading-tight">{t('shippingAddress.stats.totalOrders')}</div>
                </div>
                <div className="text-center">
                  <div className="text-[20px] font-semibold text-[#8B7355] mb-1">{wishlistCount}</div>
                  <div className="text-[10px] font-light text-[#666666] leading-tight">{t('shippingAddress.stats.wishlistItems')}</div>
                </div>
                <div className="text-center">
                  <div className="text-[20px] font-semibold text-[#8B7355] mb-1">{stats.reviewsWritten}</div>
                  <div className="text-[10px] font-light text-[#666666] leading-tight">{t('shippingAddress.stats.reviewsWritten')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="px-4 md:px-[60px] lg:px-[120px] py-6 md:py-10 lg:py-[48px]">
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-[40px]">

          <div className="hidden lg:block w-full lg:w-[320px] lg:flex-shrink-0">

            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 lg:p-[28px] mb-5 lg:mb-[24px]">
              <div className="flex flex-col items-center">
                {user?.user_metadata?.avatar_url ? (
                  <img
                    src={user.user_metadata.avatar_url}
                    alt={t('shippingAddress.sidebar.userAvatar')}
                    className="w-[90px] h-[90px] md:w-[100px] md:h-[100px] lg:w-[120px] lg:h-[120px] rounded-full object-cover border-[3px] border-[#C9A870] mb-4 lg:mb-[16px]"
                  />
                ) : (
                  <div className="w-[90px] h-[90px] md:w-[100px] md:h-[100px] lg:w-[120px] lg:h-[120px] rounded-full bg-[#C9A870] flex items-center justify-center text-white text-[36px] md:text-[40px] lg:text-[48px] font-semibold border-[3px] border-[#C9A870] mb-4 lg:mb-[16px]">
                    {userInitials}
                  </div>
                )}
                <h2 className="text-[20px] md:text-[22px] lg:text-[24px] font-semibold text-[#1A1A1A] mb-[4px]">{userName}</h2>
                <div className="bg-[#C9A870] text-white text-[11px] lg:text-[12px] font-medium px-[14px] lg:px-[16px] py-[5px] lg:py-[6px] rounded-full mb-4 lg:mb-[16px]">
                  {getTierLabel(stats.tier)} {t('shippingAddress.sidebar.member')}
                </div>
                <div className="flex items-center gap-[8px]">
                  <IoSparkles className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#C9A870]" />
                  <span className="text-[17px] lg:text-[20px] font-medium text-[#8B7355]">{stats.loyaltyPoints.toLocaleString()} {t('shippingAddress.sidebar.points')}</span>
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
                    ) : item.tag ? (
                      <div className="hidden md:block bg-[#8B7355] text-white text-[9px] lg:text-[10px] font-normal px-[7px] lg:px-[8px] py-[2px] rounded-[4px]">{item.tag}</div>
                    ) : null}
                  </div>
                </Link>
              ))}
            </div>

            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 lg:p-[24px]">
              <div className="grid grid-cols-3 gap-3 lg:gap-[16px]">
                <div className="text-center">
                  <div className="text-[20px] lg:text-[24px] font-semibold text-[#8B7355] mb-[4px]">{stats.totalOrders}</div>
                  <div className="text-[10px] lg:text-[11px] font-light text-[#666666] leading-tight">{t('shippingAddress.stats.totalOrders')}</div>
                </div>
                <div className="text-center">
                  <div className="text-[20px] lg:text-[24px] font-semibold text-[#8B7355] mb-[4px]">{wishlistCount}</div>
                  <div className="text-[10px] lg:text-[11px] font-light text-[#666666] leading-tight">{t('shippingAddress.stats.wishlistItems')}</div>
                </div>
                <div className="text-center">
                  <div className="text-[20px] lg:text-[24px] font-semibold text-[#8B7355] mb-[4px]">{stats.reviewsWritten}</div>
                  <div className="text-[10px] lg:text-[11px] font-light text-[#666666] leading-tight">{t('shippingAddress.stats.reviewsWritten')}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-0">

            <button
              onClick={() => {
                resetForm()
                setShowForm(!showForm)
              }}
              className="w-full h-[48px] lg:h-[56px] bg-[#8B7355] text-white text-[14px] lg:text-[16px] font-medium rounded-[8px] flex items-center justify-center gap-[10px] mb-6 lg:mb-[32px] cursor-pointer hover:bg-[#7a6448] transition-colors"
            >
              <IoAddOutline className="w-[20px] h-[20px] lg:w-[22px] lg:h-[22px]" />
              {t('shippingAddress.actions.addNewAddress')}
            </button>

            {showForm && (
              <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[32px] mb-6 lg:mb-[32px] border-l-4 border-[#C9A870]">
                <h3 className="text-[18px] md:text-[20px] lg:text-[22px] font-semibold text-[#1A1A1A] mb-5 lg:mb-[24px]">
                  {editingId ? t('shippingAddress.form.editTitle') : t('shippingAddress.form.newTitle')}
                </h3>
                <div className="space-y-4 lg:space-y-[16px]">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-[16px]">
                    <div>
                      <label className={labelClass}>{t('shippingAddress.form.addressLabel')}</label>
                      <select
                        name="label"
                        value={formData.label}
                        onChange={handleInputChange}
                        className={inputClass + ' cursor-pointer appearance-none'}
                      >
                        <option>{t('shippingAddress.form.options.home')}</option>
                        <option>{t('shippingAddress.form.options.work')}</option>
                        <option>{t('shippingAddress.form.options.office')}</option>
                        <option>{t('shippingAddress.form.options.other')}</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>{t('shippingAddress.form.recipientName')}</label>
                      <input
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleInputChange}
                        placeholder={t('shippingAddress.form.placeholders.fullName')}
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>{t('shippingAddress.form.streetAddress')}</label>
                    <input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleInputChange}
                      placeholder={t('shippingAddress.form.placeholders.streetAddress')}
                      className={inputClass}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-[16px]">
                    <div>
                      <label className={labelClass}>{t('shippingAddress.form.city')}</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder={t('shippingAddress.form.placeholders.city')}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>{t('shippingAddress.form.stateProvince')}</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder={t('shippingAddress.form.placeholders.state')}
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-[16px]">
                    <div>
                      <label className={labelClass}>{t('shippingAddress.form.postalCode')}</label>
                      <input
                        type="text"
                        name="postal_code"
                        value={formData.postal_code}
                        onChange={handleInputChange}
                        placeholder={t('shippingAddress.form.placeholders.zip')}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>{t('shippingAddress.form.country')}</label>
                      <div className="relative">
                        <select
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className={inputClass + ' appearance-none cursor-pointer pr-[40px]'}
                        >
                          <option>{t('shippingAddress.form.countries.us')}</option>
                          <option>{t('shippingAddress.form.countries.canada')}</option>
                          <option>{t('shippingAddress.form.countries.uk')}</option>
                          <option>{t('shippingAddress.form.countries.australia')}</option>
                          <option>{t('shippingAddress.form.countries.uae')}</option>
                        </select>
                        <IoChevronDown className="absolute right-[14px] top-1/2 -translate-y-1/2 w-[15px] h-[15px] lg:w-[16px] lg:h-[16px] text-[#8B7355] pointer-events-none" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>{t('shippingAddress.form.phoneNumber')}</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder={t('shippingAddress.form.placeholders.phone')}
                      className={inputClass}
                    />
                  </div>
                  <div className="flex items-center gap-[12px]">
                    <input
                      type="checkbox"
                      id="is_default"
                      name="is_default"
                      checked={formData.is_default}
                      onChange={handleInputChange}
                      className="w-[18px] h-[18px] accent-[#8B7355] cursor-pointer"
                    />
                    <label htmlFor="is_default" className="text-[13px] lg:text-[14px] font-normal text-[#666666] cursor-pointer">{t('shippingAddress.form.setDefault')}</label>
                  </div>
                  <div className="flex gap-4 lg:gap-[16px] pt-[8px]">
                    <button
                      onClick={handleSaveAddress}
                      className="flex-1 h-[48px] lg:h-[52px] bg-[#8B7355] text-white text-[14px] lg:text-[15px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors"
                    >
                      {editingId ? t('shippingAddress.actions.updateAddress') : t('shippingAddress.actions.saveAddress')}
                    </button>
                    <button
                      onClick={resetForm}
                      className="flex-1 h-[48px] lg:h-[52px] bg-white border border-[#E8E3D9] text-[#666666] text-[14px] lg:text-[15px] font-medium rounded-[8px] hover:border-[#8B7355] hover:text-[#8B7355] transition-all"
                    >
                      {t('shippingAddress.actions.cancel')}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {addresses.length === 0 ? (
              <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-10 lg:p-[48px] text-center">
                <IoLocationOutline className="w-[56px] h-[56px] lg:w-[64px] lg:h-[64px] text-[#C9A870] mx-auto mb-[20px]" />
                <h3 className="text-[20px] lg:text-[24px] font-semibold text-[#1A1A1A] mb-[12px]">{t('shippingAddress.empty.title')}</h3>
                <p className="text-[14px] lg:text-[16px] text-[#666666] mb-[24px]">{t('shippingAddress.empty.description')}</p>
                <button
                  onClick={() => {
                    resetForm()
                    setShowForm(true)
                  }}
                  className="bg-[#8B7355] text-white text-[14px] lg:text-[15px] font-medium px-[24px] py-[12px] rounded-[8px] cursor-pointer hover:bg-[#7a6448] transition-colors"
                >
                  {t('shippingAddress.empty.addAddress')}
                </button>
              </div>
            ) : (
              <div className="space-y-5 lg:space-y-[24px]">
                {addresses.map((address) => (
                  <div key={address.id} className={`bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[32px] hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-all ${address.is_default ? 'border-l-4 border-[#8B7355]' : ''}`}>

                    <div className="flex items-center justify-between mb-4 lg:mb-[20px]">
                      <div className="flex items-center gap-3 lg:gap-[12px]">
                        <IoLocationOutline className="w-[20px] h-[20px] lg:w-[22px] lg:h-[22px] text-[#8B7355]" />
                        <h3 className="text-[16px] lg:text-[18px] font-medium text-[#1A1A1A]">{address.label}</h3>
                      </div>
                      {address.is_default && (
                        <div className="flex items-center gap-[6px] bg-[#F5F1EA] text-[#8B7355] text-[11px] lg:text-[12px] font-medium px-[10px] lg:px-[12px] py-[5px] lg:py-[6px] rounded-full">
                          <IoCheckmarkCircle className="w-[13px] h-[13px] lg:w-[14px] lg:h-[14px]" />
                          {t('shippingAddress.addressCard.default')}
                        </div>
                      )}
                    </div>

                    <div className="space-y-[6px] lg:space-y-[8px] mb-5 lg:mb-[24px] pl-[28px] lg:pl-[34px]">
                      <div className="text-[14px] lg:text-[16px] font-medium text-[#1A1A1A]">{address.full_name}</div>
                      <div className="text-[13px] lg:text-[15px] font-normal text-[#3D3D3D]">{address.street}</div>
                      <div className="text-[13px] lg:text-[15px] font-normal text-[#3D3D3D]">{address.city}, {address.state} {address.postal_code}</div>
                      <div className="text-[12px] lg:text-[14px] font-normal text-[#666666]">{address.country}</div>
                      <div className="flex items-center gap-[8px] text-[13px] lg:text-[15px] font-normal text-[#666666]">
                        <IoPhonePortraitOutline className="w-[14px] h-[14px] lg:w-[16px] lg:h-[16px]" />
                        {address.phone}
                      </div>
                    </div>

                    <div className="border-t border-[#E8E3D9] pt-4 lg:pt-[20px]">
                      <div className="flex items-center gap-2 lg:gap-[12px] flex-wrap">
                        {!address.is_default && (
                          <button
                            onClick={() => handleSetDefault(address.id)}
                            className="bg-white border border-[#8B7355] text-[#8B7355] text-[12px] lg:text-[14px] font-medium px-4 lg:px-[20px] py-[8px] lg:py-[10px] rounded-[8px] cursor-pointer hover:bg-[#8B7355] hover:text-white transition-all"
                          >
                            {t('shippingAddress.actions.setDefault')}
                          </button>
                        )}
                        <button
                          onClick={() => handleEdit(address)}
                          className="flex items-center gap-[6px] lg:gap-[8px] text-[#8B7355] text-[12px] lg:text-[14px] font-medium px-4 lg:px-[20px] py-[8px] lg:py-[10px] rounded-[8px] cursor-pointer hover:bg-[#F5F1EA] transition-colors"
                        >
                          <IoCreateOutline className="w-[16px] h-[16px] lg:w-[18px] lg:h-[18px]" />
                          {t('shippingAddress.actions.edit')}
                        </button>
                        <button
                          onClick={() => handleDelete(address.id)}
                          className="flex items-center gap-[6px] lg:gap-[8px] text-[#999999] text-[12px] lg:text-[14px] font-normal px-4 lg:px-[20px] py-[8px] lg:py-[10px] rounded-[8px] cursor-pointer hover:text-red-500 hover:bg-red-50 transition-all"
                        >
                          <IoTrashOutline className="w-[16px] h-[16px] lg:w-[18px] lg:h-[18px]" />
                          {t('shippingAddress.actions.delete')}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 lg:mt-[32px] bg-gradient-to-b from-[#F5F1EA] to-white rounded-[12px] p-5 lg:p-[28px] flex items-center gap-4 lg:gap-[16px]">
              <IoShieldCheckmarkOutline className="w-[24px] h-[24px] lg:w-[28px] lg:h-[28px] text-[#8B7355] flex-shrink-0" />
              <div>
                <h4 className="text-[15px] lg:text-[18px] font-medium text-[#1A1A1A] mb-[6px]">{t('shippingAddress.security.title')}</h4>
                <p className="text-[12px] lg:text-[14px] font-normal text-[#666666] leading-[1.6]">
                  {t('shippingAddress.security.description')}
                </p>
              </div>
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