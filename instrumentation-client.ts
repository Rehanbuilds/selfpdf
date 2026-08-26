import { vemetric } from '@vemetric/web'

vemetric.init({
  token: process.env.NEXT_PUBLIC_VEMETRIC_TOKEN || 'NIJsV4DV5Gf30OTM',
  trackPageViews: true,
  trackOutboundLinks: false,
  trackDataAttributes: false,
  allowCookies: false,
})
