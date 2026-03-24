import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
  IoCameraOutline,
  IoShareSocialOutline,
  IoDownloadOutline,
  IoCheckmarkCircle,
  IoStarSharp,
  IoPlayCircle,
  IoAlbumsOutline,
  IoColorPaletteOutline,
  IoSparklesOutline,
  IoFlashOutline,
  IoHeartOutline,
  IoLogoInstagram,
  IoLogoFacebook,
  IoLogoPinterest,
  IoLogoWhatsapp,
  IoChevronBack,
  IoInformationCircleOutline,
  IoImagesOutline,
  IoSyncOutline,
  IoSwapHorizontalOutline,
  IoCloseCircle,
  IoCameraSharp,
  IoBulbOutline,
  IoHomeOutline,
  IoPersonOutline,
} from 'react-icons/io5'

// ─── Shared Data ──────────────────────────────────────────────────────────────
const categoryTabs   = ['Lips', 'Eyes', 'Face', 'Cheeks', 'Brows']
const productsData   = [
  { image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=360&h=360&fit=crop', brand: 'Shan Loray', name: 'Velvet Matte Lipstick',  shade: 'Ruby Rose',      price: '$48', reviews: 342 },
  { image: 'https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=360&h=360&fit=crop', brand: 'Shan Loray', name: 'Silk Eyeshadow Palette', shade: 'Golden Hour',    price: '$89', reviews: 521 },
  { image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=360&h=360&fit=crop', brand: 'Shan Loray', name: 'Luminous Foundation',    shade: 'Warm Ivory',     price: '$68', reviews: 467 },
  { image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=360&h=360&fit=crop', brand: 'Shan Loray', name: 'Cream Blush',            shade: 'Dusty Rose',     price: '$42', reviews: 298 },
  { image: 'https://images.unsplash.com/photo-1596704017254-9b121068ec31?w=360&h=360&fit=crop', brand: 'Shan Loray', name: 'Glossy Lip Lacquer',     shade: 'Berry Shimmer',  price: '$38', reviews: 412 },
  { image: 'https://images.unsplash.com/photo-1625337439095-0b45185b3644?w=360&h=360&fit=crop', brand: 'Shan Loray', name: 'Precision Eyeliner',     shade: 'Midnight Black', price: '$32', reviews: 367 },
]

// Mobile-specific data
const mobileProducts = [
  { image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=140&h=140&fit=crop', name: 'Velvet Matte Lipstick', shade: 'Ruby Rose',   applied: true },
  { image: 'https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=140&h=140&fit=crop', name: 'Silk Cream Lipstick',   shade: 'Nude Beige',  applied: false },
  { image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=140&h=140&fit=crop', name: 'Glossy Lip Lacquer',    shade: 'Pink Pearl',  applied: false },
]
const shades = [
  { color: '#8B2E3C', name: 'Ruby Rose' },
  { color: '#C9806B', name: 'Nude Beige' },
  { color: '#D4758E', name: 'Pink Pearl' },
  { color: '#922B3E', name: 'Deep Wine' },
  { color: '#BC6A7A', name: 'Rose Petal' },
]
const appliedProducts = [
  { image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=48&h=48&fit=crop', name: 'Ruby Rose Lipstick',  price: '$48' },
  { image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=48&h=48&fit=crop', name: 'Dusty Rose Blush',    price: '$42' },
]

// ─── Mobile ───────────────────────────────────────────────────────────────────
function VirtualTryOnMobile() {
  const [activeCategory, setActiveCategory] = useState(0)
  const [activeShade, setActiveShade]       = useState(0)
  const [intensity, setIntensity]           = useState(75)

  return (
    <div className="w-full min-h-screen bg-white font-['Cormorant_Garamond'] flex flex-col">

      {/* Gold Header */}
      <div className="min-h-[64px] bg-gradient-to-r from-[#C9A870] to-[#B89660] px-5 flex items-center justify-between shadow-[0_2px_8px_rgba(0,0,0,0.08)] flex-shrink-0">
        <button className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center">
          <IoChevronBack className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-[18px] font-semibold text-white">Virtual Mirror</h1>
        <button className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center">
          <IoInformationCircleOutline className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* AR Mirror */}
      <div className="relative bg-gradient-to-b from-[#F5F1EA] to-[#E8E3D9]" style={{ height: '55vw', minHeight: 260, maxHeight: 380 }}>
        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#C9A870] z-10" />
        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#C9A870] z-10" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#C9A870] z-10" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#C9A870] z-10" />

        {/* Camera preview */}
        <img
          src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=440&h=380&fit=crop"
          alt="AR Mirror"
          className="w-full h-full object-cover"
        />

        {/* Face detection oval */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[45%] h-[80%] border-2 border-[#8B7355]/30 rounded-[40%]" />
        </div>

        {/* Floating action bar */}
        <div className="absolute top-3 left-4 right-4 h-[52px] bg-white/90 backdrop-blur-sm rounded-full px-4 flex items-center justify-around shadow-[0_4px_16px_rgba(0,0,0,0.12)]">
          {[IoImagesOutline, IoFlashOutline, IoSyncOutline, IoSwapHorizontalOutline].map((Icon, i) => (
            <button key={i} className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm">
              <Icon className="w-4 h-4 text-[#8B7355]" />
            </button>
          ))}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="bg-white px-4 py-3 border-b border-[#E8E3D9] flex-shrink-0">
        <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {categoryTabs.map((cat, idx) => (
            <button key={cat} onClick={() => setActiveCategory(idx)}
              className={`min-w-[80px] h-10 rounded-full text-[13px] font-medium flex-shrink-0 transition-all ${
                activeCategory === idx ? 'bg-[#8B7355] text-white shadow-[0_2px_8px_rgba(139,115,85,0.25)]' : 'bg-white text-[#666666] border border-[#E8E3D9]'
              }`}>{cat}</button>
          ))}
        </div>
      </div>

      {/* Product Selector */}
      <div className="bg-white px-5 py-4 flex-shrink-0">
        <div className="w-16 h-1 bg-[#E8E3D9] rounded-full mx-auto mb-4" />
        <h3 className="text-[17px] font-medium text-[#1A1A1A] mb-4">Select Shade</h3>
        <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
          {mobileProducts.map((product, idx) => (
            <div key={idx} className="min-w-[130px] bg-white border border-[#E8E3D9] rounded-lg p-3 flex-shrink-0 relative shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
              <img src={product.image} alt={product.name} className="w-[100px] h-[100px] object-cover rounded-lg mb-2" />
              <p className="text-[12px] font-normal text-[#666666] mb-0.5 leading-tight">{product.name}</p>
              <p className="text-[13px] font-medium text-[#1A1A1A]">{product.shade}</p>
              {product.applied && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-[#8B7355] rounded-full flex items-center justify-center">
                  <IoCheckmarkCircle className="w-5 h-5 text-white" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Shade Picker */}
      <div className="bg-[#F5F1EA] px-5 py-4 flex-shrink-0">
        <h4 className="text-[15px] font-medium text-[#1A1A1A] mb-4">Choose Your Shade</h4>
        <div className="flex gap-4 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {shades.map((shade, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2 flex-shrink-0">
              <button onClick={() => setActiveShade(idx)}
                className={`w-10 h-10 rounded-full transition-all ${activeShade === idx ? 'ring-2 ring-[#8B7355] ring-offset-2' : ''}`}
                style={{ backgroundColor: shade.color }}
              />
              <span className="text-[11px] text-[#666666]">{shade.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Intensity Slider */}
      <div className="bg-white px-5 py-4 flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[15px] font-medium text-[#1A1A1A]">Adjust Intensity</span>
          <span className="text-[15px] font-semibold text-[#8B7355]">{intensity}%</span>
        </div>
        <div className="relative w-full h-2 bg-[#E8E3D9] rounded-full mb-2">
          <div className="absolute h-full bg-[#8B7355] rounded-full" style={{ width: `${intensity}%` }} />
          <div className="absolute w-6 h-6 bg-white border-2 border-[#8B7355] rounded-full top-1/2 -translate-y-1/2 -translate-x-1/2 shadow-sm" style={{ left: `${intensity}%` }} />
        </div>
        <div className="flex justify-between">
          <span className="text-[11px] text-[#999999]">Light</span>
          <span className="text-[11px] text-[#999999]">Full</span>
        </div>
      </div>

      {/* Applied Products */}
      <div className="bg-[#FDFBF7] px-5 py-4 flex-shrink-0">
        <h4 className="text-[15px] font-medium text-[#1A1A1A] mb-4">Applied Products</h4>
        <div className="space-y-2">
          {appliedProducts.map((product, idx) => (
            <div key={idx} className="h-14 bg-white rounded-lg flex items-center gap-3 px-3 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
              <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded" />
              <span className="text-[13px] font-normal text-[#1A1A1A] flex-1">{product.name}</span>
              <button><IoCloseCircle className="w-5 h-5 text-[#8B7355]" /></button>
            </div>
          ))}
        </div>
      </div>

      {/* Save / Take Photo */}
      <div className="bg-gradient-to-b from-[#FDFBF7] to-[#F5F1EA] px-5 py-4 flex gap-3 flex-shrink-0">
        <button className="flex-1 h-14 bg-white border-2 border-[#8B7355] rounded-full flex items-center justify-center gap-2">
          <IoHeartOutline className="w-5 h-5 text-[#8B7355]" />
          <span className="text-[14px] font-medium text-[#8B7355]">Save Look</span>
        </button>
        <button className="flex-1 h-14 bg-[#8B7355] rounded-full flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(139,115,85,0.25)]">
          <IoCameraSharp className="w-5 h-5 text-white" />
          <span className="text-[14px] font-medium text-white">Take Photo</span>
        </button>
      </div>

      {/* Share Panel */}
      <div className="bg-white px-5 py-4 flex-shrink-0">
        <h4 className="text-[17px] font-medium text-[#1A1A1A] mb-4">Share Your Look</h4>
        <div className="flex items-center justify-around mb-4">
          {[IoLogoInstagram, IoLogoFacebook, IoLogoPinterest, IoLogoWhatsapp].map((Icon, idx) => (
            <button key={idx} className="w-11 h-11 bg-[#8B7355] rounded-full flex items-center justify-center shadow-[0_2px_8px_rgba(139,115,85,0.2)]">
              <Icon className="w-5 h-5 text-white" />
            </button>
          ))}
        </div>
        <button className="w-full h-10 bg-white border border-[#E8E3D9] rounded-lg flex items-center justify-center gap-2">
          <IoDownloadOutline className="w-4 h-4 text-[#666666]" />
          <span className="text-[13px] font-medium text-[#666666]">Copy Link</span>
        </button>
      </div>

      {/* Add to Cart */}
      <div className="bg-[#FDFBF7] px-5 py-4 flex-shrink-0">
        <div className="flex gap-3 overflow-x-auto mb-3" style={{ scrollbarWidth: 'none' }}>
          {appliedProducts.map((product, idx) => (
            <div key={idx} className="min-w-[170px] bg-white rounded-lg p-3 flex items-center gap-3 flex-shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
              <img src={product.image} alt={product.name} className="w-14 h-14 object-cover rounded" />
              <div className="flex-1">
                <p className="text-[12px] font-normal text-[#1A1A1A] mb-1 leading-tight">{product.name}</p>
                <p className="text-[15px] font-semibold text-[#1A1A1A] mb-2">{product.price}</p>
                <button className="w-full h-8 bg-white border border-[#8B7355] rounded text-[12px] font-medium text-[#8B7355]">Add</button>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full h-12 bg-gradient-to-r from-[#8B7355] to-[#A38968] rounded-lg shadow-[0_4px_12px_rgba(139,115,85,0.25)]">
          <span className="text-[14px] font-medium text-white">Add All to Cart</span>
        </button>
      </div>

      {/* Pro Tips fab */}
      <div className="fixed bottom-20 right-4 w-12 h-12 bg-[#F5F1EA] rounded-full flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.12)] z-20">
        <IoBulbOutline className="w-6 h-6 text-[#8B7355]" />
      </div>

      {/* Bottom Nav */}
      <div className="min-h-[64px] bg-white border-t border-[#E8E3D9] flex items-center justify-around px-4 flex-shrink-0">
        <button className="flex flex-col items-center gap-1">
          <IoHomeOutline className="w-6 h-6 text-[#BDBDBD]" />
          <span className="text-[11px] text-[#BDBDBD]">Home</span>
        </button>
        <button className="flex flex-col items-center gap-1">
          <IoCameraOutline className="w-6 h-6 text-[#8B7355]" />
          <span className="text-[11px] text-[#8B7355]">Try-On</span>
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

// ─── Desktop + Tablet responsive ─────────────────────────────────────────────
function VirtualTryOnDesktop() {
  const savedLooks = [
    { date: 'Dec 20, 2024', products: '5 Products', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=280&h=280&fit=crop' },
    { date: 'Dec 15, 2024', products: '4 Products', image: 'https://images.unsplash.com/photo-1611349411198-e26e0d5f4a52?w=280&h=280&fit=crop' },
    { date: 'Dec 10, 2024', products: '6 Products', image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=280&h=280&fit=crop' },
    { date: 'Dec 5, 2024',  products: '3 Products', image: 'https://images.unsplash.com/photo-1556740772-1a741367b93e?w=280&h=280&fit=crop' },
  ]
  const trendingLooks = [
    { image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=380&h=460&fit=crop', creator: 'Sarah Chen',    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=48&h=48&fit=crop', desc: 'Natural Glow Makeup',  products: 5, hearts: 1234, shares: 89  },
    { image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=380&h=460&fit=crop', creator: 'Emma Wilson',   avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=48&h=48&fit=crop', desc: 'Bold Evening Look',    products: 7, hearts: 2156, shares: 143 },
    { image: 'https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?w=380&h=460&fit=crop', creator: 'Olivia Taylor', avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=48&h=48&fit=crop', desc: 'Soft Romantic Style',  products: 4, hearts: 987,  shares: 67  },
  ]
  const howItWorksSteps = [
    { number: '1', title: 'Choose Method',   desc: 'Camera or upload photo',   image: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=120&h=120&fit=crop' },
    { number: '2', title: 'Select Products', desc: 'Browse & test virtually',  image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=120&h=120&fit=crop' },
    { number: '3', title: 'Save & Share',    desc: 'Keep your favorite looks', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=120&h=120&fit=crop' },
  ]
  const proTips = [
    { icon: IoFlashOutline,        title: 'Best Lighting',  desc: 'Use natural daylight for accurate color matching' },
    { icon: IoCameraOutline,       title: 'Face Position',  desc: 'Center your face and maintain neutral expression'  },
    { icon: IoSparklesOutline,     title: 'Clean Skin',     desc: 'Remove makeup for best AR tracking'                },
    { icon: IoColorPaletteOutline, title: 'Try Multiple',   desc: 'Test various shades to find perfect match'         },
    { icon: IoAlbumsOutline,       title: 'Save Favorites', desc: 'Create collections of looks you love'              },
  ]
  const recommendedProducts = [
    { image: 'https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=300&h=300&fit=crop', name: 'Luxury Lipstick Set', match: '95% Match', price: '$125' },
    { image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=300&h=300&fit=crop', name: 'Blush Palette Pro',   match: '92% Match', price: '$78'  },
    { image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=300&h=300&fit=crop', name: 'Eye Shadow Deluxe',   match: '90% Match', price: '$98'  },
  ]
  const Stars = () => [...Array(5)].map((_, i) => <IoStarSharp key={i} className="w-[14px] h-[14px] text-[#C9A870]" />)

  return (
    <div className="bg-white font-['Cormorant_Garamond']">

      {/* Hero */}
      <div className="min-h-[340px] md:min-h-[420px] lg:min-h-[520px] bg-gradient-to-b from-[#FDFBF7] to-[#F5F1EA] relative overflow-hidden flex items-center px-6 md:px-[60px] lg:px-[120px] py-10 md:py-0">
        <div className="w-full md:w-[500px] lg:w-[650px] relative z-10">
          <p className="text-[12px] md:text-[13px] lg:text-[14px] font-light italic text-[#8B7355] tracking-[2px] mb-3">AR-POWERED VIRTUAL TRY-ON</p>
          <h1 className="text-[44px] md:text-[60px] lg:text-[80px] font-bold text-[#1A1A1A] leading-[1] mb-4 lg:mb-6">Try Before You Buy</h1>
          <p className="text-[14px] md:text-[17px] lg:text-[20px] font-normal text-[#666666] mb-6 lg:mb-8">Experience luxury beauty products virtually with advanced AR technology</p>
          <div className="w-[100px] md:w-[120px] lg:w-[140px] h-[4px] bg-[#C9A870]" />
        </div>
        <div className="hidden lg:block absolute right-[180px] top-1/2 -translate-y-1/2">
          <img src="https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=400&h=400&fit=crop" alt="" className="w-[400px] h-[400px] object-cover rounded-[8px] shadow-[0_12px_48px_rgba(0,0,0,0.12)]" />
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="min-h-[48px] bg-[#FDFBF7] px-4 md:px-[60px] lg:px-[120px] flex items-center overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        <span className="text-[13px] lg:text-[15px] text-[#8B7355] cursor-pointer whitespace-nowrap">Home</span>
        <span className="text-[13px] lg:text-[15px] text-[#666666] mx-2">/</span>
        <span className="hidden sm:inline text-[13px] lg:text-[15px] text-[#8B7355] cursor-pointer whitespace-nowrap">Technology</span>
        <span className="hidden sm:inline text-[13px] lg:text-[15px] text-[#666666] mx-2">/</span>
        <span className="text-[13px] lg:text-[15px] text-[#666666] whitespace-nowrap">Virtual Try-On</span>
      </div>

      {/* Live Try-On */}
      <div id="tryon-section" className="px-4 md:px-[60px] lg:px-[120px] py-10 md:py-12 lg:py-[64px] bg-white">
        <h2 className="text-[26px] md:text-[36px] lg:text-[48px] font-medium text-[#1A1A1A] text-center mb-3">Start Your Virtual Try-On</h2>
        <p className="text-[13px] md:text-[15px] lg:text-[16px] text-[#666666] text-center mb-10 lg:mb-[56px]">Choose your preferred method to begin</p>
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-[32px] items-start justify-center">
          <div className="w-full lg:w-[800px]">
            <div className="min-h-[320px] md:min-h-[420px] lg:min-h-[500px] bg-gradient-to-b from-[#F5F1EA] to-white rounded-[16px] flex flex-col items-center justify-center mb-5 py-8 lg:py-0">
              <IoCameraOutline className="w-[56px] h-[56px] md:w-[68px] md:h-[68px] lg:w-[80px] lg:h-[80px] text-[#8B7355] mb-6" />
              <h3 className="text-[18px] md:text-[20px] lg:text-[24px] font-medium text-[#1A1A1A] mb-3">Ready to Try On</h3>
              <p className="text-[13px] lg:text-[15px] text-[#666666] mb-8 text-center px-4">Position your face in the frame to begin</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="w-full sm:w-[180px] lg:w-[200px] h-[48px] lg:h-[56px] bg-[#8B7355] text-white text-[14px] lg:text-[15px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">Launch Camera Try-On</button>
                <button className="w-full sm:w-[160px] lg:w-[200px] h-[48px] lg:h-[56px] bg-white border-2 border-[#8B7355] text-[#8B7355] text-[14px] lg:text-[15px] font-medium rounded-[8px] hover:bg-[#F5F1EA] transition-colors">Upload Photo</button>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-[320px]">
            <div className="bg-white rounded-[12px] border border-[#E8E3D9] shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-5 lg:p-[24px]">
              <h4 className="text-[16px] lg:text-[18px] font-medium text-[#1A1A1A] mb-4 lg:mb-5">Select Products</h4>
              <div className="grid grid-cols-3 lg:grid-cols-1 gap-3">
                {[
                  { image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=80&h=80&fit=crop', name: 'Ruby Lipstick'  },
                  { image: 'https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=80&h=80&fit=crop', name: 'Gold Eyeshadow' },
                  { image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=80&h=80&fit=crop', name: 'Rose Blush'     },
                ].map((product, idx) => (
                  <div key={idx} className="flex flex-col lg:flex-row items-center gap-2 lg:gap-3 p-2 lg:p-3 bg-[#F5F1EA] rounded-[8px] cursor-pointer hover:bg-[#ebe6dc] transition-colors">
                    <img src={product.image} alt={product.name} className="w-[60px] h-[60px] lg:w-[80px] lg:h-[80px] object-cover rounded-[6px] flex-shrink-0" />
                    <span className="text-[12px] lg:text-[14px] text-[#1A1A1A] text-center lg:text-left">{product.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="px-4 md:px-[60px] lg:px-[120px] py-6 lg:py-[32px] bg-[#FDFBF7] flex items-center justify-center overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        <div className="flex gap-3 md:gap-4 lg:gap-[24px]">
          {categoryTabs.map((tab, idx) => (
            <button key={tab} className={`w-[120px] md:w-[150px] lg:w-[180px] h-[48px] md:h-[56px] lg:h-[64px] rounded-[12px] text-[13px] md:text-[14px] lg:text-[16px] font-medium transition-all flex-shrink-0 ${idx === 0 ? 'bg-[#8B7355] text-white shadow-[0_4px_16px_rgba(139,115,85,0.2)]' : 'bg-white text-[#3D3D3D] border border-[#E8E3D9] hover:border-[#8B7355] hover:text-[#8B7355]'}`}>{tab}</button>
          ))}
        </div>
      </div>

      {/* Product Gallery */}
      <div className="px-4 md:px-[60px] lg:px-[120px] py-10 md:py-12 lg:py-[64px] bg-white">
        <h2 className="text-[24px] md:text-[32px] lg:text-[40px] font-medium text-[#1A1A1A] mb-8 lg:mb-[48px]">Try-On Enabled Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-[32px]">
          {productsData.map((product, idx) => (
            <div key={idx} className="bg-white rounded-[12px] border border-[#E8E3D9] shadow-[0_4px_16px_rgba(0,0,0,0.06)] overflow-hidden hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] transition-all duration-300">
              <div className="relative">
                <img src={product.image} alt={product.name} className="w-full h-[240px] md:h-[280px] lg:h-[360px] object-cover" />
                <div className="absolute top-4 right-4 px-3 py-1 bg-[#8B7355] text-white text-[10px] lg:text-[11px] font-medium rounded-full flex items-center gap-1">
                  <IoCameraOutline className="w-[12px] h-[12px] lg:w-[14px] lg:h-[14px]" /> AR Enabled
                </div>
              </div>
              <div className="p-4 lg:p-[24px]">
                <p className="text-[12px] lg:text-[13px] font-light italic text-[#8B7355] mb-2">{product.brand}</p>
                <h3 className="text-[15px] md:text-[16px] lg:text-[18px] font-medium text-[#1A1A1A] mb-1">{product.name}</h3>
                <p className="text-[13px] lg:text-[14px] text-[#666666] mb-3">{product.shade}</p>
                <p className="text-[17px] md:text-[18px] lg:text-[20px] font-semibold text-[#1A1A1A] mb-3">{product.price}</p>
                <div className="flex items-center gap-1 mb-4"><Stars /><span className="text-[11px] lg:text-[12px] text-[#999999] ml-1">({product.reviews})</span></div>
                <button className="w-full h-[44px] lg:h-[48px] bg-[#8B7355] text-white text-[13px] lg:text-[14px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">Try Virtually</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Saved Looks */}
      <div className="px-4 md:px-[60px] lg:px-[120px] py-10 md:py-12 lg:py-[64px] bg-[#FDFBF7]">
        <h2 className="text-[22px] md:text-[28px] lg:text-[36px] font-medium text-[#1A1A1A] mb-8 lg:mb-[48px]">My Saved Looks</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-[24px]">
          {savedLooks.map((look, idx) => (
            <div key={idx} className="relative group cursor-pointer">
              <img src={look.image} alt="Saved Look" className="w-full h-[180px] md:h-[220px] lg:h-[280px] object-cover rounded-[12px]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-[12px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end p-4 lg:p-5">
                <p className="text-[13px] lg:text-[14px] text-white mb-1">{look.date}</p>
                <p className="text-[12px] lg:text-[13px] text-white/80 mb-3 lg:mb-4">{look.products}</p>
                <div className="flex gap-2">
                  <button className="w-[70px] lg:w-[80px] h-[32px] lg:h-[36px] bg-white text-[#1A1A1A] text-[12px] lg:text-[13px] font-medium rounded-[6px]">Share</button>
                  <button className="w-[70px] lg:w-[80px] h-[32px] lg:h-[36px] bg-[#8B7355] text-white text-[12px] lg:text-[13px] font-medium rounded-[6px]">Apply</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Looks */}
      <div className="px-4 md:px-[60px] lg:px-[120px] py-10 md:py-12 lg:py-[64px] bg-white">
        <h2 className="text-[24px] md:text-[32px] lg:text-[40px] font-medium text-[#1A1A1A] mb-8 lg:mb-[48px]">Trending Beauty Looks</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 lg:gap-[32px]">
          {trendingLooks.map((look, idx) => (
            <div key={idx} className="bg-white rounded-[12px] shadow-[0_8px_32px_rgba(0,0,0,0.08)] overflow-hidden">
              <img src={look.image} alt={look.desc} className="w-full h-[240px] md:h-[280px] lg:h-[320px] object-cover" />
              <div className="p-4 lg:p-[24px]">
                <div className="flex items-center gap-3 mb-4">
                  <img src={look.avatar} alt={look.creator} className="w-[40px] h-[40px] lg:w-[48px] lg:h-[48px] object-cover rounded-full" />
                  <div>
                    <h4 className="text-[14px] lg:text-[16px] font-medium text-[#1A1A1A]">{look.creator}</h4>
                    <p className="text-[12px] lg:text-[13px] text-[#666666]">{look.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 lg:gap-4 mb-4">
                  <span className="px-3 py-1 bg-[#F5F1EA] text-[#8B7355] text-[11px] lg:text-[12px] font-medium rounded-full">{look.products} Products</span>
                  <div className="flex items-center gap-3 lg:gap-4 text-[13px] lg:text-[14px] text-[#666666]">
                    <span className="flex items-center gap-1"><IoHeartOutline className="w-[14px] h-[14px] lg:w-[16px] lg:h-[16px]" />{look.hearts}</span>
                    <span className="flex items-center gap-1"><IoShareSocialOutline className="w-[14px] h-[14px] lg:w-[16px] lg:h-[16px]" />{look.shares}</span>
                  </div>
                </div>
                <button className="w-full h-[44px] lg:h-[56px] bg-[#8B7355] text-white text-[14px] lg:text-[15px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">Try This Look</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="px-4 md:px-[60px] lg:px-[120px] py-10 md:py-12 lg:py-[64px] bg-[#FDFBF7]">
        <h2 className="text-[24px] md:text-[32px] lg:text-[40px] font-medium text-[#1A1A1A] text-center mb-10 lg:mb-[56px]">How Virtual Try-On Works</h2>
        <div className="flex flex-col md:flex-row justify-center gap-5 md:gap-6 lg:gap-[48px]">
          {howItWorksSteps.map((step) => (
            <div key={step.number} className="w-full md:flex-1 lg:w-[360px] lg:flex-none bg-white rounded-[12px] border border-[#E8E3D9] shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-5 lg:p-[24px]">
              <div className="flex justify-center mb-4"><img src={step.image} alt={step.title} className="w-[80px] h-[80px] lg:w-[120px] lg:h-[120px] object-cover rounded-[8px]" /></div>
              <div className="flex justify-center mb-3"><div className="w-[40px] h-[40px] lg:w-[48px] lg:h-[48px] bg-[#8B7355] text-white text-[20px] lg:text-[24px] font-semibold rounded-full flex items-center justify-center">{step.number}</div></div>
              <h4 className="text-[16px] lg:text-[20px] font-medium text-[#1A1A1A] text-center mb-2">{step.title}</h4>
              <p className="text-[13px] lg:text-[15px] text-[#666666] text-center leading-[1.6]">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Features */}
      <div className="px-4 md:px-[60px] lg:px-[120px] py-6 md:py-8 lg:py-[32px] bg-white flex items-center justify-center">
        <div className="w-full bg-gradient-to-r from-[#F5F1EA] to-[#FDFBF7] rounded-[16px] p-6 md:p-8 lg:p-[40px] flex flex-col sm:flex-row items-center justify-around gap-8 sm:gap-4">
          {[
            { icon: IoCheckmarkCircle,    value: '98% Accuracy',        label: 'Real-Time Tracking'        },
            { icon: IoColorPaletteOutline, value: 'True-to-Life Colors', label: 'Color-Matched Technology'  },
            { icon: IoFlashOutline,        value: 'Instant Results',      label: 'Try 100+ Products'         },
          ].map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <stat.icon className="w-[36px] h-[36px] md:w-[42px] md:h-[42px] lg:w-[48px] lg:h-[48px] text-[#8B7355] mb-3" />
              <p className="text-[18px] md:text-[20px] lg:text-[24px] font-medium text-[#1A1A1A] mb-1">{stat.value}</p>
              <p className="text-[13px] lg:text-[15px] text-[#666666]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Share Experience */}
      <div className="px-4 md:px-[60px] lg:px-[120px] py-10 md:py-12 lg:py-[64px] bg-[#FDFBF7]">
        <h2 className="text-[22px] md:text-[28px] lg:text-[36px] font-medium text-[#1A1A1A] text-center mb-3">Share Your Look</h2>
        <p className="text-[13px] md:text-[15px] lg:text-[16px] text-[#666666] text-center mb-10 lg:mb-[48px]">Show off your virtual try-on results with friends and followers</p>
        <div className="max-w-[900px] mx-auto bg-white rounded-[12px] shadow-[0_8px_32px_rgba(0,0,0,0.08)] p-5 md:p-8 lg:p-[40px]">
          <div className="w-full md:max-w-[600px] h-[240px] md:h-[320px] lg:h-[400px] bg-gradient-to-b from-[#F5F1EA] to-white rounded-[8px] mx-auto mb-6 lg:mb-8 flex items-center justify-center">
            <IoPlayCircle className="w-[48px] h-[48px] md:w-[56px] md:h-[56px] lg:w-[64px] lg:h-[64px] text-[#8B7355]" />
          </div>
          <div className="flex items-center justify-center gap-4 lg:gap-6 mb-6">
            {[IoLogoInstagram, IoLogoFacebook, IoLogoPinterest, IoLogoWhatsapp].map((Icon, idx) => (
              <button key={idx} className="w-[40px] h-[40px] lg:w-[44px] lg:h-[44px] bg-[#8B7355] text-white rounded-full flex items-center justify-center hover:bg-[#7a6448] transition-colors">
                <Icon className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px]" />
              </button>
            ))}
          </div>
          <div className="flex justify-center">
            <button className="w-full sm:w-[200px] h-[44px] lg:h-[48px] bg-white border-2 border-[#8B7355] text-[#8B7355] text-[14px] lg:text-[15px] font-medium rounded-[8px] flex items-center justify-center gap-2 hover:bg-[#F5F1EA] transition-colors">
              <IoDownloadOutline className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px]" /> Download Image
            </button>
          </div>
        </div>
      </div>

      {/* Pro Tips + Recommendations */}
      <div className="px-4 md:px-[60px] lg:px-[120px] py-10 md:py-12 lg:py-[64px] bg-white">
        <div className="flex flex-col md:flex-row gap-6 lg:gap-[32px]">
          <div className="w-full md:w-[280px] lg:w-[380px] bg-[#F5F1EA] rounded-[12px] p-5 lg:p-[32px] flex-shrink-0">
            <h3 className="text-[18px] md:text-[19px] lg:text-[20px] font-medium text-[#1A1A1A] mb-5 lg:mb-6">Pro Tips for Best Results</h3>
            <div className="space-y-4 lg:space-y-5">
              {proTips.map((tip, idx) => (
                <div key={idx} className="flex gap-3">
                  <tip.icon className="w-[22px] h-[22px] lg:w-[24px] lg:h-[24px] text-[#8B7355] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-[14px] lg:text-[16px] font-medium text-[#1A1A1A] mb-1">{tip.title}</h4>
                    <p className="text-[12px] lg:text-[14px] text-[#666666] leading-[1.5]">{tip.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-[20px] md:text-[24px] lg:text-[28px] font-medium text-[#1A1A1A] mb-5 lg:mb-6">Based on Your Try-Ons</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-[24px]">
              {recommendedProducts.map((product, idx) => (
                <div key={idx} className="bg-white rounded-[12px] shadow-[0_8px_32px_rgba(0,0,0,0.08)] overflow-hidden">
                  <div className="relative">
                    <img src={product.image} alt={product.name} className="w-full h-[180px] md:h-[220px] lg:h-[300px] object-cover" />
                    <div className="absolute top-4 right-4 px-3 py-1 bg-[#C9A870] text-white text-[11px] lg:text-[12px] font-medium rounded-full">{product.match}</div>
                  </div>
                  <div className="p-4 lg:p-[20px]">
                    <h4 className="text-[15px] lg:text-[18px] font-medium text-[#1A1A1A] mb-2">{product.name}</h4>
                    <p className="text-[17px] lg:text-[20px] font-semibold text-[#1A1A1A] mb-3 lg:mb-4">{product.price}</p>
                    <button className="w-full h-[42px] lg:h-[48px] bg-[#8B7355] text-white text-[13px] lg:text-[14px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">Add to Cart</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter CTA */}
      <div className="bg-gradient-to-b from-[#F5F1EA] to-white px-4 md:px-[60px] lg:px-[120px] py-10 md:py-12 lg:py-0 lg:min-h-[180px] flex flex-col items-center justify-center">
        <h3 className="text-[22px] md:text-[28px] lg:text-[36px] font-medium text-[#1A1A1A] mb-3 text-center">Get Virtual Try-On Tips</h3>
        <p className="text-[13px] md:text-[15px] lg:text-[16px] text-[#666666] mb-5 lg:mb-6 text-center">Exclusive beauty content and personalized recommendations</p>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <input type="email" placeholder="Enter your email" className="w-full sm:w-[280px] lg:w-[360px] h-[48px] lg:h-[56px] px-5 bg-white text-[14px] lg:text-[15px] text-[#2B2B2B] rounded-[8px] border border-[#E8E3D9] outline-none" />
          <button className="w-full sm:w-auto h-[48px] lg:h-[56px] px-8 lg:px-[32px] bg-[#8B7355] text-white text-[14px] lg:text-[15px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">Subscribe</button>
        </div>
      </div>
    </div>
  )
}

// ─── Main Export (Switcher) ───────────────────────────────────────────────────
export default function VirtualTryOn() {
  const location = useLocation()
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.replace('#', ''))
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
    }
  }, [location])

  return isMobile ? <VirtualTryOnMobile /> : <VirtualTryOnDesktop />
}