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
exports.bikeService = void 0;
const bike_model_1 = __importDefault(require("./bike.model"));
const createBike = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bike_model_1.default.create(payload);
    return result;
});
const getBikes = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    // filter data accordingto searchTerm using $or method
    const query = searchTerm
        ? {
            $or: [
                { category: searchTerm },
                { brand: searchTerm },
                { name: searchTerm },
            ],
        }
        : {};
    const result = yield bike_model_1.default.find(query);
    return result;
});
const getSingleBike = (id) => __awaiter(void 0, void 0, void 0, function* () {
    //get the specific bike from bikes collection
    const result = yield bike_model_1.default.findById(id);
    return result;
});
const updateBike = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    // udpate a specific bike
    const result = yield bike_model_1.default.findByIdAndUpdate(id, data, {
        new: true,
    });
    return result;
});
const deleteBike = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // delete a specific bike
    const result = yield bike_model_1.default.findByIdAndDelete(id);
    return result;
});
exports.bikeService = {
    createBike,
    getBikes,
    getSingleBike,
    updateBike,
    deleteBike,
};
