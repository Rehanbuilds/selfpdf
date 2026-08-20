import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: [
      'https://selfpdf.com/sitemap.xml',
      'https://selfpdf.com/sitemap-tools.xml',
    ],
    host: 'https://selfpdf.com',
  }
}
