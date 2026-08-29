import { PDFDocument } from 'pdf-lib';

export async function pdfToImages(file: File, format: 'png' | 'jpeg' = 'png'): Promise<Blob[]> {
  // Dynamic import to avoid SSR issues
  const pdfjsLib = await import('pdfjs-dist');
  
  // Set worker source for pdf.js
  if (typeof window !== 'undefined') {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version || '5.4.530'}/build/pdf.worker.min.mjs`;
  }
  
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const images: Blob[] = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 2.0 });
    
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) continue;
    
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    
    await page.render({
      canvasContext: context,
      viewport: viewport,
      canvas: canvas,
    }).promise;
    
    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob || new Blob());
      }, format === 'png' ? 'image/png' : 'image/jpeg', 0.95);
    });
    
    images.push(blob);
  }

  return images;
}

export async function imagesToPDF(files: File[]): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();

  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    let image;
    
    if (file.type === 'image/png') {
      image = await pdfDoc.embedPng(arrayBuffer);
    } else if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
      image = await pdfDoc.embedJpg(arrayBuffer);
    } else {
      continue;
    }
    
    const page = pdfDoc.addPage([image.width, image.height]);
    page.drawImage(image, {
      x: 0,
      y: 0,
      width: image.width,
      height: image.height,
    });
  }

  return await pdfDoc.save();
}

export function downloadImage(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export async function downloadZip(blobs: Blob[], filenames: string[], zipName: string) {
  const JSZip = (await import('jszip')).default;
  const zip = new JSZip();
  blobs.forEach((blob, index) => zip.file(filenames[index] || `page-${index + 1}`, blob));
  const archive = await zip.generateAsync({ type: 'blob' });
  downloadImage(archive, zipName);
}

export async function redactPDF(file: File, marks: { page: number; x: number; y: number; width: number; height: number }[]): Promise<Uint8Array> {
  const pdfjsLib = await import('pdfjs-dist');
  if (typeof window !== 'undefined') pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version || '5.4.530'}/build/pdf.worker.min.mjs`;
  const source = await pdfjsLib.getDocument({ data: await file.arrayBuffer() }).promise;
  const output = await (await import('pdf-lib')).PDFDocument.create();
  for (let number = 1; number <= source.numPages; number++) {
    const page = await source.getPage(number); const scale = 2; const viewport = page.getViewport({ scale });
    const canvas = document.createElement('canvas'); canvas.width = viewport.width; canvas.height = viewport.height;
    const context = canvas.getContext('2d'); if (!context) continue;
    await page.render({ canvasContext: context, viewport, canvas }).promise;
    context.fillStyle = '#000';
    marks.filter((mark) => mark.page === number).forEach((mark) => context.fillRect(mark.x * scale, viewport.height - (mark.y + mark.height) * scale, mark.width * scale, mark.height * scale));
    const image = await new Promise<Blob>((resolve) => canvas.toBlob((blob) => resolve(blob || new Blob()), 'image/png'));
    const embedded = await output.embedPng(await image.arrayBuffer()); const outPage = output.addPage([viewport.width / scale, viewport.height / scale]);
    outPage.drawImage(embedded, { x: 0, y: 0, width: viewport.width / scale, height: viewport.height / scale });
  }
  return output.save();
}

export async function extractTextFromPDF(file: File, onProgress?: (progress: number) => void): Promise<string[]> {
  const pdfjsLib = await import('pdfjs-dist');
  if (typeof window !== 'undefined') {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version || '5.4.530'}/build/pdf.worker.min.mjs`;
  }
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const pagesText: string[] = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    let lastY: number | undefined;
    let pageText = '';
    
    for (const item of textContent.items as any[]) {
      if (lastY !== item.transform[5] && lastY !== undefined) {
        pageText += '\n';
      } else if (lastY !== undefined) {
        pageText += ' ';
      }
      pageText += item.str;
      lastY = item.transform[5];
    }
    
    pagesText.push(pageText);
    onProgress?.(i / pdf.numPages);
  }
  return pagesText;
}
