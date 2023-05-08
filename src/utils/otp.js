const otp = require("otp-generator");

const generateOTP = () => {
  const otpConfig = {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  };

  const userOtp = otp.generate(4, otpConfig);
  return userOtp;
};

module.exports = generateOTP;
