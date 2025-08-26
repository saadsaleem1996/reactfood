"use strict";
const router = require("express").Router();
const Controller = require("../../controllers/roles.controller");
const TokenValidator = require("../../middleWares/auth");

router.post(
  "/",
  TokenValidator,
  Controller.createRole
);
router.get("/", TokenValidator,  Controller.getAllRoles);
router.put(
  "/:id",
  TokenValidator,
  Controller.updateRole
);
router.delete(
  "/:id",
  TokenValidator,
  Controller.deleteRole
);

module.exports = router;
