import type { Metadata } from 'next';
import { getToolMetadata } from '@/lib/seo/tool-content';
export const metadata: Metadata = getToolMetadata('PowerPoint to PDF', 'Convert PowerPoint presentations into PDF files', '/tools/powerpoint-to-pdf');
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
