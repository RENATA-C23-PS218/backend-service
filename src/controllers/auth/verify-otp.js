const { User, OTP } = require("../../models");
const { response } = require("../../utils/response");
const generateToken = require("../../utils/jwt");

const verifyOTP = async (req, res) => {
  try {
    const { id, otp } = req.body;

    const user = await User.findOne({
      where: { id },
      include: [
        { model: OTP, as: "otp", limit: 1, order: [["createdAt", "DESC"]] },
      ],
    });

    if (!user) return response(res, 404, false, "User not found", null);
    if (user.otp[0].otp !== otp)
      return response(res, 400, false, "Incorrect OTP", null);

    const date = new Date();
    if (user.otp[0].expired.getTime() < date.getTime())
      return response(res, 400, false, "Invalid OTP", null);

    await User.update({ is_verifed: true }, { where: { id } });
    await OTP.update({ is_used: true }, { where: { otp } });

    const token = generateToken(user);

    return response(res, 200, true, "Email verifed, welcome", {
      id,
      email: user.email,
      token,
    });
  } catch (err) {
    return response(res, err.status || 500, false, err.message, null);
  }
};

const verifyOTPResetPassword = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({
      where: { email },
      include: [
        { model: OTP, as: "otp", limit: 1, order: [["createdAt", "DESC"]] },
      ],
    });

    if (!user) return response(res, 404, false, "User not found", null);
    if (user.otp[0].otp !== otp)
      return response(res, 400, false, "Incorrect OTP", null);

    const date = new Date();
    if (user.otp[0].expired.getTime() < date.getTime())
      return response(res, 400, false, "Invalid OTP", null);

    await OTP.update({ is_used: true }, { where: { otp } });

    return response(res, 200, true, "Verify success", null);
  } catch (err) {
    return response(res, err.status || 500, false, err.message, null);
  }
};

module.exports = { verifyOTP, verifyOTPResetPassword };
