const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

let users = [];

io.on("connection", (socket) => {
  console.log("user in", socket.id);

  socket.on("join", (username) => {
    users.push({ username: username, id: socket.id });
    console.log("users connected: ", users);
    socket.emit("response", username + " joined");
  });

  socket.on("join_room", (room) => {
    console.log("some user joiden", room);
    socket.join(room);
  });

  socket.on("message", ({ room, message }) => {
    console.log({ room, message });
    socket.to(room).emit("message", message);
  });

  socket.on("chat message", (msg) => {
    console.log("chat message", msg);
    io.emit("chat message", msg);
  });
});

http.listen(port, () => {
  console.log(
    `Socket.IO server running at http://media-cloud.francecentral.cloudapp.azure.com:${port}/`
  );
});
