import mongoose from 'mongoose';

export const connectDB = async () =>{
  const res =   await mongoose.connect("mongodb://127.0.0.1:27017/Foodapp")
  if(res){
    console.log("MongoDB is connect");
  }
  else{
    console.log("MongoDB is not connect");
  }
}

