import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Skill from '@/lib/models/Skill';
import { withAuth } from '@/lib/utils/middleware';

export async function GET() {
  try {
    await connectDB();
    const skills = await Skill.find({ isActive: true }).sort({ order: 1, name: 1 });
    return NextResponse.json(skills);
  } catch (error) {
    console.error('Error fetching skills:', error);
    return NextResponse.json(
      { error: 'Failed to fetch skills' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  return withAuth(request, async (req) => {
    try {
      await connectDB();
      const data = await req.json();
      const skill = await Skill.create(data);
      return NextResponse.json(skill, { status: 201 });
    } catch (error) {
      console.error('Error creating skill:', error);
      return NextResponse.json(
        { error: 'Failed to create skill' },
        { status: 500 }
      );
    }
  });
}
