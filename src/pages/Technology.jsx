import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  IoSearchOutline,
  IoFlaskOutline,
  IoTimeOutline,
  IoPersonOutline,
  IoHeadsetOutline,
  IoCheckmarkCircleOutline,
  IoRefreshOutline,
  IoTrendingUpOutline,
  IoHardwareChipOutline,
  IoChevronBack,
  IoInformationCircleOutline,
  IoArrowForward,
  IoBulbOutline,
  IoSparklesOutline,
  IoCheckmarkCircle,
  IoCameraOutline,
  IoPlayCircleOutline,
  IoHomeOutline,
  IoHeartOutline,
  IoDesktopOutline,
  IoStarSharp,
} from 'react-icons/io5'

// ─── Shared Data ──────────────────────────────────────────────────────────────
const coreFeatures = [
  { icon: IoHardwareChipOutline, title: 'AI Consultation',        description: 'Intelligent skin analysis powered by advanced AI',         gradient: 'from-[#E8E3F7] to-[#D5CAE8]' },
  { icon: IoCameraOutline,       title: 'AR Try-On',              description: 'Virtual mirror technology for instant previews',            gradient: 'from-[#FFE8F0] to-[#FFDDE8]' },
  { icon: IoFlaskOutline,        title: 'Formulation Science',    description: 'Breakthrough ingredients and delivery systems',             gradient: 'from-[#E3F2FD] to-[#CCEAF9]' },
  { icon: IoSearchOutline,       title: 'Skin Analysis',          description: 'Deep cellular-level skin assessment',                      gradient: 'from-[#E8F5E9] to-[#D4EDD6]' },
  { icon: IoSparklesOutline,     title: 'Smart Recommendations',  description: 'Personalized product matching algorithm',                  gradient: 'from-[#FFF3E0] to-[#FFE8CC]' },
  { icon: IoTrendingUpOutline,   title: 'Beauty Journey',         description: 'Custom skincare routine with progress tracking',           gradient: 'from-[#E0F7FA] to-[#CCF0F5]' },
]

const aiBenefits = [
  { icon: IoFlaskOutline,           title: 'Instant Analysis',        desc: 'Get comprehensive skin assessment in seconds' },
  { icon: IoSparklesOutline,        title: 'Personalized Results',    desc: 'Tailored recommendations for your unique skin' },
  { icon: IoCheckmarkCircleOutline, title: 'Expert Recommendations',  desc: 'Backed by dermatological research and data' },
]

const scientificInnovations = [
  { title: 'Bio-Active Ingredients',   desc: 'Natural compounds enhanced with biotechnology',      gradient: 'from-[#E8E3F7] to-[#D5CAE8]' },
  { title: 'Time-Release Technology',  desc: 'Sustained delivery for maximum effectiveness',       gradient: 'from-[#E3F2FD] to-[#CCEAF9]' },
  { title: 'Clinical Testing',         desc: 'Rigorously tested for safety and efficacy',          gradient: 'from-[#E8F5E9] to-[#D4EDD6]' },
]

const journeySteps = [
  { title: 'Skin Assessment',   desc: 'AI-powered comprehensive analysis' },
  { title: 'Product Match',     desc: 'Intelligent product recommendations' },
  { title: 'Routine Building',  desc: 'Custom daily skincare regimen' },
  { title: 'Progress Tracking', desc: 'Monitor improvements over time' },
]

const mobileBenefits = [
  { icon: IoTimeOutline,       title: 'Save Time',       desc: 'Instant recommendations' },
  { icon: IoTrendingUpOutline, title: 'Better Results',  desc: 'Optimized formulas' },
  { icon: IoBulbOutline,       title: 'Expert Guidance', desc: 'Professional insights' },
  { icon: IoSparklesOutline,   title: 'Personalized',    desc: 'Tailored solutions' },
]

