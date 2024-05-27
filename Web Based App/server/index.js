const express = require("express");
const CryptoJS = require("crypto-js");
const app = express();
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid"); // Import the uuid library for generating unique IDs
const axios = require("axios");
const { Server } = require("socket.io");
require("dotenv").config();
const server = http.createServer(app);
const tokenRoutes = require("./routes/tokenRoutes");
const connectDB = require("./connection/db");
const { addMessage } = require("./controllers/message");
const documentRoutes = require("./routes/documentRoutes");
const answerRoutes = require("./routes/answerRoutes");

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
app.use("/api/document", documentRoutes);
app.use("/api/answer", answerRoutes);

let onlineUsers = [];

app.get("/api/get-speech-token", async (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  const speechKey = process.env.SPEECH_KEY;
  const speechRegion = process.env.SPEECH_REGION;

  if (
    speechKey === "paste-your-speech-key-here" ||
    speechRegion === "paste-your-speech-region-here"
  ) {
    res
      .status(400)
      .send("You forgot to add your speech key or region to the .env file.");
  } else {
    const headers = {
      headers: {
        "Ocp-Apim-Subscription-Key": speechKey,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    try {
      const tokenResponse = await axios.post(
        `https://${speechRegion}.api.cognitive.microsoft.com/sts/v1.0/issueToken`,
        null,
        headers
      );
      res.send({ token: tokenResponse.data, region: speechRegion });
    } catch (err) {
      res.status(401).send("There was an error authorizing your speech key.");
    }
  }
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
  // add new user
  socket.on("new-user-add", (newUserId, username) => {
    console.log("new user is here!", newUserId, username);
    if (!onlineUsers.some((user) => user.userId === newUserId)) {
      // if user is not added before
      onlineUsers.push({
        userId: newUserId || "anonymous",
        username: username || "anonymous",
        socketId: socket.id,
      });
      console.log("new user is here!", onlineUsers);
    }
    // send all active users to new user
    io.emit("get-users", onlineUsers);
  });

  socket.on("send_message", async (data, cb) => {
    try {
      const { author, receiver, message, type, mineType, fileName } = data;
      const playerId = uuidv4();
      // const secretKey = receiver._id + author._id;
      const secretKey = "9898114851";
      // console.log("This is secretkey", receiver._id, author._id, secretKey);
      const encryptedData = CryptoJS.AES.encrypt(message, secretKey);
      const addMessageResponse = await addMessage(
        author,
        receiver,
        encryptedData.toString()
      );
      io.to(receiver.socketId).emit("receive_message", data);
      cb({ ...data, playerId });
    } catch (error) {
      console.log("error", error.message);
    }
  });

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
    await connectDB(process.env.MONGODB_URL);
    console.log("Connected to the database");
  } catch (err) {
    console.error("Error connecting to the database:", err);
  }
  console.log("SERVER RUNNING");
});
