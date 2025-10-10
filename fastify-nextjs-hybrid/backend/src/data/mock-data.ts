import type { Customer, TeamMember, Report, Activity, AnalyticsData, KPI, BillingPlan, Transaction } from '../types.js';

export const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@techcorp.com',
    company: 'TechCorp Inc',
    status: 'active',
    plan: 'enterprise',
    mrr: 999,
    joinedDate: '2024-01-15',
    lastActive: '2025-10-09'
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@startupxyz.com',
    company: 'StartupXYZ',
    status: 'active',
    plan: 'pro',
    mrr: 299,
    joinedDate: '2024-03-22',
    lastActive: '2025-10-08'
  },
  {
    id: '3',
    name: 'Carol Williams',
    email: 'carol@designstudio.com',
    company: 'Design Studio',
    status: 'trial',
    plan: 'pro',
    mrr: 0,
    joinedDate: '2025-09-28',
    lastActive: '2025-10-10'
  },
  {
    id: '4',
    name: 'David Brown',
    email: 'david@ecommerce.com',
    company: 'E-Commerce Co',
    status: 'active',
    plan: 'starter',
    mrr: 99,
    joinedDate: '2024-06-10',
    lastActive: '2025-10-07'
  },
  {
    id: '5',
    name: 'Emma Davis',
    email: 'emma@consultancy.com',
    company: 'Consultancy Group',
    status: 'inactive',
    plan: 'free',
    mrr: 0,
    joinedDate: '2024-02-01',
    lastActive: '2025-08-15'
  },
  {
    id: '6',
    name: 'Frank Miller',
    email: 'frank@agency.com',
    company: 'Digital Agency',
    status: 'active',
    plan: 'pro',
    mrr: 299,
    joinedDate: '2024-07-18',
    lastActive: '2025-10-09'
  },
  {
    id: '7',
    name: 'Grace Lee',
    email: 'grace@saascompany.com',
    company: 'SaaS Company',
    status: 'active',
    plan: 'enterprise',
    mrr: 999,
    joinedDate: '2023-11-05',
    lastActive: '2025-10-10'
  },
  {
    id: '8',
    name: 'Henry Taylor',
    email: 'henry@fintech.com',
    company: 'FinTech Solutions',
    status: 'trial',
    plan: 'starter',
    mrr: 0,
    joinedDate: '2025-10-01',
    lastActive: '2025-10-10'
  }
];

export const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@company.com',
    role: 'owner',
    joinedDate: '2023-01-01',
    status: 'active'
  },
  {
    id: '2',
    name: 'Sarah Connor',
    email: 'sarah@company.com',
    role: 'admin',
    joinedDate: '2023-03-15',
    status: 'active'
  },
  {
    id: '3',
    name: 'Michael Scott',
    email: 'michael@company.com',
    role: 'member',
    joinedDate: '2023-06-20',
    status: 'active'
  },
  {
    id: '4',
    name: 'Pam Beesly',
    email: 'pam@company.com',
    role: 'member',
    joinedDate: '2023-08-10',
    status: 'active'
  },
  {
    id: '5',
    name: 'Jim Halpert',
    email: 'jim@company.com',
    role: 'viewer',
    joinedDate: '2024-01-05',
    status: 'invited'
  }
];

export const mockReports: Report[] = [
  {
    id: '1',
    name: 'Monthly Revenue Report',
    type: 'revenue',
    createdAt: '2025-10-01',
    lastRun: '2025-10-09',
    status: 'completed',
    size: '2.4 MB'
  },
  {
    id: '2',
    name: 'User Growth Analysis',
    type: 'users',
    createdAt: '2025-09-15',
    lastRun: '2025-10-10',
    status: 'running',
    size: '1.8 MB'
  },
  {
    id: '3',
    name: 'Engagement Metrics',
    type: 'engagement',
    createdAt: '2025-09-20',
    lastRun: '2025-10-08',
    status: 'completed',
    size: '3.1 MB'
  },
  {
    id: '4',
    name: 'Performance Dashboard',
    type: 'performance',
    createdAt: '2025-08-10',
    lastRun: '2025-10-05',
    status: 'failed',
    size: '0 MB'
  },
  {
    id: '5',
    name: 'Quarterly Business Review',
    type: 'revenue',
    createdAt: '2025-07-01',
    lastRun: '2025-10-01',
    status: 'completed',
    size: '5.2 MB'
  }
];

