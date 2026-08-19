import type { Metadata } from 'next';
import { getToolMetadata } from '@/lib/seo/tool-content';
export const metadata: Metadata = getToolMetadata('Add Page Numbers to PDF', 'Add page numbers to PDF documents with flexible placement', '/tools/page-numbers');
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
