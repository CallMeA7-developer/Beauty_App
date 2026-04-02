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
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', 'Skincare')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching skincare products:', error)
    return []
  }

  return data || []
}

export async function getMakeupProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', 'Makeup')
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

function formatProduct(product) {
  const priceValue = parseFloat(product.price)
  return {
    ...product,
    price: `$${priceValue.toFixed(2)}`,
    priceValue: priceValue,
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
