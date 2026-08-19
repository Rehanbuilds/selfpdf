import type { Metadata } from 'next';
import { getToolMetadata } from '@/lib/seo/tool-content';
export const metadata: Metadata = getToolMetadata('Word to PDF', 'Convert Word documents to PDF format', '/tools/word-to-pdf');
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
