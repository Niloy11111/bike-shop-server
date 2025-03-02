"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const user_const_1 = require("../user/user.const");
const auth_controller_1 = require("./auth.controller");
const auth_validation_1 = require("./auth.validation");
const router = express_1.default.Router();
router.post('/login', (0, validateRequest_1.default)(auth_validation_1.AuthValidation.loginValidationSchema), auth_controller_1.AuthControllers.loginUser);
router.post('/change-password', (0, auth_1.default)(user_const_1.USER_ROLE.admin, user_const_1.USER_ROLE.customer), (0, validateRequest_1.default)(auth_validation_1.AuthValidation.changePasswordValidationSchema), auth_controller_1.AuthControllers.changePassword);
// to make refresh token first login and its already will set a token in res.cookies and then hit the refresh token route to get the refresh token
router.post('/refresh-token', (0, validateRequest_1.default)(auth_validation_1.AuthValidation.refreshTokenValidationSchema), auth_controller_1.AuthControllers.refreshToken);
// router.post(
//   '/forget-password',
//   validateRequest(AuthValidation.refreshTokenValidationSchema),
//   AuthControllers.forgetPassword,
// );
// router.post(
//   '/reset-password',
//   validateRequest(AuthValidation.refreshTokenValidationSchema),
//   AuthControllers.resetPassword,
// );
exports.AuthRoutes = router;
