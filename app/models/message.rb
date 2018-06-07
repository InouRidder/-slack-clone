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

    if chat_room.private
      object[:chat_room_name] = user.first_name
      object[:user_id] = user.id
      object[:private] = true
    end

    chat_room.users.where.not(id: user.id).each do |user|
      ActionCable.server.broadcast("notification_channel_#{user.id}", object)
    end
  end
end
