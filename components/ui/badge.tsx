import * as React from 'react';
import { cn } from '@/lib/utils';

export function Badge({ className, variant = 'default', ...props }: React.HTMLAttributes<HTMLSpanElement> & { variant?: 'default' | 'secondary' }) {
  return <span className={cn('inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium', variant === 'secondary' ? 'border-primary/20 bg-primary/10 text-primary' : 'border-primary bg-primary text-primary-foreground', className)} {...props} />;
}
