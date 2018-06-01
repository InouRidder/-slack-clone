class Chat {
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
    const notifications = document.querySelector(`[data-chat-id='${id}'] > .chat-title > .notifications`)
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

  appendPrivateChat(id, name) {
    const partial = `
    <div class="chat" data-chat-id="${id}">
      <div class="chat-title">
      <a class="channel-link" data-remote="true" href="/chat_rooms/${id}">${name}</a>
        <div class="notifications ">
        </div>
      </div>
      <a class="circle-remove" data-remote="true" rel="nofollow" data-method="delete" href="/chat_rooms/${id}/unsubscribe">
      <p>x</p>
      </a>
    </div>`
    this.appendChat(partial, true)
  }
}

export { Chat }
