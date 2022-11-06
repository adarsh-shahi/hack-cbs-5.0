import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const url = process.env.CONN_URL;
const connectToMongo = () =>{
   mongoose.connect(url,()=>{
      console.log('Successfully connected to the DataBase');
   })
}
export default connectToMongo;