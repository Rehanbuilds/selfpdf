import type { Metadata } from 'next';
import { getToolMetadata } from '@/lib/seo/tool-content';
export const metadata: Metadata = getToolMetadata('Split PDF', 'Extract pages from a PDF into separate documents', '/tools/split');
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
