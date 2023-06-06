const { nanoid } = require("nanoid");
const bcrypt = require("bcrypt");
const { User, Role, OTP, Profile } = require("../../models");
const { response } = require("../../utils/response");
const sendEmail = require("../../config/nodemailer");
const generateOTP = require("../../utils/otp");
const htmlTemplate = require("../../utils/html-template");

const register = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    if (password !== confirmPassword)
      return response(res, 400, false, "Password doesn't match", null);

    const userExist = await User.findOne({ where: { email } });
    if (userExist) return response(res, 400, false, "Email already used", null);

    const id = nanoid(10);
    const encryptedPassword = await bcrypt.hash(password, 10);
    const role = await Role.findOne({ where: { name: "user" } });
    const user = await User.create({
      id,
      role_id: role.id,
      email,
      password: encryptedPassword,
      account_type: "basic",
      is_active: true,
      is_verifed: false,
    });

    // automatically empty profile for user
    const profile_id = nanoid(10);
    await Profile.create({
      id: profile_id,
      user_id: user.id,
      first_name: "",
      last_name: "",
      phone: "",
      address: "",
      avatar_link: "",
    });

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

    const html = await htmlTemplate("verify-email.ejs", { otp });
    await sendEmail(user.email, "Verify Email - Renata", html);

    return response(res, 201, true, "Register success", { id: user.id, email });
  } catch (err) {
    return response(res, err.status || 500, false, err.message, null);
  }
};

module.exports = register;
