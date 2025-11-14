import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Login API Route - DEMO MODE
 *
 * Sets a demo session cookie to simulate authentication
 *
 * To add real authentication:
 * 1. Validate credentials against your database/auth provider
 * 2. Generate a secure JWT token or session ID
 * 3. Set secure, httpOnly cookies with the authentication token
 * 4. Return user information if needed
 *
 * Example with real auth:
 * ```
 * const user = await validateCredentials(email, password)
 * if (!user) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
 *
 * const token = await generateJWT({ userId: user.id, email: user.email })
 * const response = NextResponse.json({ success: true, user })
 * response.cookies.set('auth_token', token, {
 *   httpOnly: true,
 *   secure: process.env.NODE_ENV === 'production',
 *   sameSite: 'lax',
 *   maxAge: 60 * 60 * 24 * 7 // 7 days
 * })
 * return response
 * ```
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // DEMO: No actual validation
    // TODO: Replace with real authentication
    // - Validate email and password format
    // - Check credentials against database
    // - Verify user exists and password matches
    // - Handle rate limiting and account lockouts

    // In demo mode, accept any credentials
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Create response
    const response = NextResponse.json({
      success: true,
      message: 'Login successful (demo mode)',
      // TODO: In production, return user data here
      // user: { id, email, name, etc. }
    })

    // Set demo session cookie
    // TODO: Replace with secure JWT token or session ID
    response.cookies.set('demo_session', 'active', {
      httpOnly: true, // Prevent JavaScript access (XSS protection)
      secure: process.env.NODE_ENV === 'production', // HTTPS only in production
      sameSite: 'lax', // CSRF protection
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/', // Available to all routes
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    )
  }
}
