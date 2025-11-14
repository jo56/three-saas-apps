/**
 * Authentication Context for React SPA
 *
 * This provides authentication state and methods to the entire React app.
 * Unlike Next.js middleware, React apps handle auth client-side with Context.
 *
 * DEMO MODE (Current):
 * - Stores user state in React context
 * - Persists JWT token in localStorage
 * - No real validation (demo tokens accepted)
 *
 * PRODUCTION MODE:
 * - Same pattern, but with real JWT validation
 * - Tokens verified by Fastify backend
 * - Secure httpOnly cookies option (requires changes)
 *
 * Usage:
 * ```tsx
 * // Wrap your app
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 *
 * // Use in components
 * const { user, login, logout, isAuthenticated } = useAuth();
 * ```
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * DEMO MODE (Active):
   * Load user/token from localStorage on mount
   */
  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    const storedUser = localStorage.getItem(USER_KEY);

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
      }
    }

    setIsLoading(false);
  }, []);

  /**
   * Login function
   *
   * DEMO MODE: Accepts any credentials
   * PRODUCTION: Validates against Fastify backend
   */
  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Login failed');
      }

      const data = await response.json();

      // Store token and user
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem(TOKEN_KEY, data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));

    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  /**
   * Logout function
   *
   * Clears local state and calls backend
   */
  const logout = async () => {
    try {
      // Call backend logout endpoint (optional in demo mode)
      if (token) {
        await fetch(`${API_URL}/api/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }).catch(() => {
          // Ignore errors, clear local state anyway
        });
      }

      // Clear local state
      setUser(null);
      setToken(null);
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);

    } catch (error) {
      console.error('Logout error:', error);
      // Clear local state even if API call fails
      setUser(null);
      setToken(null);
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
  };

  /**
   * Check authentication status
   *
   * DEMO MODE: Checks if token exists in localStorage
   * PRODUCTION: Validates token with backend
   */
  const checkAuth = async () => {
    const storedToken = localStorage.getItem(TOKEN_KEY);

    if (!storedToken) {
      setUser(null);
      setToken(null);
      return;
    }

    try {
      /**
       * DEMO MODE (Active):
       * Just check if token exists, don't validate
       */
      const storedUser = localStorage.getItem(USER_KEY);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      }

      /**
       * PRODUCTION MODE (Commented):
       * Validate token with backend
       *
       * Uncomment this to enable real token validation:
       *
       * ```
       * const response = await fetch(`${API_URL}/api/auth/me`, {
       *   headers: {
       *     'Authorization': `Bearer ${storedToken}`,
       *   },
       * });
       *
       * if (!response.ok) {
       *   // Token invalid, clear state
       *   setUser(null);
       *   setToken(null);
       *   localStorage.removeItem(TOKEN_KEY);
       *   localStorage.removeItem(USER_KEY);
       *   return;
       * }
       *
       * const data = await response.json();
       * setUser(data.user);
       * setToken(storedToken);
       * ```
       */

    } catch (error) {
      console.error('Auth check error:', error);
      setUser(null);
      setToken(null);
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
  };

  const value = {
    user,
    token,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook to use auth context
 *
 * Usage:
 * ```tsx
 * const { user, login, logout, isAuthenticated } = useAuth();
 * ```
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
