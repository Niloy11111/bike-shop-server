"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    constructor(statusCode, message, stack = '') {
        super(message);
        this.statusCode = statusCode;
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.AppError = AppError;
/* some important note about class
super() is being callled in chindlren to send data to parents.
so here Error is Parent and AppError is childrend
-- message goes to super .
  this.statusCode = statusCode; this set as normally classes do.
  and if stack there then   this.stack = stack;

  so we get meesage,statsuCode,stack

*/
