const socket = io();

const messages = document.getElementById("messages");
const form = document.getElementById("form");
const input = document.getElementById("input");
const username = document.getElementById("username");
const join = document.getElementById("join");
const basic = document.getElementById("chat-channel-default");
const admin = document.getElementById("chat-channel-admin");
let room = "default_room";
let user;

join.addEventListener("submit", (e) => {
  e.preventDefault();
  if (username.value) {
    socket.emit("join", username.value);
    user = username.value;
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value) {
    const package = { room: room, message: user + ": " + input.value };
    socket.emit("message", package);
    console.log("message", room, user + ": " + input.value);
    console.log("package: ", package);
    input.value = "";
  }
});

basic.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("join default pushed");
  room = "default_room";
  socket.emit("join_room", room);
});

admin.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("join admin pushed");
  room = "admin_room";
  socket.emit("join_room", room);
});

socket.on("responce", (msg) => {
  console.log(msg);
});

socket.on("message", (msg) => {
  console.log(msg);
  const item = document.createElement("li");
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

messages.scrollTop = messages.scrollHeight;
