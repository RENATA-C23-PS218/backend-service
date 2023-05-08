const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const { responseValidationError } = require("./response");

const registerValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
    confirmPassword: Joi.string().required().label("Password Confirmation"),
  });

  const { error } = schema.validate(req.body);
  if (error) return responseValidationError(res, error);

  next();
};

const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });

  const { error } = schema.validate(req.body);
  if (error) return responseValidationError(res, error);

  next();
};

const verifyOTPValidation = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.string().required().label("Id"),
    otp: Joi.number().required().label("OTP"),
  });

  const { error } = schema.validate(req.body);
  if (error) return responseValidationError(res, error);

  next();
};

const verifyOTPResetPasswordValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    otp: Joi.number().required().label("OTP"),
  });

  const { error } = schema.validate(req.body);
  if (error) return responseValidationError(res, error);

  next();
};

const forgotPasswordValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
  });

  const { error } = schema.validate(req.body);
  if (error) return responseValidationError(res, error);

  next();
};

const resetPasswordValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
    confirmPassword: Joi.string().required().label("Password Confirmation"),
  });

  const { error } = schema.validate(req.body);
  if (error) return responseValidationError(res, error);

  next();
};

const resendOTPValidation = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.string().required().label("Id"),
  });

  const { error } = schema.validate(req.body);
  if (error) return responseValidationError(res, error);

  next();
};

module.exports = {
  registerValidation,
  loginValidation,
  verifyOTPValidation,
  verifyOTPResetPasswordValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
  resendOTPValidation,
};
