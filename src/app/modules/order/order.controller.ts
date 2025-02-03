import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { orderService } from './order.service';

const createOrder = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await orderService.createOrder(payload);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Order created successfully',
    data: result,
  });
});

// const createOrder = async (req: Request, res: Response) => {
//   try {
//     // finally order a bike
//     const payload = req.body;
//     const result = await orderService.createOrder(payload);

//     res.status(200).json({
//       status: true,
//       message: 'Order created successfully',
//       data: result,
//     });
//   } catch (error: any) {
//     // handling error for invalid input
//     if (error.name === 'ValidationError' && error.errors) {
//       const field = Object.keys(error.errors)[0];
//       if (error.errors[field].name === 'CastError') {
//         const invalidValue = error.errors[field].value;
//         return res.json({
//           message: `Invalid input for ${field}: ${invalidValue}`,
//           success: false,
//         });
//       }
//     }
//     //handling error with giving suggesestions
//     res.status(500).json({
//       message: error._message,
//       success: false,
//       error: { name: error.name, errors: error.errors },
//       stack: error instanceof Error ? error.stack : null,
//     });
//   }
// };

export const orderController = {
  createOrder,
};
