const { body } = require("express-validator");

module.exports = {
  body: [
    body("password", "Password should be min 8")
      .not()
      .isEmpty()
      .isString()
      .isLength({ min: 8 }),
      body("newPassword", "Password should be min 8")
      .not()
      .isEmpty()
      .isString()
      .isLength({ min: 8 }),
  ]
};