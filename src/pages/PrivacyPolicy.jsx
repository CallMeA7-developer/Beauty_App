import { useState } from 'react'
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
} from 'react-icons/io5'

const SECTION_ICONS = {
  collect: IoPersonOutline,
  use: IoShieldCheckmarkOutline,
  security: IoLockClosedOutline,
  sharing: IoGlobeOutline,
  rights: IoShieldCheckmarkOutline,
  cookies: IoGlobeOutline,
}

export default function PrivacyPolicy() {
  const { t, i18n } = useTranslation()
  const [openSections, setOpenSections] = useState({})

  const toggle = (index) => {
    setOpenSections((prev) => ({ ...prev, [index]: !prev[index] }))
  }

  const sections = [
    {
      key: 'collect',
      icon: SECTION_ICONS.collect,
      content: t('privacyPolicy.sections.collect.content', { returnObjects: true }),
    },
    {
      key: 'use',
      icon: SECTION_ICONS.use,
      content: t('privacyPolicy.sections.use.content', { returnObjects: true }),
    },
    {
      key: 'security',
      icon: SECTION_ICONS.security,
      content: t('privacyPolicy.sections.security.content', { returnObjects: true }),
    },
    {
      key: 'sharing',
      icon: SECTION_ICONS.sharing,
      content: t('privacyPolicy.sections.sharing.content', { returnObjects: true }),
    },
    {
      key: 'rights',
      icon: SECTION_ICONS.rights,
      content: t('privacyPolicy.sections.rights.content', { returnObjects: true }),
    },
    {
      key: 'cookies',
      icon: SECTION_ICONS.cookies,
      content: t('privacyPolicy.sections.cookies.content', { returnObjects: true }),
    },
  ]

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
              {t('privacyPolicy.intro.paragraph1.prefix')}{' '}
              <span className="font-semibold text-[#8B7355]">
                {t('privacyPolicy.intro.paragraph1.brand')}
              </span>
              , {t('privacyPolicy.intro.paragraph1.suffix')}
            </p>
            <p className="text-[15px] lg:text-[16px] font-normal text-[#666666] leading-relaxed mt-4">
              {t('privacyPolicy.intro.paragraph2')}
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-4 mb-12">
            {sections.map((section, sIndex) => (
              <div
                key={section.key}
                className="bg-white rounded-[12px] border border-[#E8E3D9] overflow-hidden"
              >
                <button
                  onClick={() => toggle(sIndex)}
                  className="w-full flex items-center justify-between px-5 lg:px-6 py-5 text-left hover:bg-[#FDFBF7] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-[36px] h-[36px] bg-[#F5F1EA] rounded-full flex items-center justify-center flex-shrink-0">
                      <section.icon className="w-[18px] h-[18px] text-[#8B7355]" />
                    </div>
                    <span className="text-[16px] lg:text-[18px] font-semibold text-[#1A1A1A]">
                      {t(`privacyPolicy.sections.${section.key}.title`)}
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
    </div>
  )
}