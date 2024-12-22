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

router.delete('/blogs/:id', auth('user', 'admin'), BlogControllers.deleteBlog);

router.patch(
  '/blogs/:id',
  auth('user', 'admin'),
  validateRequest(BlogValidations.updateBlogValidationSchema),
  BlogControllers.updateBlog,
);

router.get('/blogs', BlogControllers.getAllBlogs);

export const BlogRouter = router;
