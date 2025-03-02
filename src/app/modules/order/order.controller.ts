import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { AppError } from '../../errors/AppError';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { orderService } from './order.service';

const createOrder = catchAsync(async (req, res) => {
  const user = req?.user;
  // console.log('user', user);
  // const user = {
  //   _id: '67af72dd0dad6065be588c3e',
  //   name: 'Ehtisam',
  //   email: 'xyz@gmail.com',
  //   role: 'user',
  //   phone: '012345678901',
  //   address: 'N/A',
  //   city: 'N/A',
  //   createdAt: '2025-02-14T16:44:13.136Z',
  //   updatedAt: '2025-02-14T16:44:13.136Z',
  //   __v: 0,
  // };

  // console.log(req);
  const order = await orderService.createOrder(user, req.body, req.ip!);
  console.log(req.ip);

  console.log('order', order);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Order placed successfully',
    data: order,
  });
});

const getOrders = catchAsync(async (req, res) => {
  const { todaySales, ordersData, revenueData, customerExpenseData } =
    await orderService.getOrders();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message:
      'Order, revenue data, customer expense data, and today’s sales retrieved successfully',
    data: {
      todaySales,
      ordersData,
      revenueData,
      customerExpenseData,
    },
  });
});

const getSingleOrder = catchAsync(async (req, res) => {
  // get the _id of bike in params to retrieve the correct bike
  const orderId = req.params.orderId;
  // check if the orderId is valid _id from bikes collection
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid product ID');
  }

  const result = await orderService.getSingleOrder(orderId);

  if (result === null) {
    throw new AppError(httpStatus.NOT_FOUND, 'Bike not found');
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'order retrieved successfully',
    data: result,
  });
});

const verifyPayment = catchAsync(async (req, res) => {
  const order = await orderService.verifyPayment(req.query.order_id as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Order verified successfully',
    data: order,
  });
});

const updateOrder = catchAsync(async (req, res) => {
  // get the orderId in parmas
  const orderId = req.params.orderId;
  // take the json body of bike details from response and send it to update function
  const body = { ...req.body };

  if (req.body.estimatedDeliveryDate) {
    body.estimatedDeliveryDate = req.body.estimatedDeliveryDate;
  }

  const result = await orderService.updateOrder(orderId, body);

  // console.log('here', req.user, req.params);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'order updated successfully',
    data: result,
  });
});

const deleteOrder = catchAsync(async (req, res) => {
  // get the productId from params and send it to delete function
  const orderId = req.params.orderId;
  // check if the orderId is valid _id from bikes collection
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid product ID');
  }
  await orderService.deleteOrder(orderId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order deleted successfully',
    data: null,
  });
});

export const orderController = {
  updateOrder,
  deleteOrder,
  createOrder,
  verifyPayment,
  getOrders,
  getSingleOrder,
};
