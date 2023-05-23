const router = require("express").Router();
const controllers = require("../../controllers/plant");
const middlewares = require("../../middlewares/restrict");
const validation = require("../../utils/validations/plant-validation")

router.post(
  "/plat-recommendation",
  middlewares.restrict,
  validation.plantsRecommendationValidation,
  controllers.plantRecommendation
);
router.get("/scan-histories", middlewares.restrict, controllers.scanHistory);

module.exports = router;
