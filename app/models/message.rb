class Message < ApplicationRecord
  belongs_to :user
  belongs_to :chat_room
  after_create :broadcast_message, :notify

  def broadcast_message
    ActionCable.server.broadcast("chat_room_#{chat_room.id}", {
      message_partial: ApplicationController.renderer.render(
        partial: "messages/message",
        locals: { message: self}
      ),
      current_user_id: user.id,
      chat_room_id: chat_room_id
    })
  end



  def notify
   object = {
      notifications: 1,
      chat_room_id: chat_room_id
    }

    if chat_room.private && chat_room.messages.count == 1
      object[:chat_room_name] = chat_room.private_chat_name(user.first_name)
    end

    chat_room.users.each do |user|
      unless user == self.user
        ActionCable.server.broadcast("notification_channel_#{user.id}", object)
      end
    end
  end
end
