"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bikeSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
        type: String,
        enum: ['Mountain', 'Road', 'Folding', 'Electric'],
        required: true,
    },
    photoURL: { type: String, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
}, { timestamps: true });
const Bike = (0, mongoose_1.model)('Bike', bikeSchema);
exports.default = Bike;
