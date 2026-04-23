import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './AuthContext'

const WishlistContext = createContext()

export function WishlistProvider({ children }) {
  const { user } = useAuth()
  const [wishlistItems, setWishlistItems] = useState([])
  const [wishlistCount, setWishlistCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchWishlist()
    } else {
      setWishlistItems([])
      setWishlistCount(0)
      setLoading(false)
    }
  }, [user])

  const fetchWishlist = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('wishlist')
        .select(`
          id,
          product_id,
          created_at,
          products (
            id,
            name,
            brand,
            price,
            image_url,
            category,
            rating,
            reviews_count
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error

      setWishlistItems(data || [])
      setWishlistCount(data?.length || 0)
    } catch (err) {
      console.error('Error fetching wishlist:', err)
    } finally {
      setLoading(false)
    }
  }

  const addToWishlist = async (productId) => {
    if (!user) return { error: 'User not authenticated' }

    try {
      const { data, error } = await supabase
        .from('wishlist')
        .insert({ user_id: user.id, product_id: productId })
        .select(`
          id,
          product_id,
          created_at,
          products (
            id,
            name,
            brand,
            price,
            image_url,
            category,
            rating,
            reviews_count
          )
        `)
        .single()

      if (error) throw error

      // Use functional updates to avoid stale closure
      setWishlistItems(prev => [data, ...prev])
      setWishlistCount(prev => prev + 1)
      return { data, error: null }
    } catch (err) {
      console.error('Error adding to wishlist:', err)
      return { error: err.message }
    }
  }

  const removeFromWishlist = async (productId) => {
    if (!user) return { error: 'User not authenticated' }

    try {
      const { error } = await supabase
        .from('wishlist')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', productId)

      if (error) throw error

      // Use functional updates to avoid stale closure
      setWishlistItems(prev => prev.filter(item => item.product_id !== productId))
      setWishlistCount(prev => Math.max(0, prev - 1))
      return { error: null }
    } catch (err) {
      console.error('Error removing from wishlist:', err)
      return { error: err.message }
    }
  }

  const clearWishlist = async () => {
    if (!user) return { error: 'User not authenticated' }
    try {
      const { error } = await supabase
        .from('wishlist')
        .delete()
        .eq('user_id', user.id)
      if (error) throw error
      setWishlistItems([])
      setWishlistCount(0)
      return { error: null }
    } catch (err) {
      console.error('Error clearing wishlist:', err)
      return { error: err.message }
    }
  }

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.product_id === productId)
  }

  const value = {
    wishlistItems,
    wishlistCount,
    loading,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist,
    refreshWishlist: fetchWishlist
  }

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider')
  }
  return context
}