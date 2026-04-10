import { useState } from 'react'
import { Link } from 'react-router-dom'
import { IoChevronDown, IoChevronUp, IoSparkles, IoBagOutline, IoLocationOutline, IoCardOutline, IoRefreshOutline, IoShieldCheckmarkOutline } from 'react-icons/io5'

const faqs = [
  {
    category: 'Orders & Shipping',
    icon: IoBagOutline,
    questions: [
      { q: 'How do I track my order?', a: 'Once your order is placed, you can track it in real-time from your Account → Order History page. You will also receive an email with tracking details.' },
      { q: 'How long does delivery take?', a: 'Standard delivery takes 3–5 business days. Express delivery takes 1–2 business days. Same-day delivery is available in select areas.' },
      { q: 'Do you ship internationally?', a: 'Yes, we ship worldwide. International delivery times vary between 7–14 business days depending on your location.' },
      { q: 'What are the shipping costs?', a: 'Standard shipping is free on orders over $100. Express delivery costs $15, and same-day delivery costs $25.' },
    ]
  },
  {
    category: 'Returns & Refunds',
    icon: IoRefreshOutline,
    questions: [
      { q: 'What is your return policy?', a: 'We offer a 30-day return policy on all unopened products in their original packaging. Simply contact our support team to initiate a return.' },
      { q: 'How long do refunds take?', a: 'Refunds are processed within 5–7 business days after we receive your return. The amount will be credited back to your original payment method.' },
      { q: 'Can I exchange a product?', a: 'Yes, exchanges are available for the same product in a different variant (e.g., size or shade). Contact our support team to arrange an exchange.' },
      { q: 'What items cannot be returned?', a: 'Opened skincare and makeup products cannot be returned for hygiene reasons. Gift cards and custom orders are also non-returnable.' },
    ]
  },
  {
    category: 'Payments',
    icon: IoCardOutline,
    questions: [
      { q: 'What payment methods do you accept?', a: 'We accept all major credit and debit cards (Visa, Mastercard, Amex), as well as digital wallets. All payments are securely processed.' },
      { q: 'Is my payment information secure?', a: 'Absolutely. We use industry-standard SSL encryption and never store your full card details. All transactions are processed through secure payment gateways.' },
      { q: 'Can I use multiple payment methods?', a: 'Currently we support one payment method per order. You can save multiple cards in your account for convenience.' },
      { q: 'Do you offer installment payment options?', a: 'Yes, installment options are available at checkout for eligible orders. The available plans will be displayed based on your order total.' },
    ]
  },
  {
    category: 'Products & Skincare',
    icon: IoSparkles,
    questions: [
      { q: 'How do I find the right products for my skin?', a: 'Use our free AI Skin Analysis tool to get a personalized skin profile and product recommendations tailored to your unique skin type and concerns.' },
      { q: 'Are your products cruelty-free?', a: 'Yes, all Shan Loray products are cruelty-free and never tested on animals. We are committed to ethical and sustainable beauty.' },
      { q: 'Are the ingredients natural?', a: 'We use a blend of clinically proven active ingredients and natural botanicals. Full ingredient lists are available on each product page.' },
      { q: 'How should I store my products?', a: 'Store products in a cool, dry place away from direct sunlight. Some serums and vitamin C products benefit from refrigeration.' },
    ]
  },
  {
    category: 'Account & Loyalty',
    icon: IoShieldCheckmarkOutline,
    questions: [
      { q: 'How does the Loyalty Program work?', a: 'You earn 1 loyalty point for every $1 spent. Points can be redeemed for discounts on future orders. Reach 2,000 points for Elite status and 3,000 for Gold status.' },
      { q: 'How do I update my account information?', a: 'Go to Account → Account Dashboard → Edit Profile to update your name, email, and other personal details.' },
      { q: 'I forgot my password. What should I do?', a: 'Click "Forgot Password" on the login screen and we will send you a reset link to your registered email address.' },
      { q: 'Can I have multiple shipping addresses?', a: 'Yes, you can save multiple shipping addresses in your account under Account → Shipping Addresses and choose your preferred one at checkout.' },
    ]
  },
  {
    category: 'Delivery Address',
    icon: IoLocationOutline,
    questions: [
      { q: 'Can I change my delivery address after ordering?', a: 'Address changes are possible within 1 hour of placing an order. Contact our support team immediately and we will do our best to update it before dispatch.' },
      { q: 'What if I am not home during delivery?', a: 'The courier will leave a delivery notice and attempt re-delivery. You can also arrange collection from your nearest courier depot.' },
      { q: 'Do you deliver to P.O. boxes?', a: 'We deliver to P.O. boxes for standard shipping only. Express and same-day delivery require a physical address.' },
    ]
  },
]

