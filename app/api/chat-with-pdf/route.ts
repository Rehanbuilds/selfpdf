import { streamText } from 'ai';
import { z } from 'zod';

const requestSchema = z.object({
  documentText: z.string().min(1).max(120000),
  messages: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string().min(1).max(12000),
  })).min(1).max(30),
});

export async function POST(request: Request) {
  try {
    const body = requestSchema.parse(await request.json());
    const result = streamText({
      model: process.env.AI_MODEL || 'openai/gpt-4o-mini',
      system: `You are Chat with PDF, a precise document assistant. Answer only from the provided document context. If the answer is not in the document, say that clearly. Cite page numbers when the context includes page markers. Keep answers useful and concise.\n\nDOCUMENT CONTEXT:\n${body.documentText}`,
      messages: body.messages,
      maxOutputTokens: 900,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ error: 'The document or message is invalid.' }, { status: 400 });
    }
    console.error('[v0] Chat with PDF generation failed:', error);
    return Response.json({ error: 'Unable to answer right now. Please try again.' }, { status: 500 });
  }
}
