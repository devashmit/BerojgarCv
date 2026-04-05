import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher([
  '/', '/sign-in(.*)', '/sign-up(.*)', '/preview/(.*)',
  '/templates', '/pricing', '/api/cv/share/(.*)',
])

const isAuthRoute = createRouteMatcher([
  '/dashboard', '/builder(.*)', '/cover-letter', '/ats-checker',
  '/api/cv/(.*)', '/api/ai/(.*)', '/api/pdf/(.*)', '/api/upload/(.*)',
])

const isAdminRoute = createRouteMatcher(['/admin(.*)', '/api/admin/(.*)'])

const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

export default function proxy(req: any, event: any) {
  if (!publishableKey || publishableKey.includes('placeholder') || publishableKey.includes('...')) {
    return NextResponse.next()
  }

  return clerkMiddleware(async (auth, req) => {
    const { userId, sessionClaims } = await auth()

    if (isPublicRoute(req)) return NextResponse.next()

    if (isAdminRoute(req)) {
      if (!userId) return NextResponse.redirect(new URL('/sign-in', req.url))
      const isAdmin = (sessionClaims?.metadata as Record<string, unknown>)?.isAdmin === true
      if (!isAdmin) return NextResponse.redirect(new URL('/dashboard', req.url))
      return NextResponse.next()
    }

    if (isAuthRoute(req)) {
      if (!userId) {
        const signInUrl = new URL('/sign-in', req.url)
        signInUrl.searchParams.set('redirect_url', req.url)
        return NextResponse.redirect(signInUrl)
      }
      return NextResponse.next()
    }

    return NextResponse.next()
  })(req, event)
}

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
