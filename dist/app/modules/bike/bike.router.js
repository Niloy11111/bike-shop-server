"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middleware/auth"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const user_const_1 = require("../user/user.const");
const bike_controller_1 = require("./bike.controller");
const bike_validation_1 = require("./bike.validation");
const bikeRoutes = (0, express_1.Router)();
bikeRoutes.post('/create-bike', (0, auth_1.default)(user_const_1.USER_ROLE.admin), (0, validateRequest_1.default)(bike_validation_1.BikeValidations.createBikeValidationSchema), bike_controller_1.bikeController.createBike);
bikeRoutes.get('/bikes', bike_controller_1.bikeController.getAllBikes);
bikeRoutes.get('/:productId', bike_controller_1.bikeController.getSingleBike);
bikeRoutes.patch('/:productId', bike_controller_1.bikeController.updateBike);
bikeRoutes.delete('/:productId', bike_controller_1.bikeController.deleteBike);
exports.default = bikeRoutes;
