const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("./src/config/config");
const { Router } = require("./src/api/Router");
const http = require("http");
const app = express();
const server = http.createServer(app);
const WebSocketServer = require("./src/api/helpers/WebSocketServer");

// Setup WebSocket Server
WebSocketServer.initialize(server);

// Setup Express App
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "500kb" }));
app.use(cors());
app.set("view engine", "pug");

// Main Router
app.use("/", Router);

// Start App
server.listen(config.port, () => {
  console.log(`Server Listening on: ${config.port}`);
});

module.exports = server;
