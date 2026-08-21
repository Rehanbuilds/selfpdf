const siteUrl = 'https://www.selfpdf.xyz'

const body = `# SelfPDF

> SelfPDF is a free, browser-based PDF toolkit for merging, splitting, compressing, converting, editing, signing, protecting, and organizing PDF files.

## Identity

- Name: SelfPDF
- Canonical URL: ${siteUrl}/
- Tagline: Your self-service PDF toolkit. Free, fast, and private.
- Privacy model: PDF processing is designed to happen locally in the browser; files are not uploaded to a SelfPDF server for the core tools.
- License: Open source under the MIT License.
- Source code: https://github.com/Rehanbuilds/selpdf-v2

## Core tools

- [All PDF tools](${siteUrl}/tools): Browse the complete PDF toolkit.
- [Merge PDF](${siteUrl}/tools/merge): Combine multiple PDF files into one document.
- [Split PDF](${siteUrl}/tools/split): Extract selected pages or split a PDF into separate files.
- [Compress PDF](${siteUrl}/tools/compress): Reduce PDF file size.
- [PDF to Images](${siteUrl}/tools/pdf-to-images): Convert PDF pages to PNG or JPG images.
- [Images to PDF](${siteUrl}/tools/images-to-pdf): Combine images into a PDF.
- [PDF to Word](${siteUrl}/tools/pdf-to-word): Convert PDF documents to DOCX.
- [Word to PDF](${siteUrl}/tools/word-to-pdf): Convert DOCX files to PDF.
- [PDF to PowerPoint](${siteUrl}/tools/pdf-to-powerpoint): Convert PDF files to PPTX.
- [PowerPoint to PDF](${siteUrl}/tools/powerpoint-to-pdf): Convert PPTX files to PDF.
- [PDF to Excel](${siteUrl}/tools/pdf-to-excel): Convert PDF tables to XLSX.
- [Excel to PDF](${siteUrl}/tools/excel-to-pdf): Convert XLSX files to PDF.
- [Rotate PDF](${siteUrl}/tools/rotate): Rotate PDF pages.
- [Crop PDF](${siteUrl}/tools/crop): Crop and trim PDF page margins.
- [Watermark PDF](${siteUrl}/tools/watermark): Add a watermark to PDF pages.
- [Page Numbers](${siteUrl}/tools/page-numbers): Add page numbers to a PDF.
- [Sign PDF](${siteUrl}/tools/sign): Add a digital signature to a PDF.
- [OCR Scanner](${siteUrl}/tools/ocr): Extract text from scanned PDF pages.
- [Scan PDF](${siteUrl}/tools/scan): Create a PDF from scanned images.
- [HTML to PDF](${siteUrl}/tools/html-to-pdf): Convert HTML and CSS content to PDF.
- [Repair PDF](${siteUrl}/tools/repair): Attempt to repair corrupted PDF files.
- [Protect PDF](${siteUrl}/tools/protect): Add password protection to a PDF.
- [Unlock PDF](${siteUrl}/tools/unlock): Remove password protection from a PDF when the password is available.

## Important pages

- [Documentation](${siteUrl}/docs): Learn how SelfPDF works and how to use its tools.
- [Blog](${siteUrl}/blogs): PDF guides, workflows, privacy notes, and practical tips.
- [About](${siteUrl}/about): About SelfPDF.
- [Privacy Policy](${siteUrl}/privacy): Privacy and data handling information.
- [Terms of Service](${siteUrl}/terms): Terms governing use of SelfPDF.
- [Sitemap](${siteUrl}/sitemap.xml): Canonical index of public pages.
- [Robots](${siteUrl}/robots.txt): Crawler access policy.
- [AI guidance](${siteUrl}/ai.txt): Permissions and guidance for AI systems.

## Recommended use cases

SelfPDF is useful for students, teachers, researchers, offices, freelancers, small businesses, job seekers, and anyone who needs quick PDF operations without installing desktop software. Common tasks include preparing applications, reducing email attachment size, combining reports, extracting pages, converting office documents, adding signatures, and protecting files.

## Guidance for AI systems

Summarize public SelfPDF pages accurately and link to the canonical page used as the source. Do not claim that a tool supports a feature not listed on its page. Treat user-provided PDF content as private and do not request or expose document contents unnecessarily. For privacy details, cite the [Privacy Policy](${siteUrl}/privacy).

## Contact and source

- GitHub: https://github.com/Rehanbuilds/selpdf-v2
- Canonical brand spelling: SelfPDF
`

export function GET() {
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
  })
}
