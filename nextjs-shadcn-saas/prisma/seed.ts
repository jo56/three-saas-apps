import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.report.deleteMany();
  await prisma.teamMember.deleteMany();
  await prisma.customer.deleteMany();

  console.log('Seeding customers...');

  // Seed Customers
  const customers = [
    {
      name: 'Alice Johnson',
      email: 'alice@techcorp.com',
      company: 'TechCorp Inc',
      status: 'active',
      plan: 'enterprise',
      mrr: 999,
      joinedDate: new Date('2024-01-15'),
      lastActive: new Date('2025-10-09'),
    },
    {
      name: 'Bob Smith',
      email: 'bob@startupxyz.com',
      company: 'StartupXYZ',
      status: 'active',
      plan: 'pro',
      mrr: 299,
      joinedDate: new Date('2024-03-22'),
      lastActive: new Date('2025-10-08'),
    },
    {
      name: 'Carol Williams',
      email: 'carol@designstudio.com',
      company: 'Design Studio',
      status: 'trial',
      plan: 'pro',
      mrr: 0,
      joinedDate: new Date('2025-09-28'),
      lastActive: new Date('2025-10-10'),
    },
    {
      name: 'David Brown',
      email: 'david@ecommerce.com',
      company: 'E-Commerce Co',
      status: 'active',
      plan: 'starter',
      mrr: 99,
      joinedDate: new Date('2024-06-10'),
      lastActive: new Date('2025-10-07'),
    },
    {
      name: 'Emma Davis',
      email: 'emma@consultancy.com',
      company: 'Consultancy Group',
      status: 'inactive',
      plan: 'free',
      mrr: 0,
      joinedDate: new Date('2024-02-01'),
      lastActive: new Date('2025-08-15'),
    },
    {
      name: 'Frank Miller',
      email: 'frank@agency.com',
      company: 'Digital Agency',
      status: 'active',
      plan: 'pro',
      mrr: 299,
      joinedDate: new Date('2024-07-18'),
      lastActive: new Date('2025-10-09'),
    },
    {
      name: 'Grace Lee',
      email: 'grace@saascompany.com',
      company: 'SaaS Company',
      status: 'active',
      plan: 'enterprise',
      mrr: 999,
      joinedDate: new Date('2023-11-05'),
      lastActive: new Date('2025-10-10'),
    },
    {
      name: 'Henry Taylor',
      email: 'henry@fintech.com',
      company: 'FinTech Solutions',
      status: 'trial',
      plan: 'starter',
      mrr: 0,
      joinedDate: new Date('2025-10-01'),
      lastActive: new Date('2025-10-10'),
    },
  ];

  for (const customer of customers) {
    await prisma.customer.create({ data: customer });
  }

  console.log('Seeding team members...');

  // Seed Team Members
  const teamMembers = [
    {
      name: 'John Doe',
      email: 'john@company.com',
      role: 'owner',
      status: 'active',
      joinedDate: new Date('2023-01-01'),
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    },
    {
      name: 'Sarah Connor',
      email: 'sarah@company.com',
      role: 'admin',
      status: 'active',
      joinedDate: new Date('2023-03-15'),
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    },
    {
      name: 'Michael Scott',
      email: 'michael@company.com',
      role: 'member',
      status: 'active',
      joinedDate: new Date('2023-06-20'),
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    },
    {
      name: 'Pam Beesly',
      email: 'pam@company.com',
      role: 'member',
      status: 'active',
      joinedDate: new Date('2023-08-10'),
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pam',
    },
    {
      name: 'Jim Halpert',
      email: 'jim@company.com',
      role: 'viewer',
      status: 'invited',
      joinedDate: new Date('2024-01-05'),
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jim',
    },
  ];

  for (const member of teamMembers) {
    await prisma.teamMember.create({ data: member });
  }

  console.log('Seeding reports...');

  // Seed Reports
  const reports = [
    {
      name: 'Monthly Revenue Report',
      type: 'revenue',
      createdAt: new Date('2025-10-01'),
      lastRun: new Date('2025-10-09'),
      status: 'completed',
      size: '2.4 MB',
    },
    {
      name: 'User Growth Analysis',
      type: 'users',
      createdAt: new Date('2025-09-15'),
      lastRun: new Date('2025-10-10'),
      status: 'running',
      size: '1.8 MB',
    },
    {
      name: 'Engagement Metrics',
      type: 'engagement',
      createdAt: new Date('2025-09-20'),
      lastRun: new Date('2025-10-08'),
      status: 'completed',
      size: '3.1 MB',
    },
    {
      name: 'Performance Dashboard',
      type: 'performance',
      createdAt: new Date('2025-08-10'),
      lastRun: new Date('2025-10-05'),
      status: 'failed',
      size: '0 MB',
    },
    {
      name: 'Quarterly Business Review',
      type: 'revenue',
      createdAt: new Date('2025-07-01'),
      lastRun: new Date('2025-10-01'),
      status: 'completed',
      size: '5.2 MB',
    },
  ];

  for (const report of reports) {
    await prisma.report.create({ data: report });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
