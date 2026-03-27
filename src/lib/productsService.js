import { supabase } from './supabase'

export async function getProductsByCategory(category) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }

  return data || []
}

export async function getProductById(id) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (error) {
    console.error('Error fetching product:', error)
    return null
  }

  return data ? formatProduct(data) : null
}

export async function getSkincareProducts() {
  const categories = ['Serums', 'Cleansers', 'Moisturizers', 'Eye Care', 'Masks', 'Sunscreen', 'Sets']

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .in('category', categories)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching skincare products:', error)
    return []
  }

  return data || []
}

export async function getMakeupProducts() {
  const categories = ['Face', 'Eyes', 'Lips', 'Sets']

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .in('category', categories)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching makeup products:', error)
    return []
  }

  return data || []
}

export async function getFragranceProducts() {
  const categories = ['Eau de Parfum', 'Eau de Toilette', 'Discovery Sets']

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .in('category', categories)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching fragrance products:', error)
    return []
  }

  return data || []
}

function formatPrice(price) {
  return `$${price}`
}

function formatProduct(product) {
  return {
    ...product,
    price: formatPrice(product.price),
    priceValue: parseFloat(product.price),
    image: product.image_url,
    reviews: product.reviews_count,
    skin_types: product.skin_types || [],
    skin_concerns: product.skin_concerns || [],
    ingredients: product.ingredients || []
  }
}

export function formatProductsForUI(products) {
  return products.map(formatProduct)
}
