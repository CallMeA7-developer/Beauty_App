import { Link } from 'react-router-dom'
import { IoLogoInstagram, IoLogoFacebook, IoLogoPinterest, IoLogoYoutube } from 'react-icons/io5'

export default function Footer() {
  const shopLinks = [
    { label: 'Skincare',     path: '/skincare' },
    { label: 'Makeup',       path: '/makeup' },
    { label: 'Fragrance',    path: '/fragrance' },
    { label: 'Tools',        path: '/technology' },
    { label: 'Gift Sets',    path: '/collections' },
    { label: 'New Arrivals', path: '/collections' },
  ]

  const supportLinks = [
    { label: 'Contact Us',  path: '/search' },
    { label: 'Shipping',    path: '/dashboard' },
    { label: 'Returns',     path: '/dashboard' },
    { label: 'FAQs',        path: '/search' },
    { label: 'Track Order', path: '/order-tracking' },
    { label: 'Size Guide',  path: '/collections' },
  ]

  return (
    <footer className="w-full bg-[#2B2B2B] px-[120px] py-[112px] font-['Cormorant_Garamond']">
      <div className="grid grid-cols-4 gap-[64px] mb-[72px]">

        {/* Brand */}
        <div>
          <Link to="/">
            <h3 className="text-[24px] font-semibold text-white tracking-[3px] mb-5 hover:text-[#C9A870] transition-colors cursor-pointer">
              SHAN LORAY
            </h3>
          </Link>
          <p className="text-[16px] font-light italic text-[#C4B5A0] mb-6">Timeless Luxury Beauty</p>
          <p className="text-[15px] font-normal text-[#A0A0A0] leading-[1.75]">
            Crafting exceptional beauty experiences through the perfect union of science and nature.
          </p>
        </div>

        {/* Shop */}
        <div>
          <h4 className="text-[17px] font-medium text-white mb-6">Shop</h4>
          <div className="flex flex-col gap-5">
            {shopLinks.map((link) => (
              <Link key={link.label} to={link.path}>
                <span className="text-[15px] font-normal text-[#C4B5A0] cursor-pointer hover:text-white transition-colors">
                  {link.label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-[17px] font-medium text-white mb-6">Support</h4>
          <div className="flex flex-col gap-5">
            {supportLinks.map((link) => (
              <Link key={link.label} to={link.path}>
                <span className="text-[15px] font-normal text-[#C4B5A0] cursor-pointer hover:text-white transition-colors">
                  {link.label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Newsletter + Social */}
        <div>
          <h4 className="text-[17px] font-medium text-white mb-6">Stay Connected</h4>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full h-[56px] px-5 bg-white text-[15px] font-normal text-[#2B2B2B] rounded-[4px] mb-4 outline-none"
          />
          <button className="w-full h-[56px] bg-[#8B7355] text-white text-[15px] font-medium rounded-[4px] mb-8 hover:bg-[#7a6448] transition-colors">
            Subscribe
          </button>
          <div className="flex gap-8">
            <a href="https://instagram.com/shanloray" target="_blank" rel="noopener noreferrer">
              <IoLogoInstagram className="w-[32px] h-[32px] text-[#C4B5A0] cursor-pointer hover:text-white transition-colors" />
            </a>
            <a href="https://facebook.com/shanloray" target="_blank" rel="noopener noreferrer">
              <IoLogoFacebook className="w-[32px] h-[32px] text-[#C4B5A0] cursor-pointer hover:text-white transition-colors" />
            </a>
            <a href="https://pinterest.com/shanloray" target="_blank" rel="noopener noreferrer">
              <IoLogoPinterest className="w-[32px] h-[32px] text-[#C4B5A0] cursor-pointer hover:text-white transition-colors" />
            </a>
            <a href="https://youtube.com/shanloray" target="_blank" rel="noopener noreferrer">
              <IoLogoYoutube className="w-[32px] h-[32px] text-[#C4B5A0] cursor-pointer hover:text-white transition-colors" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#3D3D3D] pt-8 flex justify-between items-center">
        <p className="text-[14px] font-normal text-[#808080]">© 2024 Shan Loray. All rights reserved.</p>
        <div className="flex gap-10">
          <Link to="/privacy-settings">
            <span className="text-[14px] font-normal text-[#808080] cursor-pointer hover:text-white transition-colors">Privacy Policy</span>
          </Link>
          <Link to="/privacy-settings">
            <span className="text-[14px] font-normal text-[#808080] cursor-pointer hover:text-white transition-colors">Terms of Service</span>
          </Link>
          <Link to="/privacy-settings">
            <span className="text-[14px] font-normal text-[#808080] cursor-pointer hover:text-white transition-colors">Cookie Policy</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}
