const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/stream.html");
});

let users = [];

io.on("connection", (socket) => {
  console.log("user in", socket.id);

  socket.on("join", (username) => {
    users.push({ username: username, id: socket.id });
    console.log("users connected: ", users);
    io.emit("message", username + " liittyi chattiin");
  });

  // socket.on("join_room", (room) => {
  //   socket.join(room);
  //   console.log("user joined", room);
  //   socket.emit("message", "user has joined a " + room);
  //   socket.broadcast.to(room).emit("message", "A new user has joined");
  // });

  // socket.on("message", ({ room, message }) => {
  //   console.log({ room, message });
  //   socket.to(room).emit("message", message);
  //   io.emit("message", room + ": " + message);
  // });

  socket.on("message", ({ message }) => {
    console.log({ message });
    //socket.emit("message", message);
    io.emit("message", message);
  });

  // socket.on("chat message", (msg) => {
  //   console.log("chat message", msg);
  //   io.emit("chat message", msg);
  // });

  // socket.on("disconnect", () => {
  //   io.emit("message", "A user has left the chat");
  // });
});

http.listen(port, () => {
  console.log(
    `Socket.IO server running at http://media-cloud.francecentral.cloudapp.azure.com:${port}/`
  );
});
