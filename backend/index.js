const express = require("express");
const connectToDatabase = require("./config/dbConfig");
const cors = require("cors");
const app = express();
app.use(express.json());
require("dotenv").config();

const allowedOrigin = "https://market-place-d5i1.vercel.app";

const corsOptions = {
  origin: allowedOrigin,
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

const port = process.env.PORT || 3000;

const userRoute = require("./routes/user.route.js");
const productRoute = require("./routes/product.route.js");
const bidRoute = require("./routes/bid.route.js");
const notificationRoute = require("./routes/notification.route.js");

app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/bid", bidRoute);
app.use("/api/notification", notificationRoute);
app.get("/", (req, res) => res.send("Welcome to Auction API"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
