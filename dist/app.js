"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const globalErrorHandler_1 = __importDefault(require("./app/middleware/globalErrorHandler"));
const notFound_1 = __importDefault(require("./app/middleware/notFound"));
const blog_route_1 = require("./app/modules/Blog/blog.route");
const routes_1 = __importDefault(require("./app/routes"));
const app = (0, express_1.default)();
//middleware
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
//importing router from routes/index.ts
app.use('/api', routes_1.default);
app.use('/api', blog_route_1.BlogRouter);
app.get('/', (req, res) => {
    res.send({
        status: true,
        message: 'server live',
    });
});
app.use((req, res) => {
    return res.status(404).json({
        success: false,
        message: 'api not found',
    });
});
app.use(globalErrorHandler_1.default);
// not found route
app.use(notFound_1.default);
exports.default = app;
