import { Router } from "express";

const router = Router();

router.post("/api/auth/signOut", (req, res) => {
  req.session = null;

  res.status(200).send({});
});

export default router;
