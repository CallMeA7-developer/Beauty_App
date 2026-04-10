// ─────────────────────────────────────────────────────────────────────────────
// src/data/checkout.js
// Shared data for the checkout flow.
// When Bolt connects real cart/order state, replace these with API calls.
// ─────────────────────────────────────────────────────────────────────────────

// ─── CART ITEMS (shared across all checkout pages) ───────────────────────────
// Same items used in DeliveryInfo, DeliveryMethods, Payment, OrderConfirmation
export const checkoutCartItems = [
  { id: 1, brand: 'LA MER',       name: 'Crème de la Mer Moisturizing Cream', quantity: 1, price: 380, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=160&h=160&fit=crop' },
  { id: 2, brand: 'ESTÉE LAUDER', name: 'Advanced Night Repair Serum',         quantity: 2, price: 115, image: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=160&h=160&fit=crop' },
  { id: 3, brand: 'TOM FORD',     name: 'Black Orchid Eau de Parfum',          quantity: 1, price: 265, image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=160&h=160&fit=crop' },
]

// Larger images for OrderConfirmation
export const checkoutCartItemsLarge = checkoutCartItems.map(item => ({
  ...item,
  image: item.image.replace('w=160&h=160', 'w=200&h=200'),
}))

// ─── CHECKOUT STEPS ───────────────────────────────────────────────────────────
// Each checkout page shows the 3-step progress indicator.
// Pass `activeStep` (1, 2, or 3) to get the right state.
export const getCheckoutSteps = (activeStep) => [
  { step: 1, label: 'Delivery Information', active: activeStep === 1, completed: activeStep > 1 },
  { step: 2, label: 'Delivery Method',      active: activeStep === 2, completed: activeStep > 2 },
  { step: 3, label: 'Payment',              active: activeStep === 3, completed: activeStep > 3 },
]

// ─── SAVED ADDRESSES (DeliveryInfo) ──────────────────────────────────────────
export const savedAddresses = [
  { id: 1, label: 'Home',   name: 'Alexandra Chen', address: '2847 Park Avenue, Apt 5B, New York, NY 10016, United States'     },
  { id: 2, label: 'Office', name: 'Alexandra Chen', address: '1250 Broadway, Suite 3600, New York, NY 10001, United States' },
]

// ─── DELIVERY OPTIONS (DeliveryMethods) ──────────────────────────────────────
export const deliveryOptions = [
  { id: 1, iconKey: 'car',    title: 'Standard Delivery',      time: '3–5 Business Days',               arrival: 'Arrives by Friday, Dec 15',            price: 'FREE',        priceValue: 0,  description: 'Free delivery on all orders over $75', priceColor: 'text-green-600'  },
  { id: 2, iconKey: 'flash',  title: 'Express Delivery',       time: '1–2 Business Days',               arrival: 'Arrives by Tuesday, Dec 12',           price: '$25.00',      priceValue: 25, description: '',                                     priceColor: 'text-[#1A1A1A]' },
  { id: 3, iconKey: 'rocket', title: 'Same-Day Delivery',      time: 'Order by 2:00 PM for same-day',   arrival: 'Arrives today by 9:00 PM',             price: '$45.00',      priceValue: 45, description: 'Available in select locations',        priceColor: 'text-[#1A1A1A]' },
  { id: 4, iconKey: 'globe',  title: 'International Shipping', time: '7–14 Business Days',              arrival: 'Estimated delivery varies by country', price: 'From $35.00', priceValue: 35, description: 'View international rates',            priceColor: 'text-[#1A1A1A]' },
]

// ─── SAVED CARDS (Payment) ────────────────────────────────────────────────────
export const savedCards = [
  { id: 1, label: 'VISA', labelColor: 'text-[#1434CB]', labelBg: 'bg-blue-50', last4: '4242', expiry: '12/2025' },
  { id: 2, label: 'MC',   labelColor: 'text-[#EB001B]', labelBg: 'bg-red-50',  last4: '8888', expiry: '08/2026' },
]

// ─── SECURITY FEATURES (Payment) ─────────────────────────────────────────────
export const securityFeatures = [
  { iconKey: 'lock',    title: '256-bit SSL',      subtitle: 'Secure Connection' },
  { iconKey: 'shield',  title: 'PCI DSS',           subtitle: 'Compliant'         },
  { iconKey: 'check',   title: '30-Day Guarantee',  subtitle: 'Money-Back'        },
]

// ─── ORDER CONFIRMATION ───────────────────────────────────────────────────────
export const confirmedOrder = {
  orderNumber:  '#SL-48291',
  date:         'December 21, 2024',
  email:        'alexandra.chen@email.com',
  subtotal:     875.00,
  tax:          87.50,
  shipping:     0,
  total:        962.50,
  deliveryDate: 'December 26–28, 2024',
  address:      '2847 Park Avenue, Apt 5B, New York, NY 10016',
}

export const helpLinks = [
  { label: 'View Order History',       path: '/order-tracking' },
  { label: 'Contact Customer Service', path: '/faq' },
  { label: 'Return & Exchange Policy', path: '/terms-conditions#returns' },
]