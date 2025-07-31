const { validationResult, check, body } = require("express-validator");
const { responses } = require('../utils/response')
const ErrorSerializer = require('../serializer/error.serializer')
const httpCodestatus = require('../utils/httpCodes')

module.exports = {
  validateCreateProduct: [
    body("name", "Please enter name").not().isEmpty().isString(),
    body("price", "Please enter Price").not().isEmpty().isString(),
    body("description", "Please enter Description").not().isEmpty().isString(),
  ],
  validateProductId: [
    body("id", "Please enter Product id").not().isEmpty().isString(),
  ],
  validateCart: [
    body("userId", "Please enter User id").not().isEmpty().isString(),
    body("productId", "Please enter Product id").not().isEmpty().isString(),
    body("quantity", "Please enter Quantity").not().isEmpty().isString(),
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
  },
};
