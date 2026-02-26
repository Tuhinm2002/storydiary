import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/db.js";
import router from "./routes/contentRoutes.js";


dotenv.config()
connectDb()

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api",router);

const PORT = process.env.PORT || 5000;

// app.get("/",(req,res) =>{
//     res.send("Api running");
// });

// app.post("/",(req,res) =>{
//     res.send("Api running");
// });


app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
});
