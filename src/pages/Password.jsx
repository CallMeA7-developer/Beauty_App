import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  IoLockClosedOutline,
  IoShieldCheckmarkOutline,
  IoEyeOutline,
  IoEyeOffOutline,
  IoTimeOutline,
  IoCheckmarkCircle,
  IoCheckmark,
  IoPersonOutline,
  IoBagCheckOutline,
  IoHeartOutline,
  IoSparkles,
  IoRibbonOutline,
  IoCalendarOutline,
  IoStarSharp,
  IoSettingsOutline,
} from 'react-icons/io5'
import { getNavItems, securityTips } from '../data/user'

const NAV_ICONS = {
  person: IoPersonOutline, bag: IoBagCheckOutline, heart: IoHeartOutline,
  sparkles: IoSparkles, ribbon: IoRibbonOutline, calendar: IoCalendarOutline,
  star: IoStarSharp, settings: IoSettingsOutline,
}

export default function Password() {
  const navigationItems = getNavItems('settings', NAV_ICONS)

  const [current, setCurrent]         = useState('')
  const [newPass, setNewPass]         = useState('')
  const [confirm, setConfirm]         = useState('')
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew]         = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const requirements = [
    { text: 'At least 8 characters long',                       met: newPass.length >= 8 },
    { text: 'Contains uppercase and lowercase letters',          met: /[A-Z]/.test(newPass) && /[a-z]/.test(newPass) },
    { text: 'Includes at least one number',                      met: /\d/.test(newPass) },
    { text: 'Contains at least one special character (@$!%*?&)', met: /[@$!%*?&]/.test(newPass) },
    { text: 'Not the same as current password',                  met: newPass.length > 0 && newPass !== current },
    { text: 'Passwords match',                                   met: newPass.length > 0 && newPass === confirm },
  ]

  const metCount = requirements.filter(r => r.met).length
  const strength = metCount <= 2
    ? { label: 'Weak',   color: 'text-red-500',      bar: 'bg-red-400',    width: '25%'  }
    : metCount <= 4
    ? { label: 'Medium', color: 'text-[#E5A84D]',    bar: 'bg-[#E5A84D]', width: '60%'  }
    : { label: 'Strong', color: 'text-green-600',     bar: 'bg-green-500', width: '100%' }

  // securityTips imported from ../data/user

  const inputClass = "w-full bg-white border-[1.5px] border-[#E8E3D9] rounded-[8px] px-[16px] h-[48px] lg:h-[56px] text-[14px] lg:text-[15px] font-normal text-[#1A1A1A] outline-none focus:border-[#8B7355] transition-colors pr-[48px]"

  return (
    <div className="bg-white font-['Cormorant_Garamond']">

      {/* ── Breadcrumb ── */}
      <div className="min-h-[48px] bg-[#FDFBF7] px-4 md:px-[60px] lg:px-[120px] flex items-center overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        <span className="text-[13px] lg:text-[15px] font-normal text-[#8B7355] cursor-pointer whitespace-nowrap">Home</span>
        <span className="text-[13px] lg:text-[15px] font-normal text-[#666666] mx-2">/</span>
        <Link to="/dashboard"><span className="hidden sm:inline text-[13px] lg:text-[15px] font-normal text-[#8B7355] cursor-pointer whitespace-nowrap">Account Dashboard</span></Link>
        <span className="hidden sm:inline text-[13px] lg:text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[13px] lg:text-[15px] font-normal text-[#666666] whitespace-nowrap">Change Password</span>
      </div>

      {/* ── Hero ── */}
      <div className="min-h-[100px] md:min-h-[120px] lg:min-h-[140px] bg-gradient-to-b from-[#FDFBF7] to-white flex flex-col items-center justify-center px-4 md:px-[60px] lg:px-[120px] py-6 md:py-0">
        <div className="max-w-[1200px] w-full">
          <h1 className="text-[28px] md:text-[38px] lg:text-[48px] font-semibold text-[#1A1A1A]">Change Password</h1>
          <p className="text-[14px] md:text-[16px] lg:text-[18px] font-normal text-[#666666] mt-[8px]">Update your account security credentials</p>
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
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=240&h=240&fit=crop" alt="User Avatar"
                  className="w-[90px] h-[90px] md:w-[100px] md:h-[100px] lg:w-[120px] lg:h-[120px] rounded-full object-cover border-[3px] border-[#C9A870] mb-4 lg:mb-[16px]" />
                <h2 className="text-[20px] md:text-[22px] lg:text-[24px] font-semibold text-[#1A1A1A] mb-[4px]">Alexandra Chen</h2>
                <div className="bg-[#C9A870] text-white text-[11px] lg:text-[12px] font-medium px-[14px] lg:px-[16px] py-[5px] lg:py-[6px] rounded-full mb-4 lg:mb-[16px]">Elite Member</div>
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

            {/* Info Banner */}
            <div className="bg-[#F5F1EA] rounded-[12px] p-4 lg:p-[24px] flex items-center gap-4 lg:gap-[16px] mb-5 lg:mb-[24px]">
              <IoLockClosedOutline className="w-[24px] h-[24px] lg:w-[28px] lg:h-[28px] text-[#8B7355] flex-shrink-0" />
              <p className="text-[13px] lg:text-[15px] font-normal text-[#666666] leading-[1.6]">
                Protect your account by choosing a strong, unique password that you don't use elsewhere.
              </p>
            </div>

            {/* Form */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[32px] mb-5 lg:mb-[24px]">
              <h2 className="text-[18px] md:text-[20px] lg:text-[24px] font-semibold text-[#1A1A1A] mb-5 lg:mb-[24px]">Update Password</h2>
              <div className="space-y-5 lg:space-y-[20px]">

                {/* Current Password */}
                <div>
                  <label className="text-[14px] lg:text-[16px] font-medium text-[#1A1A1A] block mb-3 lg:mb-[12px]">Current Password</label>
                  <div className="relative">
                    <input
                      type={showCurrent ? 'text' : 'password'}
                      value={current}
                      onChange={(e) => setCurrent(e.target.value)}
                      placeholder="Enter current password"
                      className={inputClass}
                    />
                    <button onClick={() => setShowCurrent(!showCurrent)} className="absolute right-[16px] top-1/2 -translate-y-1/2 cursor-pointer">
                      {showCurrent
                        ? <IoEyeOffOutline className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#666666]" />
                        : <IoEyeOutline    className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#666666]" />}
                    </button>
                  </div>
                  <span className="text-[12px] lg:text-[13px] font-normal text-[#8B7355] underline cursor-pointer hover:text-[#7a6448] transition-colors inline-block mt-[8px]">
                    Forgot password?
                  </span>
                </div>

                {/* New Password */}
                <div>
                  <label className="text-[14px] lg:text-[16px] font-medium text-[#1A1A1A] block mb-3 lg:mb-[12px]">New Password</label>
                  <div className="relative">
                    <input
                      type={showNew ? 'text' : 'password'}
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      placeholder="Enter new password"
                      className={inputClass}
                    />
                    <button onClick={() => setShowNew(!showNew)} className="absolute right-[16px] top-1/2 -translate-y-1/2 cursor-pointer">
                      {showNew
                        ? <IoEyeOffOutline className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#666666]" />
                        : <IoEyeOutline    className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#666666]" />}
                    </button>
                  </div>
                  {newPass.length > 0 && (
                    <div className="mt-[10px]">
                      <div className="w-full h-[6px] bg-[#F5F1EA] rounded-full overflow-hidden">
                        <div className={`h-full rounded-full transition-all duration-300 ${strength.bar}`} style={{ width: strength.width }} />
                      </div>
                      <div className="flex justify-end mt-[4px]">
                        <span className={`text-[12px] lg:text-[13px] font-medium ${strength.color}`}>Strength: {strength.label}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="text-[14px] lg:text-[16px] font-medium text-[#1A1A1A] block mb-3 lg:mb-[12px]">Confirm New Password</label>
                  <div className="relative">
                    <input
                      type={showConfirm ? 'text' : 'password'}
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      placeholder="Confirm new password"
                      className={inputClass}
                    />
                    <button onClick={() => setShowConfirm(!showConfirm)} className="absolute right-[16px] top-1/2 -translate-y-1/2 cursor-pointer">
                      {showConfirm
                        ? <IoEyeOffOutline className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#666666]" />
                        : <IoEyeOutline    className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#666666]" />}
                    </button>
                  </div>
                  {confirm.length > 0 && newPass !== confirm && (
                    <p className="text-[12px] lg:text-[13px] text-red-500 mt-[6px]">Passwords do not match</p>
                  )}
                  {confirm.length > 0 && newPass === confirm && (
                    <p className="text-[12px] lg:text-[13px] text-green-600 mt-[6px] flex items-center gap-1">
                      <IoCheckmarkCircle className="w-[13px] h-[13px] lg:w-[14px] lg:h-[14px]" /> Passwords match
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-[#F5F1EA] rounded-[12px] p-4 lg:p-[24px] mb-5 lg:mb-[24px]">
              <h3 className="text-[14px] lg:text-[16px] font-medium text-[#1A1A1A] mb-4 lg:mb-[16px]">Password Requirements</h3>
              <div className="space-y-[10px]">
                {requirements.map((req, idx) => (
                  <div key={idx} className="flex items-center gap-3 lg:gap-[12px]">
                    <IoCheckmarkCircle className={`w-[15px] h-[15px] lg:w-[16px] lg:h-[16px] flex-shrink-0 transition-colors ${req.met ? 'text-green-600' : 'text-[#E8E3D9]'}`} />
                    <span className={`text-[12px] lg:text-[14px] font-normal transition-colors ${req.met ? 'text-[#1A1A1A]' : 'text-[#999999]'}`}>{req.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Tips */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 lg:p-[28px] mb-5 lg:mb-[24px]">
              <h2 className="text-[17px] md:text-[18px] lg:text-[20px] font-semibold text-[#1A1A1A] mb-4 lg:mb-[20px]">Security Tips</h2>
              <div className="space-y-[12px] lg:space-y-[14px]">
                {securityTips.map((tip, idx) => (
                  <div key={idx} className="flex items-start gap-3 lg:gap-[12px]">
                    <IoShieldCheckmarkOutline className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#8B7355] flex-shrink-0 mt-[2px]" />
                    <p className="text-[13px] lg:text-[14px] font-normal text-[#666666]">{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 lg:gap-[16px] mb-5 lg:mb-[24px]">
              <Link to="/dashboard" className="flex-1">
                <button className="w-full h-[48px] lg:h-[56px] bg-white border-[1.5px] border-[#E8E3D9] text-[#666666] text-[14px] lg:text-[16px] font-medium rounded-[8px] cursor-pointer hover:border-[#8B7355] hover:text-[#8B7355] transition-all">
                  Cancel
                </button>
              </Link>
              <button className="flex-1 h-[48px] lg:h-[56px] bg-[#8B7355] text-white text-[14px] lg:text-[16px] font-medium rounded-[8px] cursor-pointer hover:bg-[#7a6448] transition-colors flex items-center justify-center gap-2">
                <IoCheckmark className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px]" />
                Update Password
              </button>
            </div>

            {/* Last Changed */}
            <div className="bg-[#FDFBF7] rounded-[12px] p-4 lg:p-[20px] flex items-center gap-3 lg:gap-[12px] mb-5 lg:mb-[24px]">
              <IoTimeOutline className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#8B7355] flex-shrink-0" />
              <span className="text-[12px] lg:text-[14px] font-normal text-[#666666]">Last password change: November 15, 2024</span>
            </div>

            {/* Security Badge */}
            <div className="bg-[#F5F1EA] rounded-[12px] p-4 lg:p-[16px] flex items-center gap-3 lg:gap-[12px]">
              <IoShieldCheckmarkOutline className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#8B7355] flex-shrink-0" />
              <p className="text-[12px] lg:text-[13px] font-normal text-[#666666] leading-[1.6]">
                All password changes are encrypted and secured with industry-standard protocols.
              </p>
            </div>

          </div>
        </div>
      </div>

      <div className="h-[40px] md:h-[60px] lg:h-[80px]" />
    </div>
  )
}