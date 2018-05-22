import "bootstrap";

function scrollToLastMessage() {
  const messages = document.getElementById('messages');
  if (messages.children.length === 0 ) {return true};
  messages.children[messages.children.length - 1].scrollIntoView();
}

export { scrollToLastMessage }
