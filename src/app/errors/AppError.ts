export class AppError extends Error {
  public statusCode: number;

  constructor(statusCode: number, message: string, stack = '') {
    super(message);
    this.statusCode = statusCode;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

/* some important note about class
super() is being callled in chindlren to send data to parents.
so here Error is Parent and AppError is childrend
-- message goes to super .
  this.statusCode = statusCode; this set as normally classes do.
  and if stack there then   this.stack = stack;

  so we get meesage,statsuCode,stack

*/
