const router = require("express").Router();
const auth = require("./auth");
const profile = require("./profile");
const apiDocs = require("./api-docs");

router.use(auth);
router.use(profile);
router.use(apiDocs);

module.exports = router;
