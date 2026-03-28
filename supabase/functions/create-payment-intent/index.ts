import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import Stripe from "npm:stripe@17.5.0"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    })
  }

  try {
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY")

    console.log("STRIPE_SECRET_KEY exists:", !!stripeSecretKey)

    if (!stripeSecretKey) {
      return new Response(
        JSON.stringify({ error: "STRIPE_SECRET_KEY not configured in environment" }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      )
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2024-12-18.acacia",
    })

    const { amount } = await req.json()

    console.log("Creating payment intent for amount:", amount)

    if (!amount || amount <= 0) {
      return new Response(
        JSON.stringify({ error: "Invalid amount" }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      )
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    })

    console.log("Payment intent created:", paymentIntent.id)
    console.log("Client secret exists:", !!paymentIntent.client_secret)

    return new Response(
      JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    )
  }
})
