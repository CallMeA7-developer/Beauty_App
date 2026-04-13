import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { IoChevronDown, IoShieldCheckmarkOutline, IoLockClosedOutline, IoPersonOutline, IoGlobeOutline, IoMailOutline, IoCallOutline } from 'react-icons/io5'

export default function PrivacyPolicy() {
  const { t, i18n } = useTranslation()

  const sections = t('privacyPolicy.sections', { returnObjects: true })

  const [openSections, setOpenSections] = useState({})

  const toggle = (index) => {
    setOpenSections(prev => ({ ...prev, [index]: !prev[index] }))
  }

  return (
    <div key={i18n.language} className="bg-[#FDFBF7] font-['Cormorant_Garamond'] min-h-screen">

      {/* Hero */}
      <div className="bg-gradient-to-b from-[#F5F1EA] to-[#FDFBF7] px-4 md:px-[60px] lg:px-[120px] py-12 md:py-16 lg:py-[80px] text-center">
        <div className="w-[64px] h-[64px] bg-[#8B7355] rounded-full flex items-center justify-center mx-auto mb-6">
          <IoShieldCheckmarkOutline className="w-[32px] h-[32px] text-white" />
        </div>

        <p className="text-[12px] italic text-[#8B7355] tracking-[2px] mb-3">
          {t('privacyPolicy.legal')}
        </p>

        <h1 className="text-[36px] md:text-[48px] lg:text-[64px] font-bold text-[#1A1A1A] mb-4">
          {t('privacyPolicy.title')}
        </h1>

        <p className="text-[15px] text-[#666666] max-w-[600px] mx-auto mb-4">
          {t('privacyPolicy.subtitle')}
        </p>

        <p className="text-[13px] text-[#999999]">
          {t('privacyPolicy.lastUpdated')}
        </p>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white px-4 md:px-[60px] lg:px-[120px] flex items-center border-b border-[#E8E3D9] h-[48px]">
        <Link to="/"><span className="text-[#8B7355]">{t('privacyPolicy.breadcrumb.home')}</span></Link>
        <span className="mx-2">/</span>
        <Link to="/privacy-settings"><span className="text-[#8B7355]">{t('privacyPolicy.breadcrumb.account')}</span></Link>
        <span className="mx-2">/</span>
        <span>{t('privacyPolicy.breadcrumb.policy')}</span>
      </div>

      {/* Content */}
      <div className="px-4 md:px-[60px] lg:px-[120px] py-10">
        <div className="max-w-[860px] mx-auto">

          {/* Intro */}
          <div className="bg-white rounded-[16px] border p-6 mb-8">
            <p className="text-[#666]">
              {t('privacyPolicy.intro1_part1')}
              <span className="font-semibold text-[#8B7355]">Shan Loray</span>
              {t('privacyPolicy.intro1_part2')}
            </p>

            <p className="text-[#666] mt-4">
              {t('privacyPolicy.intro2')}
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-4 mb-12">
            {sections.map((section, i) => (
              <div key={i} className="bg-white rounded-[12px] border overflow-hidden">

                <button onClick={() => toggle(i)} className="w-full flex justify-between px-6 py-5">
                  <span className="font-semibold">{section.title}</span>
                  <IoChevronDown className={`${openSections[i] ? 'rotate-180' : ''}`} />
                </button>

                {openSections[i] && (
                  <div className="px-6 pb-5">
                    {section.content.map((item, idx) => (
                      <div key={idx} className="mb-4">
                        <h4 className="font-semibold mb-1">{item.subtitle}</h4>
                        <p className="text-[#666]">{item.text}</p>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="bg-[#F5F1EA] rounded-[16px] p-6 text-center">
            <h3 className="text-[22px] font-semibold mb-2">
              {t('privacyPolicy.contactTitle')}
            </h3>

            <p className="text-[#666] mb-6">
              {t('privacyPolicy.contactDesc')}
            </p>

            <a href="mailto:privacy@shanloray.ru">
              <button className="bg-[#8B7355] text-white px-6 py-3 flex items-center gap-2 mx-auto">
                <IoMailOutline />
                {t('privacyPolicy.contactButton')}
              </button>
            </a>
          </div>

        </div>
      </div>
    </div>
  )
}