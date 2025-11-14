/**
 * Authentication Routes for Fastify Backend
 *
 * PRODUCTION-READY USER AUTHENTICATION (Currently in Demo Mode)
 *
 * This module handles user authentication for the React SPA frontend.
 * Unlike Next.js middleware, React apps authenticate directly with Fastify.
 *
 * DEMO MODE (Current - Active):
 * - Accepts any email/password
 * - Returns mock JWT token
 * - No database user validation
 *
 * PRODUCTION MODE (Commented):
 * - Validates credentials against database
 * - Hashes passwords with bcrypt
 * - Returns real JWT with user claims
 * - Implements refresh tokens
 *
 * TO ENABLE PRODUCTION AUTH:
 * 1. Uncomment production code below
 * 2. Add JWT_SECRET to backend/.env
 * 3. Add User model to Prisma schema
 * 4. Install: npm install jsonwebtoken bcrypt
 * 5. Update React frontend to use real auth (see AuthContext.tsx)
 */

import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';
// import { prisma } from '../lib/prisma.js';

interface LoginRequest {
  email: string;
  password: string;
}

/**
 * DEMO MODE: Generate mock JWT token
 *
 * In production, replace with real JWT signing
 */
function generateDemoToken(email: string): string {
  // Demo token is just base64 encoded JSON
  // NOT secure - for demo purposes only
  const payload = {
    email,
    userId: 'demo-user-123',
    name: 'John Doe',
    role: 'admin',
    exp: Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 days
  };
  return Buffer.from(JSON.stringify(payload)).toString('base64');
}

/**
 * PRODUCTION: Generate real JWT token
 *
 * Uncomment and use this instead of generateDemoToken
 */
// function generateJWT(user: { id: string; email: string; name: string; role: string }): string {
//   const secret = process.env.JWT_SECRET;
//
//   if (!secret) {
//     throw new Error('JWT_SECRET is not configured');
//   }
//
//   return jwt.sign(
//     {
//       userId: user.id,
//       email: user.email,
//       name: user.name,
//       role: user.role
//     },
//     secret,
//     {
//       expiresIn: '7d', // Token valid for 7 days
//       issuer: 'fastify-backend',
//       audience: 'react-frontend'
//     }
//   );
// }

/**
 * PRODUCTION: Validate user credentials
 *
 * Uncomment and use in login route
 */
// async function validateCredentials(email: string, password: string) {
//   // Find user in database
//   const user = await prisma.user.findUnique({
//     where: { email }
//   });
//
//   if (!user) {
//     return null; // User not found
//   }
//
//   // Compare password hash
//   const isValid = await bcrypt.compare(password, user.passwordHash);
//
//   if (!isValid) {
//     return null; // Invalid password
//   }
//
//   return {
//     id: user.id,
//     email: user.email,
//     name: user.name,
//     role: user.role
//   };
// }

/**
 * Register authentication routes
 */
