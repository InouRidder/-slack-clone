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

  def create
    @chat_room = ChatRoom.new(chat_room_params)
    if @chat_room.save
      @message  = Message.new
      @after_create = true
      respond_to do |format|
        format.html { redirect_to root_path }
        format.js { render 'show'}
      end
    else
      respond_to do |format|
        format.html { render :index }
        format.js { render 'show'}
      end
    end
  end

  private

  def chat_room_params
    params.require(:chat_room).permit(:name)
  end
end
