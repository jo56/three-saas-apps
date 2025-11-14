import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function PricingPage() {
  const plans = [
    {
      name: 'Starter',
      price: '$29',
      description: 'Perfect for small teams getting started',
      features: [
        'Up to 5 team members',
        '10 GB storage',
        'Basic analytics',
        'Email support',
        'Core features',
        'Mobile apps'
      ],
      popular: false
    },
    {
      name: 'Professional',
      price: '$79',
      description: 'For growing businesses with advanced needs',
      features: [
        'Up to 20 team members',
        '100 GB storage',
        'Advanced analytics',
        'Priority support',
        'All features',
        'API access',
        'Custom integrations',
        'Advanced reporting'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large organizations with custom requirements',
      features: [
        'Unlimited team members',
        'Unlimited storage',
        'Enterprise analytics',
        '24/7 phone support',
        'All features',
        'Custom API limits',
        'Dedicated account manager',
        'SLA guarantee',
        'Custom contracts',
        'On-premise options'
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Navigation */}
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary" />
            <span className="font-bold text-xl">SaaS Dashboard</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/features">
              <Button variant="ghost">Features</Button>
            </Link>
            <Link href="/pricing">
              <Button variant="ghost">Pricing</Button>
            </Link>
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/login">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Badge className="mb-4" variant="secondary">
          Simple, Transparent Pricing
        </Badge>
        <h1 className="text-5xl font-bold tracking-tight mb-6">
          Choose the perfect plan
          <br />
          <span className="text-primary">for your team</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          All plans include a 14-day free trial. No credit card required.
          Cancel anytime.
        </p>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={plan.popular ? 'border-primary shadow-lg scale-105' : ''}
            >
              <CardHeader>
                {plan.popular && (
                  <Badge className="w-fit mb-2">Most Popular</Badge>
                )}
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== 'Custom' && (
                    <span className="text-muted-foreground">/month</span>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/login" className="w-full">
                  <Button
                    className="w-full"
                    variant={plan.popular ? 'default' : 'outline'}
                    size="lg"
                  >
                    {plan.price === 'Custom' ? 'Contact Sales' : 'Start Free Trial'}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 pb-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">
              Everything you need to know about our pricing
            </p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I change plans later?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes! You can upgrade or downgrade your plan at any time. Changes take effect
                  immediately, and we'll prorate the charges accordingly.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What payment methods do you accept?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We accept all major credit cards (Visa, MasterCard, American Express) and
                  PayPal. Enterprise customers can also pay via invoice.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Is there a long-term contract?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  No! All plans are month-to-month with no long-term commitment required.
                  You can cancel anytime without penalty.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What happens when I exceed my plan limits?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We'll notify you when you're approaching your limits. You can choose to
                  upgrade your plan or purchase additional capacity as needed.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do you offer discounts for annual billing?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes! Save 20% when you pay annually instead of monthly. Contact our sales
                  team for more information about annual plans.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What's included in the free trial?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  The 14-day free trial includes full access to all Professional plan features.
                  No credit card required to start your trial.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 pb-20">
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Still have questions?</h2>
            <p className="text-lg mb-8 opacity-90">
              Our team is here to help you find the perfect plan
            </p>
            <div className="flex items-center justify-center space-x-4">
              <Link href="/login">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  Start Free Trial
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
              >
                Contact Sales
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; 2024 SaaS Dashboard. Demo project showcasing Next.js SSG capabilities.
          </p>
        </div>
      </footer>
    </div>
  );
}
