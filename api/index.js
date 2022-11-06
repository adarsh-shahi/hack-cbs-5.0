import express from 'express';
import connectToMongo from './database.js';
import errorHandler from './controllers/errorControllers.js'
import dotenv from 'dotenv';
dotenv.config();
connectToMongo();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(errorHandler);

app.listen(port,()=>{
   console.log(`App listning at http://localhost:${port}`);
})