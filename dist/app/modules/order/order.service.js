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
exports.orderService = void 0;
const bike_model_1 = __importDefault(require("../bike/bike.model"));
const order_model_1 = __importDefault(require("./order.model"));
const createOrder = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // get the productId from body
    const { product: productId, quantity } = payload;
    // check if the productId is valid _id from bikes collection
    const bike = yield bike_model_1.default.findById(productId);
    if (!bike) {
        throw new Error('Invalid product ID');
    }
    const availabeQuantity = bike === null || bike === void 0 ? void 0 : bike.quantity;
    const updateBike = yield bike_model_1.default.findByIdAndUpdate(productId, {
        $inc: { quantity: -quantity },
    }, { new: true });
    if ((updateBike === null || updateBike === void 0 ? void 0 : updateBike.quantity) === 0) {
        yield bike_model_1.default.findByIdAndUpdate(productId, { inStock: false }, { new: true });
    }
    // check if product availabe in stock searching quantity
    if (quantity > availabeQuantity) {
        throw new Error('insufficient stock');
    }
    const result = yield order_model_1.default.create(payload);
    return result;
});
exports.orderService = {
    createOrder,
};
