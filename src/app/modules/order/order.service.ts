import Bike from '../bike/bike.model';
import { IOrder } from './order.interface';
import Order from './order.model';

const createOrder = async (payload: IOrder): Promise<IOrder> => {
  // get the productId from body
  const { product: productId, quantity } = payload;
  // check if the productId is valid _id from bikes collection
  const bike = await Bike.findById(productId);
  if (!bike) {
    throw new Error('Invalid product ID');
  }
  const availabeQuantity = bike?.quantity as number;

  const updateBike = await Bike.findByIdAndUpdate(
    productId,
    {
      $inc: { quantity: -quantity },
    },
    { new: true },
  );
  if (updateBike?.quantity === 0) {
    await Bike.findByIdAndUpdate(productId, { inStock: false }, { new: true });
  }

  // check if product availabe in stock searching quantity
  if (quantity > availabeQuantity) {
    throw new Error('insufficient stock');
  }

  const result = await Order.create(payload);
  return result;
};

export const orderService = {
  createOrder,
};
