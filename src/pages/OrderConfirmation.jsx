import { useState, useEffect } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import {
  IoCheckmarkCircle,
  IoMailOutline,
  IoCarOutline,
  IoDownloadOutline,
  IoArrowForward,
  IoGiftOutline,
  IoCardOutline,
} from 'react-icons/io5'
import { helpLinks } from '../data/checkout'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import LoadingSpinner from '../components/LoadingSpinner'

export default function OrderConfirmation() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { user } = useAuth()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchOrder = async () => {
      if (!user) {
        setError('Please log in to view your order')
        setLoading(false)
        return
      }

      try {
        const orderId = searchParams.get('orderId')

        let query = supabase
          .from('orders')
          .select('*')
          .eq('user_id', user.id)

        if (orderId) {
          query = query.eq('id', orderId)
        } else {
          query = query.order('created_at', { ascending: false }).limit(1)
        }

        const { data, error: fetchError } = await query.maybeSingle()

        if (fetchError) throw fetchError

        if (!data) {
          setError('No order found')
          setLoading(false)
          return
        }

        setOrder(data)
      } catch (err) {
        console.error('Error fetching order:', err)
        setError('Failed to load order')
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [user, searchParams])

  const calculateDeliveryDate = (createdAt, deliveryMethod) => {
    const orderDate = new Date(createdAt)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

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

    const minDate = addBusinessDays(orderDate, minDays)
    const maxDate = addBusinessDays(orderDate, maxDays)

    const formatDate = (date) => {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }

    if (minDays === 0 && maxDays === 0) {
      return `Today, ${formatDate(orderDate)}`
    }

    return `${formatDate(minDate)}–${formatDate(maxDate)}`
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
  const subtotal = order.subtotal || 0
  const shipping = order.shipping || 0
  const tax = order.tax || 0
  const total = order.total || 0
  const shippingAddress = order.shipping_address || {}
  const deliveryMethod = order.delivery_method || 'Standard Delivery'
  const estimatedDelivery = calculateDeliveryDate(order.created_at, deliveryMethod)

  return (
    <div className="bg-white font-['Cormorant_Garamond']">

      {/* ── Success Hero ── */}
      <div className="min-h-[180px] md:min-h-[200px] bg-gradient-to-b from-[#FDFBF7] to-white flex flex-col items-center justify-center py-8 md:py-[40px] px-4">
        <div className="w-[64px] h-[64px] md:w-[72px] md:h-[72px] lg:w-[80px] lg:h-[80px] rounded-full bg-green-600 flex items-center justify-center mb-5 lg:mb-[24px] shadow-[0_8px_32px_rgba(123,168,93,0.3)]">
          <IoCheckmarkCircle className="w-[36px] h-[36px] md:w-[40px] md:h-[40px] lg:w-[44px] lg:h-[44px] text-white" />
        </div>
        <h1 className="text-[28px] md:text-[32px] lg:text-[36px] font-semibold text-[#1A1A1A] mb-[8px] text-center">Order Confirmed!</h1>
        <p className="text-[15px] md:text-[16px] lg:text-[18px] font-normal text-[#666666] mb-4 lg:mb-[16px] text-center">Thank you for your purchase</p>
        <div className="bg-[#FDFBF7] border border-[#E8E3D9] rounded-[24px] px-5 lg:px-[28px] py-[10px] lg:py-[12px]">
          <span className="text-[16px] md:text-[18px] lg:text-[20px] font-medium text-[#8B7355]">Order #{order.id.slice(0, 8).toUpperCase()}</span>
        </div>
      </div>

      {/* ── Email Notice ── */}
      <div className="min-h-[52px] bg-[#FDFBF7] border-y border-[#E8E3D9] px-4 md:px-[60px] lg:px-[120px] flex items-center justify-center gap-[10px] lg:gap-[12px] py-3 text-center">
        <IoMailOutline className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#8B7355] flex-shrink-0" />
        <span className="text-[13px] md:text-[14px] lg:text-[15px] font-normal text-[#666666]">
          A confirmation email has been sent to <span className="text-[#8B7355] font-medium">{user?.email || 'your email'}</span>
        </span>
      </div>

      {/* ── Main Content ── */}
      <div className="px-4 md:px-[60px] lg:px-[120px] py-6 md:py-10 lg:py-[48px]">
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-[40px]">

          {/* ── Left ── */}
          <div className="flex-1 min-w-0">

            {/* Order Details */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[32px] mb-5 lg:mb-[24px]">
              <h2 className="text-[20px] md:text-[22px] lg:text-[24px] font-semibold text-[#1A1A1A] mb-5 lg:mb-[24px]">Order Details</h2>

              <div className="space-y-4 lg:space-y-[20px] mb-5 lg:mb-[24px]">
                {orderItems.map((item, index) => (
                  <div key={index}>
                    <div className="flex gap-3 md:gap-4 lg:gap-[16px]">
                      <img src={item.product_image} alt={item.product_name} className="w-[72px] h-[72px] md:w-[88px] md:h-[88px] lg:w-[100px] lg:h-[100px] rounded-[8px] object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] lg:text-[12px] font-medium text-[#8B7355] mb-[4px]">{item.brand}</div>
                        <div className="text-[14px] md:text-[15px] lg:text-[16px] font-normal text-[#1A1A1A] mb-[6px] lg:mb-[8px] leading-tight">{item.product_name}</div>
                        <div className="text-[13px] lg:text-[14px] font-normal text-[#666666]">{item.quantity} × ${parseFloat(item.price).toFixed(2)}</div>
                      </div>
                      <div className="flex items-start flex-shrink-0">
                        <span className="text-[14px] md:text-[15px] lg:text-[16px] font-semibold text-[#1A1A1A]">${(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                    {index < orderItems.length - 1 && <div className="h-[1px] bg-[#E8E3D9] mt-4 lg:mt-[20px]" />}
                  </div>
                ))}
              </div>

              {/* Price Summary */}
              <div className="pt-5 lg:pt-[24px] border-t border-[#E8E3D9]">
                <div className="space-y-3 lg:space-y-[12px] mb-4 lg:mb-[20px]">
                  <div className="flex justify-between">
                    <span className="text-[14px] lg:text-[16px] font-normal text-[#666666]">Subtotal</span>
                    <span className="text-[14px] lg:text-[16px] font-normal text-[#1A1A1A]">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[14px] lg:text-[16px] font-normal text-[#666666]">Shipping ({deliveryMethod})</span>
                    <span className={`text-[14px] lg:text-[16px] font-normal ${shipping === 0 ? 'text-green-600' : 'text-[#1A1A1A]'}`}>
                      {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[14px] lg:text-[16px] font-normal text-[#666666]">Tax</span>
                    <span className="text-[14px] lg:text-[16px] font-normal text-[#1A1A1A]">${tax.toFixed(2)}</span>
                  </div>
                </div>
                <div className="h-[1px] bg-[#E8E3D9] mb-4 lg:mb-[20px]" />
                <div className="flex justify-between">
                  <span className="text-[18px] md:text-[20px] lg:text-[22px] font-semibold text-[#1A1A1A]">Total Paid</span>
                  <span className="text-[18px] md:text-[20px] lg:text-[22px] font-semibold text-[#1A1A1A]">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[32px]">
              <h2 className="text-[20px] md:text-[22px] lg:text-[24px] font-semibold text-[#1A1A1A] mb-5 lg:mb-[24px]">Delivery Information</h2>

              {/* Address */}
              <div className="mb-4 lg:mb-[20px]">
                <div className="text-[12px] lg:text-[14px] font-medium text-[#666666] mb-3 lg:mb-[12px] uppercase tracking-[1px]">Shipping Address</div>
                <div className="text-[15px] lg:text-[16px] font-semibold text-[#1A1A1A] mb-[4px]">{shippingAddress.name || 'N/A'}</div>
                <div className="text-[13px] md:text-[14px] lg:text-[15px] font-normal text-[#666666] leading-[1.7]">
                  {shippingAddress.street || 'N/A'}<br />
                  {shippingAddress.city && shippingAddress.state && shippingAddress.zip
                    ? `${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.zip}`
                    : 'N/A'}<br />
                  {shippingAddress.country || 'N/A'}<br />
                  {shippingAddress.phone || 'N/A'}
                </div>
              </div>

              <div className="h-[1px] bg-[#E8E3D9] my-4 lg:my-[20px]" />

              {/* Delivery Method */}
              <div className="mb-4 lg:mb-[20px]">
                <div className="text-[12px] lg:text-[14px] font-medium text-[#666666] mb-3 lg:mb-[12px] uppercase tracking-[1px]">Delivery Method</div>
                <div className="flex items-center gap-[8px] mb-[4px]">
                  <IoCarOutline className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#8B7355]" />
                  <span className="text-[14px] lg:text-[16px] font-semibold text-[#1A1A1A]">{deliveryMethod}</span>
                </div>
                <div className="text-[13px] lg:text-[15px] font-normal text-green-600">Estimated delivery: {estimatedDelivery}</div>
              </div>

              <div className="h-[1px] bg-[#E8E3D9] my-4 lg:my-[20px]" />

              {/* Payment */}
              <div>
                <div className="text-[12px] lg:text-[14px] font-medium text-[#666666] mb-3 lg:mb-[12px] uppercase tracking-[1px]">Payment Method</div>
                <div className="flex items-center gap-3 lg:gap-[12px]">
                  <div className="flex items-center gap-[8px]">
                    <IoCardOutline className="w-[16px] h-[16px] lg:w-[18px] lg:h-[18px] text-[#666666]" />
                    <span className="text-[14px] lg:text-[16px] font-normal text-[#1A1A1A]">
                      {order.payment_status === 'pending' ? 'Payment Pending' : 'Payment Processed'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right ── */}
          <div className="w-full lg:w-[360px] lg:flex-shrink-0">

            {/* Action Card */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[32px] mb-5 lg:mb-[24px]">
              <Link to="/order-tracking">
                <button className="w-full h-[52px] lg:h-[56px] bg-[#8B7355] text-white text-[15px] lg:text-[16px] font-medium rounded-[8px] cursor-pointer hover:bg-[#7a6448] transition-colors mb-4 lg:mb-[16px]">
                  Track Your Order
                </button>
              </Link>
              <Link to="/collections">
                <button className="w-full h-[52px] lg:h-[56px] bg-white border-[1.5px] border-[#8B7355] text-[#8B7355] text-[15px] lg:text-[16px] font-medium rounded-[8px] cursor-pointer hover:bg-[#FDFBF7] transition-colors mb-5 lg:mb-[24px]">
                  Continue Shopping
                </button>
              </Link>
              <div className="pt-4 lg:pt-[20px] border-t border-[#E8E3D9] flex items-center gap-3 lg:gap-[12px] cursor-pointer group">
                <IoDownloadOutline className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#666666] group-hover:text-[#8B7355] transition-colors" />
                <span className="text-[13px] lg:text-[14px] font-medium text-[#8B7355] group-hover:underline">Download Order Receipt (PDF)</span>
              </div>
            </div>

            {/* Help Card */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[32px] mb-5 lg:mb-[24px]">
              <h3 className="text-[17px] md:text-[18px] lg:text-[20px] font-semibold text-[#1A1A1A] mb-4 lg:mb-[16px]">Need Help?</h3>
              <div>
                {helpLinks.map((item, index) => (
                  <div key={item.label}>
                    <Link
                      to={item.path}
                      className="py-3 lg:py-[14px] flex items-center justify-between cursor-pointer group"
                    >
                      <span className="text-[14px] lg:text-[15px] font-normal text-[#666666] group-hover:text-[#8B7355] transition-colors">{item.label}</span>
                      <IoArrowForward className="w-[15px] h-[15px] lg:w-[16px] lg:h-[16px] text-[#666666] group-hover:text-[#8B7355] group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </Link>
                    {index < helpLinks.length - 1 && <div className="h-[1px] bg-[#E8E3D9]" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Rewards Banner */}
            <div className="bg-gradient-to-br from-[#FDFBF7] to-[#F5F1EA] rounded-[12px] border border-[#E8E3D9] p-5 lg:p-[24px]">
              <div className="flex items-start gap-4 lg:gap-[16px]">
                <div className="w-[44px] h-[44px] lg:w-[48px] lg:h-[48px] bg-white rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
                  <IoGiftOutline className="w-[22px] h-[22px] lg:w-[24px] lg:h-[24px] text-[#C9A870]" />
                </div>
                <div>
                  <div className="text-[14px] lg:text-[15px] font-semibold text-[#1A1A1A] mb-[6px]">
                    You earned {Math.floor(total)} loyalty points!
                  </div>
                  <div className="text-[12px] lg:text-[13px] font-normal text-[#666666] mb-[8px]">
                    Points added to your account with this order.
                  </div>
                  <Link to="/dashboard">
                    <span className="text-[12px] lg:text-[13px] font-medium text-[#8B7355] underline cursor-pointer hover:text-[#7a6448] transition-colors">
                      View your rewards balance
                    </span>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="h-[40px] md:h-[60px] lg:h-[80px]" />
    </div>
  )
}