import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { AppError } from '../errors/AppError';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';
import catchAsync from '../utils/catchAsync';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req?.headers?.authorization.split(' ')[1];

    //if the token is send from the client
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    //if the token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { role, _id, iat } = decoded;

    const user = await User.findById(_id);

    // console.log('from auth', { decoded, user: user });

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }

    if (user._id.toString() !== _id) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'Token does not belong to this user',
      );
    }

    if (user?.isBlocked) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    //decode undefiend
    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
