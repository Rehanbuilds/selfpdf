import { vemetric } from '@vemetric/web'

export type PdfEventData = {
  toolName?: string
  fileType?: string
  fileCount?: number
}

export function trackPdfEvent(eventName: string, eventData?: PdfEventData) {
  void vemetric.trackEvent(eventName, {
    eventData,
    beacon: true,
  })
}
