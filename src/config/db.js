import mongoose from "mongoose";

const connectDb = async function (){

    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongodb connected");
    }
    catch (error){
        console.error("Something went wrong");
        process.exit(1);
    }

}

export default connectDb;