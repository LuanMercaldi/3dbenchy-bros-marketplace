import React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'accent' | 'destructive' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  isLoading?: boolean
  children: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', isLoading = false, children, disabled, ...props }, ref) => {
    const baseClasses = [
      'inline-flex items-center justify-center font-mono font-bold uppercase tracking-wider',
      'border-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2',
      'focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
      'disabled:opacity-50 disabled:pointer-events-none image-pixelated',
      'active:translate-x-0.5 active:translate-y-0.5'
    ]

    const variants = {
      default: [
        'bg-primary text-background border-primary shadow-pixel',
        'hover:bg-background hover:text-primary hover:shadow-neon',
        'active:shadow-inset-pixel'
      ],
      secondary: [
        'bg-secondary text-background border-secondary shadow-pixel',
        'hover:bg-background hover:text-secondary hover:shadow-neon',
        'active:shadow-inset-pixel'
      ],
      accent: [
        'bg-accent text-background border-accent shadow-pixel',
        'hover:bg-background hover:text-accent hover:shadow-neon',
        'active:shadow-inset-pixel'
      ],
      destructive: [
        'bg-destructive text-destructive-foreground border-destructive shadow-pixel',
        'hover:bg-background hover:text-destructive hover:shadow-neon',
        'active:shadow-inset-pixel'
      ],
      outline: [
        'bg-transparent text-primary border-primary',
        'hover:bg-primary hover:text-background hover:shadow-neon'
      ],
      ghost: [
        'bg-transparent text-primary border-transparent',
        'hover:bg-primary hover:text-background hover:border-primary'
      ]
    }

    const sizes = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base',
      xl: 'px-8 py-4 text-lg'
    }

    return (
      <button
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-current border-t-transparent animate-spin image-pixelated" />
            <span>Carregando...</span>
          </div>
        ) : (
          children
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }

