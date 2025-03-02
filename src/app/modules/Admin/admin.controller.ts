import catchAsync from '../../utils/catchAsync';

import { adminServices } from './admin.service';

const blockUser = catchAsync(async (req, res) => {
  //   console.log({ user: req.user, params: req.params });

  const id = req.params.userId;

  await adminServices.blockUserFromDB(id);

  res.send({
    success: true,
    message: 'user blocked successfully',
    statusCode: 200,
  });
});

const deleteUserByAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;

  await adminServices.deleteUserByAdminFromDB(id);
  res.send({
    success: true,
    message: 'user deleted successfully',
    statusCode: 200,
  });
});

export const AdminControllers = {
  deleteUserByAdmin,
  blockUser,
};
