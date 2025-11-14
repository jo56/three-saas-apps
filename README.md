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

# Install dependencies
npm install

# Setup and seed database
npm run db:setup

# Start the Next.js application
npm run dev
# Visit http://localhost:3000
```

**Note:** Unlike the Fastify projects, this is a monolithic Next.js app where everything runs in one process. Docker only provides the PostgreSQL database.

### Pros:
- Single codebase for frontend and backend
- Excellent DX with hot reload for both
- Built-in optimizations (Image, Font, etc.)
- Easy deployment (Vercel, Netlify, etc.)
- Server-side rendering capabilities
- Simplest architecture to understand and maintain
- Great for marketing pages (SEO-friendly)

### Cons:
- Tightly coupled frontend and backend
- Harder to scale teams (full-stack developers needed)
- Backend limited to Node.js/JavaScript
- API routes slower than dedicated backend frameworks

### Database Notes:
- PostgreSQL runs on port 5434 (different from other projects to avoid conflicts)
- Database must be manually set up with `npm run db:setup`
- No Docker containerization for the Next.js app (runs locally only)

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

**Option 1: Docker (Recommended - Backend + Database)**
```bash
cd fastify-shadcn-saas

# Start PostgreSQL + Backend containers (includes auto-seeding)
docker-compose up -d

# Check logs to verify backend is running
docker-compose logs -f backend

# In a separate terminal, install frontend dependencies and start
cd frontend
npm install
npm run dev
# Frontend: http://localhost:5173
# Backend API: http://localhost:3001
```

**Option 2: Local Development (All services)**
```bash
cd fastify-shadcn-saas

# Start PostgreSQL container only
docker-compose up -d postgres

# Install all dependencies
npm run install:all

# Setup database (from backend directory)
cd backend && npm run db:setup && cd ..

# Start both backend and frontend with concurrently
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
- Docker setup for easy backend deployment

### Cons:
- More complex setup and deployment
- Need CORS configuration
- Two separate codebases to maintain
- More build tooling required

### Database Notes:
- Database is automatically seeded when using Docker
- Backend runs on port 3001, PostgreSQL on port 5432
- No need to run `npm run db:setup` when using Docker

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

**Option 1: Docker (Recommended - Backend + Database)**
```bash
cd fastify-nextjs-hybrid

# Start PostgreSQL + Backend containers (includes auto-seeding)
docker-compose up -d

# Check logs to verify backend is running
docker-compose logs -f backend

# In a separate terminal, install frontend dependencies and start
cd frontend
npm install
npm run dev
# Frontend: http://localhost:3000
# Backend API: http://localhost:3001
```

**Option 2: Local Development (All services)**
```bash
cd fastify-nextjs-hybrid

# Start PostgreSQL container only
docker-compose up -d postgres

# Install all dependencies
npm run install:all

# Setup database (from backend directory)
cd backend && npm run db:setup && cd ..

# Start both backend and frontend with concurrently
npm run dev
# Backend: http://localhost:3001
# Frontend: http://localhost:3000
```

### Pros:
- Next.js DX with external API flexibility
- Backend can be any language/framework
- Independent scaling of services
- Can leverage Next.js features (image optimization, etc.)
- Clear API contract
- Docker setup for easy backend deployment

### Cons:
- Can't use Next.js server-side features easily
- Requires API proxy/CORS setup
- More deployment complexity
- Network overhead for API calls

### Database Notes:
- Database is automatically seeded when using Docker
- Backend runs on port 3001, PostgreSQL on port 5433 (different from fastify-shadcn-saas)
- No need to run `npm run db:setup` when using Docker

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
- Need great SEO for marketing pages
- Want server-side rendering out of the box

### Choose Fastify+React when:
- Need maximum flexibility
- Have separate frontend/backend teams
- Want to use different backend language later
- Building a complex, scalable system
- Need fine-grained control
- SEO is not a priority (dashboard-focused app)

### Choose Fastify+Next.js Hybrid when:
- Want Next.js DX but separate backend
- Backend already exists/is managed separately
- Need backend flexibility with frontend ease
- Team knows Next.js but needs API separation
- Need good SEO with a high-performance API backend

## Database

All three projects now use **PostgreSQL** with **Prisma ORM** for data persistence. Each project has:

- Docker Compose configuration for local PostgreSQL
- Prisma schema with Customer, TeamMember, and Report models
- **Automatic database seeding** when using Docker
- Separate database instances on different ports to avoid conflicts:
  - `nextjs-shadcn-saas`: PostgreSQL on port 5434
  - `fastify-shadcn-saas`: PostgreSQL on port 5432
  - `fastify-nextjs-hybrid`: PostgreSQL on port 5433

### Quick Database Setup

**For Fastify projects (fastify-shadcn-saas, fastify-nextjs-hybrid):**
```bash
# Using Docker (Recommended) - Database is auto-seeded
docker-compose up -d

# Using local development - Manual setup required
docker-compose up -d postgres
cd backend && npm run db:setup && cd ..
```

**For Next.js project (nextjs-shadcn-saas):**
```bash
# Start PostgreSQL container
docker-compose up -d

# Install dependencies (includes tsx for seeding)
npm install

# Setup and seed database (must be run manually)
npm run db:setup
```

**Note:** The Next.js project requires manual database setup - it does not auto-seed on startup like the Fastify projects.

See **[DATABASE_SETUP.md](./DATABASE_SETUP.md)** for detailed setup instructions and troubleshooting.

## Docker Deployment

The Fastify backends (`fastify-shadcn-saas` and `fastify-nextjs-hybrid`) are fully containerized and ready for deployment:

- **Multi-stage Docker builds** for optimized production images
- **Docker Compose** configurations for both development and production
- **Health checks** and automatic database migrations
- **Automatic database seeding** on first run
- **Production-ready** configurations with environment variable management

### Quick Start with Docker

```bash
# For fastify-shadcn-saas
cd fastify-shadcn-saas
docker-compose up -d

# For fastify-nextjs-hybrid
cd fastify-nextjs-hybrid
docker-compose up -d
```

Both will start:
- PostgreSQL database
- Fastify backend API with auto-seeding
- Health checks and monitoring

Then start the frontend separately (see project-specific instructions above).

See **[DOCKER_DEPLOYMENT.md](./DOCKER_DEPLOYMENT.md)** for detailed deployment instructions, production setup, and troubleshooting.

## Development

All versions use the same shadcn/ui components and have identical UI/UX. Data is now persisted in PostgreSQL databases, demonstrating real-world data persistence patterns.

## License

MIT
