"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
// prev:
// const notFound = (req: Request, res: Response, next: NextFunction) => {
//   return res.status(httpStatus.NOT_FOUND).json({
//     success: false,
//     message: 'api not found',
//   });
// };
// with chatgp help toprev:
const notFound = (req, res, next) => {
    res
        .status(http_status_1.default.NOT_FOUND)
        .json({ success: false, message: 'api not found' });
};
exports.default = notFound;
