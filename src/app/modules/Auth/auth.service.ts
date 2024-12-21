import httpStatus from 'http-status';
import config from '../../config';
import { AppError } from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import { createToken } from './auth.utils';
const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistsbyEmail(payload.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  // checking if the user is blocked
  if (user?.isBlocked) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }

  //checking if the password is correct
  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'password do not matched!');
  }

  console.log('from jwt', user?._id);

  //create token and sent to the client
  const jwtPayload = {
    _id: user?._id,
    role: user?.role,
  };

  const token = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    token,
  };
};

export const AuthServices = {
  loginUser,
};
