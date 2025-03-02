import express from 'express';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { USER_ROLE } from '../user/user.const';
import { AuthControllers } from './auth.controller';
import { AuthValidation } from './auth.validation';
const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
);

router.post(
  '/change-password',
  auth(USER_ROLE.admin, USER_ROLE.customer),
  validateRequest(AuthValidation.changePasswordValidationSchema),
  AuthControllers.changePassword,
);

// to make refresh token first login and its already will set a token in res.cookies and then hit the refresh token route to get the refresh token

router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
);

// router.post(
//   '/forget-password',
//   validateRequest(AuthValidation.refreshTokenValidationSchema),
//   AuthControllers.forgetPassword,
// );
// router.post(
//   '/reset-password',
//   validateRequest(AuthValidation.refreshTokenValidationSchema),
//   AuthControllers.resetPassword,
// );

export const AuthRoutes = router;
