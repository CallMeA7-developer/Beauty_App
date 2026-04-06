export default async (request, context) => {
  try {
    const body = await request.json()
    const { skinType, concern, age, specificConcerns, routine, sunExposure } = body

    const apiKey = process.env.VITE_OPENAI_API_KEY || process.env.OPENAI_API_KEY

    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'API key not configured' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        max_tokens: 1000,
        temperature: 0.5,
        messages: [
          {
            role: 'system',
            content: 'You are a skin analysis AI. Respond with valid JSON only, no extra text.'
          },
          {
            role: 'user',
            content: `Skin: ${skinType}, Concern: ${concern}, Age: ${age || 'Unknown'}, Issues: ${specificConcerns || 'None'}, Routine: ${routine}, Sun: ${sunExposure}. Return JSON: {"skinScore":85,"summary":"2 sentence summary","metrics":{"hydration":80,"texture":75,"clarity":85,"toneEvenness":80,"firmness":78,"radiance":76},"analysisCards":[{"title":"Skin Type","description":"description","badge":"Confirmed"},{"title":"Main Concern","description":"description","badge":"Priority"},{"title":"Hydration","description":"description","badge":"Focus"},{"title":"Recommendations","description":"description","badge":"Action"}],"morningRoutine":[{"step":1,"productType":"Cleanser","reason":"reason"},{"step":2,"productType":"Serum","reason":"reason"},{"step":3,"productType":"Moisturizer","reason":"reason"},{"step":4,"productType":"Sunscreen","reason":"reason"}],"eveningRoutine":[{"step":1,"productType":"Makeup Remover","reason":"reason"},{"step":2,"productType":"Treatment","reason":"reason"},{"step":3,"productType":"Night Cream","reason":"reason"}],"targetedTreatments":[{"productType":"Eye Cream","reason":"reason"},{"productType":"Mask","reason":"reason"}],"keyIngredients":["Hyaluronic Acid","Vitamin C"],"avoidIngredients":["Alcohol","Fragrance"]}`
          }
        ]
      })
    })

    if (!openAIResponse.ok) {
      const errorData = await openAIResponse.json()
      return new Response(JSON.stringify({ error: errorData.error?.message || 'OpenAI error' }), {
        status: openAIResponse.status,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const data = await openAIResponse.json()
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
