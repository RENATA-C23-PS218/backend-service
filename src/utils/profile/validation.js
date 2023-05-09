const Joi = require("joi");
const { responseValidationError } = require("../response");

const createUserProfileValidation = (req, res, next) => {
  const schema = Joi.object({
    first_name: Joi.string().required().label("First Name"),
    last_name: Joi.string().required().label("Last Name"),
    phone: Joi.string().required().label("Phone"),
    address: Joi.string().required().label("Address"),
  });

  const { error } = schema.validate(req.body);
  if (error) return responseValidationError(res, error);

  next();
};

module.exports = {
  createUserProfileValidation,
};
