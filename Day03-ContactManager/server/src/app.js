import express from "express";
import cors from "cors";
import contactRouter from "./routers/contact.routes.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use("/api/v1/contacts", contactRouter);

app.use((req, res, next) => {
  const error = new Error("Requested Route not found");
  error.statusCode = 404;
  next(error);
});


export { app };