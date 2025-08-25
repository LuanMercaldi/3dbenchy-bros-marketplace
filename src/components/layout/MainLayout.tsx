'use client'

import React from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { cn } from '@/lib/utils'

interface MainLayoutProps {
  children: React.ReactNode
  className?: string
  showHeader?: boolean
  showFooter?: boolean
  cartItemsCount?: number
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  className,
  showHeader = true,
  showFooter = true,
  cartItemsCount = 0
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-background bg-circuit">
      {/* Header */}
      {showHeader && <Header cartItemsCount={cartItemsCount} />}
      
      {/* Main Content */}
      <main className={cn('flex-1', className)}>
        {children}
      </main>
      
      {/* Footer */}
      {showFooter && <Footer />}
      
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }} />
        </div>
        
        {/* Animated scan lines */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-full h-px bg-primary opacity-20 animate-scan-line" />
        </div>
      </div>
    </div>
  )
}

export { MainLayout }

