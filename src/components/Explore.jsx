import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  IoClose,
  IoSearchOutline,
  IoSparklesOutline,
  IoScanOutline,
  IoLeafOutline,
  IoColorPaletteOutline,
  IoFlaskOutline,
  IoWaterOutline,
  IoDiamondOutline,
} from 'react-icons/io5'

export default function Explore() {
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState('')

  const categories = [
    { name: 'Skincare', icon: IoLeafOutline, color: '#688B8D', path: '/skincare' },
    { name: 'Makeup', icon: IoColorPaletteOutline, color: '#D4AFA3', path: '/makeup' },
    { name: 'Fragrance', icon: IoFlaskOutline, color: '#C9A870', path: '/fragrance' },
    { name: 'Body Care', icon: IoWaterOutline, color: '#B8A99A', path: '/collections' },
    { name: 'Collections', icon: IoDiamondOutline, color: '#8B7355', path: '/collections' },
  ]

  const trendingItems = [
    { name: 'Luminous Youth Elixir', img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=100&h=100&fit=crop' },
    { name: 'Rose Lip Lacquer', img: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=100&h=100&fit=crop' },
    { name: 'Radiance Cream', img: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=100&h=100&fit=crop' },
  ]

  const popularSearches = ['Serums', 'Anti-aging', 'Moisturizers', 'Luxury Sets', 'New Arrivals', 'Best Sellers']

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchValue.trim()) {
      navigate('/search')
    }
  }

  return (
    <div className="min-h-screen bg-black/65 flex items-center justify-center font-['Cormorant_Garamond'] py-[40px]">

      {/* ── Main Panel ── */}
      <div className="w-[1200px] bg-white rounded-[16px] shadow-[0_16px_64px_rgba(0,0,0,0.15)] relative overflow-hidden">

        {/* Close Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-[32px] right-[32px] w-[48px] h-[48px] flex items-center justify-center cursor-pointer hover:bg-[#F5F1EA] rounded-full transition-colors z-10"
        >
          <IoClose className="w-[32px] h-[32px] text-[#2B2B2B]" />
        </button>

        {/* Header */}
        <div className="pt-[40px] pb-[32px] flex flex-col items-center border-b border-[#E8E3D9]">
          <h1 className="text-[42px] font-semibold text-[#1A1A1A] mb-[20px]">Explore Shan Loray</h1>
          <div className="w-[120px] h-[2px] bg-[#C9A870]" />
        </div>

        {/* 3-Column Grid */}
        <div className="px-[56px] py-[40px] pb-[112px]">
          <div className="grid grid-cols-3 gap-[32px]">

            {/* Col 1 — Categories */}
            <div>
              <h3 className="text-[20px] font-medium text-[#666666] mb-[16px]">Shop by Category</h3>
              <div className="flex flex-col gap-[8px]">
                {categories.map((category, idx) => (
                  <Link key={idx} to={category.path}>
                    <div className="flex items-center gap-[16px] px-[16px] py-[12px] rounded-[8px] cursor-pointer hover:bg-[#FDFBF7] transition-colors group">
                      <div className="w-[48px] h-[48px] rounded-full bg-[#FDFBF7] group-hover:bg-white flex items-center justify-center flex-shrink-0 transition-colors">
                        <category.icon
                          className="w-[24px] h-[24px] transition-transform group-hover:scale-110"
                          style={{ color: category.color }}
                        />
                      </div>
                      <span className="text-[18px] font-medium text-[#1A1A1A] group-hover:text-[#8B7355] transition-colors">
                        {category.name}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Col 2 — Featured */}
            <div>
              <h3 className="text-[20px] font-medium text-[#666666] mb-[16px]">Featured</h3>

              {/* Featured Image */}
              <div className="mb-[16px]">
                <div className="w-full h-[200px] rounded-[12px] overflow-hidden mb-[14px] group cursor-pointer">
                  <img
                    src="https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=360&h=240&fit=crop"
                    alt="Spring 2024 Collection"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h4 className="text-[18px] font-semibold text-[#1A1A1A] mb-[6px]">Spring 2024 Collection</h4>
                <p className="text-[15px] font-normal text-[#666666] mb-[12px]">Discover botanical elegance</p>
                <Link to="/collections">
                  <span className="text-[14px] font-medium text-[#8B7355] cursor-pointer hover:underline">View Collection →</span>
                </Link>
              </div>

              {/* Trending Now */}
              <div className="mt-[20px]">
                <h4 className="text-[16px] font-medium text-[#666666] mb-[12px]">Trending Now</h4>
                <div className="flex gap-[12px]">
                  {trendingItems.map((item, idx) => (
                    <div key={idx} className="flex-1 cursor-pointer group">
                      <div className="w-full aspect-square rounded-[8px] overflow-hidden mb-[8px]">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <p className="text-[13px] font-normal text-[#3D3D3D] leading-[1.4] group-hover:text-[#8B7355] transition-colors">
                        {item.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Col 3 — Search & Quick Links */}
            <div>
              {/* Search Bar */}
              <div className="bg-white border border-[#E8E3D9] rounded-[8px] flex items-center px-[16px] mb-[24px] h-[52px] focus-within:border-[#8B7355] transition-colors">
                <IoSearchOutline className="w-[20px] h-[20px] text-[#666666] mr-[12px] flex-shrink-0" />
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={handleSearch}
                  placeholder="Search products..."
                  className="flex-1 text-[15px] font-normal text-[#2B2B2B] bg-transparent outline-none placeholder:text-[#999999]"
                />
              </div>

              {/* Popular Searches */}
              <div className="mb-[24px]">
                <h4 className="text-[16px] font-medium text-[#666666] mb-[12px]">Popular Searches</h4>
                <div className="flex flex-wrap gap-[8px]">
                  {popularSearches.map((search, idx) => (
                    <Link key={idx} to="/search">
                      <div className="h-[36px] px-[16px] bg-[#FDFBF7] border border-[#E8E3D9] rounded-[18px] flex items-center cursor-pointer hover:bg-[#8B7355] hover:text-white hover:border-[#8B7355] transition-all">
                        <span className="text-[14px] font-normal text-[#3D3D3D] group-hover:text-white">{search}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="flex flex-col gap-[10px]">
                <Link to="/skin-analysis">
                  <div className="h-[52px] bg-[#FDFBF7] rounded-[8px] px-[16px] flex items-center gap-[14px] cursor-pointer hover:bg-[#F0EBE3] transition-colors group">
                    <IoSparklesOutline className="w-[20px] h-[20px] text-[#688B8D] flex-shrink-0" />
                    <span className="text-[15px] font-medium text-[#1A1A1A] group-hover:text-[#8B7355] transition-colors">AI Beauty Consultant</span>
                  </div>
                </Link>
                <Link to="/virtual-tryon">
                  <div className="h-[52px] bg-[#FDFBF7] rounded-[8px] px-[16px] flex items-center gap-[14px] cursor-pointer hover:bg-[#F0EBE3] transition-colors group">
                    <IoScanOutline className="w-[20px] h-[20px] text-[#D4AFA3] flex-shrink-0" />
                    <span className="text-[15px] font-medium text-[#1A1A1A] group-hover:text-[#8B7355] transition-colors">Virtual Try-On</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom Promo Banner ── */}
        <div className="absolute bottom-0 left-0 right-0 h-[80px] bg-gradient-to-r from-[#FDFBF7] to-[#F9F4EE] rounded-b-[16px] flex items-center justify-center border-t border-[#E8E3D9]">
          <span className="text-[17px] font-medium text-[#8B7355] mr-[12px]">New Members Get 15% Off First Order</span>
          <Link to="/account">
            <span className="text-[15px] font-semibold text-[#8B7355] underline cursor-pointer hover:text-[#7a6448] transition-colors">Join Now →</span>
          </Link>
        </div>

      </div>
    </div>
  )
}