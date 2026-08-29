import { ToolLayout } from '@/components/pdf/tool-layout'
import { AdvancedTool } from '@/components/pdf/advanced-tool'
import { pdfTools } from '@/lib/config/tools'
export default function Page(){const t=pdfTools.find(x=>x.id==='pdf-to-markdown')!;return <ToolLayout title="Bates Numbering" description="Add sequential Bates identifiers to PDF pages." icon={t.icon} color={t.color}><AdvancedTool operation="bates" title="Bates Numbering" description="Add a prefix and starting number to each page." outputName="bates-numbered.pdf" fields={[{key:'prefix',label:'Prefix',placeholder:'DOC'},{key:'start',label:'Starting number',placeholder:'1'}]}/></ToolLayout>}
