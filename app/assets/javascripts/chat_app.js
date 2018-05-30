function scrollToLastMessage() {
  const messages = document.querySelector('.messages');
  if (messages.children.length === 0 ) {return};
  messages.children[messages.children.length - 1].scrollIntoView();
}

function setChatRoom(partial) {
  const chatRoom = document.getElementById('chat-room');
  chatRoom.innerHTML = partial;
  scrollToLastMessage();
}

function appendChat(partial) {
  const chatList = document.getElementById('chat-list');
  chatList.insertAdjacentHTML('beforeend', partial);
}

function eventFire(el, etype) {
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    const evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}

function removeModal() {
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    eventFire(modal, 'click');
  })
}

function removeNotifications(id) {
  const notifications = document.querySelector("[data-chat-id='"+id+"']").querySelector('.notifications')
  notifications.innerText = "";
}

function attachMessage(newMessage){
  const messages = document.querySelector('.messages')
  messages.insertAdjacentHTML("beforeend", newMessage)
  scrollToLastMessage();
}

function refreshForm (newForm) {
  const form = document.getElementById('new_message');
  form.innerHTML = newForm;
}

function appendPrivateChat(id, name){
  partial = `<div class='chat' data-chat-id='${id}'>
  <a class='grey-btn' data-remote='true' href='/chat_rooms/${id}'>${name}</a>
  <div class='notifications'>
  </div>
  <a class='grey-btn' data-remote='true' rel='nofollow' data-method='delete' href='/chat_rooms/${id}/unsubscribe'>X</a>
  </div>`
  const chatList = document.getElementById('private-chat-list');
  chatList.insertAdjacentHTML('beforeend', partial);
}
