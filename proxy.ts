import { NextRequest, NextResponse } from 'next/server'

const canonicalHost = 'www.selfpdf.xyz'

export function proxy(request: NextRequest) {
  const hostname = request.headers.get('host')?.split(':')[0].toLowerCase()
  const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1'

  if (!hostname || hostname === canonicalHost || isLocalhost) {
    return NextResponse.next()
  }

  const redirectUrl = new URL(request.url)
  redirectUrl.protocol = 'https:'
  redirectUrl.host = canonicalHost

  return NextResponse.redirect(redirectUrl, 308)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.*\\.xml).*)'],
}
