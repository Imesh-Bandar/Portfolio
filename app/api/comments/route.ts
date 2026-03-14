import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Comment from '@/lib/models/Comment';
import { withAuth } from '@/lib/utils/middleware';

// GET all comments (admin only - includes unapproved)
export async function GET(request: NextRequest) {
  return withAuth(request, async () => {
    try {
      await connectDB();
      const comments = await Comment.find().sort({ createdAt: -1 });
      return NextResponse.json(comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
      return NextResponse.json(
        { error: 'Failed to fetch comments' },
        { status: 500 }
      );
    }
  });
}

// POST new comment (public - no auth required)
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const data = await request.json();

    const comment = await Comment.create({
      projectId: data.projectId,
      author: data.author,
      email: data.email,
      content: data.content,
      isApproved: false,
      isPublished: false
    });

    return NextResponse.json(
      { message: 'Comment submitted for approval', comment },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 }
    );
  }
}
