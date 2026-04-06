export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { skinType, concern, age, specificConcerns, routine, sunExposure } = req.body

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
          {
            role: 'system',
            content: 'You are a skin analysis AI for Shan Loray luxury beauty brand. Respond with valid JSON only, no extra text, no markdown.'
          },
          {
            role: 'user',
            content: `Analyze: SkinType=${skinType}, Concern=${concern}, Age=${age||'Unknown'}, Issues=${specificConcerns||'None'}, Routine=${routine}, Sun=${sunExposure}. Return ONLY this JSON: {"skinScore":85,"skinLabel":"Healthy Skin","summary":"Your skin shows...","hydration":92,"texture":78,"clarity":88,"toneEvenness":81,"cards":[{"title":"${skinType} Skin","description":"detailed description based on skin type","badge":"Confirmed"},{"title":"Hydration Levels","description":"hydration analysis","badge":"Good"},{"title":"Texture & Smoothness","description":"texture analysis","badge":"Fair"},{"title":"Pigmentation","description":"pigmentation analysis","badge":"Mild"},{"title":"Fine Lines & Wrinkles","description":"aging analysis","badge":"Early"},{"title":"Problem Areas","description":"problem areas based on concerns","badge":"Monitor"}],"morning":["Gentle Cleanser","Vitamin C Serum","Moisturizer","SPF 50 Sunscreen"],"evening":["Makeup Remover","Exfoliating Toner","Retinol Serum","Night Cream"],"targeted":["Eye Cream","Dark Spot Corrector","Pore Minimizer"]}`
          }
        ]
      })
    })

    const data = await response.json()
    const content = data.choices[0].message.content
    const result = JSON.parse(content)
    res.status(200).json(result)
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: error.message })
  }
}
