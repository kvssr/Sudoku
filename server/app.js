import express from "express";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server);

const __dirname = dirname(fileURLToPath(import.meta.url));
let users = {};

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

app.get("/users", (req, res) => {
  res.send(users);
});

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("chat message", (msg) => {
    if (users[socket.id]) {
      console.log("chat message", msg);
      io.to(users[socket.id]).emit("chat message", msg);
    } else {
      socket.emit("chat message", "You need to join a room first");
    }
  });

  socket.on("room connect", (room) => {
    console.log("room connected", socket.id, room);
    socket.join(room);
    users[socket.id] = room;
    io.to(room).emit(
      "user connected",
      `${socket.id} connected to room ${room}`
    );
  });
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
