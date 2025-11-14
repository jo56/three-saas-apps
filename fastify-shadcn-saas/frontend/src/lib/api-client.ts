/**
 * API Client for Fastify Backend
 *
 * This provides a centralized way to make API calls with authentication.
 * Similar to fastify-client.ts in Next.js hybrid, but for browser environment.
 *
 * DEMO MODE (Current):
 * - Direct fetch without token authentication
 * - Works without needing to log in first
 *
 * PRODUCTION MODE (Commented):
 * - Automatically adds JWT token from localStorage
 * - Handles 401 errors and redirects to login
 * - Type-safe API calls
 *
 * Usage:
 * ```tsx
 * import { apiClient } from '@/lib/api-client';
 *
 * // DEMO MODE (active):
 * const data = await fetch('http://localhost:3001/api/customers').then(r => r.json());
 *
 * // PRODUCTION MODE (commented):
 * const data = await apiClient.get('/api/customers');
 * ```
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const TOKEN_KEY = 'auth_token';

/**
 * PRODUCTION: Get auth token from localStorage
 */
// function getAuthToken(): string | null {
//   return localStorage.getItem(TOKEN_KEY);
// }

/**
 * PRODUCTION: Handle unauthorized responses
 */
// function handleUnauthorized() {
//   // Clear auth state
//   localStorage.removeItem(TOKEN_KEY);
//   localStorage.removeItem('auth_user');
//
//   // Redirect to login
//   window.location.href = '/login';
// }

/**
 * PRODUCTION: Authenticated fetch wrapper
 *
 * Automatically adds Authorization header with JWT token
 */
// async function authenticatedFetch<T = any>(
//   endpoint: string,
//   options: RequestInit = {}
// ): Promise<T> {
//   const token = getAuthToken();
//
//   const headers = {
//     'Content-Type': 'application/json',
//     ...(token && { 'Authorization': `Bearer ${token}` }),
//     ...options.headers,
//   };
//
//   try {
//     const response = await fetch(`${API_URL}${endpoint}`, {
//       ...options,
//       headers,
//     });
//
//     // Handle unauthorized
//     if (response.status === 401) {
//       handleUnauthorized();
//       throw new Error('Unauthorized');
//     }
//
//     if (!response.ok) {
//       const error = await response.json().catch(() => ({ error: 'Request failed' }));
//       throw new Error(error.error || error.message || `HTTP ${response.status}`);
//     }
//
//     // Handle no content responses
//     if (response.status === 204) {
//       return null as T;
//     }
//
//     return await response.json();
//   } catch (error) {
//     console.error(`API Error [${endpoint}]:`, error);
//     throw error;
//   }
// }

/**
 * PRODUCTION: API Client with typed methods
 */
// export const apiClient = {
//   get: <T = any>(endpoint: string) =>
//     authenticatedFetch<T>(endpoint, { method: 'GET' }),
//
//   post: <T = any>(endpoint: string, body?: any) =>
//     authenticatedFetch<T>(endpoint, {
//       method: 'POST',
//       body: JSON.stringify(body),
//     }),
//
//   put: <T = any>(endpoint: string, body?: any) =>
//     authenticatedFetch<T>(endpoint, {
//       method: 'PUT',
//       body: JSON.stringify(body),
//     }),
//
//   patch: <T = any>(endpoint: string, body?: any) =>
//     authenticatedFetch<T>(endpoint, {
//       method: 'PATCH',
//       body: JSON.stringify(body),
//     }),
//
//   delete: <T = any>(endpoint: string) =>
//     authenticatedFetch<T>(endpoint, { method: 'DELETE' }),
// };

/**
 * DEMO MODE EXPORT (Currently Active)
 *
 * Simple direct fetch without authentication
 * Pages can use direct fetch or this helper
 */
export const apiClient = {
  get: async <T = any>(endpoint: string): Promise<T> => {
    const response = await fetch(`${API_URL}${endpoint}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  },

  post: async <T = any>(endpoint: string, body?: any): Promise<T> => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  },

  // Add other methods as needed
};

/**
 * Helper: Get API base URL
 */
export function getApiUrl(): string {
  return API_URL;
}

/**
 * Helper: Check if API is available
 */
export async function checkApiHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/health`);
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * EXAMPLE USAGE IN COMPONENTS:
 *
 * DEMO MODE (current - simple):
 * ```tsx
 * useEffect(() => {
 *   fetch('http://localhost:3001/api/customers')
 *     .then(r => r.json())
 *     .then(setCustomers);
 * }, []);
 * ```
 *
 * PRODUCTION MODE (with this helper - authenticated):
 * ```tsx
 * import { apiClient } from '@/lib/api-client';
 *
 * useEffect(() => {
 *   apiClient.get('/api/customers')
 *     .then(setCustomers)
 *     .catch(error => {
 *       // Handle errors (auto-redirects to login on 401)
 *       console.error(error);
 *     });
 * }, []);
 * ```
 *
 * Or with async/await:
 * ```tsx
 * const fetchCustomers = async () => {
 *   try {
 *     const data = await apiClient.get<Customer[]>('/api/customers');
 *     setCustomers(data);
 *   } catch (error) {
 *     console.error('Failed to fetch customers:', error);
 *   }
 * };
 * ```
 */
