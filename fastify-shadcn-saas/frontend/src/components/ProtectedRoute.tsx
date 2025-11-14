/**
 * Protected Route Component for React Router
 *
 * This is the React SPA equivalent of Next.js middleware.
 * Wraps routes that require authentication.
 *
 * DEMO MODE (Current):
 * - DISABLED: Allows all access without checking auth
 * - You can navigate to /dashboard without logging in
 * - For demo purposes only
 *
 * PRODUCTION MODE (Commented):
 * - Checks if user is authenticated
 * - Redirects to /login if not authenticated
 * - Preserves intended destination for post-login redirect
 *
 * Usage in App.tsx:
 * ```tsx
 * // DEMO MODE (active):
 * <Route path="/dashboard" element={<Dashboard />} />
 *
 * // PRODUCTION MODE (commented):
 * <Route
 *   path="/dashboard"
 *   element={
 *     <ProtectedRoute>
 *       <Dashboard />
 *     </ProtectedRoute>
 *   }
 * />
 * ```
 */

import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  /**
   * DEMO MODE (Active):
   * Always render children without checking authentication
   * Comment this out and uncomment production code below to enable protection
   */
  return <>{children}</>;

  /**
   * PRODUCTION MODE (Commented):
   * Check authentication and redirect if needed
   *
   * Uncomment below and comment out the return above:
   *
   * ```
   * // Show loading state while checking auth
   * if (isLoading) {
   *   return (
   *     <div className="flex items-center justify-center min-h-screen">
   *       <div className="text-center">
   *         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
   *         <p className="mt-4 text-muted-foreground">Loading...</p>
   *       </div>
   *     </div>
   *   );
   * }
   *
   * // Redirect to login if not authenticated
   * // Preserve current location for redirect after login
   * if (!isAuthenticated) {
   *   return <Navigate to="/login" state={{ from: location.pathname }} replace />;
   * }
   *
   * // User is authenticated, render the protected content
   * return <>{children}</>;
   * ```
   */
}

/**
 * Optional: Role-based protection
 *
 * Use this to restrict routes to specific user roles
 *
 * Usage:
 * ```tsx
 * <Route
 *   path="/admin"
 *   element={
 *     <RequireRole role="admin">
 *       <AdminPanel />
 *     </RequireRole>
 *   }
 * />
 * ```
 */
// interface RequireRoleProps {
//   children: ReactNode;
//   role: string;
// }
//
// export function RequireRole({ children, role }: RequireRoleProps) {
//   const { user, isAuthenticated, isLoading } = useAuth();
//   const location = useLocation();
//
//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
//       </div>
//     );
//   }
//
//   if (!isAuthenticated) {
//     return <Navigate to="/login" state={{ from: location.pathname }} replace />;
//   }
//
//   if (user?.role !== role && user?.role !== 'admin') {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <h1 className="text-4xl font-bold text-destructive mb-4">403</h1>
//           <p className="text-xl">You don't have permission to access this page.</p>
//           <p className="text-muted-foreground mt-2">Required role: {role}</p>
//         </div>
//       </div>
//     );
//   }
//
//   return <>{children}</>;
// }
