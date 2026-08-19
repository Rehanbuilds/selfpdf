import type { Metadata } from 'next';
import { getToolMetadata } from '@/lib/seo/tool-content';
export const metadata: Metadata = getToolMetadata('Unlock PDF', 'Remove password protection from an authorized PDF', '/tools/unlock');
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
