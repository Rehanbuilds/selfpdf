import type { ReactNode } from 'react'

import { Footer } from '@/components/footer'
import { Header } from '@/components/header'

export default function BlogsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
