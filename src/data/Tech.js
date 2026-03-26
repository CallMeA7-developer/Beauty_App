// ─────────────────────────────────────────────────────────────────────────────
// src/data/technology.js
// Shared data for Technology & AI pages.
// When Bolt connects real AI APIs, replace these with live data.
// ─────────────────────────────────────────────────────────────────────────────

// ─── SKIN METRICS (used in SkinAnalysis + AIskinConsultant) ──────────────────
export const skinMetrics = [
  { label: 'Hydration', value: 92 },
  { label: 'Clarity',   value: 85 },
  { label: 'Texture',   value: 78 },
  { label: 'Tone',      value: 81 },
]

// ─── ANALYSIS CATEGORIES (used in SkinAnalysis + AIskinConsultant) ───────────
export const skinAnalysisCategories = [
  { image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=340&h=120&fit=crop', title: 'Skin Type',       desc: 'Accurate type determination'    },
  { image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=340&h=120&fit=crop',   title: 'Hydration',       desc: 'Moisture content analysis'      },
  { image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=340&h=120&fit=crop', title: 'Texture & Pores', desc: 'Smoothness evaluation'           },
  { image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=340&h=120&fit=crop', title: 'Pigmentation',   desc: 'Tone distribution'               },
  { image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=340&h=120&fit=crop', title: 'Fine Lines',     desc: 'Aging signs detection'           },
  { image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=340&h=120&fit=crop', title: 'Acne',           desc: 'Problem area identification'     },
  { image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=340&h=120&fit=crop', title: 'Sensitivity',   desc: 'Reactivity assessment'           },
  { image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=340&h=120&fit=crop', title: 'UV Damage',     desc: 'Environmental impact'            },
]

// ─── PROCESS STEPS (shared between SkinAnalysis + AIskinConsultant) ──────────
export const aiProcessSteps = [
  { number: '1', image: 'https://images.unsplash.com/photo-1611349411198-e26e0d5f4a52?w=80&h=80&fit=crop', title: 'Upload & Scan',  desc: 'Take clear photo in natural light'  },
  { number: '2', image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=80&h=80&fit=crop', title: 'AI Processing', desc: 'Algorithms analyze data points'      },
  { number: '3', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=80&h=80&fit=crop',   title: 'Expert Review', desc: 'Dermatologist validates findings'    },
  { number: '4', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=80&h=80&fit=crop',   title: 'Receive Plan',  desc: 'Get personalized routine'           },
]

// Desktop version (larger images)
export const aiProcessStepsDesktop = aiProcessSteps.map(s => ({
  ...s,
  image:       s.image.replace('w=80&h=80', 'w=120&h=120'),
  description: s.desc,
}))

// ─── PRICING PLANS (AIskinConsultant) ────────────────────────────────────────
export const pricingPlans = [
  {
    name: 'Basic',    price: 'Free', period: null,     badge: '',
    features: ['AI photo analysis', 'Basic skin assessment', 'Product recommendations', 'Limited feature access'],
    buttonStyle: 'secondary', buttonText: 'Get Started Free',
  },
  {
    name: 'Premium',  price: '$49',  period: '/month', badge: 'MOST POPULAR',
    features: ['All basic features', 'Detailed analysis report', 'Expert review', 'Progress tracking', 'Priority support'],
    buttonStyle: 'primary',   buttonText: 'Choose Premium',
  },
  {
    name: 'Platinum', price: '$149', period: '/month', badge: '',
    features: ['All premium features', 'Live video consultation', 'Personalized treatment plan', 'Monthly follow-ups', 'VIP product access'],
    buttonStyle: 'secondary', buttonText: 'Choose Platinum',
  },
]

// ─── AI CONSULTANT FAQS ───────────────────────────────────────────────────────
export const aiConsultantFaqs = [
  { question: 'How accurate is AI skin analysis?',         answer: 'Our AI technology has been validated against dermatologist assessments with 98% accuracy. It analyzes millions of data points using advanced computer vision.' },
  { question: 'What happens during a live consultation?',  answer: 'You will meet with a certified skincare specialist via video for 30–60 minutes to discuss your skin concerns, review your analysis, and create a personalized treatment plan.' },
  { question: 'How long until I see results?',             answer: 'Most users notice visible improvements within 4–6 weeks of consistently following their personalized routine.' },
  { question: 'Can I consult with the same expert again?', answer: 'Yes! Premium and Platinum members can request their preferred consultant for all follow-up sessions.' },
  { question: "What if I'm not satisfied?",                answer: "We offer a 30-day satisfaction guarantee. If you're not happy, we'll provide a full refund or complimentary re-consultation." },
]

// ─── SKIN ANALYSIS FAQS ───────────────────────────────────────────────────────
export const skinAnalysisFaqs = [
  { q: 'How accurate is the AI skin analysis?',             a: 'Our AI technology analyzes skin with 98% accuracy, validated by dermatologists and based on millions of skin scans.' },
  { q: 'How often should I get analyzed?',                  a: 'We recommend monthly analysis to track improvements and adjust your skincare routine as needed.' },
  { q: 'Is my data private and secure?',                    a: 'Absolutely. All images and data are encrypted and never shared with third parties. Your privacy is our priority.' },
  { q: 'Does the analysis cost anything?',                  a: 'The basic analysis is complimentary. Premium features include expert consultations and advanced tracking.' },
  { q: 'Can I use recommended products from other brands?', a: 'While we recommend our scientifically formulated products, the analysis results can guide any skincare choice.' },
  { q: 'How long until I see results?',                     a: 'Most users notice improvements within 4-6 weeks of following their personalized routine consistently.' },
]

// ─── TECHNOLOGY PAGE ─────────────────────────────────────────────────────────
export const technologyTestimonials = [
  { photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop', quote: 'The AI consultation transformed my skincare routine. Results in just 2 weeks!', name: 'Sarah Chen',  tech: 'AI Consultation'  },
  { photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop', quote: 'AR try-on helped me find my perfect shade. Shopping has never been easier.',    name: 'Emma Wilson', tech: 'AR Virtual Mirror' },
]

export const technologyStats = [
  { value: '98% Accuracy',   label: 'AI-Powered Analysis'    },
  { value: '10M+ Scans',     label: 'Trusted Worldwide'       },
  { value: 'Patent-Pending', label: 'Innovative Technology'   },
]

export const journeySteps = [
  { title: 'Skin Assessment',   desc: 'AI-powered comprehensive analysis'      },
  { title: 'Product Match',     desc: 'Intelligent product recommendations'    },
  { title: 'Routine Building',  desc: 'Custom daily skincare regimen'          },
  { title: 'Progress Tracking', desc: 'Monitor improvements over time'         },
]

// ─── VIRTUAL TRY-ON ───────────────────────────────────────────────────────────
export const tryOnCategoryTabs = ['Lips', 'Eyes', 'Face', 'Cheeks', 'Brows']

export const tryOnProducts = [
  { image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=360&h=360&fit=crop', brand: 'Shan Loray', name: 'Velvet Matte Lipstick',  shade: 'Ruby Rose',      price: '$48', reviews: 342 },
  { image: 'https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=360&h=360&fit=crop', brand: 'Shan Loray', name: 'Silk Eyeshadow Palette', shade: 'Golden Hour',    price: '$89', reviews: 521 },
  { image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=360&h=360&fit=crop', brand: 'Shan Loray', name: 'Luminous Foundation',    shade: 'Warm Ivory',     price: '$68', reviews: 467 },
  { image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=360&h=360&fit=crop', brand: 'Shan Loray', name: 'Cream Blush',            shade: 'Dusty Rose',     price: '$42', reviews: 298 },
  { image: 'https://images.unsplash.com/photo-1596704017254-9b121068ec31?w=360&h=360&fit=crop', brand: 'Shan Loray', name: 'Glossy Lip Lacquer',     shade: 'Berry Shimmer',  price: '$38', reviews: 412 },
  { image: 'https://images.unsplash.com/photo-1625337439095-0b45185b3644?w=360&h=360&fit=crop', brand: 'Shan Loray', name: 'Precision Eyeliner',     shade: 'Midnight Black', price: '$32', reviews: 367 },
]

export const tryOnShades = [
  { color: '#8B2E3C', name: 'Ruby Rose'  },
  { color: '#C9806B', name: 'Nude Beige' },
  { color: '#D4758E', name: 'Pink Pearl' },
  { color: '#922B3E', name: 'Deep Wine'  },
  { color: '#BC6A7A', name: 'Rose Petal' },
]

// ─── BEAUTY JOURNEY ───────────────────────────────────────────────────────────
export const beautyJourneyStats = [
  { label: 'Days Active',      value: '47'  },
  { label: 'Skin Score',       value: '87'  },
  { label: 'Products Used',    value: '12'  },
  { label: 'Routine Streak',   value: '14d' },
]

export const skinProfile = {
  type:         'Combination',
  concerns:     ['Fine Lines', 'Hydration', 'Dark Spots'],
  sensitivity:  'Low',
  score:        87,
  lastAnalyzed: 'Dec 15, 2024',
}

// ─── AI CONSULTANT TESTIMONIALS ───────────────────────────────────────────────
export const aiTestimonials = [
  { beforeImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=180&h=200&fit=crop', afterImage: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=180&h=200&fit=crop', name: 'Sarah Mitchell',    age: 34, type: 'Premium Plan',  quote: 'The AI analysis was incredibly accurate!',      timeline: 'After 8 weeks'  },
  { beforeImage: 'https://images.unsplash.com/photo-1611349411198-e26e0d5f4a52?w=180&h=200&fit=crop', afterImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=180&h=200&fit=crop', name: 'Emily Chen',        age: 29, type: 'AI Analysis',   quote: 'Finally found products that work!',              timeline: 'After 6 weeks'  },
  { beforeImage: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=180&h=200&fit=crop', afterImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=180&h=200&fit=crop',   name: 'Jessica Rodriguez', age: 42, type: 'Live Expert',  quote: 'Worth every penny. Concerns addressed.',         timeline: 'After 12 weeks' },
]