import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '3DBenchy Bros - Impressões Lendárias',
  description: 'Marketplace de produtos de impressão 3D com qualidade pixel-perfect. Transformamos ideias em realidade através da tecnologia de impressão 3D.',
  keywords: ['impressão 3D', '3D printing', 'marketplace', 'produtos 3D', 'miniaturas', 'ferramentas'],
  authors: [{ name: '3DBenchy Bros' }],
  creator: '3DBenchy Bros',
  publisher: '3DBenchy Bros',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    title: '3DBenchy Bros - Impressões Lendárias',
    description: 'Marketplace de produtos de impressão 3D com qualidade pixel-perfect.',
    url: '/',
    siteName: '3DBenchy Bros',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: '3DBenchy Bros Logo',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '3DBenchy Bros - Impressões Lendárias',
    description: 'Marketplace de produtos de impressão 3D com qualidade pixel-perfect.',
    images: ['/logo.png'],
    creator: '@3dbenchy-bros',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <link rel="icon" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <meta name="theme-color" content="#00ffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}

