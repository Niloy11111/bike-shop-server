import { z } from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string().email({ message: 'Invalid email format.' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

export const AuthValidations = {
  loginValidationSchema,
};
