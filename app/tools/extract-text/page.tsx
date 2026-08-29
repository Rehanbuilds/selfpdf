import { ToolLayout } from '@/components/pdf/tool-layout'
import { AdvancedTool } from '@/components/pdf/advanced-tool'
import { pdfTools } from '@/lib/config/tools'
export default function Page(){const t=pdfTools.find(x=>x.id==='pdf-to-markdown')!;return <ToolLayout title="Extract Text from PDF" description="Extract searchable text from every PDF page." icon={t.icon} color={t.color}><AdvancedTool operation="extract" title="Extract Text from PDF" description="Copy or download extracted PDF text." outputName="extracted-text.txt"/></ToolLayout>}
