const { Scan, Soil } = require("../../models");
const { response } = require("../../utils/response");

const scanHistory = async (req, res) => {
  try {
    const user = req.user;

    const histories = await Scan.findAll({
      where: { user_id: user.id },
      include: [
        {
          model: Soil,
          as: "soil",
        },
      ],
    });
    if (!histories)
      return response(
        res,
        404,
        false,
        "History not found, please do scan first!",
        null
      );

    const scanHistories = [];
    for (const history of histories) {
      const data = {
        scan_id: history.id,
        soil_type: history.soil.name,
        soil_image: history.soil_image,
        date_scan: history.createdAt,
      };
      scanHistories.push(data);
    }

    return response(res, 200, true, "Success get history!", {
      user_id: user.id,
      scanHistories,
    });
  } catch (err) {
    return response(res, err.status || 500, false, err.message, null);
  }
};

module.exports = scanHistory;
