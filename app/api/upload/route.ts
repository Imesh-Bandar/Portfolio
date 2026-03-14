import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir, unlink } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { withAuth } from '@/lib/utils/middleware';

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

      // Validate file size (5MB max)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        return NextResponse.json(
          { error: 'File too large. Maximum size is 5MB.' },
          { status: 400 }
        );
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Create unique filename
      const timestamp = Date.now();
      const originalName = file.name.replace(/\s+/g, '-');
      const filename = `${timestamp}-${originalName}`;

      // Ensure upload directory exists
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      if (!existsSync(uploadDir)) {
        await mkdir(uploadDir, { recursive: true });
      }

      // Save file
      const filepath = path.join(uploadDir, filename);
      await writeFile(filepath, buffer);

      // Return public URL
      const publicUrl = `/uploads/${filename}`;

      return NextResponse.json({
        success: true,
        url: publicUrl,
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

      // Check if it's a local upload
      if (!url.startsWith('/uploads/')) {
        return NextResponse.json({ error: 'Invalid URL. Only local uploads can be deleted.' }, { status: 400 });
      }

      const filename = url.replace('/uploads/', '');
      const filepath = path.join(process.cwd(), 'public', 'uploads', filename);

      if (existsSync(filepath)) {
        await unlink(filepath);
        return NextResponse.json({ success: true, message: 'File deleted successfully' });
      } else {
        return NextResponse.json({ error: 'File not found' }, { status: 404 });
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
