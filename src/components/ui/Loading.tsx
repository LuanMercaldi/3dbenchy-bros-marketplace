import React from 'react'
import { cn } from '@/lib/utils'

export interface LoadingProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'spinner' | 'dots' | 'bars' | 'pulse'
  text?: string
  className?: string
}

const Loading: React.FC<LoadingProps> = ({
  size = 'md',
  variant = 'spinner',
  text,
  className
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg'
  }

  const renderSpinner = () => (
    <div
      className={cn(
        'border-2 border-primary border-t-transparent animate-spin image-pixelated',
        sizes[size]
      )}
    />
  )

  const renderDots = () => (
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            'bg-primary animate-pulse image-pixelated',
            size === 'sm' ? 'w-1 h-1' : size === 'md' ? 'w-2 h-2' : size === 'lg' ? 'w-3 h-3' : 'w-4 h-4'
          )}
          style={{
            animationDelay: `${i * 0.2}s`,
            animationDuration: '1s'
          }}
        />
      ))}
    </div>
  )

  const renderBars = () => (
    <div className="flex items-end space-x-1">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className={cn(
            'bg-primary animate-pulse image-pixelated',
            size === 'sm' ? 'w-1' : size === 'md' ? 'w-2' : size === 'lg' ? 'w-3' : 'w-4'
          )}
          style={{
            height: size === 'sm' ? '8px' : size === 'md' ? '16px' : size === 'lg' ? '24px' : '32px',
            animationDelay: `${i * 0.1}s`,
            animationDuration: '0.8s'
          }}
        />
      ))}
    </div>
  )

  const renderPulse = () => (
    <div
      className={cn(
        'bg-primary animate-pulse image-pixelated',
        sizes[size]
      )}
    />
  )

  const renderLoader = () => {
    switch (variant) {
      case 'dots':
        return renderDots()
      case 'bars':
        return renderBars()
      case 'pulse':
        return renderPulse()
      default:
        return renderSpinner()
    }
  }

  return (
    <div className={cn('flex flex-col items-center justify-center gap-2', className)}>
      {renderLoader()}
      {text && (
        <p className={cn('font-mono text-muted-foreground', textSizes[size])}>
          {text}
        </p>
      )}
    </div>
  )
}

// Componente para loading de página inteira
const PageLoading: React.FC<{ text?: string }> = ({ text = 'Carregando...' }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-background bg-opacity-90 backdrop-blur-sm">
    <Loading size="lg" text={text} />
  </div>
)

// Componente para loading inline
const InlineLoading: React.FC<{ text?: string; size?: LoadingProps['size'] }> = ({ 
  text = 'Carregando...', 
  size = 'sm' 
}) => (
  <div className="flex items-center gap-2">
    <Loading size={size} variant="spinner" />
    <span className="font-mono text-sm text-muted-foreground">{text}</span>
  </div>
)

export { Loading, PageLoading, InlineLoading }

