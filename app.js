import Chatroom from "./modules/chat.js";
import ChatUI from "./modules/ui.js";

// DOM
const messagesUl = document.getElementById("list");
const sendMsgBtn = document.getElementById("messageButton");
const usernameBtn = document.getElementById("usernameButton");
const navBtns = document.querySelectorAll(".navBtn");
const colorBtn = document.getElementById("colorButton");
const color = document.getElementById("colorInput");
const usernameAlert = document.getElementById("usernameAlert");

// Set username from localStorage
let username = "";
if (JSON.parse(localStorage.getItem("username")) == null) {
  username = "anonymus";
} else {
  username = JSON.parse(localStorage.getItem("username"));
}

// Change room
let room = "";
if (JSON.parse(localStorage.getItem("room")) == null) {
  room = "#general";
  localStorage.setItem("room", JSON.stringify(room));
} else {
  room = JSON.parse(localStorage.getItem("room"));
}

navBtns.forEach((btn) => {
  if (room == btn.value) {
    btn.classList.add("active");
  }
  btn.addEventListener("click", (e) => {
    navBtns.forEach((button) => {
      button.classList.remove("active");
    });
    e.preventDefault();
    btn.classList.add("active");
    chatUI.delete();
    localStorage.setItem("room", JSON.stringify(btn.value));
    room = btn.value;
    chats.room = room;
    chats.getChats((data) => {
      chatUI.templateLi(data);
    });
  });
});

// Objects
let chats = new Chatroom(room, username);
let chatUI = new ChatUI(messagesUl);

// Render messages
chats.getChats((data) => {
  chatUI.templateLi(data);
});

// Send message
sendMsgBtn.addEventListener("click", () => {
  const input = document.getElementById("messageInput");
  if (input.value != "" && input.value.trim() != "") {
    chats.addChat(input.value);
    input.value = "";
  } else {
    window.alert("Please enter message!");
  }
});

// Update username
usernameBtn.addEventListener("click", () => {
  const usernameInput = document.getElementById("usernameInput");
  username = usernameInput.value.trim();
  if (username.length >= 2 && username.length <= 10) {
    localStorage.setItem("username", JSON.stringify(username));
    usernameInput.value = "";
    chats.username = username;
    usernameAlert.innerHTML = `New username: ${username}`;

    usernameAlert.classList.toggle("d-none");
    setTimeout(() => {
      usernameAlert.classList.toggle("d-none");
    }, 3000);
    chatUI.delete();
    chats.getChats((data) => {
      chatUI.templateLi(data);
    });
  } else {
    window.alert("Username has to be between 2 and 10 characters!");
  }
});

// Update color
let bgColor = "";
if (JSON.parse(localStorage.getItem("color")) == null) {
  bgColor = "white";
  document.body.style.backgroundColor = bgColor;
} else {
  bgColor = JSON.parse(localStorage.getItem("color"));
  document.body.style.backgroundColor = bgColor;
  color.value = bgColor;
}

colorBtn.addEventListener("click", () => {
  document.body.style.backgroundColor = color.value;
  localStorage.setItem("color", JSON.stringify(color.value));
});
