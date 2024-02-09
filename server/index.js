const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid"); // Import the uuid library for generating unique IDs
const { Server } = require("socket.io");
require("dotenv").config();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());

let onlineUsers = [];

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
  // add new user

  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    console.log("user disconnected", onlineUsers);
    // send all online users to all users
    io.emit("get-users", onlineUsers);
    console.log("User Disconnected", socket.id);
  });

  socket.on("offline", () => {
    // remove user from active users
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    console.log("user is offline", onlineUsers);
    // send all online users to all users
    io.emit("get-users", onlineUsers);
  });
});

server.listen(5000, async () => {
  try {
    // await connectDB(process.env.MONGODB_URL);
    console.log("Connected to the database");
  } catch (err) {
    console.error("Error connecting to the database:", err);
  }
  console.log("SERVER RUNNING");
});
