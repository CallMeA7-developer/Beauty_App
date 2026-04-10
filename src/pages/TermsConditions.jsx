import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IoChevronDown, IoDocumentTextOutline, IoShieldCheckmarkOutline, IoCartOutline, IoRefreshOutline, IoCardOutline, IoGlobeOutline } from 'react-icons/io5'

const sections = [
  {
    title: 'Acceptance of Terms',
    icon: IoDocumentTextOutline,
    content: [
      {
        subtitle: 'Agreement to Terms',
        text: 'By accessing or using the Shan Loray website and services, you agree to be bound by these Terms & Conditions. If you do not agree to these terms, please do not use our services.'
      },
      {
        subtitle: 'Changes to Terms',
        text: 'We reserve the right to modify these terms at any time. We will notify users of significant changes via email or a prominent notice on our website. Continued use of our services after changes constitutes acceptance of the new terms.'
      },
      {
        subtitle: 'Eligibility',
        text: 'You must be at least 18 years of age to use our services and make purchases. By using our website, you represent and warrant that you meet this requirement.'
      },
    ]
  },
  {
    title: 'Orders & Purchases',
    icon: IoCartOutline,
    content: [
      {
        subtitle: 'Order Acceptance',
        text: 'All orders are subject to availability and acceptance. We reserve the right to refuse or cancel any order at our discretion, including orders that appear to be placed by resellers or distributors.'
      },
      {
        subtitle: 'Pricing',
        text: 'All prices are listed in USD and are subject to change without notice. We make every effort to ensure accurate pricing, but in the event of an error, we reserve the right to cancel the order or contact you to arrange a corrected order.'
      },
      {
        subtitle: 'Payment',
        text: 'Payment is required at the time of purchase. We accept major credit and debit cards. All transactions are processed securely through our payment providers.'
      },
      {
        subtitle: 'Order Confirmation',
        text: 'After placing an order, you will receive an email confirmation with your order details. This confirmation does not constitute acceptance of your order — acceptance occurs when your order is dispatched.'
      },
    ]
  },
  {
    title: 'Shipping & Delivery',
    icon: IoGlobeOutline,
    content: [
      {
        subtitle: 'Delivery Times',
        text: 'Estimated delivery times are provided for guidance only and are not guaranteed. We are not responsible for delays caused by customs, postal services, or other factors beyond our control.'
      },
      {
        subtitle: 'Shipping Costs',
        text: 'Shipping costs are calculated at checkout based on your location and chosen delivery method. Free shipping thresholds may apply and are subject to change.'
      },
      {
        subtitle: 'Risk of Loss',
        text: 'Title and risk of loss for products pass to you upon delivery to the shipping carrier. We are not responsible for lost or stolen packages after they have been delivered.'
      },
    ]
  },
  {
    title: 'Returns & Refunds',
    icon: IoRefreshOutline,
    content: [
      {
        subtitle: 'Return Policy',
        text: 'We accept returns of unopened, unused products in their original packaging within 30 days of delivery. Products that have been opened cannot be returned for hygiene reasons.'
      },
      {
        subtitle: 'Refund Process',
        text: 'Approved refunds will be processed to your original payment method within 5-7 business days of receiving the returned item. Shipping costs are non-refundable unless the return is due to our error.'
      },
      {
        subtitle: 'Defective Products',
        text: 'If you receive a defective or damaged product, please contact us within 7 days of delivery. We will arrange a replacement or full refund at no additional cost to you.'
      },
    ]
  },
  {
    title: 'Intellectual Property',
    icon: IoShieldCheckmarkOutline,
    content: [
      {
        subtitle: 'Ownership',
        text: 'All content on the Shan Loray website, including text, images, logos, and product descriptions, is owned by or licensed to Shan Loray and is protected by copyright and intellectual property laws.'
      },
      {
        subtitle: 'Permitted Use',
        text: 'You may view and download content from our website for personal, non-commercial use only. Any other use, including reproduction, distribution, or modification, requires our prior written consent.'
      },
      {
        subtitle: 'User Content',
        text: 'By submitting reviews, photos, or other content to our website, you grant Shan Loray a non-exclusive, royalty-free license to use, display, and distribute such content in connection with our services.'
      },
    ]
  },
  {
    title: 'Limitation of Liability',
    icon: IoDocumentTextOutline,
    content: [
      {
        subtitle: 'Disclaimer',
        text: 'Our products and services are provided "as is" without warranties of any kind, either express or implied. We do not warrant that our website will be error-free or uninterrupted.'
      },
      {
        subtitle: 'Limitation',
        text: 'To the fullest extent permitted by law, Shan Loray shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our products or services.'
      },
      {
        subtitle: 'Governing Law',
        text: 'These Terms & Conditions are governed by and construed in accordance with applicable laws. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the competent courts.'
      },
    ]
  },
  {
    title: 'Payment Terms',
    icon: IoCardOutline,
    content: [
      {
        subtitle: 'Secure Payments',
        text: 'All payment information is encrypted and processed securely. We do not store your full payment card details on our servers.'
      },
      {
        subtitle: 'Loyalty Points',
        text: 'Loyalty points are awarded on qualifying purchases and may be redeemed for discounts on future orders. Points have no cash value and cannot be transferred. We reserve the right to modify or discontinue the loyalty program at any time.'
      },
      {
        subtitle: 'Promotional Offers',
        text: 'Promotional discounts and offers are subject to their own terms and conditions. They cannot be combined with other offers unless explicitly stated and are valid for a limited time only.'
      },
    ]
  },
]

