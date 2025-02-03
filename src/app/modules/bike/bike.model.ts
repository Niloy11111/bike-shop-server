import { model, Schema } from 'mongoose';
import { IBike } from './bike.interface';
const bikeSchema = new Schema<IBike>(
  {
    name: {
      type: String,
      required: [true, 'Please provide the bike name'],
    },
    brand: {
      type: String,
      required: [true, 'Please provide the bike brand'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide the price'],
      validate: {
        validator: function (value: number) {
          return typeof value === 'number' && value > 0;
        },
        message: '{VALUE} is not a positive number',
      },
    },

    category: {
      type: String,
      enum: {
        values: ['Mountain', 'Road', 'Hybrid', 'Electric'],
        message: '{VALUE} is not a valid category',
      },
      required: [true, 'Please specify the bike category'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a description for the bike'],
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
    inStock: {
      type: Boolean,
      required: [true, 'Please provide the inStock'],
    },
  },
  {
    timestamps: true,
  },
);

const Bike = model<IBike>('Bike', bikeSchema);
export default Bike;
