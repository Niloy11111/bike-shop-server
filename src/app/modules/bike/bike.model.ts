import { model, Schema } from 'mongoose';
import { IBike } from './bike.interface';

const bikeSchema = new Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
      type: String,
      enum: ['Mountain', 'Road', 'Folding', 'Electric'],
      required: true,
    },
    photoURL: { type: String, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
  },
  { timestamps: true },
);

const Bike = model<IBike>('Bike', bikeSchema);
export default Bike;
