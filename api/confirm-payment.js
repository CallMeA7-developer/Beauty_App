import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const {
      paymentIntentId,
      items,
      subtotal,
      shipping,
      tax,
      total,
      shippingAddress,
      deliveryMethod,
    } = req.body

    const authHeader = req.headers.authorization
    if (!authHeader) {
      return res.status(401).json({ error: 'Not authenticated' })
    }

    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)

    if (authError || !user) {
      return res.status(401).json({ error: 'Invalid authentication' })
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({ error: 'Payment not completed' })
    }

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: user.id,
        items,
        subtotal,
        shipping,
        tax,
        total,
        shipping_address: shippingAddress,
        delivery_method: deliveryMethod,
        payment_intent_id: paymentIntentId,
        status: 'confirmed',
      })
      .select()
      .single()

    if (orderError) {
      console.error('Order creation error:', orderError)
      return res.status(500).json({ error: 'Failed to create order' })
    }

    const { error: cartError } = await supabase
      .from('cart')
      .delete()
      .eq('user_id', user.id)

    if (cartError) {
      console.error('Cart clear error:', cartError)
    }

    res.status(200).json({ orderId: order.id })
  } catch (error) {
    console.error('Payment confirmation error:', error)
    res.status(500).json({
      error: error.message || 'Failed to confirm payment',
    })
  }
}
