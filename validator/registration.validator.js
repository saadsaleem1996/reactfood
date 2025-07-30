const { validationResult, check, body } = require("express-validator");
const { responses } = require("../utils/response");
const ErrorSerializer = require("../serializer/error.serializer");
const httpCodestatus = require("../utils/httpCodes");

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
    body("confirmPassword", "Confirm Password should be min 8")
      .not()
      .isEmpty()
      .isString()
      .isLength({ min: 8 })
  ],
  validate: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      responses(res, {
        httpCode: httpCodestatus.UNPROCESSABLE_ENTITY,
        ...ErrorSerializer.error(
          httpCodestatus.UNPROCESSABLE_ENTITY,
          req.originalUrl,
          errors.array()
        ),
      });
    } else next();
  }
};