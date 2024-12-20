import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';
const createUser = catchAsync(async (req, res, next) => {
  const userData = await UserServices.createUserIntoDB(req.body);

  const modifiedUser = {
    _id: userData?._id,
    name: userData?.name,
    email: userData?.email,
  };
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User created successfully',
    data: modifiedUser,
  });
});

export const UserControllers = {
  createUser,
};
