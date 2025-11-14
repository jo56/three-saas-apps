/**
 * Pricing Page Placeholder
 *
 * For the complete pricing page, copy content from:
 * nextjs-shadcn-saas/app/pricing/page.tsx
 *  OR
 * fastify-nextjs-hybrid/frontend/app/pricing/page.tsx
 *
 * Replace:
 * - `import Link from 'next/link'` → `import { Link } from 'react-router-dom'`
 * - `<Link href="/...">` → `<Link to="/...">`
 * - `export default function` → `export default function` (no change needed)
 */

import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted p-8">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Pricing Page</h1>
          <p className="text-muted-foreground mb-6">
            This is a placeholder. Copy content from nextjs-shadcn-saas/app/pricing/page.tsx
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/features">
              <Button variant="outline">← View Features</Button>
            </Link>
            <Link to="/login">
              <Button>Get Started →</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
