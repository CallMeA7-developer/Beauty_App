import { useState } from 'react'
import { Link } from 'react-router-dom'
import { IoChevronDown, IoShieldCheckmarkOutline, IoLockClosedOutline, IoPersonOutline, IoGlobeOutline, IoMailOutline, IoCallOutline } from 'react-icons/io5'

const sections = [
  {
    title: 'Information We Collect',
    icon: IoPersonOutline,
    content: [
      {
        subtitle: 'Personal Information',
        text: 'When you create an account or make a purchase, we collect information such as your name, email address, phone number, and shipping address. This information is necessary to process your orders and provide our services.'
      },
      {
        subtitle: 'Skin Analysis Data',
        text: 'When you use our AI Skin Analysis feature, we collect your skin profile data including skin type, concerns, and analysis results. This data is used solely to provide personalized product recommendations and track your skin journey over time.'
      },
      {
        subtitle: 'Usage Data',
        text: 'We automatically collect certain information when you visit our website, including your IP address, browser type, pages visited, and time spent on pages. This helps us improve our services and user experience.'
      },
      {
        subtitle: 'Payment Information',
        text: 'Payment details are processed securely through our payment providers. We do not store your full credit card numbers — only the last four digits and card type for your reference.'
      },
    ]
  },
  {
    title: 'How We Use Your Information',
    icon: IoShieldCheckmarkOutline,
    content: [
      {
        subtitle: 'Order Processing',
        text: 'We use your personal information to process and fulfill your orders, send order confirmations, and provide shipping updates.'
      },
      {
        subtitle: 'Personalization',
        text: 'Your skin analysis data and purchase history allow us to offer personalized product recommendations, beauty routines, and tailored content that matches your unique needs.'
      },
      {
        subtitle: 'Communication',
        text: 'We may send you emails about your orders, account activity, and promotional offers. You can opt out of marketing emails at any time while still receiving transactional messages.'
      },
      {
        subtitle: 'Service Improvement',
        text: 'We analyze usage patterns and feedback to improve our website, products, and services. All data used for this purpose is aggregated and anonymized.'
      },
    ]
  },
  {
    title: 'Data Protection & Security',
    icon: IoLockClosedOutline,
    content: [
      {
        subtitle: 'Encryption',
        text: 'All data transmitted between your browser and our servers is encrypted using industry-standard SSL/TLS protocols. Sensitive information is stored using advanced encryption methods.'
      },
      {
        subtitle: 'Access Controls',
        text: 'Access to your personal data is strictly limited to authorized personnel who need it to provide our services. All staff with data access are bound by confidentiality agreements.'
      },
      {
        subtitle: 'Data Retention',
        text: 'We retain your personal information for as long as your account is active or as needed to provide services. You may request deletion of your account and associated data at any time.'
      },
      {
        subtitle: 'Breach Notification',
        text: 'In the unlikely event of a data breach that affects your personal information, we will notify you promptly in accordance with applicable laws and regulations.'
      },
    ]
  },
  {
    title: 'Sharing Your Information',
    icon: IoGlobeOutline,
    content: [
      {
        subtitle: 'Third-Party Service Providers',
        text: 'We share necessary data with trusted partners who help us operate our business, including payment processors, shipping carriers, and analytics providers. These partners are bound by strict data protection agreements.'
      },
      {
        subtitle: 'No Data Selling',
        text: 'We never sell, rent, or trade your personal information to third parties for their marketing purposes. Your data is used only to provide and improve our services to you.'
      },
      {
        subtitle: 'Legal Requirements',
        text: 'We may disclose your information if required by law, court order, or government regulation, or if we believe disclosure is necessary to protect our rights or the safety of others.'
      },
    ]
  },
  {
    title: 'Your Rights & Choices',
    icon: IoShieldCheckmarkOutline,
    content: [
      {
        subtitle: 'Access & Correction',
        text: 'You have the right to access, update, or correct your personal information at any time through your account settings or by contacting our support team.'
      },
      {
        subtitle: 'Data Deletion',
        text: 'You may request the deletion of your account and personal data. Please note that some information may be retained for legal or legitimate business purposes.'
      },
      {
        subtitle: 'Marketing Opt-Out',
        text: 'You can unsubscribe from marketing communications at any time by clicking the unsubscribe link in any email or updating your notification preferences in your account settings.'
      },
      {
        subtitle: 'Cookie Preferences',
        text: 'You can control cookie settings through your browser preferences. Note that disabling certain cookies may affect the functionality of our website.'
      },
    ]
  },
  {
    title: 'Cookies & Tracking',
    icon: IoGlobeOutline,
    content: [
      {
        subtitle: 'Essential Cookies',
        text: 'We use essential cookies to enable core functionality such as authentication, shopping cart, and security features. These cannot be disabled as the site would not function without them.'
      },
      {
        subtitle: 'Analytics Cookies',
        text: 'With your consent, we use analytics cookies to understand how visitors interact with our website, helping us improve the user experience and content.'
      },
      {
        subtitle: 'Preference Cookies',
        text: 'These cookies remember your settings and preferences, such as your language and region, to provide a more personalized experience on return visits.'
      },
    ]
  },
]

