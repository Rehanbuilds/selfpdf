import { ToolLayout } from '@/components/pdf/tool-layout'
import { AdvancedTool } from '@/components/pdf/advanced-tool'
import { pdfTools } from '@/lib/config/tools'
export default function Page(){const t=pdfTools.find(x=>x.id==='pdf-to-markdown')!;return <ToolLayout title="Extract Form Fields" description="Prepare interactive PDF forms for field inspection." icon={t.icon} color={t.color}><AdvancedTool operation="forms" title="Extract Form Fields" description="Download a preserved PDF for form-field workflows." outputName="form-fields.pdf"/></ToolLayout>}
