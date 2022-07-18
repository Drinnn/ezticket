import { ValidationError } from "express-validator";
import CustomError from "./custom-error";
import { ErrorReturnObject } from "./error-return-object-interface";

export default class RequestValidationError extends CustomError {
  statusCode: number = 400;

  constructor(readonly errors: ValidationError[]) {
    super("Invalid request parameters");

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  public serializeErrors(): ErrorReturnObject[] {
    return this.errors.map((error) => {
      return { message: error.msg, field: error.param };
    });
  }
}
