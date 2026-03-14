import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Certification from '@/lib/models/Certification';
import { withAuth } from '@/lib/utils/middleware';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const certification = await Certification.findById(id);

    if (!certification) {
      return NextResponse.json(
        { error: 'Certification not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(certification);
  } catch (error) {
    console.error('Error fetching certification:', error);
    return NextResponse.json(
      { error: 'Failed to fetch certification' },
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
      const certification = await Certification.findByIdAndUpdate(
        id,
        data,
        { new: true, runValidators: true }
      );

      if (!certification) {
        return NextResponse.json(
          { error: 'Certification not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(certification);
    } catch (error) {
      console.error('Error updating certification:', error);
      return NextResponse.json(
        { error: 'Failed to update certification' },
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
      const certification = await Certification.findByIdAndDelete(id);

      if (!certification) {
        return NextResponse.json(
          { error: 'Certification not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({ message: 'Certification deleted successfully' });
    } catch (error) {
      console.error('Error deleting certification:', error);
      return NextResponse.json(
        { error: 'Failed to delete certification' },
        { status: 500 }
      );
    }
  });
}
