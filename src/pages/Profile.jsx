import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
import { useAuth } from '../contexts/AuthContext'
import { useWishlist } from '../contexts/WishlistContext'
import { supabase } from '../lib/supabase'
import LoadingSpinner from '../components/LoadingSpinner'
import { useTranslation } from 'react-i18next'

export default function Profile() {
  const { t, i18n } = useTranslation()
  const { user, signOut } = useAuth()
  const { wishlistItems } = useWishlist()
  const navigate = useNavigate()

  const [recentOrders, setRecentOrders] = useState([])
  const [loyaltyPoints, setLoyaltyPoints] = useState(0)
  const [skinAnalysis, setSkinAnalysis] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) fetchUserData()
  }, [user])

  async function fetchUserData() {
    const { data: orders } = await supabase.from('orders').select('*').eq('user_id', user.id).limit(3)
    setRecentOrders(orders || [])
    setLoading(false)
  }

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  const userName = user?.email || 'User'
  const wishlistCount = wishlistItems?.length || 0

  const quickActions = [
    { icon: IoBagCheckOutline, label: t('profile.quickAccess.orders'), path: '/order-tracking' },
    { icon: IoHeartOutline, label: t('profile.quickAccess.wishlist'), path: '/wishlist' },
    { icon: IoCameraOutline, label: t('profile.quickAccess.beautyProfile'), path: '/skin-analysis' },
    { icon: IoCalendarOutline, label: t('profile.quickAccess.routines'), path: '/beauty-journey' },
  ]

  const menuSections = [
    {
      title: t('profile.menu.account'),
      items: [
        { icon: IoPersonOutline, label: t('profile.menu.dashboard'), path: '/dashboard' },
        { icon: IoDocumentTextOutline, label: t('profile.menu.orderHistory'), path: '/order-tracking' },
        { icon: IoHeartOutline, label: t('profile.menu.wishlist'), path: '/wishlist' },
        { icon: IoLocationOutline, label: t('profile.menu.shipping'), path: '/shipping-address' },
        { icon: IoCardOutline, label: t('profile.menu.payment'), path: '/payment-methods' },
      ],
    },
    {
      title: t('profile.menu.beauty'),
      items: [
        { icon: IoSparkles, label: t('profile.menu.beautyProfile'), path: '/skin-analysis' },
        { icon: IoRibbonOutline, label: t('profile.menu.loyalty'), path: '/account#loyalty' },
        { icon: IoCalendarOutline, label: t('profile.menu.routines'), path: '/beauty-journey' },
        { icon: IoStarSharp, label: t('profile.menu.reviews'), path: '/dashboard#reviews' },
      ],
    },
    {
      title: t('profile.menu.settings'),
      items: [
        { icon: IoSettingsOutline, label: t('profile.menu.settings'), path: '/privacy-settings' },
        { icon: IoNotificationsOutline, label: t('profile.menu.notifications'), path: '/notifications' },
      ],
    },
  ]

  if (loading) return <LoadingSpinner />

  return (
    <div key={i18n.language} className="bg-[#FDFBF7] min-h-screen">

      {/* Hero */}
      <div className="text-center py-10">
        <p>{t('profile.hero.label')}</p>
        <h1>{userName}</h1>
        <p>{t('profile.hero.memberSince')}</p>
      </div>

      {/* Quick Access */}
      <div>
        <h3>{t('profile.quickAccess.title')}</h3>
        {quickActions.map(a => (
          <Link key={a.label} to={a.path}>{a.label}</Link>
        ))}
      </div>

      {/* Menu */}
      {menuSections.map(section => (
        <div key={section.title}>
          <h3>{section.title}</h3>
          {section.items.map(item => (
            <Link key={item.label} to={item.path}>{item.label}</Link>
          ))}
        </div>
      ))}

      {/* Orders */}
      <div>
        <h2>{t('profile.orders.title')}</h2>

        {recentOrders.length === 0 ? (
          <>
            <h3>{t('profile.orders.emptyTitle')}</h3>
            <p>{t('profile.orders.emptyDesc')}</p>
          </>
        ) : (
          recentOrders.map(o => (
            <div key={o.id}>
              <span>{t('profile.orders.processing')}</span>
              <span>{t('profile.orders.track')}</span>
            </div>
          ))
        )}
      </div>

      {/* Loyalty */}
      <div>
        <h2>{t('profile.loyalty.title')}</h2>
        <p>{t('profile.loyalty.current')}</p>
      </div>

      {/* Sign Out */}
      <button onClick={handleSignOut}>
        {t('profile.signOut')}
      </button>

    </div>
  )
}