const router = require("express").Router();
const controllers = require("../../controllers/profile");
const validation = require("../../utils/validations/profile-validation");
const middlewares = require("../../middlewares/restrict");
const multer = require("multer");
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // keep images size < 5 MB
  },
});

router.post(
  "/profile",
  middlewares.restrict,
  validation.createUserProfileValidation,
  controllers.update
);
router.get("/profile", middlewares.restrict, controllers.get);
router.post(
  "/profile-image",
  middlewares.restrict,
  upload.single("file"),
  controllers.upAvatar
);

module.exports = router;
