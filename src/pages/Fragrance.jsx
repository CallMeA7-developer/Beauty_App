import { IoStarSharp, IoChevronBack, IoChevronForward, IoHeartOutline, IoEyeOutline, IoChevronDown } from 'react-icons/io5'

export default function Fragrance() {
  const fragranceCategories = ['All Fragrances', 'Eau de Parfum', 'Eau de Toilette', 'Body Mist', 'Discovery Sets']
  const fragranceFamilies = ['Floral', 'Woody', 'Citrus', 'Oriental', 'Fresh', 'Spicy']
  const topNotes = ['Rose', 'Bergamot', 'Jasmine', 'Sandalwood', 'Vanilla', 'Oud']
  const intensityLevels = ['Light', 'Moderate', 'Strong']
  const sizes = ['30ml', '50ml', '100ml', 'Travel Size']

  const featuredProduct = {
    name: 'Signature Oud Collection',
    description: 'Luxurious blend of rare oud and precious florals',
    price: '$385',
    reviews: 412,
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=560&h=560&fit=crop',
    badge: 'SIGNATURE SCENT',
    concentration: 'EDP',
  }

  const horizontalProducts = [
    { name: 'Rose Noir Eau de Parfum', description: 'Deep rose with hints of amber and patchouli', price: '$245', reviews: 534, image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=460&h=280&fit=crop', notes: 'Rose, Amber, Patchouli', concentration: 'EDP', sizes: ['30ml', '50ml', '100ml'] },
    { name: 'Citrus Garden Eau de Toilette', description: 'Fresh bergamot, neroli, and white musk', price: '$165', reviews: 298, image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=460&h=280&fit=crop', notes: 'Bergamot, Neroli, White Musk', concentration: 'EDT', sizes: ['30ml', '50ml', '100ml'] },
  ]

  const squareProducts = [
    { name: 'Velvet Jasmine', family: 'Floral Oriental', price: '$195', reviews: 621, image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=300&h=300&fit=crop', concentration: 'EDP' },
    { name: 'Amber Woods', family: 'Woody Spicy', price: '$225', reviews: 445, image: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=300&h=300&fit=crop', concentration: 'EDP' },
    { name: 'White Lotus', family: 'Fresh Floral', price: '$185', reviews: 789, image: 'https://images.unsplash.com/photo-1587556930796-7a8ab4e96a17?w=300&h=300&fit=crop', concentration: 'EDT' },
  ]

  const rectangularProducts = [
    { name: 'Prestige Discovery Collection', description: 'Experience our six most iconic fragrances in luxurious travel sizes - perfect for exploring your signature scent', price: '$295', reviews: 203, image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=470&h=400&fit=crop', badge: 'LIMITED EDITION' },
    { name: 'Dual Essence Set', description: 'Day and night fragrances paired perfectly - fresh citrus for morning, warm amber for evening', price: '$385', reviews: 167, image: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=470&h=400&fit=crop' },
  ]

  const Stars = () => [...Array(5)].map((_, i) => <IoStarSharp key={i} className="w-[15px] h-[15px] text-[#C9A870]" />)

  return (
    <div className="bg-white font-['Cormorant_Garamond']">

      {/* ── Hero Banner ── */}
      <div className="min-h-[480px] bg-gradient-to-b from-[#FDFBF7] to-[#F5F1EA] relative overflow-hidden flex items-center px-[120px]">
        <img
          src="https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=800&h=800&fit=crop"
          alt="Fragrance decoration"
          className="absolute top-0 right-0 w-[500px] h-[480px] object-cover opacity-15"
        />
        <div className="w-[650px] relative z-10">
          <p className="text-[14px] font-light italic text-[#8B7355] tracking-[2px] mb-3">SIGNATURE FRAGRANCES</p>
          <h1 className="text-[80px] font-bold text-[#1A1A1A] leading-[1] mb-6">Scent Stories</h1>
          <p className="text-[20px] font-normal text-[#666666] mb-8">Discover captivating fragrances crafted with rare botanicals</p>
          <div className="w-[140px] h-[4px] bg-[#C9A870]" />
        </div>
        <div className="absolute right-[180px] top-1/2 -translate-y-1/2">
          <img
            src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=400&fit=crop"
            alt="Featured Fragrance"
            className="w-[400px] h-[400px] object-cover rounded-[8px] shadow-[0_12px_48px_rgba(0,0,0,0.12)]"
          />
        </div>
      </div>

      {/* ── Breadcrumb ── */}
      <div className="min-h-[48px] bg-[#FDFBF7] px-[120px] flex items-center">
        <span className="text-[15px] font-normal text-[#8B7355] cursor-pointer">Home</span>
        <span className="text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[15px] font-normal text-[#8B7355] cursor-pointer">Shop</span>
        <span className="text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[15px] font-normal text-[#666666]">Fragrance</span>
      </div>

      {/* ── Main Content ── */}
      <div className="px-[120px] py-[64px] flex gap-[48px]">

        {/* ── Sidebar Filters ── */}
        <div className="w-[280px] flex-shrink-0">
          <div className="bg-white rounded-[16px] border border-[#E8E3D9] shadow-[0_8px_32px_rgba(0,0,0,0.08)] p-[28px]">
            <h3 className="text-[18px] font-medium text-[#1A1A1A] mb-[24px]">REFINE SELECTION</h3>

            {/* Primary Categories */}
            <div className="space-y-[12px] mb-[32px]">
              {fragranceCategories.map((cat, idx) => (
                <div key={cat}>
                  <div className={`inline-flex items-center px-[20px] py-[10px] ${idx === 0 ? 'bg-[#8B7355] text-white' : 'bg-[#F5F1EA] text-[#3D3D3D]'} text-[14px] font-medium rounded-full cursor-pointer gap-2 w-full justify-between`}>
                    <span>{cat}</span>
                    {idx !== 0 && <IoChevronDown className="w-[14px] h-[14px]" />}
                  </div>
                  {idx === 1 && (
                    <div className="ml-[24px] mt-[8px]">
                      {["Women's EDP", "Men's EDP", 'Unisex EDP'].map((subcat) => (
                        <div key={subcat} className="inline-block px-[16px] py-[6px] bg-white border border-[#E8E3D9] text-[#666666] text-[13px] rounded-full cursor-pointer mr-2 mb-2">
                          {subcat}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Secondary Filters */}
            <div className="border-t border-[#E8E3D9] pt-[24px] space-y-[20px]">
              {/* Fragrance Family */}
              <div>
                <h4 className="text-[15px] font-medium text-[#1A1A1A] mb-[12px]">Fragrance Family</h4>
                <div className="space-y-[8px]">
                  {fragranceFamilies.map((family) => (
                    <label key={family} className="flex items-center gap-[10px] cursor-pointer">
                      <div className="w-[16px] h-[16px] border-[2px] border-[#C9A870] rounded-[2px]" />
                      <span className="text-[14px] font-normal text-[#3D3D3D]">{family}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Top Notes */}
              <div>
                <h4 className="text-[15px] font-medium text-[#1A1A1A] mb-[12px]">Top Notes</h4>
                <div className="space-y-[8px]">
                  {topNotes.map((note) => (
                    <label key={note} className="flex items-center gap-[10px] cursor-pointer">
                      <div className="w-[16px] h-[16px] border-[2px] border-[#C9A870] rounded-[2px]" />
                      <span className="text-[14px] font-normal text-[#3D3D3D]">{note}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Intensity */}
              <div>
                <h4 className="text-[15px] font-medium text-[#1A1A1A] mb-[12px]">Intensity</h4>
                <div className="space-y-[8px]">
                  {intensityLevels.map((level) => (
                    <label key={level} className="flex items-center gap-[10px] cursor-pointer">
                      <div className="w-[16px] h-[16px] border-[2px] border-[#C9A870] rounded-full" />
                      <span className="text-[14px] font-normal text-[#3D3D3D]">{level}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <h4 className="text-[15px] font-medium text-[#1A1A1A] mb-[12px]">Size</h4>
                <div className="space-y-[8px]">
                  {sizes.map((size) => (
                    <label key={size} className="flex items-center gap-[10px] cursor-pointer">
                      <div className="w-[16px] h-[16px] border-[2px] border-[#C9A870] rounded-[2px]" />
                      <span className="text-[14px] font-normal text-[#3D3D3D]">{size}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="text-[15px] font-medium text-[#1A1A1A] mb-[12px]">Price Range</h4>
                <div className="flex items-center gap-[8px]">
                  <input type="text" placeholder="$0" className="w-[100px] h-[36px] px-3 border border-[#E8E3D9] rounded-[6px] text-[14px] outline-none" />
                  <span className="text-[14px] text-[#666666]">—</span>
                  <input type="text" placeholder="$500" className="w-[100px] h-[36px] px-3 border border-[#E8E3D9] rounded-[6px] text-[14px] outline-none" />
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
            <span className="text-[15px] font-normal text-[#666666]">Showing 36 of 84 fragrance products</span>
            <div className="flex items-center gap-[16px]">
              <span className="text-[15px] font-normal text-[#666666]">Sort by:</span>
              <button className="w-[240px] min-h-[48px] px-4 py-[14px] bg-white border border-[#E8E3D9] rounded-[8px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] flex items-center justify-between cursor-pointer hover:border-[#C9A870] transition-all">
                <span className="text-[15px] font-medium text-[#2B2B2B]">Best Selling</span>
                <IoChevronDown className="w-[18px] h-[18px] text-[#8B7355]" />
              </button>
            </div>
          </div>

          {/* Row 1: Large Featured + Two Stacked */}
          <div className="flex gap-[20px] mb-[48px]">
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
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[13px] font-light italic text-[#8B7355] tracking-[1.2px]">Shan Loray</p>
                  <span className="px-[12px] py-[4px] bg-[#F5F1EA] text-[#8B7355] text-[11px] font-medium rounded-full">{featuredProduct.concentration}</span>
                </div>
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
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[13px] font-light italic text-[#8B7355] tracking-[1.2px]">Shan Loray</p>
                      <span className="px-[12px] py-[4px] bg-[#F5F1EA] text-[#8B7355] text-[11px] font-medium rounded-full">{product.concentration}</span>
                    </div>
                    <h4 className="text-[20px] font-medium text-[#2B2B2B] leading-[1.2] mb-2">{product.name}</h4>
                    <p className="text-[15px] font-normal text-[#999999] leading-[1.5] mb-2">{product.description}</p>
                    <p className="text-[13px] font-light italic text-[#8B7355] mb-3">{product.notes}</p>
                    <div className="flex items-center gap-[8px] mb-3">
                      {product.sizes.map((size) => (
                        <span key={size} className="px-[12px] py-[4px] border border-[#E8E3D9] text-[#666666] text-[12px] rounded-full">
                          {size}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-[19px] font-semibold text-[#1A1A1A]">{product.price}</p>
                      <div className="flex items-center gap-[6px]">
                        <Stars />
                        <span className="text-[13px] font-normal text-[#999999] ml-1">({product.reviews})</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Three Square Cards */}
          <div className="grid grid-cols-3 gap-[20px] mb-[48px]">
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
                  <div className="absolute top-[16px] left-[16px] px-[12px] py-[4px] bg-[#F5F1EA] text-[#8B7355] text-[11px] font-medium rounded-full">
                    {product.concentration}
                  </div>
                </div>
                <p className="text-[13px] font-light italic text-[#8B7355] tracking-[1.2px] mb-2">Shan Loray</p>
                <h4 className="text-[20px] font-medium text-[#2B2B2B] leading-[1.2] mb-2">{product.name}</h4>
                <p className="text-[15px] font-normal text-[#999999] leading-[1.5] mb-2">{product.family}</p>
                <p className="text-[19px] font-semibold text-[#1A1A1A] mb-2">{product.price}</p>
                <div className="flex items-center gap-[6px]">
                  <Stars />
                  <span className="text-[13px] font-normal text-[#999999] ml-1">({product.reviews})</span>
                </div>
              </div>
            ))}
          </div>

          {/* Row 3: Two Rectangular Cards */}
          <div className="grid grid-cols-2 gap-[20px] mb-[96px]">
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
            <h3 className="text-[32px] font-medium text-[#1A1A1A] mb-2">Discover Your Signature Scent</h3>
            <p className="text-[16px] font-normal text-[#666666] mb-6">Get personalized fragrance recommendations</p>
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
            {[2, 3].map((num) => (
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