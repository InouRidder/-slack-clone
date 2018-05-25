class ChatRoom < ApplicationRecord
  has_many :messages, dependent: :destroy
  has_many :subscriptions, dependent: :destroy
  has_many :users, through: :subscriptions

  def subscribed?(user)
    subscriptions.exists?(user_id: user.id)
  end

  def private_chat_name(current_user_first_name)
    users.pluck(:first_name).find {|first_name| first_name != current_user_first_name}
  end
end
