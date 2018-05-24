class AddConversationToChatRooms < ActiveRecord::Migration[5.1]
  def change
    add_column :chat_rooms, :private, :boolean, default: false
  end
end
