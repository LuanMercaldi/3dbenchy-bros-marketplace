import React from 'react'
import { MainLayout } from '@/components/layout'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

export default function HomePage() {
  // Dados mockados para demonstração
  const featuredProducts = [
    {
      id: 1,
      name: 'Benchy Clássico',
      price: 29.90,
      image: '/logo.png',
      category: 'Miniaturas',
      material: 'PLA',
      featured: true
    },
    {
      id: 2,
      name: 'Dragão Pixel',
      price: 45.90,
      image: '/logo.png',
      category: 'Decorativo',
      material: 'PETG',
      featured: true
    },
    {
      id: 3,
      name: 'Suporte para Celular',
      price: 19.90,
      image: '/logo.png',
      category: 'Funcional',
      material: 'ABS',
      featured: true
    },
    {
      id: 4,
      name: 'Miniatura RPG',
      price: 35.90,
      image: '/logo.png',
      category: 'Gaming',
      material: 'Resina',
      featured: true
    }
  ]

  const blogPosts = [
    {
      id: 1,
      title: 'Guia Completo de Materiais para Impressão 3D',
      excerpt: 'Descubra qual material é ideal para cada tipo de projeto...',
      date: '2024-01-15',
      author: 'Tech Team'
    },
    {
      id: 2,
      title: 'Como Otimizar suas Impressões 3D',
      excerpt: 'Dicas profissionais para obter a melhor qualidade...',
      date: '2024-01-10',
      author: 'Print Master'
    },
    {
      id: 3,
      title: 'Tendências em Impressão 3D para 2024',
      excerpt: 'O que esperar do mercado de impressão 3D este ano...',
      date: '2024-01-05',
      author: 'Future Vision'
    }
  ]

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="container-pixel relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="neon" className="mb-6">
              🚀 Novo no marketplace
            </Badge>
            
            <h1 className="font-pixel text-4xl md:text-6xl lg:text-7xl mb-6">
              <span className="gradient-text">Impressões</span>
              <br />
              <span className="text-neon animate-pulse-neon">Lendárias</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground font-mono mb-8 max-w-2xl mx-auto">
              Transformamos suas ideias em realidade através da impressão 3D. 
              Qualidade pixel-perfect em cada produto.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8">
                Explorar Produtos
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8">
                Ver Catálogo
              </Button>
            </div>
          </div>
        </div>
        
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary opacity-10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary opacity-10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 bg-accent opacity-5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-card bg-opacity-50">
        <div className="container-pixel">
          <div className="text-center mb-12">
            <h2 className="font-pixel text-3xl md:text-4xl text-neon mb-4">
              Produtos em Destaque
            </h2>
            <p className="text-muted-foreground font-mono max-w-2xl mx-auto">
              Descubra nossa seleção especial de produtos mais populares e inovadores
            </p>
          </div>
          
          <div className="product-grid">
            {featuredProducts.map((product) => (
              <Card key={product.id} variant="neon" className="group cursor-pointer">
                <div className="aspect-square bg-background mb-4 flex items-center justify-center overflow-hidden">
                  <div className="w-20 h-20 bg-primary opacity-20 image-pixelated group-hover:opacity-40 transition-opacity duration-300" />
                </div>
                
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" size="sm">
                      {product.category}
                    </Badge>
                    <Badge variant="accent" size="sm">
                      {product.material}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="font-pixel text-xl text-primary">
                      R$ {product.price.toFixed(2)}
                    </span>
                    <Button size="sm">
                      Adicionar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Ver Todos os Produtos
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container-pixel">
          <div className="text-center mb-12">
            <h2 className="font-pixel text-3xl md:text-4xl text-neon mb-4">
              Por que Escolher a 3DBenchy Bros?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-primary mx-auto mb-4 flex items-center justify-center image-pixelated">
                  <span className="text-2xl">🎯</span>
                </div>
                <CardTitle className="mb-2">Qualidade Pixel-Perfect</CardTitle>
                <CardDescription>
                  Cada produto é impresso com precisão máxima e controle de qualidade rigoroso
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-secondary mx-auto mb-4 flex items-center justify-center image-pixelated">
                  <span className="text-2xl">⚡</span>
                </div>
                <CardTitle className="mb-2">Entrega Rápida</CardTitle>
                <CardDescription>
                  Processamento em até 24h e entrega expressa para todo o Brasil
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-accent mx-auto mb-4 flex items-center justify-center image-pixelated">
                  <span className="text-2xl">🛡️</span>
                </div>
                <CardTitle className="mb-2">Garantia Total</CardTitle>
                <CardDescription>
                  30 dias de garantia e suporte técnico especializado
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 bg-card bg-opacity-50">
        <div className="container-pixel">
          <div className="text-center mb-12">
            <h2 className="font-pixel text-3xl md:text-4xl text-neon mb-4">
              Últimas do Blog
            </h2>
            <p className="text-muted-foreground font-mono max-w-2xl mx-auto">
              Fique por dentro das novidades e dicas sobre impressão 3D
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="group cursor-pointer">
                <div className="aspect-video bg-background mb-4 flex items-center justify-center">
                  <div className="w-16 h-16 bg-primary opacity-20 image-pixelated group-hover:opacity-40 transition-opacity duration-300" />
                </div>
                
                <CardHeader>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono mb-2">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.author}</span>
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors duration-200">
                    {post.title}
                  </CardTitle>
                  <CardDescription>
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <Button variant="ghost" size="sm">
                    Ler Mais →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Ver Todos os Posts
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="container-pixel relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-pixel text-3xl md:text-5xl text-neon mb-6">
              Pronto para Começar?
            </h2>
            <p className="text-lg text-muted-foreground font-mono mb-8">
              Junte-se à comunidade 3DBenchy Bros e transforme suas ideias em realidade
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8">
                Criar Conta
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8">
                Falar com Vendas
              </Button>
            </div>
          </div>
        </div>
        
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        </div>
      </section>
    </MainLayout>
  )
}

