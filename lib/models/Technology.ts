import mongoose, { Schema, Document } from 'mongoose';

export interface ITechnology extends Document {
  name: string;
  category: string;
  iconUrl?: string;
  description?: string;
  color?: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TechnologySchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      unique: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    iconUrl: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    color: {
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

export default mongoose.models.Technology ||
  mongoose.model<ITechnology>('Technology', TechnologySchema);
