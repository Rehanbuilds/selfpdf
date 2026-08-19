import type { Metadata } from 'next';
import { getToolMetadata } from '@/lib/seo/tool-content';
export const metadata: Metadata = getToolMetadata('PDF to Images', 'Convert PDF pages into JPG or PNG images', '/tools/pdf-to-images');
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
