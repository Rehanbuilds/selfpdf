'use client';

import { useState } from 'react';
import { Copy, Download, FileText, RotateCcw } from 'lucide-react';
import { FileDropzone } from '@/components/pdf/file-dropzone';
import { ToolLayout } from '@/components/pdf/tool-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { extractTextFromPDF } from '@/lib/pdf/convert';
import { pdfTools } from '@/lib/config/tools';

function toMarkdown(pages: string[]) {
  return pages.map((page, index) => {
    const lines = page.split(/\n+/).map((line) => line.trim()).filter(Boolean);
    const formatted = lines.map((line) => {
      if (/^(abstract|introduction|conclusion|references|summary|appendix)$/i.test(line)) return `## ${line}`;
      if (/^\d+(\.\d+)*\s+\S/.test(line) && line.length < 120) return `### ${line}`;
      return line;
    }).join('\n\n');
    return `## Page ${index + 1}\n\n${formatted}`;
  }).join('\n\n---\n\n');
}

export default function PdfToMarkdownPage() {
  const [markdown, setMarkdown] = useState('');
  const [fileName, setFileName] = useState('document');
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');

  async function handleFiles(files: File[]) {
    const file = files[0];
    if (!file) return;
    setFileName(file.name.replace(/\.pdf$/i, '') || 'document');
    setMarkdown('');
    setStatus('Reading PDF text…');
    setProgress(15);
    try {
      const pages = await extractTextFromPDF(file, (value) => setProgress(15 + Math.round(value * 75)));
      setMarkdown(toMarkdown(pages));
      setProgress(100);
      setStatus(`Converted ${pages.length} page${pages.length === 1 ? '' : 's'} to Markdown`);
    } catch {
      setProgress(0);
      setStatus('This PDF could not be read. Try a text-based PDF or use OCR for scanned pages.');
    }
  }

  function download() {
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a'); link.href = url; link.download = `${fileName}.md`; link.click();
    URL.revokeObjectURL(url);
  }

  const tool = pdfTools.find((item) => item.id === 'pdf-to-markdown')!;
  return <ToolLayout title={tool.name} description={tool.description} icon={tool.icon} color={tool.color}>
    <div className="flex flex-col gap-8">
      {!markdown && <FileDropzone onFilesSelected={handleFiles} multiple={false} />}
      {status && <p role="status" className="text-center text-sm text-muted-foreground">{status}</p>}
      {progress > 0 && progress < 100 && <Progress value={progress} aria-label="Conversion progress" />}
      {markdown && <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-4"><CardTitle className="flex items-center gap-2"><FileText className="size-5 text-primary" /> Markdown preview</CardTitle><span className="text-sm text-muted-foreground">Editable output</span></CardHeader>
        <CardContent className="flex flex-col gap-4">
          <textarea value={markdown} onChange={(event) => setMarkdown(event.target.value)} aria-label="Markdown output" className="min-h-[420px] w-full rounded-lg border bg-background p-4 font-mono text-sm leading-6 outline-none focus:ring-2 focus:ring-primary" />
          <div className="flex flex-wrap gap-3"><Button onClick={() => navigator.clipboard.writeText(markdown)}><Copy data-icon="inline-start" />Copy Markdown</Button><Button variant="outline" onClick={download}><Download data-icon="inline-start" />Download .md</Button><Button variant="ghost" onClick={() => { setMarkdown(''); setProgress(0); setStatus(''); }}><RotateCcw data-icon="inline-start" />Convert another</Button></div>
        </CardContent>
      </Card>}
    </div>
  </ToolLayout>;
}

export const dynamic = 'force-dynamic';
