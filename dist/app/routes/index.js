"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_route_1 = require("../modules/Admin/admin.route");
const user_route_1 = require("../modules/user/user.route");
const router = (0, express_1.Router)();
const modulesRoutes = [
    {
        path: '/auth',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/admin',
        route: admin_route_1.AdminRoutes,
    },
];
// router.use('/users', UserRoutes);
// router.use('/students', StudentRoutes);
modulesRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
