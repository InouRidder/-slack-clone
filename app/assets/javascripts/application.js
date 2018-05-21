//= require rails-ujs
//= require_tree .

function scrollToLastMessage() {
  var messages = document.getElementById('messages');
  messages.children[messages.children.length - 1].scrollIntoView();
}
