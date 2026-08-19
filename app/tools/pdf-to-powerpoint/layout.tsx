import type { Metadata } from 'next';
import { getToolMetadata } from '@/lib/seo/tool-content';
export const metadata: Metadata = getToolMetadata('PDF to PowerPoint', 'Convert PDF pages into an editable PowerPoint presentation', '/tools/pdf-to-powerpoint');
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
