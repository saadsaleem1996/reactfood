"use strict";
const router = require("express").Router();
const Controller = require("../../controllers/orders.controller");
const TokenValidator = require("../../middleWares/auth");

router.post("/", TokenValidator, Controller.createOrders);
router.put("/", TokenValidator, Controller.updateOrders);
router.delete("/", TokenValidator, Controller.placeOrder);

module.exports = router;
