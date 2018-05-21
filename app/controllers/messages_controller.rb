class MessagesController < ApplicationController
  before_action :set_chat_room
  def create
    @message = Message.new(message_params)
    @message.user = current_user
    @message.chat_room = @chat_room
    if @message.save
      redirect_to chat_room_path(@chat_room)
    else
      render 'chat_rooms/show'
    end
  end

  private

  def set_chat_room
    @chat = ChatRoom.find(params[:chat_room_id])
  end

  def message_params
    params.require(:message).permit(:content)
  end
end
