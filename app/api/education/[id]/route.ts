import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Education from '@/lib/models/Education';
import { withAuth } from '@/lib/utils/middleware';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const education = await Education.findById(id);

    if (!education) {
      return NextResponse.json(
        { error: 'Education not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(education);
  } catch (error) {
    console.error('Error fetching education:', error);
    return NextResponse.json(
      { error: 'Failed to fetch education' },
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
      const education = await Education.findByIdAndUpdate(
        id,
        data,
        { new: true, runValidators: true }
      );

      if (!education) {
        return NextResponse.json(
          { error: 'Education not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(education);
    } catch (error) {
      console.error('Error updating education:', error);
      return NextResponse.json(
        { error: 'Failed to update education' },
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
      const education = await Education.findByIdAndDelete(id);

      if (!education) {
        return NextResponse.json(
          { error: 'Education not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({ message: 'Education deleted successfully' });
    } catch (error) {
      console.error('Error deleting education:', error);
      return NextResponse.json(
        { error: 'Failed to delete education' },
        { status: 500 }
      );
    }
  });
}
