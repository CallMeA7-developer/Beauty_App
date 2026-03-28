import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

dotenv.config()

const app = express()

if (!process.env.STRIPE_SECRET_KEY) {
  console.error('STRIPE_SECRET_KEY is not defined in environment variables')
  process.exit(1)
}

if (!process.env.VITE_SUPABASE_URL || !process.env.VITE_SUPABASE_ANON_KEY) {
  console.error('Supabase environment variables are not defined')
  process.exit(1)
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
)

app.use(cors())
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'API server is running',
    stripeConfigured: !!process.env.STRIPE_SECRET_KEY,
  })
})

app.post('/api/create-payment-intent', async (req, res) => {
  try {
    console.log('Received payment intent request:', req.body)

    const { amount } = req.body

    if (!amount || amount <= 0) {
      console.error('Invalid amount received:', amount)
      return res.status(400).json({ error: 'Invalid amount' })
    }

    console.log('Creating payment intent for amount:', amount)

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    })

    console.log('Payment intent created successfully:', paymentIntent.id)

    return res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    })
  } catch (error) {
    console.error('Payment intent creation error:', error.message)
    console.error('Error stack:', error.stack)
    return res.status(500).json({
      error: error.message || 'Failed to create payment intent',
      type: error.type || 'unknown',
    })
  }
})

app.post('/api/confirm-payment', async (req, res) => {
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
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`)
})
