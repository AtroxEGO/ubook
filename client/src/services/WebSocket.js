import { io } from "socket.io-client";

export const socket = io(process.env.REACT_APP_API_HOST);

export const closeWebSocketConnection = () => {
  socket.disconnect();
  socket.io.emit("disconnect");
};

export const connectWebSocket = (token) => {
  socket.auth = { token: token };
  socket.connect();
  socket.io.emit("connection");
};
