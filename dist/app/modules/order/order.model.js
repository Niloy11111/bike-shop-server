"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const orderSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, 'Please provide the customer email'],
        validate: {
            validator: (value) => validator_1.default.isEmail(value),
            message: '{VALUE} is not valid email type',
        },
    },
    product: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Bike',
        required: [true, 'Please provide the bike ID'],
    },
    quantity: {
        type: Number,
        required: [true, 'Please provide the quantity'],
        validate: {
            validator: function (value) {
                return typeof value === 'number' && value > 0;
            },
            message: '{VALUE} is not a positive quantity',
        },
    },
    totalPrice: {
        type: Number,
        required: [true, 'Please provide the total price'],
        validate: {
            validator: function (value) {
                return typeof value === 'number' && value > 0;
            },
            message: '{VALUE} is not a positive number',
        },
    },
}, {
    timestamps: true,
});
const Order = (0, mongoose_1.model)('Order', orderSchema);
exports.default = Order;
