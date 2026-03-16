import { Link } from 'react-router-dom'
import {
  IoPersonOutline,
  IoHeartOutline,
  IoBagOutline,
  IoSparkles,
  IoBagCheckOutline,
  IoCameraOutline,
  IoChevronForward,
  IoDocumentTextOutline,
  IoRibbonOutline,
  IoCalendarOutline,
  IoLogOutOutline,
  IoSettingsOutline,
  IoNotificationsOutline,
  IoLocationOutline,
  IoCardOutline,
  IoStarSharp,
} from 'react-icons/io5'

export default function Profile() {
  const quickActions = [
    { icon: IoBagCheckOutline, label: 'Orders', path: '/orders' },
    { icon: IoHeartOutline, label: 'Wishlist', path: '/wishlist' },
    { icon: IoCameraOutline, label: 'Beauty Profile', path: '/skin-analysis' },
    { icon: IoCalendarOutline, label: 'Routines', path: '/beauty-journey' },
  ]

  const menuSections = [
    {
      title: 'My Account',
      items: [
        { icon: IoPersonOutline, label: 'Account Dashboard', path: '/account' },
        { icon: IoDocumentTextOutline, label: 'Order History', path: '/orders', badge: null },
        { icon: IoHeartOutline, label: 'My Wishlist', path: '/wishlist', badge: '12 items' },
        { icon: IoLocationOutline, label: 'Shipping Addresses', path: '/shipping', badge: null },
        { icon: IoCardOutline, label: 'Payment Methods', path: '/payment-methods', badge: null },
      ],
    },
    {
      title: 'Beauty',
      items: [
        { icon: IoSparkles, label: 'Beauty Profile', path: '/skin-analysis', badge: null },
        { icon: IoRibbonOutline, label: 'Loyalty Program', path: '/loyalty', badge: '2,450 pts', badgeColor: 'bg-[#8B7355]' },
        { icon: IoCalendarOutline, label: 'My Routines', path: '/beauty-journey', badge: null },
        { icon: IoStarSharp, label: 'Reviews & Ratings', path: '/reviews', badge: null },
      ],
    },
    {
      title: 'Settings',
      items: [
        { icon: IoSettingsOutline, label: 'Account Settings', path: '/settings', badge: null },
        { icon: IoNotificationsOutline, label: 'Notifications', path: '/notifications', badge: '3 new', badgeColor: 'bg-[#C9A870]' },
      ],
    },
  ]

  const recentOrders = [
    { id: '#SL-47821', date: 'Dec 18, 2024', status: 'In Transit', product: 'Age-Defying Serum', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=80&h=80&fit=crop', price: '$124' },
    { id: '#SL-47809', date: 'Dec 15, 2024', status: 'Processing', product: 'Vitamin C Brightening', image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=80&h=80&fit=crop', price: '$95' },
    { id: '#SL-47795', date: 'Dec 5, 2024', status: 'Delivered', product: 'Hydrating Essence', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=80&h=80&fit=crop', price: '$78' },
  ]

  const statusColor = (status) => {
    if (status === 'Delivered') return 'text-green-600 bg-green-50'
    if (status === 'In Transit') return 'text-blue-600 bg-blue-50'
    return 'text-yellow-600 bg-yellow-50'
  }

  return (
    <div className="bg-[#FDFBF7] font-['Cormorant_Garamond'] min-h-screen">

      {/* ── Hero Welcome Banner ── */}
      <div className="min-h-[280px] bg-gradient-to-b from-[#F5F1EA] to-[#FDFBF7] px-[120px] flex items-center">
        <div className="flex items-center gap-[48px] w-full">
          {/* Avatar */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop"
              alt="User Avatar"
              className="w-[160px] h-[160px] rounded-full object-cover border-4 border-[#C9A870] shadow-[0_8px_32px_rgba(139,115,85,0.2)]"
            />
            <button className="absolute bottom-2 right-2 w-[40px] h-[40px] bg-[#8B7355] text-white rounded-full flex items-center justify-center shadow-md hover:bg-[#7a6448] transition-colors">
              <IoCameraOutline className="w-[20px] h-[20px]" />
            </button>
          </div>

          {/* Info */}
          <div className="flex-1">
            <p className="text-[14px] font-light italic text-[#8B7355] tracking-[2px] mb-2">YOUR BEAUTY PROFILE</p>
            <h1 className="text-[56px] font-bold text-[#1A1A1A] leading-[1.1] mb-2">Alexandra Chen</h1>
            <p className="text-[16px] font-light italic text-[#8B7355] mb-4">Elite Member Since 2023</p>
            <p className="text-[16px] font-normal text-[#666666]">alexandra.chen@email.com</p>
          </div>

          {/* Points Badge */}
          <div className="bg-white border-2 border-[#C9A870] rounded-[16px] p-[32px] text-center shadow-[0_4px_16px_rgba(201,168,112,0.15)]">
            <IoSparkles className="w-[40px] h-[40px] text-[#C9A870] mx-auto mb-3" />
            <div className="text-[40px] font-bold text-[#8B7355] mb-1">2,450</div>
            <div className="text-[15px] font-normal text-[#666666]">Loyalty Points</div>
            <button className="mt-4 px-5 h-[40px] bg-[#8B7355] text-white text-[13px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">
              Redeem
            </button>
          </div>
        </div>
      </div>

      {/* ── Breadcrumb ── */}
      <div className="min-h-[48px] bg-white px-[120px] flex items-center border-b border-[#E8E3D9]">
        <span className="text-[15px] font-normal text-[#8B7355] cursor-pointer">Home</span>
        <span className="text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[15px] font-normal text-[#666666]">My Profile</span>
      </div>

      {/* ── Main Content ── */}
      <div className="px-[120px] py-[64px]">
        <div className="flex gap-[40px]">

          {/* ── Sidebar Menu ── */}
          <div className="w-[360px] flex-shrink-0 space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-[16px] border border-[#E8E3D9] shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-[28px]">
              <h3 className="text-[16px] font-medium text-[#1A1A1A] mb-5">Quick Access</h3>
              <div className="grid grid-cols-4 gap-[12px]">
                {quickActions.map((action) => (
                  <Link key={action.label} to={action.path}>
                    <div className="flex flex-col items-center justify-center h-[80px] bg-[#F5F1EA] rounded-[8px] cursor-pointer hover:bg-[#8B7355] group transition-all duration-300">
                      <action.icon className="w-[24px] h-[24px] text-[#8B7355] group-hover:text-white mb-2 transition-colors" />
                      <span className="text-[12px] font-normal text-[#8B7355] group-hover:text-white transition-colors text-center">{action.label}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Menu Sections */}
            {menuSections.map((section) => (
              <div key={section.title} className="bg-white rounded-[16px] border border-[#E8E3D9] shadow-[0_4px_16px_rgba(0,0,0,0.06)] overflow-hidden">
                <div className="px-[28px] py-[16px] bg-[#FDFBF7] border-b border-[#E8E3D9]">
                  <h3 className="text-[14px] font-medium text-[#8B7355] tracking-[1px] uppercase">{section.title}</h3>
                </div>
                <div className="px-[12px] py-[8px]">
                  {section.items.map((item) => (
                    <Link key={item.label} to={item.path}>
                      <div className="flex items-center justify-between h-[52px] px-[16px] rounded-[8px] cursor-pointer hover:bg-[#FDFBF7] transition-colors">
                        <div className="flex items-center gap-[14px]">
                          <item.icon className="w-[20px] h-[20px] text-[#8B7355]" />
                          <span className="text-[15px] font-normal text-[#2B2B2B]">{item.label}</span>
                        </div>
                        {item.badge ? (
                          <div className={`${item.badgeColor || 'bg-[#C9A870]'} text-white text-[11px] font-normal px-[10px] py-[3px] rounded-full`}>
                            {item.badge}
                          </div>
                        ) : (
                          <IoChevronForward className="w-[16px] h-[16px] text-[#999999]" />
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            {/* Sign Out */}
            <div className="bg-white rounded-[16px] border border-[#E8E3D9] shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-[20px]">
              <button className="w-full h-[52px] bg-white border border-[#E8E3D9] rounded-[8px] flex items-center justify-center gap-[10px] cursor-pointer hover:border-[#8B7355] group transition-colors">
                <IoLogOutOutline className="w-[20px] h-[20px] text-[#666666] group-hover:text-[#8B7355] transition-colors" />
                <span className="text-[15px] font-medium text-[#666666] group-hover:text-[#8B7355] transition-colors">Sign Out</span>
              </button>
            </div>
          </div>

          {/* ── Main Panel ── */}
          <div className="flex-1 space-y-6">

            {/* Skin Score Card */}
            <div className="bg-white rounded-[16px] border border-[#E8E3D9] shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-[32px]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[28px] font-medium text-[#1A1A1A]">Skin Health Overview</h2>
                <Link to="/skin-analysis">
                  <button className="px-5 h-[40px] bg-[#F5F1EA] text-[#8B7355] text-[14px] font-medium rounded-[8px] hover:bg-[#8B7355] hover:text-white transition-all">
                    View Full Analysis
                  </button>
                </Link>
              </div>
              <div className="flex items-center gap-[48px]">
                <div className="text-center">
                  <div className="text-[72px] font-bold text-[#8B7355] leading-none mb-2">85</div>
                  <div className="text-[16px] font-normal text-[#666666]">Skin Score</div>
                </div>
                <div className="flex-1 grid grid-cols-2 gap-[16px]">
                  {[
                    { label: 'Hydration', value: '92%' },
                    { label: 'Texture', value: '78%' },
                    { label: 'Clarity', value: '88%' },
                    { label: 'Tone Evenness', value: '81%' },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <div className="flex justify-between mb-2">
                        <span className="text-[14px] font-normal text-[#666666]">{stat.label}</span>
                        <span className="text-[14px] font-semibold text-[#8B7355]">{stat.value}</span>
                      </div>
                      <div className="w-full h-[8px] bg-[#E8E3D9] rounded-full overflow-hidden">
                        <div className="h-full bg-[#8B7355] rounded-full" style={{ width: stat.value }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-[16px] border border-[#E8E3D9] shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-[32px]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[28px] font-medium text-[#1A1A1A]">Recent Orders</h2>
                <Link to="/order-tracking">
                  <button className="px-5 h-[40px] bg-[#F5F1EA] text-[#8B7355] text-[14px] font-medium rounded-[8px] hover:bg-[#8B7355] hover:text-white transition-all">
                    View All Orders
                  </button>
                </Link>
              </div>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center gap-[16px] bg-[#FDFBF7] rounded-[12px] p-[16px]">
                    <img src={order.image} alt={order.product} className="w-[72px] h-[72px] object-cover rounded-[8px]" />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-[14px] font-medium text-[#8B7355]">{order.id}</span>
                        <span className={`text-[11px] font-medium px-3 py-1 rounded-full ${statusColor(order.status)}`}>{order.status}</span>
                      </div>
                      <h4 className="text-[16px] font-medium text-[#1A1A1A] mb-1">{order.product}</h4>
                      <p className="text-[13px] font-normal text-[#999999]">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-[18px] font-semibold text-[#1A1A1A] mb-2">{order.price}</div>
                      <button className="text-[13px] font-medium text-[#8B7355] hover:underline">Track</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Loyalty Program */}
            <div className="bg-gradient-to-r from-[#F5F1EA] to-[#FDFBF7] rounded-[16px] border border-[#E8E3D9] p-[32px]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[28px] font-medium text-[#1A1A1A]">Loyalty Program</h2>
                <span className="px-4 py-2 bg-[#8B7355] text-white text-[13px] font-medium rounded-full">Elite Member</span>
              </div>
              <div className="flex items-center gap-[32px] mb-6">
                <div className="text-center">
                  <div className="text-[48px] font-bold text-[#8B7355] mb-1">2,450</div>
                  <div className="text-[14px] font-normal text-[#666666]">Current Points</div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-2">
                    <span className="text-[14px] font-normal text-[#666666]">Progress to Gold Status</span>
                    <span className="text-[14px] font-semibold text-[#8B7355]">550 points to go</span>
                  </div>
                  <div className="w-full h-[12px] bg-[#E8E3D9] rounded-full overflow-hidden">
                    <div className="h-full bg-[#8B7355] rounded-full" style={{ width: '82%' }} />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-[12px] font-normal text-[#999999]">Elite (2,000)</span>
                    <span className="text-[12px] font-normal text-[#999999]">Gold (3,000)</span>
                  </div>
                </div>
              </div>
              <button className="h-[48px] px-8 bg-[#8B7355] text-white text-[15px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">
                Redeem Points
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}