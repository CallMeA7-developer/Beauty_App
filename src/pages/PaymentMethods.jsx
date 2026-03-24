import { useState } from 'react'
import {
  IoPersonOutline,
  IoHeartOutline,
  IoSparkles,
  IoBagCheckOutline,
  IoCalendarOutline,
  IoSettingsOutline,
  IoStarSharp,
  IoRibbonOutline,
  IoShieldCheckmarkOutline,
  IoAddOutline,
  IoCreateOutline,
  IoTrashOutline,
  IoCardOutline,
  IoCheckmarkCircle,
} from 'react-icons/io5'

export default function PaymentMethods() {
  const navigationItems = [
    { icon: IoPersonOutline,   label: 'Account Dashboard',  active: false, badge: null          },
    { icon: IoBagCheckOutline, label: 'Order History',       active: false, badge: null          },
    { icon: IoHeartOutline,    label: 'Wishlist',             active: false, badge: '12'          },
    { icon: IoSparkles,        label: 'Beauty Profile',       active: false, tag: 'Complete Analysis' },
    { icon: IoRibbonOutline,   label: 'Loyalty Program',      active: false, badge: '2,450'       },
    { icon: IoCalendarOutline, label: 'My Routines',          active: false, badge: null          },
    { icon: IoStarSharp,       label: 'Reviews & Ratings',    active: false, badge: null          },
    { icon: IoSettingsOutline, label: 'Account Settings',     active: true,  badge: null          },
  ]

  const [paymentCards, setPaymentCards] = useState([
    { id: 1, type: 'Visa',       labelColor: 'text-[#1434CB]', labelBg: 'bg-blue-50', cardNumber: '•••• •••• •••• 4532', expiry: '08/2026', cardholder: 'Alexandra Chen', isDefault: true  },
    { id: 2, type: 'Mastercard', labelColor: 'text-[#EB001B]', labelBg: 'bg-red-50',  cardNumber: '•••• •••• •••• 8791', expiry: '12/2025', cardholder: 'Alexandra Chen', isDefault: false },
    { id: 3, type: 'Amex',       labelColor: 'text-[#2E77BC]', labelBg: 'bg-blue-50', cardNumber: '•••• •••••• •7003',   expiry: '03/2027', cardholder: 'Alexandra Chen', isDefault: false },
  ])

  const setDefault = (id) => setPaymentCards(paymentCards.map(card => ({ ...card, isDefault: card.id === id })))
  const deleteCard = (id) => setPaymentCards(paymentCards.filter(card => card.id !== id))

  const trustBadges = [
    { label: 'VISA', sublabel: 'Verified',   color: 'text-[#1434CB]',  bg: 'bg-blue-50'      },
    { label: 'MC',   sublabel: 'SecureCode',  color: 'text-[#EB001B]',  bg: 'bg-red-50'       },
    { label: 'SSL',  sublabel: '256-bit',     color: 'text-green-700',  bg: 'bg-green-50'     },
    { label: 'PCI',  sublabel: 'DSS',         color: 'text-[#8B7355]',  bg: 'bg-[#F5F1EA]'   },
  ]

  return (
    <div className="bg-white font-['Cormorant_Garamond']">

      {/* ── Breadcrumb ── */}
      <div className="min-h-[48px] bg-[#FDFBF7] px-4 md:px-[60px] lg:px-[120px] flex items-center overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        <span className="text-[13px] lg:text-[15px] font-normal text-[#8B7355] cursor-pointer whitespace-nowrap">Home</span>
        <span className="text-[13px] lg:text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="hidden sm:inline text-[13px] lg:text-[15px] font-normal text-[#8B7355] cursor-pointer whitespace-nowrap">Account Dashboard</span>
        <span className="hidden sm:inline text-[13px] lg:text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[13px] lg:text-[15px] font-normal text-[#666666] whitespace-nowrap">Payment Methods</span>
      </div>

      {/* ── Hero ── */}
      <div className="min-h-[100px] md:min-h-[120px] lg:min-h-[140px] bg-gradient-to-b from-[#FDFBF7] to-white flex flex-col items-center justify-center px-4 md:px-[60px] lg:px-[120px] py-6 md:py-0">
        <div className="max-w-[1200px] w-full">
          <h1 className="text-[28px] md:text-[38px] lg:text-[48px] font-semibold text-[#1A1A1A]">Payment Methods</h1>
          <p className="text-[14px] md:text-[16px] lg:text-[18px] font-normal text-[#666666] mt-[8px]">Manage your secure payment options</p>
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

            {/* Add New Button */}
            <button className="w-full h-[48px] lg:h-[56px] bg-[#8B7355] text-white text-[14px] lg:text-[16px] font-medium rounded-[8px] flex items-center justify-center gap-[10px] mb-6 lg:mb-[32px] cursor-pointer hover:bg-[#7a6448] transition-colors">
              <IoAddOutline className="w-[20px] h-[20px] lg:w-[22px] lg:h-[22px]" />
              Add New Payment Method
            </button>

            {/* Cards List */}
            <div className="space-y-5 lg:space-y-[24px]">
              {paymentCards.map((card) => (
                <div key={card.id} className={`bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[32px] transition-all hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] ${card.isDefault ? 'border-l-4 border-[#8B7355]' : ''}`}>

                  {/* Header */}
                  <div className="flex items-center justify-between mb-4 lg:mb-[24px]">
                    <div className="flex items-center gap-3 lg:gap-[16px]">
                      <div className={`w-[56px] h-[36px] lg:w-[64px] lg:h-[40px] rounded-[6px] flex items-center justify-center ${card.labelBg}`}>
                        <span className={`text-[13px] lg:text-[15px] font-bold ${card.labelColor}`}>{card.type}</span>
                      </div>
                      <IoCardOutline className="w-[22px] h-[22px] lg:w-[24px] lg:h-[24px] text-[#666666]" />
                    </div>
                    {card.isDefault && (
                      <div className="flex items-center gap-[6px] bg-[#F5F1EA] text-[#8B7355] text-[11px] lg:text-[12px] font-medium px-[10px] lg:px-[12px] py-[5px] lg:py-[6px] rounded-full">
                        <IoCheckmarkCircle className="w-[13px] h-[13px] lg:w-[14px] lg:h-[14px]" />
                        Default
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="space-y-[8px] lg:space-y-[10px] mb-4 lg:mb-[24px]">
                    <div className="text-[14px] lg:text-[16px] font-medium text-[#1A1A1A]">{card.cardholder}</div>
                    <div className="text-[16px] md:text-[18px] lg:text-[20px] font-normal text-[#3D3D3D] tracking-[4px] lg:tracking-[6px]">{card.cardNumber}</div>
                    <div className="text-[12px] lg:text-[14px] font-normal text-[#666666]">Valid until {card.expiry}</div>
                  </div>

                  {/* Actions */}
                  <div className="border-t border-[#E8E3D9] pt-4 lg:pt-[20px]">
                    <div className="flex items-center gap-2 lg:gap-[12px] flex-wrap">
                      {!card.isDefault && (
                        <button
                          onClick={() => setDefault(card.id)}
                          className="bg-white border border-[#8B7355] text-[#8B7355] text-[12px] lg:text-[14px] font-medium px-4 lg:px-[20px] py-[8px] lg:py-[10px] rounded-[8px] cursor-pointer hover:bg-[#8B7355] hover:text-white transition-all"
                        >
                          Set as Default
                        </button>
                      )}
                      <button className="flex items-center gap-[6px] lg:gap-[8px] text-[#8B7355] text-[12px] lg:text-[14px] font-medium px-4 lg:px-[20px] py-[8px] lg:py-[10px] rounded-[8px] cursor-pointer hover:bg-[#F5F1EA] transition-colors">
                        <IoCreateOutline className="w-[16px] h-[16px] lg:w-[18px] lg:h-[18px]" />
                        Edit
                      </button>
                      {!card.isDefault && (
                        <button
                          onClick={() => deleteCard(card.id)}
                          className="flex items-center gap-[6px] lg:gap-[8px] text-[#999999] text-[12px] lg:text-[14px] font-normal px-4 lg:px-[20px] py-[8px] lg:py-[10px] rounded-[8px] cursor-pointer hover:text-red-500 hover:bg-red-50 transition-all"
                        >
                          <IoTrashOutline className="w-[16px] h-[16px] lg:w-[18px] lg:h-[18px]" />
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Security Banner */}
            <div className="mt-5 lg:mt-[32px] bg-gradient-to-b from-[#F5F1EA] to-white rounded-[12px] p-5 lg:p-[32px] flex items-center gap-4 lg:gap-[16px]">
              <IoShieldCheckmarkOutline className="w-[26px] h-[26px] lg:w-[32px] lg:h-[32px] text-[#8B7355] flex-shrink-0" />
              <div>
                <h4 className="text-[15px] lg:text-[18px] font-medium text-[#1A1A1A] mb-[6px]">Bank-Level Security</h4>
                <p className="text-[12px] lg:text-[14px] font-normal text-[#666666] leading-[1.6]">
                  All payment information is encrypted with 256-bit SSL technology and PCI DSS compliant. Your card details are never stored on our servers.
                </p>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="bg-white rounded-[12px] p-4 lg:p-[24px] mt-4 lg:mt-[16px] shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
              <div className="flex items-center justify-around gap-3 lg:gap-[24px]">
                {trustBadges.map((badge, idx) => (
                  <div key={idx} className={`flex flex-col items-center justify-center w-[68px] h-[44px] lg:w-[80px] lg:h-[48px] rounded-[8px] ${badge.bg}`}>
                    <span className={`text-[12px] lg:text-[14px] font-bold ${badge.color}`}>{badge.label}</span>
                    <span className={`text-[9px] lg:text-[10px] font-normal ${badge.color} opacity-80`}>{badge.sublabel}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="h-[40px] md:h-[60px] lg:h-[80px]" />
    </div>
  )
}