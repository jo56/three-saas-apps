/**
 * Service-to-Service Authentication Middleware
 *
 * PRODUCTION-READY AUTHENTICATION LAYER (Currently Commented Out)
 *
 * This middleware validates service tokens from Next.js frontend to ensure
 * only authorized services can access the Fastify API endpoints.
 *
 * HOW IT WORKS:
 * 1. Next.js generates a JWT token signed with SERVICE_SECRET
 * 2. Token is sent in X-Service-Token header with each request
 * 3. Fastify validates the token signature and expiration
 * 4. Valid requests proceed; invalid requests get 401 Unauthorized
 *
 * TO ENABLE:
 * 1. Uncomment this entire file
 * 2. Add SERVICE_SECRET to backend/.env
 * 3. Uncomment the middleware registration in src/index.ts
 * 4. Use the authenticated Fastify client in Next.js (see frontend/lib/fastify-client.ts)
 */

// import type { FastifyRequest, FastifyReply } from 'fastify';
// import jwt from 'jsonwebtoken';

// interface ServiceTokenPayload {
//   service: string;
//   iat: number;
//   exp: number;
// }

// /**
//  * Validates the service token from the request header
//  */
// function validateServiceToken(token: string): ServiceTokenPayload | null {
//   try {
//     const secret = process.env.SERVICE_SECRET;

//     if (!secret) {
//       console.error('SERVICE_SECRET is not configured');
//       return null;
//     }

//     // Verify and decode the JWT
//     const decoded = jwt.verify(token, secret) as ServiceTokenPayload;

//     // Validate the service name (should be 'nextjs-frontend')
//     if (decoded.service !== 'nextjs-frontend') {
//       console.error('Invalid service name in token:', decoded.service);
//       return null;
//     }

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
//  * Fastify preHandler hook to authenticate service-to-service requests
//  *
//  * Usage in index.ts:
//  * ```
//  * import { authenticateService } from './middleware/auth.js';
//  * fastify.addHook('preHandler', authenticateService);
//  * ```
//  */
// export async function authenticateService(
//   request: FastifyRequest,
//   reply: FastifyReply
// ) {
//   // Skip authentication for health check endpoint
//   if (request.url === '/health') {
//     return;
//   }

//   // Extract service token from header
//   const serviceToken = request.headers['x-service-token'] as string | undefined;

//   if (!serviceToken) {
//     reply.code(401).send({
//       error: 'Unauthorized',
//       message: 'Missing X-Service-Token header'
//     });
//     return;
//   }

//   // Validate the token
//   const payload = validateServiceToken(serviceToken);

//   if (!payload) {
//     reply.code(401).send({
//       error: 'Unauthorized',
//       message: 'Invalid or expired service token'
//     });
//     return;
//   }

//   // Token is valid - attach service info to request
//   // @ts-ignore - Adding custom property to request
//   request.serviceAuth = {
//     service: payload.service,
//     authenticatedAt: new Date()
//   };

//   // Continue to route handler
// }

// /**
//  * Optional: User-level authentication middleware
//  *
//  * This validates the end-user's JWT token that Next.js passes through.
//  * Use this if you want Fastify to validate user permissions directly.
//  *
//  * Usage:
//  * ```
//  * fastify.get('/api/customers', { preHandler: authenticateUser }, handler);
//  * ```
//  */
// export async function authenticateUser(
//   request: FastifyRequest,
//   reply: FastifyReply
// ) {
//   // Extract user token from Authorization header
//   const authHeader = request.headers.authorization;

//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     reply.code(401).send({
//       error: 'Unauthorized',
//       message: 'Missing or invalid Authorization header'
//     });
//     return;
//   }

//   const userToken = authHeader.replace('Bearer ', '');

//   try {
//     const secret = process.env.JWT_SECRET || process.env.SERVICE_SECRET;

//     if (!secret) {
//       throw new Error('JWT_SECRET not configured');
//     }

//     // Verify user JWT
//     const decoded = jwt.verify(userToken, secret) as any;

//     // Attach user info to request
//     // @ts-ignore
//     request.user = {
//       id: decoded.userId || decoded.id,
//       email: decoded.email,
//       role: decoded.role
//     };

//   } catch (error) {
//     reply.code(401).send({
//       error: 'Unauthorized',
//       message: 'Invalid or expired user token'
//     });
//     return;
//   }
// }

// /**
//  * Rate limiting middleware example
//  *
//  * Additional security layer to prevent abuse
//  */
// const requestCounts = new Map<string, { count: number; resetAt: number }>();

// export async function rateLimitService(
//   request: FastifyRequest,
//   reply: FastifyReply
// ) {
//   const serviceToken = request.headers['x-service-token'] as string;
//   const now = Date.now();

//   // 100 requests per minute per service
//   const RATE_LIMIT = 100;
//   const WINDOW_MS = 60 * 1000;

//   let record = requestCounts.get(serviceToken);

//   if (!record || now > record.resetAt) {
//     record = { count: 0, resetAt: now + WINDOW_MS };
//     requestCounts.set(serviceToken, record);
//   }

//   record.count++;

//   if (record.count > RATE_LIMIT) {
//     reply.code(429).send({
//       error: 'Too Many Requests',
//       message: 'Rate limit exceeded. Please try again later.'
//     });
//     return;
//   }
// }

/**
 * DEMO MODE EXPORT
 *
 * Since everything is commented out, export a no-op function
 * to prevent import errors if someone tries to use this file.
 */
export const authenticateService = async () => {
  // No-op in demo mode
};

export const authenticateUser = async () => {
  // No-op in demo mode
};

export const rateLimitService = async () => {
  // No-op in demo mode
};
