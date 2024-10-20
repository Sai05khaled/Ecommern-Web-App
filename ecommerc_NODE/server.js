const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require("cors");
const User = require("./models/user");
const bodyParser = require("body-parser");
//const stripe = require(stripe)(); //key
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});
require("dotenv").config();

const user = require("./models/user.js");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes.js");
const imageRoutes = require("./routes/imageRoutes.js");
const orderRoutes = require("./routes/orderRoutes.js");
const { default: Stripe } = require("stripe");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/users", userRoutes);
app.use(bodyParser.json());
app.use("products", productRoutes);
app.use("/images", imageRoutes);
app.use("/orders", orderRoutes);

app.post("/create-payment", async (req, res) => {
  const { amount } = req.body;
  try {
    const paymentIntent = await Stripe.paymentIntent.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });
    res.status(200).json(paymentIntent);
  } catch (e) {
    res.status(400).json(e.message);
  }
});

server.listen(3100, () => {
  console.log("server at port", 3100);
});

app.set("socketio", io);
