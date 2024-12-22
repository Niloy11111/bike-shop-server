import catchAsync from '../../utils/catchAsync';

import { adminServices } from './admin.service';

const blockUser = catchAsync(async (req, res) => {
  //   console.log({ user: req.user, params: req.params });

  const id = req.params.userId;

  await adminServices.blockUserFromDB(id);

  // const { id } = req.params;
  // const authorId = req?.user?._id;

  // const findBlog = await Blog.findById(id);

  // if (findBlog?.author.toString() !== authorId) {
  //   throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
  // }

  // const blog = await adminServices.blockUserFromDB(id, { isBlocked : true });

  // console.log('here', req.user, req.params);

  res.send({
    success: true,
    message: 'user blocked successfully',
    statusCode: 200,
  });
});

const deleteBlogByAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;

  await adminServices.deleteBlogByAdminFromDB(id);
  res.send({
    success: true,
    message: 'blog deleted successfully',
    statusCode: 200,
  });
});

export const AdminControllers = {
  deleteBlogByAdmin,
  blockUser,
};
