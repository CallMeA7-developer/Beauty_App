import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  IoChevronDown,
  IoShieldCheckmarkOutline,
  IoLockClosedOutline,
  IoPersonOutline,
  IoGlobeOutline,
  IoMailOutline
} from 'react-icons/io5'

export default function PrivacyPolicy() {
  const { t, i18n } = useTranslation()
  const [openSections, setOpenSections] = useState({})

  const toggle = (index) => {
    setOpenSections(prev => ({ ...prev, [index]: !prev[index] }))
  }

  const sections = [
    'collect',
    'use',
    'security',
    'sharing',
    'rights',
    'cookies'
  ]

  return (
    <div key={i18n.language} className="bg-[#FDFBF7] font-['Cormorant_Garamond'] min-h-screen">

      {/* Hero */}
      <div className="bg-gradient-to-b from-[#F5F1EA] to-[#FDFBF7] px-[120px] py-[80px] text-center">
        <IoShieldCheckmarkOutline className="mx-auto mb-6 text-white bg-[#8B7355] p-4 rounded-full text-[32px]" />

        <p className="text-[#8B7355] tracking-[2px] italic">
          {t('privacyPolicy.legal')}
        </p>

        <h1 className="text-[64px] font-bold">
          {t('privacyPolicy.title')}
        </h1>

        <p className="text-[#666] max-w-[600px] mx-auto mt-4">
          {t('privacyPolicy.subtitle')}
        </p>

        <p className="text-[#999] mt-2">
          {t('privacyPolicy.lastUpdated')}
        </p>
      </div>

      {/* Breadcrumb */}
      <div className="px-[120px] py-4 border-b">
        <Link to="/">{t('privacyPolicy.breadcrumb.home')}</Link> /
        <Link to="/privacy-settings">{t('privacyPolicy.breadcrumb.account')}</Link> /
        {t('privacyPolicy.breadcrumb.policy')}
      </div>

      {/* Content */}
      <div className="px-[120px] py-[60px] max-w-[860px] mx-auto">

        {/* Intro */}
        <p className="mb-4">{t('privacyPolicy.intro1')}</p>
        <p className="mb-8">{t('privacyPolicy.intro2')}</p>

        {/* Sections */}
        {sections.map((key, index) => (
          <div key={index} className="border rounded mb-4">
            <button onClick={() => toggle(index)} className="w-full flex justify-between p-5">
              {t(`privacyPolicy.sections.${key}.title`)}
              <IoChevronDown className={openSections[index] ? 'rotate-180' : ''} />
            </button>

            {openSections[index] && (
              <div className="p-5 space-y-4">
                {t(`privacyPolicy.sections.${key}.items`, { returnObjects: true }).map((item, i) => (
                  <div key={i}>
                    <h4 className="font-semibold">{item.subtitle}</h4>
                    <p>{item.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Contact */}
        <div className="mt-10 text-center">
          <h3>{t('privacyPolicy.contactTitle')}</h3>
          <p>{t('privacyPolicy.contactDesc')}</p>

          <a href="mailto:privacy@shanloray.ru">
            <button className="mt-4 bg-[#8B7355] text-white px-6 py-3 flex gap-2 items-center mx-auto">
              <IoMailOutline />
              {t('privacyPolicy.contactButton')}
            </button>
          </a>
        </div>

      </div>
    </div>
  )
}