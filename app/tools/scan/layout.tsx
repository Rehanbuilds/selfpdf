import type { Metadata } from 'next';
import { getToolMetadata } from '@/lib/seo/tool-content';
export const metadata: Metadata = getToolMetadata('Scan to PDF', 'Create a PDF from scanned pages and images', '/tools/scan');
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
