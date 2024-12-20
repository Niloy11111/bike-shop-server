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
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const order_service_1 = require("./order.service");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // finally order a bike
        const payload = req.body;
        const result = yield order_service_1.orderService.createOrder(payload);
        res.status(200).json({
            status: true,
            message: 'Order created successfully',
            data: result,
        });
    }
    catch (error) {
        // handling error for invalid input
        if (error.name === 'ValidationError' && error.errors) {
            const field = Object.keys(error.errors)[0];
            if (error.errors[field].name === 'CastError') {
                const invalidValue = error.errors[field].value;
                return res.json({
                    message: `Invalid input for ${field}: ${invalidValue}`,
                    success: false,
                });
            }
        }
        //handling error with giving suggesestions
        res.status(500).json({
            message: error._message,
            success: false,
            error: { name: error.name, errors: error.errors },
            stack: error instanceof Error ? error.stack : null,
        });
    }
});
exports.orderController = {
    createOrder,
};
