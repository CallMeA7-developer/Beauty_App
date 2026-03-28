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
    const { amount } = await req.json()

    console.log('createPaymentIntent called with amount:', amount)

    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY")

    console.log("Stripe key exists:", !!stripeSecretKey)
    console.log("Stripe key prefix:", stripeSecretKey?.substring(0, 7))

    if (!stripeSecretKey) {
      const errorMsg = "STRIPE_SECRET_KEY not configured in environment"
      console.error(errorMsg)
      return new Response(
        JSON.stringify({ error: errorMsg }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      )
    }

    if (!amount || amount <= 0) {
      const errorMsg = "Invalid amount"
      console.error(errorMsg, "- amount:", amount)
      return new Response(
        JSON.stringify({ error: errorMsg }),
        {
          status: 400,
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

    console.log("Creating payment intent for amount:", amount)
    console.log("Amount in cents:", Math.round(amount * 100))

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    })

    console.log("Payment intent created successfully:", paymentIntent.id)
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
    console.error("===== STRIPE ERROR =====")
    console.error("Error creating payment intent:", error)
    console.error("Error message:", error.message)
    console.error("Error type:", error.type)
    console.error("Error code:", error.code)
    console.error("Error stack:", error.stack)
    console.error("========================")

    return new Response(
      JSON.stringify({
        error: error.message || "Failed to create payment intent",
        details: error.toString(),
        type: error.type,
        code: error.code
      }),
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
