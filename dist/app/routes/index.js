"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_route_1 = require("../modules/Admin/admin.route");
const auth_route_1 = require("../modules/Auth/auth.route");
const bike_router_1 = __importDefault(require("../modules/bike/bike.router"));
const order_router_1 = __importDefault(require("../modules/order/order.router"));
const user_route_1 = __importDefault(require("../modules/user/user.route"));
const router = (0, express_1.Router)();
const modulesRoutes = [
    {
        path: '/users',
        route: user_route_1.default,
    },
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/admin',
        route: admin_route_1.AdminRoutes,
    },
    {
        path: '/products',
        route: bike_router_1.default,
    },
    {
        path: '/orders',
        route: order_router_1.default,
    },
];
// router.use('/users', UserRoutes);
// router.use('/students', StudentRoutes);
modulesRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
