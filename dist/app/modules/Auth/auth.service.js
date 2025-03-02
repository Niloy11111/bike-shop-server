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
exports.AuthServices = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
const AppError_1 = require("../../errors/AppError");
const user_model_1 = require("../user/user.model");
const auth_utils_1 = require("./auth.utils");
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExistsbyEmail(payload.email);
    if (!user) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'This user is not found !');
    }
    // checking if the user is already deleted
    const isDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isDeleted) {
        throw new AppError_1.AppError(http_status_1.default.FORBIDDEN, 'This user is deleted !');
    }
    // checking if the user is blocked
    if (user === null || user === void 0 ? void 0 : user.isBlocked) {
        throw new AppError_1.AppError(http_status_1.default.FORBIDDEN, 'This user is blocked ! !');
    }
    //checking if the password is correct
    if (!(yield user_model_1.User.isPasswordMatched(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password))) {
        throw new AppError_1.AppError(http_status_1.default.FORBIDDEN, 'password do not matched!');
    }
    // console.log('from jwt', user?._id);
    //create token and sent to the client
    const jwtPayload = {
        email: user === null || user === void 0 ? void 0 : user.email,
        role: user === null || user === void 0 ? void 0 : user.role,
        name: user.name,
    };
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    const refreshToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expires_in);
    return {
        user,
        accessToken,
        refreshToken,
        needsPasswordChange: user === null || user === void 0 ? void 0 : user.needsPasswordChange,
    };
});
const changePassword = (userData, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExistsbyEmail(userData.email);
    if (!user) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'This user is not found !');
    }
    // checking if the user is already deleted
    const isDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isDeleted) {
        throw new AppError_1.AppError(http_status_1.default.FORBIDDEN, 'This user is deleted !');
    }
    // checking if the user is blocked
    if (user === null || user === void 0 ? void 0 : user.isBlocked) {
        throw new AppError_1.AppError(http_status_1.default.FORBIDDEN, 'This user is blocked ! !');
    }
    //checking if the password is correct
    if (!(yield user_model_1.User.isPasswordMatched(payload.oldPassword, user === null || user === void 0 ? void 0 : user.password))) {
        throw new AppError_1.AppError(http_status_1.default.FORBIDDEN, 'password do not matched!');
    }
    //hash new password
    const newHashedPassword = yield bcrypt_1.default.hash(payload.newPassword, Number(config_1.default.bcrypt_salt_rounds));
    console.log('userData', userData);
    const result = yield user_model_1.User.findByIdAndUpdate(userData._id, // Directly pass the _id
    {
        password: newHashedPassword,
        needsPasswordChange: false,
        passwordChangedAt: new Date(),
    });
    return result;
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    //if the token is valid
    const decoded = (0, auth_utils_1.verifyToken)(token, config_1.default.jwt_refresh_secret);
    const { role, email, name } = decoded;
    const user = yield user_model_1.User.isUserExistsbyEmail(email);
    if (!user) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'This user is not found !');
    }
    // checking if the user is already deleted
    const isDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isDeleted) {
        throw new AppError_1.AppError(http_status_1.default.FORBIDDEN, 'This user is deleted !');
    }
    // checking if the user is blocked
    if (user === null || user === void 0 ? void 0 : user.isBlocked) {
        throw new AppError_1.AppError(http_status_1.default.FORBIDDEN, 'This user is blocked ! !');
    }
    const iat = Math.floor(Date.now() / 1000);
    if (user.passwordChangedAt &&
        user_model_1.User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat)) {
        throw new AppError_1.AppError(http_status_1.default.UNAUTHORIZED, 'You are not authorized');
    }
    //create token and sent to the client
    const jwtPayload = {
        email: email,
        role: user === null || user === void 0 ? void 0 : user.role,
        name: name,
    };
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    return {
        accessToken,
    };
});
// const forgetPassword = async (userId: string) => {
//   // const user = await User.isUserExistsbyEmail(payload.email);
//   // if (!user) {
//   //   throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
//   // }
//   // checking if the user is already deleted
//   const isDeleted = user?.isDeleted;
//   if (isDeleted) {
//     throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
//   }
//   // checking if the user is blocked
//   const userStatus = user?.status;
//   if (userStatus === 'blocked') {
//     throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
//   }
//   //create token and sent to the client
//   const jwtPayload = {
//     userId: user.id,
//     role: user?.role,
//   };
//   const resetToken = createToken(
//     jwtPayload,
//     config.jwt_access_secret as string,
//     '10m',
//   );
//   const resetUILink = `${config.reset_pass_ui_link}?id=${user.id}&token=${resetToken}`;
//   sendEmail(user.email, resetUILink);
// };
// const resetPassword = async (
//   payload: { id: string; newPassword: string },
//   token: string,
// ) => {
//   const user = await User.isUserExistsbyCustomId(payload?.id);
//   if (!user) {
//     throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
//   }
//   // checking if the user is already deleted
//   const isDeleted = user?.isDeleted;
//   if (isDeleted) {
//     throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
//   }
//   // checking if the user is blocked
//   const userStatus = user?.status;
//   if (userStatus === 'blocked') {
//     throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
//   }
//   const decoded = jwt.verify(
//     token,
//     config.jwt_access_secret as string,
//   ) as JwtPayload;
//   if (payload.id !== decoded.userId) {
//     throw new AppError(httpStatus.FORBIDDEN, 'You are forbidden');
//   }
//   //hash new password
//   const newHashedPassword = await bcrypt.hash(
//     payload.newPassword,
//     Number(config.bcrypt_salt_rounds),
//   );
//   const result = await User.findOneAndUpdate(
//     {
//       id: decoded.userId,
//       role: decoded.role,
//     },
//     {
//       password: newHashedPassword,
//       needsPasswordChange: false,
//       passwordChangedAt: new Date(),
//     },
//   );
// };
exports.AuthServices = {
    loginUser,
    changePassword,
    refreshToken,
};
