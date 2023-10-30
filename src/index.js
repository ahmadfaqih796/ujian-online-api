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
  // path: "/messages",
});

const onlineUsers = [];
const readUsers = [];
const messages = [];
const deleteData = [];
io.on("connection", (socket) => {
  // console.log("Client connected");

  socket.on("message-read", (data) => {
    console.log("data", data);
    readUsers.push(data);
    io.emit("server-message-read", data);
  });

  // ini yang baru
  socket.on("user-active", (data) => {
    if (!onlineUsers.includes(data.id)) {
      onlineUsers.push(data.id);
    }
    io.emit("update-online", onlineUsers);
    console.log("yang aktiff", onlineUsers);
    socket.on("before-disconnect", (session) => {
      const targetId = session.id;
      const targetIndex = onlineUsers.indexOf(targetId);
      console.log("lok", targetIndex);
      if (targetIndex !== -1) {
        onlineUsers.splice(targetIndex, 1);
      }
      io.emit("update-online", onlineUsers);
      console.log("Client disconnected with ID:", onlineUsers);
    });
  });

  // ini yang lama
  socket.on("user-connected", (data, id) => {
    if (!onlineUsers.includes(id)) {
      onlineUsers.push(id);
    }
    console.log("first", onlineUsers);
    onlineUsers.forEach((targetId) => {
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
  // ================================================================================
  socket.on("delete-message", ({ id }) => {
    if (!deleteData.includes(id)) {
      deleteData.push(id);
    }
    console.log(deleteData);
  });

  socket.on("get-message", (data) => {
    deleteData.forEach((targetId) => {
      const targetObj = data.find((obj) => obj.id === targetId);
      if (targetObj) {
        targetObj.is_deleted = true;
      }
      console.log("halllo", targetObj);
    });
    io.emit("get-server-message", data);
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
