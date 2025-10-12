# Three SaaS Architecture Approaches with shadcn/ui

This repository demonstrates three different architectural approaches for building a B2B SaaS application using shadcn/ui components. All three versions look identical but showcase different tech stack architectures.

**NEW**: All projects now use **PostgreSQL** with **Prisma ORM** for data persistence! See [DATABASE_SETUP.md](./DATABASE_SETUP.md) for setup instructions.

## Version 1: Full Next.js Stack (`nextjs-shadcn-saas/`)

**Architecture**: Monolithic full-stack framework

### Tech Stack:
- **Frontend**: Next.js 14 (App Router)
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL + Prisma ORM
- **Styling**: Tailwind CSS + shadcn/ui

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

# Start PostgreSQL container
docker-compose up -d

# Install dependencies and setup database
npm install
npm run db:setup

# Start the application
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
- **Database**: PostgreSQL + Prisma ORM
- **Styling**: Tailwind CSS + shadcn/ui

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

# Start PostgreSQL container
docker-compose up -d

# Install dependencies
npm run install:all

# Setup database (from backend directory)
cd backend && npm run db:setup && cd ..

# Start both backend and frontend
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
- **Database**: PostgreSQL + Prisma ORM
- **Styling**: Tailwind CSS + shadcn/ui

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

# Start PostgreSQL container
docker-compose up -d

# Terminal 1 - Backend
cd backend
npm install
npm run db:setup
npm run dev

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

## Database

All three projects now use **PostgreSQL** with **Prisma ORM** for data persistence. Each project has:

- Docker Compose configuration for local PostgreSQL
- Prisma schema with Customer, TeamMember, and Report models
- Database seed scripts with sample data
- Separate database instances on different ports (5432, 5433, 5434)

See **[DATABASE_SETUP.md](./DATABASE_SETUP.md)** for detailed setup instructions.

## Docker Deployment

The Fastify backends are fully containerized and ready for deployment:

- **Multi-stage Docker builds** for optimized production images
- **Docker Compose** configurations for both development and production
- **Health checks** and automatic database migrations
- **Production-ready** configurations with environment variable management

See **[DOCKER_DEPLOYMENT.md](./DOCKER_DEPLOYMENT.md)** for deployment instructions.

## Development

All versions use the same shadcn/ui components and have identical UI/UX. Data is now persisted in PostgreSQL databases, demonstrating real-world data persistence patterns.

## License

MIT
