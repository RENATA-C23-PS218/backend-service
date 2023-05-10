const { User, OTP } = require("../../models");
const { nanoid } = require("nanoid");
const sendEmail = require("../../config/nodemailer");
const { response } = require("../../utils/response");
const generateOTP = require("../../utils/otp");

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });
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
    await sendEmail(user.email, "Reset Password - Renata", html);

    return response(res, 200, true, "Reset password OTP has been send", null);
  } catch (err) {
    return response(res, err.status || 500, false, err.message, null);
  }
};

module.exports = forgotPassword;
