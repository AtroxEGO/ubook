const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("./config/config");
const TokenVerifier = require("./api/v1/middlewares/TokenVerifier");
const { VersionRouter } = require("./api/v1/versionRouter");
const app = express();

// TODO
// - Learn how to write documentation
// - Continue work on user verification (business done);

// Setup Express App
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "500kb" }));
app.use(cors());
app.set("view engine", "pug");

// Router For Version: 1.0
app.use("/v1", VersionRouter);

// Check if server is running (requires token)
app.get("/", [TokenVerifier], (req, res) => {
  res.send("Index Ok");
});

// Start App
app.listen(config.port, () => {
  console.log(`Server Listening on: ${config.port}`);
});
