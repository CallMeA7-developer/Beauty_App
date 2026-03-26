import { useState } from 'react'
import {
  IoPhonePortraitOutline,
  IoShieldCheckmarkOutline,
  IoAddOutline,
  IoLocationOutline,
  IoCreateOutline,
  IoTrashOutline,
  IoCheckmarkCircle,
  IoChevronDown,
  IoPersonOutline,
  IoBagCheckOutline,
  IoHeartOutline,
  IoSparkles,
  IoRibbonOutline,
  IoCalendarOutline,
  IoStarSharp,
  IoSettingsOutline,
} from 'react-icons/io5'
import { getNavItems, initialAddresses } from '../data/user'

const NAV_ICONS = {
  person: IoPersonOutline, bag: IoBagCheckOutline, heart: IoHeartOutline,
  sparkles: IoSparkles, ribbon: IoRibbonOutline, calendar: IoCalendarOutline,
  star: IoStarSharp, settings: IoSettingsOutline,
}

export default function ShippingAddress() {
  const navigationItems = getNavItems('settings', NAV_ICONS)

  const [addresses, setAddresses] = useState(initialAddresses)

  const [showForm, setShowForm] = useState(false)

  const setDefault     = (id) => setAddresses(addresses.map(a => ({ ...a, isDefault: a.id === id })))
  const deleteAddress  = (id) => setAddresses(addresses.filter(a => a.id !== id))

  const inputClass = "w-full h-[44px] lg:h-[48px] px-[16px] border-[1.5px] border-[#E8E3D9] rounded-[8px] text-[13px] lg:text-[15px] font-normal text-[#1A1A1A] outline-none focus:border-[#8B7355] transition-colors"
  const labelClass = "text-[12px] lg:text-[14px] font-medium text-[#666666] mb-[6px] lg:mb-[8px] block"

  return (
    <div className="bg-white font-['Cormorant_Garamond']">

      {/* ── Breadcrumb ── */}
      <div className="min-h-[48px] bg-[#FDFBF7] px-4 md:px-[60px] lg:px-[120px] flex items-center overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        <span className="text-[13px] lg:text-[15px] font-normal text-[#8B7355] cursor-pointer whitespace-nowrap">Home</span>
        <span className="text-[13px] lg:text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="hidden sm:inline text-[13px] lg:text-[15px] font-normal text-[#8B7355] cursor-pointer whitespace-nowrap">Account Dashboard</span>
        <span className="hidden sm:inline text-[13px] lg:text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[13px] lg:text-[15px] font-normal text-[#666666] whitespace-nowrap">Shipping Addresses</span>
      </div>

      {/* ── Hero ── */}
      <div className="min-h-[100px] md:min-h-[120px] lg:min-h-[140px] bg-gradient-to-b from-[#FDFBF7] to-white flex flex-col items-center justify-center px-4 md:px-[60px] lg:px-[120px] py-6 md:py-0">
        <div className="max-w-[1200px] w-full">
          <h1 className="text-[28px] md:text-[38px] lg:text-[48px] font-semibold text-[#1A1A1A]">Shipping Addresses</h1>
          <p className="text-[14px] md:text-[16px] lg:text-[18px] font-normal text-[#666666] mt-[8px]">Manage your delivery locations</p>
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

            {/* Add New Address Button */}
            <button
              onClick={() => setShowForm(!showForm)}
              className="w-full h-[48px] lg:h-[56px] bg-[#8B7355] text-white text-[14px] lg:text-[16px] font-medium rounded-[8px] flex items-center justify-center gap-[10px] mb-6 lg:mb-[32px] cursor-pointer hover:bg-[#7a6448] transition-colors"
            >
              <IoAddOutline className="w-[20px] h-[20px] lg:w-[22px] lg:h-[22px]" />
              Add New Address
            </button>

            {/* Add New Address Form */}
            {showForm && (
              <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[32px] mb-6 lg:mb-[32px] border-l-4 border-[#C9A870]">
                <h3 className="text-[18px] md:text-[20px] lg:text-[22px] font-semibold text-[#1A1A1A] mb-5 lg:mb-[24px]">New Address</h3>
                <div className="space-y-4 lg:space-y-[16px]">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-[16px]">
                    <div>
                      <label className={labelClass}>Address Label</label>
                      <input type="text" placeholder="e.g. Home, Office" className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Recipient Name</label>
                      <input type="text" placeholder="Full name" className={inputClass} />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Street Address</label>
                    <input type="text" placeholder="Street address" className={inputClass} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-[16px]">
                    <div>
                      <label className={labelClass}>Apartment / Suite</label>
                      <input type="text" placeholder="Apt, Suite, etc." className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>City</label>
                      <input type="text" placeholder="City" className={inputClass} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-[16px]">
                    <div>
                      <label className={labelClass}>State / Province</label>
                      <input type="text" placeholder="State" className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Postal Code</label>
                      <input type="text" placeholder="ZIP" className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Country</label>
                      <div className="relative">
                        <select className={inputClass + ' appearance-none cursor-pointer pr-[40px]'}>
                          <option>United States</option>
                          <option>Canada</option>
                          <option>United Kingdom</option>
                          <option>Australia</option>
                          <option>United Arab Emirates</option>
                        </select>
                        <IoChevronDown className="absolute right-[14px] top-1/2 -translate-y-1/2 w-[15px] h-[15px] lg:w-[16px] lg:h-[16px] text-[#8B7355] pointer-events-none" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Phone Number</label>
                    <input type="tel" placeholder="+1 (555) 000-0000" className={inputClass} />
                  </div>
                  <div className="flex items-center gap-[12px]">
                    <input type="checkbox" id="makeDefault" className="w-[18px] h-[18px] accent-[#8B7355] cursor-pointer" />
                    <label htmlFor="makeDefault" className="text-[13px] lg:text-[14px] font-normal text-[#666666] cursor-pointer">Set as default address</label>
                  </div>
                  <div className="flex gap-4 lg:gap-[16px] pt-[8px]">
                    <button className="flex-1 h-[48px] lg:h-[52px] bg-[#8B7355] text-white text-[14px] lg:text-[15px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">
                      Save Address
                    </button>
                    <button
                      onClick={() => setShowForm(false)}
                      className="flex-1 h-[48px] lg:h-[52px] bg-white border border-[#E8E3D9] text-[#666666] text-[14px] lg:text-[15px] font-medium rounded-[8px] hover:border-[#8B7355] hover:text-[#8B7355] transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Saved Addresses */}
            <div className="space-y-5 lg:space-y-[24px]">
              {addresses.map((address) => (
                <div key={address.id} className={`bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[32px] hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-all ${address.isDefault ? 'border-l-4 border-[#8B7355]' : ''}`}>

                  {/* Header */}
                  <div className="flex items-center justify-between mb-4 lg:mb-[20px]">
                    <div className="flex items-center gap-3 lg:gap-[12px]">
                      <IoLocationOutline className="w-[20px] h-[20px] lg:w-[22px] lg:h-[22px] text-[#8B7355]" />
                      <h3 className="text-[16px] lg:text-[18px] font-medium text-[#1A1A1A]">{address.label}</h3>
                    </div>
                    {address.isDefault && (
                      <div className="flex items-center gap-[6px] bg-[#F5F1EA] text-[#8B7355] text-[11px] lg:text-[12px] font-medium px-[10px] lg:px-[12px] py-[5px] lg:py-[6px] rounded-full">
                        <IoCheckmarkCircle className="w-[13px] h-[13px] lg:w-[14px] lg:h-[14px]" />
                        Default
                      </div>
                    )}
                  </div>

                  {/* Address Details */}
                  <div className="space-y-[6px] lg:space-y-[8px] mb-5 lg:mb-[24px] pl-[28px] lg:pl-[34px]">
                    <div className="text-[14px] lg:text-[16px] font-medium text-[#1A1A1A]">{address.recipient}</div>
                    <div className="text-[13px] lg:text-[15px] font-normal text-[#3D3D3D]">{address.street}</div>
                    <div className="text-[13px] lg:text-[15px] font-normal text-[#3D3D3D]">{address.cityStateZip}</div>
                    <div className="text-[12px] lg:text-[14px] font-normal text-[#666666]">{address.country}</div>
                    <div className="flex items-center gap-[8px] text-[13px] lg:text-[15px] font-normal text-[#666666]">
                      <IoPhonePortraitOutline className="w-[14px] h-[14px] lg:w-[16px] lg:h-[16px]" />
                      {address.phone}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="border-t border-[#E8E3D9] pt-4 lg:pt-[20px]">
                    <div className="flex items-center gap-2 lg:gap-[12px] flex-wrap">
                      {!address.isDefault && (
                        <button
                          onClick={() => setDefault(address.id)}
                          className="bg-white border border-[#8B7355] text-[#8B7355] text-[12px] lg:text-[14px] font-medium px-4 lg:px-[20px] py-[8px] lg:py-[10px] rounded-[8px] cursor-pointer hover:bg-[#8B7355] hover:text-white transition-all"
                        >
                          Set as Default
                        </button>
                      )}
                      <button className="flex items-center gap-[6px] lg:gap-[8px] text-[#8B7355] text-[12px] lg:text-[14px] font-medium px-4 lg:px-[20px] py-[8px] lg:py-[10px] rounded-[8px] cursor-pointer hover:bg-[#F5F1EA] transition-colors">
                        <IoCreateOutline className="w-[16px] h-[16px] lg:w-[18px] lg:h-[18px]" />
                        Edit
                      </button>
                      {!address.isDefault && (
                        <button
                          onClick={() => deleteAddress(address.id)}
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
            <div className="mt-6 lg:mt-[32px] bg-gradient-to-b from-[#F5F1EA] to-white rounded-[12px] p-5 lg:p-[28px] flex items-center gap-4 lg:gap-[16px]">
              <IoShieldCheckmarkOutline className="w-[24px] h-[24px] lg:w-[28px] lg:h-[28px] text-[#8B7355] flex-shrink-0" />
              <div>
                <h4 className="text-[15px] lg:text-[18px] font-medium text-[#1A1A1A] mb-[6px]">Secure & Private</h4>
                <p className="text-[12px] lg:text-[14px] font-normal text-[#666666] leading-[1.6]">
                  Your address information is encrypted and never shared with third parties.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="h-[40px] md:h-[60px] lg:h-[80px]" />
    </div>
  )
}