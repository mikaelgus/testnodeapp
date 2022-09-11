const socket = io();

const messages = document.getElementById("messages");
const form = document.getElementById("form");
const input = document.getElementById("input");
const username = document.getElementById("username");
const join = document.getElementById("join");

join.addEventListener("submit", (e) => {
  e.preventDefault();
  if (username.value) {
    socket.emit("join", username.value);
    username.value = username.value;
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit("chat message", username.value + ": " + input.value);
    console.log("message", username.value + ": " + input.value);
    input.value = "";
  }
});

socket.on("responce", (msg) => {
  console.log(msg);
});

socket.on("chat message", function (msg) {
  const item = document.createElement("li");
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
