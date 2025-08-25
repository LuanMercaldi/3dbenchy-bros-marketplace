import { createSupabaseBrowserClient } from './supabase'
import type { Database } from '@/types/database'

// Funções utilitárias para operações comuns
export const supabaseOperations = {
  // Produtos públicos
  async getProducts(filters?: {
    category?: string
    material?: string
    minPrice?: number
    maxPrice?: number
    search?: string
    featured?: boolean
    limit?: number
    offset?: number
  }) {
    const supabase = createSupabaseBrowserClient()
    let query = supabase
      .from('products')
      .select('*')
      .eq('is_active', true)

    if (filters?.category) {
      query = query.eq('category', filters.category)
    }
    
    if (filters?.material) {
      query = query.eq('material', filters.material)
    }
    
    if (filters?.minPrice !== undefined) {
      query = query.gte('price', filters.minPrice)
    }
    
    if (filters?.maxPrice !== undefined) {
      query = query.lte('price', filters.maxPrice)
    }
    
    if (filters?.search) {
      query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
    }
    
    if (filters?.featured) {
      query = query.eq('is_featured', true)
    }

    query = query.order('created_at', { ascending: false })

    if (filters?.limit) {
      query = query.limit(filters.limit)
    }

    if (filters?.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1)
    }

    const { data, error } = await query
    
    if (error) throw error
    return data
  },

  async getProductById(id: string) {
    const supabase = createSupabaseBrowserClient()
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        product_reviews (
          *,
          profiles:user_id (
            full_name
          )
        )
      `)
      .eq('id', id)
      .eq('is_active', true)
      .single()
    
    if (error) throw error
    return data
  },

  // Carrinho
  async getCartItems(userId: string) {
    const supabase = createSupabaseBrowserClient()
    const { data, error } = await supabase
      .from('cart_items')
      .select(`
        *,
        products (
          id,
          name,
          price,
          images_url,
          stock_quantity
        )
      `)
      .eq('user_id', userId)
    
    if (error) throw error
    return data
  },

  async addToCart(userId: string, productId: string, quantity: number) {
    const supabase = createSupabaseBrowserClient()
    const { data, error } = await supabase
      .from('cart_items')
      .upsert({
        user_id: userId,
        product_id: productId,
        quantity
      })
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async updateCartItem(itemId: string, quantity: number) {
    const supabase = createSupabaseBrowserClient()
    const { data, error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', itemId)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async removeFromCart(itemId: string) {
    const supabase = createSupabaseBrowserClient()
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', itemId)
    
    if (error) throw error
  },

  async clearCart(userId: string) {
    const supabase = createSupabaseBrowserClient()
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', userId)
    
    if (error) throw error
  },

  // Pedidos
  async createOrder(orderData: any) {
    const supabase = createSupabaseBrowserClient()
    const { data, error } = await supabase
      .from('orders')
      .insert(orderData)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async getUserOrders(userId: string) {
    const supabase = createSupabaseBrowserClient()
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          products (
            name,
            images_url
          )
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Wishlist
  async getWishlist(userId: string) {
    const supabase = createSupabaseBrowserClient()
    const { data, error } = await supabase
      .from('wishlist_items')
      .select(`
        *,
        products (*)
      `)
      .eq('user_id', userId)
    
    if (error) throw error
    return data
  },

  async addToWishlist(userId: string, productId: string) {
    const supabase = createSupabaseBrowserClient()
    const { data, error } = await supabase
      .from('wishlist_items')
      .insert({
        user_id: userId,
        product_id: productId
      })
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async removeFromWishlist(userId: string, productId: string) {
    const supabase = createSupabaseBrowserClient()
    const { error } = await supabase
      .from('wishlist_items')
      .delete()
      .eq('user_id', userId)
      .eq('product_id', productId)
    
    if (error) throw error
  },

  // Blog
  async getBlogPosts(limit?: number) {
    const supabase = createSupabaseBrowserClient()
    let query = supabase
      .from('blog_posts')
      .select(`
        *,
        profiles:author_id (
          full_name
        )
      `)
      .eq('is_published', true)
      .order('published_at', { ascending: false })

    if (limit) {
      query = query.limit(limit)
    }

    const { data, error } = await query
    
    if (error) throw error
    return data
  },

  async getBlogPostBySlug(slug: string) {
    const supabase = createSupabaseBrowserClient()
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        profiles:author_id (
          full_name,
          avatar_url
        )
      `)
      .eq('slug', slug)
      .eq('is_published', true)
      .single()
    
    if (error) throw error
    return data
  },

  // Reviews
  async getProductReviews(productId: string) {
    const supabase = createSupabaseBrowserClient()
    const { data, error } = await supabase
      .from('product_reviews')
      .select(`
        *,
        profiles:user_id (
          full_name
        )
      `)
      .eq('product_id', productId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async addProductReview(review: any) {
    const supabase = createSupabaseBrowserClient()
    const { data, error } = await supabase
      .from('product_reviews')
      .insert(review)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Newsletter
  async subscribeNewsletter(email: string) {
    const supabase = createSupabaseBrowserClient()
    const { data, error } = await supabase
      .from('newsletter_subscriptions')
      .insert({ email })
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Contact
  async sendContactMessage(message: any) {
    const supabase = createSupabaseBrowserClient()
    const { data, error } = await supabase
      .from('contact_messages')
      .insert(message)
      .select()
      .single()
    
    if (error) throw error
    return data
  }
}

