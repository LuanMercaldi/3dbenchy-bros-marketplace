import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: 'Produtos',
      links: [
        { href: '/products', label: 'Todos os Produtos' },
        { href: '/products?category=miniatures', label: 'Miniaturas' },
        { href: '/products?category=tools', label: 'Ferramentas' },
        { href: '/products?category=decorative', label: 'Decorativos' },
        { href: '/products?featured=true', label: 'Em Destaque' },
      ]
    },
    {
      title: 'Empresa',
      links: [
        { href: '/about', label: 'Sobre Nós' },
        { href: '/blog', label: 'Blog' },
        { href: '/contact', label: 'Contato' },
        { href: '/careers', label: 'Trabalhe Conosco' },
        { href: '/press', label: 'Imprensa' },
      ]
    },
    {
      title: 'Suporte',
      links: [
        { href: '/help', label: 'Central de Ajuda' },
        { href: '/shipping', label: 'Envios' },
        { href: '/returns', label: 'Devoluções' },
        { href: '/warranty', label: 'Garantia' },
        { href: '/faq', label: 'FAQ' },
      ]
    },
    {
      title: 'Legal',
      links: [
        { href: '/privacy', label: 'Privacidade' },
        { href: '/terms', label: 'Termos de Uso' },
        { href: '/cookies', label: 'Cookies' },
        { href: '/gdpr', label: 'LGPD' },
        { href: '/accessibility', label: 'Acessibilidade' },
      ]
    }
  ]

  const socialLinks = [
    {
      href: 'https://instagram.com/3dbenchy-bros',
      label: 'Instagram',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.326-1.297-.878-.808-1.297-1.959-1.297-3.256 0-1.297.419-2.448 1.297-3.326.878-.878 2.029-1.297 3.326-1.297s2.448.419 3.326 1.297c.878.878 1.297 2.029 1.297 3.326 0 1.297-.419 2.448-1.297 3.256-.878.807-2.029 1.297-3.326 1.297zm7.598 0c-1.297 0-2.448-.49-3.326-1.297-.878-.808-1.297-1.959-1.297-3.256 0-1.297.419-2.448 1.297-3.326.878-.878 2.029-1.297 3.326-1.297s2.448.419 3.326 1.297c.878.878 1.297 2.029 1.297 3.326 0 1.297-.419 2.448-1.297 3.256-.878.807-2.029 1.297-3.326 1.297z"/>
        </svg>
      )
    },
    {
      href: 'https://youtube.com/@3dbenchy-bros',
      label: 'YouTube',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    },
    {
      href: 'https://twitter.com/3dbenchy-bros',
      label: 'Twitter',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      )
    },
    {
      href: 'https://discord.gg/3dbenchy-bros',
      label: 'Discord',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0189 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
        </svg>
      )
    }
  ]

  return (
    <footer className="bg-background border-t-2 border-primary">
      {/* Newsletter Section */}
      <div className="border-b border-border bg-card">
        <div className="container-pixel py-pixel-4">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-pixel text-xl text-neon mb-4">
              Newsletter Pixel
            </h3>
            <p className="text-muted-foreground font-mono mb-6">
              Receba as últimas novidades sobre impressão 3D e lançamentos exclusivos
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="seu@email.com"
                className="flex-1"
              />
              <Button>
                Inscrever
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-pixel py-pixel-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-4">
              <div className="relative w-10 h-10">
                <Image
                  src="/logo.png"
                  alt="3DBenchy Bros"
                  fill
                  className="object-contain image-pixelated"
                />
              </div>
              <div>
                <h2 className="font-pixel text-lg text-neon gradient-text">
                  3DBenchy Bros
                </h2>
                <p className="text-xs text-muted-foreground font-mono">
                  Impressões Lendárias
                </p>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground font-mono mb-4 max-w-sm">
              Transformamos ideias em realidade através da impressão 3D. 
              Qualidade pixel-perfect em cada produto.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-card border border-border hover:border-primary hover:shadow-neon transition-all duration-200"
                  aria-label={social.label}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-pixel text-sm text-neon mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground font-mono hover:text-primary transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-pixel-6 pt-pixel-4 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-sm text-muted-foreground font-mono">
                © {currentYear} 3DBenchy Bros. Todos os direitos reservados.
              </p>
              <div className="flex items-center space-x-4">
                <Link
                  href="/privacy"
                  className="text-xs text-muted-foreground font-mono hover:text-primary transition-colors duration-200"
                >
                  Privacidade
                </Link>
                <Link
                  href="/terms"
                  className="text-xs text-muted-foreground font-mono hover:text-primary transition-colors duration-200"
                >
                  Termos
                </Link>
                <Link
                  href="/cookies"
                  className="text-xs text-muted-foreground font-mono hover:text-primary transition-colors duration-200"
                >
                  Cookies
                </Link>
              </div>
            </div>
            
            {/* Payment Methods */}
            <div className="flex items-center space-x-2">
              <span className="text-xs text-muted-foreground font-mono">
                Pagamento:
              </span>
              <div className="flex space-x-1">
                {['PIX', 'VISA', 'MASTER', 'BOLETO'].map((method) => (
                  <div
                    key={method}
                    className="px-2 py-1 bg-card border border-border text-xs font-mono"
                  >
                    {method}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scan Line Effect */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 animate-pulse" />
    </footer>
  )
}

export { Footer }

