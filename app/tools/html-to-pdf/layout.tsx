import type { Metadata } from 'next';
import { getToolMetadata } from '@/lib/seo/tool-content';
export const metadata: Metadata = getToolMetadata('HTML to PDF', 'Convert HTML and CSS into a downloadable PDF document', '/tools/html-to-pdf');
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
