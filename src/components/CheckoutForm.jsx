import { useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { IoLockClosedOutline } from 'react-icons/io5'
import { supabase } from '../lib/supabase'

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#1A1A1A',
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: '15px',
      '::placeholder': {
        color: '#999999',
      },
    },
    invalid: {
      color: '#dc2626',
      iconColor: '#dc2626',
    },
  },
}

export default function CheckoutForm({
  total,
  cartItems,
  subtotal,
  shipping,
  tax,
  checkoutSession,
  agreeTerms,
  onSuccess,
  onError,
}) {
  const stripe = useStripe()
  const elements = useElements()
  const [processing, setProcessing] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!stripe || !elements || !agreeTerms) {
      return
    }

    setProcessing(true)

    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        throw new Error('Not authenticated')
      }

      console.log('Creating payment intent for total:', total)

      const createIntentResponse = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-payment-intent`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ amount: total }),
        }
      )

      console.log('Create intent response status:', createIntentResponse.status)

      if (!createIntentResponse.ok) {
        const errorData = await createIntentResponse.json()
        console.error('Payment intent error:', errorData)
        const errorMessage = errorData.error || errorData.details || 'Failed to create payment intent'
        const fullError = errorData.type ? `${errorMessage} (${errorData.type})` : errorMessage
        throw new Error(fullError)
      }

      const { clientSecret, error: intentError } = await createIntentResponse.json()

      console.log('Payment Intent Response:', { clientSecret, intentError })

      if (intentError) {
        throw new Error(intentError)
      }

      if (!clientSecret) {
        throw new Error('Failed to receive payment client secret from server')
      }

      console.log('Client Secret received:', clientSecret)

      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      )

      if (stripeError) {
        throw new Error(stripeError.message)
      }

      if (paymentIntent.status === 'succeeded') {
        const confirmResponse = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/confirm-payment`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${session.access_token}`,
            },
            body: JSON.stringify({
              paymentIntentId: paymentIntent.id,
              items: cartItems.map(item => ({
                product_id: item.product_id,
                product_name: item.product_name,
                brand: item.brand,
                price: item.price,
                quantity: item.quantity,
                product_image: item.product_image,
              })),
              subtotal,
              shipping,
              tax,
              total,
              shippingAddress: checkoutSession.selectedAddress || {},
              deliveryMethod: checkoutSession.deliveryMethod || '',
            }),
          }
        )

        const { orderId, error: confirmError } = await confirmResponse.json()

        if (confirmError) {
          throw new Error(confirmError)
        }

        onSuccess(orderId)
      } else {
        throw new Error('Payment was not successful')
      }
    } catch (error) {
      console.error('Payment error:', error)
      onError(error.message)
    } finally {
      setProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 md:p-6 lg:p-[32px] mb-5 lg:mb-[24px]">
        <h3 className="text-[18px] md:text-[19px] lg:text-[20px] font-semibold text-[#1A1A1A] mb-5 lg:mb-[24px]">Card Details</h3>
        <div className="space-y-4 lg:space-y-[16px]">
          <div>
            <label className="text-[13px] lg:text-[14px] font-medium text-[#666666] mb-[8px] block">
              Card Information
            </label>
            <div className="w-full min-h-[48px] px-[16px] py-[14px] border-[1.5px] border-[#E8E3D9] rounded-[8px] text-[14px] lg:text-[15px] font-normal text-[#1A1A1A] outline-none focus-within:border-[#8B7355] transition-colors">
              <CardElement options={CARD_ELEMENT_OPTIONS} />
            </div>
          </div>
          <div className="flex items-center gap-[12px] pt-[8px]">
            <IoLockClosedOutline className="w-[15px] h-[15px] lg:w-[16px] lg:h-[16px] text-[#8B7355]" />
            <span className="text-[12px] lg:text-[13px] font-normal text-[#666666]">
              Your payment information is encrypted and secure
            </span>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={!stripe || !agreeTerms || processing}
        className={`w-full h-[52px] lg:h-[56px] text-white text-[15px] lg:text-[16px] font-medium rounded-[8px] cursor-pointer transition-all ${
          agreeTerms && !processing ? 'bg-[#8B7355] hover:bg-[#7a6448]' : 'bg-[#C9A870] cursor-not-allowed'
        }`}
      >
        {processing ? (
          <span className="flex items-center justify-center gap-[8px]">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : (
          'Place Order'
        )}
      </button>
    </form>
  )
}
