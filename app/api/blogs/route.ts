import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Blog from '@/lib/models/Blog';
import { verifyToken } from '@/lib/utils/auth';

// GET all blogs (public can see published, admin can see all)
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const token = request.headers.get('authorization')?.split(' ')[1];
    const isAdmin = token && verifyToken(token);

    // If not admin, only show published blogs
    const query = isAdmin ? {} : { isPublished: true };
    const blogs = await Blog.find(query).sort({ publishedAt: -1, createdAt: -1 });

    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

// POST create new blog
export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const body = await request.json();

    // Generate slug from title if not provided
    if (!body.slug) {
      body.slug = body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    // Calculate read time (approx 200 words per minute)
    if (body.content) {
      const words = body.content.split(/\s+/).length;
      body.readTime = Math.ceil(words / 200);
    }

    body.updatedAt = new Date();

    const blog = await Blog.create(body);
    return NextResponse.json(blog, { status: 201 });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json({ error: 'Blog with this slug already exists' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
  }
}
