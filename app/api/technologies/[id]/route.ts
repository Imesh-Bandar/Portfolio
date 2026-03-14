import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Technology from '@/lib/models/Technology';
import { withAuth } from '@/lib/utils/middleware';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const technology = await Technology.findById(id);

    if (!technology) {
      return NextResponse.json(
        { error: 'Technology not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(technology);
  } catch (error) {
    console.error('Error fetching technology:', error);
    return NextResponse.json(
      { error: 'Failed to fetch technology' },
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
      const technology = await Technology.findByIdAndUpdate(
        id,
        data,
        { new: true, runValidators: true }
      );

      if (!technology) {
        return NextResponse.json(
          { error: 'Technology not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(technology);
    } catch (error) {
      console.error('Error updating technology:', error);
      return NextResponse.json(
        { error: 'Failed to update technology' },
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
      const technology = await Technology.findByIdAndDelete(id);

      if (!technology) {
        return NextResponse.json(
          { error: 'Technology not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({ message: 'Technology deleted successfully' });
    } catch (error) {
      console.error('Error deleting technology:', error);
      return NextResponse.json(
        { error: 'Failed to delete technology' },
        { status: 500 }
      );
    }
  });
}
