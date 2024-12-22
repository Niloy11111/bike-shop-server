"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleDuplicateError = (err) => {
    var _a;
    const extractedMessage = (_a = err.message.match(/"([^"]+)"/)) === null || _a === void 0 ? void 0 : _a[1];
    const error = [
        {
            path: '',
            message: `${extractedMessage} is already exists`,
        },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: 'Invalid ID',
        error: error,
    };
};
exports.default = handleDuplicateError;
