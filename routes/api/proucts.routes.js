"use strict";
const router = require("express").Router();
const Controller = require("../../controllers/products.controller");
const TokenValidator = require("../../middleWares/auth");
const productValidator = require("../../validator/product.validator");

router.post(
  "/",
  productValidator.validateCreateProduct,
  productValidator.validate,
  TokenValidator,
  Controller.createProducts
);
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

module.exports = router;
