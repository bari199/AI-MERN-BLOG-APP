import mongoose from "mongoose";

const connectDB = async () => {
    try {
        // Note: The second argument `{}` is often unnecessary in modern Mongoose versions
        await mongoose.connect(process.env.MONGO_URI); 
        console.log("MongoDB connected successfully! 🚀");
    } catch (error) {
        // You should use the 'error' variable defined in the catch block
        console.error("Error connecting to MongoDB", error); 
        process.exit(1);
    };
}

// 👈 Change this line to ES Module default export
export default connectDB;