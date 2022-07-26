import { Router } from "express";
import { currentUser } from "../middlewares/current-user";

const router = Router();

router.get("/api/auth", currentUser, (req, res) => {
  return res.status(200).send({ currentUser: req.currentUser || null });
});

export default router;
