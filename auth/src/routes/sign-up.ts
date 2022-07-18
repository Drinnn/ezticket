import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import RequestValidationError from "../errors/request-validation-error";

const router = Router();

router.post(
  "/api/auth/signUp",
  [
    body("email").isEmail().withMessage("E-mail must be a valid e-mail"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    res.send({});
  }
);

export default router;
