"use strict";
const router = require("express").Router();
const Controller = require("../../controllers/category.controller");
const TokenValidator = require("../../middleWares/auth");
const upload = require("../../middleWares/store-image");

router.post(
  "/",
  TokenValidator,
  upload.single("image"),
  Controller.createCategory
);
router.get("/", TokenValidator, Controller.getAllCategories);
router.put("/", TokenValidator, Controller.updateCategory);
router.delete("/", TokenValidator, Controller.deleteCategory);

module.exports = router;
