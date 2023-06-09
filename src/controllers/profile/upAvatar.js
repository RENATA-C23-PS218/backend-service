const { Storage } = require("@google-cloud/storage");
const { Profile } = require("../../models");
const { response } = require("../../utils/response");
const { nanoid } = require("nanoid");

const encodedServiceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
const buff = Buffer.from(encodedServiceAccountKey, "base64");
const serviceAccountKey = JSON.parse(buff.toString());

const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  credentials: serviceAccountKey,
});

const bucket = storage.bucket(process.env.GOOGLE_CLOUD_STORAGE_BUCKET_PROFILE);

const upAvatar = async (req, res) => {
  const { file } = req;
  const { id } = req.user;

  if (
    file.mimetype !== "image/png" &&
    file.mimetype !== "image/jpeg" &&
    file.mimetype !== "image/jpg"
  ) {
    return response(res, 400, false, "Only support file png, jpeg, jpg", null);
  }

  // encrypt file name
  const filename = `${Date.now()}-${nanoid(16)}.${file.mimetype.split("/")[1]}`;
  // hash the filename

  const blob = bucket.file(filename);

  const blobStream = blob.createWriteStream({
    resumable: false,
  });

  blobStream.on("error", (err) => {
    console.log(err);
    return response(res, 500, false, err.message, null);
  });

  blobStream.on("finish", async () => {
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
    await Profile.update(
      {
        avatar_link: publicUrl,
        updated_at: new Date(),
      },
      {
        where: {
          user_id: id,
        },
      }
    );

    return response(res, 200, true, "Upload success", {
      url: publicUrl,
    });
  });

  blobStream.end(file.buffer);
};

module.exports = upAvatar;
