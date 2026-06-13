import express from "express"
import dotenv from "dotenv"
import expenseRouter from "./routers/expense.route.js"
import cors from "cors"
dotenv.config({
    path:"./.env"
})

const app = express()
app.use(cors({
    origin: "*"
    
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/api/v1/expenses",expenseRouter);
export default app
