import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { User } from '../user/user.model';
import { Blog } from './blog.model';
import { blogServices } from './blog.service';

const createBlog = catchAsync(async (req, res) => {
  const authorId = req?.user?._id;
  const author = await User.findById(authorId);
  const blog = await blogServices.createBlogIntoDB(req.body, authorId);

  const modifiedBlog = {
    _id: blog?._id,
    title: blog?.title,
    content: blog?.content,
    author: author,
  };

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Blog is created successfully',
    data: modifiedBlog,
  });
});

const getAllBlogs = catchAsync(async (req, res) => {
  const result = await blogServices.getAllBlogsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'blogs are retrieved successfully',
    data: result,
  });
});

const getSingleBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await blogServices.getSingleBlogFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'blog is retrieved successfully',
    data: result,
  });
});
const deleteBlog = catchAsync(async (req, res) => {
  const authorId = req?.user?._id;
  const { id } = req.params;

  const findBlog = await Blog.findById(id);

  console.log(req.user, findBlog);

  if (findBlog?.author.toString() !== authorId) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
  }

  await blogServices.deleteBlogFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'blog is deleted successfully',
    data: null,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const authorId = req?.user?._id;

  const findBlog = await Blog.findById(id);

  if (findBlog?.author.toString() !== authorId) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
  }

  const blog = await blogServices.updateBlogIntoDB(id, req.body);

  // console.log('here', req.user, req.params);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'blog is updated successfully',
    data: blog,
  });
});

export const BlogControllers = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  deleteBlog,
  updateBlog,
};
