import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { IoTimeOutline, IoArrowForward, IoSearchOutline } from 'react-icons/io5'

const articles = [
  {
    id: 1,
    category: 'Skincare',
    title: 'The Science Behind Hyaluronic Acid: Why Your Skin Needs It',
    excerpt: 'Discover how this powerhouse ingredient holds up to 1000x its weight in water and transforms your skin hydration levels from the inside out.',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&h=500&fit=crop',
    readTime: '5 min read',
    date: 'Apr 8, 2026',
    featured: true,
  },
  {
    id: 2,
    category: 'Skincare',
    title: 'Morning vs Evening Skincare: Building the Perfect Routine',
    excerpt: 'Your skin has different needs throughout the day. Learn how to tailor your routine for AM protection and PM repair.',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=400&fit=crop',
    readTime: '4 min read',
    date: 'Apr 5, 2026',
    featured: false,
  },
  {
    id: 3,
    category: 'Makeup',
    title: 'Achieving the Dewy Glass Skin Look: A Step-by-Step Guide',
    excerpt: 'The Korean beauty trend that took the world by storm. Here\'s exactly how to achieve that luminous, poreless finish.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=400&fit=crop',
    readTime: '6 min read',
    date: 'Apr 3, 2026',
    featured: false,
  },
  {
    id: 4,
    category: 'Fragrance',
    title: 'The Art of Layering Fragrances: Create Your Signature Scent',
    excerpt: 'Master the technique of combining perfumes to create a unique scent that is entirely your own and lasts all day.',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&h=400&fit=crop',
    readTime: '5 min read',
    date: 'Mar 30, 2026',
    featured: false,
  },
  {
    id: 5,
    category: 'Wellness',
    title: 'Beauty from Within: Foods That Naturally Boost Your Glow',
    excerpt: 'What you eat shows on your skin. Discover the superfoods that dermatologists recommend for radiant, healthy skin.',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&fit=crop',
    readTime: '7 min read',
    date: 'Mar 28, 2026',
    featured: false,
  },
  {
    id: 6,
    category: 'Trends',
    title: 'Spring 2026 Beauty Trends: What the Runways Are Telling Us',
    excerpt: 'From bold monochromatic looks to barely-there skin, here are the biggest beauty moments from this season\'s fashion weeks.',
    image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&h=400&fit=crop',
    readTime: '4 min read',
    date: 'Mar 25, 2026',
    featured: false,
  },
  {
    id: 7,
    category: 'Skincare',
    title: 'Understanding Your Skin Barrier and Why It Matters',
    excerpt: 'The skin barrier is your body\'s first line of defense. Here\'s how to protect, repair, and strengthen it for healthier skin.',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=400&fit=crop',
    readTime: '6 min read',
    date: 'Mar 22, 2026',
    featured: false,
  },
  {
    id: 8,
    category: 'Makeup',
    title: 'No-Makeup Makeup: The Art of Effortless Beauty',
    excerpt: 'Less is more when it comes to this timeless trend. Master the techniques that enhance your natural features subtly.',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&h=400&fit=crop',
    readTime: '5 min read',
    date: 'Mar 18, 2026',
    featured: false,
  },
  {
    id: 9,
    category: 'Wellness',
    title: 'The Connection Between Sleep and Skin Health',
    excerpt: 'Beauty sleep is real. Discover what happens to your skin while you rest and how to maximize your overnight repair.',
    image: 'https://images.unsplash.com/photo-1531353826977-0941b4779a1c?w=600&h=400&fit=crop',
    readTime: '4 min read',
    date: 'Mar 15, 2026',
    featured: false,
  },
]

const categoryColors = {
  Skincare: 'bg-[#E8F4F0] text-[#2D7D62]',
  Makeup: 'bg-[#FCE8F3] text-[#9B2C6E]',
  Fragrance: 'bg-[#EEE8F8] text-[#5B3BAD]',
  Wellness: 'bg-[#FFF4E0] text-[#B07500]',
  Trends: 'bg-[#FDE8E8] text-[#C0392B]',
}

