# Docker Deployment Guide

This guide covers deploying the Fastify backend services as Docker containers. Both `fastify-shadcn-saas` and `fastify-nextjs-hybrid` projects are now fully containerized and ready for deployment.

## Table of Contents

- [Quick Start](#quick-start)
- [Local Development](#local-development)
- [Production Deployment](#production-deployment)
- [Container Management](#container-management)
- [Monitoring and Health Checks](#monitoring-and-health-checks)
- [Troubleshooting](#troubleshooting)

---

## Quick Start

### fastify-shadcn-saas

```bash
cd fastify-shadcn-saas

# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f backend

# Stop all services
docker-compose down
```

### fastify-nextjs-hybrid

```bash
cd fastify-nextjs-hybrid

# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f backend

# Stop all services
docker-compose down
```

---

## Local Development

### Development Mode (with docker-compose.yml)

The default `docker-compose.yml` file is optimized for local development and includes:
- PostgreSQL database
- Backend service with auto-seeding
- Exposed ports for easy access

**Starting services:**

```bash
# Start all services
docker-compose up -d

# Rebuild containers (after code changes)
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Stop and remove volumes (fresh start)
docker-compose down -v
```

**Accessing services:**

- **fastify-shadcn-saas**:
  - Backend: http://localhost:3001
  - PostgreSQL: localhost:5432
  - Frontend: http://localhost:5173 (run separately with Vite)

- **fastify-nextjs-hybrid**:
  - Backend: http://localhost:3001
  - PostgreSQL: localhost:5433 (different port to avoid conflicts)
  - Frontend: http://localhost:3000 (run separately with Next.js)

**Testing the API:**

```bash
# Health check
curl http://localhost:3001/health

# Get customers
curl http://localhost:3001/api/customers

# Get team members
curl http://localhost:3001/api/team
```

---

## Production Deployment

### Using docker-compose.prod.yml

Production configuration includes:
- Environment variable management
- Security best practices
- No automatic database seeding
- Optimized for reliability

### Step 1: Configure Environment Variables

Create a `.env.production` file in the backend directory:

**fastify-shadcn-saas/backend/.env.production:**
```env
DATABASE_URL="postgresql://saasuser:STRONG_PASSWORD_HERE@postgres:5432/saasdb?schema=public"
NODE_ENV=production
PORT=3001
```

**fastify-nextjs-hybrid/backend/.env.production:**
```env
DATABASE_URL="postgresql://hybriduser:STRONG_PASSWORD_HERE@postgres:5432/hybriddb?schema=public"
NODE_ENV=production
PORT=3001
```

### Step 2: Set Environment Variables

Create a `.env` file in the project root for Docker Compose:

```env
POSTGRES_PASSWORD=your_strong_password_here
POSTGRES_USER=saasuser  # or hybriduser for fastify-nextjs-hybrid
POSTGRES_DB=saasdb      # or hybriddb for fastify-nextjs-hybrid
BACKEND_PORT=3001
```

### Step 3: Deploy

```bash
# Build and start production services
docker-compose -f docker-compose.prod.yml up -d

# Check status
docker-compose -f docker-compose.prod.yml ps

# View logs
docker-compose -f docker-compose.prod.yml logs -f backend
```

### Step 4: Seed Database (First Time Only)

```bash
# Connect to backend container
docker exec -it fastify-shadcn-backend-prod sh

# Run seed script
npx prisma db seed

# Exit container
exit
```

### Step 5: Verify Deployment

```bash
# Test health endpoint
curl http://localhost:3001/health

# Test API endpoints
curl http://localhost:3001/api/customers
```

---

## Building Docker Images

### Build Locally

```bash
# Navigate to backend directory
cd fastify-shadcn-saas/backend  # or fastify-nextjs-hybrid/backend

# Build image
docker build -t fastify-saas-backend:latest .

# Run container
docker run -d \
  -p 3001:3001 \
  -e DATABASE_URL="postgresql://user:pass@host:5432/db" \
  --name backend \
  fastify-saas-backend:latest
```

### Push to Registry

```bash
# Tag image for your registry
docker tag fastify-saas-backend:latest your-registry.com/fastify-saas-backend:latest

# Push to registry
docker push your-registry.com/fastify-saas-backend:latest
```

---

## Container Management

### Viewing Logs

```bash
# All services
docker-compose logs

# Follow logs
docker-compose logs -f

# Specific service
docker-compose logs backend
docker-compose logs postgres

# Last 100 lines
docker-compose logs --tail=100 backend
```

### Executing Commands in Containers

```bash
# Access backend container shell
docker exec -it fastify-shadcn-backend sh

# Run Prisma commands
docker exec -it fastify-shadcn-backend npx prisma db push
docker exec -it fastify-shadcn-backend npx prisma db seed

# Access PostgreSQL
docker exec -it fastify-shadcn-postgres psql -U saasuser -d saasdb
```

### Updating Services

```bash
# Pull latest code
git pull

# Rebuild and restart
docker-compose up -d --build

# Or for production
docker-compose -f docker-compose.prod.yml up -d --build
```

### Scaling (Production)

```bash
# Scale backend to 3 instances
docker-compose -f docker-compose.prod.yml up -d --scale backend=3

# Note: You'll need a load balancer in front
```

---

## Monitoring and Health Checks

### Health Check Endpoints

Both backends include a `/health` endpoint:

```bash
curl http://localhost:3001/health
```

Response:
```json
{
  "status": "ok",
  "timestamp": "2025-10-12T15:30:00.000Z"
}
```

### Docker Health Checks

Both containers have built-in health checks:

```bash
# View health status
docker ps

# Inspect health
docker inspect --format='{{.State.Health.Status}}' fastify-shadcn-backend
```

### Monitoring with Docker Stats

```bash
# Real-time resource usage
docker stats

# Specific container
docker stats fastify-shadcn-backend
```

---

## Database Management

### Backups

```bash
# Backup database
docker exec fastify-shadcn-postgres pg_dump -U saasuser saasdb > backup.sql

# Restore database
docker exec -i fastify-shadcn-postgres psql -U saasuser -d saasdb < backup.sql
```

### Database Migrations

```bash
# Apply migrations
docker exec -it fastify-shadcn-backend npx prisma db push

# Reset database (CAUTION: Deletes all data)
docker exec -it fastify-shadcn-backend npx prisma db push --force-reset
```

### Accessing Database

```bash
# Using psql
docker exec -it fastify-shadcn-postgres psql -U saasuser -d saasdb

# List tables
\dt

# Query data
SELECT * FROM "Customer";

# Exit
\q
```

---

## Troubleshooting

### Container Won't Start

```bash
# Check logs
docker-compose logs backend

# Check if port is in use
netstat -an | grep 3001  # Linux/Mac
netstat -ano | findstr :3001  # Windows

# Remove and recreate
docker-compose down
docker-compose up -d
```

### Database Connection Issues

```bash
# Verify PostgreSQL is running
docker-compose ps

# Check PostgreSQL logs
docker-compose logs postgres

# Test connection from backend
docker exec -it fastify-shadcn-backend sh
nc -zv postgres 5432
```

### Build Failures

```bash
# Clean build
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# Check Docker disk space
docker system df

# Clean up
docker system prune -a
```

### Permission Issues

```bash
# Fix volume permissions
docker-compose down
sudo chown -R $USER:$USER ./postgres_data
docker-compose up -d
```

### Out of Memory

```bash
# Increase Docker memory limit (Docker Desktop)
# Settings > Resources > Memory

# Or limit container memory
docker-compose up -d --memory="512m"
```

---

## Production Best Practices

### Security

1. **Use strong passwords** for database
2. **Don't expose database ports** publicly in production
3. **Use environment variables** for sensitive data
4. **Enable HTTPS** with reverse proxy (nginx/Traefik)
5. **Run containers as non-root user**
6. **Keep images updated** regularly

### Reliability

1. **Always use `restart: always`** in production
2. **Configure health checks** properly
3. **Set up monitoring** (Prometheus, Grafana)
4. **Implement logging** (ELK stack, CloudWatch)
5. **Regular backups** of database

### Performance

1. **Use connection pooling** in Prisma
2. **Optimize Dockerfile** layers
3. **Use multi-stage builds** (already configured)
4. **Configure resource limits**
5. **Use a CDN** for frontend assets

### Example Nginx Reverse Proxy

```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

---

## Cloud Deployment

### AWS ECS

1. Push images to ECR
2. Create task definitions
3. Configure services
4. Use RDS for PostgreSQL

### Google Cloud Run

1. Push to Container Registry
2. Deploy service
3. Use Cloud SQL for PostgreSQL

### Digital Ocean App Platform

1. Connect GitHub repository
2. Configure build settings
3. Use managed PostgreSQL database

### Docker Swarm

```bash
# Initialize swarm
docker swarm init

# Deploy stack
docker stack deploy -c docker-compose.prod.yml fastify-stack

# View services
docker service ls

# Scale service
docker service scale fastify-stack_backend=3
```

### Kubernetes

Convert docker-compose to Kubernetes manifests:

```bash
# Using kompose
kompose convert -f docker-compose.prod.yml
kubectl apply -f .
```

---

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Fastify Documentation](https://www.fastify.io/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

## Support

For issues related to:
- **Docker setup**: Check Docker logs and this guide
- **Database issues**: See DATABASE_SETUP.md
- **Application issues**: Check backend logs

Good luck with your deployment!
