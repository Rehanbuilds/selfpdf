import type { Metadata } from 'next';
import { getToolMetadata } from '@/lib/seo/tool-content';
export const metadata: Metadata = getToolMetadata('Rotate PDF', 'Rotate PDF pages and save the corrected document', '/tools/rotate');
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
