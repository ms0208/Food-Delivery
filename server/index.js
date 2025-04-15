import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { connectDB } from './config/db.js';
import foodRouter from './routers/foodrouter.js';
import userRouter from './routers/userrouter.js';
import dotenv from 'dotenv';
import cartRouter from './routers/cartrouter.js';
import orderRouter from './routers/orderrouter.js';
dotenv.config();
// app config
const app = express();
const port = process.env.PORT;


// middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

//db connect
connectDB();



//API endpoint
app.use('/api/food',foodRouter);
app.use('/images',express.static('uploads'))
app.use('/api/user',userRouter);
app.use('/api/cart',cartRouter);
app.use('/api/order',orderRouter);

app.get("/",(req,res)=>{
    res.send("API WORKING");
})

app.listen(port, () => {
    console.log(`Server is listening at ${port}`);
})
