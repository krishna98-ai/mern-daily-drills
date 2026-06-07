import { app } from "./app.js";
import connectDB from "./db/db.js";

connectDB().then(()=>{
app.listen(process.env.PORT,()=>{
    console.log("server is litenins at 3000!");
})
})
