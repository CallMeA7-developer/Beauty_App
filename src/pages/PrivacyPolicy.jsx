import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  IoChevronDown,
  IoShieldCheckmarkOutline,
  IoLockClosedOutline,
  IoPersonOutline,
  IoGlobeOutline,
  IoMailOutline,
  IoCallOutline,
  IoArrowUp,
} from 'react-icons/io5'

const sectionIcons = [
  IoPersonOutline,
  IoShieldCheckmarkOutline,
  IoLockClosedOutline,
  IoGlobeOutline,
  IoShieldCheckmarkOutline,
  IoGlobeOutline,
]

export default function PrivacyPolicy() {
  const { t, i18n } = useTranslation()
  const [openSections, setOpenSections] = useState({})
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const sections = t('privacyPolicy.sections', { returnObjects: true }).map((section, index) => ({
    ...section,
    icon: sectionIcons[index],
  }))

  const toggle = (index) => {
    setOpenSections((prev) => ({ ...prev, [index]: !prev[index] }))
  }

  return (
    <div key={i18n.language} className="bg-[#FDFBF7] font-['Cormorant_Garamond'] min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-b from-[#F5F1EA] to-[#FDFBF7] px-4 md:px-[60px] lg:px-[120px] py-12 md:py-16 lg:py-[80px] text-center">
        <div className="w-[64px] h-[64px] bg-[#8B7355] rounded-full flex items-center justify-center mx-auto mb-6">
          <IoShieldCheckmarkOutline className="w-[32px] h-[32px] text-white" />
        </div>
        <p className="text-[12px] md:text-[13px] lg:text-[14px] font-light italic text-[#8B7355] tracking-[2px] mb-3">
          {t('privacyPolicy.legal')}
        </p>
        <h1 className="text-[36px] md:text-[48px] lg:text-[64px] font-bold text-[#1A1A1A] mb-4">
          {t('privacyPolicy.title')}
        </h1>
        <p className="text-[15px] md:text-[16px] lg:text-[18px] font-light text-[#666666] max-w-[600px] mx-auto mb-4">
          {t('privacyPolicy.subtitle')}
        </p>
        <p className="text-[13px] text-[#999999]">{t('privacyPolicy.lastUpdated')}</p>
      </div>

      {/* Breadcrumb */}
      <div className="min-h-[48px] bg-white px-4 md:px-[60px] lg:px-[120px] flex items-center border-b border-[#E8E3D9]">
        <Link to="/">
          <span className="text-[13px] lg:text-[15px] font-normal text-[#8B7355] cursor-pointer">
            {t('privacyPolicy.breadcrumb.home')}
          </span>
        </Link>
        <span className="text-[13px] lg:text-[15px] font-normal text-[#666666] mx-2">/</span>
        <Link to="/privacy-settings">
          <span className="text-[13px] lg:text-[15px] font-normal text-[#8B7355] cursor-pointer">
            {t('privacyPolicy.breadcrumb.accountSettings')}
          </span>
        </Link>
        <span className="text-[13px] lg:text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[13px] lg:text-[15px] font-normal text-[#666666]">
          {t('privacyPolicy.breadcrumb.privacyPolicy')}
        </span>
      </div>

      {/* Content */}
      <div className="px-4 md:px-[60px] lg:px-[120px] py-10 lg:py-[64px]">
        <div className="max-w-[860px] mx-auto">
          {/* Intro */}
          <div className="bg-white rounded-[16px] border border-[#E8E3D9] p-6 lg:p-8 mb-8">
            <p className="text-[15px] lg:text-[16px] font-normal text-[#666666] leading-relaxed">
              {t('privacyPolicy.intro.paragraph1.part1')}
              <span className="font-semibold text-[#8B7355]">
                {t('privacyPolicy.intro.paragraph1.brand')}
              </span>
              {t('privacyPolicy.intro.paragraph1.part2')}
            </p>
            <p className="text-[15px] lg:text-[16px] font-normal text-[#666666] leading-relaxed mt-4">
              {t('privacyPolicy.intro.paragraph2')}
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
                    <span className="text-[16px] lg:text-[18px] font-semibold text-[#1A1A1A]">
                      {section.title}
                    </span>
                  </div>
                  <IoChevronDown
                    className={`w-[18px] h-[18px] text-[#8B7355] flex-shrink-0 transition-transform duration-300 ${
                      openSections[sIndex] ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openSections[sIndex] && (
                  <div className="px-5 lg:px-6 pb-5 border-t border-[#F5F1EA]">
                    <div className="space-y-5 pt-5">
                      {section.content.map((item, iIndex) => (
                        <div key={iIndex}>
                          <h4 className="text-[14px] lg:text-[16px] font-semibold text-[#1A1A1A] mb-2">
                            {item.subtitle}
                          </h4>
                          <p className="text-[13px] lg:text-[15px] font-normal text-[#666666] leading-relaxed">
                            {item.text}
                          </p>
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
            <h3 className="text-[22px] lg:text-[28px] font-semibold text-[#1A1A1A] mb-2">
              {t('privacyPolicy.contact.title')}
            </h3>
            <p className="text-[14px] lg:text-[15px] font-light text-[#666666] mb-6 max-w-[480px] mx-auto">
              {t('privacyPolicy.contact.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="mailto:privacy@shanloray.ru">
                <button className="flex items-center gap-2 h-[48px] px-6 bg-[#8B7355] text-white text-[14px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">
                  <IoMailOutline className="w-[18px] h-[18px]" />
                  {t('privacyPolicy.contact.emailButton')}
                </button>
              </a>
              <Link to="/privacy-settings">
                <button className="flex items-center gap-2 h-[48px] px-6 bg-white border border-[#8B7355] text-[#8B7355] text-[14px] font-medium rounded-[8px] hover:bg-[#F5F1EA] transition-colors">
                  {t('privacyPolicy.contact.manageButton')}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 w-12 h-12 bg-gradient-to-br from-[#C9A870] to-[#8B7355] rounded-full flex items-center justify-center shadow-[0_4px_16px_rgba(139,115,85,0.4)] z-50 transition-all duration-300"
        >
          <IoArrowUp className="w-5 h-5 text-white" />
        </button>
      )}
    </div>
  )
}