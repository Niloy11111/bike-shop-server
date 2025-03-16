/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express'; // Correct imports
import httpStatus from 'http-status';

// prev:
// const notFound = (req: Request, res: Response, next: NextFunction) => {
//   return res.status(httpStatus.NOT_FOUND).json({
//     success: false,
//     message: 'api not found',
//   });
// };

// with chatgp help toprev:

const notFound = (req: Request, res: Response, next: NextFunction): void => {
  res
    .status(httpStatus.NOT_FOUND)
    .json({ success: false, message: 'api not found' });
};

export default notFound;
