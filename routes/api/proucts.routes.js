"use strict";
const router = require("express").Router();
const Controller = require("../../controllers/products.controller");
const TokenValidator = require("../../middleWares/auth");
const productValidator = require("../../validator/product.validator");
const upload = require("../../middleWares/store-image");

router.post(
  "/",
  TokenValidator,
//   productValidator.validateCreateProduct,
  productValidator.validate,
  upload.single("image"),
  Controller.createProducts
);
router.get("/", TokenValidator, Controller.getAllProducts);
router.post(
  "/addCart",
  productValidator.validateCart,
  productValidator.validate,
  TokenValidator,
  Controller.addTocard
);
router.put(
  "/",
  productValidator.validateProductId,
  productValidator.validate,
  TokenValidator,
  Controller.updateProduct
);
router.delete(
  "/",
  productValidator.validateProductId,
  productValidator.validate,
  TokenValidator,
  Controller.deleteProduct
);

router.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;
  res.status(200).json({ imageUrl });
});

module.exports = router;
