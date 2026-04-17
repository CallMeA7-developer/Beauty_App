import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
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
  IoClose,
  IoImagesOutline,
  IoCloudUploadOutline,
  IoHappyOutline,
  IoResizeOutline,
  IoLogoInstagram,
  IoInformationCircleOutline,
  IoCashOutline,
  IoChevronBack,
  IoChevronForward,
  IoLogoFacebook,
  IoLogoPinterest,
  IoLogoYoutube,
} from 'react-icons/io5'

// ─── Shared Data ──────────────────────────────────────────────────────────────
const quickStartCards = [
  { icon: IoCameraOutline, title: 'Upload Photo',      description: 'Instant AI analysis',    bgColor: '#F5F1EA', iconColor: '#8B7355' },
  { icon: IoCameraOutline, title: 'Take Selfie',       description: 'Live capture & scan',     bgColor: 'white',   borderColor: '#E8E3D9', iconColor: '#8B7355' },
  { icon: IoVideocamOutline, title: 'Book Live Session', description: 'Expert consultation',   bgColor: 'white',   borderColor: '#E8E3D9', iconColor: '#8B7355' },
]

const mobileFeatures = [
  { badge: '98%', title: 'Medical-Grade Accuracy', description: 'Validated by dermatologists' },
  { badge: '60s',  title: 'Instant Results',         description: 'Complete analysis delivered' },
  { badge: '12+', title: 'Comprehensive Analysis',   description: 'Multiple skin metrics' },
  { badge: '✓',   title: 'Expert Validation',        description: 'Certified specialists review' },
  { badge: '📈',  title: 'Progress Tracking',        description: 'Monitor improvements' },
  { badge: '🎯',  title: 'Personalized Plans',       description: 'Custom routines generated' },
]

