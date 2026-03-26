import {
  IoBagOutline,
  IoCheckmark,
  IoLocationOutline,
  IoMailOutline,
  IoChatbubbleEllipsesOutline,
  IoHelpCircleOutline,
  IoChevronForward,
  IoCopyOutline,
  IoOpenOutline,
  IoPersonOutline,
  IoBagCheckOutline,
  IoHeartOutline,
  IoSparkles,
  IoRibbonOutline,
  IoCalendarOutline,
  IoStarSharp,
  IoSettingsOutline,
} from 'react-icons/io5'
import {
  getNavItems,
  trackingOrders  as recentOrders,
  deliveryUpdates,
  trackingStages,
} from '../data/user'

const NAV_ICONS = {
  person: IoPersonOutline, bag: IoBagCheckOutline, heart: IoHeartOutline,
  sparkles: IoSparkles, ribbon: IoRibbonOutline, calendar: IoCalendarOutline,
  star: IoStarSharp, settings: IoSettingsOutline,
}

export default function OrderTracking() {
  const navigationItems = getNavItems('orders', NAV_ICONS)

  return (
    <div className="bg-white font-['Cormorant_Garamond']">

      {/* ── Hero ── */}
      <div className="min-h-[140px] md:min-h-[170px] lg:min-h-[200px] bg-gradient-to-b from-[#FDFBF7] to-white flex flex-col items-center justify-center px-4 md:px-[60px] lg:px-[120px] py-6 md:py-0">
        <div className="max-w-[1200px] w-full">
          <div className="text-[12px] lg:text-[13px] font-light text-[#666666] mb-3 lg:mb-[16px]">
            Home / Account Dashboard / Track Order
          </div>
          <h1 className="text-[28px] md:text-[38px] lg:text-[48px] font-semibold text-[#1A1A1A]">Track Your Order</h1>
          <p className="text-[14px] md:text-[16px] lg:text-[18px] font-normal text-[#666666] mt-[8px]">Real-time tracking information for your Shan Loray orders</p>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="px-4 md:px-[60px] lg:px-[120px] py-6 md:py-10 lg:py-[48px]">
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-[40px]">

          {/* ── Sidebar ── */}
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
                {[{ label: 'Total Orders', value: '24' }, { label: 'In Transit', value: '2' }, { label: 'Delivered', value: '22' }].map((stat) => (
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

            {/* Order Status Timeline */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[40px] mb-5 lg:mb-[24px]">
              <div className="mb-5 lg:mb-[32px]">
                <h3 className="text-[17px] md:text-[18px] lg:text-[20px] font-semibold text-[#1A1A1A] mb-[4px]">#SL-47821</h3>
                <p className="text-[12px] lg:text-[14px] font-normal text-[#666666]">Placed on Dec 18, 2024</p>
              </div>

              {/* Progress Bar — horizontal on md+, vertical on mobile */}
              <div className="hidden sm:flex items-center justify-between mb-8 lg:mb-[48px]">
                {trackingStages.map((stage, index) => (
                  <div key={stage.label} className="flex items-center flex-1">
                    <div className="flex flex-col items-center">
                      <div className={`w-[24px] h-[24px] lg:w-[28px] lg:h-[28px] rounded-full flex items-center justify-center mb-[10px] lg:mb-[12px] ${
                        stage.completed ? 'bg-[#8B7355]' : stage.active ? 'bg-[#C9A870]' : 'bg-white border-2 border-[#E8E3D9]'
                      }`}>
                        {stage.completed && <IoCheckmark className="w-[14px] h-[14px] lg:w-[18px] lg:h-[18px] text-white" />}
                        {stage.active && !stage.completed && <IoBagOutline className="w-[12px] h-[12px] lg:w-[16px] lg:h-[16px] text-white" />}
                      </div>
                      <div className="text-center">
                        <div className={`text-[11px] md:text-[12px] lg:text-[14px] font-medium mb-[4px] ${stage.active ? 'text-[#1A1A1A]' : 'text-[#999999]'}`}>
                          {stage.label}
                        </div>
                        <div className="text-[10px] lg:text-[12px] font-light text-[#999999]">{stage.time}</div>
                      </div>
                    </div>
                    {index < 3 && (
                      <div className={`flex-1 h-[2px] mx-[8px] lg:mx-[16px] mb-[40px] lg:mb-[48px] ${stage.completed ? 'bg-[#8B7355]' : 'bg-[#E8E3D9]'}`} />
                    )}
                  </div>
                ))}
              </div>

              {/* Mobile vertical timeline */}
              <div className="flex sm:hidden flex-col gap-0 mb-6">
                {trackingStages.map((stage, index) => (
                  <div key={stage.label} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-[22px] h-[22px] rounded-full flex items-center justify-center flex-shrink-0 ${
                        stage.completed ? 'bg-[#8B7355]' : stage.active ? 'bg-[#C9A870]' : 'bg-white border-2 border-[#E8E3D9]'
                      }`}>
                        {stage.completed && <IoCheckmark className="w-[12px] h-[12px] text-white" />}
                        {stage.active && !stage.completed && <IoBagOutline className="w-[11px] h-[11px] text-white" />}
                      </div>
                      {index < 3 && <div className={`w-[2px] flex-1 min-h-[28px] my-[4px] ${stage.completed ? 'bg-[#8B7355]' : 'bg-[#E8E3D9]'}`} />}
                    </div>
                    <div className="pb-4">
                      <div className={`text-[13px] font-medium mb-[2px] ${stage.active ? 'text-[#1A1A1A]' : 'text-[#999999]'}`}>{stage.label}</div>
                      <div className="text-[11px] font-light text-[#999999]">{stage.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Details */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[32px] mb-5 lg:mb-[24px]">
              <h3 className="text-[16px] md:text-[17px] lg:text-[18px] font-semibold text-[#1A1A1A] mb-5 lg:mb-[24px]">Shipping Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-[32px] mb-5 lg:mb-[24px]">
                <div>
                  <div className="mb-4 lg:mb-[20px]">
                    <div className="text-[12px] lg:text-[13px] font-normal text-[#666666] mb-[6px] lg:mb-[8px]">Tracking Number</div>
                    <div className="flex items-center gap-[8px]">
                      <span className="text-[13px] md:text-[14px] lg:text-[16px] font-medium text-[#2B2B2B]">1Z999AA10123456784</span>
                      <IoCopyOutline className="w-[16px] h-[16px] lg:w-[18px] lg:h-[18px] text-[#8B7355] cursor-pointer hover:text-[#7a6448] transition-colors flex-shrink-0" />
                    </div>
                  </div>
                  <div className="mb-4 lg:mb-[20px]">
                    <div className="text-[12px] lg:text-[13px] font-normal text-[#666666] mb-[6px] lg:mb-[8px]">Carrier</div>
                    <div className="text-[14px] lg:text-[16px] font-medium text-[#2B2B2B]">UPS Ground</div>
                  </div>
                  <div>
                    <div className="text-[12px] lg:text-[13px] font-normal text-[#666666] mb-[6px] lg:mb-[8px]">Status</div>
                    <div className="bg-[#C9A870] text-white text-[12px] lg:text-[13px] font-medium px-[10px] lg:px-[12px] py-[5px] lg:py-[6px] rounded-full inline-block">
                      In Transit
                    </div>
                  </div>
                </div>
                <div>
                  <div className="mb-4 lg:mb-[20px]">
                    <div className="text-[12px] lg:text-[13px] font-normal text-[#666666] mb-[6px] lg:mb-[8px]">Estimated Delivery</div>
                    <div className="flex items-center gap-[8px]">
                      <IoCalendarOutline className="w-[16px] h-[16px] lg:w-[18px] lg:h-[18px] text-[#8B7355]" />
                      <span className="text-[14px] lg:text-[16px] font-medium text-[#2B2B2B]">Dec 22, 2024</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-[12px] lg:text-[13px] font-normal text-[#666666] mb-[6px] lg:mb-[8px]">Shipping Address</div>
                    <div className="flex items-start gap-[8px]">
                      <IoLocationOutline className="w-[16px] h-[16px] lg:w-[18px] lg:h-[18px] text-[#8B7355] mt-[2px] flex-shrink-0" />
                      <div className="text-[13px] lg:text-[15px] font-normal text-[#2B2B2B] leading-[1.6]">
                        Alexandra Chen<br />
                        456 Luxury Avenue, Suite 1200<br />
                        Los Angeles, CA 90210
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button className="flex items-center gap-[8px] border border-[#8B7355] text-[#8B7355] text-[13px] lg:text-[14px] font-medium px-5 lg:px-[24px] py-[9px] lg:py-[10px] rounded-[8px] cursor-pointer hover:bg-[#8B7355] hover:text-white transition-all">
                <IoOpenOutline className="w-[16px] h-[16px] lg:w-[18px] lg:h-[18px]" />
                Track with Carrier
              </button>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[32px] mb-5 lg:mb-[24px]">
              <h3 className="text-[16px] md:text-[17px] lg:text-[18px] font-semibold text-[#1A1A1A] mb-4 lg:mb-[24px]">Order Items</h3>
              <div className="flex items-center gap-4 lg:gap-[20px]">
                <img
                  src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200&h=200&fit=crop"
                  alt="Age-Defying Serum"
                  className="w-[72px] h-[72px] md:w-[88px] md:h-[88px] lg:w-[100px] lg:h-[100px] object-cover rounded-[8px] flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] lg:text-[12px] font-light italic text-[#8B7355] mb-[4px]">Shan Loray</div>
                  <h4 className="text-[14px] lg:text-[16px] font-medium text-[#1A1A1A] mb-[8px]">Age-Defying Serum</h4>
                  <div className="flex items-center gap-4 lg:gap-[24px]">
                    <span className="text-[13px] lg:text-[14px] font-normal text-[#666666]">Qty: 1</span>
                    <span className="text-[15px] lg:text-[16px] font-semibold text-[#2B2B2B]">$156.00</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Updates */}
            <div className="bg-[#FDFBF7] rounded-[12px] p-5 md:p-6 lg:p-[32px] mb-5 lg:mb-[24px]">
              <h3 className="text-[16px] md:text-[17px] lg:text-[18px] font-semibold text-[#1A1A1A] mb-5 lg:mb-[24px]">Recent Updates</h3>
              <div className="space-y-5 lg:space-y-[24px]">
                {deliveryUpdates.map((update, index) => (
                  <div key={index} className="flex gap-3 lg:gap-[16px]">
                    <div className="flex flex-col items-center">
                      <div className="w-[28px] h-[28px] lg:w-[32px] lg:h-[32px] bg-white rounded-full flex items-center justify-center border-2 border-[#8B7355] flex-shrink-0">
                        <IoLocationOutline className="w-[14px] h-[14px] lg:w-[16px] lg:h-[16px] text-[#8B7355]" />
                      </div>
                      {index < deliveryUpdates.length - 1 && (
                        <div className="w-[2px] flex-1 min-h-[32px] bg-[#E8E3D9] my-[6px] lg:my-[8px]" />
                      )}
                    </div>
                    <div className="flex-1 pb-[8px]">
                      <div className="text-[11px] lg:text-[13px] font-normal text-[#666666] mb-[4px]">{update.time}</div>
                      <div className="text-[13px] lg:text-[15px] font-normal text-[#2B2B2B] mb-[4px]">{update.description}</div>
                      <div className="text-[11px] lg:text-[13px] font-light text-[#999999]">{update.location}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Need Help */}
            <div className="bg-gradient-to-br from-[#FDFBF7] to-[#F5F1EA] rounded-[12px] p-5 md:p-6 lg:p-[32px] mb-5 lg:mb-[24px]">
              <div className="flex items-center gap-4 lg:gap-[16px] mb-4 lg:mb-[16px]">
                <div className="w-[42px] h-[42px] lg:w-[48px] lg:h-[48px] bg-white rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
                  <IoMailOutline className="w-[20px] h-[20px] lg:w-[24px] lg:h-[24px] text-[#8B7355]" />
                </div>
                <div>
                  <h3 className="text-[16px] lg:text-[20px] font-semibold text-[#1A1A1A] mb-[4px]">Need Help?</h3>
                  <p className="text-[12px] lg:text-[14px] font-normal text-[#666666]">Our customer service team is here to assist you</p>
                </div>
              </div>
              <div className="flex items-center gap-3 lg:gap-[16px]">
                <button className="flex-1 flex items-center justify-center gap-[8px] bg-[#8B7355] text-white text-[13px] lg:text-[15px] font-medium h-[44px] lg:h-[48px] rounded-[8px] cursor-pointer hover:bg-[#7a6448] transition-colors">
                  <IoChatbubbleEllipsesOutline className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px]" />
                  Contact Support
                </button>
                <button className="flex-1 flex items-center justify-center gap-[8px] bg-white border border-[#8B7355] text-[#8B7355] text-[13px] lg:text-[15px] font-medium h-[44px] lg:h-[48px] rounded-[8px] cursor-pointer hover:bg-[#8B7355] hover:text-white transition-all">
                  <IoHelpCircleOutline className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px]" />
                  View FAQs
                </button>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[32px]">
              <h3 className="text-[16px] md:text-[17px] lg:text-[18px] font-semibold text-[#1A1A1A] mb-4 lg:mb-[24px]">Your Recent Orders</h3>
              <div className="space-y-[12px] lg:space-y-[16px] mb-4 lg:mb-[20px]">
                {recentOrders.map((order) => (
                  <div key={order.orderNumber} className="flex items-center justify-between py-3 lg:py-[16px] border-b border-[#F5F1EA]">
                    <div>
                      <div className="text-[13px] lg:text-[15px] font-medium text-[#1A1A1A] mb-[4px]">{order.orderNumber}</div>
                      <div className="text-[12px] lg:text-[13px] font-normal text-[#666666]">{order.date}</div>
                    </div>
                    <div className="flex items-center gap-3 lg:gap-[16px]">
                      <div className={`${order.statusColor} text-white text-[11px] lg:text-[12px] font-medium px-[10px] lg:px-[12px] py-[4px] rounded-full`}>
                        {order.status}
                      </div>
                      <button className="border border-[#8B7355] text-[#8B7355] text-[12px] lg:text-[14px] font-medium px-3 lg:px-[16px] py-[5px] lg:py-[6px] rounded-[8px] cursor-pointer hover:bg-[#8B7355] hover:text-white transition-all">
                        Track
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full text-[13px] lg:text-[15px] font-medium text-[#8B7355] cursor-pointer flex items-center justify-center gap-[6px] hover:underline">
                View All Orders
                <IoChevronForward className="w-[14px] h-[14px] lg:w-[16px] lg:h-[16px]" />
              </button>
            </div>

          </div>
        </div>
      </div>

      <div className="h-[40px] md:h-[60px] lg:h-[80px]" />
    </div>
  )
}