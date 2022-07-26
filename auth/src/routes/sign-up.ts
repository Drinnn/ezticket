import { Router, Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { BadRequestError } from "../errors/bad-request-error";
import { validateRequest } from "../middlewares/validate-request";
import User from "../models/user";

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
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError("E-mail already in use");
    }

    const user = User.build({ email, password });
    await user.save();

    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET!
    );

    req.session = {
      jwt: userJwt,
    };

    return res.status(201).send(user);
  }
);

export default router;
