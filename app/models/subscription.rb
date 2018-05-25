class Subscription < ApplicationRecord
  belongs_to :user
  belongs_to :chat_room
  validates :user, uniqueness: { scope: :chat_room }
  after_create :visit!

  def visit!
    last_visit = DateTime.now
    save
  end
end
