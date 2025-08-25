import { z } from 'zod'

// Schema para produto
export const productSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').max(255, 'Nome muito longo'),
  description: z.string().optional(),
  price: z.number().min(0.01, 'Preço deve ser maior que zero'),
  stock_quantity: z.number().int().min(0, 'Estoque não pode ser negativo'),
  category: z.string().optional(),
  material: z.string().optional(),
  print_time_hours: z.number().min(0, 'Tempo de impressão não pode ser negativo').optional(),
  is_featured: z.boolean().default(false),
  is_active: z.boolean().default(true),
})

// Schema para cliente
export const customerSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').max(255, 'Nome muito longo'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
  shipping_address: z.object({
    street: z.string().min(1, 'Rua é obrigatória'),
    number: z.string().min(1, 'Número é obrigatório'),
    complement: z.string().optional(),
    neighborhood: z.string().min(1, 'Bairro é obrigatório'),
    city: z.string().min(1, 'Cidade é obrigatória'),
    state: z.string().min(2, 'Estado é obrigatório').max(2, 'Estado deve ter 2 caracteres'),
    zipCode: z.string().min(8, 'CEP deve ter 8 dígitos').max(9, 'CEP inválido'),
    country: z.string().default('BR'),
  }).optional(),
})

// Schema para pedido
export const orderSchema = z.object({
  customer_id: z.string().uuid('ID do cliente inválido'),
  total_price: z.number().min(0.01, 'Total deve ser maior que zero'),
  shipping_address: z.object({
    street: z.string().min(1, 'Rua é obrigatória'),
    number: z.string().min(1, 'Número é obrigatório'),
    complement: z.string().optional(),
    neighborhood: z.string().min(1, 'Bairro é obrigatório'),
    city: z.string().min(1, 'Cidade é obrigatória'),
    state: z.string().min(2, 'Estado é obrigatório').max(2, 'Estado deve ter 2 caracteres'),
    zipCode: z.string().min(8, 'CEP deve ter 8 dígitos').max(9, 'CEP inválido'),
    country: z.string().default('BR'),
  }),
  payment_method: z.enum(['credit_card', 'debit_card', 'pix', 'boleto']).optional(),
  notes: z.string().optional(),
})

// Schema para item do pedido
export const orderItemSchema = z.object({
  order_id: z.string().uuid('ID do pedido inválido'),
  product_id: z.string().uuid('ID do produto inválido'),
  quantity: z.number().int().min(1, 'Quantidade deve ser pelo menos 1'),
  price_at_purchase: z.number().min(0.01, 'Preço deve ser maior que zero'),
})

// Schema para post do blog
export const blogPostSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório').max(255, 'Título muito longo'),
  content: z.string().min(1, 'Conteúdo é obrigatório'),
  slug: z.string().min(1, 'Slug é obrigatório').max(255, 'Slug muito longo')
    .regex(/^[a-z0-9-]+$/, 'Slug deve conter apenas letras minúsculas, números e hífens'),
  excerpt: z.string().optional(),
  featured_image_url: z.string().url('URL da imagem inválida').optional(),
  is_published: z.boolean().default(false),
  tags: z.array(z.string()).optional(),
})

// Schema para item do carrinho
export const cartItemSchema = z.object({
  product_id: z.string().uuid('ID do produto inválido'),
  quantity: z.number().int().min(1, 'Quantidade deve ser pelo menos 1'),
})

// Schema para login
export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
})

// Schema para registro
export const registerSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').max(255, 'Nome muito longo'),
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Senha deve conter pelo menos uma letra minúscula, uma maiúscula e um número'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Senhas não coincidem',
  path: ['confirmPassword'],
})

// Schema para recuperação de senha
export const forgotPasswordSchema = z.object({
  email: z.string().email('Email inválido'),
})

// Schema para redefinição de senha
export const resetPasswordSchema = z.object({
  password: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Senha deve conter pelo menos uma letra minúscula, uma maiúscula e um número'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Senhas não coincidem',
  path: ['confirmPassword'],
})

// Schema para filtros de produtos
export const productFiltersSchema = z.object({
  category: z.string().optional(),
  material: z.string().optional(),
  minPrice: z.number().min(0).optional(),
  maxPrice: z.number().min(0).optional(),
  search: z.string().optional(),
  featured: z.boolean().optional(),
})

// Schema para paginação
export const paginationSchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(12),
})

// Schema para contato
export const contactSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').max(255, 'Nome muito longo'),
  email: z.string().email('Email inválido'),
  subject: z.string().min(1, 'Assunto é obrigatório').max(255, 'Assunto muito longo'),
  message: z.string().min(1, 'Mensagem é obrigatória').max(1000, 'Mensagem muito longa'),
})

// Schema para newsletter
export const newsletterSchema = z.object({
  email: z.string().email('Email inválido'),
})

// Schema para avaliação de produto
export const reviewSchema = z.object({
  product_id: z.string().uuid('ID do produto inválido'),
  rating: z.number().int().min(1, 'Avaliação mínima é 1').max(5, 'Avaliação máxima é 5'),
  comment: z.string().optional(),
})

// Schema para cupom de desconto
export const couponSchema = z.object({
  code: z.string().min(1, 'Código é obrigatório').max(50, 'Código muito longo')
    .regex(/^[A-Z0-9-]+$/, 'Código deve conter apenas letras maiúsculas, números e hífens'),
  discount_percent: z.number().min(0, 'Desconto não pode ser negativo').max(100, 'Desconto não pode ser maior que 100%'),
  valid_until: z.string().datetime('Data inválida'),
  is_active: z.boolean().default(true),
  usage_limit: z.number().int().min(1, 'Limite de uso deve ser pelo menos 1').optional(),
})

