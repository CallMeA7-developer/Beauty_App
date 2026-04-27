import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import { IoArrowBack, IoTimeOutline, IoCalendarOutline, IoShareSocialOutline, IoHeartOutline, IoCloseOutline, IoLinkOutline, IoLogoWhatsapp, IoLogoInstagram, IoCheckmarkCircle, IoArrowUp } from 'react-icons/io5'

const categoryColors = {
  Skincare: 'bg-[#E8F4F0] text-[#2D7D62]',
  Makeup: 'bg-[#FCE8F3] text-[#9B2C6E]',
  Fragrance: 'bg-[#EEE8F8] text-[#5B3BAD]',
  Wellness: 'bg-[#FFF4E0] text-[#B07500]',
  Trends: 'bg-[#FDE8E8] text-[#C0392B]',
}

const articles = [
  {
    id: 1,
    category: 'Skincare',
    title: 'The Science Behind Hyaluronic Acid: Why Your Skin Needs It',
    excerpt: 'Discover how this powerhouse ingredient holds up to 1000x its weight in water and transforms your skin hydration levels from the inside out.',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=1200&h=600&fit=crop',
    readTime: '5 min read',
    date: 'Apr 8, 2026',
    author: 'Dr. Amelia Rousseau',
    authorRole: 'Dermatologist & Beauty Consultant',
    content: [
      {
        type: 'intro',
        text: 'If there is one ingredient that has earned its legendary status in the skincare world, it is hyaluronic acid. Found naturally in our bodies, this remarkable molecule is responsible for keeping our skin plump, hydrated, and youthful. But what exactly makes it so special, and why should it be a cornerstone of your daily skincare routine?'
      },
      {
        type: 'heading',
        text: 'What Is Hyaluronic Acid?'
      },
      {
        type: 'paragraph',
        text: 'Despite the word "acid" in its name, hyaluronic acid is nothing like the exfoliating acids you may be familiar with. It is a naturally occurring glycosaminoglycan — a type of molecule that plays a critical role in tissue hydration, lubrication, and cellular repair. Your body produces it naturally, and it is found abundantly in your skin, connective tissue, and eyes.'
      },
      {
        type: 'paragraph',
        text: 'The most remarkable property of hyaluronic acid is its extraordinary capacity to hold water. A single molecule can bind up to 1,000 times its own weight in water. This makes it one of the most effective humectants in skincare — drawing moisture from the environment and from the deeper layers of your skin up to the surface.'
      },
      {
        type: 'heading',
        text: 'Why Does Our Skin Need It?'
      },
      {
        type: 'paragraph',
        text: 'As we age, our natural production of hyaluronic acid declines significantly. By the time we reach our mid-40s, we may have lost up to half of our natural hyaluronic acid stores. This loss directly contributes to the thinning of skin, the appearance of fine lines and wrinkles, and a general loss of that plump, dewy complexion we associate with youth.'
      },
      {
        type: 'paragraph',
        text: 'Environmental factors like UV exposure, pollution, and even air conditioning can further accelerate this depletion. This is where topical hyaluronic acid products come in — supplementing what our bodies can no longer produce in sufficient quantities.'
      },
      {
        type: 'heading',
        text: 'How to Use It Correctly'
      },
      {
        type: 'paragraph',
        text: 'The key to getting the most out of hyaluronic acid is applying it to damp skin. Since it is a humectant, it works by drawing moisture toward itself. If you apply it to completely dry skin in a dry environment, it may actually pull moisture from the deeper layers of your skin rather than from the air, potentially leaving skin feeling tight.'
      },
      {
        type: 'tip',
        text: 'Pro Tip: Apply your hyaluronic acid serum immediately after cleansing while your skin is still slightly damp, then seal it in with a moisturizer to lock in that hydration.'
      },
      {
        type: 'paragraph',
        text: 'Look for products that contain multiple molecular weights of hyaluronic acid. Larger molecules work on the surface to instantly plump and smooth, while smaller molecules penetrate deeper for long-lasting hydration. This multi-layered approach gives you both immediate and lasting results.'
      },
      {
        type: 'heading',
        text: 'Who Should Use It?'
      },
      {
        type: 'paragraph',
        text: 'The beauty of hyaluronic acid is its universal appeal. It is suitable for every skin type — oily, dry, combination, sensitive, and everything in between. Because it is a substance naturally found in the body, reactions are exceptionally rare. It is gentle enough for those with rosacea or eczema, and lightweight enough that it will not clog pores on oily skin types.'
      },
      {
        type: 'paragraph',
        text: 'Whether you are in your twenties and looking to maintain your skin\'s natural bounce, or in your fifties seeking to restore lost volume and hydration, hyaluronic acid delivers remarkable, consistent results across all ages and skin concerns.'
      },
    ]
  },
  {
    id: 2,
    category: 'Skincare',
    title: 'Morning vs Evening Skincare: Building the Perfect Routine',
    excerpt: 'Your skin has different needs throughout the day. Learn how to tailor your routine for AM protection and PM repair.',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1200&h=600&fit=crop',
    readTime: '4 min read',
    date: 'Apr 5, 2026',
    author: 'Sophie Laurent',
    authorRole: 'Licensed Esthetician',
    content: [
      {
        type: 'intro',
        text: 'Many people use the same products morning and night without realizing that their skin operates on a biological clock — responding differently to the demands of day versus the restorative power of night. Understanding this difference is the key to unlocking your most effective skincare routine yet.'
      },
      {
        type: 'heading',
        text: 'Your Morning Routine: Protection First'
      },
      {
        type: 'paragraph',
        text: 'During the day, your skin is your armor. It faces UV radiation, pollution, free radicals, and environmental stressors that can cause oxidative damage and premature aging. Your morning routine should therefore focus on protection, antioxidants, and hydration.'
      },
      {
        type: 'paragraph',
        text: 'Start with a gentle cleanser to remove any overnight product residue and sebum. Follow with a vitamin C serum — applied in the morning, vitamin C works synergistically with sunscreen to provide enhanced protection against UV-induced damage. Layer your moisturizer to seal in hydration, and never — ever — skip your SPF. This is non-negotiable.'
      },
      {
        type: 'tip',
        text: 'Morning Routine Order: Cleanser → Toner → Vitamin C Serum → Moisturizer → SPF 30+'
      },
      {
        type: 'heading',
        text: 'Your Evening Routine: Repair and Renew'
      },
      {
        type: 'paragraph',
        text: 'While you sleep, your skin shifts into regeneration mode. Cell turnover increases, collagen production peaks, and blood flow to the skin surges. This is the optimal window to deliver your most active, powerful ingredients — because your skin is primed to absorb and use them.'
      },
      {
        type: 'paragraph',
        text: 'Begin with a thorough double cleanse to remove makeup, SPF, and the accumulated grime of the day. Retinol or retinoids, which can increase sun sensitivity, are perfect for evening use. Peptide-rich serums and rich night creams work their magic while you sleep, and ingredients like niacinamide can address pigmentation and pores without the irritation risk that daytime use might bring.'
      },
      {
        type: 'tip',
        text: 'Evening Routine Order: Oil Cleanser → Foam Cleanser → Exfoliant (2-3x weekly) → Toner → Retinol/Active Serum → Night Cream'
      },
      {
        type: 'heading',
        text: 'The Ingredients That Belong Only at Night'
      },
      {
        type: 'paragraph',
        text: 'Retinoids, AHAs, and BHAs increase photosensitivity and should always be reserved for nighttime use. Similarly, rich occlusive ingredients like petroleum-based products or thick balms are best used at night when they won\'t interfere with your SPF application or feel heavy throughout the day.'
      },
      {
        type: 'paragraph',
        text: 'Building a routine that respects your skin\'s natural rhythms is not about adding more steps — it is about being intentional with what you use and when you use it. With the right morning and evening approach, you will see results that no single routine could achieve alone.'
      },
    ]
  },
  {
    id: 3,
    category: 'Makeup',
    title: 'Achieving the Dewy Glass Skin Look: A Step-by-Step Guide',
    excerpt: 'The Korean beauty trend that took the world by storm. Here\'s exactly how to achieve that luminous, poreless finish.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&h=600&fit=crop',
    readTime: '6 min read',
    date: 'Apr 3, 2026',
    author: 'Mina Park',
    authorRole: 'K-Beauty Expert & Makeup Artist',
    content: [
      {
        type: 'intro',
        text: 'Glass skin — the Korean beauty ideal of skin so clear, smooth, and luminous that it resembles a pane of glass — has captivated the global beauty community for years. But achieving this look is not about heavy makeup. It is about skincare-first artistry and knowing exactly which products to layer for that lit-from-within glow.'
      },
      {
        type: 'heading',
        text: 'Step 1: Start With a Hydrating Skincare Base'
      },
      {
        type: 'paragraph',
        text: 'Glass skin begins long before you open your makeup bag. The foundation of this look is deeply hydrated, well-nourished skin. Begin with a hydrating toner patted generously into the skin using your hands — not a cotton pad, which absorbs product rather than delivering it. Follow with a lightweight essence and a hyaluronic acid serum to plump the skin from within.'
      },
      {
        type: 'heading',
        text: 'Step 2: The Perfect Primer'
      },
      {
        type: 'paragraph',
        text: 'Choose a luminizing, hydrating primer rather than a mattifying one. The goal is to blur imperfections while maintaining a natural, skin-like finish. Look for primers containing light-reflecting particles, glycerin, or dimethicone — these will create the perfect canvas for a seamless foundation application.'
      },
      {
        type: 'heading',
        text: 'Step 3: Light Coverage Foundation'
      },
      {
        type: 'paragraph',
        text: 'Glass skin is not about full coverage. Mix a few drops of your foundation with a drop of facial oil or a hydrating serum for a sheerer, more radiant application. Apply with a damp beauty sponge using a pressing — not swiping — motion to preserve the skin\'s natural texture while evening out tone.'
      },
      {
        type: 'tip',
        text: 'Pro Tip: Apply foundation only where you need it — the center of your face — and blend outward. This creates a natural gradient that enhances rather than masks.'
      },
      {
        type: 'heading',
        text: 'Step 4: Strategic Highlighting'
      },
      {
        type: 'paragraph',
        text: 'The secret weapon of the glass skin look is highlighter placement. Apply a liquid or cream highlighter — never powder — to the high points of your face: the tops of your cheekbones, the bridge of your nose, the cupid\'s bow, and the inner corners of your eyes. Pat it in with your fingertip for the most natural, skin-like finish.'
      },
      {
        type: 'heading',
        text: 'Step 5: The Final Glow'
      },
      {
        type: 'paragraph',
        text: 'Finish with a few spritzes of a facial mist or setting spray to meld everything together and add that final veil of hydration. A product containing glycerin or rosewater will keep skin looking fresh and dewy throughout the day. Avoid powder setting sprays or compact powders over the skin — these will dull the finish.'
      },
      {
        type: 'paragraph',
        text: 'The glass skin look celebrates your natural skin rather than hiding it. Embrace your pores, your natural flush, and your unique texture — and simply amplify the luminosity that was always there.'
      },
    ]
  },
  {
    id: 4,
    category: 'Fragrance',
    title: 'The Art of Layering Fragrances: Create Your Signature Scent',
    excerpt: 'Master the technique of combining perfumes to create a unique scent that is entirely your own and lasts all day.',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=1200&h=600&fit=crop',
    readTime: '5 min read',
    date: 'Mar 30, 2026',
    author: 'Isabelle Moreau',
    authorRole: 'Perfumer & Fragrance Consultant',
    content: [
      {
        type: 'intro',
        text: 'In a world where a single signature scent once defined a woman, today\'s most sophisticated fragrance lovers have discovered something even more compelling: the art of layering. By combining multiple fragrances, you can create something entirely unique — a scent that exists nowhere in the world except on your skin.'
      },
      {
        type: 'heading',
        text: 'Understanding Fragrance Notes'
      },
      {
        type: 'paragraph',
        text: 'Before you begin layering, it helps to understand the architecture of fragrance. Every perfume has three layers of notes: top notes, which you smell immediately and which last around 15-30 minutes; heart or middle notes, which emerge as the top notes fade and form the core of the fragrance; and base notes, which are the deep, long-lasting foundation that lingers for hours.'
      },
      {
        type: 'paragraph',
        text: 'When layering, you are essentially building your own fragrance pyramid — mixing different scents to create a harmonious composition that is more complex and personal than any single bottle could achieve.'
      },
      {
        type: 'heading',
        text: 'The Golden Rules of Layering'
      },
      {
        type: 'paragraph',
        text: 'Start with your heaviest, most complex fragrance as the base. Ouds, musks, and heavy oriental scents form an excellent foundation. Apply this first to warm pulse points — the wrists, the inner elbows, the base of the throat, and behind the knees. These areas generate heat that will help project the fragrance.'
      },
      {
        type: 'tip',
        text: 'Rule of Thumb: Layer complementary families — florals over musks, citrus over woods, light aquatics over warm spice bases. Avoid layering two very similar heavy scents which can clash and become overwhelming.'
      },
      {
        type: 'heading',
        text: 'Practical Layering Combinations'
      },
      {
        type: 'paragraph',
        text: 'A beloved combination for spring and summer is a warm sandalwood or musk base layered with a fresh citrus or green tea top. For autumn and winter, try an oud or amber base with a rose or jasmine heart — the result is intensely feminine and deeply luxurious.'
      },
      {
        type: 'paragraph',
        text: 'Do not overlook unscented or lightly scented body products as a layering base. A fragrance-free body lotion or oil applied before your perfumes creates a moisturized canvas that helps fragrance molecules cling to skin longer — significantly improving the longevity of your layered creation.'
      },
      {
        type: 'heading',
        text: 'Making It Last'
      },
      {
        type: 'paragraph',
        text: 'Layered fragrances tend to last longer than a single scent because the molecules interact with each other and with your skin chemistry in complex ways. To maximize longevity, apply to freshly moisturized skin, focus on pulse points, and resist the urge to rub your wrists together — this breaks down the fragrance molecules and alters the scent.'
      },
    ]
  },
  {
    id: 5,
    category: 'Wellness',
    title: 'Beauty from Within: Foods That Naturally Boost Your Glow',
    excerpt: 'What you eat shows on your skin. Discover the superfoods that dermatologists recommend for radiant, healthy skin.',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&h=600&fit=crop',
    readTime: '7 min read',
    date: 'Mar 28, 2026',
    author: 'Dr. Nadia Hassan',
    authorRole: 'Nutritionist & Holistic Wellness Expert',
    content: [
      {
        type: 'intro',
        text: 'The most powerful skincare products you will ever use do not come in a bottle — they come on a plate. The connection between nutrition and skin health is profound and well-documented. What you eat every single day has a direct, measurable impact on your skin\'s clarity, elasticity, hydration, and radiance.'
      },
      {
        type: 'heading',
        text: 'Antioxidant-Rich Foods: Your Skin\'s Defense Force'
      },
      {
        type: 'paragraph',
        text: 'Free radicals — unstable molecules produced by UV exposure, pollution, and stress — attack healthy skin cells and accelerate aging. Antioxidants neutralize these free radicals before they can cause damage. Blueberries, dark chocolate, green tea, and pomegranate are among the most potent dietary sources of antioxidants available.'
      },
      {
        type: 'paragraph',
        text: 'Vitamin C, found abundantly in citrus fruits, bell peppers, and strawberries, is particularly powerful. It not only neutralizes free radicals but also plays a critical role in collagen synthesis — the structural protein that keeps skin firm, plump, and resilient.'
      },
      {
        type: 'heading',
        text: 'Healthy Fats for a Luminous Complexion'
      },
      {
        type: 'paragraph',
        text: 'The right fats are essential for maintaining the skin\'s lipid barrier — the protective layer that keeps moisture in and irritants out. Omega-3 fatty acids, found in fatty fish like salmon and sardines, walnuts, flaxseeds, and avocado, are particularly important for keeping skin supple, reducing inflammation, and preventing dryness.'
      },
      {
        type: 'tip',
        text: 'Glow Meal Idea: Salmon with avocado and a side of leafy greens dressed in olive oil delivers a concentrated dose of omega-3s, healthy fats, and antioxidants in a single, delicious meal.'
      },
      {
        type: 'heading',
        text: 'Collagen-Boosting Nutrients'
      },
      {
        type: 'paragraph',
        text: 'Collagen — the protein responsible for skin\'s firmness — cannot be effectively delivered through the skin topically. But you can dramatically support your body\'s collagen production through diet. Vitamin C is essential for collagen synthesis. Zinc, found in pumpkin seeds, legumes, and lean meat, activates the proteins necessary for collagen production. Silica, found in cucumbers and leafy greens, also plays a supporting role.'
      },
      {
        type: 'heading',
        text: 'Hydration Beyond Water'
      },
      {
        type: 'paragraph',
        text: 'While drinking adequate water is foundational, certain foods provide structured water — meaning the water within them is more readily absorbed by cells. Cucumbers, watermelon, celery, and leafy greens are up to 95% water and also deliver electrolytes and minerals that support cellular hydration more effectively than plain water alone.'
      },
      {
        type: 'heading',
        text: 'Foods to Minimize'
      },
      {
        type: 'paragraph',
        text: 'Just as certain foods support radiant skin, others undermine it. High-glycemic foods — refined sugars, white bread, processed snacks — trigger insulin spikes that increase sebum production and promote inflammation, both of which contribute to acne and accelerated skin aging. Dairy, for some individuals, may also exacerbate breakouts due to its hormonal content. Alcohol dehydrates the skin and depletes it of essential vitamins.'
      },
      {
        type: 'paragraph',
        text: 'The most effective approach to skin nutrition is simple: eat a diverse, colorful, whole-food diet rich in vegetables, fruits, healthy fats, and lean proteins. Your skin — the largest organ in your body — will reflect every good choice you make at the table.'
      },
    ]
  },
  {
    id: 6,
    category: 'Trends',
    title: 'Spring 2026 Beauty Trends: What the Runways Are Telling Us',
    excerpt: 'From bold monochromatic looks to barely-there skin, here are the biggest beauty moments from this season\'s fashion weeks.',
    image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1200&h=600&fit=crop',
    readTime: '4 min read',
    date: 'Mar 25, 2026',
    author: 'Camille Dubois',
    authorRole: 'Beauty Editor & Trend Forecaster',
    content: [
      {
        type: 'intro',
        text: 'The Spring 2026 fashion weeks delivered a masterclass in beauty contradictions — bold where you expected subtlety, bare where you anticipated drama. From the catwalks of Paris to the runways of New York, a clear narrative is emerging: beauty is becoming both more personal and more daring simultaneously.'
      },
      {
        type: 'heading',
        text: 'Trend 1: The New Monochromatic'
      },
      {
        type: 'paragraph',
        text: 'Monochromatic dressing has long been a wardrobe staple, but this season it has overtaken the makeup world with force. Coordinated lips, cheeks, and eyes in a single family of tones — think terracotta, dusty rose, or warm burgundy across the entire face — creates a cohesive, editorial look that feels effortlessly intentional. The key is keeping the texture consistent: all matte, all satin, or all gloss.'
      },
      {
        type: 'heading',
        text: 'Trend 2: Barely-There Skin'
      },
      {
        type: 'paragraph',
        text: 'In direct response to years of heavy coverage and contouring, Spring 2026 is celebrating skin in its most natural state. Models walked runways with visible freckles, natural flush, and minimal concealment. This is not no-makeup makeup — it is genuinely no makeup, or near to it, celebrating the uniqueness of individual skin.'
      },
      {
        type: 'tip',
        text: 'How to Wear It: Tinted moisturizer, a touch of cream blush, clear brow gel, and a swipe of tinted lip balm. Simple, fresh, and extraordinarily modern.'
      },
      {
        type: 'heading',
        text: 'Trend 3: Graphic Liner Reimagined'
      },
      {
        type: 'paragraph',
        text: 'Graphic liner is nothing new, but this season it has evolved beyond the classic cat eye into something more abstract and expressive. Double liner wings, floating liner disconnected from the lash line, and geometric shapes drawn on the lids and under the brow bone were recurring motifs. The most wearable interpretation is a bold lower lash line liner worn alone — striking but surprisingly easy to recreate.'
      },
      {
        type: 'heading',
        text: 'Trend 4: Cherry Red Everything'
      },
      {
        type: 'paragraph',
        text: 'If one color is defining Spring 2026, it is cherry red. From lips to nails to lids, this saturated, slightly cool-toned red appeared across virtually every major runway. Unlike the classic red lip, which demands the rest of the face be subdued, cherry red this season is being worn boldly alongside other color, in a maximalist celebration of vibrancy.'
      },
      {
        type: 'paragraph',
        text: 'The common thread running through every Spring 2026 trend is confidence — an unapologetic embrace of personal expression. Whether you gravitate toward the barely-there aesthetic or the maximalist color approach, this season encourages you to own your choices fully and wear your beauty with conviction.'
      },
    ]
  },
  {
    id: 7,
    category: 'Skincare',
    title: 'Understanding Your Skin Barrier and Why It Matters',
    excerpt: 'The skin barrier is your body\'s first line of defense. Here\'s how to protect, repair, and strengthen it for healthier skin.',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&h=600&fit=crop',
    readTime: '6 min read',
    date: 'Mar 22, 2026',
    author: 'Dr. Amelia Rousseau',
    authorRole: 'Dermatologist & Beauty Consultant',
    content: [
      {
        type: 'intro',
        text: 'If there is one concept that has transformed modern skincare thinking, it is the skin barrier. Once understood only by dermatologists, the skin barrier — and the catastrophic consequences of damaging it — has become the lens through which millions of people now approach their entire skincare routine.'
      },
      {
        type: 'heading',
        text: 'What Is the Skin Barrier?'
      },
      {
        type: 'paragraph',
        text: 'The skin barrier, technically called the stratum corneum, is the outermost layer of your skin. Think of it as a brick wall: skin cells are the bricks, and a mortar of lipids — including ceramides, cholesterol, and fatty acids — holds them together. This wall serves two equally important functions: it keeps moisture in and it keeps irritants, allergens, bacteria, and pollutants out.'
      },
      {
        type: 'heading',
        text: 'Signs Your Barrier Is Compromised'
      },
      {
        type: 'paragraph',
        text: 'A damaged skin barrier makes itself known in unmistakable ways. Persistent dryness and dehydration, increased sensitivity and reactivity, redness, flakiness, a feeling of tightness, stinging when applying products that never previously caused irritation, and increased breakouts are all hallmark signs of a compromised barrier. If your skincare routine — which once felt comfortable — suddenly feels uncomfortable, your barrier may be struggling.'
      },
      {
        type: 'tip',
        text: 'Common Barrier Destroyers: Over-exfoliating, harsh cleansers, extreme temperatures, unprotected UV exposure, stress, sleep deprivation, and certain medications can all impair barrier function.'
      },
      {
        type: 'heading',
        text: 'How to Repair Your Skin Barrier'
      },
      {
        type: 'paragraph',
        text: 'Barrier repair requires simplification above all else. Strip your routine back to the bare essentials: a gentle, pH-balanced cleanser, a barrier-supportive moisturizer rich in ceramides and fatty acids, and SPF. Temporarily eliminate all actives — retinoids, AHAs, BHAs, and vitamin C — until your skin has recovered.'
      },
      {
        type: 'paragraph',
        text: 'Ceramide-rich moisturizers are particularly effective at barrier repair because ceramides are a primary component of the lipid mortar that holds the barrier together. Products containing niacinamide also support barrier repair by stimulating ceramide production from within the skin itself.'
      },
      {
        type: 'heading',
        text: 'Long-Term Barrier Maintenance'
      },
      {
        type: 'paragraph',
        text: 'A healthy barrier is not maintained through aggressive treatment but through consistent, gentle care. Avoid over-cleansing — once or twice daily is sufficient. Exfoliate no more than two or three times per week, and always follow with hydration. Never skip SPF, which protects the barrier from UV degradation. And respect what your skin is telling you — if something stings, burns, or causes prolonged redness, it is not something your skin currently needs.'
      },
    ]
  },
  {
    id: 8,
    category: 'Makeup',
    title: 'No-Makeup Makeup: The Art of Effortless Beauty',
    excerpt: 'Less is more when it comes to this timeless trend. Master the techniques that enhance your natural features subtly.',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=1200&h=600&fit=crop',
    readTime: '5 min read',
    date: 'Mar 18, 2026',
    author: 'Sophie Laurent',
    authorRole: 'Licensed Esthetician',
    content: [
      {
        type: 'intro',
        text: 'Paradoxically, achieving the "no-makeup" look is one of the most technically demanding things a makeup artist can do. It requires an intimate knowledge of your own features, a restrained hand, and a carefully curated selection of products that enhance without announcing themselves. The goal is simple: to look like yourself, but on your very best day.'
      },
      {
        type: 'heading',
        text: 'Skincare Is Your Foundation'
      },
      {
        type: 'paragraph',
        text: 'The no-makeup makeup look is only achievable on well-prepared skin. This means investing in your skincare routine just as seriously as your makeup collection. Hydrated, smooth skin requires significantly less product to look polished — and the products you do use will apply more seamlessly and last longer. Think of skincare as the canvas that makes the artistry possible.'
      },
      {
        type: 'heading',
        text: 'The Essential Products'
      },
      {
        type: 'paragraph',
        text: 'Tinted moisturizer or a skin tint replaces foundation here — these products even out tone while allowing your natural skin texture to show through. A concealer, applied only where truly needed — under the eyes and over any blemishes — provides targeted coverage without masking the face. Cream blush, patted onto the apples of the cheeks with fingertips, gives the most natural flush.'
      },
      {
        type: 'tip',
        text: 'Key Products: Tinted moisturizer, cream concealer, cream blush, clear or tinted brow gel, mascara on upper lashes only, and a tinted lip balm. That is genuinely all you need.'
      },
      {
        type: 'heading',
        text: 'The Technique That Makes the Difference'
      },
      {
        type: 'paragraph',
        text: 'Application technique is everything in no-makeup makeup. Use your fingertips wherever possible — they warm products and blend them seamlessly into skin in a way no brush or sponge can replicate. Pat and press rather than dragging or swiping. Work quickly so products do not set before you have blended them thoroughly.'
      },
      {
        type: 'heading',
        text: 'Brows: The Most Important Frame'
      },
      {
        type: 'paragraph',
        text: 'In the absence of dramatic eye makeup, your brows become the defining feature of your face. But in the no-makeup look, over-groomed, heavily filled brows will destroy the illusion. Instead, use a clear or very lightly tinted brow gel to groom hairs into place and give them definition without adding obvious color. The goal is polished, not drawn-on.'
      },
      {
        type: 'paragraph',
        text: 'The no-makeup makeup look is ultimately a confidence philosophy as much as a technique. It asks you to trust in your own natural beauty — to see your features not as flaws to be corrected but as characteristics to be gently amplified. Done well, it is the most powerful statement you can make.'
      },
    ]
  },
  {
    id: 9,
    category: 'Wellness',
    title: 'The Connection Between Sleep and Skin Health',
    excerpt: 'Beauty sleep is real. Discover what happens to your skin while you rest and how to maximize your overnight repair.',
    image: 'https://images.unsplash.com/photo-1531353826977-0941b4779a1c?w=1200&h=600&fit=crop',
    readTime: '4 min read',
    date: 'Mar 15, 2026',
    author: 'Dr. Nadia Hassan',
    authorRole: 'Nutritionist & Holistic Wellness Expert',
    content: [
      {
        type: 'intro',
        text: '"Beauty sleep" is not a myth or a metaphor — it is a precisely documented biological reality. During the hours you sleep, your body initiates a cascade of repair and regeneration processes that are impossible to replicate through any topical product or treatment. Understanding this process is the key to unlocking your most radiant complexion.'
      },
      {
        type: 'heading',
        text: 'What Actually Happens to Your Skin While You Sleep'
      },
      {
        type: 'paragraph',
        text: 'In the first hour of deep sleep, the pituitary gland releases a surge of human growth hormone — a critical driver of cellular repair and regeneration. Blood flow to the skin increases significantly, delivering oxygen and nutrients while removing waste products. Cell turnover accelerates to its highest rate of the day. Collagen production peaks. Cortisol levels, which during the day create inflammation and break down collagen, drop dramatically.'
      },
      {
        type: 'paragraph',
        text: 'The cumulative effect of these processes is measurable. Studies have consistently shown that people who sleep seven to nine hours per night exhibit lower rates of skin aging, better skin barrier function, and faster recovery from environmental stressors like UV exposure compared to those who are chronically sleep-deprived.'
      },
      {
        type: 'heading',
        text: 'The Damage of Sleep Deprivation'
      },
      {
        type: 'paragraph',
        text: 'Chronic sleep deprivation has direct, observable consequences for the skin. Elevated cortisol levels break down collagen and elastin. Impaired barrier function leads to increased water loss and greater sensitivity. Compromised circulation results in pallor and dullness. The under-eye area, where skin is thinnest, shows the effects most rapidly — darkness, puffiness, and the appearance of fine lines all worsen with insufficient sleep.'
      },
      {
        type: 'tip',
        text: 'Sleep Optimization Tips: Keep your bedroom cool and dark, establish a consistent sleep schedule, avoid screens for at least 30 minutes before bed, and consider silk pillowcases which create less friction against skin than cotton.'
      },
      {
        type: 'heading',
        text: 'Maximizing Your Skin\'s Overnight Repair'
      },
      {
        type: 'paragraph',
        text: 'To take full advantage of your skin\'s nocturnal repair window, apply your most active, nourishing products before bed. Retinol and retinoids, which stimulate collagen production and accelerate cell turnover, work in concert with the skin\'s natural nighttime renewal cycle. Rich, occlusive moisturizers and overnight masks create a sealed environment that maximizes hydration retention throughout the night.'
      },
      {
        type: 'paragraph',
        text: 'No serum, cream, or treatment can fully compensate for chronic sleep deprivation. Prioritizing consistent, quality sleep is the single most powerful — and most underrated — component of any serious skincare approach. Your skin is counting on those quiet, restorative hours. Give it what it needs.'
      },
    ]
  },
]

