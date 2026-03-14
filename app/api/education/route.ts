import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Education from '@/lib/models/Education';
import { withAuth } from '@/lib/utils/middleware';

export async function GET() {
  try {
    await connectDB();
    const education = await Education.find({ isActive: true }).sort({ order: 1, startDate: -1 });
    return NextResponse.json(education);
  } catch (error) {
    console.error('Error fetching education:', error);
    return NextResponse.json(
      { error: 'Failed to fetch education' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  return withAuth(request, async (req) => {
    try {
      await connectDB();
      const data = await req.json();
      const education = await Education.create(data);
      return NextResponse.json(education, { status: 201 });
    } catch (error) {
      console.error('Error creating education:', error);
      return NextResponse.json(
        { error: 'Failed to create education' },
        { status: 500 }
      );
    }
  });
}
