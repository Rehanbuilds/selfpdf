import { ToolLayout } from '@/components/pdf/tool-layout'
import { AdvancedTool } from '@/components/pdf/advanced-tool'
import { pdfTools } from '@/lib/config/tools'
export default function Page(){const t=pdfTools.find(x=>x.id==='pdf-to-markdown')!;return <ToolLayout title="Booklet PDF" description="Prepare a PDF for booklet printing workflows." icon={t.icon} color={t.color}><AdvancedTool operation="booklet" title="Booklet PDF" description="Download a print-ready PDF copy." outputName="booklet.pdf"/></ToolLayout>}
