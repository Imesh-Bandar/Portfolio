import mongoose, { Schema, Document } from 'mongoose';

export interface IComment extends Document {
  projectId: string;
  author: string;
  email: string;
  content: string;
  isApproved: boolean;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema: Schema = new Schema(
  {
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: true
    },
    author: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    content: {
      type: String,
      required: true
    },
    isApproved: {
      type: Boolean,
      default: false
    },
    isPublished: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Comment ||
  mongoose.model<IComment>('Comment', CommentSchema);
