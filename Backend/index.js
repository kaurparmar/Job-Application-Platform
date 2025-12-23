import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import userRoute from "./routes/user.route.js"
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import companyRoute from "./routes/company.route.js"
import jobRoute from "./routes/job.route.js"
import applicationRoute from "./routes/application.route.js"
import mongoose from 'mongoose';

dotenv.config({});
const app=express();
app.get("/",(req,res)=>{
    return res.status(200).json({
        message:"Welcome to the API!",
        timestamp: new Date().toISOString(),
        success:true,
    })
})
//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
const corsOptions = {
    origin: [process.env.CLIENT_ORIGIN || 'http://localhost:5173', 'http://localhost:5121'],
    credentials: true,
}
app.use(cors(corsOptions))

console.log('CORS allowed origins:', corsOptions.origin);
const PORT=process.env.PORT || 5001;
// http://localhost:5011/api/users/register
// http://localhost:5011/api/users/login
// http://localhost:5011/api/users/profile/update

//api's
app.use("/api/users",userRoute);
app.use("/api/company",companyRoute);
app.use("/api/job",jobRoute);
app.use("/api/application", applicationRoute);
app.listen(PORT,()=>{
    connectDB()
    console.log(`Server is running on port http://localhost:${PORT}`);
})
