'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { MainLayout } from '@/components/layout'
import { CartItem } from '@/components/shop/CartItem'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { formatCurrency } from '@/lib/utils'
import type { CartItemWithProduct } from '@/types'

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItemWithProduct[]>([])
  const [loading, setLoading] = useState(true)

  // Mock data para demonstração
  const mockCartItems: CartItemWithProduct[] = [
    {
      id: 'cart-1',
      user_id: 'user-1',
      product_id: '1',
      quantity: 2,
      created_at: '2024-01-15T10:00:00Z',
      updated_at: '2024-01-15T10:00:00Z',
      product: {
        id: '1',
        name: 'Benchy Clássico',
        price: 29.90,
        images_url: ['/logo.png'],
        stock_quantity: 15
      }
    },
    {
      id: 'cart-2',
      user_id: 'user-1',
      product_id: '2',
      quantity: 1,
      created_at: '2024-01-14T10:00:00Z',
      updated_at: '2024-01-14T10:00:00Z',
      product: {
        id: '2',
        name: 'Dragão Pixel Art',
        price: 45.90,
        images_url: ['/logo.png'],
        stock_quantity: 8
      }
    },
    {
      id: 'cart-3',
      user_id: 'user-1',
      product_id: '3',
      quantity: 1,
      created_at: '2024-01-13T10:00:00Z',
      updated_at: '2024-01-13T10:00:00Z',
      product: {
        id: '3',
        name: 'Suporte para Celular',
        price: 19.90,
        images_url: ['/logo.png'],
        stock_quantity: 25
      }
    }
  ]

  useEffect(() => {
    // Simular carregamento
    setTimeout(() => {
      setCartItems(mockCartItems)
      setLoading(false)
    }, 1000)
  }, [])

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    )
  }

  const handleRemoveItem = (itemId: string) => {
    setCartItems(items => items.filter(item => item.id !== itemId))
  }

  const handleClearCart = () => {
    setCartItems([])
  }

  // Cálculos
  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
  const shipping = subtotal >= 99 ? 0 : 15.90
  const total = subtotal + shipping
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  if (loading) {
    return (
      <MainLayout>
        <div className="container-pixel py-16">
          <div className="flex justify-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent animate-spin image-pixelated" />
          </div>
        </div>
      </MainLayout>
    )
  }

  if (cartItems.length === 0) {
    return (
      <MainLayout>
        <div className="container-pixel py-16">
          <div className="text-center max-w-md mx-auto">
            <div className="w-24 h-24 bg-muted mx-auto mb-6 flex items-center justify-center image-pixelated">
              <svg className="w-12 h-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8m-8 0a2 2 0 100 4 2 2 0 000-4zm8 0a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
            </div>
            
            <h1 className="font-pixel text-2xl text-neon mb-4">
              Carrinho Vazio
            </h1>
            
            <p className="text-muted-foreground font-mono mb-8">
              Seu carrinho está vazio. Que tal explorar nossos produtos incríveis?
            </p>
            
            <Link href="/products">
              <Button size="lg">
                Explorar Produtos
              </Button>
            </Link>
          </div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="container-pixel py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-pixel text-4xl text-neon mb-4">
            Carrinho de Compras
          </h1>
          <div className="flex items-center gap-4">
            <Badge variant="outline">
              {itemCount} {itemCount === 1 ? 'item' : 'itens'}
            </Badge>
            <Badge variant="neon">
              Total: {formatCurrency(total)}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-pixel text-xl text-neon">
                Seus Produtos
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearCart}
                className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
              >
                Limpar Carrinho
              </Button>
            </div>

            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemoveItem}
              />
            ))}

            {/* Continue Shopping */}
            <div className="pt-4 border-t border-border">
              <Link href="/products">
                <Button variant="outline">
                  ← Continuar Comprando
                </Button>
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card variant="neon" className="sticky top-8">
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Summary Items */}
                <div className="space-y-3">
                  <div className="flex justify-between font-mono">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  
                  <div className="flex justify-between font-mono">
                    <span className="text-muted-foreground">Frete:</span>
                    <span className={shipping === 0 ? 'text-accent' : ''}>
                      {shipping === 0 ? 'Grátis' : formatCurrency(shipping)}
                    </span>
                  </div>
                  
                  {subtotal < 99 && (
                    <div className="text-xs text-muted-foreground font-mono p-2 bg-background border border-border">
                      Frete grátis para pedidos acima de R$ 99,00
                      <br />
                      Faltam {formatCurrency(99 - subtotal)} para frete grátis!
                    </div>
                  )}
                  
                  <div className="border-t border-border pt-3">
                    <div className="flex justify-between font-pixel text-lg">
                      <span className="text-neon">Total:</span>
                      <span className="text-primary">{formatCurrency(total)}</span>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <div className="space-y-3">
                  <Link href="/checkout">
                    <Button size="lg" className="w-full">
                      Finalizar Compra
                    </Button>
                  </Link>
                  
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground font-mono">
                      Pagamento seguro e protegido
                    </p>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="pt-4 border-t border-border">
                  <p className="text-xs font-mono text-muted-foreground mb-2">
                    Formas de pagamento:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {['PIX', 'VISA', 'MASTER', 'BOLETO'].map((method) => (
                      <div
                        key={method}
                        className="px-2 py-1 bg-background border border-border text-xs font-mono"
                      >
                        {method}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Security Info */}
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                    <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>Compra 100% segura</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono mt-2">
                    <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Garantia de 30 dias</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

