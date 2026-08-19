import type { Metadata } from 'next';
import { getToolMetadata } from '@/lib/seo/tool-content';
export const metadata: Metadata = getToolMetadata('Watermark PDF', 'Add a text watermark to every page of a PDF', '/tools/watermark');
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
