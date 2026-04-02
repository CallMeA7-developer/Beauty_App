import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
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
  IoHeart,
  IoAddOutline,
  IoRemoveOutline,
  IoCarOutline,
  IoReturnDownBackOutline,
  IoShieldCheckmarkOutline,
  IoLogoInstagram,
  IoLogoFacebook,
  IoLogoPinterest,
  IoLogoYoutube,
  IoLogoWhatsapp,
  IoLogoTwitter,
  IoCopyOutline,
  IoClose,
  IoStarOutline,
} from 'react-icons/io5'

import {
  productDetailImages     as thumbnailImages,
  productDetailKeyBenefits as keyBenefits,
  productDetailApplicationSteps as applicationSteps,
  productDetailIngredients as keyIngredients,
  productDetailSizes      as sizeOptions,
} from '../data/products'

import { getProductById } from '../lib/productsService'
import LoadingSpinner from '../components/LoadingSpinner'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'
import { useWishlist } from '../contexts/WishlistContext'
import { supabase } from '../lib/supabase'

// ─── Local static data (product-specific, not shared) ─────────────────────────
const trustBadges = [
  { icon: IoCarOutline,             title: 'Free Shipping',       desc: 'On orders over $100'   },
  { icon: IoReturnDownBackOutline,  title: '90-Day Returns',      desc: 'Hassle-free refunds'   },
  { icon: IoShieldCheckmarkOutline, title: 'Authentic Guarantee', desc: '100% genuine products' },
]

