const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const path = require("path");

// Tells the server to show your index.html file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  console.log("A fan connected!");

  // When a fan draws, send that data to everyone else
  socket.on("drawing", (data) => {
    socket.broadcast.emit("drawing", data);
  });

  socket.on("disconnect", () => {
    console.log("A fan disconnected");
  });
});

// Render uses a dynamic port, so we use process.env.PORT
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
