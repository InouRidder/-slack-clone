class Subscription < ApplicationRecord
  belongs_to :user
  belongs_to :chat_room
  validates :user, uniqueness: { scope: :chat_room }
  after_create :visit!

  def visit!
    self.last_visit = DateTime.now
    self.save
  end

  def watch!
    self.is_watching = true
    self.save
  end

  def stop_watching!
    self.is_watching = false
    self.save
  end
end
