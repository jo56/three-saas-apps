import Fastify from 'fastify';
import cors from '@fastify/cors';
import { prisma } from './lib/prisma.js';
import {
  mockActivities,
  mockAnalyticsData,
  mockKPIs,
  mockBillingPlans,
  mockTransactions
} from './data/mock-data.js';

const fastify = Fastify({
  logger: true
});

// Register CORS
await fastify.register(cors, {
  origin: 'http://localhost:3000' // Next.js default port
});

// Dashboard API
fastify.get('/api/dashboard', async (request, reply) => {
  return {
    kpis: mockKPIs,
    activities: mockActivities,
    analyticsData: mockAnalyticsData
  };
});

// Analytics API
fastify.get('/api/analytics', async (request, reply) => {
  return {
    analyticsData: mockAnalyticsData
  };
});

// Customers API
fastify.get('/api/customers', async (request, reply) => {
  const customers = await prisma.customer.findMany({
    orderBy: { createdAt: 'desc' }
  });
  return customers;
});

fastify.get('/api/customers/:id', async (request, reply) => {
  const { id } = request.params as { id: string };
  const customer = await prisma.customer.findUnique({
    where: { id }
  });

  if (!customer) {
    reply.code(404);
    return { error: 'Customer not found' };
  }

  return customer;
});

// Team API
fastify.get('/api/team', async (request, reply) => {
  const teamMembers = await prisma.teamMember.findMany({
    orderBy: { createdAt: 'desc' }
  });
  return teamMembers;
});

// Reports API
fastify.get('/api/reports', async (request, reply) => {
  const reports = await prisma.report.findMany({
    orderBy: { createdAt: 'desc' }
  });
  return reports;
});

// Billing API
fastify.get('/api/billing/plans', async (request, reply) => {
  return mockBillingPlans;
});

fastify.get('/api/billing/transactions', async (request, reply) => {
  return mockTransactions;
});

// Health check
fastify.get('/health', async (request, reply) => {
  return { status: 'ok', timestamp: new Date().toISOString() };
});

// Start server
const start = async () => {
  try {
    await fastify.listen({ port: 3001, host: '0.0.0.0' });
    console.log('Server is running on http://localhost:3001');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
