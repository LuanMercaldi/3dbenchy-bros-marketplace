import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

// Cliente Supabase para operações administrativas (server-side)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export const supabaseAdmin = createClient<Database>(
  supabaseUrl,
  supabaseServiceKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

// Funções utilitárias para operações administrativas
export const adminOperations = {
  // Produtos
  async getAllProducts() {
    const { data, error } = await supabaseAdmin
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async getProductById(id: string) {
    const { data, error } = await supabaseAdmin
      .from('products')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  async createProduct(product: any) {
    const { data, error } = await supabaseAdmin
      .from('products')
      .insert(product)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async updateProduct(id: string, updates: any) {
    const { data, error } = await supabaseAdmin
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async deleteProduct(id: string) {
    const { error } = await supabaseAdmin
      .from('products')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  // Pedidos
  async getAllOrders() {
    const { data, error } = await supabaseAdmin
      .from('orders')
      .select(`
        *,
        profiles:user_id (
          full_name,
          email
        ),
        order_items (
          *,
          products (
            name,
            images_url
          )
        )
      `)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async getOrderById(id: string) {
    const { data, error } = await supabaseAdmin
      .from('orders')
      .select(`
        *,
        profiles:user_id (
          full_name,
          email,
          phone
        ),
        order_items (
          *,
          products (
            name,
            images_url,
            category,
            material
          )
        )
      `)
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  async updateOrderStatus(id: string, status: string) {
    const { data, error } = await supabaseAdmin
      .from('orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Usuários
  async getAllUsers() {
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async getUserById(id: string) {
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .select(`
        *,
        addresses (*),
        orders (
          id,
          order_number,
          status,
          total,
          created_at
        )
      `)
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  async updateUserRole(id: string, isAdmin: boolean) {
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .update({ is_admin: isAdmin })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Estatísticas
  async getDashboardStats() {
    const [
      productsResult,
      ordersResult,
      usersResult,
      revenueResult
    ] = await Promise.all([
      supabaseAdmin.from('products').select('id', { count: 'exact' }),
      supabaseAdmin.from('orders').select('id', { count: 'exact' }),
      supabaseAdmin.from('profiles').select('id', { count: 'exact' }),
      supabaseAdmin.from('orders').select('total').eq('status', 'delivered')
    ])

    const totalRevenue = revenueResult.data?.reduce((sum, order) => sum + Number(order.total), 0) || 0

    return {
      totalProducts: productsResult.count || 0,
      totalOrders: ordersResult.count || 0,
      totalUsers: usersResult.count || 0,
      totalRevenue
    }
  },

  async getRecentOrders(limit = 5) {
    const { data, error } = await supabaseAdmin
      .from('orders')
      .select(`
        *,
        profiles:user_id (
          full_name,
          email
        )
      `)
      .order('created_at', { ascending: false })
      .limit(limit)
    
    if (error) throw error
    return data
  },

  async getTopProducts(limit = 5) {
    const { data, error } = await supabaseAdmin
      .from('order_items')
      .select(`
        product_id,
        product_name,
        quantity,
        subtotal,
        products (
          name,
          images_url
        )
      `)
    
    if (error) throw error
    
    // Agrupar por produto e calcular totais
    const productStats = data?.reduce((acc: any, item) => {
      const productId = item.product_id
      if (!acc[productId]) {
        acc[productId] = {
          id: productId,
          name: item.product_name || item.products?.name,
          totalSales: 0,
          totalRevenue: 0,
          images_url: item.products?.images_url
        }
      }
      acc[productId].totalSales += item.quantity
      acc[productId].totalRevenue += Number(item.subtotal)
      return acc
    }, {})

    return Object.values(productStats || {})
      .sort((a: any, b: any) => b.totalRevenue - a.totalRevenue)
      .slice(0, limit)
  },

  // Blog
  async getAllBlogPosts() {
    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .select(`
        *,
        profiles:author_id (
          full_name
        )
      `)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async createBlogPost(post: any) {
    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .insert(post)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async updateBlogPost(id: string, updates: any) {
    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async deleteBlogPost(id: string) {
    const { error } = await supabaseAdmin
      .from('blog_posts')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

