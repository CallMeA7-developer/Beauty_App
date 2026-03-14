import { useState } from 'react'
import { Link } from 'react-router-dom'
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

export default function ShoppingBasket() {
  const [cartItems, setCartItems] = useState([
    { id: 1, brand: 'LA MER', name: 'Crème de la Mer Moisturizing Cream', size: '60ml', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=320&h=320&fit=crop', price: 380, quantity: 1 },
    { id: 2, brand: 'ESTÉE LAUDER', name: 'Advanced Night Repair Serum', size: '50ml', image: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=320&h=320&fit=crop', price: 115, quantity: 2 },
    { id: 3, brand: 'TOM FORD', name: 'Black Orchid Eau de Parfum', size: '100ml', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=320&h=320&fit=crop', price: 265, quantity: 1 },
  ])

  const updateQty = (id, delta) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ))
  }

  const removeItem = (id) => setCartItems(cartItems.filter(item => item.id !== id))

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.1
  const total = subtotal + tax

  return (
    <div className="bg-white font-['Cormorant_Garamond']">

      {/* ── Breadcrumb ── */}
      <div className="min-h-[48px] bg-[#FDFBF7] px-[120px] flex items-center">
        <Link to="/"><span className="text-[15px] font-normal text-[#8B7355] cursor-pointer">Home</span></Link>
        <span className="text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[15px] font-normal text-[#666666]">Shopping Basket</span>
      </div>

      {/* ── Hero ── */}
      <div className="min-h-[120px] bg-gradient-to-b from-[#FDFBF7] to-white flex flex-col items-center justify-center px-[120px]">
        <div className="max-w-[1200px] w-full">
          <h1 className="text-[48px] font-semibold text-[#1A1A1A]">Shopping Basket</h1>
          <p className="text-[18px] font-normal text-[#666666] mt-[8px]">{cartItems.length} items in your basket</p>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="min-h-[600px] px-[120px] py-[48px]">
        <div className="max-w-[1200px] mx-auto flex gap-[40px]">

          {/* ── Cart Items ── */}
          <div className="flex-1">
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[32px]">
              {cartItems.length === 0 ? (
                <div className="text-center py-[64px]">
                  <p className="text-[24px] font-medium text-[#666666] mb-[24px]">Your basket is empty</p>
                  <Link to="/collections">
                    <button className="h-[52px] px-[40px] bg-[#8B7355] text-white text-[16px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">
                      Start Shopping
                    </button>
                  </Link>
                </div>
              ) : (
                cartItems.map((item, index) => (
                  <div key={item.id}>
                    <div className="flex gap-[24px] py-[8px]">
                      {/* Image */}
                      <div className="w-[160px] h-[160px] rounded-[8px] overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                      </div>

                      {/* Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="text-[13px] font-medium text-[#8B7355] mb-[4px]">{item.brand}</div>
                          <h3 className="text-[18px] font-semibold text-[#1A1A1A] mb-[4px]">{item.name}</h3>
                          <div className="text-[14px] font-normal text-[#666666] mb-[16px]">{item.size}</div>
                          <div className="text-[18px] font-semibold text-[#1A1A1A]">${item.price}</div>
                        </div>
                        {/* Quantity + Wishlist */}
                        <div className="flex items-center gap-[20px]">
                          <div className="flex items-center gap-[8px]">
                            <button
                              onClick={() => updateQty(item.id, -1)}
                              className="w-[36px] h-[36px] rounded-[8px] border-[1.5px] border-[#E8E3D9] flex items-center justify-center cursor-pointer hover:border-[#8B7355] transition-colors"
                            >
                              <IoRemoveOutline className="w-[16px] h-[16px] text-[#666666]" />
                            </button>
                            <div className="w-[60px] h-[36px] flex items-center justify-center border-[1.5px] border-[#E8E3D9] rounded-[8px] text-[15px] font-medium text-[#1A1A1A]">
                              {item.quantity}
                            </div>
                            <button
                              onClick={() => updateQty(item.id, 1)}
                              className="w-[36px] h-[36px] rounded-[8px] border-[1.5px] border-[#E8E3D9] flex items-center justify-center cursor-pointer hover:border-[#8B7355] transition-colors"
                            >
                              <IoAddOutline className="w-[16px] h-[16px] text-[#666666]" />
                            </button>
                          </div>
                          <button className="flex items-center gap-[6px] text-[13px] font-normal text-[#8B7355] cursor-pointer hover:underline">
                            <IoHeartOutline className="w-[16px] h-[16px]" />
                            Save for later
                          </button>
                        </div>
                      </div>

                      {/* Line Total + Remove */}
                      <div className="flex flex-col items-end justify-between">
                        <button onClick={() => removeItem(item.id)} className="cursor-pointer hover:scale-110 transition-transform">
                          <IoTrashOutline className="w-[20px] h-[20px] text-[#C84848]" />
                        </button>
                        <div className="text-[20px] font-semibold text-[#1A1A1A]">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>

                    {index < cartItems.length - 1 && (
                      <div className="h-[1px] bg-[#E8E3D9] my-[28px]" />
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Continue Shopping */}
            <div className="mt-[24px]">
              <Link to="/collections">
                <button className="flex items-center gap-[8px] text-[16px] font-medium text-[#8B7355] cursor-pointer hover:underline">
                  <span>Continue Shopping</span>
                  <IoArrowForwardOutline className="w-[16px] h-[16px]" />
                </button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-[20px] mt-[32px]">
              <div className="bg-[#FDFBF7] rounded-[8px] p-[16px] flex gap-[16px]">
                <IoCarOutline className="w-[28px] h-[28px] text-[#8B7355] flex-shrink-0" />
                <div>
                  <div className="text-[16px] font-semibold text-[#1A1A1A] mb-[4px]">Free Standard Shipping</div>
                  <div className="text-[13px] font-normal text-[#666666]">On orders over $75</div>
                </div>
              </div>
              <div className="bg-[#FDFBF7] rounded-[8px] p-[16px] flex gap-[16px]">
                <IoReturnDownBackOutline className="w-[28px] h-[28px] text-[#8B7355] flex-shrink-0" />
                <div>
                  <div className="text-[16px] font-semibold text-[#1A1A1A] mb-[4px]">Easy Returns</div>
                  <div className="text-[13px] font-normal text-[#666666]">30-day return policy</div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Order Summary ── */}
          <div className="w-[360px] flex-shrink-0">
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[32px] sticky top-[24px]">
              <h2 className="text-[24px] font-semibold text-[#1A1A1A] mb-[24px]">Order Summary</h2>

              {/* Line items */}
              <div className="space-y-[16px] mb-[16px]">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between items-start">
                    <div>
                      <div className="text-[14px] font-normal text-[#2B2B2B]">{item.name}</div>
                      <div className="text-[13px] font-light text-[#999999]">Qty: {item.quantity}</div>
                    </div>
                    <span className="text-[15px] font-medium text-[#1A1A1A]">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="h-[1px] bg-[#E8E3D9] mb-[16px]" />

              <div className="flex items-center justify-between mb-[16px]">
                <span className="text-[16px] font-normal text-[#666666]">Subtotal</span>
                <span className="text-[16px] font-normal text-[#1A1A1A]">${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex items-center justify-between mb-[4px]">
                <div className="flex items-center gap-[6px]">
                  <span className="text-[16px] font-normal text-[#666666]">Shipping</span>
                  <IoInformationCircleOutline className="w-[16px] h-[16px] text-[#999999]" />
                </div>
                <span className="text-[16px] font-normal text-green-600">Free</span>
              </div>
              <div className="text-[13px] font-light text-[#999999] mb-[16px]">Standard Delivery (3–5 days)</div>

              <div className="flex items-center justify-between mb-[24px]">
                <span className="text-[16px] font-normal text-[#666666]">Estimated Tax</span>
                <span className="text-[16px] font-normal text-[#1A1A1A]">${tax.toFixed(2)}</span>
              </div>

              <div className="h-[1px] bg-[#E8E3D9] mb-[24px]" />

              <div className="flex items-center justify-between mb-[32px]">
                <span className="text-[20px] font-semibold text-[#1A1A1A]">Order Total</span>
                <span className="text-[20px] font-semibold text-[#1A1A1A]">${total.toFixed(2)}</span>
              </div>

              {/* Promo Code */}
              <div className="flex gap-[8px] mb-[24px]">
                <input
                  type="text"
                  placeholder="Enter promo code"
                  className="flex-1 h-[40px] px-[16px] border-[1.5px] border-[#E8E3D9] rounded-[8px] text-[15px] font-light italic text-[#999999] outline-none focus:border-[#8B7355] transition-colors"
                />
                <button className="h-[40px] px-[20px] bg-[#8B7355] text-white text-[14px] font-medium rounded-[8px] cursor-pointer hover:bg-[#7a6448] transition-colors">
                  Apply
                </button>
              </div>

              {/* Checkout */}
              <Link to="/checkout">
                <button className="w-full h-[56px] bg-[#8B7355] text-white text-[16px] font-medium rounded-[8px] cursor-pointer hover:bg-[#7a6448] transition-colors mb-[16px]">
                  Proceed to Checkout
                </button>
              </Link>

              {/* Security */}
              <div className="flex items-center justify-center gap-[8px]">
                <IoLockClosedOutline className="w-[16px] h-[16px] text-[#666666]" />
                <span className="text-[13px] font-normal text-[#666666]">Secure Checkout</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="h-[80px]" />
    </div>
  )
}