import type { Metadata } from 'next';
import { getToolMetadata } from '@/lib/seo/tool-content';
export const metadata: Metadata = getToolMetadata('PDF to Excel', 'Convert PDF tables into an Excel spreadsheet', '/tools/pdf-to-excel');
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
