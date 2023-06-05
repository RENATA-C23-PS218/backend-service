const { Plant, Soil, Scan } = require("../../models");
const { Storage } = require("@google-cloud/storage");
const { nanoid } = require("nanoid");
const { response } = require("../../utils/response");

const encodedServiceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
const buff = Buffer.from(encodedServiceAccountKey, "base64");
const serviceAccountKey = JSON.parse(buff.toString());

const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  credentials: serviceAccountKey,
});

const bucket = storage.bucket(process.env.GOOGLE_CLOUD_STORAGE_BUCKET_SOIL);

const plantRecommendation = async (req, res) => {
  try {
    const user = req.user;
    const { file } = req;
    const { soilType } = req.body;

    if (
      file.mimetype !== "image/png" &&
      file.mimetype !== "image/jpg" &&
      file.mimetype !== "image/jpeg"
    )
      return response(
        res,
        400,
        false,
        "Only support file png, jpg, and jpeg",
        null
      );

    const soil = await Soil.findOne({
      where: { name: soilType.charAt(0).toUpperCase() + soilType.slice(1) },
    });
    if (!soil) return response(res, 404, false, "Soil Type not found!", null);

    const plants = await Plant.findAll({ where: { soil_id: soil.id } });
    if (!plants) return response(res, 404, false, "Plants not found!", null);

    const filename = `${Date.now()}-${nanoid(16)}.${
      file.mimetype.split("/")[1]
    }`;

    const blob = bucket.file(filename);

    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    blobStream.on("error", (err) => {
      console.log(err);
      return response(res, 500, false, err.message, null);
    });

    let publicUrl;
    const id = nanoid(10);
    blobStream.on("finish", async () => {
      publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      await Scan.create({
        id,
        user_id: user.id,
        soil_id: soil.id,
        soil_image: publicUrl,
      });
    });
    blobStream.end(file.buffer);

    return response(res, 200, true, "Success get plan recommendation!", plants);
  } catch (err) {
    return response(res, err.status || 500, false, err.message, null);
  }
};

module.exports = plantRecommendation;
