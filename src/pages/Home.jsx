import { IoCheckmarkCircle, IoChevronBack, IoChevronForward, IoStarSharp } from 'react-icons/io5'

export default function Home() {
  return (
    <div className="bg-white font-['Cormorant_Garamond']">

      {/* ── Hero ── */}
      <section className="w-full relative" style={{ height: '100vh' }}>
        <img
          src="https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1440&h=1080&fit=crop"
          alt="Luxury skincare golden hour"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Floating Content Panel */}
        <div className="absolute" style={{ left: '120px', bottom: '160px', width: '480px' }}>
          <div className="bg-white/85 backdrop-blur-sm rounded-[16px] shadow-[0_12px_48px_rgba(0,0,0,0.12)] p-[48px]">
            <p className="text-[13px] font-light italic text-[#C9A870] tracking-[4px] uppercase mb-6">Spring 2024 Collection</p>
            <h1 className="text-[68px] font-bold text-[#1A1A1A] leading-[1.05] mb-6">The Art of Radiance</h1>
            <p className="text-[19px] font-normal text-[#666666] leading-[1.8] mb-8 max-w-[420px]">
              Discover a luminous transformation through our newest collection, where botanical elegance meets scientific precision
            </p>
            <button className="border-[2px] border-[#1A1A1A] h-[52px] w-[160px] text-[15px] font-semibold text-[#1A1A1A] tracking-[1.5px] hover:bg-[#1A1A1A] hover:text-white transition-all">
              Explore
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-[40px] left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div className="w-[2px] h-[64px] bg-[#C9A870]" />
        </div>
      </section>

      {/* ── Floating Technology Cards ── */}
      <section className="w-full relative" style={{ marginTop: '-80px', height: '440px' }}>
        <div className="relative px-[120px]">
          {/* AI Consultation */}
          <div className="absolute" style={{ left: '180px', top: '0', width: '580px' }}>
            <div className="bg-white rounded-[24px] shadow-[0_12px_48px_rgba(0,0,0,0.12)] p-[64px]">
              <div className="w-[72px] h-[72px] rounded-full bg-[#688B8D] flex items-center justify-center mb-6">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 2v4m0 12v4M4.22 4.22l2.83 2.83m9.9 9.9l2.83 2.83M2 12h4m12 0h4M4.22 19.78l2.83-2.83m9.9-9.9l2.83-2.83" />
                </svg>
              </div>
              <h3 className="text-[36px] font-semibold text-[#1A1A1A] mb-5">AI Skin Consultation</h3>
              <p className="text-[18px] font-normal text-[#666666] leading-[1.7] mb-6">
                Advanced dermatological algorithms analyze your unique skin profile to create personalized treatment recommendations
              </p>
              <span className="text-[15px] font-medium text-[#8B7355] cursor-pointer hover:underline">Begin Analysis →</span>
            </div>
          </div>

          {/* Virtual Try-On */}
          <div className="absolute" style={{ left: '860px', top: '-60px', width: '540px' }}>
            <div className="bg-white rounded-[24px] shadow-[0_12px_48px_rgba(0,0,0,0.12)] p-[64px]">
              <div className="w-[72px] h-[72px] rounded-full bg-[#D4AFA3] flex items-center justify-center mb-6">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <path d="M8 21h8" />
                  <path d="M12 17v4" />
                </svg>
              </div>
              <h3 className="text-[36px] font-semibold text-[#1A1A1A] mb-5">Virtual Try-On Mirror</h3>
              <p className="text-[18px] font-normal text-[#666666] leading-[1.7] mb-6">
                Experience our complete collection through cutting-edge augmented reality technology in real-time
              </p>
              <span className="text-[15px] font-medium text-[#8B7355] cursor-pointer hover:underline">Try Now →</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bento Collections ── */}
      <section className="w-full min-h-[820px] px-[120px] py-[96px]">
        <div className="grid grid-cols-6 gap-[20px]">
          {/* Large Hero Card */}
          <div className="col-span-3 relative min-h-[820px] rounded-[12px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=720&h=820&fit=crop"
              alt="Botanical Serums Collection"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-[48px] left-[48px]">
              <h3 className="text-[44px] font-semibold text-white">Botanical Serums</h3>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-span-3 flex flex-col gap-[20px]">
            <div className="min-h-[400px] rounded-[12px] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=640&h=400&fit=crop"
                alt="Artisan Tools"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-[#EBE6DC] rounded-[12px] p-[56px] min-h-[380px] flex flex-col justify-center">
              <h4 className="text-[28px] font-semibold text-[#2B2B2B] mb-5">Artisan Tools Collection</h4>
              <p className="text-[17px] font-normal text-[#666666] leading-[1.75] mb-6">
                Handcrafted precision instruments designed for the modern beauty ritual, combining traditional craftsmanship with contemporary innovation
              </p>
              <span className="text-[15px] font-medium text-[#8B7355] cursor-pointer hover:underline">Discover Tools →</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Best Sellers ── */}
      <section className="w-full min-h-[680px] bg-white py-[96px] relative">
        <div className="text-center mb-[88px]">
          <h2 className="text-[48px] font-bold text-[#1A1A1A] mb-6">Best Sellers</h2>
          <div className="w-[88px] h-[3px] bg-[#C9A870] mx-auto" />
        </div>

        <div className="px-[120px] relative">
          <div className="flex gap-[32px] overflow-hidden">
            {[
              { name: 'Luminous Youth Elixir', brand: 'Shan Loray', price: '$198', img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=320&h=320&fit=crop' },
              { name: 'Velvet Rose Lip Lacquer', brand: 'Shan Loray', price: '$52', img: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=320&h=320&fit=crop' },
              { name: 'Supreme Radiance Cream', brand: 'Shan Loray', price: '$175', img: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=320&h=320&fit=crop' },
              { name: 'Eye Renewal Complex', brand: 'Shan Loray', price: '$145', img: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=320&h=320&fit=crop' },
              { name: 'Botanical Night Serum', brand: 'Shan Loray', price: '$165', img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=320&h=320&fit=crop' },
            ].map((product, idx) => (
              <div key={idx} className="flex-shrink-0" style={{ width: '320px' }}>
                <div className="min-h-[320px] bg-white rounded-[8px] overflow-hidden mb-6">
                  <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <p className="text-[14px] font-light italic text-[#8B7355] tracking-[1.2px] mb-3">{product.brand}</p>
                <h4 className="text-[20px] font-medium text-[#2B2B2B] leading-[1.2] mb-3">{product.name}</h4>
                <p className="text-[19px] font-semibold text-[#1A1A1A]">{product.price}</p>
              </div>
            ))}
          </div>

          <button className="absolute left-[40px] top-1/2 -translate-y-1/2 w-[48px] h-[48px] rounded-full bg-[#F5F5F5] flex items-center justify-center hover:bg-[#E8E3D9] transition-colors">
            <IoChevronBack className="w-[24px] h-[24px] text-[#2B2B2B]" />
          </button>
          <button className="absolute right-[40px] top-1/2 -translate-y-1/2 w-[48px] h-[48px] rounded-full bg-[#F5F5F5] flex items-center justify-center hover:bg-[#E8E3D9] transition-colors">
            <IoChevronForward className="w-[24px] h-[24px] text-[#2B2B2B]" />
          </button>
        </div>

        <div className="text-center mt-[72px]">
          <span className="text-[16px] font-normal text-[#8B7355] cursor-pointer underline hover:text-[#6b5740] transition-colors">View All Products</span>
        </div>
      </section>

      {/* ── New Arrivals ── */}
      <section className="w-full min-h-[900px] bg-gradient-to-b from-[#FDFBF7] to-[#F9F4EE] py-[96px]">
        <div className="text-center mb-[88px]">
          <h2 className="text-[48px] font-bold text-[#1A1A1A] mb-4">New Arrivals</h2>
          <p className="text-[16px] font-light italic text-[#C9A870] tracking-[2px] uppercase mb-6">Spring 2024 Limited Edition</p>
          <div className="w-[88px] h-[3px] bg-[#C9A870] mx-auto" />
        </div>

        {/* Hero Product */}
        <div className="px-[120px] mb-[80px]">
          <div className="relative flex items-start" style={{ minHeight: '640px' }}>
            <div className="relative" style={{ width: '640px', height: '640px' }}>
              <img
                src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=640&h=640&fit=crop"
                alt="Ethereal Glow Concentrate"
                className="w-full h-full object-cover rounded-[8px] shadow-[0_6px_28px_rgba(0,0,0,0.08)]"
              />
              <div className="absolute top-[-20px] right-[-20px] bg-[#688B8D] h-[48px] px-6 rounded-[24px] flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.15)]">
                <span className="text-[14px] font-semibold text-white uppercase tracking-[1.5px]">NEW</span>
              </div>
            </div>

            <div className="absolute bg-white rounded-[24px] shadow-[0_12px_48px_rgba(0,0,0,0.12)] p-[56px]" style={{ left: '560px', top: '80px', width: '480px' }}>
              <p className="text-[13px] font-medium text-[#C9A870] tracking-[1.5px] uppercase mb-6">Available March 15</p>
              <h3 className="text-[42px] font-semibold text-[#1A1A1A] leading-[1.15] mb-4">Ethereal Glow Concentrate</h3>
              <p className="text-[28px] font-bold text-[#2B2B2B] mb-6">$285</p>
              <p className="text-[17px] font-normal text-[#666666] leading-[1.75] mb-8">
                A transformative elixir infused with rare Himalayan botanicals and bio-active peptides. Experience visible luminosity within 14 days.
              </p>
              <div className="mb-10 space-y-4">
                {[
                  'Reduces visible signs of aging by 40% in clinical trials',
                  'Enhances natural radiance with botanical light-reflecting particles',
                  'Sustainable luxury with carbon-neutral production',
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <IoCheckmarkCircle className="w-[20px] h-[20px] text-[#C9A870] flex-shrink-0 mt-1" />
                    <span className="text-[16px] font-normal text-[#2B2B2B] leading-[1.6]">{benefit}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                <button className="w-full h-[56px] bg-[#8B7355] text-white text-[15px] font-semibold rounded-[4px] tracking-[1px] hover:bg-[#7a6448] transition-colors">
                  Pre-Order Now
                </button>
                <button className="w-full h-[56px] border-[2px] border-[#8B7355] bg-transparent text-[#8B7355] text-[15px] font-semibold rounded-[4px] tracking-[1px] hover:bg-[#8B7355] hover:text-white transition-all">
                  Notify Me
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Supporting Products Grid */}
        <div className="px-[120px] mb-[64px]">
          <div className="flex gap-[32px] justify-center">
            {[
              { name: 'Luminous Face Oil', price: '$165', img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=376&h=376&fit=crop' },
              { name: 'Velvet Skin Primer', price: '$78', img: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=376&h=376&fit=crop' },
              { name: 'Botanical Lip Treatment', price: '$52', img: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=376&h=376&fit=crop' },
            ].map((product, idx) => (
              <div key={idx} style={{ width: '376px' }}>
                <div className="relative min-h-[376px] rounded-[8px] overflow-hidden mb-5">
                  <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
                  <div className="absolute top-[16px] left-[16px] bg-[#D4AFA3] h-[32px] px-4 rounded-[16px] flex items-center justify-center">
                    <span className="text-[12px] font-semibold text-white uppercase tracking-[1px]">NEW</span>
                  </div>
                </div>
                <h4 className="text-[20px] font-medium text-[#2B2B2B] leading-[1.2] mb-3">{product.name}</h4>
                <p className="text-[19px] font-semibold text-[#1A1A1A]">{product.price}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <span className="text-[16px] font-medium text-[#8B7355] cursor-pointer underline hover:text-[#6b5740] transition-colors">Explore Full Collection →</span>
        </div>
      </section>

      {/* ── Brand Story ── */}
      <section className="w-full min-h-[720px] relative overflow-hidden">
        <div className="flex min-h-[720px]">
          <div className="bg-[#F7F3EB] flex flex-col justify-center px-[160px]" style={{ width: '58%' }}>
            <p className="text-[13px] font-light uppercase text-[#C9A870] tracking-[3px] mb-6">PHILOSOPHY</p>
            <h2 className="text-[52px] font-bold text-[#1A1A1A] leading-[1.15] mb-8">Where Science Meets Nature</h2>
            <p className="text-[18px] font-normal text-[#666666] leading-[1.85] mb-6">
              At Shan Loray, we believe true luxury lies in the marriage of cutting-edge biotechnology and timeless botanical wisdom. Each formulation is a testament to our commitment to efficacy, purity, and sustainable beauty.
            </p>
            <p className="text-[18px] font-normal text-[#666666] leading-[1.85] mb-10">
              Our ingredients are sourced from pristine environments around the world, carefully selected for their potency and ethical cultivation.
            </p>
            <span className="text-[16px] font-medium text-[#8B7355] cursor-pointer hover:underline">Our Story →</span>
          </div>
          <div style={{ width: '42%' }}>
            <img
              src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=720&h=720&fit=crop"
              alt="Botanical laboratory"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="w-full min-h-[620px] bg-gradient-to-b from-[#FDFBF7] to-[#FAF6F0] py-[96px]">
        <div className="text-center mb-[80px]">
          <h2 className="text-[42px] font-semibold text-[#1A1A1A]">Testimonials</h2>
        </div>
        <div className="px-[120px] flex gap-[56px] items-start">
          {[
            { quote: 'The transformative power of these serums is undeniable. My complexion has never been more luminous and radiant.', name: 'Elena Morozova', location: 'Moscow', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=72&h=72&fit=crop', offset: 0 },
            { quote: 'Shan Loray represents the perfect balance of luxury and efficacy. Every product feels like an indulgent ritual.', name: 'Anastasia Volkov', location: 'St. Petersburg', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=72&h=72&fit=crop', offset: -40 },
            { quote: 'From the elegant packaging to the exquisite formulations, everything about this brand speaks to quality and care.', name: 'Sofia Ivanova', location: 'Kazan', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=72&h=72&fit=crop', offset: 0 },
          ].map((t, idx) => (
            <div key={idx} className="bg-white rounded-[12px] shadow-[0_6px_28px_rgba(0,0,0,0.07)] p-[52px]" style={{ width: '380px', marginTop: `${t.offset}px` }}>
              <div className="flex gap-[4px] mb-6">
                {[...Array(5)].map((_, i) => (
                  <IoStarSharp key={i} className="w-[20px] h-[20px] text-[#C9A870]" />
                ))}
              </div>
              <p className="text-[17px] font-normal italic text-[#666666] leading-[1.75] mb-8">"{t.quote}"</p>
              <div className="flex items-center gap-4">
                <img src={t.img} alt={t.name} className="w-[72px] h-[72px] rounded-full object-cover" />
                <div>
                  <p className="text-[17px] font-medium text-[#1A1A1A]">{t.name}</p>
                  <p className="text-[15px] font-normal text-[#999999] mt-1">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Instagram Gallery ── */}
      <section className="w-full min-h-[600px] bg-white py-[80px]">
        <div className="text-center mb-[64px]">
          <h2 className="text-[36px] font-normal text-[#1A1A1A]">@shanloray</h2>
        </div>
        <div className="px-[120px] grid grid-cols-4 gap-[4px] mb-[64px]">
          <div className="col-span-2 row-span-2 relative min-h-[300px] overflow-hidden cursor-pointer">
            <img src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&h=600&fit=crop" alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="row-span-2 relative min-h-[300px] overflow-hidden cursor-pointer">
            <img src="https://images.unsplash.com/photo-1596704017254-9b121068ec31?w=300&h=600&fit=crop" alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="relative min-h-[148px] overflow-hidden cursor-pointer">
            <img src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=240&h=240&fit=crop" alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="relative min-h-[148px] overflow-hidden cursor-pointer">
            <img src="https://images.unsplash.com/photo-1571875257727-256c39da42af?w=240&h=240&fit=crop" alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="row-span-2 relative min-h-[300px] overflow-hidden cursor-pointer">
            <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&h=600&fit=crop" alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="row-span-2 relative min-h-[300px] overflow-hidden cursor-pointer">
            <img src="https://images.unsplash.com/photo-1598439210625-5067c578f3f6?w=300&h=600&fit=crop" alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="col-span-2 row-span-2 relative min-h-[300px] overflow-hidden cursor-pointer">
            <img src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&h=600&fit=crop" alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
        </div>
        <div className="text-center">
          <button className="border-[2px] border-[#1A1A1A] h-[52px] w-[220px] text-[15px] font-medium text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-all">
            Follow Us on Instagram
          </button>
        </div>
      </section>

    </div>
  )
}