import {
  IoCheckmarkCircle,
  IoStarSharp,
  IoTrendingUp,
  IoCalendarOutline,
  IoFlame,
  IoWaterOutline,
  IoSparklesOutline,
  IoTrophyOutline,
  IoHeartOutline,
} from 'react-icons/io5'

export default function BeautyJourney() {
  const quickStats = [
    { label: 'Skin Health Score', value: '85/100', icon: IoSparklesOutline },
    { label: 'Routine Consistency', value: '28 Days', icon: IoFlame },
    { label: 'Products Tried', value: '47', icon: IoHeartOutline },
    { label: 'Favorite Looks', value: '12', icon: IoStarSharp },
  ]

  const skinProfile = {
    type: 'Combination Skin',
    lastUpdated: 'Dec 15, 2024',
    primaryConcerns: ['Aging', 'Fine Lines'],
    secondaryConcerns: ['Hydration', 'Texture'],
    goals: ['Reduce Fine Lines', 'Even Skin Tone', 'Maintain Hydration'],
    brands: ['Shan Loray', 'La Mer', 'SK-II'],
  }

  const morningRoutine = [
    { step: 'Cleanse', product: 'Gentle Cleanser', brand: 'Shan Loray', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=200&h=200&fit=crop', usage: 'Apply to damp skin, massage gently', status: 'In Use', daysRemaining: 45, reviews: 342 },
    { step: 'Treat', product: 'Vitamin C Serum', brand: 'Shan Loray', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200&h=200&fit=crop', usage: '3-4 drops, pat until absorbed', status: 'In Use', daysRemaining: 30, reviews: 521 },
    { step: 'Moisturize', product: 'Hydrating Cream', brand: 'Shan Loray', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200&fit=crop', usage: 'Apply evenly to face and neck', status: 'In Use', daysRemaining: 22, reviews: 467 },
    { step: 'Protect', product: 'SPF 50 Sunscreen', brand: 'Shan Loray', image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=200&h=200&fit=crop', usage: 'Generous layer as final step', status: 'Reorder', daysRemaining: 5, reviews: 789 },
  ]

  const weeklyTreatments = [
    { day: 'Sunday', treatment: 'Hydrating Mask', image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=320&h=200&fit=crop', completed: true },
    { day: 'Wednesday', treatment: 'Exfoliating Treatment', image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=320&h=200&fit=crop', completed: true },
    { day: 'Friday', treatment: 'Anti-Aging Serum Boost', image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=320&h=200&fit=crop', completed: false },
  ]

  const analysisHistory = [
    { date: 'Dec 15, 2024', score: 85, image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=180&h=180&fit=crop' },
    { date: 'Nov 15, 2024', score: 81, image: 'https://images.unsplash.com/photo-1611349411198-e26e0d5f4a52?w=180&h=180&fit=crop' },
    { date: 'Oct 15, 2024', score: 78, image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=180&h=180&fit=crop' },
  ]

  const recommendations = [
    { name: 'Intensive Eye Cream', description: 'Perfect for fine lines concern', image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=360&h=360&fit=crop', match: '95%', price: '$82', reviews: 412 },
    { name: 'Brightening Essence', description: 'Addresses uneven tone', image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=360&h=360&fit=crop', match: '92%', price: '$95', reviews: 367 },
    { name: 'Hydration Booster', description: 'Enhance moisture retention', image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=360&h=360&fit=crop', match: '90%', price: '$78', reviews: 298 },
  ]

  const savedLooks = [
    { date: 'Dec 20, 2024', products: '5 Products', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=280&h=280&fit=crop' },
    { date: 'Dec 15, 2024', products: '4 Products', image: 'https://images.unsplash.com/photo-1611349411198-e26e0d5f4a52?w=280&h=280&fit=crop' },
    { date: 'Dec 10, 2024', products: '6 Products', image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=280&h=280&fit=crop' },
    { date: 'Dec 5, 2024', products: '3 Products', image: 'https://images.unsplash.com/photo-1556740772-1a741367b93e?w=280&h=280&fit=crop' },
  ]

  const upcomingEvents = [
    { title: 'Next Skin Analysis', date: 'Dec 30, 2024', action: 'Set Reminder' },
    { title: 'Restock Alert: Vitamin C Serum', date: 'Dec 25, 2024', action: 'Shop Now' },
    { title: 'Virtual Consultation Available', date: 'Book Anytime', action: 'Book Now' },
    { title: 'New Product Launch', date: 'Jan 5, 2025', action: 'Preview' },
  ]

  const beautyGoals = [
    { goal: 'Reduce Fine Lines', progress: 65, target: 'March 2025' },
    { goal: 'Improve Skin Texture', progress: 78, target: 'February 2025' },
    { goal: 'Achieve Even Tone', progress: 52, target: 'April 2025' },
  ]

  const Stars = () => [...Array(5)].map((_, i) => <IoStarSharp key={i} className="w-[14px] h-[14px] text-[#C9A870]" />)

  return (
    <div className="bg-white font-['Cormorant_Garamond']">

      {/* ── Hero Welcome ── */}
      <div className="min-h-[300px] md:min-h-[360px] lg:min-h-[420px] bg-gradient-to-b from-[#FDFBF7] to-[#F5F1EA] flex flex-col md:flex-row items-center px-4 md:px-[60px] lg:px-[120px] py-8 md:py-0 gap-8 md:gap-0">
        <div className="w-full md:w-[500px] lg:w-[600px]">
          <p className="text-[11px] md:text-[12px] lg:text-[14px] font-light italic text-[#8B7355] tracking-[2px] mb-3">YOUR PERSONALIZED BEAUTY PROFILE</p>
          <h1 className="text-[36px] md:text-[48px] lg:text-[64px] font-bold text-[#1A1A1A] leading-[1.1] mb-4">Welcome Back, Sarah</h1>
          <p className="text-[14px] md:text-[16px] lg:text-[18px] font-normal text-[#666666] mb-6">Your beauty journey continues with personalized insights and recommendations</p>
          <div className="w-[80px] md:w-[100px] lg:w-[120px] h-[4px] bg-[#C9A870]" />
        </div>
        <div className="flex-1 flex justify-center md:justify-end">
          <div className="relative">
            <div className="w-[200px] h-[200px] md:w-[260px] md:h-[260px] lg:w-[320px] lg:h-[320px] rounded-full overflow-hidden border-4 border-[#C9A870]">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=320&h=320&fit=crop" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -right-3 lg:-right-4 top-1/2 -translate-y-1/2">
              <div className="w-[60px] h-[60px] md:w-[70px] md:h-[70px] lg:w-[80px] lg:h-[80px] bg-white rounded-full flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.12)]">
                <div className="text-center">
                  <div className="text-[18px] md:text-[20px] lg:text-[24px] font-bold text-[#8B7355]">85</div>
                  <div className="text-[9px] md:text-[10px] lg:text-[11px] font-normal text-[#666666]">Score</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Quick Stats ── */}
      <div className="bg-white px-4 md:px-[60px] lg:px-[120px] py-8 md:py-10 lg:py-[48px]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 lg:gap-[32px]">
          {quickStats.map((stat) => (
            <div key={stat.label} className="bg-gradient-to-b from-[#FDFBF7] to-white rounded-[12px] border border-[#E8E3D9] p-5 md:p-6 lg:p-[32px] flex flex-col items-center">
              <stat.icon className="w-[24px] h-[24px] md:w-[28px] md:h-[28px] lg:w-[32px] lg:h-[32px] text-[#C9A870] mb-3" />
              <div className="text-[22px] md:text-[26px] lg:text-[32px] font-semibold text-[#1A1A1A] mb-2">{stat.value}</div>
              <div className="text-[12px] md:text-[13px] lg:text-[14px] font-normal text-[#666666] text-center">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Beauty Profile ── */}
      <div className="bg-[#FDFBF7] px-4 md:px-[60px] lg:px-[120px] py-10 md:py-12 lg:py-[64px]">
        <h2 className="text-[26px] md:text-[32px] lg:text-[40px] font-medium text-[#1A1A1A] text-center mb-8 lg:mb-[48px]">Your Beauty Profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-4 lg:gap-[24px]">
          {/* Skin Type */}
          <div className="bg-white rounded-[12px] border border-[#E8E3D9] shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-5 lg:p-[28px]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[16px] lg:text-[20px] font-medium text-[#1A1A1A]">Skin Type</h3>
              <span className="px-3 py-1 bg-[#F5F1EA] text-[#8B7355] text-[10px] lg:text-[11px] font-medium rounded-full">Confirmed</span>
            </div>
            <div className="text-[15px] lg:text-[18px] font-semibold text-[#8B7355] mb-2">{skinProfile.type}</div>
            <p className="text-[13px] lg:text-[14px] font-normal text-[#666666] mb-3">T-zone shows moderate oiliness while cheek areas tend toward dryness</p>
            <p className="text-[12px] lg:text-[13px] font-light italic text-[#999999]">Last Updated: {skinProfile.lastUpdated}</p>
          </div>

          {/* Skin Concerns */}
          <div className="bg-white rounded-[12px] border border-[#E8E3D9] shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-5 lg:p-[28px]">
            <h3 className="text-[16px] lg:text-[20px] font-medium text-[#1A1A1A] mb-4">Skin Concerns</h3>
            <div className="mb-4">
              <p className="text-[13px] lg:text-[14px] font-medium text-[#666666] mb-2">Primary</p>
              <div className="flex flex-wrap gap-2">
                {skinProfile.primaryConcerns.map((concern) => (
                  <span key={concern} className="px-3 py-1 bg-[#8B7355] text-white text-[12px] lg:text-[13px] rounded-full">{concern}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[13px] lg:text-[14px] font-medium text-[#666666] mb-2">Secondary</p>
              <div className="flex flex-wrap gap-2">
                {skinProfile.secondaryConcerns.map((concern) => (
                  <span key={concern} className="px-3 py-1 bg-[#F5F1EA] text-[#8B7355] text-[12px] lg:text-[13px] rounded-full">{concern}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-white rounded-[12px] border border-[#E8E3D9] shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-5 lg:p-[28px]">
            <h3 className="text-[16px] lg:text-[20px] font-medium text-[#1A1A1A] mb-4">Preferences</h3>
            <div className="space-y-3">
              <div>
                <p className="text-[12px] lg:text-[13px] font-medium text-[#666666] mb-1">Beauty Goals</p>
                <div className="flex flex-wrap gap-2">
                  {skinProfile.goals.slice(0, 2).map((goal) => (
                    <span key={goal} className="px-3 py-1 bg-[#F5F1EA] text-[#8B7355] text-[11px] lg:text-[12px] rounded-full">{goal}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[12px] lg:text-[13px] font-medium text-[#666666] mb-1">Favorite Brands</p>
                <div className="flex flex-wrap gap-2">
                  {skinProfile.brands.map((brand) => (
                    <span key={brand} className="px-3 py-1 bg-[#F5F1EA] text-[#8B7355] text-[11px] lg:text-[12px] rounded-full">{brand}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Daily Routines ── */}
      <div className="bg-white px-4 md:px-[60px] lg:px-[120px] py-10 md:py-12 lg:py-[64px]">
        <h2 className="text-[26px] md:text-[36px] lg:text-[48px] font-medium text-[#1A1A1A] mb-8 lg:mb-[48px]">Your Beauty Routines</h2>
        <div className="flex gap-3 md:gap-4 mb-6 lg:mb-8 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          <button className="w-[140px] md:w-[160px] lg:w-[180px] h-[52px] md:h-[56px] lg:h-[64px] bg-[#8B7355] text-white text-[14px] md:text-[15px] lg:text-[16px] font-medium rounded-[12px] flex-shrink-0">Morning</button>
          <button className="w-[140px] md:w-[160px] lg:w-[180px] h-[52px] md:h-[56px] lg:h-[64px] bg-white border-2 border-[#E8E3D9] text-[#3D3D3D] text-[14px] md:text-[15px] lg:text-[16px] font-medium rounded-[12px] hover:border-[#8B7355] transition-colors flex-shrink-0">Evening</button>
        </div>
        <div className="space-y-4 lg:space-y-6">
          {morningRoutine.map((item) => (
            <div key={item.step} className="flex flex-col sm:flex-row items-start gap-4 lg:gap-6 bg-[#FDFBF7] rounded-[12px] p-4 lg:p-[24px]">
              <img src={item.image} alt={item.product} className="w-full sm:w-[120px] sm:h-[120px] lg:w-[200px] lg:h-[200px] object-cover rounded-[8px] flex-shrink-0 h-[180px]" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <span className="px-3 py-1 bg-[#8B7355] text-white text-[11px] lg:text-[12px] font-medium rounded-full">{item.step}</span>
                  <span className={`px-3 py-1 text-[10px] lg:text-[11px] font-medium rounded-full ${item.status === 'Reorder' ? 'bg-red-500 text-white' : 'bg-[#F5F1EA] text-[#8B7355]'}`}>
                    {item.status}
                  </span>
                </div>
                <p className="text-[12px] lg:text-[13px] font-light italic text-[#8B7355] mb-1">{item.brand}</p>
                <h4 className="text-[14px] lg:text-[16px] font-medium text-[#1A1A1A] mb-2">{item.product}</h4>
                <p className="text-[13px] lg:text-[14px] font-normal text-[#666666] mb-3">{item.usage}</p>
                <div className="flex items-center gap-1 mb-3">
                  <Stars />
                  <span className="text-[11px] lg:text-[12px] font-normal text-[#999999] ml-1">({item.reviews})</span>
                </div>
                {item.daysRemaining && (
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-[12px] lg:text-[13px] font-normal text-[#666666]">{item.daysRemaining} days remaining</span>
                    {item.status === 'Reorder' && (
                      <button className="px-4 h-[34px] lg:h-[36px] bg-[#8B7355] text-white text-[12px] lg:text-[13px] font-medium rounded-[6px] hover:bg-[#7a6448] transition-colors">
                        Reorder Now
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Weekly Treatments ── */}
      <div className="bg-[#F5F1EA] px-4 md:px-[60px] lg:px-[120px] py-10 md:py-12 lg:py-[64px]">
        <h2 className="text-[22px] md:text-[26px] lg:text-[32px] font-medium text-[#1A1A1A] mb-6 lg:mb-[32px]">Your Weekly Treatments</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-[24px]">
          {weeklyTreatments.map((treatment) => (
            <div key={treatment.day} className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.06)] overflow-hidden">
              <img src={treatment.image} alt={treatment.treatment} className="w-full h-[160px] md:h-[180px] lg:h-[200px] object-cover" />
              <div className="p-4 lg:p-[20px]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[12px] lg:text-[13px] font-medium text-[#8B7355]">{treatment.day}</span>
                  {treatment.completed && <IoCheckmarkCircle className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#8B7355]" />}
                </div>
                <h4 className="text-[14px] lg:text-[16px] font-medium text-[#1A1A1A]">{treatment.treatment}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Progress Tracking ── */}
      <div className="bg-white px-4 md:px-[60px] lg:px-[120px] py-10 md:py-12 lg:py-[64px]">
        <h2 className="text-[26px] md:text-[32px] lg:text-[40px] font-medium text-[#1A1A1A] mb-8 lg:mb-[48px]">Track Your Progress</h2>
        <div className="bg-gradient-to-b from-[#FDFBF7] to-white rounded-[16px] border border-[#E8E3D9] p-5 md:p-8 lg:p-[40px]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
            {analysisHistory.map((analysis, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <img src={analysis.image} alt="Analysis" className="w-[120px] h-[120px] md:w-[150px] md:h-[150px] lg:w-[180px] lg:h-[180px] object-cover rounded-[8px] mb-4 border-2 border-[#C9A870]" />
                <div className="text-[22px] md:text-[24px] lg:text-[28px] font-bold text-[#8B7355] mb-1">{analysis.score}</div>
                <div className="text-[12px] lg:text-[14px] font-normal text-[#666666]">{analysis.date}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 mb-6">
            {[{ label: 'Hydration +14%' }, { label: 'Texture +8%' }, { label: 'Clarity +6%' }].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <IoTrendingUp className="w-[20px] h-[20px] lg:w-[24px] lg:h-[24px] text-[#8B7355]" />
                <div>
                  <div className="text-[13px] lg:text-[14px] font-medium text-[#1A1A1A]">{item.label}</div>
                  <div className="text-[12px] lg:text-[13px] font-normal text-[#666666]">Key Improvement</div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <button className="w-full sm:w-[200px] lg:w-[240px] h-[48px] lg:h-[56px] bg-[#8B7355] text-white text-[14px] lg:text-[15px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">
              Schedule Next Analysis
            </button>
          </div>
        </div>
      </div>

      {/* ── Recommendations ── */}
      <div className="bg-[#FDFBF7] px-4 md:px-[60px] lg:px-[120px] py-10 md:py-12 lg:py-[64px]">
        <h2 className="text-[26px] md:text-[36px] lg:text-[48px] font-medium text-[#1A1A1A] text-center mb-3">Recommended For You</h2>
        <p className="text-[13px] md:text-[15px] lg:text-[16px] font-normal text-[#666666] text-center mb-8 lg:mb-[48px]">Based on your skin analysis and beauty profile</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-5 lg:gap-[24px]">
          {recommendations.map((product) => (
            <div key={product.name} className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.06)] overflow-hidden hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] transition-all duration-300">
              <div className="relative">
                <img src={product.image} alt={product.name} className="w-full h-[240px] md:h-[280px] lg:h-[360px] object-cover" />
                <div className="absolute top-4 right-4 px-3 py-1 bg-[#C9A870] text-white text-[11px] lg:text-[12px] font-medium rounded-full">{product.match} Match</div>
              </div>
              <div className="p-4 lg:p-[24px]">
                <p className="text-[12px] lg:text-[13px] font-light italic text-[#8B7355] mb-2">Shan Loray</p>
                <h4 className="text-[15px] md:text-[16px] lg:text-[18px] font-medium text-[#1A1A1A] mb-2">{product.name}</h4>
                <p className="text-[13px] lg:text-[14px] font-normal text-[#666666] mb-3">{product.description}</p>
                <p className="text-[17px] md:text-[18px] lg:text-[20px] font-semibold text-[#1A1A1A] mb-3">{product.price}</p>
                <div className="flex items-center gap-1 mb-4">
                  <Stars />
                  <span className="text-[11px] lg:text-[12px] font-normal text-[#999999] ml-1">({product.reviews})</span>
                </div>
                <button className="w-full h-[44px] lg:h-[48px] bg-[#8B7355] text-white text-[13px] lg:text-[14px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">
                  Add to Routine
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Saved Looks ── */}
      <div className="bg-white px-4 md:px-[60px] lg:px-[120px] py-10 md:py-12 lg:py-[64px]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 lg:mb-8">
          <h2 className="text-[22px] md:text-[28px] lg:text-[36px] font-medium text-[#1A1A1A]">My Saved Looks</h2>
          <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            {['All', 'Everyday', 'Evening', 'Favorites'].map((filter, idx) => (
              <button key={filter} className={`px-4 h-[36px] lg:h-[40px] text-[12px] lg:text-[14px] font-normal rounded-[8px] transition-colors flex-shrink-0 ${idx === 0 ? 'bg-[#8B7355] text-white' : 'bg-white border border-[#E8E3D9] text-[#666666] hover:border-[#8B7355]'}`}>
                {filter}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-[24px]">
          {savedLooks.map((look, idx) => (
            <div key={idx} className="relative group cursor-pointer">
              <img src={look.image} alt="Saved Look" className="w-full h-[160px] md:h-[200px] lg:h-[280px] object-cover rounded-[12px]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-[12px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end p-3 lg:p-5">
                <p className="text-[12px] lg:text-[14px] font-normal text-white mb-1">{look.date}</p>
                <p className="text-[11px] lg:text-[13px] font-light text-white/80 mb-3 lg:mb-4">{look.products}</p>
                <div className="flex gap-2">
                  <button className="w-[80px] lg:w-[100px] h-[32px] lg:h-[36px] bg-white text-[#1A1A1A] text-[11px] lg:text-[13px] font-medium rounded-[6px]">Recreate</button>
                  <button className="w-[64px] lg:w-[80px] h-[32px] lg:h-[36px] bg-[#8B7355] text-white text-[11px] lg:text-[13px] font-medium rounded-[6px]">Share</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Achievements ── */}
      <div className="bg-gradient-to-b from-[#FDFBF7] to-[#F5F1EA] px-4 md:px-[60px] lg:px-[120px] py-10 md:py-12 lg:py-[64px]">
        <h2 className="text-[22px] md:text-[28px] lg:text-[36px] font-medium text-[#1A1A1A] text-center mb-8 lg:mb-[48px]">Your Achievements</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-[24px]">
          {[
            { icon: IoTrophyOutline,    value: '28-Day Streak', label: 'Consistent routine'  },
            { icon: IoTrendingUp,       value: '+7 Points',     label: 'Skin improvement'    },
            { icon: IoCheckmarkCircle,  value: '5 Products',    label: 'Perfectly matched'   },
            { icon: IoSparklesOutline,  value: 'Keep Going',    label: 'Stay motivated'      },
          ].map((achievement, idx) => (
            <div key={idx} className="bg-white rounded-[12px] border border-[#E8E3D9] shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-5 lg:p-[32px] flex flex-col items-center">
              <achievement.icon className="w-[36px] h-[36px] md:w-[40px] md:h-[40px] lg:w-[48px] lg:h-[48px] text-[#C9A870] mb-3 lg:mb-4" />
              <div className="text-[15px] md:text-[17px] lg:text-[20px] font-semibold text-[#1A1A1A] mb-1">{achievement.value}</div>
              <div className="text-[12px] lg:text-[14px] font-normal text-[#666666] text-center">{achievement.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Beauty Calendar ── */}
      <div className="bg-white px-4 md:px-[60px] lg:px-[120px] py-10 md:py-12 lg:py-[64px]">
        <h2 className="text-[22px] md:text-[26px] lg:text-[32px] font-medium text-[#1A1A1A] mb-5 lg:mb-[32px]">Your Beauty Calendar</h2>
        <div className="space-y-3">
          {upcomingEvents.map((event) => (
            <div key={event.title} className="flex items-center justify-between bg-[#FDFBF7] rounded-[12px] border border-[#E8E3D9] p-4 lg:p-[20px] gap-4">
              <div className="flex items-center gap-3 lg:gap-4 min-w-0">
                <IoCalendarOutline className="w-[20px] h-[20px] lg:w-[24px] lg:h-[24px] text-[#8B7355] flex-shrink-0" />
                <div className="min-w-0">
                  <h4 className="text-[13px] md:text-[14px] lg:text-[16px] font-medium text-[#1A1A1A] mb-1 truncate">{event.title}</h4>
                  <p className="text-[12px] lg:text-[14px] font-normal text-[#666666]">{event.date}</p>
                </div>
              </div>
              <button className="px-3 md:px-4 lg:px-5 h-[36px] lg:h-[40px] bg-[#8B7355] text-white text-[12px] lg:text-[14px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors flex-shrink-0">
                {event.action}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ── Expert Notes ── */}
      <div className="bg-[#F5F1EA] px-4 md:px-[60px] lg:px-[120px] py-10 md:py-12 lg:py-[64px]">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 lg:gap-[64px]">
          <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=320&fit=crop" alt="Beauty Advisor" className="w-full md:w-[280px] md:h-[220px] lg:w-[400px] lg:h-[320px] object-cover rounded-[12px] shadow-[0_8px_32px_rgba(0,0,0,0.12)] flex-shrink-0" />
          <div className="flex-1">
            <h3 className="text-[18px] md:text-[22px] lg:text-[28px] font-medium text-[#1A1A1A] mb-4">Your Beauty Advisor's Notes</h3>
            <p className="text-[13px] md:text-[15px] lg:text-[16px] font-normal text-[#666666] leading-[1.7] mb-6">
              Based on your recent skin analysis and progress, I recommend continuing with your current vitamin C regimen. Your hydration levels are excellent! Consider adding a weekly exfoliating treatment to further improve texture and clarity.
            </p>
            <p className="text-[12px] md:text-[13px] lg:text-[14px] font-light italic text-[#8B7355] mb-6">- Dr. Emily Chen, Lead Skincare Specialist</p>
            <button className="w-full sm:w-[200px] lg:w-[220px] h-[48px] lg:h-[56px] bg-[#8B7355] text-white text-[14px] lg:text-[15px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">
              Book Consultation
            </button>
          </div>
        </div>
      </div>

      {/* ── Goals Tracker ── */}
      <div className="bg-white px-4 md:px-[60px] lg:px-[120px] py-10 md:py-12 lg:py-[64px]">
        <h2 className="text-[22px] md:text-[26px] lg:text-[32px] font-medium text-[#1A1A1A] mb-5 lg:mb-[32px]">Your Goals</h2>
        <div className="space-y-4 lg:space-y-5">
          {beautyGoals.map((goal) => (
            <div key={goal.goal} className="bg-[#FDFBF7] rounded-[12px] border border-[#E8E3D9] p-4 lg:p-[24px]">
              <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                <h4 className="text-[14px] lg:text-[16px] font-medium text-[#1A1A1A]">{goal.goal}</h4>
                <div className="flex items-center gap-2">
                  <span className="text-[13px] lg:text-[14px] font-semibold text-[#8B7355]">{goal.progress}%</span>
                  <span className="text-[11px] lg:text-[13px] font-normal text-[#666666]">Target: {goal.target}</span>
                </div>
              </div>
              <div className="w-full h-[10px] lg:h-[12px] bg-[#E8E3D9] rounded-full overflow-hidden">
                <div className="h-full bg-[#8B7355] rounded-full transition-all duration-500" style={{ width: `${goal.progress}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Newsletter CTA ── */}
      <div className="bg-gradient-to-b from-[#FDFBF7] to-white px-4 md:px-[60px] lg:px-[120px] py-10 md:py-12 lg:py-0 lg:min-h-[160px] flex flex-col items-center justify-center">
        <h3 className="text-[20px] md:text-[26px] lg:text-[32px] font-medium text-[#1A1A1A] mb-3 text-center">Get Your Weekly Beauty Insights</h3>
        <p className="text-[13px] md:text-[15px] lg:text-[16px] font-normal text-[#666666] mb-5 lg:mb-6 text-center">Personalized tips delivered every Monday</p>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <input type="email" placeholder="Enter your email" className="w-full sm:w-[280px] lg:w-[360px] h-[48px] lg:h-[56px] px-5 bg-white text-[14px] lg:text-[15px] text-[#2B2B2B] rounded-[8px] border border-[#E8E3D9] outline-none" />
          <button className="w-full sm:w-auto h-[48px] lg:h-[56px] px-8 bg-[#8B7355] text-white text-[14px] lg:text-[15px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">
            Subscribe
          </button>
        </div>
      </div>

    </div>
  )
}