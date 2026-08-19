import type { Metadata } from 'next';
import { getToolMetadata } from '@/lib/seo/tool-content';
export const metadata: Metadata = getToolMetadata('Protect PDF', 'Protect a PDF with password-based encryption', '/tools/protect');
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
