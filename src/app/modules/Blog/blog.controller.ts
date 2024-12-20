import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { blogServices } from './blog.service';

const createBlog = catchAsync(async (req, res) => {
  const result = await blogServices.createBlogIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog is created successfully',
    data: result,
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
  const { id } = req.params;
  const result = await blogServices.deleteBlogFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'blog is deleted successfully',
    data: result,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await blogServices.updateBlogIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'blog is updated successfully',
    data: result,
  });
});

export const BlogControllers = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  deleteBlog,
  updateBlog,
};
