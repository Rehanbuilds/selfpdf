import type { Metadata } from 'next';
import { getToolMetadata } from '@/lib/seo/tool-content';
export const metadata: Metadata = getToolMetadata('Crop PDF', 'Crop PDF pages by adjusting their margins', '/tools/crop');
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
