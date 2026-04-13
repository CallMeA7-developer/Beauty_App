import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  IoPhonePortraitOutline,
  IoShieldCheckmarkOutline,
  IoCheckmark,
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
import { getNavItems, initialAddressForm } from '../data/user'

const NAV_ICONS = {
  person: IoPersonOutline, bag: IoBagCheckOutline, heart: IoHeartOutline,
  sparkles: IoSparkles, ribbon: IoRibbonOutline, calendar: IoCalendarOutline,
  star: IoStarSharp, settings: IoSettingsOutline,
}

export default function EditAddress() {
  const navigationItems = getNavItems('settings', NAV_ICONS)

  const [form, setForm] = useState(initialAddressForm)

  const update = (field, value) => setForm({ ...form, [field]: value })

  const inputClass = "w-full h-[48px] lg:h-[56px] border border-[#E8E3D9] rounded-[8px] px-[16px] text-[14px] lg:text-[15px] font-normal text-[#1A1A1A] outline-none focus:border-[#8B7355] transition-colors"
  const labelClass = "text-[13px] lg:text-[14px] font-medium text-[#1A1A1A] block mb-[6px] lg:mb-[8px]"

  return (
    <div className="bg-white font-['Cormorant_Garamond']">

      {/* ── Breadcrumb ── */}
      <div className="min-h-[48px] bg-[#FDFBF7] px-4 md:px-[60px] lg:px-[120px] flex items-center overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        <span className="text-[13px] lg:text-[15px] font-normal text-[#8B7355] cursor-pointer whitespace-nowrap">Home</span>
        <span className="text-[13px] lg:text-[15px] font-normal text-[#666666] mx-2">/</span>
        <Link to="/dashboard"><span className="hidden sm:inline text-[13px] lg:text-[15px] font-normal text-[#8B7355] cursor-pointer whitespace-nowrap">Account</span></Link>
        <span className="hidden sm:inline text-[13px] lg:text-[15px] font-normal text-[#666666] mx-2">/</span>
        <Link to="/shipping-address"><span className="hidden md:inline text-[13px] lg:text-[15px] font-normal text-[#8B7355] cursor-pointer whitespace-nowrap">Shipping Addresses</span></Link>
        <span className="hidden md:inline text-[13px] lg:text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[13px] lg:text-[15px] font-normal text-[#666666] whitespace-nowrap">Edit Address</span>
      </div>

      {/* ── Hero ── */}
      <div className="min-h-[100px] md:min-h-[120px] lg:min-h-[140px] bg-gradient-to-b from-[#FDFBF7] to-white flex flex-col items-center justify-center px-4 md:px-[60px] lg:px-[120px] py-6 md:py-0">
        <div className="max-w-[1200px] w-full">
          <h1 className="text-[28px] md:text-[38px] lg:text-[48px] font-semibold text-[#1A1A1A]">Edit Shipping Address</h1>
          <p className="text-[14px] md:text-[16px] lg:text-[18px] font-normal text-[#666666] mt-[8px]">Update your delivery information</p>
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

          {/* ── Edit Form ── */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[40px]">
              <div className="space-y-4 lg:space-y-[24px]">

                {/* Address Label */}
                <div>
                  <label className={labelClass}>Address Label</label>
                  <input type="text" value={form.label} onChange={(e) => update('label', e.target.value)} className={inputClass} />
                </div>

                {/* Full Name */}
                <div>
                  <label className={labelClass}>Full Name <span className="text-[#C9A870]">*</span></label>
                  <input type="text" value={form.fullName} onChange={(e) => update('fullName', e.target.value)} className={inputClass} />
                </div>

                {/* Phone */}
                <div>
                  <label className={labelClass}>Phone Number <span className="text-[#C9A870]">*</span></label>
                  <div className="relative">
                    <IoPhonePortraitOutline className="absolute left-[16px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#666666]" />
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update('phone', e.target.value)}
                      className={inputClass + ' pl-[48px]'}
                    />
                  </div>
                </div>

                {/* Address Line 1 */}
                <div>
                  <label className={labelClass}>Address Line 1 <span className="text-[#C9A870]">*</span></label>
                  <input type="text" value={form.address1} onChange={(e) => update('address1', e.target.value)} className={inputClass} />
                </div>

                {/* Address Line 2 */}
                <div>
                  <label className="text-[13px] lg:text-[14px] font-medium text-[#666666] block mb-[6px] lg:mb-[8px]">
                    Address Line 2 <span className="font-light">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={form.address2}
                    onChange={(e) => update('address2', e.target.value)}
                    placeholder="Apartment, suite, unit, etc."
                    className={inputClass}
                  />
                </div>

                {/* City / State */}
                <div className="grid grid-cols-1 sm:grid-cols-[60%_1fr] gap-4 lg:gap-[16px]">
                  <div>
                    <label className={labelClass}>City <span className="text-[#C9A870]">*</span></label>
                    <input type="text" value={form.city} onChange={(e) => update('city', e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>State / Region <span className="text-[#C9A870]">*</span></label>
                    <div className="relative">
                      <input
                        type="text"
                        value={form.state}
                        onChange={(e) => update('state', e.target.value)}
                        className={inputClass + ' pr-[40px]'}
                      />
                      <IoChevronDown className="absolute right-[16px] top-1/2 -translate-y-1/2 w-[16px] h-[16px] lg:w-[18px] lg:h-[18px] text-[#666666] pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Postal / Country */}
                <div className="grid grid-cols-1 sm:grid-cols-[40%_1fr] gap-4 lg:gap-[16px]">
                  <div>
                    <label className={labelClass}>Postal Code <span className="text-[#C9A870]">*</span></label>
                    <input type="text" value={form.postalCode} onChange={(e) => update('postalCode', e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Country <span className="text-[#C9A870]">*</span></label>
                    <div className="relative">
                      <select
                        value={form.country}
                        onChange={(e) => update('country', e.target.value)}
                        className={inputClass + ' appearance-none cursor-pointer pr-[40px]'}
                      >
                        <option>United States</option>
                        <option>Canada</option>
                        <option>United Kingdom</option>
                        <option>Australia</option>
                        <option>United Arab Emirates</option>
                        <option>Russia</option>
                        <option>France</option>
                        <option>Germany</option>
                      </select>
                      <IoChevronDown className="absolute right-[16px] top-1/2 -translate-y-1/2 w-[16px] h-[16px] lg:w-[18px] lg:h-[18px] text-[#666666] pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Set as Default */}
                <div className="flex items-center gap-[12px] cursor-pointer" onClick={() => update('isDefault', !form.isDefault)}>
                  <div className={`w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] border-2 rounded-[4px] flex items-center justify-center flex-shrink-0 transition-colors ${form.isDefault ? 'bg-[#8B7355] border-[#8B7355]' : 'bg-white border-[#E8E3D9]'}`}>
                    {form.isDefault && <IoCheckmark className="w-[12px] h-[12px] lg:w-[14px] lg:h-[14px] text-white" />}
                  </div>
                  <span className="text-[13px] lg:text-[15px] font-normal text-[#3D3D3D] select-none">Set as default shipping address</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="border-t border-[#E8E3D9] mt-6 lg:mt-[32px] pt-5 lg:pt-[32px]">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 lg:gap-[16px]">
                  <Link to="/shipping-address" className="sm:flex-shrink-0">
                    <button className="w-full sm:w-auto bg-white border border-[#E8E3D9] text-[#666666] text-[14px] lg:text-[15px] font-medium px-6 lg:px-[32px] py-[12px] lg:py-[14px] rounded-[8px] cursor-pointer hover:border-[#8B7355] hover:text-[#8B7355] transition-all">
                      Cancel
                    </button>
                  </Link>
                  <button className="w-full sm:w-auto bg-[#8B7355] text-white text-[14px] lg:text-[15px] font-medium px-6 lg:px-[40px] py-[12px] lg:py-[14px] rounded-[8px] flex items-center justify-center gap-[8px] cursor-pointer hover:bg-[#7a6448] transition-colors">
                    <IoCheckmark className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px]" />
                    Save Address
                  </button>
                </div>
              </div>
            </div>

            {/* Security Banner */}
            <div className="mt-5 lg:mt-[32px] bg-gradient-to-b from-[#F5F1EA] to-white rounded-[12px] p-5 lg:p-[28px] flex items-center gap-4 lg:gap-[16px]">
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