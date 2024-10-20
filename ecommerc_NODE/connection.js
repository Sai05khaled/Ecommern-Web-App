require("dotenv").config();
const mongoose = require("mongoose");

const connectionStr =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/Ecommerce";

mongoose
  .connect(connectionStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB", err));

mongoose.connection.on("error", (err) => {
  console.log("MongoDB connection error:", err);
});
