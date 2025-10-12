import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const teamMembers = await prisma.teamMember.findMany({
    orderBy: { createdAt: 'desc' }
  });
  return NextResponse.json(teamMembers);
}
