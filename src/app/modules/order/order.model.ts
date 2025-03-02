import { model, Schema } from 'mongoose';
import { TOrder } from './order.interface';

const OrderSchema = new Schema<TOrder>(
  {
    user: {
      type: Schema.Types.Mixed,
      required: true,
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Bike',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        category: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        photoURL: { type: String, required: true },
        productName: { type: String, required: true },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    estimatedDeliveryDate: {
      type: Date,
      default: '',
    },
    status: {
      type: String,
      enum: ['Pending', 'Paid', 'Shipped', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
    transaction: {
      id: String,
      transactionStatus: String,
      bank_status: String,
      sp_code: String,
      sp_message: String,
      method: String,
      date_time: String,
    },
  },
  {
    timestamps: true,
  },
);

const Order = model<TOrder>('Order', OrderSchema);

export default Order;
