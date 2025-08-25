'use client'

import React from 'react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { formatCurrency } from '@/lib/utils'

export default function AdminDashboardPage() {
  // Mock data para demonstração
  const stats = {
    totalRevenue: 15420.50,
    totalOrders: 127,
    totalProducts: 45,
    totalUsers: 89,
    revenueGrowth: 12.5,
    ordersGrowth: 8.3,
    productsGrowth: 15.2,
    usersGrowth: 22.1
  }

  const recentOrders = [
    {
      id: 'ORD-001',
      customer: 'João Silva',
      total: 89.90,
      status: 'processing',
      date: '2024-01-15T10:30:00Z'
    },
    {
      id: 'ORD-002',
      customer: 'Maria Santos',
      total: 156.80,
      status: 'shipped',
      date: '2024-01-15T09:15:00Z'
    },
    {
      id: 'ORD-003',
      customer: 'Pedro Costa',
      total: 45.90,
      status: 'delivered',
      date: '2024-01-14T16:20:00Z'
    },
    {
      id: 'ORD-004',
      customer: 'Ana Oliveira',
      total: 234.50,
      status: 'pending',
      date: '2024-01-14T14:45:00Z'
    }
  ]

  const topProducts = [
    {
      id: '1',
      name: 'Benchy Clássico',
      sales: 45,
      revenue: 1345.50
    },
    {
      id: '2',
      name: 'Dragão Pixel Art',
      sales: 32,
      revenue: 1468.80
    },
    {
      id: '3',
      name: 'Suporte para Celular',
      sales: 28,
      revenue: 557.20
    },
    {
      id: '4',
      name: 'Miniatura RPG',
      sales: 24,
      revenue: 861.60
    }
  ]

  const getStatusBadge = (status: string) => {
    const statusMap = {
      pending: { variant: 'outline' as const, label: 'Pendente' },
      processing: { variant: 'default' as const, label: 'Processando' },
      shipped: { variant: 'accent' as const, label: 'Enviado' },
      delivered: { variant: 'neon' as const, label: 'Entregue' },
      cancelled: { variant: 'destructive' as const, label: 'Cancelado' }
    }
    return statusMap[status as keyof typeof statusMap] || statusMap.pending
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Welcome */}
        <div>
          <h1 className="font-pixel text-2xl text-neon mb-2">
            Bem-vindo ao Dashboard
          </h1>
          <p className="text-muted-foreground font-mono">
            Visão geral do seu marketplace de impressão 3D
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card variant="neon">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-mono text-muted-foreground">
                Receita Total
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="font-pixel text-2xl text-primary">
                  {formatCurrency(stats.totalRevenue)}
                </span>
                <Badge variant="neon" size="sm">
                  +{stats.revenueGrowth}%
                </Badge>
              </div>
              <p className="text-xs font-mono text-muted-foreground mt-1">
                vs. mês anterior
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-mono text-muted-foreground">
                Total de Pedidos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="font-pixel text-2xl text-primary">
                  {stats.totalOrders}
                </span>
                <Badge variant="accent" size="sm">
                  +{stats.ordersGrowth}%
                </Badge>
              </div>
              <p className="text-xs font-mono text-muted-foreground mt-1">
                vs. mês anterior
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-mono text-muted-foreground">
                Produtos Ativos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="font-pixel text-2xl text-primary">
                  {stats.totalProducts}
                </span>
                <Badge variant="outline" size="sm">
                  +{stats.productsGrowth}%
                </Badge>
              </div>
              <p className="text-xs font-mono text-muted-foreground mt-1">
                vs. mês anterior
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-mono text-muted-foreground">
                Usuários Registrados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="font-pixel text-2xl text-primary">
                  {stats.totalUsers}
                </span>
                <Badge variant="neon" size="sm">
                  +{stats.usersGrowth}%
                </Badge>
              </div>
              <p className="text-xs font-mono text-muted-foreground mt-1">
                vs. mês anterior
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Pedidos Recentes</CardTitle>
                <Button variant="outline" size="sm">
                  Ver Todos
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 bg-background border border-border image-pixelated">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-sm font-medium">
                          {order.id}
                        </span>
                        <Badge {...getStatusBadge(order.status)} size="sm">
                          {getStatusBadge(order.status).label}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground font-mono">
                        {order.customer}
                      </p>
                      <p className="text-xs text-muted-foreground font-mono">
                        {formatDate(order.date)}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="font-pixel text-primary">
                        {formatCurrency(order.total)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Products */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Produtos Mais Vendidos</CardTitle>
                <Button variant="outline" size="sm">
                  Ver Relatório
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={product.id} className="flex items-center justify-between p-3 bg-background border border-border image-pixelated">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary flex items-center justify-center image-pixelated">
                        <span className="text-xs font-pixel text-background">
                          #{index + 1}
                        </span>
                      </div>
                      <div>
                        <p className="font-mono text-sm font-medium">
                          {product.name}
                        </p>
                        <p className="text-xs text-muted-foreground font-mono">
                          {product.sales} vendas
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-pixel text-primary">
                        {formatCurrency(product.revenue)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button className="h-auto p-4 flex flex-col items-center space-y-2">
                <span className="text-2xl">📦</span>
                <span className="font-mono text-sm">Adicionar Produto</span>
              </Button>
              
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                <span className="text-2xl">🛒</span>
                <span className="font-mono text-sm">Ver Pedidos</span>
              </Button>
              
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                <span className="text-2xl">👥</span>
                <span className="font-mono text-sm">Gerenciar Usuários</span>
              </Button>
              
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                <span className="text-2xl">📊</span>
                <span className="font-mono text-sm">Relatórios</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}

