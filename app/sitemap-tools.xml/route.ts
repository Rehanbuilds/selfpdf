import { NextResponse } from 'next/server'

const siteUrl = 'https://www.selfpdf.xyz'
const lastModified = '2026-08-20T00:00:00.000Z'
const toolRoutes = [
  'compress', 'crop', 'excel-to-pdf', 'html-to-pdf', 'images-to-pdf', 'merge', 'ocr',
  'page-numbers', 'pdf-to-excel', 'pdf-to-images', 'pdf-to-powerpoint', 'pdf-to-word',
  'powerpoint-to-pdf', 'protect', 'repair', 'rotate', 'scan', 'sign', 'split', 'unlock',
  'watermark', 'word-to-pdf', 'pdf-to-markdown',
]

export function GET() {
  const urls = toolRoutes.map((tool) => `
  <url>
    <loc>${siteUrl}/tools/${tool}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')

  return new NextResponse(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}\n</urlset>`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600, s-maxage=86400' } },
  )
}
