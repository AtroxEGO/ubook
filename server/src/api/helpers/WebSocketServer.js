const config = require("../../config/config");
const SocketTokenVerifier = require("../middlewares/SocketTokenVerifier");
const socketIO = require("socket.io");

class WebSocketServer {
  constructor() {
    this.server = null;
    this.io = null;
  }

  // Initialize the WebSocket Server
  initialize(server) {
    this.server = server;
    this.io = socketIO(this.server, config.socketConfig);
    this.io.use(SocketTokenVerifier);

    // Join the user to a room with the name of the account type and the id
    this.io.on("connection", (socket) => {
      const roomName = `${socket.userData.accountType}:${socket.userData.id}`;
      console.log("New Connection from: ", roomName);

      socket.join(roomName);

      socket.on("disconnect", () => {
        console.log("User disconnected: ", roomName);
        socket.leave(roomName);
      });
    });
  }

  // Send a notification to a account
  sendNotification(accountType, id, notification) {
    const roomName = `${accountType}:${id}`;
    this.io.to(roomName).emit("notification", notification);
  }
}

module.exports = new WebSocketServer();
