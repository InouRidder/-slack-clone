class Notifyer {
  constructor() {
    this.watchList = {};
    this.setWatchList();
    this.online = [];
  }

  register(id) {
    App[`notification_channel_${id}`] = App.cable.subscriptions.create(
      { channel: 'NotificationsChannel', user_id: id },
        {
          received: (data) => {
            this.receive(data);
          }
        }
      )
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

  notify(chat) {
    if (parseInt(chat.dataset.chatId) === Chat.activeRoom.id) {
      return
    };
    const notifications = chat.querySelector('.notifications');
    if (notifications.innerText === "") {
      notifications.innerText = 1
    } else {
      notifications.innerText = parseInt(notifications.innerText) + 1
    }
    notifications.classList.add('active');
  }

  updateOnline(onlineArray) {
    this.online = onlineArray;
    Object.values(this.watchList).forEach(chat => {
      const userStatus = chat.querySelector('.user-status');
      if (userStatus) {
        if (this.online.includes(parseInt(chat.dataset.userId))) {
          userStatus.classList.replace('grey', 'green')
        } else {
          userStatus.classList.replace('green', 'grey')
        }
      }
    })
  }

  receive(data) {
    // Add a notification if the list is included
    console.log(data)
    if (data.new_chat_link) {
      console.log('hello')
      Chat.updateChatList(data)
      return;
    }

    if (data.onlineUpdate) {
      // If its an online notification update, run the update only
      this.updateOnline(data.onlineUpdate);
      return;
    }

    if (this.chatIncludedInList(data.chat_room_id)) {
    // Do not notify if the active room is the one receiving the notification
      // if (data.chat_room_id === App.active_room_id) return;
      this.notify(this.watchList[data.chat_room_id])
    } else {
    // Append the chat to the DOM
      const newChat = Chat.appendPrivateChat(data);
      // if (data.chat_room_id === App.active_room_id) return;
    // Notify the new Chat
      this.notify(this.watchList[data.chat_room_id])
    }
  }
}

export { Notifyer }
