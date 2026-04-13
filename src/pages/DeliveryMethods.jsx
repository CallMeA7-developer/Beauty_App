import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import {
  IoCheckmarkCircle,
  IoCarOutline,
  IoFlashOutline,
  IoRocketOutline,
  IoGlobeOutline,
  IoShieldCheckmarkOutline,
  IoLocationOutline,
  IoLockClosedOutline,
  IoArrowBackOutline,
} from 'react-icons/io5'
import {
  deliveryOptions as deliveryOptionsData,
  getCheckoutSteps,
} from '../data/checkout'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'
import { useCheckout } from '../contexts/CheckoutContext'
import LoadingSpinner from '../components/LoadingSpinner'

const DELIVERY_ICONS = {
  car: IoCarOutline, flash: IoFlashOutline,
  rocket: IoRocketOutline, globe: IoGlobeOutline,
}

const useDeliveryOptions = (t) => deliveryOptionsData.map(o => ({
  ...o,
  icon: DELIVERY_ICONS[o.iconKey],
  title: o.id === 1 ? t('deliveryMethods.options.standard') :
         o.id === 2 ? t('deliveryMethods.options.express') :
         o.id === 3 ? t('deliveryMethods.options.sameDay') :
         t('deliveryMethods.options.international'),
  time: o.id === 1 ? t('deliveryMethods.options.standardTime') :
        o.id === 2 ? t('deliveryMethods.options.expressTime') :
        o.id === 3 ? t('deliveryMethods.options.sameDayTime') :
        t('deliveryMethods.options.internationalTime'),
  description: o.id === 1 ? t('deliveryMethods.options.standardDesc') :
               o.id === 3 ? t('deliveryMethods.options.sameDayDesc') :
               o.id === 4 ? t('deliveryMethods.options.internationalDesc') :
               o.description,
}))

