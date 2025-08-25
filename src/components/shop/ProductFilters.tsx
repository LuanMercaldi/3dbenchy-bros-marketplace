'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import type { ProductFilters } from '@/types'

interface ProductFiltersProps {
  filters: ProductFilters
  onFiltersChange: (filters: ProductFilters) => void
  onClearFilters: () => void
  className?: string
}

const ProductFiltersComponent: React.FC<ProductFiltersProps> = ({
  filters,
  onFiltersChange,
  onClearFilters,
  className
}) => {
  const [localFilters, setLocalFilters] = useState<ProductFilters>(filters)

  const categories = [
    'miniatures',
    'tools',
    'decorative',
    'functional',
    'educational',
    'automotive',
    'gaming',
    'jewelry',
    'household',
    'other'
  ]

  const materials = [
    'PLA',
    'ABS',
    'PETG',
    'TPU',
    'Wood',
    'Metal',
    'Carbon Fiber',
    'Glow in Dark',
    'Transparent',
    'Other'
  ]

  const categoryLabels: Record<string, string> = {
    miniatures: 'Miniaturas',
    tools: 'Ferramentas',
    decorative: 'Decorativo',
    functional: 'Funcional',
    educational: 'Educacional',
    automotive: 'Automotivo',
    gaming: 'Gaming',
    jewelry: 'Joias',
    household: 'Casa',
    other: 'Outros'
  }

  const handleFilterChange = (key: keyof ProductFilters, value: any) => {
    const newFilters = { ...localFilters, [key]: value }
    setLocalFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const handlePriceChange = (type: 'min' | 'max', value: string) => {
    const numValue = value === '' ? undefined : parseFloat(value)
    if (type === 'min') {
      handleFilterChange('minPrice', numValue)
    } else {
      handleFilterChange('maxPrice', numValue)
    }
  }

  const handleClearFilters = () => {
    const emptyFilters: ProductFilters = {}
    setLocalFilters(emptyFilters)
    onClearFilters()
  }

  const hasActiveFilters = Object.values(localFilters).some(value => 
    value !== undefined && value !== '' && value !== false
  )

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Filtros</CardTitle>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={handleClearFilters}>
              Limpar
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Search */}
        <div>
          <label className="block text-sm font-mono font-medium mb-2">
            Buscar
          </label>
          <Input
            placeholder="Nome do produto..."
            value={localFilters.search || ''}
            onChange={(e) => handleFilterChange('search', e.target.value)}
          />
        </div>

        {/* Categories */}
        <div>
          <label className="block text-sm font-mono font-medium mb-3">
            Categoria
          </label>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={localFilters.category === category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-4 h-4 text-primary bg-input border-border focus:ring-primary focus:ring-2"
                />
                <span className="text-sm font-mono">
                  {categoryLabels[category]}
                </span>
              </label>
            ))}
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="category"
                value=""
                checked={!localFilters.category}
                onChange={() => handleFilterChange('category', undefined)}
                className="w-4 h-4 text-primary bg-input border-border focus:ring-primary focus:ring-2"
              />
              <span className="text-sm font-mono">Todas</span>
            </label>
          </div>
        </div>

        {/* Materials */}
        <div>
          <label className="block text-sm font-mono font-medium mb-3">
            Material
          </label>
          <div className="space-y-2">
            {materials.map((material) => (
              <label key={material} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="material"
                  value={material}
                  checked={localFilters.material === material}
                  onChange={(e) => handleFilterChange('material', e.target.value)}
                  className="w-4 h-4 text-primary bg-input border-border focus:ring-primary focus:ring-2"
                />
                <span className="text-sm font-mono">{material}</span>
              </label>
            ))}
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="material"
                value=""
                checked={!localFilters.material}
                onChange={() => handleFilterChange('material', undefined)}
                className="w-4 h-4 text-primary bg-input border-border focus:ring-primary focus:ring-2"
              />
              <span className="text-sm font-mono">Todos</span>
            </label>
          </div>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-mono font-medium mb-3">
            Faixa de Preço
          </label>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-mono text-muted-foreground mb-1">
                Preço mínimo
              </label>
              <Input
                type="number"
                placeholder="0.00"
                min="0"
                step="0.01"
                value={localFilters.minPrice || ''}
                onChange={(e) => handlePriceChange('min', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-muted-foreground mb-1">
                Preço máximo
              </label>
              <Input
                type="number"
                placeholder="999.99"
                min="0"
                step="0.01"
                value={localFilters.maxPrice || ''}
                onChange={(e) => handlePriceChange('max', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Featured */}
        <div>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={localFilters.featured || false}
              onChange={(e) => handleFilterChange('featured', e.target.checked)}
              className="w-4 h-4 text-primary bg-input border-border rounded focus:ring-primary focus:ring-2"
            />
            <span className="text-sm font-mono">Apenas produtos em destaque</span>
          </label>
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div>
            <label className="block text-sm font-mono font-medium mb-2">
              Filtros Ativos
            </label>
            <div className="flex flex-wrap gap-2">
              {localFilters.category && (
                <Badge variant="outline" size="sm">
                  {categoryLabels[localFilters.category]}
                </Badge>
              )}
              {localFilters.material && (
                <Badge variant="outline" size="sm">
                  {localFilters.material}
                </Badge>
              )}
              {localFilters.minPrice && (
                <Badge variant="outline" size="sm">
                  Min: R$ {localFilters.minPrice}
                </Badge>
              )}
              {localFilters.maxPrice && (
                <Badge variant="outline" size="sm">
                  Max: R$ {localFilters.maxPrice}
                </Badge>
              )}
              {localFilters.featured && (
                <Badge variant="outline" size="sm">
                  Destaque
                </Badge>
              )}
              {localFilters.search && (
                <Badge variant="outline" size="sm">
                  "{localFilters.search}"
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export { ProductFiltersComponent as ProductFilters }

