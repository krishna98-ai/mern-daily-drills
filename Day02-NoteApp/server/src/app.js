import express from "express";
import cors from "cors";
import noteRouter from "./routes/note.routes.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" })); 
app.use(express.urlencoded({ extended: true, limit: "16kb" })); 


app.use("/api/v1/notes", noteRouter);


app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export { app };