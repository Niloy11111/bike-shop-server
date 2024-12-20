"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bike_router_1 = __importDefault(require("./app/modules/bike/bike.router"));
const order_router_1 = __importDefault(require("./app/modules/order/order.router"));
const app = (0, express_1.default)();
//middleware
app.use(express_1.default.json());
app.use('/api/products', bike_router_1.default);
app.use('/api/orders', order_router_1.default);
app.get('/', (req, res) => {
    res.send({
        status: true,
        message: 'server live',
    });
});
app.use((req, res) => {
    return res.status(404).json({
        success: false,
        message: 'api not found',
    });
});
exports.default = app;
