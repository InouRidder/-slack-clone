class Online < ApplicationRecord

  def self.add(id)
    model = self.first
    model.users << id
    model.save
  end

  def self.users
    model = self.first
    model.users
  end

  def self.delete(id)
    model = self.first
    model.users.delete(id)
    model.save
  end

end
