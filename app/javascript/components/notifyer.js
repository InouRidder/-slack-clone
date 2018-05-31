class Notifyer {
  constructor() {
    this.watchList = {};
    this.setWatchList();
  }

  setWatchList() {
    const chats = document.querySelectorAll('.chat')
      chats.forEach(chat => {
        this.addToWatchList(chat)
    })
  }

  addToWatchList(chat) {
    this.watchList[chat.dataset.chatId] = chat
  }

  stopWatching(id) {
    delete this.watchList[id]
  }

  chatIncludedInList(id) {
    return Object.keys(this.watchList).includes(id.toString());
  }

  addNewChat(id, name) {
    Chat.appendPrivateChat(id, name);
    const chat = document.querySelector(`[data-chat-id='${id}']`);
    this.addToWatchList(chat);
    return chat;
  }

  notify(chat) {

    if (parseInt(chat.dataset.chatId) === App.active_room_id) return;

    const notifications = chat.querySelector('.notifications');
    if (notifications.innerText === "") {
      notifications.innerText = 1
    } else {
      notifications.innerText = parseInt(notifications.innerText) + 1
    }
    notifications.classList.add('active');
  }

  receive(data) {
    // Add a notification if the list is included
    if (this.chatIncludedInList(data.chat_room_id)) {
    // Do not notify if the active room is the one receiving the notification
      // if (data.chat_room_id === App.active_room_id) return;
      this.notify(this.watchList[data.chat_room_id])
    } else {
    // Append the chat to the DOM
      const newChat = this.addNewChat(data.chat_room_id, data.chat_room_name);
      // if (data.chat_room_id === App.active_room_id) return;
    // Notify the new Chat
      this.notify(newChat)
    }
  }
}

export { Notifyer }
