const router = require("express").Router();
const controllers = require("../../controllers/profile");
const validation = require("../../utils/validations/profile-validation");
const middlewares = require("../../middlewares/restrict");

router.post(
  "/profile",
  middlewares.restrict,
  validation.createUserProfileValidation,
  controllers.update
);
router.get("/profile", middlewares.restrict, controllers.get);

module.exports = router;
