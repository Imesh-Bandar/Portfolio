import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import About from '@/lib/models/About';
import { withAuth } from '@/lib/utils/middleware';

export async function GET() {
  try {
    await connectDB();
    let about = await About.findOne({ isActive: true });
    
    if (!about) {
      about = await About.create({
        title: 'About Me',
        description1: `I'm a Trainee Software Engineer at Synergy Information System, currently pursuing my BSc (Hons) in Information Technology at SLIIT (Specialization Phase).`,
        description2: `Passionate about building high-performance applications and working with cutting-edge web technologies. I thrive on solving complex problems and creating scalable solutions that make a difference.`,
        imageUrl: '',
        isActive: true,
      });
    }

    return NextResponse.json(about);
  } catch (error) {
    console.error('Error fetching about data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch about data' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  return withAuth(request, async (req) => {
    try {
      await connectDB();
      const data = await req.json();
      
      let about = await About.findOne({ isActive: true });
      if (!about) {
        about = await About.create(data);
      } else {
        Object.assign(about, data);
        await about.save();
      }

      return NextResponse.json(about);
    } catch (error) {
      console.error('Error updating about data:', error);
      return NextResponse.json(
        { error: 'Failed to update about data' },
        { status: 500 }
      );
    }
  });
}
