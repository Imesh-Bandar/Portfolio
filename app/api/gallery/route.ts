import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Gallery from '@/lib/models/Gallery';
import { verifyToken } from '@/lib/utils/auth';

// GET all gallery items
export async function GET() {
  try {
    await dbConnect();
    const items = await Gallery.find().sort({ order: 1, createdAt: -1 });
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch gallery items' }, { status: 500 });
  }
}

// POST create new gallery item
export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const body = await request.json();
    const item = await Gallery.create(body);
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create gallery item' }, { status: 500 });
  }
}
