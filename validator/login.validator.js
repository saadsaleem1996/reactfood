const { check, body } = require("express-validator");

module.exports = {
  body: [
    body("email", "Email is Mandatory ").not().isEmpty(),
    check("email", "Email is Mandatory Or Invalid Email")
      .not()
      .isEmpty()
      .isEmail(),
    body("password", "Password should be min 8")
      .not()
      .isEmpty()
      .isString()
      .isLength({ min: 8 }),
  ]
};