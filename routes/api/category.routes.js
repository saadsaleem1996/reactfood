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
router.put("/:id", TokenValidator, Controller.updateCategory);
router.delete("/:id", TokenValidator, Controller.deleteCategory);

module.exports = router;
