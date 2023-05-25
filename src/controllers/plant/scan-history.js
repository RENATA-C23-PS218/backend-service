const { Scan, Soil } = require("../../models");
const { response } = require("../../utils/response");

const scanHistory = async (req, res) => {
  try {
    const user = req.user;

    const history = await Scan.findALl({
      where: { user_id: user.id },
      include: [
        {
          model: Soil,
          as: "soil",
        },
      ],
    });
    if (!history)
      return response(
        res,
        404,
        false,
        "History not found, please do scan first!",
        null
      );

    return response(res, 200, true, "Success get history!", {
      user_id: user.id,
      soil_type: history.soil.name,
      date_scan: history.createdAt,
    });
  } catch (err) {
    return response(res, err.status || 500, false, err.message, null);
  }
};

module.exports = scanHistory;
