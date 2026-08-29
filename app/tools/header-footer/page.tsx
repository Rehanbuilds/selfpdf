import { ToolLayout } from '@/components/pdf/tool-layout'
import { AdvancedTool } from '@/components/pdf/advanced-tool'
import { pdfTools } from '@/lib/config/tools'
export default function Page(){const t=pdfTools.find(x=>x.id==='pdf-to-markdown')!;return <ToolLayout title="Add Header & Footer" description="Add consistent headers and page footers to PDF pages." icon={t.icon} color={t.color}><AdvancedTool operation="header-footer" title="Add Header & Footer" description="Use {page} in the footer for the current page number." outputName="header-footer.pdf" fields={[{key:'header',label:'Header text'},{key:'footer',label:'Footer text',placeholder:'Page {page}'}]}/></ToolLayout>}
