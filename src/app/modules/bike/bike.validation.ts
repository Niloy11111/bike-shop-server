import { z } from 'zod';

export const createBikeValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Please provide the bike name' }),
    brand: z.string({ required_error: 'Please provide the bike brand' }),
    model: z.string({ required_error: 'Please provide the bike model' }),
    price: z
      .number({ required_error: 'Please provide the price' })
      .positive('Price must be a positive number'),
    category: z.enum(['Mountain', 'Road', 'Folding', 'Electric'], {
      required_error: 'Please specify the bike category',
      invalid_type_error: '{VALUE} is not a valid category',
    }),
    description: z.string({
      required_error: 'Please provide a description for the bike',
    }),
    photoURL: z.string({
      required_error: 'Please provide a photoURL for the bike',
    }),
    quantity: z
      .number({ required_error: 'Please provide the quantity' })
      .positive('Quantity must be a positive number'),
    inStock: z.boolean({ required_error: 'Please provide the inStock status' }),
  }),
});

export const BikeValidations = {
  createBikeValidationSchema,
};
