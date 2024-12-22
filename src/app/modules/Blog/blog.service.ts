import { Types } from 'mongoose';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';
const createBlogIntoDB = async (payload: TBlog, authorId: Types.ObjectId) => {
  // set authorId to payload
  payload.author = authorId;
  const result = await Blog.create(payload);
  return result;
};
const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
  const queryObj = { ...query };

  let search = '';
  if (query?.search) {
    search = query?.search as string;
  }

  const searchableFields = ['title', 'content'];

  //   filtering
  const excludeFields = ['search', 'content', 'sortBy', 'sortOrder', 'filter'];

  excludeFields.forEach((el) => delete queryObj[el]);

  let filter = '';
  if (query.filter) {
    filter = query?.filter as string;
  }
  const searchQuery = Blog.find({
    $or: searchableFields.map((field) => ({
      [field]: { $regex: search, $options: 'i' },
    })),
    ...(filter && { author: filter }),
  });

  const filterQuery = searchQuery
    .find(queryObj)
    .select('_id title content author')
    .populate('author');

  let sortBy = 'createdAt';

  if (query.sortBy) {
    sortBy = query.sortBy as string;
  }

  if (query?.sortOrder) {
    if (query?.sortOrder === 'desc') sortBy = `-${sortBy}`;
  }

  // console.log(`-${sortBy}`);
  const sortQuery = await filterQuery.sort(sortBy);

  return sortQuery;
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
