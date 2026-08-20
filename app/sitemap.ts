import type { MetadataRoute } from 'next'

const siteUrl = 'https://selfpdf.com'
const lastModified = new Date('2026-08-20T00:00:00.000Z')

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/about`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/docs`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/privacy`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${siteUrl}/terms`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
  ]
}
