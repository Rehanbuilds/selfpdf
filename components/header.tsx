'use client';

import Link from 'next/link';
import { ChevronDown, Github } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { pdfTools, type PDFTool } from '@/lib/config/tools';

const categoryLabels: Record<PDFTool['category'], string> = {
  organize: 'Organize PDF',
  convert: 'Convert PDF',
  edit: 'Edit PDF',
  security: 'PDF Security',
  intelligence: 'PDF Intelligence',
};

const categoryOrder: PDFTool['category'][] = ['organize', 'convert', 'edit', 'security', 'intelligence'];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <header className="sticky top-2 z-50 w-full px-4 sm:px-6 lg:px-8">
      <div ref={menuRef} className="relative mx-auto max-w-5xl rounded-2xl border bg-background/80 shadow-lg backdrop-blur-xl">
        <div className="flex h-14 items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex shrink-0 items-center gap-2" onClick={() => setIsOpen(false)}>
            <Image src="/images/chatgpt-image-jan-17-2026-09-26-55-pm-removebg-preview.png" alt="SelfPDF Logo" width={36} height={36} className="size-9" />
            <span className="text-xl font-bold">SelfPDF</span>
          </Link>

          <nav className="hidden items-center gap-5 md:flex">
            <button type="button" aria-expanded={isOpen} aria-controls="pdf-tools-menu" onClick={() => setIsOpen((open) => !open)} onMouseEnter={() => setIsOpen(true)} className="group flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary">
              All PDF Tools
              <ChevronDown className={`size-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">About</Link>
            <Link href="/privacy" className="text-sm font-medium transition-colors hover:text-primary">Privacy</Link>
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-lg" asChild>
              <a href="https://github.com/Rehanbuilds/selpdf-v2" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github className="size-5" /></a>
            </Button>
            <Button asChild className="hidden md:inline-flex"><Link href="/tools">Start Using Tools</Link></Button>
          </div>
        </div>

        <div id="pdf-tools-menu" role="region" aria-label="All PDF tools" onMouseLeave={() => setIsOpen(false)} className={`absolute left-0 right-0 top-[calc(100%+0.75rem)] origin-top rounded-2xl border bg-background p-5 shadow-2xl transition-all duration-300 sm:p-7 ${isOpen ? 'pointer-events-auto translate-y-0 scale-100 opacity-100' : 'pointer-events-none -translate-y-2 scale-[0.98] opacity-0'}`}>
          <div className="grid gap-x-6 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
            {categoryOrder.map((category) => {
              const tools = pdfTools.filter((tool) => tool.category === category);
              return <section key={category} className="min-w-0"><h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">{categoryLabels[category]}</h2><div className="flex flex-col gap-1">{tools.map((tool) => { const Icon = tool.icon; return <Link key={tool.id} href={tool.href} onClick={() => setIsOpen(false)} className="group flex items-center gap-3 rounded-lg px-2 py-2 text-sm transition-colors hover:bg-muted hover:text-primary"><span className={`flex size-7 shrink-0 items-center justify-center rounded-md ${tool.color}`}><Icon className="size-4" /></span><span className="truncate font-medium">{tool.name}</span>{tool.isNew && <span className="ml-auto text-[10px] font-bold uppercase text-primary">New</span>}</Link>; })}</div></section>;
            })}
          </div>
          <div className="mt-6 flex items-center justify-between border-t pt-5"><p className="text-sm text-muted-foreground">Free, private PDF tools that run in your browser.</p><Link href="/tools" onClick={() => setIsOpen(false)} className="text-sm font-semibold text-primary hover:underline">Browse all tools →</Link></div>
        </div>
      </div>
    </header>
  );
}
