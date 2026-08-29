import { ToolLayout } from '@/components/pdf/tool-layout'
import { AdvancedTool } from '@/components/pdf/advanced-tool'
import { pdfTools } from '@/lib/config/tools'
export default function Page(){const t=pdfTools.find(x=>x.id==='pdf-to-markdown')!;return <ToolLayout title="Redact PDF" description="Prepare a PDF for redaction review." icon={t.icon} color={t.color}><AdvancedTool operation="redact" title="Redact PDF" description="Upload a PDF and download a preserved working copy. For secure redaction, use a dedicated visual redaction editor and verify the output." outputName="redaction-copy.pdf"/></ToolLayout>}
