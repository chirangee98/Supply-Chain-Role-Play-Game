import { mongoose } from "mongoose";


export const connectDB =  async () => {
    try {
        const connectionInstance = await mongoose.connect('mongodb://0.0.0.0:27017/supply_chain');
        console.log(`\n MongoDB connected !! DB Host : ${connectionInstance.connection.host}`);
        // console.log(connectionInstance);
    } catch (error) {
        console.error("MongoDB Error :" + error);
        process.exit(1)
    }
}