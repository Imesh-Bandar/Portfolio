import { NextRequest, NextResponse } from 'next/server';
import { put, del } from '@vercel/blob';
import { withAuth } from '@/lib/utils/middleware';

// Configure route to handle larger uploads (10MB)
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Maximum allowed file size (10MB)
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  return withAuth(request, async (req) => {
    try {
      const formData = await req.formData();
      const file = formData.get('file') as File;

      if (!file) {
        return NextResponse.json(
          { error: 'No file provided' },
          { status: 400 }
        );
      }

      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
      if (!validTypes.includes(file.type)) {
        return NextResponse.json(
          { error: 'Invalid file type. Only images are allowed.' },
          { status: 400 }
        );
      }

      // Validate file size (10MB max)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        return NextResponse.json(
          { error: 'File too large. Maximum size is 10MB.' },
          { status: 400 }
        );
      }

      // Create unique filename
      const timestamp = Date.now();
      const originalName = file.name.replace(/\s+/g, '-');
      const filename = `portfolio/${timestamp}-${originalName}`;

      // Upload to Vercel Blob
      const blob = await put(filename, file, {
        access: 'public',
        addRandomSuffix: false,
      });

      return NextResponse.json({
        success: true,
        url: blob.url,
        filename: filename
      }, { status: 201 });

    } catch (error) {
      console.error('Upload error:', error);
      return NextResponse.json(
        { error: 'Failed to upload file' },
        { status: 500 }
      );
    }
  });
}

export async function DELETE(request: NextRequest) {
  return withAuth(request, async (req) => {
    try {
      const data = await req.json();
      const { url } = data;

      if (!url || typeof url !== 'string') {
        return NextResponse.json({ error: 'No URL provided' }, { status: 400 });
      }

      // Check if it's a Vercel Blob URL
      if (!url.includes('blob.vercel-storage.com') && !url.startsWith('/uploads/')) {
        return NextResponse.json({ error: 'Invalid URL. Only Vercel Blob uploads can be deleted.' }, { status: 400 });
      }

      // Delete from Vercel Blob
      try {
        await del(url);
        return NextResponse.json({ success: true, message: 'File deleted successfully' });
      } catch (deleteError) {
        console.error('Delete error:', deleteError);
        return NextResponse.json({ error: 'File not found or already deleted' }, { status: 404 });
      }
    } catch (error) {
      console.error('Delete error:', error);
      return NextResponse.json(
        { error: 'Failed to delete file' },
        { status: 500 }
      );
    }
  });
}
