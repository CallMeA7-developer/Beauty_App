import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  IoChevronDown,
  IoCameraOutline,
  IoCheckmarkCircle,
  IoSunnyOutline,
  IoPersonCircleOutline,
  IoWaterOutline,
  IoSparklesOutline,
  IoStarSharp,
  IoCalendarOutline,
  IoCloseOutline,
  IoCheckmark,
  IoMailOutline,
} from 'react-icons/io5'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'
import { supabase } from '../lib/supabase'
import LoadingSpinner from '../components/LoadingSpinner'

export default function SkinAnalysis() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { addToCart } = useCart()

  const [selectedConcern, setSelectedConcern] = useState(null)
  const [selectedSkinType, setSelectedSkinType] = useState(null)
  const [selectedAge, setSelectedAge] = useState(null)
  const [selectedSpecificConcerns, setSelectedSpecificConcerns] = useState([])
  const [selectedRoutine, setSelectedRoutine] = useState('Moderate')
  const [sunExposure, setSunExposure] = useState('Moderate')
  const [loading, setLoading] = useState(false)
  const [analysisResult, setAnalysisResult] = useState(null)
  const [analysisDate, setAnalysisDate] = useState(null)
  const [error, setError] = useState(null)
  const [recommendedProducts, setRecommendedProducts] = useState({ morning: [], evening: [], targeted: [] })
  const [openFaq, setOpenFaq] = useState(null)
  const [savedSuccess, setSavedSuccess] = useState(false)
  const [savedJourney, setSavedJourney] = useState(null)
  const [allAnalyses, setAllAnalyses] = useState([])
  const [showCalendar, setShowCalendar] = useState(false)
  const [scheduledDate, setScheduledDate] = useState('')
  const [scheduleSuccess, setScheduleSuccess] = useState(false)
  const [pin, setPin] = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [pinError, setPinError] = useState(false)
  const CORRECT_PIN = '6969'

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.replace('#', ''))
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
    }
  }, [location])

  useEffect(() => {
    if (user) {
      loadSavedJourney()
    }
  }, [user])

  const loadSavedJourney = async () => {
    try {
      const { data } = await supabase
        .from('skin_analysis')
        .select('skin_score, skin_label, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (data && data.length > 0) {
        setSavedJourney(data[0])
        setAllAnalyses(data)
      }
    } catch (err) {
      console.error('Error loading journey:', err)
    }
  }

  const loadSavedAnalysis = async () => {
    try {
      const { data } = await supabase
        .from('skin_analysis')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle()

      if (!data) return

      setAnalysisResult({
        skinScore: data.skin_score,
        skinLabel: data.skin_label,
        summary: data.summary,
        hydration: data.metrics?.hydration,
        texture: data.metrics?.texture,
        clarity: data.metrics?.clarity,
        toneEvenness: data.metrics?.toneEvenness,
        cards: data.analysis_cards || [],
        morning: [],
        evening: [],
        targeted: [],
      })
      setAnalysisDate(new Date(data.created_at))
      setSelectedSkinType(data.selected_skin_type || null)
      setSelectedConcern(data.selected_concern || null)
      setSelectedSpecificConcerns(data.selected_specific_concerns || [])

      const fetchByIds = async (ids) => {
        if (!ids || ids.length === 0) return []
        const { data: products } = await supabase
          .from('products')
          .select('*')
          .in('id', ids)
        return products || []
      }

      const [morning, evening, targeted] = await Promise.all([
        fetchByIds(data.morning_product_ids),
        fetchByIds(data.evening_product_ids),
        fetchByIds(data.targeted_product_ids),
      ])

      setRecommendedProducts({ morning, evening, targeted })

    } catch (err) {
      console.error('Error loading saved analysis:', err)
    }
  }

  const skinConcerns = ['Acne', 'Aging', 'Dryness', 'Oiliness', 'Sensitivity', 'Dark Spots']
  const skinTypes = ['Oily', 'Dry', 'Combination', 'Sensitive', 'Normal']
  const ageRanges = ['18-25', '26-35', '36-45', '46-55', '55+']
  const specificConcerns = ['Fine Lines', 'Wrinkles', 'Large Pores', 'Dark Circles', 'Uneven Tone', 'Hyperpigmentation', 'Redness', 'Blemishes', 'Texture', 'Dullness', 'Firmness', 'Hydration']

  const toggleSpecificConcern = (concern) => {
    setSelectedSpecificConcerns(prev =>
      prev.includes(concern)
        ? prev.filter(c => c !== concern)
        : [...prev, concern]
    )
  }

  const analyzeSkinn = async () => {
    if (!selectedSkinType || !selectedConcern) {
      setError('Please select your skin type and primary concern')
      return
    }

    setLoading(true)
    setError(null)
    setSavedSuccess(false)

    try {
      const apiKey = window.__OPENAI_KEY__ || import.meta.env.VITE_OPENAI_API_KEY

      if (!apiKey) {
        setError('API key not configured. Please contact support.')
        setLoading(false)
        return
      }

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          max_tokens: 1200,
          temperature: 0.8,
          messages: [
            {
              role: 'system',
              content: 'You are a professional skin analysis AI. You MUST generate unique, personalized scores every time based on the user inputs. Never return the same numbers. Respond with valid JSON only — no markdown, no backticks, no extra text.'
            },
            {
              role: 'user',
              content: `Analyze this user's skin and return a fully personalized result. The scores must reflect their actual profile — do NOT use generic or repeated numbers.

User Profile:
- Skin Type: ${selectedSkinType}
- Primary Concern: ${selectedConcern}
- Age Range: ${selectedAge || 'Unknown'}
- Specific Issues: ${selectedSpecificConcerns.join(', ') || 'None'}
- Current Routine: ${selectedRoutine}
- Sun Exposure: ${sunExposure}

Scoring rules:
- Oily skin → lower clarity (50–70), lower texture (55–72)
- Dry skin → lower hydration (40–65)
- Acne concern → lower clarity (45–65), lower toneEvenness (50–68)
- Aging concern → lower texture (50–70), lower toneEvenness (55–72)
- Sensitivity → lower clarity (55–72)
- Dark Spots → lower toneEvenness (45–65)
- High sun exposure → lower toneEvenness and clarity by 5–10 points
- Minimal routine → reduce all scores by 5–8 points
- Extensive routine → increase all scores by 5–8 points
- Age 46+ → reduce texture and firmness scores
- skinScore = average of all 4 metrics rounded

All card descriptions and summaries must be specific to the user's skin type, concern, age, and issues.
Morning and evening routine products must match the user's skin concern and type.

Return ONLY this JSON structure with real calculated values (no placeholder zeros):
{"skinScore":75,"skinLabel":"Good Skin","summary":"Personalized summary here based on their profile","hydration":72,"texture":68,"clarity":65,"toneEvenness":70,"cards":[{"title":"Skin Analysis","description":"Detailed finding specific to their skin type and concern","badge":"Confirmed"},{"title":"Hydration Level","description":"Specific hydration insight based on their skin type","badge":"Good"},{"title":"Texture & Pores","description":"Texture insight based on their concern","badge":"Fair"},{"title":"Pigmentation","description":"Pigmentation finding based on their concern","badge":"Mild"},{"title":"Fine Lines & Aging","description":"Aging insight based on their age range","badge":"Early"},{"title":"Problem Areas","description":"Key problem areas specific to their inputs","badge":"Monitor"}],"morning":["Product 1 for their skin type","Product 2","Product 3","Product 4"],"evening":["Evening product 1","Evening product 2","Evening product 3","Evening product 4"],"targeted":["Targeted treatment 1","Targeted treatment 2","Targeted treatment 3"]}`
            }
          ]
        })
      })

      if (!response.ok) throw new Error('API error: ' + response.status)

      const data = await response.json()
      const content = data.choices[0].message.content.trim()
      const cleaned = content.replace(/```json|```/g, '').trim()
      const result = JSON.parse(cleaned)

      setAnalysisResult(result)
      setAnalysisDate(new Date())
      await fetchRecommendedProducts(result)
      if (user) await saveAnalysisToDatabase(result)
      setTimeout(() => {
        document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' })
      }, 300)

    } catch (err) {
      console.error('Analysis error:', err)
      setError('Failed to analyze skin. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const fetchRecommendedProducts = async (result) => {
    const usedProductIds = new Set()

    // Mappings
    const concernMap = {
      'Acne': 'Acne Care',
      'Aging': 'Anti-Aging',
      'Dryness': 'Hydration',
      'Oiliness': 'Acne Care',
      'Sensitivity': 'Redness Relief',
      'Dark Spots': 'Dark Spots'
    }

    const skinTypeMap = {
      'Oily': 'Oily',
      'Dry': 'Dry',
      'Combination': 'Combination',
      'Sensitive': 'Sensitive',
      'Normal': 'Mature'
    }

    const mappedConcern = concernMap[selectedConcern] || 'Acne Care'
    const mappedSkinType = skinTypeMap[selectedSkinType] || 'Oily'

    console.log('mappedConcern:', mappedConcern, 'mappedSkinType:', mappedSkinType, 'specificConcerns:', selectedSpecificConcerns)

    // FIX 1: shuffle always returns a NEW array — never mutates original
    const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5)

    // Pick unique products from a pool, tracking used IDs globally
    const pickUnique = (pool, count) => {
      const filtered = pool.filter(p => !usedProductIds.has(p.id))
      const shuffled = shuffle(filtered)
      const picked = shuffled.slice(0, count)
      picked.forEach(p => usedProductIds.add(p.id))
      return picked
    }

    // Step 1 & 2: AND logic first, fallback to OR
    let { data: productsAnd } = await supabase
      .from('products')
      .select('*')
      .ilike('category', 'skincare')
      .contains('skin_concerns', [mappedConcern])
      .contains('skin_types', [mappedSkinType])

    if (!productsAnd) productsAnd = []

    let allPool = []

    if (productsAnd.length >= 8) {
      // Enough for both steps with AND logic
      allPool = productsAnd
    } else {
      // Fallback: OR logic — fetch concern OR skin type
      let { data: productsOr } = await supabase
        .from('products')
        .select('*')
        .ilike('category', 'skincare')
        .or(`skin_concerns.cs.{${mappedConcern}},skin_types.cs.{${mappedSkinType}}`)

      if (!productsOr) productsOr = []

      // Merge AND + OR results, remove duplicates by id
      allPool = [...new Map([...productsAnd, ...productsOr].map(p => [p.id, p])).values()]
    }

    // FIX 1: Pick from the same pool independently — each call filters already-used IDs
    const step1Products = pickUnique(allPool, 4)
    const step2Products = pickUnique(allPool, 4)

    // Step 3: 1 product per selected specific concern, no repeats
    const specificConcernMapping = {
      'Fine Lines':        { skinTypes: ['Mature', 'Dry'],                     concerns: ['Anti-Aging'],                       ingredients: ['Retinol', 'Hyaluronic Acid'] },
      'Wrinkles':          { skinTypes: ['Mature', 'Dry'],                     concerns: ['Anti-Aging'],                       ingredients: ['Retinol', 'Hyaluronic Acid'] },
      'Large Pores':       { skinTypes: ['Oily', 'Combination'],               concerns: ['Acne Care'],                        ingredients: ['Niacinamide', 'AHA/BHA'] },
      'Dark Circles':      { skinTypes: ['Dry', 'Mature'],                     concerns: ['Hydration', 'Brightness'],          ingredients: ['Vitamin C', 'Hyaluronic Acid'] },
      'Uneven Tone':       { skinTypes: ['Combination', 'Mature'],             concerns: ['Brightness', 'Dark Spots'],         ingredients: ['Vitamin C', 'Niacinamide'] },
      'Hyperpigmentation': { skinTypes: ['Combination', 'Mature'],             concerns: ['Dark Spots', 'Brightness'],         ingredients: ['Vitamin C', 'Niacinamide'] },
      'Redness':           { skinTypes: ['Sensitive', 'Dry'],                  concerns: ['Redness Relief'],                   ingredients: ['Ceramides', 'Niacinamide'] },
      'Blemishes':         { skinTypes: ['Oily', 'Combination'],               concerns: ['Acne Care'],                        ingredients: ['AHA/BHA', 'Niacinamide'] },
      'Texture':           { skinTypes: ['Oily', 'Combination', 'Mature'],     concerns: ['Acne Care', 'Anti-Aging', 'Brightness'], ingredients: ['AHA/BHA', 'Retinol', 'Niacinamide'] },
      'Dullness':          { skinTypes: ['Dry', 'Mature'],                     concerns: ['Brightness', 'Hydration'],          ingredients: ['Vitamin C', 'Hyaluronic Acid'] },
      'Firmness':          { skinTypes: ['Mature'],                            concerns: ['Anti-Aging'],                       ingredients: ['Retinol', 'Hyaluronic Acid'] },
      'Hydration':         { skinTypes: ['Dry', 'Sensitive', 'Mature'],        concerns: ['Hydration'],                        ingredients: ['Hyaluronic Acid', 'Ceramides'] },
    }

    const targetedProducts = []

    for (const concern of selectedSpecificConcerns) {
      const mapping = specificConcernMapping[concern]
      if (!mapping) continue

      // Skin Types: AND logic (product must match at least one of the skin types — overlaps)
      const { data: targetedData } = await supabase
        .from('products')
        .select('*')
        .ilike('category', 'skincare')
        .overlaps('skin_types', mapping.skinTypes)

      if (!targetedData || targetedData.length === 0) continue

      // Skin Concerns: OR logic, Ingredients: OR logic — filter in JS
      const filtered = targetedData.filter(p => {
        const hasConcern = p.skin_concerns?.some(c => mapping.concerns.includes(c))
        const hasIngredient = p.ingredients?.some(i => mapping.ingredients.includes(i))
        return hasConcern || hasIngredient
      })

      if (filtered.length > 0) {
        const picked = pickUnique(filtered, 1)
        if (picked.length > 0) targetedProducts.push(picked[0])
      }
    }

    setRecommendedProducts({
      morning: step1Products,
      evening: step2Products,
      targeted: targetedProducts
    })
  }

  const saveAnalysisToDatabase = async (result) => {
    try {
      // Insert new row to keep full history
      await supabase.from('skin_analysis').insert({
        user_id: user.id,
        skin_score: result.skinScore,
        skin_label: result.skinLabel,
        summary: result.summary,
        metrics: {
          hydration: result.hydration,
          texture: result.texture,
          clarity: result.clarity,
          toneEvenness: result.toneEvenness
        },
        analysis_cards: result.cards,
        selected_skin_type: selectedSkinType,
        selected_concern: selectedConcern,
        selected_specific_concerns: selectedSpecificConcerns,
        created_at: new Date().toISOString()
      })
    } catch (err) {
      console.error('Failed to save:', err)
    }
  }

  const saveToProfile = async () => {
    if (!user) {
      alert('Please sign in to save your analysis')
      return
    }
    try {
      // Insert new row to keep full history (Profile.jsx reads latest)
      await supabase.from('skin_analysis').insert({
        user_id: user.id,
        skin_score: analysisResult.skinScore,
        skin_label: analysisResult.skinLabel,
        summary: analysisResult.summary,
        metrics: {
          hydration: analysisResult.hydration,
          texture: analysisResult.texture,
          clarity: analysisResult.clarity,
          toneEvenness: analysisResult.toneEvenness,
        },
        analysis_cards: analysisResult.cards,
        selected_skin_type: selectedSkinType,
        selected_concern: selectedConcern,
        selected_specific_concerns: selectedSpecificConcerns,
        morning_product_ids: recommendedProducts.morning.map(p => p.id),
        evening_product_ids: recommendedProducts.evening.map(p => p.id),
        targeted_product_ids: recommendedProducts.targeted.map(p => p.id),
        created_at: new Date().toISOString(),
      })
      setSavedSuccess(true)
      await loadSavedJourney()
    } catch (err) {
      console.error('Save error:', err)
      alert('Failed to save. Please try again.')
    }
  }

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const guidelines = [
    { icon: IoSunnyOutline, title: 'Good Lighting', desc: 'Natural daylight preferred' },
    { icon: IoPersonCircleOutline, title: 'Face Forward', desc: 'Look directly at camera' },
    { icon: IoSparklesOutline, title: 'Remove Makeup', desc: 'Clean, bare skin' },
  ]

  const faqs = [
    { q: 'How accurate is the AI skin analysis?', a: 'Our AI technology analyzes skin with 98% accuracy, validated by dermatologists and based on millions of skin scans.' },
    { q: 'How often should I get analyzed?', a: 'We recommend monthly analysis to track improvements and adjust your skincare routine as needed.' },
    { q: 'Is my data private and secure?', a: 'Absolutely. All images and data are encrypted and never shared with third parties. Your privacy is our priority.' },
    { q: 'Does the analysis cost anything?', a: 'The basic analysis is complimentary. Premium features include expert consultations and advanced tracking.' },
    { q: 'Can I use recommended products from other brands?', a: 'While we recommend our scientifically formulated products, the analysis results can guide any skincare choice.' },
    { q: 'How long until I see results?', a: 'Most users notice improvements within 4-6 weeks of following their personalized routine consistently.' },
  ]

  const Stars = () => [...Array(5)].map((_, i) => <IoStarSharp key={i} className="w-[14px] h-[14px] text-[#C9A870]" />)

  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-[8px] overflow-hidden border border-[#E8E3D9]">
      <img
        src={product.img_url || product.image_url || product.image}
        alt={product.name}
        className="w-full h-[180px] md:h-[200px] lg:h-[240px] object-cover"
      />
      <div className="p-4 md:p-5">
        <p className="text-[11px] lg:text-[12px] font-light italic text-[#8B7355] mb-1">{product.brand || 'Shan Loray'}</p>
        <h4 className="text-[13px] md:text-[14px] lg:text-[16px] font-medium text-[#1A1A1A] mb-1 leading-snug">{product.name}</h4>
        <p className="text-[11px] lg:text-[12px] font-normal text-[#666666] mb-2 line-clamp-2">{product.description?.slice(0, 60)}...</p>
        <p className="text-[15px] md:text-[16px] lg:text-[18px] font-semibold text-[#1A1A1A] mb-2">${parseFloat(product.price).toFixed(2)}</p>
        <div className="flex items-center gap-1 mb-3">
          <Stars />
          <span className="text-[11px] font-normal text-[#999999] ml-1">({product.review_count || 0})</span>
        </div>
        <button
          onClick={() => addToCart(
            product.id,
            product.name,
            product.img_url || product.image_url,
            product.brand || 'Shan Loray',
            product.size || '',
            product.price,
            1
          )}
          className="w-full h-[40px] lg:h-[44px] bg-[#8B7355] text-white text-[13px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )

  // FIX 2: Dynamic grid columns for Step 3 based on number of targeted products
  const getGridCols = (count) => {
    if (count === 1) return 'grid-cols-1'
    if (count === 2) return 'grid-cols-1 sm:grid-cols-2'
    return 'grid-cols-1 sm:grid-cols-3'
  }

  if (!unlocked) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #3D2B00 0%, #5C4200 40%, #7A5800 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', fontFamily: 'Cormorant Garamond, serif' }}>
        <div style={{ width: '100%', maxWidth: '440px', background: 'rgba(20, 12, 0, 0.7)', backdropFilter: 'blur(24px)', borderRadius: '24px', padding: '40px', boxShadow: '0 24px 64px rgba(0,0,0,0.3)', border: '1px solid rgba(201,168,112,0.25)' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
            <div style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, #C9A870, #8B7355)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '40px', height: '40px' }} fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
          <h1 style={{ fontSize: '30px', fontWeight: 'bold', color: '#FFFFFF', textAlign: 'center', marginBottom: '8px' }}>Preview Access</h1>
          <p style={{ fontSize: '15px', color: 'rgba(201,168,112,0.7)', textAlign: 'center', marginBottom: '32px', lineHeight: '1.6' }}>
            This environment is not public yet.<br />Enter the access code to continue.
          </p>
          <div style={{ marginBottom: '8px' }}>
            <label style={{ fontSize: '13px', fontWeight: '500', color: 'rgba(201,168,112,0.7)', display: 'block', marginBottom: '8px' }}>Access code</label>
            <input
              type="password"
              value={pin}
              onChange={(e) => { setPin(e.target.value); setPinError(false) }}
              onKeyDown={(e) => { if (e.key === 'Enter') { if (pin === CORRECT_PIN) { setUnlocked(true) } else { setPinError(true); setPin(''); setTimeout(() => setPinError(false), 2000) } } }}
              placeholder="····"
              maxLength={10}
              style={{ width: '100%', height: '52px', background: 'rgba(10, 6, 0, 0.8)', color: '#FFFFFF', fontSize: '20px', letterSpacing: '8px', textAlign: 'center', borderRadius: '12px', outline: 'none', border: pinError ? '2px solid #EF4444' : '2px solid rgba(201,168,112,0.3)', boxSizing: 'border-box' }}
            />
            {pinError && <p style={{ color: '#EF4444', fontSize: '13px', textAlign: 'center', marginTop: '8px' }}>Incorrect access code. Please try again.</p>}
          </div>
          <button
            onClick={() => { if (pin === CORRECT_PIN) { setUnlocked(true) } else { setPinError(true); setPin(''); setTimeout(() => setPinError(false), 2000) } }}
            style={{ width: '100%', height: '52px', background: 'linear-gradient(to right, #C9A870, #8B7355)', color: 'white', fontSize: '16px', fontWeight: '600', borderRadius: '12px', border: 'none', cursor: 'pointer', marginTop: '16px' }}
          >
            Continue
          </button>
          <a href="/" style={{ display: 'block', marginTop: '12px' }}>
            <button style={{ width: '100%', height: '52px', background: 'transparent', color: 'rgba(201,168,112,0.7)', fontSize: '14px', fontWeight: '500', borderRadius: '12px', border: '1px solid rgba(201,168,112,0.25)', cursor: 'pointer' }}>
              Continue Shopping
            </button>
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white font-['Cormorant_Garamond']">

      {/* Hero */}
      <div className="min-h-[340px] md:min-h-[420px] lg:min-h-[520px] bg-gradient-to-b from-[#FDFBF7] to-[#F5F1EA] relative overflow-hidden flex items-center px-6 md:px-[60px] lg:px-[120px] py-10 md:py-0">
        <div className="w-full md:w-[500px] lg:w-[650px] relative z-10">
          <p className="text-[12px] md:text-[13px] lg:text-[14px] font-light italic text-[#8B7355] tracking-[2px] mb-3">AI-POWERED SKIN ANALYSIS</p>
          <h1 className="text-[40px] md:text-[56px] lg:text-[72px] font-bold text-[#1A1A1A] leading-[1] mb-4 lg:mb-6">Discover Your Skin's True Potential</h1>
          <p className="text-[14px] md:text-[17px] lg:text-[20px] font-normal text-[#666666] mb-6 lg:mb-8">Advanced AI technology analyzes your skin in seconds with medical-grade precision</p>
          <div className="w-[100px] md:w-[120px] lg:w-[140px] h-[4px] bg-[#C9A870]" />
        </div>
        <div className="hidden lg:block absolute right-[180px] top-1/2 -translate-y-1/2">
          <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=400&fit=crop" alt="Skin Analysis" className="w-[400px] h-[400px] object-cover rounded-[8px] shadow-[0_12px_48px_rgba(0,0,0,0.12)]" />
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="min-h-[48px] bg-[#FDFBF7] px-4 md:px-[60px] lg:px-[120px] flex items-center">
        <span className="text-[13px] lg:text-[15px] font-normal text-[#8B7355] cursor-pointer">Home</span>
        <span className="text-[13px] lg:text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[13px] lg:text-[15px] font-normal text-[#8B7355] cursor-pointer">Technology</span>
        <span className="text-[13px] lg:text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[13px] lg:text-[15px] font-normal text-[#666666]">Skin Analysis</span>
      </div>

      {/* Upload Section - Hidden, kept as anchor for scroll */}
      <div id="upload-section" />

      {/* Questionnaire */}
      <div className="bg-[#FDFBF7] px-4 md:px-[60px] lg:px-[120px] py-10 md:py-14 lg:py-[64px]">
        <h2 className="text-[28px] md:text-[38px] lg:text-[48px] font-medium text-[#1A1A1A] text-center mb-4">Tell Us About Your Skin</h2>
        <p className="text-[13px] md:text-[15px] lg:text-[16px] font-normal text-[#666666] text-center mb-10 lg:mb-[56px]">Help us understand your unique skin concerns</p>

        {error && (
          <div className="max-w-[1200px] mx-auto mb-6 p-4 bg-red-50 border border-red-200 rounded-[8px] text-red-600 text-[14px]">{error}</div>
        )}

        {loading && (
          <div className="max-w-[1200px] mx-auto mb-6 p-6 bg-white rounded-[16px] shadow-[0_4px_16px_rgba(0,0,0,0.06)] flex flex-col items-center">
            <LoadingSpinner />
            <p className="text-[16px] text-[#8B7355] mt-4">Analyzing your skin... This may take a few seconds</p>
          </div>
        )}

        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 lg:gap-8 mb-10 lg:mb-12">

          {/* Primary Concern */}
          <div className="bg-white rounded-[16px] shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-5 lg:p-[32px]">
            <h3 className="text-[16px] lg:text-[18px] font-medium text-[#1A1A1A] mb-4 lg:mb-5">Primary Skin Concern</h3>
            <div className="grid grid-cols-2 gap-3">
              {skinConcerns.map((concern) => (
                <button key={concern} onClick={() => setSelectedConcern(concern)}
                  className={`h-[44px] lg:h-[48px] px-4 text-[13px] lg:text-[14px] rounded-[8px] transition-colors ${selectedConcern === concern ? 'bg-[#C9A870] text-white' : 'bg-[#F5F1EA] text-[#3D3D3D] hover:bg-[#e8e3d9]'}`}>
                  {concern}
                </button>
              ))}
            </div>
          </div>

          {/* Skin Type */}
          <div className="bg-white rounded-[16px] shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-5 lg:p-[32px]">
            <h3 className="text-[16px] lg:text-[18px] font-medium text-[#1A1A1A] mb-4 lg:mb-5">Skin Type</h3>
            <div className="grid grid-cols-3 gap-3">
              {skinTypes.map((type) => (
                <button key={type} onClick={() => setSelectedSkinType(type)}
                  className={`h-[44px] lg:h-[48px] px-4 text-[13px] lg:text-[14px] rounded-[8px] transition-colors ${selectedSkinType === type ? 'bg-[#C9A870] text-white' : 'bg-[#F5F1EA] text-[#3D3D3D] hover:bg-[#e8e3d9]'}`}>
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Current Routine */}
          <div className="bg-white rounded-[16px] shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-5 lg:p-[32px]">
            <h3 className="text-[16px] lg:text-[18px] font-medium text-[#1A1A1A] mb-4 lg:mb-5">Current Routine</h3>
            <select value={selectedRoutine} onChange={(e) => setSelectedRoutine(e.target.value)}
              className="w-full h-[48px] lg:h-[56px] bg-white border border-[#E8E3D9] rounded-[8px] px-5 text-[13px] lg:text-[15px] font-normal text-[#2B2B2B] cursor-pointer outline-none">
              <option>Minimal (1-3 products)</option>
              <option>Moderate (4-6 products)</option>
              <option>Extensive (7+ products)</option>
            </select>
          </div>

          {/* Sun Exposure */}
          <div className="bg-white rounded-[16px] shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-5 lg:p-[32px]">
            <h3 className="text-[16px] lg:text-[18px] font-medium text-[#1A1A1A] mb-4 lg:mb-5">Sun Exposure</h3>
            <div className="flex gap-3">
              {['Minimal', 'Moderate', 'High'].map((level) => (
                <button key={level} onClick={() => setSunExposure(level)}
                  className={`flex-1 h-[44px] text-[13px] lg:text-[14px] rounded-[8px] transition-colors ${sunExposure === level ? 'bg-[#C9A870] text-white' : 'bg-[#F5F1EA] text-[#3D3D3D] hover:bg-[#e8e3d9]'}`}>
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Age Range */}
          <div className="bg-white rounded-[16px] shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-5 lg:p-[32px]">
            <h3 className="text-[16px] lg:text-[18px] font-medium text-[#1A1A1A] mb-4 lg:mb-5">Age Range</h3>
            <div className="grid grid-cols-3 gap-3">
              {ageRanges.map((range) => (
                <button key={range} onClick={() => setSelectedAge(range)}
                  className={`h-[44px] lg:h-[48px] px-4 text-[13px] lg:text-[14px] rounded-[8px] transition-colors ${selectedAge === range ? 'bg-[#C9A870] text-white' : 'bg-[#F5F1EA] text-[#3D3D3D] hover:bg-[#e8e3d9]'}`}>
                  {range}
                </button>
              ))}
            </div>
          </div>

          {/* Specific Concerns */}
          <div className="md:col-span-2 bg-white rounded-[16px] shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-5 lg:p-[32px]">
            <h3 className="text-[16px] lg:text-[18px] font-medium text-[#1A1A1A] mb-4 lg:mb-5">Specific Concerns</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {specificConcerns.map((concern) => (
                <label key={concern} className="flex items-center gap-3 cursor-pointer" onClick={() => toggleSpecificConcern(concern)}>
                  <div className={`w-[16px] h-[16px] lg:w-[18px] lg:h-[18px] border-2 rounded-[2px] flex items-center justify-center flex-shrink-0 ${selectedSpecificConcerns.includes(concern) ? 'border-[#8B7355] bg-[#8B7355]' : 'border-[#C9A870]'}`}>
                    {selectedSpecificConcerns.includes(concern) && <IoCheckmarkCircle className="w-[12px] h-[12px] lg:w-[14px] lg:h-[14px] text-white" />}
                  </div>
                  <span className="text-[13px] lg:text-[14px] font-normal text-[#3D3D3D]">{concern}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button onClick={analyzeSkinn} disabled={loading}
            className="w-full sm:w-[200px] lg:w-[240px] h-[48px] lg:h-[56px] bg-[#8B7355] text-white text-[15px] lg:text-[16px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? 'Analyzing...' : 'Analyze My Skin'}
          </button>
        </div>

        {!user && analysisResult && (
          <div className="max-w-[1200px] mx-auto mt-6 p-4 bg-[#F5F1EA] rounded-[12px] text-center">
            <p className="text-[14px] text-[#666666]"><span className="font-medium text-[#8B7355]">Save your results</span> — Sign in to save your analysis</p>
          </div>
        )}
      </div>

      {/* Analysis Results */}
      {analysisResult && (
        <div id="results-section" className="bg-white px-4 md:px-[60px] lg:px-[120px] py-10 md:py-14 lg:py-[80px]">
          <h2 className="text-[28px] md:text-[40px] lg:text-[56px] font-bold text-[#1A1A1A] text-center mb-4">Your Skin Analysis Results</h2>
          <div className="flex justify-center mb-8 lg:mb-12">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-[#C9A870] text-white text-[13px] lg:text-[14px] font-medium rounded-full">
              <IoCheckmarkCircle className="w-[16px] h-[16px] lg:w-[18px] lg:h-[18px]" />
              Analysis Complete
            </div>
          </div>

          {/* Score Dashboard */}
          <div className="max-w-[1200px] mx-auto bg-gradient-to-b from-[#F5F1EA] to-white rounded-[16px] p-5 md:p-8 lg:p-[40px] mb-8 lg:mb-10">
            <div className="text-center mb-6 lg:mb-8">
              <div className="text-[48px] md:text-[56px] lg:text-[64px] font-bold text-[#8B7355] mb-2">{analysisResult.skinScore}/100</div>
              <h3 className="text-[17px] lg:text-[20px] font-medium text-[#1A1A1A] mb-2">{analysisResult.skinLabel}</h3>
              <p className="text-[13px] lg:text-[16px] font-normal text-[#666666] max-w-[600px] mx-auto">{analysisResult.summary}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
              {[
                { label: 'Hydration', value: analysisResult.hydration },
                { label: 'Texture', value: analysisResult.texture },
                { label: 'Clarity', value: analysisResult.clarity },
                { label: 'Tone Evenness', value: analysisResult.toneEvenness },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col items-center">
                  <IoWaterOutline className="w-[24px] h-[24px] lg:w-[32px] lg:h-[32px] text-[#8B7355] mb-2" />
                  <span className="text-[13px] lg:text-[15px] font-normal text-[#666666] mb-1">{stat.label}</span>
                  <span className="text-[24px] md:text-[28px] lg:text-[32px] font-semibold text-[#1A1A1A] mb-2">{stat.value}%</span>
                  <div className="w-full h-[7px] lg:h-[8px] bg-[#E8E3D9] rounded-full overflow-hidden">
                    <div className="h-full bg-[#8B7355] rounded-full" style={{ width: `${stat.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Analysis Cards */}
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 lg:gap-8 mb-8 lg:mb-10">
            {analysisResult.cards.map((card, idx) => (
              <div key={idx} className="bg-white border border-[#E8E3D9] rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-5 lg:p-[28px]">
                <div className="flex items-start justify-between mb-3">
                  <IoSparklesOutline className="w-[24px] h-[24px] lg:w-[28px] lg:h-[28px] text-[#8B7355]" />
                  {card.badge && <span className="px-3 py-1 bg-[#F5F1EA] text-[#8B7355] text-[10px] lg:text-[11px] font-medium rounded-full">{card.badge}</span>}
                </div>
                <h4 className="text-[16px] md:text-[18px] lg:text-[20px] font-medium text-[#1A1A1A] mb-3">{card.title}</h4>
                <p className="text-[13px] lg:text-[15px] font-normal text-[#666666] leading-[1.6]">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Product Recommendations */}
      {analysisResult && (
        <div className="bg-[#FDFBF7] px-4 md:px-[60px] lg:px-[120px] py-10 md:py-14 lg:py-[80px]">
          <h2 className="text-[24px] md:text-[36px] lg:text-[48px] font-medium text-[#1A1A1A] text-center mb-4">Personalized Product Recommendations</h2>
          <p className="text-[13px] md:text-[15px] lg:text-[16px] font-normal text-[#666666] text-center mb-10 lg:mb-[56px]">Curated specifically for your skin analysis results</p>

          {/* Step 1: Morning */}
          <div className="max-w-[1200px] mx-auto bg-white rounded-[16px] shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-5 md:p-6 lg:p-[40px] mb-6 lg:mb-8">
            <span className="inline-block px-4 py-2 bg-[#F5F1EA] text-[#8B7355] text-[11px] lg:text-[12px] font-medium rounded-full mb-4">STEP 1: MORNING</span>
            <h3 className="text-[20px] md:text-[24px] lg:text-[28px] font-medium text-[#1A1A1A] mb-6 lg:mb-8">Morning Protection Routine</h3>
            {recommendedProducts.morning.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-5">
                {recommendedProducts.morning.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <p className="text-[14px] text-[#999999] text-center py-8">Loading products...</p>
            )}
          </div>

          {/* Step 2: Evening */}
          <div className="max-w-[1200px] mx-auto bg-white rounded-[16px] shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-5 md:p-6 lg:p-[40px] mb-6 lg:mb-8">
            <span className="inline-block px-4 py-2 bg-[#F5F1EA] text-[#8B7355] text-[11px] lg:text-[12px] font-medium rounded-full mb-4">STEP 2: EVENING</span>
            <h3 className="text-[20px] md:text-[24px] lg:text-[28px] font-medium text-[#1A1A1A] mb-6 lg:mb-8">Evening Repair Routine</h3>
            {recommendedProducts.evening.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-5">
                {recommendedProducts.evening.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <p className="text-[14px] text-[#999999] text-center py-8">Loading products...</p>
            )}
          </div>

          {/* Step 3: Targeted — FIX 2: no slice, dynamic grid cols */}
          <div className="max-w-[1200px] mx-auto bg-white rounded-[16px] shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-5 md:p-6 lg:p-[40px] mb-6 lg:mb-8">
            <span className="inline-block px-4 py-2 bg-[#F5F1EA] text-[#8B7355] text-[11px] lg:text-[12px] font-medium rounded-full mb-4">STEP 3: TARGETED CARE</span>
            <h3 className="text-[20px] md:text-[24px] lg:text-[28px] font-medium text-[#1A1A1A] mb-6 lg:mb-8">Specialized Treatments</h3>
            {recommendedProducts.targeted.length > 0 ? (
              <div className={`grid ${getGridCols(recommendedProducts.targeted.length)} gap-4 lg:gap-5`}>
                {recommendedProducts.targeted.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <p className="text-[14px] text-[#999999] text-center py-8">
                {selectedSpecificConcerns.length === 0 ? 'Select specific concerns above to see targeted products.' : 'Loading products...'}
              </p>
            )}
          </div>

          {savedSuccess && (
            <div className="max-w-[1200px] mx-auto mb-4 p-4 bg-[#F5F1EA] border border-[#C9A870] rounded-[8px] text-center">
              <p className="text-[14px] lg:text-[15px] font-medium text-[#8B7355]">✓ Analysis saved to your profile successfully!</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/beauty-journey')}
              className="w-full sm:w-auto h-[48px] lg:h-[56px] px-8 bg-[#8B7355] text-white text-[14px] lg:text-[15px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">
              View Complete Routine
            </button>
            <button
              onClick={saveToProfile}
              className="w-full sm:w-auto h-[48px] lg:h-[56px] px-8 bg-white border-2 border-[#8B7355] text-[#8B7355] text-[14px] lg:text-[15px] font-medium rounded-[8px] hover:bg-[#F5F1EA] transition-colors">
              Save to My Profile
            </button>
          </div>
        </div>
      )}

      {/* Track Your Skin Journey */}
      <div className="bg-white px-4 md:px-[60px] lg:px-[120px] py-10 md:py-12 lg:py-[64px]">
        <h2 className="text-[24px] md:text-[36px] lg:text-[48px] font-medium text-[#1A1A1A] mb-4 lg:mb-6">Track Your Skin Journey</h2>
        <p className="text-[13px] md:text-[15px] lg:text-[16px] font-normal text-[#666666] mb-10 lg:mb-[56px]">Monitor improvements with regular skin analysis</p>

        <div className="max-w-[1200px] mx-auto">

          {/* History List */}
          {allAnalyses.length > 0 ? (
            <div className="space-y-4 mb-8">
              {allAnalyses.map((analysis, index) => (
                <div key={index} className="bg-gradient-to-b from-[#F5F1EA] to-white rounded-[16px] p-5 md:p-6 lg:p-[32px] flex flex-col sm:flex-row items-center gap-6">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-[80px] h-[80px] lg:w-[100px] lg:h-[100px] rounded-[12px] bg-[#C9A870] flex items-center justify-center mb-3">
                      <IoSparklesOutline className="w-[36px] h-[36px] lg:w-[44px] lg:h-[44px] text-white" />
                    </div>
                    <div className="text-[24px] lg:text-[28px] font-bold text-[#8B7355] mb-1">{analysis.skin_score}/100</div>
                    <div className="px-3 py-1 bg-white rounded-full text-[11px] lg:text-[12px] text-[#8B7355] font-medium border border-[#E8E3D9]">
                      {analysis.skin_label || 'Analysis'}
                    </div>
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <div className="flex items-center gap-2 mb-2 justify-center sm:justify-start">
                      <IoCalendarOutline className="w-[16px] h-[16px] text-[#8B7355]" />
                      <span className="text-[13px] lg:text-[14px] text-[#666666]">{formatDate(new Date(analysis.created_at))}</span>
                      {index === 0 && <span className="bg-[#8B7355] text-white text-[10px] px-2 py-0.5 rounded-full">Latest</span>}
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
                      {[
                        { label: 'Hydration', value: analysis.metrics?.hydration },
                        { label: 'Texture', value: analysis.metrics?.texture },
                        { label: 'Clarity', value: analysis.metrics?.clarity },
                        { label: 'Tone', value: analysis.metrics?.toneEvenness },
                      ].map((m) => m.value != null && (
                        <div key={m.label} className="bg-white rounded-[8px] p-2 text-center border border-[#E8E3D9]">
                          <div className="text-[14px] lg:text-[16px] font-bold text-[#8B7355]">{m.value}%</div>
                          <div className="text-[11px] text-[#666666]">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gradient-to-b from-[#F5F1EA] to-white rounded-[16px] p-8 lg:p-[40px] flex flex-col items-center justify-center text-center mb-8">
              <div className="w-[80px] h-[80px] lg:w-[100px] lg:h-[100px] rounded-full bg-[#F5F1EA] flex items-center justify-center mb-6">
                <IoSparklesOutline className="w-[36px] h-[36px] lg:w-[44px] lg:h-[44px] text-[#C9A870]" />
              </div>
              <h3 className="text-[18px] lg:text-[22px] font-medium text-[#1A1A1A] mb-3">No Analysis Yet</h3>
              <p className="text-[13px] lg:text-[15px] font-normal text-[#666666] max-w-[380px]">Complete your first skin analysis above to start tracking your skin journey over time.</p>
            </div>
          )}

          {/* Schedule Next Analysis Button */}
          <div className="text-center">
            <button
              onClick={() => setShowCalendar(true)}
              className="h-[48px] lg:h-[52px] px-8 bg-[#8B7355] text-white text-[14px] lg:text-[15px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors flex items-center gap-2 mx-auto">
              <IoCalendarOutline className="w-[18px] h-[18px]" />
              Schedule Next Analysis
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Modal */}
      {showCalendar && (
        <>
          <div className="fixed inset-0 bg-black/40 z-50" onClick={() => setShowCalendar(false)} />
          <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
            <div className="bg-white rounded-[16px] shadow-[0_8px_32px_rgba(139,115,85,0.2)] w-full max-w-[420px] p-6 lg:p-8 font-['Cormorant_Garamond']">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[20px] lg:text-[24px] font-semibold text-[#1A1A1A]">Schedule Next Analysis</h3>
                <button onClick={() => { setShowCalendar(false); setScheduleSuccess(false) }}>
                  <IoCloseOutline className="w-[24px] h-[24px] text-[#666666] hover:text-[#1A1A1A]" />
                </button>
              </div>

              {scheduleSuccess ? (
                <div className="text-center py-6">
                  <div className="w-[64px] h-[64px] bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IoCheckmark className="w-[32px] h-[32px] text-green-600" />
                  </div>
                  <h4 className="text-[18px] font-semibold text-[#1A1A1A] mb-2">Reminder Scheduled!</h4>
                  <p className="text-[14px] text-[#666666] mb-2">We will send a reminder to:</p>
                  <p className="text-[14px] font-medium text-[#8B7355] mb-2">{user?.email}</p>
                  <p className="text-[14px] text-[#666666]">on <span className="font-medium text-[#1A1A1A]">{new Date(scheduledDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span></p>
                </div>
              ) : (
                <>
                  <div className="mb-4">
                    <IoMailOutline className="w-[16px] h-[16px] text-[#8B7355] inline mr-2" />
                    <span className="text-[13px] text-[#666666]">Reminder will be sent to: <strong>{user?.email}</strong></span>
                  </div>
                  <div className="mb-6">
                    <label className="text-[13px] font-medium text-[#1A1A1A] block mb-2">Select Date</label>
                    <input
                      type="date"
                      value={scheduledDate}
                      min={new Date(Date.now() + 86400000).toISOString().split('T')[0]}
                      onChange={(e) => setScheduledDate(e.target.value)}
                      className="w-full h-[48px] px-4 border border-[#E8E3D9] rounded-[8px] text-[14px] text-[#1A1A1A] outline-none focus:border-[#C9A870] transition-colors"
                    />
                  </div>
                  <button
                    onClick={async () => {
                      if (!scheduledDate) return
                      try {
                        await supabase.from('skin_analysis_reminders').insert({
                          user_id: user.id,
                          email: user.email,
                          scheduled_date: scheduledDate,
                          created_at: new Date().toISOString()
                        }).then(() => {})
                      } catch(e) {}
                      setScheduleSuccess(true)
                    }}
                    disabled={!scheduledDate}
                    className="w-full h-[48px] bg-[#8B7355] text-white text-[14px] lg:text-[15px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    Confirm & Send Reminder
                  </button>
                </>
              )}
            </div>
          </div>
        </>
      )}

      {/* FAQ */}
      <div className="bg-white px-4 md:px-[60px] lg:px-[120px] py-10 md:py-12 lg:py-[64px]">
        <h2 className="text-[24px] md:text-[32px] lg:text-[40px] font-medium text-[#1A1A1A] text-center mb-10 lg:mb-[56px]">Frequently Asked Questions</h2>
        <div className="max-w-[900px] mx-auto space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white border border-[#E8E3D9] rounded-[12px] overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between gap-3 p-4 lg:p-5 text-left hover:bg-[#FDFBF7] transition-colors"
              >
                <h4 className="text-[14px] md:text-[15px] lg:text-[17px] font-medium text-[#1A1A1A]">{faq.q}</h4>
                <IoChevronDown
                  className={`w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#8B7355] flex-shrink-0 transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-4 lg:px-5 pb-4 lg:pb-5">
                  <div className="bg-[#F5F1EA] rounded-[8px] p-4 lg:p-5">
                    <p className="text-[13px] lg:text-[15px] font-normal text-[#666666] leading-[1.7]">{faq.a}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-gradient-to-b from-[#F5F1EA] to-white px-4 md:px-[60px] lg:px-[120px] py-10 md:py-12 lg:py-0 lg:min-h-[180px] flex flex-col items-center justify-center">
        <h3 className="text-[22px] md:text-[28px] lg:text-[36px] font-medium text-[#1A1A1A] mb-3 text-center">Stay Updated on Skin Health</h3>
        <p className="text-[13px] md:text-[15px] lg:text-[16px] font-normal text-[#666666] mb-5 lg:mb-6 text-center">Get personalized skincare tips and exclusive offers</p>
        <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
          <input type="email" placeholder="Enter your email" className="w-full sm:w-[280px] lg:w-[360px] h-[48px] lg:h-[56px] px-5 bg-white text-[14px] lg:text-[15px] text-[#2B2B2B] rounded-[8px] border border-[#E8E3D9] outline-none" />
          <button className="w-full sm:w-auto h-[48px] lg:h-[56px] px-8 bg-[#8B7355] text-white text-[14px] lg:text-[15px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">Subscribe</button>
        </div>
      </div>

    </div>
  )
}