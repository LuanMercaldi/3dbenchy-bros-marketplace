import React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'neon' | 'ghost'
  error?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', variant = 'default', error, ...props }, ref) => {
    const baseClasses = [
      'flex h-10 w-full px-3 py-2 font-mono text-sm transition-all duration-200',
      'file:border-0 file:bg-transparent file:text-sm file:font-medium',
      'placeholder:text-muted-foreground focus-visible:outline-none',
      'disabled:cursor-not-allowed disabled:opacity-50 image-pixelated'
    ]

    const variants = {
      default: [
        'bg-input border-2 border-border text-foreground',
        'focus-visible:border-primary focus-visible:shadow-neon',
        error ? 'border-destructive focus-visible:border-destructive' : ''
      ],
      neon: [
        'bg-input border-2 border-primary text-foreground shadow-neon-sm',
        'focus-visible:border-primary focus-visible:shadow-neon'
      ],
      ghost: [
        'bg-transparent border-2 border-transparent text-foreground',
        'focus-visible:border-primary focus-visible:bg-input'
      ]
    }

    return (
      <div className="w-full">
        <input
          type={type}
          className={cn(
            baseClasses,
            variants[variant],
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-1 text-xs text-destructive font-mono">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }

