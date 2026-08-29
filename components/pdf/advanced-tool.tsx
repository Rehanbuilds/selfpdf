'use client'

import { useState } from 'react'
import { Download, FileUp, Copy, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { processAdvancedPdf, downloadBlob, AdvancedOperation } from '@/lib/pdf/advanced'
import { extractTextFromPDF } from '@/lib/pdf/convert'

type Props = { operation: AdvancedOperation; title: string; description: string; outputName: string; fields?: { key: string; label: string; placeholder?: string }[] }

export function AdvancedTool({ operation, title, description, outputName, fields = [] }: Props) {
  const [file, setFile] = useState<File | null>(null)
  const [options, setOptions] = useState<Record<string, string>>({})
  const [result, setResult] = useState<{ type: string; text?: string; bytes?: Uint8Array } | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  async function run() {
    if (!file) return setError('Select a PDF file first.')
    setBusy(true); setError(''); setResult(null)
    try {
      if (operation === 'extract') setResult({ type: 'text', text: (await extractTextFromPDF(file)).join('\n\n') })
      else setResult(await processAdvancedPdf(file, operation, options))
    } catch (e) { setError(e instanceof Error ? e.message : 'We could not process this PDF.') } finally { setBusy(false) }
  }
  function update(key: string, value: string) { setOptions((current) => ({ ...current, [key]: value })) }
  return <div className="mx-auto flex max-w-3xl flex-col gap-6">
    <Card><CardContent className="flex flex-col gap-6 p-6 sm:p-8">
      <div className="flex flex-col gap-2"><h2 className="text-xl font-semibold">{title}</h2><p className="text-sm text-muted-foreground">{description}</p></div>
      <label className="flex min-h-36 cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-muted-foreground/25 bg-muted/20 p-6 text-center hover:border-primary/50"><FileUp className="size-8 text-primary" /><span className="font-medium">{file ? file.name : 'Choose a PDF file'}</span><span className="text-sm text-muted-foreground">PDF files only, processed in your browser</span><input type="file" accept="application/pdf" className="sr-only" onChange={(e) => setFile(e.target.files?.[0] ?? null)} /></label>
      {fields.length > 0 && <div className="grid gap-4 sm:grid-cols-2">{fields.map((field) => <div key={field.key} className="flex flex-col gap-2"><Label htmlFor={field.key}>{field.label}</Label>{field.key === 'footer' ? <textarea id={field.key} className="min-h-24 rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder={field.placeholder} value={options[field.key] ?? ''} onChange={(e) => update(field.key, e.target.value)} /> : <Input id={field.key} placeholder={field.placeholder} value={options[field.key] ?? ''} onChange={(e) => update(field.key, e.target.value)} />}</div>)}</div>}
      {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
      <Button onClick={run} disabled={busy || !file}>{busy ? 'Processing…' : 'Process PDF'}</Button>
    </CardContent></Card>
    {result?.type === 'text' && <Card><CardContent className="flex flex-col gap-4 p-6"><textarea className="min-h-80 w-full rounded-md border border-input bg-background px-3 py-2 font-mono text-sm" value={result.text ?? ''} onChange={(e) => setResult({ type: 'text', text: e.target.value })} /><div className="flex flex-wrap gap-2"><Button variant="outline" onClick={() => navigator.clipboard.writeText(result.text ?? '')}><Copy data-icon="inline-start" />Copy text</Button><Button onClick={() => { const blob = new Blob([result.text ?? ''], { type: 'text/plain' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = outputName; a.click() }}><Download data-icon="inline-start" />Download</Button></div></CardContent></Card>}
    {result?.type === 'pdf' && result.bytes && <Card><CardContent className="flex items-center justify-between gap-4 p-6"><p className="text-sm text-muted-foreground">Your processed PDF is ready to download.</p><div className="flex gap-2"><Button onClick={() => downloadBlob(result.bytes!, outputName)}><Download data-icon="inline-start" />Download PDF</Button><Button variant="outline" onClick={() => { setFile(null); setResult(null) }}><RotateCcw data-icon="inline-start" />Start over</Button></div></CardContent></Card>}
  </div>
}
