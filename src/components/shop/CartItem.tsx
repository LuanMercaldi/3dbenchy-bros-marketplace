'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { formatCurrency } from '@/lib/utils'
import type { CartItemWithProduct } from '@/types'

interface CartItemProps {
  item: CartItemWithProduct
  onUpdateQuantity: (itemId: string, quantity: number) => void
  onRemove: (itemId: string) => void
  className?: string
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
  className
}) => {
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= item.product.stock_quantity) {
      onUpdateQuantity(item.id, newQuantity)
    }
  }

  const handleRemove = () => {
    onRemove(item.id)
  }

  const subtotal = item.product.price * item.quantity
  const isOutOfStock = item.product.stock_quantity <= 0
  const exceedsStock = item.quantity > item.product.stock_quantity

  return (
    <div className={`flex flex-col sm:flex-row gap-4 p-4 bg-card border border-border image-pixelated ${className}`}>
      {/* Product Image */}
      <div className="w-full sm:w-24 h-24 bg-background border border-border overflow-hidden flex-shrink-0">
        <Link href={`/products/${item.product.id}`}>
          <Image
            src={item.product.images_url?.[0] || '/logo.png'}
            alt={item.product.name}
            width={96}
            height={96}
            className="w-full h-full object-cover image-pixelated hover:scale-110 transition-transform duration-200"
          />
        </Link>
      </div>

      {/* Product Info */}
      <div className="flex-1 space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
          <div>
            <Link href={`/products/${item.product.id}`}>
              <h3 className="font-pixel text-sm text-neon hover:text-primary transition-colors">
                {item.product.name}
              </h3>
            </Link>
            <p className="text-xs text-muted-foreground font-mono mt-1">
              Código: #{item.product.id.toUpperCase()}
            </p>
          </div>
          
          <div className="text-right">
            <p className="font-pixel text-lg text-primary">
              {formatCurrency(item.product.price)}
            </p>
            <p className="text-xs text-muted-foreground font-mono">
              por unidade
            </p>
          </div>
        </div>

        {/* Stock Status */}
        {(isOutOfStock || exceedsStock) && (
          <div className="flex gap-2">
            {isOutOfStock && (
              <Badge variant="destructive" size="sm">
                Produto Esgotado
              </Badge>
            )}
            {exceedsStock && !isOutOfStock && (
              <Badge variant="outline" className="text-neon-orange border-neon-orange" size="sm">
                Quantidade indisponível
              </Badge>
            )}
          </div>
        )}

        {/* Quantity and Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-sm font-mono">Qtd:</span>
            <div className="flex items-center border border-border">
              <button
                onClick={() => handleQuantityChange(item.quantity - 1)}
                disabled={item.quantity <= 1}
                className="px-2 py-1 hover:bg-primary hover:text-background transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                -
              </button>
              <span className="px-3 py-1 font-mono text-sm border-x border-border min-w-[3rem] text-center">
                {item.quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(item.quantity + 1)}
                disabled={item.quantity >= item.product.stock_quantity || isOutOfStock}
                className="px-2 py-1 hover:bg-primary hover:text-background transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                +
              </button>
            </div>
            
            {item.product.stock_quantity <= 5 && item.product.stock_quantity > 0 && (
              <span className="text-xs text-neon-orange font-mono">
                {item.product.stock_quantity} restantes
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="font-pixel text-lg text-primary">
                {formatCurrency(subtotal)}
              </p>
              <p className="text-xs text-muted-foreground font-mono">
                subtotal
              </p>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export { CartItem }

