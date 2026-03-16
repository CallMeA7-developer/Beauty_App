import { Link } from 'react-router-dom'
import { IoStarSharp, IoCheckmarkCircle } from 'react-icons/io5'

export default function HomeMobile() {
  const bestSellers = [
    { name: 'Luminous Youth Elixir', brand: 'Shan Loray', price: '$198', img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=240&h=240&fit=crop' },
    { name: 'Velvet Rose Lip Lacquer', brand: 'Shan Loray', price: '$52', img: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=240&h=240&fit=crop' },
    { name: 'Supreme Radiance Cream', brand: 'Shan Loray', price: '$175', img: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=240&h=240&fit=crop' },
    { name: 'Eye Renewal Complex', brand: 'Shan Loray', price: '$145', img: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=240&h=240&fit=crop' },
    { name: 'Botanical Night Serum', brand: 'Shan Loray', price: '$165', img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=240&h=240&fit=crop' },
  ]

  const newArrivalsSupporting = [
    { name: 'Luminous Face Oil', price: '$165', img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=280&h=280&fit=crop' },
    { name: 'Velvet Skin Primer', price: '$78', img: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=280&h=280&fit=crop' },
    { name: 'Botanical Lip Treatment', price: '$52', img: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=280&h=280&fit=crop' },
  ]

  const testimonials = [
    { review: 'The transformative power of these serums is undeniable. My complexion has never been more luminous and radiant.', name: 'Elena Morozova', location: 'Moscow', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=56&h=56&fit=crop' },
    { review: 'Shan Loray represents the perfect balance of luxury and efficacy. Every product feels like an indulgent ritual.', name: 'Anastasia Volkov', location: 'St. Petersburg', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=56&h=56&fit=crop' },
    { review: 'From the elegant packaging to the exquisite formulations, everything about this brand speaks to quality and care.', name: 'Sofia Ivanova', location: 'Kazan', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=56&h=56&fit=crop' },
  ]

  const instagramImages = [
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=240&h=240&fit=crop',
    'https://images.unsplash.com/photo-1596704017254-9b121068ec31?w=240&h=240&fit=crop',
    'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=240&h=240&fit=crop',
    'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=240&h=240&fit=crop',
    'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=240&h=240&fit=crop',
    'https://images.unsplash.com/photo-1598439210625-5067c578f3f6?w=240&h=240&fit=crop',
    'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=240&h=240&fit=crop',
  ]

  return (
    <div className="w-full bg-white font-['Cormorant_Garamond']">

      {/* ── Hero ── */}
      <section className="w-full relative min-h-[600px]">
        <img
          src="https://images.unsplash.com/photo-1556228720-195a672e8a03?w=440&h=600&fit=crop"
          alt="Luxury skincare golden hour"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
        <div className="absolute bottom-5 left-5 right-5">
          <div className="bg-white/90 backdrop-blur-sm rounded-[12px] p-6">
            <p className="text-[10px] font-light italic text-[#C9A870] tracking-[2px] uppercase mb-3">Spring 2024 Collection</p>
            <h1 className="text-[36px] font-bold text-[#1A1A1A] leading-[1.1] mb-4">The Art of Radiance</h1>
            <p className="text-[15px] font-normal text-[#666666] leading-[1.6] mb-5">
              Discover a luminous transformation through our newest collection, where botanical elegance meets scientific precision
            </p>
            <Link to="/explore">
              <button className="w-[120px] h-[48px] border-[2px] border-[#1A1A1A] text-[14px] font-semibold text-[#1A1A1A]">
                Explore
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Technology Cards ── */}
      <section className="w-full bg-gradient-to-b from-[#FDFBF7] to-[#F5F1EA] px-5 py-8">
        <div className="space-y-4">
          {/* AI Consultation */}
          <div className="bg-white rounded-[16px] shadow-[0_8px_24px_rgba(0,0,0,0.08)] p-7">
            <div className="w-14 h-14 rounded-full bg-[#688B8D] flex items-center justify-center mb-5">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2v4m0 12v4M4.22 4.22l2.83 2.83m9.9 9.9l2.83 2.83M2 12h4m12 0h4M4.22 19.78l2.83-2.83m9.9-9.9l2.83-2.83" />
              </svg>
            </div>
            <h3 className="text-[24px] font-semibold text-[#1A1A1A] mb-3">AI Skin Consultation</h3>
            <p className="text-[14px] font-normal text-[#666666] leading-[1.6] mb-4">
              Advanced dermatological algorithms analyze your unique skin profile to create personalized treatment recommendations
            </p>
            <Link to="/skin-analysis#upload-section">
              <span className="text-[13px] font-medium text-[#8B7355]">Begin Analysis →</span>
            </Link>
          </div>

          {/* Virtual Try-On */}
          <div className="bg-white rounded-[16px] shadow-[0_8px_24px_rgba(0,0,0,0.08)] p-7">
            <div className="w-14 h-14 rounded-full bg-[#D4AFA3] flex items-center justify-center mb-5">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8" />
                <path d="M12 17v4" />
              </svg>
            </div>
            <h3 className="text-[24px] font-semibold text-[#1A1A1A] mb-3">Virtual Try-On Mirror</h3>
            <p className="text-[14px] font-normal text-[#666666] leading-[1.6] mb-4">
              Experience our complete collection through cutting-edge augmented reality technology in real-time
            </p>
            <Link to="/virtual-tryon#tryon-section">
              <span className="text-[13px] font-medium text-[#8B7355]">Try Now →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Featured Collections ── */}
      <section className="w-full bg-white px-5 py-10">
        <div className="space-y-3">
          <Link to="/skincare" className="block relative min-h-[400px] rounded-[8px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop"
              alt="Botanical Serums"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <h3 className="text-[28px] font-semibold text-white">Botanical Serums</h3>
            </div>
          </Link>

          <Link to="/makeup" className="block min-h-[240px] rounded-[8px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=240&fit=crop"
              alt="Artisan Tools"
              className="w-full h-full object-cover"
            />
          </Link>

          <div className="bg-[#EBE6DC] rounded-[8px] p-8">
            <h4 className="text-[20px] font-semibold text-[#2B2B2B] mb-3">Artisan Tools Collection</h4>
            <p className="text-[14px] font-normal text-[#666666] leading-[1.6] mb-4">
              Handcrafted precision instruments designed for the modern beauty ritual, combining traditional craftsmanship with contemporary innovation
            </p>
            <Link to="/technology#how-it-works">
              <span className="text-[13px] font-medium text-[#8B7355]">Discover Tools →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Best Sellers ── */}
      <section className="w-full bg-white py-12">
        <div className="text-center mb-10">
          <h2 className="text-[32px] font-bold text-[#1A1A1A] mb-4">Best Sellers</h2>
          <div className="w-16 h-[3px] bg-[#C9A870] mx-auto" />
        </div>
        <div className="overflow-x-auto px-5" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="flex gap-4" style={{ width: 'max-content' }}>
            {bestSellers.map((product, idx) => (
              <Link
                key={idx}
                to={`/product/${product.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="w-[240px] flex-shrink-0"
              >
                <div className="w-[240px] h-[240px] bg-white rounded-[6px] overflow-hidden mb-4">
                  <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <p className="text-[12px] font-light italic text-[#8B7355] tracking-[1px] mb-2">{product.brand}</p>
                <h4 className="text-[16px] font-medium text-[#2B2B2B] leading-[1.2] mb-2">{product.name}</h4>
                <p className="text-[17px] font-semibold text-[#1A1A1A]">{product.price}</p>
              </Link>
            ))}
          </div>
        </div>
        <div className="text-center mt-8">
          <Link to="/collections#browse-by-category">
            <span className="text-[14px] font-normal text-[#8B7355] underline">View All Products</span>
          </Link>
        </div>
      </section>

      {/* ── New Arrivals ── */}
      <section className="w-full bg-gradient-to-b from-[#FDFBF7] to-[#F9F4EE] py-12">
        <div className="text-center mb-10 px-5">
          <h2 className="text-[32px] font-bold text-[#1A1A1A] mb-2">New Arrivals</h2>
          <p className="text-[12px] font-light italic text-[#C9A870] tracking-[2px] uppercase mb-4">Spring 2024 Limited Edition</p>
          <div className="w-16 h-[3px] bg-[#C9A870] mx-auto" />
        </div>

        {/* Featured product */}
        <div className="px-5 mb-8">
          <div className="relative mb-5">
            <img
              src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=360&fit=crop"
              alt="Ethereal Glow Concentrate"
              className="w-full rounded-[8px] shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
            />
            <div className="absolute top-[-12px] right-[-12px] bg-[#688B8D] h-9 px-4 rounded-[18px] flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
              <span className="text-[11px] font-semibold text-white uppercase tracking-[1.5px]">NEW</span>
            </div>
          </div>

          <div className="bg-white rounded-[16px] shadow-[0_8px_24px_rgba(0,0,0,0.08)] p-6">
            <p className="text-[11px] font-medium text-[#C9A870] tracking-[1.5px] uppercase mb-4">Available March 15</p>
            <h3 className="text-[28px] font-semibold text-[#1A1A1A] leading-[1.15] mb-3">Ethereal Glow Concentrate</h3>
            <p className="text-[24px] font-bold text-[#2B2B2B] mb-5">$285</p>
            <p className="text-[14px] font-normal text-[#666666] leading-[1.6] mb-6">
              A transformative elixir infused with rare Himalayan botanicals and bio-active peptides. Experience visible luminosity within 14 days.
            </p>
            <div className="mb-6 space-y-3">
              {['Reduces visible signs of aging by 40%', 'Enhances natural radiance', 'Sustainable luxury production'].map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <IoCheckmarkCircle className="w-4 h-4 text-[#C9A870] flex-shrink-0 mt-0.5" />
                  <span className="text-[13px] font-normal text-[#2B2B2B] leading-[1.5]">{benefit}</span>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <Link to="/product/ethereal-glow-concentrate">
                <button className="w-full h-12 bg-[#8B7355] text-white text-[14px] font-semibold rounded-[4px]">
                  Pre-Order Now
                </button>
              </Link>
              <button className="w-full h-12 border-[2px] border-[#8B7355] text-[#8B7355] text-[14px] font-semibold rounded-[4px]">
                Notify Me
              </button>
            </div>
          </div>
        </div>

        {/* Supporting products */}
        <div className="px-5">
          <div className="space-y-3">
            {newArrivalsSupporting.map((product, idx) => (
              <Link
                key={idx}
                to={`/product/${product.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="flex items-center gap-3"
              >
                <div className="relative w-[120px] h-[120px] flex-shrink-0 rounded-[8px] overflow-hidden">
                  <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
                  <div className="absolute top-2 left-2 bg-[#D4AFA3] h-6 px-3 rounded-[12px] flex items-center justify-center">
                    <span className="text-[10px] font-semibold text-white uppercase">NEW</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-[16px] font-medium text-[#2B2B2B] leading-[1.2] mb-1">{product.name}</h4>
                  <p className="text-[17px] font-semibold text-[#1A1A1A]">{product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <Link to="/collections" onClick={() => window.scrollTo(0, 0)}>
            <span className="text-[14px] font-medium text-[#8B7355] underline">Explore Full Collection →</span>
          </Link>
        </div>
      </section>

      {/* ── Brand Story ── */}
      <section className="w-full">
        <div className="bg-[#F7F3EB] px-8 py-10">
          <p className="text-[11px] font-light uppercase text-[#C9A870] tracking-[2px] mb-4">PHILOSOPHY</p>
          <h2 className="text-[36px] font-bold text-[#1A1A1A] leading-[1.2] mb-6">Where Science Meets Nature</h2>
          <p className="text-[15px] font-normal text-[#666666] leading-[1.7] mb-4">
            At Shan Loray, we believe true luxury lies in the marriage of cutting-edge biotechnology and timeless botanical wisdom.
          </p>
          <p className="text-[15px] font-normal text-[#666666] leading-[1.7] mb-4">
            Our ingredients are sourced from pristine environments around the world, carefully selected for their potency and ethical cultivation.
          </p>
          <p className="text-[15px] font-normal text-[#666666] leading-[1.7] mb-6">
            This dedication to excellence has made us the choice of discerning individuals who refuse to compromise on quality or integrity.
          </p>
          <Link to="/advanced-formulations#our-story">
            <span className="text-[14px] font-medium text-[#8B7355]">Our Story →</span>
          </Link>
        </div>
        <div className="min-h-[320px]">
          <img
            src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=440&h=320&fit=crop"
            alt="Botanical laboratory"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="w-full bg-gradient-to-b from-[#FDFBF7] to-[#FAF6F0] py-12">
        <div className="text-center mb-10">
          <h2 className="text-[28px] font-semibold text-[#1A1A1A]">Testimonials</h2>
        </div>
        <div className="px-5 space-y-4">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white rounded-[12px] shadow-[0_6px_28px_rgba(0,0,0,0.07)] p-7">
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, i) => (
                  <IoStarSharp key={i} className="w-4 h-4 text-[#C9A870]" />
                ))}
              </div>
              <p className="text-[14px] font-normal italic text-[#666666] leading-[1.6] mb-6">"{t.review}"</p>
              <div className="flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-full object-cover" />
                <div>
                  <p className="text-[15px] font-medium text-[#1A1A1A]">{t.name}</p>
                  <p className="text-[13px] font-normal text-[#999999] mt-0.5">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Instagram Gallery ── */}
      <section className="w-full bg-white py-10">
        <div className="text-center mb-8">
          <h2 className="text-[24px] font-normal text-[#1A1A1A]">@shanloray</h2>
        </div>
        <div className="px-5 mb-8">
          <div className="grid grid-cols-3 gap-[3px]">
            {instagramImages.map((img, idx) => (
              <div key={idx} className="relative aspect-square overflow-hidden cursor-pointer">
                <img src={img} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center px-5">
          <a href="https://instagram.com/shanloray" target="_blank" rel="noopener noreferrer">
            <button className="w-40 h-12 border-[2px] border-[#1A1A1A] text-[13px] font-medium text-[#1A1A1A]">
              Follow Us on Instagram
            </button>
          </a>
        </div>
      </section>

    </div>
  )
}