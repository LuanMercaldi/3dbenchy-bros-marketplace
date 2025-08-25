'use client'

import React, { useState } from 'react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { formatCurrency } from '@/lib/utils'
import type { Product } from '@/types'

export default function AdminProductsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all')

  // Mock data para demonstração
  const products: Product[] = [
    {
      id: '1',
      name: 'Benchy Clássico',
      description: 'O famoso barco de teste para impressoras 3D',
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
      description: 'Dragão estilizado em pixel art',
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
      description: 'Suporte ergonômico para celular',
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
      description: 'Miniatura detalhada de guerreiro',
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
      description: 'Vaso decorativo com padrões geométricos',
      price: 39.90,
      stock_quantity: 6,
      images_url: ['/logo.png'],
      category: 'decorative',
      material: 'PLA',
      print_time_hours: 5.0,
      created_at: '2024-01-11T10:00:00Z',
      updated_at: '2024-01-11T10:00:00Z',
      is_featured: false,
      is_active: false
    },
    {
      id: '6',
      name: 'Ferramenta de Calibração',
      description: 'Kit de ferramentas para calibração',
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

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' && product.is_active) ||
                         (filterStatus === 'inactive' && !product.is_active)
    
    return matchesSearch && matchesStatus
  })

  const getStockStatus = (quantity: number) => {
    if (quantity === 0) return { variant: 'destructive' as const, label: 'Esgotado' }
    if (quantity <= 5) return { variant: 'outline' as const, label: 'Estoque Baixo' }
    return { variant: 'neon' as const, label: 'Em Estoque' }
  }

  const getCategoryLabel = (category: string) => {
    const categories: Record<string, string> = {
      miniatures: 'Miniaturas',
      tools: 'Ferramentas',
      decorative: 'Decorativo',
      functional: 'Funcional',
      gaming: 'Gaming'
    }
    return categories[category] || category
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-pixel text-2xl text-neon">
              Gerenciar Produtos
            </h1>
            <p className="text-muted-foreground font-mono">
              {filteredProducts.length} produtos encontrados
            </p>
          </div>
          
          <Button size="lg">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Adicionar Produto
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Buscar produtos por nome ou descrição..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="input-pixel w-full sm:w-auto"
              >
                <option value="all">Todos os Status</option>
                <option value="active">Apenas Ativos</option>
                <option value="inactive">Apenas Inativos</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Produtos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-2 font-mono text-sm text-muted-foreground">
                      Produto
                    </th>
                    <th className="text-left py-3 px-2 font-mono text-sm text-muted-foreground">
                      Categoria
                    </th>
                    <th className="text-left py-3 px-2 font-mono text-sm text-muted-foreground">
                      Preço
                    </th>
                    <th className="text-left py-3 px-2 font-mono text-sm text-muted-foreground">
                      Estoque
                    </th>
                    <th className="text-left py-3 px-2 font-mono text-sm text-muted-foreground">
                      Status
                    </th>
                    <th className="text-left py-3 px-2 font-mono text-sm text-muted-foreground">
                      Criado
                    </th>
                    <th className="text-right py-3 px-2 font-mono text-sm text-muted-foreground">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="border-b border-border hover:bg-muted/50">
                      <td className="py-4 px-2">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-background border border-border flex items-center justify-center image-pixelated">
                            <span className="text-xs">📦</span>
                          </div>
                          <div>
                            <p className="font-mono text-sm font-medium">
                              {product.name}
                            </p>
                            <p className="text-xs text-muted-foreground font-mono">
                              ID: {product.id}
                            </p>
                            {product.is_featured && (
                              <Badge variant="neon" size="sm" className="mt-1">
                                Destaque
                              </Badge>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <Badge variant="outline" size="sm">
                          {getCategoryLabel(product.category || '')}
                        </Badge>
                      </td>
                      <td className="py-4 px-2">
                        <span className="font-pixel text-primary">
                          {formatCurrency(product.price)}
                        </span>
                      </td>
                      <td className="py-4 px-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm">
                            {product.stock_quantity}
                          </span>
                          <Badge {...getStockStatus(product.stock_quantity)} size="sm">
                            {getStockStatus(product.stock_quantity).label}
                          </Badge>
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <Badge variant={product.is_active ? 'neon' : 'outline'} size="sm">
                          {product.is_active ? 'Ativo' : 'Inativo'}
                        </Badge>
                      </td>
                      <td className="py-4 px-2">
                        <span className="text-sm font-mono text-muted-foreground">
                          {formatDate(product.created_at)}
                        </span>
                      </td>
                      <td className="py-4 px-2">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </Button>
                          <Button variant="ghost" size="sm">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </Button>
                          <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive-foreground hover:bg-destructive">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-muted mx-auto mb-4 flex items-center justify-center image-pixelated">
                  <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="font-pixel text-lg text-muted-foreground mb-2">
                  Nenhum produto encontrado
                </h3>
                <p className="text-sm text-muted-foreground font-mono">
                  Tente ajustar os filtros ou adicionar novos produtos
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <span className="font-pixel text-2xl text-primary">
                  {products.filter(p => p.is_active).length}
                </span>
                <p className="text-xs font-mono text-muted-foreground mt-1">
                  Produtos Ativos
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <span className="font-pixel text-2xl text-primary">
                  {products.filter(p => p.stock_quantity === 0).length}
                </span>
                <p className="text-xs font-mono text-muted-foreground mt-1">
                  Produtos Esgotados
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <span className="font-pixel text-2xl text-primary">
                  {products.filter(p => p.is_featured).length}
                </span>
                <p className="text-xs font-mono text-muted-foreground mt-1">
                  Produtos em Destaque
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <span className="font-pixel text-2xl text-primary">
                  {formatCurrency(products.reduce((sum, p) => sum + p.price, 0) / products.length)}
                </span>
                <p className="text-xs font-mono text-muted-foreground mt-1">
                  Preço Médio
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}

