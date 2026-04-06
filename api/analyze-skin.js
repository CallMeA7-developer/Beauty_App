export async function POST({ request }) {
  const { skinType, concern, age, specificConcerns, routine, sunExposure } = await request.json()

  const apiKey = process.env.VITE_OPENAI_API_KEY || process.env.OPENAI_API_KEY

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
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
        { role: 'system', content: 'You are a skin analysis AI. Respond with valid JSON only.' },
        { role: 'user', content: `Skin: ${skinType}, Concern: ${concern}, Age: ${age}, Issues: ${specificConcerns}, Routine: ${routine}, Sun: ${sunExposure}. Return JSON: {"skinScore":85,"summary":"...","metrics":{"hydration":80,"texture":75,"clarity":85,"toneEvenness":80,"firmness":78,"radiance":76},"analysisCards":[{"title":"...","description":"...","badge":"..."}],"morningRoutine":[{"step":1,"productType":"...","reason":"..."}],"eveningRoutine":[{"step":1,"productType":"...","reason":"..."}],"targetedTreatments":[{"productType":"...","reason":"..."}],"keyIngredients":["..."],"avoidIngredients":["..."]}` }
      ]
    })
  })

  const data = await response.json()
  return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } })
}
