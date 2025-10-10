import Fastify from 'fastify';
import cors from '@fastify/cors';
import {
  mockCustomers,
  mockTeamMembers,
  mockReports,
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
  origin: 'http://localhost:5173' // Vite default port
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
  return mockCustomers;
});

fastify.get('/api/customers/:id', async (request, reply) => {
  const { id } = request.params as { id: string };
  const customer = mockCustomers.find(c => c.id === id);

  if (!customer) {
    reply.code(404);
    return { error: 'Customer not found' };
  }

  return customer;
});

// Team API
fastify.get('/api/team', async (request, reply) => {
  return mockTeamMembers;
});

// Reports API
fastify.get('/api/reports', async (request, reply) => {
  return mockReports;
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
