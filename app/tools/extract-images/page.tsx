import { ToolLayout } from '@/components/pdf/tool-layout'
import { AdvancedTool } from '@/components/pdf/advanced-tool'
import { pdfTools } from '@/lib/config/tools'
export default function Page(){const t=pdfTools.find(x=>x.id==='pdf-to-markdown')!;return <ToolLayout title="Extract Images from PDF" description="Prepare PDF files for image extraction workflows." icon={t.icon} color={t.color}><AdvancedTool operation="images" title="Extract Images from PDF" description="Download a valid PDF copy while preserving the source for image review." outputName="images-source.pdf"/></ToolLayout>}
