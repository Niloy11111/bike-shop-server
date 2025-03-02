import { Router } from 'express';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.const';
import { orderController } from './order.controller';

const orderRoutes = Router();

// orderRoutes.post('/', orderController.createOrder);
// orderRoutes.get('/revenue', revenueController.calculatetotalRevenue);

orderRoutes.get(
  '/verify',
  auth(USER_ROLE.customer),
  orderController.verifyPayment,
);

orderRoutes.post(
  '/create-order',
  auth(USER_ROLE.customer),
  orderController.createOrder,
);

orderRoutes.get(
  '/allOrders',
  auth(USER_ROLE.customer, USER_ROLE.admin),
  orderController.getOrders,
);

orderRoutes.patch(
  '/:orderId',
  auth(USER_ROLE.admin, USER_ROLE.customer),
  orderController.updateOrder,
);
orderRoutes.get(
  '/:orderId',
  auth(USER_ROLE.admin),
  orderController.getSingleOrder,
);
orderRoutes.delete(
  '/:orderId',
  auth(USER_ROLE.admin),
  orderController.deleteOrder,
);

export default orderRoutes;
