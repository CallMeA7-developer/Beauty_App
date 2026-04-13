import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  IoShieldCheckmarkOutline,
  IoLockClosedOutline,
  IoTimeOutline,
  IoDownloadOutline,
  IoWarningOutline,
  IoDocumentTextOutline,
  IoCheckmark,
  IoPersonOutline,
  IoBagCheckOutline,
  IoHeartOutline,
  IoSparkles,
  IoStarSharp,
  IoSettingsOutline,
  IoNotificationsOutline,
  IoLocationOutline,
  IoCardOutline,
  IoBodyOutline,
  IoBookOutline,
} from 'react-icons/io5'
import { useAuth } from '../contexts/AuthContext'
import { useWishlist } from '../contexts/WishlistContext'
import { supabase } from '../lib/supabase'

export default function Privacy() {
  const { t, i18n } = useTranslation()
  const { user } = useAuth()
  const { wishlistItems } = useWishlist()

  const [loyaltyPoints, setLoyaltyPoints] = useState(0)
  const [totalOrders, setTotalOrders] = useState(0)
  const [reviewsWritten, setReviewsWritten] = useState(0)

  useEffect(() => {
    if (user) fetchUserStats()
  }, [user])

  const fetchUserStats = async () => {
    const { data: orders } = await supabase.from('orders').select('total').eq('user_id', user.id)
    if (orders) {
      setTotalOrders(orders.length)
      setLoyaltyPoints(orders.reduce((s, o) => s + Math.floor(o.total), 0))
    }
    const { data: reviews } = await supabase.from('reviews').select('id').eq('user_id', user.id)
    if (reviews) setReviewsWritten(reviews.length)
  }

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || t('privacyPage.guest')
  const userInitials = userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

  const navigationItems = [
    { label: 'Account Dashboard', icon: IoPersonOutline, path: '/dashboard' },
    { label: 'Order History', icon: IoBagCheckOutline, path: '/order-tracking' },
    { label: 'My Wishlist', icon: IoHeartOutline, path: '/wishlist' },
    { label: 'Shipping Addresses', icon: IoLocationOutline, path: '/shipping-address' },
    { label: 'Payment Methods', icon: IoCardOutline, path: '/payment-methods' },
    { label: 'Beauty Profile', icon: IoBodyOutline, path: '/skin-analysis' },
    { label: 'Loyalty Program', icon: IoSparkles, path: '/account' },
    { label: 'My Routines', icon: IoBookOutline, path: '/beauty-journey' },
    { label: 'Reviews & Ratings', icon: IoStarSharp, path: '/dashboard' },
    { label: 'Account Settings', icon: IoSettingsOutline, path: '/privacy-settings' },
    { label: 'Notifications', icon: IoNotificationsOutline, path: '/notifications' },
  ].map(item => ({
    ...item,
    label: t(`privacyPage.navItems.${item.label}`, { defaultValue: item.label }),
  }))

  const [privacyControls, setPrivacyControls] = useState([
    { id: 'personal-data', enabled: true },
    { id: 'marketing', enabled: true },
    { id: 'cookies', enabled: true },
    { id: 'third-party', enabled: false },
  ])

  const toggleControl = (id) => {
    setPrivacyControls(prev =>
      prev.map(c => c.id === id ? { ...c, enabled: !c.enabled } : c)
    )
  }

  const Toggle = ({ enabled, onToggle }) => (
    <div onClick={onToggle} className={`w-[46px] h-[26px] rounded-full flex items-center px-[3px] cursor-pointer ${enabled ? 'bg-[#8B7355] justify-end' : 'bg-[#E8E3D9]'}`}>
      <div className="w-[20px] h-[20px] bg-white rounded-full" />
    </div>
  )

  return (
    <div key={i18n.language} className="bg-white font-['Cormorant_Garamond']">

      {/* Title */}
      <div className="px-[120px] py-[40px]">
        <h1 className="text-[42px] font-semibold">{t('privacyPage.title')}</h1>
        <p className="text-[#666] mt-2">{t('privacyPage.subtitle')}</p>
      </div>

      {/* Controls */}
      <div className="px-[120px]">
        <h2 className="text-[24px] mb-4">{t('privacyPage.dataControls')}</h2>

        {privacyControls.map(control => (
          <div key={control.id} className="flex justify-between py-4 border-b">
            <div>
              <h3>{t(`privacyPage.controls.${control.id}.title`)}</h3>
              <p className="text-[#666] text-sm">
                {t(`privacyPage.controls.${control.id}.desc`)}
              </p>
            </div>
            <Toggle enabled={control.enabled} onToggle={() => toggleControl(control.id)} />
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="px-[120px] mt-8 flex gap-4">
        <button className="border px-6 py-3 flex items-center gap-2">
          <IoDownloadOutline />
          {t('privacyPage.download')}
        </button>

        <button className="border px-6 py-3 text-red-500 flex items-center gap-2">
          <IoWarningOutline />
          {t('privacyPage.delete')}
        </button>
      </div>

      {/* Save */}
      <div className="px-[120px] mt-8">
        <button className="bg-[#8B7355] text-white px-8 py-3 flex items-center gap-2">
          <IoCheckmark />
          {t('privacyPage.save')}
        </button>
      </div>

    </div>
  )
}