export async function authRoutes(fastify: FastifyInstance) {

  /**
   * POST /api/auth/login
   *
   * Authenticate user and return JWT token
   */
  fastify.post<{ Body: LoginRequest }>(
    '/api/auth/login',
    async (request: FastifyRequest<{ Body: LoginRequest }>, reply: FastifyReply) => {
      try {
        const { email, password } = request.body;

        // Validate input
        if (!email || !password) {
          reply.code(400);
          return { error: 'Email and password are required' };
        }

        /**
         * DEMO MODE (Active):
         * Accept any credentials and return mock token
         */
        const token = generateDemoToken(email);

        return {
          success: true,
          message: 'Login successful (demo mode)',
          token,
          user: {
            id: 'demo-user-123',
            email,
            name: 'John Doe',
            role: 'admin'
          }
        };

        /**
         * PRODUCTION MODE (Commented):
         * Validate against database and return real JWT
         *
         * ```
         * const user = await validateCredentials(email, password);
         *
         * if (!user) {
         *   reply.code(401);
         *   return { error: 'Invalid email or password' };
         * }
         *
         * const token = generateJWT(user);
         *
         * return {
         *   success: true,
         *   token,
         *   user: {
         *     id: user.id,
         *     email: user.email,
         *     name: user.name,
         *     role: user.role
         *   }
         * };
         * ```
         */

      } catch (error) {
        fastify.log.error('Login error:', error);
        reply.code(500);
        return { error: 'Login failed' };
      }
    }
  );

  /**
   * POST /api/auth/logout
   *
   * Logout user (client clears token)
   * In production, could invalidate refresh tokens
   */
  fastify.post(
    '/api/auth/logout',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        /**
         * DEMO MODE:
         * Client-side handles logout by clearing localStorage
         * Server doesn't need to do anything
         */
        return {
          success: true,
          message: 'Logout successful'
        };

        /**
         * PRODUCTION MODE (Commented):
         * Invalidate refresh token in database
         *
         * ```
         * const authHeader = request.headers.authorization;
         * if (authHeader) {
         *   const token = authHeader.replace('Bearer ', '');
         *   await prisma.refreshToken.deleteMany({
         *     where: { token }
         *   });
         * }
         *
         * return { success: true };
         * ```
         */

      } catch (error) {
        fastify.log.error('Logout error:', error);
        reply.code(500);
        return { error: 'Logout failed' };
      }
    }
  );

  /**
   * GET /api/auth/me
   *
   * Get current user info from token
   * Requires Authorization header with JWT
   */
  fastify.get(
    '/api/auth/me',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const authHeader = request.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
          reply.code(401);
          return { error: 'Missing or invalid Authorization header' };
        }

        const token = authHeader.replace('Bearer ', '');

        /**
         * DEMO MODE (Active):
         * Decode base64 token (no validation)
         */
        try {
          const payload = JSON.parse(Buffer.from(token, 'base64').toString());

          // Check expiration
          if (payload.exp && Date.now() > payload.exp) {
            reply.code(401);
            return { error: 'Token expired' };
          }

          return {
            user: {
              id: payload.userId,
              email: payload.email,
              name: payload.name,
              role: payload.role
            }
          };
        } catch {
          reply.code(401);
          return { error: 'Invalid token format' };
        }

        /**
         * PRODUCTION MODE (Commented):
         * Verify JWT signature and return user
         *
         * ```
         * const secret = process.env.JWT_SECRET;
         *
         * if (!secret) {
         *   throw new Error('JWT_SECRET not configured');
         * }
         *
         * const decoded = jwt.verify(token, secret) as any;
         *
         * // Optionally fetch fresh user data from database
         * const user = await prisma.user.findUnique({
         *   where: { id: decoded.userId }
         * });
         *
         * if (!user) {
         *   reply.code(401);
         *   return { error: 'User not found' };
         * }
         *
         * return {
         *   user: {
         *     id: user.id,
         *     email: user.email,
         *     name: user.name,
         *     role: user.role
         *   }
         * };
         * ```
         */

      } catch (error) {
        fastify.log.error('Get user error:', error);
        reply.code(401);
        return { error: 'Invalid or expired token' };
      }
    }
  );

  /**
   * POST /api/auth/register
   *
   * Register new user (production only)
   * Not implemented in demo mode
   */
  // fastify.post<{ Body: { email: string; password: string; name: string } }>(
  //   '/api/auth/register',
  //   async (request, reply) => {
  //     const { email, password, name } = request.body;
  //
  //     // Check if user already exists
  //     const existing = await prisma.user.findUnique({ where: { email } });
  //     if (existing) {
  //       reply.code(400);
  //       return { error: 'User already exists' };
  //     }
  //
  //     // Hash password
  //     const passwordHash = await bcrypt.hash(password, 10);
  //
  //     // Create user
  //     const user = await prisma.user.create({
  //       data: {
  //         email,
  //         name,
  //         passwordHash,
  //         role: 'user'
  //       }
  //     });
  //
  //     // Generate token
  //     const token = generateJWT(user);
  //
  //     return {
  //       success: true,
  //       token,
  //       user: {
  //         id: user.id,
  //         email: user.email,
  //         name: user.name,
  //         role: user.role
  //       }
  //     };
  //   }
  // );
}
