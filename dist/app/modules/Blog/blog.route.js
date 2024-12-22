"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const blog_controller_1 = require("./blog.controller");
const blog_validation_1 = require("./blog.validation");
const router = express_1.default.Router();
router.post('/blogs', (0, auth_1.default)('user', 'admin'), (0, validateRequest_1.default)(blog_validation_1.BlogValidations.createBlogValidationSchema), blog_controller_1.BlogControllers.createBlog);
router.delete('/blogs/:id', (0, auth_1.default)('user', 'admin'), blog_controller_1.BlogControllers.deleteBlog);
router.patch('/blogs/:id', (0, auth_1.default)('user', 'admin'), (0, validateRequest_1.default)(blog_validation_1.BlogValidations.updateBlogValidationSchema), blog_controller_1.BlogControllers.updateBlog);
router.get('/blogs', blog_controller_1.BlogControllers.getAllBlogs);
exports.BlogRouter = router;
