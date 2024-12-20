import { z } from 'zod';

export const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().max(20),
  }),
});

export const UserValidations = {
  createUserValidationSchema,
};
