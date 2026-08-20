import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: [
      'https://www.selfpdf.xyz/sitemap.xml',
      'https://www.selfpdf.xyz/sitemap-tools.xml',
    ],
    host: 'https://www.selfpdf.xyz',
  }
}
