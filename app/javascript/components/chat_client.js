class Chat {
  constructor() {
    this.activeRoom;
  }

  register(chatId, userId) {
    if (this.activeRoom !== undefined ) {
      App.cable.subscriptions.remove(this.activeRoom)
    }

    this.activeRoom = App.cable.subscriptions.create({
      channel: 'ChatRoomsChannel', chat_room_id: chatId, user_id: userId
    },
    {
      received: (data) => {
        if (data.current_user_id !== userId) {
          this.attachMessage(data.message_partial);
        }
      },
      connected: (data) => {
        this.activeRoom.id = chatId;
      }
    }
    )
  }

  scrollToLastMessage() {
    const messages = document.querySelector('.messages');
    if (messages.children.length === 0 ) {return};
    messages.children[messages.children.length - 1].scrollIntoView();
  }

  setChatRoom(partial)  {
    const chatRoom = document.getElementById('chat-room');
    chatRoom.innerHTML = partial;
    this.scrollToLastMessage();
  }

  appendChat(partial, isPrivate) {
    const chatIdentifier = isPrivate ? 'private-channels' : 'public-channels'
    const chatList = document.getElementById(chatIdentifier);
    chatList.insertAdjacentHTML('beforeend', partial);
    const chat = chatList.children[chatList.children.length - 1 ];
    Notifyer.addToWatchList(chat);
  }

  eventFire(el, etype) {
    if (el.fireEvent) {
      el.fireEvent('on' + etype);
    } else {
      const evObj = document.createEvent('Events');
      evObj.initEvent(etype, true, false);
      el.dispatchEvent(evObj);
    }
  }

  removeModal() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
      this.eventFire(modal, 'click');
    })
  }

  removeNotifications(id) {
    const notifications = document.querySelector(`[data-chat-id='${id}']`).querySelector(`.notifications`)
    notifications.classList.remove('active');
    notifications.innerText = "";
  }

  attachMessage(newMessage) {
    const messages = document.querySelector('.messages')
    messages.insertAdjacentHTML("beforeend", newMessage)
    this.scrollToLastMessage();
  }

  refreshForm(newForm) {
    const form = document.getElementById('new_message');
    form.innerHTML = newForm;
  }

  appendPrivateChat(data) {
    const chatId = data.chat_room_id
    const userId = data.user_id
    const chatName = data.chat_room_name
    const partial = `
    <div class="chat private-chat-title" data-chat-id="${chatId}" data-user-id="${userId}">
      <div class="user-title">
        <div class="user-status circle grey">
        </div>
        <div class="chat-title">
        <a class="channel-link" data-remote="true" href="/chat_rooms/${chatId}">${chatName}</a>
        </div>
      </div>
      <div class="notifications ">

      </div>
      <a class="circle-remove" data-remote="true" rel="nofollow" data-method="delete" href="/chat_rooms/${chatId}/unsubscribe">
        <p>x</p>
      </a>
    </div>`
    this.appendChat(partial, true)
  }
}

export { Chat }
