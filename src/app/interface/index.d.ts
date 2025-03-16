import { ErrorRequestHandler, ParamsDictionary, ParsedQs } from 'express';
import { TUser } from '../modules/user/user.interface';

declare global {
  namespace Express {
    interface Request
      extends ErrorRequestHandler<
        ParamsDictionary,
        any,
        any,
        ParsedQs,
        Record<string, any>
      > {
      user?: TUser;
    }
  }
}
