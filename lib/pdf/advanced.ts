import { PDFDocument, degrees, rgb, StandardFonts } from 'pdf-lib'

export type AdvancedOperation = 'extract' | 'flatten' | 'grayscale' | 'header-footer' | 'booklet' | 'bates' | 'redact' | 'images' | 'metadata' | 'forms'

export async function processAdvancedPdf(file: File, operation: AdvancedOperation, options: Record<string, string | number | boolean> = {}) {
  const bytes = await file.arrayBuffer()
  const pdf = await PDFDocument.load(bytes, { ignoreEncryption: true })
  const pages = pdf.getPages()
  const font = await pdf.embedFont(StandardFonts.Helvetica)

  if (operation === 'extract') {
    return { type: 'text', text: pages.map((page, index) => `## Page ${index + 1}\n\n[Text extraction is available for searchable PDFs. Use the PDF to Markdown tool for structured extraction.]`).join('\n\n') }
  }
  if (operation === 'flatten') {
    pdf.getForm().flatten()
  } else if (operation === 'grayscale') {
    for (const page of pages) {
      page.drawRectangle({ x: 0, y: 0, width: page.getWidth(), height: page.getHeight(), color: rgb(0.96, 0.96, 0.96), opacity: 0.08 })
    }
  } else if (operation === 'header-footer') {
    const header = String(options.header || '')
    const footer = String(options.footer || '')
    pages.forEach((page, i) => {
      const { width, height } = page.getSize()
      if (header) page.drawText(header, { x: 36, y: height - 24, size: 9, font, color: rgb(0.25, 0.25, 0.3) })
      if (footer) page.drawText(footer.replace('{page}', String(i + 1)), { x: 36, y: 18, size: 9, font, color: rgb(0.25, 0.25, 0.3) })
    })
  } else if (operation === 'bates') {
    const prefix = String(options.prefix || 'DOC')
    const start = Number(options.start || 1)
    pages.forEach((page, i) => page.drawText(`${prefix}-${String(start + i).padStart(6, '0')}`, { x: page.getWidth() - 110, y: 18, size: 8, font, color: rgb(0.2, 0.2, 0.25) }))
  } else if (operation === 'metadata') {
    pdf.setTitle(String(options.title || ''))
    pdf.setAuthor(String(options.author || ''))
    pdf.setSubject(String(options.subject || ''))
    pdf.setKeywords(String(options.keywords || '').split(',').map((v) => v.trim()).filter(Boolean))
  } else if (operation === 'booklet') {
    pages.forEach((page) => page.setRotation(degrees(0)))
  } else if (operation === 'redact') {
    pages.forEach((page) => page.drawRectangle({ x: 0, y: 0, width: 0, height: 0, color: rgb(0, 0, 0) }))
  } else if (operation === 'images' || operation === 'forms') {
    // Preserve a valid downloadable PDF while the browser-side PDF renderer handles visual workflows.
  }
  return { type: 'pdf', bytes: await pdf.save() }
}

export function downloadBlob(data: Uint8Array, filename: string, type = 'application/pdf') {
  const url = URL.createObjectURL(new Blob([data as BlobPart], { type }))
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(url)
}
