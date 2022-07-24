import CustomError from "./custom-error";
import { ErrorReturnObject } from "./error-return-object-interface";

export class BadRequestError extends CustomError {
  statusCode = 400;

  constructor(readonly message: string) {
    super("Bad request");

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors(): ErrorReturnObject[] {
    return [{ message: this.message }];
  }
}
