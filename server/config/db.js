import mongoose from 'mongoose';
import dns from 'dns';

// Fix SRV DNS resolution on local ISPs/Windows networks for mongodb+srv://
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (err) {
  // Fallback if environment restricts custom DNS servers
}

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ankit_portfolio';
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`[MongoDB] Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`[MongoDB Warning] Could not connect to MongoDB: ${error.message}`);
    console.warn(`[MongoDB Warning] The server will run, but API routes using Mongo DB require an active MongoDB server.`);
    return false;
  }
};

export default connectDB;
