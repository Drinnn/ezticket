import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import mongoose from "mongoose";
import cookieSession from "cookie-session";

import { default as signUpRouter } from "./routes/sign-up";
import { default as signInRouter } from "./routes/sign-in";
import { default as signOutRouter } from "./routes/sign-out";
import { default as getCurrentUserRouter } from "./routes/get-curret-user";
import errorHandler from "./middlewares/error-handler";
import { RouteNotFoundError } from "./errors/route-not-found-error";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.use(signUpRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(getCurrentUserRouter);

app.all("*", () => {
  throw new RouteNotFoundError();
});

app.use(errorHandler);

const bootstrap = async () => {
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
