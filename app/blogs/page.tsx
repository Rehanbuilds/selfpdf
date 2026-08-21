import type { Metadata } from 'next'
import { BlogCard } from '@/components/blog/blog-layout'
import { blogs } from '@/lib/blog/content'

export const metadata: Metadata = {
  title: 'PDF Tips, Guides, and Workflows',
  description: 'Practical guides for merging, compressing, converting, editing, and organizing PDF files online.',
  alternates: { canonical: 'https://www.selfpdf.xyz/blogs' },
}

export default function BlogsPage() {
  return (
    <div className="bg-background">
      <section className="border-b bg-muted/30 py-20 sm:py-28">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">SelfPDF Journal</p>
          <h1 className="max-w-4xl text-balance text-4xl font-bold tracking-tight sm:text-6xl">Better PDF workflows, explained clearly.</h1>
          <p className="max-w-2xl text-pretty text-lg leading-8 text-muted-foreground">Practical answers for everyday PDF tasks, from combining documents to preparing smaller files for email and uploads.</p>
        </div>
      </section>
      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8 sm:py-20">
        <div className="grid gap-6 md:grid-cols-2">
          {blogs.map((blog) => <BlogCard key={blog.slug} blog={blog} />)}
        </div>
      </section>
    </div>
  )
}
