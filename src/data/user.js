// ─────────────────────────────────────────────────────────────────────────────
// src/data/user.js
// Single source of truth for all user / account data.
// When Bolt connects a real backend, replace these with API calls.
// ─────────────────────────────────────────────────────────────────────────────

import {
  IoPersonOutline,
  IoBagCheckOutline,
  IoHeartOutline,
  IoSparkles,
  IoRibbonOutline,
  IoCalendarOutline,
  IoStarSharp,
  IoSettingsOutline,
} from 'react-icons/io5'

// ─── USER PROFILE ─────────────────────────────────────────────────────────────
// The logged-in user. Bolt will replace this with real auth data.
export const currentUser = {
  name:      'Alexandra Chen',
  email:     'alexandra.chen@email.com',
  phone:     '+1 (555) 123-4567',
  avatar:    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
  tier:      'Elite Member',
  points:    2450,
  joinDate:  'January 2022',
}

// ─── SIDEBAR NAVIGATION ───────────────────────────────────────────────────────
// Used in every account page sidebar. Pass `activePage` to highlight the right item.
// activePage values: 'dashboard' | 'orders' | 'wishlist' | 'beauty' | 'loyalty' | 'routines' | 'reviews' | 'settings'
export const accountNavItems = [
  { key: 'dashboard', icon: IoPersonOutline,   label: 'Account Dashboard', badge: null,    tag: null               },
  { key: 'orders',    icon: IoBagCheckOutline,  label: 'Order History',     badge: null,    tag: null               },
  { key: 'wishlist',  icon: IoHeartOutline,     label: 'Wishlist',          badge: '12',    tag: null               },
  { key: 'beauty',    icon: IoSparkles,          label: 'Beauty Profile',    badge: null,    tag: 'Complete Analysis' },
  { key: 'loyalty',   icon: IoRibbonOutline,    label: 'Loyalty Program',   badge: '2,450', tag: null               },
  { key: 'routines',  icon: IoCalendarOutline,  label: 'My Routines',       badge: null,    tag: null               },
  { key: 'reviews',   icon: IoStarSharp,         label: 'Reviews & Ratings', badge: null,    tag: null               },
  { key: 'settings',  icon: IoSettingsOutline,  label: 'Account Settings',  badge: null,    tag: null               },
]

// Helper — returns navigationItems array with the correct item set as active.
// Usage: const navigationItems = getNavItems('settings')
export const getNavItems = (activePage) =>
  accountNavItems.map(item => ({ ...item, active: item.key === activePage }))

