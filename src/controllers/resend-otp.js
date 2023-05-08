const { User, OTP } = require("../models");
const { nanoid } = require("nanoid");
const { response } = require("../utils/response");
const generateOTP = require("../utils/otp");
const sendEmail = require("../config/nodemailer");

const resendOTP = async (req, res) => {
  try {
    const { id } = req.body;

    const user = await User.findOne({ where: { id } });
    if (!user) return response(res, 404, false, "User not found", null);

    const otpId = nanoid(10);
    const otp = generateOTP();
    const date = new Date();
    const expired = date.setMinutes(date.getMinutes() + 10);
    await OTP.create({
      id: otpId,
      user_id: user.id,
      otp,
      expired,
      is_used: false,
    });

    const html = `<p>${otp}</p>`;
    await sendEmail(user.email, "Verify Email - Renata", html);

    return response(res, 200, true, "OTP has been resend", null);
  } catch (err) {
    return response(res, err.status || 500, false, err.message, null);
  }
};

module.exports = resendOTP;
