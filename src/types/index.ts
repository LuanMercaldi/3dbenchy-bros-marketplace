export * from './database'

// Tipos para o carrinho de compras
export interface CartItemWithProduct {
  id: string
  user_id: string
  product_id: string
  quantity: number
  created_at: string
  updated_at: string
  product: {
    id: string
    name: string
    price: number
    images_url: string[] | null
    stock_quantity: number
  }
}

// Tipos para pedidos com itens
export interface OrderWithItems {
  id: string
  customer_id: string
  order_date: string
  status: string
  total_price: number
  shipping_address: any | null
  payment_method: string | null
  payment_status: string
  tracking_code: string | null
  notes: string | null
  created_at: string
  updated_at: string
  order_items: Array<{
    id: string
    quantity: number
    price_at_purchase: number
    product: {
      id: string
      name: string
      images_url: string[] | null
    }
  }>
  customer: {
    id: string
    name: string
    email: string
  }
}

// Tipos para filtros de produtos
export interface ProductFilters {
  category?: string
  material?: string
  minPrice?: number
  maxPrice?: number
  search?: string
  featured?: boolean
}

// Tipos para paginação
export interface PaginationParams {
  page: number
  limit: number
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// Tipos para autenticação
export interface AuthUser {
  id: string
  email: string
  name?: string
  role?: 'customer' | 'admin'
}

// Tipos para endereço
export interface Address {
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
  country: string
}

// Tipos para métricas do dashboard
export interface DashboardMetrics {
  totalOrders: number
  totalRevenue: number
  totalCustomers: number
  totalProducts: number
  recentOrders: OrderWithItems[]
  lowStockProducts: Product[]
  monthlyRevenue: Array<{
    month: string
    revenue: number
  }>
}

// Tipos para formulários
export interface ProductFormData {
  name: string
  description: string
  price: number
  stock_quantity: number
  category: string
  material: string
  print_time_hours: number
  is_featured: boolean
  is_active: boolean
}

export interface CustomerFormData {
  name: string
  email: string
  phone?: string
  address?: Address
}

export interface BlogPostFormData {
  title: string
  content: string
  excerpt: string
  slug: string
  tags: string[]
  is_published: boolean
  featured_image_url?: string
}

// Tipos para status de pedidos
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded'

// Tipos para categorias de produtos
export type ProductCategory = 
  | 'miniatures'
  | 'tools'
  | 'decorative'
  | 'functional'
  | 'educational'
  | 'automotive'
  | 'gaming'
  | 'jewelry'
  | 'household'
  | 'other'

// Tipos para materiais de impressão
export type PrintMaterial = 
  | 'PLA'
  | 'ABS'
  | 'PETG'
  | 'TPU'
  | 'Wood'
  | 'Metal'
  | 'Carbon Fiber'
  | 'Glow in Dark'
  | 'Transparent'
  | 'Other'

