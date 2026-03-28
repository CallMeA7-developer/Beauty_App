import Stripe from 'stripe'

export default async function handler(req) {
  const key = process.env.STRIPE_SECRET_KEY
  console.log('Key exists:', !!key)
  console.log('Key prefix:', key ? key.substring(0, 7) : 'MISSING')

  try {
    const body = await req.json()
    console.log('Body received:', body)

    const stripe = new Stripe(key)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(body.amount * 100),
      currency: 'usd',
    })

    return new Response(JSON.stringify({ clientSecret: paymentIntent.client_secret }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (err) {
    console.error('FULL ERROR:', err)
    return new Response(JSON.stringify({ error: err.message, stack: err.stack }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