export default function Journal() {
  const { t, i18n } = useTranslation()
  const [activeCategory, setActiveCategory] = useState('All')
  const categories = ['All', 'Skincare', 'Makeup', 'Fragrance', 'Wellness', 'Trends']
  const categoryLabels = {
    'All': t('journal.categories.all'),
    'Skincare': t('journal.categories.skincare'),
    'Makeup': t('journal.categories.makeup'),
    'Fragrance': t('journal.categories.fragrance'),
    'Wellness': t('journal.categories.wellness'),
    'Trends': t('journal.categories.trends'),
  }
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const filtered = articles.filter(a => {
    const matchCat = activeCategory === 'All' || a.category === activeCategory
    const matchSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        a.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCat && matchSearch
  })

  const featured = filtered.find(a => a.featured) || filtered[0]
  const rest = filtered.filter(a => a.id !== featured?.id)

  return (
    <div className="bg-[#FDFBF7] font-['Cormorant_Garamond'] min-h-screen">

      {/* Hero */}
      <div className="bg-gradient-to-b from-[#1A1A1A] to-[#2D2418] px-4 md:px-[60px] lg:px-[120px] py-16 md:py-20 lg:py-[100px] text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #C9A870 0%, transparent 60%), radial-gradient(circle at 70% 50%, #8B7355 0%, transparent 60%)' }} />
        <div className="relative z-10">
          <p className="text-[12px] md:text-[13px] lg:text-[14px] font-light italic text-[#C9A870] tracking-[4px] mb-4">{t('journal.tagline')}</p>
          <h1 className="text-[48px] md:text-[64px] lg:text-[88px] font-bold text-white leading-[1] mb-6">{t('journal.title')}</h1>
          <p className="text-[15px] md:text-[17px] lg:text-[20px] font-light text-[#C9A870]/80 max-w-[560px] mx-auto mb-10">
            {t('journal.subtitle')}
          </p>
          {/* Search */}
          <div className="max-w-[480px] mx-auto relative">
            <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#8B7355]" />
            <input
              type="text"
              placeholder={t('journal.searchPlaceholder')}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full h-[52px] pl-11 pr-5 bg-white/10 backdrop-blur border border-white/20 rounded-full text-[14px] text-white placeholder-white/40 outline-none focus:border-[#C9A870] transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="min-h-[48px] bg-white px-4 md:px-[60px] lg:px-[120px] flex items-center border-b border-[#E8E3D9]">
        <span onClick={() => navigate('/')} className="text-[13px] lg:text-[15px] font-normal text-[#8B7355] cursor-pointer">{t('journal.home')}</span>
        <span className="text-[13px] lg:text-[15px] font-normal text-[#666666] mx-2">/</span>
        <span className="text-[13px] lg:text-[15px] font-normal text-[#666666]">{t('journal.breadcrumb')}</span>
      </div>

      {/* Categories */}
      <div className="px-4 md:px-[60px] lg:px-[120px] py-8 bg-white border-b border-[#E8E3D9]">
        <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 h-[38px] px-5 rounded-full text-[13px] lg:text-[14px] font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-[#1A1A1A] text-white'
                  : 'bg-[#F5F1EA] text-[#666666] hover:bg-[#E8E3D9]'
              }`}
            >
              {categoryLabels[cat] || cat}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 md:px-[60px] lg:px-[120px] py-10 lg:py-[64px]">

        {/* Featured Article */}
        {featured && (
          <div className="max-w-[1200px] mx-auto mb-12 lg:mb-[64px]">
            <p className="text-[11px] lg:text-[13px] font-medium text-[#8B7355] tracking-[2px] mb-4">{t('journal.featuredStory')}</p>
            <div className="bg-white rounded-[16px] overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.08)] grid grid-cols-1 lg:grid-cols-2 group cursor-pointer"
              onClick={() => navigate(`/journal/${featured.id}`)}>
              <div className="relative overflow-hidden h-[280px] lg:h-auto">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className={`text-[11px] font-semibold px-3 py-1 rounded-full ${categoryColors[featured.category]}`}>
                    {featured.category}
                  </span>
                </div>
              </div>
              <div className="p-6 md:p-8 lg:p-[48px] flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[12px] text-[#999999]">{featured.date}</span>
                  <span className="w-[3px] h-[3px] bg-[#C9A870] rounded-full" />
                  <span className="flex items-center gap-1 text-[12px] text-[#999999]">
                    <IoTimeOutline className="w-[13px] h-[13px]" />
                    {featured.readTime}
                  </span>
                </div>
                <h2 className="text-[24px] md:text-[28px] lg:text-[36px] font-bold text-[#1A1A1A] leading-[1.2] mb-4">{featured.title}</h2>
                <p className="text-[14px] lg:text-[16px] font-light text-[#666666] leading-relaxed mb-6">{featured.excerpt}</p>
                <div className="flex items-center gap-2 text-[#8B7355] font-medium text-[14px] group-hover:gap-4 transition-all">
                  {t('journal.readArticle')} <IoArrowForward className="w-[16px] h-[16px]" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        {rest.length > 0 && (
          <div className="max-w-[1200px] mx-auto">
            <p className="text-[11px] lg:text-[13px] font-medium text-[#8B7355] tracking-[2px] mb-6">
{activeCategory === 'All' ? t('journal.latestStories') : (categoryLabels[activeCategory] || activeCategory).toUpperCase()}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {rest.map(article => (
                <div
                  key={article.id}
                  className="bg-white rounded-[12px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)] group cursor-pointer hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-shadow"
                  onClick={() => navigate(`/journal/${article.id}`)}
                >
                  <div className="relative overflow-hidden h-[220px]">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${categoryColors[article.category]}`}>
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 lg:p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[11px] text-[#999999]">{article.date}</span>
                      <span className="w-[3px] h-[3px] bg-[#C9A870] rounded-full" />
                      <span className="flex items-center gap-1 text-[11px] text-[#999999]">
                        <IoTimeOutline className="w-[12px] h-[12px]" />
                        {article.readTime}
                      </span>
                    </div>
                    <h3 className="text-[16px] lg:text-[18px] font-semibold text-[#1A1A1A] leading-[1.3] mb-3 group-hover:text-[#8B7355] transition-colors">{article.title}</h3>
                    <p className="text-[12px] lg:text-[13px] font-light text-[#666666] leading-relaxed mb-4 line-clamp-2">{article.excerpt}</p>
                    <div className="flex items-center gap-2 text-[#8B7355] font-medium text-[13px] group-hover:gap-3 transition-all">
                      {t('journal.readMore')} <IoArrowForward className="w-[14px] h-[14px]" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No results */}
        {filtered.length === 0 && (
          <div className="max-w-[1200px] mx-auto text-center py-20">
            <p className="text-[18px] text-[#999999]">{t('journal.noResults')} "{searchQuery}"</p>
            <button onClick={() => { setSearchQuery(''); setActiveCategory('All') }} className="mt-4 text-[#8B7355] underline text-[14px]">{t('journal.clearFilters')}</button>
          </div>
        )}
      </div>

      {/* Newsletter */}
      <div className="bg-gradient-to-b from-[#1A1A1A] to-[#2D2418] px-4 md:px-[60px] lg:px-[120px] py-16 lg:py-[80px] text-center">
        <p className="text-[12px] font-light italic text-[#C9A870] tracking-[3px] mb-3">{t('journal.stayInspired')}</p>
        <h3 className="text-[28px] md:text-[36px] lg:text-[48px] font-bold text-white mb-4">{t('journal.newsletter')}</h3>
        <p className="text-[14px] lg:text-[16px] font-light text-white/60 mb-8 max-w-[480px] mx-auto">
          {t('journal.newsletterDesc')}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-[460px] mx-auto">
          <input
            type="email"
            placeholder={t('journal.emailPlaceholder')}
            className="flex-1 h-[52px] px-5 bg-white/10 border border-white/20 rounded-[8px] text-[14px] text-white placeholder-white/40 outline-none focus:border-[#C9A870] transition-colors"
          />
          <button className="h-[52px] px-8 bg-[#C9A870] text-white text-[14px] font-medium rounded-[8px] hover:bg-[#b8956a] transition-colors whitespace-nowrap">
            {t('journal.subscribe')}
          </button>
        </div>
      </div>

    </div>
  )
}