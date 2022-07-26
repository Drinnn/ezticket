import "express-async-errors";
import mongoose from "mongoose";
import app from "./app";

const bootstrap = async () => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET must be defined");
  }

  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("[AuthService] Connected to MongoDB");
  } catch (e) {
    console.error(e);
  }

  app.listen(3000, () => {
    console.log("[AuthService] Running on port 3000...");
  });
};

bootstrap();
