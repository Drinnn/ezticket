import express, { Request, Response } from "express";
import { validateSignUp } from "./validators";
import controller from "./controller";

const router = express.Router();

router.get("/api/auth", async (req: Request, res: Response) => {
  await controller.getCurrentUser(req, res);
});

router.post(
  "/api/auth/signUp",
  validateSignUp,
  async (req: Request, res: Response) => {
    await controller.signUp(req, res);
  }
);

router.post("/api/auth/signIn", async (req: Request, res: Response) => {
  await controller.signIn(req, res);
});

router.post("/api/auth/signOut", async (req: Request, res: Response) => {
  await controller.signOut(req, res);
});

export default router;
