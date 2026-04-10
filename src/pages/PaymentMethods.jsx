import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  IoShieldCheckmarkOutline,
  IoAddOutline,
  IoTrashOutline,
  IoCardOutline,
  IoCheckmarkCircle,
  IoPersonOutline,
  IoBagCheckOutline,
  IoHeartOutline,
  IoSparkles,
  IoRibbonOutline,
  IoCalendarOutline,
  IoStarSharp,
  IoSettingsOutline,
  IoLocationOutline,
  IoNotificationsOutline,
  IoChevronDown,
} from 'react-icons/io5'
import { useAuth } from '../contexts/AuthContext'
import { useWishlist } from '../contexts/WishlistContext'
import { supabase } from '../lib/supabase'

export default function PaymentMethods() {
  const { user } = useAuth()
  const { wishlistCount } = useWishlist()

  const [paymentMethods, setPaymentMethods] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [stats, setStats] = useState({
    totalOrders: 0,
    reviewsWritten: 0,
    loyaltyPoints: 0,
    tier: 'Member'
  })

  const [formData, setFormData] = useState({
    card_holder_name: '',
    card_number: '',
    card_brand: 'Visa',
    expiry_month: '',
    expiry_year: '',
    is_default: false
  })

  useEffect(() => {
    if (user) {
      fetchPaymentMethods()
      fetchStats()
    }
  }, [user])

  const fetchPaymentMethods = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('payment_methods')
      .select('*')
      .eq('user_id', user.id)
      .order('is_default', { ascending: false })
      .order('created_at', { ascending: false })

    if (!error && data) {
      setPaymentMethods(data)
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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSaveCard = async () => {
    if (!formData.card_holder_name || !formData.card_number || !formData.expiry_month || !formData.expiry_year) {
      alert('Please fill in all required fields')
      return
    }

    if (formData.card_number.length < 4) {
      alert('Please enter a valid card number')
      return
    }

    const lastFour = formData.card_number.replace(/\s/g, '').slice(-4)

    if (formData.is_default) {
      await supabase
        .from('payment_methods')
        .update({ is_default: false })
        .eq('user_id', user.id)
    }

    const { data, error } = await supabase
      .from('payment_methods')
      .insert({
        user_id: user.id,
        card_holder_name: formData.card_holder_name,
        card_last_four: lastFour,
        card_brand: formData.card_brand,
        expiry_month: formData.expiry_month,
        expiry_year: formData.expiry_year,
        is_default: formData.is_default
      })
      .select()
      .single()

    if (!error && data) {
      setPaymentMethods([data, ...paymentMethods])
      resetForm()
      alert('Payment method added successfully')
    } else {
      alert('Failed to add payment method')
    }
  }

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this payment method?')) {
      const { error } = await supabase
        .from('payment_methods')
        .delete()
        .eq('id', id)

      if (!error) {
        setPaymentMethods(paymentMethods.filter(method => method.id !== id))
      }
    }
  }

  const handleSetDefault = async (id) => {
    await supabase
      .from('payment_methods')
      .update({ is_default: false })
      .eq('user_id', user.id)

    const { error } = await supabase
      .from('payment_methods')
      .update({ is_default: true })
      .eq('id', id)

    if (!error) {
      setPaymentMethods(paymentMethods.map(method => ({
        ...method,
        is_default: method.id === id
      })))
    }
  }

  const resetForm = () => {
    setFormData({
      card_holder_name: '',
      card_number: '',
      card_brand: 'Visa',
      expiry_month: '',
      expiry_year: '',
      is_default: false
    })
    setShowForm(false)
  }

  const getCardBrandStyles = (brand) => {
    const styles = {
      Visa: { bg: 'bg-blue-50', color: 'text-[#1434CB]', label: 'VISA' },
      Mastercard: { bg: 'bg-red-50', color: 'text-[#EB001B]', label: 'MC' },
      Amex: { bg: 'bg-green-50', color: 'text-green-700', label: 'AMEX' }
    }
    return styles[brand] || styles.Visa
  }

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'
  const userInitials = userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

  const navigationItems = [
    { label: 'Account Dashboard', path: '/dashboard', icon: IoPersonOutline, badge: null, tag: null },
    { label: 'Order History', path: '/order-tracking', icon: IoBagCheckOutline, badge: null, tag: null },
    { label: 'My Wishlist', path: '/wishlist', icon: IoHeartOutline, badge: wishlistCount > 0 ? wishlistCount : null, tag: null },
    { label: 'Shipping Addresses', path: '/shipping-address', icon: IoLocationOutline, badge: null, tag: null },
    { label: 'Payment Methods', path: '/payment-methods', icon: IoCardOutline, badge: null, tag: null, active: true },
    { label: 'Beauty Profile', path: '/skin-analysis', icon: IoSparkles, badge: null, tag: null },
    { label: 'Loyalty Program', path: '/account', icon: IoRibbonOutline, badge: stats.loyaltyPoints > 0 ? `${stats.loyaltyPoints.toLocaleString()} pts` : null, tag: null },
    { label: 'My Routines', path: '/beauty-journey', icon: IoCalendarOutline, badge: null, tag: null },
    { label: 'Reviews & Ratings', path: '/dashboard', icon: IoStarSharp, badge: null, tag: null },
    { label: 'Account Settings', path: '/privacy-settings', icon: IoSettingsOutline, badge: null, tag: null },
    { label: 'Notifications', path: '/notifications', icon: IoNotificationsOutline, badge: null, tag: null },
  ]

  const trustBadges = [
    { label: 'VISA', sublabel: 'Verified', color: 'text-[#1434CB]', bg: 'bg-blue-50' },
    { label: 'MC', sublabel: 'SecureCode', color: 'text-[#EB001B]', bg: 'bg-red-50' },
    { label: 'SSL', sublabel: '256-bit', color: 'text-green-700', bg: 'bg-green-50' },
    { label: 'PCI', sublabel: 'DSS', color: 'text-[#8B7355]', bg: 'bg-[#F5F1EA]' },
  ]

  const inputClass = "w-full h-[44px] lg:h-[48px] px-[16px] border-[1.5px] border-[#E8E3D9] rounded-[8px] text-[13px] lg:text-[15px] font-normal text-[#1A1A1A] outline-none focus:border-[#8B7355] transition-colors"
  const labelClass = "text-[12px] lg:text-[14px] font-medium text-[#666666] mb-[6px] lg:mb-[8px] block"

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[16px] text-[#666666]">Loading...</div>
      </div>
    )
  }

  return (
    <div className="bg-white font-['Cormorant_Garamond']">

      <div className="min-h-[48px] bg-[#FDFBF7] px-4 md:px-[60px] lg:px-[120px] flex items-center overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        <Link to="/"><span className="text-[13px] lg:text-[15px] font-normal text-[#8B7355] cursor-pointer whitespace-nowrap">Home</span></Link>
        <span className="text-[13px] lg:text-[15px] font-normal text-[#666666] mx-2">/</span>
        <Link to="/dashboard"><span className="hidden sm:inline text-[13px] lg:text-[15px] font-normal text-[#8B7355] cursor-pointer whitespace-nowrap">Account Dashboard</span></Link>
        <span className="hidden sm:inline text-[13px] lg:text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[13px] lg:text-[15px] font-normal text-[#666666] whitespace-nowrap">Payment Methods</span>
      </div>

      <div className="min-h-[100px] md:min-h-[120px] lg:min-h-[140px] bg-gradient-to-b from-[#FDFBF7] to-white flex flex-col items-center justify-center px-4 md:px-[60px] lg:px-[120px] py-6 md:py-0">
        <div className="max-w-[1200px] w-full">
          <h1 className="text-[28px] md:text-[38px] lg:text-[48px] font-semibold text-[#1A1A1A]">Payment Methods</h1>
          <p className="text-[14px] md:text-[16px] lg:text-[18px] font-normal text-[#666666] mt-[8px]">Manage your secure payment options</p>
        </div>
      </div>

      <div className="px-4 md:px-[60px] lg:px-[120px] py-6 md:py-10 lg:py-[48px]">
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-[40px]">

          <div className="w-full lg:w-[320px] lg:flex-shrink-0">

            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 lg:p-[28px] mb-5 lg:mb-[24px]">
              <div className="flex flex-col items-center">
                {user?.user_metadata?.avatar_url ? (
                  <img
                    src={user.user_metadata.avatar_url}
                    alt="User Avatar"
                    className="w-[90px] h-[90px] md:w-[100px] md:h-[100px] lg:w-[120px] lg:h-[120px] rounded-full object-cover border-[3px] border-[#C9A870] mb-4 lg:mb-[16px]"
                  />
                ) : (
                  <div className="w-[90px] h-[90px] md:w-[100px] md:h-[100px] lg:w-[120px] lg:h-[120px] rounded-full bg-[#C9A870] flex items-center justify-center text-white text-[36px] md:text-[40px] lg:text-[48px] font-semibold border-[3px] border-[#C9A870] mb-4 lg:mb-[16px]">
                    {userInitials}
                  </div>
                )}
                <h2 className="text-[20px] md:text-[22px] lg:text-[24px] font-semibold text-[#1A1A1A] mb-[4px]">{userName}</h2>
                <div className="bg-[#C9A870] text-white text-[11px] lg:text-[12px] font-medium px-[14px] lg:px-[16px] py-[5px] lg:py-[6px] rounded-full mb-4 lg:mb-[16px]">
                  {stats.tier} Member
                </div>
                <div className="flex items-center gap-[8px]">
                  <IoSparkles className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#C9A870]" />
                  <span className="text-[17px] lg:text-[20px] font-medium text-[#8B7355]">{stats.loyaltyPoints.toLocaleString()} Points</span>
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
                  <div className="text-[10px] lg:text-[11px] font-light text-[#666666] leading-tight">Total Orders</div>
                </div>
                <div className="text-center">
                  <div className="text-[20px] lg:text-[24px] font-semibold text-[#8B7355] mb-[4px]">{wishlistCount}</div>
                  <div className="text-[10px] lg:text-[11px] font-light text-[#666666] leading-tight">Wishlist Items</div>
                </div>
                <div className="text-center">
                  <div className="text-[20px] lg:text-[24px] font-semibold text-[#8B7355] mb-[4px]">{stats.reviewsWritten}</div>
                  <div className="text-[10px] lg:text-[11px] font-light text-[#666666] leading-tight">Reviews Written</div>
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
              Add New Payment Method
            </button>

            {showForm && (
              <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[32px] mb-6 lg:mb-[32px] border-l-4 border-[#C9A870]">
                <h3 className="text-[18px] md:text-[20px] lg:text-[22px] font-semibold text-[#1A1A1A] mb-5 lg:mb-[24px]">
                  Add New Card
                </h3>
                <div className="space-y-4 lg:space-y-[16px]">
                  <div>
                    <label className={labelClass}>Card Holder Name</label>
                    <input
                      type="text"
                      name="card_holder_name"
                      value={formData.card_holder_name}
                      onChange={handleInputChange}
                      placeholder="Name on card"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Card Number</label>
                    <input
                      type="text"
                      name="card_number"
                      value={formData.card_number}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                      className={inputClass}
                    />
                    <p className="text-[11px] text-[#999999] mt-[6px]">Only the last 4 digits will be saved</p>
                  </div>
                  <div>
                    <label className={labelClass}>Card Brand</label>
                    <div className="relative">
                      <select
                        name="card_brand"
                        value={formData.card_brand}
                        onChange={handleInputChange}
                        className={inputClass + ' appearance-none cursor-pointer pr-[40px]'}
                      >
                        <option>Visa</option>
                        <option>Mastercard</option>
                        <option>Amex</option>
                      </select>
                      <IoChevronDown className="absolute right-[14px] top-1/2 -translate-y-1/2 w-[15px] h-[15px] lg:w-[16px] lg:h-[16px] text-[#8B7355] pointer-events-none" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 lg:gap-[16px]">
                    <div>
                      <label className={labelClass}>Expiry Month</label>
                      <input
                        type="text"
                        name="expiry_month"
                        value={formData.expiry_month}
                        onChange={handleInputChange}
                        placeholder="MM"
                        maxLength="2"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Expiry Year</label>
                      <input
                        type="text"
                        name="expiry_year"
                        value={formData.expiry_year}
                        onChange={handleInputChange}
                        placeholder="YY"
                        maxLength="2"
                        className={inputClass}
                      />
                    </div>
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
                    <label htmlFor="is_default" className="text-[13px] lg:text-[14px] font-normal text-[#666666] cursor-pointer">Set as default payment method</label>
                  </div>
                  <div className="flex gap-4 lg:gap-[16px] pt-[8px]">
                    <button
                      onClick={handleSaveCard}
                      className="flex-1 h-[48px] lg:h-[52px] bg-[#8B7355] text-white text-[14px] lg:text-[15px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors"
                    >
                      Save Card
                    </button>
                    <button
                      onClick={resetForm}
                      className="flex-1 h-[48px] lg:h-[52px] bg-white border border-[#E8E3D9] text-[#666666] text-[14px] lg:text-[15px] font-medium rounded-[8px] hover:border-[#8B7355] hover:text-[#8B7355] transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {paymentMethods.length === 0 ? (
              <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-10 lg:p-[48px] text-center">
                <IoCardOutline className="w-[56px] h-[56px] lg:w-[64px] lg:h-[64px] text-[#C9A870] mx-auto mb-[20px]" />
                <h3 className="text-[20px] lg:text-[24px] font-semibold text-[#1A1A1A] mb-[12px]">No payment methods saved yet</h3>
                <p className="text-[14px] lg:text-[16px] text-[#666666] mb-[24px]">Add your first payment method to get started</p>
                <button
                  onClick={() => {
                    resetForm()
                    setShowForm(true)
                  }}
                  className="bg-[#8B7355] text-white text-[14px] lg:text-[15px] font-medium px-[24px] py-[12px] rounded-[8px] cursor-pointer hover:bg-[#7a6448] transition-colors"
                >
                  Add Card
                </button>
              </div>
            ) : (
              <div className="space-y-5 lg:space-y-[24px]">
                {paymentMethods.map((method) => {
                  const brandStyles = getCardBrandStyles(method.card_brand)
                  return (
                    <div key={method.id} className={`bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[32px] transition-all hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] ${method.is_default ? 'border-l-4 border-[#8B7355]' : ''}`}>

                      <div className="flex items-center justify-between mb-4 lg:mb-[24px]">
                        <div className="flex items-center gap-3 lg:gap-[16px]">
                          <div className={`w-[56px] h-[36px] lg:w-[64px] lg:h-[40px] rounded-[6px] flex items-center justify-center ${brandStyles.bg}`}>
                            <span className={`text-[13px] lg:text-[15px] font-bold ${brandStyles.color}`}>{brandStyles.label}</span>
                          </div>
                          <IoCardOutline className="w-[22px] h-[22px] lg:w-[24px] lg:h-[24px] text-[#666666]" />
                        </div>
                        {method.is_default && (
                          <div className="flex items-center gap-[6px] bg-[#F5F1EA] text-[#8B7355] text-[11px] lg:text-[12px] font-medium px-[10px] lg:px-[12px] py-[5px] lg:py-[6px] rounded-full">
                            <IoCheckmarkCircle className="w-[13px] h-[13px] lg:w-[14px] lg:h-[14px]" />
                            Default
                          </div>
                        )}
                      </div>

                      <div className="space-y-[8px] lg:space-y-[10px] mb-4 lg:mb-[24px]">
                        <div className="text-[14px] lg:text-[16px] font-medium text-[#1A1A1A]">{method.card_holder_name}</div>
                        <div className="text-[16px] md:text-[18px] lg:text-[20px] font-normal text-[#3D3D3D] tracking-[4px] lg:tracking-[6px]">
                          •••• •••• •••• {method.card_last_four}
                        </div>
                        <div className="text-[12px] lg:text-[14px] font-normal text-[#666666]">
                          Valid until {method.expiry_month}/{method.expiry_year}
                        </div>
                      </div>

                      <div className="border-t border-[#E8E3D9] pt-4 lg:pt-[20px]">
                        <div className="flex items-center gap-2 lg:gap-[12px] flex-wrap">
                          {!method.is_default && (
                            <button
                              onClick={() => handleSetDefault(method.id)}
                              className="bg-white border border-[#8B7355] text-[#8B7355] text-[12px] lg:text-[14px] font-medium px-4 lg:px-[20px] py-[8px] lg:py-[10px] rounded-[8px] cursor-pointer hover:bg-[#8B7355] hover:text-white transition-all"
                            >
                              Set as Default
                            </button>
                          )}
                          {!method.is_default && (
                            <button
                              onClick={() => handleDelete(method.id)}
                              className="flex items-center gap-[6px] lg:gap-[8px] text-[#999999] text-[12px] lg:text-[14px] font-normal px-4 lg:px-[20px] py-[8px] lg:py-[10px] rounded-[8px] cursor-pointer hover:text-red-500 hover:bg-red-50 transition-all"
                            >
                              <IoTrashOutline className="w-[16px] h-[16px] lg:w-[18px] lg:h-[18px]" />
                              Delete
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            <div className="mt-5 lg:mt-[32px] bg-gradient-to-b from-[#F5F1EA] to-white rounded-[12px] p-5 lg:p-[32px] flex items-center gap-4 lg:gap-[16px]">
              <IoShieldCheckmarkOutline className="w-[26px] h-[26px] lg:w-[32px] lg:h-[32px] text-[#8B7355] flex-shrink-0" />
              <div>
                <h4 className="text-[15px] lg:text-[18px] font-medium text-[#1A1A1A] mb-[6px]">Bank-Level Security</h4>
                <p className="text-[12px] lg:text-[14px] font-normal text-[#666666] leading-[1.6]">
                  All payment information is encrypted with 256-bit SSL technology and PCI DSS compliant. Your card details are never stored on our servers.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-[12px] p-4 lg:p-[24px] mt-4 lg:mt-[16px] shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
              <div className="flex items-center justify-around gap-3 lg:gap-[24px]">
                {trustBadges.map((badge, idx) => (
                  <div key={idx} className={`flex flex-col items-center justify-center w-[68px] h-[44px] lg:w-[80px] lg:h-[48px] rounded-[8px] ${badge.bg}`}>
                    <span className={`text-[12px] lg:text-[14px] font-bold ${badge.color}`}>{badge.label}</span>
                    <span className={`text-[9px] lg:text-[10px] font-normal ${badge.color} opacity-80`}>{badge.sublabel}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="h-[40px] md:h-[60px] lg:h-[80px]" />
    </div>
  )
}