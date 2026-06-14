import express from "express"
import dotenv from "dotenv"
import expenseRouter from "./routers/expense.route.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import authRouter from "./routers/auth.route.js"
dotenv.config({
    path:"./.env"
})

const app = express()
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    
}))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use("/api/v1/expenses",expenseRouter);
app.use("/api/v1/auth",authRouter);
export default app
