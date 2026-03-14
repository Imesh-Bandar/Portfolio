import mongoose, { Schema, Document } from 'mongoose';

export interface IEducation extends Document {
  degree: string;
  institution: string;
  location?: string;
  startDate: Date;
  endDate?: Date;
  isOngoing: boolean;
  grade?: string;
  description?: string;
  achievements?: string[];
  imageUrl?: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const EducationSchema: Schema = new Schema(
  {
    degree: {
      type: String,
      required: [true, 'Degree is required'],
      trim: true,
    },
    institution: {
      type: String,
      required: [true, 'Institution is required'],
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
    },
    endDate: {
      type: Date,
    },
    isOngoing: {
      type: Boolean,
      default: false,
    },
    grade: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    achievements: {
      type: [String],
      default: [],
    },
    imageUrl: {
      type: String,
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

export default mongoose.models.Education ||
  mongoose.model<IEducation>('Education', EducationSchema);
