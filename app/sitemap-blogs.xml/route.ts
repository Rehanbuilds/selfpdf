import { blogs } from '@/lib/blog/content'

const siteUrl = 'https://www.selfpdf.xyz'
const lastModified = '2026-08-20T00:00:00.000Z'

export function GET() {
  const urls = blogs.map((blog) => `
    <url>
      <loc>${siteUrl}/blogs/${blog.slug}</loc>
      <lastmod>${blog.updatedAt}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.7</priority>
    </url>`).join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${siteUrl}/blogs</loc>
      <lastmod>${lastModified}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>${urls}
  </urlset>`

  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600, s-maxage=86400' } })
}
