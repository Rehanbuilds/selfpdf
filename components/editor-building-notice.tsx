'use client'

import { useState } from 'react'
import { ArrowRight, Hammer, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function EditorBuildingNotice() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button className="mt-7" size="lg" onClick={() => setOpen(true)}>
        Open PDF Editor <ArrowRight className="ml-2 size-4" />
      </Button>
      <span className="mt-3 text-sm text-muted-foreground">The editor is currently being built.</span>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false) }}>
          <div role="dialog" aria-modal="true" aria-labelledby="editor-building-title" className="relative w-full max-w-md rounded-2xl border bg-background p-6 shadow-xl">
            <button type="button" aria-label="Close notification" onClick={() => setOpen(false)} className="absolute right-4 top-4 rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              <X className="size-4" />
            </button>
            <div className="mb-4 flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary"><Hammer className="size-5" /></div>
            <h3 id="editor-building-title" className="text-xl font-semibold tracking-tight">PDF Editor is currently being built</h3>
            <p className="mt-3 leading-6 text-muted-foreground">We&apos;re building a fast, private editor for writing on pages, adding images, signing, formatting text, and downloading finished PDFs. It will be available here soon.</p>
            <Button className="mt-6" onClick={() => setOpen(false)}>Got it</Button>
          </div>
        </div>
      ) : null}
    </>
  )
}
