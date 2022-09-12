const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/src/chat.html");
});

let users = [];

io.on("connection", (socket) => {
  console.log("user in", socket.id);

  socket.on("message", (msg) => {
    console.log("message", msg);
    io.emit("message", msg);
  });
});

http.listen(port, () => {
  console.log(
    `Socket.IO server running at http://media-cloud.francecentral.cloudapp.azure.com:${port}/`
  );
});
