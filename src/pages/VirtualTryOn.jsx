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
} from 'react-icons/io5'

export default function VirtualTryOn() {
  const categoryTabs = ['Lips', 'Eyes', 'Face', 'Cheeks', 'Brows']

  const productsData = [
    { image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=360&h=360&fit=crop', brand: 'Shan Loray', name: 'Velvet Matte Lipstick', shade: 'Ruby Rose', price: '$48', reviews: 342 },
    { image: 'https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=360&h=360&fit=crop', brand: 'Shan Loray', name: 'Silk Eyeshadow Palette', shade: 'Golden Hour', price: '$89', reviews: 521 },
    { image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=360&h=360&fit=crop', brand: 'Shan Loray', name: 'Luminous Foundation', shade: 'Warm Ivory', price: '$68', reviews: 467 },
    { image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=360&h=360&fit=crop', brand: 'Shan Loray', name: 'Cream Blush', shade: 'Dusty Rose', price: '$42', reviews: 298 },
    { image: 'https://images.unsplash.com/photo-1596704017254-9b121068ec31?w=360&h=360&fit=crop', brand: 'Shan Loray', name: 'Glossy Lip Lacquer', shade: 'Berry Shimmer', price: '$38', reviews: 412 },
    { image: 'https://images.unsplash.com/photo-1625337439095-0b45185b3644?w=360&h=360&fit=crop', brand: 'Shan Loray', name: 'Precision Eyeliner', shade: 'Midnight Black', price: '$32', reviews: 367 },
  ]

  const savedLooks = [
    { date: 'Dec 20, 2024', products: '5 Products', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=280&h=280&fit=crop' },
    { date: 'Dec 15, 2024', products: '4 Products', image: 'https://images.unsplash.com/photo-1611349411198-e26e0d5f4a52?w=280&h=280&fit=crop' },
    { date: 'Dec 10, 2024', products: '6 Products', image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=280&h=280&fit=crop' },
    { date: 'Dec 5, 2024', products: '3 Products', image: 'https://images.unsplash.com/photo-1556740772-1a741367b93e?w=280&h=280&fit=crop' },
  ]

  const trendingLooks = [
    { image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=380&h=460&fit=crop', creator: 'Sarah Chen', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=48&h=48&fit=crop', desc: 'Natural Glow Makeup', products: 5, hearts: 1234, shares: 89 },
    { image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=380&h=460&fit=crop', creator: 'Emma Wilson', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=48&h=48&fit=crop', desc: 'Bold Evening Look', products: 7, hearts: 2156, shares: 143 },
    { image: 'https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?w=380&h=460&fit=crop', creator: 'Olivia Taylor', avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=48&h=48&fit=crop', desc: 'Soft Romantic Style', products: 4, hearts: 987, shares: 67 },
  ]

  const howItWorksSteps = [
    { number: '1', title: 'Choose Method', desc: 'Camera or upload photo', image: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=120&h=120&fit=crop' },
    { number: '2', title: 'Select Products', desc: 'Browse & test virtually', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=120&h=120&fit=crop' },
    { number: '3', title: 'Save & Share', desc: 'Keep your favorite looks', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=120&h=120&fit=crop' },
  ]

  const proTips = [
    { icon: IoFlashOutline, title: 'Best Lighting', desc: 'Use natural daylight for accurate color matching' },
    { icon: IoCameraOutline, title: 'Face Position', desc: 'Center your face and maintain neutral expression' },
    { icon: IoSparklesOutline, title: 'Clean Skin', desc: 'Remove makeup for best AR tracking' },
    { icon: IoColorPaletteOutline, title: 'Try Multiple', desc: 'Test various shades to find perfect match' },
    { icon: IoAlbumsOutline, title: 'Save Favorites', desc: 'Create collections of looks you love' },
  ]

  const recommendedProducts = [
    { image: 'https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=300&h=300&fit=crop', name: 'Luxury Lipstick Set', match: '95% Match', price: '$125' },
    { image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=300&h=300&fit=crop', name: 'Blush Palette Pro', match: '92% Match', price: '$78' },
    { image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=300&h=300&fit=crop', name: 'Eye Shadow Deluxe', match: '90% Match', price: '$98' },
  ]

  const Stars = () => [...Array(5)].map((_, i) => <IoStarSharp key={i} className="w-[14px] h-[14px] text-[#C9A870]" />)

  return (
    <div className="bg-white font-['Cormorant_Garamond']">

      {/* ── Hero Banner ── */}
      <div className="min-h-[520px] bg-gradient-to-b from-[#FDFBF7] to-[#F5F1EA] relative overflow-hidden flex items-center px-[120px]">
        <div className="w-[650px] relative z-10">
          <p className="text-[14px] font-light italic text-[#8B7355] tracking-[2px] mb-3">AR-POWERED VIRTUAL TRY-ON</p>
          <h1 className="text-[80px] font-bold text-[#1A1A1A] leading-[1] mb-6">Try Before You Buy</h1>
          <p className="text-[20px] font-normal text-[#666666] mb-8">Experience luxury beauty products virtually with advanced AR technology. Test makeup, see real-time results, and find your perfect match</p>
          <div className="w-[140px] h-[4px] bg-[#C9A870]" />
        </div>
        <div className="absolute right-[180px] top-1/2 -translate-y-1/2">
          <img
            src="https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=400&h=400&fit=crop"
            alt="Virtual Try-On Technology"
            className="w-[400px] h-[400px] object-cover rounded-[8px] shadow-[0_12px_48px_rgba(0,0,0,0.12)]"
          />
        </div>
      </div>

      {/* ── Breadcrumb ── */}
      <div className="min-h-[48px] bg-[#FDFBF7] px-[120px] flex items-center">
        <span className="text-[15px] font-normal text-[#8B7355] cursor-pointer">Home</span>
        <span className="text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[15px] font-normal text-[#8B7355] cursor-pointer">Technology</span>
        <span className="text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[15px] font-normal text-[#666666]">Virtual Try-On</span>
      </div>

      {/* ── Live Try-On Section ── */}
      <div className="min-h-[720px] px-[120px] py-[64px] bg-white">
        <h2 className="text-[48px] font-medium text-[#1A1A1A] text-center mb-3">Start Your Virtual Try-On</h2>
        <p className="text-[16px] font-normal text-[#666666] text-center mb-[56px]">Choose your preferred method to begin</p>

        <div className="flex gap-[32px] items-start justify-center">
          {/* Camera Preview */}
          <div className="w-[800px]">
            <div className="min-h-[500px] bg-gradient-to-b from-[#F5F1EA] to-white rounded-[16px] flex flex-col items-center justify-center mb-5">
              <IoCameraOutline className="w-[80px] h-[80px] text-[#8B7355] mb-6" />
              <h3 className="text-[24px] font-medium text-[#1A1A1A] mb-3">Ready to Try On</h3>
              <p className="text-[15px] font-normal text-[#666666] mb-8">Position your face in the frame to begin</p>
              <div className="flex gap-4">
                <button className="w-[200px] h-[56px] bg-[#8B7355] text-white text-[15px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">
                  Launch Camera Try-On
                </button>
                <button className="w-[200px] h-[56px] bg-white border-2 border-[#8B7355] text-[#8B7355] text-[15px] font-medium rounded-[8px] hover:bg-[#F5F1EA] transition-colors">
                  Upload Photo
                </button>
              </div>
            </div>
          </div>

          {/* Product Selector Panel */}
          <div className="w-[320px]">
            <div className="bg-white rounded-[12px] border border-[#E8E3D9] shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-[24px]">
              <h4 className="text-[18px] font-medium text-[#1A1A1A] mb-5">Select Products</h4>
              <div className="space-y-3">
                {[
                  { image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=80&h=80&fit=crop', name: 'Ruby Lipstick' },
                  { image: 'https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=80&h=80&fit=crop', name: 'Gold Eyeshadow' },
                  { image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=80&h=80&fit=crop', name: 'Rose Blush' },
                ].map((product, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-[#F5F1EA] rounded-[8px] cursor-pointer hover:bg-[#ebe6dc] transition-colors">
                    <img src={product.image} alt={product.name} className="w-[80px] h-[80px] object-cover rounded-[6px]" />
                    <span className="text-[14px] font-normal text-[#1A1A1A]">{product.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Category Tabs ── */}
      <div className="min-h-[120px] px-[120px] py-[32px] bg-[#FDFBF7] flex items-center justify-center">
        <div className="flex gap-[24px]">
          {categoryTabs.map((tab, idx) => (
            <button
              key={tab}
              className={`w-[180px] h-[64px] rounded-[12px] text-[16px] font-medium transition-all ${
                idx === 0
                  ? 'bg-[#8B7355] text-white shadow-[0_4px_16px_rgba(139,115,85,0.2)]'
                  : 'bg-white text-[#3D3D3D] border border-[#E8E3D9] hover:border-[#8B7355] hover:text-[#8B7355]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ── Product Gallery ── */}
      <div className="min-h-[800px] px-[120px] py-[64px] bg-white">
        <h2 className="text-[40px] font-medium text-[#1A1A1A] mb-[48px]">Try-On Enabled Products</h2>
        <div className="grid grid-cols-3 gap-[32px]">
          {productsData.map((product, idx) => (
            <div key={idx} className="bg-white rounded-[12px] border border-[#E8E3D9] shadow-[0_4px_16px_rgba(0,0,0,0.06)] overflow-hidden hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] transition-all duration-300">
              <div className="relative">
                <img src={product.image} alt={product.name} className="w-full h-[360px] object-cover" />
                <div className="absolute top-4 right-4 px-3 py-1 bg-[#8B7355] text-white text-[11px] font-medium rounded-full flex items-center gap-1">
                  <IoCameraOutline className="w-[14px] h-[14px]" />
                  AR Enabled
                </div>
              </div>
              <div className="p-[24px]">
                <p className="text-[13px] font-light italic text-[#8B7355] mb-2">{product.brand}</p>
                <h3 className="text-[18px] font-medium text-[#1A1A1A] mb-1">{product.name}</h3>
                <p className="text-[14px] font-normal text-[#666666] mb-3">{product.shade}</p>
                <p className="text-[20px] font-semibold text-[#1A1A1A] mb-3">{product.price}</p>
                <div className="flex items-center gap-1 mb-4">
                  <Stars />
                  <span className="text-[12px] font-normal text-[#999999] ml-1">({product.reviews})</span>
                </div>
                <button className="w-full h-[48px] bg-[#8B7355] text-white text-[14px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">
                  Try Virtually
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Saved Looks ── */}
      <div className="min-h-[520px] px-[120px] py-[64px] bg-[#FDFBF7]">
        <h2 className="text-[36px] font-medium text-[#1A1A1A] mb-[48px]">My Saved Looks</h2>
        <div className="grid grid-cols-4 gap-[24px]">
          {savedLooks.map((look, idx) => (
            <div key={idx} className="relative group cursor-pointer">
              <img src={look.image} alt="Saved Look" className="w-full h-[280px] object-cover rounded-[12px]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-[12px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end p-5">
                <p className="text-[14px] font-normal text-white mb-1">{look.date}</p>
                <p className="text-[13px] font-light text-white/80 mb-4">{look.products}</p>
                <div className="flex gap-2">
                  <button className="w-[80px] h-[36px] bg-white text-[#1A1A1A] text-[13px] font-medium rounded-[6px]">Share</button>
                  <button className="w-[80px] h-[36px] bg-[#8B7355] text-white text-[13px] font-medium rounded-[6px]">Apply</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Trending Looks ── */}
      <div className="min-h-[640px] px-[120px] py-[64px] bg-white">
        <h2 className="text-[40px] font-medium text-[#1A1A1A] mb-[48px]">Trending Beauty Looks</h2>
        <div className="grid grid-cols-3 gap-[32px]">
          {trendingLooks.map((look, idx) => (
            <div key={idx} className="bg-white rounded-[12px] shadow-[0_8px_32px_rgba(0,0,0,0.08)] overflow-hidden">
              <img src={look.image} alt={look.desc} className="w-full h-[320px] object-cover" />
              <div className="p-[24px]">
                <div className="flex items-center gap-3 mb-4">
                  <img src={look.avatar} alt={look.creator} className="w-[48px] h-[48px] object-cover rounded-full" />
                  <div>
                    <h4 className="text-[16px] font-medium text-[#1A1A1A]">{look.creator}</h4>
                    <p className="text-[13px] font-normal text-[#666666]">{look.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-3 py-1 bg-[#F5F1EA] text-[#8B7355] text-[12px] font-medium rounded-full">{look.products} Products</span>
                  <div className="flex items-center gap-4 text-[14px] font-normal text-[#666666]">
                    <span className="flex items-center gap-1"><IoHeartOutline className="w-[16px] h-[16px]" />{look.hearts}</span>
                    <span className="flex items-center gap-1"><IoShareSocialOutline className="w-[16px] h-[16px]" />{look.shares}</span>
                  </div>
                </div>
                <button className="w-full h-[56px] bg-[#8B7355] text-white text-[15px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">
                  Try This Look
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── How It Works ── */}
      <div className="min-h-[400px] px-[120px] py-[64px] bg-[#FDFBF7]">
        <h2 className="text-[40px] font-medium text-[#1A1A1A] text-center mb-[56px]">How Virtual Try-On Works</h2>
        <div className="flex justify-center gap-[48px]">
          {howItWorksSteps.map((step) => (
            <div key={step.number} className="w-[360px] bg-white rounded-[12px] border border-[#E8E3D9] shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-[24px]">
              <div className="flex justify-center mb-4">
                <img src={step.image} alt={step.title} className="w-[120px] h-[120px] object-cover rounded-[8px]" />
              </div>
              <div className="flex justify-center mb-3">
                <div className="w-[48px] h-[48px] bg-[#8B7355] text-white text-[24px] font-semibold rounded-full flex items-center justify-center">
                  {step.number}
                </div>
              </div>
              <h4 className="text-[20px] font-medium text-[#1A1A1A] text-center mb-2">{step.title}</h4>
              <p className="text-[15px] font-normal text-[#666666] text-center leading-[1.6]">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Tech Features Banner ── */}
      <div className="min-h-[140px] px-[120px] py-[32px] bg-white flex items-center justify-center">
        <div className="w-full bg-gradient-to-r from-[#F5F1EA] to-[#FDFBF7] rounded-[16px] p-[40px] flex items-center justify-around">
          {[
            { icon: IoCheckmarkCircle, value: '98% Accuracy', label: 'Real-Time Tracking' },
            { icon: IoColorPaletteOutline, value: 'True-to-Life Colors', label: 'Color-Matched Technology' },
            { icon: IoFlashOutline, value: 'Instant Results', label: 'Try 100+ Products' },
          ].map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <stat.icon className="w-[48px] h-[48px] text-[#8B7355] mb-3" />
              <p className="text-[24px] font-medium text-[#1A1A1A] mb-1">{stat.value}</p>
              <p className="text-[15px] font-normal text-[#666666]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Share Experience ── */}
      <div className="min-h-[360px] px-[120px] py-[64px] bg-[#FDFBF7]">
        <h2 className="text-[36px] font-medium text-[#1A1A1A] text-center mb-3">Share Your Look</h2>
        <p className="text-[16px] font-normal text-[#666666] text-center mb-[48px]">Show off your virtual try-on results with friends and followers</p>
        <div className="max-w-[900px] mx-auto bg-white rounded-[12px] shadow-[0_8px_32px_rgba(0,0,0,0.08)] p-[40px]">
          <div className="w-[600px] h-[400px] bg-gradient-to-b from-[#F5F1EA] to-white rounded-[8px] mx-auto mb-8 flex items-center justify-center">
            <IoPlayCircle className="w-[64px] h-[64px] text-[#8B7355]" />
          </div>
          <div className="flex items-center justify-center gap-6 mb-6">
            {[IoLogoInstagram, IoLogoFacebook, IoLogoPinterest, IoLogoWhatsapp].map((Icon, idx) => (
              <button key={idx} className="w-[44px] h-[44px] bg-[#8B7355] text-white rounded-full flex items-center justify-center hover:bg-[#7a6448] transition-colors">
                <Icon className="w-[20px] h-[20px]" />
              </button>
            ))}
          </div>
          <div className="flex justify-center">
            <button className="w-[200px] h-[48px] bg-white border-2 border-[#8B7355] text-[#8B7355] text-[15px] font-medium rounded-[8px] flex items-center justify-center gap-2 hover:bg-[#F5F1EA] transition-colors">
              <IoDownloadOutline className="w-[20px] h-[20px]" />
              Download Image
            </button>
          </div>
        </div>
      </div>

      {/* ── Pro Tips + Recommendations ── */}
      <div className="px-[120px] py-[64px] bg-white">
        <div className="flex gap-[32px]">
          {/* Pro Tips */}
          <div className="w-[380px] bg-[#F5F1EA] rounded-[12px] p-[32px]">
            <h3 className="text-[20px] font-medium text-[#1A1A1A] mb-6">Pro Tips for Best Results</h3>
            <div className="space-y-5">
              {proTips.map((tip, idx) => (
                <div key={idx} className="flex gap-3">
                  <tip.icon className="w-[24px] h-[24px] text-[#8B7355] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-[16px] font-medium text-[#1A1A1A] mb-1">{tip.title}</h4>
                    <p className="text-[14px] font-normal text-[#666666] leading-[1.5]">{tip.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Products */}
          <div className="flex-1">
            <h3 className="text-[28px] font-medium text-[#1A1A1A] mb-6">Based on Your Try-Ons</h3>
            <div className="flex gap-[24px]">
              {recommendedProducts.map((product, idx) => (
                <div key={idx} className="w-[300px] bg-white rounded-[12px] shadow-[0_8px_32px_rgba(0,0,0,0.08)] overflow-hidden">
                  <div className="relative">
                    <img src={product.image} alt={product.name} className="w-full h-[300px] object-cover" />
                    <div className="absolute top-4 right-4 px-3 py-1 bg-[#C9A870] text-white text-[12px] font-medium rounded-full">
                      {product.match}
                    </div>
                  </div>
                  <div className="p-[20px]">
                    <h4 className="text-[18px] font-medium text-[#1A1A1A] mb-2">{product.name}</h4>
                    <p className="text-[20px] font-semibold text-[#1A1A1A] mb-4">{product.price}</p>
                    <button className="w-full h-[48px] bg-[#8B7355] text-white text-[14px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Newsletter CTA ── */}
      <div className="min-h-[180px] bg-gradient-to-b from-[#F5F1EA] to-white px-[120px] flex flex-col items-center justify-center">
        <h3 className="text-[36px] font-medium text-[#1A1A1A] mb-3">Get Virtual Try-On Tips</h3>
        <p className="text-[16px] font-normal text-[#666666] mb-6">Exclusive beauty content and personalized recommendations</p>
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