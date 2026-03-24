import { Link } from 'react-router-dom'
import {
  IoClose,
  IoSearchOutline,
  IoOptionsOutline,
  IoTimeOutline,
  IoTrendingUp,
  IoFlame,
  IoSparkles,
  IoStarSharp,
  IoChevronForward,
  IoBeakerOutline,
  IoAlertCircleOutline,
  IoCloseCircle,
} from 'react-icons/io5'

export default function Search() {
  const quickCategories = ['All', 'Skincare', 'Makeup', 'Fragrance', 'Tools', 'Collections', 'Ingredients']

  const recentSearches = [
    'Vitamin C Serum',
    'Anti-aging cream',
    'Hydrating face mask',
    'Retinol treatment',
    'Eye cream for dark circles',
    'Gentle cleanser',
  ]

  const popularSearches = [
    { term: 'Anti-Aging',   count: '2.4k searches', icon: IoTrendingUp },
    { term: 'Vitamin C',    count: '1.8k searches', icon: IoFlame      },
    { term: 'Hydration',    count: '2.1k searches', icon: IoSparkles   },
    { term: 'Night Routine',count: '1.5k searches', icon: IoStarSharp  },
  ]

  const trendingTopics = [
    'Anti-Aging', 'Vitamin C', 'Hydration', 'Night Routine',
    'Luxury Skincare', 'Retinol', 'SPF Protection', 'Eye Care',
    'Sensitive Skin', 'Natural Ingredients', 'K-Beauty', 'Exfoliation',
  ]

  const productSuggestions = [
    { name: 'Age-Defying Serum',      brand: 'Shan Loray', price: '$124', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=160&h=160&fit=crop', reviews: 342 },
    { name: 'Vitamin C Brightening',  brand: 'Shan Loray', price: '$95',  image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=160&h=160&fit=crop', reviews: 521 },
    { name: 'Hydrating Essence',      brand: 'Shan Loray', price: '$78',  image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=160&h=160&fit=crop', reviews: 467 },
  ]

  const collections = [
    { name: 'Anti-Aging Collection', items: '12 products', image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=80&h=80&fit=crop'  },
    { name: 'Hydration Essentials',  items: '8 products',  image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=80&h=80&fit=crop'  },
    { name: 'Brightening Bundle',    items: '6 products',  image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=80&h=80&fit=crop'  },
  ]

  const ingredients   = ['Vitamin C (Ascorbic Acid)', 'Retinol', 'Hyaluronic Acid', 'Niacinamide', 'Peptides']
  const skinConcerns  = ['Fine Lines & Wrinkles', 'Dark Spots', 'Dryness', 'Uneven Texture', 'Loss of Firmness']

  const Stars = () => [...Array(5)].map((_, i) => <IoStarSharp key={i} className="w-[14px] h-[14px] text-[#C9A870]" />)

  return (
    <div className="bg-white font-['Cormorant_Garamond']">

      {/* ── Search Header ── */}
      <div className="min-h-[80px] md:min-h-[100px] lg:min-h-[120px] bg-white flex items-center justify-between gap-3 px-4 md:px-[60px] lg:px-[120px] border-b border-[#E8E3D9]">
        <Link to="/" className="flex-shrink-0">
          <IoClose className="w-[24px] h-[24px] md:w-[26px] md:h-[26px] lg:w-[28px] lg:h-[28px] text-[#2B2B2B] cursor-pointer hover:text-[#8B7355] transition-colors" />
        </Link>

        <div className="relative flex-1 md:flex-none">
          <IoSearchOutline className="absolute left-[14px] md:left-[20px] lg:left-[24px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] md:w-[22px] md:h-[22px] lg:w-[24px] lg:h-[24px] text-[#8B7355]" />
          <input
            type="text"
            placeholder="Search products, collections..."
            className="w-full md:w-[500px] lg:w-[800px] h-[48px] md:h-[56px] lg:h-[64px] pl-[40px] md:pl-[52px] lg:pl-[60px] pr-[40px] md:pr-[52px] lg:pr-[60px] text-[14px] md:text-[16px] lg:text-[18px] font-normal text-[#2B2B2B] bg-white border-2 border-[#E8E3D9] rounded-[12px] outline-none focus:border-[#8B7355] focus:shadow-[0_2px_12px_rgba(139,115,85,0.15)] transition-all"
          />
          <IoCloseCircle className="absolute right-[14px] md:right-[20px] lg:right-[24px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] md:w-[20px] md:h-[20px] text-[#999999] cursor-pointer hover:text-[#8B7355] transition-colors" />
        </div>

        <button className="flex-shrink-0 flex items-center gap-[6px] text-[13px] md:text-[14px] lg:text-[15px] font-medium text-[#2B2B2B] cursor-pointer hover:text-[#8B7355] transition-colors">
          <IoOptionsOutline className="w-[18px] h-[18px] md:w-[20px] md:h-[20px]" />
          <span className="hidden sm:inline">Filters</span>
        </button>
      </div>

      {/* ── Category Tabs ── */}
      <div className="min-h-[64px] md:min-h-[72px] lg:min-h-[80px] bg-gradient-to-b from-[#FDFBF7] to-white flex items-center">
        <div className="w-full overflow-x-auto px-4 md:px-[60px] lg:px-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="flex items-center gap-[10px] md:gap-[14px] lg:gap-[16px] lg:justify-center w-max lg:w-full px-0 lg:px-[120px]">
            {quickCategories.map((category, idx) => (
              <button
                key={category}
                className={`flex-shrink-0 h-[38px] md:h-[40px] lg:h-[44px] px-[16px] md:px-[20px] lg:px-[24px] rounded-full text-[13px] md:text-[14px] lg:text-[15px] transition-all whitespace-nowrap ${
                  idx === 0
                    ? 'bg-[#8B7355] text-white font-medium'
                    : 'bg-white text-[#666666] font-normal border border-[#E8E3D9] hover:border-[#8B7355] hover:text-[#8B7355]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="px-4 md:px-[60px] lg:px-[120px] py-8 md:py-10 lg:py-[48px]">
        <div className="max-w-[1200px] mx-auto">

          {/* Recent Searches */}
          <div className="mb-8 md:mb-10 lg:mb-[48px]">
            <div className="flex items-center justify-between mb-5 lg:mb-[24px]">
              <h2 className="text-[17px] md:text-[18px] lg:text-[20px] font-medium text-[#1A1A1A]">Recent Searches</h2>
              <button className="text-[13px] md:text-[14px] font-normal text-[#8B7355] cursor-pointer hover:underline">Clear All</button>
            </div>
            <div>
              {recentSearches.map((search) => (
                <div key={search} className="flex items-center justify-between py-[14px] lg:py-[16px] border-b border-[#F5F1EA] cursor-pointer hover:bg-[#FDFBF7] px-2 rounded transition-colors">
                  <div className="flex items-center gap-[10px] lg:gap-[12px]">
                    <IoTimeOutline className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#8B7355] flex-shrink-0" />
                    <span className="text-[14px] md:text-[15px] lg:text-[16px] font-normal text-[#2B2B2B]">{search}</span>
                  </div>
                  <IoClose className="w-[16px] h-[16px] lg:w-[18px] lg:h-[18px] text-[#999999] cursor-pointer hover:text-[#8B7355] transition-colors flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>

          {/* Popular Searches */}
          <div className="mb-8 md:mb-10 lg:mb-[48px]">
            <h2 className="text-[20px] md:text-[22px] lg:text-[24px] font-medium text-[#1A1A1A] mb-5 lg:mb-[24px]">Popular Right Now</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-[12px] md:gap-[14px] lg:gap-[16px]">
              {popularSearches.map((item) => (
                <div key={item.term} className="bg-white border border-[#E8E3D9] rounded-[8px] p-[16px] lg:p-[20px] cursor-pointer hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] hover:border-[#C9A870] transition-all duration-300">
                  <item.icon className="w-[26px] h-[26px] lg:w-[32px] lg:h-[32px] text-[#C9A870] mb-[10px] lg:mb-[12px]" />
                  <h3 className="text-[14px] md:text-[15px] lg:text-[16px] font-medium text-[#1A1A1A] mb-[6px] lg:mb-[8px]">{item.term}</h3>
                  <p className="text-[12px] lg:text-[13px] font-normal text-[#666666]">{item.count}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Topics */}
          <div className="bg-[#FDFBF7] rounded-[12px] p-5 md:p-6 lg:p-[32px] mb-8 md:mb-10 lg:mb-[48px]">
            <div className="flex items-center gap-[8px] mb-4 lg:mb-[20px]">
              <IoFlame className="w-[20px] h-[20px] lg:w-[24px] lg:h-[24px] text-[#C9A870]" />
              <h2 className="text-[17px] md:text-[18px] lg:text-[20px] font-medium text-[#1A1A1A]">Trending Topics</h2>
            </div>
            <div className="flex flex-wrap gap-[8px] md:gap-[10px] lg:gap-[12px]">
              {trendingTopics.map((topic) => (
                <button key={topic} className="bg-white px-[14px] md:px-[16px] lg:px-[20px] py-[8px] md:py-[10px] lg:py-[12px] rounded-full border border-[#E8E3D9] text-[12px] md:text-[13px] lg:text-[14px] font-normal text-[#8B7355] cursor-pointer hover:bg-[#8B7355] hover:text-white transition-all">
                  {topic}
                </button>
              ))}
            </div>
          </div>

          {/* Product Suggestions */}
          <div className="mb-8 md:mb-10 lg:mb-[48px]">
            <h3 className="text-[14px] md:text-[15px] lg:text-[16px] font-medium text-[#8B7355] mb-4 lg:mb-[16px]">Products</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-[14px] lg:gap-[20px]">
              {productSuggestions.map((product) => (
                <div key={product.name} className="bg-white rounded-[8px] p-[14px] lg:p-[16px] cursor-pointer hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] transition-all duration-300 flex sm:flex-col items-center sm:items-start gap-4 sm:gap-0 border border-[#F5F1EA] sm:border-0">
                  <img src={product.image} alt={product.name} className="w-[80px] h-[80px] sm:w-[120px] sm:h-[120px] lg:w-[160px] lg:h-[160px] object-cover rounded-[8px] sm:mb-[12px] flex-shrink-0" />
                  <div>
                    <p className="text-[11px] md:text-[12px] font-light italic text-[#8B7355] mb-[4px]">{product.brand}</p>
                    <h4 className="text-[14px] lg:text-[15px] font-medium text-[#1A1A1A] mb-[6px] lg:mb-[8px]">{product.name}</h4>
                    <p className="text-[15px] lg:text-[16px] font-semibold text-[#2B2B2B] mb-[6px] lg:mb-[8px]">{product.price}</p>
                    <div className="flex items-center gap-[4px]">
                      <Stars />
                      <span className="text-[11px] md:text-[12px] font-normal text-[#999999] ml-[4px]">({product.reviews})</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Collections */}
          <div className="mb-8 md:mb-10 lg:mb-[48px]">
            <h3 className="text-[14px] md:text-[15px] lg:text-[16px] font-medium text-[#8B7355] mb-4 lg:mb-[16px]">Collections</h3>
            <div className="space-y-[10px] lg:space-y-[12px]">
              {collections.map((collection) => (
                <div key={collection.name} className="flex items-center gap-[14px] lg:gap-[16px] bg-white rounded-[8px] h-[72px] lg:h-[80px] cursor-pointer hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] transition-all duration-300 border border-[#F5F1EA]">
                  <img src={collection.image} alt={collection.name} className="w-[72px] h-[72px] lg:w-[80px] lg:h-[80px] object-cover rounded-l-[8px] flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[14px] md:text-[15px] lg:text-[16px] font-medium text-[#1A1A1A] mb-[4px]">{collection.name}</h4>
                    <p className="text-[13px] lg:text-[14px] font-normal text-[#666666]">{collection.items}</p>
                  </div>
                  <IoChevronForward className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#8B7355] mr-[14px] lg:mr-[16px] flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>

          {/* Ingredients */}
          <div className="mb-8 md:mb-10 lg:mb-[48px]">
            <h3 className="text-[14px] md:text-[15px] lg:text-[16px] font-medium text-[#8B7355] mb-4 lg:mb-[16px]">Ingredients</h3>
            <div>
              {ingredients.map((ingredient) => (
                <div key={ingredient} className="flex items-center gap-[10px] lg:gap-[12px] py-[11px] lg:py-[12px] border-b border-[#F5F1EA] cursor-pointer hover:bg-[#FDFBF7] px-2 rounded transition-colors">
                  <IoBeakerOutline className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#8B7355] flex-shrink-0" />
                  <span className="text-[14px] lg:text-[15px] font-normal text-[#2B2B2B]">{ingredient}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Skin Concerns */}
          <div className="mb-8 md:mb-10 lg:mb-[48px]">
            <h3 className="text-[14px] md:text-[15px] lg:text-[16px] font-medium text-[#8B7355] mb-4 lg:mb-[16px]">Skin Concerns</h3>
            <div>
              {skinConcerns.map((concern) => (
                <div key={concern} className="flex items-center gap-[10px] lg:gap-[12px] py-[11px] lg:py-[12px] border-b border-[#F5F1EA] cursor-pointer hover:bg-[#FDFBF7] px-2 rounded transition-colors">
                  <IoAlertCircleOutline className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#8B7355] flex-shrink-0" />
                  <span className="text-[14px] lg:text-[15px] font-normal text-[#2B2B2B]">{concern}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}