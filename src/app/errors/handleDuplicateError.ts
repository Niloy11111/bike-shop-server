import { TError, TGenericErrorResponse } from '../interface/error';

const handleDuplicateError = (err: Error): TGenericErrorResponse => {
  const extractedMessage = err.message.match(/"([^"]+)"/)?.[1];

  const error: TError = [
    {
      path: '',
      message: `${extractedMessage} is already exists`,
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: 'Invalid ID',
    error: error,
    errorSources: error,
  };
};

export default handleDuplicateError;