// ─── ReviewModal Component ─────────────────────────────────────────────────────
function ReviewModal({ isOpen, onClose, productId, onReviewSubmitted }) {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (rating === 0) {
      setError('Please select a rating')
      return
    }

    if (!title.trim() || !content.trim()) {
      setError('Please fill in all fields')
      return
    }

    setSubmitting(true)

    const { data: { user } } = await supabase.auth.getUser()

    const { error: submitError } = await supabase
      .from('reviews')
      .insert({
        user_id: user.id,
        product_id: productId,
        rating,
        title: title.trim(),
        content: content.trim(),
      })

    setSubmitting(false)

    if (submitError) {
      setError('Failed to submit review. Please try again.')
      console.error('Review submission error:', submitError)
      return
    }

    setRating(0)
    setTitle('')
    setContent('')
    onReviewSubmitted()
    onClose()
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[12px] w-full max-w-[500px] p-6 relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-[#666666] hover:text-[#1A1A1A] transition-colors"
        >
          <IoClose className="w-6 h-6" />
        </button>

        <h3 className="text-[22px] font-semibold text-[#1A1A1A] mb-2">Write a Review</h3>
        <p className="text-[14px] text-[#666666] mb-6">Share your thoughts about this product</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-[14px] font-medium text-[#1A1A1A] mb-2">Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  {star <= (hoverRating || rating) ? (
                    <IoStarSharp className="w-8 h-8 text-[#C9A870]" />
                  ) : (
                    <IoStarOutline className="w-8 h-8 text-[#E8E3D9]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-[14px] font-medium text-[#1A1A1A] mb-2">Review Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Summarize your experience"
              className="w-full h-12 px-4 bg-white text-[14px] text-[#2B2B2B] rounded-[8px] border border-[#E8E3D9] outline-none focus:border-[#8B7355]"
              maxLength={100}
            />
          </div>

          <div className="mb-5">
            <label className="block text-[14px] font-medium text-[#1A1A1A] mb-2">Your Review</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Tell us what you think about this product"
              rows={5}
              className="w-full px-4 py-3 bg-white text-[14px] text-[#2B2B2B] rounded-[8px] border border-[#E8E3D9] outline-none focus:border-[#8B7355] resize-none"
              maxLength={1000}
            />
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-[8px] text-[14px] text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full h-12 bg-[#8B7355] text-white text-[15px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      </div>
    </div>
  )
}

// ─── ShareModal Component ─────────────────────────────────────────────────────
function ShareModal({ isOpen, onClose, productName, productUrl }) {
  const [copied, setCopied] = useState(false)

  if (!isOpen) return null

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(productUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: IoLogoWhatsapp,
      color: 'bg-[#25D366]',
      action: () => window.open(`https://wa.me/?text=Check out this product: ${productUrl}`, '_blank')
    },
    {
      name: 'Instagram',
      icon: IoLogoInstagram,
      color: 'bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737]',
      action: handleCopyLink
    },
    {
      name: 'Facebook',
      icon: IoLogoFacebook,
      color: 'bg-[#1877F2]',
      action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`, '_blank')
    },
    {
      name: 'Twitter/X',
      icon: IoLogoTwitter,
      color: 'bg-[#1DA1F2]',
      action: () => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(productUrl)}&text=${encodeURIComponent(productName)}`, '_blank')
    }
  ]

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[12px] w-full max-w-[400px] p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-[#666666] hover:text-[#1A1A1A] transition-colors"
        >
          <IoClose className="w-6 h-6" />
        </button>

        <h3 className="text-[22px] font-semibold text-[#1A1A1A] mb-2">Share Product</h3>
        <p className="text-[14px] text-[#666666] mb-6">Share this product with your friends</p>

        <div className="grid grid-cols-2 gap-3 mb-4">
          {shareOptions.map((option) => (
            <button
              key={option.name}
              onClick={option.action}
              className="flex items-center gap-3 p-4 rounded-[8px] border border-[#E8E3D9] hover:border-[#8B7355] transition-all"
            >
              <div className={`w-10 h-10 ${option.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                <option.icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-[14px] font-medium text-[#1A1A1A]">{option.name}</span>
            </button>
          ))}
        </div>

        <div className="border-t border-[#E8E3D9] pt-4">
          <button
            onClick={handleCopyLink}
            className="w-full flex items-center justify-center gap-2 h-12 bg-[#8B7355] text-white text-[15px] font-medium rounded-[8px] hover:bg-[#7a6448] transition-colors"
          >
            <IoCopyOutline className="w-5 h-5" />
            {copied ? 'Copied!' : 'Copy Link'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Mobile ───────────────────────────────────────────────────────────────────
function ProductDetailMobile({ product, onOpenAuthModal, reviews, relatedProducts, onReviewSubmitted, userVotes, onVoteChange }) {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { addToCart } = useCart()
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist()
  const [selectedSize, setSelectedSize]   = useState('100ml')
  const [quantity, setQuantity]           = useState(1)
  const [activeThumb, setActiveThumb]     = useState(0)
  const [openSection, setOpenSection]     = useState('description')
  const [showToast, setShowToast]         = useState(false)
  const [toastMessage, setToastMessage]   = useState('Added to cart!')
  const [showShareModal, setShowShareModal] = useState(false)
  const [showReviewModal, setShowReviewModal] = useState(false)

  const toggleSection = (id) => setOpenSection(openSection === id ? null : id)

  const getSizePrice = (size) => {
    const basePrice = product.priceValue
    if (size === '100ml') return Math.round(basePrice)
    if (size === '200ml') return Math.round(basePrice * 1.75)
    if (size === 'Travel 30ml') return Math.round(basePrice * 0.45)
    return Math.round(basePrice)
  }

  const displayPrice = getSizePrice(selectedSize)

  const handleAddToCart = async () => {
    if (!user) {
      onOpenAuthModal()
      return
    }

    const { error } = await addToCart(
      product.id,
      product.name,
      product.image,
      product.brand || 'Shan Loray',
      selectedSize,
      displayPrice,
      quantity
    )

    if (!error) {
      setToastMessage('Added to cart!')
      setShowToast(true)
      setTimeout(() => setShowToast(false), 2000)
    }
  }

  const handleBuyNow = async () => {
    if (!user) {
      onOpenAuthModal()
      return
    }

    await handleAddToCart()
    navigate('/cart')
  }

  const handleWishlist = async () => {
    if (!user) {
      onOpenAuthModal()
      return
    }

    if (isInWishlist(product.id)) {
      await removeFromWishlist(product.id)
    } else {
      await addToWishlist(product.id)
    }
  }

  const handleShare = () => {
    setShowShareModal(true)
  }

  const handleWriteReview = () => {
    if (!user) {
      onOpenAuthModal()
      return
    }
    setShowReviewModal(true)
  }

  const handleRoutineProductAddToCart = async (routineProduct) => {
    if (!user) {
      onOpenAuthModal()
      return
    }

    const { error } = await addToCart(
      routineProduct.id,
      routineProduct.name,
      routineProduct.image,
      routineProduct.brand || 'Shan Loray',
      '100ml',
      Math.round(routineProduct.priceValue),
      1
    )

    if (!error) {
      setToastMessage('Added to cart!')
      setShowToast(true)
      setTimeout(() => setShowToast(false), 2000)
    }
  }

  const handleHelpfulVote = async (reviewId, helpful) => {
    if (!user) {
      onOpenAuthModal()
      return
    }

    const existingVote = userVotes[reviewId]

    if (existingVote !== undefined) {
      if (existingVote === helpful) {
        return
      }

      const { error } = await supabase
        .from('review_helpful')
        .update({ helpful })
        .eq('review_id', reviewId)
        .eq('user_id', user.id)

      if (!error) {
        onVoteChange()
      }
    } else {
      const { error } = await supabase
        .from('review_helpful')
        .insert({
          review_id: reviewId,
          user_id: user.id,
          helpful
        })

      if (!error) {
        onVoteChange()
      }
    }
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-[16px] text-[#666666]">Product not found</p>
      </div>
    )
  }

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0'

  return (
    <div className="w-full min-h-screen bg-white font-['Cormorant_Garamond']">

      {/* Product Image Gallery */}
      <div className="bg-white px-5 pt-5">
        <div className="w-full h-[380px] rounded-[8px] overflow-hidden mb-3">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex gap-2 justify-center mb-4">
          <button className="w-14 h-14 rounded-[8px] overflow-hidden border-2 border-[#8B7355]">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="bg-white px-5 py-4">
        <div className="mb-2">
          <span className="text-[13px] font-light italic text-[#8B7355]">{product.brand}</span>
          <span className="text-[11px] font-light text-[#999999] ml-2">{product.category}</span>
        </div>
        <h1 className="text-[26px] font-semibold text-[#1A1A1A] leading-[1.3] mb-3">{product.name}</h1>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => <IoStarSharp key={i} className="w-4 h-4 text-[#C9A870]" />)}
          </div>
          <span className="text-[14px] font-normal text-[#8B7355] underline">{avgRating} ({reviews.length} reviews)</span>
        </div>

        {/* Price */}
        <div className="mb-4">
          <div className="text-[26px] font-semibold text-[#1A1A1A]">${displayPrice}</div>
          <div className="text-[13px] font-light text-[#666666]">or 4 interest-free payments of ${(displayPrice / 4).toFixed(2)}</div>
        </div>

        {/* Description */}
        <p className="text-[15px] font-normal text-[#3D3D3D] leading-[1.6] mb-5">
          {product.description}
        </p>

        {/* Size */}
        <div className="mb-4">
          <div className="text-[14px] font-medium text-[#1A1A1A] mb-3">Size</div>
          <div className="flex gap-2">
            {sizeOptions.map((opt) => (
              <button
                key={opt.size}
                onClick={() => setSelectedSize(opt.size)}
                className={`flex-1 h-11 rounded-[8px] text-[12px] font-medium flex flex-col items-center justify-center gap-0.5 transition-all ${
                  selectedSize === opt.size ? 'bg-[#8B7355] text-white' : 'bg-white border border-[#E8E3D9] text-[#2B2B2B]'
                }`}
              >
                <span>{opt.size}</span>
                <span className={selectedSize === opt.size ? 'text-white/80' : 'text-[#8B7355]'}>${getSizePrice(opt.size)}</span>
                {opt.badge && <span className="text-[9px] bg-[#C9A870] text-white px-1.5 py-0.5 rounded-full">{opt.badge}</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div className="mb-5">
          <div className="text-[14px] font-medium text-[#1A1A1A] mb-3">Quantity</div>
          <div className="flex items-center w-[120px] h-11 border border-[#E8E3D9] rounded-[8px]">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="flex-1 flex items-center justify-center">
              <IoRemoveOutline className="w-4 h-4 text-[#2B2B2B]" />
            </button>
            <span className="text-[16px] font-medium text-[#1A1A1A]">{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)} className="flex-1 flex items-center justify-center">
              <IoAddOutline className="w-4 h-4 text-[#2B2B2B]" />
            </button>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-3 mb-4">
          <button onClick={handleAddToCart} className="w-full h-14 bg-[#8B7355] text-white text-[16px] font-semibold rounded-[8px] flex items-center justify-center gap-2">
            <IoBagOutline className="w-5 h-5" /> Add to Cart
          </button>
          <button onClick={handleBuyNow} className="w-full h-14 bg-white border-2 border-[#8B7355] text-[#8B7355] text-[16px] font-semibold rounded-[8px]">
            Buy Now
          </button>
        </div>

        {/* Wishlist & Share */}
        <div className="flex items-center gap-6 mb-6">
          <button onClick={handleWishlist} className="flex items-center gap-2 text-[15px] font-normal text-[#666666]">
            {isInWishlist(product.id) ? <IoHeart className="w-[18px] h-[18px] text-[#C9A870]" /> : <IoHeartOutline className="w-[18px] h-[18px]" />} Add to Wishlist
          </button>
          <button onClick={handleShare} className="flex items-center gap-2 text-[15px] font-normal text-[#666666]">
            <IoShareOutline className="w-[18px] h-[18px]" /> Share
          </button>
        </div>

        {/* Toast Notification */}
        {showToast && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-[#2B2B2B] text-white px-6 py-3 rounded-[8px] shadow-lg z-50 text-[14px]">
            {toastMessage}
          </div>
        )}

        {/* Share Modal */}
        <ShareModal
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
          productName={product.name}
          productUrl={window.location.href}
        />

        {/* Review Modal */}
        <ReviewModal
          isOpen={showReviewModal}
          onClose={() => setShowReviewModal(false)}
          productId={product.id}
          onReviewSubmitted={onReviewSubmitted}
        />
      </div>

      {/* Key Benefits */}
      <div className="bg-gradient-to-b from-[#FDFBF7] to-white mx-5 rounded-[12px] p-6 mb-5">
        <h3 className="text-[18px] font-semibold text-[#1A1A1A] mb-4">Why You'll Love It</h3>
        <div className="space-y-3">
          {keyBenefits.map((benefit, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <IoCheckmark className="w-4 h-4 text-[#8B7355] mt-1 flex-shrink-0" />
              <span className="text-[14px] font-normal text-[#2B2B2B]">{benefit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Accordion Sections */}
      <div className="bg-white px-5 mb-5">
        {[
          {
            id: 'description',
            label: 'Full Description',
            content: (
              <p className="text-[14px] font-normal text-[#3D3D3D] leading-[1.7] pb-4">
                Our Botanical Foaming Cleanser transforms from a silky gel into a rich, airy foam that deeply cleanses without compromising your skin's natural balance. Formulated with green tea extract, chamomile, and hyaluronic acid — removes impurities, makeup, and excess oil while delivering essential hydration. pH-balanced formula suitable for daily use, morning and evening.
              </p>
            )
          },
          {
            id: 'howtouse',
            label: 'How to Use',
            content: (
              <div className="space-y-4 pb-4">
                {applicationSteps.map((item) => (
                  <div key={item.step} className="flex gap-3">
                    <div className="w-8 h-8 flex-shrink-0 bg-[#C9A870] rounded-full flex items-center justify-center">
                      <span className="text-[14px] font-semibold text-white">{item.step}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-[14px] font-normal text-[#2B2B2B]">{item.text}</p>
                      {item.timing && <p className="text-[12px] font-light italic text-[#666666]">{item.timing}</p>}
                    </div>
                  </div>
                ))}
              </div>
            )
          },
          {
            id: 'ingredients',
            label: 'Key Ingredients',
            content: (
              <div className="space-y-3 pb-4">
                {keyIngredients.map((ing, idx) => (
                  <div key={idx} className="bg-[#FDFBF7] rounded-[8px] p-3">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="text-[14px] font-semibold text-[#1A1A1A]">{ing.name}</h4>
                      <span className="bg-[#C9A870] text-white text-[10px] font-medium px-2 py-0.5 rounded-full">{ing.concentration}</span>
                    </div>
                    <p className="text-[13px] font-normal text-[#666666]">{ing.benefit}</p>
                  </div>
                ))}
              </div>
            )
          },
          {
            id: 'skintype',
            label: 'Skin Type',
            content: (
              <div className="bg-[#FDFBF7] rounded-[8px] p-4 mb-4">
                <div className="text-[14px] font-medium text-[#1A1A1A] mb-2">Best For</div>
                <div className="flex gap-2 flex-wrap">
                  {['Combination', 'Oily', 'Normal'].map((type) => (
                    <div key={type} className="bg-white border border-[#E8E3D9] text-[#8B7355] text-[13px] font-normal px-3 py-1.5 rounded-full">{type}</div>
                  ))}
                </div>
              </div>
            )
          },
        ].map(({ id, label, content }) => (
          <div key={id} className="border-b border-[#E8E3D9]">
            <button onClick={() => toggleSection(id)} className="w-full flex items-center justify-between py-4">
              <span className="text-[16px] font-medium text-[#1A1A1A]">{label}</span>
              <IoChevronDown className={`w-5 h-5 text-[#8B7355] transition-transform duration-200 ${openSection === id ? 'rotate-180' : ''}`} />
            </button>
            {openSection === id && content}
          </div>
        ))}
      </div>

      {/* Customer Reviews */}
      <div className="bg-white px-5 mb-5">
        <h3 className="text-[22px] font-semibold text-[#1A1A1A] mb-4">Customer Reviews</h3>

        {/* Rating Summary */}
        <div className="bg-gradient-to-br from-[#FDFBF7] to-[#F5F1EA] rounded-[12px] p-5 mb-5">
          <div className="flex items-center gap-5 mb-4">
            <div className="text-center">
              <div className="text-[40px] font-semibold text-[#1A1A1A]">{avgRating}</div>
              <div className="flex gap-1 justify-center mb-1">
                {[...Array(5)].map((_, i) => <IoStarSharp key={i} className="w-4 h-4 text-[#C9A870]" />)}
              </div>
              <div className="text-[12px] font-normal text-[#666666]">{reviews.length} reviews</div>
            </div>
            <div className="flex-1 space-y-1.5">
              {[5,4,3,2,1].map((r) => {
                const count = reviews.filter(rev => rev.rating === r).length
                const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0
                return (
                  <div key={r} className="flex items-center gap-2">
                    <span className="text-[11px] text-[#666666] w-10">{r} stars</span>
                    <div className="flex-1 h-2 bg-white rounded-full overflow-hidden">
                      <div className="h-full bg-[#C9A870]" style={{ width: `${percentage}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <button onClick={handleWriteReview} className="w-full h-12 bg-[#8B7355] text-white text-[15px] font-semibold rounded-[8px]">Write Review</button>
        </div>

        {/* Review Cards */}
        <div className="space-y-4 mb-4">
          {reviews.map((review) => {
            const helpfulCount = review.helpful_votes?.filter(v => v.helpful).length || 0
            const notHelpfulCount = review.helpful_votes?.filter(v => !v.helpful).length || 0
            const userVote = userVotes[review.id]

            return (
              <div key={review.id} className="bg-white border border-[#E8E3D9] rounded-[12px] p-4">
                <div className="flex gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-[#C9A870] flex items-center justify-center text-white font-semibold">
                    {review.user_email ? review.user_email[0].toUpperCase() : 'U'}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-[14px] font-medium text-[#1A1A1A]">{review.user_email?.split('@')[0] || 'Anonymous'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => <IoStarSharp key={i} className={`w-3 h-3 ${i < review.rating ? 'text-[#C9A870]' : 'text-[#E8E3D9]'}`} />)}
                      </div>
                      <span className="text-[11px] font-light text-[#999999]">{new Date(review.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <h4 className="text-[15px] font-medium text-[#1A1A1A] mb-2">{review.title}</h4>
                <p className="text-[13px] font-normal text-[#3D3D3D] leading-[1.6] mb-3">{review.content}</p>
                <div className="flex items-center justify-between pt-3 border-t border-[#F5F1EA]">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleHelpfulVote(review.id, true)}
                      className={`text-[12px] font-normal px-3 py-1 rounded-full transition-colors ${
                        userVote === true
                          ? 'bg-[#8B7355] text-white'
                          : 'bg-[#F5F1EA] text-[#8B7355] hover:bg-[#E8E3D9]'
                      }`}
                    >
                      Yes ({helpfulCount})
                    </button>
                    <button
                      onClick={() => handleHelpfulVote(review.id, false)}
                      className={`text-[12px] font-normal px-3 py-1 rounded-full transition-colors ${
                        userVote === false
                          ? 'bg-[#8B7355] text-white'
                          : 'bg-[#F5F1EA] text-[#8B7355] hover:bg-[#E8E3D9]'
                      }`}
                    >
                      No ({notHelpfulCount})
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {reviews.length === 0 && (
          <div className="text-center py-8">
            <p className="text-[14px] text-[#666666] mb-4">No reviews yet</p>
            <button onClick={handleWriteReview} className="text-[14px] text-[#8B7355] underline">Be the first to review</button>
          </div>
        )}
      </div>

      {/* Complete Your Routine */}
      {relatedProducts.length > 0 && (
        <div className="bg-white px-5 mb-5">
          <h3 className="text-[20px] font-semibold text-[#1A1A1A] mb-4">Complete Your Routine</h3>
          <div className="grid grid-cols-2 gap-3">
            {relatedProducts.map((routineProduct) => (
              <div key={routineProduct.id} className="bg-white rounded-[8px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden">
                <Link to={`/product/${routineProduct.id}`} className="relative h-[160px] block">
                  <img src={routineProduct.image} alt={routineProduct.name} className="w-full h-full object-cover" />
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      handleRoutineProductAddToCart(routineProduct)
                    }}
                    className="absolute bottom-2 right-2 w-8 h-8 bg-[#8B7355] rounded-full flex items-center justify-center hover:bg-[#7a6448] transition-colors"
                  >
                    <IoBagOutline className="w-4 h-4 text-white" />
                  </button>
                </Link>
                <Link to={`/product/${routineProduct.id}`} className="block p-3">
                  <p className="text-[11px] font-light italic text-[#8B7355] mb-1">{routineProduct.brand || 'Shan Loray'}</p>
                  <h4 className="text-[13px] font-medium text-[#1A1A1A] mb-1 line-clamp-2">{routineProduct.name}</h4>
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => <IoStarSharp key={i} className="w-3 h-3 text-[#C9A870]" />)}
                  </div>
                  <span className="text-[15px] font-semibold text-[#1A1A1A]">${Math.round(routineProduct.priceValue)}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Trust Badges */}
      <div className="bg-[#FDFBF7] rounded-[12px] mx-5 p-5 mb-5">
        <div className="space-y-4">
          {trustBadges.map((badge, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <badge.icon className="w-6 h-6 text-[#8B7355]" />
              <div>
                <div className="text-[14px] font-medium text-[#1A1A1A]">{badge.title}</div>
                <div className="text-[12px] font-light text-[#666666]">{badge.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-gradient-to-r from-[#F5F1EA] to-[#FDFBF7] px-5 py-8 mb-5 flex flex-col items-center text-center">
        <h3 className="text-[20px] font-medium text-[#1A1A1A] mb-2">Join Our Beauty Community</h3>
        <p className="text-[13px] font-normal text-[#666666] mb-4">Exclusive offers and skincare tips</p>
        <div className="w-full flex gap-2">
          <input type="email" placeholder="Enter your email" className="flex-1 h-12 px-4 bg-white text-[13px] text-[#2B2B2B] rounded-[8px] border border-[#E8E3D9] outline-none" />
          <button className="h-12 px-5 bg-[#8B7355] text-white text-[14px] font-medium rounded-[8px]">Subscribe</button>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-[#2B2B2B] px-5 py-10">
        <div className="mb-8">
          <h3 className="text-[16px] font-semibold text-white tracking-[2px] mb-2">SHAN LORAY</h3>
          <p className="text-[11px] font-light italic text-[#C4B5A0]">Timeless Luxury Beauty</p>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { title: 'Shop',  links: ['Skincare', 'Makeup', 'Fragrance']          },
            { title: 'Help',  links: ['Contact', 'Shipping', 'Returns']            },
            { title: 'About', links: ['Our Story', 'Ingredients', 'Sustainability'] },
          ].map(({ title, links }) => (
            <div key={title}>
              <h4 className="text-[13px] font-medium text-white mb-3">{title}</h4>
              <div className="space-y-2">
                {links.map((l) => <p key={l} className="text-[12px] font-normal text-[#C4B5A0]">{l}</p>)}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-6 mb-5">
          <IoLogoInstagram className="w-5 h-5 text-[#C4B5A0]" />
          <IoLogoFacebook  className="w-5 h-5 text-[#C4B5A0]" />
          <IoLogoPinterest className="w-5 h-5 text-[#C4B5A0]" />
          <IoLogoYoutube   className="w-5 h-5 text-[#C4B5A0]" />
        </div>
        <div className="border-t border-[#3D3D3D] pt-4 text-center">
          <p className="text-[11px] font-light text-[#808080]">© 2024 Shan Loray. All rights reserved.</p>
        </div>
      </footer>

    </div>
  )
}

// ─── Desktop + Tablet responsive ─────────────────────────────────────────────
function ProductDetailDesktop({ product, onOpenAuthModal, reviews, relatedProducts, onReviewSubmitted, userVotes, onVoteChange }) {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { addToCart } = useCart()
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist()
  const [selectedSize, setSelectedSize]   = useState('100ml')
  const [quantity, setQuantity]           = useState(1)
  const [showToast, setShowToast]         = useState(false)
  const [toastMessage, setToastMessage]   = useState('Added to cart!')
  const [showShareModal, setShowShareModal] = useState(false)
  const [showReviewModal, setShowReviewModal] = useState(false)

  const getSizePrice = (size) => {
    const basePrice = product.priceValue
    if (size === '100ml') return Math.round(basePrice)
    if (size === '200ml') return Math.round(basePrice * 1.75)
    if (size === 'Travel 30ml') return Math.round(basePrice * 0.45)
    return Math.round(basePrice)
  }

  const displayPrice = getSizePrice(selectedSize)

  const handleAddToCart = async () => {
    if (!user) {
      onOpenAuthModal()
      return
    }

    const { error } = await addToCart(
      product.id,
      product.name,
      product.image,
      product.brand || 'Shan Loray',
      selectedSize,
      displayPrice,
      quantity
    )

    if (!error) {
      setToastMessage('Added to cart!')
      setShowToast(true)
      setTimeout(() => setShowToast(false), 2000)
    }
  }

  const handleBuyNow = async () => {
    if (!user) {
      onOpenAuthModal()
      return
    }

    await handleAddToCart()
    navigate('/cart')
  }

  const handleWishlist = async () => {
    if (!user) {
      onOpenAuthModal()
      return
    }

    if (isInWishlist(product.id)) {
      await removeFromWishlist(product.id)
    } else {
      await addToWishlist(product.id)
    }
  }

  const handleShare = () => {
    setShowShareModal(true)
  }

  const handleWriteReview = () => {
    if (!user) {
      onOpenAuthModal()
      return
    }
    setShowReviewModal(true)
  }

  const handleRoutineProductAddToCart = async (routineProduct) => {
    if (!user) {
      onOpenAuthModal()
      return
    }

    const { error } = await addToCart(
      routineProduct.id,
      routineProduct.name,
      routineProduct.image,
      routineProduct.brand || 'Shan Loray',
      '100ml',
      Math.round(routineProduct.priceValue),
      1
    )

    if (!error) {
      setToastMessage('Added to cart!')
      setShowToast(true)
      setTimeout(() => setShowToast(false), 2000)
    }
  }

  const handleHelpfulVote = async (reviewId, helpful) => {
    if (!user) {
      onOpenAuthModal()
      return
    }

    const existingVote = userVotes[reviewId]

    if (existingVote !== undefined) {
      if (existingVote === helpful) {
        return
      }

      const { error } = await supabase
        .from('review_helpful')
        .update({ helpful })
        .eq('review_id', reviewId)
        .eq('user_id', user.id)

      if (!error) {
        onVoteChange()
      }
    } else {
      const { error } = await supabase
        .from('review_helpful')
        .insert({
          review_id: reviewId,
          user_id: user.id,
          helpful
        })

      if (!error) {
        onVoteChange()
      }
    }
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-[16px] text-[#666666]">Product not found</p>
      </div>
    )
  }

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0'

  return (
    <div className="bg-white font-['Cormorant_Garamond']">

      {/* Breadcrumb */}
      <div className="px-6 md:px-[60px] lg:px-[120px] py-[20px]">
        <div className="max-w-[1200px] mx-auto text-[12px] md:text-[13px] font-light text-[#666666]">
          Home / {product.category} / {product.name}
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 md:px-[60px] lg:px-[120px] pb-10 md:pb-14 lg:pb-[64px]">
        <div className="max-w-[1200px] mx-auto">

          {/* Product Section */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-10 lg:gap-[40px] mb-10 md:mb-14 lg:mb-[64px]">

            {/* Left — Gallery */}
            <div className="w-full md:w-[320px] lg:w-[580px] flex-shrink-0">
              <div className="w-full h-[360px] md:h-[420px] lg:h-[680px] rounded-[8px] overflow-hidden mb-4 lg:mb-[20px]">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="flex gap-[8px] lg:gap-[12px] mb-6 lg:mb-[32px]">
                <div className="w-[60px] h-[60px] md:w-[52px] md:h-[52px] lg:w-[106px] lg:h-[106px] rounded-[8px] overflow-hidden cursor-pointer border-2 border-[#8B7355]">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="flex gap-[8px] lg:gap-[12px]">
                {[
                  { icon: IoLeafOutline, title: 'Cruelty-Free', desc: 'Never Tested on Animals'  },
                  { icon: IoSparkles,    title: 'Clean Beauty', desc: 'No Harmful Ingredients'    },
                  { icon: IoSyncOutline, title: 'Sustainable',  desc: 'Eco-Conscious Packaging'   },
                ].map((f, idx) => (
                  <div key={idx} className="flex-1 bg-[#FDFBF7] rounded-[8px] p-3 lg:p-[20px] text-center">
                    <f.icon className="w-[22px] h-[22px] lg:w-[28px] lg:h-[28px] text-[#8B7355] mx-auto mb-[6px] lg:mb-[8px]" />
                    <div className="text-[12px] lg:text-[14px] font-medium text-[#1A1A1A] mb-[3px] lg:mb-[4px]">{f.title}</div>
                    <div className="hidden md:block text-[11px] lg:text-[13px] font-light text-[#666666]">{f.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Info */}
            <div className="flex-1 min-w-0">
              <div className="mb-[8px]">
                <span className="text-[13px] lg:text-[14px] font-light italic text-[#8B7355]">{product.brand}</span>
                <span className="text-[11px] lg:text-[12px] font-light text-[#999999] ml-[8px]">{product.category}</span>
              </div>
              <h1 className="text-[26px] md:text-[30px] lg:text-[36px] font-semibold text-[#1A1A1A] mb-4 lg:mb-[16px] leading-[1.3]">{product.name}</h1>
              <div className="flex items-center gap-[8px] mb-5 lg:mb-[24px]">
                <div className="flex gap-[2px]">
                  {[...Array(5)].map((_, i) => <IoStarSharp key={i} className="w-[16px] h-[16px] lg:w-[18px] lg:h-[18px] text-[#C9A870]" />)}
                </div>
                <span className="text-[14px] lg:text-[15px] font-normal text-[#2B2B2B]">{avgRating}</span>
                <span className="text-[14px] lg:text-[15px] font-normal text-[#8B7355] cursor-pointer hover:underline">({reviews.length} reviews)</span>
              </div>
              <div className="mb-5 lg:mb-[20px]">
                <div className="text-[26px] md:text-[28px] lg:text-[32px] font-semibold text-[#1A1A1A] mb-[4px]">${displayPrice}</div>
                <div className="text-[13px] lg:text-[14px] font-light text-[#666666]">or 4 interest-free payments of ${(displayPrice / 4).toFixed(2)}</div>
              </div>
              <p className="text-[14px] md:text-[15px] lg:text-[16px] font-normal text-[#3D3D3D] leading-[1.6] mb-6 lg:mb-[32px]">
                {product.description}
              </p>

              {/* Size */}
              <div className="mb-5 lg:mb-[24px]">
                <div className="text-[13px] lg:text-[14px] font-medium text-[#1A1A1A] mb-3 lg:mb-[12px]">Size</div>
                <div className="flex gap-[8px] lg:gap-[12px]">
                  {sizeOptions.map((opt, idx) => (
                    <button key={idx} onClick={() => setSelectedSize(opt.size)} className={`flex-1 h-[44px] lg:h-[48px] rounded-[8px] text-[12px] md:text-[13px] lg:text-[14px] font-medium cursor-pointer transition-all ${selectedSize === opt.size ? 'bg-[#8B7355] text-white' : 'bg-white border border-[#E8E3D9] text-[#2B2B2B] hover:border-[#8B7355]'}`}>
                      <div className="flex items-center justify-center gap-[4px] lg:gap-[6px] flex-wrap">
                        <span>{opt.size} — ${getSizePrice(opt.size)}</span>
                        {opt.badge && <span className="text-[9px] lg:text-[10px] bg-[#C9A870] text-white px-[5px] lg:px-[6px] py-[2px] rounded-full">{opt.badge}</span>}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-5 lg:mb-[24px]">
                <div className="text-[13px] lg:text-[14px] font-medium text-[#1A1A1A] mb-3 lg:mb-[12px]">Quantity</div>
                <div className="flex items-center gap-[12px] w-[130px] lg:w-[140px] h-[44px] lg:h-[48px] border border-[#E8E3D9] rounded-[8px]">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="flex-1 flex items-center justify-center"><IoRemoveOutline className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px]" /></button>
                  <span className="text-[15px] lg:text-[16px] font-medium text-[#1A1A1A]">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="flex-1 flex items-center justify-center"><IoAddOutline className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px]" /></button>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col gap-3 lg:gap-[16px] mb-4 lg:mb-[20px]">
                <button onClick={handleAddToCart} className="w-full h-[52px] lg:h-[56px] bg-[#8B7355] text-white text-[15px] lg:text-[16px] font-semibold rounded-[8px] flex items-center justify-center gap-[10px] hover:bg-[#7A6347] transition-colors">
                  <IoBagOutline className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px]" /> Add to Cart
                </button>
                <button onClick={handleBuyNow} className="w-full h-[52px] lg:h-[56px] bg-white border-2 border-[#8B7355] text-[#8B7355] text-[15px] lg:text-[16px] font-semibold rounded-[8px] hover:bg-[#FDFBF7] transition-colors">
                  Buy Now
                </button>
              </div>

              <div className="flex items-center gap-6 lg:gap-[32px] mb-6 lg:mb-[32px]">
                <button onClick={handleWishlist} className="flex items-center gap-[8px] text-[13px] lg:text-[15px] font-normal text-[#666666] hover:text-[#8B7355] transition-colors">
                  {isInWishlist(product.id) ? <IoHeart className="w-[16px] h-[16px] lg:w-[18px] lg:h-[18px] text-[#C9A870]" /> : <IoHeartOutline className="w-[16px] h-[16px] lg:w-[18px] lg:h-[18px]" />} Add to Wishlist
                </button>
                <button onClick={handleShare} className="flex items-center gap-[8px] text-[13px] lg:text-[15px] font-normal text-[#666666] hover:text-[#8B7355] transition-colors">
                  <IoShareOutline className="w-[16px] h-[16px] lg:w-[18px] lg:h-[18px]" /> Share
                </button>
              </div>

              {/* Toast Notification */}
              {showToast && (
                <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-[#2B2B2B] text-white px-6 py-3 rounded-[8px] shadow-lg z-50 text-[14px]">
                  {toastMessage}
                </div>
              )}

              {/* Share Modal */}
              <ShareModal
                isOpen={showShareModal}
                onClose={() => setShowShareModal(false)}
                productName={product.name}
                productUrl={window.location.href}
              />

              {/* Review Modal */}
              <ReviewModal
                isOpen={showReviewModal}
                onClose={() => setShowReviewModal(false)}
                productId={product.id}
                onReviewSubmitted={onReviewSubmitted}
              />

              {/* Key Benefits */}
              <div className="bg-gradient-to-b from-[#FDFBF7] to-white rounded-[12px] p-5 lg:p-[24px]">
                <h3 className="text-[16px] lg:text-[18px] font-semibold text-[#1A1A1A] mb-4 lg:mb-[16px]">Key Benefits</h3>
                <div className="space-y-[10px] lg:space-y-[12px]">
                  {keyBenefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-[10px] lg:gap-[12px]">
                      <IoCheckmark className="w-[15px] h-[15px] lg:w-[16px] lg:h-[16px] text-[#8B7355] mt-[3px] lg:mt-[4px] flex-shrink-0" />
                      <span className="text-[13px] md:text-[14px] lg:text-[15px] font-normal text-[#2B2B2B]">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* How to Use */}
          <div className="mb-10 md:mb-14 lg:mb-[64px]">
            <h3 className="text-[22px] md:text-[24px] lg:text-[28px] font-semibold text-[#1A1A1A] mb-6 lg:mb-[32px]">How to Use</h3>
            <div className="space-y-5 lg:space-y-[24px]">
              {applicationSteps.map((step) => (
                <div key={step.step} className="flex gap-5 lg:gap-[24px]">
                  <div className="w-[44px] h-[44px] lg:w-[56px] lg:h-[56px] flex-shrink-0 bg-[#C9A870] rounded-full flex items-center justify-center">
                    <span className="text-[22px] lg:text-[32px] font-semibold text-white">{step.step}</span>
                  </div>
                  <div className="flex-1 pt-[6px] lg:pt-[8px]">
                    <p className="text-[14px] lg:text-[15px] font-normal text-[#2B2B2B] mb-[4px] lg:mb-[6px]">{step.text}</p>
                    {step.timing && <p className="text-[12px] lg:text-[13px] font-light italic text-[#666666]">{step.timing}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ingredients */}
          <div className="mb-10 md:mb-14 lg:mb-[64px]">
            <h3 className="text-[22px] md:text-[24px] lg:text-[28px] font-semibold text-[#1A1A1A] mb-6 lg:mb-[32px]">Key Ingredients</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-[24px]">
              {keyIngredients.map((ing, idx) => (
                <div key={idx} className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 lg:p-[24px]">
                  <div className="flex items-start justify-between mb-3 lg:mb-[12px]">
                    <h4 className="text-[15px] lg:text-[16px] font-semibold text-[#1A1A1A]">{ing.name}</h4>
                    <div className="bg-[#C9A870] text-white text-[11px] lg:text-[12px] font-medium px-[8px] lg:px-[10px] py-[4px] rounded-full ml-2">{ing.concentration}</div>
                  </div>
                  <p className="text-[13px] lg:text-[14px] font-normal text-[#666666] leading-[1.5]">{ing.benefit}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div className="mb-10 md:mb-14 lg:mb-[64px]">
            <h3 className="text-[22px] md:text-[24px] lg:text-[28px] font-semibold text-[#1A1A1A] mb-6 lg:mb-[32px]">Customer Reviews</h3>
            <div className="bg-gradient-to-br from-[#FDFBF7] to-[#F5F1EA] rounded-[12px] p-6 md:p-8 lg:p-[40px] mb-8 lg:mb-[40px]">
              <div className="flex flex-col md:flex-row items-start gap-6 lg:gap-[48px]">
                <div className="text-center flex-shrink-0">
                  <div className="text-[40px] lg:text-[48px] font-semibold text-[#1A1A1A] mb-[8px]">{avgRating}</div>
                  <div className="flex gap-[4px] mb-[8px] justify-center">
                    {[...Array(5)].map((_, i) => <IoStarSharp key={i} className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#C9A870]" />)}
                  </div>
                  <div className="text-[14px] lg:text-[15px] font-normal text-[#666666]">{reviews.length} reviews</div>
                </div>
                <div className="flex-1 w-full">
                  {[5,4,3,2,1].map((r) => {
                    const count = reviews.filter(rev => rev.rating === r).length
                    const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0
                    return (
                      <div key={r} className="flex items-center gap-3 lg:gap-[12px] mb-[8px]">
                        <span className="text-[13px] lg:text-[14px] font-normal text-[#666666] w-[52px] lg:w-[60px]">{r} stars</span>
                        <div className="flex-1 h-[7px] lg:h-[8px] bg-white rounded-full overflow-hidden">
                          <div className="h-full bg-[#C9A870] rounded-full" style={{ width: `${percentage}%` }} />
                        </div>
                      </div>
                    )
                  })}
                </div>
                <button onClick={handleWriteReview} className="w-full md:w-auto bg-[#8B7355] text-white text-[14px] lg:text-[16px] font-semibold px-6 lg:px-[32px] h-[44px] lg:h-[48px] rounded-[8px] hover:bg-[#7A6347] transition-colors flex-shrink-0">
                  Write a Review
                </button>
              </div>
            </div>

            <div className="space-y-5 lg:space-y-[24px] mb-6 lg:mb-[32px]">
              {reviews.map((review) => {
                const helpfulCount = review.helpful_votes?.filter(v => v.helpful).length || 0
                const notHelpfulCount = review.helpful_votes?.filter(v => !v.helpful).length || 0
                const userVote = userVotes[review.id]

                return (
                  <div key={review.id} className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 lg:p-[24px]">
                    <div className="flex gap-4 lg:gap-[16px] mb-4 lg:mb-[16px]">
                      <div className="w-[44px] h-[44px] lg:w-[48px] lg:h-[48px] rounded-full bg-[#C9A870] flex items-center justify-center text-white font-semibold flex-shrink-0">
                        {review.user_email ? review.user_email[0].toUpperCase() : 'U'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-[8px] mb-[4px] flex-wrap">
                          <span className="text-[14px] lg:text-[15px] font-medium text-[#1A1A1A]">{review.user_email?.split('@')[0] || 'Anonymous'}</span>
                        </div>
                        <div className="flex items-center gap-3 lg:gap-[12px]">
                          <div className="flex gap-[2px]">
                            {[...Array(5)].map((_, i) => <IoStarSharp key={i} className={`w-[14px] h-[14px] lg:w-[16px] lg:h-[16px] ${i < review.rating ? 'text-[#C9A870]' : 'text-[#E8E3D9]'}`} />)}
                          </div>
                          <span className="text-[12px] lg:text-[13px] font-light text-[#999999]">{new Date(review.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <h4 className="text-[15px] lg:text-[16px] font-medium text-[#1A1A1A] mb-[8px]">{review.title}</h4>
                    <p className="text-[13px] md:text-[14px] lg:text-[15px] font-normal text-[#3D3D3D] leading-[1.6] mb-4 lg:mb-[16px]">{review.content}</p>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-4 lg:pt-[16px] border-t border-[#F5F1EA]">
                      <div className="flex gap-[8px] lg:gap-[12px]">
                        <span className="text-[12px] lg:text-[13px] font-normal text-[#666666]">Was this helpful?</span>
                      </div>
                      <div className="flex items-center gap-3 lg:gap-[16px]">
                        <button
                          onClick={() => handleHelpfulVote(review.id, true)}
                          className={`text-[12px] lg:text-[13px] font-normal px-4 py-2 rounded-[8px] transition-colors ${
                            userVote === true
                              ? 'bg-[#8B7355] text-white'
                              : 'bg-[#F5F1EA] text-[#8B7355] hover:bg-[#E8E3D9]'
                          }`}
                        >
                          Yes ({helpfulCount})
                        </button>
                        <button
                          onClick={() => handleHelpfulVote(review.id, false)}
                          className={`text-[12px] lg:text-[13px] font-normal px-4 py-2 rounded-[8px] transition-colors ${
                            userVote === false
                              ? 'bg-[#8B7355] text-white'
                              : 'bg-[#F5F1EA] text-[#8B7355] hover:bg-[#E8E3D9]'
                          }`}
                        >
                          No ({notHelpfulCount})
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {reviews.length === 0 && (
              <div className="text-center py-8">
                <p className="text-[14px] text-[#666666] mb-4">No reviews yet</p>
                <button onClick={handleWriteReview} className="text-[14px] text-[#8B7355] underline">Be the first to review</button>
              </div>
            )}
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mb-10 md:mb-14 lg:mb-[64px]">
              <h3 className="text-[22px] md:text-[24px] lg:text-[28px] font-semibold text-[#1A1A1A] mb-6 lg:mb-[32px]">Complete Your Routine</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-[20px]">
                {relatedProducts.map((routineProduct) => (
                  <div key={routineProduct.id} className="cursor-pointer group">
                    <Link to={`/product/${routineProduct.id}`} className="relative mb-3 lg:mb-[16px] block">
                      <img src={routineProduct.image} alt={routineProduct.name} className="w-full h-[200px] md:h-[240px] lg:h-[320px] object-cover rounded-[8px]" />
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          handleRoutineProductAddToCart(routineProduct)
                        }}
                        className="absolute bottom-[10px] right-[10px] lg:bottom-[12px] lg:right-[12px] w-[36px] h-[36px] lg:w-[40px] lg:h-[40px] bg-[#8B7355] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:bg-[#7a6448]"
                      >
                        <IoBagOutline className="w-[16px] h-[16px] lg:w-[20px] lg:h-[20px] text-white" />
                      </button>
                    </Link>
                    <Link to={`/product/${routineProduct.id}`}>
                      <div className="text-[11px] lg:text-[12px] font-light italic text-[#8B7355] mb-[4px]">{routineProduct.brand || 'Shan Loray'}</div>
                      <h4 className="text-[13px] md:text-[14px] lg:text-[15px] font-medium text-[#1A1A1A] mb-[4px]">{routineProduct.name}</h4>
                      <div className="flex items-center gap-[4px] lg:gap-[6px] mb-[4px]">
                        <div className="flex gap-[2px]">
                          {[...Array(5)].map((_, i) => <IoStarSharp key={i} className="w-[12px] h-[12px] lg:w-[14px] lg:h-[14px] text-[#C9A870]" />)}
                        </div>
                      </div>
                      <div className="text-[14px] md:text-[15px] lg:text-[16px] font-semibold text-[#2B2B2B]">${Math.round(routineProduct.priceValue)}</div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trust Section */}
          <div className="bg-[#FDFBF7] rounded-[12px] p-6 md:p-8 lg:p-[32px]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-[32px]">
              {trustBadges.map((item, idx) => (
                <div key={idx} className="flex md:flex-col md:items-center md:text-center items-center gap-4 md:gap-0">
                  <item.icon className="w-[24px] h-[24px] lg:w-[28px] lg:h-[28px] text-[#8B7355] md:mx-auto md:mb-[12px] flex-shrink-0" />
                  <div>
                    <h4 className="text-[14px] lg:text-[15px] font-medium text-[#2B2B2B] md:mb-[6px]">{item.title}</h4>
                    <p className="text-[12px] md:text-[13px] lg:text-[14px] font-light text-[#666666]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
      <div className="h-[40px] md:h-[60px] lg:h-[80px]" />
    </div>
  )
}

// ─── Main Export (Switcher) ───────────────────────────────────────────────────
export default function ProductDetail() {
  const { id } = useParams()
  const { user, openAuthModal } = useAuth()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640)
  const [reviews, setReviews] = useState([])
  const [relatedProducts, setRelatedProducts] = useState([])
  const [userVotes, setUserVotes] = useState({})
  const [reviewsKey, setReviewsKey] = useState(0)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true)
      const data = await getProductById(id)
      setProduct(data)
      setLoading(false)
    }
    if (id) {
      fetchProduct()
    }
  }, [id])

  useEffect(() => {
    async function fetchReviews() {
      if (!id) return

      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          helpful_votes:review_helpful(*)
        `)
        .eq('product_id', id)
        .order('created_at', { ascending: false })

      if (!error && data) {
        const reviewsWithEmails = await Promise.all(
          data.map(async (review) => {
            const { data: userData } = await supabase.auth.admin.getUserById(review.user_id)
            return {
              ...review,
              user_email: userData?.user?.email || 'Anonymous'
            }
          })
        )
        setReviews(reviewsWithEmails)
      }
    }

    fetchReviews()
  }, [id, reviewsKey])

  useEffect(() => {
    async function fetchUserVotes() {
      if (!user || reviews.length === 0) return

      const reviewIds = reviews.map(r => r.id)

      const { data } = await supabase
        .from('review_helpful')
        .select('review_id, helpful')
        .eq('user_id', user.id)
        .in('review_id', reviewIds)

      if (data) {
        const votesMap = {}
        data.forEach(vote => {
          votesMap[vote.review_id] = vote.helpful
        })
        setUserVotes(votesMap)
      }
    }

    fetchUserVotes()
  }, [user, reviews])

  useEffect(() => {
    async function fetchRelatedProducts() {
      if (!product) return

      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', product.category)
        .neq('id', product.id)
        .limit(4)

      if (!error && data) {
        const formatted = data.map(p => ({
          ...p,
          priceValue: parseFloat(p.price),
          image: p.image_url,
        }))
        setRelatedProducts(formatted)
      }
    }

    fetchRelatedProducts()
  }, [product])

  const handleOpenAuthModal = () => {
    openAuthModal(window.location.pathname)
  }

  const handleReviewSubmitted = () => {
    setReviewsKey(prev => prev + 1)
  }

  const handleVoteChange = () => {
    setReviewsKey(prev => prev + 1)
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return isMobile ? (
    <ProductDetailMobile
      product={product}
      onOpenAuthModal={handleOpenAuthModal}
      reviews={reviews}
      relatedProducts={relatedProducts}
      onReviewSubmitted={handleReviewSubmitted}
      userVotes={userVotes}
      onVoteChange={handleVoteChange}
    />
  ) : (
    <ProductDetailDesktop
      product={product}
      onOpenAuthModal={handleOpenAuthModal}
      reviews={reviews}
      relatedProducts={relatedProducts}
      onReviewSubmitted={handleReviewSubmitted}
      userVotes={userVotes}
      onVoteChange={handleVoteChange}
    />
  )
}
