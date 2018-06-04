class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :subscriptions
  has_many :chat_rooms, through: :subscriptions
  validates :first_name, :last_name, presence: true
  after_create :subscribe_to_general

  def subscribe_to_general
    ChatRoom.first.subscriptions.create(user: self)
  end

  def active_private_chats
    chat_rooms.where("private = 'true' AND is_watching = 'true'")
  end

  def private_chats
    chat_rooms.where(private: true)
  end

  def is_chatting?(id)
    private_chats.find do |chat|
      subscribed_ids = chat.subscriptions.pluck(:user_id)
      subscribed_ids.include?(self.id) && subscribed_ids.include?(id)
    end
  end
end
