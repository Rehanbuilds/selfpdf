import { ToolLayout } from '@/components/pdf/tool-layout'
import { AdvancedTool } from '@/components/pdf/advanced-tool'
import { pdfTools } from '@/lib/config/tools'
export default function Page(){const t=pdfTools.find(x=>x.id==='pdf-to-markdown')!;return <ToolLayout title="Flatten PDF" description="Flatten interactive form fields into a regular PDF." icon={t.icon} color={t.color}><AdvancedTool operation="flatten" title="Flatten PDF" description="Make form content non-editable while preserving your PDF." outputName="flattened.pdf"/></ToolLayout>}
