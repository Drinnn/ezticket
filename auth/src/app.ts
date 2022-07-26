import express from "express";
import { json } from "body-parser";
import cookieSession from "cookie-session";

import { default as signUpRouter } from "./routes/sign-up";
import { default as signInRouter } from "./routes/sign-in";
import { default as signOutRouter } from "./routes/sign-out";
import { default as getCurrentUserRouter } from "./routes/get-curret-user";
import { RouteNotFoundError } from "./errors/route-not-found-error";
import errorHandler from "./middlewares/error-handler";

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

export default app;
