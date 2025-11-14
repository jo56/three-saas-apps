import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Middleware for protecting dashboard routes with authentication
 *
 * DEMO MODE: Currently allows all access with demo session
 *
 * To add real authentication:
 * 1. Replace `checkDemoAuth()` with your actual auth check (e.g., JWT verification, session validation)
 * 2. Update the authentication logic in the login page to set real tokens/sessions
 * 3. Consider using auth libraries like NextAuth.js, Clerk, or Auth0
 */

// Routes that require authentication
const protectedRoutes = [
  '/dashboard',
  '/analytics',
  '/customers',
  '/team',
  '/reports',
  '/billing',
  '/settings',
]

// Routes that are publicly accessible
const publicRoutes = [
  '/',
  '/features',
  '/pricing',
  '/login',
]

/**
 * DEMO: Mock authentication check
 *
 * Replace this with real authentication:
 * - Check for JWT token in cookies/headers
 * - Validate session with your auth provider
 * - Verify token signature and expiration
 *
 * Example with JWT:
 * ```
 * async function checkAuth(request: NextRequest): Promise<boolean> {
 *   const token = request.cookies.get('auth_token')?.value
 *   if (!token) return false
 *
 *   try {
 *     const verified = await verifyJWT(token)
 *     return !!verified
 *   } catch {
 *     return false
 *   }
 * }
 * ```
 *
 * Example with NextAuth:
 * ```
 * import { getToken } from "next-auth/jwt"
 * const token = await getToken({ req: request })
 * return !!token
 * ```
 */
function checkDemoAuth(request: NextRequest): boolean {
  // DEMO: Check for demo session cookie
  const demoSession = request.cookies.get('demo_session')?.value

  // In demo mode, we accept the demo session
  // In production, replace this with real auth validation
  return demoSession === 'active'

  // TODO: Replace with real authentication
  // Example patterns:
  // - return await validateJWTToken(request)
  // - return await checkSessionWithDatabase(request)
  // - return await verifyAuthProvider(request)
}

/**
 * Check if a path is protected
 */
function isProtectedRoute(pathname: string): boolean {
  return protectedRoutes.some(route => pathname.startsWith(route))
}

/**
 * Check if a path is public
 */
function isPublicRoute(pathname: string): boolean {
  return publicRoutes.some(route => pathname === route || pathname.startsWith(route))
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow public routes without authentication
  if (isPublicRoute(pathname)) {
    return NextResponse.next()
  }

  // Check authentication for protected routes
  if (isProtectedRoute(pathname)) {
    const isAuthenticated = checkDemoAuth(request)

    if (!isAuthenticated) {
      // Redirect to login page
      const loginUrl = new URL('/login', request.url)

      // Add redirect parameter to return user after login
      loginUrl.searchParams.set('redirect', pathname)

      return NextResponse.redirect(loginUrl)
    }

    // User is authenticated, allow access
    return NextResponse.next()
  }

  // Default: allow access
  return NextResponse.next()
}

/**
 * Configure which routes this middleware runs on
 * See: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api (API routes - handled separately)
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|api|.*\\..*|public).*)',
  ],
}
