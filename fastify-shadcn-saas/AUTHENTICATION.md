# Authentication Guide - fastify-shadcn-saas

This document explains the authentication architecture for the **Vite + React + Fastify** implementation.

## Architecture Overview

Unlike Next.js with server-side middleware, this is a **pure SPA (Single Page Application)** where:
- **React**: Handles routing and UI (client-side only)
- **Fastify**: Handles ALL authentication (login, token validation, user management)
- **Pattern**: User JWT sent directly from browser to Fastify

## Current Demo Mode

### User Flow

```
User visits http://localhost:5173 (landing page)
  ↓
Clicks "Get Started" → /login
  ↓
Enters ANY credentials
  ↓
React calls Fastify /api/auth/login
  ↓
Fastify returns demo JWT token
  ↓
React stores token in localStorage
  ↓
React AuthContext manages user state
  ↓
Can access /dashboard, /customers, etc.
```

**Currently:** All routes accessible without authentication (demo mode)

### Key Files (Demo Mode Active)

**Backend:**
- `backend/src/routes/auth.ts` - Auth endpoints (demo tokens)
- `backend/src/middleware/auth.ts` - JWT validation (commented out)
- `backend/src/index.ts` - Registers auth routes

**Frontend:**
- `frontend/src/contexts/AuthContext.tsx` - User state management
- `frontend/src/components/ProtectedRoute.tsx` - Route guard (disabled)
- `frontend/src/lib/api-client.ts` - API helper (no auth)
- `frontend/src/App.tsx` - Routing configuration

---

## How It Works

### 1. Login Flow

**User Action:** Enters email/password on `/login`

**React (AuthContext):**
```typescript
// frontend/src/contexts/AuthContext.tsx
const login = async (email, password) => {
  const response = await fetch('http://localhost:3001/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });

  const { token, user } = await response.json();

  // Store in localStorage
  localStorage.setItem('auth_token', token);
  localStorage.setItem('auth_user', JSON.stringify(user));

  // Update React state
  setToken(token);
  setUser(user);
};
```

**Fastify (Auth Route):**
```typescript
// backend/src/routes/auth.ts
POST /api/auth/login

// DEMO: Accept any credentials
const token = generateDemoToken(email); // Base64 encoded

// PRODUCTION: Validate credentials
// const user = await validateCredentials(email, password);
// const token = jwt.sign(user, JWT_SECRET);

return { token, user };
```

### 2. Protected Routes

**React Router:**
```typescript
// frontend/src/App.tsx

// DEMO MODE (active):
<Route path="/dashboard" element={<Dashboard />} />

// PRODUCTION MODE (commented):
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

**ProtectedRoute Component:**
```typescript
// frontend/src/components/ProtectedRoute.tsx

// DEMO: Always allows access
return <>{children}</>;

// PRODUCTION (commented): Check authentication
if (!isAuthenticated) {
  return <Navigate to="/login" />;
}
return <>{children}</>;
```

### 3. API Calls

**Demo Mode (active):**
```typescript
// Direct fetch without token
const data = await fetch('http://localhost:3001/api/customers')
  .then(r => r.json());
```

**Production Mode (commented):**
```typescript
// frontend/src/lib/api-client.ts
const token = localStorage.getItem('auth_token');

const data = await fetch('http://localhost:3001/api/customers', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
}).then(r => r.json());
```

---

## Enabling Production Authentication

### Step 1: Generate JWT Secret

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 2: Configure Environment

**Backend: `backend/.env`**
```bash
JWT_SECRET="your-generated-secret-from-step-1"
```

**Frontend: `frontend/.env.local`**
```bash
VITE_API_URL="http://localhost:3001"
```

### Step 3: Install Dependencies

**Backend:**
```bash
cd backend
npm install jsonwebtoken bcrypt
npm install --save-dev @types/jsonwebtoken @types/bcrypt
```

### Step 4: Uncomment Backend Auth

**File: `backend/src/middleware/auth.ts`**
- Uncomment entire file (remove `//` from all production code)

**File: `backend/src/index.ts`** (lines 12, 51)
```typescript
// Uncomment:
import { authenticateUser } from './middleware/auth.js';
await fastify.addHook('preHandler', authenticateUser);
```

**File: `backend/src/routes/auth.ts`**
- Uncomment production validation code
- Comment out demo token generation

### Step 5: Uncomment Frontend Auth

**File: `frontend/src/components/ProtectedRoute.tsx`** (line 47)
- Comment out: `return <>{children}</>;`
- Uncomment the production code block below it

