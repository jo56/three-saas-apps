# Database Setup Guide

All three projects in this repository now use **PostgreSQL** with **Prisma ORM** for data persistence. Each project runs its own containerized PostgreSQL database using Docker Compose.

## Prerequisites

- **Docker** and **Docker Compose** installed
- **Node.js** (v18 or higher)
- **npm** or **yarn**

## Overview

Each project has:
- A `docker-compose.yml` file that runs a PostgreSQL container
- A Prisma schema configured for PostgreSQL
- Database scripts for generating, migrating, and seeding data
- Separate PostgreSQL instances on different ports to avoid conflicts

### Port Mapping

- **fastify-shadcn-saas**: PostgreSQL on port `5432`
- **fastify-nextjs-hybrid**: PostgreSQL on port `5433`
- **nextjs-shadcn-saas**: PostgreSQL on port `5434`

---

## 1. fastify-shadcn-saas

### Database Configuration

```env
DATABASE_URL="postgresql://saasuser:saaspass@localhost:5432/saasdb?schema=public"
```

### Setup Steps

```bash
# Navigate to project directory
cd fastify-shadcn-saas

# Start PostgreSQL container
docker-compose up -d

# Navigate to backend
cd backend

# Install dependencies (if not already installed)
npm install

# Setup database (generate Prisma client, push schema, and seed data)
npm run db:setup

# Start the backend
npm run dev
```

### Database Scripts

```bash
npm run db:generate    # Generate Prisma client
npm run db:push        # Push schema to database
npm run db:seed        # Seed database with sample data
npm run db:setup       # Run all three commands in sequence
```

### Verify

- Backend runs on: `http://localhost:3001`
- Test endpoint: `http://localhost:3001/api/customers`

---

## 2. fastify-nextjs-hybrid

### Database Configuration

```env
DATABASE_URL="postgresql://hybriduser:hybridpass@localhost:5433/hybriddb?schema=public"
```

### Setup Steps

```bash
# Navigate to project directory
cd fastify-nextjs-hybrid

# Start PostgreSQL container
docker-compose up -d

# Navigate to backend
cd backend

# Install dependencies (if not already installed)
npm install

# Setup database
npm run db:setup

# Start the backend
npm run dev
```

### Database Scripts (Backend)

```bash
npm run db:generate    # Generate Prisma client
npm run db:push        # Push schema to database
npm run db:seed        # Seed database with sample data
npm run db:setup       # Run all three commands in sequence
```

### Running Frontend

```bash
# In a separate terminal
cd fastify-nextjs-hybrid/frontend
npm install
npm run dev
```

### Verify

- Backend: `http://localhost:3001`
- Frontend: `http://localhost:3000`
- Test endpoint: `http://localhost:3001/api/customers`

---

## 3. nextjs-shadcn-saas

### Database Configuration

```env
DATABASE_URL="postgresql://nextjsuser:nextjspass@localhost:5434/nextjsdb?schema=public"
```

### Setup Steps

```bash
# Navigate to project directory
cd nextjs-shadcn-saas

# Start PostgreSQL container
docker-compose up -d

# Install dependencies (if not already installed)
npm install

# Setup database
npm run db:setup

# Start Next.js application
npm run dev
```

### Database Scripts

```bash
npm run db:generate    # Generate Prisma client
npm run db:push        # Push schema to database
npm run db:seed        # Seed database with sample data
npm run db:setup       # Run all three commands in sequence
```

### Verify

- Application: `http://localhost:3000`
- Test endpoint: `http://localhost:3000/api/customers`

---

## Database Management

### Viewing Database Data

You can connect to each database using any PostgreSQL client:

**fastify-shadcn-saas:**
```bash
psql -h localhost -p 5432 -U saasuser -d saasdb
# Password: saaspass
```

**fastify-nextjs-hybrid:**
```bash
psql -h localhost -p 5433 -U hybriduser -d hybriddb
# Password: hybridpass
```

**nextjs-shadcn-saas:**
```bash
psql -h localhost -p 5434 -U nextjsuser -d nextjsdb
# Password: nextjspass
```

### Stopping Databases

```bash
# In each project directory
docker-compose down

# To also remove volumes (delete all data)
docker-compose down -v
```

### Resetting Database

```bash
# Stop and remove containers with data
docker-compose down -v

# Start fresh
docker-compose up -d

# Re-setup database
npm run db:setup
```

---

## Prisma Schema

All three projects share a similar schema with the following models:

### Customer Model
```prisma
model Customer {
  id         String   @id @default(uuid())
  name       String
  email      String   @unique
  company    String
  status     String
  plan       String
  mrr        Int
  joinedDate DateTime @default(now())
  lastActive DateTime @default(now())
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}
```

### TeamMember Model
```prisma
model TeamMember {
  id         String   @id @default(uuid())
  name       String
  email      String   @unique
  role       String
  avatar     String?
  joinedDate DateTime @default(now())
  status     String
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}
```

### Report Model
```prisma
model Report {
  id        String   @id @default(uuid())
  name      String
  type      String
  createdAt DateTime @default(now())
  lastRun   DateTime @default(now())
  status    String
  size      String
  updatedAt DateTime @updatedAt
}
```

---

## API Endpoints

All three projects expose the following endpoints:

### Customers
- `GET /api/customers` - List all customers
- `GET /api/customers/:id` - Get customer by ID

### Team
- `GET /api/team` - List all team members

### Reports
- `GET /api/reports` - List all reports

### Other Endpoints
- `GET /api/dashboard` - Dashboard data (KPIs, activities, analytics)
- `GET /api/analytics` - Analytics data
- `GET /api/billing/plans` - Billing plans (still using mock data)
- `GET /api/billing/transactions` - Transactions (still using mock data)

---

## Troubleshooting

### Port Already in Use

If you get a port conflict, you can change the port in `docker-compose.yml`:

```yaml
ports:
  - "5435:5432"  # Change the first number
```

Then update your `.env` file with the new port.

### Connection Refused

Make sure:
1. Docker is running
2. PostgreSQL container is running: `docker ps`
3. Database is ready: `docker-compose logs postgres`

### Prisma Client Not Generated

Run:
```bash
npm run db:generate
```

### Schema Out of Sync

If you modify the Prisma schema, run:
```bash
npm run db:push
```

---

## Running All Projects Simultaneously

You can run all three projects at the same time since they use different ports:

```bash
# Terminal 1 - fastify-shadcn-saas
cd fastify-shadcn-saas
docker-compose up -d
cd backend && npm run dev

# Terminal 2 - fastify-nextjs-hybrid backend
cd fastify-nextjs-hybrid
docker-compose up -d
cd backend && npm run dev

# Terminal 3 - fastify-nextjs-hybrid frontend
cd fastify-nextjs-hybrid/frontend && npm run dev

# Terminal 4 - nextjs-shadcn-saas
cd nextjs-shadcn-saas
docker-compose up -d
npm run dev
```

All databases and applications will run concurrently without conflicts!
