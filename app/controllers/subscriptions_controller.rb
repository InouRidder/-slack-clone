class SubscriptionsController < ApplicationController
  before_action :set_room

  def create
    @subscription = Subscription.new(user: current_user, chat_room: @chat_room)
    @subscription.save
    @message = Message.new
  end

  def destroy
    @subscription = @chat_room.subscriptions.find_by(user_id: current_user.id)
    if @chat_room.private
      @subscription.stop_watching!
    else
      @subscription.destroy
    end
  end

  private

  def set_room
    @chat_room = ChatRoom.find(params[:id])
  end

end
