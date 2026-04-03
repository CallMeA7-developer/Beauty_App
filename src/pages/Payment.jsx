import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  IoCheckmarkCircle,
  IoLockClosedOutline,
  IoShieldCheckmarkOutline,
  IoArrowBackOutline,
  IoAddOutline,
  IoCardOutline,
  IoChevronDown,
} from 'react-icons/io5'
import {
  securityFeatures   as securityFeaturesData,
  getCheckoutSteps,
} from '../data/checkout'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'
import { useCheckout } from '../contexts/CheckoutContext'
import LoadingSpinner from '../components/LoadingSpinner'
import { supabase } from '../lib/supabase'

const SECURITY_ICONS = {
  lock: IoLockClosedOutline, shield: IoShieldCheckmarkOutline, check: IoCheckmarkCircle,
}
const securityFeatures = securityFeaturesData.map(f => ({ ...f, icon: SECURITY_ICONS[f.iconKey] }))

export default function Payment() {
  const navigate = useNavigate()
  const { user, loading: authLoading, openAuthModal } = useAuth()
  const { cartItems } = useCart()
  const { checkoutSession } = useCheckout()
  const steps = getCheckoutSteps(3)

  const [savedCards, setSavedCards] = useState([])
  const [selectedCard, setSelectedCard] = useState(null)
  const [showAddCardForm, setShowAddCardForm] = useState(false)
  const [sameAddress, setSameAddress] = useState(true)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    card_holder_name: '',
    card_number: '',
    card_brand: 'Visa',
    expiry_month: '',
    expiry_year: '',
  })

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/collections')
      return
    }
    if (user) {
      fetchSavedCards()
    }
  }, [user, authLoading, navigate])

  const fetchSavedCards = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('payment_methods')
      .select('*')
      .eq('user_id', user.id)
      .order('is_default', { ascending: false })

    if (!error && data) {
      setSavedCards(data)
      if (data.length > 0) {
        const defaultCard = data.find(card => card.is_default) || data[0]
        setSelectedCard(defaultCard.id)
      } else {
        setShowAddCardForm(true)
      }
    }
    setLoading(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAddCard = async () => {
    if (!formData.card_holder_name || !formData.card_number || !formData.expiry_month || !formData.expiry_year) {
      setError('Please fill in all required fields')
      return
    }

    if (formData.card_number.length < 4) {
      setError('Please enter a valid card number')
      return
    }

    const lastFour = formData.card_number.replace(/\s/g, '').slice(-4)

    const { data, error: insertError } = await supabase
      .from('payment_methods')
      .insert({
        user_id: user.id,
        card_holder_name: formData.card_holder_name,
        card_last_four: lastFour,
        card_brand: formData.card_brand,
        expiry_month: formData.expiry_month,
        expiry_year: formData.expiry_year,
        is_default: savedCards.length === 0,
      })
      .select()
      .single()

    if (!insertError && data) {
      setSavedCards([...savedCards, data])
      setSelectedCard(data.id)
      setFormData({
        card_holder_name: '',
        card_number: '',
        card_brand: 'Visa',
        expiry_month: '',
        expiry_year: '',
      })
      setShowAddCardForm(false)
      setError('')
    } else {
      setError('Failed to add payment method')
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0)
  const shipping = checkoutSession.deliveryCost || 0
  const tax = subtotal * 0.1
  const total = subtotal + shipping + tax

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 5000)
      return () => clearTimeout(timer)
    }
  }, [error])

  const handlePlaceOrder = async () => {
    if (!agreeTerms) {
      setError('Please agree to the Terms & Conditions to continue')
      return
    }

    navigate('/order-confirmation')
  }

  const getCardBrandStyles = (brand) => {
    const styles = {
      Visa: { bg: 'bg-blue-50', color: 'text-[#1434CB]', label: 'VISA' },
      Mastercard: { bg: 'bg-red-50', color: 'text-[#EB001B]', label: 'MC' },
      Amex: { bg: 'bg-green-50', color: 'text-green-700', label: 'AMEX' }
    }
    return styles[brand] || styles.Visa
  }

  if (authLoading || loading) {
    return <LoadingSpinner />
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7] px-4">
        <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-8 max-w-[400px] w-full text-center">
          <IoLockClosedOutline className="w-[48px] h-[48px] text-[#C9A870] mx-auto mb-[16px]" />
          <h2 className="text-[24px] font-semibold text-[#1A1A1A] mb-[12px]">Login Required</h2>
          <p className="text-[14px] text-[#666666] mb-[24px]">Please log in to continue with your order</p>
          <Link to="/collections">
            <button className="w-full h-[48px] bg-[#8B7355] text-white text-[15px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">
              Go to Shop
            </button>
          </Link>
        </div>
      </div>
    )
  }

  const inputClass = "w-full h-[44px] lg:h-[48px] px-[16px] border-[1.5px] border-[#E8E3D9] rounded-[8px] text-[13px] lg:text-[15px] font-normal text-[#1A1A1A] outline-none focus:border-[#8B7355] transition-colors"
  const labelClass = "text-[12px] lg:text-[14px] font-medium text-[#666666] mb-[6px] lg:mb-[8px] block"

  return (
    <div className="bg-white font-['Cormorant_Garamond']">
      {error && (
        <div className="fixed top-[80px] left-1/2 -translate-x-1/2 z-50 bg-red-600 text-white px-6 py-4 rounded-[8px] shadow-lg max-w-[400px] w-[90%]">
          <p className="text-[14px] font-medium">{error}</p>
        </div>
      )}

      <div className="min-h-[48px] bg-[#FDFBF7] px-4 md:px-[60px] lg:px-[120px] flex items-center overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        <Link to="/"><span className="text-[13px] lg:text-[15px] font-normal text-[#8B7355] cursor-pointer whitespace-nowrap">Home</span></Link>
        <span className="text-[13px] lg:text-[15px] font-normal text-[#666666] mx-2">/</span>
        <Link to="/cart"><span className="text-[13px] lg:text-[15px] font-normal text-[#8B7355] cursor-pointer whitespace-nowrap">Shopping Basket</span></Link>
        <span className="text-[13px] lg:text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[13px] lg:text-[15px] font-normal text-[#666666] whitespace-nowrap">Checkout</span>
      </div>

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

      <div className="px-4 md:px-[60px] lg:px-[120px] py-6 md:py-10 lg:py-[48px]">
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-[40px]">

          <div className="flex-1 min-w-0">

            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[32px] mb-5 lg:mb-[24px]">
              <h2 className="text-[22px] md:text-[24px] lg:text-[28px] font-semibold text-[#1A1A1A] mb-6 lg:mb-[32px]">Select Payment Method</h2>

              {savedCards.length > 0 && !showAddCardForm && (
                <>
                  <div className="text-[14px] lg:text-[16px] font-medium text-[#666666] mb-4 lg:mb-[16px]">Saved Cards</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-[16px] mb-4 lg:mb-[16px]">
                    {savedCards.map((card) => {
                      const brandStyles = getCardBrandStyles(card.card_brand)
                      return (
                        <div
                          key={card.id}
                          onClick={() => setSelectedCard(card.id)}
                          className={`rounded-[8px] p-4 lg:p-[20px] cursor-pointer transition-all ${
                            selectedCard === card.id
                              ? 'bg-[#FDFBF7] border-[2px] border-[#C9A870]'
                              : 'bg-white border border-[#E8E3D9] hover:border-[#C9A870]'
                          }`}
                        >
                          <div className="flex items-start gap-3 lg:gap-[12px]">
                            <div className={`w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] rounded-full border-[2px] flex items-center justify-center mt-[2px] flex-shrink-0 ${
                              selectedCard === card.id ? 'border-[#C9A870]' : 'border-[#E8E3D9]'
                            }`}>
                              {selectedCard === card.id && <div className="w-[8px] h-[8px] lg:w-[10px] lg:h-[10px] rounded-full bg-[#C9A870]" />}
                            </div>
                            <div className="flex-1">
                              <div className={`inline-flex items-center justify-center w-[44px] h-[26px] lg:w-[48px] lg:h-[28px] rounded-[4px] text-[12px] lg:text-[13px] font-bold mb-3 lg:mb-[12px] ${brandStyles.bg} ${brandStyles.color}`}>
                                {brandStyles.label}
                              </div>
                              <div className="text-[16px] lg:text-[18px] font-semibold text-[#1A1A1A] mb-[4px]">•••• •••• •••• {card.card_last_four}</div>
                              <div className="text-[13px] lg:text-[14px] font-normal text-[#666666] mb-[4px]">Valid until {card.expiry_month}/{card.expiry_year}</div>
                              <div className="text-[12px] lg:text-[13px] font-normal text-[#999999]">{card.card_holder_name}</div>
                              {card.is_default && (
                                <div className="inline-block bg-[#F5F1EA] text-[#8B7355] text-[10px] lg:text-[11px] font-medium px-[8px] py-[3px] rounded-full mt-2">
                                  Default
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  <button
                    onClick={() => setShowAddCardForm(true)}
                    className="w-full h-[44px] lg:h-[48px] border-[1.5px] border-[#E8E3D9] rounded-[8px] flex items-center justify-center gap-[8px] cursor-pointer hover:border-[#8B7355] transition-colors"
                  >
                    <IoAddOutline className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#666666]" />
                    <span className="text-[14px] lg:text-[15px] font-medium text-[#666666]">Add New Payment Method</span>
                  </button>
                </>
              )}

              {showAddCardForm && (
                <div className="border-l-4 border-[#C9A870] pl-5 lg:pl-[24px]">
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
                    <div className="flex gap-4 lg:gap-[16px] pt-[8px]">
                      <button
                        onClick={handleAddCard}
                        className="flex-1 h-[48px] lg:h-[52px] bg-[#8B7355] text-white text-[14px] lg:text-[15px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors"
                      >
                        Save Card
                      </button>
                      {savedCards.length > 0 && (
                        <button
                          onClick={() => setShowAddCardForm(false)}
                          className="flex-1 h-[48px] lg:h-[52px] bg-white border border-[#E8E3D9] text-[#666666] text-[14px] lg:text-[15px] font-medium rounded-[8px] hover:border-[#8B7355] hover:text-[#8B7355] transition-all"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[32px] mb-5 lg:mb-[24px]">
              <button
                onClick={handlePlaceOrder}
                disabled={!agreeTerms || processing || !selectedCard}
                className={`w-full h-[52px] lg:h-[56px] text-white text-[15px] lg:text-[16px] font-medium rounded-[8px] cursor-pointer transition-all ${
                  agreeTerms && !processing && selectedCard ? 'bg-[#8B7355] hover:bg-[#7a6448]' : 'bg-[#C9A870] cursor-not-allowed'
                }`}
              >
                {processing ? (
                  <span className="flex items-center justify-center gap-[8px]">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Place Order'
                )}
              </button>
              {!selectedCard && (
                <p className="text-[12px] text-red-500 mt-2 text-center">Please select a payment method</p>
              )}
            </div>

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

          <div className="w-full lg:w-[360px] lg:flex-shrink-0">
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[32px] lg:sticky lg:top-[24px]">
              <h2 className="text-[20px] md:text-[22px] lg:text-[24px] font-semibold text-[#1A1A1A] mb-5 lg:mb-[24px]">Order Summary</h2>

              <div className="mb-5 lg:mb-[24px] space-y-4 lg:space-y-[16px]">
                {cartItems.map((item, index) => (
                  <div key={item.id}>
                    <div className="flex gap-3 lg:gap-[16px]">
                      <img src={item.product_image} alt={item.product_name} className="w-[64px] h-[64px] md:w-[72px] md:h-[72px] lg:w-[80px] lg:h-[80px] rounded-[8px] object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] lg:text-[12px] font-medium text-[#8B7355] mb-[2px]">{item.brand}</div>
                        <div className="text-[13px] lg:text-[14px] font-normal text-[#1A1A1A] leading-[1.4] mb-[6px] line-clamp-2">{item.product_name}</div>
                        <div className="text-[12px] lg:text-[13px] font-normal text-[#666666]">{item.quantity} × ${parseFloat(item.price).toFixed(2)}</div>
                        <div className="text-[13px] lg:text-[14px] font-semibold text-[#1A1A1A]">${(parseFloat(item.price) * item.quantity).toFixed(2)}</div>
                      </div>
                    </div>
                    {index < cartItems.length - 1 && <div className="h-[1px] bg-[#E8E3D9] mt-4 lg:mt-[16px]" />}
                  </div>
                ))}
              </div>

              <div className="space-y-3 lg:space-y-[12px] mb-5 lg:mb-[24px]">
                <div className="flex justify-between">
                  <span className="text-[14px] lg:text-[16px] font-normal text-[#666666]">Subtotal</span>
                  <span className="text-[14px] lg:text-[16px] font-normal text-[#1A1A1A]">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[14px] lg:text-[16px] font-normal text-[#666666]">Shipping</span>
                  <span className="text-[14px] lg:text-[16px] font-normal text-[#1A1A1A]">
                    {shipping === 0 ? <span className="text-green-600">FREE</span> : `$${shipping.toFixed(2)}`}
                  </span>
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

              <div className="flex gap-[8px] mb-5 lg:mb-[24px]">
                <input type="text" placeholder="Promo code" className="flex-1 h-[40px] px-[14px] lg:px-[16px] border-[1.5px] border-[#E8E3D9] rounded-[8px] text-[13px] lg:text-[15px] font-normal outline-none focus:border-[#8B7355] transition-colors" />
                <button className="h-[40px] px-4 lg:px-[20px] bg-[#8B7355] text-white text-[13px] lg:text-[14px] font-medium rounded-[8px] cursor-pointer hover:bg-[#7a6448] transition-colors">Apply</button>
              </div>

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

              <div className="space-y-4 lg:space-y-[16px] mb-5 lg:mb-[24px]">
                <Link to="/delivery-methods">
                  <button className="w-full flex items-center justify-center gap-[8px] text-[13px] lg:text-[14px] font-medium text-[#666666] cursor-pointer hover:text-[#8B7355] transition-colors">
                    <IoArrowBackOutline className="w-[14px] h-[14px] lg:w-[16px] lg:h-[16px]" />
                    Back to Delivery Methods
                  </button>
                </Link>
              </div>

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
