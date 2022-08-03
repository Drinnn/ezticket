import { Router } from "express";
import { currentUserMiddleware } from "ezticket-common";

const router = Router();

router.get("/api/auth", currentUserMiddleware, (req, res) => {
  return res.status(200).send({ currentUser: req.currentUser || null });
});

export default router;
