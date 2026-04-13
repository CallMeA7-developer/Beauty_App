import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  IoChevronDown,
  IoChevronUp,
  IoSparkles,
  IoBagOutline,
  IoLocationOutline,
  IoCardOutline,
  IoRefreshOutline,
  IoShieldCheckmarkOutline,
} from 'react-icons/io5'

const FAQ_ICONS = {
  ordersShipping: IoBagOutline,
  returnsRefunds: IoRefreshOutline,
  payments: IoCardOutline,
  productsSkincare: IoSparkles,
  accountLoyalty: IoShieldCheckmarkOutline,
  deliveryAddress: IoLocationOutline,
}

export default function FAQ() {
  const { t, i18n } = useTranslation()
  const [openItems, setOpenItems] = useState({})
  const [activeCategory, setActiveCategory] = useState('all')

  const toggle = (categoryKey, questionIndex) => {
    const key = `${categoryKey}-${questionIndex}`
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const faqs = [
    {
      key: 'ordersShipping',
      icon: FAQ_ICONS.ordersShipping,
      questions: [
        {
          q: t('faq.sections.ordersShipping.questions.trackOrder.q'),
          a: t('faq.sections.ordersShipping.questions.trackOrder.a'),
        },
        {
          q: t('faq.sections.ordersShipping.questions.deliveryTime.q'),
          a: t('faq.sections.ordersShipping.questions.deliveryTime.a'),
        },
        {
          q: t('faq.sections.ordersShipping.questions.internationalShipping.q'),
          a: t('faq.sections.ordersShipping.questions.internationalShipping.a'),
        },
        {
          q: t('faq.sections.ordersShipping.questions.shippingCosts.q'),
          a: t('faq.sections.ordersShipping.questions.shippingCosts.a'),
        },
      ],
    },
    {
      key: 'returnsRefunds',
      icon: FAQ_ICONS.returnsRefunds,
      questions: [
        {
          q: t('faq.sections.returnsRefunds.questions.returnPolicy.q'),
          a: t('faq.sections.returnsRefunds.questions.returnPolicy.a'),
        },
        {
          q: t('faq.sections.returnsRefunds.questions.refundTime.q'),
          a: t('faq.sections.returnsRefunds.questions.refundTime.a'),
        },
        {
          q: t('faq.sections.returnsRefunds.questions.exchangeProduct.q'),
          a: t('faq.sections.returnsRefunds.questions.exchangeProduct.a'),
        },
        {
          q: t('faq.sections.returnsRefunds.questions.nonReturnable.q'),
          a: t('faq.sections.returnsRefunds.questions.nonReturnable.a'),
        },
      ],
    },
    {
      key: 'payments',
      icon: FAQ_ICONS.payments,
      questions: [
        {
          q: t('faq.sections.payments.questions.paymentMethods.q'),
          a: t('faq.sections.payments.questions.paymentMethods.a'),
        },
        {
          q: t('faq.sections.payments.questions.paymentSecurity.q'),
          a: t('faq.sections.payments.questions.paymentSecurity.a'),
        },
        {
          q: t('faq.sections.payments.questions.multiplePayments.q'),
          a: t('faq.sections.payments.questions.multiplePayments.a'),
        },
        {
          q: t('faq.sections.payments.questions.installments.q'),
          a: t('faq.sections.payments.questions.installments.a'),
        },
      ],
    },
    {
      key: 'productsSkincare',
      icon: FAQ_ICONS.productsSkincare,
      questions: [
        {
          q: t('faq.sections.productsSkincare.questions.findProducts.q'),
          a: t('faq.sections.productsSkincare.questions.findProducts.a'),
        },
        {
          q: t('faq.sections.productsSkincare.questions.crueltyFree.q'),
          a: t('faq.sections.productsSkincare.questions.crueltyFree.a'),
        },
        {
          q: t('faq.sections.productsSkincare.questions.naturalIngredients.q'),
          a: t('faq.sections.productsSkincare.questions.naturalIngredients.a'),
        },
        {
          q: t('faq.sections.productsSkincare.questions.storeProducts.q'),
          a: t('faq.sections.productsSkincare.questions.storeProducts.a'),
        },
      ],
    },
    {
      key: 'accountLoyalty',
      icon: FAQ_ICONS.accountLoyalty,
      questions: [
        {
          q: t('faq.sections.accountLoyalty.questions.loyaltyProgram.q'),
          a: t('faq.sections.accountLoyalty.questions.loyaltyProgram.a'),
        },
        {
          q: t('faq.sections.accountLoyalty.questions.updateAccount.q'),
          a: t('faq.sections.accountLoyalty.questions.updateAccount.a'),
        },
        {
          q: t('faq.sections.accountLoyalty.questions.forgotPassword.q'),
          a: t('faq.sections.accountLoyalty.questions.forgotPassword.a'),
        },
        {
          q: t('faq.sections.accountLoyalty.questions.multipleAddresses.q'),
          a: t('faq.sections.accountLoyalty.questions.multipleAddresses.a'),
        },
      ],
    },
    {
      key: 'deliveryAddress',
      icon: FAQ_ICONS.deliveryAddress,
      questions: [
        {
          q: t('faq.sections.deliveryAddress.questions.changeAddress.q'),
          a: t('faq.sections.deliveryAddress.questions.changeAddress.a'),
        },
        {
          q: t('faq.sections.deliveryAddress.questions.notHome.q'),
          a: t('faq.sections.deliveryAddress.questions.notHome.a'),
        },
        {
          q: t('faq.sections.deliveryAddress.questions.poBox.q'),
          a: t('faq.sections.deliveryAddress.questions.poBox.a'),
        },
      ],
    },
  ]

  const categories = [
    { key: 'all', label: t('faq.categories.all') },
    ...faqs.map((section) => ({
      key: section.key,
      label: t(`faq.categories.${section.key}`),
    })),
  ]

  const filteredFaqs =
    activeCategory === 'all'
      ? faqs
      : faqs.filter((section) => section.key === activeCategory)

  return (
    <div
      key={i18n.language}
      className="bg-[#FDFBF7] font-['Cormorant_Garamond'] min-h-screen"
    >
      {/* Hero */}
      <div className="bg-gradient-to-b from-[#F5F1EA] to-[#FDFBF7] px-4 md:px-[60px] lg:px-[120px] py-12 md:py-16 lg:py-[80px] text-center">
        <p className="text-[12px] md:text-[13px] lg:text-[14px] font-light italic text-[#8B7355] tracking-[2px] mb-3">
          {t('faq.supportCenter')}
        </p>
        <h1 className="text-[36px] md:text-[48px] lg:text-[64px] font-bold text-[#1A1A1A] mb-4">
          {t('faq.title')}
        </h1>
        <p className="text-[15px] md:text-[16px] lg:text-[18px] font-light text-[#666666] max-w-[600px] mx-auto mb-8">
          {t('faq.subtitle')}
        </p>
        <Link to="/order-tracking">
          <button className="h-[48px] px-8 bg-[#8B7355] text-white text-[14px] lg:text-[15px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">
            {t('faq.trackMyOrder')}
          </button>
        </Link>
      </div>

      {/* Category Filter */}
      <div className="px-4 md:px-[60px] lg:px-[120px] py-6 border-b border-[#E8E3D9] bg-white">
        <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`flex-shrink-0 h-[36px] px-4 rounded-full text-[13px] lg:text-[14px] font-medium transition-all ${
                activeCategory === cat.key
                  ? 'bg-[#8B7355] text-white'
                  : 'bg-[#F5F1EA] text-[#8B7355] hover:bg-[#8B7355] hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Content */}
      <div className="px-4 md:px-[60px] lg:px-[120px] py-10 lg:py-[64px]">
        <div className="max-w-[860px] mx-auto space-y-10 lg:space-y-12">
          {filteredFaqs.map((section) => (
            <div key={section.key}>
              <div className="flex items-center gap-3 mb-5 lg:mb-6">
                <div className="w-[40px] h-[40px] bg-[#F5F1EA] rounded-full flex items-center justify-center flex-shrink-0">
                  <section.icon className="w-[20px] h-[20px] text-[#8B7355]" />
                </div>
                <h2 className="text-[20px] md:text-[24px] lg:text-[28px] font-semibold text-[#1A1A1A]">
                  {t(`faq.categories.${section.key}`)}
                </h2>
              </div>

              <div className="space-y-3">
                {section.questions.map((item, qIndex) => {
                  const key = `${section.key}-${qIndex}`
                  const isOpen = openItems[key]

                  return (
                    <div
                      key={qIndex}
                      className="bg-white rounded-[12px] border border-[#E8E3D9] overflow-hidden"
                    >
                      <button
                        onClick={() => toggle(section.key, qIndex)}
                        className="w-full flex items-center justify-between px-5 lg:px-6 py-4 lg:py-5 text-left"
                      >
                        <span className="text-[15px] lg:text-[16px] font-medium text-[#1A1A1A] pr-4">
                          {item.q}
                        </span>
                        {isOpen ? (
                          <IoChevronUp className="w-[18px] h-[18px] text-[#8B7355] flex-shrink-0" />
                        ) : (
                          <IoChevronDown className="w-[18px] h-[18px] text-[#8B7355] flex-shrink-0" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="px-5 lg:px-6 pb-4 lg:pb-5 border-t border-[#F5F1EA]">
                          <p className="text-[14px] lg:text-[15px] font-light text-[#666666] leading-relaxed pt-4">
                            {item.a}
                          </p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Still need help */}
        <div className="max-w-[860px] mx-auto mt-14 lg:mt-16 bg-gradient-to-r from-[#F5F1EA] to-[#FDFBF7] rounded-[16px] border border-[#E8E3D9] p-6 lg:p-[40px] text-center">
          <IoSparkles className="w-[40px] h-[40px] text-[#C9A870] mx-auto mb-4" />
          <h3 className="text-[22px] lg:text-[28px] font-semibold text-[#1A1A1A] mb-2">
            {t('faq.stillHaveQuestions')}
          </h3>
          <p className="text-[14px] lg:text-[15px] font-light text-[#666666] mb-6">
            {t('faq.supportAvailability')}
          </p>
          <a href="mailto:support@shanloray.ru">
            <button className="h-[48px] px-8 bg-[#8B7355] text-white text-[14px] lg:text-[15px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">
              {t('faq.emailSupport')}
            </button>
          </a>
        </div>
      </div>
    </div>
  )
}