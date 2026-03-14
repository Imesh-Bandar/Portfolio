import mongoose, { Schema, Document } from 'mongoose';

export interface IAbout extends Document {
  title: string;
  description1: string;
  description2: string;
  imageUrl: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const AboutSchema: Schema = new Schema(
  {
    title: {
      type: String,
      default: 'About Me',
    },
    description1: {
      type: String,
      default: `I'm a Trainee Software Engineer at Synergy Information System, currently pursuing my BSc (Hons) in Information Technology at SLIIT (Specialization Phase).`,
    },
    description2: {
      type: String,
      default: `Passionate about building high-performance applications and working with cutting-edge web technologies. I thrive on solving complex problems and creating scalable solutions that make a difference.`,
    },
    imageUrl: {
      type: String,
      default: '',
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

export default mongoose.models.About || mongoose.model<IAbout>('About', AboutSchema);
