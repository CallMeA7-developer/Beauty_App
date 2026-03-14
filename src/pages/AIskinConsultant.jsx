import {
  IoCameraOutline,
  IoCheckmarkCircle,
  IoSunnyOutline,
  IoPersonCircleOutline,
  IoSparklesOutline,
  IoStarSharp,
  IoShieldCheckmarkOutline,
  IoChevronDown,
  IoLockClosedOutline,
  IoAnalyticsOutline,
  IoTimeOutline,
  IoTrendingUpOutline,
  IoPersonOutline,
  IoCalendarOutline,
  IoBulbOutline,
  IoSearchOutline,
  IoVideocamOutline,
  IoDocumentTextOutline,
} from 'react-icons/io5'

export default function AISkinConsultant() {
  const consultationMethods = [
    {
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=360&h=240&fit=crop',
      badge: 'MOST POPULAR', badgeColor: '#8B7355',
      title: 'AI Photo Analysis',
      description: 'Instant comprehensive skin assessment using advanced computer vision and dermatological algorithms',
      features: ['Medical-grade accuracy', 'Instant results in 60 seconds', 'Detailed skin mapping', 'Personalized recommendations'],
      buttonText: 'Start Photo Analysis', buttonStyle: 'primary',
    },
    {
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=360&h=240&fit=crop',
      badge: 'EXPERT GUIDANCE', badgeColor: '#688B8D',
      title: 'Live Expert Consultation',
      description: 'Real-time video consultation with certified skincare specialists and dermatologists',
      features: ['One-on-one expert guidance', '30–60 minute sessions', 'Personalized treatment plans', 'Follow-up support included'],
      buttonText: 'Schedule Consultation', buttonStyle: 'secondary',
    },
    {
      image: 'https://images.unsplash.com/photo-1611349411198-e26e0d5f4a52?w=360&h=240&fit=crop',
      badge: 'COMPREHENSIVE', badgeColor: '#C9A870',
      title: 'Detailed Questionnaire',
      description: 'In-depth lifestyle and skin history assessment for comprehensive understanding',
      features: ['Thorough skin history', 'Lifestyle factor analysis', 'Environmental impact review', 'Goal-oriented approach'],
      buttonText: 'Take Questionnaire', buttonStyle: 'secondary',
    },
  ]

  const features = [
    { icon: IoSearchOutline, title: 'Medical-Grade Accuracy', description: 'AI technology validated by dermatologists with 98% accuracy rate', badge: '98%' },
    { icon: IoTimeOutline, title: 'Instant Results', description: 'Complete analysis delivered in under 60 seconds', badge: '60s' },
    { icon: IoAnalyticsOutline, title: 'Comprehensive Analysis', description: 'Evaluate 12+ skin metrics simultaneously for a complete picture', badge: '12+' },
    { icon: IoPersonOutline, title: 'Expert Validation', description: 'All results reviewed and validated by certified specialists', badge: '✓' },
    { icon: IoTrendingUpOutline, title: 'Progress Tracking', description: 'Monitor improvements with historical comparison tools', badge: '📈' },
    { icon: IoBulbOutline, title: 'Personalized Plans', description: 'Custom routines generated based on your unique profile', badge: '🎯' },
  ]

  const analysisCategories = [
    { image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=280&h=160&fit=crop', title: 'Skin Type Identification', description: 'Accurately determine your skin type including oily, dry, combination, and sensitive classifications' },
    { image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=280&h=160&fit=crop', title: 'Hydration Levels', description: 'Measure moisture content and water retention capacity to optimize hydration routines' },
    { image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=280&h=160&fit=crop', title: 'Texture & Pores', description: 'Evaluate smoothness, pore size, and overall skin texture for refined appearance' },
    { image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=280&h=160&fit=crop', title: 'Pigmentation & Tone', description: 'Assess even tone distribution and identify areas of hyperpigmentation or dark spots' },
    { image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=280&h=160&fit=crop', title: 'Fine Lines & Aging', description: 'Detect early signs of aging including wrinkle depth and skin elasticity measurements' },
    { image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=280&h=160&fit=crop', title: 'Acne & Blemishes', description: 'Identify problem areas, severity grading, and inflammation assessment' },
    { image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=280&h=160&fit=crop', title: 'Sensitivity Analysis', description: 'Evaluate skin reactivity levels and potential triggers for inflammation' },
    { image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=280&h=160&fit=crop', title: 'Environmental Damage', description: 'Assess UV exposure impact and free radical damage to skin cells' },
  ]

  const processSteps = [
    { number: '1', image: 'https://images.unsplash.com/photo-1611349411198-e26e0d5f4a52?w=120&h=120&fit=crop', title: 'Upload & Scan', description: 'Take or upload a clear photo of your face in natural lighting' },
    { number: '2', image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=120&h=120&fit=crop', title: 'AI Processing', description: 'Advanced algorithms analyze thousands of data points instantly' },
    { number: '3', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=120&h=120&fit=crop', title: 'Expert Review', description: 'Dermatologist validates and enhances AI findings' },
    { number: '4', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=120&h=120&fit=crop', title: 'Receive Plan', description: 'Get personalized routine with product recommendations' },
  ]

  const recommendedProducts = [
    { image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=240&h=240&fit=crop', brand: 'Shan Loray', name: 'Luminous Youth Serum', benefit: 'Anti-aging & brightening', price: '$145', reviews: 892, reason: 'Targets fine lines detected' },
    { image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=240&h=240&fit=crop', brand: 'Shan Loray', name: 'Hydrating Essence', benefit: 'Deep moisture boost', price: '$98', reviews: 634, reason: 'Matches your hydration needs' },
    { image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=240&h=240&fit=crop', brand: 'Shan Loray', name: 'Pore Refining Toner', benefit: 'Minimizes pores', price: '$72', reviews: 521, reason: 'Addresses texture concerns' },
    { image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=240&h=240&fit=crop', brand: 'Shan Loray', name: 'Renewal Night Cream', benefit: 'Overnight repair', price: '$125', reviews: 748, reason: 'Supports skin regeneration' },
  ]

  const pricingPlans = [
    { name: 'Basic', price: 'Free', badge: '', features: ['AI photo analysis', 'Basic skin assessment', 'Product recommendations', 'Limited feature access'], buttonText: 'Get Started Free', buttonStyle: 'secondary' },
    { name: 'Premium', price: '$49', badge: 'MOST POPULAR', features: ['All basic features', 'Detailed analysis report', 'Expert review', 'Progress tracking', 'Priority support'], buttonText: 'Choose Premium', buttonStyle: 'primary' },
    { name: 'Platinum', price: '$149', badge: 'COMPREHENSIVE', features: ['All premium features', 'Live video consultation (30 min)', 'Personalized treatment plan', 'Monthly follow-ups', 'VIP product access'], buttonText: 'Choose Platinum', buttonStyle: 'secondary' },
  ]

  const testimonials = [
    { beforeImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=200&h=280&fit=crop', afterImage: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=200&h=280&fit=crop', name: 'Sarah Mitchell', age: 34, type: 'Premium Consultation', quote: 'The AI analysis was incredibly accurate. My skin has never looked better!', timeline: 'After 8 weeks' },
    { beforeImage: 'https://images.unsplash.com/photo-1611349411198-e26e0d5f4a52?w=200&h=280&fit=crop', afterImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=200&h=280&fit=crop', name: 'Emily Chen', age: 29, type: 'AI Photo Analysis', quote: 'Finally found products that actually work for my sensitive skin.', timeline: 'After 6 weeks' },
    { beforeImage: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=200&h=280&fit=crop', afterImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=280&fit=crop', name: 'Jessica Rodriguez', age: 42, type: 'Live Expert Consultation', quote: 'The video consultation with a dermatologist was worth every penny.', timeline: 'After 12 weeks' },
    { beforeImage: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=200&h=280&fit=crop', afterImage: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=200&h=280&fit=crop', name: 'Amanda Foster', age: 38, type: 'Platinum Plan', quote: 'Monthly follow-ups keep me on track. My hyperpigmentation has improved dramatically.', timeline: 'After 10 weeks' },
  ]

  const faqs = [
    { question: 'How accurate is AI skin analysis?', answer: 'Our AI technology has been validated against dermatologist assessments with 98% accuracy. It analyzes millions of data points using advanced computer vision.' },
    { question: 'What happens during a live consultation?', answer: 'You will meet with a certified skincare specialist via video for 30–60 minutes to discuss your skin concerns, review your analysis, and create a personalized treatment plan.' },
    { question: 'How long until I see results?', answer: 'Most users notice visible improvements within 4–6 weeks of consistently following their personalized routine.' },
    { question: 'Can I consult with the same expert again?', answer: 'Yes! Premium and Platinum members can request their preferred consultant for all follow-up sessions.' },
    { question: "What if I'm not satisfied?", answer: "We offer a 30-day satisfaction guarantee. If you're not happy, we'll provide a full refund or complimentary re-consultation." },
    { question: 'How do I prepare for my consultation?', answer: 'Cleanse your face thoroughly, remove all makeup, and ensure good natural lighting. Have your current skincare products ready to discuss.' },
  ]

  const metrics = [
    { label: 'Hydration', value: 92 },
    { label: 'Clarity', value: 85 },
    { label: 'Texture', value: 78 },
    { label: 'Tone', value: 81 },
  ]

  const Stars = () => [...Array(5)].map((_, i) => <IoStarSharp key={i} className="w-[12px] h-[12px] text-[#C9A870]" />)

  return (
    <div className="bg-white font-['Cormorant_Garamond']">

      {/* ── Hero ── */}
      <div className="min-h-[520px] bg-gradient-to-b from-[#FDFBF7] to-[#F5F1EA] relative overflow-hidden flex items-center px-[120px]">
        <div className="w-[650px] relative z-10">
          <p className="text-[14px] font-light italic text-[#8B7355] tracking-[2px] mb-3">PERSONALIZED AI CONSULTATION</p>
          <h1 className="text-[72px] font-bold text-[#1A1A1A] leading-[1.05] mb-6">Your Personal Skin Journey Begins Here</h1>
          <p className="text-[20px] font-normal text-[#666666] mb-8">Expert AI-powered consultation combined with dermatologist insights for comprehensive skin analysis and personalized treatment plans</p>
          <div className="w-[140px] h-[4px] bg-[#C9A870]" />
        </div>
        <div className="absolute right-[140px] top-1/2 -translate-y-1/2">
          <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop" alt="AI Consultation" className="w-[400px] h-[400px] object-cover rounded-[12px] shadow-[0_12px_48px_rgba(0,0,0,0.12)]" />
        </div>
      </div>

      {/* ── Breadcrumb ── */}
      <div className="min-h-[48px] bg-[#FDFBF7] px-[120px] flex items-center">
        <span className="text-[15px] font-normal text-[#8B7355] cursor-pointer">Home</span>
        <span className="text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[15px] font-normal text-[#8B7355] cursor-pointer">Technology</span>
        <span className="text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[15px] font-normal text-[#666666]">AI Skin Consultation</span>
      </div>

      {/* ── Consultation Methods ── */}
      <div className="bg-white px-[120px] py-[64px]">
        <h2 className="text-[48px] font-medium text-[#1A1A1A] text-center mb-4">Complete Skin Consultation Experience</h2>
        <p className="text-[16px] font-normal text-[#666666] text-center mb-[56px]">Choose your preferred consultation method for personalized skincare guidance</p>
        <div className="grid grid-cols-3 gap-[32px]">
          {consultationMethods.map((method, idx) => (
            <div key={idx} className="bg-white rounded-[16px] shadow-[0_8px_32px_rgba(0,0,0,0.08)] overflow-hidden hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] transition-all duration-300">
              <div className="relative">
                <img src={method.image} alt={method.title} className="w-full h-[240px] object-cover" />
                <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 rounded-full" style={{ color: method.badgeColor }}>
                  <span className="text-[11px] font-medium">{method.badge}</span>
                </div>
              </div>
              <div className="p-[32px]">
                <h3 className="text-[24px] font-medium text-[#1A1A1A] mb-3">{method.title}</h3>
                <p className="text-[15px] font-normal text-[#666666] leading-[1.6] mb-5">{method.description}</p>
                <div className="flex flex-col gap-2 mb-6">
                  {method.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2">
                      <IoCheckmarkCircle className="w-[16px] h-[16px] text-[#8B7355] flex-shrink-0" />
                      <span className="text-[14px] font-normal text-[#3D3D3D]">{feature}</span>
                    </div>
                  ))}
                </div>
                <button className={`w-full h-[48px] text-[15px] font-medium rounded-[8px] transition-all ${method.buttonStyle === 'primary' ? 'bg-[#8B7355] text-white hover:bg-[#7a6448]' : 'bg-white border-2 border-[#8B7355] text-[#8B7355] hover:bg-[#FDFBF7]'}`}>
                  {method.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Upload Interface ── */}
      <div className="min-h-[550px] bg-gradient-to-b from-[#F5F1EA] to-white px-[120px] py-[64px]">
        <h2 className="text-[48px] font-medium text-[#1A1A1A] text-center mb-[56px]">Begin Your AI Skin Analysis</h2>
        <div className="max-w-[800px] mx-auto">
          <div className="border-2 border-dashed border-[#C9A870] rounded-[12px] bg-white flex flex-col items-center justify-center p-[48px] hover:border-[#8B7355] transition-colors">
            <IoCameraOutline className="w-[80px] h-[80px] text-[#8B7355] mb-6" />
            <h3 className="text-[24px] font-medium text-[#1A1A1A] mb-4">Upload a clear front-facing photo in natural lighting</h3>
            <p className="text-[15px] font-normal text-[#666666] text-center mb-8">Ensure good lighting and face directly forward for accurate analysis</p>
            <div className="flex gap-4">
              <button className="w-[200px] h-[56px] bg-[#8B7355] text-white text-[15px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">Upload Photo</button>
              <button className="w-[200px] h-[56px] bg-white border-2 border-[#8B7355] text-[#8B7355] text-[15px] font-medium rounded-[8px] hover:bg-[#FDFBF7] transition-colors">Take Live Selfie</button>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-6">
            {[
              { icon: IoSunnyOutline, title: 'Good Lighting', desc: 'Natural daylight preferred' },
              { icon: IoPersonCircleOutline, title: 'Face Forward', desc: 'Look directly at camera' },
              { icon: IoSparklesOutline, title: 'Remove Makeup', desc: 'Clean, bare skin' },
            ].map((tip, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <tip.icon className="w-[32px] h-[32px] text-[#8B7355] mb-3" />
                <h4 className="text-[16px] font-medium text-[#1A1A1A] mb-1">{tip.title}</h4>
                <p className="text-[14px] font-normal text-[#666666]">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Why Choose AI ── */}
      <div className="bg-white px-[120px] py-[64px]">
        <h2 className="text-[48px] font-medium text-[#1A1A1A] text-center mb-[56px]">Why Choose AI Consultation</h2>
        <div className="grid grid-cols-3 gap-[32px]">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white rounded-[12px] border border-[#E8E3D9] shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-[24px] hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <feature.icon className="w-[32px] h-[32px] text-[#8B7355]" />
                <span className="text-[20px] font-semibold text-[#8B7355]">{feature.badge}</span>
              </div>
              <h3 className="text-[20px] font-medium text-[#1A1A1A] mb-2">{feature.title}</h3>
              <p className="text-[15px] font-normal text-[#666666] leading-[1.6]">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── What We Analyze ── */}
      <div className="bg-[#FDFBF7] px-[120px] py-[64px]">
        <h2 className="text-[40px] font-medium text-[#1A1A1A] text-center mb-[56px]">What We Analyze</h2>
        <div className="grid grid-cols-4 gap-[24px]">
          {analysisCategories.map((category, idx) => (
            <div key={idx} className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.06)] overflow-hidden hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-all duration-300">
              <img src={category.image} alt={category.title} className="w-full h-[160px] object-cover" />
              <div className="p-[20px]">
                <h3 className="text-[18px] font-medium text-[#1A1A1A] mb-2">{category.title}</h3>
                <p className="text-[14px] font-normal text-[#666666] leading-[1.5]">{category.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Process Steps ── */}
      <div className="bg-white px-[120px] py-[64px]">
        <h2 className="text-[48px] font-medium text-[#1A1A1A] text-center mb-[56px]">Your Consultation Journey</h2>
        <div className="flex justify-center gap-[48px]">
          {processSteps.map((step, idx) => (
            <div key={idx} className="w-[240px] text-center">
              <div className="flex justify-center mb-4">
                <img src={step.image} alt={step.title} className="w-[120px] h-[120px] object-cover rounded-full border-4 border-[#E8E3D9]" />
              </div>
              <div className="flex justify-center mb-3">
                <div className="w-[48px] h-[48px] bg-[#8B7355] text-white text-[24px] font-semibold rounded-full flex items-center justify-center">{step.number}</div>
              </div>
              <h3 className="text-[20px] font-medium text-[#1A1A1A] mb-2">{step.title}</h3>
              <p className="text-[15px] font-normal text-[#666666] leading-[1.6]">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Sample Results ── */}
      <div className="bg-gradient-to-b from-[#F5F1EA] to-white px-[120px] py-[64px]">
        <h2 className="text-[48px] font-medium text-[#1A1A1A] text-center mb-[56px]">See What You'll Receive</h2>
        <div className="max-w-[900px] mx-auto bg-white rounded-[16px] shadow-[0_8px_32px_rgba(0,0,0,0.08)] p-[48px]">
          <div className="text-center mb-10">
            <div className="text-[80px] font-bold text-[#8B7355] leading-none mb-2">87/100</div>
            <h3 className="text-[24px] font-medium text-[#1A1A1A] mb-2">Overall Skin Health Score</h3>
            <p className="text-[16px] font-normal text-[#666666]">Excellent condition with minor improvement areas</p>
          </div>
          <div className="grid grid-cols-4 gap-8 mb-10">
            {metrics.map((metric, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="relative w-[100px] h-[100px] mb-3">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#E8E3D9" strokeWidth="8" />
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#8B7355" strokeWidth="8"
                      strokeDasharray={`${2 * Math.PI * 45 * metric.value / 100} ${2 * Math.PI * 45}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[18px] font-semibold text-[#1A1A1A]">{metric.value}%</span>
                  </div>
                </div>
                <span className="text-[15px] font-medium text-[#666666]">{metric.label}</span>
              </div>
            ))}
          </div>
          <button className="w-full h-[56px] bg-[#8B7355] text-white text-[15px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">
            View Sample Full Report
          </button>
        </div>
      </div>

      {/* ── Product Recommendations ── */}
      <div className="bg-white px-[120px] py-[64px]">
        <h2 className="text-[40px] font-medium text-[#1A1A1A] text-center mb-4">Personalized Product Matching</h2>
        <p className="text-[16px] font-normal text-[#666666] text-center mb-[56px]">AI-powered recommendations based on your unique skin analysis</p>
        <div className="grid grid-cols-4 gap-[24px]">
          {recommendedProducts.map((product, idx) => (
            <div key={idx} className="bg-white rounded-[12px] border border-[#E8E3D9] overflow-hidden hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-all duration-300">
              <img src={product.image} alt={product.name} className="w-full h-[240px] object-cover" />
              <div className="p-[20px]">
                <p className="text-[13px] font-light italic text-[#8B7355] mb-1">{product.brand}</p>
                <h3 className="text-[18px] font-medium text-[#1A1A1A] mb-1">{product.name}</h3>
                <p className="text-[14px] font-normal text-[#666666] mb-3">{product.benefit}</p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[20px] font-semibold text-[#1A1A1A]">{product.price}</span>
                  <div className="flex items-center gap-1"><Stars /></div>
                </div>
                <div className="px-3 py-1 bg-[#F5F1EA] rounded-[6px] mb-3">
                  <p className="text-[12px] font-medium text-[#8B7355]">{product.reason}</p>
                </div>
                <button className="w-full h-[44px] bg-[#8B7355] text-white text-[14px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">
                  Add to Routine
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Booking ── */}
      <div className="bg-[#F5F1EA] px-[120px] py-[64px]">
        <div className="flex gap-[48px] items-start">
          <div className="flex-1">
            <h2 className="text-[36px] font-medium text-[#1A1A1A] mb-5">Schedule Your Live Consultation</h2>
            <p className="text-[16px] font-normal text-[#666666] mb-6">Book a video session with certified skincare specialists</p>
            <div className="flex flex-col gap-3 mb-8">
              {['One-on-one personalized guidance', 'Review detailed analysis results', 'Custom treatment plan creation', 'Product selection assistance', 'Follow-up support included'].map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <IoCheckmarkCircle className="w-[20px] h-[20px] text-[#8B7355] flex-shrink-0" />
                  <span className="text-[15px] font-normal text-[#3D3D3D]">{benefit}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-4">
              <button className="w-[180px] h-[56px] bg-[#8B7355] text-white text-[15px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">Book Now</button>
              <button className="w-[180px] h-[56px] bg-white border-2 border-[#8B7355] text-[#8B7355] text-[15px] font-medium rounded-[8px] hover:bg-white/80 transition-colors">Learn More</button>
            </div>
          </div>
          <div className="w-[520px] bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-[32px]">
            <h3 className="text-[20px] font-medium text-[#1A1A1A] mb-6">Available Time Slots</h3>
            <div className="grid grid-cols-3 gap-3 mb-6">
              {['30 minutes', '45 minutes', '60 minutes'].map((duration, idx) => (
                <div key={idx} className={`h-[48px] flex items-center justify-center rounded-[8px] cursor-pointer transition-all ${idx === 1 ? 'bg-[#8B7355] text-white' : 'bg-[#F5F1EA] text-[#3D3D3D] hover:bg-[#E8E3D9]'}`}>
                  <span className="text-[14px] font-medium">{duration}</span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-[12px] font-medium text-[#666666] text-center py-1">{day}</div>
              ))}
              {[...Array(35)].map((_, idx) => (
                <div key={idx} className={`h-[36px] flex items-center justify-center rounded-[6px] text-[13px] transition-all ${idx === 15 || idx === 22 ? 'bg-[#8B7355] text-white font-medium' : idx < 5 ? 'text-[#C9C9C9]' : 'bg-[#F5F1EA] text-[#3D3D3D] cursor-pointer hover:bg-[#8B7355] hover:text-white'}`}>
                  {idx < 5 ? '' : idx - 4}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3 p-4 bg-[#FDFBF7] rounded-[8px]">
              <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=60&h=60&fit=crop" alt="Expert" className="w-[56px] h-[56px] object-cover rounded-full" />
              <div>
                <h4 className="text-[16px] font-medium text-[#1A1A1A]">Dr. Sarah Williams</h4>
                <p className="text-[13px] font-normal text-[#666666]">Certified Dermatologist</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Pricing ── */}
      <div className="bg-white px-[120px] py-[64px]">
        <h2 className="text-[40px] font-medium text-[#1A1A1A] text-center mb-[56px]">Choose Your Consultation Plan</h2>
        <div className="grid grid-cols-3 gap-[32px]">
          {pricingPlans.map((plan, idx) => (
            <div key={idx} className={`bg-white rounded-[16px] border-2 shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-[32px] hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-all ${idx === 1 ? 'border-[#8B7355]' : 'border-[#E8E3D9]'}`}>
              {plan.badge && <div className="px-4 py-1 bg-[#F5F1EA] text-[#8B7355] text-[11px] font-medium rounded-full inline-block mb-4">{plan.badge}</div>}
              <h3 className="text-[28px] font-semibold text-[#1A1A1A] mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-[48px] font-bold text-[#1A1A1A]">{plan.price}</span>
                {plan.price !== 'Free' && <span className="text-[16px] font-normal text-[#666666]">/month</span>}
              </div>
              <div className="flex flex-col gap-3 mb-8">
                {plan.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-3">
                    <IoCheckmarkCircle className="w-[18px] h-[18px] text-[#8B7355] flex-shrink-0" />
                    <span className="text-[15px] font-normal text-[#3D3D3D]">{feature}</span>
                  </div>
                ))}
              </div>
              <button className={`w-full h-[56px] text-[15px] font-medium rounded-[8px] transition-all ${plan.buttonStyle === 'primary' ? 'bg-[#8B7355] text-white hover:bg-[#7a6448]' : 'bg-white border-2 border-[#8B7355] text-[#8B7355] hover:bg-[#FDFBF7]'}`}>
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ── Privacy ── */}
      <div className="bg-gradient-to-b from-[#F5F1EA] to-white px-[120px] py-[64px]">
        <div className="flex flex-col items-center mb-10">
          <IoShieldCheckmarkOutline className="w-[48px] h-[48px] text-[#8B7355] mb-4" />
          <h2 className="text-[32px] font-medium text-[#1A1A1A]">Your Privacy is Our Priority</h2>
        </div>
        <div className="grid grid-cols-3 gap-[48px]">
          {[
            { icon: IoLockClosedOutline, title: 'Encrypted & Secure', desc: 'All data transmitted with military-grade encryption and stored securely' },
            { icon: IoCheckmarkCircle, title: 'HIPAA Compliant', desc: 'Meeting medical privacy standards for health information protection' },
            { icon: IoShieldCheckmarkOutline, title: 'Never Shared', desc: 'Your data is never sold or shared with third parties' },
          ].map((item, idx) => (
            <div key={idx} className="text-center">
              <item.icon className="w-[32px] h-[32px] text-[#8B7355] mx-auto mb-4" />
              <h3 className="text-[20px] font-medium text-[#1A1A1A] mb-3">{item.title}</h3>
              <p className="text-[15px] font-normal text-[#666666] leading-[1.6]">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <span className="text-[15px] font-medium text-[#8B7355] cursor-pointer hover:underline">View Privacy Policy</span>
        </div>
      </div>

      {/* ── Testimonials ── */}
      <div className="bg-white px-[120px] py-[64px]">
        <h2 className="text-[40px] font-medium text-[#1A1A1A] text-center mb-[56px]">Real Results from Real Consultations</h2>
        <div className="grid grid-cols-4 gap-[24px]">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="bg-white rounded-[12px] border border-[#E8E3D9] shadow-[0_4px_16px_rgba(0,0,0,0.06)] overflow-hidden hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-all duration-300">
              <div className="flex">
                <img src={testimonial.beforeImage} alt="Before" className="w-1/2 h-[200px] object-cover" />
                <img src={testimonial.afterImage} alt="After" className="w-1/2 h-[200px] object-cover" />
              </div>
              <div className="p-[20px]">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="text-[16px] font-medium text-[#1A1A1A]">{testimonial.name}</h4>
                    <p className="text-[13px] font-normal text-[#666666]">Age {testimonial.age}</p>
                  </div>
                  <div className="flex gap-0.5"><Stars /></div>
                </div>
                <div className="px-3 py-1 bg-[#F5F1EA] rounded-[6px] mb-3">
                  <p className="text-[12px] font-medium text-[#8B7355]">{testimonial.type}</p>
                </div>
                <p className="text-[14px] font-light italic text-[#666666] leading-[1.5] mb-3">"{testimonial.quote}"</p>
                <p className="text-[13px] font-medium text-[#8B7355]">{testimonial.timeline}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FAQ ── */}
      <div className="bg-[#FDFBF7] px-[120px] py-[64px]">
        <h2 className="text-[40px] font-medium text-[#1A1A1A] text-center mb-[56px]">Consultation Questions Answered</h2>
        <div className="max-w-[900px] mx-auto flex flex-col gap-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white border border-[#E8E3D9] rounded-[12px] p-[24px]">
              <div className="flex items-center justify-between cursor-pointer">
                <h3 className="text-[17px] font-medium text-[#1A1A1A]">{faq.question}</h3>
                <IoChevronDown className="w-[20px] h-[20px] text-[#8B7355] flex-shrink-0 ml-4" />
              </div>
              {idx < 2 && (
                <div className="mt-4 bg-[#F5F1EA] rounded-[8px] p-5">
                  <p className="text-[15px] font-normal text-[#666666] leading-[1.7]">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Final CTA ── */}
      <div className="min-h-[180px] bg-gradient-to-b from-[#F5F1EA] to-white flex flex-col items-center justify-center px-[120px]">
        <h2 className="text-[36px] font-medium text-[#1A1A1A] mb-3">Ready to Transform Your Skin?</h2>
        <p className="text-[16px] font-normal text-[#666666] mb-6">Join thousands who've discovered their perfect skincare routine</p>
        <div className="flex gap-4">
          <button className="w-[220px] h-[56px] bg-[#8B7355] text-white text-[15px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">Start Free Analysis</button>
          <button className="w-[220px] h-[56px] bg-white border-2 border-[#8B7355] text-[#8B7355] text-[15px] font-medium rounded-[8px] hover:bg-[#FDFBF7] transition-colors">Talk to Expert</button>
        </div>
      </div>

    </div>
  )
}