import { io } from "socket.io-client";

export const socket = io(`${process.env.API_HOST}/api`);

export const closeWebSocketConnection = () => {
  socket.disconnect();
  socket.io.emit("disconnect");
};

export const connectWebSocket = (token) => {
  socket.auth = { token: token };
  // socket.connect();
};
