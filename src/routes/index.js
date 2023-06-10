const router = require("express").Router();
const auth = require("./auth");
const profile = require("./profile");
const apiDocs = require("./api-docs");
const plant = require("./plant");

router.use(auth);
router.use(profile);
router.use(apiDocs);
router.use(plant);

module.exports = router;
