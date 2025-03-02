/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.const';

export interface TUser extends Document {
  id: string;
  name: string;
  email: string;
  password: string;
  needsPasswordChange: boolean;
  passwordChangedAt?: Date;
  role: 'customer' | 'admin';
  phone: string;
  country: string;
  city: string;
  img?: string;
  isBlocked: boolean;
  isDeleted: boolean;
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
