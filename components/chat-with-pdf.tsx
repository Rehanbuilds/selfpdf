'use client';

import { useMemo, useState } from 'react';
import { FileText, Loader2, MessageCircle, Send, Upload, X } from 'lucide-react';
import { extractTextFromPDF } from '@/lib/pdf/convert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export function ChatWithPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [documentText, setDocumentText] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [question, setQuestion] = useState('');
  const [isReading, setIsReading] = useState(false);
  const [isAnswering, setIsAnswering] = useState(false);
  const [error, setError] = useState('');

  const pageCount = useMemo(() => documentText ? documentText.split('\n\n--- PAGE ').length : 0, [documentText]);

  async function handleFile(fileToRead: File) {
    if (fileToRead.type !== 'application/pdf') {
      setError('Please choose a PDF file.');
      return;
    }
    setIsReading(true);
    setError('');
    setMessages([]);
    try {
      const pages = await extractTextFromPDF(fileToRead);
      const text = pages.map((page, index) => `--- PAGE ${index + 1} ---\n${page}`).join('\n\n');
      if (!text.trim()) throw new Error('This PDF does not contain extractable text.');
      setFile(fileToRead);
      setDocumentText(text.slice(0, 120000));
    } catch {
      setFile(null);
      setDocumentText('');
      setError('We could not read this PDF. Try a text-based PDF or use OCR first.');
    } finally {
      setIsReading(false);
    }
  }

  async function askQuestion(event: React.FormEvent) {
    event.preventDefault();
    const trimmed = question.trim();
    if (!trimmed || !documentText || isAnswering) return;
    if ((event.nativeEvent as SubmitEvent & { isComposing?: boolean }).isComposing) return;
    const nextMessages = [...messages, { role: 'user' as const, content: trimmed }];
    setMessages(nextMessages);
    setQuestion('');
    setIsAnswering(true);
    setError('');
    try {
      const response = await fetch('/api/chat-with-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documentText, messages: nextMessages }),
      });
      if (!response.ok || !response.body) throw new Error('Request failed');
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let answer = '';
      setMessages((current) => [...current, { role: 'assistant', content: '' }]);
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        answer += decoder.decode(value, { stream: true });
        setMessages((current) => [...current.slice(0, -1), { role: 'assistant', content: answer }]);
      }
    } catch {
      setError('The answer could not be generated. Please try again.');
    } finally {
      setIsAnswering(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
      <Card className="overflow-hidden border-primary/15 bg-card/80 shadow-xl shadow-primary/5">
        <CardHeader className="border-b bg-muted/30">
          <div className="flex items-center gap-3"><div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary"><FileText className="size-5" /></div><div><CardTitle className="text-lg">Your document</CardTitle><p className="text-sm text-muted-foreground">Private browser-side extraction</p></div></div>
        </CardHeader>
        <CardContent className="p-6">
          <label htmlFor="chat-pdf-upload" className="flex min-h-64 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-primary/20 bg-primary/[0.03] px-6 text-center transition-colors hover:border-primary/50 hover:bg-primary/[0.06]">
            {isReading ? <Loader2 className="mb-4 size-9 animate-spin text-primary" /> : <Upload className="mb-4 size-9 text-primary" />}
            <span className="font-semibold">{isReading ? 'Reading your PDF…' : file ? file.name : 'Drop a PDF here or browse'}</span>
            <span className="mt-2 text-sm text-muted-foreground">Text is extracted in your browser. Nothing is saved.</span>
            <input id="chat-pdf-upload" type="file" accept="application/pdf" className="sr-only" onChange={(event) => event.target.files?.[0] && handleFile(event.target.files[0])} />
          </label>
          {file && !isReading && <div className="mt-4 flex items-center justify-between rounded-xl border bg-muted/30 px-4 py-3 text-sm"><span className="truncate pr-3">{pageCount} page{pageCount === 1 ? '' : 's'} ready to chat</span><button type="button" className="text-muted-foreground hover:text-foreground" onClick={() => { setFile(null); setDocumentText(''); setMessages([]); }} aria-label="Remove PDF"><X className="size-4" /></button></div>}
          <div className="mt-5 rounded-xl bg-muted/40 p-4 text-sm text-muted-foreground"><strong className="text-foreground">Tip:</strong> Ask for a summary, key facts, action items, definitions, or a specific page reference.</div>
        </CardContent>
      </Card>

      <Card className="flex min-h-[520px] flex-col overflow-hidden border-primary/15 bg-card/80 shadow-xl shadow-primary/5">
        <CardHeader className="border-b bg-muted/30"><div className="flex items-center gap-3"><div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary"><MessageCircle className="size-5" /></div><div><CardTitle className="text-lg">Ask anything</CardTitle><p className="text-sm text-muted-foreground">Answers grounded in your PDF</p></div></div></CardHeader>
        <div className="min-h-0 flex-1 overflow-y-auto px-6"><div className="flex min-h-[360px] flex-col justify-end gap-4 py-6">{messages.length === 0 ? <div className="m-auto max-w-sm text-center text-muted-foreground"><MessageCircle className="mx-auto mb-4 size-10 text-primary/50" /><p className="font-medium text-foreground">Upload a PDF to start chatting</p><p className="mt-2 text-sm">Your questions and answers will appear here.</p></div> : messages.map((message, index) => <div key={`${message.role}-${index}`} className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-6 ${message.role === 'user' ? 'ml-auto bg-primary text-primary-foreground' : 'bg-muted'}`}><p className="whitespace-pre-wrap">{message.content || 'Thinking…'}</p></div>)}</div></div>
        <CardContent className="border-t p-4"><form onSubmit={askQuestion} className="flex gap-2"><Input value={question} onChange={(event) => setQuestion(event.target.value)} disabled={!documentText || isAnswering} placeholder={documentText ? 'Ask about this document…' : 'Upload a PDF first'} aria-label="Ask a question about your PDF" /><Button type="submit" size="icon" disabled={!documentText || !question.trim() || isAnswering} aria-label="Send question">{isAnswering ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}</Button></form>{error && <p className="mt-3 text-sm text-destructive">{error}</p>}</CardContent>
      </Card>
    </div>
  );
}
