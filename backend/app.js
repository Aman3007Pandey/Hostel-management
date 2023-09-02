import express, { json } from 'express';
const app=express();
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from "cors";
import morgan from 'morgan';

//const errorMiddleware=require('./middleware/error');
import connectDB from './db/connectDB.js';

const port=3001;

app.use(morgan("dev"));
app.use(cors());
app.use(json());
app.use(cookieParser());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
// middleware

import roomRouter from './routes/roomRoute.js';
import userRouter from './routes/userRoute.js';
import complainRouter from "./routes/complainRoute.js";
import messRouter from "./routes/messRoute.js";
// import mw from './utils/middleware.js';


const MONGO_URL="mongodb+srv://amanpandey3007:1234@cluster0.ogpwasy.mongodb.net/?retryWrites=true&w=majority";


// app.use('/',mw);
app.use('/api/v1',roomRouter);
app.use('/api/v1',userRouter);
app.use('/api/v1',complainRouter);
app.use('/api/v1',messRouter);

const start=async()=>{
   try {
    await connectDB(MONGO_URL);
     app.listen(port,console.log(`Server is listening on port ${port}`));
   } catch (error) {
    console.log(error);
   }

}

start();

