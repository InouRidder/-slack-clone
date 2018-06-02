class NotificationsChannel < ApplicationCable::Channel
  ONLINE = []
  def subscribed
    stream_from "notification_channel_#{params[:user_id]}"
     ONLINE << params[:user_id]
     update_online
  end

  def unsubscribed
    ONLINE.delete(params[:user_id])
    update_online
  end

  private

  def update_online
    ONLINE.each do |id|
      ActionCable.server.broadcast("notification_channel_#{id}", { onlineUpdate: ONLINE })
    end
  end
end
