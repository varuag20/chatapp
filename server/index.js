const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");

const app = express();
const socket = require("socket.io");
require("dotenv").config();
app.use(cors());
app.use(express.json());

const DB = process.env.MONGO_URL;
mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connection Sucessfull");
}).catch((err) => { console.log(err) });


app.use("/api/auth", authRoutes);// Routing middleware: Directing requests with the path '/api/auth' to the 'authRoutes' module.
app.use("/api/messages", messageRoutes);

// to listen for incoming requests on specified port
const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);
// to create a socket connection with a server
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();

// listens for any new socket connections and trigger the callback function when a new connection is established
io.on("connection", (socket) => {
  global.chatSocket = socket;
// listens for the "add-user" event emitted from  socket.emit("add-user", userId)
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });
//  retrieve the socket ID of the recipient user (data.to) from an onlineUsers Map and send the message
  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});
