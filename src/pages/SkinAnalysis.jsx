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
} from 'react-icons/io5'import { useEffect, useState } from 'react'
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


// ─── Custom Calendar Modal ────────────────────────────────────────────────────
function CalendarModal({ user, scheduledDate, setScheduledDate, scheduleSuccess, setScheduleSuccess, setShowCalendar, supabase }) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const [viewDate, setViewDate] = useState(() => {
    const d = new Date()
    d.setDate(1)
    return d
  })

  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December']
  const dayNames = ['Su','Mo','Tu','We','Th','Fr','Sa']

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate()
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay()

  const prevMonth = () => {
    setViewDate(d => {
      const nd = new Date(d)
      nd.setMonth(nd.getMonth() - 1)
      return nd
    })
  }

  const nextMonth = () => {
    setViewDate(d => {
      const nd = new Date(d)
      nd.setMonth(nd.getMonth() + 1)
      return nd
    })
  }

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)
  const days = []

  // Empty cells before first day
  for (let i = 0; i < firstDay; i++) days.push(null)
  // Actual days
  for (let i = 1; i <= daysInMonth; i++) days.push(i)

  const isSelected = (day) => {
    if (!day || !scheduledDate) return false
    const d = new Date(year, month, day)
    const sel = new Date(scheduledDate + 'T00:00:00')
    return d.toDateString() === sel.toDateString()
  }

  const isPast = (day) => {
    if (!day) return false
    const d = new Date(year, month, day)
    return d <= today
  }

  const isToday = (day) => {
    if (!day) return false
    const d = new Date(year, month, day)
    return d.toDateString() === today.toDateString()
  }

  const selectDay = (day) => {
    if (!day || isPast(day)) return
    const d = new Date(year, month, day)
    const yyyy = d.getFullYear()
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    setScheduledDate(`${yyyy}-${mm}-${dd}`)
  }

  const formatSelected = () => {
    if (!scheduledDate) return null
    return new Date(scheduledDate + 'T00:00:00').toLocaleDateString('en-US', {
      weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
    })
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-50" onClick={() => { setShowCalendar(false); setScheduleSuccess(false) }} />
      <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
        <div className="bg-white rounded-[20px] shadow-[0_16px_48px_rgba(139,115,85,0.2)] w-full max-w-[440px] font-['Cormorant_Garamond'] overflow-hidden">

          {/* Header */}
          <div className="h-[3px] bg-gradient-to-r from-[#C9A870] to-[#8B7355]" />
          <div className="px-6 pt-6 pb-4">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-[22px] font-semibold text-[#1A1A1A]">Schedule Next Analysis</h3>
              <button onClick={() => { setShowCalendar(false); setScheduleSuccess(false) }}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F5F1EA] transition-colors">
                <IoCloseOutline className="w-5 h-5 text-[#666666]" />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <IoMailOutline className="w-[14px] h-[14px] text-[#8B7355]" />
              <span className="text-[12px] text-[#666666]">Reminder to: <span className="font-medium text-[#8B7355]">{user?.email}</span></span>
            </div>
          </div>

          {scheduleSuccess ? (
            <div className="text-center px-6 pb-8 pt-4">
              <div className="w-[72px] h-[72px] bg-[#F5F1EA] rounded-full flex items-center justify-center mx-auto mb-4">
                <IoCheckmark className="w-[36px] h-[36px] text-[#8B7355]" />
              </div>
              <h4 className="text-[20px] font-semibold text-[#1A1A1A] mb-2">Reminder Scheduled!</h4>
              <p className="text-[14px] text-[#666666] mb-1">Reminder set for</p>
              <p className="text-[15px] font-medium text-[#8B7355] mb-4">{formatSelected()}</p>
              <button
                onClick={() => { setShowCalendar(false); setScheduleSuccess(false) }}
                className="h-[44px] px-8 bg-[#8B7355] text-white text-[14px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">
                Done
              </button>
            </div>
          ) : (
            <div className="px-6 pb-6">
              {/* Month Navigation */}
              <div className="flex items-center justify-between mb-4">
                <button onClick={prevMonth}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F5F1EA] transition-colors">
                  <IoChevronDown className="w-4 h-4 text-[#8B7355] rotate-90" />
                </button>
                <span className="text-[16px] font-semibold text-[#1A1A1A]">
                  {monthNames[month]} {year}
                </span>
                <button onClick={nextMonth}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F5F1EA] transition-colors">
                  <IoChevronDown className="w-4 h-4 text-[#8B7355] -rotate-90" />
                </button>
              </div>

              {/* Day Headers */}
              <div className="grid grid-cols-7 mb-2">
                {dayNames.map(d => (
                  <div key={d} className="text-center text-[11px] font-medium text-[#8B7355] py-1">{d}</div>
                ))}
              </div>

              {/* Days Grid */}
              <div className="grid grid-cols-7 gap-y-1 mb-5">
                {days.map((day, idx) => (
                  <div key={idx} className="flex items-center justify-center">
                    {day ? (
                      <button
                        onClick={() => selectDay(day)}
                        disabled={isPast(day)}
                        className={`w-9 h-9 rounded-full text-[14px] font-normal transition-all
                          ${isSelected(day)
                            ? 'bg-[#8B7355] text-white font-semibold shadow-[0_2px_8px_rgba(139,115,85,0.3)]'
                            : isToday(day)
                            ? 'border-2 border-[#C9A870] text-[#8B7355] font-medium'
                            : isPast(day)
                            ? 'text-[#CCCCCC] cursor-not-allowed'
                            : 'text-[#1A1A1A] hover:bg-[#F5F1EA] cursor-pointer'
                          }`}>
                        {day}
                      </button>
                    ) : <div className="w-9 h-9" />}
                  </div>
                ))}
              </div>

              {/* Selected Date Display */}
              {scheduledDate && (
                <div className="bg-[#F5F1EA] rounded-[10px] px-4 py-3 mb-4 flex items-center gap-2">
                  <IoCalendarOutline className="w-4 h-4 text-[#8B7355] flex-shrink-0" />
                  <span className="text-[13px] font-medium text-[#8B7355]">{formatSelected()}</span>
                </div>
              )}

              {/* Confirm Button */}
              <button
                onClick={async () => {
                  if (!scheduledDate) return
                  try {
                    await supabase.from('skin_analysis_reminders').insert({
                      user_id: user.id,
                      email: user.email,
                      scheduled_date: scheduledDate,
                      created_at: new Date().toISOString()
                    })
                  } catch(e) {}
                  setScheduleSuccess(true)
                }}
                disabled={!scheduledDate}
                className="w-full h-[48px] bg-[#8B7355] text-white text-[14px] font-medium rounded-[10px] hover:bg-[#7a6448] transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                Confirm & Send Reminder
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

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
  const [isSaving, setIsSaving] = useState(false)
  const [savedJourney, setSavedJourney] = useState(null)
  const [allAnalyses, setAllAnalyses] = useState([])
  const [showCalendar, setShowCalendar] = useState(false)
  const [scheduledDate, setScheduledDate] = useState('')
  const [scheduleSuccess, setScheduleSuccess] = useState(false)
  const [calendarViewDate, setCalendarViewDate] = useState(new Date())
  const [showUploadMessage, setShowUploadMessage] = useState(false)
  const [showInfoBanner, setShowInfoBanner] = useState(true)

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
    setIsSaving(false)

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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

    const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5)

    const pickUnique = (pool, count) => {
      const filtered = pool.filter(p => !usedProductIds.has(p.id))
      const shuffled = shuffle(filtered)
      const picked = shuffled.slice(0, count)
      picked.forEach(p => usedProductIds.add(p.id))
      return picked
    }

    let { data: productsAnd } = await supabase
      .from('products')
      .select('*')
      .ilike('category', 'skincare')
      .contains('skin_concerns', [mappedConcern])
      .contains('skin_types', [mappedSkinType])

    if (!productsAnd) productsAnd = []

    let allPool = []

    if (productsAnd.length >= 8) {
      allPool = productsAnd
    } else {
      let { data: productsOr } = await supabase
        .from('products')
        .select('*')
        .ilike('category', 'skincare')
        .or(`skin_concerns.cs.{${mappedConcern}},skin_types.cs.{${mappedSkinType}}`)

      if (!productsOr) productsOr = []
      allPool = [...new Map([...productsAnd, ...productsOr].map(p => [p.id, p])).values()]
    }

    const step1Products = pickUnique(allPool, 4)
    const step2Products = pickUnique(allPool, 4)

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

      const { data: targetedData } = await supabase
        .from('products')
        .select('*')
        .ilike('category', 'skincare')
        .overlaps('skin_types', mapping.skinTypes)

      if (!targetedData || targetedData.length === 0) continue

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



  const saveToProfile = async () => {
    if (!user) {
      alert('Please sign in to save your analysis')
      return
    }
    if (savedSuccess || isSaving) return
    setIsSaving(true)
    try {
      // Check if this exact analysis already exists (same score + label + summary)
      const { data: existing } = await supabase
        .from('skin_analysis')
        .select('id')
        .eq('user_id', user.id)
        .eq('skin_score', analysisResult.skinScore)
        .eq('skin_label', analysisResult.skinLabel)
        .eq('summary', analysisResult.summary)
        .limit(1)

      if (existing && existing.length > 0) {
        setSavedSuccess(true)
        setIsSaving(false)
        await loadSavedJourney()
        return
      }

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
      setIsSaving(false)
      await loadSavedJourney()
    } catch (err) {
      console.error('Save error:', err)
      setIsSaving(false)
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

  const getGridCols = (count) => {
    if (count === 1) return 'grid-cols-1'
    if (count === 2) return 'grid-cols-1 sm:grid-cols-2'
    return 'grid-cols-1 sm:grid-cols-3'
  }

  return (
    <div className="bg-white font-['Cormorant_Garamond']">

      {/* ── AI Consultant Info Banner (Mobile Only) ── */}
      {showInfoBanner && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pb-5 pt-2">
          <div className="bg-white rounded-[16px] shadow-[0_-4px_32px_rgba(139,115,85,0.18)] border border-[#E8E3D9] overflow-hidden">
            {/* Gold accent top bar */}
            <div className="h-[3px] bg-gradient-to-r from-[#C9A870] to-[#8B7355]" />
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-[40px] h-[40px] rounded-full bg-[#F5F1EA] flex items-center justify-center flex-shrink-0">
                    <IoSparklesOutline className="w-[20px] h-[20px] text-[#8B7355]" />
                  </div>
                  <div>
                    <h4 className="text-[15px] font-semibold text-[#1A1A1A] leading-tight">New to Skin Analysis?</h4>
                    <p className="text-[12px] font-light text-[#8B7355] italic">Discover how it works</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowInfoBanner(false)}
                  className="w-7 h-7 flex items-center justify-center flex-shrink-0 ml-2"
                >
                  <IoCloseOutline className="w-5 h-5 text-[#999999]" />
                </button>
              </div>
              <p className="text-[13px] font-normal text-[#666666] leading-relaxed mb-4">
                Our AI-powered skin analysis uses medical-grade technology to deliver personalized results in seconds. Learn how our consultation process works before you begin.
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate('/ai-consultation')}
                  className="flex-1 h-[44px] bg-[#8B7355] text-white text-[13px] font-medium rounded-[10px] hover:bg-[#7a6448] transition-colors"
                >
                  Learn How It Works
                </button>
                <button
                  onClick={() => setShowInfoBanner(false)}
                  className="flex-1 h-[44px] bg-[#F5F1EA] text-[#8B7355] text-[13px] font-medium rounded-[10px] hover:bg-[#ede8df] transition-colors"
                >
                  I Understand
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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

      {/* Upload Section */}
      <div id="upload-section" className="px-4 md:px-[60px] lg:px-[120px] py-10 md:py-14 lg:py-[64px]">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-[28px] md:text-[38px] lg:text-[48px] font-medium text-[#1A1A1A] text-center mb-4">Start Your Skin Analysis</h2>
          <p className="text-[13px] md:text-[15px] lg:text-[16px] font-normal text-[#666666] text-center mb-10 lg:mb-[56px]">Upload a clear photo or use our questionnaire below</p>
          <div className="w-full md:max-w-[600px] lg:max-w-[800px] mx-auto bg-white rounded-[12px] shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
            <div className="min-h-[280px] md:min-h-[340px] lg:min-h-[400px] bg-gradient-to-b from-[#F5F1EA] to-white border-2 border-dashed border-[#C9A870] rounded-t-[12px] flex flex-col items-center justify-center px-4 py-8 lg:py-0">
              <IoCameraOutline className="w-[56px] h-[56px] md:w-[68px] md:h-[68px] lg:w-[80px] lg:h-[80px] text-[#8B7355] mb-4" />
              <h3 className="text-[18px] md:text-[20px] lg:text-[24px] font-medium text-[#1A1A1A] mb-4">Upload Your Photo</h3>
              <p className="text-[13px] lg:text-[15px] font-normal text-[#666666] mb-6 text-center">Drag and drop your photo here or click to browse</p>
              {showUploadMessage ? (
                <div className="bg-[#F5F1EA] border border-[#C9A870] rounded-[8px] px-6 py-4 text-center max-w-[360px]">
                  <IoSparklesOutline className="w-[24px] h-[24px] text-[#8B7355] mx-auto mb-2" />
                  <p className="text-[14px] font-medium text-[#8B7355] mb-1">We're working on this feature!</p>
                  <p className="text-[13px] text-[#666666]">In the meantime, please use the questionnaire below to get your skin analysis.</p>
                  <button
                    onClick={() => document.getElementById('questionnaire-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="mt-3 h-[36px] px-5 bg-[#8B7355] text-white text-[13px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">
                    Go to Questionnaire
                  </button>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setShowUploadMessage(true)}
                    className="w-full sm:w-[160px] lg:w-[180px] h-[48px] lg:h-[56px] bg-[#8B7355] text-white text-[14px] lg:text-[15px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">
                    Upload Photo
                  </button>
                  <button
                    onClick={() => setShowUploadMessage(true)}
                    className="w-full sm:w-[160px] lg:w-[180px] h-[48px] lg:h-[56px] bg-white border-2 border-[#8B7355] text-[#8B7355] text-[14px] lg:text-[15px] font-medium rounded-[8px] hover:bg-[#F5F1EA] transition-colors">
                    Take Selfie
                  </button>
                </div>
              )}
            </div>
            <div className="p-5 md:p-6 lg:p-[32px] grid grid-cols-3 gap-4 lg:gap-6">
              {guidelines.map((guide, idx) => (
                <div key={idx} className="flex flex-col items-center text-center">
                  <guide.icon className="w-[20px] h-[20px] lg:w-[24px] lg:h-[24px] text-[#8B7355] mb-2" />
                  <h4 className="text-[13px] lg:text-[15px] font-medium text-[#1A1A1A] mb-1">{guide.title}</h4>
                  <p className="text-[11px] lg:text-[14px] font-normal text-[#666666]">{guide.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Questionnaire */}
      <div id="questionnaire-section" className="bg-[#FDFBF7] px-4 md:px-[60px] lg:px-[120px] py-10 md:py-14 lg:py-[64px]">
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

          {/* Step 3: Targeted */}
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
              disabled={savedSuccess || isSaving}
              className={`w-full sm:w-auto h-[48px] lg:h-[56px] px-8 border-2 text-[14px] lg:text-[15px] font-medium rounded-[8px] transition-colors ${
                savedSuccess
                  ? 'bg-[#F5F1EA] border-[#C9A870] text-[#C9A870] cursor-not-allowed'
                  : 'bg-white border-[#8B7355] text-[#8B7355] hover:bg-[#F5F1EA]'
              }`}>
              {savedSuccess ? '✓ Saved to Profile' : isSaving ? 'Saving...' : 'Save to My Profile'}
            </button>
          </div>
        </div>
      )}

      {/* Track Your Skin Journey */}
      <div className="bg-white px-4 md:px-[60px] lg:px-[120px] py-10 md:py-12 lg:py-[64px]">
        <h2 className="text-[24px] md:text-[36px] lg:text-[48px] font-medium text-[#1A1A1A] mb-4 lg:mb-6">Track Your Skin Journey</h2>
        <p className="text-[13px] md:text-[15px] lg:text-[16px] font-normal text-[#666666] mb-10 lg:mb-[56px]">Monitor improvements with regular skin analysis</p>

        <div className="max-w-[1200px] mx-auto">
          {allAnalyses.length > 0 ? (
            <div className="flex gap-4 overflow-x-auto pb-4 mb-8">
              {allAnalyses.map((analysis, index) => (
                <div key={index} className="bg-gradient-to-b from-[#F5F1EA] to-white rounded-[16px] p-5 lg:p-[24px] flex-shrink-0 w-[240px] lg:w-[280px] flex flex-col items-center text-center">
                  <div className="relative mb-3">
                    <div className="w-[80px] h-[80px] rounded-full bg-[#C9A870] flex items-center justify-center">
                      <IoSparklesOutline className="w-[36px] h-[36px] text-white" />
                    </div>
                    {index === 0 && (
                      <span className="absolute -top-2 -right-2 bg-[#8B7355] text-white text-[9px] px-2 py-0.5 rounded-full whitespace-nowrap">Latest</span>
                    )}
                  </div>
                  <div className="text-[28px] lg:text-[32px] font-bold text-[#8B7355] mb-1">{analysis.skin_score}/100</div>
                  <div className="px-3 py-1 bg-white rounded-full text-[11px] text-[#8B7355] font-medium border border-[#E8E3D9] mb-3">
                    {analysis.skin_label || 'Analysis'}
                  </div>
                  <div className="flex items-center gap-1 mb-4">
                    <IoCalendarOutline className="w-[13px] h-[13px] text-[#8B7355]" />
                    <span className="text-[11px] lg:text-[12px] text-[#666666]">{formatDate(new Date(analysis.created_at))}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 w-full">
                    {[
                      { label: 'Hydration', value: analysis.metrics?.hydration },
                      { label: 'Texture', value: analysis.metrics?.texture },
                      { label: 'Clarity', value: analysis.metrics?.clarity },
                      { label: 'Tone', value: analysis.metrics?.toneEvenness },
                    ].map((m) => m.value != null && (
                      <div key={m.label} className="bg-white rounded-[8px] p-2 text-center border border-[#E8E3D9]">
                        <div className="text-[13px] lg:text-[14px] font-bold text-[#8B7355]">{m.value}%</div>
                        <div className="text-[10px] text-[#666666]">{m.label}</div>
                      </div>
                    ))}
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
        <CalendarModal
          user={user}
          scheduledDate={scheduledDate}
          setScheduledDate={setScheduledDate}
          scheduleSuccess={scheduleSuccess}
          setScheduleSuccess={setScheduleSuccess}
          setShowCalendar={setShowCalendar}
          supabase={supabase}
        />
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
  const [isSaving, setIsSaving] = useState(false)
  const [savedJourney, setSavedJourney] = useState(null)
  const [allAnalyses, setAllAnalyses] = useState([])
  const [showCalendar, setShowCalendar] = useState(false)
  const [scheduledDate, setScheduledDate] = useState('')
  const [scheduleSuccess, setScheduleSuccess] = useState(false)
  const [showUploadMessage, setShowUploadMessage] = useState(false)
  const [showInfoBanner, setShowInfoBanner] = useState(true)

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
    setIsSaving(false)

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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

    const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5)

    const pickUnique = (pool, count) => {
      const filtered = pool.filter(p => !usedProductIds.has(p.id))
      const shuffled = shuffle(filtered)
      const picked = shuffled.slice(0, count)
      picked.forEach(p => usedProductIds.add(p.id))
      return picked
    }

    let { data: productsAnd } = await supabase
      .from('products')
      .select('*')
      .ilike('category', 'skincare')
      .contains('skin_concerns', [mappedConcern])
      .contains('skin_types', [mappedSkinType])

    if (!productsAnd) productsAnd = []

    let allPool = []

    if (productsAnd.length >= 8) {
      allPool = productsAnd
    } else {
      let { data: productsOr } = await supabase
        .from('products')
        .select('*')
        .ilike('category', 'skincare')
        .or(`skin_concerns.cs.{${mappedConcern}},skin_types.cs.{${mappedSkinType}}`)

      if (!productsOr) productsOr = []
      allPool = [...new Map([...productsAnd, ...productsOr].map(p => [p.id, p])).values()]
    }

    const step1Products = pickUnique(allPool, 4)
    const step2Products = pickUnique(allPool, 4)

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

      const { data: targetedData } = await supabase
        .from('products')
        .select('*')
        .ilike('category', 'skincare')
        .overlaps('skin_types', mapping.skinTypes)

      if (!targetedData || targetedData.length === 0) continue

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



  const saveToProfile = async () => {
    if (!user) {
      alert('Please sign in to save your analysis')
      return
    }
    if (savedSuccess || isSaving) return
    setIsSaving(true)
    try {
      // Check if this exact analysis already exists (same score + label + summary)
      const { data: existing } = await supabase
        .from('skin_analysis')
        .select('id')
        .eq('user_id', user.id)
        .eq('skin_score', analysisResult.skinScore)
        .eq('skin_label', analysisResult.skinLabel)
        .eq('summary', analysisResult.summary)
        .limit(1)

      if (existing && existing.length > 0) {
        setSavedSuccess(true)
        setIsSaving(false)
        await loadSavedJourney()
        return
      }

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
      setIsSaving(false)
      await loadSavedJourney()
    } catch (err) {
      console.error('Save error:', err)
      setIsSaving(false)
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

  const getGridCols = (count) => {
    if (count === 1) return 'grid-cols-1'
    if (count === 2) return 'grid-cols-1 sm:grid-cols-2'
    return 'grid-cols-1 sm:grid-cols-3'
  }

  return (
    <div className="bg-white font-['Cormorant_Garamond']">

      {/* ── AI Consultant Info Banner (Mobile Only) ── */}
      {showInfoBanner && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pb-5 pt-2">
          <div className="bg-white rounded-[16px] shadow-[0_-4px_32px_rgba(139,115,85,0.18)] border border-[#E8E3D9] overflow-hidden">
            {/* Gold accent top bar */}
            <div className="h-[3px] bg-gradient-to-r from-[#C9A870] to-[#8B7355]" />
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-[40px] h-[40px] rounded-full bg-[#F5F1EA] flex items-center justify-center flex-shrink-0">
                    <IoSparklesOutline className="w-[20px] h-[20px] text-[#8B7355]" />
                  </div>
                  <div>
                    <h4 className="text-[15px] font-semibold text-[#1A1A1A] leading-tight">New to Skin Analysis?</h4>
                    <p className="text-[12px] font-light text-[#8B7355] italic">Discover how it works</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowInfoBanner(false)}
                  className="w-7 h-7 flex items-center justify-center flex-shrink-0 ml-2"
                >
                  <IoCloseOutline className="w-5 h-5 text-[#999999]" />
                </button>
              </div>
              <p className="text-[13px] font-normal text-[#666666] leading-relaxed mb-4">
                Our AI-powered skin analysis uses medical-grade technology to deliver personalized results in seconds. Learn how our consultation process works before you begin.
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate('/ai-consultation')}
                  className="flex-1 h-[44px] bg-[#8B7355] text-white text-[13px] font-medium rounded-[10px] hover:bg-[#7a6448] transition-colors"
                >
                  Learn How It Works
                </button>
                <button
                  onClick={() => setShowInfoBanner(false)}
                  className="flex-1 h-[44px] bg-[#F5F1EA] text-[#8B7355] text-[13px] font-medium rounded-[10px] hover:bg-[#ede8df] transition-colors"
                >
                  I Understand
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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

      {/* Upload Section */}
      <div id="upload-section" className="px-4 md:px-[60px] lg:px-[120px] py-10 md:py-14 lg:py-[64px]">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-[28px] md:text-[38px] lg:text-[48px] font-medium text-[#1A1A1A] text-center mb-4">Start Your Skin Analysis</h2>
          <p className="text-[13px] md:text-[15px] lg:text-[16px] font-normal text-[#666666] text-center mb-10 lg:mb-[56px]">Upload a clear photo or use our questionnaire below</p>
          <div className="w-full md:max-w-[600px] lg:max-w-[800px] mx-auto bg-white rounded-[12px] shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
            <div className="min-h-[280px] md:min-h-[340px] lg:min-h-[400px] bg-gradient-to-b from-[#F5F1EA] to-white border-2 border-dashed border-[#C9A870] rounded-t-[12px] flex flex-col items-center justify-center px-4 py-8 lg:py-0">
              <IoCameraOutline className="w-[56px] h-[56px] md:w-[68px] md:h-[68px] lg:w-[80px] lg:h-[80px] text-[#8B7355] mb-4" />
              <h3 className="text-[18px] md:text-[20px] lg:text-[24px] font-medium text-[#1A1A1A] mb-4">Upload Your Photo</h3>
              <p className="text-[13px] lg:text-[15px] font-normal text-[#666666] mb-6 text-center">Drag and drop your photo here or click to browse</p>
              {showUploadMessage ? (
                <div className="bg-[#F5F1EA] border border-[#C9A870] rounded-[8px] px-6 py-4 text-center max-w-[360px]">
                  <IoSparklesOutline className="w-[24px] h-[24px] text-[#8B7355] mx-auto mb-2" />
                  <p className="text-[14px] font-medium text-[#8B7355] mb-1">We're working on this feature!</p>
                  <p className="text-[13px] text-[#666666]">In the meantime, please use the questionnaire below to get your skin analysis.</p>
                  <button
                    onClick={() => document.getElementById('questionnaire-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="mt-3 h-[36px] px-5 bg-[#8B7355] text-white text-[13px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">
                    Go to Questionnaire
                  </button>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setShowUploadMessage(true)}
                    className="w-full sm:w-[160px] lg:w-[180px] h-[48px] lg:h-[56px] bg-[#8B7355] text-white text-[14px] lg:text-[15px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">
                    Upload Photo
                  </button>
                  <button
                    onClick={() => setShowUploadMessage(true)}
                    className="w-full sm:w-[160px] lg:w-[180px] h-[48px] lg:h-[56px] bg-white border-2 border-[#8B7355] text-[#8B7355] text-[14px] lg:text-[15px] font-medium rounded-[8px] hover:bg-[#F5F1EA] transition-colors">
                    Take Selfie
                  </button>
                </div>
              )}
            </div>
            <div className="p-5 md:p-6 lg:p-[32px] grid grid-cols-3 gap-4 lg:gap-6">
              {guidelines.map((guide, idx) => (
                <div key={idx} className="flex flex-col items-center text-center">
                  <guide.icon className="w-[20px] h-[20px] lg:w-[24px] lg:h-[24px] text-[#8B7355] mb-2" />
                  <h4 className="text-[13px] lg:text-[15px] font-medium text-[#1A1A1A] mb-1">{guide.title}</h4>
                  <p className="text-[11px] lg:text-[14px] font-normal text-[#666666]">{guide.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Questionnaire */}
      <div id="questionnaire-section" className="bg-[#FDFBF7] px-4 md:px-[60px] lg:px-[120px] py-10 md:py-14 lg:py-[64px]">
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

          {/* Step 3: Targeted */}
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
              disabled={savedSuccess || isSaving}
              className={`w-full sm:w-auto h-[48px] lg:h-[56px] px-8 border-2 text-[14px] lg:text-[15px] font-medium rounded-[8px] transition-colors ${
                savedSuccess
                  ? 'bg-[#F5F1EA] border-[#C9A870] text-[#C9A870] cursor-not-allowed'
                  : 'bg-white border-[#8B7355] text-[#8B7355] hover:bg-[#F5F1EA]'
              }`}>
              {savedSuccess ? '✓ Saved to Profile' : isSaving ? 'Saving...' : 'Save to My Profile'}
            </button>
          </div>
        </div>
      )}

      {/* Track Your Skin Journey */}
      <div className="bg-white px-4 md:px-[60px] lg:px-[120px] py-10 md:py-12 lg:py-[64px]">
        <h2 className="text-[24px] md:text-[36px] lg:text-[48px] font-medium text-[#1A1A1A] mb-4 lg:mb-6">Track Your Skin Journey</h2>
        <p className="text-[13px] md:text-[15px] lg:text-[16px] font-normal text-[#666666] mb-10 lg:mb-[56px]">Monitor improvements with regular skin analysis</p>

        <div className="max-w-[1200px] mx-auto">
          {allAnalyses.length > 0 ? (
            <div className="flex gap-4 overflow-x-auto pb-4 mb-8">
              {allAnalyses.map((analysis, index) => (
                <div key={index} className="bg-gradient-to-b from-[#F5F1EA] to-white rounded-[16px] p-5 lg:p-[24px] flex-shrink-0 w-[240px] lg:w-[280px] flex flex-col items-center text-center">
                  <div className="relative mb-3">
                    <div className="w-[80px] h-[80px] rounded-full bg-[#C9A870] flex items-center justify-center">
                      <IoSparklesOutline className="w-[36px] h-[36px] text-white" />
                    </div>
                    {index === 0 && (
                      <span className="absolute -top-2 -right-2 bg-[#8B7355] text-white text-[9px] px-2 py-0.5 rounded-full whitespace-nowrap">Latest</span>
                    )}
                  </div>
                  <div className="text-[28px] lg:text-[32px] font-bold text-[#8B7355] mb-1">{analysis.skin_score}/100</div>
                  <div className="px-3 py-1 bg-white rounded-full text-[11px] text-[#8B7355] font-medium border border-[#E8E3D9] mb-3">
                    {analysis.skin_label || 'Analysis'}
                  </div>
                  <div className="flex items-center gap-1 mb-4">
                    <IoCalendarOutline className="w-[13px] h-[13px] text-[#8B7355]" />
                    <span className="text-[11px] lg:text-[12px] text-[#666666]">{formatDate(new Date(analysis.created_at))}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 w-full">
                    {[
                      { label: 'Hydration', value: analysis.metrics?.hydration },
                      { label: 'Texture', value: analysis.metrics?.texture },
                      { label: 'Clarity', value: analysis.metrics?.clarity },
                      { label: 'Tone', value: analysis.metrics?.toneEvenness },
                    ].map((m) => m.value != null && (
                      <div key={m.label} className="bg-white rounded-[8px] p-2 text-center border border-[#E8E3D9]">
                        <div className="text-[13px] lg:text-[14px] font-bold text-[#8B7355]">{m.value}%</div>
                        <div className="text-[10px] text-[#666666]">{m.label}</div>
                      </div>
                    ))}
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