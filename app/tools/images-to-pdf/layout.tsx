import type { Metadata } from 'next';
import { getToolMetadata } from '@/lib/seo/tool-content';
export const metadata: Metadata = getToolMetadata('Images to PDF', 'Convert JPG and PNG images into a PDF document', '/tools/images-to-pdf');
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
