import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Technology from '@/lib/models/Technology';
import { withAuth } from '@/lib/utils/middleware';

export async function GET() {
  try {
    await connectDB();
    const technologies = await Technology.find({ isActive: true }).sort({ order: 1, name: 1 });
    return NextResponse.json(technologies);
  } catch (error) {
    console.error('Error fetching technologies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch technologies' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  return withAuth(request, async (req) => {
    try {
      await connectDB();
      const data = await req.json();
      const technology = await Technology.create(data);
      return NextResponse.json(technology, { status: 201 });
    } catch (error) {
      console.error('Error creating technology:', error);
      return NextResponse.json(
        { error: 'Failed to create technology' },
        { status: 500 }
      );
    }
  });
}
