import {
  IoCameraOutline,
  IoCloudUploadOutline,
  IoCheckmark,
  IoStarSharp,
  IoShareOutline,
  IoAddOutline,
  IoRemoveOutline,
  IoLeafOutline,
  IoSparklesOutline,
  IoFlashOutline,
  IoColorPaletteOutline,
  IoAlbumsOutline,
  IoCarOutline,
  IoReturnDownBackOutline,
  IoShieldCheckmarkOutline,
  IoChevronDown,
  IoHeartOutline,
  IoBagOutline,
} from 'react-icons/io5'

export default function MakeupProductDetail() {
  const thumbnailImages = [
    'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=212&h=212&fit=crop',
    'https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=212&h=212&fit=crop',
    'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=212&h=212&fit=crop',
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=212&h=212&fit=crop',
    'https://images.unsplash.com/photo-1596704017254-9b121068ec31?w=212&h=212&fit=crop',
  ]

  const shadeOptions = [
    { name: 'Ruby Rose', color: '#A52A2A', badge: 'Bestseller' },
    { name: 'Nude Silk', color: '#E8BBA8', badge: null },
    { name: 'Berry Kiss', color: '#8B3A62', badge: null },
    { name: 'Coral Dream', color: '#FF7F50', badge: 'New' },
    { name: 'Mauve Moment', color: '#C9A0DC', badge: null },
    { name: 'Red Velvet', color: '#C41E3A', badge: null },
    { name: 'Pink Petal', color: '#FFB6C1', badge: null },
    { name: 'Wine Noir', color: '#722F37', badge: null },
  ]

  const keyBenefits = [
    'Weightless matte formula',
    '16-hour longwear',
    'Infused with vitamin E',
    'Non-drying, comfortable',
    'Highly pigmented',
    'Transfer-resistant',
  ]

  const applicationSteps = [
    { step: '1', instruction: 'Exfoliate and moisturize lips', timing: 'For best results' },
    { step: '2', instruction: 'Line lips with matching lip liner', timing: 'Optional step' },
    { step: '3', instruction: 'Apply directly from bullet or with brush', timing: 'Start from center' },
    { step: '4', instruction: 'Blot with tissue and reapply for intensity', timing: 'For long-lasting color' },
  ]

  const keyIngredients = [
    { name: 'Vitamin E', scientific: 'Tocopherol', benefit: 'Nourishes and protects lips from environmental damage', concentration: '3%' },
    { name: 'Jojoba Oil', scientific: 'Simmondsia Chinensis', benefit: 'Provides lightweight hydration without compromising matte finish', concentration: '5%' },
    { name: 'Hyaluronic Acid', scientific: 'Sodium Hyaluronate', benefit: 'Locks in moisture for all-day comfort', concentration: '2%' },
    { name: 'Mango Butter', scientific: 'Mangifera Indica', benefit: 'Softens and smooths lip texture', concentration: '4%' },
  ]

  const reviews = [
    { avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop', username: 'Emma Thompson', verified: true, rating: 5, date: 'Dec 20, 2024', title: 'Perfect shade and the virtual try-on is amazing!', text: 'I used the virtual try-on feature before purchasing and it was incredibly accurate. The Ruby Rose shade looks exactly as it did on the AR preview. The formula is comfortable, long-lasting, and truly non-drying.', helpful: 45, tryOnMention: true },
    { avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop', username: 'Sophie Chen', verified: true, rating: 5, date: 'Dec 18, 2024', title: 'Best matte lipstick I have ever tried', text: 'This lipstick is phenomenal! The matte finish is velvety smooth, not chalky at all. It stays put through meals and drinks. The virtual try-on helped me choose between shades — ended up getting three colors!', helpful: 32, tryOnMention: true },
    { avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=96&h=96&fit=crop', username: 'Olivia Martinez', verified: false, rating: 4, date: 'Dec 15, 2024', title: 'Beautiful color, great formula', text: 'The Coral Dream shade is stunning and the formula is very comfortable to wear. Would definitely recommend trying the virtual feature to see how shades look on your skin tone.', helpful: 28, tryOnMention: false },
  ]

  const relatedProducts = [
    { image: 'https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=550&h=640&fit=crop', brand: 'Shan Loray', name: 'Lip Liner - Ruby Rose', price: '$28.00', reviews: 234 },
    { image: 'https://images.unsplash.com/photo-1596704017254-9b121068ec31?w=550&h=640&fit=crop', brand: 'Shan Loray', name: 'Lip Plumping Gloss', price: '$38.00', reviews: 189 },
    { image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=550&h=640&fit=crop', brand: 'Shan Loray', name: 'Makeup Setting Spray', price: '$45.00', reviews: 412 },
    { image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=550&h=640&fit=crop', brand: 'Shan Loray', name: 'Professional Lip Brush', price: '$32.00', reviews: 156 },
  ]

  const howItWorksSteps = [
    { number: '1', title: 'Choose Your Method', desc: 'Use camera or upload a photo', image: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=240&h=240&fit=crop' },
    { number: '2', title: 'Apply & Adjust', desc: 'Select shades and see instant results', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=240&h=240&fit=crop' },
    { number: '3', title: 'Save & Shop', desc: 'Save your look and add to cart', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=240&h=240&fit=crop' },
  ]

  const proTips = [
    { icon: IoFlashOutline, title: 'Natural Lighting', desc: 'Use natural daylight for accurate color matching' },
    { icon: IoCameraOutline, title: 'Face Positioning', desc: 'Center your face and keep neutral expression' },
    { icon: IoSparklesOutline, title: 'Neutral Expression', desc: 'Relax lips for best AR tracking' },
    { icon: IoColorPaletteOutline, title: 'Try Multiple Shades', desc: 'Compare different colors side by side' },
    { icon: IoAlbumsOutline, title: 'Save Favorites', desc: 'Create a collection of your best looks' },
  ]

  const customerTryOns = [
    { image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=380&h=460&fit=crop', username: 'Jessica B.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=48&h=48&fit=crop', shade: 'Ruby Rose', likes: 234, shares: 45 },
    { image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=380&h=460&fit=crop', username: 'Maria S.', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=48&h=48&fit=crop', shade: 'Wine Noir', likes: 189, shares: 32 },
    { image: 'https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?w=380&h=460&fit=crop', username: 'Anna L.', avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=48&h=48&fit=crop', shade: 'Coral Dream', likes: 156, shares: 28 },
  ]

  const Stars = ({ count = 5 }) => [...Array(5)].map((_, i) => (
    <IoStarSharp key={i} className={`w-[16px] h-[16px] ${i < count ? 'text-[#C9A870]' : 'text-[#E8E3D9]'}`} />
  ))

  return (
    <div className="bg-white font-['Cormorant_Garamond']">

      {/* ── Breadcrumb ── */}
      <div className="min-h-[48px] bg-[#FDFBF7] px-[120px] flex items-center">
        <span className="text-[15px] font-normal text-[#8B7355] cursor-pointer">Home</span>
        <span className="text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[15px] font-normal text-[#8B7355] cursor-pointer">Makeup</span>
        <span className="text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[15px] font-normal text-[#8B7355] cursor-pointer">Lipsticks</span>
        <span className="text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[15px] font-normal text-[#666666]">Velvet Matte Lipstick</span>
      </div>

      {/* ── Main Content ── */}
      <div className="px-[120px] py-[64px]">

        {/* ── Product Section ── */}
        <div className="flex gap-[40px] mb-[80px]">

          {/* Left — Gallery */}
          <div className="w-[580px] flex-shrink-0">
            <div className="w-full h-[680px] rounded-[8px] overflow-hidden mb-[20px]">
              <img src="https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=1160&h=1360&fit=crop" alt="Velvet Matte Lipstick" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-[12px] mb-[32px]">
              {thumbnailImages.map((img, idx) => (
                <div key={idx} className={`w-[106px] h-[106px] rounded-[8px] overflow-hidden cursor-pointer border-2 transition-all ${idx === 0 ? 'border-[#8B7355]' : 'border-transparent hover:border-[#E8E3D9]'}`}>
                  <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            {/* Virtual Try-On CTA */}
            <div className="w-full bg-gradient-to-b from-[#F5F1EA] to-white rounded-[12px] p-[32px] mb-[24px]">
              <div className="flex flex-col items-center">
                <IoCameraOutline className="w-[48px] h-[48px] text-[#8B7355] mb-[16px]" />
                <h3 className="text-[24px] font-medium text-[#1A1A1A] mb-[8px]">Try This Shade Virtually</h3>
                <p className="text-[15px] font-normal text-[#666666] text-center mb-[24px]">See how it looks on you instantly with AR technology</p>
                <button className="w-full h-[56px] bg-[#8B7355] text-white text-[16px] font-medium rounded-[8px] mb-[12px] hover:bg-[#7a6448] transition-colors">
                  Launch Virtual Try-On
                </button>
                <button className="w-full h-[48px] bg-white border-2 border-[#8B7355] text-[#8B7355] text-[15px] font-medium rounded-[8px] hover:bg-[#F5F1EA] transition-colors">
                  Upload Your Photo
                </button>
              </div>
            </div>

            {/* Feature Icons */}
            <div className="flex gap-[12px]">
              {[
                { icon: IoLeafOutline, title: 'Cruelty-Free', desc: 'Never Tested on Animals' },
                { icon: IoSparklesOutline, title: 'Vegan Formula', desc: '100% Plant-Based' },
                { icon: IoFlashOutline, title: 'Long-Lasting', desc: '16-Hour Wear' },
              ].map((feature, idx) => (
                <div key={idx} className="flex-1 bg-[#FDFBF7] rounded-[8px] p-[20px] text-center">
                  <feature.icon className="w-[28px] h-[28px] text-[#8B7355] mx-auto mb-[8px]" />
                  <div className="text-[14px] font-medium text-[#1A1A1A] mb-[4px]">{feature.title}</div>
                  <div className="text-[13px] font-light text-[#666666]">{feature.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Product Info */}
          <div className="flex-1">
            <div className="mb-[8px]">
              <span className="text-[14px] font-light italic text-[#8B7355]">Shan Loray</span>
            </div>
            <h1 className="text-[36px] font-semibold text-[#1A1A1A] mb-[8px]">Velvet Matte Lipstick</h1>
            <p className="text-[16px] font-light italic text-[#666666] mb-[16px]">Luxurious Color, Weightless Comfort</p>

            {/* Rating */}
            <div className="flex items-center gap-[8px] mb-[24px]">
              <div className="flex gap-[2px]">
                {[...Array(5)].map((_, idx) => <IoStarSharp key={idx} className="w-[18px] h-[18px] text-[#C9A870]" />)}
              </div>
              <span className="text-[15px] font-normal text-[#2B2B2B]">4.9</span>
              <span className="text-[15px] font-normal text-[#8B7355] cursor-pointer hover:underline">(342 reviews)</span>
            </div>

            {/* Price */}
            <div className="mb-[20px]">
              <div className="text-[32px] font-semibold text-[#1A1A1A] mb-[4px]">$48.00</div>
              <div className="text-[14px] font-light text-[#666666]">or 4 interest-free payments of $12.00</div>
            </div>

            {/* Description */}
            <p className="text-[16px] font-normal text-[#3D3D3D] leading-[1.6] mb-[32px]">
              A revolutionary matte lipstick that delivers rich, velvety color with a feather-light feel. Infused with nourishing oils and antioxidants for all-day comfort without drying.
            </p>

            {/* Shade Selector */}
            <div className="mb-[28px]">
              <div className="text-[14px] font-medium text-[#1A1A1A] mb-[12px]">Shade: Ruby Rose</div>
              <div className="grid grid-cols-8 gap-[12px]">
                {shadeOptions.map((shade, idx) => (
                  <div key={idx} className="relative">
                    <div
                      className={`w-[48px] h-[48px] rounded-full cursor-pointer hover:scale-110 transition-transform ${idx === 0 ? 'ring-4 ring-[#C9A870] ring-offset-2' : ''}`}
                      style={{ backgroundColor: shade.color }}
                      title={shade.name}
                    />
                    {shade.badge && (
                      <div className="absolute -top-[8px] -right-[8px] bg-[#C9A870] text-white text-[9px] font-medium px-[6px] py-[2px] rounded-full">
                        {shade.badge}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* AR Quick Try Panel */}
            <div className="w-full bg-gradient-to-b from-[#FDFBF7] to-white rounded-[12px] p-[24px] mb-[28px]">
              <div className="flex gap-[20px]">
                <div className="w-[80px] h-[80px] flex-shrink-0 rounded-[8px] overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=160&h=160&fit=crop" alt="AR Preview" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h4 className="text-[18px] font-medium text-[#1A1A1A] mb-[8px]">See It On You</h4>
                  <p className="text-[14px] font-normal text-[#666666] mb-[16px]">Try this shade instantly with AR</p>
                  <button className="w-full h-[56px] bg-[#8B7355] text-white text-[15px] font-medium rounded-[8px] flex items-center justify-center gap-[8px] hover:bg-[#7a6448] transition-colors">
                    <IoCameraOutline className="w-[20px] h-[20px]" />
                    Try Virtually Now
                  </button>
                  <div className="flex items-center justify-center gap-[16px] mt-[12px]">
                    <span className="text-[12px] font-light text-[#666666] flex items-center gap-[4px]">
                      <IoCameraOutline className="w-[14px] h-[14px]" /> Works with camera
                    </span>
                    <span className="text-[12px] font-light text-[#666666] flex items-center gap-[4px]">
                      <IoCloudUploadOutline className="w-[14px] h-[14px]" /> Upload photo
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Finish */}
            <div className="mb-[24px]">
              <div className="text-[14px] font-medium text-[#1A1A1A] mb-[12px]">Finish</div>
              <div className="flex gap-[12px]">
                {[{ label: 'Matte', selected: true }, { label: 'Satin', selected: false }].map((option) => (
                  <button key={option.label} className={`w-[140px] h-[48px] rounded-full text-[14px] font-medium cursor-pointer transition-all ${option.selected ? 'bg-[#8B7355] text-white' : 'bg-white border border-[#E8E3D9] text-[#2B2B2B] hover:border-[#8B7355]'}`}>
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-[24px]">
              <div className="text-[14px] font-medium text-[#1A1A1A] mb-[12px]">Quantity</div>
              <div className="flex items-center gap-[12px] w-[140px] h-[48px] border border-[#E8E3D9] rounded-[8px]">
                <button className="flex-1 flex items-center justify-center cursor-pointer hover:text-[#8B7355] transition-colors">
                  <IoRemoveOutline className="w-[20px] h-[20px]" />
                </button>
                <span className="text-[16px] font-medium text-[#1A1A1A]">1</span>
                <button className="flex-1 flex items-center justify-center cursor-pointer hover:text-[#8B7355] transition-colors">
                  <IoAddOutline className="w-[20px] h-[20px]" />
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-[16px] mb-[20px]">
              <button className="w-full h-[56px] bg-[#8B7355] text-white text-[16px] font-semibold rounded-[8px] flex items-center justify-center gap-[10px] cursor-pointer hover:bg-[#7a6448] transition-colors">
                <IoBagOutline className="w-[20px] h-[20px]" />
                Add to Cart
              </button>
              <button className="w-full h-[56px] bg-white border-2 border-[#8B7355] text-[#8B7355] text-[16px] font-semibold rounded-[8px] cursor-pointer hover:bg-[#FDFBF7] transition-colors">
                Buy with Virtual Try-On
              </button>
            </div>

            {/* Secondary Actions */}
            <div className="flex items-center gap-[32px] mb-[32px]">
              <button className="flex items-center gap-[8px] text-[15px] font-normal text-[#666666] cursor-pointer hover:text-[#8B7355] transition-colors">
                <IoHeartOutline className="w-[18px] h-[18px]" /> Add to Wishlist
              </button>
              <button className="flex items-center gap-[8px] text-[15px] font-normal text-[#666666] cursor-pointer hover:text-[#8B7355] transition-colors">
                <IoShareOutline className="w-[18px] h-[18px]" /> Share
              </button>
            </div>

            {/* Key Benefits */}
            <div className="bg-gradient-to-b from-[#FDFBF7] to-white rounded-[12px] p-[24px]">
              <h3 className="text-[18px] font-semibold text-[#1A1A1A] mb-[16px]">Key Benefits</h3>
              <div className="space-y-[12px]">
                {keyBenefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-[12px]">
                    <IoCheckmark className="w-[16px] h-[16px] text-[#8B7355] mt-[4px] flex-shrink-0" />
                    <span className="text-[15px] font-normal text-[#2B2B2B]">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="mb-[80px]">
          <div className="border-b border-[#E8E3D9] mb-[40px]">
            <div className="flex gap-[48px]">
              {['Details', 'How to Use', 'Ingredients', 'Reviews (342)', 'Virtual Try-On Gallery'].map((tab, idx) => (
                <button key={tab} className={`pb-[16px] text-[16px] font-medium cursor-pointer transition-colors ${idx === 0 ? 'text-[#1A1A1A] border-b-[3px] border-[#8B7355]' : 'text-[#666666] hover:text-[#8B7355]'}`}>
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="mb-[48px]">
            <p className="text-[15px] font-normal text-[#3D3D3D] leading-[1.7] mb-[20px]">
              Experience the luxury of our Velvet Matte Lipstick, a groundbreaking formula that redefines matte lipstick comfort. This innovative formula combines the richest pigments with nourishing ingredients, creating a velvety texture that glides on effortlessly and stays comfortable for up to 16 hours.
            </p>
            <p className="text-[15px] font-normal text-[#3D3D3D] leading-[1.7]">
              Infused with vitamin E, jojoba oil, and hyaluronic acid, this lipstick not only delivers stunning color but also cares for your lips throughout the day. The lightweight formula never feels heavy or drying, making it perfect for all-day wear.
            </p>
          </div>

          {/* How to Use */}
          <div className="mb-[48px]">
            <h3 className="text-[28px] font-semibold text-[#1A1A1A] mb-[32px]">How to Use</h3>
            <div className="space-y-[24px] mb-[32px]">
              {applicationSteps.map((step) => (
                <div key={step.step} className="flex gap-[24px]">
                  <div className="w-[56px] h-[56px] flex-shrink-0 bg-[#C9A870] rounded-full flex items-center justify-center">
                    <span className="text-[32px] font-semibold text-white">{step.step}</span>
                  </div>
                  <div className="flex-1 pt-[8px]">
                    <p className="text-[15px] font-normal text-[#2B2B2B] mb-[6px]">{step.instruction}</p>
                    {step.timing && <p className="text-[13px] font-light italic text-[#666666]">{step.timing}</p>}
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-[#FDFBF7] rounded-[12px] p-[28px]">
              <div className="flex items-start gap-[16px]">
                <IoSparklesOutline className="w-[28px] h-[28px] text-[#C9A870] flex-shrink-0" />
                <div>
                  <h4 className="text-[18px] font-medium text-[#1A1A1A] mb-[12px]">Pro Tips</h4>
                  <ul className="space-y-[8px]">
                    {['Use lip liner before application for longer-lasting color', 'Apply lip balm 5 minutes before for extra comfort', 'Try the virtual try-on feature to find your perfect shade'].map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-[14px] font-normal text-[#2B2B2B]">
                        <IoCheckmark className="w-[14px] h-[14px] text-[#8B7355] mt-1 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Ingredients */}
          <div className="mb-[48px]">
            <h3 className="text-[28px] font-semibold text-[#1A1A1A] mb-[32px]">Ingredients</h3>
            <div className="grid grid-cols-2 gap-[24px]">
              {keyIngredients.map((ingredient, idx) => (
                <div key={idx} className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-[24px]">
                  <div className="flex items-start justify-between mb-[12px]">
                    <div>
                      <h4 className="text-[16px] font-semibold text-[#1A1A1A] mb-[4px]">{ingredient.name}</h4>
                      <p className="text-[13px] font-light italic text-[#999999]">{ingredient.scientific}</p>
                    </div>
                    <div className="bg-[#C9A870] text-white text-[12px] font-medium px-[10px] py-[4px] rounded-full flex-shrink-0 ml-2">{ingredient.concentration}</div>
                  </div>
                  <p className="text-[14px] font-normal text-[#666666] leading-[1.5]">{ingredient.benefit}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div className="mb-[48px]">
            <h3 className="text-[28px] font-semibold text-[#1A1A1A] mb-[32px]">Customer Reviews</h3>
            <div className="bg-gradient-to-br from-[#FDFBF7] to-[#F5F1EA] rounded-[12px] p-[40px] mb-[40px]">
              <div className="flex items-start gap-[48px]">
                <div className="text-center flex-shrink-0">
                  <div className="text-[48px] font-semibold text-[#1A1A1A] mb-[8px]">4.9</div>
                  <div className="flex gap-[4px] mb-[8px] justify-center">
                    {[...Array(5)].map((_, idx) => <IoStarSharp key={idx} className="w-[20px] h-[20px] text-[#C9A870]" />)}
                  </div>
                  <div className="text-[15px] font-normal text-[#666666]">342 reviews</div>
                </div>
                <div className="flex-1">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center gap-[12px] mb-[8px]">
                      <span className="text-[14px] font-normal text-[#666666] w-[60px]">{rating} stars</span>
                      <div className="flex-1 h-[8px] bg-white rounded-full overflow-hidden">
                        <div className="h-full bg-[#C9A870] rounded-full" style={{ width: rating === 5 ? '90%' : rating === 4 ? '8%' : '2%' }} />
                      </div>
                      <span className="text-[14px] font-normal text-[#666666] w-[40px] text-right">{rating === 5 ? '308' : rating === 4 ? '27' : '7'}</span>
                    </div>
                  ))}
                </div>
                <button className="bg-[#8B7355] text-white text-[16px] font-semibold px-[32px] h-[48px] rounded-[8px] cursor-pointer hover:bg-[#7a6448] transition-colors flex-shrink-0">
                  Write a Review
                </button>
              </div>
            </div>

            <div className="flex gap-[16px] mb-[32px]">
              {['Most Recent', 'Highest Rated', 'Verified Purchase'].map((filter) => (
                <button key={filter} className="flex items-center gap-[8px] bg-white border border-[#E8E3D9] text-[#2B2B2B] text-[14px] font-normal px-[20px] h-[40px] rounded-[8px] cursor-pointer hover:border-[#8B7355] transition-colors">
                  {filter} <IoChevronDown className="w-[16px] h-[16px]" />
                </button>
              ))}
            </div>

            <div className="space-y-[24px]">
              {reviews.map((review, idx) => (
                <div key={idx} className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-[24px]">
                  <div className="flex gap-[16px] mb-[16px]">
                    <img src={review.avatar} alt={review.username} className="w-[48px] h-[48px] rounded-full object-cover flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center gap-[8px] mb-[4px]">
                        <span className="text-[15px] font-medium text-[#1A1A1A]">{review.username}</span>
                        {review.verified && <div className="bg-[#8B7355] text-white text-[10px] font-normal px-[8px] py-[2px] rounded-full">Verified</div>}
                      </div>
                      <div className="flex items-center gap-[12px]">
                        <div className="flex gap-[2px]"><Stars count={review.rating} /></div>
                        <span className="text-[13px] font-light text-[#999999]">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <h4 className="text-[16px] font-medium text-[#1A1A1A] mb-[8px]">{review.title}</h4>
                  <p className="text-[15px] font-normal text-[#3D3D3D] leading-[1.6] mb-[16px]">{review.text}</p>
                  <div className="flex items-center justify-between pt-[16px] border-t border-[#F5F1EA]">
                    {review.tryOnMention ? (
                      <div className="bg-[#F5F1EA] text-[#8B7355] text-[12px] font-normal px-[12px] py-[4px] rounded-full flex items-center gap-[4px]">
                        <IoCameraOutline className="w-[14px] h-[14px]" /> Used Virtual Try-On
                      </div>
                    ) : <div />}
                    <div className="flex items-center gap-[16px]">
                      <span className="text-[13px] font-normal text-[#666666]">Was this helpful?</span>
                      <button className="text-[13px] font-normal text-[#8B7355] cursor-pointer hover:underline">Yes ({review.helpful})</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Related Products ── */}
        <div className="mb-[80px]">
          <h3 className="text-[28px] font-semibold text-[#1A1A1A] mb-[32px]">Complete Your Look</h3>
          <div className="grid grid-cols-4 gap-[20px]">
            {relatedProducts.map((product, idx) => (
              <div key={idx} className="cursor-pointer group">
                <div className="relative mb-[16px]">
                  <img src={product.image} alt={product.name} className="w-full h-[320px] object-cover rounded-[8px]" />
                  <button className="absolute bottom-[12px] right-[12px] w-[40px] h-[40px] bg-[#8B7355] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
                    <IoBagOutline className="w-[20px] h-[20px] text-white" />
                  </button>
                </div>
                <div className="text-[12px] font-light italic text-[#8B7355] mb-[4px]">{product.brand}</div>
                <h4 className="text-[15px] font-medium text-[#1A1A1A] mb-[4px]">{product.name}</h4>
                <div className="flex items-center gap-[6px] mb-[4px]">
                  <div className="flex gap-[2px]">{[...Array(5)].map((_, i) => <IoStarSharp key={i} className="w-[14px] h-[14px] text-[#C9A870]" />)}</div>
                  <span className="text-[13px] font-normal text-[#666666]">({product.reviews})</span>
                </div>
                <div className="text-[16px] font-semibold text-[#2B2B2B]">{product.price}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── How It Works ── */}
        <div className="w-full bg-gradient-to-b from-[#F5F1EA] to-white rounded-[16px] p-[64px] mb-[80px]">
          <h2 className="text-[40px] font-medium text-[#1A1A1A] text-center mb-[56px]">How Virtual Try-On Works</h2>
          <div className="flex justify-center gap-[48px]">
            {howItWorksSteps.map((step) => (
              <div key={step.number} className="w-[360px] bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-[32px] text-center">
                <div className="flex justify-center mb-[20px]">
                  <img src={step.image} alt={step.title} className="w-[120px] h-[120px] object-cover rounded-[8px]" />
                </div>
                <div className="flex justify-center mb-[16px]">
                  <div className="w-[48px] h-[48px] bg-[#8B7355] text-white text-[24px] font-semibold rounded-full flex items-center justify-center">{step.number}</div>
                </div>
                <h4 className="text-[20px] font-medium text-[#1A1A1A] mb-[8px]">{step.title}</h4>
                <p className="text-[15px] font-normal text-[#666666] leading-[1.6]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Pro Tips + Customer Try-Ons ── */}
        <div className="flex gap-[32px] mb-[80px]">
          <div className="w-[380px] flex-shrink-0 bg-[#F5F1EA] rounded-[12px] p-[32px]">
            <h3 className="text-[20px] font-medium text-[#1A1A1A] mb-[24px]">Tips for Best Virtual Try-On Results</h3>
            <div className="space-y-[20px]">
              {proTips.map((tip, idx) => (
                <div key={idx} className="flex gap-[12px]">
                  <tip.icon className="w-[24px] h-[24px] text-[#8B7355] flex-shrink-0 mt-[2px]" />
                  <div>
                    <h4 className="text-[16px] font-medium text-[#1A1A1A] mb-[4px]">{tip.title}</h4>
                    <p className="text-[14px] font-normal text-[#666666] leading-[1.5]">{tip.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1">
            <h3 className="text-[28px] font-medium text-[#1A1A1A] mb-[24px]">See How Customers Style It</h3>
            <div className="grid grid-cols-3 gap-[24px]">
              {customerTryOns.map((item, idx) => (
                <div key={idx} className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.06)] overflow-hidden">
                  <div className="relative group">
                    <img src={item.image} alt={item.username} className="w-full h-[340px] object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-[20px]">
                      <button className="w-full h-[48px] bg-white text-[#8B7355] text-[14px] font-medium rounded-[8px] hover:bg-[#F5F1EA] transition-colors">
                        Try This Look
                      </button>
                    </div>
                  </div>
                  <div className="p-[16px]">
                    <div className="flex items-center gap-[8px] mb-[8px]">
                      <img src={item.avatar} alt={item.username} className="w-[32px] h-[32px] rounded-full object-cover" />
                      <span className="text-[14px] font-medium text-[#1A1A1A]">{item.username}</span>
                    </div>
                    <p className="text-[13px] font-normal text-[#666666] mb-[12px]">Shade: {item.shade}</p>
                    <div className="flex items-center gap-[16px] text-[13px] font-normal text-[#666666]">
                      <span className="flex items-center gap-[4px]"><IoHeartOutline className="w-[14px] h-[14px]" />{item.likes}</span>
                      <span className="flex items-center gap-[4px]"><IoShareOutline className="w-[14px] h-[14px]" />{item.shares}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Trust Banner ── */}
        <div className="bg-[#FDFBF7] rounded-[12px] p-[40px] mb-[80px]">
          <div className="grid grid-cols-3 gap-[48px]">
            {[
              { icon: IoCarOutline, title: 'Complimentary Shipping', desc: 'Free shipping on orders $75+' },
              { icon: IoReturnDownBackOutline, title: '30-Day Return Policy', desc: 'Full refund if not satisfied' },
              { icon: IoShieldCheckmarkOutline, title: '100% Authentic Products', desc: 'Guaranteed genuine Shan Loray' },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <item.icon className="w-[32px] h-[32px] text-[#8B7355] mx-auto mb-[12px]" />
                <h4 className="text-[16px] font-medium text-[#1A1A1A] mb-[6px]">{item.title}</h4>
                <p className="text-[14px] font-light text-[#666666]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Newsletter ── */}
        <div className="min-h-[180px] bg-gradient-to-b from-[#F5F1EA] to-white rounded-[16px] flex flex-col items-center justify-center p-[48px]">
          <h3 className="text-[36px] font-medium text-[#1A1A1A] mb-[12px]">Get Beauty Tips & Exclusive Offers</h3>
          <p className="text-[15px] font-normal text-[#666666] mb-[24px]">Join 50,000+ beauty lovers</p>
          <div className="flex items-center gap-[12px]">
            <input type="email" placeholder="Enter your email" className="w-[360px] h-[56px] px-[20px] bg-white text-[15px] text-[#2B2B2B] rounded-[8px] border border-[#E8E3D9] outline-none" />
            <button className="h-[56px] px-[32px] bg-[#8B7355] text-white text-[15px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors">Subscribe</button>
          </div>
        </div>

      </div>
    </div>
  )
}