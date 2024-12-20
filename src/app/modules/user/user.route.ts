import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AuthControllers } from '../Auth/auth.controller';
import { AuthValidations } from '../Auth/auth.validation';
import { UserControllers } from './user.controller';
import { UserValidations } from './user.validation';

const router = express.Router();

router.post(
  '/register',
  validateRequest(UserValidations.createUserValidationSchema),
  UserControllers.createUser,
);

router.post(
  '/login',
  validateRequest(AuthValidations.loginValidationSchema),
  AuthControllers.loginUser,
);

export const UserRoutes = router;
