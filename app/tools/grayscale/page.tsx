import { ToolLayout } from '@/components/pdf/tool-layout'
import { AdvancedTool } from '@/components/pdf/advanced-tool'
import { pdfTools } from '@/lib/config/tools'
export default function Page(){const t=pdfTools.find(x=>x.id==='pdf-to-markdown')!;return <ToolLayout title="Grayscale PDF" description="Prepare PDF pages with a grayscale treatment." icon={t.icon} color={t.color}><AdvancedTool operation="grayscale" title="Grayscale PDF" description="Create a downloadable grayscale-ready PDF." outputName="grayscale.pdf"/></ToolLayout>}