**File: `frontend/src/lib/api-client.ts`**
- Comment out demo `apiClient` export
- Uncomment production `authenticatedFetch` function
- Uncomment production `apiClient` export

**File: `frontend/src/App.tsx`**
- Uncomment line 3: `import { ProtectedRoute } from './components/ProtectedRoute'`
- Wrap dashboard routes with `<ProtectedRoute>`

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

1. Visit `http://localhost:5173`
2. Try accessing `/dashboard` directly → redirects to `/login`
3. Login with any credentials
4. Access dashboard pages
5. Check Network tab: requests have `Authorization: Bearer <token>` header

---

## Architecture Comparison

### vs. Next.js (nextjs-shadcn-saas)

| Aspect | Next.js | React SPA (This Project) |
|--------|---------|--------------------------|
| **Routing** | File-based (App Router) | React Router (client-side) |
| **Auth Check** | Middleware (server-side) | ProtectedRoute (client-side) |
| **Token Storage** | httpOnly cookies | localStorage |
| **API Calls** | Next.js API routes | Direct to Fastify |
| **SSR/SSG** | Yes | No (pure client-side) |
| **SEO** | Excellent | Limited |

### vs. Hybrid (fastify-nextjs-hybrid)

| Aspect | Hybrid | Pure React (This Project) |
|--------|---------|--------------------------|
| **Frontend** | Next.js SSR | React SPA |
| **Auth Layer** | Next.js + Service tokens | React + User JWTs |
| **Complexity** | Higher (2 auth layers) | Lower (1 auth layer) |
| **Deploy** | Next.js + Fastify | Vite static + Fastify |
| **Best For** | Full-stack apps | API-driven SPAs |

---

## Security Considerations

### Demo Mode Weaknesses

❌ **Not Secure:**
- No password validation
- Tokens not cryptographically signed
- No expiration enforcement
- localStorage vulnerable to XSS

✅ **Acceptable For:**
- Local development
- Learning/demo purposes
- Architecture comparison

### Production Best Practices

1. **Use httpOnly Cookies**
   - Move tokens from localStorage to httpOnly cookies
   - Prevents XSS attacks

2. **Add CSRF Protection**
   - Implement CSRF tokens
   - Use SameSite cookie attribute

3. **Implement Refresh Tokens**
   - Short-lived access tokens (15 min)
   - Long-lived refresh tokens (7 days)
   - Store refresh tokens securely in database

4. **Add Rate Limiting**
   - Limit login attempts
   - Prevent brute force attacks

5. **Use HTTPS**
   - All production traffic over HTTPS
   - Secure flag on cookies

---

## Troubleshooting

### "Failed to fetch" errors

**Cause:** Fastify backend not running or CORS issue

**Fix:**
```bash
# Start backend
cd backend && npm run dev

# Check CORS in backend/src/index.ts (line 18)
origin: 'http://localhost:5173' // Must match Vite port
```

### Redirects to login immediately after login

**Cause:** ProtectedRoute enabled but token not saved

**Fix:** Check browser DevTools → Application → Local Storage
- Should see `auth_token` and `auth_user`
- If missing, check AuthContext login function

### API returns 401 Unauthorized

**Cause:** Middleware enabled but frontend not sending token

**Fix:** Ensure api-client.ts is using authenticated version

---

## Complete File Reference

### Backend Files
- `backend/src/routes/auth.ts` - Authentication endpoints
- `backend/src/middleware/auth.ts` - JWT validation middleware
- `backend/src/index.ts` - Server setup & route registration
- `backend/.env.example` - Environment configuration template

### Frontend Files
- `frontend/src/contexts/AuthContext.tsx` - Auth state management
- `frontend/src/components/ProtectedRoute.tsx` - Route protection
- `frontend/src/lib/api-client.ts` - API call helper
- `frontend/src/pages/Login.tsx` - Login page
- `frontend/src/pages/Landing.tsx` - Marketing homepage
- `frontend/src/App.tsx` - Route configuration
- `frontend/.env.example` - Environment configuration

---

## Next Steps

1. **For Demo:** Keep current setup, browse the code to understand patterns
2. **For Production:**
   - Follow "Enabling Production Authentication" steps above
   - Add User model to Prisma schema
   - Implement password hashing with bcrypt
   - Add refresh token rotation
   - Move to httpOnly cookies
3. **For Learning:** Compare with nextjs-shadcn-saas and fastify-nextjs-hybrid

---

## Additional Resources

- [Fastify Authentication Plugin](https://github.com/fastify/fastify-auth)
- [React Router Authentication Example](https://reactrouter.com/en/main/start/examples)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
