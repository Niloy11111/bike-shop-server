import { model, Schema } from 'mongoose';
import validator from 'validator';
import { IOrder } from './order.interface';

const orderSchema = new Schema<IOrder>(
  {
    email: {
      type: String,
      required: [true, 'Please provide the customer email'],
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: '{VALUE} is not valid email type',
      },
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Bike',
      required: [true, 'Please provide the bike ID'],
    },
    quantity: {
      type: Number,
      required: [true, 'Please provide the quantity'],
      validate: {
        validator: function (value: number) {
          return typeof value === 'number' && value > 0;
        },
        message: '{VALUE} is not a positive quantity',
      },
    },
    totalPrice: {
      type: Number,
      required: [true, 'Please provide the total price'],
      validate: {
        validator: function (value: number) {
          return typeof value === 'number' && value > 0;
        },
        message: '{VALUE} is not a positive number',
      },
    },
  },
  {
    timestamps: true,
  },
);

const Order = model<IOrder>('Order', orderSchema);
export default Order;
