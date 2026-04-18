import config from "./config.js";
import mongoose from "mongoose";

const connectDb = async () => {
    try{
        await mongoose.connect(config.MONGO_URI);
        console.log("MongoDb Connected successfully");
    }catch(err){
        console.log(err);
    }
}

export default connectDb;