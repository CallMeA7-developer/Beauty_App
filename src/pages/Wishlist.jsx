import {
  IoPersonOutline,
  IoHeartOutline,
  IoBagOutline,
  IoSparkles,
  IoBagCheckOutline,
  IoCalendarOutline,
  IoSettingsOutline,
  IoStarSharp,
  IoRibbonOutline,
  IoChevronDown,
  IoFunnelOutline,
  IoShareSocialOutline,
  IoHeart,
  IoCloseOutline,
  IoCopyOutline,
  IoLogoInstagram,
  IoLogoWhatsapp,
  IoMail,
} from 'react-icons/io5'

export default function Wishlist() {
  const navigationItems = [
    { icon: IoPersonOutline, label: 'Account Dashboard', active: false, badge: null },
    { icon: IoBagCheckOutline, label: 'Order History', active: false, badge: null },
    { icon: IoHeartOutline, label: 'Wishlist', active: true, badge: '12' },
    { icon: IoSparkles, label: 'Beauty Profile', active: false, tag: 'Complete Analysis' },
    { icon: IoRibbonOutline, label: 'Loyalty Program', active: false, badge: '2,450' },
    { icon: IoCalendarOutline, label: 'My Routines', active: false, badge: null },
    { icon: IoStarSharp, label: 'Reviews & Ratings', active: false, badge: null },
    { icon: IoSettingsOutline, label: 'Account Settings', active: false, badge: null },
  ]

  const wishlistProducts = [
    { id: 1, brand: 'LA MER', name: 'Crème de la Mer Moisturizing Cream', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=560&h=560&fit=crop', rating: 4.9, reviews: 342, originalPrice: 380, currentPrice: 342, stock: 'In Stock' },
    { id: 2, brand: 'ESTÉE LAUDER', name: 'Advanced Night Repair Serum', image: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=560&h=560&fit=crop', rating: 4.8, reviews: 567, originalPrice: 135, currentPrice: 115, stock: 'In Stock' },
    { id: 3, brand: 'DIOR', name: 'Prestige La Micro-Huile de Rose', image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=560&h=560&fit=crop', rating: 4.7, reviews: 289, originalPrice: 425, currentPrice: 425, stock: 'Low Stock' },
    { id: 4, brand: 'TOM FORD', name: 'Black Orchid Eau de Parfum', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=560&h=560&fit=crop', rating: 4.9, reviews: 834, originalPrice: 295, currentPrice: 265, stock: 'In Stock' },
    { id: 5, brand: 'CHARLOTTE TILBURY', name: 'Magic Cream Moisturizer', image: 'https://images.unsplash.com/photo-1556228841-a6d4522f2c88?w=560&h=560&fit=crop', rating: 4.6, reviews: 456, originalPrice: 100, currentPrice: 85, stock: 'In Stock' },
    { id: 6, brand: 'CHANEL', name: 'Les Beiges Healthy Glow Foundation', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=560&h=560&fit=crop', rating: 4.8, reviews: 721, originalPrice: 68, currentPrice: 68, stock: 'In Stock' },
  ]

  return (
    <div className="bg-white font-['Cormorant_Garamond']">

      {/* ── Breadcrumb ── */}
      <div className="min-h-[48px] bg-[#FDFBF7] px-[120px] flex items-center">
        <span className="text-[15px] font-normal text-[#8B7355] cursor-pointer">Home</span>
        <span className="text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[15px] font-normal text-[#8B7355] cursor-pointer">Account Dashboard</span>
        <span className="text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[15px] font-normal text-[#666666]">Wishlist</span>
      </div>

      {/* ── Hero ── */}
      <div className="min-h-[140px] bg-gradient-to-b from-[#FDFBF7] to-white flex flex-col items-center justify-center px-[120px]">
        <div className="max-w-[1200px] w-full">
          <h1 className="text-[48px] font-semibold text-[#1A1A1A]">My Wishlist</h1>
          <p className="text-[18px] font-normal text-[#666666] mt-[8px]">12 saved items awaiting your attention</p>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="min-h-[600px] px-[120px] py-[48px]">
        <div className="max-w-[1200px] mx-auto flex gap-[40px]">

          {/* ── Sidebar ── */}
          <div className="w-[320px] flex-shrink-0">
            {/* Profile Card */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[28px] mb-[24px]">
              <div className="flex flex-col items-center">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=240&h=240&fit=crop"
                  alt="User Avatar"
                  className="w-[120px] h-[120px] rounded-full object-cover border-[3px] border-[#C9A870] mb-[16px]"
                />
                <h2 className="text-[24px] font-semibold text-[#1A1A1A] mb-[4px]">Alexandra Chen</h2>
                <div className="bg-[#C9A870] text-white text-[12px] font-medium px-[16px] py-[6px] rounded-full mb-[16px]">
                  Elite Member
                </div>
                <div className="flex items-center gap-[8px]">
                  <IoSparkles className="w-[20px] h-[20px] text-[#C9A870]" />
                  <span className="text-[20px] font-medium text-[#8B7355]">2,450 Points</span>
                </div>
              </div>
            </div>

            {/* Nav Menu */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[8px] mb-[24px]">
              {navigationItems.map((item) => (
                <div key={item.label} className={`flex items-center justify-between h-[56px] px-[20px] rounded-[8px] cursor-pointer transition-colors ${item.active ? 'bg-[#FDFBF7]' : 'hover:bg-[#FDFBF7]'}`}>
                  <div className="flex items-center gap-[16px]">
                    <item.icon className={`w-[22px] h-[22px] ${item.active ? 'text-[#8B7355]' : 'text-[#666666]'}`} />
                    <span className={`text-[15px] ${item.active ? 'text-[#8B7355] font-medium' : 'font-normal text-[#2B2B2B]'}`}>{item.label}</span>
                  </div>
                  {item.badge ? (
                    <div className="bg-[#C9A870] text-white text-[11px] font-medium px-[8px] py-[2px] rounded-full">{item.badge}</div>
                  ) : item.tag ? (
                    <div className="bg-[#8B7355] text-white text-[10px] font-normal px-[8px] py-[2px] rounded-[4px]">{item.tag}</div>
                  ) : null}
                </div>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[24px]">
              <div className="grid grid-cols-3 gap-[16px]">
                {[{ label: 'Total Orders', value: '24' }, { label: 'Wishlist Items', value: '12' }, { label: 'Reviews Written', value: '8' }].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-[24px] font-semibold text-[#8B7355] mb-[4px]">{stat.value}</div>
                    <div className="text-[11px] font-light text-[#666666]">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Main Panel ── */}
          <div className="flex-1">

            {/* Action Bar */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[24px] flex items-center justify-between mb-[24px]">
              <div className="flex items-center gap-[12px]">
                <span className="text-[15px] font-normal text-[#666666]">Sort by:</span>
                <div className="flex items-center gap-[8px] cursor-pointer">
                  <span className="text-[15px] font-medium text-[#1A1A1A]">Latest Added</span>
                  <IoChevronDown className="w-[16px] h-[16px] text-[#666666]" />
                </div>
              </div>
              <div className="flex items-center gap-[12px]">
                <button className="h-[40px] px-[20px] bg-white border-[1.5px] border-[#E8E3D9] text-[#666666] text-[14px] font-medium rounded-[8px] cursor-pointer flex items-center gap-[8px] hover:border-[#8B7355] transition-colors">
                  <IoFunnelOutline className="w-[16px] h-[16px]" />
                  Filter
                </button>
                <button className="h-[40px] px-[20px] bg-white border-[1.5px] border-[#E8E3D9] text-[#666666] text-[14px] font-medium rounded-[8px] cursor-pointer flex items-center gap-[8px] hover:border-[#8B7355] transition-colors">
                  <IoShareSocialOutline className="w-[16px] h-[16px]" />
                  Share Wishlist
                </button>
              </div>
            </div>

            {/* Wishlist Grid */}
            <div className="grid grid-cols-2 gap-[24px] mb-[24px]">
              {wishlistProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[20px] hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-all duration-300">
                  {/* Product Image */}
                  <div className="relative w-full h-[280px] rounded-[8px] overflow-hidden mb-[16px] group">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <button className="absolute top-[12px] right-[12px] w-[36px] h-[36px] rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                      <IoHeart className="w-[20px] h-[20px] text-[#C84848]" />
                    </button>
                    {product.stock === 'Low Stock' && (
                      <div className="absolute top-[12px] left-[12px] bg-[#E5A84D] text-white text-[11px] font-medium px-[10px] py-[4px] rounded-full">
                        Low Stock
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="mb-[16px]">
                    <div className="text-[13px] font-medium text-[#8B7355] mb-[4px]">{product.brand}</div>
                    <h3 className="text-[18px] font-semibold text-[#1A1A1A] mb-[8px] leading-[1.3]">{product.name}</h3>

                    {/* Rating */}
                    <div className="flex items-center gap-[8px] mb-[8px]">
                      <div className="flex items-center gap-[2px]">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <IoStarSharp key={star} className="w-[14px] h-[14px] text-[#C9A870]" />
                        ))}
                      </div>
                      <span className="text-[13px] font-normal text-[#999999]">({product.reviews})</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-[8px] mb-[8px]">
                      {product.originalPrice !== product.currentPrice && (
                        <span className="text-[16px] font-normal text-[#999999] line-through">${product.originalPrice}</span>
                      )}
                      <span className="text-[22px] font-semibold text-[#1A1A1A]">${product.currentPrice}</span>
                      {product.originalPrice !== product.currentPrice && (
                        <span className="text-[13px] font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                          Save ${product.originalPrice - product.currentPrice}
                        </span>
                      )}
                    </div>

                    {/* Stock Status */}
                    <div className={`inline-block px-[12px] py-[4px] rounded-[4px] text-[12px] font-medium ${product.stock === 'In Stock' ? 'bg-[#F0F8F0] text-[#7BA85D]' : 'bg-[#FFF4E6] text-[#E5A84D]'}`}>
                      {product.stock}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-[12px]">
                    <button className="w-full h-[48px] bg-[#8B7355] text-white text-[16px] font-medium rounded-[8px] cursor-pointer hover:bg-[#7a6448] transition-colors flex items-center justify-center gap-2">
                      <IoBagOutline className="w-[18px] h-[18px]" />
                      Add to Cart
                    </button>
                    <button className="w-full text-[14px] font-medium text-[#C84848] underline cursor-pointer hover:text-red-700 transition-colors">
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Actions */}
            <div className="bg-[#F5F1EA] rounded-[12px] p-[24px] flex items-center justify-between mb-[32px]">
              <button className="text-[14px] font-medium text-[#C84848] underline cursor-pointer hover:text-red-700 transition-colors">
                Clear All Items
              </button>
              <button className="h-[48px] px-[32px] bg-white border-[1.5px] border-[#E8E3D9] text-[#666666] text-[15px] font-medium rounded-[8px] cursor-pointer hover:border-[#8B7355] hover:text-[#8B7355] transition-all">
                Continue Shopping
              </button>
            </div>

            {/* Share Wishlist Panel */}
            <div className="bg-white rounded-[16px] shadow-[0_8px_32px_rgba(0,0,0,0.12)] p-[32px] max-w-[520px] mx-auto">
              <div className="flex items-center justify-between mb-[24px]">
                <h2 className="text-[24px] font-semibold text-[#1A1A1A]">Share Your Wishlist</h2>
                <IoCloseOutline className="w-[24px] h-[24px] text-[#666666] cursor-pointer hover:text-[#8B7355] transition-colors" />
              </div>

              {/* Shareable Link */}
              <div className="bg-[#F5F1EA] rounded-[8px] p-[16px] flex items-center justify-between mb-[24px]">
                <span className="text-[14px] font-normal text-[#666666]">shanloray.com/wishlist/alexandrachen</span>
                <button className="flex items-center gap-[8px] text-[14px] font-medium text-[#8B7355] cursor-pointer hover:underline transition-colors">
                  <IoCopyOutline className="w-[18px] h-[18px]" />
                  Copy
                </button>
              </div>

              {/* Social Share */}
              <div className="flex items-center justify-center gap-[16px]">
                {[
                  { icon: IoLogoInstagram, label: 'Instagram' },
                  { icon: IoLogoWhatsapp, label: 'WhatsApp' },
                  { icon: IoMail, label: 'Email' },
                ].map((social) => (
                  <button key={social.label} className="w-[56px] h-[56px] rounded-full bg-[#FDFBF7] border-[1.5px] border-[#E8E3D9] flex items-center justify-center cursor-pointer hover:bg-[#8B7355] group transition-all">
                    <social.icon className="w-[28px] h-[28px] text-[#8B7355] group-hover:text-white transition-colors" />
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="h-[80px]" />
    </div>
  )
}