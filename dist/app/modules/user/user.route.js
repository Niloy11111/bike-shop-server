"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const user_const_1 = require("./user.const");
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const UserRoutes = express_1.default.Router();
UserRoutes.post('/register', (0, validateRequest_1.default)(user_validation_1.UserValidations.createUserValidationSchema), user_controller_1.UserControllers.createUser);
UserRoutes.patch('/:userId', (0, auth_1.default)(user_const_1.USER_ROLE.customer, user_const_1.USER_ROLE.admin), user_controller_1.UserControllers.updateUserProfile);
UserRoutes.get('/allUsers', (0, auth_1.default)(user_const_1.USER_ROLE.admin), user_controller_1.UserControllers.getUsers);
exports.default = UserRoutes;
