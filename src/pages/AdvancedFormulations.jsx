import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, Link } from 'react-router-dom'
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
  IoArrowUp,
  IoChevronDown,
} from 'react-icons/io5'

export default function AdvancedFormulations() {
  const { t, i18n } = useTranslation()
  const location  = useLocation()
  const navigate  = useNavigate()
  const [showPdfPopup, setShowPdfPopup] = useState(false)
  const [pdfTitle, setPdfTitle]         = useState('')
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.replace('#', ''))
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
    }
  }, [location])

  const innovationPillars = [
    { icon: IoFlaskOutline, title: t('formulations.pillars.patentedTech'), stat: t('formulations.pillars.patentedTechStat'), desc: t('formulations.pillars.patentedTechDesc') },
    { icon: IoGridOutline, title: t('formulations.pillars.clinicalResearch'), stat: t('formulations.pillars.clinicalResearchStat'), desc: t('formulations.pillars.clinicalResearchDesc') },
    { icon: IoLeafOutline, title: t('formulations.pillars.sustainableScience'), stat: t('formulations.pillars.sustainableScienceStat'), desc: t('formulations.pillars.sustainableScienceDesc') },
    { icon: IoShieldCheckmarkOutline, title: t('formulations.pillars.purityStandards'), stat: t('formulations.pillars.purityStandardsStat'), desc: t('formulations.pillars.purityStandardsDesc') },
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
    { name: t('formulations.certs.crueltyFree'), icon: IoRibbonOutline },
    { name: t('formulations.certs.dermTested'), icon: IoMedkitOutline },
    { name: t('formulations.certs.clinicallyProven'), icon: IoCheckmarkCircle },
    { name: t('formulations.certs.sustainableSourcing'), icon: IoLeafOutline },
    { name: t('formulations.certs.hypoallergenic'), icon: IoShieldCheckmarkOutline },
    { name: t('formulations.certs.nonToxic'), icon: IoWaterOutline },
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
    { name: 'Age-Defying Serum', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&h=360&fit=crop', keyActives: 'Peptide Matrix 4%, Bio-Retinol 3%', technology: 'Micro-Encapsulation System', path: '/skincare' },
    { name: 'Collagen Renewal Cream', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=360&fit=crop', keyActives: 'Marine Collagen 5%, Hyaluronic Acid 2%', technology: 'Triple-Layer Delivery', path: '/skincare' },
    { name: 'Radiance Brightening Essence', image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=300&h=360&fit=crop', keyActives: 'Vitamin C 15%, Niacinamide 5%', technology: 'Liposomal Encapsulation', path: '/skincare' },
  ]

  const timelineMilestones = [
    { year: '2004', event: t('formulations.timeline_items.2004'), desc: t('formulations.timeline_items.2004desc') },
    { year: '2008', event: t('formulations.timeline_items.2008'), desc: t('formulations.timeline_items.2008desc') },
    { year: '2012', event: t('formulations.timeline_items.2012'), desc: t('formulations.timeline_items.2012desc') },
    { year: '2016', event: t('formulations.timeline_items.2016'), desc: t('formulations.timeline_items.2016desc') },
    { year: '2020', event: t('formulations.timeline_items.2020'), desc: t('formulations.timeline_items.2020desc') },
    { year: '2024', event: t('formulations.timeline_items.2024'), desc: t('formulations.timeline_items.2024desc') },
  ]

  const faqItems = [
    { question: t('formulations.faqItems.q1'), answer: t('formulations.faqItems.a1') },
    { question: t('formulations.faqItems.q2'), answer: t('formulations.faqItems.a2') },
    { question: t('formulations.faqItems.q3'), answer: t('formulations.faqItems.a3') },
    { question: t('formulations.faqItems.q4'), answer: t('formulations.faqItems.a4') },
  ]

  const relatedPages = [
    { title: t('formulations.related.virtualTryOn'), desc: t('formulations.related.virtualTryOnDesc'), image: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=380&h=280&fit=crop', path: '/virtual-tryon' },
    { title: t('formulations.related.skinAnalysis'), desc: t('formulations.related.skinAnalysisDesc'), image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=380&h=280&fit=crop', path: '/skin-analysis' },
    { title: t('formulations.related.beautyJourney'), desc: t('formulations.related.beautyJourneyDesc'), image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=380&h=280&fit=crop', path: '/beauty-journey' },
  ]

  const sourcingItems = [
    { region: 'Swiss Alps', ingredient: 'Alpine Rose Stem Cells', icon: IoLeafOutline },
    { region: 'Deep Ocean', ingredient: 'Marine Collagen Complex', icon: IoWaterOutline },
    { region: 'French Vineyards', ingredient: 'Resveratrol Extract', icon: IoSparklesOutline },
    { region: 'Asian Botanicals', ingredient: 'Ginseng & Green Tea', icon: IoFlaskOutline },
  ]

  const testingProtocols = [
    { title: t('formulations.testing.stability'), desc: t('formulations.testing.stabilityDesc'), icon: IoFlaskOutline },
    { title: t('formulations.testing.dermatological'), desc: t('formulations.testing.dermatologicalDesc'), icon: IoMedkitOutline },
    { title: t('formulations.testing.patch'), desc: t('formulations.testing.patchDesc'), icon: IoShieldCheckmarkOutline },
    { title: t('formulations.testing.efficacy'), desc: t('formulations.testing.efficacyDesc'), icon: IoBarChartOutline },
  ]

  return (
    <div key={i18n.language} className="bg-white font-['Cormorant_Garamond']">

      {/* ── Hero ── */}
      {/* Mobile Hero */}
      <div className="md:hidden bg-gradient-to-b from-[#FDFBF7] to-[#F5F1EA]">
        <div className="relative w-full h-[240px] overflow-hidden">
          <img src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&h=500&fit=crop" alt="Laboratory Science" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-transparent to-transparent" />
        </div>
        <div className="px-4 pt-4 pb-8">
          <p className="text-[11px] font-light italic text-[#8B7355] tracking-[2px] mb-2">{t('formulations.tagline')}</p>
          <h1 className="text-[32px] font-bold text-[#1A1A1A] leading-[1.05] mb-3">{t('formulations.title')}</h1>
          <p className="text-[13px] font-normal text-[#666666] leading-[1.6] mb-4">{t('formulations.heroDesc')}</p>
          <div className="w-[80px] h-[4px] bg-[#C9A870]" />
        </div>
      </div>
      {/* Tablet + Desktop Hero */}
      <div className="hidden md:flex min-h-[440px] lg:min-h-[560px] bg-gradient-to-b from-[#FDFBF7] to-[#F5F1EA] relative overflow-hidden items-center px-[60px] lg:px-[120px]">
        <div className="w-[520px] lg:w-[680px] relative z-10">
          <p className="text-[12px] lg:text-[14px] font-light italic text-[#8B7355] tracking-[2px] mb-3">{t('formulations.tagline')}</p>
          <h1 className="text-[52px] lg:text-[72px] font-bold text-[#1A1A1A] leading-[1.05] mb-4 lg:mb-5">{t('formulations.title')}</h1>
          <p className="text-[16px] lg:text-[20px] font-normal text-[#666666] leading-[1.6] mb-6 lg:mb-8">{t('formulations.heroDesc')}</p>
          <div className="w-[130px] lg:w-[160px] h-[4px] bg-[#C9A870]" />
        </div>
        <div className="absolute right-[140px] top-1/2 -translate-y-1/2">
          <img src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=440&h=440&fit=crop" alt="Laboratory Science" className="w-[440px] h-[440px] object-cover rounded-[12px] shadow-[0_16px_64px_rgba(0,0,0,0.15)]" />
        </div>
      </div>

      {/* ── Breadcrumb ── */}
      <div className="min-h-[48px] bg-[#FDFBF7] px-4 md:px-[60px] lg:px-[120px] flex items-center overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        <span className="text-[13px] lg:text-[15px] font-normal text-[#8B7355] cursor-pointer whitespace-nowrap">{t('formulations.home')}</span>
        <span className="text-[13px] lg:text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="hidden sm:inline text-[13px] lg:text-[15px] font-normal text-[#8B7355] cursor-pointer whitespace-nowrap">{t('formulations.technology')}</span>
        <span className="hidden sm:inline text-[13px] lg:text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[13px] lg:text-[15px] font-normal text-[#666666] whitespace-nowrap">{t('formulations.breadcrumb')}</span>
      </div>

      {/* ── Innovation Pillars ── */}
      <div id='our-story' className="px-4 md:px-[60px] lg:px-[120px] py-10 md:py-14 lg:py-[80px] bg-white">
        <h2 className="text-[26px] md:text-[36px] lg:text-[48px] font-medium text-[#1A1A1A] text-center mb-10 lg:mb-[56px]">{t('formulations.innovationPillars')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-[24px]">
          {innovationPillars.map((pillar) => (
            <div key={pillar.title} className="bg-white rounded-[12px] border border-[#E8E3D9] shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-5 lg:p-[32px] flex flex-col items-center hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)] transition-all duration-300">
              <pillar.icon className="w-[36px] h-[36px] lg:w-[48px] lg:h-[48px] text-[#8B7355] mb-4 lg:mb-5" />
              <div className="text-[24px] md:text-[28px] lg:text-[32px] font-bold text-[#C9A870] mb-2">{pillar.stat}</div>
              <h3 className="text-[15px] lg:text-[18px] font-semibold text-[#1A1A1A] mb-3 text-center">{pillar.title}</h3>
              <p className="text-[13px] lg:text-[15px] font-normal text-[#666666] text-center leading-[1.5]">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Signature Ingredients ── */}
      <div className="px-4 md:px-[60px] lg:px-[120px] py-10 md:py-14 lg:py-[80px] bg-[#FDFBF7]">
        <h2 className="text-[26px] md:text-[36px] lg:text-[48px] font-medium text-[#1A1A1A] text-center mb-3">{t('formulations.signatureIngredients')}</h2>
        <p className="text-[13px] md:text-[15px] lg:text-[16px] font-normal text-[#666666] text-center mb-10 lg:mb-[56px]">{t('formulations.signatureSubtitle')}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-[24px]">
          {signatureIngredients.map((ingredient) => (
            <div key={ingredient.name} className="bg-white rounded-[12px] shadow-[0_8px_32px_rgba(0,0,0,0.08)] overflow-hidden hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] transition-all duration-300">
              <img src={ingredient.image} alt={ingredient.name} className="w-full h-[220px] md:h-[260px] lg:h-[320px] object-cover" />
              <div className="p-4 lg:p-[24px]">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-3 py-1 bg-[#8B7355] text-white text-[10px] lg:text-[11px] font-medium rounded-full">{ingredient.concentration}</span>
                  <IoSparklesOutline className="w-[16px] h-[16px] lg:w-[18px] lg:h-[18px] text-[#C9A870]" />
                </div>
                <h3 className="text-[15px] lg:text-[18px] font-semibold text-[#1A1A1A] mb-2">{ingredient.name}</h3>
                <p className="text-[12px] lg:text-[13px] font-light italic text-[#8B7355] mb-3">{ingredient.origin}</p>
                <div className="space-y-2 mb-4">
                  {ingredient.benefits.map((benefit) => (
                    <div key={benefit} className="flex items-start gap-2">
                      <IoCheckmarkCircle className="w-[13px] h-[13px] lg:w-[14px] lg:h-[14px] text-[#8B7355] flex-shrink-0 mt-0.5" />
                      <span className="text-[12px] lg:text-[14px] font-normal text-[#666666]">{benefit}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-3 border-t border-[#E8E3D9]">
                  <p className="text-[11px] lg:text-[12px] font-medium text-[#8B7355]">{ingredient.efficacy}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Delivery System ── */}
      <div className="px-4 md:px-[60px] lg:px-[120px] py-10 md:py-14 lg:py-[80px] bg-white">
        {/* Mobile: title → image → subtitle → layers */}
        <div className="md:hidden">
          <h2 className="text-[26px] font-medium text-[#1A1A1A] mb-4">{t('formulations.deliverySystem')}</h2>
          <img src="https://images.unsplash.com/photo-1576086213369-97a306d36557?w=580&h=420&fit=crop" alt="Formulation Technology" className="w-full h-[220px] object-cover rounded-[12px] shadow-[0_8px_32px_rgba(0,0,0,0.1)] mb-4" />
          <p className="text-[13px] font-normal text-[#666666] leading-[1.7] mb-5">{t('formulations.deliveryDesc')}</p>
          <div className="space-y-3">
            {[
              { layer: t('formulations.surfaceLayer'), desc: t('formulations.surfaceLayerDesc') },
              { layer: t('formulations.midLayer'), desc: t('formulations.midLayerDesc') },
              { layer: t('formulations.deepLayer'), desc: t('formulations.deepLayerDesc') },
            ].map((layer) => (
              <div key={layer.layer} className="flex items-start gap-3 bg-[#F5F1EA] rounded-[8px] p-3">
                <IoBeakerOutline className="w-[18px] h-[18px] text-[#8B7355] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-[14px] font-medium text-[#1A1A1A] mb-1">{layer.layer}</h4>
                  <p className="text-[12px] font-normal text-[#666666]">{layer.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Tablet + Desktop: image left, text right */}
        <div className="hidden md:flex gap-8 lg:gap-[64px] items-center">
          <div className="flex-1 lg:w-[580px] lg:flex-none">
            <img src="https://images.unsplash.com/photo-1576086213369-97a306d36557?w=580&h=420&fit=crop" alt="Formulation Technology" className="w-full h-[340px] lg:h-[420px] object-cover rounded-[12px] shadow-[0_8px_32px_rgba(0,0,0,0.1)]" />
          </div>
          <div className="flex-1">
            <h2 className="text-[30px] lg:text-[40px] font-medium text-[#1A1A1A] mb-4">{t('formulations.deliverySystem')}</h2>
            <p className="text-[15px] lg:text-[16px] font-normal text-[#666666] leading-[1.7] mb-6">{t('formulations.deliveryDesc')}</p>
            <div className="space-y-4 mb-6">
              {[
                { layer: t('formulations.surfaceLayer'), desc: t('formulations.surfaceLayerDesc') },
                { layer: t('formulations.midLayer'), desc: t('formulations.midLayerDesc') },
                { layer: t('formulations.deepLayer'), desc: t('formulations.deepLayerDesc') },
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
      <div className="px-4 md:px-[60px] lg:px-[120px] py-10 md:py-14 lg:py-[80px] bg-[#FDFBF7]">
        <h2 className="text-[26px] md:text-[36px] lg:text-[48px] font-medium text-[#1A1A1A] text-center mb-3">{t('formulations.clinicalResults')}</h2>
        <p className="text-[13px] md:text-[15px] lg:text-[16px] font-normal text-[#666666] text-center mb-10 lg:mb-[56px]">{t('formulations.clinicalSubtitle')}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-[24px]">
          {clinicalResults.map((result) => (
            <div key={result.metric} className="bg-white rounded-[12px] border border-[#E8E3D9] shadow-[0_4px_16px_rgba(0,0,0,0.06)] overflow-hidden">
              <img src={result.image} alt={result.metric} className="w-full h-[140px] md:h-[180px] lg:h-[220px] object-cover" />
              <div className="p-4 lg:p-[24px]">
                <h3 className="text-[14px] lg:text-[18px] font-medium text-[#1A1A1A] mb-2 lg:mb-3">{result.metric}</h3>
                <div className="text-[26px] md:text-[30px] lg:text-[36px] font-bold text-[#8B7355] mb-2">{result.improvement}</div>
                <p className="text-[12px] lg:text-[14px] font-normal text-[#666666]">{t('formulations.measuredAfter')} {result.timeline}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Stats Banner ── */}
      <div className="relative overflow-hidden min-h-[240px] md:min-h-[300px] lg:min-h-[360px]">
        <img src="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1440&h=360&fit=crop" alt="Research Laboratory" className="w-full h-full object-cover absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        <div className="absolute inset-0 flex items-center px-4 md:px-[60px] lg:px-[120px]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-[48px] w-full py-8">
            {[{ stat: '20+', label: t('formulations.yearsResearch') }, { stat: '45+', label: t('formulations.patentsAwarded') }, { stat: '150+', label: t('formulations.publications') }, { stat: '30+', label: t('formulations.researchPartnerships') }].map((item) => (
              <div key={item.label} className="text-center">
                <div className="text-[36px] md:text-[44px] lg:text-[56px] font-bold text-white mb-2">{item.stat}</div>
                <div className="text-[13px] md:text-[14px] lg:text-[16px] font-normal text-white/90">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Certifications ── */}
      <div className="px-4 md:px-[60px] lg:px-[120px] py-10 md:py-14 lg:py-[80px] bg-white">
        <h2 className="text-[26px] md:text-[32px] lg:text-[40px] font-medium text-[#1A1A1A] text-center mb-10 lg:mb-[56px]">{t('formulations.certifications')}</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-5 lg:gap-[32px]">
          {certifications.map((cert) => (
            <div key={cert.name} className="flex flex-col items-center">
              <div className="w-[72px] h-[72px] md:w-[84px] md:h-[84px] lg:w-[100px] lg:h-[100px] bg-[#F5F1EA] rounded-full flex items-center justify-center mb-3 lg:mb-4">
                <cert.icon className="w-[32px] h-[32px] md:w-[40px] md:h-[40px] lg:w-[48px] lg:h-[48px] text-[#8B7355]" />
              </div>
              <p className="text-[12px] lg:text-[14px] font-medium text-[#1A1A1A] text-center">{cert.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Global Sourcing ── */}
      <div className="px-4 md:px-[60px] lg:px-[120px] py-10 md:py-14 lg:py-[80px] bg-[#FDFBF7]">
        <h2 className="text-[26px] md:text-[36px] lg:text-[48px] font-medium text-[#1A1A1A] mb-8 lg:mb-[56px]">{t('formulations.globalSourcing')}</h2>
        <div className="flex flex-col md:flex-row gap-8 lg:gap-[48px]">
          <div className="w-full md:w-[420px] lg:w-[600px] flex-shrink-0">
            <img src="https://images.unsplash.com/photo-1589519160732-57fc498494f8?w=600&h=400&fit=crop" alt="Global Sourcing" className="w-full h-[220px] md:h-[300px] lg:h-[400px] object-cover rounded-[12px] shadow-[0_8px_32px_rgba(0,0,0,0.1)] mb-4" />
            <div className="flex items-center gap-3">
              <IoGlobeOutline className="w-[20px] h-[20px] lg:w-[24px] lg:h-[24px] text-[#8B7355]" />
              <span className="text-[13px] lg:text-[15px] font-medium text-[#666666]">{t('formulations.sourcingCountries')}</span>
            </div>
          </div>
          <div className="flex-1">
            <p className="text-[13px] md:text-[15px] lg:text-[18px] font-normal text-[#666666] leading-[1.7] mb-6">
              {t('formulations.sourcingDesc')}
            </p>
            <div className="space-y-3 lg:space-y-4">
              {sourcingItems.map((source) => (
                <div key={source.region} className="flex items-center gap-3 lg:gap-4 bg-white rounded-[8px] border border-[#E8E3D9] p-4 lg:p-[20px]">
                  <source.icon className="w-[20px] h-[20px] lg:w-[24px] lg:h-[24px] text-[#8B7355] flex-shrink-0" />
                  <div>
                    <h4 className="text-[14px] lg:text-[16px] font-medium text-[#1A1A1A]">{source.region}</h4>
                    <p className="text-[12px] lg:text-[14px] font-normal text-[#666666]">{source.ingredient}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Publications ── */}
      <div className="px-4 md:px-[60px] lg:px-[120px] py-10 md:py-14 lg:py-[80px] bg-white">
        <h2 className="text-[26px] md:text-[32px] lg:text-[40px] font-medium text-[#1A1A1A] mb-3">{t('formulations.scientificPublications')}</h2>
        <p className="text-[13px] md:text-[15px] lg:text-[16px] font-normal text-[#666666] mb-8 lg:mb-[48px]">{t('formulations.pubSubtitle')}</p>
        <div className="space-y-4">
          {publications.map((pub) => (
            <div key={pub.title} className="bg-[#FDFBF7] rounded-[12px] border border-[#E8E3D9] p-4 md:p-5 lg:p-[28px]">
              <div className="flex flex-col sm:flex-row items-start gap-4 lg:gap-6">
                <div className="flex-1 min-w-0">
                  <h3 className="text-[15px] md:text-[17px] lg:text-[20px] font-medium text-[#1A1A1A] mb-2">{pub.title}</h3>
                  <p className="text-[12px] lg:text-[14px] font-light italic text-[#8B7355] mb-2 lg:mb-3">{pub.journal} • {pub.date}</p>
                  <p className="text-[13px] lg:text-[15px] font-normal text-[#666666]">{pub.findings}</p>
                </div>
                <button
                  onClick={() => { setPdfTitle(pub.title); setShowPdfPopup(true) }}
                  className="flex items-center gap-2 px-4 lg:px-5 h-[40px] lg:h-[44px] bg-[#8B7355] text-white text-[13px] lg:text-[14px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors flex-shrink-0">
                  <IoDownloadOutline className="w-[16px] h-[16px] lg:w-[18px] lg:h-[18px]" />
                  {t('formulations.download')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Expert Team ── */}
      <div className="py-10 md:py-14 lg:py-[80px] bg-[#F5F1EA]">
        <h2 className="text-[26px] md:text-[36px] lg:text-[48px] font-medium text-[#1A1A1A] text-center mb-8 lg:mb-[56px] px-4 md:px-[60px] lg:px-[120px]">{t('formulations.expertTeam')}</h2>
        {/* Mobile: horizontal scroll */}
        <div className="md:hidden flex gap-4 overflow-x-auto px-4 pb-4" style={{ scrollbarWidth: 'none' }}>
          {experts.map((expert) => (
            <div key={expert.name} className="bg-white rounded-[12px] shadow-[0_8px_32px_rgba(0,0,0,0.08)] p-5 flex-shrink-0 w-[280px]">
              <div className="flex justify-center mb-4">
                <img src={expert.image} alt={expert.name} className="w-[100px] h-[100px] object-cover rounded-full border-4 border-[#C9A870]" />
              </div>
              <h3 className="text-[16px] font-semibold text-[#1A1A1A] text-center mb-1">{expert.name}</h3>
              <p className="text-[12px] font-normal text-[#8B7355] text-center mb-4">{expert.title}</p>
              <div className="flex gap-2">
                <IoNewspaperOutline className="w-[16px] h-[16px] text-[#C9A870] flex-shrink-0 mt-1" />
                <p className="text-[12px] font-normal italic text-[#666666] leading-[1.6]">"{expert.quote}"</p>
              </div>
            </div>
          ))}
        </div>
        {/* Tablet + Desktop: grid */}
        <div className="hidden md:grid grid-cols-3 gap-5 lg:gap-[32px] px-[60px] lg:px-[120px]">
          {experts.map((expert) => (
            <div key={expert.name} className="bg-white rounded-[12px] shadow-[0_8px_32px_rgba(0,0,0,0.08)] p-5 lg:p-[32px]">
              <div className="flex justify-center mb-4 lg:mb-5">
                <img src={expert.image} alt={expert.name} className="w-[140px] h-[140px] lg:w-[160px] lg:h-[160px] object-cover rounded-full border-4 border-[#C9A870]" />
              </div>
              <h3 className="text-[18px] lg:text-[20px] font-semibold text-[#1A1A1A] text-center mb-1">{expert.name}</h3>
              <p className="text-[13px] lg:text-[14px] font-normal text-[#8B7355] text-center mb-4 lg:mb-5">{expert.title}</p>
              <div className="flex gap-2">
                <IoNewspaperOutline className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#C9A870] flex-shrink-0 mt-1" />
                <p className="text-[13px] lg:text-[15px] font-normal italic text-[#666666] leading-[1.6]">"{expert.quote}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Hero Products ── */}
      <div className="py-10 md:py-14 lg:py-[80px] bg-white">
        <h2 className="text-[26px] md:text-[36px] lg:text-[48px] font-medium text-[#1A1A1A] text-center mb-8 lg:mb-[56px] px-4 md:px-[60px] lg:px-[120px]">{t('formulations.heroProducts')}</h2>
        {/* Mobile: horizontal scroll */}
        <div className="md:hidden flex gap-4 overflow-x-auto px-4 pb-4" style={{ scrollbarWidth: 'none' }}>
          {heroProducts.map((product) => (
            <div key={product.name} className="bg-white rounded-[12px] border border-[#E8E3D9] shadow-[0_8px_32px_rgba(0,0,0,0.08)] overflow-hidden flex-shrink-0 w-[260px]">
              <img src={product.image} alt={product.name} className="w-full h-[200px] object-cover" />
              <div className="p-4">
                <h3 className="text-[15px] font-semibold text-[#1A1A1A] mb-3">{product.name}</h3>
                <div className="mb-3">
                  <p className="text-[11px] font-medium text-[#666666] mb-1">{t('formulations.keyActives')}</p>
                  <p className="text-[12px] font-normal text-[#8B7355]">{product.keyActives}</p>
                </div>
                <div className="mb-4">
                  <p className="text-[11px] font-medium text-[#666666] mb-1">{t('formulations.technologyLabel')}</p>
                  <p className="text-[12px] font-normal text-[#8B7355]">{product.technology}</p>
                </div>
                <button
                  onClick={() => navigate(product.path)}
                  className="w-full h-[40px] bg-[#8B7355] text-white text-[13px] font-medium rounded-[8px] flex items-center justify-center gap-2 hover:bg-[#7a6448] transition-colors">
                  {t('formulations.learnMore')} <IoChevronForward className="w-[14px] h-[14px]" />
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Tablet + Desktop: grid */}
        <div className="hidden md:grid grid-cols-3 gap-5 lg:gap-[32px] px-[60px] lg:px-[120px]">
          {heroProducts.map((product) => (
            <div key={product.name} className="bg-white rounded-[12px] border border-[#E8E3D9] shadow-[0_8px_32px_rgba(0,0,0,0.08)] overflow-hidden hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] transition-all duration-300">
              <img src={product.image} alt={product.name} className="w-full h-[280px] lg:h-[360px] object-cover" />
              <div className="p-5 lg:p-[28px]">
                <h3 className="text-[17px] lg:text-[20px] font-semibold text-[#1A1A1A] mb-3">{product.name}</h3>
                <div className="mb-3 lg:mb-4">
                  <p className="text-[11px] lg:text-[13px] font-medium text-[#666666] mb-1">{t('formulations.keyActives')}</p>
                  <p className="text-[13px] lg:text-[15px] font-normal text-[#8B7355]">{product.keyActives}</p>
                </div>
                <div className="mb-4 lg:mb-5">
                  <p className="text-[11px] lg:text-[13px] font-medium text-[#666666] mb-1">{t('formulations.technologyLabel')}</p>
                  <p className="text-[13px] lg:text-[15px] font-normal text-[#8B7355]">{product.technology}</p>
                </div>
                <button
                  onClick={() => navigate(product.path)}
                  className="w-full h-[44px] lg:h-[48px] bg-[#8B7355] text-white text-[13px] lg:text-[14px] font-medium rounded-[8px] flex items-center justify-center gap-2 hover:bg-[#7a6448] transition-colors">
                  {t('formulations.learnMore')} <IoChevronForward className="w-[16px] h-[16px] lg:w-[18px] lg:h-[18px]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Testing Protocols ── */}
      <div className="px-4 md:px-[60px] lg:px-[120px] py-10 md:py-14 lg:py-[80px] bg-[#FDFBF7]">
        <h2 className="text-[26px] md:text-[32px] lg:text-[40px] font-medium text-[#1A1A1A] text-center mb-10 lg:mb-[56px]">{t('formulations.testingProtocols')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-[24px]">
          {testingProtocols.map((test) => (
            <div key={test.title} className="bg-white rounded-[12px] border border-[#E8E3D9] p-4 lg:p-[28px] hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all duration-300">
              <test.icon className="w-[30px] h-[30px] md:w-[36px] md:h-[36px] lg:w-[40px] lg:h-[40px] text-[#8B7355] mb-3 lg:mb-4" />
              <h3 className="text-[14px] md:text-[15px] lg:text-[18px] font-medium text-[#1A1A1A] mb-2">{test.title}</h3>
              <p className="text-[12px] lg:text-[14px] font-normal text-[#666666] leading-[1.5]">{test.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Timeline ── */}
      <div className="px-4 md:px-[60px] lg:px-[120px] py-10 md:py-14 lg:py-[80px] bg-white">
        <h2 className="text-[26px] md:text-[36px] lg:text-[48px] font-medium text-[#1A1A1A] text-center mb-10 lg:mb-[56px]">{t('formulations.timeline')}</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 lg:gap-[16px]">
          {timelineMilestones.map((milestone) => (
            <div key={milestone.year} className="flex flex-col items-center">
              <div className="w-[44px] h-[44px] md:w-[48px] md:h-[48px] lg:w-[56px] lg:h-[56px] bg-[#8B7355] text-white text-[11px] md:text-[12px] lg:text-[16px] font-bold rounded-full flex items-center justify-center mb-3 text-center leading-tight px-1">
                {milestone.year}
              </div>
              <div className="w-[2px] h-[48px] md:h-[64px] lg:h-[80px] bg-[#C9A870] mb-3" />
              <div className="text-center">
                <h4 className="text-[11px] md:text-[12px] lg:text-[15px] font-semibold text-[#1A1A1A] mb-1 leading-tight">{milestone.event}</h4>
                <p className="text-[10px] md:text-[11px] lg:text-[13px] font-normal text-[#666666] leading-tight">{milestone.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FAQ ── */}
      <div className="px-4 md:px-[60px] lg:px-[120px] py-10 md:py-14 lg:py-[80px] bg-[#FDFBF7]">
        <h2 className="text-[26px] md:text-[32px] lg:text-[40px] font-medium text-[#1A1A1A] text-center mb-10 lg:mb-[56px]">{t('formulations.faq')}</h2>
        <div className="max-w-[900px] mx-auto space-y-3 lg:space-y-4">
          {faqItems.map((item, idx) => (
            <div key={item.question} className="bg-white rounded-[12px] border border-[#E8E3D9] overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-4 md:p-5 lg:p-[28px] text-left"
              >
                <h3 className="text-[14px] md:text-[16px] lg:text-[18px] font-medium text-[#1A1A1A] pr-4">{item.question}</h3>
                <IoChevronDown
                  className={`w-[20px] h-[20px] lg:w-[22px] lg:h-[22px] text-[#8B7355] flex-shrink-0 transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-4 md:px-5 lg:px-[28px] pb-4 md:pb-5 lg:pb-[28px]">
                  <div className="h-[1px] bg-[#E8E3D9] mb-4" />
                  <p className="text-[13px] lg:text-[15px] font-normal text-[#666666] leading-[1.7]">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Related Pages ── */}
      <div className="px-4 md:px-[60px] lg:px-[120px] py-10 md:py-14 lg:py-[80px] bg-white">
        <h2 className="text-[26px] md:text-[32px] lg:text-[40px] font-medium text-[#1A1A1A] text-center mb-10 lg:mb-[56px]">{t('formulations.exploreMore')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-[32px]">
          {relatedPages.map((page) => (
            <Link key={page.title} to={page.path}>
              <div className="bg-white rounded-[12px] shadow-[0_8px_32px_rgba(0,0,0,0.08)] overflow-hidden cursor-pointer hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] transition-all duration-300">
                <img src={page.image} alt={page.title} className="w-full h-[180px] md:h-[220px] lg:h-[280px] object-cover" />
                <div className="p-4 md:p-5 lg:p-[28px]">
                  <h3 className="text-[16px] md:text-[18px] lg:text-[22px] font-semibold text-[#1A1A1A] mb-2">{page.title}</h3>
                  <p className="text-[13px] lg:text-[15px] font-normal text-[#666666] mb-4 lg:mb-5">{page.desc}</p>
                  <div className="flex items-center gap-2 text-[#8B7355] text-[13px] lg:text-[15px] font-medium">
                    {t('formulations.explore')} <IoChevronForward className="w-[16px] h-[16px] lg:w-[18px] lg:h-[18px]" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── PDF Popup Modal ── */}
      {showPdfPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowPdfPopup(false)} />
          <div className="relative bg-white rounded-[16px] shadow-[0_16px_64px_rgba(0,0,0,0.15)] p-6 lg:p-[40px] max-w-[480px] w-full">
            <div className="flex items-center justify-center w-[64px] h-[64px] bg-[#F5F1EA] rounded-full mx-auto mb-5">
              <IoDownloadOutline className="w-[28px] h-[28px] text-[#8B7355]" />
            </div>
            <h3 className="text-[20px] lg:text-[24px] font-semibold text-[#1A1A1A] text-center mb-3">{t('formulations.pdfTitle')}</h3>
            <p className="text-[14px] lg:text-[15px] font-normal text-[#666666] text-center mb-2 leading-[1.6]">{pdfTitle}</p>
            <p className="text-[13px] font-light text-[#999999] text-center mb-6">{t('formulations.pdfDesc')}</p>
            <button
              onClick={() => setShowPdfPopup(false)}
              className="w-full h-[48px] lg:h-[52px] bg-[#8B7355] text-white text-[15px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">
              {t('formulations.close')}
            </button>
          </div>
        </div>
      )}

      {/* ── Newsletter ── */}
      <div className="bg-gradient-to-b from-[#F5F1EA] to-white px-4 md:px-[60px] lg:px-[120px] py-10 md:py-12 lg:py-0 lg:min-h-[200px] flex flex-col items-center justify-center">
        <h3 className="text-[20px] md:text-[28px] lg:text-[36px] font-medium text-[#1A1A1A] mb-3 text-center">{t('formulations.newsletter')}</h3>
        <p className="text-[13px] md:text-[15px] lg:text-[16px] font-normal text-[#666666] mb-5 lg:mb-6 text-center">{t('formulations.newsletterDesc')}</p>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <input type="email" placeholder={t('formulations.emailPlaceholder')} className="w-full sm:w-[280px] lg:w-[360px] h-[48px] lg:h-[56px] px-5 bg-white text-[14px] lg:text-[15px] text-[#2B2B2B] rounded-[8px] border border-[#E8E3D9] outline-none" />
          <button className="w-full sm:w-auto h-[48px] lg:h-[56px] px-8 lg:px-[32px] bg-[#8B7355] text-white text-[14px] lg:text-[15px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">
            {t('formulations.subscribe')}
          </button>
        </div>
      </div>

      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 w-12 h-12 bg-gradient-to-br from-[#C9A870] to-[#8B7355] rounded-full flex items-center justify-center shadow-[0_4px_16px_rgba(139,115,85,0.4)] z-50 transition-all duration-300"
        >
          <IoArrowUp className="w-5 h-5 text-white" />
        </button>
      )}
    </div>
  )
}