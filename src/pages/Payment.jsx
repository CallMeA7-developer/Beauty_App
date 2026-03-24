import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  IoCheckmarkCircle,
  IoLockClosedOutline,
  IoShieldCheckmarkOutline,
  IoArrowBackOutline,
  IoAddOutline,
  IoCardOutline,
  IoLogoPaypal,
  IoPhonePortraitOutline,
  IoWalletOutline,
} from 'react-icons/io5'

export default function Payment() {
  const cartItems = [
    { id: 1, brand: 'LA MER',       name: 'Crème de la Mer Moisturizing Cream', quantity: 1, price: 380, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=160&h=160&fit=crop' },
    { id: 2, brand: 'ESTÉE LAUDER', name: 'Advanced Night Repair Serum',         quantity: 2, price: 115, image: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=160&h=160&fit=crop' },
    { id: 3, brand: 'TOM FORD',     name: 'Black Orchid Eau de Parfum',          quantity: 1, price: 265, image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=160&h=160&fit=crop' },
  ]

  const savedCards = [
    { id: 1, label: 'VISA', labelColor: 'text-[#1434CB]', labelBg: 'bg-blue-50',  last4: '4242', expiry: '12/2025' },
    { id: 2, label: 'MC',   labelColor: 'text-[#EB001B]', labelBg: 'bg-red-50',   last4: '8888', expiry: '08/2026' },
  ]

  const paymentMethods = [
    { id: 1, name: 'Credit / Debit Card', icon: IoCardOutline,          sublabel: 'Visa, Mastercard, Amex, Discover' },
    { id: 2, name: 'PayPal',              icon: IoLogoPaypal,            sublabel: 'Pay securely with PayPal'          },
    { id: 3, name: 'Apple Pay',           icon: IoPhonePortraitOutline,  sublabel: 'Touch ID or Face ID'               },
    { id: 4, name: 'Google Pay',          icon: IoWalletOutline,         sublabel: 'Pay with Google'                   },
  ]

  const securityFeatures = [
    { icon: IoLockClosedOutline,       title: '256-bit SSL',       subtitle: 'Secure Connection' },
    { icon: IoShieldCheckmarkOutline,  title: 'PCI DSS',           subtitle: 'Compliant'         },
    { icon: IoCheckmarkCircle,         title: '30-Day Guarantee',  subtitle: 'Money-Back'        },
  ]

  const [selectedCard, setSelectedCard]     = useState(1)
  const [selectedMethod, setSelectedMethod] = useState(1)
  const [sameAddress, setSameAddress]       = useState(true)
  const [saveCard, setSaveCard]             = useState(false)
  const [agreeTerms, setAgreeTerms]         = useState(false)

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax      = subtotal * 0.1
  const total    = subtotal + tax

  const steps = [
    { step: 1, label: 'Delivery Information', active: false, completed: true  },
    { step: 2, label: 'Delivery Method',      active: false, completed: true  },
    { step: 3, label: 'Payment',              active: true,  completed: false },
  ]

  const inputClass = "w-full h-[48px] px-[16px] border-[1.5px] border-[#E8E3D9] rounded-[8px] text-[14px] lg:text-[15px] font-normal text-[#1A1A1A] outline-none focus:border-[#8B7355] transition-colors"
  const labelClass = "text-[13px] lg:text-[14px] font-medium text-[#666666] mb-[8px] block"

  return (
    <div className="bg-white font-['Cormorant_Garamond']">

      {/* ── Breadcrumb ── */}
      <div className="min-h-[48px] bg-[#FDFBF7] px-4 md:px-[60px] lg:px-[120px] flex items-center overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        <Link to="/"><span className="text-[13px] lg:text-[15px] font-normal text-[#8B7355] cursor-pointer whitespace-nowrap">Home</span></Link>
        <span className="text-[13px] lg:text-[15px] font-normal text-[#666666] mx-2">/</span>
        <Link to="/cart"><span className="text-[13px] lg:text-[15px] font-normal text-[#8B7355] cursor-pointer whitespace-nowrap">Shopping Basket</span></Link>
        <span className="text-[13px] lg:text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[13px] lg:text-[15px] font-normal text-[#666666] whitespace-nowrap">Checkout</span>
      </div>

      {/* ── Progress Steps ── */}
      <div className="min-h-[90px] md:min-h-[110px] lg:min-h-[120px] bg-gradient-to-b from-[#FDFBF7] to-white px-4 md:px-[60px] lg:px-[120px] flex items-center justify-center">
        <div className="max-w-[1200px] w-full">
          <div className="flex items-center">
            {steps.map((item, index) => (
              <div key={item.step} className="flex items-center flex-1 min-w-0">
                <div className="flex items-center gap-[8px] md:gap-[12px] lg:gap-[16px] min-w-0">
                  <div className={`w-[36px] h-[36px] md:w-[42px] md:h-[42px] lg:w-[48px] lg:h-[48px] rounded-full flex-shrink-0 flex items-center justify-center transition-all ${
                    item.active ? 'bg-[#8B7355] text-white'
                    : item.completed ? 'bg-green-600 text-white'
                    : 'bg-white border-[2px] border-[#E8E3D9] text-[#999999]'
                  }`}>
                    {item.completed
                      ? <IoCheckmarkCircle className="w-[20px] h-[20px] md:w-[24px] md:h-[24px] lg:w-[28px] lg:h-[28px]" />
                      : <span className="text-[15px] md:text-[17px] lg:text-[20px] font-semibold">{item.step}</span>
                    }
                  </div>
                  <div className={`text-[12px] md:text-[15px] lg:text-[18px] font-semibold truncate ${
                    item.active ? 'text-[#8B7355]' : item.completed ? 'text-green-600' : 'text-[#999999]'
                  }`}>
                    {item.label}
                  </div>
                </div>
                {index < 2 && <div className="flex-1 h-[2px] bg-[#E8E3D9] mx-[8px] md:mx-[16px] lg:mx-[24px] min-w-[12px]" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="px-4 md:px-[60px] lg:px-[120px] py-6 md:py-10 lg:py-[48px]">
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-[40px]">

          {/* ── Left — Payment Form ── */}
          <div className="flex-1 min-w-0">

            {/* Select Payment Method */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[32px] mb-5 lg:mb-[24px]">
              <h2 className="text-[22px] md:text-[24px] lg:text-[28px] font-semibold text-[#1A1A1A] mb-6 lg:mb-[32px]">Select Payment Method</h2>

              {/* Saved Cards */}
              <div className="mb-6 lg:mb-[32px]">
                <div className="text-[14px] lg:text-[16px] font-medium text-[#666666] mb-4 lg:mb-[16px]">Saved Cards</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-[16px] mb-4 lg:mb-[16px]">
                  {savedCards.map((card) => (
                    <div
                      key={card.id}
                      onClick={() => setSelectedCard(card.id)}
                      className={`rounded-[8px] p-4 lg:p-[20px] cursor-pointer transition-all ${
                        selectedCard === card.id
                          ? 'bg-[#FDFBF7] border-[2px] border-[#8B7355]'
                          : 'bg-white border border-[#E8E3D9] hover:border-[#C9A870]'
                      }`}
                    >
                      <div className="flex items-start gap-3 lg:gap-[12px]">
                        <div className={`w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] rounded-full border-[2px] flex items-center justify-center mt-[2px] flex-shrink-0 ${
                          selectedCard === card.id ? 'border-[#8B7355]' : 'border-[#E8E3D9]'
                        }`}>
                          {selectedCard === card.id && <div className="w-[8px] h-[8px] lg:w-[10px] lg:h-[10px] rounded-full bg-[#8B7355]" />}
                        </div>
                        <div className="flex-1">
                          <div className={`inline-flex items-center justify-center w-[44px] h-[26px] lg:w-[48px] lg:h-[28px] rounded-[4px] text-[12px] lg:text-[13px] font-bold mb-3 lg:mb-[12px] ${card.labelBg} ${card.labelColor}`}>
                            {card.label}
                          </div>
                          <div className="text-[16px] lg:text-[18px] font-semibold text-[#1A1A1A] mb-[4px]">•••• {card.last4}</div>
                          <div className="text-[13px] lg:text-[14px] font-normal text-[#666666] mb-[8px]">{card.expiry}</div>
                          <span className="text-[12px] lg:text-[13px] font-medium text-[#8B7355] cursor-pointer hover:underline">Edit</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full h-[44px] lg:h-[48px] border-[1.5px] border-[#E8E3D9] rounded-[8px] flex items-center justify-center gap-[8px] cursor-pointer hover:border-[#8B7355] transition-colors">
                  <IoAddOutline className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#666666]" />
                  <span className="text-[14px] lg:text-[15px] font-medium text-[#666666]">Add New Payment Method</span>
                </button>
              </div>

              {/* Payment Method Tabs */}
              <div className="space-y-3 lg:space-y-[12px]">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`p-4 lg:p-[16px] rounded-[8px] cursor-pointer flex items-center gap-3 lg:gap-[16px] transition-all ${
                      selectedMethod === method.id
                        ? 'bg-[#FDFBF7] border-[1.5px] border-[#8B7355]'
                        : 'bg-white border border-[#E8E3D9] hover:border-[#C9A870]'
                    }`}
                  >
                    <div className={`w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] rounded-full border-[2px] flex items-center justify-center flex-shrink-0 ${
                      selectedMethod === method.id ? 'border-[#8B7355]' : 'border-[#E8E3D9]'
                    }`}>
                      {selectedMethod === method.id && <div className="w-[8px] h-[8px] lg:w-[10px] lg:h-[10px] rounded-full bg-[#8B7355]" />}
                    </div>
                    <method.icon className={`w-[22px] h-[22px] lg:w-[24px] lg:h-[24px] flex-shrink-0 ${selectedMethod === method.id ? 'text-[#8B7355]' : 'text-[#666666]'}`} />
                    <div className="flex-1 min-w-0">
                      <span className="text-[14px] lg:text-[16px] font-medium text-[#1A1A1A]">{method.name}</span>
                      <p className="text-[12px] lg:text-[13px] font-normal text-[#999999]">{method.sublabel}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card Details Form */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[32px] mb-5 lg:mb-[24px]">
              <h3 className="text-[18px] md:text-[19px] lg:text-[20px] font-semibold text-[#1A1A1A] mb-5 lg:mb-[24px]">Card Details</h3>
              <div className="space-y-4 lg:space-y-[16px]">
                <div>
                  <label className={labelClass}>Card Number</label>
                  <input type="text" placeholder="1234 5678 9012 3456" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Cardholder Name</label>
                  <input type="text" placeholder="Name on card" className={inputClass} />
                </div>
                <div className="grid grid-cols-2 gap-4 lg:gap-[16px]">
                  <div>
                    <label className={labelClass}>Expiry Date</label>
                    <input type="text" placeholder="MM/YY" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>CVV</label>
                    <div className="relative">
                      <input type="text" placeholder="123" className={inputClass + ' pr-[44px]'} />
                      <IoLockClosedOutline className="w-[15px] h-[15px] lg:w-[16px] lg:h-[16px] text-[#999999] absolute right-[16px] top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-[12px] pt-[8px]">
                  <input
                    type="checkbox"
                    id="saveCard"
                    checked={saveCard}
                    onChange={() => setSaveCard(!saveCard)}
                    className="w-[18px] h-[18px] cursor-pointer accent-[#8B7355]"
                  />
                  <label htmlFor="saveCard" className="text-[13px] lg:text-[14px] font-normal text-[#666666] cursor-pointer">
                    Save for future purchases
                  </label>
                </div>
              </div>
            </div>

            {/* Billing Address */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[32px] mb-5 lg:mb-[24px]">
              <h2 className="text-[17px] md:text-[18px] lg:text-[20px] font-semibold text-[#1A1A1A] mb-4 lg:mb-[20px]">Billing Address</h2>
              <div className="space-y-3 lg:space-y-[12px]">
                <div
                  onClick={() => setSameAddress(true)}
                  className={`flex items-center gap-3 lg:gap-[12px] p-4 lg:p-[16px] rounded-[8px] cursor-pointer transition-all ${
                    sameAddress ? 'bg-[#FDFBF7] border-[2px] border-[#8B7355]' : 'bg-white border border-[#E8E3D9] hover:border-[#C9A870]'
                  }`}
                >
                  <div className={`w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] rounded-full border-[2px] flex items-center justify-center flex-shrink-0 ${sameAddress ? 'border-[#8B7355]' : 'border-[#E8E3D9]'}`}>
                    {sameAddress && <div className="w-[8px] h-[8px] lg:w-[10px] lg:h-[10px] rounded-full bg-[#8B7355]" />}
                  </div>
                  <span className="text-[14px] lg:text-[15px] font-normal text-[#1A1A1A]">Same as delivery address</span>
                </div>
                <div
                  onClick={() => setSameAddress(false)}
                  className={`flex items-center gap-3 lg:gap-[12px] p-4 lg:p-[16px] rounded-[8px] cursor-pointer transition-all ${
                    !sameAddress ? 'bg-[#FDFBF7] border-[2px] border-[#8B7355]' : 'bg-white border border-[#E8E3D9] hover:border-[#C9A870]'
                  }`}
                >
                  <div className={`w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] rounded-full border-[2px] flex items-center justify-center flex-shrink-0 ${!sameAddress ? 'border-[#8B7355]' : 'border-[#E8E3D9]'}`}>
                    {!sameAddress && <div className="w-[8px] h-[8px] lg:w-[10px] lg:h-[10px] rounded-full bg-[#8B7355]" />}
                  </div>
                  <span className="text-[14px] lg:text-[15px] font-normal text-[#1A1A1A]">Use different billing address</span>
                </div>
              </div>
            </div>

            {/* Security Features */}
            <div className="grid grid-cols-3 gap-3 lg:gap-[20px]">
              {securityFeatures.map((feature, idx) => (
                <div key={idx} className="bg-[#FDFBF7] rounded-[8px] p-3 lg:p-[20px] flex flex-col items-center text-center">
                  <feature.icon className="w-[22px] h-[22px] lg:w-[28px] lg:h-[28px] text-[#8B7355] mb-2 lg:mb-[12px]" />
                  <div className="text-[12px] md:text-[13px] lg:text-[15px] font-semibold text-[#1A1A1A] mb-[4px]">{feature.title}</div>
                  <div className="text-[11px] md:text-[12px] lg:text-[13px] font-normal text-[#666666]">{feature.subtitle}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right — Order Summary ── */}
          <div className="w-full lg:w-[360px] lg:flex-shrink-0">
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[32px] lg:sticky lg:top-[24px]">
              <h2 className="text-[20px] md:text-[22px] lg:text-[24px] font-semibold text-[#1A1A1A] mb-5 lg:mb-[24px]">Order Summary</h2>

              {/* Items */}
              <div className="mb-5 lg:mb-[24px] space-y-4 lg:space-y-[16px]">
                {cartItems.map((item, index) => (
                  <div key={item.id}>
                    <div className="flex gap-3 lg:gap-[16px]">
                      <img src={item.image} alt={item.name} className="w-[64px] h-[64px] md:w-[72px] md:h-[72px] lg:w-[80px] lg:h-[80px] rounded-[8px] object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] lg:text-[12px] font-medium text-[#8B7355] mb-[2px]">{item.brand}</div>
                        <div className="text-[13px] lg:text-[14px] font-normal text-[#1A1A1A] leading-[1.4] mb-[6px] line-clamp-2">{item.name}</div>
                        <div className="text-[12px] lg:text-[13px] font-normal text-[#666666]">{item.quantity} × ${item.price}</div>
                        <div className="text-[13px] lg:text-[14px] font-semibold text-[#1A1A1A]">${(item.price * item.quantity).toFixed(2)}</div>
                      </div>
                    </div>
                    {index < cartItems.length - 1 && <div className="h-[1px] bg-[#E8E3D9] mt-4 lg:mt-[16px]" />}
                  </div>
                ))}
              </div>

              {/* Pricing */}
              <div className="space-y-3 lg:space-y-[12px] mb-5 lg:mb-[24px]">
                <div className="flex justify-between">
                  <span className="text-[14px] lg:text-[16px] font-normal text-[#666666]">Subtotal</span>
                  <span className="text-[14px] lg:text-[16px] font-normal text-[#1A1A1A]">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[14px] lg:text-[16px] font-normal text-[#666666]">Shipping</span>
                  <span className="text-[14px] lg:text-[16px] font-normal text-green-600">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[14px] lg:text-[16px] font-normal text-[#666666]">Estimated Tax</span>
                  <span className="text-[14px] lg:text-[16px] font-normal text-[#1A1A1A]">${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="h-[1px] bg-[#E8E3D9] mb-5 lg:mb-[24px]" />
              <div className="flex justify-between mb-5 lg:mb-[24px]">
                <span className="text-[18px] md:text-[20px] lg:text-[22px] font-semibold text-[#1A1A1A]">Order Total</span>
                <span className="text-[18px] md:text-[20px] lg:text-[22px] font-semibold text-[#1A1A1A]">${total.toFixed(2)}</span>
              </div>

              {/* Promo */}
              <div className="flex gap-[8px] mb-5 lg:mb-[24px]">
                <input type="text" placeholder="Promo code" className="flex-1 h-[40px] px-[14px] lg:px-[16px] border-[1.5px] border-[#E8E3D9] rounded-[8px] text-[13px] lg:text-[15px] font-normal outline-none focus:border-[#8B7355] transition-colors" />
                <button className="h-[40px] px-4 lg:px-[20px] bg-[#8B7355] text-white text-[13px] lg:text-[14px] font-medium rounded-[8px] cursor-pointer hover:bg-[#7a6448] transition-colors">Apply</button>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-[12px] mb-5 lg:mb-[24px]">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreeTerms}
                  onChange={() => setAgreeTerms(!agreeTerms)}
                  className="w-[18px] h-[18px] mt-[2px] flex-shrink-0 cursor-pointer accent-[#8B7355]"
                />
                <label htmlFor="terms" className="text-[13px] lg:text-[14px] font-normal text-[#666666] cursor-pointer leading-[1.5]">
                  I agree to the <span className="text-[#8B7355] underline cursor-pointer">Terms & Conditions</span> and <span className="text-[#8B7355] underline cursor-pointer">Privacy Policy</span>
                </label>
              </div>

              {/* CTAs */}
              <div className="space-y-4 lg:space-y-[16px] mb-5 lg:mb-[24px]">
                <button className={`w-full h-[52px] lg:h-[56px] text-white text-[15px] lg:text-[16px] font-medium rounded-[8px] cursor-pointer transition-all ${agreeTerms ? 'bg-[#8B7355] hover:bg-[#7a6448]' : 'bg-[#C9A870] cursor-not-allowed'}`}>
                  Place Order
                </button>
                <Link to="/delivery-methods">
                  <button className="w-full flex items-center justify-center gap-[8px] text-[13px] lg:text-[14px] font-medium text-[#666666] cursor-pointer hover:text-[#8B7355] transition-colors">
                    <IoArrowBackOutline className="w-[14px] h-[14px] lg:w-[16px] lg:h-[16px]" />
                    Back to Delivery Methods
                  </button>
                </Link>
              </div>

              {/* Trust */}
              <div className="flex items-center justify-around pt-5 lg:pt-[24px] border-t border-[#E8E3D9]">
                <div className="flex flex-col items-center gap-[6px] lg:gap-[8px]">
                  <IoLockClosedOutline className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#666666]" />
                  <span className="text-[11px] lg:text-[12px] font-light text-[#666666]">Secure Checkout</span>
                </div>
                <div className="flex flex-col items-center gap-[6px] lg:gap-[8px]">
                  <IoShieldCheckmarkOutline className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#666666]" />
                  <span className="text-[11px] lg:text-[12px] font-light text-[#666666]">Money-Back</span>
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