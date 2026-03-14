import mongoose, { Schema, Document } from 'mongoose';

export interface IModule {
  name: string;
  description?: string;
  completedDate?: Date;
  certificateUrl?: string;
}

export interface ICertification extends Document {
  title: string;
  issuer: string;
  issueDate: Date;
  expiryDate?: Date;
  credentialId?: string;
  credentialUrl?: string;
  description?: string;
  imageUrl?: string;
  isCourse: boolean;
  modules?: IModule[];
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ModuleSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  completedDate: {
    type: Date
  },
  certificateUrl: {
    type: String,
    trim: true
  }
});

const CertificationSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    issuer: {
      type: String,
      required: [true, 'Issuer is required'],
      trim: true,
    },
    issueDate: {
      type: Date,
      required: [true, 'Issue date is required'],
    },
    expiryDate: {
      type: Date,
    },
    credentialId: {
      type: String,
      trim: true,
    },
    credentialUrl: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
      trim: true,
    },
    isCourse: {
      type: Boolean,
      default: false,
    },
    modules: {
      type: [ModuleSchema],
      default: []
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

export default mongoose.models.Certification ||
  mongoose.model<ICertification>('Certification', CertificationSchema);
