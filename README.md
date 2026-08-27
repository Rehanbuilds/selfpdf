# SelfPDF

<p align="center">
  <a href="https://www.selfpdf.xyz">
    <img src="public/selfpdf-logo.png" alt="SelfPDF" width="96" />
  </a>
</p>

<h1 align="center">SelfPDF</h1>

<p align="center">
  A privacy-first, open-source PDF toolkit that runs in your browser.
  Merge, split, compress, convert, edit, sign, secure, and extract content from PDFs without uploading documents to a server.
</p>

<p align="center">
  <a href="https://www.selfpdf.xyz">Live app</a> ·
  <a href="https://www.selfpdf.xyz/tools">PDF tools</a> ·
  <a href="https://www.selfpdf.xyz/docs">Documentation</a> ·
  <a href="https://github.com/Rehanbuilds/selpdf-v2/issues">Report an issue</a>
</p>

<p align="center">
  <a href="https://www.selfpdf.xyz"><img src="https://img.shields.io/badge/Live%20app-selfpdf.xyz-6d4aff?style=flat-square" alt="Live app" /></a>
  <a href="https://github.com/Rehanbuilds/selpdf-v2"><img src="https://img.shields.io/github/stars/Rehanbuilds/selpdf-v2?style=flat-square&label=stars" alt="GitHub stars" /></a>
  <a href="https://github.com/Rehanbuilds/selpdf-v2/issues"><img src="https://img.shields.io/github/issues/Rehanbuilds/selpdf-v2?style=flat-square" alt="GitHub issues" /></a>
  <a href="https://github.com/Rehanbuilds/selpdf-v2"><img src="https://img.shields.io/github/last-commit/Rehanbuilds/selpdf-v2?style=flat-square" alt="Last commit" /></a>
  <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js" alt="Next.js 16" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" /></a>
</p>

## Contents

