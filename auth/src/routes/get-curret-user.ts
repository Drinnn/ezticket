import { Router } from "express";
import jwt from "jsonwebtoken";

const router = Router();

router.get("/api/auth", (req, res) => {
  if (!req.session || !req.session.jwt) {
    return res.status(200).send({ currentUser: null });
  }

  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_SECRET!);
    res.status(200).send({ currentUser: payload });
  } catch (err) {
    res.status(401).send({ currentUser: null });
  }
});

export default router;
