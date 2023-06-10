require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes");
const { response } = require("./utils/response");

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api", router);

app.get("/", (req, res) => {
  return response(res, 200, true, "Server running well", null);
});

app.use((req, res) => {
  return response(res, 404, false, "Are you lost?", null);
});

// 500 handler
app.use((err, req, res) => {
  console.log(err);
  return response(res, 500, false, err.message, null);
});

app.listen(process.env.CONTAINER_PORT || 3000, () =>
  console.log(`Listening on port ${process.env.CONTAINER_PORT}`)
);
