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

const messages = []; // Simpan pesan di sini
io.on("connection", (socket) => {
  console.log("Client connected");
  socket.on("client-message", (data) => {
    console.log("Received message from client:", data);
    messages.push({ text: data.text, id_user: "sasassas" });
    // Kirim pesan ke semua client yang terhubung
    io.emit("server-message", { text: data.text, id_user: data.id_user });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
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
