import { ToolLayout } from '@/components/pdf/tool-layout'
import { AdvancedTool } from '@/components/pdf/advanced-tool'
import { pdfTools } from '@/lib/config/tools'
export default function Page(){const t=pdfTools.find(x=>x.id==='pdf-to-markdown')!;return <ToolLayout title="Edit PDF Metadata" description="Update title, author, subject, and keywords in a PDF." icon={t.icon} color={t.color}><AdvancedTool operation="metadata" title="Edit PDF Metadata" description="Set document properties without changing visible pages." outputName="metadata-updated.pdf" fields={[{key:'title',label:'Title'},{key:'author',label:'Author'},{key:'subject',label:'Subject'},{key:'keywords',label:'Keywords',placeholder:'comma, separated, keywords'}]}/></ToolLayout>}
