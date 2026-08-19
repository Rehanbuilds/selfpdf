import type { Metadata } from 'next';
import { getToolMetadata } from '@/lib/seo/tool-content';
export const metadata: Metadata = getToolMetadata('Excel to PDF', 'Convert Excel spreadsheets to PDF format', '/tools/excel-to-pdf');
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
