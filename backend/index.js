const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();

const url =
  app.settings.env === "development"
    ? "http://localhost:3000"
    : "https://sketchbook-black.vercel.app/";
    
app.use(cors({ origin: url }));

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: url,
});

io.on("connection", (socket) => {
  socket.on("beginPath", (arg) => {
    socket.broadcast.emit("beginPath", arg);
  });

  socket.on("drawLine", (arg) => {
    socket.broadcast.emit("drawLine", arg);
  });

  socket.on("changeConfig", (arg) => {
    socket.broadcast.emit("changeConfig", arg);
  });
});

httpServer.listen(5000);
