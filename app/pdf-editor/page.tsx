import type { Metadata } from 'next'
import { PdfEditorWorkspace } from '@/components/pdf-editor/pdf-editor-workspace'

export const metadata: Metadata = {
  title: 'Free Online PDF Editor | SelfPDF',
  description: 'Edit PDF online without signup. Create PDFs, add text, images, shapes, tables, drawings, and signatures directly in your browser with SelfPDF.',
  alternates: { canonical: 'https://www.selfpdf.xyz/pdf-editor' },
  openGraph: { title: 'Free Online PDF Editor | SelfPDF', description: 'Create and edit PDFs privately in your browser. No signup required.', url: 'https://www.selfpdf.xyz/pdf-editor', type: 'website', images: ['/selfpdf-social-preview.png'] },
  twitter: { card: 'summary_large_image', title: 'Free Online PDF Editor | SelfPDF', description: 'Create and edit PDFs privately in your browser.', images: ['/selfpdf-social-preview.png'] },
}

export default function PdfEditorPage() {
  return <main className="min-h-screen"><PdfEditorWorkspace /><section className="mx-auto max-w-5xl px-6 py-16"><h1 className="text-balance text-3xl font-bold">Free PDF editor without signup</h1><p className="mt-4 max-w-3xl text-pretty leading-7 text-muted-foreground">SelfPDF lets you edit PDF online and create PDF documents directly in your browser. Add text, images, shapes, tables, drawings, and signature placements, then export the finished document. Files are processed locally wherever the browser architecture allows, so your documents stay private and there is no account requirement.</p><div className="mt-8 grid gap-6 md:grid-cols-3"><div><h2 className="font-semibold">Create PDF online</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Start with a blank A4 or Letter page and build a document from scratch.</p></div><div><h2 className="font-semibold">Edit PDF online</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Open an existing PDF and add editable overlays without pretending to change its original embedded text.</p></div><div><h2 className="font-semibold">Private by design</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">No signup, no unnecessary storage, and no document contents sent to analytics.</p></div></div><div className="mt-12"><h2 className="text-2xl font-bold">PDF Editor FAQs</h2><div className="mt-5 grid gap-5 md:grid-cols-2"><div><h3 className="font-semibold">Can I add text to a PDF?</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Yes. Add text boxes, edit their content, and export them into the PDF.</p></div><div><h3 className="font-semibold">Can I sign a PDF?</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">You can place a typed or drawn signature image. This is not a legally binding digital-signature service.</p></div></div></div></section></main>
}