const analysisCategories = [
  { image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=340&h=120&fit=crop', title: 'Skin Type',        desc: 'Accurate type determination' },
  { image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=340&h=120&fit=crop',   title: 'Hydration',        desc: 'Moisture content analysis' },
  { image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=340&h=120&fit=crop', title: 'Texture & Pores', desc: 'Smoothness evaluation' },
  { image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=340&h=120&fit=crop', title: 'Pigmentation',    desc: 'Tone distribution' },
  { image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=340&h=120&fit=crop', title: 'Fine Lines',      desc: 'Aging signs detection' },
  { image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=340&h=120&fit=crop', title: 'Acne',            desc: 'Problem area identification' },
  { image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=340&h=120&fit=crop', title: 'Sensitivity',    desc: 'Reactivity assessment' },
  { image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=340&h=120&fit=crop', title: 'UV Damage',      desc: 'Environmental impact' },
]

const processSteps = [
  { number: '1', image: 'https://images.unsplash.com/photo-1611349411198-e26e0d5f4a52?w=80&h=80&fit=crop', title: 'Upload & Scan',  desc: 'Take clear photo in natural light' },
  { number: '2', image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=80&h=80&fit=crop', title: 'AI Processing', desc: 'Algorithms analyze data points' },
  { number: '3', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=80&h=80&fit=crop',   title: 'Expert Review', desc: 'Dermatologist validates findings' },
  { number: '4', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=80&h=80&fit=crop',   title: 'Receive Plan',  desc: 'Get personalized routine' },
]

const metrics = [
  { label: 'Hydration', value: 92 },
  { label: 'Clarity',   value: 85 },
  { label: 'Texture',   value: 78 },
  { label: 'Tone',      value: 81 },
]

const pricingPlans = [
  { name: 'Basic',    price: 'Free', badge: '',            features: ['AI photo analysis', 'Basic skin assessment', 'Product recommendations', 'Limited feature access'],                                       buttonStyle: 'secondary', buttonText: 'Get Started Free' },
  { name: 'Premium',  price: '$49',  period: '/month', badge: 'MOST POPULAR',  features: ['All basic features', 'Detailed analysis report', 'Expert review', 'Progress tracking', 'Priority support'],       buttonStyle: 'primary',   buttonText: 'Choose Premium' },
  { name: 'Platinum', price: '$149', period: '/month', badge: '',              features: ['All premium features', 'Live video consultation', 'Personalized treatment plan', 'Monthly follow-ups', 'VIP product access'], buttonStyle: 'secondary', buttonText: 'Choose Platinum' },
]

const testimonials = [
  { beforeImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=180&h=200&fit=crop', afterImage: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=180&h=200&fit=crop', name: 'Sarah Mitchell',    age: 34, type: 'Premium Plan',   quote: 'The AI analysis was incredibly accurate!',        timeline: 'After 8 weeks' },
  { beforeImage: 'https://images.unsplash.com/photo-1611349411198-e26e0d5f4a52?w=180&h=200&fit=crop', afterImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=180&h=200&fit=crop', name: 'Emily Chen',        age: 29, type: 'AI Analysis',    quote: 'Finally found products that work!',                timeline: 'After 6 weeks' },
  { beforeImage: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=180&h=200&fit=crop', afterImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=180&h=200&fit=crop',   name: 'Jessica Rodriguez', age: 42, type: 'Live Expert',   quote: 'Worth every penny. Concerns addressed.',           timeline: 'After 12 weeks' },
]

const faqs = [
  { question: 'How accurate is AI skin analysis?',        answer: 'Our AI technology has been validated against dermatologist assessments with 98% accuracy. It analyzes millions of data points using advanced computer vision.' },
  { question: 'What happens during a live consultation?', answer: 'You will meet with a certified skincare specialist via video for 30–60 minutes to discuss your skin concerns, review your analysis, and create a personalized treatment plan.' },
  { question: 'How long until I see results?',            answer: 'Most users notice visible improvements within 4–6 weeks of consistently following their personalized routine.' },
  { question: 'Can I consult with the same expert again?', answer: 'Yes! Premium and Platinum members can request their preferred consultant for all follow-up sessions.' },
  { question: "What if I'm not satisfied?",              answer: "We offer a 30-day satisfaction guarantee. If you're not happy, we'll provide a full refund or complimentary re-consultation." },
]

// ─── Mobile ───────────────────────────────────────────────────────────────────
function AISkinConsultantMobile() {
  const navigate = useNavigate()
  const [expandedFaq, setExpandedFaq] = useState(new Set([0, 1]))
  const [showUploadPopup, setShowUploadPopup] = useState(false)
  const [showBookingPopup, setShowBookingPopup] = useState(false)
  const [selectedDate, setSelectedDate] = useState(18)
  const [selectedTime, setSelectedTime] = useState(3)
  const [selectedDuration, setSelectedDuration] = useState(1)
  const [selectedExpert, setSelectedExpert] = useState(0)

  return (
    <>
    <div className="w-full min-h-screen bg-white font-['Cormorant_Garamond']">

      {/* ── Breadcrumb ── */}
      <div className="min-h-[40px] bg-[#FDFBF7] px-5 flex items-center">
        <span className="text-[13px] text-[#8B7355]">Home</span>
        <span className="text-[13px] text-[#666666] mx-1.5">/</span>
        <span className="text-[13px] text-[#8B7355]">Technology</span>
        <span className="text-[13px] text-[#666666] mx-1.5">/</span>
        <span className="text-[13px] text-[#666666]">AI Consultation</span>
      </div>

      {/* ── Hero ── */}
      <div className="min-h-[420px] bg-gradient-to-b from-[#FDFBF7] to-[#F5F1EA] px-5 py-8 relative">
        <div className="text-center mb-6">
          <p className="text-[11px] font-light italic text-[#8B7355] tracking-[1.5px] mb-2">PERSONALIZED AI CONSULTATION</p>
          <h2 className="text-[34px] font-bold text-[#1A1A1A] leading-tight mb-3">Your Personal Skin Journey</h2>
          <p className="text-[14px] font-normal text-[#666666] leading-relaxed px-4">Expert AI analysis combined with dermatologist insights</p>
          <div className="w-16 h-[3px] bg-[#C9A870] mx-auto mt-4" />
        </div>
        <div className="flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=280&h=280&fit=crop"
            alt="Consultation"
            className="w-[240px] h-[240px] object-cover rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
          />
        </div>
      </div>

      {/* ── Begin Your Journey CTA ── */}
      <div className="px-5 -mt-8 mb-10">
        <div className="bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] overflow-hidden">
          {/* Gold accent */}
          <div className="h-[3px] bg-gradient-to-r from-[#C9A870] to-[#8B7355]" />
          <div className="p-6">
            {/* Stats row */}
            <div className="flex items-center justify-around mb-6 pb-5 border-b border-[#F5F1EA]">
              {[
                { value: '98%',   label: 'Accuracy' },
                { value: '60s',   label: 'Results'  },
                { value: 'Free',  label: 'To Start'  },
              ].map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <span className="text-[22px] font-bold text-[#8B7355]">{stat.value}</span>
                  <span className="text-[11px] font-normal text-[#999999]">{stat.label}</span>
                </div>
              ))}
            </div>
            {/* Text */}
            <h3 className="text-[22px] font-semibold text-[#1A1A1A] mb-2">Begin Your Skin Journey</h3>
            <p className="text-[13px] font-normal text-[#666666] leading-relaxed mb-6">
              Your personalized skin journey starts here. Choose a free AI-powered analysis or connect with one of our certified skin experts for real-time guidance.
            </p>
            {/* CTAs */}
            <div className="space-y-3">
              <button
                onClick={() => navigate('/skin-analysis')}
                className="w-full h-[52px] bg-[#8B7355] text-white text-[15px] font-semibold rounded-[10px] hover:bg-[#7a6448] transition-colors flex items-center justify-center gap-2"
              >
                <IoSparklesOutline className="w-5 h-5" />
                Start Free Analysis
              </button>
              {/* Book Live Expert Session — temporarily hidden */}
            </div>
          </div>
        </div>
      </div>

      {/* ── Why Choose AI ── */}
      <div className="bg-white px-5 py-10">
        <h3 className="text-[26px] font-medium text-[#1A1A1A] text-center mb-7">Why Choose AI Consultation</h3>
        <div className="grid grid-cols-2 gap-4">
          {mobileFeatures.map((feature, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-[#E8E3D9] p-4">
              <span className="text-[15px] font-semibold text-[#8B7355] block mb-2">{feature.badge}</span>
              <h4 className="text-[15px] font-medium text-[#1A1A1A] mb-1 leading-tight">{feature.title}</h4>
              <p className="text-[12px] font-normal text-[#666666] leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── What We Analyze ── */}
      <div className="bg-[#FDFBF7] px-5 py-10">
        <h3 className="text-[26px] font-medium text-[#1A1A1A] text-center mb-7">What We Analyze</h3>
        <div className="flex overflow-x-auto gap-4 pb-4" style={{ scrollbarWidth: 'none' }}>
          {analysisCategories.map((cat, idx) => (
            <div key={idx} className="min-w-[200px] bg-white rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.06)] overflow-hidden flex-shrink-0">
              <img src={cat.image} alt={cat.title} className="w-full h-[100px] object-cover" />
              <div className="p-4">
                <h4 className="text-[14px] font-medium text-[#1A1A1A] mb-1">{cat.title}</h4>
                <p className="text-[12px] font-normal text-[#666666]">{cat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>



      {/* ── Sample Results ── */}
      <div className="bg-gradient-to-b from-[#F5F1EA] to-white px-5 py-10">
        <h3 className="text-[26px] font-medium text-[#1A1A1A] text-center mb-7">See What You'll Receive</h3>
        <div className="bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] p-6">
          <div className="text-center mb-7">
            <div className="text-[52px] font-bold text-[#8B7355] leading-none">87/100</div>
            <h4 className="text-[18px] font-medium text-[#1A1A1A] mt-1">Overall Skin Health Score</h4>
          </div>
          <div className="grid grid-cols-2 gap-5 mb-7">
            {metrics.map((metric, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="relative w-[72px] h-[72px] mb-2">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 80 80">
                    <circle cx="40" cy="40" r="34" fill="none" stroke="#E8E3D9" strokeWidth="6" />
                    <circle cx="40" cy="40" r="34" fill="none" stroke="#8B7355" strokeWidth="6"
                      strokeDasharray={`${2 * Math.PI * 34 * metric.value / 100} ${2 * Math.PI * 34}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[14px] font-semibold text-[#1A1A1A]">{metric.value}%</span>
                  </div>
                </div>
                <span className="text-[13px] font-medium text-[#666666]">{metric.label}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate('/skin-analysis')}
            className="w-full h-12 bg-[#8B7355] text-white text-[14px] font-medium rounded-lg">
            Analyze My Skin
          </button>
        </div>
      </div>

      {/* ── Pricing ── */}
      <div className="bg-white px-5 py-10">
        <h3 className="text-[26px] font-medium text-[#1A1A1A] text-center mb-7">Choose Your Plan</h3>
        <div className="space-y-5">
          {pricingPlans.map((plan, idx) => (
            <div key={idx} className={`bg-white rounded-2xl border-2 shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-6 ${idx === 1 ? 'border-[#8B7355]' : 'border-[#E8E3D9]'}`}>
              {plan.badge && (
                <div className="inline-block px-3 py-1 bg-[#F5F1EA] text-[#8B7355] text-[11px] font-medium rounded-full mb-3">{plan.badge}</div>
              )}
              <h4 className="text-[22px] font-semibold text-[#1A1A1A] mb-2">{plan.name}</h4>
              <div className="mb-4">
                <span className="text-[36px] font-bold text-[#1A1A1A]">{plan.price}</span>
                {plan.period && <span className="text-[14px] font-normal text-[#666666]">{plan.period}</span>}
              </div>
              <div className="space-y-2 mb-5">
                {plan.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-2">
                    <IoCheckmarkCircle className="w-4 h-4 text-[#8B7355] flex-shrink-0" />
                    <span className="text-[13px] font-normal text-[#3D3D3D]">{feature}</span>
                  </div>
                ))}
              </div>
              <button className={`w-full min-h-[48px] text-[14px] font-medium rounded-lg transition-all ${
                plan.buttonStyle === 'primary' ? 'bg-[#8B7355] text-white' : 'bg-white border-2 border-[#8B7355] text-[#8B7355]'
              }`}>
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>



      {/* ── FAQ ── */}
      <div className="bg-white px-5 py-10">
        <h3 className="text-[26px] font-medium text-[#1A1A1A] text-center mb-7">Questions Answered</h3>
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = expandedFaq.has(idx)
            return (
              <div key={idx} className="bg-white border border-[#E8E3D9] rounded-lg p-4">
                <button
                  onClick={() => setExpandedFaq(prev => {
                    const next = new Set(prev)
                    isOpen ? next.delete(idx) : next.add(idx)
                    return next
                  })}
                  className="flex items-center justify-between w-full text-left"
                >
                  <h5 className="text-[15px] font-medium text-[#1A1A1A] pr-4">{faq.question}</h5>
                  <IoChevronDown className={`w-5 h-5 text-[#8B7355] flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="mt-3 bg-[#F5F1EA] rounded-lg p-4">
                    <p className="text-[13px] font-normal text-[#666666] leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Final CTA ── */}
      <div className="bg-gradient-to-b from-[#F5F1EA] to-white px-5 py-12 flex flex-col items-center">
        <h3 className="text-[28px] font-medium text-[#1A1A1A] text-center mb-2">Ready to Transform Your Skin?</h3>
        <p className="text-[14px] font-normal text-[#666666] text-center mb-6">Join thousands who've discovered their routine</p>
        <div className="w-full space-y-3">
          <button
            onClick={() => navigate('/skin-analysis')}
            className="w-full min-h-[52px] bg-[#8B7355] text-white text-[15px] font-medium rounded-lg hover:bg-[#7a6448] transition-colors">
            Start Free Analysis
          </button>
          {/* Talk to Expert — temporarily hidden */}
        </div>
      </div>

    </div>

      {/* ── Upload Photo Popup ── */}
      {showUploadPopup && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999, backgroundColor: '#FDFBF7', overflowY: 'auto' }} className="font-['Cormorant_Garamond']">

          {/* Gold top accent bar */}
          <div className="h-[3px] bg-[#C9A870] w-full" />

          {/* Header */}
          <div className="px-5 pt-6 pb-4 relative flex flex-col items-center">
            <button
              onClick={() => setShowUploadPopup(false)}
              className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center"
            >
              <IoClose className="w-6 h-6 text-[#2B2B2B]" />
            </button>
            <h2 className="text-[24px] font-semibold text-[#1A1A1A] mb-1">Upload Your Photo</h2>
            <p className="text-[13px] font-light italic text-[#8B7355]">Get instant AI analysis in 60 seconds</p>
          </div>

          {/* Upload Options */}
          <div className="px-5 space-y-3 mb-4">
            {/* Take Photo Now */}
            <button className="w-full bg-white border border-[#E8E3D9] rounded-[12px] px-5 py-4 flex items-center gap-4 text-left shadow-sm">
              <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                <IoCameraOutline className="w-7 h-7 text-[#8B7355]" />
              </div>
              <div className="flex-1">
                <h3 className="text-[16px] font-medium text-[#1A1A1A]">Take Photo Now</h3>
                <p className="text-[12px] font-normal text-[#666666]">Use your camera for instant capture</p>
              </div>
              <IoChevronDown className="w-5 h-5 text-[#8B7355] -rotate-90 flex-shrink-0" />
            </button>

            {/* Choose from Gallery */}
            <button className="w-full bg-white border-2 border-dashed border-[#C9A870] rounded-[12px] px-5 py-4 flex items-center gap-4 text-left">
              <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                <IoImagesOutline className="w-7 h-7 text-[#8B7355]" />
              </div>
              <div className="flex-1">
                <h3 className="text-[16px] font-medium text-[#1A1A1A]">Choose from Gallery</h3>
                <p className="text-[12px] font-normal text-[#666666]">Select existing photo from device</p>
              </div>
              <IoChevronDown className="w-5 h-5 text-[#8B7355] -rotate-90 flex-shrink-0" />
            </button>
          </div>

          {/* Drag & Drop Zone */}
          <div className="px-5 mb-5">
            <div className="border-2 border-dashed border-[#E8E3D9] rounded-[12px] bg-white py-8 flex flex-col items-center">
              <IoCloudUploadOutline className="w-10 h-10 text-[#C9A870] mb-3" />
              <p className="text-[15px] font-medium text-[#666666] mb-1">Drag & drop your photo here</p>
              <p className="text-[13px] font-light italic text-[#8B7355]">or tap to browse</p>
            </div>
          </div>

          {/* Photo Guidelines */}
          <div className="mx-5 bg-[#F5F1EA] rounded-[12px] px-5 py-5 mb-5">
            <h4 className="text-[16px] font-medium text-[#1A1A1A] mb-4">Photo Guidelines</h4>
            <div className="space-y-3">
              {[
                { Icon: IoSunnyOutline,  text: 'Use natural lighting, avoid flash' },
                { Icon: IoCameraOutline, text: 'Face camera directly, neutral expression' },
                { Icon: IoHappyOutline,  text: 'Remove makeup for accurate analysis' },
                { Icon: IoResizeOutline, text: 'Keep 12-18 inches from camera' },
              ].map(({ Icon, text }, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Icon className="w-[18px] h-[18px] text-[#8B7355] flex-shrink-0" />
                  <p className="text-[14px] font-normal text-[#3D3D3D]">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Format Badges */}
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="flex items-center gap-2">
              {['JPG', 'PNG'].map((fmt) => (
                <div key={fmt} className="px-4 py-1.5 bg-[#E8E3D9] rounded-full">
                  <span className="text-[12px] font-semibold text-[#666666]">{fmt}</span>
                </div>
              ))}
            </div>
            <div className="w-px h-5 bg-[#E8E3D9]" />
            <span className="text-[13px] font-normal text-[#666666]">Max 10MB</span>
          </div>

          {/* Action Buttons */}
          <div className="px-5 pb-8 space-y-3">
            <button disabled className="w-full h-[52px] bg-[#8B7355] text-white text-[15px] font-medium rounded-[10px] opacity-60 cursor-not-allowed">
              Upload & Analyze
            </button>
            <button onClick={() => setShowUploadPopup(false)} className="w-full h-[52px] bg-white border border-[#E8E3D9] text-[#666666] text-[15px] font-medium rounded-[10px]">
              Cancel
            </button>
          </div>

        </div>
      )}

      {/* ── Book Live Session Popup ── */}
      {showBookingPopup && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999, backgroundColor: '#fff', overflowY: 'auto' }} className="font-['Cormorant_Garamond']">

          {/* Gold Header Bar */}
          <div className="min-h-[64px] bg-[#C9A870] px-5 flex items-center justify-between shadow-[0_2px_8px_rgba(0,0,0,0.12)]">
            <button onClick={() => setShowBookingPopup(false)} className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center">
              <IoChevronBack className="w-6 h-6 text-white" />
            </button>
            <h1 className="text-[18px] font-semibold text-white">Book Live Session</h1>
            <button className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center">
              <IoInformationCircleOutline className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Hero */}
          <div className="bg-gradient-to-b from-[#FDFBF7] to-[#F5F1EA] px-5 py-8 flex flex-col items-center">
            <p className="text-[11px] font-light italic text-[#8B7355] tracking-[1.5px] mb-2">PERSONALIZED LIVE CONSULTATION</p>
            <h2 className="text-[28px] font-bold text-[#1A1A1A] leading-tight mb-2 text-center">Choose Your Expert</h2>
            <p className="text-[14px] font-normal text-[#666666] text-center px-4">Connect with certified specialists for real-time guidance</p>
            <div className="w-16 h-[3px] bg-[#C9A870] mt-4" />
          </div>

          {/* Consultation Type Selector */}
          <div className="bg-white px-5 py-5">
            <h3 className="text-[17px] font-medium text-[#1A1A1A] mb-4">Select Consultation Type</h3>
            <div className="flex overflow-x-auto gap-3 pb-2" style={{ scrollbarWidth: 'none' }}>
              {[
                { title: 'Skin Analysis',    description: 'Deep skin assessment & recommendations', bg: '#F5F1EA' },
                { title: 'Makeup Tutorial',  description: 'Professional makeup techniques & tips',  bg: 'white', border: true },
                { title: 'Product Guidance', description: 'Personalized product selection',           bg: 'white', border: true },
              ].map((type, idx) => (
                <div key={idx} className="min-w-[240px] rounded-xl p-4 flex items-start gap-3 flex-shrink-0"
                  style={{ backgroundColor: type.bg, border: type.border ? '1px solid #E8E3D9' : 'none' }}>
                  <IoVideocamOutline className="w-7 h-7 flex-shrink-0 text-[#8B7355]" />
                  <div>
                    <h4 className="text-[15px] font-medium text-[#1A1A1A] mb-1">{type.title}</h4>
                    <p className="text-[12px] font-normal text-[#666666]">{type.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experts Grid */}
          <div className="bg-[#FDFBF7] px-5 py-6">
            <h3 className="text-[22px] font-medium text-[#1A1A1A] mb-5">Our Specialists</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: 'Dr. Elena Martinez', credentials: 'Board Certified Dermatologist', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=180&h=200&fit=crop', specialties: ['Anti-Aging', 'Acne', 'Sensitive Skin'], rating: 4.9, languages: 'EN, ES, FR', available: true },
                { name: 'Sarah Chen',          credentials: 'Master Makeup Artist',          image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=180&h=200&fit=crop', specialties: ['Bridal', 'Editorial', 'Color Theory'], rating: 4.8, languages: 'EN, ZH', available: true },
                { name: 'Dr. James Wilson',    credentials: 'Cosmetic Dermatologist',        image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=180&h=200&fit=crop', specialties: ['Pigmentation', 'Texture', 'Anti-Aging'], rating: 4.9, languages: 'EN, FR', available: false },
                { name: 'Olivia Kim',          credentials: 'Skincare Specialist',            image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=180&h=200&fit=crop', specialties: ['Hydration', 'Natural Glow', 'K-Beauty'], rating: 4.7, languages: 'EN, KO', available: true },
              ].map((expert, idx) => (
                <button key={idx} onClick={() => setSelectedExpert(idx)}
                  className={`bg-white rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.06)] overflow-hidden text-left transition-all ${selectedExpert === idx ? 'ring-2 ring-[#8B7355]' : ''}`}>
                  <div className="relative">
                    <img src={expert.image} alt={expert.name} className="w-full h-[140px] object-cover object-top" />
                    {expert.available && (
                      <div className="absolute top-2 right-2 bg-[#4CAF50] px-2 py-1 rounded-full">
                        <span className="text-[10px] font-semibold text-white">Available</span>
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h4 className="text-[14px] font-medium text-[#1A1A1A] mb-0.5">{expert.name}</h4>
                    <p className="text-[11px] text-[#8B7355] mb-2">{expert.credentials}</p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {expert.specialties.slice(0,2).map((s, si) => (
                        <span key={si} className="text-[10px] bg-[#F5F1EA] text-[#8B7355] px-2 py-0.5 rounded-full">{s}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => <span key={i} className="text-[#C9A870] text-[11px]">★</span>)}
                      <span className="text-[11px] text-[#666666] ml-1">({expert.rating})</span>
                    </div>
                    <p className="text-[10px] italic text-[#8B7355] mt-1">{expert.languages}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Calendar */}
          <div className="bg-white px-5 py-6">
            <h3 className="text-[20px] font-medium text-[#1A1A1A] mb-4">Choose Date</h3>
            <div className="flex items-center justify-between mb-4">
              <button className="p-2"><IoChevronBack className="w-5 h-5 text-[#8B7355]" /></button>
              <h4 className="text-[16px] font-medium text-[#1A1A1A]">December 2024</h4>
              <button className="p-2"><IoChevronForward className="w-5 h-5 text-[#8B7355]" /></button>
            </div>
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['S','M','T','W','T','F','S'].map((d, i) => (
                <div key={i} className="text-center text-[12px] font-medium text-[#8B7355] h-8 flex items-center justify-center">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {[null,null,null,null,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31].map((date, idx) => (
                <div key={idx} className="h-[44px] flex items-center justify-center">
                  {date ? (
                    <button
                      onClick={() => setSelectedDate(date)}
                      className={`w-full h-full rounded-lg text-[13px] font-medium transition-all ${
                        selectedDate === date ? 'bg-[#8B7355] text-white' :
                        date < 15 ? 'text-[#E8E3D9]' :
                        'bg-white border border-[#E8E3D9] text-[#1A1A1A]'
                      }`}
                    >{date}</button>
                  ) : <div />}
                </div>
              ))}
            </div>
          </div>

          {/* Time Slots */}
          <div className="bg-[#FAF8F5] px-5 py-5 border-t border-[#E8E3D9]">
            <h3 className="text-[18px] font-medium text-[#1A1A1A] mb-1">Available Times</h3>
            <p className="text-[13px] text-[#666666] mb-4">Monday, Dec {selectedDate}</p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { time: '9:00 AM',  available: true },
                { time: '10:30 AM', available: true },
                { time: '12:00 PM', available: false },
                { time: '2:00 PM',  available: true },
                { time: '3:30 PM',  available: true },
                { time: '5:00 PM',  available: false },
                { time: '9:00 AM',  available: true },
                { time: '10:30 AM', available: true },
                { time: '2:00 PM',  available: true },
              ].map((slot, idx) => (
                <button key={idx}
                  onClick={() => slot.available && setSelectedTime(idx)}
                  disabled={!slot.available}
                  className={`h-11 rounded-lg text-[13px] font-medium transition-all ${
                    !slot.available ? 'bg-[#F5F5F5] text-[#BBBBBB] line-through' :
                    selectedTime === idx ? 'bg-[#8B7355] text-white' :
                    'bg-white border border-[#E8E3D9] text-[#1A1A1A]'
                  }`}
                >{slot.time}</button>
              ))}
            </div>
          </div>

          {/* Session Duration */}
          <div className="bg-white px-5 py-5">
            <h3 className="text-[17px] font-medium text-[#1A1A1A] mb-4">Session Duration</h3>
            <div className="flex gap-3">
              {[{ d: '30 min', p: '$49' }, { d: '60 min', p: '$89' }, { d: '90 min', p: '$129' }].map((dur, idx) => (
                <button key={idx} onClick={() => setSelectedDuration(idx)}
                  className={`flex-1 h-11 rounded-full text-[13px] font-medium transition-all ${
                    selectedDuration === idx ? 'bg-[#8B7355] text-white shadow-[0_4px_12px_rgba(139,115,85,0.25)]' :
                    'bg-white border border-[#E8E3D9] text-[#333333]'
                  }`}
                >{dur.d} - {dur.p}</button>
              ))}
            </div>
          </div>

          {/* Booking Summary */}
          <div className="px-5 py-5">
            <div className="bg-white rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5">
              <h3 className="text-[18px] font-medium text-[#1A1A1A] mb-4">Your Booking</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=40&h=40&fit=crop" alt="Expert" className="w-10 h-10 rounded-full object-cover" />
                  <span className="text-[14px] font-normal text-[#333333]">Dr. Elena Martinez</span>
                </div>
                {[
                  { icon: IoCalendarOutline, text: `Monday, Dec ${selectedDate}, 2024` },
                  { icon: IoTimeOutline,     text: '2:00 PM – 3:00 PM' },
                  { icon: IoVideocamOutline, text: 'Video Consultation' },
                  { icon: IoCashOutline,     text: ['$49','$89','$129'][selectedDuration], gold: true },
                ].map(({ icon: Icon, text, gold }, i) => (
                  <div key={i}>
                    <div className="h-px bg-[#E8E3D9]" />
                    <div className="flex items-center gap-3 pt-3">
                      <Icon className="w-5 h-5 text-[#8B7355]" />
                      <span className={`text-[14px] font-normal ${gold ? 'font-semibold text-[#8B7355] text-[16px]' : 'text-[#333333]'}`}>{text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* User Details Form */}
          <div className="bg-[#FDFBF7] px-5 py-5">
            <h3 className="text-[18px] font-medium text-[#1A1A1A] mb-4">Your Details</h3>
            <div className="space-y-3">
              <input type="text"  placeholder="Full Name"   className="w-full h-[52px] px-4 bg-white border border-[#E8E3D9] rounded-lg text-[14px] outline-none" />
              <input type="email" placeholder="Email Address" className="w-full h-[52px] px-4 bg-white border border-[#E8E3D9] rounded-lg text-[14px] outline-none" />
              <input type="tel"   placeholder="Phone Number"  className="w-full h-[52px] px-4 bg-white border border-[#E8E3D9] rounded-lg text-[14px] outline-none" />
              <textarea placeholder="Special requests or concerns (optional)" className="w-full h-[100px] px-4 py-3 bg-white border border-[#E8E3D9] rounded-lg text-[14px] outline-none resize-none" />
            </div>
          </div>

          {/* Terms */}
          <div className="bg-white px-5 py-4 flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-[#8B7355] rounded flex items-center justify-center flex-shrink-0">
              <IoCheckmarkCircle className="w-4 h-4 text-[#8B7355]" />
            </div>
            <p className="text-[13px] text-[#666666]">I agree to <span className="text-[#8B7355] underline">terms & privacy policy</span></p>
          </div>

          {/* Bottom Action */}
          <div className="bg-white shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
            <div className="h-[3px] bg-[#C9A870]" />
            <div className="px-5 py-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[16px] text-[#666666]">Total:</span>
                <span className="text-[24px] font-bold text-[#1A1A1A]">{['$49','$89','$129'][selectedDuration]}</span>
              </div>
              <button className="w-full min-h-[56px] bg-gradient-to-r from-[#8B7355] to-[#A38968] rounded-xl mb-2">
                <span className="text-[17px] font-semibold text-white">Confirm Booking</span>
              </button>
              <p className="text-[12px] font-light italic text-[#8B7355] text-center mb-3">Instant confirmation via email</p>
              <button onClick={() => setShowBookingPopup(false)} className="w-full py-3">
                <span className="text-[14px] font-medium text-[#666666]">Change selection</span>
              </button>
            </div>
          </div>

          {/* Footer Nav */}
          <div className="bg-[#F5F5F5] h-14 flex items-center justify-center gap-4">
            <span className="text-[14px] font-medium text-[#8B7355]">View My Bookings</span>
            <span className="text-[#999999]">•</span>
            <span className="text-[14px] font-medium text-[#8B7355]">Reschedule/Cancel</span>
          </div>

        </div>
      )}

    </>
  )
}

// ─── Desktop + Tablet responsive ─────────────────────────────────────────────
function AISkinConsultantDesktop() {
  const consultationMethods = [
    { image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=360&h=240&fit=crop', badge: 'MOST POPULAR',   badgeColor: '#8B7355', title: 'AI Photo Analysis',        description: 'Instant comprehensive skin assessment using advanced computer vision and dermatological algorithms',  features: ['Medical-grade accuracy', 'Instant results in 60 seconds', 'Detailed skin mapping', 'Personalized recommendations'],       buttonText: 'Start Photo Analysis',  buttonStyle: 'primary'   },
    { image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=360&h=240&fit=crop',   badge: 'EXPERT GUIDANCE', badgeColor: '#688B8D', title: 'Live Expert Consultation', description: 'Real-time video consultation with certified skincare specialists and dermatologists',                  features: ['One-on-one expert guidance', '30–60 minute sessions', 'Personalized treatment plans', 'Follow-up support included'],    buttonText: 'Schedule Consultation', buttonStyle: 'secondary' },
    { image: 'https://images.unsplash.com/photo-1611349411198-e26e0d5f4a52?w=360&h=240&fit=crop', badge: 'COMPREHENSIVE',  badgeColor: '#C9A870', title: 'Detailed Questionnaire',  description: 'In-depth lifestyle and skin history assessment for comprehensive understanding',                      features: ['Thorough skin history', 'Lifestyle factor analysis', 'Environmental impact review', 'Goal-oriented approach'],           buttonText: 'Take Questionnaire',    buttonStyle: 'secondary' },
  ]
  const desktopFeatures = [
    { icon: IoSearchOutline,    title: 'Medical-Grade Accuracy', description: 'AI validated by dermatologists with 98% accuracy',   badge: '98%' },
    { icon: IoTimeOutline,      title: 'Instant Results',         description: 'Complete analysis in under 60 seconds',              badge: '60s' },
    { icon: IoAnalyticsOutline, title: 'Comprehensive Analysis',  description: 'Evaluate 12+ skin metrics simultaneously',           badge: '12+' },
    { icon: IoPersonOutline,    title: 'Expert Validation',       description: 'Results reviewed by certified specialists',          badge: '✓'   },
    { icon: IoTrendingUpOutline,title: 'Progress Tracking',       description: 'Monitor improvements with historical comparison',    badge: '📈'  },
    { icon: IoBulbOutline,      title: 'Personalized Plans',      description: 'Custom routines generated from your unique profile', badge: '🎯'  },
  ]
  const desktopAnalysis = [
    { image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=280&h=160&fit=crop', title: 'Skin Type Identification', description: 'Accurately determine your skin type including oily, dry, combination, and sensitive classifications' },
    { image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=280&h=160&fit=crop',   title: 'Hydration Levels',         description: 'Measure moisture content and water retention capacity to optimize hydration routines' },
    { image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=280&h=160&fit=crop', title: 'Texture & Pores',          description: 'Evaluate smoothness, pore size, and overall skin texture for refined appearance' },
    { image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=280&h=160&fit=crop', title: 'Pigmentation & Tone',      description: 'Assess even tone distribution and identify areas of hyperpigmentation or dark spots' },
    { image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=280&h=160&fit=crop', title: 'Fine Lines & Aging',       description: 'Detect early signs of aging including wrinkle depth and skin elasticity measurements' },
    { image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=280&h=160&fit=crop', title: 'Acne & Blemishes',         description: 'Identify problem areas, severity grading, and inflammation assessment' },
    { image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=280&h=160&fit=crop', title: 'Sensitivity Analysis',     description: 'Evaluate skin reactivity levels and potential triggers for inflammation' },
    { image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=280&h=160&fit=crop', title: 'Environmental Damage',     description: 'Assess UV exposure impact and free radical damage to skin cells' },
  ]
  const desktopProcess = [
    { number: '1', image: 'https://images.unsplash.com/photo-1611349411198-e26e0d5f4a52?w=120&h=120&fit=crop', title: 'Upload & Scan',  description: 'Take or upload a clear photo of your face in natural lighting' },
    { number: '2', image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=120&h=120&fit=crop', title: 'AI Processing', description: 'Advanced algorithms analyze thousands of data points instantly' },
    { number: '3', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=120&h=120&fit=crop',   title: 'Expert Review', description: 'Dermatologist validates and enhances AI findings' },
    { number: '4', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=120&h=120&fit=crop',   title: 'Receive Plan',  description: 'Get personalized routine with product recommendations' },
  ]
  const recommendedProducts = [
    { image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=240&h=240&fit=crop', brand: 'Shan Loray', name: 'Luminous Youth Serum',   benefit: 'Anti-aging & brightening', price: '$145', reviews: 892, reason: 'Targets fine lines detected' },
    { image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=240&h=240&fit=crop', brand: 'Shan Loray', name: 'Hydrating Essence',       benefit: 'Deep moisture boost',      price: '$98',  reviews: 634, reason: 'Matches your hydration needs' },
    { image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=240&h=240&fit=crop', brand: 'Shan Loray', name: 'Pore Refining Toner',     benefit: 'Minimizes pores',          price: '$72',  reviews: 521, reason: 'Addresses texture concerns' },
    { image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=240&h=240&fit=crop', brand: 'Shan Loray', name: 'Renewal Night Cream',     benefit: 'Overnight repair',         price: '$125', reviews: 748, reason: 'Supports skin regeneration' },
  ]
  const Stars = () => [...Array(5)].map((_, i) => <IoStarSharp key={i} className="w-[12px] h-[12px] text-[#C9A870]" />)
  const desktopTestimonials = [
    { beforeImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=200&h=280&fit=crop', afterImage: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=200&h=280&fit=crop', name: 'Sarah Mitchell',    age: 34, type: 'Premium Consultation',    quote: 'The AI analysis was incredibly accurate. My skin has never looked better!',                      timeline: 'After 8 weeks'  },
    { beforeImage: 'https://images.unsplash.com/photo-1611349411198-e26e0d5f4a52?w=200&h=280&fit=crop', afterImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=200&h=280&fit=crop', name: 'Emily Chen',        age: 29, type: 'AI Photo Analysis',       quote: 'Finally found products that actually work for my sensitive skin.',                               timeline: 'After 6 weeks'  },
    { beforeImage: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=200&h=280&fit=crop', afterImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=280&fit=crop',   name: 'Jessica Rodriguez', age: 42, type: 'Live Expert Consultation', quote: 'The video consultation with a dermatologist was worth every penny.',                              timeline: 'After 12 weeks' },
    { beforeImage: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=200&h=280&fit=crop', afterImage: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=200&h=280&fit=crop',   name: 'Amanda Foster',     age: 38, type: 'Platinum Plan',            quote: 'Monthly follow-ups keep me on track. My hyperpigmentation has improved dramatically.',           timeline: 'After 10 weeks' },
  ]

  return (
    <div className="bg-white font-['Cormorant_Garamond']">

      {/* Hero */}
      <div className="min-h-[340px] md:min-h-[420px] lg:min-h-[520px] bg-gradient-to-b from-[#FDFBF7] to-[#F5F1EA] relative overflow-hidden flex items-center px-4 md:px-[60px] lg:px-[120px] py-10 md:py-0">
        <div className="w-full md:w-[500px] lg:w-[650px] relative z-10">
          <p className="text-[11px] md:text-[13px] lg:text-[14px] font-light italic text-[#8B7355] tracking-[2px] mb-3">PERSONALIZED AI CONSULTATION</p>
          <h1 className="text-[36px] md:text-[52px] lg:text-[72px] font-bold text-[#1A1A1A] leading-[1.05] mb-4 lg:mb-6">Your Personal Skin Journey Begins Here</h1>
          <p className="text-[13px] md:text-[16px] lg:text-[20px] font-normal text-[#666666] mb-6 lg:mb-8">Expert AI-powered consultation combined with dermatologist insights for comprehensive skin analysis and personalized treatment plans</p>
          <div className="w-[100px] md:w-[120px] lg:w-[140px] h-[4px] bg-[#C9A870]" />
        </div>
        <div className="hidden lg:block absolute right-[140px] top-1/2 -translate-y-1/2">
          <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop" alt="AI Consultation" className="w-[400px] h-[400px] object-cover rounded-[12px] shadow-[0_12px_48px_rgba(0,0,0,0.12)]" />
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="min-h-[48px] bg-[#FDFBF7] px-4 md:px-[60px] lg:px-[120px] flex items-center overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        <span className="text-[13px] lg:text-[15px] text-[#8B7355] cursor-pointer whitespace-nowrap">Home</span>
        <span className="text-[13px] lg:text-[15px] text-[#666666] mx-2">/</span>
        <span className="hidden sm:inline text-[13px] lg:text-[15px] text-[#8B7355] cursor-pointer whitespace-nowrap">Technology</span>
        <span className="hidden sm:inline text-[13px] lg:text-[15px] text-[#666666] mx-2">/</span>
        <span className="text-[13px] lg:text-[15px] text-[#666666] whitespace-nowrap">AI Skin Consultation</span>
      </div>

      {/* Consultation Methods */}
      <div className="bg-white px-4 md:px-[60px] lg:px-[120px] py-10 md:py-12 lg:py-[64px]">
        <h2 className="text-[24px] md:text-[36px] lg:text-[48px] font-medium text-[#1A1A1A] text-center mb-4">Complete Skin Consultation Experience</h2>
        <p className="text-[13px] md:text-[15px] lg:text-[16px] text-[#666666] text-center mb-10 lg:mb-[56px]">Choose your preferred consultation method for personalized skincare guidance</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 lg:gap-[32px]">
          {consultationMethods.map((method, idx) => (
            <div key={idx} className="bg-white rounded-[16px] shadow-[0_8px_32px_rgba(0,0,0,0.08)] overflow-hidden hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] transition-all duration-300">
              <div className="relative">
                <img src={method.image} alt={method.title} className="w-full h-[180px] md:h-[200px] lg:h-[240px] object-cover" />
                <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 rounded-full" style={{ color: method.badgeColor }}>
                  <span className="text-[10px] lg:text-[11px] font-medium">{method.badge}</span>
                </div>
              </div>
              <div className="p-5 md:p-6 lg:p-[32px]">
                <h3 className="text-[18px] md:text-[20px] lg:text-[24px] font-medium text-[#1A1A1A] mb-3">{method.title}</h3>
                <p className="text-[13px] lg:text-[15px] text-[#666666] leading-[1.6] mb-5">{method.description}</p>
                <div className="flex flex-col gap-2 mb-5 lg:mb-6">
                  {method.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2">
                      <IoCheckmarkCircle className="w-[14px] h-[14px] lg:w-[16px] lg:h-[16px] text-[#8B7355] flex-shrink-0" />
                      <span className="text-[12px] lg:text-[14px] text-[#3D3D3D]">{feature}</span>
                    </div>
                  ))}
                </div>
                <button className={`w-full h-[44px] lg:h-[48px] text-[13px] lg:text-[15px] font-medium rounded-[8px] transition-all ${method.buttonStyle === 'primary' ? 'bg-[#8B7355] text-white hover:bg-[#7a6448]' : 'bg-white border-2 border-[#8B7355] text-[#8B7355] hover:bg-[#FDFBF7]'}`}>
                  {method.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Interface */}
      <div className="bg-gradient-to-b from-[#F5F1EA] to-white px-4 md:px-[60px] lg:px-[120px] py-10 md:py-12 lg:py-[64px]">
        <h2 className="text-[24px] md:text-[36px] lg:text-[48px] font-medium text-[#1A1A1A] text-center mb-10 lg:mb-[56px]">Begin Your AI Skin Analysis</h2>
        <div className="max-w-[800px] mx-auto">
          <div className="border-2 border-dashed border-[#C9A870] rounded-[12px] bg-white flex flex-col items-center justify-center p-8 md:p-10 lg:p-[48px] hover:border-[#8B7355] transition-colors">
            <IoCameraOutline className="w-[56px] h-[56px] md:w-[68px] md:h-[68px] lg:w-[80px] lg:h-[80px] text-[#8B7355] mb-6" />
            <h3 className="text-[16px] md:text-[20px] lg:text-[24px] font-medium text-[#1A1A1A] mb-4 text-center">Upload a clear front-facing photo in natural lighting</h3>
            <p className="text-[13px] lg:text-[15px] text-[#666666] text-center mb-8">Ensure good lighting and face directly forward for accurate analysis</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="w-full sm:w-[180px] lg:w-[200px] h-[48px] lg:h-[56px] bg-[#8B7355] text-white text-[14px] lg:text-[15px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">Upload Photo</button>
              <button className="w-full sm:w-[180px] lg:w-[200px] h-[48px] lg:h-[56px] bg-white border-2 border-[#8B7355] text-[#8B7355] text-[14px] lg:text-[15px] font-medium rounded-[8px] hover:bg-[#FDFBF7] transition-colors">Take Live Selfie</button>
            </div>
          </div>
          <div className="mt-6 lg:mt-8 grid grid-cols-3 gap-4 lg:gap-6">
            {[
              { icon: IoSunnyOutline,       title: 'Good Lighting', desc: 'Natural daylight preferred' },
              { icon: IoPersonCircleOutline, title: 'Face Forward',  desc: 'Look directly at camera'   },
              { icon: IoSparklesOutline,     title: 'Remove Makeup', desc: 'Clean, bare skin'           },
            ].map((tip, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <tip.icon className="w-[24px] h-[24px] lg:w-[32px] lg:h-[32px] text-[#8B7355] mb-2 lg:mb-3" />
                <h4 className="text-[13px] lg:text-[16px] font-medium text-[#1A1A1A] mb-1">{tip.title}</h4>
                <p className="text-[12px] lg:text-[14px] text-[#666666]">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose AI */}
      <div className="bg-white px-4 md:px-[60px] lg:px-[120px] py-10 md:py-12 lg:py-[64px]">
        <h2 className="text-[24px] md:text-[36px] lg:text-[48px] font-medium text-[#1A1A1A] text-center mb-10 lg:mb-[56px]">Why Choose AI Consultation</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-[32px]">
          {desktopFeatures.map((feature, idx) => (
            <div key={idx} className="bg-white rounded-[12px] border border-[#E8E3D9] shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-5 lg:p-[24px] hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-all duration-300">
              <div className="flex items-start justify-between mb-3 lg:mb-4">
                <feature.icon className="w-[26px] h-[26px] lg:w-[32px] lg:h-[32px] text-[#8B7355]" />
                <span className="text-[16px] lg:text-[20px] font-semibold text-[#8B7355]">{feature.badge}</span>
              </div>
              <h3 className="text-[15px] lg:text-[20px] font-medium text-[#1A1A1A] mb-2">{feature.title}</h3>
              <p className="text-[13px] lg:text-[15px] text-[#666666] leading-[1.6]">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* What We Analyze */}
      <div className="bg-[#FDFBF7] px-4 md:px-[60px] lg:px-[120px] py-10 md:py-12 lg:py-[64px]">
        <h2 className="text-[24px] md:text-[32px] lg:text-[40px] font-medium text-[#1A1A1A] text-center mb-10 lg:mb-[56px]">What We Analyze</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-[24px]">
          {desktopAnalysis.map((cat, idx) => (
            <div key={idx} className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.06)] overflow-hidden hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-all duration-300">
              <img src={cat.image} alt={cat.title} className="w-full h-[120px] md:h-[140px] lg:h-[160px] object-cover" />
              <div className="p-3 lg:p-[20px]">
                <h3 className="text-[13px] md:text-[15px] lg:text-[18px] font-medium text-[#1A1A1A] mb-1 lg:mb-2">{cat.title}</h3>
                <p className="text-[11px] md:text-[12px] lg:text-[14px] text-[#666666] leading-[1.5]">{cat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Process Steps */}
      <div className="bg-white px-4 md:px-[60px] lg:px-[120px] py-10 md:py-12 lg:py-[64px]">
        <h2 className="text-[24px] md:text-[36px] lg:text-[48px] font-medium text-[#1A1A1A] text-center mb-10 lg:mb-[56px]">Your Consultation Journey</h2>
        <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-8 lg:gap-[48px]">
          {desktopProcess.map((step, idx) => (
            <div key={idx} className="flex md:flex-col items-center md:items-center md:text-center gap-4 md:gap-0 md:w-[200px] lg:w-[240px]">
              <div className="flex justify-center mb-0 md:mb-4 flex-shrink-0">
                <img src={step.image} alt={step.title} className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] lg:w-[120px] lg:h-[120px] object-cover rounded-full border-4 border-[#E8E3D9]" />
              </div>
              <div className="flex justify-center mb-0 md:mb-3 flex-shrink-0">
                <div className="w-[36px] h-[36px] md:w-[40px] md:h-[40px] lg:w-[48px] lg:h-[48px] bg-[#8B7355] text-white text-[18px] md:text-[20px] lg:text-[24px] font-semibold rounded-full flex items-center justify-center">{step.number}</div>
              </div>
              <div>
                <h3 className="text-[15px] lg:text-[20px] font-medium text-[#1A1A1A] mb-1 lg:mb-2">{step.title}</h3>
                <p className="text-[12px] lg:text-[15px] text-[#666666] leading-[1.6]">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sample Results */}
      <div className="bg-gradient-to-b from-[#F5F1EA] to-white px-4 md:px-[60px] lg:px-[120px] py-10 md:py-12 lg:py-[64px]">
        <h2 className="text-[24px] md:text-[36px] lg:text-[48px] font-medium text-[#1A1A1A] text-center mb-10 lg:mb-[56px]">See What You'll Receive</h2>
        <div className="max-w-[900px] mx-auto bg-white rounded-[16px] shadow-[0_8px_32px_rgba(0,0,0,0.08)] p-6 md:p-8 lg:p-[48px]">
          <div className="text-center mb-8 lg:mb-10">
            <div className="text-[56px] md:text-[68px] lg:text-[80px] font-bold text-[#8B7355] leading-none mb-2">87/100</div>
            <h3 className="text-[18px] md:text-[20px] lg:text-[24px] font-medium text-[#1A1A1A] mb-2">Overall Skin Health Score</h3>
            <p className="text-[13px] lg:text-[16px] text-[#666666]">Excellent condition with minor improvement areas</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6 lg:gap-8 mb-8 lg:mb-10">
            {metrics.map((metric, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="relative w-[80px] h-[80px] md:w-[90px] md:h-[90px] lg:w-[100px] lg:h-[100px] mb-3">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#E8E3D9" strokeWidth="8" />
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#8B7355" strokeWidth="8"
                      strokeDasharray={`${2 * Math.PI * 45 * metric.value / 100} ${2 * Math.PI * 45}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[14px] md:text-[16px] lg:text-[18px] font-semibold text-[#1A1A1A]">{metric.value}%</span>
                  </div>
                </div>
                <span className="text-[12px] md:text-[13px] lg:text-[15px] font-medium text-[#666666]">{metric.label}</span>
              </div>
            ))}
          </div>
          <button className="w-full h-[48px] lg:h-[56px] bg-[#8B7355] text-white text-[14px] lg:text-[15px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">View Sample Full Report</button>
        </div>
      </div>

      {/* Product Recommendations */}
      <div className="bg-white px-4 md:px-[60px] lg:px-[120px] py-10 md:py-12 lg:py-[64px]">
        <h2 className="text-[22px] md:text-[32px] lg:text-[40px] font-medium text-[#1A1A1A] text-center mb-4">Personalized Product Matching</h2>
        <p className="text-[13px] md:text-[15px] lg:text-[16px] text-[#666666] text-center mb-10 lg:mb-[56px]">AI-powered recommendations based on your unique skin analysis</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-[24px]">
          {recommendedProducts.map((product, idx) => (
            <div key={idx} className="bg-white rounded-[12px] border border-[#E8E3D9] overflow-hidden hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-all duration-300">
              <img src={product.image} alt={product.name} className="w-full h-[160px] md:h-[200px] lg:h-[240px] object-cover" />
              <div className="p-3 md:p-4 lg:p-[20px]">
                <p className="text-[11px] lg:text-[13px] font-light italic text-[#8B7355] mb-1">{product.brand}</p>
                <h3 className="text-[13px] md:text-[15px] lg:text-[18px] font-medium text-[#1A1A1A] mb-1">{product.name}</h3>
                <p className="text-[12px] lg:text-[14px] text-[#666666] mb-2 lg:mb-3">{product.benefit}</p>
                <div className="flex items-center justify-between mb-2 lg:mb-3">
                  <span className="text-[15px] md:text-[17px] lg:text-[20px] font-semibold text-[#1A1A1A]">{product.price}</span>
                  <div className="flex items-center gap-0.5"><Stars /></div>
                </div>
                <div className="px-2 lg:px-3 py-1 bg-[#F5F1EA] rounded-[6px] mb-3">
                  <p className="text-[10px] lg:text-[12px] font-medium text-[#8B7355]">{product.reason}</p>
                </div>
                <button className="w-full h-[38px] lg:h-[44px] bg-[#8B7355] text-white text-[12px] lg:text-[14px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">Add to Routine</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing */}
      <div className="bg-white px-4 md:px-[60px] lg:px-[120px] py-10 md:py-12 lg:py-[64px]">
        <h2 className="text-[22px] md:text-[32px] lg:text-[40px] font-medium text-[#1A1A1A] text-center mb-10 lg:mb-[56px]">Choose Your Consultation Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-[32px]">
          {pricingPlans.map((plan, idx) => (
            <div key={idx} className={`bg-white rounded-[16px] border-2 shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-5 md:p-6 lg:p-[32px] hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-all ${idx === 1 ? 'border-[#8B7355]' : 'border-[#E8E3D9]'}`}>
              {plan.badge && <div className="px-4 py-1 bg-[#F5F1EA] text-[#8B7355] text-[10px] lg:text-[11px] font-medium rounded-full inline-block mb-4">{plan.badge}</div>}
              <h3 className="text-[20px] md:text-[22px] lg:text-[28px] font-semibold text-[#1A1A1A] mb-2">{plan.name}</h3>
              <div className="mb-5 lg:mb-6">
                <span className="text-[36px] md:text-[40px] lg:text-[48px] font-bold text-[#1A1A1A]">{plan.price}</span>
                {plan.period && <span className="text-[14px] lg:text-[16px] text-[#666666]">{plan.period}</span>}
              </div>
              <div className="flex flex-col gap-2 lg:gap-3 mb-6 lg:mb-8">
                {plan.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-3">
                    <IoCheckmarkCircle className="w-[16px] h-[16px] lg:w-[18px] lg:h-[18px] text-[#8B7355] flex-shrink-0" />
                    <span className="text-[13px] lg:text-[15px] text-[#3D3D3D]">{feature}</span>
                  </div>
                ))}
              </div>
              <button className={`w-full h-[48px] lg:h-[56px] text-[13px] lg:text-[15px] font-medium rounded-[8px] transition-all ${plan.buttonStyle === 'primary' ? 'bg-[#8B7355] text-white hover:bg-[#7a6448]' : 'bg-white border-2 border-[#8B7355] text-[#8B7355] hover:bg-[#FDFBF7]'}`}>
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy */}
      <div className="bg-gradient-to-b from-[#F5F1EA] to-white px-4 md:px-[60px] lg:px-[120px] py-10 md:py-12 lg:py-[64px]">
        <div className="flex flex-col items-center mb-8 lg:mb-10">
          <IoShieldCheckmarkOutline className="w-[36px] h-[36px] lg:w-[48px] lg:h-[48px] text-[#8B7355] mb-4" />
          <h2 className="text-[20px] md:text-[26px] lg:text-[32px] font-medium text-[#1A1A1A] text-center">Your Privacy is Our Priority</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-8 lg:gap-[48px]">
          {[
            { icon: IoLockClosedOutline,      title: 'Encrypted & Secure', desc: 'All data transmitted with military-grade encryption and stored securely' },
            { icon: IoCheckmarkCircle,        title: 'HIPAA Compliant',    desc: 'Meeting medical privacy standards for health information protection'    },
            { icon: IoShieldCheckmarkOutline, title: 'Never Shared',       desc: 'Your data is never sold or shared with third parties'                    },
          ].map((item, idx) => (
            <div key={idx} className="text-center">
              <item.icon className="w-[26px] h-[26px] lg:w-[32px] lg:h-[32px] text-[#8B7355] mx-auto mb-3 lg:mb-4" />
              <h3 className="text-[16px] md:text-[17px] lg:text-[20px] font-medium text-[#1A1A1A] mb-2 lg:mb-3">{item.title}</h3>
              <p className="text-[13px] lg:text-[15px] text-[#666666] leading-[1.6]">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-6 lg:mt-8">
          <span className="text-[13px] lg:text-[15px] font-medium text-[#8B7355] cursor-pointer hover:underline">View Privacy Policy</span>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-white px-4 md:px-[60px] lg:px-[120px] py-10 md:py-12 lg:py-[64px]">
        <h2 className="text-[22px] md:text-[32px] lg:text-[40px] font-medium text-[#1A1A1A] text-center mb-10 lg:mb-[56px]">Real Results from Real Consultations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-5 lg:gap-[24px]">
          {desktopTestimonials.map((t, idx) => (
            <div key={idx} className="bg-white rounded-[12px] border border-[#E8E3D9] shadow-[0_4px_16px_rgba(0,0,0,0.06)] overflow-hidden hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-all duration-300">
              <div className="flex">
                <img src={t.beforeImage} alt="Before" className="w-1/2 h-[160px] md:h-[180px] lg:h-[200px] object-cover" />
                <img src={t.afterImage}  alt="After"  className="w-1/2 h-[160px] md:h-[180px] lg:h-[200px] object-cover" />
              </div>
              <div className="p-4 lg:p-[20px]">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="text-[14px] lg:text-[16px] font-medium text-[#1A1A1A]">{t.name}</h4>
                    <p className="text-[12px] lg:text-[13px] text-[#666666]">Age {t.age}</p>
                  </div>
                  <div className="flex gap-0.5"><Stars /></div>
                </div>
                <div className="px-3 py-1 bg-[#F5F1EA] rounded-[6px] mb-3">
                  <p className="text-[11px] lg:text-[12px] font-medium text-[#8B7355]">{t.type}</p>
                </div>
                <p className="text-[12px] lg:text-[14px] font-light italic text-[#666666] leading-[1.5] mb-3">"{t.quote}"</p>
                <p className="text-[12px] lg:text-[13px] font-medium text-[#8B7355]">{t.timeline}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-[#FDFBF7] px-4 md:px-[60px] lg:px-[120px] py-10 md:py-12 lg:py-[64px]">
        <h2 className="text-[22px] md:text-[32px] lg:text-[40px] font-medium text-[#1A1A1A] text-center mb-10 lg:mb-[56px]">Consultation Questions Answered</h2>
        <div className="max-w-[900px] mx-auto flex flex-col gap-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white border border-[#E8E3D9] rounded-[12px] p-4 lg:p-[24px]">
              <div className="flex items-center justify-between cursor-pointer gap-4">
                <h3 className="text-[14px] md:text-[15px] lg:text-[17px] font-medium text-[#1A1A1A]">{faq.question}</h3>
                <IoChevronDown className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#8B7355] flex-shrink-0" />
              </div>
              {idx < 2 && (
                <div className="mt-4 bg-[#F5F1EA] rounded-[8px] p-4 lg:p-5">
                  <p className="text-[13px] lg:text-[15px] text-[#666666] leading-[1.7]">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-gradient-to-b from-[#F5F1EA] to-white px-4 md:px-[60px] lg:px-[120px] py-10 md:py-12 lg:py-0 lg:min-h-[180px] flex flex-col items-center justify-center">
        <h2 className="text-[20px] md:text-[28px] lg:text-[36px] font-medium text-[#1A1A1A] mb-3 text-center">Ready to Transform Your Skin?</h2>
        <p className="text-[13px] md:text-[15px] lg:text-[16px] text-[#666666] mb-5 lg:mb-6 text-center">Join thousands who've discovered their perfect skincare routine</p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button className="w-full sm:w-[200px] lg:w-[220px] h-[48px] lg:h-[56px] bg-[#8B7355] text-white text-[14px] lg:text-[15px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">Start Free Analysis</button>
          <button className="w-full sm:w-[200px] lg:w-[220px] h-[48px] lg:h-[56px] bg-white border-2 border-[#8B7355] text-[#8B7355] text-[14px] lg:text-[15px] font-medium rounded-[8px] hover:bg-[#FDFBF7] transition-colors">Talk to Expert</button>
        </div>
      </div>

    </div>
  )
}

// ─── Main Export (Switcher) ───────────────────────────────────────────────────
export default function AISkinConsultant() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return isMobile ? <AISkinConsultantMobile /> : <AISkinConsultantDesktop />
}