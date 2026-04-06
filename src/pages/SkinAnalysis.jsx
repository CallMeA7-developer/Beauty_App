import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
  IoChevronDown,
  IoCameraOutline,
  IoCheckmarkCircle,
  IoSunnyOutline,
  IoPersonCircleOutline,
  IoWaterOutline,
  IoSparklesOutline,
  IoStarSharp,
} from 'react-icons/io5'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'
import { supabase } from '../lib/supabase'
import LoadingSpinner from '../components/LoadingSpinner'

export default function SkinAnalysis() {
  const location = useLocation()
  const { user } = useAuth()
  const { addItem } = useCart()

  const [selectedConcern, setSelectedConcern] = useState(null)
  const [selectedSkinType, setSelectedSkinType] = useState(null)
  const [selectedAge, setSelectedAge] = useState(null)
  const [selectedSpecificConcerns, setSelectedSpecificConcerns] = useState([])
  const [selectedRoutine, setSelectedRoutine] = useState('Moderate')
  const [sunExposure, setSunExposure] = useState('Moderate')
  const [loading, setLoading] = useState(false)
  const [analysisResult, setAnalysisResult] = useState(null)
  const [error, setError] = useState(null)
  const [recommendedProducts, setRecommendedProducts] = useState({ morning: [], evening: [], targeted: [] })

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.replace('#', ''))
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
    }
  }, [location])

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

    try {
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY
        || import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY // just for testing

      console.log('Key found:', !!apiKey, Object.keys(import.meta.env))

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          max_tokens: 800,
          temperature: 0.5,
          messages: [
            {
              role: 'system',
              content: 'Skin analysis AI. JSON only. No markdown. No extra text.'
            },
            {
              role: 'user',
              content: `SkinType=${selectedSkinType} Concern=${selectedConcern} Age=${selectedAge||'Unknown'} Issues=${selectedSpecificConcerns.join(',')||'None'} Routine=${selectedRoutine} Sun=${sunExposure}. JSON: {"skinScore":85,"skinLabel":"Healthy Skin","summary":"summary here","hydration":92,"texture":78,"clarity":88,"toneEvenness":81,"cards":[{"title":"Skin Analysis","description":"desc","badge":"Confirmed"},{"title":"Hydration","description":"desc","badge":"Good"},{"title":"Texture","description":"desc","badge":"Fair"},{"title":"Pigmentation","description":"desc","badge":"Mild"},{"title":"Fine Lines","description":"desc","badge":"Early"},{"title":"Problem Areas","description":"desc","badge":"Monitor"}],"morning":["Gentle Cleanser","Vitamin C Serum","Moisturizer","Sunscreen"],"evening":["Makeup Remover","Toner","Retinol Serum","Night Cream"],"targeted":["Eye Cream","Dark Spot Corrector","Pore Minimizer"]}`
            }
          ]
        })
      })

      if (!response.ok) throw new Error('API error: ' + response.status)

      const data = await response.json()
      const content = data.choices[0].message.content.trim()
      const result = JSON.parse(content)
      setAnalysisResult(result)
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
    const fetchByName = async (productName) => {
      const { data } = await supabase
        .from('products')
        .select('*')
        .ilike('name', `%${productName.split(' ')[0]}%`)
        .limit(1)
        .maybeSingle()
      return data
    }

    const morning = await Promise.all(result.morning.map(fetchByName))
    const evening = await Promise.all(result.evening.map(fetchByName))
    const targeted = await Promise.all(result.targeted.map(fetchByName))

    setRecommendedProducts({
      morning: morning.filter(Boolean),
      evening: evening.filter(Boolean),
      targeted: targeted.filter(Boolean)
    })
  }

  const saveAnalysisToDatabase = async (result) => {
    try {
      await supabase.from('skin_analysis').upsert({
        user_id: user.id,
        skin_score: result.skinScore,
        summary: result.summary,
        metrics: {
          hydration: result.hydration,
          texture: result.texture,
          clarity: result.clarity,
          toneEvenness: result.toneEvenness
        },
        analysis_cards: result.cards,
        created_at: new Date().toISOString()
      })
    } catch (err) {
      console.error('Failed to save:', err)
    }
  }

  const guidelines = [
    { icon: IoSunnyOutline, title: 'Good Lighting', desc: 'Natural daylight preferred' },
    { icon: IoPersonCircleOutline, title: 'Face Forward', desc: 'Look directly at camera' },
    { icon: IoSparklesOutline, title: 'Remove Makeup', desc: 'Clean, bare skin' },
  ]

  const timelinePoints = [
    { date: 'Dec 15, 2024', score: 85, image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=120&h=120&fit=crop' },
    { date: 'Nov 15, 2024', score: 81, image: 'https://images.unsplash.com/photo-1611349411198-e26e0d5f4a52?w=120&h=120&fit=crop' },
    { date: 'Oct 15, 2024', score: 78, image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=120&h=120&fit=crop' },
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

  const ProductCard = ({ product }) => {
    const handleAddToCart = () => {
      addItem(product)
    }

    return (
      <div className="bg-white rounded-[8px] overflow-hidden border border-[#E8E3D9]">
        <img src={product.img_url || product.image_url || product.image} alt={product.name} className="w-full h-[180px] md:h-[220px] lg:h-[280px] object-cover" />
        <div className="p-4 md:p-5 lg:p-6">
          <p className="text-[11px] lg:text-[13px] font-light italic text-[#8B7355] mb-2">{product.brand || 'Shan Loray'}</p>
          <h4 className="text-[14px] md:text-[16px] lg:text-[18px] font-medium text-[#1A1A1A] mb-2">{product.name}</h4>
          <p className="text-[12px] lg:text-[14px] font-normal text-[#666666] mb-3">{product.description?.slice(0, 60)}...</p>
          <p className="text-[16px] md:text-[18px] lg:text-[20px] font-semibold text-[#1A1A1A] mb-3">${parseFloat(product.price).toFixed(2)}</p>
          <div className="flex items-center gap-1 mb-4">
            <Stars />
            <span className="text-[11px] lg:text-[12px] font-normal text-[#999999] ml-1">({product.review_count || 0})</span>
          </div>
          <button onClick={handleAddToCart} className="w-full h-[42px] lg:h-[48px] bg-[#8B7355] text-white text-[13px] lg:text-[14px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">
            Add to Cart
          </button>
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
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="w-full sm:w-[160px] lg:w-[180px] h-[48px] lg:h-[56px] bg-[#8B7355] text-white text-[14px] lg:text-[15px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">Upload Photo</button>
                <button className="w-full sm:w-[160px] lg:w-[180px] h-[48px] lg:h-[56px] bg-white border-2 border-[#8B7355] text-[#8B7355] text-[14px] lg:text-[15px] font-medium rounded-[8px] hover:bg-[#F5F1EA] transition-colors">Take Selfie</button>
              </div>
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

          {/* Morning Routine */}
          <div className="max-w-[1200px] mx-auto bg-white rounded-[16px] shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-5 md:p-6 lg:p-[40px] mb-6 lg:mb-8">
            <span className="inline-block px-4 py-2 bg-[#F5F1EA] text-[#8B7355] text-[11px] lg:text-[12px] font-medium rounded-full mb-4">STEP 1: MORNING</span>
            <h3 className="text-[20px] md:text-[24px] lg:text-[28px] font-medium text-[#1A1A1A] mb-6 lg:mb-8">Morning Protection Routine</h3>
            <div className="space-y-4 mb-6">
              {analysisResult.morning.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 bg-[#F5F1EA] rounded-[8px]">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#8B7355] text-white rounded-full flex items-center justify-center font-semibold">{idx + 1}</div>
                  <div className="flex-1">
                    <h4 className="text-[15px] lg:text-[16px] font-medium text-[#1A1A1A] mb-1">{item}</h4>
                  </div>
                </div>
              ))}
            </div>
            {recommendedProducts.morning.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-5">
                {recommendedProducts.morning.slice(0, 4).map((product) => <ProductCard key={product.id} product={product} />)}
              </div>
            )}
          </div>

          {/* Evening Routine */}
          <div className="max-w-[1200px] mx-auto bg-white rounded-[16px] shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-5 md:p-6 lg:p-[40px] mb-6 lg:mb-8">
            <span className="inline-block px-4 py-2 bg-[#F5F1EA] text-[#8B7355] text-[11px] lg:text-[12px] font-medium rounded-full mb-4">STEP 2: EVENING</span>
            <h3 className="text-[20px] md:text-[24px] lg:text-[28px] font-medium text-[#1A1A1A] mb-6 lg:mb-8">Evening Repair Routine</h3>
            <div className="space-y-4 mb-6">
              {analysisResult.evening.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 bg-[#F5F1EA] rounded-[8px]">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#8B7355] text-white rounded-full flex items-center justify-center font-semibold">{idx + 1}</div>
                  <div className="flex-1">
                    <h4 className="text-[15px] lg:text-[16px] font-medium text-[#1A1A1A] mb-1">{item}</h4>
                  </div>
                </div>
              ))}
            </div>
            {recommendedProducts.evening.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-5">
                {recommendedProducts.evening.slice(0, 4).map((product) => <ProductCard key={product.id} product={product} />)}
              </div>
            )}
          </div>

          {/* Targeted Treatments */}
          <div className="max-w-[1200px] mx-auto bg-white rounded-[16px] shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-5 md:p-6 lg:p-[40px] mb-6 lg:mb-8">
            <span className="inline-block px-4 py-2 bg-[#F5F1EA] text-[#8B7355] text-[11px] lg:text-[12px] font-medium rounded-full mb-4">STEP 3: TARGETED CARE</span>
            <h3 className="text-[20px] md:text-[24px] lg:text-[28px] font-medium text-[#1A1A1A] mb-6 lg:mb-8">Specialized Treatments</h3>
            <div className="space-y-4 mb-6">
              {analysisResult.targeted.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 bg-[#F5F1EA] rounded-[8px]">
                  <div className="flex-1">
                    <h4 className="text-[15px] lg:text-[16px] font-medium text-[#1A1A1A] mb-1">{item}</h4>
                  </div>
                </div>
              ))}
            </div>
            {recommendedProducts.targeted.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-5">
                {recommendedProducts.targeted.slice(0, 3).map((product) => <ProductCard key={product.id} product={product} />)}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => alert('ok mommy you can have your result now')}
              className="w-full sm:w-auto h-[48px] lg:h-[56px] px-8 bg-[#8B7355] text-white text-[14px] lg:text-[15px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">
              View Complete Routine
            </button>
            <button
              onClick={() => alert('ok mommy let me add it to your profile')}
              className="w-full sm:w-auto h-[48px] lg:h-[56px] px-8 bg-white border-2 border-[#8B7355] text-[#8B7355] text-[14px] lg:text-[15px] font-medium rounded-[8px] hover:bg-[#F5F1EA] transition-colors">
              Save to My Profile
            </button>
          </div>
        </div>
      )}

      {/* Progress Tracking */}
      <div className="bg-white px-4 md:px-[60px] lg:px-[120px] py-10 md:py-12 lg:py-[64px]">
        <h2 className="text-[24px] md:text-[36px] lg:text-[48px] font-medium text-[#1A1A1A] mb-4 lg:mb-6">Track Your Skin Journey</h2>
        <p className="text-[13px] md:text-[15px] lg:text-[16px] font-normal text-[#666666] mb-10 lg:mb-[56px]">Monitor improvements with regular skin analysis</p>
        <div className="max-w-[1200px] mx-auto bg-gradient-to-b from-[#F5F1EA] to-white rounded-[16px] p-5 md:p-6 lg:p-[40px]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
            {timelinePoints.map((point, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <img src={point.image} alt="Analysis" className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] lg:w-[120px] lg:h-[120px] object-cover rounded-[8px] mb-4" />
                <div className="text-[20px] md:text-[22px] lg:text-[24px] font-semibold text-[#8B7355] mb-1">{point.score}</div>
                <div className="text-[12px] lg:text-[14px] font-normal text-[#666666]">{point.date}</div>
              </div>
            ))}
            <button className="w-full sm:w-[180px] h-[44px] lg:h-[48px] bg-[#8B7355] text-white text-[14px] lg:text-[15px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">Schedule Next Analysis</button>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-white px-4 md:px-[60px] lg:px-[120px] py-10 md:py-12 lg:py-[64px]">
        <h2 className="text-[24px] md:text-[32px] lg:text-[40px] font-medium text-[#1A1A1A] text-center mb-10 lg:mb-[56px]">Frequently Asked Questions</h2>
        <div className="max-w-[900px] mx-auto space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white border border-[#E8E3D9] rounded-[12px] p-4 lg:p-5">
              <div className="flex items-center justify-between mb-3 gap-3">
                <h4 className="text-[14px] md:text-[15px] lg:text-[17px] font-medium text-[#1A1A1A]">{faq.q}</h4>
                <IoChevronDown className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#8B7355] flex-shrink-0" />
              </div>
              {idx < 2 && (
                <div className="bg-[#F5F1EA] rounded-[8px] p-4 lg:p-5 mt-3">
                  <p className="text-[13px] lg:text-[15px] font-normal text-[#666666] leading-[1.7]">{faq.a}</p>
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