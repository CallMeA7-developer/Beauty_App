import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  IoCheckmarkCircle,
  IoAddOutline,
  IoLockClosedOutline,
  IoShieldCheckmarkOutline,
  IoCardOutline,
} from 'react-icons/io5'
import { getCheckoutSteps } from '../data/checkout'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'
import { supabase } from '../lib/supabase'
import LoadingSpinner from '../components/LoadingSpinner'

export default function DeliveryInfo() {
  const navigate = useNavigate()
  const { user, loading: authLoading } = useAuth()
  const { cartItems } = useCart()
  const steps = getCheckoutSteps(1)

  const [addresses, setAddresses] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedAddress, setSelectedAddress] = useState(null)
  const [showAddressForm, setShowAddressForm] = useState(false)
  const [giftOption, setGiftOption] = useState(false)

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
    if (!authLoading && !user) {
      navigate('/collections')
      return
    }
    if (user) {
      fetchAddresses()
    }
  }, [user, authLoading, navigate])

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
      if (data.length > 0) {
        const defaultAddr = data.find(addr => addr.is_default) || data[0]
        setSelectedAddress(defaultAddr.id)
      } else {
        setShowAddressForm(true)
      }
    }
    setLoading(false)
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
      alert('Please fill in all required fields')
      return
    }

    const { data, error } = await supabase
      .from('addresses')
      .insert({
        user_id: user.id,
        ...formData
      })
      .select()
      .single()

    if (error) {
      console.error('Error saving address:', error)
      alert('Failed to save address')
      return
    }

    setAddresses([data, ...addresses])
    setSelectedAddress(data.id)
    setShowAddressForm(false)
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
  }

  const handleContinue = () => {
    if (!selectedAddress) {
      alert('Please select or add a delivery address')
      return
    }
    navigate('/delivery-methods')
  }

  const subtotal = cartItems.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0)
  const tax = subtotal * 0.1
  const giftFee = giftOption ? 12 : 0
  const total = subtotal + tax + giftFee

  if (authLoading || loading) {
    return <LoadingSpinner />
  }

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
                    item.active ? 'bg-[#8B7355] text-white' : item.completed ? 'bg-green-600 text-white' : 'bg-white border-[2px] border-[#E8E3D9] text-[#999999]'
                  }`}>
                    {item.completed
                      ? <IoCheckmarkCircle className="w-[22px] h-[22px] lg:w-[28px] lg:h-[28px]" />
                      : <span className="text-[15px] md:text-[17px] lg:text-[20px] font-semibold">{item.step}</span>
                    }
                  </div>
                  <div className={`text-[12px] md:text-[15px] lg:text-[18px] font-semibold truncate ${item.active ? 'text-[#8B7355]' : 'text-[#999999]'}`}>
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

          {/* ── Left — Form ── */}
          <div className="flex-1 min-w-0">

            {/* Delivery Info Card */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[32px] mb-5 lg:mb-[24px]">
              <h2 className="text-[22px] md:text-[24px] lg:text-[28px] font-semibold text-[#1A1A1A] mb-6 lg:mb-[32px]">Delivery Information</h2>

              {/* Saved Addresses */}
              {addresses.length > 0 && (
                <div className="mb-6 lg:mb-[32px]">
                  <div className="text-[14px] lg:text-[16px] font-medium text-[#666666] mb-4 lg:mb-[16px]">Saved Addresses</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-[16px] mb-4 lg:mb-[16px]">
                    {addresses.map((addr) => (
                      <div
                        key={addr.id}
                        onClick={() => setSelectedAddress(addr.id)}
                        className={`bg-[#FDFBF7] rounded-[8px] p-4 lg:p-[20px] cursor-pointer transition-all ${
                          selectedAddress === addr.id ? 'border-[2px] border-[#8B7355]' : 'border border-[#E8E3D9] hover:border-[#C9A870]'
                        }`}
                      >
                        <div className="flex items-start gap-3 lg:gap-[12px]">
                          <div className={`w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] rounded-full border-[2px] flex items-center justify-center mt-[2px] flex-shrink-0 ${
                            selectedAddress === addr.id ? 'border-[#8B7355]' : 'border-[#E8E3D9]'
                          }`}>
                            {selectedAddress === addr.id && <div className="w-[8px] h-[8px] lg:w-[10px] lg:h-[10px] rounded-full bg-[#8B7355]" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[13px] lg:text-[14px] font-medium text-[#8B7355] mb-[6px] lg:mb-[8px]">{addr.label}</div>
                            <div className="text-[14px] lg:text-[16px] font-semibold text-[#1A1A1A] mb-[4px]">{addr.full_name}</div>
                            <div className="text-[13px] lg:text-[14px] font-normal text-[#666666] mb-3 lg:mb-[12px]">
                              {addr.street}, {addr.city}, {addr.state} {addr.postal_code}
                            </div>
                            <div className="text-[12px] lg:text-[13px] font-normal text-[#666666]">{addr.phone}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setShowAddressForm(!showAddressForm)}
                    className="w-full h-[44px] lg:h-[48px] border-[1.5px] border-[#E8E3D9] rounded-[8px] flex items-center justify-center gap-[8px] cursor-pointer hover:border-[#8B7355] transition-colors"
                  >
                    <IoAddOutline className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#666666]" />
                    <span className="text-[14px] lg:text-[15px] font-medium text-[#666666]">Add New Address</span>
                  </button>
                </div>
              )}

              {/* New Address Form */}
              {showAddressForm && (
                <div className="mb-5 lg:mb-[24px]">
                  <div className="text-[14px] lg:text-[16px] font-medium text-[#666666] mb-4 lg:mb-[16px]">
                    {addresses.length > 0 ? 'Add New Address' : 'Enter Delivery Address'}
                  </div>
                  <div className="space-y-4 lg:space-y-[16px]">
                    <div>
                      <label className={labelClass}>Address Label</label>
                      <select
                        name="label"
                        value={formData.label}
                        onChange={handleInputChange}
                        className={inputClass + ' cursor-pointer appearance-none'}
                      >
                        <option>Home</option>
                        <option>Work</option>
                        <option>Office</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Full Name</label>
                      <input
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Street Address</label>
                      <input
                        type="text"
                        name="street"
                        value={formData.street}
                        onChange={handleInputChange}
                        placeholder="Street address, apartment, suite, etc."
                        className={inputClass}
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-[16px]">
                      <div>
                        <label className={labelClass}>City</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="City"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>State / Province</label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          placeholder="State/Province"
                          className={inputClass}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-[16px]">
                      <div>
                        <label className={labelClass}>Postal Code</label>
                        <input
                          type="text"
                          name="postal_code"
                          value={formData.postal_code}
                          onChange={handleInputChange}
                          placeholder="Postal Code"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Country</label>
                        <select
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className={inputClass + ' cursor-pointer appearance-none'}
                        >
                          <option>United States</option>
                          <option>Canada</option>
                          <option>United Kingdom</option>
                          <option>Australia</option>
                          <option>United Arab Emirates</option>
                          <option>Russia</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex items-center gap-[12px] pt-[8px]">
                      <input
                        type="checkbox"
                        id="is_default"
                        name="is_default"
                        checked={formData.is_default}
                        onChange={handleInputChange}
                        className="w-[18px] h-[18px] rounded-[4px] border-[1.5px] border-[#E8E3D9] cursor-pointer accent-[#8B7355]"
                      />
                      <label htmlFor="is_default" className="text-[13px] lg:text-[14px] font-normal text-[#666666] cursor-pointer">
                        Set as default address
                      </label>
                    </div>
                    <button
                      onClick={handleSaveAddress}
                      className="w-full h-[48px] bg-[#8B7355] text-white text-[15px] font-medium rounded-[8px] cursor-pointer hover:bg-[#7a6448] transition-colors"
                    >
                      Save Address
                    </button>
                    {addresses.length > 0 && (
                      <button
                        onClick={() => setShowAddressForm(false)}
                        className="w-full text-[13px] lg:text-[14px] font-medium text-[#666666] cursor-pointer hover:text-[#8B7355] transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Step 2 — Collapsed */}
            <div className="bg-[#FDFBF7] rounded-[12px] border-[1.5px] border-[#E8E3D9] p-4 lg:p-[24px] mb-4 lg:mb-[24px] opacity-60">
              <div className="flex items-center gap-3 lg:gap-[16px]">
                <div className="w-[36px] h-[36px] lg:w-[40px] lg:h-[40px] rounded-full bg-white border-[2px] border-[#E8E3D9] flex items-center justify-center flex-shrink-0">
                  <span className="text-[16px] lg:text-[18px] font-semibold text-[#999999]">2</span>
                </div>
                <div>
                  <div className="text-[17px] lg:text-[20px] font-semibold text-[#999999]">Delivery Method</div>
                  <div className="text-[13px] lg:text-[14px] font-normal text-[#999999]">Select shipping option</div>
                </div>
              </div>
            </div>

            {/* Step 3 — Collapsed */}
            <div className="bg-[#FDFBF7] rounded-[12px] border-[1.5px] border-[#E8E3D9] p-4 lg:p-[24px] opacity-60">
              <div className="flex items-center gap-3 lg:gap-[16px]">
                <div className="w-[36px] h-[36px] lg:w-[40px] lg:h-[40px] rounded-full bg-white border-[2px] border-[#E8E3D9] flex items-center justify-center flex-shrink-0">
                  <span className="text-[16px] lg:text-[18px] font-semibold text-[#999999]">3</span>
                </div>
                <div>
                  <div className="text-[17px] lg:text-[20px] font-semibold text-[#999999]">Payment</div>
                  <div className="text-[13px] lg:text-[14px] font-normal text-[#999999]">Complete your purchase</div>
                </div>
              </div>
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
                {giftOption && (
                  <div className="flex justify-between">
                    <span className="text-[14px] lg:text-[16px] font-normal text-[#666666]">Gift Wrapping</span>
                    <span className="text-[14px] lg:text-[16px] font-normal text-[#1A1A1A]">$12.00</span>
                  </div>
                )}
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

              {/* Gift option */}
              <div className="flex items-center gap-[12px] mb-6 lg:mb-[32px]">
                <input
                  type="checkbox"
                  id="giftOption"
                  checked={giftOption}
                  onChange={() => setGiftOption(!giftOption)}
                  className="w-[18px] h-[18px] cursor-pointer accent-[#8B7355]"
                />
                <label htmlFor="giftOption" className="text-[13px] lg:text-[14px] font-normal text-[#666666] cursor-pointer">
                  Add gift message and wrapping (+$12)
                </label>
              </div>

              {/* CTAs */}
              <div className="space-y-4 lg:space-y-[16px] mb-5 lg:mb-[24px]">
                <button
                  onClick={handleContinue}
                  className="w-full h-[52px] lg:h-[56px] bg-[#8B7355] text-white text-[15px] lg:text-[16px] font-medium rounded-[8px] cursor-pointer hover:bg-[#7a6448] transition-colors"
                >
                  Continue to Delivery Method
                </button>
                <Link to="/cart">
                  <button className="w-full text-[13px] lg:text-[14px] font-medium text-[#666666] cursor-pointer hover:text-[#8B7355] transition-colors">
                    Return to Cart
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
                <div className="flex flex-col items-center gap-[6px] lg:gap-[8px]">
                  <IoCardOutline className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#666666]" />
                  <span className="text-[11px] lg:text-[12px] font-light text-[#666666]">All Cards</span>
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