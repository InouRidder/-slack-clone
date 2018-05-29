WAY TO ONLY SEND NOTIFICATIONS TO SUBSCRIBED USERS.

Make a class that persists users signing in ->
On subscribe of notifications (which is the channel everyone subscribes to)

def subscribe
  Online.add(user)
end

def unsubscribe
  Online.remove(user)
end

Then when you broadcast a message

Online.each do |user|
  if message.chatroom.subscribed?(user)
    broadcast_message user_channel_#{user.id} message
  end
end



HOW TO APPEND THE CHAT TO THE RECEIVER OF A PRIVATE CHAT

