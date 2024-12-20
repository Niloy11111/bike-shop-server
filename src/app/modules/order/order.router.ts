import { Router } from 'express';
import { revenueController } from '../revenue/revenue.controller';
import { orderController } from './order.controller';

const orderRouter = Router();

orderRouter.post('/', orderController.createOrder);
orderRouter.get('/revenue', revenueController.calculatetotalRevenue);
export default orderRouter;
