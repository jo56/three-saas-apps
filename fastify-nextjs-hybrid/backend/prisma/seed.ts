import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.report.deleteMany();
  await prisma.teamMember.deleteMany();
  await prisma.customer.deleteMany();

  // Seed Customers
  const customers = [
    {
      name: 'John Doe',
      email: 'john@example.com',
      company: 'Acme Corp',
      plan: 'enterprise',
      status: 'active',
      mrr: 999,
      joinedDate: new Date('2024-01-15'),
    },
    {
      name: 'Jane Smith',
      email: 'jane@techstart.com',
      company: 'TechStart Inc',
      plan: 'pro',
      status: 'active',
      mrr: 499,
      joinedDate: new Date('2024-02-20'),
    },
    {
      name: 'Bob Johnson',
      email: 'bob@digitalpro.com',
      company: 'Digital Pro',
      plan: 'starter',
      status: 'trial',
      mrr: 0,
      joinedDate: new Date('2024-03-10'),
    },
    {
      name: 'Alice Williams',
      email: 'alice@cloudsys.com',
      company: 'Cloud Systems',
      plan: 'pro',
      status: 'active',
      mrr: 499,
      joinedDate: new Date('2024-01-05'),
    },
    {
      name: 'Charlie Brown',
      email: 'charlie@dataflow.com',
      company: 'DataFlow LLC',
      plan: 'enterprise',
      status: 'active',
      mrr: 999,
      joinedDate: new Date('2023-12-01'),
    },
    {
      name: 'Diana Prince',
      email: 'diana@webworks.com',
      company: 'Web Works',
      plan: 'starter',
      status: 'inactive',
      mrr: 99,
      joinedDate: new Date('2024-02-15'),
    },
  ];

  for (const customer of customers) {
    await prisma.customer.create({ data: customer });
  }

  // Seed Team Members
  const teamMembers = [
    {
      name: 'Sarah Anderson',
      email: 'sarah@company.com',
      role: 'Engineering Manager',
      department: 'Engineering',
      status: 'active',
      joinedDate: new Date('2023-06-15'),
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    },
    {
      name: 'Michael Chen',
      email: 'michael@company.com',
      role: 'Senior Developer',
      department: 'Engineering',
      status: 'active',
      joinedDate: new Date('2023-08-20'),
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    },
    {
      name: 'Emily Rodriguez',
      email: 'emily@company.com',
      role: 'Product Manager',
      department: 'Product',
      status: 'active',
      joinedDate: new Date('2023-07-10'),
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    },
    {
      name: 'David Kim',
      email: 'david@company.com',
      role: 'UX Designer',
      department: 'Design',
      status: 'active',
      joinedDate: new Date('2023-09-05'),
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    },
    {
      name: 'Lisa Wang',
      email: 'lisa@company.com',
      role: 'Marketing Director',
      department: 'Marketing',
      status: 'active',
      joinedDate: new Date('2023-05-12'),
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
    },
    {
      name: 'James Wilson',
      email: 'james@company.com',
      role: 'Sales Manager',
      department: 'Sales',
      status: 'active',
      joinedDate: new Date('2023-11-01'),
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    },
  ];

  for (const member of teamMembers) {
    await prisma.teamMember.create({ data: member });
  }

  // Seed Reports
  const reports = [
    {
      title: 'Q1 2024 Revenue Report',
      type: 'financial',
      status: 'completed',
      createdBy: 'Sarah Anderson',
      createdDate: new Date('2024-04-01'),
      fileSize: '2.4 MB',
      downloads: 45,
    },
    {
      title: 'Customer Engagement Analysis',
      type: 'analytics',
      status: 'completed',
      createdBy: 'Emily Rodriguez',
      createdDate: new Date('2024-03-28'),
      fileSize: '1.8 MB',
      downloads: 32,
    },
    {
      title: 'Product Performance Metrics',
      type: 'performance',
      status: 'in_progress',
      createdBy: 'Michael Chen',
      createdDate: new Date('2024-04-05'),
      fileSize: '3.1 MB',
      downloads: 12,
    },
    {
      title: 'Marketing Campaign Results',
      type: 'marketing',
      status: 'completed',
      createdBy: 'Lisa Wang',
      createdDate: new Date('2024-03-25'),
      fileSize: '1.5 MB',
      downloads: 28,
    },
    {
      title: 'Sales Pipeline Overview',
      type: 'sales',
      status: 'pending',
      createdBy: 'James Wilson',
      createdDate: new Date('2024-04-06'),
      fileSize: '0.9 MB',
      downloads: 0,
    },
    {
      title: 'User Experience Study',
      type: 'research',
      status: 'completed',
      createdBy: 'David Kim',
      createdDate: new Date('2024-03-20'),
      fileSize: '4.2 MB',
      downloads: 56,
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
