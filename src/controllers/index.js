const register = require("./register");
const { verifyOTP, verifyOTPResetPassword } = require("./verify-otp");
const resendOTP = require("./resend-otp");
const login = require("./login");
const forgotPassword = require("./forgot-password");
const resetPassword = require("./reset-password");

module.exports = {
  register,
  verifyOTP,
  verifyOTPResetPassword,
  resendOTP,
  login,
  forgotPassword,
  resetPassword,
};
