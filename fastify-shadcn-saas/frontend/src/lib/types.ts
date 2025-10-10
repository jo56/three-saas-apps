export interface Customer {
  id: string;
  name: string;
  email: string;
  company: string;
  status: 'active' | 'inactive' | 'trial';
  plan: 'free' | 'starter' | 'pro' | 'enterprise';
  mrr: number;
  joinedDate: string;
  lastActive: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'admin' | 'member' | 'viewer';
  avatar?: string;
  joinedDate: string;
  status: 'active' | 'invited' | 'inactive';
}

export interface Report {
  id: string;
  name: string;
  type: 'revenue' | 'users' | 'engagement' | 'performance';
  createdAt: string;
  lastRun: string;
  status: 'completed' | 'running' | 'failed';
  size: string;
}

export interface Activity {
  id: string;
  type: 'login' | 'payment' | 'signup' | 'upgrade' | 'support';
  description: string;
  timestamp: string;
  user?: string;
}

export interface AnalyticsData {
  date: string;
  revenue: number;
  users: number;
  conversions: number;
  churn: number;
}

export interface KPI {
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down';
}

export interface BillingPlan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  popular?: boolean;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
}
