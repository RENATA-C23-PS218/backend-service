const { Plant, Soil, Scan } = require("../../models");
const { nanoid } = require("nanoid");
const { response } = require("../../utils/response");

const plantRecommendation = async (req, res) => {
  try {
    const user = req.user;
    const { soilType } = req.body;

    const soil = await Soil.findOne({
      where: { name: soilType.charAt(0).toUpperCase() + soilType.slice(1) },
    });
    if (!soil) return response(res, 404, false, "Soil Type not found!", null);

    const plants = await Plant.findAll({ where: { soil_id: soil.id } });
    if (!plants) return response(res, 404, false, "Plants not found!", null);

    const id = nanoid(10);
    await Scan.create({ id, user_id: user.id, soil_id: soil.id });

    return response(res, 200, true, "Success get plan recommendation!", plants);
  } catch (err) {
    return response(res, err.status || 500, false, err.message, null);
  }
};

module.exports = plantRecommendation;
