import type { Metadata } from 'next';
import { getToolMetadata } from '@/lib/seo/tool-content';
export const metadata: Metadata = getToolMetadata('Compress PDF', 'Reduce PDF file size while maintaining quality', '/tools/compress');
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