export default function FAQ() {
  const [openItems, setOpenItems] = useState({})
  const [activeCategory, setActiveCategory] = useState('All')

  const toggle = (categoryIndex, questionIndex) => {
    const key = `${categoryIndex}-${questionIndex}`
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const categories = ['All', ...faqs.map(f => f.category)]
  const filteredFaqs = activeCategory === 'All' ? faqs : faqs.filter(f => f.category === activeCategory)

  return (
    <div className="bg-[#FDFBF7] font-['Cormorant_Garamond'] min-h-screen">

      {/* Hero */}
      <div className="bg-gradient-to-b from-[#F5F1EA] to-[#FDFBF7] px-4 md:px-[60px] lg:px-[120px] py-12 md:py-16 lg:py-[80px] text-center">
        <p className="text-[12px] md:text-[13px] lg:text-[14px] font-light italic text-[#8B7355] tracking-[2px] mb-3">SUPPORT CENTER</p>
        <h1 className="text-[36px] md:text-[48px] lg:text-[64px] font-bold text-[#1A1A1A] mb-4">Frequently Asked Questions</h1>
        <p className="text-[15px] md:text-[16px] lg:text-[18px] font-light text-[#666666] max-w-[600px] mx-auto mb-8">
          Find answers to the most common questions about orders, products, returns and more.
        </p>
        <Link to="/order-tracking">
          <button className="h-[48px] px-8 bg-[#8B7355] text-white text-[14px] lg:text-[15px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">
            Track My Order
          </button>
        </Link>
      </div>

      {/* Category Filter */}
      <div className="px-4 md:px-[60px] lg:px-[120px] py-6 border-b border-[#E8E3D9] bg-white">
        <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 h-[36px] px-4 rounded-full text-[13px] lg:text-[14px] font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-[#8B7355] text-white'
                  : 'bg-[#F5F1EA] text-[#8B7355] hover:bg-[#8B7355] hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Content */}
      <div className="px-4 md:px-[60px] lg:px-[120px] py-10 lg:py-[64px]">
        <div className="max-w-[860px] mx-auto space-y-10 lg:space-y-12">
          {filteredFaqs.map((section, catIndex) => (
            <div key={section.category}>
              <div className="flex items-center gap-3 mb-5 lg:mb-6">
                <div className="w-[40px] h-[40px] bg-[#F5F1EA] rounded-full flex items-center justify-center flex-shrink-0">
                  <section.icon className="w-[20px] h-[20px] text-[#8B7355]" />
                </div>
                <h2 className="text-[20px] md:text-[24px] lg:text-[28px] font-semibold text-[#1A1A1A]">{section.category}</h2>
              </div>
              <div className="space-y-3">
                {section.questions.map((item, qIndex) => {
                  const key = `${catIndex}-${qIndex}`
                  const isOpen = openItems[key]
                  return (
                    <div key={qIndex} className="bg-white rounded-[12px] border border-[#E8E3D9] overflow-hidden">
                      <button
                        onClick={() => toggle(catIndex, qIndex)}
                        className="w-full flex items-center justify-between px-5 lg:px-6 py-4 lg:py-5 text-left"
                      >
                        <span className="text-[15px] lg:text-[16px] font-medium text-[#1A1A1A] pr-4">{item.q}</span>
                        {isOpen
                          ? <IoChevronUp className="w-[18px] h-[18px] text-[#8B7355] flex-shrink-0" />
                          : <IoChevronDown className="w-[18px] h-[18px] text-[#8B7355] flex-shrink-0" />
                        }
                      </button>
                      {isOpen && (
                        <div className="px-5 lg:px-6 pb-4 lg:pb-5 border-t border-[#F5F1EA]">
                          <p className="text-[14px] lg:text-[15px] font-light text-[#666666] leading-relaxed pt-4">{item.a}</p>
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
          <h3 className="text-[22px] lg:text-[28px] font-semibold text-[#1A1A1A] mb-2">Still have questions?</h3>
          <p className="text-[14px] lg:text-[15px] font-light text-[#666666] mb-6">Our support team is available Monday–Friday, 9am–6pm</p>
          <a href="mailto:support@shanloray.ru">
            <button className="h-[48px] px-8 bg-[#8B7355] text-white text-[14px] lg:text-[15px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">
              Email Support
            </button>
          </a>
        </div>
      </div>
    </div>
  )
}