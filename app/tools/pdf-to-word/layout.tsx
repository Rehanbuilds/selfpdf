import type { Metadata } from 'next';
import { getToolMetadata } from '@/lib/seo/tool-content';
export const metadata: Metadata = getToolMetadata('PDF to Word', 'Convert PDF files into editable Word documents', '/tools/pdf-to-word');
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
