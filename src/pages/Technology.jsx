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
} from 'react-icons/io5'

export default function Technology() {
  const innovationCards = [
    {
      tag: 'AI TECHNOLOGY',
      title: 'Intelligent Skin Analysis',
      description: 'Advanced AI-powered skin assessment with personalized recommendations tailored to your unique skin profile and concerns',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=580&h=280&fit=crop',
      buttonText: 'Try Now',
    },
    {
      tag: 'AUGMENTED REALITY',
      title: 'Virtual Try-On Experience',
      description: 'Test products virtually before purchase with our cutting-edge AR technology for makeup and beauty products',
      image: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=580&h=280&fit=crop',
      buttonText: 'Launch AR',
    },
    {
      tag: 'PERSONALIZATION',
      title: 'Your Beauty Journey',
      description: 'Personalized product recommendations and customized beauty routines based on comprehensive skin analysis',
      image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=580&h=280&fit=crop',
      buttonText: 'Get Started',
    },
    {
      tag: 'INNOVATION',
      title: 'Advanced Formulations',
      description: 'Breakthrough ingredients and scientific research combining nature and technology for superior results',
      image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=580&h=280&fit=crop',
      buttonText: 'Learn More',
    },
  ]

  const howItWorksSteps = [
    { number: '1', title: 'Scan & Analyze', description: 'Capture your skin condition using our advanced scanning technology', image: 'https://images.unsplash.com/photo-1611349411198-e26e0d5f4a52?w=120&h=120&fit=crop' },
    { number: '2', title: 'AI Processing', description: 'Our AI analyzes thousands of data points to understand your unique needs', image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=120&h=120&fit=crop' },
    { number: '3', title: 'Get Results', description: 'Receive personalized product recommendations and beauty routines', image: 'https://images.unsplash.com/photo-1556740772-1a741367b93e?w=120&h=120&fit=crop' },
  ]

  const benefits = [
    { icon: IoSearchOutline, title: 'Precision Analysis', description: 'Advanced algorithms analyze skin with medical-grade accuracy' },
    { icon: IoTimeOutline, title: 'Time-Saving', description: 'Get instant results in under 60 seconds' },
    { icon: IoPersonOutline, title: 'Personalized Results', description: 'Tailored recommendations for your unique profile' },
    { icon: IoHeadsetOutline, title: 'Expert Guidance', description: 'AI-powered insights backed by dermatologists' },
    { icon: IoCheckmarkCircleOutline, title: 'Product Matching', description: 'Perfect product matches for your skin type' },
    { icon: IoRefreshOutline, title: 'Progress Tracking', description: 'Monitor your skin improvement over time' },
  ]

  const stats = [
    { icon: IoHardwareChipOutline, value: '98% Accuracy', label: 'AI-Powered Analysis' },
    { icon: IoTrendingUpOutline, value: '10M+ Scans', label: 'Trusted Worldwide' },
    { icon: IoFlaskOutline, value: 'Patent-Pending', label: 'Innovative Technology' },
  ]

  return (
    <div className="bg-white font-['Cormorant_Garamond']">

      {/* ── Hero Banner ── */}
      <div className="min-h-[520px] bg-gradient-to-b from-[#FDFBF7] to-[#F5F1EA] relative overflow-hidden flex items-center px-[120px]">
        <div className="w-[650px] relative z-10">
          <p className="text-[14px] font-light italic text-[#8B7355] tracking-[2px] mb-3">ADVANCED BEAUTY TECHNOLOGY</p>
          <h1 className="text-[80px] font-bold text-[#1A1A1A] leading-[1] mb-6">Innovation Meets Beauty</h1>
          <p className="text-[20px] font-normal text-[#666666] mb-8">Experience the future of personalized beauty with cutting-edge technology</p>
          <div className="w-[140px] h-[4px] bg-[#C9A870]" />
        </div>
        <div className="absolute right-[180px] top-1/2 -translate-y-1/2">
          <img
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=400&fit=crop"
            alt="Technology Innovation"
            className="w-[400px] h-[400px] object-cover rounded-[8px] shadow-[0_12px_48px_rgba(0,0,0,0.12)]"
          />
        </div>
      </div>

      {/* ── Breadcrumb ── */}
      <div className="min-h-[48px] bg-[#FDFBF7] px-[120px] flex items-center">
        <span className="text-[15px] font-normal text-[#8B7355] cursor-pointer">Home</span>
        <span className="text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[15px] font-normal text-[#666666]">Technology</span>
      </div>

      {/* ── Main Content ── */}
      <div className="px-[120px] py-[64px]">

        {/* Innovation Cards Grid */}
        <div className="grid grid-cols-2 gap-[32px] mb-[64px]">
          {innovationCards.map((card, idx) => (
            <div key={idx} className="bg-white rounded-[16px] shadow-[0_8px_32px_rgba(0,0,0,0.08)] overflow-hidden hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] transition-all duration-300">
              <div className="w-full h-[280px] overflow-hidden">
                <img src={card.image} alt={card.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-[32px]">
                <div className="px-[16px] py-[6px] bg-[#F5F1EA] text-[#8B7355] text-[11px] font-medium rounded-full inline-block mb-3">
                  {card.tag}
                </div>
                <h3 className="text-[28px] font-medium text-[#1A1A1A] mb-3">{card.title}</h3>
                <p className="text-[16px] font-normal text-[#666666] leading-[1.6] mb-4">{card.description}</p>
                <button className="h-[48px] px-[32px] bg-[#8B7355] text-white text-[15px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">
                  {card.buttonText}
                </button>
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
              <p className="text-[15px] font-normal text-[#666666]">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <div className="bg-white pt-[64px] mb-[64px]">
          <h2 className="text-[48px] font-medium text-[#1A1A1A] text-center mb-[56px]">How Our Technology Works</h2>
          <div className="flex justify-center gap-[48px]">
            {howItWorksSteps.map((step, idx) => (
              <div key={idx} className="w-[360px] bg-white rounded-[12px] border border-[#E8E3D9] shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-[24px]">
                <div className="flex justify-center mb-4">
                  <img src={step.image} alt={step.title} className="w-[120px] h-[120px] object-cover rounded-[8px]" />
                </div>
                <div className="flex justify-center mb-3">
                  <div className="w-[48px] h-[48px] bg-[#8B7355] text-white text-[24px] font-semibold rounded-full flex items-center justify-center">
                    {step.number}
                  </div>
                </div>
                <h4 className="text-[20px] font-medium text-[#1A1A1A] text-center mb-2">{step.title}</h4>
                <p className="text-[15px] font-normal text-[#666666] text-center leading-[1.6]">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-3 gap-[24px] mb-[64px]">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="bg-white rounded-[12px] border border-[#E8E3D9] shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-[24px] hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)] transition-all duration-300">
              <benefit.icon className="w-[32px] h-[32px] text-[#8B7355] mb-4" />
              <h4 className="text-[20px] font-medium text-[#1A1A1A] mb-2">{benefit.title}</h4>
              <p className="text-[15px] font-normal text-[#666666] leading-[1.6]">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Newsletter / CTA */}
        <div className="min-h-[140px] bg-[#F5F1EA] rounded-[16px] flex flex-col items-center justify-center px-[64px] mb-[64px]">
          <h3 className="text-[32px] font-medium text-[#1A1A1A] mb-2">Experience Innovation Today</h3>
          <p className="text-[16px] font-normal text-[#666666] mb-6">Join thousands using AI-powered beauty technology</p>
          <div className="flex items-center gap-[12px]">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-[360px] h-[56px] px-5 bg-white text-[15px] text-[#2B2B2B] rounded-[8px] border border-[#E8E3D9] outline-none"
            />
            <button className="h-[56px] px-[32px] bg-[#8B7355] text-white text-[15px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">
              Get Started
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}