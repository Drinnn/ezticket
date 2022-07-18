import express from "express";
import { json } from "body-parser";
import router from "./router";

const app = express();
app.use(json());
app.use(router);

app.listen(3000, () => {
  console.log("[AuthService] Running on port 3000...");
});
