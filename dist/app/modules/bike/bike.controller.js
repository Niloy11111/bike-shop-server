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
exports.bikeController = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bike_service_1 = require("./bike.service");
const createBike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // take the given json data from request as payload
        const payload = req.body;
        const result = yield bike_service_1.bikeService.createBike(payload);
        res.status(200).json({
            success: true,
            message: 'Bike created successfully',
            data: result,
        });
    }
    catch (error) {
        // handling error for invalid input
        if (error.name === 'ValidationError' && error.errors) {
            const field = Object.keys(error.errors)[0];
            if (error.errors[field].name === 'CastError') {
                const invalidValue = error.errors[field].value;
                return res.status(404).json({
                    message: `Invalid input for ${field}: ${invalidValue}`,
                    success: false,
                });
            }
        }
        //handling error with giving suggesestions
        res.status(500).json({
            message: error._message,
            success: false,
            error: { name: error.name, errors: error.errors },
            stack: error instanceof Error ? error.stack : null,
        });
    }
});
const getBikes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // searchTerm can be name,category,brand getting as query
        const searchTerm = req.query.searchTerm;
        // get all bikes from Bike model and also filtering by searchTerm
        const result = yield bike_service_1.bikeService.getBikes(searchTerm);
        res.status(200).send({
            message: 'Bikes retrieved successfully',
            status: true,
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error._message,
            success: false,
            error: { name: error.name, errors: error.errors },
            stack: error instanceof Error ? error.stack : null,
        });
    }
});
const getSingleBike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get the _id of bike in params to retrieve the correct bike
        const productId = req.params.productId;
        // check if the productId is valid _id from bikes collection
        if (!mongoose_1.default.Types.ObjectId.isValid(productId)) {
            return res.status(404).json({
                success: false,
                message: 'Invalid product ID',
            });
        }
        const result = yield bike_service_1.bikeService.getSingleBike(productId);
        if (result === null) {
            throw new Error('Invalid Input');
        }
        res.status(200).send({
            message: 'Bike retrieved successfully',
            status: true,
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error._message,
            success: false,
            error: { name: error.name, errors: error.errors },
            stack: error instanceof Error ? error.stack : null,
        });
    }
});
const updateBike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get the productId in parmas
        const productId = req.params.productId;
        // take the json body of bike details from response and send it to update function
        const body = req.body;
        const result = yield bike_service_1.bikeService.updateBike(productId, body);
        res.send({
            message: 'Bike updated successfully',
            status: true,
            data: result,
        });
    }
    catch (error) {
        if (error.name === 'CastError') {
            res.status(500).json({
                message: `Invalid input for ${error.path}: ${error.value}`,
                success: false,
            });
        }
        res.status(500).json({
            message: error._message,
            success: false,
            error: { name: error.name, errors: error.errors },
            stack: error instanceof Error ? error.stack : null,
        });
    }
});
const deleteBike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get the productId from params and send it to delete function
        const productId = req.params.productId;
        // check if the productId is valid _id from bikes collection
        if (!mongoose_1.default.Types.ObjectId.isValid(productId)) {
            return res.status(404).json({
                success: false,
                message: 'Invalid product ID',
            });
        }
        yield bike_service_1.bikeService.deleteBike(productId);
        res.send({
            message: 'Bike deleted successfully',
            status: true,
            data: {},
        });
    }
    catch (error) {
        res.status(500).json({
            message: error._message,
            success: false,
            error: { name: error.name, errors: error.errors },
            stack: error instanceof Error ? error.stack : null,
        });
    }
});
exports.bikeController = {
    createBike,
    getBikes,
    getSingleBike,
    updateBike,
    deleteBike,
};
