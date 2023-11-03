import { io } from "socket.io-client";

export const socket = io("http://localhost:3002");

export const closeWebSocketConnection = () => {
  socket.disconnect();
  socket.io.emit("disconnect");
};

export const connectWebSocket = (token) => {
  socket.auth = { token: token };
  socket.connect();
};
