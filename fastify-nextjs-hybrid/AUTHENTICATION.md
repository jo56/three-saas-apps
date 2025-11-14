# Authentication Guide

This document explains the authentication architecture in the Fastify + Next.js hybrid application, including both the current **Demo Mode** and the production-ready **Service-to-Service Authentication** pattern.

## Table of Contents

- [Overview](#overview)
- [Current Demo Mode](#current-demo-mode)
- [Production Authentication Architecture](#production-authentication-architecture)
- [How to Enable Production Auth](#how-to-enable-production-auth)
- [Security Considerations](#security-considerations)
- [Troubleshooting](#troubleshooting)

---

## Overview

This application demonstrates two authentication patterns:

1. **User Authentication** (Next.js → User)
   - Handled by Next.js middleware
   - Demo session cookies
   - Protects dashboard routes from unauthorized users

2. **Service-to-Service Authentication** (Next.js → Fastify)
   - JWT tokens between services
   - Protects Fastify API from unauthorized services
   - Currently **commented out** for demo purposes

## Current Demo Mode

### User Authentication Flow

```
User visits / (landing page)
  ↓
Clicks "Get Started" → /login
  ↓
Enters ANY credentials
  ↓
Next.js API sets demo_session cookie
  ↓
Middleware checks cookie
  ↓
Allows access to /dashboard, /customers, etc.
```

**File: `frontend/middleware.ts`**
- Checks for `demo_session=active` cookie
- Redirects unauthenticated users to `/login`
- Allows any email/password combination

**Files: `frontend/app/api/auth/login/route.ts` & `logout/route.ts`**
- Login: Sets `demo_session` cookie
- Logout: Clears `demo_session` cookie

### Next.js → Fastify Communication (Demo Mode)

**Currently:** Direct fetch without authentication

```typescript
// In dashboard pages (e.g., app/(dashboard)/dashboard/page.tsx)
const response = await fetch('http://localhost:3001/api/dashboard');
const data = await response.json();
```

**Security:** None - Fastify accepts all requests
**Works without Fastify running:** Yes (with error handling)

---

## Production Authentication Architecture

### Why Service-to-Service Auth?

In production, you need to:
1. **Prevent unauthorized access** to Fastify APIs
2. **Verify requests** are from legitimate Next.js frontend
3. **Protect against** compromised clients or malicious services
4. **Enable multiple clients** (web, mobile, internal services)

### How It Works

```
User (authenticated)
  ↓
Next.js Frontend (generates service token)
  ↓
HTTP Request with X-Service-Token header
  ↓
Fastify Backend (validates token)
  ↓
Allows/denies request
```

### Components

#### 1. Next.js Service Token Generation

**File: `frontend/lib/fastify-client.ts`** (currently commented)

```typescript
// Generates JWT signed with SERVICE_SECRET
const serviceToken = jwt.sign(
  { service: 'nextjs-frontend', timestamp: Date.now() },
  process.env.SERVICE_SECRET,
  { expiresIn: '5m' }
);

// Adds to request header
headers: {
  'X-Service-Token': serviceToken
}
```

#### 2. Fastify Token Validation

**File: `backend/src/middleware/auth.ts`** (currently commented)

```typescript
// Validates JWT signature and expiration
const decoded = jwt.verify(token, process.env.SERVICE_SECRET);

// Checks service name
if (decoded.service !== 'nextjs-frontend') {
  return 401 Unauthorized
}
```

#### 3. Request Flow

**File: `backend/src/index.ts`** (middleware registration commented)

```typescript
// Applies to all routes except /health
fastify.addHook('preHandler', authenticateService);
```

---

## How to Enable Production Auth

### Step 1: Generate Shared Secret

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

This generates a cryptographically secure random string.

### Step 2: Configure Environment Variables

**Backend: `backend/.env`**
```bash
SERVICE_SECRET="your-generated-secret-from-step-1"
```

**Frontend: `frontend/.env.local`**
```bash
SERVICE_SECRET="your-generated-secret-from-step-1"  # Same as backend!
NEXT_PUBLIC_FASTIFY_URL="http://localhost:3001"
```

⚠️ **IMPORTANT:** Both must use the **exact same secret**

### Step 3: Install jsonwebtoken Package

**Backend:**
```bash
cd backend
npm install jsonwebtoken
npm install --save-dev @types/jsonwebtoken
```

**Frontend:**
```bash
cd frontend
npm install jsonwebtoken
npm install --save-dev @types/jsonwebtoken
```

### Step 4: Uncomment Backend Middleware

**File: `backend/src/middleware/auth.ts`**
- Uncomment the entire file (remove `//` from all lines)
- Keep the exports at the bottom commented if you want (they're overridden)

**File: `backend/src/index.ts`**
```typescript
// Uncomment line 11:
import { authenticateService, rateLimitService } from './middleware/auth.js';

// Uncomment lines 38-41:
await fastify.addHook('preHandler', authenticateService);
await fastify.addHook('preHandler', rateLimitService); // Optional
```

### Step 5: Uncomment Frontend Client

**File: `frontend/lib/fastify-client.ts`**
- Uncomment the production `fastifyFetch` function
- Comment out or remove the demo version

**File: Update Dashboard Pages**

Example: `frontend/app/(dashboard)/dashboard/page.tsx`

```typescript
// Uncomment line 9:
import { fastifyFetch } from '@/lib/fastify-client';

// In useEffect, replace:
const response = await fetch('http://localhost:3001/api/dashboard');
const data = await response.json();

// With:
const data = await fastifyFetch('/api/dashboard');
```

Repeat for:
- `app/(dashboard)/customers/page.tsx`
- `app/(dashboard)/analytics/page.tsx`
- `app/(dashboard)/team/page.tsx`
- `app/(dashboard)/reports/page.tsx`
- `app/(dashboard)/billing/page.tsx`

### Step 6: Restart Servers

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### Step 7: Test

1. Visit `http://localhost:3000`
2. Login (demo credentials work)
3. Navigate to dashboard pages
4. Check browser Network tab:
   - Requests should have `X-Service-Token` header
5. Check Fastify logs:
   - Should see token validation messages

---

## Security Considerations

### Current Demo Mode Security

❌ **Weaknesses:**
- No Fastify authentication
- Anyone can call Fastify APIs directly
- CORS only protects browsers, not servers
- Service tokens not validated

✅ **Acceptable for:**
- Local development
- Learning/demo purposes
- Non-sensitive data

### Production Mode Security

✅ **Protections:**
- Service-to-service authentication
- JWT token expiration (5 minutes)
- Rate limiting (100 req/min)
- Request validation

⚠️ **Still Need:**
- HTTPS in production (not HTTP)
- Proper secret management (AWS Secrets Manager, etc.)
- Network isolation (Fastify not publicly exposed)
- Database connection security
- Real user authentication (not demo cookies)

### Security Best Practices

1. **Secrets Management**
   ```bash
   # Never commit secrets to git
   echo ".env" >> .gitignore
   echo ".env.local" >> .gitignore
   ```

2. **Token Rotation**
   - Rotate SERVICE_SECRET periodically
   - Update both backend and frontend simultaneously

3. **HTTPS Only**
   ```typescript
   // In production
   secure: process.env.NODE_ENV === 'production'
   ```

4. **Network Isolation**
   - Deploy Fastify on internal network
   - Use service mesh (Istio, Linkerd)
   - Next.js as API gateway

5. **Monitoring**
   - Log authentication failures
   - Alert on suspicious patterns
   - Monitor rate limit violations

---

## Troubleshooting

### "Invalid or expired service token"

**Cause:** SERVICE_SECRET mismatch or missing

**Fix:**
```bash
# Check both .env files have same secret
cat backend/.env | grep SERVICE_SECRET
cat frontend/.env.local | grep SERVICE_SECRET
```

### "Failed to fetch dashboard data"

**Cause:** Fastify not running or auth enabled without frontend updates

**Fix:**
```bash
# Make sure Fastify is running
cd backend && npm run dev

# Or disable auth temporarily
# Comment out: fastify.addHook('preHandler', authenticateService);
```

### Token expires too quickly

**Cause:** 5-minute expiration may be too short for long operations

**Fix:** Increase in `frontend/lib/fastify-client.ts`:
```typescript
expiresIn: '15m'  // Changed from '5m'
```

### CORS errors in browser

**Cause:** Fastify CORS origin doesn't match Next.js URL

**Fix:** Update `backend/src/index.ts`:
```typescript
await fastify.register(cors, {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000'
});
```

### Rate limit exceeded

**Cause:** More than 100 requests per minute

**Fix:** Adjust in `backend/src/middleware/auth.ts`:
```typescript
const RATE_LIMIT = 200; // Increased from 100
```

---

## Comparison: Demo vs Production

| Feature | Demo Mode | Production Mode |
|---------|-----------|----------------|
| **User Auth** | Demo cookies | Same (or upgrade to NextAuth.js) |
| **Service Auth** | None | JWT tokens |
| **Fastify Protection** | CORS only | Token validation |
| **Token Expiration** | N/A | 5 minutes |
| **Rate Limiting** | No | 100 req/min |
| **Works Offline** | Yes | No (needs Fastify) |
| **Security Level** | Low | High |
| **Setup Complexity** | Simple | Moderate |
| **Production Ready** | No | Yes |

---

## Next Steps

### For Learning/Demo:
- Keep current setup
- Focus on architecture understanding
- Experiment with different patterns

### For Production Deployment:
1. Enable service-to-service auth (this guide)
2. Replace demo user auth with real provider:
   - [NextAuth.js](https://next-auth.js.org/)
   - [Clerk](https://clerk.com/)
   - [Auth0](https://auth0.com/)
3. Add database user model (Prisma schema)
4. Implement proper password hashing (bcrypt)
5. Add refresh tokens
6. Set up monitoring and logging
7. Configure HTTPS/TLS
8. Use secrets management service
9. Add API key authentication for mobile apps
10. Implement role-based access control (RBAC)

---

## Additional Resources

- [JWT.io - Introduction to JWT](https://jwt.io/introduction)
- [OWASP API Security Top 10](https://owasp.org/www-project-api-security/)
- [Next.js Authentication Patterns](https://nextjs.org/docs/authentication)
- [Fastify Security Best Practices](https://www.fastify.io/docs/latest/Guides/Security/)

---

**Questions or Issues?**

Check the code comments in:
- `backend/src/middleware/auth.ts`
- `frontend/lib/fastify-client.ts`
- `backend/src/index.ts`

All contain detailed explanations and examples.