export default function DeliveryMethods() {
  const { t, i18n } = useTranslation()
  const deliveryOptions = useDeliveryOptions(t)
  const navigate = useNavigate()
  const { user, loading: authLoading } = useAuth()
  const { cartItems } = useCart()
  const { checkoutSession, updateCheckoutSession } = useCheckout()
  const steps = getCheckoutSteps(2).map(s => ({
    ...s,
    label: s.step === 1 ? t('deliveryInfo.deliveryInformation') :
           s.step === 2 ? t('deliveryInfo.deliveryMethod') :
           t('deliveryInfo.payment')
  }))

  const [selectedOption, setSelectedOption] = useState(checkoutSession.selectedDeliveryMethod || 1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/collections')
      return
    }
    if (user) {
      setLoading(false)
    }
  }, [user, authLoading, navigate])

  const subtotal = cartItems.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0)
  const shipping = deliveryOptions.find(o => o.id === selectedOption)?.priceValue ?? 0
  const tax = subtotal * 0.1
  const total = subtotal + shipping + tax

  const handleContinue = () => {
    const selectedDeliveryOption = deliveryOptions.find(o => o.id === selectedOption)

    updateCheckoutSession({
      selectedDeliveryMethod: selectedOption,
      deliveryCost: shipping,
      cartItems: cartItems,
      subtotal: subtotal,
      tax: tax,
      total: total
    })

    navigate('/payment')
  }

  if (authLoading || loading) {
    return <LoadingSpinner />
  }

  return (
    <div key={i18n.language} className="bg-white font-['Cormorant_Garamond']">

      {/* ── Breadcrumb ── */}
      <div className="min-h-[48px] bg-[#FDFBF7] px-4 md:px-[60px] lg:px-[120px] flex items-center overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        <Link to="/"><span className="text-[13px] lg:text-[15px] font-normal text-[#8B7355] cursor-pointer whitespace-nowrap">{t('deliveryMethods.home')}</span></Link>
        <span className="text-[13px] lg:text-[15px] font-normal text-[#666666] mx-2">/</span>
        <Link to="/cart"><span className="text-[13px] lg:text-[15px] font-normal text-[#8B7355] cursor-pointer whitespace-nowrap">{t('deliveryMethods.shoppingBasket')}</span></Link>
        <span className="text-[13px] lg:text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[13px] lg:text-[15px] font-normal text-[#666666] whitespace-nowrap">{t('deliveryMethods.checkout')}</span>
      </div>

      {/* ── Progress Steps ── */}
      <div className="min-h-[90px] md:min-h-[110px] lg:min-h-[120px] bg-gradient-to-b from-[#FDFBF7] to-white px-4 md:px-[60px] lg:px-[120px] flex items-center justify-center">
        <div className="max-w-[1200px] w-full">
          <div className="flex items-center">
            {steps.map((item, index) => (
              <div key={item.step} className="flex items-center flex-1 min-w-0">
                <div className="flex items-center gap-[8px] md:gap-[12px] lg:gap-[16px] min-w-0">
                  <div className={`w-[36px] h-[36px] md:w-[42px] md:h-[42px] lg:w-[48px] lg:h-[48px] rounded-full flex-shrink-0 flex items-center justify-center transition-all ${
                    item.active    ? 'bg-[#8B7355] text-white'
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

          {/* ── Left — Delivery Options ── */}
          <div className="flex-1 min-w-0">

            {/* Delivery Method Selection */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[32px] mb-5 md:mb-6 lg:mb-[32px]">
              <h2 className="text-[22px] md:text-[24px] lg:text-[28px] font-semibold text-[#1A1A1A] mb-6 lg:mb-[32px]">{t('deliveryMethods.selectDeliveryMethod')}</h2>

              <div className="space-y-3 md:space-y-4 lg:space-y-[16px]">
                {deliveryOptions.map((option) => {
                  const isSelected = selectedOption === option.id
                  return (
                    <div
                      key={option.id}
                      onClick={() => setSelectedOption(option.id)}
                      className={`p-4 lg:p-[20px] rounded-[8px] cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-[#FDFBF7] border-[2px] border-[#8B7355]'
                          : 'bg-white border border-[#E8E3D9] hover:border-[#C9A870]'
                      }`}
                    >
                      <div className="flex items-start gap-3 lg:gap-[16px]">
                        {/* Radio */}
                        <div className={`w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] rounded-full border-[2px] flex items-center justify-center mt-[6px] flex-shrink-0 transition-colors ${
                          isSelected ? 'border-[#8B7355]' : 'border-[#E8E3D9]'
                        }`}>
                          {isSelected && <div className="w-[8px] h-[8px] lg:w-[10px] lg:h-[10px] rounded-full bg-[#8B7355]" />}
                        </div>

                        {/* Icon */}
                        <option.icon className={`w-[24px] h-[24px] md:w-[28px] md:h-[28px] lg:w-[32px] lg:h-[32px] flex-shrink-0 mt-[2px] transition-colors ${
                          isSelected ? 'text-[#8B7355]' : 'text-[#666666]'
                        }`} />

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <div className="text-[15px] md:text-[16px] lg:text-[18px] font-semibold text-[#1A1A1A] mb-[4px]">{option.title}</div>
                          <div className="text-[13px] md:text-[14px] lg:text-[15px] font-normal text-[#666666] mb-[2px]">{option.time}</div>
                          <div className="text-[12px] md:text-[13px] lg:text-[14px] font-light text-[#999999] mb-[6px]">{option.arrival}</div>
                          {option.description && (
                            <div className={`text-[12px] lg:text-[13px] ${
                              option.id === 4 ? 'font-medium text-[#8B7355] cursor-pointer hover:underline' : 'font-light italic text-[#999999]'
                            }`}>
                              {option.description}
                            </div>
                          )}
                        </div>

                        {/* Price */}
                        <div className={`text-[15px] md:text-[16px] lg:text-[18px] font-semibold flex-shrink-0 ${option.priceColor}`}>
                          {option.price}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Delivery Instructions */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[32px] mb-5 md:mb-6 lg:mb-[32px]">
              <label className="text-[14px] lg:text-[16px] font-medium text-[#666666] mb-3 lg:mb-[12px] block">
                {t('deliveryMethods.deliveryInstructions')} <span className="font-light text-[#999999]">{t('deliveryMethods.optional')}</span>
              </label>
              <textarea
                placeholder={t('deliveryMethods.instructionsPlaceholder')}
                className="w-full min-h-[90px] lg:min-h-[100px] p-[14px] lg:p-[16px] border-[1.5px] border-[#E8E3D9] rounded-[8px] text-[14px] lg:text-[15px] font-light italic text-[#999999] placeholder:text-[#999999] resize-none outline-none focus:border-[#8B7355] transition-colors"
              />
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-[20px]">
              <div className="bg-[#FDFBF7] rounded-[8px] p-4 lg:p-[16px] flex gap-4 lg:gap-[16px]">
                <IoShieldCheckmarkOutline className="w-[24px] h-[24px] lg:w-[28px] lg:h-[28px] text-[#8B7355] flex-shrink-0" />
                <div>
                  <div className="text-[14px] lg:text-[16px] font-semibold text-[#1A1A1A] mb-[4px]">{t('deliveryMethods.signatureConfirmation')}</div>
                  <div className="text-[12px] lg:text-[13px] font-normal text-[#666666]">{t('deliveryMethods.signatureDesc')}</div>
                </div>
              </div>
              <div className="bg-[#FDFBF7] rounded-[8px] p-4 lg:p-[16px] flex gap-4 lg:gap-[16px]">
                <IoLocationOutline className="w-[24px] h-[24px] lg:w-[28px] lg:h-[28px] text-[#8B7355] flex-shrink-0" />
                <div>
                  <div className="text-[14px] lg:text-[16px] font-semibold text-[#1A1A1A] mb-[4px]">{t('deliveryMethods.realTimeTracking')}</div>
                  <div className="text-[12px] lg:text-[13px] font-normal text-[#666666]">{t('deliveryMethods.trackingDesc')}</div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right — Order Summary ── */}
          <div className="w-full lg:w-[360px] lg:flex-shrink-0">
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[32px] lg:sticky lg:top-[24px]">
              <h2 className="text-[20px] md:text-[22px] lg:text-[24px] font-semibold text-[#1A1A1A] mb-5 lg:mb-[24px]">{t('deliveryMethods.orderSummary')}</h2>

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
                  <span className="text-[14px] lg:text-[16px] font-normal text-[#666666]">{t('deliveryMethods.subtotal')}</span>
                  <span className="text-[14px] lg:text-[16px] font-normal text-[#1A1A1A]">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[14px] lg:text-[16px] font-normal text-[#666666]">{t('deliveryMethods.shipping')}</span>
                  <span className={`text-[14px] lg:text-[16px] font-normal ${shipping === 0 ? 'text-green-600' : 'text-[#1A1A1A]'}`}>
                    {shipping === 0 ? t('deliveryMethods.free') : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[14px] lg:text-[16px] font-normal text-[#666666]">{t('deliveryMethods.estimatedTax')}</span>
                  <span className="text-[14px] lg:text-[16px] font-normal text-[#1A1A1A]">${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="h-[1px] bg-[#E8E3D9] mb-5 lg:mb-[24px]" />

              <div className="flex justify-between mb-5 lg:mb-[24px]">
                <span className="text-[18px] md:text-[20px] lg:text-[22px] font-semibold text-[#1A1A1A]">{t('deliveryMethods.orderTotal')}</span>
                <span className="text-[18px] md:text-[20px] lg:text-[22px] font-semibold text-[#1A1A1A]">${total.toFixed(2)}</span>
              </div>

              {/* Promo */}
              <div className="flex gap-[8px] mb-5 lg:mb-[24px]">
                <input type="text" placeholder={t('deliveryMethods.promoPlaceholder')} className="flex-1 h-[40px] px-[14px] lg:px-[16px] border-[1.5px] border-[#E8E3D9] rounded-[8px] text-[13px] lg:text-[15px] font-normal outline-none focus:border-[#8B7355] transition-colors" />
                <button className="h-[40px] px-4 lg:px-[20px] bg-[#8B7355] text-white text-[13px] lg:text-[14px] font-medium rounded-[8px] cursor-pointer hover:bg-[#7a6448] transition-colors">
                  {t('deliveryMethods.apply')}
                </button>
              </div>

              {/* CTAs */}
              <div className="space-y-4 lg:space-y-[16px] mb-5 lg:mb-[24px]">
                <button
                  onClick={handleContinue}
                  className="w-full h-[52px] lg:h-[56px] bg-[#8B7355] text-white text-[15px] lg:text-[16px] font-medium rounded-[8px] cursor-pointer hover:bg-[#7a6448] transition-colors"
                >
                  {t('deliveryMethods.continueToPayment')}
                </button>
                <Link to="/checkout">
                  <button className="w-full flex items-center justify-center gap-[8px] text-[13px] lg:text-[14px] font-medium text-[#666666] cursor-pointer hover:text-[#8B7355] transition-colors">
                    <IoArrowBackOutline className="w-[14px] h-[14px] lg:w-[16px] lg:h-[16px]" />
                    {t('deliveryMethods.backToDelivery')}
                  </button>
                </Link>
              </div>

              {/* Trust */}
              <div className="flex items-center justify-around pt-5 lg:pt-[24px] border-t border-[#E8E3D9]">
                <div className="flex flex-col items-center gap-[6px] lg:gap-[8px]">
                  <IoLockClosedOutline className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#666666]" />
                  <span className="text-[11px] lg:text-[12px] font-light text-[#666666]">{t('deliveryMethods.secureCheckout')}</span>
                </div>
                <div className="flex flex-col items-center gap-[6px] lg:gap-[8px]">
                  <IoShieldCheckmarkOutline className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#666666]" />
                  <span className="text-[11px] lg:text-[12px] font-light text-[#666666]">{t('deliveryMethods.moneyBack')}</span>
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