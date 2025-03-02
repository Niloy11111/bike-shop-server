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
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const AppError_1 = require("../../errors/AppError");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const bike_service_1 = require("./bike.service");
const createBike = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // take the given json data from request as payload
    const payload = req.body;
    const result = yield bike_service_1.bikeService.createBike(payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: 'Bike created successfully',
        data: result,
    });
}));
const getAllBikes = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const searchTerm = req.query.searchTerm;
    const minPrice = typeof req.query.minPrice === 'string' ? Number(req.query.minPrice) : 0;
    const maxPrice = typeof req.query.maxPrice === 'string' ? Number(req.query.maxPrice) : 0;
    const availability = req.query.availability === 'true';
    const result = yield bike_service_1.bikeService.getBikes(searchTerm, minPrice, maxPrice, availability);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Bikes retrieved successfully',
        data: result,
    });
}));
const getSingleBike = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get the _id of bike in params to retrieve the correct bike
    const productId = req.params.productId;
    // check if the productId is valid _id from bikes collection
    if (!mongoose_1.default.Types.ObjectId.isValid(productId)) {
        throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, 'Invalid product ID');
    }
    const result = yield bike_service_1.bikeService.getSingleBike(productId);
    if (result === null) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'Bike not found');
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Bike retrieved successfully',
        data: result,
    });
}));
// const getSingleBike = async (req: Request, res: Response) => {
//   try {
//     // get the _id of bike in params to retrieve the correct bike
//     const productId = req.params.productId;
//     // check if the productId is valid _id from bikes collection
//     if (!mongoose.Types.ObjectId.isValid(productId)) {
//       return res.status(404).json({
//         success: false,
//         message: 'Invalid product ID',
//       });
//     }
//     const result = await bikeService.getSingleBike(productId);
//     if (result === null) {
//       throw new Error('Invalid Input');
//     }
//     res.status(200).send({
//       message: 'Bike retrieved successfully',
//       status: true,
//       data: result,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: error._message,
//       success: false,
//       error: { name: error.name, errors: error.errors },
//       stack: error instanceof Error ? error.stack : null,
//     });
//   }
// };
const updateBike = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get the productId in parmas
    const productId = req.params.productId;
    // take the json body of bike details from response and send it to update function
    const body = req.body;
    const result = yield bike_service_1.bikeService.updateBike(productId, body);
    // console.log('here', req.user, req.params);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Bike updated successfully',
        data: result,
    });
}));
// const updateBike = async (req: Request, res: Response) => {
//   try {
//     // get the productId in parmas
//     const productId = req.params.productId;
//     // take the json body of bike details from response and send it to update function
//     const body = req.body;
//     const result = await bikeService.updateBike(productId, body);
//     res.send({
//       message: 'Bike updated successfully',
//       status: true,
//       data: result,
//     });
//   } catch (error: any) {
//     if (error.name === 'CastError') {
//       res.status(500).json({
//         message: `Invalid input for ${error.path}: ${error.value}`,
//         success: false,
//       });
//     }
//     res.status(500).json({
//       message: error._message,
//       success: false,
//       error: { name: error.name, errors: error.errors },
//       stack: error instanceof Error ? error.stack : null,
//     });
//   }
// };
const deleteBike = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get the productId from params and send it to delete function
    const productId = req.params.productId;
    // check if the productId is valid _id from bikes collection
    if (!mongoose_1.default.Types.ObjectId.isValid(productId)) {
        throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, 'Invalid product ID');
    }
    yield bike_service_1.bikeService.deleteBike(productId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Bike deleted successfully',
        data: null,
    });
}));
// const deleteBike = async (req: Request, res: Response) => {
//   try {
//     // get the productId from params and send it to delete function
//     const productId = req.params.productId;
//     // check if the productId is valid _id from bikes collection
//     if (!mongoose.Types.ObjectId.isValid(productId)) {
//       return res.status(404).json({
//         success: false,
//         message: 'Invalid product ID',
//       });
//     }
//     await bikeService.deleteBike(productId);
//     res.send({
//       message: 'Bike deleted successfully',
//       status: true,
//       data: {},
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: error._message,
//       success: false,
//       error: { name: error.name, errors: error.errors },
//       stack: error instanceof Error ? error.stack : null,
//     });
//   }
// };
exports.bikeController = {
    createBike,
    getAllBikes,
    getSingleBike,
    updateBike,
    deleteBike,
};
