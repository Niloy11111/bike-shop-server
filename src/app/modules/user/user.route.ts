import express from 'express';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { USER_ROLE } from './user.const';
import { UserControllers } from './user.controller';
import { UserValidations } from './user.validation';

const UserRoutes = express.Router();

UserRoutes.post(
  '/register',
  validateRequest(UserValidations.createUserValidationSchema),
  UserControllers.createUser,
);

UserRoutes.patch(
  '/:userId',
  auth(USER_ROLE.customer, USER_ROLE.admin),
  UserControllers.updateUserProfile,
);

UserRoutes.get('/allUsers', auth(USER_ROLE.admin), UserControllers.getUsers);

export default UserRoutes;
