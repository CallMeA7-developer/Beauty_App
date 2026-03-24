import { Link } from 'react-router-dom'
import {
  IoPersonOutline,
  IoHeartOutline,
  IoSparkles,
  IoBagCheckOutline,
  IoDocumentTextOutline,
  IoCalendarOutline,
  IoSettingsOutline,
  IoChevronForward,
  IoStarSharp,
  IoCheckmarkCircle,
  IoTrendingUp,
  IoRibbonOutline,
  IoLocationOutline,
  IoCardOutline,
  IoNotificationsOutline,
  IoShieldCheckmarkOutline,
  IoAddCircleOutline,
  IoReloadOutline,
  IoCreateOutline,
} from 'react-icons/io5'

export default function AccountDashboard() {
  const navigationItems = [
    { icon: IoPersonOutline, label: 'Account Dashboard', active: true, badge: null },
    { icon: IoBagCheckOutline, label: 'Order History', active: false, badge: null },
    { icon: IoHeartOutline, label: 'Wishlist', active: false, badge: '12' },
    { icon: IoSparkles, label: 'Beauty Profile', active: false, tag: 'Complete Analysis' },
    { icon: IoRibbonOutline, label: 'Loyalty Program', active: false, badge: '2,450' },
    { icon: IoCalendarOutline, label: 'My Routines', active: false, badge: null },
    { icon: IoStarSharp, label: 'Reviews & Ratings', active: false, badge: null },
    { icon: IoSettingsOutline, label: 'Account Settings', active: false, badge: null },
  ]

  const currentOrders = [
    { orderNumber: '#SL-47821', date: 'Dec 18, 2024', status: 'In Transit', product: 'Age-Defying Serum', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=160&h=160&fit=crop', quantity: 1, delivery: 'Dec 22, 2024' },
    { orderNumber: '#SL-47809', date: 'Dec 15, 2024', status: 'Processing', product: 'Vitamin C Brightening', image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=160&h=160&fit=crop', quantity: 2, delivery: 'Dec 24, 2024' },
  ]

  const orderHistory = [
    { date: 'Dec 5, 2024', total: '$289', status: 'Delivered' },
    { date: 'Nov 18, 2024', total: '$156', status: 'Delivered' },
    { date: 'Oct 28, 2024', total: '$342', status: 'Delivered' },
  ]

  const wishlistProducts = [
    { image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=320&h=320&fit=crop', brand: 'Shan Loray', name: 'Hydrating Essence', price: '$78' },
    { image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=320&h=320&fit=crop', brand: 'Shan Loray', name: 'Night Recovery Cream', price: '$145' },
    { image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=320&h=320&fit=crop', brand: 'Shan Loray', name: 'Radiance Booster', price: '$98' },
    { image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=320&h=320&fit=crop', brand: 'Shan Loray', name: 'Eye Renewal Complex', price: '$124' },
  ]

  const routines = [
    { name: 'Morning Ritual', productCount: 5, lastUsed: 'Today', images: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=80&h=80&fit=crop', 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=80&h=80&fit=crop', 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=80&h=80&fit=crop'] },
    { name: 'Evening Care', productCount: 6, lastUsed: 'Yesterday', images: ['https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=80&h=80&fit=crop', 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=80&h=80&fit=crop', 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=80&h=80&fit=crop'] },
  ]

  const reviews = [
    { image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=80&h=80&fit=crop', product: 'Age-Defying Serum', excerpt: 'Absolutely transformed my skin! The texture is luxurious and results are visible within weeks.', date: 'Dec 10, 2024' },
    { image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=80&h=80&fit=crop', product: 'Vitamin C Brightening', excerpt: 'Best vitamin C product I have ever used. My complexion is noticeably brighter and more even.', date: 'Nov 28, 2024' },
  ]

  const settingsItems = [
    { icon: IoLocationOutline, label: 'Shipping Addresses', count: '2 saved' },
    { icon: IoCardOutline, label: 'Payment Methods', count: '3 cards' },
    { icon: IoNotificationsOutline, label: 'Notification Preferences', count: null },
    { icon: IoShieldCheckmarkOutline, label: 'Privacy Settings', count: null },
  ]

  return (
    <div className="bg-white font-['Cormorant_Garamond']">

      {/* ── Hero Welcome ── */}
      <div className="min-h-[140px] md:min-h-[170px] lg:min-h-[200px] bg-gradient-to-b from-[#FDFBF7] to-white flex flex-col items-center justify-center px-4 md:px-[60px] lg:px-[120px] py-6 md:py-0">
        <div className="max-w-[1200px] w-full">
          <div className="text-[12px] lg:text-[13px] font-light text-[#666666] mb-3 lg:mb-[16px]">Home / Account Dashboard</div>
          <h1 className="text-[28px] md:text-[38px] lg:text-[48px] font-semibold text-[#1A1A1A]">Welcome Back, Alexandra</h1>
          <p className="text-[14px] md:text-[16px] lg:text-[18px] font-normal text-[#666666] mt-[8px]">Manage your beauty journey with Shan Loray</p>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="px-4 md:px-[60px] lg:px-[120px] py-6 md:py-10 lg:py-[48px]">
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-[40px]">

          {/* ── Left Sidebar ── */}
          <div className="w-full lg:w-[320px] lg:flex-shrink-0">
            {/* Profile Card */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 lg:p-[28px] mb-5 lg:mb-[24px]">
              <div className="flex flex-col items-center">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=240&h=240&fit=crop"
                  alt="User Avatar"
                  className="w-[90px] h-[90px] md:w-[100px] md:h-[100px] lg:w-[120px] lg:h-[120px] rounded-full object-cover border-[3px] border-[#C9A870] mb-4 lg:mb-[16px]"
                />
                <h2 className="text-[20px] md:text-[22px] lg:text-[24px] font-semibold text-[#1A1A1A] mb-[4px]">Alexandra Chen</h2>
                <div className="bg-[#C9A870] text-white text-[11px] lg:text-[12px] font-medium px-[14px] lg:px-[16px] py-[5px] lg:py-[6px] rounded-full mb-4 lg:mb-[16px]">
                  Elite Member
                </div>
                <div className="flex items-center gap-[8px]">
                  <IoSparkles className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#C9A870]" />
                  <span className="text-[17px] lg:text-[20px] font-medium text-[#8B7355]">2,450 Points</span>
                </div>
              </div>
            </div>

            {/* Nav Menu */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[8px] mb-5 lg:mb-[24px]">
              {navigationItems.map((item) => (
                <div key={item.label} className={`flex items-center justify-between h-[48px] lg:h-[56px] px-3 lg:px-[20px] rounded-[8px] cursor-pointer transition-colors ${item.active ? 'bg-[#FDFBF7]' : 'hover:bg-[#FDFBF7]'}`}>
                  <div className="flex items-center gap-3 lg:gap-[16px]">
                    <item.icon className={`w-[20px] h-[20px] lg:w-[22px] lg:h-[22px] ${item.active ? 'text-[#8B7355]' : 'text-[#666666]'}`} />
                    <span className={`text-[13px] lg:text-[15px] ${item.active ? 'text-[#8B7355] font-medium' : 'font-normal text-[#2B2B2B]'}`}>{item.label}</span>
                  </div>
                  {item.badge ? (
                    <div className="bg-[#C9A870] text-white text-[10px] lg:text-[11px] font-medium px-[7px] lg:px-[8px] py-[2px] rounded-full">{item.badge}</div>
                  ) : item.tag ? (
                    <div className="hidden md:block bg-[#8B7355] text-white text-[9px] lg:text-[10px] font-normal px-[7px] lg:px-[8px] py-[2px] rounded-[4px]">{item.tag}</div>
                  ) : null}
                </div>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 lg:p-[24px]">
              <div className="grid grid-cols-3 gap-3 lg:gap-[16px]">
                {[{ label: 'Total Orders', value: '24' }, { label: 'Wishlist Items', value: '12' }, { label: 'Reviews Written', value: '8' }].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-[20px] lg:text-[24px] font-semibold text-[#8B7355] mb-[4px]">{stat.value}</div>
                    <div className="text-[10px] lg:text-[11px] font-light text-[#666666] leading-tight">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Main Panel ── */}
          <div className="flex-1 min-w-0">

            {/* Personal Info */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[32px] mb-5 md:mb-6 lg:mb-[32px]">
              <div className="flex items-center justify-between mb-5 lg:mb-[24px]">
                <h3 className="text-[17px] md:text-[18px] lg:text-[20px] font-semibold text-[#1A1A1A]">Personal Information</h3>
                <button className="flex items-center gap-[6px] text-[13px] lg:text-[15px] font-medium text-[#8B7355] cursor-pointer hover:underline">
                  <IoCreateOutline className="w-[16px] h-[16px] lg:w-[18px] lg:h-[18px]" /> Edit
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-[24px] mb-5 lg:mb-[24px]">
                {[{ label: 'Full Name', value: 'Alexandra Chen' }, { label: 'Email', value: 'alexandra.chen@email.com' }, { label: 'Phone', value: '+1 (555) 123-4567' }, { label: 'Birthday', value: 'March 15, 1992' }].map((field) => (
                  <div key={field.label}>
                    <div className="text-[12px] lg:text-[13px] font-light text-[#666666] mb-[6px]">{field.label}</div>
                    <div className="text-[14px] lg:text-[16px] font-normal text-[#2B2B2B]">{field.value}</div>
                  </div>
                ))}
              </div>
              <div className="bg-[#FDFBF7] rounded-[8px] p-4 lg:p-[16px]">
                <div className="flex items-center justify-between mb-3 lg:mb-[12px]">
                  <span className="text-[13px] lg:text-[14px] font-normal text-[#666666]">Profile Completion</span>
                  <span className="text-[13px] lg:text-[14px] font-medium text-[#8B7355]">85%</span>
                </div>
                <div className="w-full h-[7px] lg:h-[8px] bg-white rounded-full overflow-hidden">
                  <div className="w-[85%] h-full bg-[#C9A870] rounded-full" />
                </div>
              </div>
            </div>

            {/* Current Orders */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[32px] mb-5 md:mb-6 lg:mb-[32px]">
              <div className="flex items-center justify-between mb-5 lg:mb-[24px]">
                <h3 className="text-[17px] md:text-[18px] lg:text-[20px] font-semibold text-[#1A1A1A]">Current Orders</h3>
                <button className="text-[13px] lg:text-[15px] font-normal text-[#8B7355] cursor-pointer hover:underline">View All</button>
              </div>
              <div className="space-y-4 lg:space-y-[20px]">
                {currentOrders.map((order) => (
                  <div key={order.orderNumber} className="border border-[#E8E3D9] rounded-[8px] p-4 lg:p-[20px]">
                    <div className="flex items-start gap-4 lg:gap-[20px]">
                      <img src={order.image} alt={order.product} className="w-[64px] h-[64px] lg:w-[80px] lg:h-[80px] object-cover rounded-[8px] flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-[8px] gap-2">
                          <div className="min-w-0">
                            <div className="text-[14px] lg:text-[16px] font-medium text-[#1A1A1A] mb-[4px] truncate">{order.product}</div>
                            <div className="text-[11px] lg:text-[13px] font-light text-[#666666]">Order {order.orderNumber} · {order.date} · Qty: {order.quantity}</div>
                          </div>
                          <div className="bg-[#C9A870] text-white text-[10px] lg:text-[12px] font-normal px-[10px] lg:px-[12px] py-[4px] rounded-full flex-shrink-0">{order.status}</div>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-3 lg:mt-[16px]">
                          <div className="flex items-center gap-[6px] text-[12px] lg:text-[14px] font-normal text-[#666666]">
                            <IoCalendarOutline className="w-[14px] h-[14px] lg:w-[16px] lg:h-[16px]" />
                            Est. Delivery: {order.delivery}
                          </div>
                          <button className="border border-[#8B7355] text-[#8B7355] text-[12px] lg:text-[14px] font-medium px-4 lg:px-[20px] py-[7px] lg:py-[8px] rounded-[8px] cursor-pointer hover:bg-[#8B7355] hover:text-white transition-all self-start sm:self-auto">
                            Track Order
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order History */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[32px] mb-5 md:mb-6 lg:mb-[32px]">
              <h3 className="text-[17px] md:text-[18px] lg:text-[20px] font-semibold text-[#1A1A1A] mb-5 lg:mb-[24px]">Order History</h3>
              <div className="space-y-[10px] lg:space-y-[12px]">
                {orderHistory.map((order, idx) => (
                  <div key={idx} className="flex items-center justify-between py-3 lg:py-[16px] border-b border-[#F5F1EA]">
                    <div className="flex items-center gap-3 lg:gap-[12px]">
                      <IoCheckmarkCircle className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#8B7355]" />
                      <div>
                        <div className="text-[13px] lg:text-[15px] font-normal text-[#2B2B2B]">{order.date}</div>
                        <div className="text-[12px] lg:text-[13px] font-light text-[#666666]">{order.status}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 lg:gap-[24px]">
                      <span className="text-[14px] lg:text-[16px] font-medium text-[#1A1A1A]">{order.total}</span>
                      <button className="flex items-center gap-[6px] text-[12px] lg:text-[14px] font-normal text-[#8B7355] cursor-pointer hover:underline">
                        <IoReloadOutline className="w-[14px] h-[14px] lg:w-[16px] lg:h-[16px]" /> Reorder
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 lg:mt-[20px] text-[13px] lg:text-[15px] font-normal text-[#8B7355] cursor-pointer hover:underline">
                View Full History
              </button>
            </div>

            {/* Wishlist */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[32px] mb-5 md:mb-6 lg:mb-[32px]">
              <div className="flex items-center justify-between mb-5 lg:mb-[24px]">
                <h3 className="text-[17px] md:text-[18px] lg:text-[20px] font-semibold text-[#1A1A1A]">Wishlist</h3>
                <Link to="/wishlist"><button className="text-[13px] lg:text-[15px] font-normal text-[#8B7355] cursor-pointer hover:underline">View All 12 Items</button></Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-[16px]">
                {wishlistProducts.map((product, idx) => (
                  <div key={idx} className="cursor-pointer group">
                    <div className="relative mb-3 lg:mb-[12px]">
                      <img src={product.image} alt={product.name} className="w-full h-[130px] md:h-[140px] lg:h-[160px] object-cover rounded-[8px] group-hover:scale-105 transition-transform duration-300" />
                      <button className="absolute bottom-[6px] right-[6px] lg:bottom-[8px] lg:right-[8px] w-[28px] h-[28px] lg:w-[32px] lg:h-[32px] bg-white rounded-full flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.15)] cursor-pointer">
                        <IoAddCircleOutline className="w-[16px] h-[16px] lg:w-[20px] lg:h-[20px] text-[#8B7355]" />
                      </button>
                    </div>
                    <div className="text-[11px] lg:text-[12px] font-light italic text-[#8B7355] mb-[4px]">{product.brand}</div>
                    <div className="text-[13px] lg:text-[15px] font-medium text-[#1A1A1A] mb-[4px] line-clamp-2">{product.name}</div>
                    <div className="text-[14px] lg:text-[16px] font-semibold text-[#2B2B2B]">{product.price}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Beauty Profile Snapshot */}
            <div className="bg-gradient-to-br from-[#FDFBF7] to-[#F5F1EA] rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[32px] mb-5 md:mb-6 lg:mb-[32px]">
              <div className="flex items-start justify-between mb-5 lg:mb-[24px]">
                <div>
                  <h3 className="text-[17px] md:text-[18px] lg:text-[20px] font-semibold text-[#1A1A1A] mb-[8px]">Beauty Profile</h3>
                  <div className="flex items-center gap-[8px] text-[12px] lg:text-[14px] font-normal text-[#666666]">
                    <IoSparkles className="w-[14px] h-[14px] lg:w-[16px] lg:h-[16px] text-[#C9A870]" />
                    Last Analysis: Dec 1, 2024
                  </div>
                </div>
                <Link to="/skin-analysis">
                  <button className="bg-[#8B7355] text-white text-[12px] lg:text-[14px] font-medium px-4 lg:px-[24px] py-[8px] lg:py-[10px] rounded-[8px] cursor-pointer hover:bg-[#7a6448] transition-colors whitespace-nowrap">
                    New Analysis
                  </button>
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-3 lg:gap-[20px] mb-5 lg:mb-[24px]">
                {[{ label: 'Hydration Level', value: 78 }, { label: 'Skin Firmness', value: 82 }, { label: 'Radiance Score', value: 85 }].map((metric) => (
                  <div key={metric.label} className="bg-white rounded-[8px] p-3 lg:p-[20px] text-center">
                    <div className="text-[20px] md:text-[24px] lg:text-[28px] font-bold text-[#8B7355] mb-[4px]">{metric.value}%</div>
                    <div className="text-[11px] md:text-[12px] lg:text-[13px] font-normal text-[#666666] leading-tight">{metric.label}</div>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-[8px] p-4 lg:p-[16px]">
                <div className="text-[13px] lg:text-[14px] font-medium text-[#1A1A1A] mb-[8px]">Primary Concerns</div>
                <div className="flex gap-[8px] flex-wrap">
                  {['Fine Lines', 'Hydration'].map((concern) => (
                    <div key={concern} className="bg-[#FDFBF7] text-[#8B7355] text-[12px] lg:text-[13px] font-normal px-[10px] lg:px-[12px] py-[5px] lg:py-[6px] rounded-full border border-[#E8E3D9]">{concern}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* Loyalty Program */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[32px] mb-5 md:mb-6 lg:mb-[32px]">
              <div className="flex items-center gap-3 lg:gap-[12px] mb-4 lg:mb-[20px]">
                <IoRibbonOutline className="w-[24px] h-[24px] lg:w-[28px] lg:h-[28px] text-[#C9A870]" />
                <h3 className="text-[17px] md:text-[18px] lg:text-[20px] font-semibold text-[#1A1A1A]">Loyalty Program</h3>
              </div>
              <div className="text-center mb-5 lg:mb-[24px]">
                <div className="text-[26px] md:text-[28px] lg:text-[32px] font-bold text-[#8B7355] mb-[4px]">2,450 Points</div>
                <div className="text-[13px] lg:text-[14px] font-normal text-[#666666]">Current Balance</div>
              </div>
              <div className="bg-[#FDFBF7] rounded-[8px] p-4 lg:p-[20px] mb-4 lg:mb-[20px]">
                <div className="flex items-center justify-between mb-3 lg:mb-[12px]">
                  <span className="text-[13px] lg:text-[14px] font-normal text-[#666666]">Elite to Prestige</span>
                  <span className="text-[13px] lg:text-[14px] font-medium text-[#8B7355]">550 points away</span>
                </div>
                <div className="w-full h-[7px] lg:h-[8px] bg-white rounded-full overflow-hidden">
                  <div className="w-[70%] h-full bg-[#C9A870] rounded-full" />
                </div>
              </div>
              <div className="flex items-center justify-center gap-[8px] bg-[#8B7355] text-white text-[13px] lg:text-[14px] font-medium px-[20px] py-[11px] lg:py-[12px] rounded-[8px] cursor-pointer hover:bg-[#7a6448] transition-colors">
                <IoSparkles className="w-[16px] h-[16px] lg:w-[18px] lg:h-[18px]" />
                3 Rewards Ready to Claim
              </div>
            </div>

            {/* Saved Routines */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[32px] mb-5 md:mb-6 lg:mb-[32px]">
              <div className="flex items-center justify-between mb-5 lg:mb-[24px]">
                <h3 className="text-[17px] md:text-[18px] lg:text-[20px] font-semibold text-[#1A1A1A]">Saved Routines</h3>
                <Link to="/beauty-journey"><button className="text-[13px] lg:text-[15px] font-normal text-[#8B7355] cursor-pointer hover:underline">View All Routines</button></Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-[20px]">
                {routines.map((routine) => (
                  <div key={routine.name} className="border border-[#E8E3D9] rounded-[8px] p-4 lg:p-[20px] hover:border-[#C9A870] transition-colors">
                    <h4 className="text-[15px] lg:text-[16px] font-medium text-[#1A1A1A] mb-[8px]">{routine.name}</h4>
                    <div className="text-[12px] lg:text-[13px] font-normal text-[#666666] mb-4 lg:mb-[16px]">{routine.productCount} products · Last used {routine.lastUsed}</div>
                    <div className="flex gap-[6px] lg:gap-[8px]">
                      {routine.images.map((img, idx) => (
                        <img key={idx} src={img} alt="Product" className="w-[52px] h-[52px] lg:w-[60px] lg:h-[60px] object-cover rounded-[6px]" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Reviews */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[32px] mb-5 md:mb-6 lg:mb-[32px]">
              <div className="flex items-center justify-between mb-5 lg:mb-[24px]">
                <h3 className="text-[17px] md:text-[18px] lg:text-[20px] font-semibold text-[#1A1A1A]">Recent Reviews</h3>
                <button className="text-[13px] lg:text-[15px] font-normal text-[#8B7355] cursor-pointer hover:underline">View All Reviews</button>
              </div>
              <div className="space-y-4 lg:space-y-[20px] mb-5 lg:mb-[24px]">
                {reviews.map((review, idx) => (
                  <div key={idx} className="border border-[#E8E3D9] rounded-[8px] p-4 lg:p-[20px]">
                    <div className="flex gap-3 lg:gap-[16px]">
                      <img src={review.image} alt={review.product} className="w-[64px] h-[64px] lg:w-[80px] lg:h-[80px] object-cover rounded-[8px] flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-[14px] lg:text-[16px] font-medium text-[#1A1A1A] mb-[8px]">{review.product}</div>
                        <div className="flex items-center gap-[4px] mb-[8px]">
                          {[...Array(5)].map((_, i) => <IoStarSharp key={i} className="w-[13px] h-[13px] lg:w-[16px] lg:h-[16px] text-[#C9A870]" />)}
                        </div>
                        <p className="text-[12px] lg:text-[14px] font-normal text-[#666666] mb-[8px] line-clamp-2">{review.excerpt}</p>
                        <div className="text-[11px] lg:text-[13px] font-light text-[#999999]">{review.date}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full bg-[#8B7355] text-white text-[14px] lg:text-[15px] font-medium py-3 lg:py-[12px] rounded-[8px] cursor-pointer hover:bg-[#7a6448] transition-colors">
                Write a Review
              </button>
            </div>

            {/* Account Settings */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[32px]">
              <h3 className="text-[17px] md:text-[18px] lg:text-[20px] font-semibold text-[#1A1A1A] mb-5 lg:mb-[24px]">Account Settings</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-[16px]">
                {settingsItems.map((item) => (
                  <div key={item.label} className="border border-[#E8E3D9] rounded-[8px] p-4 lg:p-[20px] cursor-pointer hover:border-[#C9A870] hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] transition-all">
                    <div className="flex items-start justify-between">
                      <div>
                        <item.icon className="w-[22px] h-[22px] lg:w-[24px] lg:h-[24px] text-[#8B7355] mb-3 lg:mb-[12px]" />
                        <div className="text-[13px] lg:text-[15px] font-medium text-[#1A1A1A] mb-[4px]">{item.label}</div>
                        {item.count && <div className="text-[12px] lg:text-[13px] font-normal text-[#666666]">{item.count}</div>}
                      </div>
                      <IoChevronForward className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#999999]" />
                    </div>
                  </div>
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