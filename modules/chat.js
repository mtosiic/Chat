export default class Chatroom {
  constructor(r, u) {
    this.room = r;
    this.username = u;
    this.chats = db.collection("chats");
    this.unsub = false;
  }

  set room(r) {
    this._room = r;
    if (this.unsub) {
      this.unsub();
    }
  }

  set username(u) {
    this._username = u;
    if (this.unsub) {
      this.unsub();
    }
  }

  get room() {
    return this._room;
  }

  get username() {
    return this._username;
  }

  async addChat(message) {
    try {
      let docChat = {
        message: message,
        username: this.username,
        room: this.room,
        created_at: new Date(),
      };
      await this.chats.add(docChat);
    } catch {
      console.error("Doslo je do greske: ", err);
    }
  }

  getChats(callback) {
    this.unsub = this.chats
      .where("room", "==", this.room)
      .orderBy("created_at", "asc")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          // console.log("---", change.type, "---");
          if (change.type == "added") {
            callback(change.doc.data());
          }
        });
      });
  }
}
