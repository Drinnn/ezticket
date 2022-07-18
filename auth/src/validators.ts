import { body } from "express-validator";

export const validateSignUp = [
  body("email").isEmail().withMessage("E-mail must be a valid e-mail"),
  body("password")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Password must be between 4 and 20 characters"),
];