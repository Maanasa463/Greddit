import mongoose from "mongoose";
import env from 'dotenv'
env.config();

// await can happen only inside async functions
export default async function connectDB() { 

    console.log("Mongo_uri", process.env.MONGO_URI);

    try { 
        await mongoose.connect(process.env.MONGO_URI);
        
        console.log("Connect to DB");
    }

    catch(err) {
        console.error("Error in connecting to db", err);
    }
}