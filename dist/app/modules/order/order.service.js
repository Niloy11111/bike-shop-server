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
const order_model_1 = __importDefault(require("./order.model"));
// const createOrder = async (payload: IOrder): Promise<IOrder> => {
//   const { product: productId, quantity } = payload;
//   const bike = await Bike.findById(productId);
//   if (!bike) {
//     throw new Error('Invalid product ID');
//   }
//   const availabeQuantity = bike?.quantity as number;
//   const updateBike = await Bike.findByIdAndUpdate(
//     productId,
//     {
//       $inc: { quantity: -quantity },
//     },
//     { new: true },
//   );
//   if (updateBike?.quantity === 0) {
//     await Bike.findByIdAndUpdate(productId, { inStock: false }, { new: true });
//   }
//   if (quantity > availabeQuantity) {
//     throw new Error('insufficient stock');
//   }
//   const result = await Order.create(payload);
//   return result;
// };
// export const orderService = {
//   createOrder,
// };
const http_status_1 = __importDefault(require("http-status"));
// import Product from '../product/product.model';
const AppError_1 = require("../../errors/AppError");
const bike_model_1 = __importDefault(require("../bike/bike.model"));
const user_model_1 = require("../user/user.model");
const order_utils_1 = require("./order.utils");
const createOrder = (user, payload, client_ip) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!((_a = payload === null || payload === void 0 ? void 0 : payload.products) === null || _a === void 0 ? void 0 : _a.length))
        throw new AppError_1.AppError(http_status_1.default.NOT_ACCEPTABLE, 'Order is not specified');
    const products = payload.products;
    let totalPrice = 0;
    const productDetails = yield Promise.all(products.map((item) => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield bike_model_1.default.findById(item.product);
        if (!product)
            throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'Product not found');
        if (item.quantity > product.quantity)
            throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, 'Insufficient stock');
        const subtotal = product.price * item.quantity;
        totalPrice += subtotal;
        // Update stock
        const updatedProduct = yield bike_model_1.default.findByIdAndUpdate(item.product, {
            $inc: { quantity: -item.quantity },
            $set: { inStock: product.quantity - item.quantity > 0 },
        }, { new: true });
        return {
            product: item.product,
            quantity: item.quantity,
            category: product.category,
            price: product.price,
            photoURL: product.photoURL,
            productName: product.name,
        };
    })));
    const userDetails = yield user_model_1.User.findById(user);
    if (!userDetails)
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'User not found');
    const order = yield order_model_1.default.create({
        user: {
            _id: userDetails._id,
            name: userDetails.name,
            email: userDetails.email,
            phone: userDetails.phone,
        },
        products: productDetails,
        totalPrice,
    });
    const address = `${userDetails === null || userDetails === void 0 ? void 0 : userDetails.city}, ${userDetails === null || userDetails === void 0 ? void 0 : userDetails.country}`;
    // Payment integration
    const shurjopayPayload = {
        amount: totalPrice,
        order_id: order._id,
        currency: 'BDT',
        customer_name: userDetails.name,
        customer_address: address,
        customer_email: userDetails.email,
        customer_phone: userDetails.phone,
        customer_city: userDetails.city,
        client_ip,
    };
    const payment = yield order_utils_1.orderUtils.makePaymentAsync(shurjopayPayload);
    if (payment === null || payment === void 0 ? void 0 : payment.transactionStatus) {
        yield order.updateOne({
            transaction: {
                id: payment.sp_order_id,
                transactionStatus: payment.transactionStatus,
            },
        });
    }
    return payment.checkout_url;
});
const getOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield order_model_1.default.find();
    const allMonths = ['January', 'February', 'March', 'April', 'May', 'June'];
    const initialRevenueData = allMonths.map((month) => ({
        name: month,
        Total: 0,
    }));
    const customerExpenseData = [];
    let todaySales = 0;
    const today = new Date();
    data.forEach((order) => {
        var _a;
        const orderDate = (order === null || order === void 0 ? void 0 : order.createdAt)
            ? new Date((_a = order.createdAt) === null || _a === void 0 ? void 0 : _a.toString())
            : new Date();
        order.products.forEach((product) => {
            const month = orderDate.toLocaleString('default', { month: 'long' });
            const monthIndex = allMonths.indexOf(month);
            if (monthIndex !== -1 && product.price && product.quantity) {
                initialRevenueData[monthIndex].Total +=
                    product.price * product.quantity;
            }
            let userExpense = customerExpenseData.find((item) => item.userId.toString() === order.user._id.toString());
            if (!userExpense) {
                userExpense = {
                    userId: order.user._id,
                    expenseData: allMonths.map((month) => ({
                        name: month,
                        Total: 0,
                    })),
                };
                customerExpenseData.push(userExpense);
            }
            if (monthIndex !== -1 && product.price && product.quantity) {
                userExpense.expenseData[monthIndex].Total +=
                    product.price * product.quantity;
            }
            if (orderDate.getDate() === today.getDate() &&
                orderDate.getMonth() === today.getMonth() &&
                orderDate.getFullYear() === today.getFullYear() &&
                product.price &&
                product.quantity) {
                todaySales += product.price * product.quantity;
            }
        });
    });
    return {
        todaySales,
        ordersData: data,
        revenueData: initialRevenueData,
        customerExpenseData,
    };
});
const getSingleOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    //get the specific bike from bikes collection
    const result = yield order_model_1.default.findById(id);
    return result;
});
const verifyPayment = (order_id) => __awaiter(void 0, void 0, void 0, function* () {
    const verifiedPayment = yield order_utils_1.orderUtils.verifyPaymentAsync(order_id);
    if (verifiedPayment.length) {
        yield order_model_1.default.findOneAndUpdate({
            'transaction.id': order_id,
        }, {
            'transaction.bank_status': verifiedPayment[0].bank_status,
            'transaction.sp_code': verifiedPayment[0].sp_code,
            'transaction.sp_message': verifiedPayment[0].sp_message,
            'transaction.transactionStatus': verifiedPayment[0].transaction_status,
            'transaction.method': verifiedPayment[0].method,
            'transaction.date_time': verifiedPayment[0].date_time,
            status: verifiedPayment[0].bank_status == 'Success'
                ? 'Paid'
                : verifiedPayment[0].bank_status == 'Failed'
                    ? 'Pending'
                    : verifiedPayment[0].bank_status == 'Cancel'
                        ? 'Cancelled'
                        : '',
        });
    }
    return verifiedPayment;
});
const deleteOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // delete a specific order
    const result = yield order_model_1.default.findByIdAndDelete(id);
    return result;
});
const updateOrder = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    // udpate
    const result = yield order_model_1.default.findByIdAndUpdate(id, data, {
        new: true,
    });
    return result;
});
exports.orderService = {
    updateOrder,
    deleteOrder,
    createOrder,
    getOrders,
    verifyPayment,
    getSingleOrder,
};
