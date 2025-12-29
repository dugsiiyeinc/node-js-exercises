import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import mongoose from 'mongoose'
import authRoutes from './routes/auth.js'
import adminRoutes from './routes/admin.js'
import { errorHandler, logger, notFound } from './middlewares/logger.js';

dotenv.config();
const app=express();
// const postRoutes=require('./routes/posts')
const PORT=process.env.PORT
app.use(express.json())
app.use(cors(
    {
        origin:["http//localhost:5000"]
    }
))

app.use(morgan("dev"))

// custom middleware
app.use(logger)

// routes middleware
app.use('/auth',authRoutes)
app.use('/admin',adminRoutes)

// last route-level middleware
app.use(notFound)

app.use(errorHandler)

app.use(morgan("combined"))
mongoose.connect(process.env.MONGO_URI)
   .then(()=> console.log("✅ mongodb connected locally"))
   .catch((e)=> console.log("❌ connection error:",e));

app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`);
})