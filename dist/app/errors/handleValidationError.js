"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const handleValidationError = (err) => {
    const error = Object.values(err.errors).map((val) => {
        if (val instanceof mongoose_1.default.Error.CastError ||
            val instanceof mongoose_1.default.Error.ValidatorError) {
            return {
                path: val.path,
                message: val.message,
            };
        }
        return { path: '', message: 'Unknown error' }; // Handle unexpected cases
    });
    const statusCode = 400;
    return {
        statusCode,
        message: 'Validation Error',
        error,
    };
};
exports.default = handleValidationError;
