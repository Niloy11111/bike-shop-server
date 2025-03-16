export type TError = {
  path: string | number;
  message: string;
}[];

export type TErrorSources = {
  path: string | number;
  message: string;
}[];

export type TGenericErrorResponse = {
  statusCode: number;
  message: string;
  error: TError;
  errorSources?: TErrorSources;
};
