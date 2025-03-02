import mongoose from 'mongoose';
import { TError, TGenericErrorResponse } from '../interface/error';

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  const error: TError = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      if (
        val instanceof mongoose.Error.CastError ||
        val instanceof mongoose.Error.ValidatorError
      ) {
        return {
          path: val.path,
          message: val.message,
        };
      }
      return { path: '', message: 'Unknown error' }; // Handle unexpected cases
    },
  );

  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation Error',
    error,
  };
};

export default handleValidationError;
