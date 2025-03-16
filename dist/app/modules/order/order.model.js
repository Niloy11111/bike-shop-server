"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const OrderSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.Mixed,
        required: true,
    },
    products: [
        {
            product: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Bike',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            category: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            photoURL: { type: String, required: true },
            productName: { type: String, required: true },
        },
    ],
    totalPrice: {
        type: Number,
        required: true,
    },
    estimatedDeliveryDate: {
        type: Date,
        default: null,
    },
    status: {
        type: String,
        enum: ['Pending', 'Paid', 'Shipped', 'Completed', 'Cancelled'],
        default: 'Pending',
    },
    transaction: {
        id: String,
        transactionStatus: String,
        bank_status: String,
        sp_code: String,
        sp_message: String,
        method: String,
        date_time: String,
    },
}, {
    timestamps: true,
});
const Order = (0, mongoose_1.model)('Order', OrderSchema);
exports.default = Order;
