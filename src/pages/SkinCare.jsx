import { IoStarSharp, IoChevronBack, IoChevronForward, IoHeartOutline, IoEyeOutline, IoChevronDown } from 'react-icons/io5'

export default function SkinCare() {
  const skinTypes = ['All Types', 'Dry', 'Oily', 'Combination', 'Sensitive', 'Mature']
  const skinConcerns = ['Anti-Aging', 'Hydration', 'Brightening', 'Acne Care', 'Redness Relief', 'Dark Spots', 'Large Pores', 'Fine Lines']
  const ingredients = ['Retinol', 'Vitamin C', 'Hyaluronic Acid', 'Niacinamide', 'AHA/BHA', 'Ceramides']
  const brandValues = ['Vegan', 'Cruelty-Free', 'Fragrance-Free', 'Organic']

  const largeProducts = [
    { name: 'Advanced Retinol Night Serum', description: 'Time-release formula for smooth, youthful skin', price: '$198', reviews: 412, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=560&h=560&fit=crop' },
    { name: 'Vitamin C Brightening Complex', description: 'Powerful antioxidant serum for radiant glow', price: '$165', reviews: 387, image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=940&h=800&fit=crop' },
  ]

  const mediumProducts = [
    { name: 'Hydrating Gel Cleanser', description: 'Gentle daily cleanser for all skin types', price: '$58', reviews: 534, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=460&h=280&fit=crop' },
    { name: 'Peptide Eye Renewal Cream', description: 'Targets fine lines and dark circles', price: '$145', reviews: 298, image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=460&h=280&fit=crop' },
  ]

  const squareProducts = [
    { name: 'Deep Moisture Face Cream', description: '24-hour hydration therapy', price: '$128', reviews: 621, image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=300&h=300&fit=crop' },
    { name: 'Illuminating Clay Mask', description: 'Purifies and brightens complexion', price: '$78', reviews: 445, image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=300&h=300&fit=crop' },
    { name: 'Mineral Defense SPF 50', description: 'Broad spectrum sun protection', price: '$72', reviews: 789, image: 'https://images.unsplash.com/photo-1556228852-80a3c31c6d52?w=300&h=300&fit=crop' },
  ]

  const rectangularProducts = [
    { name: 'Complete Skincare Ritual Set', description: 'Four essential steps to luminous skin', price: '$395', reviews: 203, image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=470&h=400&fit=crop' },
    { name: 'Travel Essentials Collection', description: 'Your complete routine in travel sizes', price: '$145', reviews: 167, image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=470&h=400&fit=crop' },
  ]

  const Stars = () => [...Array(5)].map((_, i) => <IoStarSharp key={i} className="w-[15px] h-[15px] text-[#C9A870]" />)

  return (
    <div className="bg-white font-['Cormorant_Garamond']">

      {/* ── Hero Banner ── */}
      <div className="min-h-[380px] bg-gradient-to-b from-[#FDFBF7] to-[#F5F1EA] relative overflow-hidden flex items-center px-[120px]">
        <img
          src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800&h=800&fit=crop"
          alt="Botanical decoration"
          className="absolute top-0 right-0 w-[500px] h-[380px] object-cover opacity-20"
        />
        <div className="w-[650px] relative z-10">
          <p className="text-[14px] font-light italic text-[#8B7355] tracking-[2px] mb-3">COMPLETE SKINCARE COLLECTION</p>
          <h1 className="text-[64px] font-bold text-[#1A1A1A] leading-[1] mb-6">Science Meets Nature</h1>
          <p className="text-[18px] font-normal text-[#666666] mb-8">From cleansing to protection, discover transformative skincare</p>
          <div className="w-[100px] h-[4px] bg-[#C9A870]" />
        </div>
        <div className="absolute right-[180px] top-1/2 -translate-y-1/2">
          <img
            src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=320&h=320&fit=crop"
            alt="Featured Serum"
            className="w-[260px] h-[260px] object-cover rounded-[8px] shadow-[0_12px_48px_rgba(0,0,0,0.12)]"
          />
        </div>
      </div>

      {/* ── Breadcrumb ── */}
      <div className="min-h-[48px] bg-[#FDFBF7] px-[120px] flex items-center">
        <span className="text-[15px] font-normal text-[#8B7355] cursor-pointer">Home</span>
        <span className="text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[15px] font-normal text-[#8B7355] cursor-pointer">Shop</span>
        <span className="text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[15px] font-normal text-[#666666]">Skincare</span>
      </div>

      {/* ── Main Content ── */}
      <div className="px-[120px] py-[64px] flex gap-[48px]">

        {/* ── Sidebar Filters ── */}
        <div className="w-[280px] flex-shrink-0">
          <div className="bg-white border border-[#E8E3D9] rounded-[16px] shadow-[0_8px_32px_rgba(0,0,0,0.08)] p-[28px]">
            <h3 className="text-[18px] font-medium text-[#1A1A1A] mb-[24px]">REFINE SELECTION</h3>

            {/* Category Pills */}
            <div className="space-y-[12px] mb-[32px]">
              <div className="inline-flex items-center px-[20px] py-[10px] bg-[#8B7355] text-white text-[14px] font-medium rounded-full cursor-pointer">
                All Skincare
              </div>

              {/* Cleansers */}
              <div>
                <div className="inline-flex items-center px-[20px] py-[10px] bg-[#F5F1EA] text-[#3D3D3D] text-[14px] font-medium rounded-full cursor-pointer gap-2">
                  <span>Cleansers</span>
                  <IoChevronDown className="w-[14px] h-[14px]" />
                </div>
                <div className="ml-[24px] mt-[8px]">
                  {['Face Wash', 'Cleansing Oil', 'Micellar Water', 'Exfoliators'].map((item) => (
                    <div key={item} className="inline-block px-[16px] py-[6px] bg-white border border-[#E8E3D9] text-[#666666] text-[13px] rounded-full cursor-pointer mr-2 mb-2">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Serums */}
              <div>
                <div className="inline-flex items-center px-[20px] py-[10px] bg-[#F5F1EA] text-[#3D3D3D] text-[14px] font-medium rounded-full cursor-pointer gap-2">
                  <span>Serums</span>
                  <IoChevronDown className="w-[14px] h-[14px]" />
                </div>
                <div className="ml-[24px] mt-[8px]">
                  {['Vitamin C', 'Retinol', 'Hyaluronic Acid', 'Niacinamide', 'Peptides'].map((item) => (
                    <div key={item} className="inline-block px-[16px] py-[6px] bg-white border border-[#E8E3D9] text-[#666666] text-[13px] rounded-full cursor-pointer mr-2 mb-2">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Moisturizers */}
              <div>
                <div className="inline-flex items-center px-[20px] py-[10px] bg-[#F5F1EA] text-[#3D3D3D] text-[14px] font-medium rounded-full cursor-pointer gap-2">
                  <span>Moisturizers</span>
                  <IoChevronDown className="w-[14px] h-[14px]" />
                </div>
                <div className="ml-[24px] mt-[8px]">
                  {['Day Cream', 'Night Cream', 'Gel Moisturizer', 'Face Oil'].map((item) => (
                    <div key={item} className="inline-block px-[16px] py-[6px] bg-white border border-[#E8E3D9] text-[#666666] text-[13px] rounded-full cursor-pointer mr-2 mb-2">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {['Eye Care', 'Masks', 'Sunscreen', 'Sets & Routines'].map((category) => (
                <div key={category} className="inline-flex items-center px-[20px] py-[10px] bg-[#F5F1EA] text-[#3D3D3D] text-[14px] font-medium rounded-full cursor-pointer gap-2">
                  <span>{category}</span>
                  <IoChevronDown className="w-[14px] h-[14px]" />
                </div>
              ))}
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

              {/* Skin Type */}
              <div>
                <h4 className="text-[15px] font-medium text-[#1A1A1A] mb-[12px]">Skin Type</h4>
                <div className="space-y-[8px]">
                  {skinTypes.map((type) => (
                    <label key={type} className="flex items-center gap-[10px] cursor-pointer">
                      <div className="w-[16px] h-[16px] border-[2px] border-[#C9A870] rounded-[2px]" />
                      <span className="text-[14px] font-normal text-[#3D3D3D]">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Skin Concerns */}
              <div>
                <h4 className="text-[15px] font-medium text-[#1A1A1A] mb-[12px]">Skin Concerns</h4>
                <div className="space-y-[8px]">
                  {skinConcerns.map((concern) => (
                    <label key={concern} className="flex items-center gap-[10px] cursor-pointer">
                      <div className="w-[16px] h-[16px] border-[2px] border-[#C9A870] rounded-[2px]" />
                      <span className="text-[14px] font-normal text-[#3D3D3D]">{concern}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Ingredients */}
              <div>
                <h4 className="text-[15px] font-medium text-[#1A1A1A] mb-[12px]">Ingredients</h4>
                <div className="space-y-[8px]">
                  {ingredients.map((ingredient) => (
                    <label key={ingredient} className="flex items-center gap-[10px] cursor-pointer">
                      <div className="w-[16px] h-[16px] border-[2px] border-[#C9A870] rounded-[2px]" />
                      <span className="text-[14px] font-normal text-[#3D3D3D]">{ingredient}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brand Values */}
              <div>
                <h4 className="text-[15px] font-medium text-[#1A1A1A] mb-[12px]">Brand Values</h4>
                <div className="space-y-[8px]">
                  {brandValues.map((value) => (
                    <label key={value} className="flex items-center gap-[10px] cursor-pointer">
                      <div className="w-[16px] h-[16px] border-[2px] border-[#C9A870] rounded-[2px]" />
                      <span className="text-[14px] font-normal text-[#3D3D3D]">{value}</span>
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
            <span className="text-[15px] font-normal text-[#666666]">Showing 36 of 124 skincare products</span>
            <div className="flex items-center gap-[16px]">
              <span className="text-[15px] font-normal text-[#666666]">Sort by:</span>
              <button className="w-[240px] min-h-[48px] px-4 py-[14px] bg-white border border-[#E8E3D9] rounded-[8px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] flex items-center justify-between cursor-pointer hover:border-[#C9A870] transition-all duration-200">
                <span className="text-[15px] font-medium text-[#2B2B2B]">Best Selling</span>
                <IoChevronDown className="w-[18px] h-[18px] text-[#8B7355]" />
              </button>
            </div>
          </div>

          {/* Row 1: Large + Two Stacked */}
          <div className="flex gap-[20px] mb-[64px]">
            <div className="w-[460px] h-[560px] bg-white rounded-[12px] overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)] group cursor-pointer hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] transition-all duration-300">
              <div className="relative w-full h-[380px]">
                <img src={largeProducts[0].image} alt={largeProducts[0].name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute bottom-0 left-0 right-0 h-[180px] bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-[24px] text-white">
                  <p className="text-[17px] font-normal mb-2">{largeProducts[0].description}</p>
                  <h3 className="text-[28px] font-medium mb-3">{largeProducts[0].name}</h3>
                  <p className="text-[24px] font-semibold">{largeProducts[0].price}</p>
                </div>
                <div className="absolute top-[20px] right-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="px-[24px] py-[12px] bg-white text-[#8B7355] text-[14px] font-medium rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.2)]">
                    Add to Bag
                  </button>
                </div>
              </div>
              <div className="p-[24px]">
                <p className="text-[13px] font-light italic text-[#8B7355] tracking-[1.2px] mb-2">Shan Loray</p>
                <div className="flex items-center gap-[6px]">
                  <Stars />
                  <span className="text-[13px] font-normal text-[#999999] ml-1">({largeProducts[0].reviews})</span>
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-[20px]">
              {mediumProducts.map((product, idx) => (
                <div key={idx} className="w-full h-[270px] bg-white rounded-[12px] overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)] group cursor-pointer hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] transition-all duration-300 flex">
                  <div className="w-[280px] h-full relative overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-[16px] right-[16px] flex gap-[8px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
                    <p className="text-[15px] font-normal text-[#999999] leading-[1.5] mb-3">{product.description}</p>
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