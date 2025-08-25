'use client'

import React, { useState, useEffect } from 'react'
import { MainLayout } from '@/components/layout'
import { ProductGrid, ProductFilters } from '@/components/shop'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import type { Product, ProductFilters as ProductFiltersType } from '@/types'

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [filters, setFilters] = useState<ProductFiltersType>({})
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'newest'>('newest')
  const [showFilters, setShowFilters] = useState(false)

  // Mock data para demonstração
  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Benchy Clássico',
      description: 'O famoso barco de teste para impressoras 3D. Perfeito para calibração e testes de qualidade.',
      price: 29.90,
      stock_quantity: 15,
      images_url: ['/logo.png'],
      category: 'miniatures',
      material: 'PLA',
      print_time_hours: 3.5,
      created_at: '2024-01-15T10:00:00Z',
      updated_at: '2024-01-15T10:00:00Z',
      is_featured: true,
      is_active: true
    },
    {
      id: '2',
      name: 'Dragão Pixel Art',
      description: 'Dragão estilizado em pixel art, ideal para decoração e colecionadores.',
      price: 45.90,
      stock_quantity: 8,
      images_url: ['/logo.png'],
      category: 'decorative',
      material: 'PETG',
      print_time_hours: 6.0,
      created_at: '2024-01-14T10:00:00Z',
      updated_at: '2024-01-14T10:00:00Z',
      is_featured: true,
      is_active: true
    },
    {
      id: '3',
      name: 'Suporte para Celular',
      description: 'Suporte ergonômico para celular, compatível com diversos tamanhos.',
      price: 19.90,
      stock_quantity: 25,
      images_url: ['/logo.png'],
      category: 'functional',
      material: 'ABS',
      print_time_hours: 2.0,
      created_at: '2024-01-13T10:00:00Z',
      updated_at: '2024-01-13T10:00:00Z',
      is_featured: false,
      is_active: true
    },
    {
      id: '4',
      name: 'Miniatura RPG - Guerreiro',
      description: 'Miniatura detalhada de guerreiro para jogos de RPG de mesa.',
      price: 35.90,
      stock_quantity: 12,
      images_url: ['/logo.png'],
      category: 'gaming',
      material: 'Resina',
      print_time_hours: 4.5,
      created_at: '2024-01-12T10:00:00Z',
      updated_at: '2024-01-12T10:00:00Z',
      is_featured: true,
      is_active: true
    },
    {
      id: '5',
      name: 'Vaso Geométrico',
      description: 'Vaso decorativo com padrões geométricos modernos.',
      price: 39.90,
      stock_quantity: 6,
      images_url: ['/logo.png'],
      category: 'decorative',
      material: 'PLA',
      print_time_hours: 5.0,
      created_at: '2024-01-11T10:00:00Z',
      updated_at: '2024-01-11T10:00:00Z',
      is_featured: false,
      is_active: true
    },
    {
      id: '6',
      name: 'Ferramenta de Calibração',
      description: 'Kit de ferramentas para calibração precisa da impressora 3D.',
      price: 24.90,
      stock_quantity: 0,
      images_url: ['/logo.png'],
      category: 'tools',
      material: 'ABS',
      print_time_hours: 1.5,
      created_at: '2024-01-10T10:00:00Z',
      updated_at: '2024-01-10T10:00:00Z',
      is_featured: false,
      is_active: true
    }
  ]

  // Simular carregamento
  useEffect(() => {
    setTimeout(() => {
      setProducts(mockProducts)
      setFilteredProducts(mockProducts)
      setLoading(false)
    }, 1000)
  }, [])

  // Aplicar filtros
  useEffect(() => {
    let filtered = [...products]

    // Filtro por busca
    if (filters.search) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(filters.search!.toLowerCase()) ||
        product.description?.toLowerCase().includes(filters.search!.toLowerCase())
      )
    }

    // Filtro por categoria
    if (filters.category) {
      filtered = filtered.filter(product => product.category === filters.category)
    }

    // Filtro por material
    if (filters.material) {
      filtered = filtered.filter(product => product.material === filters.material)
    }

    // Filtro por preço
    if (filters.minPrice !== undefined) {
      filtered = filtered.filter(product => product.price >= filters.minPrice!)
    }
    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter(product => product.price <= filters.maxPrice!)
    }

    // Filtro por destaque
    if (filters.featured) {
      filtered = filtered.filter(product => product.is_featured)
    }

    // Ordenação
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'price':
          return a.price - b.price
        case 'newest':
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      }
    })

    setFilteredProducts(filtered)
  }, [products, filters, sortBy])

  const handleFiltersChange = (newFilters: ProductFiltersType) => {
    setFilters(newFilters)
  }

  const handleClearFilters = () => {
    setFilters({})
  }

  const handleAddToCart = (productId: string) => {
    // TODO: Implementar lógica do carrinho
    console.log('Adicionar ao carrinho:', productId)
  }

  const sortOptions = [
    { value: 'newest', label: 'Mais Recentes' },
    { value: 'name', label: 'Nome A-Z' },
    { value: 'price', label: 'Menor Preço' }
  ]

  return (
    <MainLayout>
      <div className="container-pixel py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-pixel text-4xl text-neon mb-4">
            Produtos
          </h1>
          <p className="text-muted-foreground font-mono max-w-2xl">
            Explore nossa coleção completa de produtos de impressão 3D. 
            Qualidade pixel-perfect em cada item.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filters - Desktop */}
          <div className="hidden lg:block lg:w-80 flex-shrink-0">
            <ProductFilters
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Controls */}
            <div className="lg:hidden mb-6 space-y-4">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex-1"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
                  </svg>
                  Filtros
                </Button>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="input-pixel flex-1"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Mobile Filters */}
              {showFilters && (
                <ProductFilters
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  onClearFilters={handleClearFilters}
                />
              )}
            </div>

            {/* Desktop Sort */}
            <div className="hidden lg:flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <span className="text-sm font-mono text-muted-foreground">
                  {filteredProducts.length} produtos encontrados
                </span>
                {Object.keys(filters).length > 0 && (
                  <Badge variant="outline" size="sm">
                    {Object.keys(filters).length} filtro(s) ativo(s)
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm font-mono">Ordenar por:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="input-pixel w-auto"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <ProductGrid
              products={filteredProducts}
              loading={loading}
              onAddToCart={handleAddToCart}
              emptyMessage="Nenhum produto encontrado com os filtros selecionados"
            />
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

