import { supabase } from './supabase'

export async function getCartItems(userId) {
  const { data, error } = await supabase
    .from('cart')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching cart items:', error)
    return []
  }

  return data || []
}

export async function getCartCount(userId) {
  const { count, error } = await supabase
    .from('cart')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)

  if (error) {
    console.error('Error fetching cart count:', error)
    return 0
  }

  return count || 0
}

export async function addToCart(userId, productId, productName, productImage, brand, selectedSize, price, quantity = 1) {
  const { data, error } = await supabase
    .from('cart')
    .insert({
      user_id: userId,
      product_id: productId,
      product_name: productName,
      product_image: productImage,
      brand: brand,
      selected_size: selectedSize,
      price: price,
      quantity: quantity,
      updated_at: new Date().toISOString()
    })
    .select()
    .maybeSingle()

  if (error) {
    console.error('Error adding to cart:', error)
    return { data: null, error }
  }

  return { data, error: null }
}

export async function updateCartItemQuantity(cartItemId, newQuantity) {
  if (newQuantity < 1) {
    return { error: 'Quantity must be at least 1' }
  }

  const { data, error } = await supabase
    .from('cart')
    .update({
      quantity: newQuantity,
      updated_at: new Date().toISOString()
    })
    .eq('id', cartItemId)
    .select()
    .maybeSingle()

  if (error) {
    console.error('Error updating cart item quantity:', error)
    return { data: null, error }
  }

  return { data, error: null }
}

export async function removeFromCart(cartItemId) {
  const { error } = await supabase
    .from('cart')
    .delete()
    .eq('id', cartItemId)

  if (error) {
    console.error('Error removing from cart:', error)
    return { error }
  }

  return { error: null }
}

export async function clearCart(userId) {
  const { error } = await supabase
    .from('cart')
    .delete()
    .eq('user_id', userId)

  if (error) {
    console.error('Error clearing cart:', error)
    return { error }
  }

  return { error: null }
}
