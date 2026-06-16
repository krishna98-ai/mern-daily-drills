import dotenv from "dotenv"
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRouter from "./routes/auth.routes.js";
import applicationRouter from "./routes/application.routes.js";

dotenv.config({
  path:"./.env"
})
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));

app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);

app.use(cookieParser());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/applications", applicationRouter);

export { app };