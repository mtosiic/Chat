export default class ChatUI {
  constructor(ul) {
    this.list = ul;
  }

  set list(ul) {
    this._list = ul;
  }

  get list() {
    return this._list;
  }

  templateLi(data) {
    const li = document.createElement("li");
    const msg = document.createElement("h6");
    const time = document.createElement("p");
    msg.innerHTML = `${data.username}: ${data.message}`;
    time.innerHTML = this.formatDate(data.created_at);
    console.log(data.username);
    console.log(JSON.parse(localStorage.getItem("username")));
    if (data.username == JSON.parse(localStorage.getItem("username"))) {
      li.classList.add("currentUser");
      li.classList.remove("otherUser");
    } else {
      li.classList.remove("currentUser");
      li.classList.add("otherUser");
    }
    li.append(msg, time);
    this._list.appendChild(li);
  }

  formatDate(dateTimestamp) {
    let date = dateTimestamp.toDate();
    let day = date.getDate().toString().padStart(2, "0");
    let month = date.getMonth() + 1;
    month = month.toString().padStart(2, "0");
    let year = date.getFullYear();
    let hours = date.getHours().toString().padStart(2, "0");
    let minutes = date.getMinutes().toString().padStart(2, "0");
    if (day == new Date().getDate() && month == new Date().getMonth() + 1) {
      return `${hours}:${minutes}`;
    } else {
      return `${day}.${month}.${year} - ${hours}:${minutes}`;
    }
  }

  delete() {
    this.list.innerHTML = "";
  }
}
