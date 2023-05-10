const router = require("express").Router();
const auth = require("./auth");
const profile = require("./profile");

router.use(auth);
router.use(profile);

module.exports = router;
