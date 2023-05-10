const router = require("express").Router();
const controllers = require("../controllers");
const validation = require("../utils/validation");
const profile = require("./profile");

router.post("/register", validation.registerValidation, controllers.register);
router.post("/verify", validation.verifyOTPValidation, controllers.verifyOTP);
router.post("/login", validation.loginValidation, controllers.login);
router.post(
  "/forgot-password",
  validation.forgotPasswordValidation,
  controllers.forgotPassword
);
router.post(
  "/verify-reset-password",
  validation.verifyOTPResetPasswordValidation,
  controllers.verifyOTPResetPassword
);
router.put(
  "/reset-password",
  validation.resetPasswordValidation,
  controllers.resetPassword
);
router.post(
  "/resend-verification",
  validation.resendOTPValidation,
  controllers.resendOTP
);

router.use(profile);
module.exports = router;
