import type { Metadata } from 'next';
import { getToolMetadata } from '@/lib/seo/tool-content';
export const metadata: Metadata = getToolMetadata('OCR PDF', 'Extract searchable text from scanned PDF pages', '/tools/ocr');
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
