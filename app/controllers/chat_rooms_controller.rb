class ChatRoomsController < ApplicationController
  def index
    @all_chat_rooms = ChatRoom.all
    @chat_rooms = current_user.chat_rooms.where(private: false)
    @private_chats = current_user.private_chats
    @all_users = User.where.not(id: current_user.id)
  end

  def show
    @chat_room = ChatRoom.find(params[:id])
    @subscription = @chat_room.user_subscription(current_user)
    @subscription.visit! if @subscription
    p @subscription
    p DateTime.now
    @message = Message.new
    respond_to do |format|
      format.html
      format.js
    end
  end

  def create
    @chat_room = ChatRoom.new(chat_room_params)
    if @chat_room.save
      @chat_room.subscriptions.create(user: current_user)
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
