const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const url = "http://localhost:3000";

const app = express();
app.use(cors({ origin: url }));

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: url,
});

io.on("connection", (socket) => {
  console.log("server connected");
});

httpServer.listen(5000);
