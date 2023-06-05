const router = require("express").Router();
const controllers = require("../../controllers/plant");
const middlewares = require("../../middlewares/restrict");
// const validation = require("../../utils/validations/plant-validation");
const multer = require("multer");
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // keep images size < 5 MB
  },
});

router.post(
  "/plant-recommendations",
  middlewares.restrict,
  // validation.plantsRecommendationValidation,
  upload.single("file"),
  controllers.plantRecommendation
);
router.get("/scan-histories", middlewares.restrict, controllers.scanHistory);

module.exports = router;
