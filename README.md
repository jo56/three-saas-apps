# Three SaaS Architecture Approaches with shadcn/ui

This repository demonstrates three different architectural approaches for building a B2B SaaS application using shadcn/ui components. All three versions look identical but showcase different tech stack architectures.

## Version 1: Full Next.js Stack (`nextjs-shadcn-saas/`)

**Architecture**: Monolithic full-stack framework

### Tech Stack:
- **Frontend**: Next.js 14 (App Router)
- **Backend**: Next.js API Routes
- **Styling**: Tailwind CSS + shadcn/ui
- **Data**: Mock data served via API routes

### Structure:
```
nextjs-shadcn-saas/
├── app/
│   ├── api/                  # Backend API routes
│   │   ├── dashboard/
│   │   ├── analytics/
│   │   ├── customers/
│   │   ├── team/
│   │   ├── reports/
│   │   └── billing/
│   ├── (dashboard)/          # Frontend pages
│   │   ├── dashboard/
│   │   ├── analytics/
│   │   ├── customers/
│   │   ├── team/
│   │   ├── reports/
│   │   ├── billing/
│   │   └── settings/
│   └── page.tsx
├── components/              # shadcn/ui components
└── lib/                     # Utilities and types
```

### How to Run:
```bash
cd nextjs-shadcn-saas
npm install
npm run dev
# Visit http://localhost:3000
```

### Pros:
- Single codebase for frontend and backend
- Excellent DX with hot reload for both
- Built-in optimizations (Image, Font, etc.)
- Easy deployment (Vercel, etc.)
- Server-side rendering capabilities

### Cons:
- Tightly coupled frontend and backend
- Harder to scale teams (full-stack developers needed)
- Backend limited to Node.js/JavaScript

---

## Version 2: Fastify + React Monorepo (`fastify-shadcn-saas/`)

**Architecture**: Separate backend and frontend services in a monorepo

### Tech Stack:
- **Backend**: Fastify (Node.js)
- **Frontend**: React + Vite + React Router
- **Styling**: Tailwind CSS + shadcn/ui
- **Data**: REST API with mock data

### Structure:
```
fastify-shadcn-saas/
├── backend/
│   ├── src/
│   │   ├── index.ts          # Fastify server
│   │   ├── data/             # Mock data
│   │   └── types.ts
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/       # shadcn/ui + layout
│   │   ├── pages/            # React pages
│   │   ├── lib/              # Utils and types
│   │   └── App.tsx
│   └── package.json
└── package.json              # Root with concurrently
```

### How to Run:
```bash
cd fastify-shadcn-saas
npm run install:all
npm run dev
# Backend: http://localhost:3001
# Frontend: http://localhost:5173
```

### Pros:
- Clear separation of concerns
- Independent deployment of frontend/backend
- Backend can be swapped (Python, Go, etc.)
- Easy to scale teams (dedicated frontend/backend devs)
- Flexibility in tech stack evolution

### Cons:
- More complex setup and deployment
- Need CORS configuration
- Two separate codebases to maintain
- More build tooling required

---

## Version 3: Fastify Backend + Next.js Frontend Hybrid (`fastify-nextjs-hybrid/`)

**Architecture**: Best of both worlds - separate API with Next.js frontend

### Tech Stack:
- **Backend**: Fastify (standalone service)
- **Frontend**: Next.js (as a client-side framework, no API routes)
- **Styling**: Tailwind CSS + shadcn/ui
- **Data**: External REST API

### Structure:
```
fastify-nextjs-hybrid/
├── backend/
│   ├── src/
│   │   ├── index.ts          # Fastify server
│   │   ├── data/             # Mock data
│   │   └── types.ts
│   └── package.json
├── frontend/
│   ├── app/
│   │   ├── (dashboard)/      # Next.js pages (client-side)
│   │   └── page.tsx
│   ├── components/           # shadcn/ui components
│   ├── lib/                  # API client + utilities
│   └── next.config.js        # API proxy configuration
└── package.json
```

### How to Run:
```bash
cd fastify-nextjs-hybrid
# Terminal 1 - Backend
cd backend && npm install && npm run dev

# Terminal 2 - Frontend
cd frontend && npm install && npm run dev
# Visit http://localhost:3000
```

### Pros:
- Next.js DX with external API flexibility
- Backend can be any language/framework
- Independent scaling of services
- Can leverage Next.js features (image optimization, etc.)
- Clear API contract

### Cons:
- Can't use Next.js server-side features easily
- Requires API proxy/CORS setup
- More deployment complexity
- Network overhead for API calls

---

## Key Differences

| Feature | Next.js Full-Stack | Fastify+React | Fastify+Next.js |
|---------|-------------------|---------------|-----------------|
| **Coupling** | Tight | Loose | Medium |
| **Deployment** | Single service | Two services | Two services |
| **DX** | Excellent | Good | Excellent |
| **Team Scalability** | Medium | High | High |
| **Backend Flexibility** | Low | High | High |
| **Learning Curve** | Low | Medium | Medium |

## Shared Features

All three versions include:

- **Dashboard** with KPIs, charts, and recent activity
- **Analytics** with multiple chart types and metrics
- **Customers** management with filtering and search
- **Reports** generation and management
- **Team** member management
- **Billing** with plans and transaction history
- **Settings** for account configuration

## When to Use Each

### Choose Next.js Full-Stack when:
- Building an MVP quickly
- Small team of full-stack developers
- Don't need microservices
- Want simplest deployment
- Backend logic is simple

### Choose Fastify+React when:
- Need maximum flexibility
- Have separate frontend/backend teams
- Want to use different backend language later
- Building a complex, scalable system
- Need fine-grained control

### Choose Fastify+Next.js Hybrid when:
- Want Next.js DX but separate backend
- Backend already exists/is managed separately
- Need backend flexibility with frontend ease
- Team knows Next.js but needs API separation

## Development

All versions use the same shadcn/ui components and have identical UI/UX. The mock data is consistent across all three, demonstrating that the user experience is identical regardless of the architectural approach chosen.

## License

MIT
