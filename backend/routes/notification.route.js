const router = require("express").Router();
const authMiddleware = require("../middlewares/auth.middleware.js");
const Notification = require("../models/notification.model.js");

// add a notification
router.post("/notify", authMiddleware, async (req, res) => {
  try {
    const notification = new Notification(req.body);
    await notification.save();

    res.status(201).json({
      success: true,
      message: "Notification added successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// get all notifications by userId
router.get("/get-all-notification", authMiddleware, async (req, res) => {
  try {
    const notifications = await Notification.find({
      user: req.body.userId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: notifications,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// delete a notification
router.delete("/delete-notification/:id", authMiddleware, async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Notification deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// mark a notification as read
router.put("/read-all-notifications", authMiddleware, async (req, res) => {
  try {
    await Notification.updateMany(
      { user: req.body.userId, read: false },
      { $set: { read: true } }
    );

    res.status(200).json({
      success: true,
      message: "Notification marked as read",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
