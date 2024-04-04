const mongoose = require("mongoose");
const URI = process.env.MONGODB_URI;
const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Connection successful to DB");
  } catch (err) {
    console.error("Database connection failed");
    process.exit(0);
  }
};

module.exports = connectDB;
