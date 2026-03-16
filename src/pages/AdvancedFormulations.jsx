import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
  IoCheckmarkCircle,
  IoFlaskOutline,
  IoLeafOutline,
  IoShieldCheckmarkOutline,
  IoRibbonOutline,
  IoMedkitOutline,
  IoWaterOutline,
  IoSparklesOutline,
  IoDownloadOutline,
  IoGlobeOutline,
  IoBeakerOutline,
  IoChevronForward,
  IoBarChartOutline,
  IoNewspaperOutline,
  IoGridOutline,
} from 'react-icons/io5'

export default function AdvancedFormulations() {

  const location = useLocation()
  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.replace('#', ''))
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
    }
  }, [location])

  const innovationPillars = [
    { icon: IoFlaskOutline, title: 'Patented Technology', stat: '45+ Patents', desc: 'Exclusive delivery systems and breakthrough formulations' },
    { icon: IoGridOutline, title: 'Clinical Research', stat: '20+ Years', desc: 'Evidence-based skincare backed by rigorous testing' },
    { icon: IoLeafOutline, title: 'Sustainable Science', stat: '98% Natural Origin', desc: 'Clean beauty without compromising efficacy' },
    { icon: IoShieldCheckmarkOutline, title: 'Purity Standards', stat: '100% Safe', desc: 'Dermatologist-tested and hypoallergenic formulas' },
  ]

  const signatureIngredients = [
    { name: 'Marine Collagen Complex', origin: 'Deep Sea Extract', image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=360&h=400&fit=crop', benefits: ['Boosts elasticity', 'Reduces wrinkles', 'Hydrates deeply'], concentration: '5%', efficacy: '87% visible improvement in 8 weeks' },
    { name: 'Bio-Retinol Complex', origin: 'Plant-Derived Alternative', image: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=360&h=400&fit=crop', benefits: ['Cell renewal', 'Smooths texture', 'Brightens skin'], concentration: '3%', efficacy: '92% reduction in fine lines after 12 weeks' },
    { name: 'Peptide Matrix Pro', origin: 'Advanced Biotechnology', image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=360&h=400&fit=crop', benefits: ['Firms skin', 'Repairs barrier', 'Anti-aging'], concentration: '4%', efficacy: '95% improvement in firmness' },
    { name: 'Botanical Stem Cells', origin: 'Swiss Alpine Roses', image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=360&h=400&fit=crop', benefits: ['Protects cells', 'Longevity boost', 'Antioxidant'], concentration: '2%', efficacy: '89% enhanced skin vitality' },
  ]

  const clinicalResults = [
    { metric: 'Hydration', improvement: '+67%', timeline: '4 weeks', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=280&h=220&fit=crop' },
    { metric: 'Fine Lines', improvement: '-52%', timeline: '8 weeks', image: 'https://images.unsplash.com/photo-1611349411198-e26e0d5f4a52?w=280&h=220&fit=crop' },
    { metric: 'Elasticity', improvement: '+73%', timeline: '12 weeks', image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=280&h=220&fit=crop' },
    { metric: 'Radiance', improvement: '+81%', timeline: '6 weeks', image: 'https://images.unsplash.com/photo-1556740772-1a741367b93e?w=280&h=220&fit=crop' },
  ]

  const certifications = [
    { name: 'Cruelty-Free', icon: IoRibbonOutline },
    { name: 'Dermatologist-Tested', icon: IoMedkitOutline },
    { name: 'Clinically Proven', icon: IoCheckmarkCircle },
    { name: 'Sustainable Sourcing', icon: IoLeafOutline },
    { name: 'Hypoallergenic', icon: IoShieldCheckmarkOutline },
    { name: 'Non-Toxic', icon: IoWaterOutline },
  ]

  const publications = [
    { title: 'Advanced Peptide Delivery Systems in Anti-Aging', journal: 'Journal of Cosmetic Science', date: 'November 2024', findings: 'Novel encapsulation technology increases bioavailability by 340%' },
    { title: 'Marine-Derived Actives: Efficacy in Skin Barrier Repair', journal: 'International Journal of Dermatology', date: 'September 2024', findings: 'Deep-sea extracts demonstrate superior moisturization properties' },
    { title: 'Botanical Stem Cell Technology in Cosmetic Applications', journal: 'Skin Research & Technology', date: 'July 2024', findings: 'Plant stem cells show significant anti-aging benefits' },
  ]

  const experts = [
    { name: 'Dr. Elena Martinez', title: 'Chief Scientific Officer', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop', quote: "Our formulations represent the pinnacle of skincare science, combining nature's wisdom with cutting-edge biotechnology." },
    { name: 'Dr. James Chen', title: 'Lead Formulation Chemist', image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop', quote: 'Every ingredient is selected for its proven efficacy and synergistic potential within our advanced delivery systems.' },
    { name: 'Dr. Sophie Dubois', title: 'Clinical Research Director', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop', quote: 'Our rigorous clinical trials ensure that every product delivers measurable, visible results for our clients.' },
  ]

  const heroProducts = [
    { name: 'Age-Defying Serum', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&h=360&fit=crop', keyActives: 'Peptide Matrix 4%, Bio-Retinol 3%', technology: 'Micro-Encapsulation System' },
    { name: 'Collagen Renewal Cream', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=360&fit=crop', keyActives: 'Marine Collagen 5%, Hyaluronic Acid 2%', technology: 'Triple-Layer Delivery' },
    { name: 'Radiance Brightening Essence', image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=300&h=360&fit=crop', keyActives: 'Vitamin C 15%, Niacinamide 5%', technology: 'Liposomal Encapsulation' },
  ]

  const timelineMilestones = [
    { year: '2004', event: 'Founded Research Lab', desc: 'Established state-of-the-art facility' },
    { year: '2008', event: 'First Patent', desc: 'Revolutionary peptide delivery system' },
    { year: '2012', event: 'Marine Complex', desc: 'Breakthrough in marine-derived actives' },
    { year: '2016', event: 'Bio-Retinol Discovery', desc: 'Plant-based retinol alternative' },
    { year: '2020', event: 'Sustainability Certification', desc: 'Achieved carbon-neutral production' },
    { year: '2024', event: 'AI-Powered Formulation', desc: 'Machine learning in development' },
  ]

  const faqItems = [
    { question: 'What makes Shan Loray formulations unique?', answer: 'Our formulations combine patented delivery systems with clinically-proven active ingredients at optimal concentrations. Every product undergoes rigorous testing and is backed by scientific research.' },
    { question: 'Are your products suitable for sensitive skin?', answer: 'Yes, all our products are dermatologist-tested and hypoallergenic. We use clean, non-irritating ingredients and avoid common sensitizers like synthetic fragrances and harsh alcohols.' },
    { question: 'How do you ensure ingredient purity and quality?', answer: 'We source ingredients from certified suppliers and conduct thorough testing including stability, safety, and efficacy assessments. Every batch is tested for purity and potency before release.' },
    { question: 'What is your approach to sustainable formulation?', answer: 'We prioritize natural-origin ingredients, sustainable sourcing practices, and eco-friendly production methods. Our formulations are 98% natural origin while maintaining clinical efficacy.' },
  ]

  const relatedPages = [
    { title: 'Virtual Try-On', desc: 'Experience products with AR technology', image: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=380&h=280&fit=crop' },
    { title: 'Skin Analysis', desc: 'AI-powered skin assessment tool', image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=380&h=280&fit=crop' },
    { title: 'Beauty Journey', desc: 'Track your personalized skincare progress', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=380&h=280&fit=crop' },
  ]

  const sourcingItems = [
    { region: 'Swiss Alps', ingredient: 'Alpine Rose Stem Cells', icon: IoLeafOutline },
    { region: 'Deep Ocean', ingredient: 'Marine Collagen Complex', icon: IoWaterOutline },
    { region: 'French Vineyards', ingredient: 'Resveratrol Extract', icon: IoSparklesOutline },
    { region: 'Asian Botanicals', ingredient: 'Ginseng & Green Tea', icon: IoFlaskOutline },
  ]

  const testingProtocols = [
    { title: 'Stability Testing', desc: 'Long-term product integrity assessment', icon: IoFlaskOutline },
    { title: 'Dermatological Testing', desc: 'Clinical evaluation on diverse skin types', icon: IoMedkitOutline },
    { title: 'Patch Testing', desc: 'Allergy and sensitivity screening', icon: IoShieldCheckmarkOutline },
    { title: 'Efficacy Trials', desc: 'Measurable results documentation', icon: IoBarChartOutline },
  ]

  return (
    <div className="bg-white font-['Cormorant_Garamond']">

      {/* ── Hero ── */}
      <div className="min-h-[560px] bg-gradient-to-b from-[#FDFBF7] to-[#F5F1EA] relative overflow-hidden flex items-center px-[120px]">
        <div className="w-[680px] relative z-10">
          <p className="text-[14px] font-light italic text-[#8B7355] tracking-[2px] mb-3">SCIENCE-DRIVEN SKINCARE INNOVATION</p>
          <h1 className="text-[72px] font-bold text-[#1A1A1A] leading-[1.05] mb-5">Advanced Formulations</h1>
          <p className="text-[20px] font-normal text-[#666666] leading-[1.6] mb-8">Where Science Meets Luxury Beauty. Discover cutting-edge ingredient technology, clinical research breakthroughs, and formulation excellence that defines the future of skincare.</p>
          <div className="w-[160px] h-[4px] bg-[#C9A870]" />
        </div>
        <div className="absolute right-[140px] top-1/2 -translate-y-1/2">
          <img src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=440&h=440&fit=crop" alt="Laboratory Science" className="w-[440px] h-[440px] object-cover rounded-[12px] shadow-[0_16px_64px_rgba(0,0,0,0.15)]" />
        </div>
      </div>

      {/* ── Breadcrumb ── */}
      <div className="min-h-[48px] bg-[#FDFBF7] px-[120px] flex items-center">
        <span className="text-[15px] font-normal text-[#8B7355] cursor-pointer">Home</span>
        <span className="text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[15px] font-normal text-[#8B7355] cursor-pointer">Technology</span>
        <span className="text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[15px] font-normal text-[#666666]">Advanced Formulations</span>
      </div>

      {/* ── Innovation Pillars ── */}
      <div id='our-story' className="min-h-[320px] px-[120px] py-[80px] bg-white">
        <h2 className="text-[48px] font-medium text-[#1A1A1A] text-center mb-[56px]">Our Innovation Pillars</h2>
        <div className="grid grid-cols-4 gap-[24px]">
          {innovationPillars.map((pillar) => (
            <div key={pillar.title} className="bg-white rounded-[12px] border border-[#E8E3D9] shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-[32px] flex flex-col items-center hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)] transition-all duration-300">
              <pillar.icon className="w-[48px] h-[48px] text-[#8B7355] mb-5" />
              <div className="text-[32px] font-bold text-[#C9A870] mb-2">{pillar.stat}</div>
              <h3 className="text-[18px] font-semibold text-[#1A1A1A] mb-3 text-center">{pillar.title}</h3>
              <p className="text-[15px] font-normal text-[#666666] text-center leading-[1.5]">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Signature Ingredients ── */}
      <div className="min-h-[720px] px-[120px] py-[80px] bg-[#FDFBF7]">
        <h2 className="text-[48px] font-medium text-[#1A1A1A] text-center mb-3">Signature Active Ingredients</h2>
        <p className="text-[16px] font-normal text-[#666666] text-center mb-[56px]">Clinically-proven actives at optimal concentrations</p>
        <div className="grid grid-cols-4 gap-[24px]">
          {signatureIngredients.map((ingredient) => (
            <div key={ingredient.name} className="bg-white rounded-[12px] shadow-[0_8px_32px_rgba(0,0,0,0.08)] overflow-hidden hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] transition-all duration-300">
              <img src={ingredient.image} alt={ingredient.name} className="w-full h-[320px] object-cover" />
              <div className="p-[24px]">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-3 py-1 bg-[#8B7355] text-white text-[11px] font-medium rounded-full">{ingredient.concentration}</span>
                  <IoSparklesOutline className="w-[18px] h-[18px] text-[#C9A870]" />
                </div>
                <h3 className="text-[18px] font-semibold text-[#1A1A1A] mb-2">{ingredient.name}</h3>
                <p className="text-[13px] font-light italic text-[#8B7355] mb-3">{ingredient.origin}</p>
                <div className="space-y-2 mb-4">
                  {ingredient.benefits.map((benefit) => (
                    <div key={benefit} className="flex items-start gap-2">
                      <IoCheckmarkCircle className="w-[14px] h-[14px] text-[#8B7355] flex-shrink-0 mt-0.5" />
                      <span className="text-[14px] font-normal text-[#666666]">{benefit}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-3 border-t border-[#E8E3D9]">
                  <p className="text-[12px] font-medium text-[#8B7355]">{ingredient.efficacy}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Delivery System ── */}
      <div className="min-h-[480px] px-[120px] py-[80px] bg-white">
        <div className="flex gap-[64px] items-center">
          <div className="w-[580px]">
            <img src="https://images.unsplash.com/photo-1576086213369-97a306d36557?w=580&h=420&fit=crop" alt="Formulation Technology" className="w-full h-[420px] object-cover rounded-[12px] shadow-[0_8px_32px_rgba(0,0,0,0.1)]" />
          </div>
          <div className="flex-1">
            <h2 className="text-[40px] font-medium text-[#1A1A1A] mb-4">Multi-Layer Delivery System</h2>
            <p className="text-[16px] font-normal text-[#666666] leading-[1.7] mb-6">
              Our patented encapsulation technology ensures active ingredients penetrate deep into the skin layers while maintaining stability and potency. This advanced delivery system releases actives gradually for sustained efficacy.
            </p>
            <div className="space-y-4 mb-6">
              {[
                { layer: 'Surface Layer', desc: 'Immediate hydration and protection' },
                { layer: 'Mid Layer', desc: 'Active ingredient delivery and absorption' },
                { layer: 'Deep Layer', desc: 'Long-term cellular repair and renewal' },
              ].map((layer) => (
                <div key={layer.layer} className="flex items-start gap-3 bg-[#F5F1EA] rounded-[8px] p-[16px]">
                  <IoBeakerOutline className="w-[20px] h-[20px] text-[#8B7355] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-[16px] font-medium text-[#1A1A1A] mb-1">{layer.layer}</h4>
                    <p className="text-[14px] font-normal text-[#666666]">{layer.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Clinical Results ── */}
      <div className="min-h-[520px] px-[120px] py-[80px] bg-[#FDFBF7]">
        <h2 className="text-[48px] font-medium text-[#1A1A1A] text-center mb-3">Clinical Results</h2>
        <p className="text-[16px] font-normal text-[#666666] text-center mb-[56px]">Proven efficacy through rigorous clinical testing</p>
        <div className="grid grid-cols-4 gap-[24px]">
          {clinicalResults.map((result) => (
            <div key={result.metric} className="bg-white rounded-[12px] border border-[#E8E3D9] shadow-[0_4px_16px_rgba(0,0,0,0.06)] overflow-hidden">
              <img src={result.image} alt={result.metric} className="w-full h-[220px] object-cover" />
              <div className="p-[24px]">
                <h3 className="text-[18px] font-medium text-[#1A1A1A] mb-3">{result.metric}</h3>
                <div className="text-[36px] font-bold text-[#8B7355] mb-2">{result.improvement}</div>
                <p className="text-[14px] font-normal text-[#666666]">Measured after {result.timeline}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Stats Banner ── */}
      <div className="min-h-[360px] relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1440&h=360&fit=crop" alt="Research Laboratory" className="w-full h-[360px] object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        <div className="absolute inset-0 flex items-center px-[120px]">
          <div className="grid grid-cols-4 gap-[48px] w-full">
            {[{ stat: '20+', label: 'Years of Research' }, { stat: '45+', label: 'Patents Awarded' }, { stat: '150+', label: 'Scientific Publications' }, { stat: '30+', label: 'Research Partnerships' }].map((item) => (
              <div key={item.label} className="text-center">
                <div className="text-[56px] font-bold text-white mb-2">{item.stat}</div>
                <div className="text-[16px] font-normal text-white/90">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Certifications ── */}
      <div className="min-h-[280px] px-[120px] py-[80px] bg-white">
        <h2 className="text-[40px] font-medium text-[#1A1A1A] text-center mb-[56px]">Quality Certifications</h2>
        <div className="grid grid-cols-6 gap-[32px]">
          {certifications.map((cert) => (
            <div key={cert.name} className="flex flex-col items-center">
              <div className="w-[100px] h-[100px] bg-[#F5F1EA] rounded-full flex items-center justify-center mb-4">
                <cert.icon className="w-[48px] h-[48px] text-[#8B7355]" />
              </div>
              <p className="text-[14px] font-medium text-[#1A1A1A] text-center">{cert.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Global Sourcing ── */}
      <div className="min-h-[520px] px-[120px] py-[80px] bg-[#FDFBF7]">
        <h2 className="text-[48px] font-medium text-[#1A1A1A] mb-[56px]">Global Ingredient Sourcing</h2>
        <div className="flex gap-[48px]">
          <div className="w-[600px]">
            <img src="https://images.unsplash.com/photo-1589519160732-57fc498494f8?w=600&h=400&fit=crop" alt="Global Sourcing" className="w-full h-[400px] object-cover rounded-[12px] shadow-[0_8px_32px_rgba(0,0,0,0.1)] mb-4" />
            <div className="flex items-center gap-3">
              <IoGlobeOutline className="w-[24px] h-[24px] text-[#8B7355]" />
              <span className="text-[15px] font-medium text-[#666666]">Sustainably sourced from 25+ countries</span>
            </div>
          </div>
          <div className="flex-1">
            <p className="text-[18px] font-normal text-[#666666] leading-[1.7] mb-6">
              We partner with ethical suppliers worldwide to source the finest natural ingredients. From Swiss Alpine botanicals to deep-sea marine extracts, every ingredient is carefully selected for purity, potency, and sustainability.
            </p>
            <div className="space-y-4">
              {sourcingItems.map((source) => (
                <div key={source.region} className="flex items-center gap-4 bg-white rounded-[8px] border border-[#E8E3D9] p-[20px]">
                  <source.icon className="w-[24px] h-[24px] text-[#8B7355] flex-shrink-0" />
                  <div>
                    <h4 className="text-[16px] font-medium text-[#1A1A1A]">{source.region}</h4>
                    <p className="text-[14px] font-normal text-[#666666]">{source.ingredient}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Publications ── */}
      <div className="min-h-[480px] px-[120px] py-[80px] bg-white">
        <h2 className="text-[40px] font-medium text-[#1A1A1A] mb-3">Scientific Publications</h2>
        <p className="text-[16px] font-normal text-[#666666] mb-[48px]">Our research contributions to dermatological science</p>
        <div className="space-y-4">
          {publications.map((pub) => (
            <div key={pub.title} className="bg-[#FDFBF7] rounded-[12px] border border-[#E8E3D9] p-[28px]">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-[20px] font-medium text-[#1A1A1A] mb-2">{pub.title}</h3>
                  <p className="text-[14px] font-light italic text-[#8B7355] mb-3">{pub.journal} • {pub.date}</p>
                  <p className="text-[15px] font-normal text-[#666666]">{pub.findings}</p>
                </div>
                <button className="flex items-center gap-2 px-5 h-[44px] bg-[#8B7355] text-white text-[14px] font-medium rounded-[8px] ml-6 hover:bg-[#7a6448] transition-colors flex-shrink-0">
                  <IoDownloadOutline className="w-[18px] h-[18px]" />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Expert Team ── */}
      <div className="min-h-[520px] px-[120px] py-[80px] bg-[#F5F1EA]">
        <h2 className="text-[48px] font-medium text-[#1A1A1A] text-center mb-[56px]">Meet Our Scientific Team</h2>
        <div className="grid grid-cols-3 gap-[32px]">
          {experts.map((expert) => (
            <div key={expert.name} className="bg-white rounded-[12px] shadow-[0_8px_32px_rgba(0,0,0,0.08)] p-[32px]">
              <div className="flex justify-center mb-5">
                <img src={expert.image} alt={expert.name} className="w-[160px] h-[160px] object-cover rounded-full border-4 border-[#C9A870]" />
              </div>
              <h3 className="text-[20px] font-semibold text-[#1A1A1A] text-center mb-1">{expert.name}</h3>
              <p className="text-[14px] font-normal text-[#8B7355] text-center mb-5">{expert.title}</p>
              <div className="flex gap-2">
                <IoNewspaperOutline className="w-[20px] h-[20px] text-[#C9A870] flex-shrink-0 mt-1" />
                <p className="text-[15px] font-normal italic text-[#666666] leading-[1.6]">"{expert.quote}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Hero Products ── */}
      <div className="min-h-[640px] px-[120px] py-[80px] bg-white">
        <h2 className="text-[48px] font-medium text-[#1A1A1A] text-center mb-[56px]">Hero Product Technologies</h2>
        <div className="grid grid-cols-3 gap-[32px]">
          {heroProducts.map((product) => (
            <div key={product.name} className="bg-white rounded-[12px] border border-[#E8E3D9] shadow-[0_8px_32px_rgba(0,0,0,0.08)] overflow-hidden hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] transition-all duration-300">
              <img src={product.image} alt={product.name} className="w-full h-[360px] object-cover" />
              <div className="p-[28px]">
                <h3 className="text-[20px] font-semibold text-[#1A1A1A] mb-3">{product.name}</h3>
                <div className="mb-4">
                  <p className="text-[13px] font-medium text-[#666666] mb-1">Key Actives</p>
                  <p className="text-[15px] font-normal text-[#8B7355]">{product.keyActives}</p>
                </div>
                <div className="mb-5">
                  <p className="text-[13px] font-medium text-[#666666] mb-1">Technology</p>
                  <p className="text-[15px] font-normal text-[#8B7355]">{product.technology}</p>
                </div>
                <button className="w-full h-[48px] bg-[#8B7355] text-white text-[14px] font-medium rounded-[8px] flex items-center justify-center gap-2 hover:bg-[#7a6448] transition-colors">
                  Learn More <IoChevronForward className="w-[18px] h-[18px]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Testing Protocols ── */}
      <div className="min-h-[360px] px-[120px] py-[80px] bg-[#FDFBF7]">
        <h2 className="text-[40px] font-medium text-[#1A1A1A] text-center mb-[56px]">Rigorous Testing Protocols</h2>
        <div className="grid grid-cols-4 gap-[24px]">
          {testingProtocols.map((test) => (
            <div key={test.title} className="bg-white rounded-[12px] border border-[#E8E3D9] p-[28px] hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all duration-300">
              <test.icon className="w-[40px] h-[40px] text-[#8B7355] mb-4" />
              <h3 className="text-[18px] font-medium text-[#1A1A1A] mb-2">{test.title}</h3>
              <p className="text-[14px] font-normal text-[#666666] leading-[1.5]">{test.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Timeline ── */}
      <div className="min-h-[400px] px-[120px] py-[80px] bg-white">
        <h2 className="text-[48px] font-medium text-[#1A1A1A] text-center mb-[56px]">Innovation Timeline</h2>
        <div className="grid grid-cols-6 gap-[16px]">
          {timelineMilestones.map((milestone) => (
            <div key={milestone.year} className="flex flex-col items-center">
              <div className="w-[56px] h-[56px] bg-[#8B7355] text-white text-[16px] font-bold rounded-full flex items-center justify-center mb-3">
                {milestone.year}
              </div>
              <div className="w-[2px] h-[80px] bg-[#C9A870] mb-3" />
              <div className="text-center">
                <h4 className="text-[15px] font-semibold text-[#1A1A1A] mb-2">{milestone.event}</h4>
                <p className="text-[13px] font-normal text-[#666666]">{milestone.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FAQ ── */}
      <div className="min-h-[480px] px-[120px] py-[80px] bg-[#FDFBF7]">
        <h2 className="text-[40px] font-medium text-[#1A1A1A] text-center mb-[56px]">Frequently Asked Questions</h2>
        <div className="max-w-[900px] mx-auto space-y-4">
          {faqItems.map((item) => (
            <div key={item.question} className="bg-white rounded-[12px] border border-[#E8E3D9] p-[28px]">
              <h3 className="text-[18px] font-medium text-[#1A1A1A] mb-3">{item.question}</h3>
              <p className="text-[15px] font-normal text-[#666666] leading-[1.7]">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Related Pages ── */}
      <div className="min-h-[480px] px-[120px] py-[80px] bg-white">
        <h2 className="text-[40px] font-medium text-[#1A1A1A] text-center mb-[56px]">Explore More Technology</h2>
        <div className="grid grid-cols-3 gap-[32px]">
          {relatedPages.map((page) => (
            <div key={page.title} className="bg-white rounded-[12px] shadow-[0_8px_32px_rgba(0,0,0,0.08)] overflow-hidden cursor-pointer hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] transition-all duration-300">
              <img src={page.image} alt={page.title} className="w-full h-[280px] object-cover" />
              <div className="p-[28px]">
                <h3 className="text-[22px] font-semibold text-[#1A1A1A] mb-2">{page.title}</h3>
                <p className="text-[15px] font-normal text-[#666666] mb-5">{page.desc}</p>
                <div className="flex items-center gap-2 text-[#8B7355] text-[15px] font-medium">
                  Explore <IoChevronForward className="w-[18px] h-[18px]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Newsletter ── */}
      <div className="min-h-[200px] bg-gradient-to-b from-[#F5F1EA] to-white px-[120px] flex flex-col items-center justify-center">
        <h3 className="text-[36px] font-medium text-[#1A1A1A] mb-3">Stay Updated on Formulation Science</h3>
        <p className="text-[16px] font-normal text-[#666666] mb-6">Get exclusive insights on new ingredients and clinical research</p>
        <div className="flex items-center gap-3">
          <input type="email" placeholder="Enter your email" className="w-[360px] h-[56px] px-5 bg-white text-[15px] text-[#2B2B2B] rounded-[8px] border border-[#E8E3D9] outline-none" />
          <button className="h-[56px] px-[32px] bg-[#8B7355] text-white text-[15px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">
            Subscribe
          </button>
        </div>
      </div>

    </div>
  )
}