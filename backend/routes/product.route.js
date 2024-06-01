const router = require("express").Router();
const Product = require("../models/product.model.js");
const authMiddleware = require("../middlewares/auth.middleware.js");
const connectToDatabase = require("../config/dbConfig.js");
const multer = require("multer");
const cloudinary = require("../config/cloudinaryConfig.js");

//add products
router.post("/add-product", authMiddleware, async (req, res) => {
  try {
    connectToDatabase();
    const newProduct = await Product.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      age: req.body.age,
      category: req.body.category,
      images: req.body?.images,
      billAvailable: req.body?.billAvailable,
      warrantyAvailable: req.body?.warrantyAvailable,
      accessoriesAvailable: req.body?.accessoriesAvailable,
      boxAvailable: req.body?.boxAvailable,
      seller: req.body.seller,
      status: "pending",
    });

    res.status(201).json({
      success: true,
      message: "Product added successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      data: error.message,
    });
  }
});

//get all products
router.post("/get-products", authMiddleware, async (req, res) => {
  try {
    connectToDatabase();
    const { seller, status, category = [], age = [] } = req.body;
    console.log(req.body);
    let filters = {};
    if (seller) {
      filters.seller = seller;
    }
    if (status) {
      filters.status = status;
    }

    if (category.length > 0) {
      filters.category = { $in: category };
    }
    //filter by age
    if (age.length > 0) {
      age.forEach((item) => {
        const fromAge = item.split("-")[0];
        const toAge = item.split("-")[1];
        filters.age = { $gte: fromAge, $lte: toAge };
      });
    }

    const products = await Product.find(filters)
      .populate("seller")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      data: error.message,
    });
  }
});

//edit produrcts
router.put("/edit-product/:id", authMiddleware, async (req, res) => {
  try {
    connectToDatabase();
    await Product.findByIdAndUpdate(req.params.id, req.body);
    res.send({
      success: true,
      message: "Product updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

//delete products
router.delete("/delete-product/:id", authMiddleware, async (req, res) => {
  try {
    connectToDatabase();
    await Product.findByIdAndDelete(req.params.id);
    res.send({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

//get image from pc
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

//and upload to cloudinary
router.post(
  "/upload-product-image",
  authMiddleware,
  multer({ storage: storage }).single("file"),
  async (req, res) => {
    try {
      connectToDatabase();
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "MarketPlaceProduct",
      });

      const productId = req.body.productId;
      await Product.findByIdAndUpdate(productId, {
        $push: { images: result.secure_url },
      });

      res.send({
        success: true,
        message: "Image uploaded successfully",
        data: result.secure_url,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
);

//update product status
router.put("/update-product-status/:id", authMiddleware, async (req, res) => {
  try {
    connectToDatabase();
    const { status } = req.body;
    await Product.findByIdAndUpdate(req.params.id, { status });
    res.send({
      success: true,
      message: "Product status updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

//delete product image
router.put("/delete-product-image/:id", authMiddleware, async (req, res) => {
  try {
    connectToDatabase();
    const { url } = req.body;
    const product = await Product.findById(req.params.id);

    const images = product.images.filter((img) => img !== url);
    await Product.findByIdAndUpdate(req.params.id, { images });
    res.send({
      success: true,
      message: "Product image deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

//get product by id
router.get("/get-product-by-id/:id", authMiddleware, async (req, res) => {
  try {
    connectToDatabase();
    const product = await Product.findById(req.params.id).populate("seller");
    res.send({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

//search Product by name and description
router.post("/search-product", authMiddleware, async (req, res) => {
  try {
    connectToDatabase();
    const { payload } = req.body;
    console.log(payload);

    const products = await Product.find({
      $or: [
        { status: "approved" },
        { name: { $regex: payload, $options: "i" } },
        { description: { $regex: payload, $options: "i" } },
      ],
    }).populate("seller");

    res.send({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
