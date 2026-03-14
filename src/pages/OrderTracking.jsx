import {
  IoPersonOutline,
  IoHeartOutline,
  IoSparkles,
  IoBagCheckOutline,
  IoBagOutline,
  IoCalendarOutline,
  IoSettingsOutline,
  IoStarSharp,
  IoRibbonOutline,
  IoCheckmark,
  IoLocationOutline,
  IoMailOutline,
  IoChatbubbleEllipsesOutline,
  IoHelpCircleOutline,
  IoChevronForward,
  IoCopyOutline,
  IoOpenOutline,
} from 'react-icons/io5'

export default function OrderTracking() {
  const navigationItems = [
    { icon: IoPersonOutline, label: 'Account Dashboard', active: false, badge: null },
    { icon: IoBagCheckOutline, label: 'Order History', active: true, badge: null },
    { icon: IoHeartOutline, label: 'Wishlist', active: false, badge: '12' },
    { icon: IoSparkles, label: 'Beauty Profile', active: false, tag: 'Complete Analysis' },
    { icon: IoRibbonOutline, label: 'Loyalty Program', active: false, badge: '2,450' },
    { icon: IoCalendarOutline, label: 'My Routines', active: false, badge: null },
    { icon: IoStarSharp, label: 'Reviews & Ratings', active: false, badge: null },
    { icon: IoSettingsOutline, label: 'Account Settings', active: false, badge: null },
  ]

  const recentOrders = [
    { orderNumber: '#SL-47809', date: 'Dec 15, 2024', status: 'Processing', statusColor: 'bg-[#999999]' },
    { orderNumber: '#SL-47791', date: 'Dec 10, 2024', status: 'Delivered', statusColor: 'bg-[#8B7355]' },
  ]

  const deliveryUpdates = [
    { time: 'Dec 20, 3:24 PM', description: 'Package in transit to local facility', location: 'Los Angeles, CA' },
    { time: 'Dec 19, 2:15 PM', description: 'Departed shipping facility', location: 'Phoenix, AZ' },
    { time: 'Dec 18, 5:30 PM', description: 'Order shipped from warehouse', location: 'Dallas, TX' },
  ]

  const trackingStages = [
    { label: 'Order Confirmed', time: 'Dec 18, 5:15 PM', active: true, completed: true },
    { label: 'Processing', time: 'Dec 18, 6:30 PM', active: true, completed: true },
    { label: 'In Transit', time: 'Dec 20, 3:24 PM', active: true, completed: false },
    { label: 'Delivered', time: 'Expected Dec 22', active: false, completed: false },
  ]

  return (
    <div className="bg-white font-['Cormorant_Garamond']">

      {/* ── Hero ── */}
      <div className="min-h-[200px] bg-gradient-to-b from-[#FDFBF7] to-white flex flex-col items-center justify-center px-[120px]">
        <div className="max-w-[1200px] w-full">
          <div className="text-[13px] font-light text-[#666666] mb-[16px]">
            Home / Account Dashboard / Track Order
          </div>
          <h1 className="text-[48px] font-semibold text-[#1A1A1A]">Track Your Order</h1>
          <p className="text-[18px] font-normal text-[#666666] mt-[8px]">Real-time tracking information for your Shan Loray orders</p>
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
                {[{ label: 'Total Orders', value: '24' }, { label: 'In Transit', value: '2' }, { label: 'Delivered', value: '22' }].map((stat) => (
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

            {/* Order Status Timeline */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[40px] mb-[24px]">
              <div className="mb-[32px]">
                <h3 className="text-[20px] font-semibold text-[#1A1A1A] mb-[4px]">#SL-47821</h3>
                <p className="text-[14px] font-normal text-[#666666]">Placed on Dec 18, 2024</p>
              </div>

              {/* Progress Bar */}
              <div className="flex items-center justify-between mb-[48px]">
                {trackingStages.map((stage, index) => (
                  <div key={stage.label} className="flex items-center flex-1">
                    <div className="flex flex-col items-center">
                      <div className={`w-[28px] h-[28px] rounded-full flex items-center justify-center mb-[12px] ${
                        stage.completed ? 'bg-[#8B7355]' : stage.active ? 'bg-[#C9A870]' : 'bg-white border-2 border-[#E8E3D9]'
                      }`}>
                        {stage.completed && <IoCheckmark className="w-[18px] h-[18px] text-white" />}
                        {stage.active && !stage.completed && <IoBagOutline className="w-[16px] h-[16px] text-white" />}
                      </div>
                      <div className="text-center">
                        <div className={`text-[14px] font-medium mb-[4px] ${stage.active ? 'text-[#1A1A1A]' : 'text-[#999999]'}`}>
                          {stage.label}
                        </div>
                        <div className="text-[12px] font-light text-[#999999]">{stage.time}</div>
                      </div>
                    </div>
                    {index < 3 && (
                      <div className={`flex-1 h-[2px] mx-[16px] mb-[48px] ${stage.completed ? 'bg-[#8B7355]' : 'bg-[#E8E3D9]'}`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Details */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[32px] mb-[24px]">
              <h3 className="text-[18px] font-semibold text-[#1A1A1A] mb-[24px]">Shipping Details</h3>
              <div className="grid grid-cols-2 gap-[32px] mb-[24px]">
                <div>
                  <div className="mb-[20px]">
                    <div className="text-[13px] font-normal text-[#666666] mb-[8px]">Tracking Number</div>
                    <div className="flex items-center gap-[8px]">
                      <span className="text-[16px] font-medium text-[#2B2B2B]">1Z999AA10123456784</span>
                      <IoCopyOutline className="w-[18px] h-[18px] text-[#8B7355] cursor-pointer hover:text-[#7a6448] transition-colors" />
                    </div>
                  </div>
                  <div className="mb-[20px]">
                    <div className="text-[13px] font-normal text-[#666666] mb-[8px]">Carrier</div>
                    <div className="text-[16px] font-medium text-[#2B2B2B]">UPS Ground</div>
                  </div>
                  <div>
                    <div className="text-[13px] font-normal text-[#666666] mb-[8px]">Status</div>
                    <div className="bg-[#C9A870] text-white text-[13px] font-medium px-[12px] py-[6px] rounded-full inline-block">
                      In Transit
                    </div>
                  </div>
                </div>
                <div>
                  <div className="mb-[20px]">
                    <div className="text-[13px] font-normal text-[#666666] mb-[8px]">Estimated Delivery</div>
                    <div className="flex items-center gap-[8px]">
                      <IoCalendarOutline className="w-[18px] h-[18px] text-[#8B7355]" />
                      <span className="text-[16px] font-medium text-[#2B2B2B]">Dec 22, 2024</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-[13px] font-normal text-[#666666] mb-[8px]">Shipping Address</div>
                    <div className="flex items-start gap-[8px]">
                      <IoLocationOutline className="w-[18px] h-[18px] text-[#8B7355] mt-[2px] flex-shrink-0" />
                      <div className="text-[15px] font-normal text-[#2B2B2B] leading-[1.6]">
                        Alexandra Chen<br />
                        456 Luxury Avenue, Suite 1200<br />
                        Los Angeles, CA 90210
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button className="flex items-center gap-[8px] border border-[#8B7355] text-[#8B7355] text-[14px] font-medium px-[24px] py-[10px] rounded-[8px] cursor-pointer hover:bg-[#8B7355] hover:text-white transition-all">
                <IoOpenOutline className="w-[18px] h-[18px]" />
                Track with Carrier
              </button>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[32px] mb-[24px]">
              <h3 className="text-[18px] font-semibold text-[#1A1A1A] mb-[24px]">Order Items</h3>
              <div className="flex items-center gap-[20px]">
                <img
                  src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200&h=200&fit=crop"
                  alt="Age-Defying Serum"
                  className="w-[100px] h-[100px] object-cover rounded-[8px]"
                />
                <div className="flex-1">
                  <div className="text-[12px] font-light italic text-[#8B7355] mb-[4px]">Shan Loray</div>
                  <h4 className="text-[16px] font-medium text-[#1A1A1A] mb-[8px]">Age-Defying Serum</h4>
                  <div className="flex items-center gap-[24px]">
                    <span className="text-[14px] font-normal text-[#666666]">Qty: 1</span>
                    <span className="text-[16px] font-semibold text-[#2B2B2B]">$156.00</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Updates */}
            <div className="bg-[#FDFBF7] rounded-[12px] p-[32px] mb-[24px]">
              <h3 className="text-[18px] font-semibold text-[#1A1A1A] mb-[24px]">Recent Updates</h3>
              <div className="space-y-[24px]">
                {deliveryUpdates.map((update, index) => (
                  <div key={index} className="flex gap-[16px]">
                    <div className="flex flex-col items-center">
                      <div className="w-[32px] h-[32px] bg-white rounded-full flex items-center justify-center border-2 border-[#8B7355] flex-shrink-0">
                        <IoLocationOutline className="w-[16px] h-[16px] text-[#8B7355]" />
                      </div>
                      {index < deliveryUpdates.length - 1 && (
                        <div className="w-[2px] flex-1 min-h-[40px] bg-[#E8E3D9] my-[8px]" />
                      )}
                    </div>
                    <div className="flex-1 pb-[8px]">
                      <div className="text-[13px] font-normal text-[#666666] mb-[4px]">{update.time}</div>
                      <div className="text-[15px] font-normal text-[#2B2B2B] mb-[4px]">{update.description}</div>
                      <div className="text-[13px] font-light text-[#999999]">{update.location}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Need Help */}
            <div className="bg-gradient-to-br from-[#FDFBF7] to-[#F5F1EA] rounded-[12px] p-[32px] mb-[24px]">
              <div className="flex items-center gap-[16px] mb-[16px]">
                <div className="w-[48px] h-[48px] bg-white rounded-full flex items-center justify-center shadow-sm">
                  <IoMailOutline className="w-[24px] h-[24px] text-[#8B7355]" />
                </div>
                <div>
                  <h3 className="text-[20px] font-semibold text-[#1A1A1A] mb-[4px]">Need Help?</h3>
                  <p className="text-[14px] font-normal text-[#666666]">Our customer service team is here to assist you</p>
                </div>
              </div>
              <div className="flex items-center gap-[16px]">
                <button className="flex-1 flex items-center justify-center gap-[8px] bg-[#8B7355] text-white text-[15px] font-medium h-[48px] rounded-[8px] cursor-pointer hover:bg-[#7a6448] transition-colors">
                  <IoChatbubbleEllipsesOutline className="w-[20px] h-[20px]" />
                  Contact Support
                </button>
                <button className="flex-1 flex items-center justify-center gap-[8px] bg-white border border-[#8B7355] text-[#8B7355] text-[15px] font-medium h-[48px] rounded-[8px] cursor-pointer hover:bg-[#8B7355] hover:text-white transition-all">
                  <IoHelpCircleOutline className="w-[20px] h-[20px]" />
                  View FAQs
                </button>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[32px]">
              <h3 className="text-[18px] font-semibold text-[#1A1A1A] mb-[24px]">Your Recent Orders</h3>
              <div className="space-y-[16px] mb-[20px]">
                {recentOrders.map((order) => (
                  <div key={order.orderNumber} className="flex items-center justify-between py-[16px] border-b border-[#F5F1EA]">
                    <div>
                      <div className="text-[15px] font-medium text-[#1A1A1A] mb-[4px]">{order.orderNumber}</div>
                      <div className="text-[13px] font-normal text-[#666666]">{order.date}</div>
                    </div>
                    <div className="flex items-center gap-[16px]">
                      <div className={`${order.statusColor} text-white text-[12px] font-medium px-[12px] py-[4px] rounded-full`}>
                        {order.status}
                      </div>
                      <button className="border border-[#8B7355] text-[#8B7355] text-[14px] font-medium px-[16px] py-[6px] rounded-[8px] cursor-pointer hover:bg-[#8B7355] hover:text-white transition-all">
                        Track
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full text-[15px] font-medium text-[#8B7355] cursor-pointer flex items-center justify-center gap-[6px] hover:underline">
                View All Orders
                <IoChevronForward className="w-[16px] h-[16px]" />
              </button>
            </div>

          </div>
        </div>
      </div>

      <div className="h-[80px]" />
    </div>
  )
}