import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import {
  IoBagOutline,
  IoCheckmark,
  IoLocationOutline,
  IoMailOutline,
  IoChatbubbleEllipsesOutline,
  IoHelpCircleOutline,
  IoChevronForward,
  IoCopyOutline,
  IoOpenOutline,
  IoPersonOutline,
  IoBagCheckOutline,
  IoHeartOutline,
  IoSparkles,
  IoRibbonOutline,
  IoCalendarOutline,
  IoStarSharp,
  IoSettingsOutline,
  IoDocumentTextOutline,
  IoCardOutline,
} from 'react-icons/io5'
import { useAuth } from '../contexts/AuthContext'
import { useWishlist } from '../contexts/WishlistContext'
import { supabase } from '../lib/supabase'
import LoadingSpinner from '../components/LoadingSpinner'

export default function OrderTracking() {
  const [searchParams] = useSearchParams()
  const { user } = useAuth()
  const { wishlistItems } = useWishlist()
  const [order, setOrder] = useState(null)
  const [recentOrders, setRecentOrders] = useState([])
  const [allOrders, setAllOrders] = useState([])
  const [loyaltyPoints, setLoyaltyPoints] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        setError('Please log in to view your orders')
        setLoading(false)
        return
      }

      try {
        const orderId = searchParams.get('orderId')

        const { data: allOrdersData, error: allOrdersError } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })

        if (allOrdersError) throw allOrdersError

        setAllOrders(allOrdersData || [])

        const totalPoints = allOrdersData?.reduce((sum, order) => sum + (parseFloat(order.total) || 0), 0) || 0
        setLoyaltyPoints(Math.floor(totalPoints))

        let mainOrder
        if (orderId) {
          mainOrder = allOrdersData?.find(o => o.id === orderId)
        } else {
          mainOrder = allOrdersData?.[0]
        }

        if (!mainOrder) {
          setError('No order found')
          setLoading(false)
          return
        }

        setOrder(mainOrder)

        const recentOrdersData = allOrdersData?.slice(0, 3) || []
        setRecentOrders(recentOrdersData)
      } catch (err) {
        console.error('Error fetching orders:', err)
        setError('Failed to load orders')
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [user, searchParams])

  const calculateDeliveryDate = (createdAt, deliveryMethod) => {
    const orderDate = new Date(createdAt)
    let minDays, maxDays

    if (deliveryMethod?.toLowerCase().includes('express')) {
      minDays = 1
      maxDays = 2
    } else if (deliveryMethod?.toLowerCase().includes('same-day')) {
      minDays = 0
      maxDays = 0
    } else {
      minDays = 3
      maxDays = 5
    }

    const addBusinessDays = (date, days) => {
      const result = new Date(date)
      let addedDays = 0
      while (addedDays < days) {
        result.setDate(result.getDate() + 1)
        const dayOfWeek = result.getDay()
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
          addedDays++
        }
      }
      return result
    }

    const deliveryDate = addBusinessDays(orderDate, maxDays)
    return deliveryDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const getTrackingStages = (createdAt, deliveryMethod) => {
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

    const isProcessing = now >= oneHourLater
    const isInTransit = isProcessing
    const isDelivered = now >= deliveryDate

    const formatTime = (date) => {
      return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      })
    }

    return [
      {
        label: 'Order Confirmed',
        time: formatTime(orderDate),
        completed: true,
        active: false
      },
      {
        label: 'Processing',
        time: formatTime(oneHourLater),
        completed: isProcessing,
        active: !isProcessing
      },
      {
        label: 'In Transit',
        time: isInTransit ? formatTime(oneHourLater) : 'Pending',
        completed: isDelivered,
        active: isInTransit && !isDelivered
      },
      {
        label: 'Delivered',
        time: isDelivered ? formatTime(deliveryDate) : formatTime(deliveryDate),
        completed: isDelivered,
        active: false
      }
    ]
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

  if (loading) {
    return <LoadingSpinner />
  }

  if (error || !order) {
    return (
      <div className="bg-white font-['Cormorant_Garamond'] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-[18px] text-[#666666] mb-6">{error || 'Order not found'}</p>
          <Link to="/collections">
            <button className="h-[48px] px-[32px] bg-[#8B7355] text-white text-[15px] font-medium rounded-[8px] cursor-pointer hover:bg-[#7a6448] transition-colors">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    )
  }

  const orderItems = order.items || []
  const shippingAddress = order.shipping_address || {}
  const deliveryMethod = order.delivery_method || 'Standard Delivery'
  const estimatedDelivery = calculateDeliveryDate(order.created_at, deliveryMethod)
  const trackingStages = getTrackingStages(order.created_at, deliveryMethod)
  const orderStatus = getOrderStatus(order.created_at, deliveryMethod)

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'
  const userEmail = user?.email || ''
  const userAvatar = user?.user_metadata?.avatar_url
  const userInitials = userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  const wishlistCount = wishlistItems?.length || 0

  const totalOrders = allOrders.length
  const inTransit = allOrders.filter(o => {
    const status = getOrderStatus(o.created_at, o.delivery_method)
    return status === 'Processing' || status === 'In Transit'
  }).length
  const delivered = allOrders.filter(o => {
    const status = getOrderStatus(o.created_at, o.delivery_method)
    return status === 'Delivered'
  }).length

  const navigationItems = [
    { icon: IoPersonOutline, label: 'Account Dashboard', path: '/dashboard', active: false },
    { icon: IoBagCheckOutline, label: 'Order History', path: '/order-tracking', active: true },
    { icon: IoHeartOutline, label: 'My Wishlist', path: '/wishlist', active: false, badge: wishlistCount > 0 ? `${wishlistCount}` : null },
    { icon: IoLocationOutline, label: 'Shipping Addresses', path: '/shipping-address', active: false },
    { icon: IoCardOutline, label: 'Payment Methods', path: '/payment-methods', active: false },
  ]

  return (
    <div className="bg-white font-['Cormorant_Garamond']">

      {/* ── Hero ── */}
      <div className="min-h-[140px] md:min-h-[170px] lg:min-h-[200px] bg-gradient-to-b from-[#FDFBF7] to-white flex flex-col items-center justify-center px-4 md:px-[60px] lg:px-[120px] py-6 md:py-0">
        <div className="max-w-[1200px] w-full">
          <div className="text-[12px] lg:text-[13px] font-light text-[#666666] mb-3 lg:mb-[16px]">
            Home / Account Dashboard / Track Order
          </div>
          <h1 className="text-[28px] md:text-[38px] lg:text-[48px] font-semibold text-[#1A1A1A]">Track Your Order</h1>
          <p className="text-[14px] md:text-[16px] lg:text-[18px] font-normal text-[#666666] mt-[8px]">Real-time tracking information for your Shan Loray orders</p>
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
                  {loyaltyPoints >= 3000 ? 'Gold Member' : loyaltyPoints >= 2000 ? 'Elite Member' : 'Member'}
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

            {/* Quick Stats */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 lg:p-[24px]">
              <div className="grid grid-cols-3 gap-3 lg:gap-[16px]">
                <div className="text-center">
                  <div className="text-[20px] lg:text-[24px] font-semibold text-[#8B7355] mb-[4px]">{totalOrders}</div>
                  <div className="text-[10px] lg:text-[11px] font-light text-[#666666] leading-tight">Total Orders</div>
                </div>
                <div className="text-center">
                  <div className="text-[20px] lg:text-[24px] font-semibold text-[#8B7355] mb-[4px]">{inTransit}</div>
                  <div className="text-[10px] lg:text-[11px] font-light text-[#666666] leading-tight">In Transit</div>
                </div>
                <div className="text-center">
                  <div className="text-[20px] lg:text-[24px] font-semibold text-[#8B7355] mb-[4px]">{delivered}</div>
                  <div className="text-[10px] lg:text-[11px] font-light text-[#666666] leading-tight">Delivered</div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Main Panel ── */}
          <div className="flex-1 min-w-0">

            {/* Order Status Timeline */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[40px] mb-5 lg:mb-[24px]">
              <div className="mb-5 lg:mb-[32px]">
                <h3 className="text-[17px] md:text-[18px] lg:text-[20px] font-semibold text-[#1A1A1A] mb-[4px]">#{order.id.slice(0, 8).toUpperCase()}</h3>
                <p className="text-[12px] lg:text-[14px] font-normal text-[#666666]">
                  Placed on {new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>

              {/* Progress Bar — horizontal on md+, vertical on mobile */}
              <div className="hidden sm:flex items-center justify-between mb-8 lg:mb-[48px]">
                {trackingStages.map((stage, index) => (
                  <div key={stage.label} className="flex items-center flex-1">
                    <div className="flex flex-col items-center">
                      <div className={`w-[24px] h-[24px] lg:w-[28px] lg:h-[28px] rounded-full flex items-center justify-center mb-[10px] lg:mb-[12px] ${
                        stage.completed ? 'bg-[#8B7355]' : stage.active ? 'bg-[#C9A870]' : 'bg-white border-2 border-[#E8E3D9]'
                      }`}>
                        {stage.completed && <IoCheckmark className="w-[14px] h-[14px] lg:w-[18px] lg:h-[18px] text-white" />}
                        {stage.active && !stage.completed && <IoBagOutline className="w-[12px] h-[12px] lg:w-[16px] lg:h-[16px] text-white" />}
                      </div>
                      <div className="text-center">
                        <div className={`text-[11px] md:text-[12px] lg:text-[14px] font-medium mb-[4px] ${stage.active ? 'text-[#1A1A1A]' : 'text-[#999999]'}`}>
                          {stage.label}
                        </div>
                        <div className="text-[10px] lg:text-[12px] font-light text-[#999999]">{stage.time}</div>
                      </div>
                    </div>
                    {index < 3 && (
                      <div className={`flex-1 h-[2px] mx-[8px] lg:mx-[16px] mb-[40px] lg:mb-[48px] ${stage.completed ? 'bg-[#8B7355]' : 'bg-[#E8E3D9]'}`} />
                    )}
                  </div>
                ))}
              </div>

              {/* Mobile vertical timeline */}
              <div className="flex sm:hidden flex-col gap-0 mb-6">
                {trackingStages.map((stage, index) => (
                  <div key={stage.label} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-[22px] h-[22px] rounded-full flex items-center justify-center flex-shrink-0 ${
                        stage.completed ? 'bg-[#8B7355]' : stage.active ? 'bg-[#C9A870]' : 'bg-white border-2 border-[#E8E3D9]'
                      }`}>
                        {stage.completed && <IoCheckmark className="w-[12px] h-[12px] text-white" />}
                        {stage.active && !stage.completed && <IoBagOutline className="w-[11px] h-[11px] text-white" />}
                      </div>
                      {index < 3 && <div className={`w-[2px] flex-1 min-h-[28px] my-[4px] ${stage.completed ? 'bg-[#8B7355]' : 'bg-[#E8E3D9]'}`} />}
                    </div>
                    <div className="pb-4">
                      <div className={`text-[13px] font-medium mb-[2px] ${stage.active ? 'text-[#1A1A1A]' : 'text-[#999999]'}`}>{stage.label}</div>
                      <div className="text-[11px] font-light text-[#999999]">{stage.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Details */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[32px] mb-5 lg:mb-[24px]">
              <h3 className="text-[16px] md:text-[17px] lg:text-[18px] font-semibold text-[#1A1A1A] mb-5 lg:mb-[24px]">Shipping Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-[32px] mb-5 lg:mb-[24px]">
                <div>
                  <div className="mb-4 lg:mb-[20px]">
                    <div className="text-[12px] lg:text-[13px] font-normal text-[#666666] mb-[6px] lg:mb-[8px]">Order ID</div>
                    <div className="flex items-center gap-[8px]">
                      <span className="text-[13px] md:text-[14px] lg:text-[16px] font-medium text-[#2B2B2B]">{order.id}</span>
                      <IoCopyOutline
                        className="w-[16px] h-[16px] lg:w-[18px] lg:h-[18px] text-[#8B7355] cursor-pointer hover:text-[#7a6448] transition-colors flex-shrink-0"
                        onClick={() => navigator.clipboard.writeText(order.id)}
                      />
                    </div>
                  </div>
                  <div className="mb-4 lg:mb-[20px]">
                    <div className="text-[12px] lg:text-[13px] font-normal text-[#666666] mb-[6px] lg:mb-[8px]">Delivery Method</div>
                    <div className="text-[14px] lg:text-[16px] font-medium text-[#2B2B2B]">{deliveryMethod}</div>
                  </div>
                  <div>
                    <div className="text-[12px] lg:text-[13px] font-normal text-[#666666] mb-[6px] lg:mb-[8px]">Status</div>
                    <div className={`text-white text-[12px] lg:text-[13px] font-medium px-[10px] lg:px-[12px] py-[5px] lg:py-[6px] rounded-full inline-block ${
                      orderStatus === 'Delivered' ? 'bg-green-600' : 'bg-[#C9A870]'
                    }`}>
                      {orderStatus}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="mb-4 lg:mb-[20px]">
                    <div className="text-[12px] lg:text-[13px] font-normal text-[#666666] mb-[6px] lg:mb-[8px]">Estimated Delivery</div>
                    <div className="flex items-center gap-[8px]">
                      <IoCalendarOutline className="w-[16px] h-[16px] lg:w-[18px] lg:h-[18px] text-[#8B7355]" />
                      <span className="text-[14px] lg:text-[16px] font-medium text-[#2B2B2B]">{estimatedDelivery}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-[12px] lg:text-[13px] font-normal text-[#666666] mb-[6px] lg:mb-[8px]">Shipping Address</div>
                    <div className="flex items-start gap-[8px]">
                      <IoLocationOutline className="w-[16px] h-[16px] lg:w-[18px] lg:h-[18px] text-[#8B7355] mt-[2px] flex-shrink-0" />
                      <div className="text-[13px] lg:text-[15px] font-normal text-[#2B2B2B] leading-[1.6]">
                        {shippingAddress.name || 'N/A'}<br />
                        {shippingAddress.street || 'N/A'}<br />
                        {shippingAddress.city && shippingAddress.state && shippingAddress.zip
                          ? `${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.zip}`
                          : 'N/A'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[32px] mb-5 lg:mb-[24px]">
              <h3 className="text-[16px] md:text-[17px] lg:text-[18px] font-semibold text-[#1A1A1A] mb-4 lg:mb-[24px]">Order Items</h3>
              <div className="space-y-4 lg:space-y-[20px]">
                {orderItems.map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center gap-4 lg:gap-[20px]">
                      <img
                        src={item.product_image}
                        alt={item.product_name}
                        className="w-[72px] h-[72px] md:w-[88px] md:h-[88px] lg:w-[100px] lg:h-[100px] object-cover rounded-[8px] flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] lg:text-[12px] font-light italic text-[#8B7355] mb-[4px]">{item.brand}</div>
                        <h4 className="text-[14px] lg:text-[16px] font-medium text-[#1A1A1A] mb-[8px]">{item.product_name}</h4>
                        <div className="flex items-center gap-4 lg:gap-[24px]">
                          <span className="text-[13px] lg:text-[14px] font-normal text-[#666666]">Qty: {item.quantity}</span>
                          <span className="text-[15px] lg:text-[16px] font-semibold text-[#2B2B2B]">${(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                    {index < orderItems.length - 1 && <div className="h-[1px] bg-[#E8E3D9] mt-4 lg:mt-[20px]" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Updates */}
            <div className="bg-[#FDFBF7] rounded-[12px] p-5 md:p-6 lg:p-[32px] mb-5 lg:mb-[24px]">
              <h3 className="text-[16px] md:text-[17px] lg:text-[18px] font-semibold text-[#1A1A1A] mb-5 lg:mb-[24px]">Recent Updates</h3>
              <div className="space-y-5 lg:space-y-[24px]">
                {trackingStages.filter(stage => stage.completed || stage.active).reverse().map((stage, index, arr) => (
                  <div key={index} className="flex gap-3 lg:gap-[16px]">
                    <div className="flex flex-col items-center">
                      <div className="w-[28px] h-[28px] lg:w-[32px] lg:h-[32px] bg-white rounded-full flex items-center justify-center border-2 border-[#8B7355] flex-shrink-0">
                        <IoLocationOutline className="w-[14px] h-[14px] lg:w-[16px] lg:h-[16px] text-[#8B7355]" />
                      </div>
                      {index < arr.length - 1 && (
                        <div className="w-[2px] flex-1 min-h-[32px] bg-[#E8E3D9] my-[6px] lg:my-[8px]" />
                      )}
                    </div>
                    <div className="flex-1 pb-[8px]">
                      <div className="text-[11px] lg:text-[13px] font-normal text-[#666666] mb-[4px]">{stage.time}</div>
                      <div className="text-[13px] lg:text-[15px] font-normal text-[#2B2B2B] mb-[4px]">{stage.label}</div>
                      <div className="text-[11px] lg:text-[13px] font-light text-[#999999]">
                        {stage.label === 'Order Confirmed' && 'Your order has been received and confirmed'}
                        {stage.label === 'Processing' && 'Your order is being prepared for shipment'}
                        {stage.label === 'In Transit' && 'Your order is on its way'}
                        {stage.label === 'Delivered' && 'Your order has been delivered'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Need Help */}
            <div className="bg-gradient-to-br from-[#FDFBF7] to-[#F5F1EA] rounded-[12px] p-5 md:p-6 lg:p-[32px] mb-5 lg:mb-[24px]">
              <div className="flex items-center gap-4 lg:gap-[16px] mb-4 lg:mb-[16px]">
                <div className="w-[42px] h-[42px] lg:w-[48px] lg:h-[48px] bg-white rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
                  <IoMailOutline className="w-[20px] h-[20px] lg:w-[24px] lg:h-[24px] text-[#8B7355]" />
                </div>
                <div>
                  <h3 className="text-[16px] lg:text-[20px] font-semibold text-[#1A1A1A] mb-[4px]">Need Help?</h3>
                  <p className="text-[12px] lg:text-[14px] font-normal text-[#666666]">Our customer service team is here to assist you</p>
                </div>
              </div>
              <div className="flex items-center gap-3 lg:gap-[16px]">
                <a href="mailto:support@shanloray.ru" className="flex-1">
                  <button className="w-full flex items-center justify-center gap-[8px] bg-[#8B7355] text-white text-[13px] lg:text-[15px] font-medium h-[44px] lg:h-[48px] rounded-[8px] cursor-pointer hover:bg-[#7a6448] transition-colors">
                    <IoChatbubbleEllipsesOutline className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px]" />
                    Contact Support
                  </button>
                </a>
                <a href="https://shanloray.ru/#faq" target="_blank" rel="noreferrer" className="flex-1">
                  <button className="w-full flex items-center justify-center gap-[8px] bg-white border border-[#8B7355] text-[#8B7355] text-[13px] lg:text-[15px] font-medium h-[44px] lg:h-[48px] rounded-[8px] cursor-pointer hover:bg-[#8B7355] hover:text-white transition-all">
                    <IoHelpCircleOutline className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px]" />
                    View FAQs
                  </button>
                </a>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[32px]">
              <h3 className="text-[16px] md:text-[17px] lg:text-[18px] font-semibold text-[#1A1A1A] mb-4 lg:mb-[24px]">Your Recent Orders</h3>
              <div className="space-y-[12px] lg:space-y-[16px] mb-4 lg:mb-[20px]">
                {recentOrders.map((recentOrder) => {
                  const status = getOrderStatus(recentOrder.created_at, recentOrder.delivery_method)
                  const statusColor = status === 'Delivered' ? 'bg-green-600' : 'bg-[#C9A870]'

                  return (
                    <div key={recentOrder.id} className="flex items-center justify-between py-3 lg:py-[16px] border-b border-[#F5F1EA]">
                      <div>
                        <div className="text-[13px] lg:text-[15px] font-medium text-[#1A1A1A] mb-[4px]">
                          #{recentOrder.id.slice(0, 8).toUpperCase()}
                        </div>
                        <div className="text-[12px] lg:text-[13px] font-normal text-[#666666]">
                          {new Date(recentOrder.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                      </div>
                      <div className="flex items-center gap-3 lg:gap-[16px]">
                        <div className={`${statusColor} text-white text-[11px] lg:text-[12px] font-medium px-[10px] lg:px-[12px] py-[4px] rounded-full`}>
                          {status}
                        </div>
                        <Link to={`/order-tracking?orderId=${recentOrder.id}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                          <button className="border border-[#8B7355] text-[#8B7355] text-[12px] lg:text-[14px] font-medium px-3 lg:px-[16px] py-[5px] lg:py-[6px] rounded-[8px] cursor-pointer hover:bg-[#8B7355] hover:text-white transition-all">
                            Track
                          </button>
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </div>
              <Link to="/dashboard">
                <button className="w-full text-[13px] lg:text-[15px] font-medium text-[#8B7355] cursor-pointer flex items-center justify-center gap-[6px] hover:underline">
                  View All Orders
                  <IoChevronForward className="w-[14px] h-[14px] lg:w-[16px] lg:h-[16px]" />
                </button>
              </Link>
            </div>

          </div>
        </div>
      </div>

      <div className="h-[40px] md:h-[60px] lg:h-[80px]" />
    </div>
  )
}