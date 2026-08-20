export type BlogSection = {
  heading: string
  paragraphs?: string[]
  bullets?: string[]
}

export type BlogArticle = {
  slug: string
  title: string
  description: string
  category: string
  readTime: string
  publishedAt: string
  updatedAt: string
  keywords: string[]
  intro: string
  sections: BlogSection[]
  faqs: { question: string; answer: string }[]
  prompt: string
  cta: { label: string; href: string }
}

export const blogs: BlogArticle[] = [
  {
    slug: 'how-to-merge-pdfs',
    title: 'How to Merge PDF Files Into One Document',
    description: 'Learn how to combine multiple PDF files into one organized document with a simple, private browser workflow.',
    category: 'PDF workflows',
    readTime: '6 min read',
    publishedAt: '2026-08-20',
    updatedAt: '2026-08-20',
    keywords: ['how to merge PDF files', 'combine PDFs', 'merge PDF online', 'free PDF merger'],
    intro: 'Merging PDFs is useful whenever a project is scattered across invoices, scans, forms, receipts, or supporting documents. A clean merge turns those separate files into one document that is easier to share, archive, print, and review.',
    sections: [
      { heading: 'Why merge PDF files?', paragraphs: ['A single PDF is easier to send than a folder of attachments. Combining related pages also keeps the reading order clear and reduces the chance that an important document is missed.', 'Common examples include combining a cover letter and resume, assembling a proposal, grouping monthly receipts, or creating a complete application packet.'] },
      { heading: 'How to merge PDFs step by step', bullets: ['Collect the PDFs you want to combine and rename them in the order you want them to appear.', 'Open the SelfPDF Merge PDF tool and select or drop in your files.', 'Review the file order and move documents into the correct sequence.', 'Merge the files and download the finished PDF for sharing or storage.'] },
      { heading: 'Tips for a clean merged document', bullets: ['Use descriptive filenames before uploading so the order is easy to verify.', 'Keep related files together and remove duplicate pages first.', 'Open the final PDF after merging to confirm page order, orientation, and readability.', 'Compress the finished file if it is too large to email or upload.'] },
      { heading: 'Is online PDF merging private?', paragraphs: ['SelfPDF is designed for browser-based PDF workflows. When a tool supports local processing, files are handled on your device instead of being sent to a remote processing queue. Always review the tool experience before working with sensitive documents.'] },
    ],
    faqs: [
      { question: 'Can I merge PDFs for free?', answer: 'Yes. SelfPDF provides a free Merge PDF workflow without requiring an account or subscription.' },
      { question: 'How many PDFs can I combine?', answer: 'The practical limit depends on your browser and device memory. For very large projects, merge smaller groups and combine the results.' },
      { question: 'Will merging PDFs reduce quality?', answer: 'Merging normally preserves the source pages. If the result is large, use a separate compression step after checking the final document.' },
    ],
    prompt: 'Merge PDF files into one organized document with SelfPDF.',
    cta: { label: 'Merge PDF files', href: '/tools/merge' },
  },
  {
    slug: 'how-to-compress-pdf',
    title: 'How to Compress a PDF Without Losing Quality',
    description: 'Understand PDF compression, choose the right workflow, and reduce file size for email, uploads, and storage.',
    category: 'PDF optimization',
    readTime: '7 min read',
    publishedAt: '2026-08-20',
    updatedAt: '2026-08-20',
    keywords: ['how to compress PDF', 'reduce PDF file size', 'compress PDF online', 'PDF compression without quality loss'],
    intro: 'Large PDFs are frustrating when an email rejects an attachment or a web form limits upload size. Compressing a PDF can make it easier to share while keeping the pages readable and professional.',
    sections: [
      { heading: 'What makes a PDF file large?', paragraphs: ['Scanned pages, high-resolution photographs, embedded fonts, and repeated image assets are common reasons for a large PDF. A document with mostly text is usually much smaller than a scan-heavy file.', 'Knowing what is inside the PDF helps you choose a compression level. A presentation with detailed visuals may need more quality than a receipt archive.'] },
      { heading: 'How to compress a PDF', bullets: ['Open the SelfPDF Compress PDF tool.', 'Select the PDF from your device and wait for the browser workflow to prepare it.', 'Choose a balanced compression setting when readability matters.', 'Download the compressed PDF and check a few pages before sharing it.'] },
      { heading: 'How to keep quality high', bullets: ['Keep the original file as a backup before compression.', 'Use balanced compression for contracts, applications, and documents with small print.', 'Inspect charts, signatures, photos, and scanned text after downloading.', 'Compress only as much as needed for the destination upload or email limit.'] },
      { heading: 'When should you compress a PDF?', paragraphs: ['Compress a PDF before attaching it to email, uploading it to a portal, adding it to cloud storage, or publishing it for download. If you are preparing a print-ready file, keep the original high-resolution version and create a separate web-friendly copy.'] },
    ],
    faqs: [
      { question: 'Does PDF compression make text blurry?', answer: 'Balanced compression is designed to reduce file size while keeping text readable. Always review the result when the PDF contains small print or detailed images.' },
      { question: 'Can I compress a PDF on my phone?', answer: 'Yes. SelfPDF works in modern mobile browsers, so you can optimize a PDF without installing desktop software.' },
      { question: 'Should I merge or compress first?', answer: 'Merge related files first, then compress the final document so the size is optimized as one complete PDF.' },
    ],
    prompt: 'Compress a PDF for faster sharing and easier uploads with SelfPDF.',
    cta: { label: 'Compress a PDF', href: '/tools/compress' },
  },
]

export function getBlog(slug: string) {
  return blogs.find((blog) => blog.slug === slug)
}
