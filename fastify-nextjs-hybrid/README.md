# Fastify + Next.js Hybrid SaaS Platform

A hybrid architecture SaaS platform combining a **Fastify backend** with a **Next.js frontend**.

## Architecture

This version demonstrates a traditional client-server architecture:
- **Backend**: Fastify API server (Port 3001)
- **Frontend**: Next.js app (Port 3000)
- **Communication**: REST API calls from frontend to backend

## Project Structure

```
fastify-nextjs-hybrid/
├── backend/                 # Fastify API server
│   ├── src/
│   │   ├── server.ts       # Main server file
│   │   └── routes/         # API route handlers
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                # Next.js application
│   ├── app/
│   │   ├── (dashboard)/    # Dashboard pages
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/         # Reusable UI components
│   ├── lib/               # Utilities and types
│   ├── next.config.js
│   ├── package.json
│   └── tsconfig.json
│
├── package.json           # Root package for running both servers
└── README.md
```

## Key Differences from Other Versions

### vs. fastify-shadcn-saas
- **Frontend**: Uses Next.js instead of Fastify + Handlebars
- **Rendering**: Client-side React instead of server-side templating
- **Routing**: Next.js App Router instead of Fastify routing
- **State Management**: React hooks and effects for data fetching
- **API**: Fetches from separate backend server (localhost:3001)

### vs. nextjs-shadcn-saas
- **Backend**: Separate Fastify server instead of Next.js API routes
- **API**: External API calls instead of internal routes
- **Deployment**: Two separate services to deploy
- **Scaling**: Backend and frontend can scale independently

## Installation

1. Install all dependencies:
```bash
npm run install:all
```

Or install individually:
```bash
# Root dependencies
npm install

# Backend dependencies
cd backend && npm install

# Frontend dependencies
cd frontend && npm install
```

## Running the Application

### Development Mode

Run both servers concurrently:
```bash
npm run dev
```

This starts:
- **Backend** on http://localhost:3001
- **Frontend** on http://localhost:3000

### Run Individually

Backend only:
```bash
npm run dev:backend
# or
cd backend && npm run dev
```

Frontend only:
```bash
npm run dev:frontend
# or
cd frontend && npm run dev
```

## API Configuration

The frontend is configured to make API calls to `http://localhost:3001/api/*`. All fetch calls in the dashboard pages use this base URL:

```typescript
// Example from dashboard/page.tsx
const response = await fetch('http://localhost:3001/api/dashboard');
```

## Available Routes

### Backend API (Port 3001)
- `GET /api/dashboard` - Dashboard KPIs, activities, and analytics
- `GET /api/analytics` - Analytics data with time series
- `GET /api/customers` - Customer list with filters
- `GET /api/team` - Team members
- `GET /api/reports` - Report list
- `GET /api/billing/plans` - Billing plans
- `GET /api/billing/transactions` - Transaction history

### Frontend Pages (Port 3000)
- `/` - Landing page
- `/dashboard` - Main dashboard
- `/analytics` - Analytics and charts
- `/customers` - Customer management
- `/team` - Team management
- `/reports` - Report generation
- `/billing` - Billing and subscriptions

## Tech Stack

### Backend
- **Fastify** - Fast and low overhead web framework
- **TypeScript** - Type-safe code
- **@fastify/cors** - CORS support for frontend requests

### Frontend
- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type-safe code
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Reusable UI components
- **Recharts** - Charting library
- **Lucide React** - Icon library

## Benefits of Hybrid Architecture

1. **Technology Independence**: Backend and frontend can evolve separately
2. **Team Structure**: Separate teams can work on backend and frontend
3. **Scalability**: Services can be scaled independently
4. **Deployment Flexibility**: Deploy to different environments/servers
5. **API Reusability**: Backend API can serve multiple clients (web, mobile, etc.)
6. **Performance**: Optimized server placement and CDN usage

## Deployment Considerations

- Backend and frontend need separate deployment processes
- Configure CORS properly for production domains
- Use environment variables for API URLs
- Consider API gateway or reverse proxy for production
- Both services need to be running for the app to work

## Development Tips

1. Backend must be running before frontend for API calls to work
2. CORS is enabled on backend for localhost:3000
3. Update API URLs in frontend when deploying to production
4. Use environment variables for configurable settings