- [Why SelfPDF](#why-selfpdf)
- [Features](#features)
- [Privacy model](#privacy-model)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Project structure](#project-structure)
- [Configuration](#configuration)
- [Development workflow](#development-workflow)
- [Contributing](#contributing)
- [Security](#security)
- [License](#license)

## Why SelfPDF?

Most online PDF services require you to upload documents before you can work with them. SelfPDF takes a different approach: supported PDF operations happen locally in the browser, so files can be processed without a document upload workflow.

SelfPDF is designed for people who need practical PDF tools while keeping sensitive documents under their control. It is useful for personal documents, business paperwork, study materials, forms, reports, and developer workflows involving PDF content.

## Features

### Organize PDFs

- **Merge PDF** — Combine multiple documents into one PDF.
- **Split PDF** — Extract selected pages or create separate files.
- **Rotate PDF** — Rotate individual pages or an entire document.
- **Crop PDF** — Remove unwanted margins and page areas.
- **Page numbers** — Add page numbers with configurable placement and styling.
- **Repair PDF** — Attempt to recover usable content from damaged PDFs.

### Convert PDFs

- **PDF to Word** — Convert PDF content to editable DOCX files.
- **Word to PDF** — Convert DOCX documents into PDF files.
- **PDF to PowerPoint** — Create presentation-ready PPTX output.
- **PowerPoint to PDF** — Convert presentations into PDF documents.
- **PDF to Excel** — Extract tabular content into XLSX spreadsheets.
- **Excel to PDF** — Export spreadsheet content as PDF.
- **PDF to images** — Render PDF pages as PNG or JPG images.
- **Images to PDF** — Combine images into a single PDF.
- **HTML to PDF** — Turn HTML content into a PDF document.

### PDF Intelligence

- **PDF to Markdown** — Extract text from a PDF and format it as clean, copyable Markdown for notes, documentation, repositories, and LLM workflows.
- **OCR PDF** — Recognize text in scanned or image-based documents.
- **AI summarizer** — Generate concise summaries and key points from supported document content.
- **Translate PDF** — Translate PDF text while preserving the document structure where supported.

### Edit PDFs

- **Watermark PDF** — Add text or image watermarks.
- **Sign PDF** — Add a drawn or typed signature.
- **Scan PDF** — Create PDFs from scanned documents and images.

### PDF security

- **Protect PDF** — Add password protection and encryption.
- **Unlock PDF** — Remove password protection from files you are authorized to access.

Browse the complete collection at [selfpdf.xyz/tools](https://www.selfpdf.xyz/tools).

## Privacy model

SelfPDF is built around local-first document processing:

- **No document upload required** for supported client-side tools.
- **Browser-based processing** keeps eligible files on your device.
- **No filenames or document contents** are used as analytics data.
- **Open source code** makes the implementation inspectable and self-hostable.

Some features depend on browser capabilities and third-party libraries. Always review the behavior of a specific tool before processing highly sensitive information, and do not use SelfPDF to bypass document permissions or access controls.

## Tech stack

- [Next.js 16](https://nextjs.org/) with the App Router
- [React 19](https://react.dev/) and [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) and [shadcn/ui](https://ui.shadcn.com/)
- [pdf-lib](https://pdf-lib.js.org/) for PDF manipulation
- [PDF.js](https://mozilla.github.io/pdf.js/) for PDF parsing and rendering
- [Tesseract.js](https://tesseract.projectnaptha.com/) for browser-based OCR
- [Mammoth](https://github.com/mwilliamson/mammoth.js) and [docx](https://github.com/dolanmiu/docx) for DOCX workflows
- [PptxGenJS](https://gitbrent.com/gitbrent/PptxGenJS) for PowerPoint generation
- [SheetJS](https://sheetjs.com/) for spreadsheet workflows
- [Zustand](https://github.com/pmndrs/zustand) for client state
- [Vercel](https://vercel.com/) for deployment

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 20 or newer
- npm, pnpm, or Yarn
- A modern browser with JavaScript enabled

### Installation

```bash
git clone https://github.com/Rehanbuilds/selpdf-v2.git
cd selpdf-v2
npm install
```

If you use another package manager:

```bash
pnpm install
# or
yarn install
```

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production build

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

## Project structure

```text
selpdf-v2/
├── app/
│   ├── about/                 # About page
│   ├── blogs/                 # SEO-friendly PDF guides
│   ├── docs/                  # Product and developer documentation
│   ├── tools/                 # Individual PDF tools
│   │   └── pdf-to-markdown/   # PDF Intelligence Markdown converter
│   ├── privacy/               # Privacy policy
│   ├── terms/                 # Terms of service
│   └── page.tsx               # Landing page
├── components/
│   ├── pdf/                   # Upload, processing, and PDF UI components
│   ├── ui/                    # Shared UI primitives
│   ├── header.tsx             # Site header
│   └── footer.tsx             # Site footer
├── lib/
│   ├── config/                # Tool registry and application configuration
│   ├── pdf/                   # PDF parsing and conversion utilities
│   ├── seo/                   # Tool SEO profiles and structured content
│   └── store/                  # Client-side application state
├── public/                    # Static assets
├── instrumentation-client.ts  # Client analytics initialization
├── next.config.mjs            # Next.js configuration
└── package.json                # Scripts and dependencies
```

## Configuration

The core local PDF tools do not require an API key or database. Optional deployment settings are managed through your hosting provider's environment-variable configuration.

For local development, place non-secret development variables in `.env.local` when a feature requires them. Never commit secrets, private tokens, or production credentials to the repository.

## Development workflow

1. Create a focused branch from the current default branch.
2. Install dependencies with the package manager used by the project.
3. Run `npm run dev` while developing.
4. Run `npm run lint` and `npm run build` before opening a pull request.
5. Test the affected tool with representative PDFs, including an error case where appropriate.
6. Explain user-visible changes and privacy implications in the pull request description.

## Contributing

Contributions are welcome. You can help by fixing bugs, improving accessibility, adding tests, improving documentation, or proposing new privacy-preserving PDF workflows.

### Report a bug

Before opening an issue, search [existing issues](https://github.com/Rehanbuilds/selpdf-v2/issues). Include:

- The tool and route where the issue occurs
- Browser and operating system
- Steps to reproduce
- Expected and actual behavior
- A minimal sample file or reproducible example, if safe to share
- Console or build errors with sensitive information removed

### Suggest a feature

Describe the user problem, the proposed workflow, privacy considerations, and whether the feature can run entirely in the browser.

### Open a pull request

```bash
git checkout -b feat/your-change
# Make and test your changes
git add .
git commit -m "feat: describe your change"
git push origin feat/your-change
```

Then open a pull request on GitHub. Keep pull requests focused, document behavior changes, and avoid including generated files or sensitive documents.

## Security

Please do not disclose security vulnerabilities in a public issue. Until a dedicated security contact is published, use GitHub's private vulnerability reporting when available or contact the repository maintainers through the repository's private channels.

Never include real personal documents, credentials, access tokens, or private data in issues, pull requests, screenshots, or test fixtures.

## License

The repository's license should be documented in a `LICENSE` file before distributing or embedding SelfPDF. If you add or confirm a license, update this section and the license badge accordingly.

## Links

- [SelfPDF web app](https://www.selfpdf.xyz)
- [PDF tools](https://www.selfpdf.xyz/tools)
- [Documentation](https://www.selfpdf.xyz/docs)
- [Blog](https://www.selfpdf.xyz/blogs)
- [Privacy policy](https://www.selfpdf.xyz/privacy)
- [GitHub repository](https://github.com/Rehanbuilds/selpdf-v2)

<p align="center">
  <strong>Build privately. Work faster. Keep control of your PDFs.</strong>
</p>

<p align="center">
  Made for the open-source community by <a href="https://github.com/Rehanbuilds">Rehan Builds</a>.
</p>
