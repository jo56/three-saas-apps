/**
 * Features Page Placeholder
 *
 * For the complete features page, copy content from:
 * nextjs-shadcn-saas/app/features/page.tsx
 *  OR
 * fastify-nextjs-hybrid/frontend/app/features/page.tsx
 *
 * Replace:
 * - `import Link from 'next/link'` → `import { Link } from 'react-router-dom'`
 * - `<Link href="/...">` → `<Link to="/...">`
 * - `export default function` → `export default function` (no change needed)
 */

import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted p-8">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Features Page</h1>
          <p className="text-muted-foreground mb-6">
            This is a placeholder. Copy content from nextjs-shadcn-saas/app/features/page.tsx
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/">
              <Button variant="outline">← Back Home</Button>
            </Link>
            <Link to="/pricing">
              <Button>View Pricing →</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
