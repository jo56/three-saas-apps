import { NextResponse } from 'next/server';
import { mockCustomers } from '@/lib/mock-data';

export async function GET() {
  return NextResponse.json(mockCustomers);
}
