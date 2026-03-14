import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Certification from '@/lib/models/Certification';
import { withAuth } from '@/lib/utils/middleware';

export async function GET() {
  try {
    await connectDB();
    const certifications = await Certification.find({ isActive: true }).sort({ order: 1, issueDate: -1 });
    return NextResponse.json(certifications);
  } catch (error) {
    console.error('Error fetching certifications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch certifications' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  return withAuth(request, async (req) => {
    try {
      await connectDB();
      const data = await req.json();
      const certification = await Certification.create(data);
      return NextResponse.json(certification, { status: 201 });
    } catch (error) {
      console.error('Error creating certification:', error);
      return NextResponse.json(
        { error: 'Failed to create certification' },
        { status: 500 }
      );
    }
  });
}