// ─── ORDERS ───────────────────────────────────────────────────────────────────
export const currentOrders = [
  { orderNumber: '#SL-47821', date: 'Dec 18, 2024', status: 'In Transit', product: 'Age-Defying Serum',     image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=160&h=160&fit=crop', quantity: 1, delivery: 'Dec 22, 2024', price: '$124' },
  { orderNumber: '#SL-47809', date: 'Dec 15, 2024', status: 'Processing',  product: 'Vitamin C Brightening', image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=160&h=160&fit=crop', quantity: 2, delivery: 'Dec 24, 2024', price: '$95'  },
]

export const orderHistory = [
  { orderNumber: '#SL-47795', date: 'Dec 5, 2024',  total: '$289', status: 'Delivered', product: 'Hydrating Essence',     image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=80&h=80&fit=crop' },
  { orderNumber: '#SL-47742', date: 'Nov 18, 2024', total: '$156', status: 'Delivered', product: 'Night Recovery Cream',  image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=80&h=80&fit=crop' },
  { orderNumber: '#SL-47681', date: 'Oct 28, 2024', total: '$342', status: 'Delivered', product: 'Radiance Booster',      image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=80&h=80&fit=crop' },
]

// ─── SHIPPING ADDRESSES ────────────────────────────────────────────────────────
export const initialAddresses = [
  { id: 1, label: 'Home Address', isDefault: true,  recipient: 'Alexandra Chen', street: '456 Madison Avenue, Apt 12B', cityStateZip: 'New York, NY 10022', country: 'United States', phone: '+1 (555) 123-4567' },
  { id: 2, label: 'Office',        isDefault: false, recipient: 'Alexandra Chen', street: '789 Park Avenue, Suite 3400',  cityStateZip: 'New York, NY 10021', country: 'United States', phone: '+1 (555) 987-6543' },
]

export const initialAddressForm = {
  label:      'Home Address',
  fullName:   'Alexandra Chen',
  phone:      '+1 (555) 123-4567',
  address1:   '456 Madison Avenue',
  address2:   'Apt 12B',
  city:       'New York',
  state:      'NY',
  postalCode: '10022',
  country:    'United States',
  isDefault:  true,
}

// ─── PAYMENT METHODS ──────────────────────────────────────────────────────────
export const initialPaymentCards = [
  { id: 1, type: 'Visa',       labelColor: 'text-[#1434CB]', labelBg: 'bg-blue-50', cardNumber: '•••• •••• •••• 4532', expiry: '08/2026', cardholder: 'Alexandra Chen', isDefault: true  },
  { id: 2, type: 'Mastercard', labelColor: 'text-[#EB001B]', labelBg: 'bg-red-50',  cardNumber: '•••• •••• •••• 8791', expiry: '12/2025', cardholder: 'Alexandra Chen', isDefault: false },
  { id: 3, type: 'Amex',       labelColor: 'text-[#2E77BC]', labelBg: 'bg-blue-50', cardNumber: '•••• •••••• •7003',   expiry: '03/2027', cardholder: 'Alexandra Chen', isDefault: false },
]

// ─── WISHLIST PREVIEW (dashboard widget) ──────────────────────────────────────
export const dashboardWishlist = [
  { image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=320&h=320&fit=crop', brand: 'Shan Loray', name: 'Hydrating Essence',    price: '$78'  },
  { image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=320&h=320&fit=crop', brand: 'Shan Loray', name: 'Night Recovery Cream', price: '$145' },
  { image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=320&h=320&fit=crop', brand: 'Shan Loray', name: 'Radiance Booster',     price: '$98'  },
  { image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=320&h=320&fit=crop', brand: 'Shan Loray', name: 'Eye Renewal Complex',  price: '$124' },
]

// ─── ROUTINES (dashboard widget) ──────────────────────────────────────────────
export const userRoutines = [
  { name: 'Morning Ritual', productCount: 5, lastUsed: 'Today',     images: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=80&h=80&fit=crop', 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=80&h=80&fit=crop', 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=80&h=80&fit=crop'] },
  { name: 'Evening Care',   productCount: 6, lastUsed: 'Yesterday', images: ['https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=80&h=80&fit=crop', 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=80&h=80&fit=crop', 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=80&h=80&fit=crop'] },
]

// ─── REVIEWS (dashboard widget) ───────────────────────────────────────────────
export const userReviews = [
  { image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=80&h=80&fit=crop', product: 'Age-Defying Serum',     excerpt: 'Absolutely transformed my skin! The texture is luxurious and results are visible within weeks.', date: 'Dec 10, 2024' },
  { image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=80&h=80&fit=crop', product: 'Vitamin C Brightening', excerpt: 'Best vitamin C product I have ever used. My complexion is noticeably brighter and more even.',    date: 'Nov 28, 2024' },
]

// ─── ORDER TRACKING ───────────────────────────────────────────────────────────
export const trackingOrders = [
  { orderNumber: '#SL-47821', date: 'Dec 18, 2024', status: 'In Transit', statusColor: 'bg-[#C9A870]' },
  { orderNumber: '#SL-47809', date: 'Dec 15, 2024', status: 'Processing',  statusColor: 'bg-[#999999]' },
  { orderNumber: '#SL-47791', date: 'Dec 10, 2024', status: 'Delivered',   statusColor: 'bg-[#8B7355]' },
]

export const deliveryUpdates = [
  { time: 'Dec 20, 3:24 PM', description: 'Package in transit to local facility', location: 'Los Angeles, CA' },
  { time: 'Dec 19, 2:15 PM', description: 'Departed shipping facility',           location: 'Phoenix, AZ'    },
  { time: 'Dec 18, 5:30 PM', description: 'Order shipped from warehouse',         location: 'Dallas, TX'     },
]

export const trackingStages = [
  { label: 'Order Confirmed', time: 'Dec 18, 5:15 PM', active: true,  completed: true  },
  { label: 'Processing',      time: 'Dec 18, 6:30 PM', active: true,  completed: true  },
  { label: 'In Transit',      time: 'Dec 20, 3:24 PM', active: true,  completed: false },
  { label: 'Delivered',       time: 'Expected Dec 22', active: false, completed: false },
]

// ─── SECURITY TIPS (Password page) ────────────────────────────────────────────
export const securityTips = [
  'Use a unique password not used on other sites',
  'Consider using a password manager for better security',
  'Enable two-factor authentication for additional protection',
]

// ─── NEWSLETTER OPTIONS (Notifications page) ──────────────────────────────────
export const newsletterOptions = [
  { value: 'weekly',      label: 'Weekly Digest',    description: 'Curated beauty trends and tips every Monday'   },
  { value: 'monthly',     label: 'Monthly Magazine',  description: 'In-depth features and seasonal collections'    },
  { value: 'unsubscribe', label: 'Unsubscribe',       description: 'Opt out of all newsletter communications'      },
]

// ─── STATUS COLOR HELPER ──────────────────────────────────────────────────────
export const getStatusColor = (status) => {
  if (status === 'Delivered')  return 'text-green-600 bg-green-50'
  if (status === 'In Transit') return 'text-blue-600 bg-blue-50'
  return 'text-yellow-600 bg-yellow-50'
}