import type { Metadata } from 'next';
import { getToolMetadata } from '@/lib/seo/tool-content';

export const metadata: Metadata = getToolMetadata('PDF to Markdown', 'Convert PDF text into editable Markdown for notes, documentation, and AI workflows.', '/tools/pdf-to-markdown');

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
