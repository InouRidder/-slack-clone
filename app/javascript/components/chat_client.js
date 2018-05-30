class Chat {
  scrollToLastMessage() {
    const messages = document.querySelector('.messages');
    if (messages.children.length === 0 ) {return};
    messages.children[messages.children.length - 1].scrollIntoView();
  }

  setChatRoom(partial)  {
    const chatRoom = document.getElementById('chat-room');
    chatRoom.innerHTML = partial;
    scrollToLastMessage();
  }

  appendChat(partial) {
    const chatList = document.getElementById('chat-list');
    chatList.insertAdjacentHTML('beforeend', partial);
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
      eventFire(modal, 'click');
    })
  }

  removeNotifications(id) {
    const notifications = document.querySelector(`[data-chat-id='${id}']`).querySelector('.notifications')
    notifications.innerText = "";
  }

  attachMessage(newMessage) {
    const messages = document.querySelector('.messages')
    messages.insertAdjacentHTML("beforeend", newMessage)
    scrollToLastMessage();
  }

  refreshForm(newForm) {
    const form = document.getElementById('new_message');
    form.innerHTML = newForm;
  }

  appendPrivateChat(id, name) {
    const partial = `<div class='chat' data-chat-id='${id}'>
    <a class='grey-btn' data-remote='true' href='/chat_rooms/${id}'>${name}</a>
    <div class='notifications'>
    </div>
    <a class='grey-btn' data-remote='true' rel='nofollow' data-method='delete' href='/chat_rooms/${id}/unsubscribe'>X</a>
    </div>`
    const chatList = document.getElementById('private-chat-list');
    chatList.insertAdjacentHTML('beforeend', partial);
  }
}

Chat.scrollToLastMessage = function() {
  console.log("fu");
}

export { Chat }
