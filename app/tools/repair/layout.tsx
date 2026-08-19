import type { Metadata } from 'next';
import { getToolMetadata } from '@/lib/seo/tool-content';
export const metadata: Metadata = getToolMetadata('Repair PDF', 'Try to recover a damaged or corrupted PDF file', '/tools/repair');
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
