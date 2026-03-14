import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Settings from '@/lib/models/Settings';
import { withAuth } from '@/lib/utils/middleware';

export async function GET() {
  try {
    await connectDB();
    let settings = await Settings.findOne();

    // Create default settings if none exist
    if (!settings) {
      settings = await Settings.create({
        theme: {
          primaryBg: '#0C0C08',
          secondaryBg: '#2E2622',
          cardBg: '#C1BFBE',
          borderColor: '#4C4D4E',
          primaryText: '#C1BFBE',
          secondaryText: '#5F5F60',
          buttonBg: '#2E2622',
          buttonText: '#C1BFBE',
          accentColor: '#4C4D4E'
        }
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  return withAuth(request, async (req) => {
    try {
      await connectDB();
      const data = await req.json();

      let settings = await Settings.findOne();

      if (!settings) {
        settings = await Settings.create(data);
      } else {
        settings = await Settings.findOneAndUpdate(
          {},
          { $set: data },
          { returnDocument: 'after', runValidators: true }
        );
      }

      return NextResponse.json(settings);
    } catch (error) {
      console.error('Error updating settings:', error);
      return NextResponse.json(
        { error: 'Failed to update settings' },
        { status: 500 }
      );
    }
  });
}
