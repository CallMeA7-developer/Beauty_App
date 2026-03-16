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
  IoLockClosedOutline,
  IoTimeOutline,
  IoDownloadOutline,
  IoWarningOutline,
  IoDocumentTextOutline,
  IoCheckmark,
} from 'react-icons/io5'

export default function Privacy() {
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

  const [privacyControls, setPrivacyControls] = useState([
    { id: 'personal-data', title: 'Personal Data Usage', description: 'Allow Shan Loray to personalize your experience', enabled: true },
    { id: 'marketing', title: 'Marketing Communications Consent', description: 'Receive personalized product recommendations', enabled: true },
    { id: 'cookies', title: 'Cookies & Tracking', description: 'Accept cookies for enhanced browsing experience', enabled: true },
    { id: 'third-party', title: 'Third-Party Data Sharing', description: 'Share data with trusted beauty partners', enabled: false },
  ])

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const toggleControl = (id) => {
    setPrivacyControls(privacyControls.map(c => c.id === id ? { ...c, enabled: !c.enabled } : c))
  }

  const Toggle = ({ enabled, onToggle }) => (
    <div
      onClick={onToggle}
      className={`w-[52px] h-[28px] rounded-full cursor-pointer flex items-center px-[3px] transition-all duration-200 flex-shrink-0 ${enabled ? 'bg-[#8B7355] justify-end' : 'bg-[#E8E3D9] justify-start'}`}
    >
      <div className="w-[22px] h-[22px] rounded-full bg-white shadow-sm" />
    </div>
  )

  return (
    <div className="bg-white font-['Cormorant_Garamond']">

      {/* ── Breadcrumb ── */}
      <div className="min-h-[48px] bg-[#FDFBF7] px-[120px] flex items-center">
        <span className="text-[15px] font-normal text-[#8B7355] cursor-pointer">Home</span>
        <span className="text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[15px] font-normal text-[#8B7355] cursor-pointer">Account Dashboard</span>
        <span className="text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[15px] font-normal text-[#666666]">Privacy Settings</span>
      </div>

      {/* ── Hero ── */}
      <div className="min-h-[140px] bg-gradient-to-b from-[#FDFBF7] to-white flex flex-col items-center justify-center px-[120px]">
        <div className="max-w-[1200px] w-full">
          <h1 className="text-[48px] font-semibold text-[#1A1A1A]">Privacy Settings</h1>
          <p className="text-[18px] font-normal text-[#666666] mt-[8px]">Manage your data privacy and security preferences</p>
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

            {/* Info Banner */}
            <div className="bg-[#F5F1EA] rounded-[12px] p-[24px] flex items-center gap-[16px] mb-[24px]">
              <IoShieldCheckmarkOutline className="w-[28px] h-[28px] text-[#8B7355] flex-shrink-0" />
              <p className="text-[15px] font-normal text-[#666666] leading-[1.6]">
                Your privacy is important to us. Control how your data is collected, used, and shared.
              </p>
            </div>

            {/* ── Data Privacy Controls ── */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[32px] mb-[24px]">
              <h2 className="text-[24px] font-semibold text-[#1A1A1A] mb-[24px]">Data Privacy Controls</h2>
              <div>
                {privacyControls.map((control) => (
                  <div key={control.id} className="flex items-center justify-between py-[14px] border-b border-[#F5F1EA] last:border-0 gap-4">
                    <div className="flex-1">
                      <h3 className="text-[16px] font-medium text-[#1A1A1A] mb-[4px]">{control.title}</h3>
                      <p className="text-[13px] font-normal text-[#666666]">{control.description}</p>
                    </div>
                    <Toggle enabled={control.enabled} onToggle={() => toggleControl(control.id)} />
                  </div>
                ))}
              </div>
            </div>

            {/* ── Account Security ── */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[32px] mb-[24px]">
              <h2 className="text-[24px] font-semibold text-[#1A1A1A] mb-[24px]">Account Security</h2>
              <div className="space-y-[4px]">

                {/* Change Password */}
                <div className="flex items-center justify-between py-[16px] border-b border-[#F5F1EA]">
                  <div className="flex items-center gap-[16px]">
                    <div className="w-[48px] h-[48px] rounded-full bg-[#FDFBF7] flex items-center justify-center flex-shrink-0">
                      <IoLockClosedOutline className="w-[24px] h-[24px] text-[#8B7355]" />
                    </div>
                    <div>
                      <h3 className="text-[16px] font-medium text-[#1A1A1A] mb-[4px]">Change Password</h3>
                      <p className="text-[13px] font-normal text-[#666666]">Update your account password</p>
                    </div>
                  </div>
                  <button className="bg-white border-[1.5px] border-[#E8E3D9] text-[#666666] text-[14px] font-medium px-[24px] py-[10px] rounded-[8px] cursor-pointer hover:border-[#8B7355] hover:text-[#8B7355] transition-all flex-shrink-0">
                    Update
                  </button>
                </div>

                {/* Two-Factor Auth */}
                <div className="flex items-center justify-between py-[16px] border-b border-[#F5F1EA]">
                  <div className="flex items-center gap-[16px]">
                    <div className="w-[48px] h-[48px] rounded-full bg-[#FDFBF7] flex items-center justify-center flex-shrink-0">
                      <IoShieldCheckmarkOutline className="w-[24px] h-[24px] text-[#8B7355]" />
                    </div>
                    <div>
                      <h3 className="text-[16px] font-medium text-[#1A1A1A] mb-[4px]">Two-Factor Authentication</h3>
                      <p className="text-[13px] font-normal text-[#666666]">
                        {twoFactorEnabled ? 'Currently active — your account is extra secure' : 'Add an extra security layer to your account'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                    className={`text-[14px] font-medium px-[24px] py-[10px] rounded-[8px] cursor-pointer transition-all flex-shrink-0 flex items-center gap-2 ${twoFactorEnabled ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-[#C9A870] text-white hover:bg-[#b8974f]'}`}
                  >
                    {twoFactorEnabled && <IoCheckmark className="w-[16px] h-[16px]" />}
                    {twoFactorEnabled ? 'Enabled' : 'Enable'}
                  </button>
                </div>

                {/* Login History */}
                <div className="flex items-center justify-between py-[16px]">
                  <div className="flex items-center gap-[16px]">
                    <div className="w-[48px] h-[48px] rounded-full bg-[#FDFBF7] flex items-center justify-center flex-shrink-0">
                      <IoTimeOutline className="w-[24px] h-[24px] text-[#8B7355]" />
                    </div>
                    <div>
                      <h3 className="text-[16px] font-medium text-[#1A1A1A] mb-[4px]">Login History</h3>
                      <p className="text-[13px] font-normal text-[#666666]">View recent account activity</p>
                    </div>
                  </div>
                  <span className="text-[14px] font-medium text-[#8B7355] cursor-pointer hover:underline flex-shrink-0">
                    View Details
                  </span>
                </div>
              </div>
            </div>

            {/* ── Data Management ── */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[32px] mb-[24px]">
              <h2 className="text-[24px] font-semibold text-[#1A1A1A] mb-[24px]">Data Management</h2>
              <div className="flex gap-[16px] mb-[16px]">
                <button className="flex-1 h-[56px] bg-white border-[1.5px] border-[#E8E3D9] text-[#666666] text-[15px] font-medium rounded-[8px] cursor-pointer flex items-center justify-center gap-[10px] hover:border-[#8B7355] hover:text-[#8B7355] transition-all">
                  <IoDownloadOutline className="w-[20px] h-[20px]" />
                  Download My Data
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(!showDeleteConfirm)}
                  className="flex-1 h-[56px] bg-white border-[1.5px] border-[#E8E3D9] text-[#C84848] text-[15px] font-medium rounded-[8px] cursor-pointer flex items-center justify-center gap-[10px] hover:border-[#C84848] hover:bg-red-50 transition-all"
                >
                  <IoWarningOutline className="w-[20px] h-[20px]" />
                  Request Account Deletion
                </button>
              </div>

              {showDeleteConfirm && (
                <div className="bg-red-50 border border-red-200 rounded-[8px] p-[20px] mb-[16px]">
                  <p className="text-[14px] font-medium text-red-700 mb-[12px]">⚠️ This will permanently delete your account and all associated data. This action cannot be undone.</p>
                  <div className="flex gap-[12px]">
                    <button className="h-[40px] px-[24px] bg-red-600 text-white text-[14px] font-medium rounded-[8px] cursor-pointer hover:bg-red-700 transition-colors">
                      Confirm Deletion
                    </button>
                    <button onClick={() => setShowDeleteConfirm(false)} className="h-[40px] px-[24px] bg-white border border-red-200 text-red-600 text-[14px] font-medium rounded-[8px] cursor-pointer hover:bg-red-50 transition-colors">
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              <p className="text-[13px] font-normal text-[#999999]">
                Downloaded data includes orders, preferences, and profile information
              </p>
            </div>

            {/* ── Privacy Policy Link ── */}
            <div className="bg-[#F5F1EA] rounded-[12px] p-[24px] flex items-center gap-[16px] mb-[24px]">
              <IoDocumentTextOutline className="w-[24px] h-[24px] text-[#8B7355] flex-shrink-0" />
              <div className="flex-1">
                <span className="text-[16px] font-medium text-[#8B7355] underline cursor-pointer hover:text-[#7a6448] transition-colors block mb-[4px]">
                  View Our Complete Privacy Policy
                </span>
                <p className="text-[13px] font-normal text-[#666666]">Last updated: December 2024</p>
              </div>
            </div>

            {/* Save Button */}
            <button className="w-full h-[56px] bg-[#8B7355] text-white text-[16px] font-medium rounded-[8px] cursor-pointer hover:bg-[#7a6448] transition-colors mb-[24px] flex items-center justify-center gap-2">
              <IoCheckmark className="w-[20px] h-[20px]" />
              Save Preferences
            </button>

            {/* Security Badge */}
            <div className="bg-[#F5F1EA] rounded-[12px] p-[16px] flex items-center gap-[12px]">
              <IoShieldCheckmarkOutline className="w-[20px] h-[20px] text-[#8B7355] flex-shrink-0" />
              <p className="text-[13px] font-normal text-[#666666] leading-[1.6]">
                All changes are encrypted and secured with bank-level security protocols.
              </p>
            </div>

          </div>
        </div>
      </div>

      <div className="h-[80px]" />
    </div>
  )
}