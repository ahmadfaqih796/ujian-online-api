/* eslint-disable no-console */
const logger = require("./logger");
const app = require("./app");
const port = app.get("port");
const server = app.listen(port);
const socketio = require("@feathersjs/socketio");
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
  },
  path: "/messages",
});

const onlineUsers = [];
const targetIdUser = [];
const messages = [];
io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("user-connected", (data, id) => {
    targetIdUser.push(id);
    console.log("first", targetIdUser);
    targetIdUser.forEach((targetId) => {
      const targetObj = data.find((obj) => obj.id === targetId);
      if (targetObj) {
        targetObj.status = true;
      }
    });
    io.emit("update-user-status", data);

    socket.on("before-disconnect", (session) => {
      const targetObjDisconnect = data.find((obj) => obj.id === session.id);
      if (targetObjDisconnect) {
        targetObjDisconnect.status = false;
      }
      console.log("Client disconnected with ID:", targetObjDisconnect);
      io.emit("update-user-status", data);
    });
  });

  socket.on("client-message", (data) => {
    console.log("Received message from client:", data);
    messages.push(data);
    io.emit("server-message", data);
  });

  socket.on("disconnect", () => {
    // console.log("Client disconnected");
  });
});

app.configure(socketio(io));

process.on("unhandledRejection", (reason, p) =>
  logger.error("Unhandled Rejection at: Promise ", p, reason)
);

server.on("listening", () =>
  logger.info(
    "Feathers application started on http://%s:%d",
    app.get("host"),
    port
  )
);
