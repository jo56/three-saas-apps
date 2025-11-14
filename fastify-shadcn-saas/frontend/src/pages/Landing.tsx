import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

/**
 * Landing Page for fastify-shadcn-saas
 *
 * This is a simplified version. For the full landing page with all features,
 * copy the content from:
 * nextjs-shadcn-saas/app/page.tsx
 *
 * Just replace:
 * - `import Link from 'next/link'` with `import { Link } from 'react-router-dom'`
 * - `<Link href="/...">` with `<Link to="/...">`
 */

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Navigation */}
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary" />
            <span className="font-bold text-xl">SaaS Dashboard</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/features">
              <Button variant="ghost">Features</Button>
            </Link>
            <Link to="/pricing">
              <Button variant="ghost">Pricing</Button>
            </Link>
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/login">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 text-center">
        <Badge className="mb-4" variant="secondary">
          Vite + React + Fastify
        </Badge>
        <h1 className="text-5xl font-bold tracking-tight mb-6">
          Modern SaaS Dashboard
          <br />
          <span className="text-primary">Built for Scale</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          A complete B2B SaaS platform with analytics, customer management, team collaboration,
          and billing. Pure React SPA with Fastify backend.
        </p>
        <div className="flex items-center justify-center space-x-4">
          <Link to="/login">
            <Button size="lg" className="text-lg px-8">
              Get Started Free
            </Button>
          </Link>
          <Link to="/features">
            <Button size="lg" variant="outline" className="text-lg px-8">
              Learn More
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Preview */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Everything You Need</h2>
          <p className="text-muted-foreground">
            Powerful features to manage your entire business
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <CardTitle>Real-time Analytics</CardTitle>
              <CardDescription>
                Track KPIs, monitor performance, and visualize data with beautiful charts
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <CardTitle>Customer Management</CardTitle>
              <CardDescription>
                Manage customers, track interactions, and build lasting relationships
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <CardTitle>Flexible Billing</CardTitle>
              <CardDescription>
                Multiple pricing plans, transaction tracking, and subscription management
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg mb-8 opacity-90">
              Join thousands of teams already using our platform
            </p>
            <Link to="/login">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Start Your Free Trial
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t mt-16">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; 2024 SaaS Dashboard. Demo project showcasing Vite + React + Fastify architecture.
          </p>
        </div>
      </footer>
    </div>
  );
}
