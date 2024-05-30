const router = require("express").Router();
const Bid = require("../models/bid.model.js");
const authMiddleware = require("../middlewares/auth.middleware.js");

//place a new bid
router.post("/place-new-bid", authMiddleware, async (req, res) => {
  try {
    const bid = new Bid(req.body);
    await bid.save();
    res.send({
      success: true,
      message: "Bid placed successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
});

router.post("/get-all-bids", authMiddleware, async (req, res) => {
  try {
    const { product, seller } = req.body;

    let filters = {};
    if (product) filters.product = product;
    if (seller) filters.seller = seller;
    const bids = await Bid.find(filters)
      .populate("product")
      .populate("seller")
      .populate("buyer");
    res.send({
      success: true,
      data: bids,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
});

module.exports = router;
