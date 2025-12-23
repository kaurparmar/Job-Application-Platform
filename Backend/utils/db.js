import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("MongoDB Connected...");
        return true;
    }
    catch (err) {
        console.error("Error Connecting to MongoDB:", err.message);
        // Don't exit the process immediately so the server can start and we can observe errors
        // Return false to indicate failure and let the caller decide how to handle it
        return false;
    }
}
export default connectDB;