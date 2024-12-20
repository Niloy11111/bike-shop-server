"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const revenue_controller_1 = require("../revenue/revenue.controller");
const order_controller_1 = require("./order.controller");
const orderRouter = (0, express_1.Router)();
orderRouter.post('/', order_controller_1.orderController.createOrder);
orderRouter.get('/revenue', revenue_controller_1.revenueController.calculatetotalRevenue);
exports.default = orderRouter;
