import { Date, Document, Types } from 'mongoose';

export interface TOrderUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  phone: string;
  address: string;
  city: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface TOrder extends Document {
  user: Pick<TOrderUser, 'name' | 'email' | 'phone' | '_id'>;
  products: {
    product: Types.ObjectId;
    quantity: number;
    price?: number;
  }[];
  totalPrice: number;
  status: 'Pending' | 'Paid' | 'Shipped' | 'Completed' | 'Cancelled';
  estimatedDeliveryDate: string;
  transaction: {
    id: string;
    transactionStatus: string;
    bank_status: string;
    sp_code: string;
    sp_message: string;
    method: string;
    date_time: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export type IOrder = {
  status: 'Pending' | 'Paid' | 'Shipped' | 'Completed' | 'Cancelled';
  estimatedDeliveryDate: string;
};

export interface TCustomerExpenseData {
  userId: string;
  expenseData: { name: string; Total: number }[];
}
