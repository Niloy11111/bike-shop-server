import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/Querybuilder';
import { AppError } from '../../errors/AppError';
import { BlogSearchableFields } from './blog.contants';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';
import { TCourse } from './course.interface';
const createBlogIntoDB = async (payload: TBlog) => {
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

const updateBlogIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...courseRemainingData } = payload;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    //step1 : basic course info update
    const updateBasicCourseInfo = await Blog.findByIdAndUpdate(
      id,
      courseRemainingData,
      {
        new: true,
        runValidators: true,
        session,
      },
    );

    if (!updateBasicCourseInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, 'failed to update course ');
    }

    //check if there is any pre requisite courses to update
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      //filter out the deleted fields
      const deletedPreRequisites = preRequisiteCourses
        .filter((el) => el.course && el.isDeleted)
        .map((el) => el.course);

      // console.log(deletedPreRequisites);
      const deletedPreRequisiteCourses = await Blog.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: { course: { $in: deletedPreRequisites } },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      if (!deletedPreRequisiteCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, 'failed to update course ');
      }

      //filter out the new course fields
      const newPreRequisites = preRequisiteCourses?.filter(
        (el) => el.course && !el.isDeleted,
      );

      const newPreRequisiteCourses = await Blog.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourses: { $each: newPreRequisites } },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      if (!newPreRequisiteCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, 'failed to update course ');
      }

      const result = await Blog.findById(id);
      return result;
    }

    await session.commitTransaction();
    await session.endSession();
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'failed to update course ');
  }
};

const deleteBlogFromDB = async (id: string) => {
  const result = await Blog.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const blogServices = {
  createBlogIntoDB,
  getAllBlogsFromDB,
  getSingleBlogFromDB,
  deleteBlogFromDB,
  updateBlogIntoDB,
};