export default function TermsConditions() {
  const { t } = useTranslation()
  const [openSections, setOpenSections] = useState(() => {
    if (window.location.hash === '#returns') return { 3: true }
    return {}
  })

  useEffect(() => {
    if (window.location.hash === '#returns') {
      setTimeout(() => {
        document.getElementById('returns')?.scrollIntoView({ behavior: 'smooth' })
      }, 300)
    }
  }, [])

  const toggle = (index) => {
    setOpenSections(prev => ({ ...prev, [index]: !prev[index] }))
  }

  return (
    <div className="bg-[#FDFBF7] font-['Cormorant_Garamond'] min-h-screen">

      {/* Hero */}
      <div className="bg-gradient-to-b from-[#F5F1EA] to-[#FDFBF7] px-4 md:px-[60px] lg:px-[120px] py-12 md:py-16 lg:py-[80px] text-center">
        <div className="w-[64px] h-[64px] bg-[#8B7355] rounded-full flex items-center justify-center mx-auto mb-6">
          <IoDocumentTextOutline className="w-[32px] h-[32px] text-white" />
        </div>
        <p className="text-[12px] md:text-[13px] lg:text-[14px] font-light italic text-[#8B7355] tracking-[2px] mb-3">LEGAL</p>
        <h1 className="text-[36px] md:text-[48px] lg:text-[64px] font-bold text-[#1A1A1A] mb-4">{t('terms.title')}</h1>
        <p className="text-[15px] md:text-[16px] lg:text-[18px] font-light text-[#666666] max-w-[600px] mx-auto mb-4">
          Please read these terms carefully before using our services or making a purchase on the Shan Loray website.
        </p>
        <p className="text-[13px] text-[#999999]">{t('terms.lastUpdated')}</p>
      </div>

      {/* Breadcrumb */}
      <div className="min-h-[48px] bg-white px-4 md:px-[60px] lg:px-[120px] flex items-center border-b border-[#E8E3D9]">
        <Link to="/"><span className="text-[13px] lg:text-[15px] font-normal text-[#8B7355] cursor-pointer">Home</span></Link>
        <span className="text-[13px] lg:text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[13px] lg:text-[15px] font-normal text-[#666666]">{t('terms.title')}</span>
      </div>

      {/* Content */}
      <div className="px-4 md:px-[60px] lg:px-[120px] py-10 lg:py-[64px]">
        <div className="max-w-[860px] mx-auto">

          {/* Intro */}
          <div className="bg-white rounded-[16px] border border-[#E8E3D9] p-6 lg:p-8 mb-8">
            <p className="text-[15px] lg:text-[16px] font-normal text-[#666666] leading-relaxed">
              Welcome to <span className="font-semibold text-[#8B7355]">Shan Loray</span>. These Terms & Conditions govern your use of our website and the purchase of products from us. By placing an order, you confirm that you have read, understood, and agree to be bound by these terms.
            </p>
            <p className="text-[15px] lg:text-[16px] font-normal text-[#666666] leading-relaxed mt-4">
              If you have any questions about these terms, please contact our customer support team before making a purchase.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-4 mb-12">
            {sections.map((section, sIndex) => (
              <div key={sIndex} id={sIndex === 3 ? 'returns' : undefined} className="bg-white rounded-[12px] border border-[#E8E3D9] overflow-hidden">
                <button
                  onClick={() => toggle(sIndex)}
                  className="w-full flex items-center justify-between px-5 lg:px-6 py-5 text-left hover:bg-[#FDFBF7] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-[36px] h-[36px] bg-[#F5F1EA] rounded-full flex items-center justify-center flex-shrink-0">
                      <section.icon className="w-[18px] h-[18px] text-[#8B7355]" />
                    </div>
                    <span className="text-[16px] lg:text-[18px] font-semibold text-[#1A1A1A]">{section.title}</span>
                  </div>
                  <IoChevronDown className={`w-[18px] h-[18px] text-[#8B7355] flex-shrink-0 transition-transform duration-300 ${openSections[sIndex] ? 'rotate-180' : ''}`} />
                </button>
                {openSections[sIndex] && (
                  <div className="px-5 lg:px-6 pb-5 border-t border-[#F5F1EA]">
                    <div className="space-y-5 pt-5">
                      {section.content.map((item, iIndex) => (
                        <div key={iIndex}>
                          <h4 className="text-[14px] lg:text-[16px] font-semibold text-[#1A1A1A] mb-2">{item.subtitle}</h4>
                          <p className="text-[13px] lg:text-[15px] font-normal text-[#666666] leading-relaxed">{item.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Footer note */}
          <div className="bg-gradient-to-r from-[#F5F1EA] to-[#FDFBF7] rounded-[16px] border border-[#E8E3D9] p-6 lg:p-[40px] text-center">
            <IoDocumentTextOutline className="w-[40px] h-[40px] text-[#C9A870] mx-auto mb-4" />
            <h3 className="text-[22px] lg:text-[28px] font-semibold text-[#1A1A1A] mb-2">Need Clarification?</h3>
            <p className="text-[14px] lg:text-[15px] font-light text-[#666666] mb-6 max-w-[480px] mx-auto">
              If you have any questions about our Terms & Conditions, our team is happy to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/privacy-policy">
                <button className="flex items-center gap-2 h-[48px] px-6 bg-white border border-[#8B7355] text-[#8B7355] text-[14px] font-medium rounded-[8px] hover:bg-[#F5F1EA] transition-colors">
                  View Privacy Policy
                </button>
              </Link>
              <Link to="/faq">
                <button className="flex items-center gap-2 h-[48px] px-6 bg-[#8B7355] text-white text-[14px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">
                  Visit FAQ
                </button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}