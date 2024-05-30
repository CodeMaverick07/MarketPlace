const router = require("express").Router();
const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const connectToDatabase = require("../config/dbConfig.js");
const authMiddleware = require("../middlewares/auth.middleware.js");

router.post("/register", async (req, res) => {
  try {
    connectToDatabase();
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    connectToDatabase();
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    if (user.status === "blocked") {
      return res.status(400).json({
        success: false,
        message: "User is blocked",
      });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/get-current-user", authMiddleware, async (req, res) => {
  try {
    connectToDatabase();
    const user = await User.findById(req.body.userId);
    res.status(200).json({
      success: true,
      message: "user fateched successfully",
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

//get all users
router.get("/get-all-users", authMiddleware, async (req, res) => {
  try {
    connectToDatabase();
    const users = await User.find();
    res.status(200).json({
      success: true,
      message: "users fetched successfully",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

//update user status
router.put("/update-user-status/:id", authMiddleware, async (req, res) => {
  try {
    connectToDatabase();
    const status = req.body.status;

    await User.findByIdAndUpdate(req.params.id, { status });
    res.send({
      success: true,
      message: "User status updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
