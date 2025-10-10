import { NextResponse } from 'next/server';
import { mockKPIs, mockActivities, mockAnalyticsData } from '@/lib/mock-data';

export async function GET() {
  return NextResponse.json({
    kpis: mockKPIs,
    activities: mockActivities,
    analyticsData: mockAnalyticsData
  });
}
