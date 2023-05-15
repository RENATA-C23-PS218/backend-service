const router = require("express").Router();
const controllers = require("../../controllers/soil");
const middlewares = require("../../middlewares/restrict");
const multer = require("multer");
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // keep images size < 5 MB
  },
});

router.post(
  "/soil",
  middlewares.restrict,
  upload.single("file"),
  controllers.upSoil
);

module.exports = router;
