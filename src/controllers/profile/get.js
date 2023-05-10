const { Profile, User } = require("../../models");
const { response } = require("../../utils/response");

const get = async (req, res) => {
  try {
    const { id } = req.user;

    const user = await User.findOne({ where: { id: id } });

    const profile = await Profile.findOne({ where: { user_id: user.id } });
    if (!profile) return response(res, 404, false, "Profile not found", null);

    return response(res, 200, true, "Successfully Get Profile", {
      email: user.email,
      full_name: `${profile.first_name} ${profile.last_name}`,
      first_name: profile.first_name,
      last_name: profile.last_name,
      phone: profile.phone,
      address: profile.address,
    });
  } catch (error) {
    return response(res, error.status || 500, false, error.message, null);
  }
};

module.exports = get;
