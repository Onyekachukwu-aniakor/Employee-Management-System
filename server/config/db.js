import mongoose from'mongoose';

const connectDB = async (req, res) => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MONGODB Successfully')
    } catch (error) {
        console.log('Not connected to MongoDB', error.message);
        process.exit(1)
        
    }
}

export default connectDB;