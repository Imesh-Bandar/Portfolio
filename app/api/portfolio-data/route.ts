import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Project from '@/lib/models/Project';
import Skill from '@/lib/models/Skill';
import Technology from '@/lib/models/Technology';
import Certification from '@/lib/models/Certification';
import Education from '@/lib/models/Education';
import WorkExperience from '@/lib/models/WorkExperience';
import Gallery from '@/lib/models/Gallery';
import Blog from '@/lib/models/Blog';
import About from '@/lib/models/About';

// GET all portfolio data in one request
export async function GET() {
  try {
    await connectDB();

    // Fetch all data in parallel for better performance
    const [
      projects,
      skills,
      technologies,
      certifications,
      education,
      workExperiences,
      gallery,
      blogs,
      about,
    ] = await Promise.all([
      Project.find({ isActive: true }).sort({ order: 1 }),
      Skill.find({ isActive: true }).sort({ order: 1 }),
      Technology.find({ isActive: true }).sort({ order: 1 }),
      Certification.find({ isActive: true }).sort({ issueDate: -1 }),
      Education.find({ isActive: true }).sort({ startDate: -1 }),
      WorkExperience.find({ isActive: true }).sort({ startDate: -1 }),
      Gallery.find({ isActive: true }).sort({ uploadDate: -1 }),
      Blog.find({ isActive: true, isPublished: true }).sort({ publishedDate: -1 }),
      About.findOne({ isActive: true }),
    ]);

    return NextResponse.json({
      projects,
      skills,
      technologies,
      certifications,
      education,
      workExperiences,
      gallery,
      blogs,
      about,
      timestamp: new Date().toISOString(), // For cache busting
    });
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch portfolio data' },
      { status: 500 }
    );
  }
}
