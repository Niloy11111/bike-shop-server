"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const AppError_1 = require("../../errors/AppError");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const order_service_1 = require("./order.service");
const createOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req === null || req === void 0 ? void 0 : req.user;
    // console.log('user', user);
    // user {
    //   _id: new ObjectId('67a3ba2093b7001ae076e742'),
    //   id: '2025000001',
    //   name: 'david',
    //   email: 'david@gmail.com',
    //   password: '$2b$12$22.z9biJAajDIcad0C6WPOm3FGJfOQmhO8p0y3KaQ7c81yRPabhiC',
    //   needsPasswordChange: false,
    //   role: 'customer',
    //   isBlocked: false,
    //   isDeleted: false,
    //   createdAt: 2025-02-05T19:21:04.083Z,
    //   updatedAt: 2025-03-01T05:22:44.074Z,
    //   __v: 0,
    //   passwordChangedAt: 2025-02-05T19:21:16.823Z,
    //   city: 'New York',
    //   country: 'USA',
    //   img: 'http://res.cloudinary.com/dofbykuhh/image/upload/v1740806428/mlecrufekdowjyc1bdxw.png',
    //   phone: '019459859423'
    // }
    // console.log(req);
    const order = yield order_service_1.orderService.createOrder(user, req.body, req.ip);
    console.log(req.ip);
    console.log('order', order);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'Order placed successfully',
        data: order,
    });
}));
const getOrders = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { todaySales, ordersData, revenueData, customerExpenseData } = yield order_service_1.orderService.getOrders();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'Order, revenue data, customer expense data, and today’s sales retrieved successfully',
        data: {
            todaySales,
            ordersData,
            revenueData,
            customerExpenseData,
        },
    });
}));
const getSingleOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get the _id of bike in params to retrieve the correct bike
    const orderId = req.params.orderId;
    // check if the orderId is valid _id from bikes collection
    if (!mongoose_1.default.Types.ObjectId.isValid(orderId)) {
        throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, 'Invalid product ID');
    }
    const result = yield order_service_1.orderService.getSingleOrder(orderId);
    if (result === null) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'Bike not found');
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'order retrieved successfully',
        data: result,
    });
}));
const verifyPayment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_service_1.orderService.verifyPayment(req.query.order_id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'Order verified successfully',
        data: order,
    });
}));
const updateOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get the orderId in parmas
    const orderId = req.params.orderId;
    // take the json body of bike details from response and send it to update function
    const body = Object.assign({}, req.body);
    if (req.body.estimatedDeliveryDate) {
        body.estimatedDeliveryDate = req.body.estimatedDeliveryDate;
    }
    const result = yield order_service_1.orderService.updateOrder(orderId, body);
    // console.log('here', req.user, req.params);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'order updated successfully',
        data: result,
    });
}));
const deleteOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get the productId from params and send it to delete function
    const orderId = req.params.orderId;
    // check if the orderId is valid _id from bikes collection
    if (!mongoose_1.default.Types.ObjectId.isValid(orderId)) {
        throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, 'Invalid product ID');
    }
    yield order_service_1.orderService.deleteOrder(orderId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Order deleted successfully',
        data: null,
    });
}));
exports.orderController = {
    updateOrder,
    deleteOrder,
    createOrder,
    verifyPayment,
    getOrders,
    getSingleOrder,
};
