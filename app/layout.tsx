import { Container, Theme } from '@radix-ui/themes'
import { Inter } from 'next/font/google'

import { Provider as AuthProvider } from './auth/Provider'
import { QueryClientProvider } from './queries/QueryClientProvider'

import '@radix-ui/themes/styles.css'
import 'react-loading-skeleton/dist/skeleton.css'
import './globals.css'
import './theme-config.css'
import { NavBar } from '@/app/components'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable}`} suppressHydrationWarning={true}>
        <AuthProvider>
          <QueryClientProvider>
            <Theme accentColor="blue" radius="small">
              <NavBar />
              <main className="p-5">
                <Container>{children}</Container>
              </main>
            </Theme>
          </QueryClientProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
