'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { formatCurrency } from '@/lib/utils'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
  onAddToCart?: (productId: string) => void
  className?: string
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  className
}) => {
  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product.id)
    }
  }

  const primaryImage = product.images_url?.[0] || '/logo.png'
  const isOutOfStock = product.stock_quantity <= 0

  return (
    <Card variant="neon" className={`group cursor-pointer transition-all duration-300 ${className}`}>
      {/* Product Image */}
      <div className="relative aspect-square bg-background mb-4 overflow-hidden">
        <Link href={`/products/${product.id}`}>
          <Image
            src={primaryImage}
            alt={product.name}
            fill
            className="object-cover image-pixelated group-hover:scale-110 transition-transform duration-300"
          />
        </Link>
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.is_featured && (
            <Badge variant="neon" size="sm">
              ⭐ Destaque
            </Badge>
          )}
          {isOutOfStock && (
            <Badge variant="destructive" size="sm">
              Esgotado
            </Badge>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex flex-col gap-1">
            <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </Button>
            <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" size="sm">
            {product.category || 'Geral'}
          </Badge>
          <Badge variant="accent" size="sm">
            {product.material || 'PLA'}
          </Badge>
        </div>
        
        <Link href={`/products/${product.id}`}>
          <CardTitle className="text-lg group-hover:text-primary transition-colors duration-200 line-clamp-2">
            {product.name}
          </CardTitle>
        </Link>
        
        {product.description && (
          <p className="text-sm text-muted-foreground font-mono line-clamp-2 mt-2">
            {product.description}
          </p>
        )}
      </CardHeader>

      <CardContent>
        {/* Price and Stock */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="font-pixel text-xl text-primary">
              {formatCurrency(product.price)}
            </span>
            {product.stock_quantity <= 5 && product.stock_quantity > 0 && (
              <p className="text-xs text-neon-orange font-mono">
                Apenas {product.stock_quantity} restantes
              </p>
            )}
          </div>
          
          {product.print_time_hours && (
            <div className="text-right">
              <p className="text-xs text-muted-foreground font-mono">
                Tempo de impressão
              </p>
              <p className="text-sm font-mono">
                {product.print_time_hours}h
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            size="sm"
            className="flex-1"
            disabled={isOutOfStock}
            onClick={handleAddToCart}
          >
            {isOutOfStock ? 'Esgotado' : 'Adicionar'}
          </Button>
          <Link href={`/products/${product.id}`}>
            <Button variant="outline" size="sm">
              Ver Detalhes
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export { ProductCard }

