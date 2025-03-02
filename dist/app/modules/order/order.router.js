"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_const_1 = require("../user/user.const");
const order_controller_1 = require("./order.controller");
const orderRoutes = (0, express_1.Router)();
// orderRoutes.post('/', orderController.createOrder);
// orderRoutes.get('/revenue', revenueController.calculatetotalRevenue);
orderRoutes.get('/verify', (0, auth_1.default)(user_const_1.USER_ROLE.customer), order_controller_1.orderController.verifyPayment);
orderRoutes.post('/create-order', (0, auth_1.default)(user_const_1.USER_ROLE.customer), order_controller_1.orderController.createOrder);
orderRoutes.get('/allOrders', (0, auth_1.default)(user_const_1.USER_ROLE.customer, user_const_1.USER_ROLE.admin), order_controller_1.orderController.getOrders);
orderRoutes.patch('/:orderId', (0, auth_1.default)(user_const_1.USER_ROLE.admin, user_const_1.USER_ROLE.customer), order_controller_1.orderController.updateOrder);
orderRoutes.get('/:orderId', (0, auth_1.default)(user_const_1.USER_ROLE.admin), order_controller_1.orderController.getSingleOrder);
orderRoutes.delete('/:orderId', (0, auth_1.default)(user_const_1.USER_ROLE.admin), order_controller_1.orderController.deleteOrder);
exports.default = orderRoutes;
