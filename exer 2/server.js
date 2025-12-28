
const express=require('express');
const app=express();

require('dotenv').config();
const cors=require('cors');
const morgan = require('morgan');

const PORT=process.env.PORT
const mongoose=require('mongoose')


app.use(express.json())

app.use(cors(
    {
        origin:["http//localhost:5000"]
    }
))

const booksRoutes=require('./Routes/book')

app.use('/books',booksRoutes)

app.use(morgan("combined"))
mongoose.connect(process.env.MONGO_URI)
   .then(()=> console.log("✅ mongodb connected locally"))
   .catch((e)=> console.log("❌ connection error:",e));

app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`);
})