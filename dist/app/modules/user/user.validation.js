"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidations = exports.createUserValidationSchema = void 0;
const zod_1 = require("zod");
exports.createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        email: zod_1.z.string().email(),
        password: zod_1.z.string().max(20),
    }),
});
exports.UserValidations = {
    createUserValidationSchema: exports.createUserValidationSchema,
};
