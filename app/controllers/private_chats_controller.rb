class PrivateChatsController < ApplicationController
  def create
    if @chat_room = current_user.is_chatting?(params[:user_id].to_i)
      @is_chatting = true
    else
      @chat_room = ChatRoom.create(private: true)
      @chat_room.subscriptions.create(user: current_user)
      @chat_room.subscriptions.create(user_id: params[:user_id])
    end
    @message = Message.new
  end
end
