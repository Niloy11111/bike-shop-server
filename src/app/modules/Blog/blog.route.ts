import express from 'express';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { BlogControllers } from './blog.controller';
import { BlogValidations } from './blog.validation';

const router = express.Router();

router.post(
  '/blogs',
  auth('user', 'admin'),
  validateRequest(BlogValidations.createBlogValidationSchema),
  BlogControllers.createBlog,
);

// router.get(
//   '/:id',
//   auth('student', 'faculty', 'admin'),
//   CourseControllers.getSingleCourse,
// );

// router.delete('/:id', CourseControllers.deleteCourse);

// router.patch(
//   '/:id',
//   auth('admin'),
//   validateRequest(CourseValidations.updateCourseValidationSchema),
//   CourseControllers.updateCourse,
// );

// router.put(
//   '/:courseId/assign-faculties',
//   validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
//   CourseControllers.assignFacultiesWithCourse,
// );

// router.delete(
//   '/:courseId/remove-faculties',
//   auth('admin'),
//   validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
//   CourseControllers.removeFacultiesFromCourse,
// );

// router.get('/', CourseControllers.getAllCourses);

export const BlogRouter = router;
