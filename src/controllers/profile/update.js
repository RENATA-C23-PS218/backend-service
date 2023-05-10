const { Profile, User } = require("../../models");
const { response } = require("../../utils/response");

const create = async (req, res) => {
  try {
    const { id } = req.user;
    const { first_name, last_name, phone, address } = req.body;

    const user = await User.findOne({ where: { id } });
    if (!user)
      return response(
        res,
        404,
        false,
        "There are no user with the id you entered",
        null
      );

    if (user.is_verifed === false)
      return response(res, 400, false, "Email not verifed", null);

    await Profile.update(
      {
        user_id: user.id,
        first_name,
        last_name,
        phone,
        address,
      },
      { where: { user_id: user.id } }
    );

    const profile = await Profile.findOne({ where: { user_id: user.id } });

    return response(res, 200, true, "Profile Updated", {
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

module.exports = create;
