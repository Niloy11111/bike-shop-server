import { model, Schema } from 'mongoose';
import { TCourse } from './course.interface';

const blogSchema = new Schema<TCourse>(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    content: {
      type: String,
      trim: true,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      required: [true, 'User ID is required'],
      unique: true,
      ref: 'User',
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Blog = model<TCourse>('Blog', blogSchema);
