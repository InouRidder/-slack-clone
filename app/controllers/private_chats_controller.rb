class PrivateChatsController < ApplicationController
  def create
    @chat_room = ChatRoom.create(private: true)
    @chat_room.subscriptions.create(user: current_user)
    @chat_room.subscriptions.create(user_id: params[:user_id])
    @message = Message.new
  end
end
