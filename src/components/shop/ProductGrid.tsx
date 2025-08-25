'use client'

import React from 'react'
import { ProductCard } from './ProductCard'
import { Loading } from '@/components/ui/Loading'
import type { Product } from '@/types'

interface ProductGridProps {
  products: Product[]
  loading?: boolean
  onAddToCart?: (productId: string) => void
  emptyMessage?: string
  className?: string
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  loading = false,
  onAddToCart,
  emptyMessage = 'Nenhum produto encontrado',
  className
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loading size="lg" text="Carregando produtos..." />
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-muted mx-auto mb-4 flex items-center justify-center image-pixelated">
          <svg className="w-12 h-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        <h3 className="font-pixel text-lg text-muted-foreground mb-2">
          {emptyMessage}
        </h3>
        <p className="text-sm text-muted-foreground font-mono">
          Tente ajustar os filtros ou volte mais tarde
        </p>
      </div>
    )
  }

  return (
    <div className={`product-grid ${className}`}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  )
}

export { ProductGrid }

