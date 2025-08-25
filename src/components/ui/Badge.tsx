import React from 'react'
import { cn } from '@/lib/utils'

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'accent' | 'destructive' | 'outline' | 'neon'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    const baseClasses = [
      'inline-flex items-center font-mono font-bold uppercase tracking-wider',
      'border transition-all duration-200 image-pixelated'
    ]

    const variants = {
      default: [
        'bg-primary text-background border-primary',
        'hover:shadow-neon-sm'
      ],
      secondary: [
        'bg-secondary text-background border-secondary',
        'hover:shadow-neon-sm'
      ],
      accent: [
        'bg-accent text-background border-accent',
        'hover:shadow-neon-sm'
      ],
      destructive: [
        'bg-destructive text-destructive-foreground border-destructive',
        'hover:shadow-neon-sm'
      ],
      outline: [
        'bg-transparent text-primary border-primary',
        'hover:bg-primary hover:text-background'
      ],
      neon: [
        'bg-transparent text-primary border-primary shadow-neon-sm',
        'hover:shadow-neon'
      ]
    }

    const sizes = {
      sm: 'px-1.5 py-0.5 text-xs',
      md: 'px-2 py-1 text-xs',
      lg: 'px-3 py-1.5 text-sm'
    }

    return (
      <div
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Badge.displayName = 'Badge'

export { Badge }

