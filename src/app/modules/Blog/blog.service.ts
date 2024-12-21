import { Types } from 'mongoose';
import QueryBuilder from '../../builder/Querybuilder';
import { BlogSearchableFields } from './blog.contants';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';
const createBlogIntoDB = async (payload: TBlog, authorId: Types.ObjectId) => {
  // set authorId to payload
  payload.author = authorId;
  const result = await Blog.create(payload);
  return result;
};
const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(Blog.find(), query)
    .search(BlogSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await courseQuery.modelQuery;
  return result;
};
const getSingleBlogFromDB = async (id: string) => {
  const result = await Blog.findById(id);
  return result;
};

const updateBlogIntoDB = async (id: string, payload: Partial<TBlog>) => {
  const blog = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return blog;
};

const deleteBlogFromDB = async (id: string) => {
  const blog = await Blog.findByIdAndDelete(id);
  return blog;
};

export const blogServices = {
  createBlogIntoDB,
  getAllBlogsFromDB,
  getSingleBlogFromDB,
  deleteBlogFromDB,
  updateBlogIntoDB,
};
