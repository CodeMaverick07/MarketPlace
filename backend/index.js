const express = require("express");
const connectToDatabase = require("./config/dbConfig");
const cors = require("cors");
const app = express();
app.use(express.json());
require("dotenv").config();
app.use(cors());

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
