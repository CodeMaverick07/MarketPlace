const mongoose = require("mongoose");

let isConnected = false;
const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);
  if (!process.env.MONGODB_URL) {
    return console.log("MONGO_URL not found");
  }
  if (isConnected) {
    return console.log("already connected to database");
  }
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "MarketPlace",
    });
    isConnected = true;
    console.log("connected to database");
  } catch (error) {
    console.log("error connecting to database", error);
  }
};

module.exports = connectToDatabase;
