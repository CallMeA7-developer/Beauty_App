import { Link, useLocation } from 'react-router-dom'
import { IoSearchOutline, IoPersonOutline, IoHeartOutline, IoBagOutline } from 'react-icons/io5'

export default function Navbar() {
  const location = useLocation()

  const navLinks = [
    { label: 'Collections', path: '/collections' },
    { label: 'Skincare', path: '/skincare' },
    { label: 'Makeup', path: '/makeup' },
    { label: 'Fragrance', path: '/fragrance' },
    { label: 'Technology', path: '/technology' },
    { label: 'Journal', path: '/journal' },
  ]

  return (
    <header className="min-h-[80px] bg-white border-b border-[#E8E3D9] flex items-center justify-between px-[120px]">
      {/* Logo */}
      <Link to="/">
        <div className="font-semibold text-[32px] text-[#1A1A1A] tracking-[3px] font-['Cormorant_Garamond']">
          SHAN LORAY
        </div>
      </Link>

      {/* Nav Links */}
      <nav className="flex items-center gap-[48px]">
        {navLinks.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <Link key={item.label} to={item.path} className="relative">
              <span
                className={`text-[16px] font-['Cormorant_Garamond'] cursor-pointer transition-all duration-300 ${
                  isActive
                    ? 'font-semibold text-[#C9A870]'
                    : 'font-normal text-[#3D3D3D] hover:text-[#1A1A1A]'
                }`}
              >
                {item.label}
              </span>
              {isActive && (
                <div className="absolute left-1/2 -translate-x-1/2 w-[40px] h-[2px] bg-[#C9A870] rounded-full mt-1" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Right Icons */}
      <div className="flex items-center gap-[28px]">
        <span className="text-[14px] font-light text-[#3D3D3D] font-['Cormorant_Garamond']">EN / RU</span>
        <div className="w-[1px] h-4 bg-[#E8E3D9]" />
        <Link to="/search">
          <IoSearchOutline className="w-[24px] h-[24px] text-[#2B2B2B] cursor-pointer hover:text-[#C9A870] transition-colors" />
        </Link>
        <Link to="/account">
          <IoPersonOutline className="w-[24px] h-[24px] text-[#2B2B2B] cursor-pointer hover:text-[#C9A870] transition-colors" />
        </Link>
        <Link to="/wishlist">
          <IoHeartOutline className="w-[24px] h-[24px] text-[#2B2B2B] cursor-pointer hover:text-[#C9A870] transition-colors" />
        </Link>
        <Link to="/cart">
          <IoBagOutline className="w-[24px] h-[24px] text-[#2B2B2B] cursor-pointer hover:text-[#C9A870] transition-colors" />
        </Link>
      </div>
    </header>
  )
}