class SubscriptionsController < ApplicationController
  def create
    @chat_room = ChatRoom.find(params[:id])
    @subscription = Subscription.new(user: current_user, chat_room: @chat_room)
    @subscription.save
    @message = Message.new
  end

  def destroy
  end
end
