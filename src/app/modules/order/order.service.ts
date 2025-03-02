import Order from './order.model';

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
import httpStatus from 'http-status';

// import Product from '../product/product.model';
import { AppError } from '../../errors/AppError';
import Bike from '../bike/bike.model';
import { User } from '../user/user.model';
import { IOrder, TCustomerExpenseData, TOrderUser } from './order.interface';
import { orderUtils } from './order.utils';

const createOrder = async (
  user: TOrderUser,
  payload: { products: { product: string; quantity: number }[] },
  client_ip: string,
) => {
  if (!payload?.products?.length)
    throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Order is not specified');

  const products = payload.products;
  let totalPrice = 0;

  const productDetails = await Promise.all(
    products.map(async (item) => {
      const product = await Bike.findById(item.product);
      if (!product)
        throw new AppError(httpStatus.NOT_FOUND, 'Product not found');

      if (item.quantity > product.quantity)
        throw new AppError(httpStatus.BAD_REQUEST, 'Insufficient stock');

      const subtotal = product.price * item.quantity;
      totalPrice += subtotal;

      // Update stock
      const updatedProduct = await Bike.findByIdAndUpdate(
        item.product,
        {
          $inc: { quantity: -item.quantity },
          $set: { inStock: product.quantity - item.quantity > 0 },
        },
        { new: true },
      );

      return {
        product: item.product,
        quantity: item.quantity,
        category: product.category,
        price: product.price,
        photoURL: product.photoURL,
        productName: product.name,
      };
    }),
  );

  const userDetails = await User.findById(user);
  if (!userDetails) throw new AppError(httpStatus.NOT_FOUND, 'User not found');

  const order = await Order.create({
    user: {
      _id: userDetails._id,
      name: userDetails.name,
      email: userDetails.email,
      phone: userDetails.phone,
    },
    products: productDetails,
    totalPrice,
  });

  const address = `${userDetails?.city}, ${userDetails?.country}`;
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

  const payment = await orderUtils.makePaymentAsync(shurjopayPayload);

  if (payment?.transactionStatus) {
    await order.updateOne({
      transaction: {
        id: payment.sp_order_id,
        transactionStatus: payment.transactionStatus,
      },
    });
  }

  return payment.checkout_url;
};

const getOrders = async () => {
  const data = await Order.find();

  const allMonths = ['January', 'February', 'March', 'April', 'May', 'June'];
  const initialRevenueData = allMonths.map((month) => ({
    name: month,
    Total: 0,
  }));

  const customerExpenseData: TCustomerExpenseData[] = [];
  let todaySales = 0;
  const today = new Date();

  data.forEach((order) => {
    const orderDate = order?.createdAt
      ? new Date(order.createdAt?.toString())
      : new Date();

    order.products.forEach((product) => {
      const month = orderDate.toLocaleString('default', { month: 'long' });
      const monthIndex = allMonths.indexOf(month);

      if (monthIndex !== -1 && product.price && product.quantity) {
        initialRevenueData[monthIndex].Total +=
          product.price * product.quantity;
      }

      let userExpense = customerExpenseData.find(
        (item) => item.userId.toString() === order.user._id.toString(),
      );

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

      if (
        orderDate.getDate() === today.getDate() &&
        orderDate.getMonth() === today.getMonth() &&
        orderDate.getFullYear() === today.getFullYear() &&
        product.price &&
        product.quantity
      ) {
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
};

const getSingleOrder = async (id: string) => {
  //get the specific bike from bikes collection
  const result = await Order.findById(id);
  return result;
};

const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

  if (verifiedPayment.length) {
    await Order.findOneAndUpdate(
      {
        'transaction.id': order_id,
      },
      {
        'transaction.bank_status': verifiedPayment[0].bank_status,
        'transaction.sp_code': verifiedPayment[0].sp_code,
        'transaction.sp_message': verifiedPayment[0].sp_message,
        'transaction.transactionStatus': verifiedPayment[0].transaction_status,
        'transaction.method': verifiedPayment[0].method,
        'transaction.date_time': verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status == 'Success'
            ? 'Paid'
            : verifiedPayment[0].bank_status == 'Failed'
              ? 'Pending'
              : verifiedPayment[0].bank_status == 'Cancel'
                ? 'Cancelled'
                : '',
      },
    );
  }

  return verifiedPayment;
};

const deleteOrder = async (id: string) => {
  // delete a specific order
  const result = await Order.findByIdAndDelete(id);
  return result;
};

const updateOrder = async (id: string, data: IOrder) => {
  // udpate
  const result = await Order.findByIdAndUpdate(id, data, {
    new: true,
  });
  return result;
};

export const orderService = {
  updateOrder,
  deleteOrder,
  createOrder,
  getOrders,
  verifyPayment,
  getSingleOrder,
};
