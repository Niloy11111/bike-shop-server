"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const admin_controller_1 = require("./admin.controller");
const router = express_1.default.Router();
router.patch('/users/:userId/block', (0, auth_1.default)('admin'), admin_controller_1.AdminControllers.blockUser);
router.delete('/blogs/:id', (0, auth_1.default)('admin'), admin_controller_1.AdminControllers.deleteBlogByAdmin);
exports.AdminRoutes = router;
