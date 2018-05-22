class ChatRoomsController < ApplicationController
  def index
    @chat_rooms = ChatRoom.all
    @general = ChatRoom.first
  end

  def show
    @chat_room = ChatRoom.find(params[:id])
    @message = Message.new
    respond_to do |format|
      format.html
      format.js
    end
  end
end
