import { NextResponse } from 'next/server'

/**
 * Logout API Route - DEMO MODE
 *
 * Clears the demo session cookie to log out the user
 *
 * To add real authentication:
 * 1. Invalidate the session in your database/auth provider
 * 2. Clear all authentication cookies
 * 3. Optionally blacklist the token if using JWT
 * 4. Return success response
 *
 * Example with real auth:
 * ```
 * const token = request.cookies.get('auth_token')?.value
 * if (token) {
 *   await invalidateSession(token)
 *   await addToBlacklist(token)
 * }
 * ```
 */
export async function POST() {
  try {
    // Create response
    const response = NextResponse.json({
      success: true,
      message: 'Logout successful',
    })

    // Clear the demo session cookie
    // TODO: In production, clear all auth-related cookies
    response.cookies.delete('demo_session')

    // Alternative: Set cookie to expire immediately
    // response.cookies.set('demo_session', '', {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === 'production',
    //   sameSite: 'lax',
    //   maxAge: 0,
    //   path: '/',
    // })

    return response
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { error: 'Logout failed' },
      { status: 500 }
    )
  }
}
