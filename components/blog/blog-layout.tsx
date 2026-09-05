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
        '@type': 'BreadcrumbList',
        itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Blogs', item: `${siteUrl}/blogs` }, { '@type': 'ListItem', position: 2, name: blog.title, item: `${siteUrl}/blogs/${blog.slug}` }],
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

function headingId(heading: string) { return heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') }

export function BlogArticleView({ blog }: { blog: BlogArticle }) {
  return (
    <article className="mx-auto flex w-full max-w-5xl flex-col gap-12">
      <details className="rounded-2xl border bg-muted/30 p-5 lg:hidden"><summary className="cursor-pointer font-bold">On this page</summary><nav className="flex flex-col gap-2 pt-4 text-sm text-muted-foreground">{blog.sections.map((section) => <a key={section.heading} href={`#${headingId(section.heading)}`} className="hover:text-primary">{section.heading}</a>)}</nav></details>
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="min-w-0">
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
          <section key={section.heading} id={headingId(section.heading)} className="scroll-mt-8 flex flex-col gap-4">
            <h2 className="text-2xl font-bold tracking-tight">{section.heading}</h2>
            {section.paragraphs?.map((paragraph) => <p key={paragraph} className="text-pretty leading-7 text-muted-foreground"><RichText text={paragraph} /></p>)}
            {section.callout && <div className="rounded-xl border-l-4 border-primary bg-primary/5 px-5 py-4 font-semibold text-primary">{section.callout}</div>}
            {section.steps && <div className="grid gap-3 sm:grid-cols-2">{section.steps.map((step, index) => <div key={step.title} className="rounded-xl border bg-card p-5"><p className="text-sm font-bold text-primary">Step {index + 1}</p><h3 className="mt-2 font-bold">{step.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{step.description}</p></div>)}</div>}
            {section.table && <div className="overflow-x-auto rounded-xl border"><table className="min-w-full text-left text-sm"><thead className="bg-muted/50"><tr>{section.table.headers.map((header) => <th key={header} className="whitespace-nowrap px-4 py-3 font-bold">{header}</th>)}</tr></thead><tbody>{section.table.rows.map((row) => <tr key={row[0]} className="border-t">{row.map((cell) => <td key={cell} className="min-w-40 px-4 py-3 align-top leading-6 text-muted-foreground">{cell}</td>)}</tr>)}</tbody></table></div>}
            {section.bullets && <ul className="flex flex-col gap-3 pl-5 text-muted-foreground marker:text-primary">{section.bullets.map((bullet) => <li key={bullet} className="pl-2 leading-7"><RichText text={bullet} /></li>)}</ul>}
          </section>
        ))}
      </div>
        </div>
        <aside className="hidden lg:block"><div className="sticky top-24 rounded-2xl border bg-muted/30 p-5"><p className="text-sm font-bold">On this page</p><nav className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">{blog.sections.map((section) => <a key={section.heading} href={`#${headingId(section.heading)}`} className="hover:text-primary">{section.heading}</a>)}</nav></div></aside>
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
