import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  IoMenuOutline,
  IoCloseOutline,
  IoSearchOutline,
  IoPersonOutline,
  IoHeartOutline,
  IoBagOutline,
} from 'react-icons/io5'

const navLinks = [
  { label: 'Collections', path: '/collections' },
  { label: 'Skincare',    path: '/skincare' },
  { label: 'Makeup',      path: '/makeup' },
  { label: 'Fragrance',   path: '/fragrance' },
  { label: 'Technology',  path: '/technology' },
  { label: 'Journal',     path: '/journal' },
]

// ─── Mobile Drawer ────────────────────────────────────────────────────────────
function MobileDrawer({ isOpen, onClose }) {
  const location = useLocation()

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 left-0 h-full w-[75vw] max-w-[300px] bg-[#FDFBF7] z-50 flex flex-col transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>

        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E8E3D9]">
          <span className="font-['Cormorant_Garamond'] text-[22px] font-semibold tracking-[2px] text-[#1A1A1A]">
            SHAN LORAY
          </span>
          <button onClick={onClose}>
            <IoCloseOutline className="w-[26px] h-[26px] text-[#1A1A1A]" />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col px-6 pt-6 gap-1">
          {navLinks.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.label}
                to={item.path}
                onClick={onClose}
                className={`py-3 text-[18px] font-['Cormorant_Garamond'] border-b border-[#E8E3D9] transition-colors duration-200 ${
                  isActive ? 'text-[#C9A870] font-semibold' : 'text-[#3D3D3D]'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Language */}
        <div className="mt-auto px-6 pb-8">
          <span className="text-[13px] font-light text-[#666666] font-['Cormorant_Garamond'] tracking-widest">
            EN / RU
          </span>
        </div>
      </div>
    </>
  )
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────
export default function Navbar() {
  const location = useLocation()
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // ── Mobile ───────────────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <>
        <header className="h-[60px] bg-white border-b border-[#E8E3D9] flex items-center justify-between px-4 sticky top-0 z-40">

          {/* Hamburger */}
          <button onClick={() => setDrawerOpen(true)} className="p-1">
            <IoMenuOutline className="w-[26px] h-[26px] text-[#1A1A1A]" />
          </button>

          {/* Logo */}
          <Link to="/">
            <span className="font-['Cormorant_Garamond'] text-[20px] font-semibold tracking-[3px] text-[#1A1A1A]">
              SHAN LORAY
            </span>
          </Link>

          {/* Icons */}
          <div className="flex items-center gap-[16px]">
            <Link to="/search">
              <IoSearchOutline className="w-[22px] h-[22px] text-[#2B2B2B]" />
            </Link>
            <Link to="/account">
              <IoPersonOutline className="w-[22px] h-[22px] text-[#2B2B2B]" />
            </Link>
            <Link to="/wishlist">
              <IoHeartOutline className="w-[22px] h-[22px] text-[#2B2B2B]" />
            </Link>
            <Link to="/cart">
              <IoBagOutline className="w-[22px] h-[22px] text-[#2B2B2B]" />
            </Link>
          </div>
        </header>

        <MobileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
      </>
    )
  }

  // ── Desktop ──────────────────────────────────────────────────────────────────
  return (
    <header className="min-h-[80px] bg-white border-b border-[#E8E3D9] flex items-center justify-between px-[120px] sticky top-0 z-50">

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
              <span className={`text-[16px] font-['Cormorant_Garamond'] cursor-pointer transition-all duration-300 ${
                isActive
                  ? 'font-semibold text-[#C9A870]'
                  : 'font-normal text-[#3D3D3D] hover:text-[#1A1A1A]'
              }`}>
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