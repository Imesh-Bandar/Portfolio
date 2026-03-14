import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Skill from '@/lib/models/Skill';
import { withAuth } from '@/lib/utils/middleware';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const skill = await Skill.findById(id);

    if (!skill) {
      return NextResponse.json(
        { error: 'Skill not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(skill);
  } catch (error) {
    console.error('Error fetching skill:', error);
    return NextResponse.json(
      { error: 'Failed to fetch skill' },
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
      const skill = await Skill.findByIdAndUpdate(
        id,
        data,
        { new: true, runValidators: true }
      );

      if (!skill) {
        return NextResponse.json(
          { error: 'Skill not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(skill);
    } catch (error) {
      console.error('Error updating skill:', error);
      return NextResponse.json(
        { error: 'Failed to update skill' },
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
      const skill = await Skill.findByIdAndDelete(id);

      if (!skill) {
        return NextResponse.json(
          { error: 'Skill not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({ message: 'Skill deleted successfully' });
    } catch (error) {
      console.error('Error deleting skill:', error);
      return NextResponse.json(
        { error: 'Failed to delete skill' },
        { status: 500 }
      );
    }
  });
}
