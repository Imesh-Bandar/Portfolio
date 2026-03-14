import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkExperience extends Document {
  company: string;
  position: string;
  duration: string;
  startDate: string;
  endDate?: string;
  description: string;
  technologies: string[];
  location?: string;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const WorkExperienceSchema: Schema = new Schema(
  {
    company: {
      type: String,
      required: true,
      trim: true,
    },
    position: {
      type: String,
      required: true,
      trim: true,
    },
    duration: {
      type: String,
      required: true,
      trim: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    technologies: {
      type: [String],
      default: [],
    },
    location: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.WorkExperience ||
  mongoose.model<IWorkExperience>('WorkExperience', WorkExperienceSchema);
