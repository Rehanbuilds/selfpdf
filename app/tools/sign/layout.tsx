import type { Metadata } from 'next';
import { getToolMetadata } from '@/lib/seo/tool-content';
export const metadata: Metadata = getToolMetadata('Sign PDF', 'Add a signature to a PDF document', '/tools/sign');
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
