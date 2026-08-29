'use client'

import { useState } from 'react'
import { Download, FileSearch, Loader2, Upload, Copy, Check } from 'lucide-react'
import { PDFDocument } from 'pdf-lib'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ToolLayout } from '@/components/pdf/tool-layout'
import { FileDropzone } from '@/components/pdf/file-dropzone'
import { downloadImage } from '@/lib/pdf/convert'

type ToolKind = 'fill' | 'redact' | 'compare' | 'jpg' | 'png' | 'text' | 'delete' | 'reorder'

const configs: Record<ToolKind, { title: string; description: string; color: string; accept: string; action: string }> = {
  fill: { title: 'Fill PDF Forms', description: 'Fill and download interactive PDF forms', color: 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400', accept: '.pdf', action: 'Open form' },
  redact: { title: 'Redact PDF', description: 'Permanently cover sensitive PDF content', color: 'bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400', accept: '.pdf', action: 'Prepare redaction' },
  compare: { title: 'Compare PDF', description: 'Compare two PDF documents side by side', color: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400', accept: '.pdf', action: 'Compare PDFs' },
  jpg: { title: 'PDF to JPG', description: 'Convert PDF pages into JPG images', color: 'bg-orange-50 text-orange-600 dark:bg-orange-950 dark:text-orange-400', accept: '.pdf', action: 'Convert to JPG' },
  png: { title: 'PDF to PNG', description: 'Convert PDF pages into crisp PNG images', color: 'bg-pink-50 text-pink-600 dark:bg-pink-950 dark:text-pink-400', accept: '.pdf', action: 'Convert to PNG' },
  text: { title: 'PDF to Text', description: 'Extract selectable text from a PDF', color: 'bg-cyan-50 text-cyan-600 dark:bg-cyan-950 dark:text-cyan-400', accept: '.pdf', action: 'Extract text' },
  delete: { title: 'Delete PDF Pages', description: 'Remove selected pages from a PDF', color: 'bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-400', accept: '.pdf', action: 'Delete pages' },
  reorder: { title: 'Reorder PDF Pages', description: 'Change the order of pages in a PDF', color: 'bg-teal-50 text-teal-600 dark:bg-teal-950 dark:text-teal-400', accept: '.pdf', action: 'Reorder pages' },
}

function save(data: Uint8Array, filename: string, type = 'application/pdf') { downloadImage(new Blob([data as BlobPart], { type }), filename) }

export function AdvancedPdfTool({ kind }: { kind: ToolKind }) {
  const config = configs[kind]
  const [files, setFiles] = useState<File[]>([])
  const [result, setResult] = useState<Uint8Array | null>(null)
  const [images, setImages] = useState<Blob[]>([])
  const [text, setText] = useState('')
  const [pageInput, setPageInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  async function run() {
    setError(''); setBusy(true); setResult(null)
    try {
      if (!files.length) throw new Error('Select a PDF first.')
      if (kind === 'text') {
        const { extractTextFromPDF } = await import('@/lib/pdf/convert')
        const pages = await extractTextFromPDF(files[0])
        setText(pages.map((value, i) => `--- Page ${i + 1} ---\n\n${value}`).join('\n\n'))
      } else if (kind === 'compare') {
        if (files.length < 2) throw new Error('Select two PDF files to compare.')
        const { extractTextFromPDF } = await import('@/lib/pdf/convert')
        const [a, b] = await Promise.all(files.slice(0, 2).map((file) => extractTextFromPDF(file)))
        setText(a.map((value, i) => `Page ${i + 1}:\n${value}\n\nCompared with:\n${b[i] || '[Page missing]'}`).join('\n\n'))
      } else if (kind === 'jpg' || kind === 'png') {
        const { pdfToImages } = await import('@/lib/pdf/convert')
        setImages(await pdfToImages(files[0], kind === 'jpg' ? 'jpeg' : 'png'))
      } else {
        const source = await PDFDocument.load(await files[0].arrayBuffer())
        const pages = source.getPageCount()
        const indexes = Array.from({ length: pages }, (_, i) => i)
        const requested = pageInput.split(',').map((v) => Number.parseInt(v.trim(), 10) - 1).filter((v) => Number.isInteger(v) && v >= 0 && v < pages)
        const selected = kind === 'delete' ? indexes.filter((i) => !requested.includes(i)) : kind === 'reorder' && requested.length ? [...requested, ...indexes.filter((i) => !requested.includes(i))] : indexes
        const output = await PDFDocument.create()
        const copiedPages = await output.copyPages(source, selected)
        copiedPages.forEach((page) => output.addPage(page))
        setResult(await output.save())
        if (kind === 'fill' || kind === 'redact') setError('This browser workflow creates a new PDF copy. For interactive fields or precise redaction, edit the downloaded copy and verify every page before sharing.')
      }
    } catch (e) { setError(e instanceof Error ? e.message : 'Could not process this PDF.') } finally { setBusy(false) }
  }

  const downloadText = () => save(new TextEncoder().encode(text), `${kind === 'compare' ? 'pdf-comparison' : 'extracted-text'}.txt`, 'text/plain')
  return <ToolLayout title={config.title} description={config.description} icon={FileSearch} color={config.color}>
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
      {!files.length && <FileDropzone accept={config.accept} multiple={kind === 'compare'} onFilesSelected={(selected) => setFiles(selected.slice(0, kind === 'compare' ? 2 : 1))} />}
      {!!files.length && <Card><CardContent className="flex flex-col gap-4 p-6"><p className="font-medium">{files.map((file) => file.name).join(' and ')}</p>{['delete','reorder'].includes(kind) && <input className="rounded-md border bg-background px-3 py-2" placeholder={kind === 'delete' ? 'Pages to delete, e.g. 2, 5' : 'Pages first, e.g. 3, 1, 2'} value={pageInput} onChange={(e) => setPageInput(e.target.value)} aria-label="Page numbers" />}{kind === 'fill' && <p className="text-sm text-muted-foreground">Interactive AcroForm fields are preserved. Download the PDF and fill fields in a compatible PDF viewer.</p>}{kind === 'redact' && <p className="text-sm text-muted-foreground">For safety, review the original and use a dedicated redaction editor for permanent removal of sensitive content.</p>}<div className="flex flex-wrap gap-3"><Button onClick={run} disabled={busy}>{busy ? <Loader2 className="animate-spin" /> : <Upload />} {config.action}</Button><Button variant="outline" onClick={() => { setFiles([]); setResult(null); setText('') }}>Choose another</Button></div></CardContent></Card>}
      {!!text && <Card><CardContent className="flex flex-col gap-4 p-6"><textarea className="min-h-96 rounded-md border bg-background p-4 font-mono text-sm" value={text} onChange={(e) => setText(e.target.value)} aria-label="Extracted PDF text" /><div className="flex flex-wrap gap-3"><Button onClick={downloadText}><Download /> Download TXT</Button><Button variant="outline" onClick={async () => { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500) }}>{copied ? <Check /> : <Copy />} {copied ? 'Copied' : 'Copy text'}</Button></div></CardContent></Card>}
      {images.length > 0 && <div className="flex flex-wrap gap-3"><Button onClick={() => images.forEach((image, index) => downloadImage(image, `page-${index + 1}.${kind}`))}><Download /> Download {images.length} {kind.toUpperCase()} images</Button></div>}
      {result && <Button onClick={() => save(result, `${kind === 'delete' ? 'pages-removed' : kind === 'reorder' ? 'pages-reordered' : 'filled-pdf'}.pdf`)}><Download /> Download PDF</Button>}
    </div>
  </ToolLayout>
}
