import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import WorkExperience from '@/lib/models/WorkExperience';
import { withAuth } from '@/lib/utils/middleware';

export async function GET() {
  try {
    await connectDB();
    const experiences = await WorkExperience.find({ isActive: true })
      .sort({ order: 1, startDate: -1 });
    return NextResponse.json(experiences);
  } catch (error) {
    console.error('Error fetching work experiences:', error);
    return NextResponse.json(
      { error: 'Failed to fetch work experiences' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  return withAuth(request, async (req) => {
    try {
      await connectDB();
      const data = await req.json();
      const experience = await WorkExperience.create(data);
      return NextResponse.json(experience, { status: 201 });
    } catch (error) {
      console.error('Error creating work experience:', error);
      return NextResponse.json(
        { error: 'Failed to create work experience' },
        { status: 500 }
      );
    }
  });
}
