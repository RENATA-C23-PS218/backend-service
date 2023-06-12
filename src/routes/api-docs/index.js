const router = require("express").Router();
const fs = require("fs");
const YAML = require("yaml");
const swaggerUi = require("swagger-ui-express");
const file = fs.readFileSync(".api-docs/renata-api-docs-v1.2.yaml", "utf8");
const apiDocs = YAML.parse(file);

router.use("/docs", swaggerUi.serve);
router.get("/docs", swaggerUi.setup(apiDocs));

module.exports = router;
