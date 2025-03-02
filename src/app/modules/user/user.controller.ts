import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';
const createUser = catchAsync(async (req, res) => {
  const userData = await UserServices.createUserIntoDB(req.body);

  const modifiedUser = {
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

const getUsers = catchAsync(async (req, res) => {
  const order = await UserServices.getUsers();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Users retrieved successfully',
    data: order,
  });
});

const updateUserProfile = catchAsync(async (req, res) => {
  // get the orderId in parmas
  const userId = req.params.userId;
  // take the json body of bike details from response and send it to update function
  const body = { ...req.body };

  const result = await UserServices.updateUserProfile(userId, body);

  // console.log('here', req.user, req.params);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'profile updated successfully',
    data: result,
  });
});

export const UserControllers = {
  createUser,
  getUsers,
  updateUserProfile,
};
