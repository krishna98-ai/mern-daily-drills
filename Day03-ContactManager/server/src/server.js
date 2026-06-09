import dotenv from "dotenv";
import connectDB from "./db/db.js";
import { app } from "./app.js";


dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 8000;


connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.error("Express Server Error: ", error);
      throw error;
    });

    app.listen(PORT, () => {
      console.log(`⚙️  Server is running smoothly at port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed !!! ", err);
  });