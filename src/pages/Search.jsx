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
    { term: 'Anti-Aging', count: '2.4k searches', icon: IoTrendingUp },
    { term: 'Vitamin C', count: '1.8k searches', icon: IoFlame },
    { term: 'Hydration', count: '2.1k searches', icon: IoSparkles },
    { term: 'Night Routine', count: '1.5k searches', icon: IoStarSharp },
  ]

  const trendingTopics = [
    'Anti-Aging', 'Vitamin C', 'Hydration', 'Night Routine',
    'Luxury Skincare', 'Retinol', 'SPF Protection', 'Eye Care',
    'Sensitive Skin', 'Natural Ingredients', 'K-Beauty', 'Exfoliation',
  ]

  const productSuggestions = [
    { name: 'Age-Defying Serum', brand: 'Shan Loray', price: '$124', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=160&h=160&fit=crop', reviews: 342 },
    { name: 'Vitamin C Brightening', brand: 'Shan Loray', price: '$95', image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=160&h=160&fit=crop', reviews: 521 },
    { name: 'Hydrating Essence', brand: 'Shan Loray', price: '$78', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=160&h=160&fit=crop', reviews: 467 },
  ]

  const collections = [
    { name: 'Anti-Aging Collection', items: '12 products', image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=80&h=80&fit=crop' },
    { name: 'Hydration Essentials', items: '8 products', image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=80&h=80&fit=crop' },
    { name: 'Brightening Bundle', items: '6 products', image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=80&h=80&fit=crop' },
  ]

  const ingredients = ['Vitamin C (Ascorbic Acid)', 'Retinol', 'Hyaluronic Acid', 'Niacinamide', 'Peptides']
  const skinConcerns = ['Fine Lines & Wrinkles', 'Dark Spots', 'Dryness', 'Uneven Texture', 'Loss of Firmness']

  const Stars = () => [...Array(5)].map((_, i) => <IoStarSharp key={i} className="w-[14px] h-[14px] text-[#C9A870]" />)

  return (
    <div className="bg-white font-['Cormorant_Garamond']">

      {/* ── Search Header ── */}
      <div className="min-h-[120px] bg-white flex items-center justify-between px-[120px] border-b border-[#E8E3D9]">
        <Link to="/">
          <IoClose className="w-[28px] h-[28px] text-[#2B2B2B] cursor-pointer hover:text-[#8B7355] transition-colors" />
        </Link>

        <div className="relative">
          <IoSearchOutline className="absolute left-[24px] top-1/2 -translate-y-1/2 w-[24px] h-[24px] text-[#8B7355]" />
          <input
            type="text"
            placeholder="Search for products, collections, or concerns..."
            className="w-[800px] h-[64px] pl-[60px] pr-[60px] text-[18px] font-normal text-[#2B2B2B] bg-white border-2 border-[#E8E3D9] rounded-[12px] outline-none focus:border-[#8B7355] focus:shadow-[0_2px_12px_rgba(139,115,85,0.15)] transition-all"
          />
          <IoCloseCircle className="absolute right-[24px] top-1/2 -translate-y-1/2 w-[20px] h-[20px] text-[#999999] cursor-pointer hover:text-[#8B7355] transition-colors" />
        </div>

        <button className="flex items-center gap-2 text-[15px] font-medium text-[#2B2B2B] cursor-pointer hover:text-[#8B7355] transition-colors">
          <IoOptionsOutline className="w-[20px] h-[20px]" />
          Filters
        </button>
      </div>

      {/* ── Category Tabs ── */}
      <div className="min-h-[80px] bg-gradient-to-b from-[#FDFBF7] to-white flex items-center justify-center">
        <div className="flex items-center gap-[16px]">
          {quickCategories.map((category, idx) => (
            <button
              key={category}
              className={`h-[44px] px-[24px] rounded-full text-[15px] transition-all ${
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

      {/* ── Main Content ── */}
      <div className="min-h-[700px] px-[120px] py-[48px]">
        <div className="max-w-[1200px] mx-auto">

          {/* Recent Searches */}
          <div className="mb-[48px]">
            <div className="flex items-center justify-between mb-[24px]">
              <h2 className="text-[20px] font-medium text-[#1A1A1A]">Recent Searches</h2>
              <button className="text-[14px] font-normal text-[#8B7355] cursor-pointer hover:underline">Clear All</button>
            </div>
            <div>
              {recentSearches.map((search) => (
                <div key={search} className="flex items-center justify-between py-[16px] border-b border-[#F5F1EA] cursor-pointer hover:bg-[#FDFBF7] px-2 rounded transition-colors">
                  <div className="flex items-center gap-[12px]">
                    <IoTimeOutline className="w-[20px] h-[20px] text-[#8B7355]" />
                    <span className="text-[16px] font-normal text-[#2B2B2B]">{search}</span>
                  </div>
                  <IoClose className="w-[18px] h-[18px] text-[#999999] cursor-pointer hover:text-[#8B7355] transition-colors" />
                </div>
              ))}
            </div>
          </div>

          {/* Popular Searches */}
          <div className="mb-[48px]">
            <h2 className="text-[24px] font-medium text-[#1A1A1A] mb-[24px]">Popular Right Now</h2>
            <div className="grid grid-cols-4 gap-[16px]">
              {popularSearches.map((item) => (
                <div key={item.term} className="bg-white border border-[#E8E3D9] rounded-[8px] p-[20px] cursor-pointer hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] hover:border-[#C9A870] transition-all duration-300">
                  <item.icon className="w-[32px] h-[32px] text-[#C9A870] mb-[12px]" />
                  <h3 className="text-[16px] font-medium text-[#1A1A1A] mb-[8px]">{item.term}</h3>
                  <p className="text-[13px] font-normal text-[#666666]">{item.count}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Topics */}
          <div className="bg-[#FDFBF7] rounded-[12px] p-[32px] mb-[48px]">
            <div className="flex items-center gap-[8px] mb-[20px]">
              <IoFlame className="w-[24px] h-[24px] text-[#C9A870]" />
              <h2 className="text-[20px] font-medium text-[#1A1A1A]">Trending Topics</h2>
            </div>
            <div className="flex flex-wrap gap-[12px]">
              {trendingTopics.map((topic) => (
                <button key={topic} className="bg-white px-[20px] py-[12px] rounded-full border border-[#E8E3D9] text-[14px] font-normal text-[#8B7355] cursor-pointer hover:bg-[#8B7355] hover:text-white transition-all">
                  {topic}
                </button>
              ))}
            </div>
          </div>

          {/* Product Suggestions */}
          <div className="mb-[48px]">
            <h3 className="text-[16px] font-medium text-[#8B7355] mb-[16px]">Products</h3>
            <div className="grid grid-cols-3 gap-[20px]">
              {productSuggestions.map((product) => (
                <div key={product.name} className="bg-white rounded-[8px] p-[16px] cursor-pointer hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] transition-all duration-300">
                  <img src={product.image} alt={product.name} className="w-[160px] h-[160px] object-cover rounded-[8px] mb-[12px]" />
                  <p className="text-[12px] font-light italic text-[#8B7355] mb-[4px]">{product.brand}</p>
                  <h4 className="text-[15px] font-medium text-[#1A1A1A] mb-[8px]">{product.name}</h4>
                  <p className="text-[16px] font-semibold text-[#2B2B2B] mb-[8px]">{product.price}</p>
                  <div className="flex items-center gap-[4px]">
                    <Stars />
                    <span className="text-[12px] font-normal text-[#999999] ml-[4px]">({product.reviews})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Collections */}
          <div className="mb-[48px]">
            <h3 className="text-[16px] font-medium text-[#8B7355] mb-[16px]">Collections</h3>
            <div className="space-y-[12px]">
              {collections.map((collection) => (
                <div key={collection.name} className="flex items-center gap-[16px] bg-white rounded-[8px] h-[80px] cursor-pointer hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] transition-all duration-300 border border-[#F5F1EA]">
                  <img src={collection.image} alt={collection.name} className="w-[80px] h-[80px] object-cover rounded-l-[8px]" />
                  <div className="flex-1">
                    <h4 className="text-[16px] font-medium text-[#1A1A1A] mb-[4px]">{collection.name}</h4>
                    <p className="text-[14px] font-normal text-[#666666]">{collection.items}</p>
                  </div>
                  <IoChevronForward className="w-[20px] h-[20px] text-[#8B7355] mr-[16px]" />
                </div>
              ))}
            </div>
          </div>

          {/* Ingredients */}
          <div className="mb-[48px]">
            <h3 className="text-[16px] font-medium text-[#8B7355] mb-[16px]">Ingredients</h3>
            <div>
              {ingredients.map((ingredient) => (
                <div key={ingredient} className="flex items-center gap-[12px] py-[12px] border-b border-[#F5F1EA] cursor-pointer hover:bg-[#FDFBF7] px-2 rounded transition-colors">
                  <IoBeakerOutline className="w-[20px] h-[20px] text-[#8B7355]" />
                  <span className="text-[15px] font-normal text-[#2B2B2B]">{ingredient}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Skin Concerns */}
          <div className="mb-[48px]">
            <h3 className="text-[16px] font-medium text-[#8B7355] mb-[16px]">Skin Concerns</h3>
            <div>
              {skinConcerns.map((concern) => (
                <div key={concern} className="flex items-center gap-[12px] py-[12px] border-b border-[#F5F1EA] cursor-pointer hover:bg-[#FDFBF7] px-2 rounded transition-colors">
                  <IoAlertCircleOutline className="w-[20px] h-[20px] text-[#8B7355]" />
                  <span className="text-[15px] font-normal text-[#2B2B2B]">{concern}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}