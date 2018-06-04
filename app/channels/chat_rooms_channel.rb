class ChatRoomsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat_room_#{params[:chat_room_id]}"
    set_last_visit
  end

  def unsubscribed
    set_last_visit
  end

  private

  def set_last_visit
    chat_room = ChatRoom.find(params[:chat_room_id])
    subscription = chat_room.subscriptions.find_by(user: User.find(params[:user_id]))
    subscription.try(:visit!)
  end

end
