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
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const AppError_1 = require("../errors/AppError");
const user_model_1 = require("../modules/user/user.model");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const auth = (...requiredRoles) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const token = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
        //if the token is send from the client
        if (!token) {
            throw new AppError_1.AppError(http_status_1.default.UNAUTHORIZED, 'You are not authorized');
        }
        //if the token is valid
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
        const { role, email } = decoded;
        const user = yield user_model_1.User.findOne({ email });
        // console.log('from auth', { decoded, user: user });
        if (!user) {
            throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'This user is not found !');
        }
        if (user === null || user === void 0 ? void 0 : user.isBlocked) {
            throw new AppError_1.AppError(http_status_1.default.FORBIDDEN, 'This user is blocked ! !');
        }
        if (requiredRoles && !requiredRoles.includes(role)) {
            throw new AppError_1.AppError(http_status_1.default.UNAUTHORIZED, 'You are not authorized');
        }
        //decode undefiend
        req.user = user;
        // (req.user as TOrderUser) = user as TOrderUser;
        next();
    }));
};
exports.default = auth;
