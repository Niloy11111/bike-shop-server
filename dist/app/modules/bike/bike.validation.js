"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BikeValidations = exports.createBikeValidationSchema = void 0;
const zod_1 = require("zod");
exports.createBikeValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Please provide the bike name' }),
        brand: zod_1.z.string({ required_error: 'Please provide the bike brand' }),
        model: zod_1.z.string({ required_error: 'Please provide the bike model' }),
        price: zod_1.z
            .number({ required_error: 'Please provide the price' })
            .positive('Price must be a positive number'),
        category: zod_1.z.enum(['Mountain', 'Road', 'Folding', 'Electric'], {
            required_error: 'Please specify the bike category',
            invalid_type_error: '{VALUE} is not a valid category',
        }),
        description: zod_1.z.string({
            required_error: 'Please provide a description for the bike',
        }),
        photoURL: zod_1.z.string({
            required_error: 'Please provide a photoURL for the bike',
        }),
        quantity: zod_1.z
            .number({ required_error: 'Please provide the quantity' })
            .positive('Quantity must be a positive number'),
        inStock: zod_1.z.boolean({ required_error: 'Please provide the inStock status' }),
    }),
});
exports.BikeValidations = {
    createBikeValidationSchema: exports.createBikeValidationSchema,
};
