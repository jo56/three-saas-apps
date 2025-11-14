/**
 * User Authentication Middleware for Fastify
 *
 * PRODUCTION-READY JWT VALIDATION (Currently Commented Out)
 *
 * This middleware protects API endpoints by validating JWT tokens from
 * the React frontend. Unlike service-to-service auth, this validates
 * END-USER credentials.
 *
 * HOW IT WORKS:
 * 1. React app sends JWT in Authorization header: `Bearer <token>`
 * 2. Middleware extracts and validates token
 * 3. Valid tokens: Request proceeds with user info attached
 * 4. Invalid/missing tokens: 401 Unauthorized response
 *
 * TO ENABLE:
 * 1. Uncomment this entire file
 * 2. Add JWT_SECRET to backend/.env
 * 3. Uncomment middleware registration in src/index.ts
 * 4. React app must send tokens (see frontend/src/lib/api-client.ts)
 */

// import type { FastifyRequest, FastifyReply } from 'fastify';
// import jwt from 'jsonwebtoken';

// interface JWTPayload {
//   userId: string;
//   email: string;
//   name: string;
//   role: string;
//   iat: number;
//   exp: number;
// }

// /**
//  * Validate JWT token and extract payload
//  */
// function validateToken(token: string): JWTPayload | null {
//   try {
//     const secret = process.env.JWT_SECRET;
//
//     if (!secret) {
//       console.error('JWT_SECRET is not configured');
//       return null;
//     }
//
//     // Verify and decode the JWT
//     const decoded = jwt.verify(token, secret) as JWTPayload;
//
//     return decoded;
//   } catch (error) {
//     if (error instanceof jwt.JsonWebTokenError) {
//       console.error('JWT validation error:', error.message);
//     } else if (error instanceof jwt.TokenExpiredError) {
//       console.error('JWT token expired:', error.message);
//     } else {
//       console.error('Unexpected error validating token:', error);
//     }
//     return null;
//   }
// }

// /**
//  * Fastify preHandler hook to authenticate user requests
//  *
//  * Usage in index.ts:
//  * ```
//  * import { authenticateUser } from './middleware/auth.js';
//  * fastify.addHook('preHandler', authenticateUser);
//  * ```
//  */
// export async function authenticateUser(
//   request: FastifyRequest,
//   reply: FastifyReply
// ) {
//   // Skip authentication for public endpoints
//   const publicPaths = [
//     '/health',
//     '/api/auth/login',
//     '/api/auth/logout',
//     '/api/auth/register'
//   ];
//
//   if (publicPaths.includes(request.url)) {
//     return; // Allow public access
//   }
//
//   // Extract token from Authorization header
//   const authHeader = request.headers.authorization;
//
//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     reply.code(401).send({
//       error: 'Unauthorized',
//       message: 'Missing or invalid Authorization header'
//     });
//     return;
//   }
//
//   const token = authHeader.replace('Bearer ', '');
//
//   // Validate the token
//   const payload = validateToken(token);
//
//   if (!payload) {
//     reply.code(401).send({
//       error: 'Unauthorized',
//       message: 'Invalid or expired token'
//     });
//     return;
//   }
//
//   // Attach user info to request for use in route handlers
//   // @ts-ignore - Adding custom property to request
//   request.user = {
//     userId: payload.userId,
//     email: payload.email,
//     name: payload.name,
//     role: payload.role
//   };
//
//   // Continue to route handler
// }

// /**
//  * Role-based authorization middleware
//  *
//  * Use this to restrict certain endpoints to specific roles
//  *
//  * Usage:
//  * ```
//  * fastify.get(
//  *   '/api/admin/users',
//  *   { preHandler: [authenticateUser, requireRole('admin')] },
//  *   handler
//  * );
//  * ```
//  */
// export function requireRole(requiredRole: string) {
//   return async (request: FastifyRequest, reply: FastifyReply) => {
//     // @ts-ignore
//     const user = request.user;
//
//     if (!user) {
//       reply.code(401).send({
//         error: 'Unauthorized',
//         message: 'Authentication required'
//       });
//       return;
//     }
//
//     if (user.role !== requiredRole && user.role !== 'admin') {
//       reply.code(403).send({
//         error: 'Forbidden',
//         message: `Requires ${requiredRole} role`
//       });
//       return;
//     }
//   };
// }

// /**
//  * Optional: Rate limiting per user
//  */
// const userRequestCounts = new Map<string, { count: number; resetAt: number }>();
//
// export async function rateLimitByUser(
//   request: FastifyRequest,
//   reply: FastifyReply
// ) {
//   // @ts-ignore
//   const user = request.user;
//
//   if (!user) {
//     return; // Skip rate limiting for unauthenticated requests
//   }
//
//   const userId = user.userId;
//   const now = Date.now();
//
//   // 100 requests per minute per user
//   const RATE_LIMIT = 100;
//   const WINDOW_MS = 60 * 1000;
//
//   let record = userRequestCounts.get(userId);
//
//   if (!record || now > record.resetAt) {
//     record = { count: 0, resetAt: now + WINDOW_MS };
//     userRequestCounts.set(userId, record);
//   }
//
//   record.count++;
//
//   if (record.count > RATE_LIMIT) {
//     reply.code(429).send({
//       error: 'Too Many Requests',
//       message: 'Rate limit exceeded. Please try again later.',
//       retryAfter: Math.ceil((record.resetAt - now) / 1000)
//     });
//     return;
//   }
// }

/**
 * DEMO MODE EXPORTS
 *
 * No-op functions to prevent import errors
 */
export const authenticateUser = async () => {
  // No-op in demo mode
};

export const requireRole = () => async () => {
  // No-op in demo mode
};

export const rateLimitByUser = async () => {
  // No-op in demo mode
};
