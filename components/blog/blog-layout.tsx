import Link from 'next/link'
import type { BlogArticle } from '@/lib/blog/content'

const siteUrl = 'https://www.selfpdf.xyz'

function RichText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g)
  return <>{parts.map((part, index) => { const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/); return match ? <Link key={`${part}-${index}`} href={match[2]} className="font-medium text-primary underline-offset-4 hover:underline">{match[1]}</Link> : <span key={`${part}-${index}`}>{part}</span> })}</>
}

export function BlogJsonLd({ blog }: { blog: BlogArticle }) {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: blog.title,
        description: blog.description,
        datePublished: blog.publishedAt,
        dateModified: blog.updatedAt,
        author: { '@type': 'Organization', name: 'SelfPDF', url: siteUrl },
        publisher: { '@type': 'Organization', name: 'SelfPDF', url: siteUrl },
        mainEntityOfPage: `${siteUrl}/blogs/${blog.slug}`,
        keywords: blog.keywords.join(', '),
      },
      {
        '@type': 'FAQPage',
        mainEntity: blog.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

export function BlogCard({ blog }: { blog: BlogArticle }) {
  return (
    <Link href={`/blogs/${blog.slug}`} className="group flex h-full flex-col justify-between rounded-2xl border bg-card p-6 transition-colors hover:border-primary/50">
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between gap-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          <span>{blog.category}</span>
          <span>{blog.readTime}</span>
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="text-balance text-2xl font-bold tracking-tight group-hover:text-primary">{blog.title}</h2>
          <p className="leading-relaxed text-muted-foreground">{blog.description}</p>
        </div>
      </div>
      <span className="mt-8 text-sm font-bold text-primary">Read article →</span>
    </Link>
  )
}

export function BlogArticleView({ blog }: { blog: BlogArticle }) {
  return (
    <article className="mx-auto flex w-full max-w-4xl flex-col gap-12">
      <header className="flex flex-col gap-6 border-b pb-10">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          <span>{blog.category}</span><span aria-hidden="true">•</span><span>{blog.readTime}</span>
        </div>
        <h1 className="max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-5xl">{blog.title}</h1>
        <p className="max-w-2xl text-pretty text-xl leading-relaxed text-muted-foreground">{blog.intro}</p>
        <p className="text-sm text-muted-foreground">Published {blog.publishedAt} · Updated {blog.updatedAt}</p>
      </header>

      <div className="flex flex-col gap-10">
        {blog.sections.map((section) => (
          <section key={section.heading} className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold tracking-tight">{section.heading}</h2>
            {section.paragraphs?.map((paragraph) => <p key={paragraph} className="text-pretty leading-7 text-muted-foreground"><RichText text={paragraph} /></p>)}
            {section.bullets && <ul className="flex flex-col gap-3 pl-5 text-muted-foreground marker:text-primary">{section.bullets.map((bullet) => <li key={bullet} className="pl-2 leading-7"><RichText text={bullet} /></li>)}</ul>}
          </section>
        ))}
      </div>

      <section className="flex flex-col gap-6 rounded-2xl border bg-muted/30 p-6 sm:p-8" aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="text-2xl font-bold tracking-tight">Frequently asked questions</h2>
        <div className="flex flex-col gap-4">
          {blog.faqs.map((faq) => <details key={faq.question} className="rounded-xl border bg-background px-5 py-4"><summary className="cursor-pointer font-bold">{faq.question}</summary><p className="pt-3 leading-7 text-muted-foreground">{faq.answer}</p></details>)}
        </div>
      </section>

      <section className="flex flex-col gap-4 rounded-2xl bg-primary p-6 text-primary-foreground sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] opacity-80">Try it now</p>
        <h2 className="text-2xl font-bold">{blog.prompt}</h2>
        <p className="max-w-2xl leading-7 opacity-90">Use a focused PDF workflow that keeps the next step simple and your documents organized.</p>
        <Link href={blog.cta.href} className="w-fit rounded-lg bg-background px-5 py-3 font-bold text-foreground transition-opacity hover:opacity-90">{blog.cta.label}</Link>
      </section>

      <nav className="flex flex-wrap items-center justify-between gap-4 border-t pt-8" aria-label="Blog navigation">
        <Link href="/blogs" className="font-semibold text-primary hover:underline">← Back to Blogs</Link>
        <Link href="/tools" className="font-semibold text-primary hover:underline">Explore all PDF tools →</Link>
      </nav>
    </article>
  )
}
