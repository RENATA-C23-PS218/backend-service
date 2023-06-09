const Joi = require("joi");
const { responseValidationError } = require("../response");

const plantsRecommendationValidation = (req, res, next) => {
  const schema = Joi.object({
    soilType: Joi.string().required(),
    file: Joi.any(),
  });

  const { error } = schema.validate(req.body);
  if (error) return responseValidationError(res, error);

  next();
};

module.exports = { plantsRecommendationValidation };
