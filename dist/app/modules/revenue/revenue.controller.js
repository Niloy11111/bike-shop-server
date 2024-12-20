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
exports.revenueController = void 0;
const order_model_1 = __importDefault(require("../order/order.model"));
const calculatetotalRevenue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // calculate sum of the totalPrice field using $group with mongodb aggregation
        const totalAmount = yield order_model_1.default.aggregate([
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: '$totalPrice' },
                },
            },
            {
                $project: {
                    _id: 0,
                    totalRevenue: 1,
                },
            },
        ]);
        res.send({
            message: 'Revenue calculated successfully',
            status: true,
            data: totalAmount[0],
        });
    }
    catch (error) {
        res.status(500).json({
            message: error._message,
            success: false,
            error: { name: error.name, errors: error.errors },
            stack: error instanceof Error ? error.stack : null,
        });
    }
});
exports.revenueController = {
    calculatetotalRevenue,
};
