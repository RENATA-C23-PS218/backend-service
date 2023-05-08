const { User, OTP } = require("../models");
const bcrypt = require("bcrypt");
const { response } = require("../utils/response");

const resetPassword = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    if (password !== confirmPassword)
      return response(res, 400, false, "Password doesn't match", null);

    const user = await User.findOne({
      where: { email },
      include: [
        { model: OTP, as: "otp", limit: 1, order: [["createdAt", "DESC"]] },
      ],
    });

    if (!user) return response(res, 404, false, "User not found", null);
    if (user.otp[0].is_used !== true)
      return response(res, 401, false, "Unauthorized", null);

    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.update(
      { password: encryptedPassword },
      { where: { id: user.id } }
    );

    return response(res, 200, true, "Reset password success", {
      id: user.id,
      email,
    });
  } catch (err) {
    return response(res, err.status || 500, false, err.message, null);
  }
};

module.exports = resetPassword;
