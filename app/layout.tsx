import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import ToastProvider from '@/components/providers/toaster-provider'
import RecoilProvider from '@/components/providers/recoil-provider'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Learning Management System',
  description: 'This app is basically a udemy clone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ToastProvider />
         <RecoilProvider/>
          {children}

        </body>
      </html>
    </ClerkProvider>
  )
}
