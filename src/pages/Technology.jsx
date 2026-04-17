import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
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
import {
  technologyTestimonials as testimonials,
  technologyStats,
  journeySteps,
} from '../data/technology'

// ─── Page-specific data ───────────────────────────────────────────────────────
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

// journeySteps imported from ../data/technology

const mobileBenefits = [
  { icon: IoTimeOutline,       title: 'Save Time',       desc: 'Instant recommendations' },
  { icon: IoTrendingUpOutline, title: 'Better Results',  desc: 'Optimized formulas' },
  { icon: IoBulbOutline,       title: 'Expert Guidance', desc: 'Professional insights' },
  { icon: IoSparklesOutline,   title: 'Personalized',    desc: 'Tailored solutions' },
]

// testimonials imported from ../data/technology as technologyTestimonials

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
// stats — kept local because it includes icon components
const stats = [
  { icon: IoHardwareChipOutline, value: '98% Accuracy',   label: 'AI-Powered Analysis'   },
  { icon: IoTrendingUpOutline,   value: '10M+ Scans',     label: 'Trusted Worldwide'      },
  { icon: IoFlaskOutline,        value: 'Patent-Pending', label: 'Innovative Technology'  },
]


// ─── Translation-aware data builders ─────────────────────────────────────────
const getStats = (t) => [
  { icon: IoHardwareChipOutline, value: t('technology.stats.accuracy'), label: t('technology.stats.accuracyLabel') },
  { icon: IoTrendingUpOutline,   value: t('technology.stats.scans'),    label: t('technology.stats.scansLabel')    },
  { icon: IoFlaskOutline,        value: t('technology.stats.patent'),   label: t('technology.stats.patentLabel')   },
]
const getJourneySteps = (t) => [
  { title: t('technology.journeySteps.step1Title'), desc: t('technology.journeySteps.step1Desc') },
  { title: t('technology.journeySteps.step2Title'), desc: t('technology.journeySteps.step2Desc') },
  { title: t('technology.journeySteps.step3Title'), desc: t('technology.journeySteps.step3Desc') },
  { title: t('technology.journeySteps.step4Title'), desc: t('technology.journeySteps.step4Desc') },
]

