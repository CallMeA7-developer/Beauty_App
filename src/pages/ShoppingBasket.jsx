import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  IoTrashOutline,
  IoCarOutline,
  IoReturnDownBackOutline,
  IoLockClosedOutline,
  IoArrowForwardOutline,
  IoAddOutline,
  IoRemoveOutline,
  IoInformationCircleOutline,
  IoHeartOutline,
} from 'react-icons/io5'

import { getCartItems, updateCartItemQuantity, removeFromCart } from '../lib/cartService'
import { useAuth } from '../contexts/AuthContext'
import LoadingSpinner from '../components/LoadingSpinner'
import { supabase } from '../lib/supabase'

export default function ShoppingBasket() {
  const { user, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/collections')
      return
    }

    if (user) {
      loadCartItems()

      const channel = supabase
        .channel('cart-realtime')
        .on('postgres_changes', {
          event: '*',
          schema: 'public',
          table: 'cart',
          filter: `user_id=eq.${user.id}`
        }, () => {
          loadCartItems()
        })
        .subscribe()

      return () => {
        supabase.removeChannel(channel)
      }
    }
  }, [user, authLoading, navigate])

  const loadCartItems = async () => {
    if (!user) return
    setLoading(true)
    const items = await getCartItems(user.id)
    setCartItems(items)
    setLoading(false)
  }

  const updateQty = async (id, delta) => {
    const item = cartItems.find(item => item.id === id)
    if (!item) return

    const newQuantity = Math.max(1, item.quantity + delta)

    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ))

    const { error } = await updateCartItemQuantity(id, newQuantity)
    if (error) {
      await loadCartItems()
    }
  }

  const removeItem = async (id) => {
    setCartItems(cartItems.filter(item => item.id !== id))

    const { error } = await removeFromCart(id)
    if (error) {
      await loadCartItems()
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0)
  const tax = subtotal * 0.1
  const total = subtotal + tax

  if (authLoading || loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="bg-white font-['Cormorant_Garamond']">

      {/* ── Breadcrumb ── */}
      <div className="min-h-[48px] bg-[#FDFBF7] px-4 md:px-[60px] lg:px-[120px] flex items-center">
        <Link to="/"><span className="text-[13px] lg:text-[15px] font-normal text-[#8B7355] cursor-pointer">Home</span></Link>
        <span className="text-[13px] lg:text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[13px] lg:text-[15px] font-normal text-[#666666]">Shopping Basket</span>
      </div>

      {/* ── Hero ── */}
      <div className="min-h-[90px] md:min-h-[110px] lg:min-h-[120px] bg-gradient-to-b from-[#FDFBF7] to-white flex flex-col items-center justify-center px-4 md:px-[60px] lg:px-[120px]">
        <div className="max-w-[1200px] w-full">
          <h1 className="text-[30px] md:text-[38px] lg:text-[48px] font-semibold text-[#1A1A1A]">Shopping Basket</h1>
          <p className="text-[14px] md:text-[16px] lg:text-[18px] font-normal text-[#666666] mt-[6px] lg:mt-[8px]">{cartItems.length} items in your basket</p>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="px-4 md:px-[60px] lg:px-[120px] py-6 md:py-10 lg:py-[48px]">
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-[40px]">

          {/* ── Cart Items ── */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[32px]">
              {cartItems.length === 0 ? (
                <div className="text-center py-10 lg:py-[64px]">
                  <p className="text-[20px] lg:text-[24px] font-medium text-[#666666] mb-[24px]">Your basket is empty</p>
                  <Link to="/collections">
                    <button className="h-[48px] lg:h-[52px] px-[32px] lg:px-[40px] bg-[#8B7355] text-white text-[15px] lg:text-[16px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">
                      Start Shopping
                    </button>
                  </Link>
                </div>
              ) : (
                cartItems.map((item, index) => (
                  <div key={item.id}>
                    <div className="flex gap-4 md:gap-5 lg:gap-[24px] py-[8px]">

                      {/* Image */}
                      <div className="w-[100px] h-[100px] md:w-[130px] md:h-[130px] lg:w-[160px] lg:h-[160px] rounded-[8px] overflow-hidden flex-shrink-0">
                        <img src={item.product_image} alt={item.product_name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                      </div>

                      {/* Details */}
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <div className="text-[12px] lg:text-[13px] font-medium text-[#8B7355] mb-[4px]">{item.brand}</div>
                          <h3 className="text-[15px] md:text-[16px] lg:text-[18px] font-semibold text-[#1A1A1A] mb-[4px] leading-tight">{item.product_name}</h3>
                          <div className="text-[13px] lg:text-[14px] font-normal text-[#666666] mb-3 lg:mb-[16px]">{item.selected_size}</div>
                          <div className="text-[16px] lg:text-[18px] font-semibold text-[#1A1A1A]">${parseFloat(item.price).toFixed(2)}</div>
                        </div>
                        {/* Quantity + Wishlist */}
                        <div className="flex items-center gap-3 lg:gap-[20px] mt-3 lg:mt-0 flex-wrap">
                          <div className="flex items-center gap-[6px] lg:gap-[8px]">
                            <button
                              onClick={() => updateQty(item.id, -1)}
                              className="w-[32px] h-[32px] lg:w-[36px] lg:h-[36px] rounded-[8px] border-[1.5px] border-[#E8E3D9] flex items-center justify-center cursor-pointer hover:border-[#8B7355] transition-colors"
                            >
                              <IoRemoveOutline className="w-[14px] h-[14px] lg:w-[16px] lg:h-[16px] text-[#666666]" />
                            </button>
                            <div className="w-[48px] lg:w-[60px] h-[32px] lg:h-[36px] flex items-center justify-center border-[1.5px] border-[#E8E3D9] rounded-[8px] text-[14px] lg:text-[15px] font-medium text-[#1A1A1A]">
                              {item.quantity}
                            </div>
                            <button
                              onClick={() => updateQty(item.id, 1)}
                              className="w-[32px] h-[32px] lg:w-[36px] lg:h-[36px] rounded-[8px] border-[1.5px] border-[#E8E3D9] flex items-center justify-center cursor-pointer hover:border-[#8B7355] transition-colors"
                            >
                              <IoAddOutline className="w-[14px] h-[14px] lg:w-[16px] lg:h-[16px] text-[#666666]" />
                            </button>
                          </div>
                          <button className="flex items-center gap-[6px] text-[12px] lg:text-[13px] font-normal text-[#8B7355] cursor-pointer hover:underline">
                            <IoHeartOutline className="w-[14px] h-[14px] lg:w-[16px] lg:h-[16px]" />
                            Save for later
                          </button>
                        </div>
                      </div>

                      {/* Line Total + Remove */}
                      <div className="flex flex-col items-end justify-between flex-shrink-0">
                        <button onClick={() => removeItem(item.id)} className="cursor-pointer hover:scale-110 transition-transform">
                          <IoTrashOutline className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#C84848]" />
                        </button>
                        <div className="text-[17px] md:text-[18px] lg:text-[20px] font-semibold text-[#1A1A1A]">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>

                    {index < cartItems.length - 1 && (
                      <div className="h-[1px] bg-[#E8E3D9] my-5 lg:my-[28px]" />
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Continue Shopping */}
            <div className="mt-5 lg:mt-[24px]">
              <Link to="/collections">
                <button className="flex items-center gap-[8px] text-[14px] lg:text-[16px] font-medium text-[#8B7355] cursor-pointer hover:underline">
                  <span>Continue Shopping</span>
                  <IoArrowForwardOutline className="w-[14px] h-[14px] lg:w-[16px] lg:h-[16px]" />
                </button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-[20px] mt-5 lg:mt-[32px]">
              <div className="bg-[#FDFBF7] rounded-[8px] p-4 lg:p-[16px] flex gap-4 lg:gap-[16px]">
                <IoCarOutline className="w-[24px] h-[24px] lg:w-[28px] lg:h-[28px] text-[#8B7355] flex-shrink-0" />
                <div>
                  <div className="text-[14px] lg:text-[16px] font-semibold text-[#1A1A1A] mb-[4px]">Free Standard Shipping</div>
                  <div className="text-[12px] lg:text-[13px] font-normal text-[#666666]">On orders over $75</div>
                </div>
              </div>
              <div className="bg-[#FDFBF7] rounded-[8px] p-4 lg:p-[16px] flex gap-4 lg:gap-[16px]">
                <IoReturnDownBackOutline className="w-[24px] h-[24px] lg:w-[28px] lg:h-[28px] text-[#8B7355] flex-shrink-0" />
                <div>
                  <div className="text-[14px] lg:text-[16px] font-semibold text-[#1A1A1A] mb-[4px]">Easy Returns</div>
                  <div className="text-[12px] lg:text-[13px] font-normal text-[#666666]">30-day return policy</div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Order Summary ── */}
          <div className="w-full lg:w-[360px] lg:flex-shrink-0">
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[32px] lg:sticky lg:top-[24px]">
              <h2 className="text-[20px] md:text-[22px] lg:text-[24px] font-semibold text-[#1A1A1A] mb-5 lg:mb-[24px]">Order Summary</h2>

              {/* Line items */}
              <div className="space-y-3 lg:space-y-[16px] mb-4 lg:mb-[16px]">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between items-start gap-3">
                    <div className="min-w-0">
                      <div className="text-[13px] lg:text-[14px] font-normal text-[#2B2B2B] line-clamp-2">{item.product_name}</div>
                      <div className="text-[12px] lg:text-[13px] font-light text-[#999999]">Qty: {item.quantity}</div>
                    </div>
                    <span className="text-[13px] lg:text-[15px] font-medium text-[#1A1A1A] flex-shrink-0">${(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="h-[1px] bg-[#E8E3D9] mb-4 lg:mb-[16px]" />

              <div className="flex items-center justify-between mb-3 lg:mb-[16px]">
                <span className="text-[14px] lg:text-[16px] font-normal text-[#666666]">Subtotal</span>
                <span className="text-[14px] lg:text-[16px] font-normal text-[#1A1A1A]">${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-[6px]">
                  <span className="text-[14px] lg:text-[16px] font-normal text-[#666666]">Shipping</span>
                  <IoInformationCircleOutline className="w-[14px] h-[14px] lg:w-[16px] lg:h-[16px] text-[#999999]" />
                </div>
                <span className="text-[14px] lg:text-[16px] font-normal text-green-600">Free</span>
              </div>
              <div className="text-[12px] lg:text-[13px] font-light text-[#999999] mb-3 lg:mb-[16px]">Standard Delivery (3–5 days)</div>

              <div className="flex items-center justify-between mb-5 lg:mb-[24px]">
                <span className="text-[14px] lg:text-[16px] font-normal text-[#666666]">Estimated Tax</span>
                <span className="text-[14px] lg:text-[16px] font-normal text-[#1A1A1A]">${tax.toFixed(2)}</span>
              </div>

              <div className="h-[1px] bg-[#E8E3D9] mb-5 lg:mb-[24px]" />

              <div className="flex items-center justify-between mb-6 lg:mb-[32px]">
                <span className="text-[18px] lg:text-[20px] font-semibold text-[#1A1A1A]">Order Total</span>
                <span className="text-[18px] lg:text-[20px] font-semibold text-[#1A1A1A]">${total.toFixed(2)}</span>
              </div>

              {/* Promo Code */}
              <div className="flex gap-[8px] mb-5 lg:mb-[24px]">
                <input
                  type="text"
                  placeholder="Enter promo code"
                  className="flex-1 h-[40px] px-[14px] lg:px-[16px] border-[1.5px] border-[#E8E3D9] rounded-[8px] text-[13px] lg:text-[15px] font-light italic text-[#999999] outline-none focus:border-[#8B7355] transition-colors"
                />
                <button className="h-[40px] px-4 lg:px-[20px] bg-[#8B7355] text-white text-[13px] lg:text-[14px] font-medium rounded-[8px] cursor-pointer hover:bg-[#7a6448] transition-colors">
                  Apply
                </button>
              </div>

              {/* Checkout */}
              <Link to="/checkout">
                <button className="w-full h-[52px] lg:h-[56px] bg-[#8B7355] text-white text-[15px] lg:text-[16px] font-medium rounded-[8px] cursor-pointer hover:bg-[#7a6448] transition-colors mb-4 lg:mb-[16px]">
                  Proceed to Checkout
                </button>
              </Link>

              {/* Security */}
              <div className="flex items-center justify-center gap-[8px]">
                <IoLockClosedOutline className="w-[14px] h-[14px] lg:w-[16px] lg:h-[16px] text-[#666666]" />
                <span className="text-[12px] lg:text-[13px] font-normal text-[#666666]">Secure Checkout</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="h-[40px] md:h-[60px] lg:h-[80px]" />
    </div>
  )
}