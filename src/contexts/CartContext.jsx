import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './AuthContext'

const CartContext = createContext()

export function CartProvider({ children }) {
  const { user } = useAuth()
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      fetchCart()

      const channel = supabase
        .channel('cart-changes')
        .on('postgres_changes', {
          event: '*',
          schema: 'public',
          table: 'cart',
          filter: `user_id=eq.${user.id}`
        }, () => {
          fetchCart()
        })
        .subscribe()

      return () => {
        supabase.removeChannel(channel)
      }
    } else {
      setCartItems([])
    }
  }, [user])

  const fetchCart = async () => {
    if (!user) {
      setCartItems([])
      return
    }

    setLoading(true)
    const { data, error } = await supabase
      .from('cart')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (!error && data) {
      setCartItems(data)
    }
    setLoading(false)
  }

  const addToCart = async (productId, productName, productImage, brand, selectedSize, price, quantity = 1) => {
    if (!user) return { error: 'User not authenticated' }

    try {
      const { data: existingItem, error: fetchError } = await supabase
        .from('cart')
        .select('*')
        .eq('user_id', user.id)
        .eq('product_id', productId)
        .eq('selected_size', selectedSize)
        .maybeSingle()

      if (fetchError) {
        return { error: fetchError }
      }

      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity
        setCartItems(cartItems.map(item =>
          item.id === existingItem.id ? { ...item, quantity: newQuantity } : item
        ))

        const { error: updateError } = await supabase
          .from('cart')
          .update({ quantity: newQuantity, updated_at: new Date().toISOString() })
          .eq('id', existingItem.id)

        if (updateError) {
          await fetchCart()
          return { error: updateError }
        }
      } else {
        const newItem = {
          user_id: user.id,
          product_id: productId,
          product_name: productName,
          product_image: productImage,
          brand: brand,
          quantity: quantity,
          selected_size: selectedSize,
          price: price,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }

        setCartItems([newItem, ...cartItems])

        const { error: insertError } = await supabase
          .from('cart')
          .insert(newItem)

        if (insertError) {
          await fetchCart()
          return { error: insertError }
        }
      }

      return { error: null }
    } catch (error) {
      await fetchCart()
      return { error }
    }
  }

  const updateQuantity = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) return { error: 'Quantity must be at least 1' }

    setCartItems(cartItems.map(item =>
      item.id === cartItemId ? { ...item, quantity: newQuantity } : item
    ))

    const { error } = await supabase
      .from('cart')
      .update({ quantity: newQuantity, updated_at: new Date().toISOString() })
      .eq('id', cartItemId)

    if (error) {
      await fetchCart()
      return { error }
    }

    return { error: null }
  }

  const removeFromCart = async (cartItemId) => {
    setCartItems(cartItems.filter(item => item.id !== cartItemId))

    const { error } = await supabase
      .from('cart')
      .delete()
      .eq('id', cartItemId)

    if (error) {
      await fetchCart()
      return { error }
    }

    return { error: null }
  }

  const clearCart = async () => {
    if (!user) return { error: 'User not authenticated' }

    setCartItems([])

    const { error } = await supabase
      .from('cart')
      .delete()
      .eq('user_id', user.id)

    if (error) {
      await fetchCart()
      return { error }
    }

    return { error: null }
  }

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  return (
    <CartContext.Provider value={{
      cartItems,
      cartCount,
      loading,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      fetchCart
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}
