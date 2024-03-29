import { Request, Response, Router } from "express";
import { body } from "express-validator";
import { BadRequestError, validateRequestMiddleware } from "ezticket-common";
import jwt from "jsonwebtoken";
import User from "../models/user";
import { Password } from "../services/password";

const router = Router();

router.post(
  "/api/auth/signIn",
  [
    body("email").isEmail().withMessage("E-mail must be valid"),
    body("password").trim().notEmpty().withMessage("Password must be provided"),
  ],
  validateRequestMiddleware,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError("Invalid credentials");
    }

    const isPasswordValid = await Password.compare(
      existingUser.password,
      password
    );
    if (!isPasswordValid) {
      throw new BadRequestError("Invalid credentials");
    }

    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_SECRET!
    );

    req.session = {
      jwt: userJwt,
    };

    return res.status(200).send(existingUser);
  }
);

export default router;
