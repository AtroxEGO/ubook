import { io } from "socket.io-client";

export const socket = io("https://ubook.polakiewicz.com/api");

export const closeWebSocketConnection = () => {
  socket.disconnect();
  socket.io.emit("disconnect");
};

export const connectWebSocket = (token) => {
  socket.auth = { token: token };
  // socket.connect();
};
