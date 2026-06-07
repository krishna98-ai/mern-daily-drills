import express from "express";
import dotenv from "dotenv";
import feedbackRouter from "./routes/feedback.routes.js";
import cors from "cors"

dotenv.config();

export const app = express();
app.use(cors({
  origin: "http://localhost:5173",
    credentials: true,
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
  res.send("app is working...");
});

app.use("/api/v1/feedback", feedbackRouter);