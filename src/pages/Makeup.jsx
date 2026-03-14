import { IoStarSharp, IoChevronBack, IoChevronForward, IoHeartOutline, IoEyeOutline, IoChevronDown } from 'react-icons/io5'

export default function Makeup() {
  const faceCategories = ['Foundation', 'Concealer', 'Powder', 'Blush', 'Highlighter']
  const eyesCategories = ['Eyeshadow', 'Eyeliner', 'Mascara', 'Eyebrow']
  const lipsCategories = ['Lipstick', 'Lip Gloss', 'Lip Liner', 'Lip Care']
  const finishTypes = ['Matte', 'Satin', 'Shimmer', 'Glitter']
  const coverageTypes = ['Sheer', 'Medium', 'Full']
  const skinTones = ['Fair', 'Light', 'Medium', 'Tan', 'Deep', 'All Tones']

  const featuredProduct = {
    name: 'Luxe Velvet Lipstick Collection',
    description: 'Twelve signature shades in rich, long-lasting formula',
    price: '$245',
    reviews: 412,
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=560&h=560&fit=crop',
    badge: 'BESTSELLER',
  }

  const horizontalProducts = [
    { name: 'Luminous Foundation', description: 'Buildable coverage with 24-hour wear', price: '$78', reviews: 534, image: 'https://images.unsplash.com/photo-1625025403725-fb026f06ab3c?w=460&h=280&fit=crop', shades: ['#F5D4C4', '#E8C4B4', '#D4A894', '#C08874', '#A86854', '#8E5844'] },
    { name: 'Nude Eyeshadow Palette', description: 'Ten versatile shades for every look', price: '$145', reviews: 298, image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=460&h=280&fit=crop', badge: 'NEW' },
  ]

  const squareProducts = [
    { name: 'Silk Touch Concealer', description: 'Full coverage brightening formula', price: '$52', reviews: 621, image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop', shades: ['#FADCC4', '#E8C8B0', '#D4A890', '#B88868', '#9C6848', '#7E5438'] },
    { name: 'Radiant Blush Duo', description: 'Buildable color with luminous finish', price: '$68', reviews: 445, image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=300&h=300&fit=crop' },
    { name: 'Glow Highlighter', description: 'Multi-dimensional shimmer', price: '$58', reviews: 789, image: 'https://images.unsplash.com/photo-1515688594390-b649af70d282?w=300&h=300&fit=crop' },
  ]

  const rectangularProducts = [
    { name: 'Complete Makeup Artist Set', description: 'Professional collection with face, eyes, and lips essentials for flawless artistry', price: '$395', reviews: 203, image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=470&h=400&fit=crop', badge: 'LIMITED EDITION' },
    { name: 'Travel Glam Collection', description: 'Your complete makeup routine in luxurious travel-friendly sizes', price: '$185', reviews: 167, image: 'https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=470&h=400&fit=crop' },
  ]

  const Stars = () => [...Array(5)].map((_, i) => <IoStarSharp key={i} className="w-[15px] h-[15px] text-[#C9A870]" />)

  return (
    <div className="bg-white font-['Cormorant_Garamond']">

      {/* ── Hero Banner ── */}
      <div className="min-h-[480px] bg-gradient-to-b from-[#FDFBF7] to-[#F5F1EA] relative overflow-hidden flex items-center px-[120px]">
        <img
          src="https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=800&h=800&fit=crop"
          alt="Makeup decoration"
          className="absolute top-0 right-0 w-[500px] h-[480px] object-cover opacity-20"
        />
        <div className="w-[650px] relative z-10">
          <p className="text-[14px] font-light italic text-[#8B7355] tracking-[2px] mb-3">LUXURY MAKEUP COLLECTION</p>
          <h1 className="text-[80px] font-bold text-[#1A1A1A] leading-[1] mb-6">Color Meets Artistry</h1>
          <p className="text-[20px] font-normal text-[#666666] mb-8">From foundation to finishing touches, discover transformative makeup</p>
          <div className="w-[120px] h-[4px] bg-[#C9A870]" />
        </div>
        <div className="absolute right-[180px] top-1/2 -translate-y-1/2">
          <img
            src="https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=320&h=320&fit=crop"
            alt="Featured Makeup"
            className="w-[320px] h-[320px] object-cover rounded-[8px] shadow-[0_12px_48px_rgba(0,0,0,0.12)]"
          />
        </div>
      </div>

      {/* ── Breadcrumb ── */}
      <div className="min-h-[48px] bg-[#FDFBF7] px-[120px] flex items-center">
        <span className="text-[15px] font-normal text-[#8B7355] cursor-pointer">Home</span>
        <span className="text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[15px] font-normal text-[#8B7355] cursor-pointer">Shop</span>
        <span className="text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[15px] font-normal text-[#666666]">Makeup</span>
      </div>

      {/* ── Main Content ── */}
      <div className="px-[120px] py-[64px] flex gap-[48px]">

        {/* ── Sidebar Filters ── */}
        <div className="w-[280px] flex-shrink-0">
          <div className="bg-white border border-[#E8E3D9] rounded-[16px] shadow-[0_8px_32px_rgba(0,0,0,0.08)] p-[28px]">
            <h3 className="text-[18px] font-medium text-[#1A1A1A] mb-[24px]">REFINE SELECTION</h3>

            <div className="space-y-[12px] mb-[32px]">
              <div className="inline-flex items-center px-[20px] py-[10px] bg-[#8B7355] text-white text-[14px] font-medium rounded-full cursor-pointer">
                All Makeup
              </div>

              {/* Face */}
              <div>
                <div className="inline-flex items-center px-[20px] py-[10px] bg-[#F5F1EA] text-[#3D3D3D] text-[14px] font-medium rounded-full cursor-pointer gap-2">
                  <span>Face</span>
                  <IoChevronDown className="w-[14px] h-[14px]" />
                </div>
                <div className="ml-[24px] mt-[8px]">
                  {faceCategories.map((item) => (
                    <div key={item} className="inline-block px-[16px] py-[6px] bg-white border border-[#E8E3D9] text-[#666666] text-[13px] rounded-full cursor-pointer mr-2 mb-2">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Eyes */}
              <div>
                <div className="inline-flex items-center px-[20px] py-[10px] bg-[#F5F1EA] text-[#3D3D3D] text-[14px] font-medium rounded-full cursor-pointer gap-2">
                  <span>Eyes</span>
                  <IoChevronDown className="w-[14px] h-[14px]" />
                </div>
                <div className="ml-[24px] mt-[8px]">
                  {eyesCategories.map((item) => (
                    <div key={item} className="inline-block px-[16px] py-[6px] bg-white border border-[#E8E3D9] text-[#666666] text-[13px] rounded-full cursor-pointer mr-2 mb-2">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Lips */}
              <div>
                <div className="inline-flex items-center px-[20px] py-[10px] bg-[#F5F1EA] text-[#3D3D3D] text-[14px] font-medium rounded-full cursor-pointer gap-2">
                  <span>Lips</span>
                  <IoChevronDown className="w-[14px] h-[14px]" />
                </div>
                <div className="ml-[24px] mt-[8px]">
                  {lipsCategories.map((item) => (
                    <div key={item} className="inline-block px-[16px] py-[6px] bg-white border border-[#E8E3D9] text-[#666666] text-[13px] rounded-full cursor-pointer mr-2 mb-2">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="inline-flex items-center px-[20px] py-[10px] bg-[#F5F1EA] text-[#3D3D3D] text-[14px] font-medium rounded-full cursor-pointer gap-2">
                <span>Sets & Palettes</span>
                <IoChevronDown className="w-[14px] h-[14px]" />
              </div>
            </div>

            {/* Additional Filters */}
            <div className="border-t border-[#E8E3D9] pt-[24px] space-y-[20px]">
              {/* Price Range */}
              <div>
                <h4 className="text-[15px] font-medium text-[#1A1A1A] mb-[12px]">Price Range</h4>
                <div className="flex items-center gap-[8px]">
                  <input type="text" placeholder="$0" className="w-[100px] h-[36px] px-3 border border-[#E8E3D9] rounded-[6px] text-[14px] outline-none" />
                  <span className="text-[14px] text-[#666666]">—</span>
                  <input type="text" placeholder="$500" className="w-[100px] h-[36px] px-3 border border-[#E8E3D9] rounded-[6px] text-[14px] outline-none" />
                </div>
              </div>

              {/* Finish */}
              <div>
                <h4 className="text-[15px] font-medium text-[#1A1A1A] mb-[12px]">Finish</h4>
                <div className="space-y-[8px]">
                  {finishTypes.map((type) => (
                    <label key={type} className="flex items-center gap-[10px] cursor-pointer">
                      <div className="w-[16px] h-[16px] border-[2px] border-[#C9A870] rounded-[2px]" />
                      <span className="text-[14px] font-normal text-[#3D3D3D]">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Coverage */}
              <div>
                <h4 className="text-[15px] font-medium text-[#1A1A1A] mb-[12px]">Coverage</h4>
                <div className="space-y-[8px]">
                  {coverageTypes.map((type) => (
                    <label key={type} className="flex items-center gap-[10px] cursor-pointer">
                      <div className="w-[16px] h-[16px] border-[2px] border-[#C9A870] rounded-[2px]" />
                      <span className="text-[14px] font-normal text-[#3D3D3D]">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Skin Tone */}
              <div>
                <h4 className="text-[15px] font-medium text-[#1A1A1A] mb-[12px]">Skin Tone</h4>
                <div className="space-y-[8px]">
                  {skinTones.map((tone) => (
                    <label key={tone} className="flex items-center gap-[10px] cursor-pointer">
                      <div className="w-[16px] h-[16px] border-[2px] border-[#C9A870] rounded-[2px]" />
                      <span className="text-[14px] font-normal text-[#3D3D3D]">{tone}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button className="w-full h-[48px] bg-[#8B7355] text-white text-[15px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">
                Apply
              </button>
            </div>
          </div>
        </div>

        {/* ── Product Grid ── */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="min-h-[64px] flex items-center justify-between mb-[48px]">
            <span className="text-[15px] font-normal text-[#666666]">Showing 42 of 156 makeup products</span>
            <div className="flex items-center gap-[16px]">
              <span className="text-[15px] font-normal text-[#666666]">Sort by:</span>
              <button className="w-[240px] min-h-[48px] px-4 py-[14px] bg-white border border-[#E8E3D9] rounded-[8px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] flex items-center justify-between cursor-pointer hover:border-[#C9A870] transition-all">
                <span className="text-[15px] font-medium text-[#2B2B2B]">Best Selling</span>
                <IoChevronDown className="w-[18px] h-[18px] text-[#8B7355]" />
              </button>
            </div>
          </div>

          {/* Row 1: Large Featured + Two Stacked */}
          <div className="flex gap-[20px] mb-[64px]">
            <div className="w-[460px] h-[560px] bg-white rounded-[12px] overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)] group cursor-pointer hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] transition-all duration-300">
              <div className="relative w-full h-[380px]">
                <img src={featuredProduct.image} alt={featuredProduct.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-[20px] right-[20px] px-[16px] py-[8px] bg-[#C9A870] text-white text-[12px] font-medium rounded-full">
                  {featuredProduct.badge}
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-[180px] bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-[24px] text-white">
                  <p className="text-[17px] font-normal mb-2">{featuredProduct.description}</p>
                  <h3 className="text-[28px] font-medium mb-3">{featuredProduct.name}</h3>
                  <p className="text-[24px] font-semibold">{featuredProduct.price}</p>
                </div>
              </div>
              <div className="p-[24px]">
                <p className="text-[13px] font-light italic text-[#8B7355] tracking-[1.2px] mb-2">Shan Loray</p>
                <div className="flex items-center gap-[6px]">
                  <Stars />
                  <span className="text-[13px] font-normal text-[#999999] ml-1">({featuredProduct.reviews})</span>
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-[20px]">
              {horizontalProducts.map((product, idx) => (
                <div key={idx} className="w-full h-[270px] bg-white rounded-[12px] overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)] group cursor-pointer hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] transition-all duration-300 flex">
                  <div className="w-[280px] h-full relative overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    {product.badge && (
                      <div className="absolute top-[16px] right-[16px] px-[12px] py-[6px] bg-[#C9A870] text-white text-[11px] font-medium rounded-full">
                        {product.badge}
                      </div>
                    )}
                    <div className="absolute top-[16px] left-[16px] flex gap-[8px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
                        <IoHeartOutline className="w-[20px] h-[20px] text-[#2B2B2B]" />
                      </div>
                      <div className="w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
                        <IoEyeOutline className="w-[20px] h-[20px] text-[#2B2B2B]" />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 p-[24px] flex flex-col justify-center">
                    <p className="text-[13px] font-light italic text-[#8B7355] tracking-[1.2px] mb-2">Shan Loray</p>
                    <h4 className="text-[20px] font-medium text-[#2B2B2B] leading-[1.2] mb-2">{product.name}</h4>
                    <p className="text-[15px] font-normal text-[#999999] leading-[1.5] mb-2">{product.description}</p>
                    {product.shades && (
                      <div className="flex items-center gap-[6px] mb-3">
                        {product.shades.map((shade, i) => (
                          <div key={i} className="w-[16px] h-[16px] rounded-full border border-[#E8E3D9]" style={{ backgroundColor: shade }} />
                        ))}
                      </div>
                    )}
                    <p className="text-[19px] font-semibold text-[#1A1A1A] mb-3">{product.price}</p>
                    <div className="flex items-center gap-[6px]">
                      <Stars />
                      <span className="text-[13px] font-normal text-[#999999] ml-1">({product.reviews})</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Three Square Cards */}
          <div className="grid grid-cols-3 gap-[20px] mb-[64px]">
            {squareProducts.map((product, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="relative w-full aspect-square rounded-[12px] overflow-hidden mb-[16px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] transition-all duration-300">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-[16px] right-[16px] flex flex-col gap-[8px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
                      <IoHeartOutline className="w-[20px] h-[20px] text-[#2B2B2B]" />
                    </div>
                    <div className="w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
                      <IoEyeOutline className="w-[20px] h-[20px] text-[#2B2B2B]" />
                    </div>
                  </div>
                </div>
                <p className="text-[13px] font-light italic text-[#8B7355] tracking-[1.2px] mb-2">Shan Loray</p>
                <h4 className="text-[20px] font-medium text-[#2B2B2B] leading-[1.2] mb-2">{product.name}</h4>
                <p className="text-[15px] font-normal text-[#999999] leading-[1.5] mb-2">{product.description}</p>
                {product.shades && (
                  <div className="flex items-center gap-[6px] mb-2">
                    {product.shades.map((shade, i) => (
                      <div key={i} className="w-[16px] h-[16px] rounded-full border border-[#E8E3D9]" style={{ backgroundColor: shade }} />
                    ))}
                  </div>
                )}
                <p className="text-[19px] font-semibold text-[#1A1A1A] mb-2">{product.price}</p>
                <div className="flex items-center gap-[6px]">
                  <Stars />
                  <span className="text-[13px] font-normal text-[#999999] ml-1">({product.reviews})</span>
                </div>
              </div>
            ))}
          </div>

          {/* Row 3: Two Rectangular Cards */}
          <div className="grid grid-cols-2 gap-[20px] mb-[64px]">
            {rectangularProducts.map((product, idx) => (
              <div key={idx} className="w-full h-[400px] bg-white rounded-[12px] overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)] group cursor-pointer hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] transition-all duration-300">
                <div className="relative w-full h-[280px] overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {product.badge && (
                    <div className="absolute top-[20px] right-[20px] px-[16px] py-[8px] bg-[#C9A870] text-white text-[12px] font-medium rounded-full">
                      {product.badge}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-[56px] h-[56px] bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.2)]">
                      <IoEyeOutline className="w-[28px] h-[28px] text-[#2B2B2B]" />
                    </div>
                  </div>
                </div>
                <div className="p-[24px]">
                  <p className="text-[13px] font-light italic text-[#8B7355] tracking-[1.2px] mb-2">Shan Loray</p>
                  <h4 className="text-[22px] font-medium text-[#2B2B2B] leading-[1.2] mb-2">{product.name}</h4>
                  <p className="text-[15px] font-normal text-[#999999] leading-[1.5] mb-3">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-[22px] font-semibold text-[#1A1A1A]">{product.price}</p>
                    <div className="flex items-center gap-[6px]">
                      <Stars />
                      <span className="text-[13px] font-normal text-[#999999] ml-1">({product.reviews})</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div className="min-h-[140px] bg-[#F5F1EA] rounded-[16px] flex flex-col items-center justify-center px-[64px] mb-[96px]">
            <h3 className="text-[32px] font-medium text-[#1A1A1A] mb-2">Join Our Beauty Circle</h3>
            <p className="text-[16px] font-normal text-[#666666] mb-6">Get early access to new makeup launches</p>
            <div className="flex items-center gap-[12px]">
              <input type="email" placeholder="Enter your email" className="w-[360px] h-[56px] px-5 bg-white text-[15px] text-[#2B2B2B] rounded-[8px] border border-[#E8E3D9] outline-none" />
              <button className="h-[56px] px-[32px] bg-[#8B7355] text-white text-[15px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">
                Subscribe
              </button>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-[8px] mb-[96px]">
            <button className="w-[44px] h-[44px] border border-[#E8E3D9] rounded-[6px] flex items-center justify-center cursor-pointer hover:bg-[#F5F1EA] transition-colors">
              <IoChevronBack className="w-[20px] h-[20px] text-[#666666]" />
            </button>
            <button className="w-[44px] h-[44px] bg-[#8B7355] text-white text-[15px] font-medium rounded-[6px]">1</button>
            {[2, 3, 4].map((num) => (
              <button key={num} className="w-[44px] h-[44px] border border-[#E8E3D9] rounded-[6px] text-[15px] font-medium text-[#3D3D3D] cursor-pointer hover:border-[#8B7355] hover:text-[#8B7355] transition-colors">
                {num}
              </button>
            ))}
            <button className="w-[44px] h-[44px] border border-[#E8E3D9] rounded-[6px] flex items-center justify-center cursor-pointer hover:bg-[#F5F1EA] transition-colors">
              <IoChevronForward className="w-[20px] h-[20px] text-[#666666]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}