const testimonials = [
  { photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop', quote: 'The AI consultation transformed my skincare routine. Results in just 2 weeks!', name: 'Sarah Chen',   tech: 'AI Consultation' },
  { photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop', quote: 'AR try-on helped me find my perfect shade. Shopping has never been easier.',    name: 'Emma Wilson', tech: 'AR Virtual Mirror' },
]

// Desktop data
const innovationCards = [
  { tag: 'AI TECHNOLOGY',   title: 'Intelligent Skin Analysis',    description: 'Advanced AI-powered skin assessment with personalized recommendations tailored to your unique skin profile and concerns',              image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=580&h=280&fit=crop', buttonText: 'Try Now',    path: '/skin-analysis' },
  { tag: 'AUGMENTED REALITY', title: 'Virtual Try-On Experience',  description: 'Test products virtually before purchase with our cutting-edge AR technology for makeup and beauty products',                            image: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=580&h=280&fit=crop', buttonText: 'Launch AR',  path: '/virtual-tryon' },
  { tag: 'PERSONALIZATION',   title: 'Your Beauty Journey',        description: 'Personalized product recommendations and customized beauty routines based on comprehensive skin analysis',                               image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=580&h=280&fit=crop', buttonText: 'Get Started', path: '/beauty-journey' },
  { tag: 'INNOVATION',        title: 'Advanced Formulations',      description: 'Breakthrough ingredients and scientific research combining nature and technology for superior results',                                   image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=580&h=280&fit=crop', buttonText: 'Learn More', path: '/advanced-formulations' },
]
const howItWorksSteps = [
  { number: '1', title: 'Scan & Analyze', description: 'Capture your skin condition using our advanced scanning technology',          image: 'https://images.unsplash.com/photo-1611349411198-e26e0d5f4a52?w=120&h=120&fit=crop' },
  { number: '2', title: 'AI Processing',  description: 'Our AI analyzes thousands of data points to understand your unique needs',    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=120&h=120&fit=crop' },
  { number: '3', title: 'Get Results',    description: 'Receive personalized product recommendations and beauty routines',            image: 'https://images.unsplash.com/photo-1556740772-1a741367b93e?w=120&h=120&fit=crop' },
]
const desktopBenefits = [
  { icon: IoSearchOutline,          title: 'Precision Analysis',    description: 'Advanced algorithms analyze skin with medical-grade accuracy' },
  { icon: IoTimeOutline,            title: 'Time-Saving',           description: 'Get instant results in under 60 seconds' },
  { icon: IoPersonOutline,          title: 'Personalized Results',  description: 'Tailored recommendations for your unique profile' },
  { icon: IoHeadsetOutline,         title: 'Expert Guidance',       description: 'AI-powered insights backed by dermatologists' },
  { icon: IoCheckmarkCircleOutline, title: 'Product Matching',      description: 'Perfect product matches for your skin type' },
  { icon: IoRefreshOutline,         title: 'Progress Tracking',     description: 'Monitor your skin improvement over time' },
]
const stats = [
  { icon: IoHardwareChipOutline, value: '98% Accuracy',  label: 'AI-Powered Analysis' },
  { icon: IoTrendingUpOutline,   value: '10M+ Scans',    label: 'Trusted Worldwide' },
  { icon: IoFlaskOutline,        value: 'Patent-Pending', label: 'Innovative Technology' },
]

// ─── Mobile ───────────────────────────────────────────────────────────────────
function TechnologyMobile() {
  return (
    <div className="w-full min-h-screen bg-white font-['Cormorant_Garamond'] flex flex-col">

      {/* Gold Header */}
      <div className="min-h-[64px] bg-gradient-to-r from-[#C9A870] to-[#B89660] px-5 flex items-center justify-between shadow-[0_2px_8px_rgba(0,0,0,0.08)] flex-shrink-0">
        <button className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center">
          <IoChevronBack className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-[18px] font-semibold text-white">Technology</h1>
        <button className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center">
          <IoInformationCircleOutline className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-b from-[#FDFBF7] to-[#F5F1EA] px-6 pt-8 pb-0 flex flex-col items-center">
        <p className="text-[11px] font-light italic text-[#8B7355] tracking-[1.5px] mb-2">INNOVATION IN BEAUTY</p>
        <h2 className="text-[36px] font-bold text-[#1A1A1A] leading-tight mb-2 text-center">The Future of Beauty</h2>
        <p className="text-[15px] font-normal text-[#666666] mb-4 text-center">Experience AI-Powered Personalization</p>
        <div className="w-16 h-[3px] bg-[#C9A870] mb-6" />
        <img
          src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=440&h=180&fit=crop"
          alt="Future technology"
          className="w-full h-[160px] object-cover"
        />
      </div>

      {/* Core Features Grid */}
      <div className="bg-white px-5 pt-6 pb-4">
        <h3 className="text-[22px] font-medium text-[#1A1A1A] mb-5">Smart Beauty Solutions</h3>
        <div className="grid grid-cols-2 gap-4">
          {coreFeatures.map((feature, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.06)] overflow-hidden">
              <div className={`h-36 bg-gradient-to-b ${feature.gradient} flex items-center justify-center`}>
                <feature.icon className="w-14 h-14 text-[#8B7355]" />
              </div>
              <div className="p-4">
                <h4 className="text-[15px] font-medium text-[#1A1A1A] mb-2">{feature.title}</h4>
                <p className="text-[12px] font-normal text-[#666666] mb-3 line-clamp-2">{feature.description}</p>
                <button className="flex items-center gap-1 text-[13px] font-medium text-[#8B7355]">
                  Explore <IoArrowForward className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Analysis Detail */}
      <div className="bg-[#FDFBF7] px-5 py-6">
        <h3 className="text-[20px] font-medium text-[#1A1A1A] mb-4">AI-Powered Analysis</h3>
        <img
          src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=200&fit=crop"
          alt="AI Analysis"
          className="w-full h-[180px] object-cover rounded-xl mb-4"
        />
        <div className="space-y-3">
          {aiBenefits.map((benefit, idx) => (
            <div key={idx} className="bg-white rounded-lg p-4 flex items-start gap-3">
              <benefit.icon className="w-6 h-6 text-[#8B7355] flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-[14px] font-medium text-[#1A1A1A] mb-1">{benefit.title}</h4>
                <p className="text-[12px] font-normal text-[#666666]">{benefit.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <Link to="/ai-consultation" onClick={() => window.scrollTo(0, 0)}>
          <button className="w-full min-h-[52px] bg-gradient-to-r from-[#8B7355] to-[#A38968] rounded-xl mt-4 shadow-[0_4px_12px_rgba(139,115,85,0.25)]">
            <span className="text-[15px] font-semibold text-white">Try AI Consultation</span>
          </button>
        </Link>
      </div>

      {/* AR Try-On Showcase */}
      <div className="bg-white px-5 py-6">
        <h3 className="text-[20px] font-medium text-[#1A1A1A] mb-4">Virtual Try-On Mirror</h3>
        <div className="relative mb-4">
          <img
            src="https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&h=200&fit=crop"
            alt="AR Try-On"
            className="w-full h-[180px] object-cover rounded-xl"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-[#C9A870] rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(201,168,112,0.4)]">
              <IoPlayCircleOutline className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
        <div className="flex gap-2 overflow-x-auto mb-4" style={{ scrollbarWidth: 'none' }}>
          {['Real-Time', 'Multiple Products', 'HD Quality'].map((f, i) => (
            <div key={i} className="bg-white border border-[#E8E3D9] text-[#8B7355] text-[12px] px-4 py-2 rounded-full flex-shrink-0">{f}</div>
          ))}
        </div>
        <Link to="/virtual-tryon" onClick={() => window.scrollTo(0, 0)}>
          <button className="w-full min-h-[52px] bg-white border-2 border-[#8B7355] rounded-xl">
            <span className="text-[15px] font-semibold text-[#8B7355]">Experience AR Mirror</span>
          </button>
        </Link>
      </div>

      {/* Breakthrough Formulations */}
      <div className="bg-gradient-to-b from-[#F5F1EA] to-[#E8E3D9] px-5 py-6">
        <h3 className="text-[20px] font-medium text-[#1A1A1A] mb-4">Breakthrough Formulations</h3>
        <div className="space-y-3">
          {scientificInnovations.map((item, idx) => (
            <div key={idx} className="bg-white rounded-lg p-4 flex items-center gap-4">
              <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${item.gradient} flex items-center justify-center flex-shrink-0`}>
                <IoFlaskOutline className="w-6 h-6 text-[#8B7355]" />
              </div>
              <div>
                <h4 className="text-[14px] font-medium text-[#1A1A1A] mb-1">{item.title}</h4>
                <p className="text-[12px] font-normal text-[#666666]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Journey */}
      <div className="bg-white px-5 py-6">
        <h3 className="text-[20px] font-medium text-[#1A1A1A] mb-5">Your Custom Journey</h3>
        <div className="relative">
          {journeySteps.map((step, idx) => (
            <div key={idx} className="flex gap-4 mb-5 last:mb-0">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-[#C9A870] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-[15px] font-semibold text-white">{idx + 1}</span>
                </div>
                {idx < journeySteps.length - 1 && <div className="w-0.5 h-10 bg-[#C9A870] opacity-30" />}
              </div>
              <div className="flex-1 pb-2">
                <h4 className="text-[15px] font-medium text-[#1A1A1A] mb-1">{step.title}</h4>
                <p className="text-[13px] font-normal text-[#666666]">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <Link to="/beauty-journey" onClick={() => window.scrollTo(0, 0)}>
          <button className="w-full min-h-[52px] bg-gradient-to-r from-[#8B7355] to-[#A38968] rounded-xl mt-4 shadow-[0_4px_12px_rgba(139,115,85,0.25)]">
            <span className="text-[15px] font-semibold text-white">Start Your Journey</span>
          </button>
        </Link>
      </div>

      {/* Smart Recommendations */}
      <div className="bg-[#FDFBF7] px-5 py-6">
        <h3 className="text-[20px] font-medium text-[#1A1A1A] mb-4">Intelligent Recommendations</h3>
        <div className="flex gap-3 overflow-x-auto mb-4" style={{ scrollbarWidth: 'none' }}>
          {[
            'https://images.unsplash.com/photo-1556228578-4d08bdfaf8ce?w=120&h=120&fit=crop',
            'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=120&h=120&fit=crop',
            'https://images.unsplash.com/photo-1620916297-7af36b7ad403?w=120&h=120&fit=crop',
          ].map((img, i) => (
            <div key={i} className="min-w-[130px] bg-white rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden flex-shrink-0">
              <img src={img} alt="Product" className="w-full h-[100px] object-cover" />
              <div className="p-3">
                <p className="text-[13px] font-normal text-[#1A1A1A] mb-2">Premium Serum</p>
                <div className="bg-[#C9A870] text-white text-[11px] font-medium px-2 py-1 rounded-full inline-block">Match: 94%</div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {['AI-Powered', 'Learns Your Preferences', 'Real Results'].map((badge, i) => (
            <div key={i} className="border border-[#E8E3D9] text-[#666666] text-[12px] px-3 py-2 rounded-full inline-flex items-center gap-1.5">
              <IoSparklesOutline className="w-3.5 h-3.5 text-[#8B7355]" />
              {badge}
            </div>
          ))}
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="bg-white px-5 py-6">
        <h3 className="text-[20px] font-medium text-[#1A1A1A] mb-5">Why Choose Smart Beauty</h3>
        <div className="grid grid-cols-2 gap-5">
          {mobileBenefits.map((benefit, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <benefit.icon className="w-8 h-8 text-[#8B7355] mb-3" />
              <h4 className="text-[14px] font-medium text-[#1A1A1A] mb-1">{benefit.title}</h4>
              <p className="text-[12px] font-normal text-[#666666]">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-[#FAF8F5] px-5 py-6">
        <h3 className="text-[20px] font-medium text-[#1A1A1A] mb-5">Real Results</h3>
        <div className="flex gap-4 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {testimonials.map((t, idx) => (
            <div key={idx} className="min-w-[300px] bg-white rounded-2xl p-5 shadow-[0_4px_16px_rgba(0,0,0,0.06)] flex-shrink-0">
              <img src={t.photo} alt={t.name} className="w-14 h-14 rounded-full object-cover mb-4" />
              <p className="text-[14px] font-normal italic text-[#333333] mb-4">"{t.quote}"</p>
              <p className="text-[13px] font-medium text-[#1A1A1A] mb-1">{t.name}</p>
              <div className="flex items-center gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => <IoStarSharp key={i} className="w-3.5 h-3.5 text-[#C9A870]" />)}
              </div>
              <div className="bg-[#F5F1EA] text-[#8B7355] text-[11px] font-normal px-3 py-1 rounded-full inline-block">{t.tech}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-gradient-to-b from-[#FDFBF7] to-[#F5F1EA] px-6 py-10 flex flex-col items-center">
        <h2 className="text-[26px] font-bold text-[#1A1A1A] mb-2 text-center">Experience the Future</h2>
        <p className="text-[14px] font-normal text-[#666666] mb-6 text-center">Join thousands discovering smart beauty</p>
        <button className="w-full min-h-[52px] bg-gradient-to-r from-[#8B7355] to-[#A38968] rounded-xl mb-3 shadow-[0_4px_12px_rgba(139,115,85,0.25)]">
          <span className="text-[16px] font-semibold text-white">Get Started</span>
        </button>
        <button className="text-[14px] font-medium text-[#8B7355] underline">Learn More About Technology</button>
      </div>

      {/* Bottom Nav */}
      <div className="min-h-[64px] bg-white border-t border-[#E8E3D9] flex items-center justify-around flex-shrink-0">
        <button className="flex flex-col items-center gap-1">
          <IoHomeOutline className="w-6 h-6 text-[#BDBDBD]" />
          <span className="text-[11px] text-[#BDBDBD]">Home</span>
        </button>
        <button className="flex flex-col items-center gap-1">
          <IoDesktopOutline className="w-6 h-6 text-[#8B7355]" />
          <span className="text-[11px] text-[#8B7355]">Tech</span>
        </button>
        <button className="flex flex-col items-center gap-1">
          <IoHeartOutline className="w-6 h-6 text-[#BDBDBD]" />
          <span className="text-[11px] text-[#BDBDBD]">Saved</span>
        </button>
        <button className="flex flex-col items-center gap-1">
          <IoPersonOutline className="w-6 h-6 text-[#BDBDBD]" />
          <span className="text-[11px] text-[#BDBDBD]">Profile</span>
        </button>
      </div>

    </div>
  )
}

// ─── Desktop (untouched) ──────────────────────────────────────────────────────
function TechnologyDesktop() {
  return (
    <div className="bg-white font-['Cormorant_Garamond']">

      {/* Hero */}
      <div className="min-h-[520px] bg-gradient-to-b from-[#FDFBF7] to-[#F5F1EA] relative overflow-hidden flex items-center px-[120px]">
        <div className="w-[650px] relative z-10">
          <p className="text-[14px] font-light italic text-[#8B7355] tracking-[2px] mb-3">ADVANCED BEAUTY TECHNOLOGY</p>
          <h1 className="text-[80px] font-bold text-[#1A1A1A] leading-[1] mb-6">Innovation Meets Beauty</h1>
          <p className="text-[20px] font-normal text-[#666666] mb-8">Experience the future of personalized beauty with cutting-edge technology</p>
          <div className="w-[140px] h-[4px] bg-[#C9A870]" />
        </div>
        <div className="absolute right-[180px] top-1/2 -translate-y-1/2">
          <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=400&fit=crop" alt="" className="w-[400px] h-[400px] object-cover rounded-[8px] shadow-[0_12px_48px_rgba(0,0,0,0.12)]" />
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="min-h-[48px] bg-[#FDFBF7] px-[120px] flex items-center">
        <span className="text-[15px] text-[#8B7355] cursor-pointer">Home</span>
        <span className="text-[15px] text-[#666666] mx-2">/</span>
        <span className="text-[15px] text-[#666666]">Technology</span>
      </div>

      {/* Main Content */}
      <div className="px-[120px] py-[64px]">

        {/* Innovation Cards */}
        <div className="grid grid-cols-2 gap-[32px] mb-[64px]">
          {innovationCards.map((card, idx) => (
            <div key={idx} className="bg-white rounded-[16px] shadow-[0_8px_32px_rgba(0,0,0,0.08)] overflow-hidden hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] transition-all duration-300">
              <div className="w-full h-[280px] overflow-hidden">
                <img src={card.image} alt={card.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-[32px]">
                <div className="px-[16px] py-[6px] bg-[#F5F1EA] text-[#8B7355] text-[11px] font-medium rounded-full inline-block mb-3">{card.tag}</div>
                <h3 className="text-[28px] font-medium text-[#1A1A1A] mb-3">{card.title}</h3>
                <p className="text-[16px] text-[#666666] leading-[1.6] mb-4">{card.description}</p>
                <Link to={card.path} onClick={() => window.scrollTo(0, 0)}>
                  <button className="h-[48px] px-[32px] bg-[#8B7355] text-white text-[15px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">{card.buttonText}</button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="min-h-[120px] bg-gradient-to-r from-[#F5F1EA] to-[#FDFBF7] rounded-[16px] flex items-center justify-center gap-[96px] mb-[64px]">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <stat.icon className="w-[48px] h-[48px] text-[#8B7355] mb-3" />
              <p className="text-[24px] font-medium text-[#1A1A1A] mb-1">{stat.value}</p>
              <p className="text-[15px] text-[#666666]">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <div className="bg-white pt-[64px] mb-[64px]">
          <h2 className="text-[48px] font-medium text-[#1A1A1A] text-center mb-[56px]">How Our Technology Works</h2>
          <div className="flex justify-center gap-[48px]">
            {howItWorksSteps.map((step, idx) => (
              <div key={idx} className="w-[360px] bg-white rounded-[12px] border border-[#E8E3D9] shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-[24px]">
                <div className="flex justify-center mb-4"><img src={step.image} alt={step.title} className="w-[120px] h-[120px] object-cover rounded-[8px]" /></div>
                <div className="flex justify-center mb-3">
                  <div className="w-[48px] h-[48px] bg-[#8B7355] text-white text-[24px] font-semibold rounded-full flex items-center justify-center">{step.number}</div>
                </div>
                <h4 className="text-[20px] font-medium text-[#1A1A1A] text-center mb-2">{step.title}</h4>
                <p className="text-[15px] text-[#666666] text-center leading-[1.6]">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-3 gap-[24px] mb-[64px]">
          {desktopBenefits.map((benefit, idx) => (
            <div key={idx} className="bg-white rounded-[12px] border border-[#E8E3D9] shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-[24px] hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)] transition-all duration-300">
              <benefit.icon className="w-[32px] h-[32px] text-[#8B7355] mb-4" />
              <h4 className="text-[20px] font-medium text-[#1A1A1A] mb-2">{benefit.title}</h4>
              <p className="text-[15px] text-[#666666] leading-[1.6]">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="min-h-[140px] bg-[#F5F1EA] rounded-[16px] flex flex-col items-center justify-center px-[64px] mb-[64px]">
          <h3 className="text-[32px] font-medium text-[#1A1A1A] mb-2">Experience Innovation Today</h3>
          <p className="text-[16px] text-[#666666] mb-6">Join thousands using AI-powered beauty technology</p>
          <div className="flex items-center gap-[12px]">
            <input type="email" placeholder="Enter your email" className="w-[360px] h-[56px] px-5 bg-white text-[15px] text-[#2B2B2B] rounded-[8px] border border-[#E8E3D9] outline-none" />
            <button className="h-[56px] px-[32px] bg-[#8B7355] text-white text-[15px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">Get Started</button>
          </div>
        </div>

      </div>
    </div>
  )
}

// ─── Main Export (Switcher) ───────────────────────────────────────────────────
export default function Technology() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return isMobile ? <TechnologyMobile /> : <TechnologyDesktop />
}