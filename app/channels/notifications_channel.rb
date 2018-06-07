class NotificationsChannel < ApplicationCable::Channel

  def subscribed
    stream_from "notification_channel_#{params[:user_id]}"
     Online.add(params[:user_id])
     update_online
  end

  def unsubscribed
    Online.delete(params[:user_id])
    update_online
  end

  private

  def update_online
    Online.users.each do |id|
      ActionCable.server.broadcast("notification_channel_#{id}", { onlineUpdate: Online.users })
    end
  end
end
