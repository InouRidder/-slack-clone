class MessagesController < ApplicationController
  before_action :set_chat_room
  def create
    @message = Message.new(message_params)
    @message.user = current_user
    @message.chat_room = @chat_room
    if @message.save
      respond_to do |format|
        format.html { redirect_to chat_room_path(@chat_room) }
        format.js
      end
    else
      respond_to do |format|
        format.html { render 'chat_rooms/show' }
        format.js
      end
    end
  end

  private

  def set_chat_room
    @chat_room = ChatRoom.find(params[:chat_room_id])
  end

  def message_params
    params.require(:message).permit(:content)
  end
end
