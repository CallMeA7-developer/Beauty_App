import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { IoLogoInstagram, IoLogoFacebook, IoLogoPinterest, IoLogoYoutube } from 'react-icons/io5'

const socialLinks = [
  { icon: IoLogoInstagram, href: 'https://instagram.com/shanloray' },
  { icon: IoLogoFacebook,  href: 'https://facebook.com/shanloray' },
  { icon: IoLogoPinterest, href: 'https://pinterest.com/shanloray' },
  { icon: IoLogoYoutube,   href: 'https://youtube.com/shanloray' },
]

// ─── Mobile Footer ────────────────────────────────────────────────────────────
function FooterMobile() {
  const { t } = useTranslation()

  const shopLinks = [
    { label: t('footer.skincare'),    path: '/skincare' },
    { label: t('footer.makeup'),      path: '/makeup' },
    { label: t('footer.fragrance'),   path: '/fragrance' },
    { label: t('footer.tools'),       path: '/technology' },
    { label: t('footer.giftSets'),    path: '/collections' },
    { label: t('footer.newArrivals'), path: '/collections' },
  ]

  const supportLinks = [
    { label: t('footer.contactUs'),  path: '/faq' },
    { label: t('footer.shipping'),   path: '/delivery-methods' },
    { label: t('footer.returns'),    path: '/faq' },
    { label: t('footer.faqs'),       path: '/faq' },
    { label: t('footer.trackOrder'), path: '/order-tracking' },
    { label: t('footer.sizeGuide'),  path: '/advanced-formulations' },
  ]

  return (
    <footer className="w-full bg-[#2B2B2B] px-6 pt-10 pb-8 font-['Cormorant_Garamond']">

      {/* Brand */}
      <div className="mb-8">
        <Link to="/">
          <h3 className="text-[22px] font-semibold text-white tracking-[3px] mb-3">SHAN LORAY</h3>
        </Link>
        <p className="text-[15px] font-light italic text-[#C4B5A0] mb-3">{t('footer.tagline')}</p>
        <p className="text-[14px] font-normal text-[#A0A0A0] leading-[1.75]">{t('footer.description')}</p>
      </div>

      <div className="border-t border-[#3D3D3D] mb-8" />

      {/* Shop */}
      <div className="mb-8">
        <h4 className="text-[16px] font-medium text-white mb-4">{t('footer.shop')}</h4>
        <div className="flex flex-col gap-4">
          {shopLinks.map((link) => (
            <Link key={link.label} to={link.path}>
              <span className="text-[15px] font-normal text-[#C4B5A0]">{link.label}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="border-t border-[#3D3D3D] mb-8" />

      {/* Support */}
      <div className="mb-8">
        <h4 className="text-[16px] font-medium text-white mb-4">{t('footer.support')}</h4>
        <div className="flex flex-col gap-4">
          {supportLinks.map((link) => (
            <Link key={link.label} to={link.path}>
              <span className="text-[15px] font-normal text-[#C4B5A0]">{link.label}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="border-t border-[#3D3D3D] mb-8" />

      {/* Stay Connected */}
      <div className="mb-8">
        <h4 className="text-[16px] font-medium text-white mb-5">{t('footer.stayConnected')}</h4>
        <input
          type="email"
          placeholder={t('footer.emailPlaceholder')}
          className="w-full h-[52px] px-4 bg-white text-[14px] font-normal text-[#2B2B2B] rounded-[4px] mb-3 outline-none"
        />
        <button className="w-full h-[52px] bg-[#8B7355] text-white text-[15px] font-medium rounded-[4px] mb-7 hover:bg-[#7a6448] transition-colors">
          {t('footer.subscribe')}
        </button>
        <div className="flex gap-7">
          {socialLinks.map(({ icon: Icon, href }) => (
            <a key={href} href={href} target="_blank" rel="noopener noreferrer">
              <Icon className="w-[28px] h-[28px] text-[#C4B5A0]" />
            </a>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#3D3D3D] pt-6 flex flex-col items-center gap-3">
        <p className="text-[13px] font-normal text-[#808080] text-center">{t('footer.copyright')}</p>
        <Link to="/privacy-policy">
          <span className="text-[13px] font-normal text-[#808080]">{t('footer.privacyPolicy')}</span>
        </Link>
        <Link to="/terms-conditions">
          <span className="text-[13px] font-normal text-[#808080]">{t('footer.termsOfService')}</span>
        </Link>
        <Link to="/privacy-settings">
          <span className="text-[13px] font-normal text-[#808080]">{t('footer.cookiePolicy')}</span>
        </Link>
      </div>

    </footer>
  )
}

// ─── Desktop Footer ───────────────────────────────────────────────────────────
function FooterDesktop() {
  const { t } = useTranslation()

  const shopLinks = [
    { label: t('footer.skincare'),    path: '/skincare' },
    { label: t('footer.makeup'),      path: '/makeup' },
    { label: t('footer.fragrance'),   path: '/fragrance' },
    { label: t('footer.tools'),       path: '/technology' },
    { label: t('footer.giftSets'),    path: '/collections' },
    { label: t('footer.newArrivals'), path: '/collections' },
  ]

  const supportLinks = [
    { label: t('footer.contactUs'),  path: '/faq' },
    { label: t('footer.shipping'),   path: '/delivery-methods' },
    { label: t('footer.returns'),    path: '/faq' },
    { label: t('footer.faqs'),       path: '/faq' },
    { label: t('footer.trackOrder'), path: '/order-tracking' },
    { label: t('footer.sizeGuide'),  path: '/advanced-formulations' },
  ]

  return (
    <footer className="w-full bg-[#2B2B2B] px-6 md:px-[60px] lg:px-[120px] py-14 md:py-20 lg:py-[112px] font-['Cormorant_Garamond']">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-10 lg:gap-[64px] mb-12 md:mb-16 lg:mb-[72px]">

        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <Link to="/">
            <h3 className="text-[20px] md:text-[22px] lg:text-[24px] font-semibold text-white tracking-[3px] mb-4 lg:mb-5 hover:text-[#C9A870] transition-colors cursor-pointer">
              SHAN LORAY
            </h3>
          </Link>
          <p className="text-[14px] md:text-[15px] lg:text-[16px] font-light italic text-[#C4B5A0] mb-4 lg:mb-6">{t('footer.tagline')}</p>
          <p className="text-[13px] md:text-[14px] lg:text-[15px] font-normal text-[#A0A0A0] leading-[1.75]">{t('footer.description')}</p>
        </div>

        {/* Shop */}
        <div>
          <h4 className="text-[15px] md:text-[16px] lg:text-[17px] font-medium text-white mb-4 lg:mb-6">{t('footer.shop')}</h4>
          <div className="flex flex-col gap-4 lg:gap-5">
            {shopLinks.map((link) => (
              <Link key={link.label} to={link.path}>
                <span className="text-[13px] md:text-[14px] lg:text-[15px] font-normal text-[#C4B5A0] cursor-pointer hover:text-white transition-colors">
                  {link.label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-[15px] md:text-[16px] lg:text-[17px] font-medium text-white mb-4 lg:mb-6">{t('footer.support')}</h4>
          <div className="flex flex-col gap-4 lg:gap-5">
            {supportLinks.map((link) => (
              <Link key={link.label} to={link.path}>
                <span className="text-[13px] md:text-[14px] lg:text-[15px] font-normal text-[#C4B5A0] cursor-pointer hover:text-white transition-colors">
                  {link.label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Newsletter + Social */}
        <div className="col-span-2 md:col-span-1">
          <h4 className="text-[15px] md:text-[16px] lg:text-[17px] font-medium text-white mb-4 lg:mb-6">{t('footer.stayConnected')}</h4>
          <input
            type="email"
            placeholder={t('footer.emailPlaceholder')}
            className="w-full h-[48px] md:h-[52px] lg:h-[56px] px-5 bg-white text-[14px] lg:text-[15px] font-normal text-[#2B2B2B] rounded-[4px] mb-3 lg:mb-4 outline-none"
          />
          <button className="w-full h-[48px] md:h-[52px] lg:h-[56px] bg-[#8B7355] text-white text-[14px] lg:text-[15px] font-medium rounded-[4px] mb-6 lg:mb-8 hover:bg-[#7a6448] transition-colors">
            {t('footer.subscribe')}
          </button>
          <div className="flex gap-6 md:gap-5 lg:gap-8">
            {socialLinks.map(({ icon: Icon, href }) => (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer">
                <Icon className="w-[26px] h-[26px] md:w-[28px] md:h-[28px] lg:w-[32px] lg:h-[32px] text-[#C4B5A0] cursor-pointer hover:text-white transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#3D3D3D] pt-6 lg:pt-8 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-0">
        <p className="text-[12px] md:text-[13px] lg:text-[14px] font-normal text-[#808080]">{t('footer.copyright')}</p>
        <div className="flex gap-6 md:gap-8 lg:gap-10">
          <Link to="/privacy-policy">
            <span className="text-[12px] md:text-[13px] lg:text-[14px] font-normal text-[#808080] cursor-pointer hover:text-white transition-colors">{t('footer.privacyPolicy')}</span>
          </Link>
          <Link to="/terms-conditions">
            <span className="text-[12px] md:text-[13px] lg:text-[14px] font-normal text-[#808080] cursor-pointer hover:text-white transition-colors">{t('footer.termsOfService')}</span>
          </Link>
          <Link to="/privacy-settings">
            <span className="text-[12px] md:text-[13px] lg:text-[14px] font-normal text-[#808080] cursor-pointer hover:text-white transition-colors">{t('footer.cookiePolicy')}</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}

// ─── Main Footer ──────────────────────────────────────────────────────────────
export default function Footer() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return isMobile ? <FooterMobile /> : <FooterDesktop />
}