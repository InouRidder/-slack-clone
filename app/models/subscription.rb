class Subscription < ApplicationRecord
  belongs_to :user
  belongs_to :chat_room
  validates :user, uniqueness: { scope: :chat_room }
end
