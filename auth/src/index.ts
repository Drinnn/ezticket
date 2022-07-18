import express from "express";
import "express-async-errors";
import { json } from "body-parser";

import { default as signUpRouter } from "./routes/sign-up";
import { default as signInRouter } from "./routes/sign-in";
import { default as signOutRouter } from "./routes/sign-out";
import { default as getCurrentUserRouter } from "./routes/get-curret-user";
import errorHandler from "./middlewares/error-handler";
import { RouteNotFoundError } from "./errors/route-not-found-error";

const app = express();
app.use(json());

app.use(signUpRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(getCurrentUserRouter);

app.all("*", () => {
  throw new RouteNotFoundError();
});

app.use(errorHandler);

app.listen(3000, () => {
  console.log("[AuthService] Running on port 3000...");
});
