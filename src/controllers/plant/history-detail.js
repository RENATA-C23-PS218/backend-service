const { Soil, Plant, Scan } = require("../../models");
const { response } = require("../../utils/response");
const { Op } = require("sequelize");

const historyDetail = async (req, res) => {
  try {
    const user = req.user;
    const { id } = req.params;

    if (!id) return response(res, 400, false, "Scan ID not provided!", null);

    const detailHistory = await Scan.findOne({
      where: {
        [Op.and]: [{ id }, { user_id: user.id }],
      },
      include: [
        {
          model: Soil,
          as: "soil",
          include: [
            {
              model: Plant,
              as: "plant",
            },
          ],
        },
      ],
    });
    if (!detailHistory)
      return response(res, 404, false, "Data not found!", null);

    const plantData = []
    for (const plant of detailHistory.soil.plant) {
      plantData.push(plant.name)
    }

    return response(res, 200, true, "Success get detail history", {
      soil_type: detailHistory.soil.name,
      soil_image: detailHistory.soil_image,
      plant_recommendations: plantData,
      date_scan: detailHistory.createdAt,
    });
  } catch (err) {
    return response(res, err.status || 500, false, err.message, null);
  }
};

module.exports = historyDetail;
