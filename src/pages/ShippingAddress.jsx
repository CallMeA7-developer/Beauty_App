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
  IoPhonePortraitOutline,
  IoShieldCheckmarkOutline,
  IoAddOutline,
  IoLocationOutline,
  IoCreateOutline,
  IoTrashOutline,
  IoCheckmarkCircle,
  IoChevronDown,
} from 'react-icons/io5'

export default function ShippingAddress() {
  const navigationItems = [
    { icon: IoPersonOutline, label: 'Account Dashboard', active: false, badge: null },
    { icon: IoBagCheckOutline, label: 'Order History', active: false, badge: null },
    { icon: IoHeartOutline, label: 'Wishlist', active: false, badge: '12' },
    { icon: IoSparkles, label: 'Beauty Profile', active: false, tag: 'Complete Analysis' },
    { icon: IoRibbonOutline, label: 'Loyalty Program', active: false, badge: '2,450' },
    { icon: IoCalendarOutline, label: 'My Routines', active: false, badge: null },
    { icon: IoStarSharp, label: 'Reviews & Ratings', active: false, badge: null },
    { icon: IoSettingsOutline, label: 'Account Settings', active: true, badge: null },
  ]

  const [addresses, setAddresses] = useState([
    { id: 1, label: 'Home Address', isDefault: true, recipient: 'Alexandra Chen', street: '456 Madison Avenue, Apt 12B', cityStateZip: 'New York, NY 10022', country: 'United States', phone: '+1 (555) 123-4567' },
    { id: 2, label: 'Office', isDefault: false, recipient: 'Alexandra Chen', street: '789 Park Avenue, Suite 3400', cityStateZip: 'New York, NY 10021', country: 'United States', phone: '+1 (555) 987-6543' },
  ])

  const [showForm, setShowForm] = useState(false)

  const setDefault = (id) => {
    setAddresses(addresses.map(a => ({ ...a, isDefault: a.id === id })))
  }

  const deleteAddress = (id) => {
    setAddresses(addresses.filter(a => a.id !== id))
  }

  const inputClass = "w-full h-[48px] px-[16px] border-[1.5px] border-[#E8E3D9] rounded-[8px] text-[15px] font-normal text-[#1A1A1A] outline-none focus:border-[#8B7355] transition-colors"
  const labelClass = "text-[14px] font-medium text-[#666666] mb-[8px] block"

  return (
    <div className="bg-white font-['Cormorant_Garamond']">

      {/* ── Breadcrumb ── */}
      <div className="min-h-[48px] bg-[#FDFBF7] px-[120px] flex items-center">
        <span className="text-[15px] font-normal text-[#8B7355] cursor-pointer">Home</span>
        <span className="text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[15px] font-normal text-[#8B7355] cursor-pointer">Account Dashboard</span>
        <span className="text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[15px] font-normal text-[#666666]">Shipping Addresses</span>
      </div>

      {/* ── Hero ── */}
      <div className="min-h-[140px] bg-gradient-to-b from-[#FDFBF7] to-white flex flex-col items-center justify-center px-[120px]">
        <div className="max-w-[1200px] w-full">
          <h1 className="text-[48px] font-semibold text-[#1A1A1A]">Shipping Addresses</h1>
          <p className="text-[18px] font-normal text-[#666666] mt-[8px]">Manage your delivery locations</p>
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

            {/* Add New Address Button */}
            <button
              onClick={() => setShowForm(!showForm)}
              className="w-full h-[56px] bg-[#8B7355] text-white text-[16px] font-medium rounded-[8px] flex items-center justify-center gap-[10px] mb-[32px] cursor-pointer hover:bg-[#7a6448] transition-colors"
            >
              <IoAddOutline className="w-[22px] h-[22px]" />
              Add New Address
            </button>

            {/* Add New Address Form (collapsible) */}
            {showForm && (
              <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[32px] mb-[32px] border-l-4 border-[#C9A870]">
                <h3 className="text-[22px] font-semibold text-[#1A1A1A] mb-[24px]">New Address</h3>
                <div className="space-y-[16px]">
                  <div className="grid grid-cols-2 gap-[16px]">
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
                  <div className="grid grid-cols-2 gap-[16px]">
                    <div>
                      <label className={labelClass}>Apartment / Suite</label>
                      <input type="text" placeholder="Apt, Suite, etc." className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>City</label>
                      <input type="text" placeholder="City" className={inputClass} />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-[16px]">
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
                        <IoChevronDown className="absolute right-[14px] top-1/2 -translate-y-1/2 w-[16px] h-[16px] text-[#8B7355] pointer-events-none" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Phone Number</label>
                    <input type="tel" placeholder="+1 (555) 000-0000" className={inputClass} />
                  </div>
                  <div className="flex items-center gap-[12px]">
                    <input type="checkbox" id="makeDefault" className="w-[18px] h-[18px] accent-[#8B7355] cursor-pointer" />
                    <label htmlFor="makeDefault" className="text-[14px] font-normal text-[#666666] cursor-pointer">Set as default address</label>
                  </div>
                  <div className="flex gap-[16px] pt-[8px]">
                    <button className="flex-1 h-[52px] bg-[#8B7355] text-white text-[15px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">
                      Save Address
                    </button>
                    <button
                      onClick={() => setShowForm(false)}
                      className="flex-1 h-[52px] bg-white border border-[#E8E3D9] text-[#666666] text-[15px] font-medium rounded-[8px] hover:border-[#8B7355] hover:text-[#8B7355] transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Saved Addresses */}
            <div className="space-y-[24px]">
              {addresses.map((address) => (
                <div key={address.id} className={`bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[32px] hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-all ${address.isDefault ? 'border-l-4 border-[#8B7355]' : ''}`}>
                  {/* Header */}
                  <div className="flex items-center justify-between mb-[20px]">
                    <div className="flex items-center gap-[12px]">
                      <IoLocationOutline className="w-[22px] h-[22px] text-[#8B7355]" />
                      <h3 className="text-[18px] font-medium text-[#1A1A1A]">{address.label}</h3>
                    </div>
                    {address.isDefault && (
                      <div className="flex items-center gap-[6px] bg-[#F5F1EA] text-[#8B7355] text-[12px] font-medium px-[12px] py-[6px] rounded-full">
                        <IoCheckmarkCircle className="w-[14px] h-[14px]" />
                        Default
                      </div>
                    )}
                  </div>

                  {/* Address Details */}
                  <div className="space-y-[8px] mb-[24px] pl-[34px]">
                    <div className="text-[16px] font-medium text-[#1A1A1A]">{address.recipient}</div>
                    <div className="text-[15px] font-normal text-[#3D3D3D]">{address.street}</div>
                    <div className="text-[15px] font-normal text-[#3D3D3D]">{address.cityStateZip}</div>
                    <div className="text-[14px] font-normal text-[#666666]">{address.country}</div>
                    <div className="flex items-center gap-[8px] text-[15px] font-normal text-[#666666]">
                      <IoPhonePortraitOutline className="w-[16px] h-[16px]" />
                      {address.phone}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="border-t border-[#E8E3D9] pt-[20px]">
                    <div className="flex items-center gap-[12px]">
                      {!address.isDefault && (
                        <button
                          onClick={() => setDefault(address.id)}
                          className="bg-white border border-[#8B7355] text-[#8B7355] text-[14px] font-medium px-[20px] py-[10px] rounded-[8px] cursor-pointer hover:bg-[#8B7355] hover:text-white transition-all"
                        >
                          Set as Default
                        </button>
                      )}
                      <button className="flex items-center gap-[8px] text-[#8B7355] text-[14px] font-medium px-[20px] py-[10px] rounded-[8px] cursor-pointer hover:bg-[#F5F1EA] transition-colors">
                        <IoCreateOutline className="w-[18px] h-[18px]" />
                        Edit
                      </button>
                      {!address.isDefault && (
                        <button
                          onClick={() => deleteAddress(address.id)}
                          className="flex items-center gap-[8px] text-[#999999] text-[14px] font-normal px-[20px] py-[10px] rounded-[8px] cursor-pointer hover:text-red-500 hover:bg-red-50 transition-all"
                        >
                          <IoTrashOutline className="w-[18px] h-[18px]" />
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Security Banner */}
            <div className="mt-[32px] bg-gradient-to-b from-[#F5F1EA] to-white rounded-[12px] p-[28px] flex items-center gap-[16px]">
              <IoShieldCheckmarkOutline className="w-[28px] h-[28px] text-[#8B7355] flex-shrink-0" />
              <div>
                <h4 className="text-[18px] font-medium text-[#1A1A1A] mb-[6px]">Secure & Private</h4>
                <p className="text-[14px] font-normal text-[#666666] leading-[1.6]">
                  Your address information is encrypted and never shared with third parties.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="h-[80px]" />
    </div>
  )
}