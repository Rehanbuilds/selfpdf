import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BlogArticleView, BlogJsonLd } from '@/components/blog/blog-layout'
import { blogs, getBlog } from '@/lib/blog/content'

type PageProps = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return blogs.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const blog = getBlog(slug)
  if (!blog) return {}
  return {
    title: blog.metaTitle,
    description: blog.description,
    keywords: blog.keywords,
    alternates: { canonical: `https://www.selfpdf.xyz/blogs/${blog.slug}` },
    openGraph: { type: 'article', title: blog.title, description: blog.description, url: `https://www.selfpdf.xyz/blogs/${blog.slug}`, publishedTime: blog.publishedAt, modifiedTime: blog.updatedAt, authors: ['SelfPDF'] },
    twitter: { card: 'summary', title: blog.title, description: blog.description },
  }
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params
  const blog = getBlog(slug)
  if (!blog) notFound()
  return <div className="bg-background px-4 py-16 sm:px-6 sm:py-24 lg:px-8"><BlogJsonLd blog={blog} /><BlogArticleView blog={blog} /></div>
}