const getCoreFeatures = (t) => [
  { icon: IoHardwareChipOutline, title: t('technology.features.aiConsultation'),      description: t('technology.features.aiConsultationDesc'),      gradient: 'from-[#E8E3F7] to-[#D5CAE8]' },
  { icon: IoCameraOutline,       title: t('technology.features.arTryOn'),             description: t('technology.features.arTryOnDesc'),             gradient: 'from-[#FFE8F0] to-[#FFDDE8]' },
  { icon: IoFlaskOutline,        title: t('technology.features.formulationScience'),  description: t('technology.features.formulationScienceDesc'),  gradient: 'from-[#E3F2FD] to-[#CCEAF9]' },
  { icon: IoSearchOutline,       title: t('technology.features.skinAnalysis'),        description: t('technology.features.skinAnalysisDesc'),        gradient: 'from-[#E8F5E9] to-[#D4EDD6]' },
  { icon: IoSparklesOutline,     title: t('technology.features.smartRecs'),           description: t('technology.features.smartRecsDesc'),           gradient: 'from-[#FFF3E0] to-[#FFE8CC]' },
  { icon: IoTrendingUpOutline,   title: t('technology.features.beautyJourney'),       description: t('technology.features.beautyJourneyDesc'),       gradient: 'from-[#E0F7FA] to-[#CCF0F5]' },
]
const getAIBenefits = (t) => [
  { icon: IoFlaskOutline,           title: t('technology.aiBenefits.instantAnalysis'),    desc: t('technology.aiBenefits.instantAnalysisDesc') },
  { icon: IoSparklesOutline,        title: t('technology.aiBenefits.personalizedResults'), desc: t('technology.aiBenefits.personalizedResultsDesc') },
  { icon: IoCheckmarkCircleOutline, title: t('technology.aiBenefits.expertRecs'),          desc: t('technology.aiBenefits.expertRecsDesc') },
]
const getScientificInnovations = (t) => [
  { title: t('technology.innovations.bioActive'),     desc: t('technology.innovations.bioActiveDesc'),     gradient: 'from-[#E8E3F7] to-[#D5CAE8]' },
  { title: t('technology.innovations.timeRelease'),   desc: t('technology.innovations.timeReleaseDesc'),   gradient: 'from-[#E3F2FD] to-[#CCEAF9]' },
  { title: t('technology.innovations.clinicalTesting'), desc: t('technology.innovations.clinicalTestingDesc'), gradient: 'from-[#E8F5E9] to-[#D4EDD6]' },
]
const getMobileBenefits = (t) => [
  { icon: IoTimeOutline,       title: t('technology.benefits.saveTime'),      desc: t('technology.benefits.saveTimeDesc') },
  { icon: IoTrendingUpOutline, title: t('technology.benefits.betterResults'), desc: t('technology.benefits.betterResultsDesc') },
  { icon: IoBulbOutline,       title: t('technology.benefits.expertGuidance'), desc: t('technology.benefits.expertGuidanceDesc') },
  { icon: IoSparklesOutline,   title: t('technology.benefits.personalized'),  desc: t('technology.benefits.personalizedDesc') },
]
const getInnovationCards = (t) => [
  { tag: t('technology.innovationCards.aiTag'),     title: t('technology.innovationCards.aiTitle'),     description: t('technology.innovationCards.aiDesc'),     image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=580&h=280&fit=crop', buttonText: t('technology.innovationCards.aiBtn'),     path: '/skin-analysis' },
  { tag: t('technology.innovationCards.arTag'),     title: t('technology.innovationCards.arTitle'),     description: t('technology.innovationCards.arDesc'),     image: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=580&h=280&fit=crop', buttonText: t('technology.innovationCards.arBtn'),     path: '/virtual-tryon' },
  { tag: t('technology.innovationCards.personTag'), title: t('technology.innovationCards.personTitle'), description: t('technology.innovationCards.personDesc'), image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=580&h=280&fit=crop', buttonText: t('technology.innovationCards.personBtn'), path: '/beauty-journey' },
  { tag: t('technology.innovationCards.innovTag'),  title: t('technology.innovationCards.innovTitle'),  description: t('technology.innovationCards.innovDesc'),  image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=580&h=280&fit=crop', buttonText: t('technology.innovationCards.innovBtn'),  path: '/advanced-formulations' },
]
const getHowItWorksSteps = (t) => [
  { number: '1', title: t('technology.howItWorksSteps.step1Title'), description: t('technology.howItWorksSteps.step1Desc'), image: 'https://images.unsplash.com/photo-1611349411198-e26e0d5f4a52?w=120&h=120&fit=crop' },
  { number: '2', title: t('technology.howItWorksSteps.step2Title'), description: t('technology.howItWorksSteps.step2Desc'), image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=120&h=120&fit=crop' },
  { number: '3', title: t('technology.howItWorksSteps.step3Title'), description: t('technology.howItWorksSteps.step3Desc'), image: 'https://images.unsplash.com/photo-1556740772-1a741367b93e?w=120&h=120&fit=crop' },
]
const getDesktopBenefits = (t) => [
  { icon: IoSearchOutline,          title: t('technology.benefits.precisionAnalysis'),    description: t('technology.benefits.precisionAnalysisDesc') },
  { icon: IoTimeOutline,            title: t('technology.benefits.timeSaving'),           description: t('technology.benefits.timeSavingDesc') },
  { icon: IoPersonOutline,          title: t('technology.benefits.personalizedResults'),  description: t('technology.benefits.personalizedResultsDesc') },
  { icon: IoHeadsetOutline,         title: t('technology.benefits.expertGuidanceLong'),   description: t('technology.benefits.expertGuidanceLongDesc') },
  { icon: IoCheckmarkCircleOutline, title: t('technology.benefits.productMatching'),      description: t('technology.benefits.productMatchingDesc') },
  { icon: IoRefreshOutline,         title: t('technology.benefits.progressTracking'),     description: t('technology.benefits.progressTrackingDesc') },
]


// ─── Mobile ───────────────────────────────────────────────────────────────────
function TechnologyMobile() {
  const { t } = useTranslation()
  const innovationCards = getInnovationCards(t)
  const stats = getStats(t)
  const howItWorksSteps = getHowItWorksSteps(t)
  const desktopBenefits = getDesktopBenefits(t)

  return (
    <div className="w-full min-h-screen bg-white font-['Cormorant_Garamond']">

      {/* Hero — same as desktop */}
      <div className="min-h-[300px] bg-gradient-to-b from-[#FDFBF7] to-[#F5F1EA] relative overflow-hidden flex items-center px-6 py-10">
        <div className="w-full relative z-10">
          <p className="text-[12px] font-light italic text-[#8B7355] tracking-[2px] mb-3">{t('technology.advancedTech')}</p>
          <h1 className="text-[40px] font-bold text-[#1A1A1A] leading-[1] mb-4">{t('technology.desktopHeroTitle')}</h1>
          <p className="text-[15px] font-normal text-[#666666] mb-6">{t('technology.desktopHeroDesc')}</p>
          <div className="w-[100px] h-[4px] bg-[#C9A870]" />
        </div>
        <img
          src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=400&fit=crop"
          alt=""
          className="absolute top-0 right-0 w-[160px] h-full object-cover opacity-20"
        />
      </div>

      {/* Breadcrumb */}
      <div className="min-h-[40px] bg-[#FDFBF7] px-6 flex items-center">
        <span className="text-[13px] text-[#8B7355]">{t('technology.home')}</span>
        <span className="text-[13px] text-[#666666] mx-2">/</span>
        <span className="text-[13px] text-[#666666]">{t('technology.breadcrumbTech')}</span>
      </div>

      {/* 4 Innovation Cards */}
      <div className="px-5 py-8">
        <div className="grid grid-cols-1 gap-5">
          {innovationCards.map((card, idx) => (
            <div key={idx} className="bg-white rounded-[16px] shadow-[0_8px_32px_rgba(0,0,0,0.08)] overflow-hidden">
              <div className="w-full h-[180px] overflow-hidden">
                <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <div className="px-[14px] py-[5px] bg-[#F5F1EA] text-[#8B7355] text-[10px] font-medium rounded-full inline-block mb-3">{card.tag}</div>
                <h3 className="text-[20px] font-medium text-[#1A1A1A] mb-2">{card.title}</h3>
                <p className="text-[14px] text-[#666666] leading-[1.6] mb-4">{card.description}</p>
                <Link to={card.path} onClick={() => window.scrollTo(0, 0)}>
                  <button className="h-[44px] px-6 bg-[#8B7355] text-white text-[14px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">{card.buttonText}</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Powered Analysis */}
      <div className="bg-[#FDFBF7] px-5 py-6">
        <h3 className="text-[20px] font-medium text-[#1A1A1A] mb-4">{t('technology.aiAnalysis')}</h3>
        <img
          src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=200&fit=crop"
          alt="AI Analysis"
          className="w-full h-[180px] object-cover rounded-xl mb-4"
        />
        <div className="space-y-3 mb-4">
          {[
            { icon: IoFlaskOutline,           title: t('technology.aiBenefits.instantAnalysis'),     desc: t('technology.aiBenefits.instantAnalysisDesc') },
            { icon: IoSparklesOutline,        title: t('technology.aiBenefits.personalizedResults'),  desc: t('technology.aiBenefits.personalizedResultsDesc') },
            { icon: IoCheckmarkCircleOutline, title: t('technology.aiBenefits.expertRecs'),           desc: t('technology.aiBenefits.expertRecsDesc') },
          ].map((benefit, idx) => (
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
          <button className="w-full min-h-[52px] bg-gradient-to-r from-[#8B7355] to-[#A38968] rounded-xl shadow-[0_4px_12px_rgba(139,115,85,0.25)]">
            <span className="text-[15px] font-semibold text-white">{t('technology.tryAI')}</span>
          </button>
        </Link>
      </div>



      {/* Breakthrough Formulations */}
      <div className="bg-gradient-to-b from-[#F5F1EA] to-[#E8E3D9] px-5 py-6">
        <h3 className="text-[20px] font-medium text-[#1A1A1A] mb-4">{t('technology.breakthroughFormulations')}</h3>
        <div className="space-y-3">
          {[
            { title: t('technology.innovations.bioActive'),       desc: t('technology.innovations.bioActiveDesc'),       gradient: 'from-[#E8E3F7] to-[#D5CAE8]' },
            { title: t('technology.innovations.timeRelease'),     desc: t('technology.innovations.timeReleaseDesc'),     gradient: 'from-[#E3F2FD] to-[#CCEAF9]' },
            { title: t('technology.innovations.clinicalTesting'), desc: t('technology.innovations.clinicalTestingDesc'), gradient: 'from-[#E8F5E9] to-[#D4EDD6]' },
          ].map((item, idx) => (
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

      {/* Your Custom Journey */}
      <div className="bg-white px-5 py-6">
        <h3 className="text-[20px] font-medium text-[#1A1A1A] mb-5">{t('technology.customJourney')}</h3>
        <div className="relative">
          {getJourneySteps(t).map((step, idx) => (
            <div key={idx} className="flex gap-4 mb-5 last:mb-0">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-[#C9A870] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-[15px] font-semibold text-white">{idx + 1}</span>
                </div>
                {idx < getJourneySteps(t).length - 1 && <div className="w-0.5 h-10 bg-[#C9A870] opacity-30" />}
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
            <span className="text-[15px] font-semibold text-white">{t('technology.startJourney')}</span>
          </button>
        </Link>
      </div>

      {/* Stats Bar */}
      <div className="bg-gradient-to-r from-[#F5F1EA] to-[#FDFBF7] mx-5 rounded-[16px] py-6 px-4 flex flex-row items-center justify-around mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="flex flex-col items-center text-center">
            <stat.icon className="w-[36px] h-[36px] text-[#8B7355] mb-2" />
            <p className="text-[16px] font-medium text-[#1A1A1A]">{stat.value}</p>
            <p className="text-[11px] text-[#666666] leading-tight max-w-[80px]">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* How It Works */}
      <div className="px-5 pb-8">
        <h2 className="text-[26px] font-medium text-[#1A1A1A] text-center mb-6">{t('technology.howItWorks')}</h2>
        <div className="flex flex-col gap-4">
          {howItWorksSteps.map((step, idx) => (
            <div key={idx} className="bg-white rounded-[12px] border border-[#E8E3D9] shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-5 flex flex-col items-center text-center">
              <img src={step.image} alt={step.title} className="w-[90px] h-[90px] object-cover rounded-[8px] mb-3" />
              <div className="w-[44px] h-[44px] bg-[#8B7355] text-white text-[20px] font-semibold rounded-full flex items-center justify-center mb-3">{step.number}</div>
              <h4 className="text-[17px] font-medium text-[#1A1A1A] mb-2">{step.title}</h4>
              <p className="text-[13px] text-[#666666] leading-[1.6]">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Why Smart Beauty — 6 items from desktop */}
      <div className="px-5 pb-8">
        <h2 className="text-[26px] font-medium text-[#1A1A1A] mb-6">{t('technology.whySmartBeauty')}</h2>
        <div className="grid grid-cols-1 gap-4">
          {desktopBenefits.map((benefit, idx) => (
            <div key={idx} className="bg-white rounded-[12px] border border-[#E8E3D9] shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-5">
              <benefit.icon className="w-[28px] h-[28px] text-[#8B7355] mb-3" />
              <h4 className="text-[16px] font-medium text-[#1A1A1A] mb-2">{benefit.title}</h4>
              <p className="text-[13px] text-[#666666] leading-[1.6]">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#F5F1EA] mx-5 rounded-[16px] px-6 py-8 mb-8 flex flex-col items-center">
        <h3 className="text-[22px] font-medium text-[#1A1A1A] mb-2 text-center">{t('technology.experienceToday')}</h3>
        <p className="text-[13px] text-[#666666] mb-5 text-center">{t('technology.joinThousandsAI')}</p>
        <div className="flex flex-col gap-3 w-full">
          <input type="email" placeholder={t('technology.emailPlaceholder')} className="w-full h-[52px] px-5 bg-white text-[14px] text-[#2B2B2B] rounded-[8px] border border-[#E8E3D9] outline-none" />
          <button className="w-full h-[52px] bg-[#8B7355] text-white text-[14px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">{t('technology.getStarted')}</button>
        </div>
      </div>

    </div>
  )
}

// ─── Desktop + Tablet responsive ─────────────────────────────────────────────
function TechnologyDesktop() {
  const { t } = useTranslation()
  const innovationCards = getInnovationCards(t)
  const stats = getStats(t)
  const howItWorksSteps = getHowItWorksSteps(t)
  const desktopBenefits = getDesktopBenefits(t)
  return (
    <div className="bg-white font-['Cormorant_Garamond']">

      {/* Hero */}
      <div className="min-h-[340px] md:min-h-[420px] lg:min-h-[520px] bg-gradient-to-b from-[#FDFBF7] to-[#F5F1EA] relative overflow-hidden flex items-center px-6 md:px-[60px] lg:px-[120px] py-10 md:py-0">
        <div className="w-full md:w-[500px] lg:w-[650px] relative z-10">
          <p className="text-[12px] md:text-[13px] lg:text-[14px] font-light italic text-[#8B7355] tracking-[2px] mb-3">{t('technology.advancedTech')}</p>
          <h1 className="text-[48px] md:text-[64px] lg:text-[80px] font-bold text-[#1A1A1A] leading-[1] mb-4 lg:mb-6">{t('technology.desktopHeroTitle')}</h1>
          <p className="text-[15px] md:text-[17px] lg:text-[20px] font-normal text-[#666666] mb-6 lg:mb-8">{t('technology.desktopHeroDesc')}</p>
          <div className="w-[100px] md:w-[120px] lg:w-[140px] h-[4px] bg-[#C9A870]" />
        </div>
        <div className="hidden lg:block absolute right-[180px] top-1/2 -translate-y-1/2">
          <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=400&fit=crop" alt="" className="w-[400px] h-[400px] object-cover rounded-[8px] shadow-[0_12px_48px_rgba(0,0,0,0.12)]" />
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="min-h-[48px] bg-[#FDFBF7] px-6 md:px-[60px] lg:px-[120px] flex items-center">
        <span className="text-[13px] lg:text-[15px] text-[#8B7355] cursor-pointer">{t('technology.home')}</span>
        <span className="text-[13px] lg:text-[15px] text-[#666666] mx-2">/</span>
        <span className="text-[13px] lg:text-[15px] text-[#666666]">{t('technology.breadcrumbTech')}</span>
      </div>

      {/* Main Content */}
      <div className="px-6 md:px-[60px] lg:px-[120px] py-10 md:py-12 lg:py-[64px]">

        {/* Innovation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-[32px] mb-10 md:mb-14 lg:mb-[64px]">
          {innovationCards.map((card, idx) => (
            <div key={idx} className="bg-white rounded-[16px] shadow-[0_8px_32px_rgba(0,0,0,0.08)] overflow-hidden hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] transition-all duration-300">
              <div className="w-full h-[200px] md:h-[240px] lg:h-[280px] overflow-hidden">
                <img src={card.image} alt={card.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5 md:p-6 lg:p-[32px]">
                <div className="px-[14px] lg:px-[16px] py-[5px] lg:py-[6px] bg-[#F5F1EA] text-[#8B7355] text-[10px] lg:text-[11px] font-medium rounded-full inline-block mb-3">{card.tag}</div>
                <h3 className="text-[20px] md:text-[24px] lg:text-[28px] font-medium text-[#1A1A1A] mb-3">{card.title}</h3>
                <p className="text-[14px] lg:text-[16px] text-[#666666] leading-[1.6] mb-4">{card.description}</p>
                <Link to={card.path} onClick={() => window.scrollTo(0, 0)}>
                  <button className="h-[44px] lg:h-[48px] px-6 lg:px-[32px] bg-[#8B7355] text-white text-[14px] lg:text-[15px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">{card.buttonText}</button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="min-h-[100px] lg:min-h-[120px] bg-gradient-to-r from-[#F5F1EA] to-[#FDFBF7] rounded-[16px] flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-[96px] mb-10 md:mb-14 lg:mb-[64px] py-6 lg:py-0">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <stat.icon className="w-[36px] h-[36px] md:w-[40px] md:h-[40px] lg:w-[48px] lg:h-[48px] text-[#8B7355] mb-2 lg:mb-3" />
              <p className="text-[18px] md:text-[20px] lg:text-[24px] font-medium text-[#1A1A1A] mb-1">{stat.value}</p>
              <p className="text-[13px] lg:text-[15px] text-[#666666]">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <div className="bg-white pt-8 md:pt-10 lg:pt-[64px] mb-10 md:mb-14 lg:mb-[64px]">
          <h2 className="text-[28px] md:text-[36px] lg:text-[48px] font-medium text-[#1A1A1A] text-center mb-10 lg:mb-[56px]">{t('technology.howItWorks')}</h2>
          <div className="flex flex-col md:flex-row justify-center gap-5 md:gap-6 lg:gap-[48px]">
            {howItWorksSteps.map((step, idx) => (
              <div key={idx} className="w-full md:flex-1 lg:w-[360px] lg:flex-none bg-white rounded-[12px] border border-[#E8E3D9] shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-5 lg:p-[24px]">
                <div className="flex justify-center mb-4">
                  <img src={step.image} alt={step.title} className="w-[90px] h-[90px] lg:w-[120px] lg:h-[120px] object-cover rounded-[8px]" />
                </div>
                <div className="flex justify-center mb-3">
                  <div className="w-[40px] h-[40px] lg:w-[48px] lg:h-[48px] bg-[#8B7355] text-white text-[20px] lg:text-[24px] font-semibold rounded-full flex items-center justify-center">{step.number}</div>
                </div>
                <h4 className="text-[17px] lg:text-[20px] font-medium text-[#1A1A1A] text-center mb-2">{step.title}</h4>
                <p className="text-[13px] lg:text-[15px] text-[#666666] text-center leading-[1.6]">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-[24px] mb-10 md:mb-14 lg:mb-[64px]">
          {desktopBenefits.map((benefit, idx) => (
            <div key={idx} className="bg-white rounded-[12px] border border-[#E8E3D9] shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-5 lg:p-[24px] hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)] transition-all duration-300">
              <benefit.icon className="w-[26px] h-[26px] lg:w-[32px] lg:h-[32px] text-[#8B7355] mb-3 lg:mb-4" />
              <h4 className="text-[16px] lg:text-[20px] font-medium text-[#1A1A1A] mb-2">{benefit.title}</h4>
              <p className="text-[13px] lg:text-[15px] text-[#666666] leading-[1.6]">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="min-h-[120px] lg:min-h-[140px] bg-[#F5F1EA] rounded-[16px] flex flex-col items-center justify-center px-6 md:px-10 lg:px-[64px] py-8 lg:py-0 mb-10 md:mb-14 lg:mb-[64px]">
          <h3 className="text-[22px] md:text-[26px] lg:text-[32px] font-medium text-[#1A1A1A] mb-2 text-center">{t('technology.experienceToday')}</h3>
          <p className="text-[13px] lg:text-[16px] text-[#666666] mb-5 lg:mb-6 text-center">{t('technology.joinThousandsAI')}</p>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <input type="email" placeholder={t('technology.emailPlaceholder')} className="w-full sm:w-[280px] lg:w-[360px] h-[52px] lg:h-[56px] px-5 bg-white text-[14px] lg:text-[15px] text-[#2B2B2B] rounded-[8px] border border-[#E8E3D9] outline-none" />
            <button className="w-full sm:w-auto h-[52px] lg:h-[56px] px-8 lg:px-[32px] bg-[#8B7355] text-white text-[14px] lg:text-[15px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">{t('technology.getStarted')}</button>
          </div>
        </div>

      </div>
    </div>
  )
}

// ─── Main Export (Switcher) ───────────────────────────────────────────────────
export default function Technology() {
  const { i18n } = useTranslation()
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return isMobile ? <TechnologyMobile key={i18n.language} /> : <TechnologyDesktop key={i18n.language} />
}