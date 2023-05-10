const { User } = require("../../models");
const bcrypt = require("bcrypt");
const { response } = require("../../utils/response");
const generateToken = require("../../utils/jwt");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user)
      return response(
        res,
        404,
        false,
        "These credentials do not match with our records",
        null
      );

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return response(
        res,
        404,
        false,
        "These credentials do not match with our records",
        null
      );

    if (user.is_verifed === false)
      return response(res, 400, false, "Email not verifed", null);

    const token = generateToken(user);

    return response(res, 200, true, "Login success", {
      id: user.id,
      email,
      token,
    });
  } catch (error) {
    return response(res, error.status || 500, false, error.message, null);
  }
};

module.exports = login;
