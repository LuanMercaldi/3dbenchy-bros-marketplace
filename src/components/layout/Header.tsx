'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

interface HeaderProps {
  cartItemsCount?: number
}

const Header: React.FC<HeaderProps> = ({ cartItemsCount = 0 }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const navigationItems = [
    { href: '/', label: 'Home', active: pathname === '/' },
    { href: '/products', label: 'Produtos', active: pathname.startsWith('/products') },
    { href: '/blog', label: 'Blog', active: pathname.startsWith('/blog') },
    { href: '/about', label: 'Sobre', active: pathname === '/about' },
    { href: '/contact', label: 'Contato', active: pathname === '/contact' },
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className="sticky top-0 z-40 w-full bg-background border-b-2 border-primary shadow-neon-sm">
      <div className="container-pixel">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative w-12 h-12 transition-transform duration-200 group-hover:scale-110">
              <Image
                src="/logo.png"
                alt="3DBenchy Bros"
                fill
                className="object-contain image-pixelated"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-pixel text-lg text-neon gradient-text">
                3DBenchy Bros
              </h1>
              <p className="text-xs text-muted-foreground font-mono">
                Impressões Lendárias
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'font-mono text-sm font-medium transition-all duration-200 hover:text-neon hover:shadow-neon-sm',
                  item.active ? 'text-primary text-neon' : 'text-foreground'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </Button>

            {/* Cart */}
            <Link href="/cart">
              <Button variant="outline" size="sm" className="relative">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8m-8 0a2 2 0 100 4 2 2 0 000-4zm8 0a2 2 0 100 4 2 2 0 000-4z" />
                </svg>
                {cartItemsCount > 0 && (
                  <Badge 
                    variant="neon" 
                    size="sm" 
                    className="absolute -top-2 -right-2 min-w-[20px] h-5 flex items-center justify-center p-0"
                  >
                    {cartItemsCount > 99 ? '99+' : cartItemsCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User Menu */}
            <div className="hidden sm:flex items-center space-x-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">
                  Cadastrar
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={toggleMobileMenu}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-card">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'block px-3 py-2 font-mono text-sm font-medium transition-all duration-200',
                    'hover:bg-primary hover:text-background',
                    item.active ? 'bg-primary text-background' : 'text-foreground'
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Mobile Auth Links */}
              <div className="pt-4 border-t border-border space-y-1">
                <Link
                  href="/login"
                  className="block px-3 py-2 font-mono text-sm font-medium text-foreground hover:bg-primary hover:text-background transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block px-3 py-2 font-mono text-sm font-medium text-foreground hover:bg-primary hover:text-background transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Cadastrar
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Scan Line Effect */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 animate-pulse" />
    </header>
  )
}

export { Header }

