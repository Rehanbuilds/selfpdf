import type { Metadata } from 'next';
import { getToolMetadata } from '@/lib/seo/tool-content';
export const metadata: Metadata = getToolMetadata('Merge PDF', 'Combine multiple PDF files into one document', '/tools/merge');
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
