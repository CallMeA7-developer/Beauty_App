import {
  IoLeafOutline,
  IoSparkles,
  IoSyncOutline,
  IoBagOutline,
  IoStarSharp,
  IoCheckmark,
  IoChevronDown,
  IoShareOutline,
  IoHeartOutline,
  IoAddOutline,
  IoRemoveOutline,
  IoCarOutline,
  IoReturnDownBackOutline,
  IoShieldCheckmarkOutline,
} from 'react-icons/io5'

export default function ProductDetail() {
  const thumbnailImages = [
    'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=212&h=212&fit=crop',
    'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=212&h=212&fit=crop',
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=212&h=212&fit=crop',
    'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=212&h=212&fit=crop',
    'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=212&h=212&fit=crop',
  ]

  const keyBenefits = [
    'Reduces fine lines by 47% in 4 weeks',
    'Boosts collagen production naturally',
    'Improves skin elasticity and firmness',
    'Hydrates deeply for 24-hour moisture',
    'Brightens and evens skin tone',
    'Minimizes appearance of pores',
  ]

  const applicationSteps = [
    { step: '1', instruction: 'Cleanse and tone your face thoroughly', timing: 'Morning & Evening' },
    { step: '2', instruction: 'Apply 3-4 drops to fingertips and warm between hands', timing: null },
    { step: '3', instruction: 'Gently press into face, neck, and décolletage', timing: 'Use upward motions' },
    { step: '4', instruction: 'Follow with your favorite moisturizer', timing: 'Allow 60 seconds to absorb' },
  ]

  const keyIngredients = [
    { name: 'Palmitoyl Tripeptide-38', scientific: "Matrixyl synthe'6", benefit: 'Stimulates six major components of the skin matrix for comprehensive anti-aging benefits', concentration: '8%' },
    { name: 'Hyaluronic Acid Complex', scientific: 'Sodium Hyaluronate', benefit: 'Multi-molecular weight formula provides deep and surface hydration', concentration: '2%' },
    { name: 'Niacinamide', scientific: 'Vitamin B3', benefit: 'Improves skin barrier function and reduces inflammation', concentration: '5%' },
    { name: 'Retinol Encapsulate', scientific: 'Microencapsulated Retinol', benefit: 'Time-released delivery minimizes irritation while maximizing efficacy', concentration: '0.5%' },
  ]

  const reviews = [
    { avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop', username: 'Jennifer M.', verified: true, tier: 'Elite Member', rating: 5, date: 'Dec 18, 2024', title: 'Life-changing serum!', text: 'I have tried countless serums over the years, but nothing compares to this. After just 3 weeks, my fine lines around my eyes have visibly diminished, and my skin feels incredibly supple.', helpful: 24, notHelpful: 2, skinType: 'Dry', ageRange: '35-44' },
    { avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop', username: 'Sarah K.', verified: true, tier: 'VIP', rating: 5, date: 'Dec 15, 2024', title: 'Best investment in my skincare routine', text: 'This serum has completely transformed my skin. The peptide formula is incredibly effective, and I noticed results within the first week. My skin looks more radiant and feels firmer.', helpful: 18, notHelpful: 1, skinType: 'Combination', ageRange: '45-54' },
    { avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=96&h=96&fit=crop', username: 'Michelle L.', verified: false, tier: null, rating: 4, date: 'Dec 10, 2024', title: 'Excellent quality, pricey but effective', text: 'The quality is undeniable, and I can see improvements in my skin texture and firmness. Will definitely repurchase.', helpful: 12, notHelpful: 0, skinType: 'Normal', ageRange: '25-34' },
  ]

  const relatedProducts = [
    { image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=550&h=640&fit=crop', brand: 'Shan Loray', name: 'Hydrating Essence', price: '$78.00', reviews: 156 },
    { image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=550&h=640&fit=crop', brand: 'Shan Loray', name: 'Night Recovery Cream', price: '$145.00', reviews: 203 },
    { image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=550&h=640&fit=crop', brand: 'Shan Loray', name: 'Radiance Booster', price: '$98.00', reviews: 128 },
    { image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=550&h=640&fit=crop', brand: 'Shan Loray', name: 'Eye Renewal Complex', price: '$124.00', reviews: 184 },
  ]

  const Stars = ({ count = 5, size = '18' }) => [...Array(5)].map((_, i) => (
    <IoStarSharp key={i} className={`w-[${size}px] h-[${size}px] ${i < count ? 'text-[#C9A870]' : 'text-[#E8E3D9]'}`} />
  ))

  return (
    <div className="bg-white font-['Cormorant_Garamond']">

      {/* ── Breadcrumb ── */}
      <div className="px-[120px] py-[20px]">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-[13px] font-light text-[#666666]">
            Home / Skincare / Serums / Age-Defying Serum
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="px-[120px] pb-[64px]">
        <div className="max-w-[1200px] mx-auto">

          {/* ── Product Section ── */}
          <div className="flex gap-[40px] mb-[64px]">

            {/* Left — Gallery */}
            <div className="w-[580px] flex-shrink-0">
              {/* Hero Image */}
              <div className="w-full h-[680px] rounded-[8px] overflow-hidden mb-[20px]">
                <img
                  src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1160&h=1360&fit=crop"
                  alt="Age-Defying Serum"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Thumbnails */}
              <div className="flex gap-[12px] mb-[32px]">
                {thumbnailImages.map((img, idx) => (
                  <div key={idx} className={`w-[106px] h-[106px] rounded-[8px] overflow-hidden cursor-pointer border-2 transition-all ${idx === 0 ? 'border-[#8B7355]' : 'border-transparent hover:border-[#E8E3D9]'}`}>
                    <img src={img} alt={`Product view ${idx + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>

              {/* Feature Icons */}
              <div className="flex gap-[12px]">
                {[
                  { icon: IoLeafOutline, title: 'Cruelty-Free', desc: 'Never Tested on Animals' },
                  { icon: IoSparkles, title: 'Clean Beauty', desc: 'No Harmful Ingredients' },
                  { icon: IoSyncOutline, title: 'Sustainable', desc: 'Eco-Conscious Packaging' },
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
                <span className="text-[12px] font-light text-[#999999] ml-[8px]">Advanced Skincare Collection</span>
              </div>

              <h1 className="text-[36px] font-semibold text-[#1A1A1A] mb-[16px] leading-[1.3]">Age-Defying Serum</h1>

              {/* Rating */}
              <div className="flex items-center gap-[8px] mb-[24px]">
                <div className="flex gap-[2px]">
                  {[...Array(5)].map((_, idx) => <IoStarSharp key={idx} className="w-[18px] h-[18px] text-[#C9A870]" />)}
                </div>
                <span className="text-[15px] font-normal text-[#2B2B2B]">4.9</span>
                <span className="text-[15px] font-normal text-[#8B7355] cursor-pointer hover:underline">(284 reviews)</span>
              </div>

              {/* Price */}
              <div className="mb-[20px]">
                <div className="text-[32px] font-semibold text-[#1A1A1A] mb-[4px]">$156.00</div>
                <div className="text-[14px] font-light text-[#666666]">or 4 interest-free payments of $39.00</div>
              </div>

              {/* Description */}
              <p className="text-[16px] font-normal text-[#3D3D3D] leading-[1.6] mb-[32px]">
                A revolutionary peptide-rich formula that visibly reduces fine lines and wrinkles while boosting skin's natural collagen production. Experience transformative results with our most potent anti-aging serum.
              </p>

              {/* Size Selection */}
              <div className="mb-[24px]">
                <div className="text-[14px] font-medium text-[#1A1A1A] mb-[12px]">Size</div>
                <div className="flex gap-[12px]">
                  {[
                    { size: '30ml', price: '$156', selected: true, badge: null },
                    { size: '50ml', price: '$245', selected: false, badge: 'Best Value' },
                    { size: '100ml', price: '$420', selected: false, badge: null },
                  ].map((option, idx) => (
                    <button key={idx} className={`flex-1 h-[48px] rounded-[8px] text-[14px] font-medium cursor-pointer transition-all ${option.selected ? 'bg-[#8B7355] text-white' : 'bg-white border border-[#E8E3D9] text-[#2B2B2B] hover:border-[#8B7355]'}`}>
                      <div className="flex items-center justify-center gap-[6px]">
                        <span>{option.size} — {option.price}</span>
                        {option.badge && <span className="text-[10px] bg-[#C9A870] text-white px-[6px] py-[2px] rounded-full">{option.badge}</span>}
                      </div>
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
                <button className="w-full h-[56px] bg-[#8B7355] text-white text-[16px] font-semibold rounded-[8px] flex items-center justify-center gap-[10px] cursor-pointer hover:bg-[#7A6347] transition-colors">
                  <IoBagOutline className="w-[20px] h-[20px]" />
                  Add to Cart
                </button>
                <button className="w-full h-[56px] bg-white border-2 border-[#8B7355] text-[#8B7355] text-[16px] font-semibold rounded-[8px] cursor-pointer hover:bg-[#FDFBF7] transition-colors">
                  Buy Now
                </button>
              </div>

              {/* Wishlist & Share */}
              <div className="flex items-center gap-[32px] mb-[32px]">
                <button className="flex items-center gap-[8px] text-[15px] font-normal text-[#666666] cursor-pointer hover:text-[#8B7355] transition-colors">
                  <IoHeartOutline className="w-[18px] h-[18px]" />
                  Add to Wishlist
                </button>
                <button className="flex items-center gap-[8px] text-[15px] font-normal text-[#666666] cursor-pointer hover:text-[#8B7355] transition-colors">
                  <IoShareOutline className="w-[18px] h-[18px]" />
                  Share
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
          <div className="mb-[64px]">
            <div className="border-b border-[#E8E3D9] mb-[32px]">
              <div className="flex gap-[48px]">
                {['Details', 'How to Use', 'Ingredients', 'Reviews'].map((tab, idx) => (
                  <button key={tab} className={`pb-[16px] text-[16px] font-medium cursor-pointer transition-colors ${idx === 0 ? 'text-[#1A1A1A] border-b-[3px] border-[#8B7355]' : 'text-[#666666] hover:text-[#8B7355]'}`}>
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Details Tab */}
            <div>
              <p className="text-[15px] font-normal text-[#3D3D3D] leading-[1.7] mb-[20px]">
                Our Age-Defying Serum represents the pinnacle of skincare science, combining cutting-edge peptide technology with time-tested botanical extracts. This luxurious formula penetrates deeply into the skin's layers to target multiple signs of aging simultaneously.
              </p>
              <p className="text-[15px] font-normal text-[#3D3D3D] leading-[1.7] mb-[40px]">
                Developed in collaboration with leading dermatologists and backed by clinical studies, this powerful serum delivers visible results within just four weeks of consistent use. Suitable for all skin types and free from parabens, sulfates, and synthetic fragrances.
              </p>

              <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[32px]">
                <h3 className="text-[20px] font-semibold text-[#1A1A1A] mb-[28px]">What Makes It Special</h3>
                <div className="grid grid-cols-2 gap-[24px]">
                  {[
                    { icon: IoSparkles, title: 'Advanced Peptide Complex', desc: 'Proprietary blend of six different peptides works synergistically to boost collagen and elastin production' },
                    { icon: IoLeafOutline, title: 'Botanical Antioxidants', desc: 'Green tea, vitamin C, and resveratrol protect against environmental damage and free radicals' },
                    { icon: IoSyncOutline, title: 'Time-Release Technology', desc: 'Microencapsulation ensures active ingredients are delivered gradually for maximum efficacy' },
                    { icon: IoShieldCheckmarkOutline, title: 'Clinically Proven', desc: 'Backed by independent clinical studies showing significant improvement in skin firmness and texture' },
                  ].map((feature, idx) => (
                    <div key={idx} className="flex gap-[16px]">
                      <feature.icon className="w-[24px] h-[24px] text-[#C9A870] flex-shrink-0 mt-[4px]" />
                      <div>
                        <h4 className="text-[16px] font-medium text-[#1A1A1A] mb-[8px]">{feature.title}</h4>
                        <p className="text-[14px] font-normal text-[#666666] leading-[1.5]">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── How to Use ── */}
          <div className="mb-[64px]">
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
                <IoSparkles className="w-[28px] h-[28px] text-[#C9A870] flex-shrink-0" />
                <div>
                  <h4 className="text-[18px] font-medium text-[#1A1A1A] mb-[12px]">Expert Tips</h4>
                  <ul className="space-y-[8px]">
                    {['For best results, use consistently twice daily for at least 4 weeks', 'Always apply to damp skin for enhanced absorption', 'Layer under SPF during daytime use to protect your investment', 'Store in a cool, dry place away from direct sunlight to maintain potency'].map((tip, idx) => (
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

          {/* ── Ingredients ── */}
          <div className="mb-[64px]">
            <h3 className="text-[28px] font-semibold text-[#1A1A1A] mb-[32px]">Ingredients</h3>
            <div className="grid grid-cols-2 gap-[24px] mb-[32px]">
              {keyIngredients.map((ingredient, idx) => (
                <div key={idx} className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[24px]">
                  <div className="flex items-start justify-between mb-[12px]">
                    <div>
                      <h4 className="text-[16px] font-semibold text-[#1A1A1A] mb-[4px]">{ingredient.name}</h4>
                      <p className="text-[13px] font-light italic text-[#999999]">{ingredient.scientific}</p>
                    </div>
                    <div className="bg-[#C9A870] text-white text-[12px] font-medium px-[10px] py-[4px] rounded-full flex-shrink-0 ml-2">
                      {ingredient.concentration}
                    </div>
                  </div>
                  <p className="text-[14px] font-normal text-[#666666] leading-[1.5]">{ingredient.benefit}</p>
                </div>
              ))}
            </div>
            <div className="bg-[#FDFBF7] rounded-[12px] p-[28px]">
              <h4 className="text-[16px] font-medium text-[#1A1A1A] mb-[16px]">Full Ingredient List</h4>
              <p className="text-[15px] font-normal text-[#3D3D3D] leading-[1.7]">
                Water, <span className="font-semibold text-[#8B7355]">Palmitoyl Tripeptide-38</span>, Glycerin, <span className="font-semibold text-[#8B7355]">Sodium Hyaluronate</span>, <span className="font-semibold text-[#8B7355]">Niacinamide</span>, Butylene Glycol, <span className="font-semibold text-[#8B7355]">Retinol</span>, Polysorbate 20, Carbomer, Phenoxyethanol, Caprylyl Glycol, Tocopherol, Green Tea Extract, Resveratrol, Ascorbyl Glucoside, Ceramide NP, Sodium Lactate
              </p>
            </div>
          </div>

          {/* ── Reviews ── */}
          <div className="mb-[64px]">
            <h3 className="text-[28px] font-semibold text-[#1A1A1A] mb-[32px]">Customer Reviews</h3>

            {/* Rating Summary */}
            <div className="bg-gradient-to-br from-[#FDFBF7] to-[#F5F1EA] rounded-[12px] p-[40px] mb-[40px]">
              <div className="flex items-start gap-[48px]">
                <div className="text-center flex-shrink-0">
                  <div className="text-[48px] font-semibold text-[#1A1A1A] mb-[8px]">4.9</div>
                  <div className="flex gap-[4px] mb-[8px] justify-center">
                    {[...Array(5)].map((_, idx) => <IoStarSharp key={idx} className="w-[20px] h-[20px] text-[#C9A870]" />)}
                  </div>
                  <div className="text-[15px] font-normal text-[#666666]">284 reviews</div>
                </div>
                <div className="flex-1">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center gap-[12px] mb-[8px]">
                      <span className="text-[14px] font-normal text-[#666666] w-[60px]">{rating} stars</span>
                      <div className="flex-1 h-[8px] bg-white rounded-full overflow-hidden">
                        <div className="h-full bg-[#C9A870] rounded-full" style={{ width: rating === 5 ? '85%' : rating === 4 ? '12%' : '2%' }} />
                      </div>
                      <span className="text-[14px] font-normal text-[#666666] w-[40px] text-right">{rating === 5 ? '242' : rating === 4 ? '34' : '8'}</span>
                    </div>
                  ))}
                </div>
                <button className="bg-[#8B7355] text-white text-[16px] font-semibold px-[32px] h-[48px] rounded-[8px] cursor-pointer hover:bg-[#7A6347] transition-colors flex-shrink-0">
                  Write a Review
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className="flex gap-[16px] mb-[32px]">
              {['Most Recent', 'Highest Rated', 'Verified Purchase'].map((filter) => (
                <button key={filter} className="flex items-center gap-[8px] bg-white border border-[#E8E3D9] text-[#2B2B2B] text-[14px] font-normal px-[20px] h-[40px] rounded-[8px] cursor-pointer hover:border-[#8B7355] transition-colors">
                  {filter} <IoChevronDown className="w-[16px] h-[16px]" />
                </button>
              ))}
            </div>

            {/* Reviews List */}
            <div className="space-y-[24px] mb-[32px]">
              {reviews.map((review, idx) => (
                <div key={idx} className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-[24px]">
                  <div className="flex gap-[16px] mb-[16px]">
                    <img src={review.avatar} alt={review.username} className="w-[48px] h-[48px] rounded-full object-cover flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center gap-[8px] mb-[4px]">
                        <span className="text-[15px] font-medium text-[#1A1A1A]">{review.username}</span>
                        {review.verified && <div className="bg-[#8B7355] text-white text-[10px] font-normal px-[8px] py-[2px] rounded-full">Verified</div>}
                        {review.tier && <div className="bg-[#C9A870] text-white text-[10px] font-normal px-[8px] py-[2px] rounded-full">{review.tier}</div>}
                      </div>
                      <div className="flex items-center gap-[12px]">
                        <div className="flex gap-[2px]">
                          {[...Array(5)].map((_, i) => <IoStarSharp key={i} className={`w-[16px] h-[16px] ${i < review.rating ? 'text-[#C9A870]' : 'text-[#E8E3D9]'}`} />)}
                        </div>
                        <span className="text-[13px] font-light text-[#999999]">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <h4 className="text-[16px] font-medium text-[#1A1A1A] mb-[8px]">{review.title}</h4>
                  <p className="text-[15px] font-normal text-[#3D3D3D] leading-[1.6] mb-[16px]">{review.text}</p>
                  <div className="flex items-center justify-between pt-[16px] border-t border-[#F5F1EA]">
                    <div className="flex gap-[12px]">
                      <div className="bg-[#F5F1EA] text-[#8B7355] text-[12px] font-normal px-[12px] py-[4px] rounded-full">{review.skinType}</div>
                      <div className="bg-[#F5F1EA] text-[#8B7355] text-[12px] font-normal px-[12px] py-[4px] rounded-full">{review.ageRange}</div>
                    </div>
                    <div className="flex items-center gap-[16px]">
                      <span className="text-[13px] font-normal text-[#666666]">Was this helpful?</span>
                      <button className="text-[13px] font-normal text-[#8B7355] cursor-pointer hover:underline">Yes ({review.helpful})</button>
                      <button className="text-[13px] font-normal text-[#666666] cursor-pointer hover:underline">No ({review.notHelpful})</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button className="bg-white border border-[#8B7355] text-[#8B7355] text-[15px] font-medium px-[48px] h-[48px] rounded-[8px] cursor-pointer hover:bg-[#FDFBF7] transition-colors">
                Load More Reviews
              </button>
            </div>
          </div>

          {/* ── Related Products ── */}
          <div className="mb-[64px]">
            <h3 className="text-[28px] font-semibold text-[#1A1A1A] mb-[32px]">Complete Your Routine</h3>
            <div className="grid grid-cols-4 gap-[20px]">
              {relatedProducts.map((product, idx) => (
                <div key={idx} className="cursor-pointer group">
                  <div className="relative mb-[16px]">
                    <img src={product.image} alt={product.name} className="w-full h-[320px] object-cover rounded-[8px]" />
                    <button className="absolute bottom-[12px] right-[12px] w-[40px] h-[40px] bg-[#8B7355] rounded-full flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
                      <IoBagOutline className="w-[20px] h-[20px] text-white" />
                    </button>
                  </div>
                  <div className="text-[12px] font-light italic text-[#8B7355] mb-[4px]">{product.brand}</div>
                  <h4 className="text-[15px] font-medium text-[#1A1A1A] mb-[4px]">{product.name}</h4>
                  <div className="flex items-center gap-[6px] mb-[4px]">
                    <div className="flex gap-[2px]">
                      {[...Array(5)].map((_, i) => <IoStarSharp key={i} className="w-[14px] h-[14px] text-[#C9A870]" />)}
                    </div>
                    <span className="text-[13px] font-normal text-[#666666]">({product.reviews})</span>
                  </div>
                  <div className="text-[16px] font-semibold text-[#2B2B2B]">{product.price}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Trust Section ── */}
          <div className="bg-[#FDFBF7] rounded-[12px] p-[32px]">
            <div className="grid grid-cols-3 gap-[32px]">
              {[
                { icon: IoCarOutline, title: 'Complimentary Shipping', desc: 'Free shipping on orders $150+' },
                { icon: IoReturnDownBackOutline, title: '60-Day Money-Back Guarantee', desc: 'Full refund if not satisfied' },
                { icon: IoShieldCheckmarkOutline, title: '100% Authentic Products', desc: 'Guaranteed genuine Shan Loray' },
              ].map((item, idx) => (
                <div key={idx} className="text-center">
                  <item.icon className="w-[28px] h-[28px] text-[#8B7355] mx-auto mb-[12px]" />
                  <h4 className="text-[15px] font-medium text-[#2B2B2B] mb-[6px]">{item.title}</h4>
                  <p className="text-[14px] font-light text-[#666666]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="h-[80px]" />
    </div>
  )
}