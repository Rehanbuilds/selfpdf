import type { MetadataRoute } from 'next'

const siteUrl = 'https://selfpdf.com'
const toolRoutes = [
  'compress', 'crop', 'excel-to-pdf', 'html-to-pdf', 'images-to-pdf', 'merge', 'ocr',
  'page-numbers', 'pdf-to-excel', 'pdf-to-images', 'pdf-to-powerpoint', 'pdf-to-word',
  'powerpoint-to-pdf', 'protect', 'repair', 'rotate', 'scan', 'sign', 'split', 'unlock',
  'watermark', 'word-to-pdf',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', 'tools', 'about', 'privacy', 'terms', 'docs']
  return [
    ...pages.map((page) => ({
      url: `${siteUrl}/${page}`.replace(/\/$/, '') || siteUrl,
      lastModified: new Date(),
      changeFrequency: page === '' ? 'weekly' as const : 'monthly' as const,
      priority: page === '' ? 1 : page === 'tools' ? 0.9 : 0.6,
    })),
    ...toolRoutes.map((tool) => ({
      url: `${siteUrl}/tools/${tool}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
