const mongoose = require('mongoose');

const connectDB = async (retries = 5, delay = 5000) => {
  const uri = process.env.MONGO_URI; // ✅ FIXED KEY

  if (!uri) {
    console.error("❌ MONGO_URI is undefined. Check your .env file");
    process.exit(1);
  }

  while (retries > 0) {
    try {
      console.log("🔍 Connecting to MongoDB...");
      const conn = await mongoose.connect(uri);

      console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
      return;

    } catch (err) {
      retries -= 1;

      console.error(
        `❌ MongoDB connection error (Retries left: ${retries}):`,
        err.message
      );

      if (retries === 0) {
        console.error('❌ Failed to connect after multiple attempts. Exiting...');
        process.exit(1);
      }

      // ⏳ Wait before retry
      await new Promise(res => setTimeout(res, delay));
    }
  }
};

module.exports = connectDB;