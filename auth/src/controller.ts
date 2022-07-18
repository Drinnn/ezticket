import { Request, Response } from "express";
import service from "./service";

const controller = {
  async getCurrentUser(req: Request, res: Response) {
    try {
      await service.getCurrentUser();
    } catch (err) {
      console.log("[AuthService] Error tryinng to get current user:", err);
      res.status(500).json({ error: err.message });
    }
  },
  async signUp(req: Request, res: Response) {
    try {
      await service.signUp();
    } catch (err) {
      console.log("[AuthService] Error trying to sign up:", err);
      res.status(500).json({ error: err.message });
    }
  },
  async signIn(req: Request, res: Response) {
    try {
      await service.signIn();
    } catch (err) {
      console.log("[AuthService] Error trying to sign in:", err);
      res.status(500).json({ error: err.message });
    }
  },
  async signOut(req: Request, res: Response) {
    try {
      await service.signOut();
    } catch (err) {
      console.log("[AuthService] Error trying to sign out:", err);
      res.status(500).json({ error: err.message });
    }
  },
};

export default controller;
