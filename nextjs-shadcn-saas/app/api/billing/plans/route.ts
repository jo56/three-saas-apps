import { NextResponse } from 'next/server';
import { mockBillingPlans } from '@/lib/mock-data';

export async function GET() {
  return NextResponse.json(mockBillingPlans);
}