export default function PrivacyPolicy() {
  const [openSections, setOpenSections] = useState({})

  const toggle = (index) => {
    setOpenSections(prev => ({ ...prev, [index]: !prev[index] }))
  }

  return (
    <div className="bg-[#FDFBF7] font-['Cormorant_Garamond'] min-h-screen">

      {/* Hero */}
      <div className="bg-gradient-to-b from-[#F5F1EA] to-[#FDFBF7] px-4 md:px-[60px] lg:px-[120px] py-12 md:py-16 lg:py-[80px] text-center">
        <div className="w-[64px] h-[64px] bg-[#8B7355] rounded-full flex items-center justify-center mx-auto mb-6">
          <IoShieldCheckmarkOutline className="w-[32px] h-[32px] text-white" />
        </div>
        <p className="text-[12px] md:text-[13px] lg:text-[14px] font-light italic text-[#8B7355] tracking-[2px] mb-3">LEGAL</p>
        <h1 className="text-[36px] md:text-[48px] lg:text-[64px] font-bold text-[#1A1A1A] mb-4">Privacy Policy</h1>
        <p className="text-[15px] md:text-[16px] lg:text-[18px] font-light text-[#666666] max-w-[600px] mx-auto mb-4">
          Your privacy is important to us. This policy explains how Shan Loray collects, uses, and protects your personal information.
        </p>
        <p className="text-[13px] text-[#999999]">Last updated: April 2026</p>
      </div>

      {/* Breadcrumb */}
      <div className="min-h-[48px] bg-white px-4 md:px-[60px] lg:px-[120px] flex items-center border-b border-[#E8E3D9]">
        <Link to="/"><span className="text-[13px] lg:text-[15px] font-normal text-[#8B7355] cursor-pointer">Home</span></Link>
        <span className="text-[13px] lg:text-[15px] font-normal text-[#666666] mx-2">/</span>
        <Link to="/privacy-settings"><span className="text-[13px] lg:text-[15px] font-normal text-[#8B7355] cursor-pointer">Account Settings</span></Link>
        <span className="text-[13px] lg:text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[13px] lg:text-[15px] font-normal text-[#666666]">Privacy Policy</span>
      </div>

      {/* Content */}
      <div className="px-4 md:px-[60px] lg:px-[120px] py-10 lg:py-[64px]">
        <div className="max-w-[860px] mx-auto">

          {/* Intro */}
          <div className="bg-white rounded-[16px] border border-[#E8E3D9] p-6 lg:p-8 mb-8">
            <p className="text-[15px] lg:text-[16px] font-normal text-[#666666] leading-relaxed">
              At <span className="font-semibold text-[#8B7355]">Shan Loray</span>, we are committed to protecting your privacy and handling your personal data with transparency and care. This Privacy Policy describes our practices for collecting, using, and safeguarding the information you share with us when using our website and services.
            </p>
            <p className="text-[15px] lg:text-[16px] font-normal text-[#666666] leading-relaxed mt-4">
              By using our services, you agree to the collection and use of information in accordance with this policy. If you do not agree, please discontinue use of our services.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-4 mb-12">
            {sections.map((section, sIndex) => (
              <div key={sIndex} className="bg-white rounded-[12px] border border-[#E8E3D9] overflow-hidden">
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

          {/* Contact */}
          <div className="bg-gradient-to-r from-[#F5F1EA] to-[#FDFBF7] rounded-[16px] border border-[#E8E3D9] p-6 lg:p-[40px] text-center">
            <IoShieldCheckmarkOutline className="w-[40px] h-[40px] text-[#C9A870] mx-auto mb-4" />
            <h3 className="text-[22px] lg:text-[28px] font-semibold text-[#1A1A1A] mb-2">Questions About Your Privacy?</h3>
            <p className="text-[14px] lg:text-[15px] font-light text-[#666666] mb-6 max-w-[480px] mx-auto">
              If you have any questions about this Privacy Policy or how we handle your data, please don't hesitate to contact us.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="mailto:privacy@shanloray.ru">
                <button className="flex items-center gap-2 h-[48px] px-6 bg-[#8B7355] text-white text-[14px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">
                  <IoMailOutline className="w-[18px] h-[18px]" />
                  Email Privacy Team
                </button>
              </a>
              <Link to="/privacy-settings">
                <button className="flex items-center gap-2 h-[48px] px-6 bg-white border border-[#8B7355] text-[#8B7355] text-[14px] font-medium rounded-[8px] hover:bg-[#F5F1EA] transition-colors">
                  Manage Privacy Settings
                </button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}