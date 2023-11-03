const WebSocket = require("./api/v1/helpers/WebSocketServer");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("./config/config");
const { VersionRouter } = require("./api/v1/versionRouter");
const http = require("http");
const app = express();
const server = http.createServer(app);
const WebSocketServer = require("./api/v1/helpers/WebSocketServer");

// # TODO
// - Learn how to write documentation (/)
// - Use sockets to show when someone tries to book your service (?)

// Setup WebSocket Server
WebSocketServer.initialize(server);

// Setup Express App
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "500kb" }));
app.use(cors());
app.set("view engine", "pug");

// Router For Version: 1.0
app.use("/v1", VersionRouter);

// Check servers health
app.get("/", (req, res) => {
  res.send("Ok");
});

// Start App
server.listen(config.port, () => {
  console.log(`Server Listening on: ${config.port}`);
});

module.exports = server;
