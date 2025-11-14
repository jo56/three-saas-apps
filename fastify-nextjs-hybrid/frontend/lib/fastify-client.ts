/**
 * Fastify API Client
 *
 * This file demonstrates two approaches for calling the Fastify backend:
 * 1. DEMO MODE (Active): Direct fetch without authentication
 * 2. PRODUCTION MODE (Commented): Service-to-service authentication with JWT
 *
 * TO ENABLE PRODUCTION MODE:
 * 1. Uncomment the production functions below
 * 2. Add SERVICE_SECRET to frontend/.env.local
 * 3. Enable Fastify authentication (see backend/src/index.ts)
 * 4. Replace direct fetch calls in pages with these helpers
 */

// For production authentication
// import jwt from 'jsonwebtoken';

const FASTIFY_URL = process.env.NEXT_PUBLIC_FASTIFY_URL || 'http://localhost:3001';

/**
 * PRODUCTION: Generate service token for Next.js → Fastify communication
 *
 * This creates a short-lived JWT that proves the request is coming from
 * the authorized Next.js frontend service.
 */
// function generateServiceToken(): string {
//   const secret = process.env.SERVICE_SECRET;

//   if (!secret) {
//     throw new Error('SERVICE_SECRET is not configured in environment variables');
//   }

//   // Create JWT token valid for 5 minutes
//   const token = jwt.sign(
//     {
//       service: 'nextjs-frontend',
//       timestamp: Date.now()
//     },
//     secret,
//     {
//       expiresIn: '5m',
//       issuer: 'nextjs-frontend',
//       audience: 'fastify-backend'
//     }
//   );

//   return token;
// }

/**
 * PRODUCTION: Authenticated fetch wrapper for Fastify API calls
 *
 * Automatically adds service token to every request
 *
 * Usage:
 * ```
 * const data = await fastifyFetch('/api/customers');
 * ```
 */
// export async function fastifyFetch<T = any>(
//   endpoint: string,
//   options: RequestInit = {}
// ): Promise<T> {
//   try {
//     // Generate fresh service token for this request
//     const serviceToken = generateServiceToken();

//     // Merge headers
//     const headers = {
//       'Content-Type': 'application/json',
//       'X-Service-Token': serviceToken, // Service authentication
//       ...options.headers,
//     };

//     // Make authenticated request
//     const response = await fetch(`${FASTIFY_URL}${endpoint}`, {
//       ...options,
//       headers,
//     });

//     if (!response.ok) {
//       const error = await response.json().catch(() => ({ error: 'Request failed' }));
//       throw new Error(error.error || error.message || `HTTP ${response.status}`);
//     }

//     return await response.json();
//   } catch (error) {
//     console.error(`Fastify API Error [${endpoint}]:`, error);
//     throw error;
//   }
// }

/**
 * PRODUCTION: Authenticated fetch with user context
 *
 * For endpoints that need both service auth AND user auth
 * Passes through the user's JWT from Next.js auth
 *
 * Usage:
 * ```
 * const data = await fastifyFetchWithUser('/api/customers', userToken);
 * ```
 */
// export async function fastifyFetchWithUser<T = any>(
//   endpoint: string,
//   userToken: string,
//   options: RequestInit = {}
// ): Promise<T> {
//   try {
//     const serviceToken = generateServiceToken();

//     const headers = {
//       'Content-Type': 'application/json',
//       'X-Service-Token': serviceToken,      // Service-to-service auth
//       'Authorization': `Bearer ${userToken}`, // User authentication
//       ...options.headers,
//     };

//     const response = await fetch(`${FASTIFY_URL}${endpoint}`, {
//       ...options,
//       headers,
//     });

//     if (!response.ok) {
//       if (response.status === 401) {
//         throw new Error('Authentication failed - please log in again');
//       }
//       const error = await response.json().catch(() => ({ error: 'Request failed' }));
//       throw new Error(error.error || error.message || `HTTP ${response.status}`);
//     }

//     return await response.json();
//   } catch (error) {
//     console.error(`Fastify API Error [${endpoint}]:`, error);
//     throw error;
//   }
// }

/**
 * DEMO MODE EXPORT (Currently Active)
 *
 * Simple direct fetch without authentication
 * Works without Fastify running if you handle errors gracefully
 */
export async function fastifyFetch<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const response = await fetch(`${FASTIFY_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Fastify API Error [${endpoint}]:`, error);
    throw error;
  }
}

/**
 * Helper: Get Fastify base URL
 */
export function getFastifyUrl(): string {
  return FASTIFY_URL;
}

/**
 * Helper: Check if Fastify is available
 */
export async function checkFastifyHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${FASTIFY_URL}/health`, {
      method: 'GET',
      // Don't include credentials for health check
    });
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * EXAMPLE USAGE IN PAGES:
 *
 * DEMO MODE (current):
 * ```tsx
 * const data = await fetch('http://localhost:3001/api/customers').then(r => r.json());
 * ```
 *
 * PRODUCTION MODE (with this helper):
 * ```tsx
 * import { fastifyFetch } from '@/lib/fastify-client';
 * const data = await fastifyFetch('/api/customers');
 * ```
 *
 * The helper automatically:
 * - Adds service token
 * - Handles errors
 * - Provides type safety
 * - Centralizes Fastify URL configuration
 */
