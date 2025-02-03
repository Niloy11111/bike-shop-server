/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.const';

export interface TUser {
  name: string;
  email: string;
  password: string;
  role: 'customer' | 'admin';
  isBlocked: boolean;
}

//17:3 video

export interface UserModel extends Model<TUser> {
  // myStaticMethod(): number;
  isUserExistsbyEmail(email: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