export const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'signup',
    description: 'New user signed up',
    timestamp: '2025-10-10T10:30:00Z',
    user: 'Grace Lee'
  },
  {
    id: '2',
    type: 'payment',
    description: 'Payment received from TechCorp Inc',
    timestamp: '2025-10-10T09:15:00Z',
    user: 'Alice Johnson'
  },
  {
    id: '3',
    type: 'upgrade',
    description: 'User upgraded to Pro plan',
    timestamp: '2025-10-09T16:45:00Z',
    user: 'Bob Smith'
  },
  {
    id: '4',
    type: 'support',
    description: 'Support ticket opened',
    timestamp: '2025-10-09T14:20:00Z',
    user: 'Carol Williams'
  },
  {
    id: '5',
    type: 'login',
    description: 'User logged in',
    timestamp: '2025-10-09T11:00:00Z',
    user: 'David Brown'
  }
];

export const mockAnalyticsData: AnalyticsData[] = [
  { date: '2025-09-01', revenue: 45000, users: 1250, conversions: 42, churn: 3.2 },
  { date: '2025-09-05', revenue: 48000, users: 1280, conversions: 45, churn: 3.0 },
  { date: '2025-09-10', revenue: 52000, users: 1320, conversions: 48, churn: 2.8 },
  { date: '2025-09-15', revenue: 55000, users: 1380, conversions: 52, churn: 2.5 },
  { date: '2025-09-20', revenue: 58000, users: 1420, conversions: 55, churn: 2.4 },
  { date: '2025-09-25', revenue: 61000, users: 1480, conversions: 58, churn: 2.2 },
  { date: '2025-09-30', revenue: 64000, users: 1520, conversions: 62, churn: 2.1 },
  { date: '2025-10-05', revenue: 67000, users: 1580, conversions: 65, churn: 2.0 },
  { date: '2025-10-10', revenue: 71000, users: 1650, conversions: 70, churn: 1.9 }
];

export const mockKPIs: KPI[] = [
  {
    title: 'Total Revenue',
    value: '$71,000',
    change: 12.5,
    trend: 'up'
  },
  {
    title: 'Active Users',
    value: '1,650',
    change: 8.6,
    trend: 'up'
  },
  {
    title: 'Conversion Rate',
    value: '4.24%',
    change: 2.1,
    trend: 'up'
  },
  {
    title: 'Churn Rate',
    value: '1.9%',
    change: -0.3,
    trend: 'down'
  }
];

export const mockBillingPlans: BillingPlan[] = [
  {
    id: '1',
    name: 'Free',
    price: 0,
    interval: 'month',
    features: [
      'Up to 10 users',
      'Basic analytics',
      'Email support',
      '1GB storage'
    ]
  },
  {
    id: '2',
    name: 'Starter',
    price: 99,
    interval: 'month',
    features: [
      'Up to 50 users',
      'Advanced analytics',
      'Priority email support',
      '10GB storage',
      'API access'
    ]
  },
  {
    id: '3',
    name: 'Pro',
    price: 299,
    interval: 'month',
    popular: true,
    features: [
      'Up to 200 users',
      'Advanced analytics',
      '24/7 chat support',
      '100GB storage',
      'API access',
      'Custom integrations',
      'Advanced security'
    ]
  },
  {
    id: '4',
    name: 'Enterprise',
    price: 999,
    interval: 'month',
    features: [
      'Unlimited users',
      'Custom analytics',
      'Dedicated support',
      'Unlimited storage',
      'API access',
      'Custom integrations',
      'Advanced security',
      'SLA guarantee',
      'Custom training'
    ]
  }
];

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '2025-10-01',
    description: 'Enterprise Plan - TechCorp Inc',
    amount: 999,
    status: 'completed'
  },
  {
    id: '2',
    date: '2025-10-01',
    description: 'Pro Plan - Digital Agency',
    amount: 299,
    status: 'completed'
  },
  {
    id: '3',
    date: '2025-09-15',
    description: 'Pro Plan - StartupXYZ',
    amount: 299,
    status: 'completed'
  },
  {
    id: '4',
    date: '2025-09-10',
    description: 'Starter Plan - E-Commerce Co',
    amount: 99,
    status: 'completed'
  },
  {
    id: '5',
    date: '2025-09-05',
    description: 'Enterprise Plan - SaaS Company',
    amount: 999,
    status: 'completed'
  },
  {
    id: '6',
    date: '2025-10-10',
    description: 'Pro Plan - Design Studio',
    amount: 299,
    status: 'pending'
  }
];
