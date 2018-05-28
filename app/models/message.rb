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
      current_user_id: user.id
    })
  end

  def notify
    ActionCable.server.broadcast("notifications_channel", {
      notifications: 1,
      chat_room_id: self.chat_room_id
    })
  end
end
