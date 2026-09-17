import type { Metadata } from 'next';
import { ShieldCheck, Sparkles, Zap } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ChatWithPdf } from '@/components/chat-with-pdf';

export const metadata: Metadata = {
  title: 'Chat with PDF Online Free',
  description: 'Ask questions about a PDF and get grounded answers with SelfPDF Chat with PDF. Free, private, and no signup required.',
  keywords: ['chat with PDF', 'ask PDF questions', 'AI PDF reader', 'PDF chatbot', 'free PDF AI'],
  alternates: { canonical: '/chat-with-pdf' },
};

export default function ChatWithPdfPage() {
  return <div className="flex min-h-screen flex-col"><Header /><main className="flex-1"><section className="border-b bg-gradient-to-b from-primary/[0.08] to-background px-4 py-16 sm:px-6 md:py-24"><div className="mx-auto max-w-4xl text-center"><div className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary"><Sparkles className="size-4" /> AI-powered PDF reading</div><h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Chat with your PDF</h1><p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">Upload a document, ask a question, and get a clear answer grounded in the pages that matter.</p><div className="mt-7 flex flex-wrap justify-center gap-5 text-sm text-muted-foreground"><span className="inline-flex items-center gap-2"><ShieldCheck className="size-4 text-primary" /> Browser-first privacy</span><span className="inline-flex items-center gap-2"><Zap className="size-4 text-primary" /> No signup</span><span className="inline-flex items-center gap-2"><FileTextIcon /> Free to try</span></div></div></section><section className="px-4 py-12 sm:px-6 md:py-16"><div className="mx-auto max-w-6xl"><ChatWithPdf /></div></section></main><Footer /></div>;
}

function FileTextIcon() {
  return <span className="flex size-4 items-center justify-center rounded border border-primary/50 text-[9px] font-bold text-primary">PDF</span>;
}
