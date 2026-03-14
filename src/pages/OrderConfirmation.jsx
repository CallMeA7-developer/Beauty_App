import { Link } from 'react-router-dom'
import {
  IoCheckmarkCircle,
  IoMailOutline,
  IoCarOutline,
  IoDownloadOutline,
  IoArrowForward,
  IoGiftOutline,
  IoCardOutline,
} from 'react-icons/io5'

export default function OrderConfirmation() {
  const orderItems = [
    { id: 1, brand: 'LA MER', name: 'Crème de la Mer Moisturizing Cream', quantity: 1, price: 380, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200&h=200&fit=crop' },
    { id: 2, brand: 'ESTÉE LAUDER', name: 'Advanced Night Repair Serum', quantity: 2, price: 115, image: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=200&h=200&fit=crop' },
    { id: 3, brand: 'TOM FORD', name: 'Black Orchid Eau de Parfum', quantity: 1, price: 265, image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=200&h=200&fit=crop' },
  ]

  const subtotal = 875.00
  const tax = 87.50
  const total = 962.50

  const helpLinks = ['View Order History', 'Contact Customer Service', 'Return & Exchange Policy']

  return (
    <div className="bg-white font-['Cormorant_Garamond']">

      {/* ── Success Hero ── */}
      <div className="min-h-[200px] bg-gradient-to-b from-[#FDFBF7] to-white flex flex-col items-center justify-center py-[40px]">
        <div className="w-[80px] h-[80px] rounded-full bg-green-600 flex items-center justify-center mb-[24px] shadow-[0_8px_32px_rgba(123,168,93,0.3)]">
          <IoCheckmarkCircle className="w-[44px] h-[44px] text-white" />
        </div>
        <h1 className="text-[36px] font-semibold text-[#1A1A1A] mb-[8px]">Order Confirmed!</h1>
        <p className="text-[18px] font-normal text-[#666666] mb-[16px]">Thank you for your purchase</p>
        <div className="bg-[#FDFBF7] border border-[#E8E3D9] rounded-[24px] px-[28px] py-[12px]">
          <span className="text-[20px] font-medium text-[#8B7355]">Order #SL-2024-1892</span>
        </div>
      </div>

      {/* ── Email Notice ── */}
      <div className="min-h-[56px] bg-[#FDFBF7] border-y border-[#E8E3D9] px-[120px] flex items-center justify-center gap-[12px]">
        <IoMailOutline className="w-[20px] h-[20px] text-[#8B7355]" />
        <span className="text-[15px] font-normal text-[#666666]">A confirmation email has been sent to <span className="text-[#8B7355] font-medium">your@email.com</span></span>
      </div>

      {/* ── Main Content ── */}
      <div className="min-h-[500px] px-[120px] py-[48px]">
        <div className="max-w-[1200px] mx-auto flex gap-[40px]">

          {/* ── Left ── */}
          <div className="flex-1">

            {/* Order Details */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[32px] mb-[24px]">
              <h2 className="text-[24px] font-semibold text-[#1A1A1A] mb-[24px]">Order Details</h2>

              <div className="space-y-[20px] mb-[24px]">
                {orderItems.map((item, index) => (
                  <div key={item.id}>
                    <div className="flex gap-[16px]">
                      <img src={item.image} alt={item.name} className="w-[100px] h-[100px] rounded-[8px] object-cover flex-shrink-0" />
                      <div className="flex-1">
                        <div className="text-[12px] font-medium text-[#8B7355] mb-[4px]">{item.brand}</div>
                        <div className="text-[16px] font-normal text-[#1A1A1A] mb-[8px]">{item.name}</div>
                        <div className="text-[14px] font-normal text-[#666666]">{item.quantity} × ${item.price}</div>
                      </div>
                      <div className="flex items-start flex-shrink-0">
                        <span className="text-[16px] font-semibold text-[#1A1A1A]">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                    {index < orderItems.length - 1 && <div className="h-[1px] bg-[#E8E3D9] mt-[20px]" />}
                  </div>
                ))}
              </div>

              {/* Price Summary */}
              <div className="pt-[24px] border-t border-[#E8E3D9]">
                <div className="space-y-[12px] mb-[20px]">
                  <div className="flex justify-between">
                    <span className="text-[16px] font-normal text-[#666666]">Subtotal</span>
                    <span className="text-[16px] font-normal text-[#1A1A1A]">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[16px] font-normal text-[#666666]">Shipping (Standard Delivery)</span>
                    <span className="text-[16px] font-normal text-green-600">FREE</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[16px] font-normal text-[#666666]">Tax</span>
                    <span className="text-[16px] font-normal text-[#1A1A1A]">${tax.toFixed(2)}</span>
                  </div>
                </div>
                <div className="h-[1px] bg-[#E8E3D9] mb-[20px]" />
                <div className="flex justify-between">
                  <span className="text-[22px] font-semibold text-[#1A1A1A]">Total Paid</span>
                  <span className="text-[22px] font-semibold text-[#1A1A1A]">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[32px]">
              <h2 className="text-[24px] font-semibold text-[#1A1A1A] mb-[24px]">Delivery Information</h2>

              {/* Address */}
              <div className="mb-[20px]">
                <div className="text-[14px] font-medium text-[#666666] mb-[12px] uppercase tracking-[1px]">Shipping Address</div>
                <div className="text-[16px] font-semibold text-[#1A1A1A] mb-[4px]">John Smith</div>
                <div className="text-[15px] font-normal text-[#666666] leading-[1.7]">
                  123 Fifth Avenue, Apt 4B<br />
                  New York, NY 10011<br />
                  United States<br />
                  +1 (212) 555-0123
                </div>
              </div>

              <div className="h-[1px] bg-[#E8E3D9] my-[20px]" />

              {/* Delivery Method */}
              <div className="mb-[20px]">
                <div className="text-[14px] font-medium text-[#666666] mb-[12px] uppercase tracking-[1px]">Delivery Method</div>
                <div className="flex items-center gap-[8px] mb-[4px]">
                  <IoCarOutline className="w-[20px] h-[20px] text-[#8B7355]" />
                  <span className="text-[16px] font-semibold text-[#1A1A1A]">Standard Delivery</span>
                </div>
                <div className="text-[15px] font-normal text-green-600">Estimated delivery: Dec 12–15, 2024</div>
              </div>

              <div className="h-[1px] bg-[#E8E3D9] my-[20px]" />

              {/* Payment */}
              <div>
                <div className="text-[14px] font-medium text-[#666666] mb-[12px] uppercase tracking-[1px]">Payment Method</div>
                <div className="flex items-center gap-[12px]">
                  <div className="w-[48px] h-[28px] rounded-[4px] bg-blue-50 flex items-center justify-center">
                    <span className="text-[13px] font-bold text-[#1434CB]">VISA</span>
                  </div>
                  <div className="flex items-center gap-[8px]">
                    <IoCardOutline className="w-[18px] h-[18px] text-[#666666]" />
                    <span className="text-[16px] font-normal text-[#1A1A1A]">Visa ending in 4242</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right ── */}
          <div className="w-[360px] flex-shrink-0">

            {/* Action Card */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[32px] mb-[24px]">
              <Link to="/order-tracking">
                <button className="w-full h-[56px] bg-[#8B7355] text-white text-[16px] font-medium rounded-[8px] cursor-pointer hover:bg-[#7a6448] transition-colors mb-[16px]">
                  Track Your Order
                </button>
              </Link>
              <Link to="/collections">
                <button className="w-full h-[56px] bg-white border-[1.5px] border-[#8B7355] text-[#8B7355] text-[16px] font-medium rounded-[8px] cursor-pointer hover:bg-[#FDFBF7] transition-colors mb-[24px]">
                  Continue Shopping
                </button>
              </Link>
              <div className="pt-[20px] border-t border-[#E8E3D9] flex items-center gap-[12px] cursor-pointer group">
                <IoDownloadOutline className="w-[20px] h-[20px] text-[#666666] group-hover:text-[#8B7355] transition-colors" />
                <span className="text-[14px] font-medium text-[#8B7355] group-hover:underline">Download Order Receipt (PDF)</span>
              </div>
            </div>

            {/* Help Card */}
            <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[32px] mb-[24px]">
              <h3 className="text-[20px] font-semibold text-[#1A1A1A] mb-[16px]">Need Help?</h3>
              <div>
                {helpLinks.map((item, index) => (
                  <div key={item}>
                    <div className="py-[14px] flex items-center justify-between cursor-pointer group">
                      <span className="text-[15px] font-normal text-[#666666] group-hover:text-[#8B7355] transition-colors">{item}</span>
                      <IoArrowForward className="w-[16px] h-[16px] text-[#666666] group-hover:text-[#8B7355] group-hover:translate-x-1 transition-all" />
                    </div>
                    {index < helpLinks.length - 1 && <div className="h-[1px] bg-[#E8E3D9]" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Rewards Banner */}
            <div className="bg-gradient-to-br from-[#FDFBF7] to-[#F5F1EA] rounded-[12px] border border-[#E8E3D9] p-[24px]">
              <div className="flex items-start gap-[16px]">
                <div className="w-[48px] h-[48px] bg-white rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
                  <IoGiftOutline className="w-[24px] h-[24px] text-[#C9A870]" />
                </div>
                <div>
                  <div className="text-[15px] font-semibold text-[#1A1A1A] mb-[6px]">
                    You earned 96 loyalty points!
                  </div>
                  <div className="text-[13px] font-normal text-[#666666] mb-[8px]">
                    Points added to your account with this order.
                  </div>
                  <Link to="/dashboard">
                    <span className="text-[13px] font-medium text-[#8B7355] underline cursor-pointer hover:text-[#7a6448] transition-colors">
                      View your rewards balance
                    </span>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="h-[80px]" />
    </div>
  )
}