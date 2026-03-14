import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import WorkExperience from '@/lib/models/WorkExperience';
import { withAuth } from '@/lib/utils/middleware';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const experience = await WorkExperience.findById(id);

    if (!experience) {
      return NextResponse.json(
        { error: 'Work experience not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(experience);
  } catch (error) {
    console.error('Error fetching work experience:', error);
    return NextResponse.json(
      { error: 'Failed to fetch work experience' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return withAuth(request, async (req) => {
    try {
      await connectDB();
      const { id } = await params;
      const data = await req.json();
      const experience = await WorkExperience.findByIdAndUpdate(
        id,
        data,
        { new: true, runValidators: true }
      );

      if (!experience) {
        return NextResponse.json(
          { error: 'Work experience not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(experience);
    } catch (error) {
      console.error('Error updating work experience:', error);
      return NextResponse.json(
        { error: 'Failed to update work experience' },
        { status: 500 }
      );
    }
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return withAuth(request, async () => {
    try {
      await connectDB();
      const { id } = await params;
      const experience = await WorkExperience.findByIdAndDelete(id);

      if (!experience) {
        return NextResponse.json(
          { error: 'Work experience not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({ message: 'Work experience deleted successfully' });
    } catch (error) {
      console.error('Error deleting work experience:', error);
      return NextResponse.json(
        { error: 'Failed to delete work experience' },
        { status: 500 }
      );
    }
  });
}
