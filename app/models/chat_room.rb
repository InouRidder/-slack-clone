class ChatRoom < ApplicationRecord
  has_many :messages, dependent: :destroy
  has_many :subscriptions, dependent: :destroy
  has_many :users, through: :subscriptions

  def subscribed?(user)
    subscriptions.exists?(user_id: user.id)
  end

  def check_for_noticiations(user)
    subscription = user_subscription(user)
    if subscription.class == Subscription
      notifications(subscription)
    end
  end

  def user_subscription(user)
    subscriptions.find_by(user: user)
  end

  def notifications(subscription)
    count = messages.where('created_at > ?', subscription.last_visit).count
    count == 0 ? nil : count
  end

  def private_chat_name(current_user_first_name)
    users.pluck(:first_name).find {|first_name| first_name != current_user_first_name}
  end
end