export default function JournalArticle() {
  const { t } = useTranslation()
  const { id } = useParams()
  const navigate = useNavigate()
  const [liked, setLiked] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  const article = articles.find(a => a.id === parseInt(id))

  const handleLike = () => setLiked(true)

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const articleUrl = encodeURIComponent(window.location.href)
  const articleTitle = encodeURIComponent(article?.title || '')

  if (!article) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] font-['Cormorant_Garamond'] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-[28px] font-bold text-[#1A1A1A] mb-4">{t('journal.articleNotFound')}</h2>
          <button onClick={() => navigate('/journal')} className="text-[#8B7355] underline text-[16px]">{t('journal.backToJournal')}</button>
        </div>
      </div>
    )
  }

  const related = articles.filter(a => a.id !== article.id && a.category === article.category).slice(0, 3)

  return (
    <div className="bg-[#FDFBF7] font-['Cormorant_Garamond'] min-h-screen">

      {/* Hero Image */}
      <div className="relative h-[300px] md:h-[420px] lg:h-[520px] overflow-hidden">
        <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <button
          onClick={() => navigate('/journal')}
          className="absolute top-6 left-6 md:left-[60px] lg:left-[120px] flex items-center gap-2 text-white text-[13px] font-medium bg-white/10 backdrop-blur px-4 py-2 rounded-full hover:bg-white/20 transition-colors"
        >
          <IoArrowBack className="w-[15px] h-[15px]" /> {t('journal.backToJournal')}
        </button>
        <div className="absolute bottom-8 left-4 md:left-[60px] lg:left-[120px] right-4 md:right-[60px] lg:right-[120px]">
          <span className={`inline-block text-[11px] font-semibold px-3 py-1 rounded-full mb-3 ${categoryColors[article.category]}`}>
            {article.category}
          </span>
          <h1 className="text-[28px] md:text-[40px] lg:text-[52px] font-bold text-white leading-[1.15] max-w-[800px]">{article.title}</h1>
        </div>
      </div>

      {/* Article Meta */}
      <div className="bg-white border-b border-[#E8E3D9] px-4 md:px-[60px] lg:px-[120px] py-5">
        <div className="max-w-[800px] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-[44px] h-[44px] rounded-full bg-gradient-to-br from-[#C9A870] to-[#8B7355] flex items-center justify-center text-white font-bold text-[16px]">
              {article.author.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div>
              <div className="text-[14px] font-semibold text-[#1A1A1A]">{article.author}</div>
              <div className="text-[12px] text-[#999999]">{article.authorRole}</div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-[12px] text-[#999999]">
            <span className="flex items-center gap-1"><IoCalendarOutline className="w-[13px] h-[13px]" />{article.date}</span>
            <span className="flex items-center gap-1"><IoTimeOutline className="w-[13px] h-[13px]" />{article.readTime}</span>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="px-4 md:px-[60px] lg:px-[120px] py-10 lg:py-[64px]">
        <div className="max-w-[800px] mx-auto">
          {article.content.map((block, index) => {
            if (block.type === 'intro') return (
              <p key={index} className="text-[18px] lg:text-[20px] font-light text-[#3D3D3D] leading-[1.8] mb-8 border-l-4 border-[#C9A870] pl-6 italic">
                {block.text}
              </p>
            )
            if (block.type === 'heading') return (
              <h2 key={index} className="text-[24px] lg:text-[28px] font-bold text-[#1A1A1A] mt-10 mb-4">{block.text}</h2>
            )
            if (block.type === 'paragraph') return (
              <p key={index} className="text-[15px] lg:text-[17px] font-light text-[#4A4A4A] leading-[1.9] mb-5">{block.text}</p>
            )
            if (block.type === 'tip') return (
              <div key={index} className="bg-gradient-to-r from-[#F5F1EA] to-[#FDFBF7] border border-[#C9A870] rounded-[12px] p-5 lg:p-6 my-8">
                <p className="text-[14px] lg:text-[15px] font-medium text-[#8B7355] leading-[1.7]">{block.text}</p>
              </div>
            )
            return null
          })}

          {/* Share */}
          <div className="mt-12 pt-8 border-t border-[#E8E3D9]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[14px] text-[#666666]">{t('journal.helpful')}</span>
              <div className="flex gap-3">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 h-[40px] px-5 text-[13px] font-medium rounded-full transition-all ${
                    liked
                      ? 'bg-[#C9A870] text-white'
                      : 'bg-[#F5F1EA] text-[#8B7355] hover:bg-[#E8E3D9]'
                  }`}>
                  <IoHeartOutline className="w-[15px] h-[15px]" />
                  {liked ? t('journal.thanks') : t('journal.like')}
                </button>
                <button
                  onClick={() => setShowShare(!showShare)}
                  className="flex items-center gap-2 h-[40px] px-5 bg-[#F5F1EA] text-[#8B7355] text-[13px] font-medium rounded-full hover:bg-[#E8E3D9] transition-colors">
                  <IoShareSocialOutline className="w-[15px] h-[15px]" /> {t('journal.share')}
                </button>
              </div>
            </div>

            {/* Share Panel */}
            {showShare && (
              <div className="bg-[#FDFBF7] border border-[#E8E3D9] rounded-[16px] p-5 lg:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-[16px] font-semibold text-[#1A1A1A]">{t('journal.shareArticle')}</h4>
                  <button onClick={() => setShowShare(false)}>
                    <IoCloseOutline className="w-[20px] h-[20px] text-[#999999] hover:text-[#1A1A1A]" />
                  </button>
                </div>

                {/* Copy Link */}
                <div className="flex items-center gap-3 bg-white border border-[#E8E3D9] rounded-[10px] p-3 mb-4">
                  <div className="flex-1 text-[12px] text-[#666666] truncate">{window.location.href}</div>
                  <button
                    onClick={handleCopy}
                    className={`flex items-center gap-1.5 h-[34px] px-4 rounded-[8px] text-[12px] font-medium transition-all flex-shrink-0 ${
                      copied ? 'bg-green-100 text-green-600' : 'bg-[#8B7355] text-white hover:bg-[#7a6448]'
                    }`}>
                    {copied ? <><IoCheckmarkCircle className="w-[14px] h-[14px]" /> {t('journal.copied')}</> : <><IoLinkOutline className="w-[14px] h-[14px]" /> {t('journal.copyLink')}</>}
                  </button>
                </div>

                {/* Social Share */}
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={`https://wa.me/?text=${articleTitle}%20${articleUrl}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 p-3 bg-[#25D366] text-white rounded-[10px] hover:opacity-90 transition-opacity">
                    <IoLogoWhatsapp className="w-[20px] h-[20px]" />
                    <span className="text-[13px] font-medium">WhatsApp</span>
                  </a>
                  <a
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 p-3 rounded-[10px] hover:opacity-90 transition-opacity"
                    style={{ background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' }}>
                    <IoLogoInstagram className="w-[20px] h-[20px] text-white" />
                    <span className="text-[13px] font-medium text-white">Instagram</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Articles */}
      {related.length > 0 && (
        <div className="bg-white px-4 md:px-[60px] lg:px-[120px] py-10 lg:py-[64px] border-t border-[#E8E3D9]">
          <div className="max-w-[1200px] mx-auto">
<p className="text-[11px] lg:text-[13px] font-medium text-[#8B7355] tracking-[2px] mb-6">{t('journal.moreFrom')} {article.category.toUpperCase()}</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map(rel => (
                <div
                  key={rel.id}
                  onClick={() => { navigate(`/journal/${rel.id}`); window.scrollTo(0, 0) }}
                  className="group cursor-pointer"
                >
                  <div className="h-[180px] rounded-[10px] overflow-hidden mb-4">
                    <img src={rel.image} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${categoryColors[rel.category]}`}>{rel.category}</span>
                  <h3 className="text-[15px] lg:text-[17px] font-semibold text-[#1A1A1A] mt-2 mb-1 group-hover:text-[#8B7355] transition-colors leading-[1.3]">{rel.title}</h3>
                  <span className="text-[11px] text-[#999999]">{rel.readTime}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Back to Journal */}
      <div className="bg-[#FDFBF7] px-4 md:px-[60px] lg:px-[120px] py-10 text-center">
        <button
          onClick={() => navigate('/journal')}
          className="h-[52px] px-10 bg-[#1A1A1A] text-white text-[14px] font-medium rounded-full hover:bg-[#8B7355] transition-colors"
        >
          {t('journal.backBtn')}
        </button>
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