import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  imageUrl?: string;
  images?: string[];
  githubUrl?: string;
  liveUrl?: string;
  startDate?: Date;
  endDate?: Date;
  isFeatured: boolean;
  category: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    longDescription: {
      type: String,
      trim: true,
    },
    technologies: {
      type: [String],
      required: [true, 'At least one technology is required'],
    },
    imageUrl: {
      type: String,
      trim: true,
    },
    images: {
      type: [String],
      default: [],
    },
    githubUrl: {
      type: String,
      trim: true,
    },
    liveUrl: {
      type: String,
      trim: true,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Project ||
  mongoose.model<IProject>('Project', ProjectSchema);
